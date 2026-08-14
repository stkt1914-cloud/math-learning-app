/* ===== Service Worker：离线优先（工科数学学习） ===== */
'use strict';

var CACHE = 'mathlearn-v1';
var PRECACHE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './js/app.js',
  './js/highlight.js',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './data/math-01.js',
  './data/math-02.js',
  './data/math-03.js',
  './data/math-04.js',
  './data/math-05.js',
  './data/math-06.js',
  './data/math-07.js',
  './data/math-08.js',
  './data/math-09.js',
  './data/math-10.js',
  './data/math-11.js',
  './data/math-12.js',
  './data/linear-01.js',
  './data/linear-02.js',
  './data/linear-03.js',
  './data/linear-04.js',
  './data/linear-05.js',
  './data/linear-06.js',
  './data/linear-07.js',
  './data/linear-08.js',
  './data/linear-09.js',
  './data/linear-10.js',
  './data/linear-11.js',
  './data/linear-12.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return c.addAll(PRECACHE).catch(function () { /* 个别文件失败不阻塞 */ });
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, copy); }).catch(function () {});
        return resp;
      }).catch(function () {
        return caches.match(e.request).then(function (hit) { return hit || caches.match('./index.html'); });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (resp) {
        if (resp.ok) {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); }).catch(function () {});
        }
        return resp;
      }).catch(function () { return new Response('', { status: 504, statusText: 'Offline' }); });
    })
  );
});
