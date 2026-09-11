"""
Validates all data JSON files against their schemas.
Run locally or in CI. Exits 1 if any validation fails.
"""
import json, sys, pathlib

try:
    import jsonschema
except ImportError:
    print("Install jsonschema: pip install jsonschema")
    sys.exit(1)

CHECKS = [
    ("data/tools.json",   "schemas/tools.schema.json"),
    ("data/metrics.json", "schemas/metrics.schema.json"),
    ("data/season.json",  "schemas/season.schema.json"),
    ("data/ideas.json",   "schemas/ideas.schema.json"),
]

CONFIG_CHECK = ("https://raw.githubusercontent.com/daligao/site-config/main/config.json",
                "schemas/config.schema.json")

errors = 0
for data_path, schema_path in CHECKS:
    dp = pathlib.Path(data_path)
    sp = pathlib.Path(schema_path)
    if not dp.exists():
        print(f"SKIP {data_path} (not found)")
        continue
    if not sp.exists():
        print(f"SKIP {data_path} (schema {schema_path} not found)")
        continue
    data   = json.loads(dp.read_text())
    schema = json.loads(sp.read_text())
    try:
        jsonschema.validate(data, schema)
        print(f"OK   {data_path}")
    except jsonschema.ValidationError as e:
        print(f"FAIL {data_path}: {e.message} (at {list(e.absolute_path)})")
        errors += 1

if errors:
    print(f"\n{errors} schema validation error(s). Fix before merging.")
    sys.exit(1)
else:
    print("\nAll schemas valid.")
