"""Phase 1 preserves the existing sitemap, generating only an isolated candidate."""
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'workers/seo-bot'))
from crawler import sitemap_urls
source = ROOT / 'sitemap.xml'
urls = sitemap_urls(source.read_text())
output = ROOT / '.build/sitemap.candidate.xml'
output.parent.mkdir(parents=True, exist_ok=True)
output.write_bytes(source.read_bytes())
print(f'Preserved {len(urls)} sitemap URLs in candidate; root sitemap unchanged')
