const cacheName = "siteAssets"
const assets = [
  "/checklist",
  "/checklist/script.js",
  "/checklist/style.css",
  "/checklist/icon.svg"
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k !== cachename)
        .map(key => caches.delete(key)))
    })
  )
});

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request.then(cacheResponse => {
    return cacheResponse || fetch(event.request)
  })));
});

