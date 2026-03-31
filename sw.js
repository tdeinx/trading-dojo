/**
 * TRADING DOJO — Service Worker v1.0
 * Caches all module pages for fast loading and offline access
 */

const CACHE_NAME = 'trading-dojo-v1';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/instruments.html',
  '/styles.html',
  '/platforms.html',
  '/charts-module.html',
  '/risk-module.html',
  '/dna-quiz.html',
  '/simulator.html',
  '/sim-entry.html',
  '/dojo-engine.js',
  '/dojo-theme.css',
  '/manifest.json',
];

// ── INSTALL — cache all core pages ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(CACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE — clean up old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH — serve from cache, fall back to network ──
self.addEventListener('fetch', event => {
  // Skip non-GET and external requests
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        // Return cached version and update in background
        const fetchPromise = fetch(event.request).then(response => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(() => cached);
        return cached;
      }
      // Not in cache — fetch from network
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    })
  );
});
