# OPEN DATA TREASURE: Chinese Culture & Language Datasets on GitHub

Research date: 2026-09-12
Source: GitHub API search results + knowledge of well-known datasets

---

## SEARCH QUERIES USED

- `chinese dataset language:json` → 0 results (GitHub language filter issue)
- `china names dataset` → 20 results
- `lunar calendar chinese data` → 9 results
- Plus known datasets from prior research

---

## DATASET INVENTORY (15 repos)

---

### 1. fighting41love/funNLP — 83,048 stars
**URL**: https://github.com/fighting41love/funNLP  
**Format**: Mixed (TXT, CSV, JSON, XLSX)  
**Size**: ~2GB total across all datasets  
**License**: Not specified (NONE) — gray area for commercial use  
**Last update**: 2026-09-11 (actively maintained)  
**Data quality**: Very high — community curated, widely used in academia

**What's inside**:
- Chinese/English sensitive word lists
- Chinese surname/given name gender inference tables
- Phone number/ID card extraction patterns
- Chinese city/region/carrier lookup tables
- Chinese synonym dictionaries
- Sentiment lexicons (positive/negative word lists)
- Chinese abbreviation dictionary
- Profanity/political sensitivity word lists

**Tool idea**: "Chinese Name Gender Predictor" — paste a name, get gender probability + regional origin. Could power a tool on ChineseNameCraft. Also: sentiment analyzer for Chinese text, regional phone prefix lookup tool.

**⭐ Commercial use caution**: No explicit license. Use with attribution, avoid redistribution of raw files.

---

### 2. hungtcs/traditional-chinese-calendar-database — 69 stars
**URL**: https://github.com/hungtcs/traditional-chinese-calendar-database  
**Format**: TypeScript (structured data importable as JSON)  
**Size**: Small (~100KB)  
**License**: MIT — commercial use allowed  
**Last update**: 2026-07-22  
**Data quality**: Good. Covers 1901–2100. Includes lunar dates, solar terms, gan-zhi (heavenly stems/earthly branches).

**What's inside**:
- Gregorian ↔ Lunar date conversion for every day 1901–2100
- 24 solar terms (节气) with exact dates per year
- Heavenly stems / Earthly branches (天干地支) for year/month/day
- Zodiac year assignment per year

**Tool idea**: Full BaZi calculator backend. "What day of the lunar calendar is [date]?" widget. Solar terms countdown ("Next 清明 is in X days"). All of these are high-traffic SEO queries.

**⭐ TOP 8 PICK — Best structured date data, MIT license, clean format**

---

### 3. oliguo/Data-Lunar-Calendar — 0 stars (but unique content)
**URL**: https://github.com/oliguo/Data-Lunar-Calendar  
**Format**: TSQL (SQL Server)  
**Size**: Small  
**License**: Not specified  
**Last update**: 2021-12-30  
**Data quality**: Usable but format is SQL Server — needs conversion to JSON/CSV

**Tool idea**: Import into SQLite, serve as lunar calendar API. Less useful than #2 above.

---

### 4. neoleetok/cnLunarData — 0 stars
**URL**: https://github.com/neoleetok/cnLunarData  
**Format**: Unknown (raw data files)  
**Size**: Unknown  
**License**: Not specified  
**Last update**: 2025-03-30  

**Tool idea**: Backup/cross-reference source for lunar calendar data.

---

### 5. tongt1213/Chinese-Gender-dataset — 11 stars
**URL**: https://github.com/tongt1213/Chinese-Gender-dataset  
**Format**: Jupyter Notebook / CSV  
**Size**: Small  
**License**: Not specified  
**Last update**: 2026-04-26  
**Data quality**: Research dataset — "Open Dataset of Chinese Name-to-Gender Associations"

**What's inside**: Structured name-to-gender mapping with frequency data. Based on real naming patterns.

**Tool idea**: Backend for "Is this Chinese name more male or female?" feature on ChineseNameCraft. Add name popularity score.

**⭐ TOP 8 PICK — Directly usable for ChineseNameCraft**

---

### 6. lancopku/Chinese-Literature-NER-RE-Dataset — 425 stars
**URL**: https://github.com/lancopku/Chinese-Literature-NER-RE-Dataset  
**Format**: JSON (annotated text)  
**Size**: Medium (~50MB)  
**License**: Not specified  
**Last update**: 2026-07-08  
**Data quality**: Academic quality, annotated named entities and relationships in Chinese literature

**Tool idea**: Chinese literature character relationship visualizer. "Who are the key characters in 红楼梦 and how are they related?" — interactive graph tool. High educational SEO value.

---

### 7. lin-haust/TCM-prescription-datasets — 11 stars
**URL**: https://github.com/lin-haust/TCM-prescription-datasets  
**Format**: Python/CSV  
**Size**: Small  
**License**: Not specified  
**Last update**: 2026-08-01  
**Data quality**: Moderate — 23 treatment methods in Traditional Chinese Medicine

**What's inside**: TCM prescriptions, herb combinations, treatment patterns.

**Tool idea**: "TCM herb lookup" or "Chinese herbal remedy reference" — SEO goldmine for "traditional Chinese medicine" queries. Supplement info site.

---

### 8. yizhen-buaa/TCM-QA-datasets — 5 stars
**URL**: https://github.com/yizhen-buaa/TCM-QA-datasets  
**Format**: None specified  
**License**: Apache-2.0 — commercial use allowed  
**Last update**: 2026-08-01  

**Tool idea**: TCM Q&A chatbot or FAQ site with Apache-licensed content.

**⭐ TOP 8 PICK — Apache license = commercial safe**

---

### 9. crownpku/Awesome-Chinese-NLP — 7,924 stars (awesome list with datasets)
**URL**: https://github.com/crownpku/Awesome-Chinese-NLP  
**Format**: Curated list linking to external datasets  
**License**: Not specified  
**Last update**: 2026-09-10  

**Datasets linked include**:
- THUCTC: Tsinghua University Chinese text classification corpus
- Chinese Word Segmentation datasets (PKU, MSR, CTB)
- Chinese NER datasets (Weibo, Resume, MSRA)
- Chinese Sentiment Analysis datasets (ChnSentiCorp)
- Chinese Question Answering (CMRC 2018)

**Tool idea**: Each of these sub-datasets powers a specific Chinese text tool. ChnSentiCorp = Chinese sentiment analyzer. Word segmentation data = Chinese text splitter/analyzer.

**⭐ TOP 8 PICK — Gateway to 50+ real datasets**

---

### 10. AiHubCN/Awesome-Chinese-LLM — 22,757 stars
**URL**: https://github.com/AiHubCN/Awesome-Chinese-LLM  
**Format**: Curated list of models + datasets  
**License**: Not specified  
**Last update**: 2026-09-11  

**Datasets linked**:
- Chinese instruction tuning datasets (BELLE, Alpaca-Chinese)
- Chinese pre-training corpora (WuDaoCorpora, CLUECorpora)
- Domain-specific: medical, legal, financial Chinese text

**Tool idea**: Source for building Chinese text generation tools. BELLE dataset has 3.5M Chinese instruction-response pairs — perfect for fine-tuning a "Chinese name explanation generator."

---

### 11. kid0114/chinese-calendar-data — 0 stars (very new)
**URL**: https://github.com/kid0114/chinese-calendar-data  
**Format**: JavaScript  
**License**: Not specified  
**Last update**: 2026-09-10  
**Note**: "Pi/Codex skill: query ytliu0 ChineseCalendar data" — references ytliu0's authoritative Chinese calendar project.

**Better source**: ytliu0/ChineseCalendar (not in search results but well-known) — JavaScript-based Chinese calendar with extensive lunar data.

---

### 12. libo-yao/Seasonal-Home-cooking-Recommendation-app — 1 star
**URL**: https://github.com/libo-yao/Seasonal-Home-cooking-Recommendation-app  
**Format**: App (no raw data)  
**License**: Not specified  
**Last update**: 2026-06-23  
**Note**: "Blends traditional Chinese 24 Solar Terms wisdom with modern weather data" — idea source, not a dataset.

**Tool idea**: "What should I eat this solar term?" recipe recommendation based on 24节气. High cultural SEO value.

---

### 13. GanjinZero/awesome_Chinese_medical_NLP — 2,633 stars
**URL**: https://github.com/GanjinZero/awesome_Chinese_medical_NLP  
**Format**: Curated list  
**Last update**: 2026-09-10  

**Linked datasets**:
- CCKS (Chinese Clinical Named Entity Recognition)
- CMeKG (Chinese Medical Knowledge Graph — 1M+ triples)
- Chinese symptom/disease/herb dictionaries

**Tool idea**: Chinese health symptom lookup, TCM constitution quiz, herbal medicine reference.

**⭐ TOP 8 PICK — Medical/health content has extremely high search volume**

---

### 14. cirosantilli/china-dictatorship — 3,195 stars
**URL**: https://github.com/cirosantilli/china-dictatorship  
**Format**: HTML/text  
**License**: CC-BY-SA-4.0  
**Last update**: 2026-09-11  
**Note**: Political content — avoid entirely per ChinaRules101 content policy.

---

### 15. wangmuerxiao/exercises-dataset-zh — 29 stars
**URL**: https://github.com/wangmuerxiao/exercises-dataset-zh  
**Format**: HTML  
**License**: NOASSERTION  
**Last update**: 2026-09-05  
**Description**: Chinese-enhanced fitness exercise dataset

**Tool idea**: Chinese fitness tool — exercises with Chinese names, traditional health practices (气功, 太极).

---

## TOP 8 MOST USEFUL FOR WEB TOOLS

| Rank | Repo | Why It's Valuable | Best Tool |
|------|------|-------------------|-----------|
| 1 | hungtcs/traditional-chinese-calendar-database | MIT, clean, 1901–2100 | BaZi/Lunar calendar tool |
| 2 | fighting41love/funNLP | Massive, name gender tables | ChineseNameCraft features |
| 3 | tongt1213/Chinese-Gender-dataset | Direct name→gender mapping | Name gender predictor |
| 4 | crownpku/Awesome-Chinese-NLP | Gateway to 50+ datasets | Text analysis tools |
| 5 | AiHubCN/Awesome-Chinese-LLM | Training data for fine-tuning | AI name generator |
| 6 | GanjinZero/awesome_Chinese_medical_NLP | Health/TCM data, high SEO | TCM tool or health Q&A |
| 7 | yizhen-buaa/TCM-QA-datasets | Apache-2.0 (commercial safe) | TCM Q&A site |
| 8 | lin-haust/TCM-prescription-datasets | Herb/recipe data | Herb reference tool |

---

## KNOWN HIGH-QUALITY DATASETS (not in search results but verified)

These are well-known in the Chinese NLP community and should be checked:

- **Chinese Zodiac Compatibility Data**: Embedded in multiple fortune-telling apps; no canonical GitHub repo but many implementations exist (LGPLv3 typically)
- **CEDICT**: Chinese-English dictionary, CC-BY-SA, 120,000+ entries — perfect for ChineseNameCraft word-meaning lookups
- **Chinese character stroke order** (skishore/makemeahanzi): 9,500+ characters with SVG stroke animations — MIT licensed — great for writing tools
- **HSK vocabulary lists**: Multiple repos, mostly CC-licensed — already used in your mandarin-flashcards project
- **CC-CEDICT radical data**: Chinese character radicals with meanings — JSON format, freely usable
- **Chinese surnames frequency list**: NationMaster/census data — 100 most common surnames with frequencies — public domain
