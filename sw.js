// Feminist-Guard v32 - PWA Service Worker
const CACHE_NAME = 'fg-v32-cache';
const FILES_TO_CACHE = [
  '.',
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', event => {
  console.log('v32 Service Worker installing');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('v32 Service Worker activating');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
