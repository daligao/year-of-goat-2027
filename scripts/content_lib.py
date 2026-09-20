"""Versioned editorial model. JSON front matter is deliberately a YAML subset."""
import datetime
import json
from pathlib import Path
from jsonschema import Draft202012Validator, FormatChecker

ROOT = Path(__file__).resolve().parents[1]
SCHEMA = json.loads((ROOT / 'schemas/content.schema.json').read_text())
VALIDATOR = Draft202012Validator(SCHEMA, format_checker=FormatChecker())


def read_content(path):
    text = Path(path).read_text(encoding='utf-8')
    if Path(path).suffix == '.json':
        return json.loads(text)
    if not text.startswith('---\n'):
        raise ValueError('Markdown requires JSON metadata between --- delimiters')
    metadata, sep, body = text[4:].partition('\n---\n')
    if not sep:
        raise ValueError('Missing closing front matter delimiter')
    data = json.loads(metadata)
    if not isinstance(data, dict):
        raise ValueError('Metadata must be an object')
    data['body'] = body.strip()
    return data


def validate_records(records):
    errors, warnings, ids, slugs = [], [], set(), set()
    for path, data in records:
        for error in VALIDATOR.iter_errors(data):
            errors.append(f'{path}: {list(error.path)} {error.message}')
        if not isinstance(data, dict):
            continue
        for key, seen in [('id', ids), ('slug', slugs)]:
            value = data.get(key)
            if isinstance(value, str):
                if value in seen:
                    errors.append(f'{path}: duplicate {key}: {value}')
                seen.add(value)
        title, description = data.get('title'), data.get('description')
        if isinstance(title, str) and len(title) > 70:
            warnings.append(f'{path}: title longer than 70 characters')
        if isinstance(description, str) and not 50 <= len(description) <= 170:
            warnings.append(f'{path}: description outside 50–170 characters')
        body = data.get('body')
        if isinstance(body, str) and len(body.split()) < 80:
            warnings.append(f'{path}: editorial content under 80 words')
    return errors, warnings


def validate_directory(directory):
    records, errors = [], []
    for path in sorted(Path(directory).rglob('*')):
        if path.suffix not in ('.json', '.md') or not path.is_file():
            continue
        try:
            records.append((str(path), read_content(path)))
        except (ValueError, OSError) as exc:
            errors.append(f'{path}: {exc}')
    failures, warnings = validate_records(records)
    return records, errors + failures, warnings
