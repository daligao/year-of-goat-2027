"""Offline checks: integrity, sitemap, robots and common credential patterns."""
import importlib.util
import json
import re
import subprocess
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workers/seo-bot'))
from crawler import LocalCrawler, sitemap_urls, ORIGIN
spec = importlib.util.spec_from_file_location('build_site', ROOT / 'scripts/build-site.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
module.verify()
urls = sitemap_urls((ROOT / 'sitemap.xml').read_text())
crawler = LocalCrawler(ROOT)
assert 'Sitemap: ' + ORIGIN + '/sitemap.xml' in (ROOT / 'robots.txt').read_text()
assert all(crawler.robots.can_fetch('*', u) for u in urls), 'Sitemap URLs blocked in robots'
assert all(crawler.resolve(u) for u in urls), 'Sitemap references missing routes'
patterns = [rb'gh[pousr]_[A-Za-z0-9]{30,}', rb'github_pat_[A-Za-z0-9_]{30,}', rb'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----', rb'AKIA[0-9A-Z]{16}', rb'sk-[A-Za-z0-9]{32,}']
files = subprocess.check_output(['git', 'ls-files', '--cached', '--others', '--exclude-standard', '-z'], cwd=ROOT).decode().split('\0')
found = []
for name in files:
    p = ROOT / name
    if not name or not p.is_file(): continue
    if p.name in ('pw.txt', '.env', '.dev.vars'):
        found.append(name)
    elif any(re.search(pattern, p.read_bytes()) for pattern in patterns): found.append(name)
if found: raise SystemExit('Possible secrets in files (values redacted): ' + ', '.join(found))
print(f'Safety passed: {len(urls)} sitemap routes, robots policy, public-file hashes and credential pattern scan. Pattern scanning is not proof against all secret formats.')
