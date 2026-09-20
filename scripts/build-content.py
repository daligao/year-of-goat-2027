"""Build an internal catalog only. Never render editorial drafts to public assets."""
import json
from content_lib import ROOT, validate_directory

if __name__ == '__main__':
    records, errors, warnings = validate_directory(ROOT / 'content')
    if errors:
        raise SystemExit('\n'.join(errors))
    output = ROOT / '.build/content/catalog.json'
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({'schemaVersion': 1, 'publishEnabled': False,
        'records': [data for _, data in records]}, indent=2, ensure_ascii=False) + '\n')
    print(f'Built internal catalog: {len(records)} records; publication disabled')
