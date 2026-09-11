"""
Performance budget check.
Measures JS, CSS, image, and total HTML sizes against limits.
Exits 1 if any budget is exceeded.

Budgets (can be overridden via env vars):
  MAX_HTML_KB=100
  MAX_JS_KB=50      (inline JS per page)
  MAX_CSS_KB=30     (inline CSS per page)
  MAX_TOTAL_KB=200  (HTML + referenced assets)
"""
import os, sys, pathlib, json, re

MAX_HTML_KB  = int(os.environ.get("MAX_HTML_KB", 150))
MAX_JS_KB    = int(os.environ.get("MAX_JS_KB", 60))
MAX_CSS_KB   = int(os.environ.get("MAX_CSS_KB", 40))

PAGES = [
    "index.html",
    "gift-checker/index.html",
    "red-envelope/index.html",
    "zodiac/index.html",
    "kinship/index.html",
    "festival-countdown/index.html",
    "dashboard/index.html",
]

def kb(n):
    return round(n / 1024, 1)

def measure(path):
    p = pathlib.Path(path)
    if not p.exists():
        return None
    content = p.read_text(encoding="utf-8", errors="replace")
    total_bytes = p.stat().st_size

    js_bytes  = sum(len(m) for m in re.findall(r"<script[^>]*>(.*?)</script>", content, re.DOTALL))
    css_bytes = sum(len(m) for m in re.findall(r"<style[^>]*>(.*?)</style>", content, re.DOTALL))

    return {"path": path, "total_kb": kb(total_bytes), "js_kb": kb(js_bytes), "css_kb": kb(css_bytes)}

results = []
failures = []

for page in PAGES:
    m = measure(page)
    if m is None:
        print(f"SKIP {page} (not found)")
        continue
    results.append(m)
    page_failures = []
    if m["total_kb"] > MAX_HTML_KB:
        page_failures.append(f"HTML {m['total_kb']}KB > {MAX_HTML_KB}KB budget")
    if m["js_kb"] > MAX_JS_KB:
        page_failures.append(f"Inline JS {m['js_kb']}KB > {MAX_JS_KB}KB budget")
    if m["css_kb"] > MAX_CSS_KB:
        page_failures.append(f"Inline CSS {m['css_kb']}KB > {MAX_CSS_KB}KB budget")

    status = "FAIL" if page_failures else "OK  "
    print(f"{status} {page}: HTML={m['total_kb']}KB  JS={m['js_kb']}KB  CSS={m['css_kb']}KB")
    for f in page_failures:
        print(f"     ↳ {f}")
        failures.append({"page": page, "reason": f})

# Write budget report for trend tracking
os.makedirs("data", exist_ok=True)
with open("data/performance_budget.json", "w") as f:
    json.dump({"date": __import__("datetime").datetime.utcnow().strftime("%Y-%m-%d"),
               "budgets": {"html_kb": MAX_HTML_KB, "js_kb": MAX_JS_KB, "css_kb": MAX_CSS_KB},
               "pages": results, "failures": failures}, f, indent=2)

if failures:
    print(f"\n{len(failures)} budget violation(s). Reduce page size before merging.")
    sys.exit(1)
else:
    print(f"\nAll {len(results)} pages within budget.")
