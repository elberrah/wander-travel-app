// Wander — notifications : accord du salarié (email + téléphone) et abonnement push.
(function () {
const API = '/api/plateforme';
const LATER = 'wander_notif_later';
const swOk = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

const post = b => fetch(API, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(b) }).then(r => r.json()).catch(() => null);
const b64 = s => { const p = '='.repeat((4 - s.length % 4) % 4), r = atob((s + p).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(r, c => c.charCodeAt(0)); };

async function subscribe(vapid, ask) {
  if (!swOk || !vapid) return false;
  if (Notification.permission === 'denied') return false;
  if (Notification.permission !== 'granted') {
    if (!ask) return false;
    if (await Notification.requestPermission() !== 'granted') return false;
  }
  const reg = await navigator.serviceWorker.register('/plateforme/sw.js', { scope: '/plateforme/' });
  await navigator.serviceWorker.ready;
  let sub = await reg.pushManager.getSubscription();
  if (!sub) sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64(vapid) });
  const r = await post({ action: 'push-sub', sub: sub.toJSON() });
  return !!(r && r.ok);
}
window.WanderNotify = { subscribe };

function toast(html, ms) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:120;max-width:min(92vw,460px);background:#1a0b0f;color:#f3e3b0;padding:14px 18px;border-radius:14px;font:500 14px/1.5 system-ui;box-shadow:0 20px 50px -20px rgba(0,0,0,.6);text-align:center';
  t.innerHTML = html; document.body.appendChild(t); setTimeout(() => t.remove(), ms || 6000);
}

function banner(vapid) {
  if (document.getElementById('wander-notif')) return;
  const el = document.createElement('div');
  el.id = 'wander-notif';
  el.setAttribute('role', 'dialog');
  el.style.cssText = 'position:fixed;right:16px;bottom:96px;z-index:110;width:min(380px,calc(100vw - 32px));background:#1a0b0f;color:#faf8f5;border:1px solid rgba(201,168,76,.35);border-radius:18px;padding:20px 20px 18px;box-shadow:0 30px 70px -30px rgba(0,0,0,.7);font:14px/1.55 system-ui,-apple-system,Segoe UI,sans-serif;animation:wnIn .5s ease both';
  el.innerHTML = '<style>@keyframes wnIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}#wander-notif button{font:600 12px system-ui;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:11px 16px;cursor:pointer}</style>'
    + '<div style="font:500 19px Georgia,serif;color:#e7cf8a;margin-bottom:6px">🔔 Restez informé</div>'
    + '<div style="color:rgba(250,248,245,.8);margin-bottom:16px">Recevez le <b style="color:#faf8f5">Jeudi Promo</b>, les <b style="color:#faf8f5">nouveautés</b> et un rappel si vous laissez un séjour dans votre panier, par email et sur votre téléphone.</div>'
    + '<div style="display:flex;gap:8px;flex-wrap:wrap"><button data-n="yes" style="flex:1;border:0;background:#c9a84c;color:#000">Oui, m’avertir</button><button data-n="later" style="border:1px solid rgba(255,255,255,.25);background:none;color:#faf8f5">Plus tard</button></div>'
    + '<div style="margin-top:10px;font-size:11px;color:rgba(250,248,245,.5)">Désabonnement en un clic à tout moment. Vos données restent chez Wander.</div>';
  document.body.appendChild(el);
  el.addEventListener('click', async e => {
    const k = e.target.getAttribute && e.target.getAttribute('data-n'); if (!k) return;
    if (k === 'later') { try { localStorage.setItem(LATER, String(Date.now() + 7 * 864e5)); } catch (x) {} el.remove(); return; }
    el.remove();
    await post({ action: 'prefs', cart: true, promos: true, news: true, asked: true });
    let pushed = false;
    try { pushed = await subscribe(vapid, true); } catch (x) {}
    if (pushed) toast('C’est activé ✅ Vous recevrez nos offres par email et sur cet appareil.');
    else if (isIOS && !standalone) toast('C’est activé par email ✅<br><small>Sur iPhone, pour les notifications : touchez <b>Partager</b> puis <b>« Sur l’écran d’accueil »</b>, et ouvrez Wander depuis l’icône.</small>', 12000);
    else toast('C’est activé par email ✅');
  });
}

async function init() {
  if (window.SYNC_NO_APPLY) return; // tableau de bord admin : pas de bandeau
  if (!window.Sync || !Sync.url || !(Sync.session && Sync.session())) return;
  let st = null;
  try { st = await fetch(API + '?action=prefs').then(r => r.ok ? r.json() : null); } catch (x) {}
  if (!st || !st.prefs) return;
  const p = st.prefs, on = p.cart || p.promos || p.news;
  // Déjà d'accord et notifications autorisées : abonnement de cet appareil tenu à jour.
  if (p.asked && on && swOk && Notification.permission === 'granted') { subscribe(st.vapid, false).catch(() => {}); return; }
  if (p.asked) return;
  let later = 0; try { later = +localStorage.getItem(LATER) || 0; } catch (x) {}
  if (later > Date.now()) return;
  // Un bandeau à la fois : on attend que le choix des cookies soit fait.
  const later6 = () => setTimeout(() => banner(st.vapid), 6000);
  if (/(?:^|;\s*)wander_consent=/.test(document.cookie)) later6(); else window.addEventListener('wander-consent', later6, { once: true });
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
