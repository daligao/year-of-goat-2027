"""Opt-in isolated preview with response-level noindex; production stays unchanged."""
import runpy
import shutil
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
runpy.run_path(str(ROOT / 'scripts/build-site.py'), run_name='__main__')
preview = ROOT / '.build/preview'
if preview.exists(): shutil.rmtree(preview)
shutil.copytree(ROOT / '.build/site', preview)
(preview / '_headers').write_text('/*\n  X-Robots-Tag: noindex, nofollow\n')
print('Preview prepared; no deployment performed')
