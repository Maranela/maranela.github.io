self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => {
    return new Response('Offline - Feminist Guard PRO - BO:60014295069 - Safety First');
  }));
});
