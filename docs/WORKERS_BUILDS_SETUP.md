# Workers Builds readiness

Current production: GitHub Pages legacy build, main branch, root /. GitHub API verified custom domain chinesefortunetools.online. No production Cloudflare connection, DNS change or deploy was made. Production must remain on GitHub Pages until routing compatibility and rollback are reviewed.

The static asset preview was validated with Wrangler 4.134.0 deploy --dry-run. Local Wrangler HTTP verification also served all 206 public files byte-for-byte (including 177 HTML pages), returned preview-only noindex headers, and returned 404 for a missing route. This does not verify cloud account authorization, remote edge behavior or browser JavaScript interactions. Account-specific Builds/GitHub integration is still unconfigured.

Isolated preview configuration:
- Repository: daligao/year-of-goat-2027; branch: codex/online-v2-phase1.
- Worker: cft-main-site-v2-preview; root directory: repository root, not apps/main-site.
- Build command: `python3 scripts/build-preview.py` (standard library only).
- Deploy command: `npx --yes wrangler@4.134.0 deploy --config apps/main-site/wrangler.preview.jsonc`.
- Non-production version command when enabled: `npx --yes wrangler@4.134.0 versions upload --config apps/main-site/wrangler.preview.jsonc`.

These are setup instructions, not an instruction to run production deployment. In Workers Builds, grant the GitHub app access only to this repository and choose the feature branch as the isolated Worker's deployment branch. The site's production branch remains main on GitHub Pages. Do not connect the production custom domain or import main-site routes. Configure a supported Python 3 build image and Node 22+; confirm image versions in the dashboard. Preview assets include response-level X-Robots-Tag: noindex, nofollow; source HTML, canonical URLs and production robots remain untouched.

Build watch paths (relative to repository root):
| Future Worker | Include | Exclude |
|---|---|---|
| main-site preview | `*` | `.github/*`, `content/*`, `workers/*`, `reports/*`, `tests/*`, `.venv/*` |
| seo-bot (not deployable yet) | `workers/seo-bot/*`, `scripts/validate-seo.py`, `requirements-phase1.txt`, `schemas/*` | `reports/*` |
| content-pipeline (not implemented) | `workers/content-pipeline/*`, `content/*`, `schemas/content.schema.json`, `scripts/content_lib.py`, `scripts/build-content.py`, `scripts/validate-content.py`, `requirements-phase1.txt` | `reports/*` |

The main-site preview includes docs/production-baseline.json and build scripts by design. Workers Builds watch paths are dashboard settings, not wrangler fields. Future Workers require their own entrypoint/configuration before connecting Builds. Do not claim all three are runnable today.

Before cutover: test all 177 routes including /index.html and trailing-slash redirects, local/internal assets, JSON API endpoints, MIME types, CNAME handling, 404s, headers and sw.js scope. Compare response bodies to the baseline. Preserve all 27 sitemap entries. Remove preview-only noindex at a separately reviewed production configuration step. Keep GitHub Pages and DNS values available for rollback; do not delete the existing deployment.

Sources:
- https://developers.cloudflare.com/workers/ci-cd/builds/configuration/
- https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/
- https://developers.cloudflare.com/workers/ci-cd/builds/build-image/
