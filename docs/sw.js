// Service Worker for 中国制博会调研报告 PWA
const CACHE_NAME = 'hz-cieme-v4-0-0';
const PRECACHE_URLS = [
  './',
  './index.html',
  './mobile.html',
  './summary.html',
  './overview.html',
  './problems.html',
  './solutions.html',
  './conclusion.html',
  './context.html',
  './dashboard.html',
  './methodology.html',
  './cases.html',
  './gallery.html',
  './appendix.html',
  './team.html',
  './photos.html',
  './transparency.html',
  './references.html',
  './qr.html',
  './report-pdf.html',
  './poster.html',
  './roadmap.html',
  './reading-paths.html',
  './faq.html',
  './assets/css/style.css',
  './assets/js/echarts.min.js',
  './assets/js/charts.js',
  './assets/js/common.js',
  './assets/js/search.js',
  './favicon.svg',
  './manifest.webmanifest'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE_URLS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  // 网络优先策略：优先取最新版本，离线降级到缓存
  e.respondWith(
    fetch(e.request).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match(e.request))
  );
});
