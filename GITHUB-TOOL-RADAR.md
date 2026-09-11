# GitHub Tool Radar — Chinese Culture & Fortune Tools
**Research Date:** 2026-09-12  
**Scope:** Chinese zodiac, lunar calendar, festivals, name generators, kinship, feng shui, gift etiquette, hotpot/tea, cultural calculators  
**Total repos surveyed:** 25+ across 14 search queries

---

## Part 1: All Repos Surveyed

### 1. `6tail/lunar-javascript`
- **URL:** https://github.com/6tail/lunar-javascript
- **Stars:** 1,667 | **Forks:** ~400 | **Last Update:** 2026-09-08
- **Language:** JavaScript | **License:** MIT
- **Live Demo:** https://6tail.cn/calendar/api.html
- **Problem Solved:** Full Chinese lunar calendar computation — converts solar ↔ lunar dates, solar terms (24节气), heavenly stems/earthly branches, Chinese zodiac, auspicious days, festivals, BaZi.
- **Strongest Features:** Single-file JS library. Covers solar terms (节气), ganzhi (干支), Chinese zodiac, yi jing hexagrams, lunar month/day names, leap months, traditional Chinese almanac (老黄历) auspiciousness. Extremely complete.
- **Issues/Complaints:** 
  - Timezone mismatch (users on non-CST servers get wrong dates)
  - Subtle solar term calculation errors (立春 off by seconds vs. authoritative sources)
  - No Western zodiac integration
  - No Traditional Chinese (繁體) output option
  - Requests for planetary ephemeris data
- **Browser Tool:** YES — single JS file, drop-in ready
- **Site Fit:** chinesefortunetools.com (core engine for multiple tools)
- **Reuse Risk:** MIT license, very low risk
- **Recommendation:** REUSE — this is the gold-standard engine; wrap it in a pretty UI

---

### 2. `6tail/lunar-python`
- **URL:** https://github.com/6tail/lunar-python
- **Stars:** 654 | **Forks:** ~150 | **Last Update:** 2026-09-10
- **Language:** Python | **License:** MIT
- **Live Demo:** https://6tail.cn/calendar/api.html
- **Problem Solved:** Python port of lunar-javascript — same capabilities, for server-side use.
- **Strongest Features:** Same completeness as JS version. Good for generating pre-computed data or a PHP/Python backend.
- **Issues/Complaints:**
  - BaZi hidden stems (地支藏干) ordering bug for 巳火
  - Solar term calculation off by 1 day in edge cases
  - No Traditional Chinese output
  - Users asking how to get 十神 (ten gods) for 大运 (luck pillars)
- **Browser Tool:** NO (server-side) — but can pre-generate JSON data
- **Site Fit:** chinesefortunetools.com (backend data generation)
- **Reuse Risk:** MIT, minimal
- **Recommendation:** STUDY — use for backend data pipelines, front-end use lunar-javascript instead

---

### 3. `SylarLong/iztro`
- **URL:** https://github.com/SylarLong/iztro
- **Stars:** 4,148 | **Forks:** 671 | **Last Update:** 2026-09-11
- **Language:** TypeScript | **License:** MIT
- **Live Demo:** https://iztro.com
- **Problem Solved:** Zi Wei Dou Shu (紫微斗数) astrolabe generation — full natal chart calculation including star placements, palace positions, luck pillars, yearly fate.
- **Strongest Features:** Most starred Chinese astrology lib on GitHub. Full astrolabe with 14 major stars. npm package. TypeScript with good docs. Live demo site exists.
- **Issues/Complaints:** Complex API (steep learning curve), results need heavy UI work to be user-friendly, output is raw data not visual chart.
- **Browser Tool:** YES — TypeScript/npm, runs in browser
- **Site Fit:** chinesefortunetools.com (premium feature — Zi Wei Dou Shu calculator)
- **Reuse Risk:** MIT, very low
- **Recommendation:** REUSE — wrap in a visual, English-friendly UI; huge SEO opportunity ("zi wei dou shu calculator english")

---

### 4. `holynova/gushi_namer`
- **URL:** https://github.com/holynova/gushi_namer
- **Stars:** 2,249 | **Forks:** ~300 | **Last Update:** 2026-09-08
- **Language:** TypeScript | **License:** None (no license!)
- **Live Demo:** https://holynova.github.io/gushi_namer/
- **Problem Solved:** Chinese name generator drawing characters from classical poetry (古诗词), producing elegant names with literary provenance. Extremely creative approach.
- **Strongest Features:** Database of thousands of classical poem characters. Names come with poem source. Beautiful UI. Hugely viral in China.
- **Issues/Complaints:** No issues open — repo is maintained. No English translation. No meaning explanation in English. Demo URL may break.
- **Browser Tool:** YES — GitHub Pages, runs in browser
- **Site Fit:** chinesenamecraft.com (if live) or chinesefortunetools.com
- **Reuse Risk:** NO LICENSE = all rights reserved by default. Cannot legally reuse code. Must rebuild inspired by the concept.
- **Recommendation:** REBUILD — concept is excellent (classical poetry names), rebuild with English explanations and SEO. Do NOT copy code.

---

### 5. `hythl0day/random_chinese_fantasy_names`
- **URL:** https://github.com/hythl0day/random_chinese_fantasy_names
- **Stars:** 234 | **Forks:** ~30 | **Last Update:** 2026-08-31
- **Language:** JavaScript | **License:** MIT
- **Live Demo:** https://hetu.dev/random-names/ (reported broken as of Mar 2025)
- **Problem Solved:** Fantasy/wuxia-style Chinese name generator using Jin Yong novel character patterns, xianxia naming conventions.
- **Strongest Features:** Distinct genre — wuxia/cultivation novel names. MIT licensed. Name components from actual fantasy literature corpus.
- **Issues/Complaints:** Live site went down (reported Mar 2025), no maintenance response. JS-only, no meaning explanations.
- **Browser Tool:** YES — pure JS
- **Site Fit:** chinesefortunetools.com or chinesenamecraft.com
- **Reuse Risk:** MIT license, safe to use
- **Recommendation:** STUDY — use the dataset/approach, rebuild with live hosting and English meaning tooltips

---

### 6. `wolfhong/LunarCalendar`
- **URL:** https://github.com/wolfhong/LunarCalendar
- **Stars:** 82 | **Forks:** ~30 | **Last Update:** 2026-04-09
- **Language:** Python (HTML demo) | **License:** MIT
- **Live Demo:** None (PyPI package)
- **Problem Solved:** Python library for solar↔lunar conversion with 24 solar terms and Chinese festivals.
- **Strongest Features:** Clean Python API. Lists 24 solar terms. Flags Chinese public holidays.
- **Issues/Complaints:** Wrong algorithm outputs reported. PyPI sdist broken. No extension beyond year 2100. i18n not handled well.
- **Browser Tool:** NO — Python library
- **Site Fit:** N/A (prefer 6tail/lunar-javascript for browser tools)
- **Reuse Risk:** MIT
- **Recommendation:** IGNORE — 6tail is superior in every way

---

### 7. `YuanZHAO321/FengShuiCalculators`
- **URL:** https://github.com/YuanZHAO321/FengShuiCalculators
- **Stars:** 5 | **Forks:** 1 | **Last Update:** 2026-09-03
- **Language:** JavaScript | **License:** Apache-2.0
- **Live Demo:** GitHub Pages (yes, has_pages=true)
- **Problem Solved:** Feng shui calculation tools — includes bagua mapping, flying star (玄空飞星), and direction calculators.
- **Strongest Features:** Rare: actually attempts flying star feng shui calculation in JS. Apache-2.0 license allows commercial use.
- **Issues/Complaints:** No issues (low traction). No English UI. Limited documentation. Accuracy not independently verified.
- **Browser Tool:** YES — JS, GitHub Pages
- **Site Fit:** chinesefortunetools.com (feng shui tools section)
- **Reuse Risk:** Apache-2.0, very low (requires attribution)
- **Recommendation:** STUDY — inspect the flying star algorithm and rebuild with proper English UI and SEO content

---

### 8. `PepeGamboa/Calculadora-BaZi`
- **URL:** https://github.com/PepeGamboa/Calculadora-BaZi
- **Stars:** 7 | **Forks:** 2 | **Last Update:** 2026-04-24
- **Language:** HTML/JS | **License:** None
- **Live Demo:** https://pepegamboa.github.io/Calculadora-BaZi/ (confirmed working — GitHub Pages)
- **Problem Solved:** BaZi (Four Pillars of Destiny) calculator — generates 八字 from birth date/time.
- **Strongest Features:** Pure HTML/JS, no backend. Spanish-language UI (rare niche). Shows year/month/day/hour pillars.
- **Issues/Complaints:** No license (cannot reuse legally). Spanish UI only. File size 18.9MB (likely includes large assets). No interpretation beyond raw pillars.
- **Browser Tool:** YES
- **Site Fit:** chinesefortunetools.com
- **Reuse Risk:** No license = cannot legally reuse. Must rebuild.
- **Recommendation:** STUDY — look at UX approach. We already have a better BaZi tool per memory notes.

---

### 9. `BryceYuuu/jiyi-chinese-almanac`
- **URL:** https://github.com/BryceYuuu/jiyi-chinese-almanac
- **Stars:** 3 | **Forks:** 0 | **Last Update:** 2026-09-07
- **Language:** JavaScript | **License:** None
- **Live Demo:** None
- **Problem Solved:** Daily Chinese almanac (老黄历) — auspicious/inauspicious activities for each day, based on traditional Chinese almanac system.
- **Strongest Features:** Very niche — traditional almanac (宜/忌) system. Active development (updated Sep 2026). Unique content if translated to English.
- **Issues/Complaints:** No license. 36.9MB size suggests large data files. No English content.
- **Browser Tool:** Likely YES (JS)
- **Site Fit:** chinesefortunetools.com (daily almanac feature)
- **Reuse Risk:** No license — cannot reuse. Concept is free to implement.
- **Recommendation:** STUDY — "What can you do today? (Chinese almanac)" is a shareable daily tool idea

---

### 10. `liriansu-opus/chinese-calendar`
- **URL:** https://github.com/liriansu-opus/chinese-calendar (likely a fork of `LKI/chinese-calendar`)
- **Stars:** 1,372 | **Forks:** ~200 | **Last Update:** recent
- **Language:** Python | **License:** MIT
- **Live Demo:** None (Python API)
- **Problem Solved:** Authoritative Chinese public holiday data — determines if a date is a legal holiday, workday, or weekend (including makeup workdays). Updated annually with gov data.
- **Strongest Features:** Authoritative source. Used in production by many Chinese companies. Updated every year with official holiday announcements.
- **Issues/Complaints:** Python only, no browser version. Data needs annual update.
- **Browser Tool:** NO — but data can be extracted to JSON
- **Site Fit:** chinesefortunetools.com (holiday checker) or chinarules101.com (Chinese holiday explainer)
- **Reuse Risk:** MIT, safe
- **Recommendation:** STUDY — extract holiday data as JSON, build a "Chinese holiday countdown & explainer" browser tool

---

### 11. `joelcyn/ChineseZodiacCalculator`
- **URL:** https://github.com/joelcyn/ChineseZodiacCalculator
- **Stars:** 1 | **Forks:** 0 | **Last Update:** 2022-07-29
- **Language:** JavaScript | **License:** None
- **Live Demo:** None
- **Problem Solved:** Basic Chinese zodiac year calculation from birth year.
- **Strongest Features:** Minimal — single feature, easy to understand. 27MB size (large assets).
- **Issues/Complaints:** Abandoned 2022. No license. Only calculates zodiac year, ignores month/day boundary (Chinese New Year cutoff).
- **Browser Tool:** YES (but wrong for Jan/Feb edge cases)
- **Site Fit:** N/A
- **Recommendation:** IGNORE — we can build far better from scratch

---

### 12. `chinweibin-maker/zodiac-calculator`
- **URL:** https://github.com/chinweibin-maker/zodiac-calculator
- **Stars:** 1 | **Forks:** 0 | **Last Update:** 2026-07-30
- **Language:** HTML | **License:** None
- **Live Demo:** None
- **Problem Solved:** Simple HTML zodiac calculator.
- **Strongest Features:** Very simple codebase to learn from.
- **Issues/Complaints:** No license. No interactivity. No compatibility features.
- **Browser Tool:** YES
- **Site Fit:** N/A
- **Recommendation:** IGNORE

---

### 13. `timeless-perfections/Chinese-Zodiac-Calculator`
- **URL:** https://github.com/timeless-perfections/Chinese-Zodiac-Calculator
- **Stars:** 1 | **Forks:** 0 | **Last Update:** 2026-09-03
- **Language:** Java | **License:** None
- **Live Demo:** None
- **Problem Solved:** Java-based zodiac calculator.
- **Browser Tool:** NO (Java)
- **Recommendation:** IGNORE

---

### 14. `zym9863/Spring-Festival-Countdown`
- **URL:** https://github.com/zym9863/Spring-Festival-Countdown
- **Stars:** 1 | **Forks:** 0 | **Last Update:** 2025-09-14
- **Language:** CSS | **License:** MIT
- **Live Demo:** https://zym9863.github.io/Spring-Festival-Countdown/
- **Problem Solved:** Spring Festival (Chinese New Year) countdown timer webpage.
- **Strongest Features:** Working live demo. MIT licensed. Very lightweight (18KB). Clean countdown UI.
- **Issues/Complaints:** Single-purpose, hardcoded year. No multi-festival support. Chinese UI only.
- **Browser Tool:** YES — is a browser tool
- **Site Fit:** chinesefortunetools.com
- **Reuse Risk:** MIT, very low
- **Recommendation:** REUSE/REBUILD — concept is solid; expand to all 12 Chinese festivals with English explanations

---

### 15. `Cherrypick14/hotpotato`
- **URL:** https://github.com/Cherrypick14/hotpotato
- **Stars:** 1 | **Forks:** 0 | **Last Update:** 2025-08-25
- **Language:** TypeScript | **License:** GPL-3.0
- **Live Demo:** None
- **Problem Solved:** Despite the name, this is a code hotpot/snippet tool, NOT a Chinese food tool. Name is coincidental.
- **Strongest Features:** N/A (wrong domain)
- **Issues/Complaints:** Off-topic
- **Browser Tool:** NO (developer tool)
- **Site Fit:** None
- **Recommendation:** IGNORE

---

### 16. `fractionasian/kinship`
- **URL:** https://github.com/fractionasian/kinship
- **Stars:** 0 | **Forks:** 0 | **Last Update:** unknown
- **Language:** HTML | **License:** None
- **Live Demo:** None
- **Problem Solved:** Visual family tree / kinship terminology for Vietnamese and Chinese family relationship terms.
- **Strongest Features:** Exactly the niche we want — Chinese kinship terms (舅舅, 姑姑, 外婆 etc.) as a visual tool.
- **Issues/Complaints:** Zero stars, no license, likely abandoned/incomplete.
- **Browser Tool:** YES (HTML)
- **Site Fit:** chinarules101.com (Chinese family relationships explainer)
- **Reuse Risk:** No license = must rebuild
- **Recommendation:** REBUILD — concept perfectly fits chinarules101.com; "Chinese Family Tree & Relationship Names" is high SEO value

---

### 17. `muhac/chinese-holidays-calendar`
- **URL:** https://github.com/muhac/chinese-holidays-calendar
- **Stars:** 103 | **Forks:** ~20 | **Last Update:** recent
- **Language:** Haskell | **License:** MIT
- **Live Demo:** None (calendar subscription iCal format)
- **Problem Solved:** iCal subscription feed for Chinese public holidays (auto-updates with official announcements).
- **Strongest Features:** Auto-updating. Works with Google Calendar, Apple Calendar. Maintained.
- **Issues/Complaints:** Haskell (niche language). No browser UI.
- **Browser Tool:** NO — but data model is useful
- **Recommendation:** STUDY — extract holiday dates as JSON for a browser-based holiday checker tool

---

### 18. `baranwang/chinese-holidays-calendar`
- **URL:** https://github.com/baranwang/chinese-holidays-calendar
- **Stars:** 13 | **Forks:** 5 | **Last Update:** recent
- **Language:** JavaScript | **License:** MIT
- **Live Demo:** None
- **Problem Solved:** JavaScript library providing Chinese holiday data.
- **Strongest Features:** JS — can run in browser. MIT license. Smaller, easier to integrate than the Python versions.
- **Browser Tool:** YES
- **Site Fit:** chinesefortunetools.com
- **Reuse Risk:** MIT, very low
- **Recommendation:** REUSE — integrate as data source for a Chinese holiday countdown page

---

### 19. `oljc/chinese-lunar`
- **URL:** https://github.com/oljc/chinese-lunar
- **Stars:** 9 | **Forks:** 2 | **Last Update:** 2025-10-25
- **Language:** TypeScript | **License:** MIT
- **Live Demo:** None
- **Problem Solved:** TypeScript lunar calendar library — solar/lunar conversion, zodiac, solar terms.
- **Strongest Features:** TypeScript types for better IDE support. MIT license. Modern npm package structure.
- **Issues/Complaints:** Low adoption vs 6tail. Less complete feature set.
- **Browser Tool:** YES
- **Recommendation:** IGNORE — 6tail/lunar-javascript is more complete

---

### 20. `ClydeDz/horoscope-nuget`
- **URL:** https://github.com/ClydeDz/horoscope-nuget
- **Stars:** 6 | **Forks:** 2 | **Last Update:** 2024-07-31
- **Language:** C# | **License:** MIT
- **Live Demo:** None
- **Problem Solved:** C#/.NET NuGet package for Chinese zodiac and Western horoscope data.
- **Browser Tool:** NO (.NET)
- **Recommendation:** IGNORE

---

### 21. `AlbertHuangKSFO/lunar_mcp_server`
- **URL:** https://github.com/AlbertHuangKSFO/lunar_mcp_server
- **Stars:** 5 | **Forks:** 1 | **Last Update:** 2026-06-24
- **Language:** Python | **License:** MIT
- **Live Demo:** None
- **Problem Solved:** MCP server wrapping lunar calendar data for AI assistants.
- **Browser Tool:** NO (MCP server)
- **Recommendation:** IGNORE for tool-building purposes

---

### 22. `lidaobing/python-lunardate`
- **URL:** https://github.com/lidaobing/python-lunardate
- **Stars:** 74 | **Forks:** ~30 | **Last Update:** 2026-07-07
- **Language:** Python | **License:** GPL-3.0
- **Live Demo:** None (PyPI package)
- **Problem Solved:** Python library for Chinese lunar date conversion.
- **Browser Tool:** NO
- **Reuse Risk:** GPL-3.0 — copyleft, requires derived works to also be GPL
- **Recommendation:** IGNORE (prefer MIT-licensed 6tail alternatives)

---

### 23. `crazydogen/pynamer_CN`
- **URL:** https://github.com/crazydogen/pynamer_CN
- **Stars:** 4 | **Forks:** 1 | **Last Update:** recent
- **Language:** Python | **License:** None
- **Live Demo:** None
- **Problem Solved:** Chinese full name generator based on top 102 Chinese surnames.
- **Strongest Features:** Simple approach — surname + given name databases.
- **Browser Tool:** NO (Python)
- **Recommendation:** IGNORE — concept is good but approach is basic

---

### 24. `quangvinh86/SolarLunarCalendar`
- **URL:** https://github.com/quangvinh86/SolarLunarCalendar
- **Stars:** 7 | **Forks:** 3 | **Last Update:** 2026-01-08
- **Language:** Python | **License:** None
- **Live Demo:** None
- **Problem Solved:** Solar/lunar calendar converter — Vietnamese/Chinese focus.
- **Browser Tool:** NO
- **Recommendation:** IGNORE

---

### 25. `LiyaSyntax/China-name-generator`
- **URL:** https://github.com/LiyaSyntax/China-name-generator
- **Stars:** 0 | **Forks:** 0 | **Last Update:** recent
- **Language:** HTML | **License:** None
- **Live Demo:** None
- **Problem Solved:** Chinese name generator with Hanzi + Pinyin + English meaning.
- **Strongest Features:** Has English meaning output — rare for these tools.
- **Issues/Complaints:** Zero stars, likely incomplete, no license.
- **Browser Tool:** YES
- **Recommendation:** STUDY — the Hanzi + Pinyin + English meaning format is exactly what our audience needs; verify approach then rebuild

---

## Part 2: Top 10 Ideas (Ranked by Opportunity Score)

| Rank | Tool Idea | Source Repos | Dev Difficulty | SEO Potential | Shareability | Site Fit | Score |
|------|-----------|-------------|---------------|--------------|-------------|---------|-------|
| 1 | **Chinese Festival Countdown + Explainer** | zym9863 (MIT), baranwang (MIT), 6tail (MIT) | Low | Very High | Very High | chinesefortunetools.com | ⭐⭐⭐⭐⭐ |
| 2 | **Zi Wei Dou Shu (Purple Star) Astrolabe Generator** | SylarLong/iztro (MIT, 4k stars) | Medium | High | High | chinesefortunetools.com | ⭐⭐⭐⭐⭐ |
| 3 | **Chinese Family Relationship Name Translator** | fractionasian/kinship (concept only) | Low | High | Very High | chinarules101.com | ⭐⭐⭐⭐⭐ |
| 4 | **Classical Poetry Chinese Name Generator** | holynova/gushi_namer (no license — rebuild) | Medium | High | Very High | chinesefortunetools.com | ⭐⭐⭐⭐ |
| 5 | **Chinese Daily Almanac (老黄历) — What Can You Do Today?** | BryceYuuu/jiyi-chinese-almanac (concept), 6tail (MIT) | Medium | High | Very High | chinesefortunetools.com | ⭐⭐⭐⭐ |
| 6 | **Feng Shui Flying Star Calculator** | YuanZHAO321/FengShuiCalculators (Apache-2.0) | Medium | High | Medium | chinesefortunetools.com | ⭐⭐⭐⭐ |
| 7 | **Chinese Gift Taboo Checker** (number, color, item) | No direct source — rebuild from rules | Low | Very High | Very High | chinarules101.com | ⭐⭐⭐⭐ |
| 8 | **Chinese Zodiac Compatibility Checker** | 6tail/lunar-javascript (MIT) for zodiac data | Low | Very High | Very High | chinesefortunetools.com | ⭐⭐⭐⭐ |
| 9 | **Chinese Holiday "Is It a Day Off?" Checker** | baranwang (MIT), muhac (MIT), LKI/chinese-calendar (MIT) | Low | High | Medium | chinesefortunetools.com | ⭐⭐⭐ |
| 10 | **Chinese Tea Type Matcher** (mood → tea recommendation) | No direct source — original content tool | Low | Medium | Very High | chinarules101.com | ⭐⭐⭐ |

**Scoring rationale:**
- Festival Countdown: "days until Chinese New Year" is perennially searched; multi-festival expands coverage; easy to build on MIT stack
- Zi Wei Dou Shu: 4k-star library + zero English tools competing = blue ocean SEO
- Family Relationship Translator: "what do I call my uncle's wife in Chinese?" is a real, recurring, shareable problem with no clean web tool
- Gift Taboo Checker: Exactly what expats/tourists Google before giving gifts; high intent, zero competition with good UX

---

## Part 3: Top 3 Detailed Tool Proposals

---

### PROPOSAL 1: "Chinese Festival Countdown Hub"

**Tool Name:** Chinese Festival Countdown  
**Target URL:** chinesefortunetools.com/festivals/  
**Inspiration:** zym9863/Spring-Festival-Countdown (MIT, reuse CSS animation approach), 6tail/lunar-javascript (MIT, lunar date computation), baranwang/chinese-holidays-calendar (MIT, holiday date data)

**What Exists:**
- zym9863's tool: single-festival, Chinese UI only, hardcoded year, no explanations
- Google results: mostly static "Chinese holidays list" articles, no live countdown
- No tool combines multiple festivals + live countdown + English cultural context

**Original Web-Tool Version:**

**Core Differentiators:**
1. **12 Festivals, Not 1** — Covers Spring Festival, Lantern Festival, Qingming, Dragon Boat, Qixi (Valentine's), Mid-Autumn, Double 9, Winter Solstice, and 4 more. Each gets its own countdown clock.
2. **Culturally Contextual Countdown** — Below each timer: 3-sentence "why this matters" + traditional foods + taboos + gift ideas. Turns a countdown into a cultural education moment.
3. **"Gift Warning" badge** — If you're visiting China within 14 days of a festival, a banner tells you what NOT to buy and what IS expected.
4. **One-click share** — Pre-filled "X days until Dragon Boat Festival! [link]" for Twitter/WeChat. Virality built in.
5. **Personalised Alert** — localStorage saves your birthday; tool shows "Your birthday is during [festival] — here's what that traditionally means."

**Tech Stack:**
- 6tail/lunar-javascript for all date calculations (MIT, browser-ready)
- baranwang/chinese-holidays-calendar for official day-off data
- Vanilla JS + CSS, no framework needed
- ~200 lines of JS total, zero backend

**Dev Effort:** 2-3 days  
**SEO Keywords:** "days until chinese new year [year]", "chinese dragon boat festival 2027", "when is mid-autumn festival", "chinese holidays 2027"  
**Operating Cost:** $0 (static HTML)  
**Risk:** Very low — all MIT sources, mostly original content

---

### PROPOSAL 2: "Chinese Family Relationship Name Translator"

**Tool Name:** Chinese Family Name Decoder  
**Target URL:** chinarules101.com/family-relationships/  
**Inspiration:** fractionasian/kinship (concept — no license, cannot reuse), Wikipedia Chinese kinship terminology tables  

**What Exists:**
- fractionasian/kinship: incomplete, zero stars, no license, no English explanations
- Wikipedia: text tables, not interactive
- Reddit threads: "what do I call my girlfriend's grandmother?" — many upvotes, no clean tool answer
- No interactive web tool solves this

**The Problem:**
Chinese kinship is uniquely complex — the same person (e.g., maternal grandmother) has a completely different term from paternal grandmother (外婆 vs 奶奶). There are 40+ distinct terms vs. English's ~10. Foreigners in relationships with Chinese families, heritage learners, and researchers all struggle with this.

**Original Web-Tool Version:**

**Core Differentiators:**
1. **Relationship Builder UI** — User clicks through: "I am [male/female] → I want to address [mother's/father's side] → [brother/sister] → [their child/spouse]" — produces the exact Chinese term with Pinyin, tone marks, and audio pronunciation.
2. **Family Tree Visual** — Interactive SVG tree. Click any relative node → see Mandarin term, Cantonese term, English translation, usage note ("use this with elderly relatives"), example sentence.
3. **"How do I address them?" vs "How do I refer to them?"** — Chinese uses different terms when *talking to* vs. *talking about* a relative. No current tool explains this.
4. **Regional variants** — Shows when Northern Mandarin, Southern Mandarin, and Cantonese differ for the same relative.
5. **Downloadable cheat sheet** — One-page PDF family tree poster (drives email capture).

**Tech Stack:**
- Pure JavaScript + SVG for the family tree
- JSON data file with ~60 kinship terms, Pinyin, explanations
- No backend — fully static
- Data built from public domain sources (linguistics papers, Wikipedia)

**Dev Effort:** 3-4 days for MVP (tree builder + 40 terms)  
**SEO Keywords:** "chinese family relationship names", "how to say aunt in chinese", "chinese kinship terms", "what do i call uncle in chinese", "maternal vs paternal grandma chinese"  
**Operating Cost:** $0  
**Shareability:** Extremely high — foreigners dating Chinese partners, heritage learners, travel bloggers all share this  
**Risk:** Zero — original data compilation from public domain sources

---

### PROPOSAL 3: "Chinese Gift Taboo Checker"

**Tool Name:** Chinese Gift Advisor — What NOT to Give  
**Target URL:** chinarules101.com/gift-rules/ or chinesefortunetools.com/gift-checker/  
**Inspiration:** No existing GitHub tool. Problem verified by high Reddit/Quora search volume for "what not to give as a gift in China"  

**What Exists:**
- Listicle articles: "10 Things Not to Gift in China" — all static, all similar, no interactivity
- No tool lets you *check a specific gift*
- No tool covers *occasion-specific* etiquette (birthday vs. wedding vs. housewarming vs. hospital visit)

**Original Web-Tool Version:**

**Core Differentiators:**
1. **Gift Check Input** — User types a gift (e.g., "clock", "green hat", "pears", "umbrella") → tool instantly returns: RED (taboo — don't give), YELLOW (context-dependent), GREEN (good choice) with detailed explanation.
2. **Occasion Filter** — Select: birthday / wedding / business meeting / hospital visit / housewarming / Spring Festival → gift rules change (e.g., knives are fine for weddings in some regions, never for hospitals).
3. **Number Checker** — "I'm giving a set of 4 glasses — is that OK?" → Tool explains: 4 (四/sì) sounds like death (死/sǐ), very bad. Suggests giving 6 or 8 instead.
4. **Color & Packaging Rules** — White paper = mourning, red envelope = correct, check your wrapping before you go.
5. **Budget Etiquette** — "Is $15 too cheap for a wedding gift?" — contextual guidance on amounts by occasion and relationship.
6. **Quick-Share Card** — "I checked: ✅ Tea Set is a great Chinese gift" → shareable image for social.

**Gift Taboo Database (MVP — ~35 entries):**
- Physical items: clocks, shoes, pears, umbrellas, mirrors, green hats, handkerchiefs, books (書/死 homophone in some dialects), knives, scissors
- Numbers: 4, 14, 24, anything with 4. Favored: 6, 8, 9, 88, 168
- Colors: white, black (for gifts), red for envelopes, gold for prosperity
- Occasion rules: hospital (no flowers with strong scent, no clocks), business (no overly personal items first meeting), wedding (cash preferred over objects in most regions)

**Tech Stack:**
- JSON database of taboo items (fuzzy match on input)
- Simple text search + category filter in vanilla JS
- Optional: DeepSeek API integration to handle free-text queries ("can I give my Chinese colleague a bottle of wine?")
- No backend for MVP, API call as progressive enhancement

**Dev Effort:** 1-2 days for static MVP; +1 day for AI-enhanced search  
**SEO Keywords:** "chinese gift etiquette", "what not to give as a gift in china", "chinese gift taboos", "is it ok to give a clock as a gift in china", "chinese wedding gift rules"  
**Operating Cost:** $0 for static; minimal DeepSeek cost for AI queries  
**Shareability:** Very high — business travelers, expats, anyone attending a Chinese wedding  
**Risk:** Zero — original content, no code reuse required

---

## Appendix: Key Library Quick Reference

| Library | License | Browser? | Stars | Best Use |
|---------|---------|---------|-------|---------|
| 6tail/lunar-javascript | MIT | YES | 1,667 | All lunar date/zodiac/solar term calculations |
| SylarLong/iztro | MIT | YES (TS/npm) | 4,148 | Zi Wei Dou Shu natal charts |
| holynova/gushi_namer | NONE | YES | 2,249 | Concept only — classical poetry names |
| hythl0day/random_chinese_fantasy_names | MIT | YES | 234 | Wuxia name dataset |
| baranwang/chinese-holidays-calendar | MIT | YES | 13 | Chinese public holiday dates |
| YuanZHAO321/FengShuiCalculators | Apache-2.0 | YES | 5 | Feng shui direction/flying star algorithms |
| zym9863/Spring-Festival-Countdown | MIT | YES | 1 | Countdown UI pattern |

**Bottom line:** The Chinese cultural tools space has excellent raw libraries (especially 6tail and iztro) but almost no polished, English-friendly, SEO-optimized web tools built on top of them. Every tool above is beatable with 2-4 days of dev work and good English content.
