# Daily Chinese Zodiac Fortune Card

Static GitHub Pages route: https://chinesefortunetools.online/daily-zodiac-card/

No PHP, AI service, database, login, or birth-data storage. Calendar lookup and deterministic card assembly run locally. Birth year/month never enter request bodies, URLs, image filenames, or analytics parameters. Day 15 is assumed, and the Lunar New Year boundary month is explicitly flagged. The device's local date selects the daily card.

## Verification

Serve the repository root with `python3 -m http.server 8765 --bind 127.0.0.1`, then run:

```sh
node --test tests/daily-zodiac-card.test.mjs
node tests/daily-zodiac-card.browser.mjs
```

Browser checks require Playwright Chromium; `PLAYWRIGHT_MODULE` can point to an existing `playwright/index.mjs`. No runtime package dependency was added to the website.

Passed: six unit tests, 8,760 sign/date cases, Lunar New Year boundaries, invalid inputs, three themes, 1080×1350 PNG downloads, six viewport widths (320–1280px), no horizontal overflow, same-date consistency, midnight rollover, local links, SEO metadata and structured data, data-loading failure, and share success/cancellation/fallback with mocked browser share APIs. Main sitemap contains the route; a temporary sitemap rebuild also retains it. Existing homepage and 2027 pages remain unchanged.

Analytics: existing `.online` GA4 property `G-HY5MJJP86Z`; `daily_zodiac_generate`, `daily_zodiac_download`, `daily_zodiac_share`; only custom parameters `zodiac` and `theme`. Analytics/ad storage denied, no automatic page view, no advertising personalization, sanitized page URL/referrer. Browser test inspects queued events with the GA loader stubbed; it does not claim GA dashboard receipt or real-device native share confirmation.

Existing repository checks: performance budget passes for all seven configured pages. Schema validation has two pre-existing failures: `data/season.json` contains an unexpected `date`, and `data/ideas.json` is missing `updated`. Both files are unchanged from the repository baseline. No unrelated repair is included.

The only modified existing files are `sitemap.xml` and `scripts/build.py` (four lines to preserve the new route on future sitemap rebuilds). All tool and test files are new. No existing 2027 greeting logic is changed.
