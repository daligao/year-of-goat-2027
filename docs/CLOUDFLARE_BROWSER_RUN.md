# Browser Run preparation

Status: interface ready, adapter explicitly raises NotImplementedError. No browser sessions, paid service or deployed endpoint is used by local tests.

The crawler contract is Crawler.crawlSite(seeds), fetchPage(url), getLinks(page), getRenderedHTML(page). StaticCrawler fetches HTTP and LocalCrawler audits an isolated file build. A future CloudflareBrowserRunCrawler must emit the same Page shape and report actual rendered HTML/status/headers/final URL. A Worker-hosted JavaScript renderer can return these records to the Python audit engine; Python modules here are not directly deployable JavaScript Workers.

Cloudflare configuration for a future renderer includes `"browser": {"binding": "BROWSER"}` and a current compatibility date. Use Cloudflare's supported Puppeteer/Playwright integration or Quick Actions. Add remote mode only when intentionally exercising the account service. Keep this separate from the static main-site preview configuration.

Permissions: a scoped API token needs the account Browser Rendering - Edit permission for REST operations; deployment separately needs Workers Scripts Edit and account access. Use GitHub/Cloudflare secret stores, never files in the repository. Runtime binding access does not require embedding a REST API token in page code.

Recommended starting policy: origin allowlist restricted to https://chinesefortunetools.online, max 25 pages, depth 2, concurrency 1, 12-second navigation timeout, 2 MB HTML cap, 120-second job deadline, no retries by default. Fetch robots.txt first and stop if policy cannot be established; obey agent directives and crawl delays. Recheck each redirect and destination, exclude private routes, query permutations and off-origin requests. Close browsers in finally blocks; cache/deduplicate URLs and cap job frequency and report retention. Current static crawler uses a 150-request cap, a page cap and 0.2-second minimum spacing.

A future authenticated POST /crawl could enqueue a bounded job and return an ID; it must not accept arbitrary target origins. Deduplicate concurrent jobs and require explicit invocation. Cloudflare's own asynchronous /crawl service could serve as an alternative adapter; account quotas and retention must be checked before enabling it. No recurring schedule is added in Phase 1.

Monitor browser seconds, request counts and failures; use account spending controls and a kill switch before enabling recurring work. Do not assume that the free quota is unlimited or that static tests prove rendered correctness.

Official sources checked 2026-09-20:
- https://developers.cloudflare.com/browser-run/reference/wrangler/
- https://developers.cloudflare.com/browser-run/get-started/
- https://developers.cloudflare.com/browser-run/limits/
