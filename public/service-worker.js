// service-worker.js

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-pwa-cache").then((cache) => {
      cache.addAll(["/index.html", "/styles.css", "/script.js"]);
      self.skipWaiting();
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).then((response) => {
      const cacheName = "my-pwa-cache";
      caches
        .open(cacheName)
        .then((cache) => {
          if (event.request.method === "GET") {
            return cache.match(event.request).then((cachedResponse) => {
              if (cachedResponse) return cachedResponse;
              return response;
            });
          } else {
            return response;
          }
        })
        .catch(() => {
          return caches
            .open("default")
            .then((cache) => cache.match(event.request));
        });
    }),
  );
});
