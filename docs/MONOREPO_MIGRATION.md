# Migration status

Phase 1 is additive. Root HTML/JSON/assets and all existing scripts/workflows remain in place. apps/main-site holds preview configuration only; workers/seo-bot holds a Python CLI audit engine, not a deployed Cloudflare Worker; workers/content-pipeline documents its inactive boundary. No npm workspace/package.json is required for this Python/static repository.

Public-file manifest docs/production-baseline.json records 206 file hashes from commit 48a074dedc3bf0de3c9d6d5c03d9a0af689adb12. It is deliberately immutable for Phase 1. build-site.py packages only those files, fails on changes, and never includes content/docs/reports/credentials. New public routes require an explicit reviewed manifest update in a future phase. This is a preservation gate, not a general-purpose long-term publisher.

Future migration sequence:
1. Replace legacy PR preview production writes with artifact-only previews.
2. Validate isolated Workers preview routing, assets, redirects, 404s and service-worker behavior against GitHub Pages.
3. Plan apps/main-site movement with explicit build-root and public-path tests.
4. Only after review, switch deployment separately with DNS/rollback plan.

GitHub Pages may serve newly merged non-underscore directories from repository root. Content examples are non-sensitive, but should not become public accidentally. Before any merge, establish a reviewed GitHub Pages exclusion configuration or an explicit artifact deployment. Phase 1 deliberately stays on a feature branch, so it does not expose the new library on production.
