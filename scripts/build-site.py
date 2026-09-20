"""Package unchanged public files from the audited manifest; no source mutation."""
import hashlib
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def verify(root=ROOT):
    baseline = json.loads((root / 'docs/production-baseline.json').read_text())
    errors = []
    for name, digest in baseline['files'].items():
        source = root / name
        if not source.is_file() or hashlib.sha256(source.read_bytes()).hexdigest() != digest:
            errors.append(name)
    if errors:
        raise ValueError('Production files changed from Phase 1 baseline: ' + ', '.join(errors))
    return baseline


def build(root=ROOT):
    baseline = verify(root)
    output = root / '.build/site'
    # Only derived output can be replaced; root site files are never touched.
    if output.exists(): shutil.rmtree(output)
    for name in baseline['files']:
        target = output / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(root / name, target)
    print(f"Packaged {len(baseline['files'])} unchanged public files")
    return output


if __name__ == '__main__': build()
