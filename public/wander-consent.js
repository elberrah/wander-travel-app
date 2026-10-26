// Wander — consentement aux cookies (plateforme et pages de connexion).
// Essentiels toujours actifs ; mesure d'audience (Google Analytics + statistiques Wander)
// uniquement après accord. Choix gardé 6 mois, modifiable via tout lien [data-wander-consent].
(function () {
  if (window.WanderConsent) return;
  var NAME = 'wander_consent', GA = 'G-ZL06HET5SK', MAX = 182 * 864e2;

  function read() {
    var m = document.cookie.match(/(?:^|;\s*)wander_consent=v1\.a([01])/);
    return m ? { analytics: m[1] === '1' } : null;
  }
  function write(analytics) {
    document.cookie = NAME + '=v1.a' + (analytics ? 1 : 0) + '.' + Date.now() + ';path=/;max-age=' + MAX + ';SameSite=Lax' + (location.protocol === 'https:' ? ';Secure' : '');
  }

  var gaLoaded = false;
  // La plateforme collaborateurs ne doit pas alimenter le GA4 du site vitrine :
  // GA ne se charge que sur le domaine officiel wandertravel-event.com.
  var OFFICIAL = /(^|\.)wandertravel-event\.com$/.test(location.hostname);
  function loadGA() {
    if (!OFFICIAL) return;
    window['ga-disable-' + GA] = false;
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA;
    document.head.appendChild(s);
  }
  function stopGA() {
    window['ga-disable-' + GA] = true;
    var host = location.hostname.split('.'), domains = [''];
    for (var i = 0; i < host.length - 1; i++) domains.push(';domain=.' + host.slice(i).join('.'));
    document.cookie.split(';').forEach(function (c) {
      var k = c.split('=')[0].trim();
      if (/^_ga/.test(k)) domains.forEach(function (d) { document.cookie = k + '=;path=/;max-age=0' + d; });
    });
  }

  function apply(c, fresh) {
    if (c.analytics) loadGA(); else stopGA();
    if (fresh) {
      try { window.dispatchEvent(new CustomEvent('wander-consent', { detail: c })); } catch (e) {}
    }
  }

  var CSS = '#wc{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;max-width:560px;margin-left:auto;background:#141012;color:#f5f1e8;border:1px solid rgba(199,163,92,.4);border-radius:18px;box-shadow:0 30px 80px -30px rgba(0,0,0,.75);font:14px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;animation:wcIn .45s cubic-bezier(.2,.7,.2,1) both;max-height:calc(100vh - 32px);overflow:auto}'
    + '@keyframes wcIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){#wc{animation:none}}'
    + '#wc .wc-in{padding:22px 22px 18px}#wc h2{margin:0 0 6px;font:500 20px/1.25 Georgia,"Playfair Display",serif;color:#e7cf8a}'
    + '#wc p{margin:0 0 14px;color:rgba(245,241,232,.82)}#wc a{color:#e7cf8a;text-decoration:underline;text-underline-offset:3px}'
    + '#wc .wc-btns{display:flex;flex-wrap:wrap;gap:8px}#wc button{font:600 13px system-ui,-apple-system,sans-serif;letter-spacing:.02em;border-radius:999px;padding:12px 18px;cursor:pointer;min-height:44px}'
    + '#wc .wc-ok{flex:1 1 140px;border:0;background:#c7a35c;color:#0b0c0d}#wc .wc-ok:hover{background:#d4b475}'
    + '#wc .wc-no{flex:1 1 120px;border:1px solid rgba(245,241,232,.35);background:transparent;color:#f5f1e8}#wc .wc-no:hover{border-color:#c7a35c}'
    + '#wc .wc-more{flex:1 1 100%;border:0;background:none;color:#e7cf8a;padding:8px;min-height:36px;text-decoration:underline;text-underline-offset:3px}'
    + '#wc :focus-visible{outline:2px solid #c7a35c;outline-offset:3px}'
    + '#wc .wc-cat{border:1px solid rgba(245,241,232,.14);border-radius:14px;padding:14px 16px;margin:0 0 10px;background:rgba(255,255,255,.03)}'
    + '#wc .wc-row{display:flex;align-items:center;justify-content:space-between;gap:12px}#wc .wc-row b{font-size:15px;color:#f5f1e8}'
    + '#wc .wc-cat p{margin:8px 0 0;font-size:13px}#wc .wc-gain{display:block;margin-top:6px;color:#d9be85;font-size:13px}'
    + '#wc .wc-tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#9fd0aa}'
    + '#wc .wc-sw{position:relative;width:48px;height:28px;flex:none}#wc .wc-sw input{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:pointer;z-index:1}'
    + '#wc .wc-sw span{position:absolute;inset:0;border-radius:99px;background:#3a3e42;transition:background .2s}#wc .wc-sw span:after{content:"";position:absolute;top:3px;left:3px;width:22px;height:22px;border-radius:50%;background:#f5f1e8;transition:transform .2s}'
    + '#wc .wc-sw input:checked+span{background:#c7a35c}#wc .wc-sw input:checked+span:after{transform:translateX(20px)}#wc .wc-sw input:focus-visible+span{outline:2px solid #c7a35c;outline-offset:3px}'
    + '#wc .wc-foot{margin:12px 0 0;font-size:12px;color:rgba(245,241,232,.6)}'
    + '@media (max-width:600px){#wc{left:0;right:0;bottom:0;border-radius:18px 18px 0 0;max-width:none;max-height:88vh;border-bottom:0}#wc .wc-in{padding:20px 16px calc(16px + env(safe-area-inset-bottom))}#wc h2{font-size:18px}}';

  function el(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstChild; }

  function show(details) {
    close();
    if (!document.getElementById('wc-css')) {
      var st = document.createElement('style'); st.id = 'wc-css'; st.textContent = CSS; document.head.appendChild(st);
    }
    var cur = read(), on = cur ? cur.analytics : false;
    var box = el('<section id="wc" role="dialog" aria-modal="false" aria-labelledby="wc-t" aria-describedby="wc-d"><div class="wc-in">'
      + '<h2 id="wc-t">Vos cookies, votre choix</h2>'
      + '<p id="wc-d">Wander utilise des cookies pour faire fonctionner la plateforme en toute sécurité. Avec votre accord, nous mesurons aussi l’audience pour savoir quelles offres vous intéressent et négocier pour vous de meilleurs tarifs. <a href="/confidentialite#cookies">En savoir plus</a></p>'
      + '<div class="wc-det"' + (details ? '' : ' hidden') + '>'
      + '<div class="wc-cat"><div class="wc-row"><b>Essentiels</b><span class="wc-tag">Toujours actifs</span></div>'
      + '<p>Connexion sécurisée à votre compte, protection contre les accès frauduleux, panier de demandes et préférences d’affichage.</p>'
      + '<span class="wc-gain">✓ Ce que vous y gagnez : rester connecté en toute sécurité et retrouver votre panier.</span></div>'
      + '<div class="wc-cat"><div class="wc-row"><b><label for="wc-a">Mesure d’audience</label></b><span class="wc-sw"><input type="checkbox" role="switch" id="wc-a"' + (on ? ' checked' : '') + '><span></span></span></div>'
      + '<p>Google Analytics et statistiques de consultation Wander (pages et offres vues). Aucune publicité, aucune revente de vos données.</p>'
      + '<span class="wc-gain">✓ Ce que vous y gagnez : des offres mieux ciblées, de nouvelles destinations selon les demandes des collaborateurs et une plateforme plus rapide.</span></div>'
      + '</div>'
      + '<div class="wc-btns">'
      + (details ? '<button type="button" class="wc-ok" data-wc="save">Enregistrer mes choix</button><button type="button" class="wc-no" data-wc="all">Tout accepter</button>'
                 : '<button type="button" class="wc-no" data-wc="none">Refuser</button><button type="button" class="wc-ok" data-wc="all">Tout accepter</button><button type="button" class="wc-more" data-wc="more">Personnaliser mes choix</button>')
      + '</div>'
      + '<p class="wc-foot">Choix conservé 6 mois, modifiable à tout moment via « Gérer les cookies » en bas de page. Données traitées conformément à la loi 09-08.</p>'
      + '</div></section>');
    if (details) box.style.animation = 'none';
    document.body.appendChild(box);
    box.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('[data-wc]'); if (!b) return;
      var k = b.getAttribute('data-wc');
      if (k === 'more') { show(true); var s = document.getElementById('wc-a'); if (s) s.focus(); return; }
      var a = k === 'all' ? true : k === 'none' ? false : !!(document.getElementById('wc-a') || {}).checked;
      write(a); close(); apply({ analytics: a }, true);
    });
  }
  function close() { var b = document.getElementById('wc'); if (b) b.remove(); }

  window.WanderConsent = {
    get: read,
    analytics: function () { var c = read(); return !!(c && c.analytics); },
    decided: function () { return !!read(); },
    open: function () { show(true); }
  };

  // Tout lien « Gérer les cookies » (attribut data-wander-consent) rouvre les réglages.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-wander-consent]');
    if (a) { e.preventDefault(); show(true); }
  });

  function init() {
    var c = read();
    if (c) apply(c, false); else show(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
