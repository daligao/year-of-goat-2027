function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function match(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

function getAttr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1].trim() : null;
}

function findTag(html, tagName, attrName, attrValue) {
  const tags = html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) || [];
  return tags.find((tag) => {
    const value = getAttr(tag, attrName);
    return value && value.toLowerCase() === attrValue.toLowerCase();
  }) || null;
}

async function renderedHtml(env, url) {
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

async function auditPage(env, url) {
  try {
    const html = await renderedHtml(env, url);

    const title = match(html, /<title[^>]*>([\\s\\S]*?)<\\/title>/i);

    const descriptionTag = findTag(html, "meta", "name", "description");
    const canonicalTag = findTag(html, "link", "rel", "canonical");
    const robotsTag = findTag(html, "meta", "name", "robots");

    const description = descriptionTag ? getAttr(descriptionTag, "content") : null;
    const canonical = canonicalTag ? getAttr(canonicalTag, "href") : null;
    const robots = robotsTag ? getAttr(robotsTag, "content") : null;
    const h1Count = (html.match(/<h1\\b[^>]*>/gi) || []).length;

    const issues = [];
    if (!title) issues.push("Missing title");
    if (!description) issues.push("Missing meta description");
    if (!canonical) issues.push("Missing canonical");
    if (h1Count === 0) issues.push("Missing H1");
    if (h1Count > 1) issues.push(`Multiple H1 tags: ${h1Count}`);

    return {
      target: url,
      title,
      description,
      canonical,
      robots,
      h1Count,
      issues,
      result: issues.length === 0 ? "PASS" : "WARNING"
    };
  } catch (error) {
    return {
      target: url,
      issues: [],
      result: "FAIL",
      error: String(error)
    };
  }
}

async function readSitemap() {
  const sitemapUrl = "https://chinesefortunetools.online/sitemap.xml";
  const response = await fetch(sitemapUrl, {
    headers: { "user-agent": "CFT-SEO-Bot/1.0" }
  });

  if (!response.ok) {
    throw new Error(`Sitemap HTTP ${response.status}`);
  }

  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>\\s*([^<]+?)\\s*<\\/loc>/gi)]
    .map((m) => m[1].trim())
    .filter((url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === "https:" &&
          parsed.hostname === "chinesefortunetools.online";
      } catch {
        return false;
      }
    });

  return [...new Set(urls)];
}

async function auditSite(env, limit) {
  const urls = await readSitemap();
  const selected = urls.slice(0, limit);
  const results = [];

  for (let i = 0; i < selected.length; i += 2) {
    const batch = selected.slice(i, i + 2);
    const batchResults = await Promise.all(
      batch.map((url) => auditPage(env, url))
    );
    results.push(...batchResults);
  }

  const summary = {
    sitemapUrls: urls.length,
    auditedPages: results.length,
    pass: results.filter((x) => x.result === "PASS").length,
    warning: results.filter((x) => x.result === "WARNING").length,
    fail: results.filter((x) => x.result === "FAIL").length
  };

  return {
    ...summary,
    limited: urls.length > results.length,
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

export default {
  async fetch(request, env) {
    const reqUrl = new URL(request.url);

    if (reqUrl.pathname === "/") {
      return json({
        name: "CFT Online SEO Bot",
        status: "running",
        version: "site-audit-v1",
        endpoints: {
          page: "/audit?url=https://chinesefortunetools.online/",
          site: "/site-audit",
          siteLimited: "/site-audit?limit=5"
        }
      });
    }

    if (reqUrl.pathname === "/site-audit") {
      const requested = Number(reqUrl.searchParams.get("limit") || "20");
      const limit = Number.isFinite(requested)
        ? Math.min(Math.max(Math.floor(requested), 1), 20)
        : 20;

      try {
        return json(await auditSite(env, limit));
      } catch (error) {
        return json(
          {
            result: "FAIL",
            error: String(error)
          },
          500
        );
      }
    }

    if (reqUrl.pathname === "/audit") {
      const target =
        reqUrl.searchParams.get("url") ||
        "https://chinesefortunetools.online/";

      let targetUrl;
      try {
        targetUrl = new URL(target);
      } catch {
        return json({ error: "Invalid URL" }, 400);
      }

      if (
        targetUrl.protocol !== "https:" ||
        targetUrl.hostname !== "chinesefortunetools.online"
      ) {
        return json(
          { error: "Only chinesefortunetools.online is allowed" },
          403
        );
      }

      const result = await auditPage(env, targetUrl.toString());
      return json(
        {
          renderedBy: "Cloudflare Browser Run",
          ...result
        },
        result.result === "FAIL" ? 500 : 200
      );
    }

    return json({ error: "Not found" }, 404);
  }
};
