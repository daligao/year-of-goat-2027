# OSS MONETIZATION PLAYBOOK: How Open-Source Projects Monetize Without Destroying the Free Product

Research date: 2026-09-12
Scope: 15 successful OSS-commercial projects + applied models for 5 portfolio sites

---

## PART 1: HOW THEY DO IT

---

### Plausible Analytics
- **Free product**: Open-source analytics (MIT). Self-host on any VPS.
- **Paid product**: Managed cloud hosting. $9/mo (10k pageviews), $19/mo (100k), $49/mo (1M+)
- **Pricing model**: SaaS/hosted — you pay for "not having to run it yourself"
- **Why users pay**: Setting up VPS + Postgres + SSL is 3-4 hours of work. $9/month buys that time back. Also: automatic updates, backups, support.
- **Stays free**: The entire codebase, all features, forever.
- **Monetized**: Hosting, infrastructure, support.
- **Works for 1-person site?**: Yes — the exact model. One person runs hosted SaaS for paying customers, maintains OSS for credibility + SEO ("plausible alternative to google analytics" gets 50k+ searches/month).
- **Lesson**: Your software must be genuinely hard to self-host for this model to work. If it's a single docker run command, no one pays.

---

### Umami Analytics
- **Free product**: Open-source analytics (MIT). Single Docker container.
- **Paid product**: umami.is cloud — free up to 10k events/month, $20/month for 100k.
- **Pricing model**: Freemium SaaS
- **Why users pay**: Managed hosting. But Umami is so easy to self-host (literally one docker command + one postgres connection) that fewer people pay. Revenue is lower than Plausible despite similar feature set.
- **Stays free**: All features on self-hosted.
- **Lesson**: If self-hosting is too easy, the paid tier struggles. Plausible deliberately makes cloud more appealing (one-click, zero ops).

---

### Fathom Analytics
- **Free product**: None — Fathom is closed source.
- **Paid product**: $14/month (100k pageviews), unlimited sites.
- **Pricing model**: Pure SaaS (not truly OSS commercial)
- **Why users pay**: GDPR compliance + simplicity + one flat price for unlimited sites.
- **Lesson**: You don't need to be OSS to win on "ethical analytics." Privacy-first positioning is the moat.

---

### Ghost
- **Free product**: Open-source publishing platform (MIT). Self-host anywhere.
- **Paid product**: Ghost(Pro) hosted — $11/month (500 members), $31/month (1k members), $79/month (unlimited)
- **Pricing model**: Hosted SaaS + membership platform (Ghost takes 0% of member revenue vs Substack's 10%)
- **Why users pay**: Ghost is genuinely complex to self-host (Node.js, MySQL, email config, SSL). $11/month is very competitive. Also: zero payment fees on subscriptions.
- **Stays free**: Entire platform, all features.
- **Monetized**: Hosting, email delivery infrastructure, support.
- **Works for 1-person site?**: Very. Solo newsletter writers pay Ghost instead of Substack to keep 100% of revenue.
- **Lesson**: The "zero transaction fee" positioning directly attacks Substack's core weakness. Find the incumbent's tax and eliminate it.

---

### Cal.com (Calendly alternative)
- **Free product**: Full scheduling platform, open source (AGPL). Self-host.
- **Paid product**: cal.com cloud — $15/month per seat (teams), enterprise pricing.
- **Pricing model**: Open-core SaaS. Cloud is convenience, not features.
- **Why users pay**: Calendly charges $12/month per user. Cal.com cloud is similar price but open-source. Teams pay for managed hosting + team features.
- **Stays free**: All individual scheduling features. Core platform.
- **Monetized**: Team collaboration features, SSO, managed hosting.
- **Works for 1-person site?**: Partially. 1-person site can self-host free. Revenue requires selling to teams.
- **Lesson**: AGPL license is strategic — competitors can't use your code without open-sourcing their changes.

---

### Sentry (error monitoring)
- **Free product**: Open-source error monitoring (BSL/FSL license — technically not pure OSS anymore).
- **Paid product**: sentry.io cloud — free up to 5k errors/month, then $26+/month.
- **Pricing model**: Open-core SaaS + volume pricing.
- **Why users pay**: Self-hosting Sentry is complex (many services, Kafka, Redis, Postgres). Cloud handles the ops.
- **Stays free**: Community edition with limited data retention.
- **Monetized**: Data volume, data retention, team features, SSO.
- **Works for 1-person site?**: Not as a revenue model — too complex. As a user, yes: free tier covers 5k errors/month.
- **Lesson**: Sentry changed to BSL license to prevent competitors (DataDog, AWS) from using their code. Shows the tension between open-source idealism and business sustainability.

---

### PostHog (product analytics)
- **Free product**: Open-source product analytics (MIT). Self-host with full features.
- **Paid product**: posthog.com cloud — free up to 1M events/month, then $0.00045/event.
- **Pricing model**: Generous freemium + usage-based pricing.
- **Why users pay**: 1M events/month free is genuinely generous. Teams pay when they exceed that.
- **Stays free**: Everything up to 1M events. Core feature set.
- **Monetized**: Volume, data retention (7 years on paid), support SLA.
- **Works for 1-person site?**: Excellent. Free tier covers almost every small site's needs. Use it for chinesefortunetools.com instead of GA4.
- **Lesson**: "1M events free" is a growth hack — every developer tries it because the free tier is actually useful.

---

### Typebot (chatbot builder)
- **Free product**: Open-source visual chatbot builder (AGPL). Self-host.
- **Paid product**: typebot.io cloud — $39/month (unlimited bots, 2k chats/month), $89/month (10k chats).
- **Pricing model**: SaaS
- **Why users pay**: Embed chatbots on websites without managing infrastructure. Drag-and-drop UI is polished.
- **Stays free**: All bot templates, all features on self-hosted.
- **Monetized**: Cloud hosting, chat volume, custom domains on managed version.
- **Works for 1-person site?**: Yes — the creator runs it solo. Key insight: self-hosting AGPL means users must open-source their modifications. Cloud avoids this for businesses.
- **Portfolio idea**: Build a "Chinese name consultation chatbot" using Typebot self-hosted. Capture leads before they leave ChineseNameCraft.

---

### n8n (workflow automation)
- **Free product**: Open-source workflow automation (FSL license). Self-host.
- **Paid product**: n8n.io cloud — $20/month (2,500 workflow executions), $50/month (10k).
- **Pricing model**: Open-core SaaS.
- **Why users pay**: Zapier/Make cost $50-200+/month. n8n cloud at $20 is cheaper AND self-hostable as backup.
- **Stays free**: All workflow nodes (including AI), all features on self-hosted.
- **Monetized**: Cloud execution, support, enterprise features (SSO, audit logs).
- **Works for 1-person site?**: As a tool: yes, extremely useful. As revenue model: Zapier comparison SEO generates enormous traffic.
- **Lesson**: Zapier charges $0.0002 per task; n8n charges $0.008 per execution (cloud) — 40x more per execution but unlimited complexity per execution. Different pricing axis wins different customers.

---

### Directus (headless CMS)
- **Free product**: Open-source headless CMS (BSL). Self-host.
- **Paid product**: Directus Cloud — $99/month base. Enterprise: custom.
- **Pricing model**: Managed cloud, enterprise support.
- **Why users pay**: Headless CMS requires DevOps expertise to run reliably. $99/month buys that.
- **Stays free**: All CMS features on self-hosted.
- **Monetized**: Managed infrastructure, SLA, enterprise support.
- **Works for 1-person site?**: Revenue model requires enterprise clients. Use Directus free as your own CMS.
- **Portfolio idea**: Use Directus self-hosted (free) as a headless CMS for chinarules101.com articles. REST API → static site generation.

---

### Pocketbase (backend as a service)
- **Free product**: Open-source BaaS in single binary (MIT). Extremely easy to self-host.
- **Paid product**: No cloud offering yet — pure OSS.
- **Pricing model**: No monetization currently (funded by sponsors/donations).
- **Why users pay**: They don't — it's free.
- **Lesson**: MIT + single binary = almost impossible to monetize through hosting (too easy to self-host). Shows the tension: great for users, hard for revenue.
- **Portfolio use**: Run Pocketbase on your existing Hostinger VPS. Single binary handles database + auth + file storage + REST API for all 4 sites. Zero additional cost.

---

### AppFlowy (Notion alternative)
- **Free product**: Open-source workspace (AGPL). Desktop app + self-host server.
- **Paid product**: AppFlowy Cloud — $8/month/user (Pro), enterprise custom.
- **Pricing model**: SaaS
- **Why users pay**: Notion charges $16/month/user. AppFlowy Cloud at $8 is half price with same features + privacy.
- **Stays free**: Entire desktop app, all features.
- **Monetized**: Cloud sync, collaboration, AI features (AppFlowy AI).
- **Works for 1-person site?**: Not as revenue model. Use as tool: replace Notion for free with self-hosted AppFlowy.

---

### Outline (knowledge base / wiki)
- **Free product**: Open-source team wiki (BSL). Self-host.
- **Paid product**: getoutline.com cloud — $10/month (up to 20 users), $30/month (unlimited).
- **Pricing model**: Hosted SaaS.
- **Why users pay**: Confluence is $5.75/user/month ($115+ for 20 users). Outline cloud at $10 flat wins on price.
- **Stays free**: All wiki features, unlimited documents on self-hosted.
- **Monetized**: Managed hosting, compliance features, support.
- **Works for 1-person site?**: Use self-hosted as your own knowledge base. Revenue model requires selling to small teams.

---

### Matomo (web analytics)
- **Free product**: Open-source analytics (GPL). Self-host.
- **Paid product**: matomo.cloud — $23-79/month depending on traffic. On-Premise premium plugins: $19-199 each.
- **Pricing model**: Dual: hosted SaaS + premium plugin marketplace.
- **Why users pay**: GDPR-compliant analytics with full data ownership but managed hosting.
- **Stays free**: Core analytics platform.
- **Monetized**: Cloud hosting + premium plugins (funnel analysis, heatmaps, A/B testing).
- **Lesson**: Plugin marketplace is smart — extends free product without fragmenting it. Sells "advanced features" to power users only.

---

## PART 2: MONETIZATION MODELS FOR YOUR PORTFOLIO

---

### 1. ChineseNameCraft (chinesenamecraft.com)

**Current state**: PHP site, name generator with PayPal (orders table empty — DB not configured). Blog with 13 posts. 973+ programmatic pages.

**Model A — Freemium Report (Effort: Low, Revenue: Medium)**
- Free: 3 name suggestions with basic meaning
- Paid ($4.99 one-time): Full report — 10+ names, tone analysis, zodiac compatibility, calligraphy style card, shareable PDF
- Why users pay: "I want a name for my baby" is a high-intent, one-time purchase. $4.99 is impulse-buy price.
- Implementation: Fix PayPal integration (DB config), generate PDF server-side with FPDF or wkhtmltopdf
- Revenue estimate: 50 sales/month × $4.99 = $250/month at low traffic

**Model B — API Access (Effort: Medium, Revenue: Low-Medium)**
- Free: Web tool only
- Paid ($9.99/month): JSON API access — "Chinese name suggestions for any input"
- Who pays: App developers building Chinese name features, expat apps, baby name apps
- Implementation: API key system (simple PHP), Stripe/LemonSqueezy for recurring billing
- Revenue estimate: 20 subscribers × $9.99 = $200/month

**Model C — Affiliate + AdSense (Effort: Very Low, Revenue: Low-stable)**
- Place Google AdSense or EzoicAds on high-traffic programmatic pages
- Affiliate links to: Chinese calligraphy tools, Chinese name seal carving services (Etsy sellers), baby name books on Amazon
- Revenue estimate: 50,000 pageviews/month × $2 RPM = $100/month display ads
- Requires: Getting to 50k/month traffic first

**Ranking**: B > A > C (API has recurring revenue; report sale has best conversion; ads need volume)

---

### 2. ChineseFortuneTools (chinesefortunetools.com)

**Current state**: SSH access, zodiac/bazi/fengshui tools, game section, good luck section, 20+ articles.

**Model A — Premium BaZi Reading (Effort: Medium, Revenue: High-Ceiling)**
- Free: Basic zodiac info, simple BaZi chart
- Paid ($9.99 one-time): Full BaZi reading — 4-pillar analysis, 10-year luck cycles, career/relationship compatibility, AI-generated interpretation paragraph
- Who pays: People genuinely interested in Chinese astrology (high willingness to pay)
- AI cost: $0.002/reading using Qwen via OpenRouter free tier or Qiniu DeepSeek
- Implementation: Collect birth date/time, calculate BaZi, send to DeepSeek for interpretation, generate PDF
- Revenue estimate: 100 sales/month × $9.99 = $1,000/month (realistic at 20k visits/month)

**Model B — Fortune Subscription ($4.99/month) (Effort: High, Revenue: Recurring)**
- Free: One-time readings, daily horoscope
- Paid: "Your Year in Fortune" — monthly personalized forecast based on BaZi + current year energy
- AI generates each month's forecast ($0.01/user/month)
- Implementation: Stripe subscription + monthly cron job generating forecasts + email via Resend
- Revenue estimate: 200 subscribers × $4.99 = $998/month

**Model C — Sponsored Content + Affiliate (Effort: Low, Revenue: Low)**
- Partner with Chinese New Year gift sellers, feng shui product sellers, red packet (hongbao) makers
- Affiliate links: Amazon feng shui products, Etsy Chinese astrology items
- Revenue estimate: $50-200/month depending on traffic

**Ranking**: A > B > C (single purchase removes friction; subscription is better revenue but harder to sell)

---

### 3. ChinaRules101 (chinarules101.com)

**Current state**: 245 articles, VIP $4.99/article preview system, 30 articles imported, SEO recovering (was 59→1 indexed, recovery in progress).

**Model A — VIP Membership ($4.99/month) (Effort: Low, Revenue: Recurring)**
- Free: First 25% of every article (already implemented)
- Paid: Full access to all 245 articles + future articles
- Who pays: Expats moving to China, international businesspeople, cultural researchers, HR teams
- Email list: Capture emails at paywall, nurture → convert
- Revenue estimate: 300 subscribers × $4.99 = $1,497/month (needs 50k monthly visitors)
- Current barrier: Google indexing needs to recover first

**Model B — Corporate Training Package ($99-499 one-time) (Effort: Medium, Revenue: High per-sale)**
- Bundle: "China Business Etiquette Guide" — PDF compilation of 30 key articles + quiz + certificate
- Who pays: HR departments onboarding employees going to China, universities with China programs
- Outreach: Cold email to Fortune 500 HR departments, China-focused MBA programs
- Revenue estimate: 5 sales/month × $199 = $995/month (low volume, high value)

**Model C — Display Advertising (Effort: Very Low, Revenue: Low)**
- Ezoic or Mediavine (requires 50k+ pageviews/month for Mediavine)
- Current: Too early — fix SEO first
- Revenue estimate: 100k pageviews/month × $5 RPM = $500/month

**Ranking**: B > A > C (corporate training has high per-unit value + doesn't require high traffic; membership needs volume first)

---

### 4. HotPot101 (hotpot101.com)

**Current state**: Early stage — Ma La Meter, Recipe Parser, Meal Planner, science pages. Product priorities set.

**Model A — Recipe + Ingredient Database Subscription (Effort: Medium, Revenue: Medium)**
- Free: 20 hot pot broth recipes, 50 ingredient profiles
- Paid ($2.99/month): Full database — 200+ recipes, regional variations, ingredient sourcing guide (where to buy online in US/UK/Australia)
- Who pays: Chinese food enthusiasts outside China who can't find ingredients locally
- Affiliate angle: Link to Amazon/H-Mart for each ingredient → commission per purchase
- Revenue estimate: 500 subscribers × $2.99 = $1,495/month (requires 100k visits/month)

**Model B — Affiliate-First (Effort: Very Low, Revenue: Low but immediate)**
- Every ingredient page → Amazon affiliate link to closest product
- Every broth recipe → affiliate link to instant hot pot base (Little Sheep, Hai Di Lao available on Amazon)
- Revenue: 2% commission, $20 average order → $0.40/conversion
- Revenue estimate: 200 affiliate sales/month = $80/month (low but zero extra work)
- Build first, then stack subscription on top later

**Model C — "Hot Pot Experience" Gift Card Partner (Effort: High, Revenue: High-ceiling)**
- Partner with hot pot restaurants to offer "Hot Pot 101 readers get 10% off"
- Earn referral commission per reservation
- Long-term play after brand is established

**Ranking**: B > A > C (affiliate is immediate with zero extra build; subscription needs traffic; restaurant partner needs brand authority)

---

### 5. Future ChinaTea101

**Not yet built. Model suggestions based on category:**

**Model A — Premium Tea Guide (Effort: Low, Revenue: Medium)**
- Free: Tea types overview, brewing basics, 50 tea profiles
- Paid ($29.99 one-time): "Complete Chinese Tea Encyclopedia" — PDF/ebook with 200+ tea profiles, production regions, tasting notes, pairing guide
- Who pays: Tea enthusiasts, Cha Dao practitioners, specialty tea shop staff training
- Why works: Tea is a high-willingness-to-pay category. Pu-erh alone is a collectibles market.
- Revenue: 30 sales/month × $29.99 = $900/month

**Model B — Tea Affiliate (Effort: Very Low, Revenue: Immediate)**
- Every tea profile page → affiliate links to: Yunnan Sourcing, Teavana, What-Cha, white2tea
- Commission: 10-15% from specialty retailers
- Revenue: 100 referrals/month × $40 average order × 12% = $480/month

**Model C — Subscription "Tea of the Month" Curation (Effort: Very High, Revenue: High-ceiling)**
- Partner with a tea shipper/drop-shipper
- Curate monthly tea selections with ChinaTea101 educational context
- Revenue: $29.99/month × subscribers — very high ceiling but requires supply chain

**Ranking**: B > A > C (affiliate first for cash flow; PDF guide for one-time revenue; subscription requires logistics partner)

---

## CROSS-SITE PATTERNS: WHAT WORKS FOR 1-PERSON OPERATIONS

| Model | Best for | Why |
|-------|----------|-----|
| One-time digital product ($5-30) | Tools with high-intent users | Low support burden, instant delivery, no subscription churn |
| Affiliate marketing | Content sites with product mentions | Zero fulfillment, earns while you sleep, matches content naturally |
| Tiered freemium SaaS | Tools with repeat usage | Recurring revenue but needs 10k+ MAU to matter |
| Corporate/B2B packages | Content sites with professional audience | High per-unit value, low volume needed |
| Display advertising | High-traffic content sites (100k+/month) | Passive but requires significant traffic first |

**Avoid for 1-person operations**:
- Per-seat SaaS pricing (support burden)
- Physical goods (inventory/shipping)
- Marketplace (network effects required)
- Custom enterprise contracts (sales cycle too long)

## SINGLE BEST MOVE PER SITE (RIGHT NOW)

| Site | Best Move | Estimated Time | Revenue Potential |
|------|-----------|----------------|-------------------|
| ChineseNameCraft | Fix PayPal+DB, launch $4.99 name report | 1 weekend | $250+/month |
| ChineseFortuneTools | Add $9.99 BaZi reading with DeepSeek interpretation | 3 days | $500+/month |
| ChinaRules101 | Fix SEO first, then activate VIP membership | 1 month (SEO) | $500+/month |
| HotPot101 | Add Amazon affiliate links to every ingredient | 2 hours | $50+/month immediately |
| ChinaTea101 | Start with affiliate-first architecture from day one | N/A (not built yet) | $200+/month at launch |
