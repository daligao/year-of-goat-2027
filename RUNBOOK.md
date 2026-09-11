# Chinese Culture Lab — Runbook

## Emergency Rollback

Site is broken and you need to go back to yesterday's version immediately.

```bash
# 1. Find the last good commit
git log --oneline -10

# 2. Revert to it (replace abc1234 with the commit hash)
git revert HEAD --no-edit          # undo last commit safely
git push origin main

# OR: hard reset to a specific commit (destructive — only if revert fails)
git reset --hard abc1234
git push origin main --force-with-lease
```

**GitHub Pages deploys within ~2 minutes of push.**

---

## Kill a Broken Tool (Without Redeploying)

Edit `site-config/config.json`:

```json
"kill_switches": {
  "gift-checker": false
}
```

Push to main. The tool card on the homepage goes grey + "Paused" within seconds (no rebuild needed — it's fetched client-side).

To re-enable: set back to `true`.

---

## Show an Emergency Banner

Edit `site-config/config.json`:

```json
"banners": {
  "enabled": true,
  "message": "We are investigating an issue with the Red Envelope Calculator.",
  "style": "warning",
  "link": "",
  "link_text": ""
}
```

Push. Banner appears on all pages within seconds.

`style` options: `info` (blue) · `warning` (amber) · `error` (red)

---

## Promote a Tool: Lab → Beta → Stable

In `data/tools.json`, change the tool's `stage` field:

| Stage | URL visible at | Homepage shown |
|-------|----------------|----------------|
| `lab` | `/lab/tool-id/` | No |
| `beta` | `/beta/tool-id/` | No |
| `stable` | `/tool-id/` | Yes |

Also update `status`:
- `testing` → shown in lab tier
- `growing` → shown in beta tier
- (stable tools are listed directly on homepage)

---

## Trigger Manual Workflows

```
GitHub → Actions tab → select workflow → "Run workflow"
```

| Workflow | What it does |
|----------|-------------|
| `build.yml` | Rebuild sitemap + Pagefind index |
| `weekly-audit.yml` | Run SEO audit now |
| `visual-regression.yml` | Take screenshots now |
| `graduation-check.yml` | Check graduation thresholds now |
| `precompute.yml` | Rebuild lunar-dates.json |

---

## Issue Commands (in any Issue comment)

```
/seo-audit          — run full audit, post results as comment
/list-tools         — list all experiments with status
/help               — show command table
```

Only works for @daligao comments.

---

## Prod Checklist (before merging to main)

- [ ] `build.yml` passes (green)
- [ ] `analyze` (CodeQL) passes (green)
- [ ] Title 20–70 chars, description ≤165 chars
- [ ] No missing canonical or H1
- [ ] GA4 tag present
- [ ] JSON-LD schema present
