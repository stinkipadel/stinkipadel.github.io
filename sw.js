// RacketAI Service Worker v3.31
// Aggiorna CACHE_NAME ad ogni release per forzare il refresh

const CACHE_NAME = 'racketai-v3.31';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Install: pre-cache
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(STATIC_ASSETS);
    }).then(function() {
      return self.skipWaiting(); // Attiva subito senza aspettare
    })
  );
});

// Activate: elimina cache vecchie — questo forza il refresh
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    }).then(function() {
      return self.clients.claim(); // Prendi controllo di tutte le tab aperte
    })
  );
});

// Fetch: network-first per index.html (sempre versione fresca),
// cache-first per gli altri asset statici
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  var url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // index.html: sempre dalla rete, aggiorna cache
  if (url.pathname === '/' || url.pathname === '/index.html') {
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          var toCache = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, toCache);
          });
        }
        return response;
      }).catch(function() {
        return caches.match('/index.html');
      })
    );
    return;
  }

  // Altri file: cache-first
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200) return response;
        var toCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, toCache);
        });
        return response;
      }).catch(function() {
        return caches.match('/index.html');
      });
    })
  );
});
