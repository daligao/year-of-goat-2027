#!/usr/bin/env python3
"""Publish the latest AI-generated article from the Worker into /learn/<slug>/."""
from __future__ import annotations
import argparse, html, json, re, urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://chinesefortunetools.online"
WORKER = "https://cft-online-seo-bot.love0972.workers.dev"
ALLOWED = {"Chinese Zodiac","Feng Shui","Festivals & Customs","Lucky Symbols","Chinese Culture"}
FUNNELS = {
    "zodiac": ("https://chinesefortunetools.com/chinese-zodiac/", "Find your exact Chinese zodiac sign", "Use the LiChun-accurate zodiac calculator →"),
    "bazi": ("https://chinesefortunetools.com/bazi-calculator/", "Go deeper with your full BaZi chart", "Calculate your Four Pillars →"),
    "five-elements": ("https://chinesefortunetools.com/five-elements/", "Find your Chinese Five Element", "Try the Five Elements calculator →"),
    "feng-shui": ("https://chinesefortunetools.com/feng-shui/", "Explore practical Feng Shui tools", "Open the Feng Shui hub →"),
    "2027": ("https://chinesefortunetools.com/2027/", "See your full 2027 fortune", "Explore the 2027 Goat Year guide →"),
    "home": ("https://chinesefortunetools.com/", "Explore the full Chinese fortune toolkit", "Visit ChineseFortuneTools.com →"),
}
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

def esc(v): return html.escape(str(v or ""), quote=True)

def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent":"CFT-GitHub-Publisher/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read().decode("utf-8"))
    except Exception as e:
        print(f"No publishable payload: {e}")
        return None

def word_count(a):
    parts=[a.get("title",""),a.get("excerpt",""),a.get("closing","")]
    for s in a.get("sections",[]): parts += [s.get("heading","")] + s.get("paragraphs",[])
    for q in a.get("faq",[]): parts += [q.get("question",""),q.get("answer","")]
    return len(" ".join(parts).split())

def validate(p):
    if not p or p.get("site") != SITE: raise ValueError("wrong site")
    a=p.get("article") or {}; slug=a.get("slug","")
    if not SLUG_RE.fullmatch(slug) or not (8 <= len(slug) <= 80): raise ValueError("unsafe slug")
    if a.get("category") not in ALLOWED: raise ValueError("unsupported category")
    if a.get("funnel_key") not in FUNNELS: raise ValueError("unsupported funnel")
    if not (24 <= len(a.get("title","")) <= 100): raise ValueError("bad title length")
    if not (80 <= len(a.get("meta_description","")) <= 180): raise ValueError("bad meta description length")
    if len(a.get("sections",[])) < 5 or len(a.get("faq",[])) < 3: raise ValueError("too thin")
    if word_count(a) < 700: raise ValueError("article under 700 words")
    return a, slug

def render_article(p,a,slug):
    date=(p.get("generatedAt") or datetime.now(timezone.utc).isoformat())[:10]
    canonical=f"{SITE}/learn/{slug}/"
    funnel_key=a["funnel_key"]
    funnel_url,funnel_title,funnel_button=FUNNELS[funnel_key]
    tracked=f"{WORKER}/go/{funnel_key}?article={slug}"
    cta=f'<aside class="cta"><span class="cta-kicker">Try it on ChineseFortuneTools.com</span><h3>{esc(funnel_title)}</h3><p>Turn this guide into a personal result with the matching interactive tool on our main site.</p><a class="cta-btn" href="{esc(tracked)}" target="_blank" rel="noopener">{esc(funnel_button)}</a></aside>'
    sections=[]
    for i,s in enumerate(a["sections"]):
        paras="".join(f"<p>{esc(x)}</p>" for x in s.get("paragraphs",[]))
        section=f"<section><h2>{esc(s.get('heading'))}</h2>{paras}</section>"
        sections.append(section)
        if i == 1:
            sections.append(cta)
    faqs="".join(f"<details><summary>{esc(q['question'])}</summary><p>{esc(q['answer'])}</p></details>" for q in a["faq"])
    related=[]
    for path in a.get("related_paths",[])[:5]:
        if isinstance(path,str) and path.startswith("/") and ".." not in path:
            label=(path.strip("/").replace("-"," ").replace("/"," › ") or "Home").title()
            related.append(f'<li><a href="{esc(path)}">{esc(label)}</a></li>')
    article_schema={"@context":"https://schema.org","@type":"Article","headline":a["title"],"description":a["meta_description"],"url":canonical,"datePublished":date,"dateModified":date,"author":{"@type":"Organization","name":"Chinese Culture Lab"}}
    faq_schema={"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q["question"],"acceptedAnswer":{"@type":"Answer","text":q["answer"]}} for q in a["faq"]]}
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{esc(a["title"])}</title><meta name="description" content="{esc(a["meta_description"])}">
<link rel="canonical" href="{canonical}"><meta name="robots" content="index,follow">
<meta property="og:title" content="{esc(a["title"])}"><meta property="og:description" content="{esc(a["meta_description"])}"><meta property="og:url" content="{canonical}"><meta property="og:type" content="article">
<style>body{{margin:0;background:#fdf6e3;color:#1a1a2e;font-family:Georgia,serif;line-height:1.75}}nav{{background:#1a1a2e;padding:12px;text-align:center}}nav a{{color:#c9a84c;margin:0 10px;text-decoration:none;font-family:system-ui}}header,main{{max-width:820px;margin:auto;padding:38px 22px}}header{{text-align:center;padding-top:62px}}h1{{font-size:clamp(2rem,5vw,3.3rem);line-height:1.12}}h2{{border-left:4px solid #c9a84c;padding-left:12px}}.k{{color:#c0392b;font:700 12px system-ui;text-transform:uppercase;letter-spacing:1.2px}}.dek{{color:#555;font-size:1.08rem}}.note,.related,details{{background:#fff;border:1px solid #eadfbe;border-radius:12px;padding:16px 18px;margin:16px 0}}a{{color:#c0392b}}footer{{background:#1a1a2e;color:#aaa;text-align:center;padding:24px;font:13px system-ui}}footer a{{color:#c9a84c}}</style>
<script type="application/ld+json">{json.dumps(article_schema,ensure_ascii=False)}</script>
<script type="application/ld+json">{json.dumps(faq_schema,ensure_ascii=False)}</script></head>
<body><nav><a href="/">Culture Lab</a><a href="/2027/">2027</a><a href="/zodiac/">Zodiac</a><a href="/festival-countdown/">Festivals</a><a href="/learn/">Learn</a></nav>
<header><div class="k">{esc(a["category"])}</div><h1>{esc(a["title"])}</h1><p class="dek">{esc(a["excerpt"])}</p><small>Published {date} · {word_count(a)} words</small></header>
<main><div class="note"><strong>Cultural note:</strong> Zodiac, Feng Shui, luck, and symbolism are traditional cultural frameworks; interpretations vary by region, family, and school of thought.</div>
{''.join(sections)}<section><h2>Frequently Asked Questions</h2>{faqs}</section><p>{esc(a["closing"])}</p>{cta}
<div class="related"><strong>Related pages</strong><ul>{''.join(related)}</ul></div></main>
<footer><a href="/">Chinese Culture Lab</a> · <a href="/learn/">Learn</a> · <a href="/sitemap.xml">Sitemap</a></footer></body></html>"""

def load_log():
    p=ROOT/"data"/"ai-content-log.json"
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {"articles":[]}

def save_log(log):
    p=ROOT/"data"/"ai-content-log.json"; p.parent.mkdir(exist_ok=True)
    p.write_text(json.dumps(log,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

def render_index(log):
    cards=[]
    for x in log.get("articles",[]):
        cards.append(f'<article><div class="cat">{esc(x.get("category"))}</div><h2><a href="/learn/{esc(x["slug"])}/">{esc(x["title"])}</a></h2><p>{esc(x.get("excerpt"))}</p><small>{esc(x.get("published"))} · {esc(x.get("wordCount"))} words</small></article>')
    body="".join(cards) or "<p>No guides published yet.</p>"
    page=f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Chinese Culture Guides — Chinese Culture Lab</title><meta name="description" content="Growing English guides about Chinese zodiac, Feng Shui, festivals, lucky symbolism, and cultural traditions."><link rel="canonical" href="{SITE}/learn/"><style>body{{margin:0;background:#fdf6e3;color:#1a1a2e;font-family:Georgia,serif}}nav{{background:#1a1a2e;padding:13px;text-align:center}}nav a{{color:#c9a84c;margin:0 10px;text-decoration:none}}main{{max-width:980px;margin:auto;padding:48px 20px}}.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}}article{{background:#fff;border:1px solid #e8dfc8;border-radius:14px;padding:20px}}article a{{color:#1a1a2e;text-decoration:none}}.cat,small{{font:12px system-ui;color:#8a6000}}</style></head><body><nav><a href="/">Culture Lab</a><a href="/2027/">2027</a><a href="/zodiac/">Zodiac</a><a href="/learn/">Learn</a></nav><main><h1>Chinese Culture Guides</h1><p>A growing experiment in practical English guides about Chinese culture.</p><div class="grid">{body}</div></main></body></html>"""
    d=ROOT/"learn"; d.mkdir(exist_ok=True); (d/"index.html").write_text(page,encoding="utf-8")

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--endpoint",required=True); args=ap.parse_args()
    payload=fetch_json(args.endpoint)
    if not payload: return 0
    try: a,slug=validate(payload)
    except Exception as e:
        print(f"Validation rejected article: {e}"); return 0
    target=ROOT/"learn"/slug/"index.html"
    if target.exists():
        print(f"Already published: {slug}"); return 0
    target.parent.mkdir(parents=True,exist_ok=True); target.write_text(render_article(payload,a,slug),encoding="utf-8")
    log=load_log()
    entry={"id":payload.get("id"),"slug":slug,"title":a["title"],"excerpt":a["excerpt"],"category":a["category"],"primaryKeyword":a.get("primary_keyword"),"funnelKey":a.get("funnel_key"),"funnelUrl":FUNNELS[a.get("funnel_key")][0],"published":(payload.get("generatedAt") or "")[:10],"wordCount":payload.get("wordCount") or word_count(a),"model":payload.get("model")}
    log["articles"]=[entry]+[x for x in log.get("articles",[]) if x.get("slug")!=slug]
    save_log(log); render_index(log)
    print(f"Published draft into repo: /learn/{slug}/")
    return 0

if __name__=="__main__": raise SystemExit(main())
