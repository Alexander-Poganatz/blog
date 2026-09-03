importScripts("/checklist/db.js")

const cacheName = "siteAssetsV4"
const assets = [
  "/checklist",
  "/checklist/",
  "/checklist/db.js",
  "/checklist/script.js",
  "/checklist/style.css",
  "/checklist/icon.svg",
  "/checklist/manifest.json"
]


self.addEventListener('install', function(event) {
  self.skipWaiting()
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets)
    })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim())
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k !== cacheName)
        .map(key => caches.delete(key)))
    })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(cacheResponse => {
    return cacheResponse || fetch(event.request)
  }));
});

self.addEventListener('message', function(event) {
  function save(store) {
    store.put(event.data)
  }
  openAndProcessDBFunc(save)
});
