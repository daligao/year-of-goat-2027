const SITES = [
  { key: "cft-online", name: "ChineseFortuneTools.online", host: "chinesefortunetools.online", base: "https://chinesefortunetools.online" },
  { key: "cft", name: "ChineseFortuneTools.com", host: "chinesefortunetools.com", base: "https://chinesefortunetools.com" },
  { key: "cutdone", name: "CutDone", host: "cutdone.com", base: "https://cutdone.com" },
  { key: "omt", name: "OrdinaryManTrying", host: "ordinarymantrying.com", base: "https://ordinarymantrying.com" },
  { key: "tea", name: "ChinaTea101", host: "chinatea101.com", base: "https://chinatea101.com" },
  { key: "rules", name: "ChinaRules101", host: "chinarules101.com", base: "https://chinarules101.com" },
  { key: "namecraft", name: "ChineseNameCraft", host: "chinesenamecraft.com", base: "https://chinesenamecraft.com" },
  { key: "hotpot", name: "Hotpot101", host: "hotpot101.com", base: "https://hotpot101.com" },
  { key: "one-dollar", name: "One Dollar Experiment", host: "one-dollar.ordinarymantrying.com", base: "https://one-dollar.ordinarymantrying.com" },
  { key: "zfuye", name: "ZFUYE", host: "zfuye.org", base: "https://zfuye.org" }
];

const SITEMAP_PATHS = ["/sitemap.xml", "/wp-sitemap.xml", "/sitemap_index.xml"];
const MAX_CHILD_SITEMAPS = 8;
const MAX_AUDIT_PAGES = 30;

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function normalizeHost(host) {
  return String(host || "").toLowerCase().replace(/^www\./, "");
}

function resolveSite(value) {
  if (!value) return SITES[0];

  const raw = String(value).trim().toLowerCase();
  const byKey = SITES.find((site) => site.key === raw);
  if (byKey) return byKey;

  let host = raw;
  try {
    const parsed = new URL(raw.includes("://") ? raw : "https://" + raw);
    host = parsed.hostname;
  } catch {
    return null;
  }

  const normalized = normalizeHost(host);
  return SITES.find((site) => normalizeHost(site.host) === normalized) || null;
}

function siteForUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    const normalized = normalizeHost(parsed.hostname);
    return SITES.find((site) => normalizeHost(site.host) === normalized) || null;
  } catch {
    return null;
  }
}

function match(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function getAttr(tag, name) {
  const regex = new RegExp("\\b" + name + "\\s*=\\s*([\"'])([\\s\\S]*?)\\1", "i");
  const m = tag.match(regex);
  return m ? m[2].trim() : null;
}

function findTag(html, tagName, attrName, attrValue) {
  const tags = html.match(new RegExp("<" + tagName + "\\b[^>]*>", "gi")) || [];
  return tags.find((tag) => {
    const value = getAttr(tag, attrName);
    return value && value.toLowerCase() === attrValue.toLowerCase();
  }) || null;
}

function analyzeHtml(url, html, source) {
  const title = match(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const descriptionTag = findTag(html, "meta", "name", "description");
  const canonicalTag = findTag(html, "link", "rel", "canonical");
  const robotsTag = findTag(html, "meta", "name", "robots");

  const description = descriptionTag ? getAttr(descriptionTag, "content") : null;
  const canonical = canonicalTag ? getAttr(canonicalTag, "href") : null;
  const robots = robotsTag ? getAttr(robotsTag, "content") : null;
  const h1Count = (html.match(/<h1\b[^>]*>/gi) || []).length;

  const issues = [];
  if (!title) issues.push("Missing title");
  if (!description) issues.push("Missing meta description");
  if (!canonical) issues.push("Missing canonical");
  if (h1Count === 0) issues.push("Missing H1");
  if (h1Count > 1) issues.push("Multiple H1 tags: " + h1Count);

  return {
    target: url,
    source,
    title,
    description,
    canonical,
    robots,
    h1Count,
    issues,
    result: issues.length === 0 ? "PASS" : "WARNING"
  };
}

async function browserHtml(env, url) {
  const rendered = await env.BROWSER.quickAction("content", {
    url,
    gotoOptions: {
      waitUntil: "networkidle2",
      timeout: 10000
    },
    rejectResourceTypes: ["image", "media", "font"]
  });

  const raw = await rendered.text();
  let html = raw;

  try {
    const payload = JSON.parse(raw);
    if (typeof payload === "string") {
      html = payload;
    } else if (payload && typeof payload.result === "string") {
      html = payload.result;
    }
  } catch {
    // Browser Run returned raw HTML directly.
  }

  return html;
}

async function directHtml(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "OPC-SEO-Bot/3.0" }
  });

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  return response.text();
}

async function auditPage(env, url, mode = "browser") {
  try {
    const html = mode === "direct"
      ? await directHtml(url)
      : await browserHtml(env, url);

    if (!html || !/<html\b/i.test(html)) {
      throw new Error("No usable HTML returned by " + mode);
    }

    return analyzeHtml(
      url,
      html,
      mode === "direct" ? "direct-fetch" : "browser-run"
    );
  } catch (error) {
    return {
      target: url,
      source: mode === "direct" ? "direct-fetch" : "browser-run",
      issues: [],
      result: "FAIL",
      error: String(error)
    };
  }
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((m) => m[1].trim())
    .filter(Boolean);
}

function isAllowedPageUrl(url, site) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" &&
      normalizeHost(parsed.hostname) === normalizeHost(site.host);
  } catch {
    return false;
  }
}

async function fetchXml(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "OPC-SEO-Bot/3.0" }
  });

  if (!response.ok) return null;

  const text = await response.text();
  if (!/<(?:urlset|sitemapindex)\b/i.test(text)) return null;

  return text;
}

async function discoverSitemap(site) {
  for (const path of SITEMAP_PATHS) {
    const url = site.base + path;
    const xml = await fetchXml(url);
    if (xml) return { url, xml };
  }

  return null;
}

async function readSiteUrls(site) {
  const sitemap = await discoverSitemap(site);

  if (!sitemap) {
    return {
      sitemapUrl: null,
      sitemapType: "none",
      urls: [site.base + "/"],
      note: "No supported sitemap found; auditing homepage only."
    };
  }

  const locs = extractLocs(sitemap.xml);

  if (/<sitemapindex\b/i.test(sitemap.xml)) {
    const childSitemaps = locs
      .filter((url) => isAllowedPageUrl(url, site))
      .slice(0, MAX_CHILD_SITEMAPS);

    const pages = [];

    for (const childUrl of childSitemaps) {
      const childXml = await fetchXml(childUrl);
      if (!childXml) continue;

      pages.push(
        ...extractLocs(childXml).filter((url) => isAllowedPageUrl(url, site))
      );
    }

    return {
      sitemapUrl: sitemap.url,
      sitemapType: "index",
      childSitemapsRead: childSitemaps.length,
      urls: [...new Set(pages)],
      note: locs.length > MAX_CHILD_SITEMAPS
        ? "Sitemap index capped at " + MAX_CHILD_SITEMAPS + " child sitemaps per request."
        : null
    };
  }

  return {
    sitemapUrl: sitemap.url,
    sitemapType: "urlset",
    urls: [...new Set(locs.filter((url) => isAllowedPageUrl(url, site)))],
    note: null
  };
}

async function auditSite(env, site, limit) {
  const discovery = await readSiteUrls(site);
  const selected = discovery.urls.slice(0, limit);
  const results = [];

  for (let i = 0; i < selected.length; i += 5) {
    const batch = selected.slice(i, i + 5);
    const batchResults = await Promise.all(
      batch.map((url) => auditPage(env, url, "direct"))
    );
    results.push(...batchResults);
  }

  return {
    site: {
      key: site.key,
      name: site.name,
      host: site.host
    },
    sitemapUrl: discovery.sitemapUrl,
    sitemapType: discovery.sitemapType,
    childSitemapsRead: discovery.childSitemapsRead || 0,
    sitemapUrls: discovery.urls.length,
    auditedPages: results.length,
    pass: results.filter((x) => x.result === "PASS").length,
    warning: results.filter((x) => x.result === "WARNING").length,
    fail: results.filter((x) => x.result === "FAIL").length,
    scanMode: "direct-fetch",
    limited: discovery.urls.length > results.length,
    note: discovery.note,
    issues: results
      .filter((x) => x.result !== "PASS")
      .map((x) => ({
        url: x.target,
        result: x.result,
        issues: x.issues,
        error: x.error || null
      })),
    results
  };
}

async function checkSites(env) {
  const rows = [];

  for (let i = 0; i < SITES.length; i += 5) {
    const batch = SITES.slice(i, i + 5);
    const batchResults = await Promise.all(
      batch.map(async (site) => {
        const result = await auditPage(env, site.base + "/", "direct");
        return {
          key: site.key,
          name: site.name,
          host: site.host,
          result: result.result,
          issues: result.issues,
          error: result.error || null,
          audit: "/site-audit?site=" + encodeURIComponent(site.host)
        };
      })
    );
    rows.push(...batchResults);
  }

  return rows;
}

export default {
  async fetch(request, env) {
    const reqUrl = new URL(request.url);

    if (reqUrl.pathname === "/") {
      return json({
        name: "OPC Multi-Site SEO Bot",
        status: "running",
        version: "site-audit-v3",
        sites: SITES.length,
        endpoints: {
          sites: "/sites",
          sitesHealth: "/sites?check=1",
          siteAudit: "/site-audit?site=cutdone.com&limit=20",
          browserAudit: "/audit?url=https://cutdone.com/"
        }
      });
    }

    if (reqUrl.pathname === "/sites") {
      if (reqUrl.searchParams.get("check") === "1") {
        return json({
          version: "site-audit-v3",
          checked: SITES.length,
          sites: await checkSites(env)
        });
      }

      return json({
        version: "site-audit-v3",
        sites: SITES.map((site) => ({
          key: site.key,
          name: site.name,
          host: site.host,
          audit: "/site-audit?site=" + encodeURIComponent(site.host)
        }))
      });
    }

    if (reqUrl.pathname === "/site-audit") {
      const site = resolveSite(reqUrl.searchParams.get("site"));

      if (!site) {
        return json(
          {
            error: "Unknown site",
            allowed: SITES.map((item) => item.host)
          },
          400
        );
      }

      const requested = Number(reqUrl.searchParams.get("limit") || "20");
      const limit = Number.isFinite(requested)
        ? Math.min(Math.max(Math.floor(requested), 1), MAX_AUDIT_PAGES)
        : 20;

      try {
        return json(await auditSite(env, site, limit));
      } catch (error) {
        return json(
          {
            site: site.host,
            result: "FAIL",
            error: String(error)
          },
          500
        );
      }
    }

    if (reqUrl.pathname === "/audit") {
      const target = reqUrl.searchParams.get("url") || SITES[0].base + "/";
      const site = siteForUrl(target);

      if (!site) {
        return json(
          {
            error: "Only configured sites are allowed",
            allowed: SITES.map((item) => item.host)
          },
          403
        );
      }

      const targetUrl = new URL(target).toString();
      const result = await auditPage(env, targetUrl, "browser");

      return json(
        {
          renderedBy: "Cloudflare Browser Run",
          site: site.host,
          ...result
        },
        result.result === "FAIL" ? 500 : 200
      );
    }

    return json({ error: "Not found" }, 404);
  }
};
