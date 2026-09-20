#!/usr/bin/env python3
"""Inject GA4 measurement G-HY5MJJP86Z into all static HTML pages."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GA4_ID = "G-HY5MJJP86Z"
LEGACY_TAG = "GT-NCLSMV4H"

SNIPPET = f"""<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={GA4_ID}"></script>
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){{dataLayer.push(arguments);}}
gtag('js',new Date());
gtag('config','{GA4_ID}');
</script>
"""

updated = []
skipped = []

for path in ROOT.rglob("*.html"):
    rel = path.relative_to(ROOT)
    if "_pagefind" in rel.parts or ".git" in rel.parts:
        continue

    text = path.read_text(encoding="utf-8")

    if GA4_ID in text:
        skipped.append(str(rel))
        continue

    if LEGACY_TAG in text:
        text = text.replace(
            f"https://www.googletagmanager.com/gtag/js?id={LEGACY_TAG}",
            f"https://www.googletagmanager.com/gtag/js?id={GA4_ID}"
        )
        legacy_config = f"gtag('config','{LEGACY_TAG}');"
        if legacy_config in text:
            text = text.replace(
                legacy_config,
                f"gtag('config','{GA4_ID}');gtag('config','{LEGACY_TAG}');"
            )
        else:
            marker = "gtag('js',new Date());"
            text = text.replace(
                marker,
                marker + f"gtag('config','{GA4_ID}');",
                1
            )
    else:
        if "</head>" not in text:
            print(f"SKIP no </head>: {rel}")
            continue
        text = text.replace("</head>", SNIPPET + "</head>", 1)

    path.write_text(text, encoding="utf-8")
    updated.append(str(rel))

print(f"GA4 ID: {GA4_ID}")
print(f"Updated HTML files: {len(updated)}")
print(f"Already had GA4: {len(skipped)}")
for item in updated[:30]:
    print("UPDATED", item)
if len(updated) > 30:
    print(f"... and {len(updated)-30} more")
