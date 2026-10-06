# Cloudflare SEO Bot / Auto Deploy Runbook

Last updated: 2026-09-20

This file is the "where do I change this later?" note for the ChineseFortuneTools.online Cloudflare + GitHub experiment.

## 1. Source of truth

GitHub repository:

- `daligao/year-of-goat-2027`

Current experiment branch:

- `cloudflare-lab`

SEO Bot source code:

- `workers/seo-bot/src/index.js`

Worker config:

- `workers/seo-bot/wrangler.jsonc`

Package config:

- `workers/seo-bot/package.json`

Important rule:

- Edit the Worker in GitHub, not directly in the Cloudflare dashboard.
- A push to the configured production branch triggers Cloudflare Workers Builds automatically.

---

## 2. Cloudflare Worker

Worker name:

- `cft-online-seo-bot`

Worker URL:

- https://cft-online-seo-bot.love0972.workers.dev

Cloudflare build settings:

- Repository: `daligao/year-of-goat-2027`
- Production branch: `cloudflare-lab`
- Root directory: `workers/seo-bot`
- Build command: none
- Deploy command: `npx wrangler deploy`
- Non-production version command: `npx wrangler versions upload`

Cloudflare page to check when a deployment fails:

- Workers & Pages
- Open `cft-online-seo-bot`
- Open `Builds`
- Open the latest build
- Read the final error lines

---

## 3. Auto deploy flow

Current flow:

```
Edit code in GitHub
        ↓
Commit to cloudflare-lab
        ↓
Cloudflare Workers Builds detects the push
        ↓
Installs dependencies
        ↓
Runs npx wrangler deploy
        ↓
Updates cft-online-seo-bot.love0972.workers.dev
```

There is no need to manually upload Worker code after a normal GitHub commit.

If the Worker still shows the old version:

1. Confirm the latest GitHub commit is on `cloudflare-lab`.
2. Check Cloudflare → `cft-online-seo-bot` → Builds.
3. Confirm the latest build used `cloudflare-lab`.
4. Confirm the build completed successfully.
5. Do not retry an old build created from `main`; trigger a new commit on `cloudflare-lab` instead.

---

## 4. Current dashboard and API endpoints

Visual dashboard:

- https://cft-online-seo-bot.love0972.workers.dev/dashboard

List configured sites:

- https://cft-online-seo-bot.love0972.workers.dev/sites

Check all 10 homepages:

- https://cft-online-seo-bot.love0972.workers.dev/sites?check=1

Full sitemap scan for one site:

- `/site-audit?site=cutdone.com&limit=20`
- Example:
  https://cft-online-seo-bot.love0972.workers.dev/site-audit?site=cutdone.com&limit=20

Browser Run check for one page:

- `/audit?url=https://cutdone.com/`
- Example:
  https://cft-online-seo-bot.love0972.workers.dev/audit?url=https://cutdone.com/

---

## 5. Current 10-site whitelist

The whitelist is defined at the top of:

- `workers/seo-bot/src/index.js`

Current sites:

1. chinesefortunetools.online
2. chinesefortunetools.com
3. cutdone.com
4. ordinarymantrying.com
5. chinatea101.com
6. chinarules101.com
7. chinesenamecraft.com
8. hotpot101.com
9. one-dollar.ordinarymantrying.com
10. zfuye.org

To add, remove, or rename a monitored site later:

1. Open `workers/seo-bot/src/index.js`.
2. Edit the `SITES` array near the top.
3. Commit to `cloudflare-lab`.
4. Cloudflare will redeploy automatically.

---

## 6. How scanning works

There are two different scan modes.

### Fast full-site scan

`/site-audit`

Uses normal Worker `fetch()` requests.

Use this for:

- sitemap scanning
- title
- meta description
- canonical
- robots meta
- H1 count
- basic HTTP failures

This mode is cheap and fast and should be used for routine monitoring.

### Browser Run

`/audit`

Uses Cloudflare Browser Run / headless Chrome.

Use this for:

- JavaScript-rendered pages
- confirming suspicious results
- checking pages that behave differently in a real browser

Do not use Browser Run for every page in every site unless necessary.

---

## 7. Sitemap discovery

The Worker currently tries these common sitemap locations:

- `/sitemap.xml`
- `/wp-sitemap.xml`
- `/sitemap_index.xml`

It supports normal sitemap URL sets and common sitemap indexes.

If a site has no supported sitemap, the Worker falls back to checking the homepage only.

---

## 8. Recommended monitoring cadence

Recommended for the current 10-site portfolio:

- Homepage health check: whenever the dashboard is opened; daily automation can be added later.
- Full sitemap audit: once per week.
- Extra full scan after:
  - a large deployment
  - theme changes
  - SEO plugin changes
  - URL structure changes
  - sitemap changes
  - content migrations
  - Cloudflare/DNS changes

There is little value in fully crawling every site every hour when the sites have not changed.

---

## 9. Current safety limits

The Worker intentionally has limits so it cannot become a public crawler.

Current protections include:

- only whitelisted domains
- HTTPS only
- per-site page limit
- limited sitemap index expansion
- direct-fetch batch scanning
- Browser Run reserved mainly for single-page validation

Do not remove the domain whitelist unless there is a specific reason.

---

## 10. If something breaks

### "root directory not found"

Check:

- Cloudflare Production branch is `cloudflare-lab`
- Root directory is `workers/seo-bot`

### package.json parser error

Open:

- `workers/seo-bot/package.json`

Check JSON commas and quotes.

### Wrangler JavaScript syntax error

Open:

- `workers/seo-bot/src/index.js`

Check the exact line Cloudflare reports.

Then commit the fix to `cloudflare-lab`; the new push should redeploy automatically.

### Worker URL still shows old code

Do not assume GitHub = deployed.

Always check:

- Cloudflare → Worker → Builds → latest build → Success

---

## 11. Current architecture

```
GitHub
daligao/year-of-goat-2027
        │
        └── cloudflare-lab
              │
              └── workers/seo-bot
                      │
                      ▼
             Cloudflare Workers Builds
                      │
                      ▼
                Wrangler deploy
                      │
                      ▼
          cft-online-seo-bot.workers.dev
                 │              │
                 │              └── Browser Run
                 │
                 ├── /dashboard
                 ├── /sites
                 ├── /sites?check=1
                 ├── /site-audit
                 └── /audit
```

---

## 12. Planned next upgrade

Useful next step when needed:

- scheduled weekly scan
- save historical scan results
- dashboard trend display
- only open a GitHub Issue when a real regression is detected

Do not build this until the live dashboard has been used for a while and the current rules have proven reliable.
