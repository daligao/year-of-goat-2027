# Content model v1

Production pages remain at the repository root. This is a three-record proof of concept, not a content migration.

Use Markdown for editorial explanations, with JSON front matter between `---` delimiters. JSON is a subset of YAML; unrestricted YAML is intentionally not supported. Use JSON for structured datasets. Every record follows `schemas/content.schema.json` (JSON Schema 2020-12), including id, global slug, title, description, status, type, updatedAt and sourceUrl. Editorial records contain body; structured records contain data, exclusively. Dataset-specific nested schemas can be added when a publishing use case is approved; this version validates data as a nonempty object only.

IDs/slugs use lowercase ASCII hyphen-separated words. IDs and slugs must be unique across all categories. Types are festival/zodiac/greeting/tool. Statuses are draft/review/approved/published. Dates are real ISO YYYY-MM-DD calendar dates; blank/whitespace titles and descriptions are rejected at every status. Malformed JSON and missing metadata fail the command. Titles over 70 characters, descriptions outside 50–170 characters, and editorial bodies under 80 words warn. Warnings do not publish or change status.

Examples cite existing site routes/datasets and stay in draft/review. Their source facts have not been independently researched. The greeting is intentionally short so the thin-content warning is visible.

`python scripts/validate-content.py` validates; `python scripts/build-content.py` creates `.build/content/catalog.json`. That catalog is internal and is excluded from the public build manifest. No status, including published, causes page output in Phase 1.

Future lifecycle: AI submits draft through a branch; schema and editorial review run; a human approves; an explicit publisher renders an approved template with reviewed canonical and URL mapping. A separate release step sets published after deployment verification. None of those publication steps exist yet. Do not give future AI drafts credentials or write access to public pages.
