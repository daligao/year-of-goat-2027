import copy
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[1]
sys.path[:0] = [str(ROOT / 'scripts'), str(ROOT / 'workers/seo-bot')]
from content_lib import validate_records, validate_directory, read_content
from crawler import PageHTML, Page, Crawler, LocalCrawler, StaticCrawler, CloudflareBrowserRunCrawler, SameOriginRedirect, ORIGIN, normalize, sitemap_urls
from audit import audit

VALID = {'id':'sample', 'slug':'sample', 'title':'Sample title', 'description':'A useful description that is long enough for the example content.',
         'status':'published', 'type':'festival', 'updatedAt':'2026-09-20', 'sourceUrl':ORIGIN + '/festival-countdown/', 'body':'Example body.'}


class ContentTests(unittest.TestCase):
    def errors(self, record): return validate_records([('example', record)])[0]

    def test_valid_content(self): self.assertFalse(self.errors(VALID))

    def test_required_fields(self):
        for key in ['id','slug','title','description','status','type','updatedAt','sourceUrl']:
            with self.subTest(key=key):
                item = dict(VALID); del item[key]
                self.assertTrue(self.errors(item))

    def test_empty_published_metadata(self):
        for key in ['title', 'description']:
            for value in ['', '   ', None]:
                with self.subTest(key=key, value=value):
                    self.assertTrue(self.errors(dict(VALID, **{key:value})))

    def test_invalid_status(self): self.assertTrue(self.errors(dict(VALID,status='pending')))

    def test_bad_dates(self):
        for date in ['2026-02-30','2026-13-01','yesterday','2026-9-2',123]:
            with self.subTest(date=date): self.assertTrue(self.errors(dict(VALID,updatedAt=date)))

    def test_duplicate_slug_across_categories(self):
        errors, _ = validate_records([('festival.md',VALID),('zodiac.json',dict(VALID,id='other',type='zodiac'))])
        self.assertTrue(any('duplicate slug' in e for e in errors))

    def test_non_objects_do_not_crash(self):
        for value in [None, [], 'text', 3]: self.assertTrue(self.errors(value))

    def test_malformed_json(self):
        with tempfile.TemporaryDirectory() as temp:
            Path(temp,'bad.json').write_text('{oops')
            self.assertTrue(validate_directory(temp)[1])

    def test_markdown_frontmatter(self):
        with tempfile.TemporaryDirectory() as temp:
            path=Path(temp,'test.md')
            meta=dict(VALID); del meta['body']
            path.write_text('---\n'+json.dumps(meta)+'\n---\n\nExample text')
            self.assertEqual(read_content(path)['body'],'Example text')
            path.write_text('No front matter')
            self.assertRaises(ValueError,read_content,path)

    def test_warnings(self):
        errors, warnings = validate_records([('x',dict(VALID,title='T'*71,description='short'))])
        self.assertFalse(errors); self.assertEqual(len(warnings),3)

    def test_payload_required_and_exclusive(self):
        item=dict(VALID); del item['body']
        self.assertTrue(self.errors(item))
        self.assertTrue(self.errors(dict(VALID,data={'x':1})))


class FakeCrawler(Crawler):
    origin = ORIGIN
    max_pages = 10
    truncated = False
    def __init__(self,pages): self.pages = {p.url:p for p in pages}
    def fetchPage(self,url): return self.pages.get(url,Page(url,404))


def good_html(url=ORIGIN+'/', extra=''):
    return f'<title>Good title</title><meta name="description" content="Good description"><link href="{url}" rel="canonical"><h1>Heading</h1><script type="application/ld+json">{{}}</script>{extra}'


class SEOTests(unittest.TestCase):
    def report(self,pages,sitemap=None):
        return audit(FakeCrawler(pages),pages,sitemap if sitemap is not None else [p.url for p in pages],'live')
    def rules(self,report): return {i['rule'] for i in report['issues']}

    def test_html_attribute_order_case_entities(self):
        p=PageHTML('<TITLE>A &amp; B</TITLE><META content="Desc" NAME="description"><link HREF="/" REL="alternate canonical"><h1>x</h1>')
        self.assertEqual(p.title,'A & B'); self.assertEqual(p.description,'Desc'); self.assertEqual(p.canonicals,['/'])

    def test_healthy_page(self):
        report=self.report([Page(ORIGIN+'/',200,good_html())])
        self.assertEqual(report['summary']['passed'],1); self.assertFalse(report['issues'])

    def test_missing_metadata(self):
        rules=self.rules(self.report([Page(ORIGIN+'/',200,'<p>test</p>')]))
        self.assertTrue({'title-missing','description-missing','canonical-count','h1-count','structured-data-missing'} <= rules)

    def test_robots_meta_and_headers(self):
        for html,headers in [(good_html(extra='<meta name="robots" content="noindex, follow">'),{}),(good_html(),{'x-robots-tag':'noindex'})]:
            report=self.report([Page(ORIGIN+'/',200,html,headers)])
            self.assertIn('indexability',self.rules(report)); self.assertFalse(report['pages'][0]['indexable'])

    def test_bad_canonical_and_multiple(self):
        report=self.report([Page(ORIGIN+'/',200,good_html('https://evil.example/')+'<link rel="canonical" href="/">')])
        self.assertTrue({'canonical-domain','canonical-count'} <= self.rules(report))

    def test_duplicate_metadata(self):
        pages=[Page(ORIGIN+p,200,good_html()) for p in ['/','/second/']]
        self.assertTrue({'duplicate-title','duplicate-description','duplicate-canonical'} <= self.rules(self.report(pages)))

    def test_broken_links_deduplicated(self):
        report=self.report([Page(ORIGIN+'/',200,good_html(extra='<a href="/missing/">bad</a><a href="/other-missing/">bad</a>'))])
        issues=[i for i in report['issues'] if i['rule']=='broken-internal-link']
        self.assertEqual(len(issues),1); self.assertEqual(len(issues[0]['additionalActual']),1)

    def test_orphan_self_link_and_sitemap(self):
        url=ORIGIN+'/lonely/'
        report=self.report([Page(url,200,good_html(url,'<a href="/lonely/">self</a>'))],[])
        self.assertTrue({'orphan-candidate','sitemap-membership'} <= self.rules(report))

    def test_http_errors_not_confused_with_unknown(self):
        report=self.report([Page(ORIGIN+'/',404),Page(ORIGIN+'/timeout/',None,error='timeout')])
        self.assertTrue({'http-status','fetch-unverified'} <= self.rules(report))
        self.assertEqual(report['summary']['failed'],1)

    def test_crawl_bounds(self):
        crawler=FakeCrawler([Page(ORIGIN+'/',200,good_html(extra='<a href="/second/">next</a>'))])
        crawler.max_pages=1
        self.assertEqual(len(crawler.crawlSite([ORIGIN+'/'])),1)
        self.assertTrue(crawler.truncated)

    def test_local_traversal_and_routes(self):
        with tempfile.TemporaryDirectory() as temp:
            Path(temp,'robots.txt').write_text('User-agent: *\nDisallow: /private/\n')
            Path(temp,'index.html').write_text(good_html())
            crawler=LocalCrawler(temp)
            self.assertEqual(crawler.fetchPage(ORIGIN+'/').status,200)
            self.assertIsNone(crawler.resolve(ORIGIN+'/%2e%2e/secret.html'))
            self.assertFalse(crawler.fetchPage(ORIGIN+'/private/').robots_allowed)

    def test_sitemap_validation(self):
        valid=f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{ORIGIN}/</loc></url></urlset>'
        self.assertEqual(sitemap_urls(valid),[ORIGIN+'/'])
        self.assertRaises(ValueError,sitemap_urls,valid.replace(ORIGIN,'https://evil.example'))
        self.assertRaises(ValueError,sitemap_urls,'<sitemapindex/>')

    def test_external_schemes_ignored(self):
        crawler=FakeCrawler([])
        page=Page(ORIGIN+'/',200,'<a href="mailto:test@foo.com">email</a><a href="javascript:void(0)">js</a><a href="https://other.example/">offsite</a>')
        self.assertEqual(crawler.getLinks(page),[])

    def test_browser_adapter_explicitly_unavailable(self): self.assertRaises(NotImplementedError,CloudflareBrowserRunCrawler)

    def test_live_origin_restriction(self): self.assertRaises(ValueError,StaticCrawler,origin='http://127.0.0.1')

    def test_redirect_restriction(self):
        redirect=SameOriginRedirect(ORIGIN)
        self.assertRaises(ValueError,redirect.redirect_request,None,None,301,'',{},'https://evil.example/')


class ProductionTests(unittest.TestCase):
    def test_all_public_bytes_unchanged(self):
        import hashlib
        baseline=json.loads((ROOT/'docs/production-baseline.json').read_text())
        for name,digest in baseline['files'].items():
            with self.subTest(name=name): self.assertEqual(hashlib.sha256((ROOT/name).read_bytes()).hexdigest(),digest)

    def test_content_not_in_public_manifest(self):
        files=json.loads((ROOT/'docs/production-baseline.json').read_text())['files']
        self.assertFalse(any(x.startswith(('content/','docs/','workers/','.env')) for x in files))


class RegressionTests(unittest.TestCase):
    def test_new_and_worsened_issues_fail(self):
        spec=importlib.util.spec_from_file_location('regressions',ROOT/'scripts/check-seo-regressions.py')
        mod=importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
        report=audit(FakeCrawler([]),[Page(ORIGIN+'/',200,'<h1>Example</h1>')],[ORIGIN+'/'],'local')
        baseline=copy.deepcopy(report)
        self.assertEqual(mod.regressions(report,baseline),[])
        baseline['issues']=[]
        self.assertTrue(mod.regressions(report,baseline))
        baseline=copy.deepcopy(report)
        report['coverage']['truncated']=True
        self.assertIn('incomplete crawl coverage',mod.regressions(report,baseline))

    def test_robots_redirect_blocked(self):
        redirect=SameOriginRedirect(ORIGIN)
        redirect.allowed=lambda url: False
        self.assertRaises(ValueError,redirect.redirect_request,None,None,301,'',{},ORIGIN+'/private/')

    def test_live_request_budget_offline(self):
        crawler=StaticCrawler.__new__(StaticCrawler)
        crawler.origin=ORIGIN; crawler.cache={}; crawler.requests=1; crawler.max_requests=1
        crawler.truncated=False
        result=crawler.request(ORIGIN+'/')
        self.assertIsNone(result.status)
        self.assertTrue(crawler.truncated)

if __name__ == '__main__': unittest.main()
