const CACHE='guard-v18.1-fixed';
const ASSETS=['./','./index.html?v=18.1','./manifest.json?v=18.1','./icon192.png','./icon512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>{
    if(k!==CACHE) return caches.delete(k);
  }))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
