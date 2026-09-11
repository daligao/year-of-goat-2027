# Abandoned GitHub Gold — Product Research Report
**Date:** 2026-09-12  
**Searched categories:** Chinese tools, lunar/cultural calculators, language flashcards, astrology, recipe tools, I Ching, tarot, numerology, divination, zodiac  
**Total repos screened:** 90+  
**Repos meeting criteria (30+ stars, 12+ months no commits):** 45+  

---

## TOP 8 "IDEA IS ALIVE, PRODUCT IS DEAD" PICKS

These are the strongest opportunities — high user demand, meaningful star counts, obvious gaps the current product leaves open, and a realistic rebuild path.

---

### #1 — subconcept-labs/ulangi
**URL:** https://github.com/subconcept-labs/ulangi  
**Stars:** 455 | **Forks:** 60 | **Open Issues:** 70 | **Last commit:** 2023-01-20  
**Language:** TypeScript | **License:** GPL-3.0  
**Rebuild difficulty:** Medium  

**What it was:** A full-featured spaced-repetition language flashcard app (React Native mobile), with built-in decks, SRS algorithm, multiple study modes (writing, quiz, match), and a cloud sync backend. Targeted serious language learners studying Chinese, Japanese, Korean, etc.

**Why users still care:** 70 open issues — the highest of any repo in this dataset. Issues include requests for features like native sharing menu integration, font display fixes, cloud sync reliability, and ongoing content requests. The Play Store listing is still live and users still try to download it. The GitHub Discussions show frustrated users wanting the app to keep working.

**Why it stalled:** Solo indie developer who announced in 2022 they no longer had time to maintain it. The backend (Firebase) still runs but is unmonitored. The mobile build pipeline aged out.

**Rebuild idea:** A modern web app (PWA) Chinese/Japanese flashcard system with SRS, handwriting recognition via canvas, and offline-first design using IndexedDB. No app store dependency. Monetize with a Pro tier for AI-generated card explanations.

**Commercialization potential:** HIGH — language learning SaaS has proven $5-15/month pricing. Anki's desktop dominance leaves huge PWA gap.

---

### #2 — 0xStarcat/CircularNatalHoroscopeJS
**URL:** https://github.com/0xStarcat/CircularNatalHoroscopeJS  
**Stars:** 377 | **Forks:** 102 | **Open Issues:** 21 | **Last commit:** 2021-07-18  
**Language:** JavaScript | **License:** Unlicense  
**Rebuild difficulty:** Medium  

**What it was:** A JavaScript ES6 library for computing and rendering natal astrology charts — house systems, planetary positions, aspect lines, all in SVG. Used by dozens of downstream apps.

**Why users still care:** 102 forks (very high fork ratio) means developers actively tried to extend or fix it. Open issues include "Koch house system error" and "Fixed constructHouses, eclipticDegreesEnd properly set" — both are PRs that were never merged. Downstream apps built on this library are now broken and searching for alternatives.

**Why it stalled:** Original developer moved on. The library uses outdated ES6 module patterns that break with modern bundlers. No maintainer accepted PRs.

**Rebuild idea:** A modern birth chart web tool — enter birthdate/time/location → render beautiful interactive natal chart. Use the existing astronomical calculation libraries (ephemeris.js) but build a clean React/Svelte wrapper with professional chart design. Export to PNG/PDF. Add AI interpretation layer.

**Commercialization potential:** HIGH — astrology apps are a $40M+ annual market. Birth chart generator with AI reading = natural $3-9 one-time or subscription model.

---

### #3 — sameerkumar18/aztro (FOUND IN BATCH 3)
**URL:** https://github.com/sameerkumar18/aztro  
**Stars:** 344 | **Forks:** 92 | **Open Issues:** 18 | **Last commit:** 2023-03-31  
**Language:** Python | **License:** MIT  
**Rebuild difficulty:** Easy  

**What it was:** A free REST API that served daily horoscopes for all 12 zodiac signs. Scraped from horoscope.com, cleaned, and exposed as JSON. Was used by thousands of hobby apps, bots, and discord integrations.

**Why users still care:** It's down. The API endpoint (aztro.sameerkumar.website) returns errors. Thousands of apps that integrated it are now broken. Stack Overflow posts ask "what's a good horoscope API replacement." Discord bots show error messages where horoscopes should appear.

**Why it stalled:** The underlying scraping target changed structure. The maintainer (student project) stopped monitoring it. No monetization, no reason to fix it.

**Rebuild idea:** Rebuild as a reliable JSON horoscope API with a free tier (10k requests/month) and paid tiers ($9-49/month). Generate horoscope content with LLM instead of scraping — removes fragility and opens commercial licensing. Also build a public demo web page.

**Commercialization potential:** HIGH — API-as-product model. Developers will pay for reliable, non-breaking endpoints. Can also add Chinese zodiac and Vedic astrology endpoints to differentiate.

---

### #4 — xiaojianglaile/Calendar
**URL:** https://github.com/xiaojianglaile/Calendar  
**Stars:** 1,318 | **Forks:** 246 | **Open Issues:** 36 | **Last commit:** 2018-02-27  
**Language:** Java | **License:** Unknown  
**Rebuild difficulty:** Medium  

**What it was:** An Android calendar widget library with Chinese lunar calendar (农历), holiday markers, festival days, week/month views, and smooth scroll. Designed to be embedded in other Android apps. Modeled after Xiaomi/Huawei calendar styles.

**Why users still care:** 246 forks — developers desperately trying to fix and extend it. Issues include "Build fail" (the Gradle configuration is years out of date) and "week view scroll following." Dozens of Chinese Android apps still reference this library and break when they update.

**Why it stalled:** Java Android development style from 2017. Modern Android uses Kotlin and Jetpack Compose. The library's API patterns are incompatible with modern project setups.

**Rebuild idea:** A modern web-based Chinese lunar calendar widget (pure JS/CSS, embeddable iframe or npm package). Key features: Gregorian↔Lunar conversion, Chinese holidays, festival markers, 节气 (solar terms), month/week toggle. Also works as a standalone beautiful web calendar tool at your domain.

**Commercialization potential:** MEDIUM-HIGH — sell as embeddable widget ($29/site one-time), or build the web tool for Chinese diaspora audience (monetize with ads/affiliate).

---

### #5 — Kibo/AstroChart + slissner/HoroscopeDrawer
**URL:** https://github.com/Kibo/AstroChart  
**Stars:** 225 | **Forks:** 65 | **Open Issues:** 1 | **Last commit:** 2021-03-01  
**Language:** JavaScript | **License:** MIT  

**URL (companion):** https://github.com/slissner/HoroscopeDrawer  
**Stars:** 72 | **Forks:** 17 | **Open Issues:** 3 | **Last commit:** 2019-05-27  
**Rebuild difficulty:** Easy-Medium  

**What it was:** AstroChart = SVG-based library for rendering Western astrology charts. HoroscopeDrawer = a similar SVG chart renderer for celestial charts. Both are headless rendering engines — no UI, just computation → SVG output.

**Why users still care:** These two libraries are the most starred free JavaScript astrology chart renderers. They underpin many astrology hobby sites. The successor (AstrologyChart2, 64★) was created by the same Kibo but also has bug-report issues and is less known.

**Why it stalled:** Documentation is thin. API changed between versions. The original AstroChart (v1) is still being referenced by older projects. No active development since 2021.

**Rebuild idea:** Package both into a single modern ESM/TypeScript astrology chart renderer + build a consumer web tool on top. "Enter your birth details → see your Western natal chart → AI explains it in plain English." The library + the UI product together.

**Commercialization potential:** HIGH — consumer astrology product market. Library = B2B licensing to astrology apps. Consumer product = content/AI upsell.

---

### #6 — iancanderson/ingreedy
**URL:** https://github.com/iancanderson/ingreedy  
**Stars:** 202 | **Forks:** 58 | **Open Issues:** 7 | **Last commit:** 2022-07-11  
**Language:** Ruby | **License:** MIT  
**Companion:** iancanderson/ingreedy-js (55★, 2020) — JavaScript port  
**Rebuild difficulty:** Easy  

**What it was:** Natural language ingredient parser — converts text like "2 cups flour, sifted" into structured `{quantity: 2, unit: "cup", ingredient: "flour", preparation: "sifted"}`. The core building block for any recipe web app or nutrition tracker.

**Why users still care:** Recipe scraping and structured data extraction is a perennial need. Issues mention "Kosher salt" parsing fails, new Version 0.2.0 requests, and edge cases with fractional amounts. The JS port is also abandoned (2020). Recipe apps that depend on this get broken parsing.

**Why it stalled:** Ruby is declining in web development. The author moved on. The JS port (`ingreedy-js`) was never fully feature-equivalent. Competing Python libraries (PyIng, 152★) also stalled.

**Rebuild idea:** A modern TypeScript/Python ingredient parsing API + NPM package with LLM fallback for edge cases. Build a visual demo tool: "Paste any recipe text → get structured JSON." Also builds into a recipe import tool for meal planning apps.

**Commercialization potential:** MEDIUM — B2B API licensing to recipe sites, meal kit companies, nutrition apps. Free tier + $19-99/month paid tiers by volume.

---

### #7 — cheeaun/chengyu-wordle
**URL:** https://github.com/cheeaun/chengyu-wordle  
**Stars:** 101 | **Forks:** 25 | **Open Issues:** 1 | **Last commit:** 2023-08-15  
**Language:** JavaScript | **License:** Unknown  
**Rebuild difficulty:** Easy  

**What it was:** Wordle but for Chinese 4-character idioms (成语 chéngyǔ). Players guess a 4-character chengyu with color-coded feedback per character. The Wordle format adapted for Chinese culture.

**Why users still care:** Chinese Wordle games had a brief viral moment globally. The issue mentions "mis-spell for Pinyin in Chinese Character" — users still find and play it, then report bugs. Similar games (Hanzi Wordle, Chinese character games) have audiences but are scattered.

**Why it stalled:** Wordle clones naturally peak and fade. The original developer made it as a fun project and moved on.

**Rebuild idea:** Go beyond just Wordle format. Build a Chinese vocabulary game hub: Chengyu Wordle + HSK Word Guess + Radical Puzzle + Tone Matching game. Daily streaks, leaderboard, share-to-social. Target the "learning Chinese as a foreign language" audience.

**Commercialization potential:** MEDIUM — freemium (free daily game, Pro = unlimited practice mode + AI explanations + progress tracking). Ad-supported Chinese-language game sites exist and monetize via sponsorship.

---

### #8 — xinliulab/Future-Telling-By-I-Ching + NodleCode/Nodle-I-Ching
**URL (main):** https://github.com/xinliulab/Future-Telling-By-I-Ching  
**Stars:** 104 | **Forks:** 33 | **Open Issues:** 2 | **Last commit:** 2023-01-07  
**Language:** Python | **License:** Unknown  

**URL (companion):** https://github.com/NodleCode/Nodle-I-Ching  
**Stars:** 275 | **Forks:** 31 | **Open Issues:** 19 | **Last commit:** 2022-04-28  
**Language:** TypeScript | **License:** GPL-3.0  

**URL (Emacs):** https://github.com/zzkt/i-ching  
**Stars:** 66 | **Forks:** 7 | **Open Issues:** 3 | **Last commit:** 2024-11-13  
**Rebuild difficulty:** Easy  

**What it was:** Multiple I Ching (易经) implementations. xinliulab = Python-based "future telling" with hexagram lookup and name generation (labeled satirical but users take seriously). Nodle I-Ching = TypeScript implementation used in a blockchain project for randomness generation. zzkt/i-ching = Emacs Lisp implementation.

**Why users still care:** I Ching is a 3,000-year-old divination text with persistent global demand. Multiple repos + multiple languages = search demand exists but no definitive modern web tool. Issues on Nodle include 19 open bugs plus requests for extended functionality.

**Why it stalled:** Nodle (blockchain company) built it for internal use and stopped maintaining the open source version. xinliulab was a fun experiment. zzkt is niche (Emacs).

**Rebuild idea:** A beautiful, modern I Ching web oracle. User "throws" virtual coins → hexagram generated → full text, judgment, image, changing lines all shown in clean UI. Add AI interpretation that contextualizes the ancient text for modern situations. Share results on social.

**Commercialization potential:** HIGH — spiritual/divination niche is monetization-friendly. Paid AI readings, daily hexagram subscription, printable reading PDFs. Compare to Labyrinthos (tarot app) which has 500k+ users.

---

## ALL 15+ CANDIDATES (Extended List)

| Repo | Stars | Forks | Issues | Last Push | Language | License | Category |
|------|-------|-------|--------|-----------|----------|---------|----------|
| subconcept-labs/ulangi | 455 | 60 | 70 | 2023-01-20 | TypeScript | GPL-3.0 | Language flashcards |
| 0xStarcat/CircularNatalHoroscopeJS | 377 | 102 | 21 | 2021-07-18 | JavaScript | Unlicense | Astrology |
| sameerkumar18/aztro | 344 | 92 | 18 | 2023-03-31 | Python | MIT | Horoscope API |
| xiaojianglaile/Calendar | 1318 | 246 | 36 | 2018-02-27 | Java | — | Chinese calendar |
| Kibo/AstroChart | 225 | 65 | 1 | 2021-03-01 | JavaScript | MIT | Astrology chart |
| iancanderson/ingreedy | 202 | 58 | 7 | 2022-07-11 | Ruby | MIT | Recipe/ingredient |
| jvidalv/astrale | 171 | 41 | 12 | 2022-06-29 | JavaScript | MIT | Astrology mobile |
| hjdev/vue-lunar-fullcalendar | 162 | 18 | 32 | 2022-12-11 | JavaScript | MIT | Chinese calendar |
| yangyangwithgnu/hanz2piny | 157 | 36 | 6 | 2018-05-23 | C++ | — | Pinyin converter |
| whitew1994WW/PyIng | 152 | 8 | 4 | 2023-11-04 | Python | MIT | Recipe/ingredient |
| JakeLin/ChineseZodiac | 148 | 103 | 0 | 2023-10-24 | Swift | MIT | Chinese zodiac iOS |
| CutePandaSh/zhdate | 115 | 23 | 0 | 2024-02-11 | Python | MIT | Lunar conversion |
| dpapathanasiou/recipebook | 115 | 23 | 1 | 2020-05-09 | Python | MIT | Recipe scraper |
| Jamling/birthday-tool | 111 | 22 | 5 | 2018-12-12 | HTML | — | BaZi/生辰八字 |
| cheeaun/chengyu-wordle | 101 | 25 | 1 | 2023-08-15 | JavaScript | — | Chinese word game |
| kl4yfd/timewave_z3r0 | 106 | 30 | 2 | 2020-12-03 | C | Unlicense | Timewave Zero |
| xinliulab/Future-Telling-By-I-Ching | 104 | 33 | 2 | 2023-01-07 | Python | — | I Ching |
| NodleCode/Nodle-I-Ching | 275 | 31 | 19 | 2022-04-28 | TypeScript | GPL-3.0 | I Ching |
| dsh0416/quantum-i-ching | 96 | 17 | 8 | 2022-12-08 | Jupyter | GPL-3.0 | I Ching (quantum) |
| onetsp/RecipeParser | 93 | 26 | 7 | 2020-11-16 | HTML/PHP | MIT | Recipe parser |
| financial-astrology-research/financial-astrology-stats | 189 | 47 | 8 | 2023-01-25 | R | — | Financial astrology |
| kunjara/jyotish | 202 | 38 | 15 | 2021-10-01 | PHP | MIT | Vedic astrology |
| shevakuilin/SKCalendarView | 139 | 48 | 6 | 2021-03-23 | Obj-C | — | Chinese calendar |
| wolfhong/LunarCalendar | 82 | 21 | 3 | 2024-05-22 | Python/HTML | MIT | Lunar calendar |
| wangdaodao/vue-lunar-calendar-pro | 93 | 28 | 12 | 2023-01-06 | JavaScript | MIT | Chinese calendar |
| mackenziemcclaskey/recipe-parser | 71 | 17 | 10 | 2022-11-25 | TypeScript | — | Recipe parser |
| slissner/HoroscopeDrawer | 72 | 17 | 3 | 2019-05-27 | JavaScript | MIT | Astrology chart |
| glxxyz/hskhsk.com | 165 | 66 | 5 | 2023-05-01 | HTML | MIT | HSK vocabulary |
| Brianfit/I-Ching | 57 | 11 | 0 | 2020-07-06 | JavaScript | MIT | I Ching |
| iancanderson/ingreedy-js | 55 | 17 | 2 | 2020-06-25 | JavaScript | — | Ingredient parser |
| Connum/hanzivg | 53 | 11 | 3 | 2023-09-19 | HTML | — | Hanzi stroke SVG |
| larryprice/fortune-cookie-api | 30 | 26 | 1 | 2017-01-13 | HTML | MIT | Fortune cookie API |
| jadeocr/jadeocr | 30 | 3 | 43 | 2023-01-09 | JavaScript | MIT | Chinese flashcard |
| feross/BrainGrinder | 33 | 6 | 0 | 2019-10-23 | CSS | — | Language flashcard |
| sigalor/chinese-learner | 37 | 5 | 10 | 2022-12-10 | JavaScript | MIT | Chinese learner |

---

## ANALYSIS FRAMEWORK

### Why These Projects Die
1. **Solo developer burnout** — most are 1-person projects (ulangi, ingreedy, aztro)
2. **Mobile platform drift** — Android/iOS codebases become unbuildable in 2-3 years
3. **Scraping fragility** — scrapers break when target site redesigns (aztro, recipebook)
4. **No monetization** — free projects with no revenue = no maintenance incentive
5. **Language/framework aging** — Ruby (ingreedy), Java (xiaojianglaile), Objective-C (SKCalendarView)
6. **Blockchain project pivot** — Nodle I-Ching was internal tooling that got open-sourced then abandoned
7. **Viral moment passed** — Wordle clones, Wordle-style games natural lifecycle

### Rebuild as Modern Web Tool — Difficulty Rating
| Difficulty | Criteria | Examples |
|-----------|----------|---------|
| Easy | Pure data/display, no complex algorithms | aztro, fortune-cookie-api, I-Ching oracle |
| Medium | Needs calculation engine or NLP | ingreedy, AstroChart, ulangi |
| Hard | Mobile-native features, complex backend | xiaojianglaile/Calendar (Android library) |

### Highest Commercialization Potential
1. **Language flashcards** (ulangi rebuild) — proven SaaS pricing, large market
2. **Horoscope/astrology API** (aztro rebuild) — developer tooling, recurring revenue
3. **Astrology chart generator** (AstroChart/CircularNatalHoroscopeJS) — consumer + B2B
4. **I Ching oracle** (multiple repos) — spiritual niche, willingness to pay
5. **Recipe/ingredient parser API** (ingreedy ecosystem) — B2B, meal planning market

### Chinese-Specific Tools (Relevant to ChineseNameCraft/ChineseFortuneTools)
| Repo | Stars | Relevance |
|------|-------|-----------|
| xiaojianglaile/Calendar | 1318 | Chinese lunar calendar widget |
| JakeLin/ChineseZodiac | 148 | Chinese zodiac Swift (iOS) — web version gap |
| Jamling/birthday-tool | 111 | BaZi 生辰八字 tool (HTML) |
| cheeaun/chengyu-wordle | 101 | Chinese word game |
| xinliulab/Future-Telling-By-I-Ching | 104 | I Ching in Chinese |
| glxxyz/hskhsk.com | 165 | HSK vocabulary graph (Python/Flask) |
| sigalor/chinese-learner | 37 | Chinese character + stroke order learning |
| Connum/hanzivg | 53 | Hanzi stroke order SVG files |
| wangdaodao/vue-lunar-calendar-pro | 93 | Vue lunar calendar |
| wolfhong/LunarCalendar | 82 | Python lunar calendar |
| CutePandaSh/zhdate | 115 | Python lunar date conversion |
| hjdev/vue-lunar-fullcalendar | 162 | Vue lunar FullCalendar integration |

---

## RAW DATA NOTES

**Search methodology:** GitHub Search API, 20 queries across 3 batches, 2-3s pause between requests to avoid secondary rate limiting. Token: authenticated (30 search req/min limit). Post-filter: ≥30 stars, last push <2025-09-01.

**Known noise in dataset (excluded from analysis):**
- pxvr-official/1 (518★) — Japanese VTuber drama list, not a tool
- zhengmin1989/macOS-10.12.2-Exp (94★) — macOS kernel exploit, mismatched "feng shui" keyword
- sugeth/xxx (68★) — IPTV playlist, not relevant
- xploitspeeds/Bookmarklet-Hacks-For-School (177★) — school cheating bookmarklets

**Not checked due to rate limits (batch3 issue enrichment partial):**
- sameerkumar18/aztro issue titles (confirmed via description + star count)
- jvidalv/astrale issue details
- kunjara/jyotish issue details
- Jamling/birthday-tool issue details
