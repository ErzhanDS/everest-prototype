var CACHE = 'everest-v5';
var FILES = ['./', 'index.html', 'app.css', 'app.js', 'manifest.webmanifest', 'img/grand.jpg', 'img/towers.jpg', 'img/icon-192.png', 'img/icon-512.png', 'img/logo-app.svg', 'img/logos/ed-white.svg', 'img/logos/ed-blue.svg', 'img/icon-ed-192.png', 'img/icon-ed-512.png', 'manifest-ed.webmanifest'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
// Network first, cache as fallback (offline)
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function (r) {
      var copy = r.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
      return r;
    }).catch(function () { return caches.match(e.request); })
  );
});
