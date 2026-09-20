# Architecture before automation

Audit completed 2026-09-20 before implementation.

Repository: daligao/year-of-goat-2027, branch main. GitHub Pages API confirms legacy deployment from main:/ and custom domain chinesefortunetools.online. No Cloudflare deployment configuration or package.json exists. DNS/account-side Cloudflare settings have not been independently verified.

Site consists of committed static HTML, client-side JS, JSON datasets/API endpoints, assets, manifest and service worker. The 2027/sign/month pages are committed generated pages; no generator for these is present. Python scripts/build.py rewrites sitemap from tools + monthly pages; it is not an HTML compiler. requirements.txt contains jsonschema. Pagefind is installed dynamically in the existing build workflow; no committed search index exists.

All nine workflows inspected: build (writes sitemap/search to branch), precompute (annual JSON writes), seasonal (daily JSON writes), release (monthly release/changelog writes), rollback (manual production write), pr-preview (PR event writes preview files to main), pr-quality-gate, dependency-review and codeql. Runbook mentions additional workflows that are absent. pr-quality-gate invokes an unsupported seo_check action: the build script falls back to sitemap rewriting.

robots.txt permits crawling and points to the production sitemap. Existing sitemap is hand-curated; regeneration by the old script can discard hub/editorial entries. Preserve it byte-for-byte.

Moving root files would break GitHub Pages main:/, relative resource references, sitemap and service-worker scope. Phase 1 leaves production at root. apps/main-site only holds an opt-in isolated Workers preview configuration. New tooling outputs to ignored .build; content examples are never rendered or published.

Do not open a PR until the existing production-writing pr-preview workflow is safely replaced or disabled on main. Branch push alone does not match its PR trigger. New validation workflow has contents:read and no deployment/issue creation. Existing scheduled automations remain unchanged.

Post-implementation smoke checks of the unchanged legacy validator revealed pre-existing schema failures: data/season.json has an additional date property; data/ideas.json lacks updated. Both remain unchanged. New content-library checks pass independently. Root homepage HTTP response was 200 with Server: GitHub.com.
