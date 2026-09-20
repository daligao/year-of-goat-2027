function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
}

function match(html, regex) {
  const m = html.match(regex);
  return m ? m[1].trim() : null;
}

export default {
  async fetch(request, env) {
    const reqUrl = new URL(request.url);

    if (reqUrl.pathname === "/") {
      return json({
        name: "CFT Online SEO Bot",
        status: "running",
        example:
          "/audit?url=https://chinesefortunetools.online/"
      });
    }

    if (reqUrl.pathname !== "/audit") {
      return json({ error: "Not found" }, 404);
    }

    const target =
      reqUrl.searchParams.get("url") ||
      "https://chinesefortunetools.online/";

    let targetUrl;

    try {
      targetUrl = new URL(target);
    } catch {
      return json({ error: "Invalid URL" }, 400);
    }

    // This experiment is only allowed to inspect our own site.
    if (
      targetUrl.protocol !== "https:" ||
      targetUrl.hostname !== "chinesefortunetools.online"
    ) {
      return json(
        { error: "Only chinesefortunetools.online is allowed" },
        403
      );
    }

    try {
      const rendered = await env.BROWSER.quickAction("content", {
        url: targetUrl.toString(),
        gotoOptions: {
          waitUntil: "networkidle2"
        },
        rejectResourceTypes: ["image", "media", "font"]
      });

      const html = await rendered.text();

      const title = match(
        html,
        /<title[^>]*>([\s\S]*?)<\/title>/i
      );

      const description = match(
        html,
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
      );

      const canonical = match(
        html,
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
      );

      const robots = match(
        html,
        /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i
      );

      const h1Count =
        (html.match(/<h1\b[^>]*>/gi) || []).length;

      const issues = [];

      if (!title) issues.push("Missing title");
      if (!description) issues.push("Missing meta description");
      if (!canonical) issues.push("Missing canonical");
      if (h1Count === 0) issues.push("Missing H1");
      if (h1Count > 1) issues.push(`Multiple H1 tags: ${h1Count}`);

      return json({
        target: targetUrl.toString(),
        renderedBy: "Cloudflare Browser Run",
        title,
        description,
        canonical,
        robots,
        h1Count,
        issues,
        result: issues.length === 0 ? "PASS" : "WARNING"
      });
    } catch (error) {
      return json(
        {
          target: targetUrl.toString(),
          result: "FAIL",
          error: String(error)
        },
        500
      );
    }
  }
};
