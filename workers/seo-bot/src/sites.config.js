// workers/seo-bot/src/sites.config.js
// 10-site registry for OPC Multi-Site SEO Bot.
// This keeps the same key/name/host/base fields already used by index.js.

export const SITES = [
  { key: "cft-online", name: "ChineseFortuneTools.online", host: "chinesefortunetools.online", base: "https://chinesefortunetools.online", stage: "experiment", category: "tools-content", language: "en" },
  { key: "cft", name: "ChineseFortuneTools.com", host: "chinesefortunetools.com", base: "https://chinesefortunetools.com", stage: "active", category: "tools-content", language: "en" },
  { key: "cutdone", name: "CutDone", host: "cutdone.com", base: "https://cutdone.com", stage: "active", category: "product", language: "en" },
  { key: "omt", name: "OrdinaryManTrying", host: "ordinarymantrying.com", base: "https://ordinarymantrying.com", stage: "active", category: "blog", language: "en" },
  { key: "tea", name: "ChinaTea101", host: "chinatea101.com", base: "https://chinatea101.com", stage: "active", category: "content-tools", language: "en" },
  { key: "rules", name: "ChinaRules101", host: "chinarules101.com", base: "https://chinarules101.com", stage: "active", category: "content", language: "en" },
  { key: "namecraft", name: "ChineseNameCraft", host: "chinesenamecraft.com", base: "https://chinesenamecraft.com", stage: "active", category: "tools-content", language: "en" },
  { key: "hotpot", name: "Hotpot101", host: "hotpot101.com", base: "https://hotpot101.com", stage: "early", category: "content", language: "en" },
  { key: "one-dollar", name: "One Dollar Experiment", host: "one-dollar.ordinarymantrying.com", base: "https://one-dollar.ordinarymantrying.com", stage: "experiment", category: "experiment", language: "en" },
  { key: "zfuye", name: "ZFUYE", host: "zfuye.org", base: "https://zfuye.org", stage: "active", category: "blog", language: "zh" }
];

export const SITEMAP_PATHS = [
  "/sitemap.xml",
  "/wp-sitemap.xml",
  "/sitemap_index.xml"
];
