"""Deterministic checks shared by offline and future rendered crawlers."""
from collections import defaultdict, Counter
from urllib.parse import urlsplit, urljoin
from crawler import PageHTML, normalize


def audit(crawler, pages, sitemap, mode):
    issues, rows = [], []
    incoming = defaultdict(set)
    sitemap = {normalize(url) for url in sitemap}
    fetched = {page.url: page for page in pages}
    duplicates = {key: defaultdict(list) for key in ('title', 'description', 'canonical')}

    def add(severity, rule, url, actual, expected, fix):
        issues.append({'severity': severity, 'rule': rule, 'URL': url, 'actual': actual,
                       'expected': expected, 'recommendedFix': fix, 'fingerprint': rule + '|' + url})

    for page in pages:
        url = page.url
        parsed = PageHTML(crawler.getRenderedHTML(page))
        title, description = parsed.title.strip(), parsed.description.strip()
        canonical = urljoin(url, parsed.canonicals[0]) if parsed.canonicals else ''
        robots = ','.join(parsed.robots + [page.headers.get('x-robots-tag', '')]).lower()
        blocked = any(token.strip() in ('noindex', 'none') for token in robots.replace(':', ',').replace(' ', ',').split(','))
        indexable = page.status == 200 and not blocked and page.robots_allowed
        rows.append({'URL': url, 'httpStatus': page.status, 'statusSource': 'filesystem' if mode == 'local' else 'http',
                     'title': title, 'description': description, 'canonical': canonical,
                     'robotsMeta': parsed.robots, 'xRobotsTag': page.headers.get('x-robots-tag', ''),
                     'indexable': indexable, 'h1Count': parsed.h1, 'structuredData': parsed.structured})
        if page.status != 200:
            add('P1' if page.status else 'INFO', 'http-status' if page.status else 'fetch-unverified', url,
                page.status or page.error, 'HTTP 200', 'Check origin response, routing or crawl limits.')
            continue
        if not title: add('P1', 'title-missing', url, title, 'Non-empty title', 'Add a descriptive title after editorial review.')
        if not description: add('P2', 'description-missing', url, description, 'Non-empty description', 'Add a unique meta description.')
        if len(parsed.canonicals) != 1:
            add('P1', 'canonical-count', url, parsed.canonicals, 'Exactly one canonical', 'Review and set the intended canonical URL.')
        if canonical and (urlsplit(canonical).netloc != urlsplit(crawler.origin).netloc or urlsplit(canonical).scheme != 'https'):
            add('P1', 'canonical-domain', url, canonical, crawler.origin, 'Review cross-domain canonical before changing it.')
        if not indexable:
            add('P1' if normalize(url) in sitemap else 'INFO', 'indexability', url, {'robots': robots, 'allowed': page.robots_allowed},
                'Indexable sitemap entries', 'Review intended visibility; do not blindly remove noindex.')
        if parsed.h1 != 1: add('P2', 'h1-count', url, parsed.h1, 'One primary H1', 'Review heading hierarchy.')
        if not parsed.structured: add('INFO', 'structured-data-missing', url, False, 'Relevant structured data where applicable', 'Assess suitable Schema.org markup.')
        if indexable and normalize(url) not in sitemap:
            add('P2', 'sitemap-membership', url, False, 'Canonical indexable page in sitemap', 'Review eligibility before adding the URL.')
        for key, value in [('title', title), ('description', description), ('canonical', canonical)]:
            if value: duplicates[key][value].append(url)
        for link in crawler.getLinks(page):
            if normalize(link) != normalize(url): incoming[normalize(link)].add(url)
            target = fetched.get(link)
            if target is None:
                target = crawler.fetchPage(link)
                fetched[link] = target
            if target.status is not None and target.status >= 400:
                add('P1', 'broken-internal-link', url, {'target': link, 'status': target.status}, 'Resolvable internal target', 'Repair link or restore target after review.')
            elif target.status is None:
                add('INFO', 'link-unverified', url, {'target': link, 'reason': target.error}, 'Verified internal target', 'Recheck within crawl policy and request budget.')
    for key, groups in duplicates.items():
        for value, urls in groups.items():
            if len(urls) > 1:
                for url in urls:
                    add('P2', 'duplicate-' + key, url, {'value': value, 'urls': urls}, 'Unique ' + key,
                        'Check intentional duplicates before editing metadata.')
    for row in rows:
        if row['indexable'] and normalize(row['URL']) != crawler.origin + '/' and not incoming[normalize(row['URL'])]:
            add('P2', 'orphan-candidate', row['URL'], 0, 'At least one incoming internal link',
                'Review navigation; this is only a candidate within the crawl sample.')
    # Dedupe one finding per rule + page URL, retain multiple target details.
    grouped = {}
    for issue in issues:
        key = issue['fingerprint']
        if key in grouped:
            grouped[key].setdefault('additionalActual', []).append(issue['actual'])
        else: grouped[key] = issue
    issues = sorted(grouped.values(), key=lambda x: (x['severity'], x['URL'], x['rule']))
    by_url = defaultdict(set)
    for issue in issues: by_url[issue['URL']].add(issue['severity'])
    failed = sum(bool(by_url[row['URL']] & {'P0', 'P1'}) for row in rows)
    warned = sum(not (by_url[row['URL']] & {'P0', 'P1'}) and bool(by_url[row['URL']] & {'P2'}) for row in rows)
    return {'schemaVersion': 1, 'mode': mode, 'origin': crawler.origin,
            'coverage': {'truncated': crawler.truncated, 'rendered': False, 'robotsRespected': True,
                         'note': 'Local statuses are inferred from files, not production HTTP.' if mode == 'local' else 'Bounded live HTTP crawl; JavaScript not rendered.'},
            'summary': {'pagesCrawled': len(rows), 'passed': len(rows)-failed-warned, 'warnings': warned, 'failed': failed,
                        'issueCounts': dict(Counter(i['severity'] for i in issues))}, 'pages': rows, 'issues': issues}


def markdown(report):
    s = report['summary']
    lines = ['# SEO Audit', '', f"Mode: {report['mode']} | Pages: {s['pagesCrawled']} | Passed: {s['passed']} | Warnings: {s['warnings']} | Failed: {s['failed']}",
             '', report['coverage']['note'], '', f"Truncated: {report['coverage']['truncated']}", '', '| Severity | Rule | URL | Actual | Expected | Recommended fix |', '|---|---|---|---|---|---|']
    for i in report['issues']:
        cells = [i[k] for k in ['severity', 'rule', 'URL', 'actual', 'expected', 'recommendedFix']]
        lines.append('| ' + ' | '.join(str(v).replace('|', '\\|').replace('\n', ' ') for v in cells) + ' |')
    return '\n'.join(lines) + '\n'
