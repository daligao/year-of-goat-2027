# FREE INFRASTRUCTURE MAP: Zero-Cost and Near-Zero-Cost Stack for Small Cultural Websites

Research date: 2026-09-12
Portfolio: chinesefortunetools.online, chinesefortunetools.com, chinarules101.com, hotpot101.com

---

## CATEGORIES

---

## 1. STATIC HOSTING

### Cloudflare Pages
- **Free tier**: Unlimited bandwidth, 500 builds/month, 1 custom domain
- **Limitation**: Build time 20 min max; no server-side PHP
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (static files are portable)
- **Best use**: Host all static HTML tools, landing pages, blog content
- **Portfolio fit**: chinesefortunetools.online (fully static tools), hotpot101.com (recipe pages)

### GitHub Pages
- **Free tier**: 1GB storage, 100GB bandwidth/month, 1 site per account (+ project sites)
- **Limitation**: Public repos only (for free), no server-side code
- **Commercial**: Technically allowed but ToS gray area for commercial sites
- **Credit card**: No
- **Lock-in risk**: Low
- **Best use**: Docs, landing pages, open-source project sites
- **Portfolio fit**: Supplementary pages, not primary site

### Netlify
- **Free tier**: 100GB bandwidth, 300 build minutes/month, 1 concurrent build
- **Limitation**: 125k serverless function invocations/month
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Medium (edge functions are Netlify-specific)
- **Best use**: Static sites with occasional form submissions or light API calls
- **Portfolio fit**: chinarules101.com (content site, low traffic expected)

### Vercel
- **Free tier**: 100GB bandwidth, unlimited deployments, 12 serverless regions
- **Limitation**: 100GB-hours compute/month; hobbyist license (commercial use requires Pro at $20/mo)
- **Commercial**: No (Hobby plan) — important caveat
- **Credit card**: No
- **Lock-in risk**: Medium
- **Best use**: Personal projects, demos — NOT for commercial sites on free tier
- **Portfolio fit**: Development previews only

### Surge.sh
- **Free tier**: Unlimited projects, custom domain, unlimited bandwidth
- **Limitation**: No SSL on free custom domains (only surge.sh subdomain gets SSL)
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low
- **Best use**: Quick deploys for static tools

---

## 2. SERVERLESS FUNCTIONS / BACKEND

### Cloudflare Workers
- **Free tier**: 100,000 requests/day, 10ms CPU per request, 128MB memory
- **Limitation**: 10ms CPU is tight for heavy computation; no persistent storage in Workers
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Medium (Workers API is proprietary)
- **Best use**: API endpoints, redirect rules, lightweight proxy
- **Portfolio fit**: Chinese calendar API, name lookup API, fortune tool backend

### Netlify Functions (AWS Lambda under the hood)
- **Free tier**: 125,000 invocations/month, 100 hours runtime
- **Limitation**: 10 second timeout on free tier
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (standard Node/Python Lambda format)
- **Best use**: Form processing, data transformation
- **Portfolio fit**: PayPal webhook handler for ChineseNameCraft

### Vercel Edge Functions
- **Free tier**: 500,000 invocations/month
- **Limitation**: Commercial use requires Pro plan
- **Commercial**: No (free tier)
- **Lock-in risk**: High
- **Best use**: Development only

### Deno Deploy
- **Free tier**: 100,000 requests/day, 100GB outbound/month
- **Limitation**: Deno runtime only (TypeScript/JavaScript)
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (standard TypeScript)
- **Best use**: TypeScript API functions with zero cold starts
- **Portfolio fit**: Fast API responses for tool endpoints

### Modal.com
- **Free tier**: $30/month compute credit (= ~30 GPU-hours on T4, or thousands of CPU requests)
- **Limitation**: Credit expires monthly, no rollover
- **Commercial**: Yes
- **Credit card**: Yes (required but won't be charged within free credit)
- **Lock-in risk**: Low (Python-native, portable)
- **Best use**: AI inference (run Qwen/ChatGLM), batch processing
- **Portfolio fit**: Power cheap AI features on ChineseFortuneTools (BaZi AI interpretation)

---

## 3. DATABASES

### PlanetScale (MySQL)
- **Free tier**: 5GB storage, 1 billion row reads/month, 10M row writes/month
- **Limitation**: Branching workflow (different from standard MySQL); free tier changed in 2024 — verify current status
- **Commercial**: Yes
- **Credit card**: No (Hobby plan)
- **Lock-in risk**: Medium
- **Best use**: User accounts, favorites, saved names

### Turso (SQLite at the edge)
- **Free tier**: 500 databases, 9GB storage, 1 billion row reads/month
- **Limitation**: 1 location on free tier (low latency only near that location)
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (standard SQLite format)
- **Best use**: Read-heavy cultural data (calendar lookups, name database)
- **Portfolio fit**: ChineseNameCraft name database; ChineseFortuneTools calendar data

### Supabase (PostgreSQL)
- **Free tier**: 2 projects, 500MB database, 2GB bandwidth, 50MB file storage
- **Limitation**: Projects pause after 1 week of inactivity on free tier
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (standard PostgreSQL)
- **Best use**: Full-featured database with auth, realtime, and storage
- **Portfolio fit**: ChinaRules101 (articles + user auth); HotPot101 (recipe database)
- **Note**: Inactivity pause is a serious issue — use a cron ping to keep alive

### Neon (PostgreSQL serverless)
- **Free tier**: 0.5 GB storage, unlimited compute hours (scales to zero)
- **Limitation**: Scale-to-zero means cold start on first query (~500ms)
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (standard PostgreSQL)
- **Best use**: Low-traffic sites where occasional cold starts are acceptable
- **Portfolio fit**: Any site with <1000 daily users

### MongoDB Atlas
- **Free tier**: M0 cluster — 512MB storage, shared cluster
- **Limitation**: No dedicated resources, slow for complex queries
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: High (MongoDB query syntax)
- **Best use**: Flexible document storage (article drafts, tool configs)
- **Portfolio fit**: ChinaRules101 article CMS backend

### Cloudflare D1 (SQLite)
- **Free tier**: 5GB storage, 5M row reads/day, 100k row writes/day
- **Limitation**: Only accessible from Cloudflare Workers; no direct connection
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: High (Cloudflare-only access)
- **Best use**: Data accessed by Cloudflare Workers API endpoints
- **Portfolio fit**: Lean name database for ChineseNameCraft Workers API

---

## 4. OBJECT STORAGE (Files, Images, Audio)

### Cloudflare R2
- **Free tier**: 10GB storage, 1M class A operations (writes)/month, 10M class B (reads)/month, 0 egress cost
- **Limitation**: Must use S3-compatible API or Workers to access
- **Commercial**: Yes
- **Credit card**: Yes (required but not charged within free limits)
- **Lock-in risk**: Low (S3-compatible API)
- **Best use**: Image storage with zero egress cost — best in class
- **Portfolio fit**: Zodiac images, cultural artwork, font files for all 4 sites

### Backblaze B2
- **Free tier**: 10GB storage, 1GB egress/day free
- **Limitation**: Egress charges above free tier
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (S3-compatible)
- **Best use**: Backup storage, less frequent access

### Supabase Storage
- **Free tier**: 1GB storage, 2GB bandwidth (shared with database tier)
- **Limitation**: Tied to Supabase project (pauses with database)
- **Commercial**: Yes
- **Lock-in risk**: Medium

---

## 5. EMAIL

### Resend
- **Free tier**: 3,000 emails/month, 100/day limit
- **Limitation**: 100/day hard limit — blocks transactional bursts
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (standard SMTP/API)
- **Best use**: Transactional emails (order confirmation, password reset)
- **Portfolio fit**: ChineseNameCraft PayPal order confirmations

### Brevo (formerly Sendinblue)
- **Free tier**: 300 emails/day, unlimited contacts
- **Limitation**: Brevo branding on emails
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low
- **Best use**: Marketing emails, newsletters
- **Portfolio fit**: ChinaRules101 newsletter (if built)

### Mailgun
- **Free tier**: 100 emails/day for 3 months (then requires paid)
- **Limitation**: Very limited, time-restricted
- **Commercial**: Yes — but effectively requires paid plan
- **Best use**: Development/testing only

### Cloudflare Email Routing
- **Free tier**: Unlimited email forwarding to your Gmail/etc
- **Limitation**: Forwarding only — cannot send FROM custom domain
- **Commercial**: Yes
- **Credit card**: No
- **Best use**: Receive contact form emails at your custom domain → forward to Gmail
- **Portfolio fit**: All 4 sites — use this + Gmail for zero-cost contact forms

---

## 6. SEARCH

### Algolia
- **Free tier**: 10,000 records, 10,000 searches/month
- **Limitation**: 10k records is very small for large content sites
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: High (proprietary API)
- **Best use**: Small tool directories, product search
- **Portfolio fit**: ChinaRules101 article search (if <10k articles)

### Meilisearch Cloud
- **Free tier**: 100MB data, 10k documents, 10k searches/month
- **Limitation**: Very small
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (open source, self-hostable)
- **Best use**: Self-host on cheap VPS for better free tier

### Pagefind (static search)
- **Free tier**: Completely free, runs 100% client-side
- **Limitation**: Requires static site build; no real-time indexing
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: None (generates static index files)
- **Best use**: BEST choice for static sites — add full-text search to any static site
- **Portfolio fit**: HotPot101 recipe search, ChinaRules101 article search

---

## 7. ANALYTICS

### Plausible (self-hosted)
- **Free tier**: Self-host on $5 VPS = unlimited sites/traffic
- **Limitation**: Requires server to run
- **Commercial**: Yes
- **Credit card**: No (self-hosted)
- **Lock-in risk**: None (open source, your data)
- **Best use**: Privacy-friendly analytics without data leaving your control
- **Portfolio fit**: All 4 sites — replace Google Analytics for EU GDPR compliance

### Umami (self-hosted)
- **Free tier**: Self-host free; umami.is cloud has free tier (10k events/month)
- **Limitation**: Cloud free tier is very low
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: None (open source)
- **Best use**: Multiple sites from one self-hosted instance
- **Portfolio fit**: Run one Umami instance for all 4 sites on a $5 VPS

### Google Analytics 4
- **Free tier**: Unlimited (Google's business model is the data)
- **Limitation**: Privacy concerns; data goes to Google; GDPR issues in EU
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: High (proprietary, data lock-in)
- **Best use**: Already installed (G-DBR2PMLR61 per memory); keep for now
- **Portfolio fit**: Current setup — already on all tools

### Cloudflare Web Analytics
- **Free tier**: Unlimited, no sampling
- **Limitation**: Less detail than GA4; no conversion tracking
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Medium
- **Best use**: Basic traffic stats when site is on Cloudflare

---

## 8. MONITORING & UPTIME

### UptimeRobot
- **Free tier**: 50 monitors, 5-minute intervals
- **Limitation**: 5-minute checks (paid = 60-second); HTTP only on free
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low
- **Best use**: Basic uptime alerts via email/Telegram
- **Portfolio fit**: Monitor all 4 domains + Hostinger server

### Better Uptime (free tier)
- **Free tier**: 10 monitors, 3-minute intervals, phone call alerts
- **Limitation**: 10 monitors only
- **Commercial**: Yes
- **Credit card**: No
- **Best use**: Critical sites where phone call alert matters

### Checkly (monitoring + testing)
- **Free tier**: 10k check runs/month
- **Limitation**: Very limited
- **Best use**: Development testing only

---

## 9. CRON JOBS / SCHEDULED TASKS

### Cron-job.org
- **Free tier**: Unlimited cron jobs, 1-minute minimum interval
- **Limitation**: No HTTPS in free tier (plain HTTP calls only) — actually has HTTPS now
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: None
- **Best use**: Ping Supabase to prevent project pause; scheduled content updates; sitemap refresh
- **Portfolio fit**: Keep all Supabase projects alive; trigger nightly sitemap rebuilds

### GitHub Actions (scheduled workflows)
- **Free tier**: 2,000 minutes/month for public repos
- **Limitation**: Minimum 5-minute schedule interval (cron `*/5`)
- **Commercial**: Yes (public repos)
- **Credit card**: No
- **Best use**: Automated content generation, data refresh, deploy triggers
- **Portfolio fit**: Nightly content generation scripts for programmatic SEO pages

### Pipedream
- **Free tier**: 10,000 invocations/month
- **Limitation**: Public workflow only on free tier
- **Commercial**: Yes (but public workflows expose code)
- **Best use**: Zapier alternative for webhook automations

---

## 10. APIS (Free Tiers Worth Knowing)

### OpenRouter
- **Free tier**: Several models available at $0 — Qwen, Llama, Mistral with rate limits
- **Limitation**: Rate limited (varies by model)
- **Commercial**: Yes (check per-model terms)
- **Credit card**: No (for free models)
- **Best use**: AI features without Anthropic/OpenAI cost
- **Portfolio fit**: ChineseNameCraft "explain this name's meaning" feature on free tier

### Together AI
- **Free tier**: $1 credit on signup; then pay-per-use
- **Best use**: Run open-source models cheaply (Llama-3, Mistral)

### Hugging Face Inference API
- **Free tier**: Rate-limited inference on most models
- **Limitation**: Very slow on free tier, models queue up
- **Best use**: Low-traffic AI features, not production

### Exchange Rates API (exchangerate-api.com)
- **Free tier**: 1,500 requests/month
- **Best use**: If any site needs currency display

### IP Geolocation (ip-api.com)
- **Free tier**: 45 requests/minute, HTTP only
- **Best use**: Show user's location for regional content personalization

---

## 11. AUTHENTICATION

### Clerk
- **Free tier**: 10,000 monthly active users, all features
- **Limitation**: Clerk branding on hosted pages
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: High (proprietary SDK deeply integrated)
- **Best use**: User accounts for premium features
- **Portfolio fit**: ChineseNameCraft premium user accounts; ChinaRules101 VIP system

### Auth0 (Okta)
- **Free tier**: 7,500 monthly active users, 2 social connections
- **Limitation**: Limited social providers; 7,500 MAU cap
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: High
- **Best use**: Enterprise-style auth if expecting growth

### Supabase Auth
- **Free tier**: Unlimited users (within free project limits), email + social login
- **Limitation**: Tied to Supabase project (pauses with inactivity)
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low (standard JWT, open source)
- **Best use**: When already using Supabase for database — auth comes free
- **Portfolio fit**: Best choice if using Supabase

---

## 12. FORMS

### Formspree
- **Free tier**: 50 submissions/month, 1 form
- **Limitation**: Very low; 50 submissions gone in days with real traffic
- **Commercial**: Yes
- **Credit card**: No
- **Best use**: Contact form only (low volume)

### Web3Forms
- **Free tier**: Unlimited submissions, AJAX + email notifications
- **Limitation**: Requires Web3Forms branding in footer
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: Low
- **Best use**: Contact forms across all sites — genuinely generous free tier
- **Portfolio fit**: Replace any paid form service on all 4 sites

### Cloudflare Turnstile (CAPTCHA)
- **Free tier**: Unlimited — no cost ever
- **Limitation**: None meaningful
- **Commercial**: Yes
- **Credit card**: No
- **Best use**: Replace Google reCAPTCHA on all contact forms, login pages

---

## 13. IMAGE PROCESSING / CDN

### Cloudinary
- **Free tier**: 25 credits/month (~25,000 transformations or 25GB bandwidth)
- **Limitation**: 25 credits go fast with image optimization on every page load
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: High (proprietary URL transform syntax)
- **Best use**: Hero images, avatar generation, on-the-fly resizing
- **Portfolio fit**: Zodiac artwork transformations on ChineseFortuneTools

### imgix
- **Free tier**: No true free tier (30-day trial)
- **Best use**: Paid CDN for image-heavy sites

### Bunny.net CDN
- **Free tier**: No free tier but extremely cheap ($0.01/GB transfer, $1/month minimum)
- **Commercial**: Yes
- **Lock-in risk**: Low
- **Best use**: CDN for fonts, images, static assets across all sites — cheapest paid option

---

## 14. VECTOR DATABASES (for AI features)

### Pinecone
- **Free tier**: 1 index, 100k vectors, 1M reads/month
- **Commercial**: Yes
- **Credit card**: No
- **Lock-in risk**: High
- **Best use**: Semantic search (find similar Chinese names)
- **Portfolio fit**: ChineseNameCraft "names similar to X" feature

### Chroma (self-hosted)
- **Free tier**: Completely free, runs locally or on any VPS
- **Limitation**: Requires server
- **Lock-in risk**: None (open source)
- **Best use**: When you have a VPS already

### Supabase pgvector
- **Free tier**: Included in Supabase free tier (via PostgreSQL extension)
- **Commercial**: Yes
- **Lock-in risk**: Low (pgvector is standard extension)
- **Best use**: BEST choice — combines database + vector search in one free tier
- **Portfolio fit**: Semantic search for any of the 4 sites

---

## STACK DESIGNS

---

### STACK 1: "$0/MONTH WEBSITE STACK"

**Target**: Small cultural website, <10k visits/day, read-heavy, occasional forms

| Layer | Service | Why |
|-------|---------|-----|
| Hosting | Cloudflare Pages | Free, unlimited bandwidth, custom domain |
| Functions | Cloudflare Workers | 100k req/day free, same network as hosting |
| Database | Cloudflare D1 | SQLite, free 5GB, integrates with Workers |
| Files | Cloudflare R2 | 10GB free, zero egress cost |
| Email | Cloudflare Email Routing → Gmail | Free forwarding, send via Gmail SMTP |
| Search | Pagefind | Static, runs in browser, zero server cost |
| Analytics | Google Analytics 4 (G-DBR2PMLR61 already set up) | Free forever |
| Uptime | UptimeRobot free tier | 50 monitors, 5-min checks |
| Forms | Web3Forms | Unlimited submissions free |
| CAPTCHA | Cloudflare Turnstile | Unlimited free |
| Auth (if needed) | Supabase Auth | Included in free project |
| Cron | GitHub Actions + cron-job.org | Both free |
| AI (if needed) | OpenRouter free models (Qwen, Llama) | Some models $0 |

**Total cost**: $0/month  
**Limitations**: No PHP (so existing Hostinger sites stay on Hostinger); Workers 10ms CPU limit means no heavy AI inference; D1 only accessible through Workers

**Best for**: New static tool sites, landing pages, tool pages that can be pure client-side JavaScript

---

### STACK 2: "<$10/MONTH WEBSITE STACK"

**Target**: PHP-free, database-backed site, 50k visits/month, some AI features

| Layer | Service | Cost | Why |
|-------|---------|------|-----|
| Hosting | Cloudflare Pages | $0 | Same as above |
| Backend | Deno Deploy | $0 | 100k req/day free, TypeScript |
| Database | Supabase Pro → use free until needed | $0 (free tier) | PostgreSQL + auth + storage |
| Vector search | Supabase pgvector | $0 (included) | Semantic search |
| Files | Cloudflare R2 | $0 (within 10GB) | Zero egress |
| Email | Resend | $0 (3k/month) | Clean transactional emails |
| Search | Pagefind | $0 | Build-time static index |
| Analytics | Umami self-hosted | $4/month (Hetzner VPS) | Privacy-friendly, all sites |
| Uptime | UptimeRobot | $0 | |
| AI inference | Modal.com | $0 ($30 credit/month) | Qwen/ChatGLM on GPU |
| CDN assets | Bunny.net | ~$1-2/month | Font files, images |
| Domain | Already owned | $0 | |

**Total**: $5-7/month  
**What you get**: Full PostgreSQL with auth, semantic vector search, privacy-friendly analytics for all 4 sites on one $4 VPS, AI inference via GPU

**vs current Hostinger**: Hostinger ~$3-8/month for one site. This $7 stack covers all 4 sites with better performance.

---

## PORTFOLIO-SPECIFIC RECOMMENDATIONS

| Site | Current Gap | Recommended Fix | Cost |
|------|-------------|-----------------|------|
| chinesenamecraft | Orders table empty (no DB configured) | Supabase free tier for user data | $0 |
| chinesefortunetools.com | BaZi year limit bug (2024 cap) | Fix in existing PHP; add Turso for data | $0 |
| chinarules101.com | Content thin, few pages indexed | Add Pagefind + static generation | $0 |
| hotpot101.com | Early stage | Start on Cloudflare Pages (zero cost) | $0 |
