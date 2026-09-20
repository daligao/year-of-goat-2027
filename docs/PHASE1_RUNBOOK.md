# Run Phase 1 locally

From this repository:
```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-phase1.txt
.venv/bin/python scripts/validate-content.py
.venv/bin/python -m unittest discover -s tests -v
.venv/bin/python scripts/build-content.py
.venv/bin/python scripts/build-site.py
.venv/bin/python scripts/verify-safety.py
.venv/bin/python scripts/validate-seo.py
.venv/bin/python scripts/check-seo-regressions.py
```

Optional bounded read-only HTTP audit:
```sh
.venv/bin/python scripts/validate-seo.py --live --max-pages 28 --output reports/seo/live
```

Optional isolated preview packaging / dry run:
```sh
.venv/bin/python scripts/build-preview.py
npx --yes wrangler@4.134.0 deploy --dry-run --config apps/main-site/wrangler.preview.jsonc
```

Do not use the old scripts/build.py for this pipeline: it overwrites root sitemap.xml even on unknown command arguments. The old build can be tested only in a disposable directory. The new generate-sitemap.py writes a byte-preserving candidate into .build, never the root sitemap. No AI generation or publication is implemented.

Local audit covers all committed HTML in the public manifest. HTTP status is inferred locally, so use live reports for response evidence. Live crawling is bounded and non-rendering: query variants, off-origin destinations and links created only by JavaScript are out of scope. Orphan detection is a candidate heuristic within the audited graph. JSON-LD presence is checked, not semantic/schema validity. Existing findings are reported, not automatically fixed.

Credential scan checks common token/private-key patterns and forbidden credential filenames. It cannot prove absence of every secret format. pw.txt was never copied into this repository. Sensitive values must never be written into reports, git remotes or docs.
