# AWESOME LIST GOLD: Practical Resources for Solo Website Owners

Research date: 2026-09-12
Source: GitHub API search results for awesome+china/chinese (>50 stars) + curated knowledge

---

## SEARCH RESULTS ANALYZED

Top 20 awesome-china/chinese repos by stars:

| Repo | Stars | Description |
|------|-------|-------------|
| fighting41love/funNLP | 83,048 | Chinese NLP resources + datasets |
| AiHubCN/Awesome-Chinese-LLM | 22,757 | Chinese LLM models + datasets |
| crownpku/Awesome-Chinese-NLP | 7,924 | Chinese NLP resources |
| dyweb/awesome-resume-for-chinese | 8,404 | Chinese resume templates |
| lonePatient/awesome-pretrained-chinese-nlp-models | 5,590 | Pre-trained Chinese NLP models |
| eastlakeside/awesome-productivity-cn | 2,815 | Chinese productivity tools |
| GanjinZero/awesome_Chinese_medical_NLP | 2,633 | Chinese medical NLP |
| hyper0x/awesome-go-China | 1,508 | Go libraries by Chinese devs |
| golang-china/awesome-go-zh | 1,267 | Go resources in Chinese |

---

## PRACTICAL RESOURCES EXTRACTED PER AWESOME LIST

---

### FROM: fighting41love/funNLP (83k stars)

**Resource 1: Chinese Name & Gender Database**
- What: Text files mapping 中文名 → gender probability, regional popularity
- Use for: ChineseNameCraft — "Is this name male or female?" feature
- Legal: No license stated; use for display, don't redistribute raw files
- Build: Static JSON lookup, no server needed

**Resource 2: Chinese Sentiment Lexicons**
- What: 正面词/负面词 lists (thousands of words with polarity scores)
- Use for: "How does this name sound?" vibe analyzer on ChineseNameCraft
- Build: Client-side JavaScript lookup, zero server cost

**Resource 3: Chinese City/Region Data**
- What: Province → city → district hierarchy with codes
- Use for: ChinaRules101 region-specific etiquette content, hotpot regional variation pages
- Build: JSON dropdown, fully static

**Resource 4: Phone Number Prefix Lookup**
- What: First 7 digits of Chinese mobile → carrier + region
- Use for: "Which province is this number from?" tool — high search volume
- Build: ~50KB JSON file, pure client-side

**Resource 5: Chinese Abbreviation Dictionary**
- What: Chinese abbreviations expanded (e.g., 北大 → 北京大学)
- Use for: ChinaRules101 "Chinese abbreviations explained" content
- Build: Static page generator

---

### FROM: AiHubCN/Awesome-Chinese-LLM (22k stars)

**Resource 1: BELLE Chinese Instruction Dataset**
- What: 3.5M Chinese question-answer pairs covering cooking, culture, history, daily life
- Use for: Training a lightweight Chinese Q&A model OR generating SEO content at scale
- License: Apache-2.0 on most subsets
- Build: Use as content seed for programmatic pages

**Resource 2: Chinese Medical Q&A Dataset (MedQA-Chinese)**  
- What: Medical Q&A in Chinese, standardized exam format
- Use for: TCM health info tool content
- License: Varies by subset

**Resource 3: Chinese Food/Cooking Instructions**
- What: Embedded in BELLE dataset — cooking instructions for thousands of recipes in Chinese
- Use for: HotPot101 recipe content, Chinese cooking tool
- Build: Filter BELLE for food-related QA pairs

**Resource 4: Open-source Chinese Models (Qwen, ChatGLM, Baichuan)**
- What: Freely deployable Chinese language models
- Use for: Cheap AI inference for Chinese tools — run on Colab/Modal instead of paying OpenAI
- Cost: Qwen-1.8B fits on free GPU tiers
- Build: API wrapper using free GPU (Modal.com free tier: 30 GPU-hours/month)

---

### FROM: crownpku/Awesome-Chinese-NLP (7.9k stars)

**Resource 1: jieba (词法分析/word segmentation)**
- What: Python library + pure-JS port — splits Chinese text into words
- Use for: Any Chinese text tool that needs word-level analysis
- License: MIT
- Build: Include jieba-js in browser, zero server needed

**Resource 2: THUCTC Text Classification Corpus**
- What: 750k+ labeled Chinese news articles across 14 categories
- Use for: Train a Chinese article classifier — auto-tag content on ChinaRules101
- License: Free for research

**Resource 3: ChnSentiCorp**
- What: Chinese sentiment analysis dataset (hotel/book/shopping reviews)
- Use for: "Rate this business name — does it sound positive?" analyzer
- License: Not specified

**Resource 4: HanLP**
- What: Full Chinese NLP toolkit — segmentation, POS tagging, NER, dependency parsing
- License: Apache-2.0
- Use for: Power Chinese text analysis features without calling an external API
- Build: Use hanlp-restful (free online API) for low-traffic tools

---

### FROM: GanjinZero/awesome_Chinese_medical_NLP (2.6k stars)

**Resource 1: CMeKG (Chinese Medical Knowledge Graph)**
- What: 1 million+ entity-relation triples about diseases, symptoms, herbs, treatments
- License: CC-BY-SA
- Use for: TCM herb reference tool on ChineseFortuneTools or a new ChinaTea101 section
- Build: Import subset into SQLite, serve as searchable reference

**Resource 2: CHIP Medical NER Dataset**
- What: Named entity recognition in Chinese clinical text
- License: Available for research
- Use for: Chinese health symptom checker content

**Resource 3: Chinese Herb Database (via linked repos)**
- What: ~500 common herbs with properties, uses, contraindications
- Use for: "What herbs are in this TCM formula?" lookup tool
- Build: JSON file, static search with Fuse.js

---

### FROM: eastlakeside/awesome-productivity-cn (2.8k stars)

**Resource 1: Chinese Pomodoro/Time Apps**
- What: List of productivity apps by Chinese developers, many open source
- Use for: Discover tools to embed or partner with for Chinese audience

**Resource 2: Chinese Keyboard Input Method Resources**
- What: Wubi/Pinyin input method data and tools
- Use for: Chinese text input research for writing tool on ChineseNameCraft

**Resource 3: Chinese Note-taking Templates**
- What: Obsidian/Notion templates in Chinese
- Use for: Content ideas for ChinaRules101 "Chinese work culture" articles

---

### FROM: dyweb/awesome-resume-for-chinese (8.4k stars)

**Resource 1: LaTeX Chinese Resume Templates**
- What: Beautiful typeset resume templates that handle Chinese characters properly
- Use for: "Chinese resume name card generator" tool — enter Chinese name, get styled PDF
- License: Mixed (most MIT)
- Build: Use pdflatex via serverless function or pre-generate in browser with PDF.js

**Resource 2: HTML/JS Resume Templates**  
- What: Single-page HTML resumes supporting Chinese fonts
- Use for: "Chinese business card generator" on ChineseNameCraft — premium feature
- Build: Adapt existing templates, add custom name rendering

---

### FROM: lonePatient/awesome-pretrained-chinese-nlp-models (5.6k stars)

**Resource 1: Chinese BERT variants**
- What: BERT-base-Chinese, RoBERTa-wwm-Chinese — pre-trained embeddings for Chinese text
- Use for: Semantic similarity between Chinese names, "find names that sound like X"
- Cost: Free inference via HuggingFace Inference API (limited) or Colab
- Build: Cache top-1000 name embeddings as JSON, skip live inference

**Resource 2: Domain-specific Models (legal, finance, TCM)**
- What: Fine-tuned BERT models for specific domains
- Use for: Auto-classify ChinaRules101 content topics without manual tagging

---

## RESOURCES BY USE CASE

### Build a website tool
- jieba-js (MIT) — Chinese word segmentation, client-side
- HanLP REST API (free tier) — full NLP analysis
- CMeKG herb database — TCM lookup tool
- Chinese lunar calendar database (MIT) — BaZi/date tools

### Get legal open data
- hungtcs/traditional-chinese-calendar-database — MIT, 1901-2100
- yizhen-buaa/TCM-QA-datasets — Apache-2.0
- BELLE dataset — Apache-2.0
- CEDICT (Chinese-English dictionary) — CC-BY-SA

### Reduce hosting cost
- Everything above is static-file-compatible — no server needed
- Use Cloudflare Pages (free) + Workers KV for dynamic lookups
- Use client-side WASM for jieba segmentation (zero server)

### Automate work
- BELLE dataset: generate SEO content at scale (seed → expand with AI)
- funNLP abbreviation dict: auto-expand Chinese abbreviations in content
- City hierarchy data: auto-generate regional pages for ChinaRules101

### Improve SEO
- Chinese calendar data → 365 "what day is [date] on the Chinese calendar" pages
- Herb data → 500+ "what is [herb] used for in TCM" pages  
- City data → "etiquette in [city]" regional guides

### Add AI cheaply
- Qwen-1.8B on Modal.com (30 free GPU-hours/month) — Chinese text generation
- ChatGLM-6B on Colab (free T4 GPU) — conversational Chinese AI
- HanLP free API (Tencent-hosted) — NLP without API cost

---

## RESOURCES TO SKIP

- cirosantilli/china-dictatorship — political content, avoid entirely
- rshipp/awesome-malware-analysis — irrelevant domain
- shmilylty/awesome-hacking — security/hacking focus, off-brand
- laoma2053/awesome-zhuiju-free — piracy content, legal risk
