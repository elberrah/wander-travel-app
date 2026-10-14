// Wander — synchronisation (offres, demandes, visites)
// Base Wander (serveur de la plateforme sécurisée) : offres publiées, visites et demandes partagées.
(function () {
const SYNC_URL = '/api/plateforme';
const KO = 'wander_overrides', KV = 'wander_visits', KR = 'wander_requests';
const SES = () => { try { return JSON.parse(localStorage.getItem('wander_session')); } catch (e) { return null; } };
const J = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };

function apply(ov) {
  if (!ov || typeof OFFERS_DATA === 'undefined') return;
  (ov.deleted || []).forEach(id => { const i = OFFERS_DATA.findIndex(o => o.id === id); if (i > -1) OFFERS_DATA.splice(i, 1); });
  (ov.added || []).forEach(o => { if (!OFFERS_DATA.find(x => x.id === o.id)) OFFERS_DATA.push(o); });
  Object.entries(ov.offers || {}).forEach(([id, p]) => {
    const i = OFFERS_DATA.findIndex(x => x.id === id); if (i < 0) return;
    const o = OFFERS_DATA[i];
    if (p.hidden) { OFFERS_DATA.splice(i, 1); return; }
    ['title', 'location', 'priceLabel', 'description', 'meal', 'category'].forEach(k => { if (p[k]) o[k] = p[k]; });
    if (p.startingPrice !== undefined && p.startingPrice !== '' && p.startingPrice !== null) o.startingPrice = Number(p.startingPrice);
    if (p.photos && p.photos.length) { o.images = p.photos; o.image = p.photos[0]; }
    if (p.rows) { o.details = o.details || {}; o.details.tableRows = p.rows; }
    if (p.promo !== undefined) o.promo = !!p.promo;
  });
}

const Sync = window.Sync = {
  url: SYNC_URL, apply, KO, KV, KR,
  get(action, extra) { return fetch(SYNC_URL + '?action=' + action + (extra || '')).then(r => r.json()); },
  post(body) { if (!SYNC_URL) return Promise.resolve(null); return fetch(SYNC_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(body) }).then(r => r.json()).catch(() => null); },
  track() {
    const page = location.pathname.split('/').pop() || 'index.html', offer = new URLSearchParams(location.search).get('id') || '';
    const key = 'wv_' + page + offer; if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, '1');
    let vid = localStorage.getItem('wander_vid'); if (!vid) { vid = Math.random().toString(36).slice(2, 10); localStorage.setItem('wander_vid', vid); }
    if (SYNC_URL) Sync.post({ action: 'visit', page, offer, vid });
    else { const a = J(KV, []); a.push({ t: Date.now(), p: page, o: offer, v: vid }); localStorage.setItem(KV, JSON.stringify(a.slice(-3000))); }
  },
  request(d) {
    if (SYNC_URL) return Sync.post(Object.assign({ action: 'request' }, d));
    const a = J(KR, []); a.push(Object.assign({ t: Date.now(), status: 'Nouveau' }, d)); localStorage.setItem(KR, JSON.stringify(a)); return Promise.resolve({ ok: true });
  }
};

if (SYNC_URL && !window.SYNC_NO_APPLY && !window.SYNC_PUBLIC) {
  const se = SES();
  if (!se || se.exp < Date.now()) { document.documentElement.style.visibility = 'hidden'; location.replace('login.html?next=' + encodeURIComponent((location.pathname.split('/').pop() || 'index.html') + location.search)); }
}
Sync.session = SES;
Sync.logout = () => { localStorage.removeItem('wander_session'); location.href = 'login.html'; };
function ui() {
  const se = SES(); if (!se || window.SYNC_NO_APPLY || window.SYNC_PUBLIC) return;
  if (!document.getElementById('wander-out')) {
    const b = document.createElement('button'); b.id = 'wander-out'; b.textContent = 'Se déconnecter · ' + se.fn;
    b.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:90;border:1px solid rgba(255,255,255,.25);background:#1a0b0f;color:#f3e3b0;border-radius:99px;padding:8px 16px;font:600 12px system-ui;cursor:pointer';
    b.onclick = Sync.logout; document.body.appendChild(b);
  }
  [['rq-fn', se.fn], ['rq-ln', se.ln], ['rq-em', se.em], ['rq-co', se.co]].forEach(([id, v]) => { const el = document.getElementById(id); if (el && !el.value && v) el.value = v; });
}
document.addEventListener('DOMContentLoaded', () => { ui(); new MutationObserver(ui).observe(document.body, { childList: true, subtree: true }); });

if (!window.SYNC_NO_APPLY) {
  apply(J(KO, {}));
  Sync.track();
  if (SYNC_URL) Sync.get('overrides').then(ov => {
    const s = JSON.stringify(ov || {}), had = localStorage.getItem(KO);
    if (s !== had) { localStorage.setItem(KO, s); if (!sessionStorage.getItem('wander_sync_rl')) { sessionStorage.setItem('wander_sync_rl', '1'); location.reload(); } }
  }).catch(() => {});
}
})();
