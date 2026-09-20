# Phase 1 delivery — ChineseFortuneTools.online V2

## 1. Current architecture
GitHub Pages legacy main:/ deployment, confirmed by GitHub API. 177 static HTML pages, client-side JS and JSON endpoints. Python supports sitemap/data operations; no original package.json or HTML compilation framework. Production homepage HTTP 200. Baseline commit: 48a074dedc3bf0de3c9d6d5c03d9a0af689adb12.

## 2. Files created
See inventory below. New root areas: apps/main-site, content, workers, docs, reports, tests; new scripts/schema/read-only workflow and pinned Python requirements.

## 3. Files modified
Zero pre-existing tracked files modified. All 206 original public files have identical SHA-256 hashes. Existing workflows, canonical URLs, HTML, robots, sitemap, assets and service worker are unchanged. No credentials copied from pw.txt.

## 4. Monorepo migration status
Ready for staged migration; production remains at root. apps/main-site holds isolated preview config only. No file movement, DNS change or production deployment switch.

## 5. Content library
Three records (festival Markdown, zodiac JSON, greeting Markdown), global IDs/slugs and JSON Schema 2020-12. All pass; one intentional thin-draft warning. Catalog builds internally; automatic publishing and AI generation are disabled/not implemented.

## 6. SEO bot
Replaceable Crawler, LocalCrawler, StaticCrawler and explicit unimplemented Browser Run adapter. reports/seo/latest.json and latest.md audit 177 local pages: 28 passed, 148 warned, 1 failed. Existing failure: /dashboard/ lacks canonical. Most warnings are existing monthly pages outside the curated sitemap; do not add them indiscriminately. Local result statuses are inferred from files. Live sample at reports/seo/live covers 28 HTTP pages: 27 passed, 1 warned, 0 failed; bounded partial crawl, not full-site/rendered proof. Issue deduplication uses rule + URL; no issues created.

## 7. Tests executed
32 offline unit/integration tests passed; content validation, catalog build, static packaging, sitemap candidate, robots checks, production integrity and credential-pattern scan passed. No new SEO regression against the existing baseline. The unchanged legacy sitemap builder ran successfully in a disposable copy, never against the production sitemap. The unchanged legacy JSON validator has 2 existing failures (season.date extra; ideas.updated missing); these are not new content-library failures and were not hidden or auto-fixed. Wrangler 4.134.0 dry run passed. Local Wrangler HTTP checks passed for all 206 files with byte identity and preview noindex; missing route returned 404. Details: reports/preview-verification.json.

## 8. Workers Builds readiness
Isolated preview config/build/deploy commands/watch paths documented and dry-run tested. GitHub repository integration and remote Cloudflare builds are not enabled. No production domain routes configured. Future seo-bot and content-pipeline Workers still need runtime entrypoints before deployment.

## 9. Browser Run readiness
Interface and binding/permission/robots/limits/cost-control plan documented. No paid rendering, public /crawl endpoint or schedule enabled. Python audit engine can consume rendered Page records from a future JavaScript Worker.

## 10. Risks
- Existing pr-preview workflow writes main on PR creation; do not open even a draft PR yet.
- GitHub Pages root deployment may expose new content/docs directories after merge; configure explicit exclusions or artifact publishing before merge.
- Existing scheduled workflows and sitemap builder retain their prior behavior; legacy schema validation still fails as described above.
- Static audits do not execute JavaScript or establish rendered accessibility. Live audit is bounded; orphan checks are candidates. Pattern scanning cannot prove absence of every credential format.
- Integrity manifest intentionally freezes original files for Phase 1; future edits require reviewed manifest evolution.

## 11. Exact next recommended task
Prepare a narrowly scoped replacement for .github/workflows/pr-preview.yml that uploads preview artifacts without checking out/pushing main. Verify its trigger and permissions before any V2 PR. Include a reviewed GitHub Pages exclusion plan before merging V2. Stop here: no automatic AI content generation.

## Created file inventory
- `.github/workflows/phase1-validation.yml`
- `.gitignore`
- `apps/main-site/wrangler.preview.jsonc`
- `content/festivals/chinese-new-year.md`
- `content/greetings/new-year.md`
- `content/tools/.gitkeep`
- `content/zodiac/goat.json`
- `docs/ARCHITECTURE_BEFORE_AUTOMATION.md`
- `docs/CLOUDFLARE_BROWSER_RUN.md`
- `docs/CONTENT_MODEL.md`
- `docs/GITHUB_ISSUE_INTEGRATION.md`
- `docs/MONOREPO_MIGRATION.md`
- `docs/PHASE1_RUNBOOK.md`
- `docs/WORKERS_BUILDS_SETUP.md`
- `docs/production-baseline.json`
- `docs/seo-baseline.json`
- `reports/preview-verification.json`
- `reports/seo/latest.json`
- `reports/seo/latest.md`
- `reports/seo/live/latest.json`
- `reports/seo/live/latest.md`
- `requirements-phase1.txt`
- `schemas/content.schema.json`
- `scripts/build-content.py`
- `scripts/build-preview.py`
- `scripts/build-site.py`
- `scripts/check-seo-regressions.py`
- `scripts/content_lib.py`
- `scripts/generate-sitemap.py`
- `scripts/validate-content.py`
- `scripts/validate-seo.py`
- `scripts/verify-safety.py`
- `tests/test_phase1.py`
- `workers/content-pipeline/README.md`
- `workers/seo-bot/audit.py`
- `workers/seo-bot/crawler.py`
- `docs/PHASE1_DELIVERY.md`
