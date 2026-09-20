#!/usr/bin/env python3
"""Build script: reads data/tools.json, updates sitemap.xml"""
import json, sys, os, glob
from datetime import date

def load_tools():
    with open('data/tools.json') as f:
        return json.load(f)

def update_sitemap(data):
    base = data['site']['base_url'].rstrip('/')
    today = str(date.today())
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
             f'  <url><loc>{base}/</loc><lastmod>{today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>']
    # Tool pages from tools.json
    for t in data['tools']:
        if t['status'] == 'retired': continue
        if t.get('stage') == 'lab': continue
        url = base + t['url']
        pri = t.get('priority', 0.8)
        lines.append(f'  <url><loc>{url}</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>{pri}</priority></url>')
    # Programmatic SEO pages (2027/sign/month/)
    for path in sorted(glob.glob('2027/*/*/index.html')):
        url_path = '/' + path.replace('index.html', '')
        lines.append(f'  <url><loc>{base}{url_path}</loc><lastmod>{today}</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>')

    # Automatically generated evergreen guides under /learn/.
    if os.path.exists('learn/index.html'):
        lines.append(f'  <url><loc>{base}/learn/</loc><lastmod>{today}</lastmod><changefreq>weekly</changefreq><priority>0.75</priority></url>')
    for path in sorted(glob.glob('learn/*/index.html')):
        url_path = '/' + path.replace('index.html', '')
        lines.append(f'  <url><loc>{base}{url_path}</loc><lastmod>{today}</lastmod><changefreq>monthly</changefreq><priority>0.65</priority></url>')

    lines.append('</urlset>')
    with open('sitemap.xml', 'w') as f:
        f.write('\n'.join(lines) + '\n')
    print(f"sitemap.xml updated")

def list_tools(data):
    print(f"Tools in data/tools.json ({len(data['tools'])} total):")
    for t in data['tools']:
        print(f"  [{t['status']}] {t['emoji']} {t['title']} → {t['url']}")

def check_all(data):
    list_tools(data)
    print()
    update_sitemap(data)

if __name__ == '__main__':
    action = sys.argv[1] if len(sys.argv) > 1 else 'update-sitemap'
    data = load_tools()
    {'update-sitemap': update_sitemap, 'list-tools': list_tools, 'check-all': check_all}.get(action, update_sitemap)(data)
