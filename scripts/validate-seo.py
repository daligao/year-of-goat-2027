import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workers/seo-bot'))
from crawler import LocalCrawler, StaticCrawler, sitemap_urls
from audit import audit, markdown

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--live', action='store_true')
    parser.add_argument('--max-pages', type=int, default=50)
    parser.add_argument('--output', type=Path, default=ROOT / 'reports/seo')
    parser.add_argument('--strict', action='store_true')
    args = parser.parse_args()
    if not 1 <= args.max_pages <= 500: parser.error('max-pages must be 1–500')
    if args.live:
        crawler = StaticCrawler(max_pages=args.max_pages)
        sitemap = crawler.sitemap
        seeds = [crawler.origin + '/'] + sitemap
    else:
        crawler = LocalCrawler(ROOT / '.build/site')
        sitemap = sitemap_urls((crawler.root / 'sitemap.xml').read_text())
        seeds = crawler.inventory() + sitemap
    pages = crawler.crawlSite(seeds)
    report = audit(crawler, pages, sitemap, 'live' if args.live else 'local')
    args.output.mkdir(parents=True, exist_ok=True)
    (args.output / 'latest.json').write_text(json.dumps(report, indent=2, ensure_ascii=False) + '\n')
    (args.output / 'latest.md').write_text(markdown(report))
    print(json.dumps(report['summary']))
    if args.strict and report['summary']['failed']: sys.exit(1)
