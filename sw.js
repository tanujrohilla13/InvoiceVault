// Caches only the app shell. Your bills are never cached here: they stay in Google Drive.
const CACHE = 'kagaz-v15';
const SHARE_CACHE = 'kagaz-shared';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icon.svg', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== SHARE_CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

// "Share to Kagaz" from other apps: keep the files briefly, then open the app to save them.
async function receiveShare(request) {
  const scope = self.registration.scope;
  try {
    const form = await request.formData();
    const files = form.getAll('files').filter((f) => f && typeof f === 'object' && f.size);
    await caches.delete(SHARE_CACHE);
    const cache = await caches.open(SHARE_CACHE);
    const keys = [];
    for (let i = 0; i < files.length && i < 10; i++) {
      const f = files[i];
      const key = new URL(`shared/${Date.now()}-${i}`, scope).href;
      await cache.put(key, new Response(f, { headers: { 'Content-Type': f.type || 'application/octet-stream', 'X-Name': encodeURIComponent(f.name || `file-${i + 1}`) } }));
      keys.push(key);
    }
    await cache.put(new URL('shared/meta', scope).href, new Response(JSON.stringify({ files: keys, title: form.get('title') || '', at: Date.now() })));
  } catch (e) { /* open the app anyway */ }
  return Response.redirect(new URL('./?shared=1', scope).href, 303);
}

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method === 'POST' && url.origin === self.location.origin && url.pathname.endsWith('/share-target')) {
    e.respondWith(receiveShare(e.request));
    return;
  }
  // Network first (so updates show up), cache as offline fallback. Same-origin GETs only.
  if (e.request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.includes('/shared/')) return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request).then((r) => r || caches.match('./index.html')))
  );
});
