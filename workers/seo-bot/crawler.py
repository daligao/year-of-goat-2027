"""Replaceable crawl adapters; local tests never require Cloudflare or a network."""
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit, unquote
from urllib.request import Request, build_opener, HTTPRedirectHandler, HTTPSHandler
from urllib.error import HTTPError, URLError
from urllib.robotparser import RobotFileParser
import time
import ssl
import certifi
import xml.etree.ElementTree as ET

ORIGIN = 'https://chinesefortunetools.online'
AGENT = 'CFTPhase1Audit'


def normalize(url, base=ORIGIN + '/'):
    parts = urlsplit(urljoin(base, url))
    return urlunsplit((parts.scheme.lower(), parts.netloc.lower(), parts.path or '/', '', ''))


class PageHTML(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.title = ''
        self.description = ''
        self.canonicals = []
        self.robots = []
        self.h1 = 0
        self.links = []
        self.structured = False
        self.in_title = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if tag == 'meta':
            name = a.get('name', '').lower()
            if name == 'description': self.description = a.get('content', '')
            if name in ('robots', 'googlebot'): self.robots.append(a.get('content', ''))
        if tag == 'link' and 'canonical' in a.get('rel', '').lower().split():
            self.canonicals.append(a.get('href', ''))
        if tag == 'a' and a.get('href'): self.links.append(a['href'])
        if (tag == 'script' and a.get('type', '').lower() == 'application/ld+json') or 'itemscope' in a:
            self.structured = True

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False

    def handle_data(self, data):
        if self.in_title: self.title += data


@dataclass
class Page:
    url: str
    status: int | None
    html: str = ''
    headers: dict = field(default_factory=dict)
    final_url: str = ''
    error: str = ''
    robots_allowed: bool = True


class Crawler:
    def fetchPage(self, url): raise NotImplementedError
    def getRenderedHTML(self, page): return page.html
    def getLinks(self, page):
        links = []
        for href in PageHTML(self.getRenderedHTML(page)).links:
            try:
                url = normalize(href, page.final_url or page.url)
                if urlsplit(url).scheme in ('http', 'https') and urlsplit(url).netloc == urlsplit(self.origin).netloc:
                    links.append(url)
            except ValueError:
                continue
        return sorted(set(links))
    def crawlSite(self, seeds):
        queue, pages, visited = list(dict.fromkeys(seeds)), [], set()
        while queue and len(pages) < self.max_pages:
            url = queue.pop(0)
            if url in visited: continue
            visited.add(url)
            page = self.fetchPage(url)
            pages.append(page)
            for link in self.getLinks(page):
                suffix = Path(urlsplit(link).path).suffix.lower()
                if suffix in ('', '.html', '.htm') and link not in visited and link not in queue:
                    queue.append(link)
        self.truncated = self.truncated or bool(queue)
        return pages


def sitemap_urls(text, origin=ORIGIN):
    root = ET.fromstring(text)
    if root.tag != '{http://www.sitemaps.org/schemas/sitemap/0.9}urlset':
        raise ValueError('Expected sitemap urlset; sitemap indexes require a future adapter')
    urls = [node.text.strip() for node in root.findall('{*}url/{*}loc') if node.text]
    if not urls or len(urls) != len(set(urls)):
        raise ValueError('Sitemap must contain unique URLs')
    for url in urls:
        parts = urlsplit(url)
        if parts.scheme != 'https' or parts.netloc != urlsplit(origin).netloc or parts.query or parts.fragment:
            raise ValueError(f'Invalid sitemap URL: {url}')
    return urls


class LocalCrawler(Crawler):
    def __init__(self, root, origin=ORIGIN, max_pages=500):
        self.root, self.origin, self.max_pages = Path(root).resolve(), origin, max_pages
        self.truncated = False
        self.robots = RobotFileParser()
        self.robots.parse((self.root / 'robots.txt').read_text().splitlines())

    def resolve(self, url):
        parts = urlsplit(url)
        if parts.netloc != urlsplit(self.origin).netloc: return None
        candidate = (self.root / unquote(parts.path).lstrip('/')).resolve()
        if not candidate.is_relative_to(self.root): return None
        if candidate.is_dir(): candidate /= 'index.html'
        if not candidate.exists() and not candidate.suffix:
            candidate = candidate.with_suffix('.html')
        return candidate if candidate.is_file() else None

    def fetchPage(self, url):
        path = self.resolve(url)
        allowed = self.robots.can_fetch(AGENT, url)
        if path is None: return Page(url, 404, robots_allowed=allowed)
        html = path.read_text(encoding='utf-8', errors='replace') if path.suffix in ('.html', '.htm') else ''
        return Page(url, 200, html, final_url=url, robots_allowed=allowed)

    def inventory(self):
        return [self.origin + '/' + (str(p.relative_to(self.root))[:-10] if p.name == 'index.html' else str(p.relative_to(self.root)))
                for p in sorted(self.root.rglob('*.html'))]


class SameOriginRedirect(HTTPRedirectHandler):
    def __init__(self, origin):
        self.origin = origin
        self.allowed = None
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        if urlsplit(newurl).netloc != urlsplit(self.origin).netloc or urlsplit(newurl).scheme != 'https':
            raise ValueError('Cross-origin/insecure redirect blocked')
        if self.allowed and not self.allowed(newurl):
            raise ValueError('Redirect blocked by robots.txt')
        return super().redirect_request(req, fp, code, msg, headers, newurl)


class StaticCrawler(Crawler):
    def __init__(self, origin=ORIGIN, max_pages=50, max_requests=150, delay=0.2):
        if origin != ORIGIN: raise ValueError('Live crawler is restricted to the production origin')
        self.origin, self.max_pages = origin, max_pages
        self.max_requests, self.delay, self.requests = max_requests, delay, 0
        self.redirect = SameOriginRedirect(origin)
        self.deadline = time.monotonic() + 120
        self.opener = build_opener(self.redirect, HTTPSHandler(context=ssl.create_default_context(cafile=certifi.where())))
        self.cache, self.truncated = {}, False
        robots = self.request(origin + '/robots.txt')
        self.robots = RobotFileParser()
        if robots.status != 200: raise ValueError(f'Cannot establish robots policy; crawl stopped: {robots.error or robots.status}')
        self.robots.parse(robots.html.splitlines())
        self.redirect.allowed = lambda url: self.robots.can_fetch(AGENT, url)
        self.delay = max(self.delay, self.robots.crawl_delay(AGENT) or 0)
        sitemap = self.fetchPage(origin + '/sitemap.xml')
        if sitemap.status != 200: raise ValueError('Sitemap unavailable')
        self.sitemap = sitemap_urls(sitemap.html, origin)

    def request(self, url):
        if url in self.cache: return self.cache[url]
        if urlsplit(url).netloc != urlsplit(self.origin).netloc or urlsplit(url).scheme != 'https':
            return Page(url, None, error='outside allowed origin')
        if self.requests >= self.max_requests or time.monotonic() + self.delay >= self.deadline:
            self.truncated = True
            return Page(url, None, error='request/time budget exhausted')
        self.requests += 1
        time.sleep(self.delay)
        try:
            with self.opener.open(Request(url, headers={'User-Agent': AGENT}), timeout=12) as response:
                payload = response.read(2_000_001)
                if len(payload) > 2_000_000: raise ValueError('response over 2 MB limit')
                page = Page(url, response.status, payload.decode('utf-8', errors='replace'),
                            dict((k.lower(), v) for k, v in response.headers.items()), response.url)
        except HTTPError as error:
            page = Page(url, error.code, error=str(error))
        except (URLError, ValueError, TimeoutError, OSError) as error:
            page = Page(url, None, error=str(error))
        self.cache[url] = page
        return page

    def fetchPage(self, url):
        if not self.robots.can_fetch(AGENT, url):
            return Page(url, None, error='robots.txt disallows crawling', robots_allowed=False)
        return self.request(url)


class CloudflareBrowserRunCrawler(Crawler):
    """Future adapter contract, intentionally not a silently static substitute."""
    def __init__(self, *args, **kwargs):
        raise NotImplementedError('Browser Run not enabled; see docs/CLOUDFLARE_BROWSER_RUN.md')
