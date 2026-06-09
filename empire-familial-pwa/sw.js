/* Empire Familial — service worker */
const CACHE = "ef-v7";
const CORE = [
  "./", "./index.html", "./app.js", "./book-content.js", "./vendor/page-flip.browser.js",
  "./manifest.webmanifest", "./assets/cover.jpg", "./assets/author.jpg",
  "./icons/icon-192.png?v=2", "./icons/icon-512.png?v=2", "./icons/apple-touch-icon.png?v=2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  // Network-first for audio + PDF (range requests); cache-first for the rest.
  const url = new URL(req.url);
  const isMedia = /\.(mp3|pdf|mp4)$/i.test(url.pathname);
  if (isMedia) {
    e.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }
  e.respondWith(
    caches.match(req).then((hit) =>
      hit ||
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match("./index.html"))
    )
  );
});
