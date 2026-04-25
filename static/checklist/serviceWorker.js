importScripts("/checklist/db.js")

const cacheName = "siteAssetsV2"
const assets = [
  "/checklist",
  "/checklist/db.js",
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
  event.respondWith(caches.match(event.request).then(cacheResponse => {
    return cacheResponse || fetch(event.request)
  }));
});

self.addEventListener('message', function(event) {
  console.log(event)
  function save(store) {
    store.put(event.data)
  }
  openAndProcessDBFunc(save)
});
