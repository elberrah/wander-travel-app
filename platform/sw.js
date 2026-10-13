// Wander — notifications push de la plateforme (Jeudi Promo, nouveautés, panier).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (x) { d = { body: e.data && e.data.text() }; }
  e.waitUntil(self.registration.showNotification(d.title || 'Wander Travel & Event', {
    body: d.body || '',
    icon: '/icons/wander-192.png',
    badge: '/icons/wander-badge.png',
    tag: d.tag || 'wander',
    renotify: true,
    data: { url: d.url || '/plateforme/index.html' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/plateforme/index.html';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if (c.url.includes('/plateforme/') && 'focus' in c) { c.navigate(url); return c.focus(); }
    return self.clients.openWindow(url);
  }));
});
