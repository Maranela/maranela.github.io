// v33 PROFESSIONAL - NO BONGANE - Force clear old v31 cache
const CACHE_NAME = 'fg-v33-PROFESSIONAL-NO-BONGANE-v3';
self.addEventListener('install', e => {
  console.log('v33 installing - clearing old');
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(['./index.html?v=33']);
    })
  );
});
self.addEventListener('activate', e => {
  console.log('v33 activating - deleting old caches');
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('Deleting old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  // Network first - always get new v33, not cache
  e.respondWith(
    fetch(e.request).then(response => {
      return response;
    }).catch(() => {
      return caches.match(e.request);
    })
  );
});
