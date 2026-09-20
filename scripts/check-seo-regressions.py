"""Block new or worsened findings without silently ignoring legacy SEO debt."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RANK = {'INFO':0,'P2':1,'P1':2,'P0':3}


def regressions(report, baseline):
    known = {issue['fingerprint']: issue for issue in baseline['issues']}
    failures = []
    for issue in report['issues']:
        old = known.get(issue['fingerprint'])
        if old is None or RANK[issue['severity']] > RANK[old['severity']]:
            failures.append(issue['fingerprint'])
        elif issue['actual'] != old['actual'] or issue.get('additionalActual') != old.get('additionalActual'):
            failures.append(issue['fingerprint'] + ' (changed evidence)')
    old_urls = {p['URL'] for p in baseline['pages']}
    if not old_urls <= {p['URL'] for p in report['pages']} or report['coverage']['truncated']:
        failures.append('incomplete crawl coverage')
    return failures


if __name__ == '__main__':
    report = json.loads((ROOT/'reports/seo/latest.json').read_text())
    baseline = json.loads((ROOT/'docs/seo-baseline.json').read_text())
    failures = regressions(report,baseline)
    if failures: raise SystemExit('SEO regressions: ' + ', '.join(failures))
    print(f"No SEO regression against reviewed Phase 1 baseline ({len(baseline['issues'])} existing findings)")
