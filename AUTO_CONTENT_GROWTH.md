# Automatic Content Growth System

This document explains the automatic content publishing system for **ChineseFortuneTools.online** and where to change it later.

## Purpose

ChineseFortuneTools.online is the experimental traffic-capture site.

The automatic content system is designed to:

1. Publish useful English long-tail content about Chinese culture, Chinese zodiac, Feng Shui, festivals, lucky symbolism, and related topics.
2. Avoid duplicating the core content already on ChineseFortuneTools.com.
3. Send qualified readers from **chinesefortunetools.online** to the most relevant tool or deeper page on **chinesefortunetools.com**.
4. Track those outbound visits with UTM parameters.

The main business funnel is:

```
Google / discovery
    ↓
ChineseFortuneTools.online article
    ↓
contextual CTA
    ↓
ChineseFortuneTools.com tool / hub
```

## Repository

Repository:

```
daligao/year-of-goat-2027
```

Two branches are involved:

- `main` — production website files and GitHub Actions publishing.
- `cloudflare-lab` — Cloudflare Worker source for AI generation and SEO automation.

## Automatic publishing schedule

AI generation is configured for:

```
17 1 * * 2,5
```

This is Tuesday and Friday at 01:17 UTC, approximately **09:17 China time**.

GitHub publishing is configured for:

```
37 1 * * 2,5
```

This is Tuesday and Friday at 01:37 UTC, approximately **09:37 China time**.

The 20-minute gap gives the Worker time to generate and save the article before GitHub Actions retrieves it.

Expected rate:

- 2 articles per week
- roughly 8–9 articles per month
- roughly 100 articles per year

## Cloudflare Worker

Worker:

```
cft-online-seo-bot
```

Public endpoint:

```
https://cft-online-seo-bot.love0972.workers.dev/
```

The same Worker currently contains both SEO audit features and the content-generation engine.

### Worker source

Branch:

```
cloudflare-lab
```

Main files:

```
workers/seo-bot/src/index.js
workers/seo-bot/src/content.js
workers/seo-bot/wrangler.jsonc
```

### Where to change AI topics, rules, prompt, or model

Edit:

```
workers/seo-bot/src/content.js
```

Important settings in this file include:

- AI model
- allowed content categories
- article JSON schema
- topic-selection prompt
- duplicate-topic avoidance
- minimum article length
- related-page requirements
- funnel selection
- cultural/safety rules

Current model:

```
@cf/meta/llama-3.3-70b-instruct-fp8-fast
```

Current allowed categories:

- Chinese Zodiac
- Feng Shui
- Festivals & Customs
- Lucky Symbols
- Chinese Culture

The AI is instructed to treat zodiac, Feng Shui, lucky numbers, and similar material as traditional cultural beliefs rather than scientifically established facts.

## Cloudflare bindings

Configured in:

```
workers/seo-bot/wrangler.jsonc
```

Bindings:

```
BROWSER       Cloudflare Browser Run
AI            Workers AI
CONTENT_QUEUE Workers KV
```

The Cron schedule is also configured in this file.

If you ever want to change publishing frequency, this is one of the files to edit.

## Generated-content storage

The Worker saves generated article JSON into KV.

Important KV keys:

```
content:latest
content:history
content:item:<article-id>
```

Useful Worker endpoints:

```
/content/status
/content/latest
```

Examples:

```
https://cft-online-seo-bot.love0972.workers.dev/content/status
https://cft-online-seo-bot.love0972.workers.dev/content/latest
```

## GitHub automatic publisher

Production branch:

```
main
```

Publisher script:

```
scripts/publish_ai_content.py
```

This script:

1. Downloads the latest article JSON from the Worker.
2. Validates it.
3. Rejects unsafe or low-quality output.
4. Converts the structured article into static HTML.
5. Adds contextual CTAs to ChineseFortuneTools.com.
6. Writes the article to `/learn/<slug>/index.html`.
7. Updates the generated-content log.
8. Rebuilds the `/learn/` hub.

## GitHub Actions workflow

File:

```
.github/workflows/ai-content-publish.yml
```

This workflow runs automatically Tuesday and Friday.

It:

1. Checks out `main`.
2. Runs `scripts/publish_ai_content.py`.
3. Rebuilds `sitemap.xml`.
4. Rebuilds Pagefind.
5. Commits any new article.
6. Pushes it to `main`.

If you want to change the publishing time, edit the `schedule.cron` value in this workflow.

## Sitemap support

File:

```
scripts/build.py
```

This file has been updated so that automatic content under:

```
/learn/
```

is included in the sitemap.

It recognizes:

```
learn/index.html
learn/*/index.html
```

This is important because rebuilding the sitemap should not remove automatically generated pages.

## Published article structure

Automatic pages live at:

```
/learn/<slug>/
```

Hub:

```
https://chinesefortunetools.online/learn/
```

Each article should contain:

- unique title
- meta description
- canonical URL
- one H1
- 5–8 substantive sections
- at least 3 FAQs
- internal links
- cultural-context disclaimer
- structured Article schema
- FAQ schema
- contextual CTA to ChineseFortuneTools.com
- closing CTA to ChineseFortuneTools.com

The generator targets roughly 900–1,400 English words, while the publisher rejects articles below about 700 words.

## Funnel mapping to ChineseFortuneTools.com

The publisher maps content to the most relevant destination.

Current mapping:

```
zodiac
→ https://chinesefortunetools.com/chinese-zodiac/

bazi
→ https://chinesefortunetools.com/bazi-calculator/

five-elements
→ https://chinesefortunetools.com/five-elements/

feng-shui
→ https://chinesefortunetools.com/feng-shui/

2027
→ https://chinesefortunetools.com/2027/

home
→ https://chinesefortunetools.com/
```

To change these destinations or CTA wording, edit:

```
scripts/publish_ai_content.py
```

Look for:

```
FUNNELS = {
    ...
}
```

## UTM tracking

Automatic CTA links include:

```
utm_source=chinesefortunetools.online
utm_medium=content
utm_campaign=auto-growth
utm_content=<article-slug>
```

Example:

```
https://chinesefortunetools.com/five-elements/
?utm_source=chinesefortunetools.online
&utm_medium=content
&utm_campaign=auto-growth
&utm_content=chinese-zodiac-element-birth-year
```

Use these parameters in GA4 to measure which automatic articles send traffic to the main site.

## Content log

Production log:

```
data/ai-content-log.json
```

This records generated/published articles and helps avoid duplicates.

## First smoke-test article

The first test article is:

```
https://chinesefortunetools.online/learn/chinese-zodiac-element-birth-year/
```

Title:

```
How to Find Your Chinese Zodiac Element from Your Birth Year
```

Its funnel destination is:

```
https://chinesefortunetools.com/five-elements/
```

This test confirms the intended article → contextual CTA → main-site-tool pattern.

## If you want to change something later

### Change article topics or editorial style

Edit:

```
workers/seo-bot/src/content.js
```

Branch:

```
cloudflare-lab
```

### Change the AI model

Edit:

```
workers/seo-bot/src/content.js
```

Change:

```
const MODEL = "..."
```

### Change generation frequency

Edit:

```
workers/seo-bot/wrangler.jsonc
```

### Change publishing frequency

Edit:

```
.github/workflows/ai-content-publish.yml
```

### Change CTA destinations or wording

Edit:

```
scripts/publish_ai_content.py
```

Look for:

```
FUNNELS
```

### Change article HTML design

Edit:

```
scripts/publish_ai_content.py
```

Look for:

```
render_article()
```

### Change the /learn/ listing design

Edit:

```
scripts/publish_ai_content.py
```

Look for:

```
render_index()
```

### Change sitemap behavior

Edit:

```
scripts/build.py
```

### Stop automatic publishing

Disable or remove the schedule in:

```
.github/workflows/ai-content-publish.yml
```

and/or remove the content-generation Cron in:

```
workers/seo-bot/wrangler.jsonc
```

## Important design rule

ChineseFortuneTools.online should not become a copy of ChineseFortuneTools.com.

The intended division is:

```
ChineseFortuneTools.online
= experimental long-tail content + lightweight tools + traffic acquisition

ChineseFortuneTools.com
= main brand + deeper tools + calculators + destination site
```

Automatic content should therefore answer long-tail questions and create a natural next action that leads to the relevant main-site tool.


## Growth Dashboard and CTA click tracking

Automatic article CTAs no longer link directly to the main site.

They first pass through the Cloudflare Worker:

```
https://cft-online-seo-bot.love0972.workers.dev/go/<funnel>?article=<slug>
```

The Worker:

1. validates the funnel key and article slug;
2. increments click counters in `CONTENT_QUEUE` KV;
3. redirects with HTTP 302 to the matching ChineseFortuneTools.com destination;
4. automatically adds the normal UTM parameters.

Example:

```
/go/five-elements?article=chinese-zodiac-element-birth-year
```

redirects to the Five Elements tool with:

```
utm_source=chinesefortunetools.online
utm_medium=content
utm_campaign=auto-growth
utm_content=chinese-zodiac-element-birth-year
```

### Growth dashboard

Open:

```
https://cft-online-seo-bot.love0972.workers.dev/growth-dashboard
```

JSON endpoint:

```
https://cft-online-seo-bot.love0972.workers.dev/growth/status
```

The dashboard reads the production article log from:

```
https://chinesefortunetools.online/data/ai-content-log.json
```

and combines it with click counters stored in Workers KV.

Current dashboard fields:

- published article
- publish date
- funnel key
- main-site destination
- tracked CTA clicks
- direct links to the article and target page

### Click counter keys

Workers KV uses keys like:

```
growth:click:<article-slug>:<funnel-key>
growth:daily:<YYYY-MM-DD>:<article-slug>:<funnel-key>
```

The first is the lifetime total.
The second keeps a daily bucket for future trend charts.

### Where to change tracking behavior

Worker tracking and dashboard:

```
cloudflare-lab
workers/seo-bot/src/index.js
```

Generated CTA URL format:

```
main
scripts/publish_ai_content.py
```

The current smoke-test article was also migrated to the tracked redirect so it can start accumulating clicks immediately.
