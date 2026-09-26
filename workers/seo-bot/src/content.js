
const MODEL = "@cf/meta/llama-3.3-70b-instruct-fp8-fast";
const SITE = "https://chinesefortunetools.online";
const ALLOWED_CATEGORIES = [
  "Chinese Zodiac",
  "Feng Shui",
  "Festivals & Customs",
  "Lucky Symbols",
  "Chinese Culture"
];

const ARTICLE_SCHEMA = {
  type: "object",
  properties: {
    slug: { type: "string" },
    title: { type: "string" },
    meta_description: { type: "string" },
    excerpt: { type: "string" },
    category: { type: "string", enum: ALLOWED_CATEGORIES },
    primary_keyword: { type: "string" },
    funnel_key: { type: "string", enum: ["zodiac", "bazi", "five-elements", "feng-shui", "2027", "home"] },
    alternatives: {
      type: "array",
      items: { type: "string" },
      minItems: 2,
      maxItems: 2
    },
    related_paths: {
      type: "array",
      items: { type: "string" },
      minItems: 3,
      maxItems: 5
    },
    sections: {
      type: "array",
      minItems: 5,
      maxItems: 8,
      items: {
        type: "object",
        properties: {
          heading: { type: "string" },
          paragraphs: {
            type: "array",
            minItems: 2,
            maxItems: 4,
            items: { type: "string" }
          }
        },
        required: ["heading", "paragraphs"]
      }
    },
    faq: {
      type: "array",
      minItems: 3,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          answer: { type: "string" }
        },
        required: ["question", "answer"]
      }
    },
    closing: { type: "string" }
  },
  required: [
    "slug",
    "title",
    "meta_description",
    "excerpt",
    "category",
    "primary_keyword",
    "funnel_key",
    "alternatives",
    "related_paths",
    "sections",
    "faq",
    "closing"
  ]
};

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function wordCount(article) {
  const parts = [];
  parts.push(article.title || "");
  parts.push(article.excerpt || "");
  for (const section of article.sections || []) {
    parts.push(section.heading || "");
    parts.push(...(section.paragraphs || []));
  }
  for (const item of article.faq || []) {
    parts.push(item.question || "");
    parts.push(item.answer || "");
  }
  parts.push(article.closing || "");
  return parts.join(" ").trim().split(/\s+/).filter(Boolean).length;
}

function parseAiResponse(result) {
  let value = result && result.response !== undefined ? result.response : result;
  if (typeof value === "string") {
    value = value.trim();
    if (value.startsWith("```")) {
      value = value.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    }
    value = JSON.parse(value);
  }
  return value;
}

async function getExistingContext(env) {
  const response = await fetch(SITE + "/sitemap.xml", {
    headers: { "user-agent": "CFT-Content-Growth-Bot/1.0" }
  });
  const xml = response.ok ? await response.text() : "";
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map(function (m) { return m[1].trim(); })
    .filter(function (url) { return url.startsWith(SITE); });

  const paths = urls.map(function (url) {
    try { return new URL(url).pathname; } catch { return "/"; }
  });

  const history = await env.CONTENT_QUEUE.get("content:history", "json") || [];
  return {
    paths: Array.from(new Set(paths)).slice(0, 180),
    history: history.slice(0, 40)
  };
}

function validateArticle(article, existing) {
  if (!article || typeof article !== "object") throw new Error("AI returned no article object");

  article.slug = slugify(article.slug || article.title);
  if (!article.slug || article.slug.length < 8) throw new Error("Invalid slug");

  const desiredPath = "/learn/" + article.slug + "/";
  if (existing.paths.includes(desiredPath)) {
    const suffix = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    article.slug = slugify(article.slug + "-" + suffix);
  }

  if (!ALLOWED_CATEGORIES.includes(article.category)) throw new Error("Invalid category");
  if (!article.title || article.title.length < 24 || article.title.length > 100) throw new Error("Invalid title length");
  if (!article.meta_description || article.meta_description.length < 80 || article.meta_description.length > 180) throw new Error("Invalid meta description");
  if (!Array.isArray(article.sections) || article.sections.length < 5) throw new Error("Too few sections");
  if (!Array.isArray(article.faq) || article.faq.length < 3) throw new Error("Too few FAQ items");

  article.related_paths = (article.related_paths || [])
    .filter(function (path) {
      return typeof path === "string" &&
        path.startsWith("/") &&
        existing.paths.includes(path);
    })
    .slice(0, 5);

  if (article.related_paths.length < 3) {
    article.related_paths = existing.paths
      .filter(function (path) { return path !== "/" && !path.startsWith("/learn/"); })
      .slice(0, 3);
  }

  const words = wordCount(article);
  if (words < 700) throw new Error("Article too short: " + words + " words");

  return words;
}

async function generateArticle(env, scheduledTime) {
  if (!env.AI || !env.CONTENT_QUEUE) throw new Error("AI or CONTENT_QUEUE binding missing");

  const existing = await getExistingContext(env);
  const recentTitles = existing.history.map(function (item) {
    return item.title + " [" + item.slug + "]";
  });

  const system = [
    "You are the editorial engine for ChineseFortuneTools.online, an English-language experimental site about Chinese zodiac, Feng Shui, Chinese festivals, lucky symbolism, and everyday Chinese cultural traditions.",
    "Create useful evergreen content for international readers.",
    "Treat fortune, zodiac, Feng Shui, lucky numbers, and similar material as traditional cultural beliefs, not scientifically proven facts.",
    "Never present medical, legal, financial, or safety advice.",
    "Do not invent quotations, studies, statistics, historical events, official dates, or citations.",
    "Avoid thin SEO filler. Explain context, practical examples, common misunderstandings, and regional variation where relevant.",
    "Internally consider three candidate topics, choose the strongest non-duplicate one, and return the other two titles in alternatives.",
    "Target roughly 900 to 1400 English words.",
    "The business goal is to send interested readers to ChineseFortuneTools.com for a deeper tool or calculator. Choose the most relevant funnel_key, but keep the article genuinely useful and avoid salesy repetition.",
    "Return only the requested structured JSON."
  ].join(" ");

  const user = [
    "Existing site paths:",
    JSON.stringify(existing.paths),
    "Recently generated topics:",
    JSON.stringify(recentTitles),
    "Choose a topic that clearly belongs on this site and is not substantially duplicated by the existing paths or recent titles.",
    "related_paths must contain 3 to 5 exact paths from the existing site paths.",
    "The slug must be concise lowercase English words separated by hyphens.",
    "Meta description should be about 120 to 160 characters.",
    "Use 5 to 8 substantive sections and 3 to 5 FAQs.",
    "Choose funnel_key from: zodiac -> https://chinesefortunetools.com/chinese-zodiac/; bazi -> https://chinesefortunetools.com/bazi-calculator/; five-elements -> https://chinesefortunetools.com/five-elements/; feng-shui -> https://chinesefortunetools.com/feng-shui/; 2027 -> https://chinesefortunetools.com/2027/; home -> https://chinesefortunetools.com/.",
    "Prefer topics where the reader has a natural next action on the linked main-site tool."
  ].join("\n");

  const result = await env.AI.run(MODEL, {
    messages: [
      { role: "system", content: system },
      { role: "user", content: user }
    ],
    response_format: {
      type: "json_schema",
      json_schema: ARTICLE_SCHEMA
    },
    max_tokens: 4200,
    temperature: 0.65
  });

  const article = parseAiResponse(result);
  const words = validateArticle(article, existing);
  const generatedAt = new Date(scheduledTime || Date.now()).toISOString();
  const id = generatedAt.slice(0, 10) + "-" + article.slug;

  const payload = {
    id: id,
    generatedAt: generatedAt,
    model: MODEL,
    site: SITE,
    wordCount: words,
    article: article
  };

  await env.CONTENT_QUEUE.put("content:latest", JSON.stringify(payload));
  await env.CONTENT_QUEUE.put("content:item:" + id, JSON.stringify(payload));

  const compact = {
    id: id,
    generatedAt: generatedAt,
    slug: article.slug,
    title: article.title,
    category: article.category,
    funnelKey: article.funnel_key,
    wordCount: words
  };

  const history = existing.history.filter(function (item) { return item.id !== id; });
  await env.CONTENT_QUEUE.put(
    "content:history",
    JSON.stringify([compact].concat(history).slice(0, 60))
  );

  return payload;
}

async function latestContent(env) {
  if (!env.CONTENT_QUEUE) return null;
  return env.CONTENT_QUEUE.get("content:latest", "json");
}

async function contentStatus(env) {
  if (!env.CONTENT_QUEUE) {
    return { ready: false, latest: null, history: [] };
  }
  const latest = await env.CONTENT_QUEUE.get("content:latest", "json");
  const history = await env.CONTENT_QUEUE.get("content:history", "json") || [];
  return {
    ready: true,
    schedule: "Tue/Fri 01:17 UTC (~09:17 China time)",
    model: MODEL,
    latest: latest ? {
      id: latest.id,
      generatedAt: latest.generatedAt,
      slug: latest.article.slug,
      title: latest.article.title,
      category: latest.article.category,
      funnelKey: latest.article.funnel_key,
      wordCount: latest.wordCount
    } : null,
    history: history
  };
}

export { generateArticle, latestContent, contentStatus };
