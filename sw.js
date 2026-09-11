const CACHE = 'culturelab-v3';
const STATIC = [
  '/', '/gift-checker/', '/red-envelope/', '/zodiac/', '/kinship/',
  '/festival-countdown/', '/lab/', '/beta/', '/dashboard/',
  '/data/tools.json', '/data/zodiac.json', '/data/festivals.json',
  '/data/season.json', '/data/metrics.json',
  '/api/v1/chinese-new-year.json', '/api/v1/festivals.json',
  '/api/v1/zodiac.json', '/api/v1/lucky-numbers.json', '/api/v1/gift-taboos.json',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(STATIC).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Skip external requests (GA4, CDN, GitHub API)
  if (url.hostname !== self.location.hostname) return;

  // Network-first for data files (keep metrics/tools fresh)
  if (url.pathname.startsWith('/data/') || url.pathname.startsWith('/api/')) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Stale-while-revalidate for HTML pages
  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request).then(res => {
        if (res.ok) caches.open(CACHE).then(c => c.put(e.request, res.clone()));
        return res;
      }).catch(() => cached);
      return cached || fresh;
    })
  );
});

// Background sync: proactively refresh core data when connection restores
self.addEventListener('sync', e => {
  if (e.tag === 'refresh-data') {
    e.waitUntil(
      caches.open(CACHE).then(cache =>
        Promise.allSettled(['/data/tools.json', '/data/metrics.json', '/data/season.json']
          .map(u => fetch(u).then(r => { if (r.ok) cache.put(u, r); })))
      )
    );
  }
});
