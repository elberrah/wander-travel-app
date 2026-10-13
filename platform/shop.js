// Wander — espace salarié, page offre, panier & demandes de réservation
(function () {
const GATE_PRICES = false; // true : tarifs visibles uniquement après connexion salarié
const COMPANIES = {
  RICHBOND2026: { name: 'Richbond', domains: ['richbond.ma'] },
  AXA2026: { name: 'AXA Assurance Maroc', domains: ['axa.ma'] },
  WANDER2026: { name: 'Compte démonstration', domains: [] }
};
const K = { user: 'wander_member', cart: 'wander_cart', book: 'wander_bookings' };
const ls = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
const sv = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const fmt = n => n ? Math.round(n).toLocaleString('fr-FR') + ' MAD' : 'Sur devis';
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const $ = id => document.getElementById(id);
const W = window.Wander = {};
const member = () => ls(K.user, null);
W.member = member;
const unlocked = () => !GATE_PRICES || !!member();

W.priceHTML = o => `<span class="price-lbl">${esc(o.priceLabel)}</span>` + (o.startingPrice == null ? `<span class="price-val sm">Sur demande</span>` : unlocked()
  ? `<span class="price-val">dès ${fmt(o.startingPrice)}</span>`
  : `<button type="button" class="price-lock" onclick="openSalarieModal()"><i class="fa-solid fa-lock"></i> Tarif réservé aux salariés</button>`);

// ---------- Tarifs : extraction des variantes depuis les grilles ----------
const num = t => { const m = String(t).match(/(\d[\d\s\u00a0\u202f]*)/); return m ? parseInt(m[1].replace(/\D/g, ''), 10) : 0; };
function variants(o) {
  const h = o.details.tableHeader, out = [];
  o.details.tableRows.forEach(r => {
    if (/^\s*suppl/i.test(r[0])) return;
    const cols = [];
    for (let i = 1; i < r.length; i++) {
      const c = String(r[i]);
      if (!/\d/.test(c) || /^\s*\+/.test(c) || !/MAD/.test(c)) continue;
      const parts = c.split('/'), pm = r[0].match(/^(.*?)\(([^)]*\/[^)]*)\)\s*$/);
      const labs = pm ? pm[2].split('/').map(x => pm[1].trim() + ' (' + x.trim() + ')') : r[0].split('/');
      if (parts.length > 1 && parts.length === labs.length) parts.forEach((p, k) => cols.push([i, num(p), labs[k].trim()]));
      else cols.push([i, num(c), null]);
    }
    cols.forEach(([i, p, sub]) => {
      const multi = h.length > 2 && cols.filter(x => x[0] !== i).length + 1 > 1 || h.length > 2;
      const base = sub || r[0];
      out.push({ label: base + (h.length > 2 ? ' · ' + h[i] : ''), price: p });
    });
  });
  return out.filter(v => v.price > 0);
}
const unitOf = o => (o.category === 'package' || o.category === 'omra') ? 'person' : 'night';

// ---------- Connexion salarié ----------
function ensureLogin() {
  let m = $('wm-login');
  if (m) return m;
  m = document.createElement('div');
  m.id = 'wm-login';
  m.innerHTML = `<div class="wm-box">
    <button class="wm-x" onclick="Wander.closeLogin()" aria-label="Fermer">&times;</button>
    <span class="section-tag">Espace salarié</span>
    <h2>Accédez à vos tarifs privilèges</h2>
    <p class="wm-sub">Réservé aux collaborateurs des entreprises partenaires.</p>
    <label for="wm-code">Code entreprise</label>
    <input id="wm-code" type="text" placeholder="Ex : RICHBOND2026" autocomplete="off">
    <label for="wm-email">Email professionnel</label>
    <input id="wm-email" type="email" placeholder="prenom.nom@entreprise.ma">
    <div id="wm-err" class="wm-err"></div>
    <button class="wm-go" onclick="Wander.login()">Accéder à mes offres</button>
    <p class="wm-foot">Pas encore partenaire ? <a href="index.html#devis" onclick="Wander.closeLogin()">Contactez-nous</a><br><span>Démo : code WANDER2026, n'importe quel email.</span></p>
  </div>`;
  m.addEventListener('click', e => { if (e.target === m) W.closeLogin(); });
  m.addEventListener('keydown', e => { if (e.key === 'Enter') W.login(); });
  document.body.appendChild(m);
  return m;
}
window.openSalarieModal = function () {
  if (member()) return W.open('requests');
  ensureLogin().classList.add('open');
  setTimeout(() => $('wm-code').focus(), 50);
};
window.closeSalarieModal = () => W.closeLogin();
W.closeLogin = () => { const m = $('wm-login'); if (m) m.classList.remove('open'); };
W.login = function () {
  const code = $('wm-code').value.trim().toUpperCase(), email = $('wm-email').value.trim().toLowerCase();
  const c = COMPANIES[code]; let err = '';
  if (!c) err = 'Code entreprise inconnu. Vérifiez auprès de votre DRH.';
  else if (!/^\S+@\S+\.\S+$/.test(email)) err = 'Adresse email invalide.';
  else if (c.domains.length && !c.domains.some(d => email.endsWith('@' + d))) err = `L'email doit se terminer par ${c.domains.map(d => '@' + d).join(' ou ')}.`;
  if (err) { $('wm-err').textContent = err; return; }
  const name = email.split('@')[0].split(/[._-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  sv(K.user, { code, company: c.name, email, name, verified: c.domains.length > 0 });
  W.closeLogin(); refreshAll();
  W.toast(`Bienvenue ${name} · ${c.name}`);
};
W.logout = function () { localStorage.removeItem(K.user); W.close(); location.href = '/deconnexion'; };

// ---------- Panier ----------
const STAGES = ['Demande reçue', 'Facture proforma', 'Paiement', 'Confirmée'];
let tab = 'cart', done = null, draft = {};
function dr() {
  let d = $('wd');
  if (!d) { d = document.createElement('div'); d.id = 'wd'; d.innerHTML = '<div class="wd-overlay" onclick="Wander.close()"></div><aside class="wd-drawer"></aside>'; document.body.appendChild(d); }
  return d;
}
W.open = t => { if (!member()) return window.openSalarieModal(); tab = t || 'cart'; renderDrawer(); dr().classList.add('open'); document.body.style.overflow = 'hidden'; };
W.close = () => { dr().classList.remove('open'); document.body.style.overflow = ''; done = null; };
W.tab = t => { tab = t; done = null; renderDrawer(); };
W.draft = el => { draft[el.name] = el.value; };
W.remove = id => { sv(K.cart, ls(K.cart, []).filter(i => i.id !== id)); refreshAll(); };
const itemLine = i => `${i.unit === 'night' ? `${i.nights} nuit${i.nights > 1 ? 's' : ''} · ${i.rooms} chambre${i.rooms > 1 ? 's' : ''} · ` : ''}${i.adults} adulte${i.adults > 1 ? 's' : ''}${i.children ? ' · ' + i.children + ' enfant' + (i.children > 1 ? 's' : '') : ''}${i.date ? (i.end ? ' · du ' + new Date(i.date).toLocaleDateString('fr-FR') + ' au ' + new Date(i.end).toLocaleDateString('fr-FR') : ' · départ le ' + new Date(i.date).toLocaleDateString('fr-FR')) : ''}`;

function renderDrawer() {
  const m = member(), el = dr().querySelector('.wd-drawer'); if (!m) return;
  const cart = ls(K.cart, []), books = ls(K.book, []).filter(b => b.email === m.email).reverse();
  const tabs = `<div class="wd-head"><div class="wd-tabs">
    <button class="${tab === 'cart' ? 'on' : ''}" onclick="Wander.tab('cart')">Panier${cart.length ? ' (' + cart.length + ')' : ''}</button>
    <button class="${tab === 'requests' ? 'on' : ''}" onclick="Wander.tab('requests')">Mes demandes${books.length ? ' (' + books.length + ')' : ''}</button>
  </div><button class="wm-x" onclick="Wander.close()" aria-label="Fermer">&times;</button></div>`;
  let body = '';
  if (tab === 'cart' && done) {
    body = `<div class="wd-done"><i class="fa-solid fa-circle-check"></i><h3>Demande envoyée</h3>
      <p>Référence <strong>${done.ref}</strong><br>Envoyez la demande par email (joignez votre justificatif). Un conseiller vous adresse la facture proforma sous 24h ouvrées.</p>
      <a class="oc-cta solid" href="mailto:Resa@wandertravel-event.com?subject=${encodeURIComponent('Demande ' + done.ref)}&body=${encodeURIComponent(done.msg)}"><i class="fa-solid fa-envelope"></i> Envoyer par email à Resa@</a>
      <a class="oc-cta" target="_blank" rel="noopener" href="https://wa.me/212702093107?text=${encodeURIComponent(done.msg)}"><i class="fa-brands fa-whatsapp"></i> Accélérer via WhatsApp</a>
      <button class="oc-cta" onclick="Wander.tab('requests')">Voir mes demandes</button></div>`;
  } else if (tab === 'cart') {
    if (!cart.length) body = `<div class="wd-empty"><p>Votre panier est vide.</p><a class="oc-cta" href="index.html#offres" onclick="Wander.close()">Parcourir le catalogue</a></div>`;
    else {
      const total = cart.reduce((s, i) => s + i.total, 0);
      body = `<div class="wd-list">${cart.map(i => `<div class="wd-item">
        <div><strong>${esc(i.title)}</strong><span>${esc(i.variant)}</span><span>${esc(itemLine(i))}</span></div>
        <div class="wd-r"><b>${fmt(i.total)}</b><button onclick="Wander.remove('${i.id}')">Retirer</button></div></div>`).join('')}</div>
        <div class="wd-total"><span>Total estimé</span><b>${fmt(total)}</b></div>
        <p class="wd-hint">Estimation hors taxes de séjour et suppléments. Aucun paiement à cette étape.</p>
        <form class="wd-form" onsubmit="event.preventDefault();Wander.submit()">
          <label>Nom complet<input name="name" value="${esc(draft.name != null ? draft.name : m.name)}" oninput="Wander.draft(this)" required></label>
          <label>Matricule / Poste<input name="poste" value="${esc(draft.poste || '')}" placeholder="Ex : 10452 · Responsable achats" oninput="Wander.draft(this)" required></label>
          <label>Téléphone<input name="phone" type="tel" value="${esc(draft.phone || '')}" placeholder="+212 6 00 00 00 00" oninput="Wander.draft(this)" required></label>
          <label>Précisions<textarea name="note" rows="2" oninput="Wander.draft(this)" placeholder="Âges des enfants, formule repas…">${esc(draft.note || '')}</textarea></label>
          <label>Justificatif (badge ou attestation de travail)${m.verified ? ' · facultatif' : ''}<input name="proof" type="file" accept=".pdf,image/*"${m.verified ? '' : ' required'}></label>
          <label class="wd-check"><input name="consent" type="checkbox" required><span>J'accepte que mes données soient utilisées pour la gestion de ma réservation (loi 09-08).</span></label>
          <p class="wd-hint"><i class="fa-solid fa-file-invoice"></i> Paiement par virement ou chèque sur facture proforma, avant confirmation. Aucun paiement en ligne.</p>
          <button class="wm-go" type="submit">Envoyer la demande de réservation</button></form>`;
    }
  } else {
    body = `<div class="wd-me"><div><strong>${esc(m.name)}</strong><span>${esc(m.company)} · ${esc(m.email)}</span></div><button onclick="Wander.logout()">Se déconnecter</button></div>` +
      (books.length ? books.map(b => `<div class="wd-book"><div class="wd-bh"><strong>${b.ref}</strong><span class="wd-st">${STAGES[b.stage || 0]}</span></div>
        <div class="wd-steps">${STAGES.map((t, k) => `<i class="${k <= (b.stage || 0) ? 'on' : ''}" title="${t}"></i>`).join('')}</div>
        <small>${new Date(b.date).toLocaleDateString('fr-FR')} · ${fmt(b.total)}</small>
        <ul>${b.items.map(i => `<li>${esc(i.title)} <span>${esc(i.variant)}</span></li>`).join('')}</ul></div>`).join('') : '<div class="wd-empty"><p>Aucune demande pour le moment.</p></div>');
  }
  el.innerHTML = tabs + `<div class="wd-body">${body}</div>`;
}
W.submit = function () {
  const m = member(), cart = ls(K.cart, []); if (!m || !cart.length) return;
  const f = dr().querySelector('.wd-form');
  const name = f.name.value.trim(), phone = f.phone.value.trim(), note = f.note.value.trim(), poste = f.poste.value.trim(), proof = f.proof.files[0] ? f.proof.files[0].name : '';
  const ref = 'WTE-' + Date.now().toString(36).toUpperCase().slice(-6);
  const total = cart.reduce((s, i) => s + i.total, 0);
  const books = ls(K.book, []);
  books.push({ ref, date: new Date().toISOString(), email: m.email, company: m.company, name, phone, poste, proof, note, items: cart, total, stage: 0 });
  sv(K.book, books); sv(K.cart, []);
  const msg = `Bonjour Wander, demande ${ref} (${m.company}) de ${name}, ${poste}, ${phone}\n` + cart.map(i => `- ${i.title} · ${i.variant} · ${itemLine(i)} · ${fmt(i.total)}`).join('\n') + `\nTotal estimé : ${fmt(total)}` + (note ? `\nNote : ${note}` : '') + (proof ? `\nJustificatif à joindre : ${proof}` : '');
  done = { ref, msg }; draft = {}; refreshAll(); renderDrawer();
};

// ---------- En-tête & toast ----------
function updateHeader() {
  const m = member(), box = document.querySelector('.header-actions'); if (!box) return;
  const b = box.querySelector('.cta-nav-salarie');
  if (b) b.innerHTML = `<i class="fa-solid fa-id-badge"></i> ${m ? esc(m.name) : 'Mon Espace'}`;
  let c = $('wd-cart-btn');
  if (m && !c) { c = document.createElement('button'); c.id = 'wd-cart-btn'; c.className = 'wd-cart-btn'; c.setAttribute('aria-label', 'Panier'); c.onclick = () => W.open('cart'); box.insertBefore(c, b || null); }
  if (!m && c) { c.remove(); c = null; }
  if (c) { const n = ls(K.cart, []).length; c.innerHTML = `<i class="fa-solid fa-bag-shopping"></i>${n ? `<span>${n}</span>` : ''}`; }
}
W.toast = msg => {
  const t = document.createElement('div'); t.className = 'wd-toast'; t.textContent = msg; document.body.appendChild(t);
  setTimeout(() => t.classList.add('show'), 10); setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 3200);
};
function refreshAll() {
  updateHeader();
  if (typeof renderOffers === 'function' && $('offers-grid')) renderOffers();
  if ($('offer-root')) renderOfferPage();
  if ($('wd') && $('wd').classList.contains('open')) renderDrawer();
}

// ---------- Page offre ----------
let VARS = [];
function renderOfferPage() {
  const root = $('offer-root'); if (!root) return;
  const o = OFFERS_DATA.find(x => x.id === new URLSearchParams(location.search).get('id'));
  if (!o) { root.innerHTML = '<div class="op-empty"><h1>Offre introuvable</h1><a class="oc-cta solid" href="index.html#offres">Retour au catalogue</a></div>'; return; }
  document.title = o.title + ' — Wander Travel & Event';
  const saved = ls('wander_custom_galleries', {});
  const imgs = (saved[o.id] && saved[o.id].length) ? saved[o.id] : (o.images || [o.image]);
  const open = unlocked(), unit = unitOf(o); VARS = open ? variants(o) : []; if (open && !VARS.length) VARS = [{ label: 'Tarif négocié sur demande', price: 0 }];
  const th = o.details.tableHeader.map(h => `<th>${h}</th>`).join('');
  const tr = o.details.tableRows.map(r => `<tr>${r.map((c, i) => `<td${i ? ' class="bold-price"' : ''}>${c}</td>`).join('')}</tr>`).join('');
  const today = new Date().toISOString().slice(0, 10);
  const similar = OFFERS_DATA.filter(x => x.category === o.category && x.id !== o.id).slice(0, 3);
  const book = !open
    ? `<div class="op-lock"><i class="fa-solid fa-lock"></i><p>Les tarifs négociés et la réservation sont réservés aux salariés des entreprises partenaires.</p><button class="wm-go" onclick="openSalarieModal()">Me connecter</button><a href="index.html#devis">Mon entreprise n'est pas partenaire</a></div>`
    : `<form class="op-form" id="rq" onsubmit="return false">
        <h3 class="rq-h">Demande de réservation</h3>
        <div class="op-row"><label>Prénom<input id="rq-fn" required autocomplete="given-name"></label><label>Nom<input id="rq-ln" required autocomplete="family-name"></label></div>
        <label>Email<input id="rq-em" type="email" required autocomplete="email" placeholder="prenom.nom@entreprise.ma"></label>
        <label>Entreprise où vous travaillez<input id="rq-co" required autocomplete="organization"></label>
        <label>Téléphone<input id="rq-ph" type="tel" required autocomplete="tel" placeholder="+212 6 00 00 00 00"></label>
        <label>Produit<input id="rq-pr" value="${esc(o.title)}" readonly></label>
        <label>Formule<select id="bk-var" onchange="Wander.calc()">${VARS.map((v, i) => `<option value="${i}">${esc(v.label)}${v.price ? ' — ' + fmt(v.price) : ''}</option>`).join('')}</select></label>
        <div class="op-row"><label>${unit === 'night' ? 'Check-in (arrivée)' : 'Date de départ'}<input type="date" id="bk-date" min="${today}" onchange="Wander.dates()" required></label><label>${unit === 'night' ? 'Check-out (départ)' : 'Date de retour'}<input type="date" id="bk-end" min="${today}" onchange="Wander.dates()" required></label></div>
        ${unit === 'night' ? `<div class="op-row"><label>Nuits<input type="number" id="bk-nights" min="1" max="60" value="1" readonly tabindex="-1" title="Calculé à partir des dates"></label><label>Chambres<input type="number" id="bk-rooms" min="1" max="10" value="1" oninput="Wander.calc()"></label></div>` : ''}
        <div class="op-row3"><label>Adultes<input type="number" id="bk-ad" min="1" max="20" value="2" oninput="Wander.calc()"></label><label>Enfants -12 ans<input type="number" id="bk-ch" min="0" max="20" value="0" oninput="Wander.calc()"></label><label>Bébés<input type="number" id="bk-bb" min="0" max="10" value="0" oninput="Wander.calc()"></label></div>
        <div class="op-sum"><span id="bk-detail"></span><div><small>Total estimé</small><b id="bk-total"></b></div></div>
        <div id="bk-cmp" class="bk-cmp"></div>
        <p class="wd-hint">Estimation indicative hors taxes de séjour. Tarifs enfants et bébés confirmés par un conseiller.</p>
        <label class="wd-check"><input id="rq-ok" type="checkbox" required><span>J'accepte que mes données soient utilisées pour traiter ma demande (loi 09-08).</span></label>
        <button type="button" class="wm-go" onclick="Wander.send('wa')"><i class="fa-brands fa-whatsapp"></i> Envoyer par WhatsApp</button>
        <button type="button" class="oc-cta" onclick="Wander.send('mail')"><i class="fa-solid fa-envelope"></i> Envoyer par email</button></form>`;
  root.innerHTML = `
  <nav class="op-crumb"><a href="index.html#offres"><i class="fa-solid fa-arrow-left"></i> Catalogue</a><span>${esc(o.location)}</span></nav>
  <header class="op-head"><span class="oc-loc">${esc(o.location)} · ${esc(o.stars)} · Repas ${esc(o.meal)}</span><h1>${esc(o.title)}</h1></header>
  <div class="op-grid">
    <div class="op-main">
      <div class="op-gal"><div class="op-pic"><span class="oc-ph">${esc(o.title)}</span><img id="op-img" src="${imgs[0]}" alt="${esc(o.title)}" onerror="this.style.visibility='hidden'" onload="this.style.visibility='visible'"></div>
        ${imgs.length > 1 ? `<div class="op-thumbs">${imgs.map((u, i) => `<button class="${i ? '' : 'on'}" onclick="Wander.pic(this,'${u}')"><img src="${u}" alt="" onerror="this.parentNode.remove()"></button>`).join('')}</div>` : ''}</div>
      <p class="op-desc">${esc(o.description)}</p>
      <div class="card-equipments">${o.equipments.map(e => `<span class="equip-tag">${esc(e)}</span>`).join('')}</div>
      <h2 class="op-h">Grille des tarifs</h2>
      ${open && !o.details.tableRows.length ? `<p class="op-desc sm">Tarif négocié communiqué par un conseiller sur demande. Ajoutez l'établissement à votre panier pour recevoir une offre.</p>` : open ? `<div class="pricing-table-wrapper"><table class="pricing-table"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`
        : `<div class="op-lock inline"><i class="fa-solid fa-lock"></i><p>Grille tarifaire confidentielle.</p><button class="wm-go" onclick="openSalarieModal()">Débloquer avec mon code entreprise</button></div>`}
      <h2 class="op-h">Conditions &amp; notes</h2>
      <ul class="modal-notes-list">${o.details.notes.map(n => `<li>${n}</li>`).join('')}</ul>
      <h2 class="op-h">Comment réserver</h2>
      <ul class="modal-notes-list"><li>Remplissez le formulaire de demande : un conseiller Wander vous répond et confirme la disponibilité et le tarif.</li><li>Conditions d\u2019annulation propres à chaque établissement, communiquées avec la confirmation.</li></ul>
    </div>
    <aside class="op-book"><span class="price-lbl">${esc(o.priceLabel)}</span><div class="op-from">${o.startingPrice == null ? 'Sur demande' : open ? 'dès ' + fmt(o.startingPrice) : 'Tarif confidentiel'}</div>${book}</aside>
  </div>
  ${similar.length ? `<section class="op-sim"><h2 class="op-h">Dans la même catégorie</h2><div class="op-simgrid">${similar.map(s => `<a href="offre.html?id=${s.id}"><span class="oc-loc">${esc(s.location)}</span><strong>${esc(s.title)}</strong><span>${esc(s.stars)}</span></a>`).join('')}</div></section>` : ''}`;
  if (open && VARS.length) W.calc();
}
W.pic = (b, u) => { $('op-img').src = u; b.parentNode.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); };
function current() {
  const o = OFFERS_DATA.find(x => x.id === new URLSearchParams(location.search).get('id')), v = VARS[+$('bk-var').value]; if (!o || !v) return null;
  const unit = unitOf(o), g = id => $(id) ? Math.max(0, parseInt($(id).value, 10) || 0) : 0;
  const adults = Math.max(1, g('bk-ad')), children = g('bk-ch'), babies = g('bk-bb'), nights = unit === 'night' ? Math.max(1, g('bk-nights')) : 0, rooms = unit === 'night' ? Math.max(1, g('bk-rooms')) : 0;
  const total = unit === 'night' ? v.price * nights * rooms : v.price * (adults + children);
  const detail = !v.price ? 'Tarif confirmé par un conseiller' : unit === 'night' ? `${fmt(v.price)} × ${nights} nuit${nights > 1 ? 's' : ''} × ${rooms} chambre${rooms > 1 ? 's' : ''}` : `${fmt(v.price)} × ${adults + children} personne${adults + children > 1 ? 's' : ''}`;
  return { o, v, unit, adults, children, babies, nights, rooms, total, detail, date: $('bk-date').value, end: $('bk-end') ? $('bk-end').value : '' };
}
const addDays = (d, n) => new Date(new Date(d + 'T12:00:00').getTime() + n * 864e5).toISOString().slice(0, 10);
W.dates = () => {
  const a = $('bk-date'), b = $('bk-end'); if (!a || !b) return;
  const night = !!$('bk-nights');
  if (a.value) {
    const first = night ? addDays(a.value, 1) : a.value;
    b.min = first;
    if (!b.value || b.value < first) b.value = night ? addDays(a.value, 1) : a.value;
  }
  if (night && a.value && b.value) $('bk-nights').value = Math.max(1, Math.round((new Date(b.value + 'T12:00:00') - new Date(a.value + 'T12:00:00')) / 864e5));
  W.calc();
};
W.calc = () => { const c = current(); if (!c) return; $('bk-total').textContent = fmt(c.total); $('bk-detail').textContent = c.detail; cmp(c); };

// ---------- Comparateur Booking ----------
const BK = 'wander_booking_ref';
const bkRef = id => (ls(BK, {})[id]) || (OFFERS_DATA.find(x => x.id === id) || {}).bookingRef || null;
const isAdmin = () => document.documentElement.classList.contains('admin-mode');
const bkUrl = c => 'https://www.booking.com/searchresults.html?ss=' + encodeURIComponent(c.o.title) + (c.date ? '&checkin=' + c.date + '&checkout=' + (c.end || new Date(new Date(c.date).getTime() + Math.max(1, c.nights || 1) * 864e5).toISOString().slice(0, 10)) : '') + '&group_adults=' + c.adults + '&group_children=' + c.children + '&no_rooms=' + Math.max(1, c.rooms || 1);
let live = {};
function cmp(c) {
  const box = $('bk-cmp'); if (!box || !c.v.price) { if (box) box.innerHTML = ''; return; }
  const mult = c.total / c.v.price, key = c.o.id + '|' + c.v.label + '|' + c.date + '|' + c.nights;
  const L = live[key], ref = L || bkRef(c.o.id);
  let html = '';
  if (ref && ref.price) {
    const bt = ref.price * mult, save = bt - c.total, pct = Math.round(save / bt * 100);
    const when = L ? 'Prix Booking en direct' : 'Prix Booking constaté' + (ref.date ? ' le ' + new Date(ref.date).toLocaleDateString('fr-FR') : '');
    html += '<div class="bk-row"><span>Wander</span><b>' + fmt(c.total) + '</b></div><div class="bk-row bk-other"><span>' + when + '</span><s>' + fmt(bt) + '</s></div>' +
      (save > 0 ? '<div class="bk-save"><i class="fa-solid fa-circle-check"></i> Vous économisez ' + fmt(save) + ' (' + pct + '%)</div>' : '<div class="bk-note">Prix Booking proche du tarif Wander à cette date.</div>');
  } else html += '<div class="bk-note">Comparaison Booking non disponible pour cette offre.</div>';
  html += '<a class="bk-link" target="_blank" rel="noopener noreferrer" href="' + bkUrl(c) + '" onclick="var u=this.href,w=null;try{w=(window.top||window).open(u,\'_blank\',\'noopener\')}catch(e){}if(!w){try{w=window.open(u,\'_blank\')}catch(e){}}if(w){event.preventDefault()}"><i class="fa-solid fa-arrow-up-right-from-square"></i> Vérifier sur Booking</a><small class="bk-note">S\'ouvre dans un nouvel onglet. Si rien ne s\'affiche, ouvrez la page dans un vrai navigateur : l\'aperçu bloque Booking.</small>';
  if (typeof BOOKING_API !== 'undefined' && BOOKING_API.url) html += '<button class="bk-live" onclick="Wander.live()"><i class="fa-solid fa-satellite-dish"></i> Prix Booking en direct</button>';
  if (isAdmin()) { const r = bkRef(c.o.id) || {}; html += '<div class="bk-admin"><small>Admin : prix Booking par ' + (c.unit === 'night' ? 'nuit' : 'personne') + ' (MAD)</small><div><input id="bk-man" type="number" min="0" value="' + (r.price || '') + '" placeholder="Ex: 1900"><button onclick="Wander.saveRef()">Enregistrer</button></div></div>'; }
  box.innerHTML = html;
}
W.saveRef = () => {
  const c = current(), p = parseFloat($('bk-man').value); if (!c) return;
  const all = ls(BK, {}); if (p > 0) all[c.o.id] = { price: p, date: new Date().toISOString() }; else delete all[c.o.id];
  sv(BK, all); W.calc(); W.toast('Prix Booking enregistré.');
};
W.live = async () => {
  const c = current(); if (!c) return;
  if (!c.date) { $('bk-date').focus(); return W.toast('Choisissez une date de départ.'); }
  const key = c.o.id + '|' + c.v.label + '|' + c.date + '|' + c.nights;
  try {
    const u = new URL(BOOKING_API.url); u.searchParams.set('hotel', (c.o.bookingId || c.o.title)); u.searchParams.set('checkin', c.date); u.searchParams.set('nights', c.nights || 1); u.searchParams.set('adults', c.adults); u.searchParams.set('rooms', c.rooms || 1);
    const r = await fetch(u, { headers: BOOKING_API.key ? { Authorization: 'Bearer ' + BOOKING_API.key } : {} });
    const j = await r.json(); if (!j.price) throw 0;
    live[key] = { price: +j.price, date: j.updated || new Date().toISOString() }; W.calc();
  } catch (e) { W.toast('Prix Booking en direct indisponible. Prix constaté affiché.'); }
};
W.send = function (kind) {
  const f = $('rq'); if (!f.reportValidity()) return;
  const c = current(); if (!c) return;
  const g = id => $(id).value.trim();
  const msg = `Bonjour Wander, demande de réservation\nProduit : ${c.o.title}\nFormule : ${c.v.label}` + (c.unit === 'night' ? `\nCheck-in : ${new Date(c.date).toLocaleDateString('fr-FR')}\nCheck-out : ${new Date(c.end).toLocaleDateString('fr-FR')}\n${c.nights} nuit(s) · ${c.rooms} chambre(s)` : `\nDépart : ${new Date(c.date).toLocaleDateString('fr-FR')}\nRetour : ${new Date(c.end).toLocaleDateString('fr-FR')}`) + `\nAdultes : ${c.adults} · Enfants -12 ans : ${c.children} · Bébés : ${c.babies}\nEstimation : ${fmt(c.total)}\n\n${g('rq-fn')} ${g('rq-ln')}\nEntreprise : ${g('rq-co')}\nEmail : ${g('rq-em')}\nTéléphone : ${g('rq-ph')}`;
  if (kind === 'wa') window.open('https://wa.me/212702093107?text=' + encodeURIComponent(msg), '_blank', 'noopener');
  else location.href = 'mailto:Resa@wandertravel-event.com?subject=' + encodeURIComponent('Demande ' + c.o.title) + '&body=' + encodeURIComponent(msg);
  if (window.Sync) Sync.request({ uid: (Sync.session() || {}).id || '', fn: g('rq-fn'), ln: g('rq-ln'), em: g('rq-em'), co: g('rq-co'), ph: g('rq-ph'), product: c.o.title, variant: c.v.label, date: c.date, end: c.end, nights: c.unit === 'night' ? c.nights : '', rooms: c.unit === 'night' ? c.rooms : '', adults: c.adults, children: c.children, babies: c.babies, total: fmt(c.total) });
  W.toast('Demande prête à envoyer.');
};
W.add = function (go) {
  const c = current(); if (!c) return;
  if (!c.date) { $('bk-date').focus(); return W.toast(c.unit === 'night' ? 'Choisissez la date de check-in.' : 'Choisissez la date de départ.'); }
  if (!c.end) { $('bk-end').focus(); return W.toast(c.unit === 'night' ? 'Choisissez la date de check-out.' : 'Choisissez la date de retour.'); }
  const cart = ls(K.cart, []);
  cart.push({ id: 'i' + Date.now().toString(36), offerId: c.o.id, title: c.o.title, variant: c.v.label, price: c.v.price, unit: c.unit, date: c.date, end: c.end, nights: c.nights, rooms: c.rooms, adults: c.adults, children: c.children, total: c.total });
  sv(K.cart, cart); updateHeader();
  if (go) W.open('cart'); else W.toast('Ajouté au panier.');
};

document.addEventListener('DOMContentLoaded', () => {
  const cd = $('countdown-timer');
  if (cd) { // fin du mois en cours
    const tick = () => {
      const n = new Date(), end = new Date(n.getFullYear(), n.getMonth() + 1, 1) - n;
      const d = Math.floor(end / 864e5), h = Math.floor(end % 864e5 / 36e5), m = Math.floor(end % 36e5 / 6e4), s = Math.floor(end % 6e4 / 1e3);
      cd.textContent = `${d}j ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`;
    };
    tick(); setInterval(tick, 1000);
  }
  const t = localStorage.getItem('theme');
  if (t === 'dark') document.body.classList.replace('light-mode', 'dark-mode');
  updateHeader(); renderOfferPage();
});
})();
