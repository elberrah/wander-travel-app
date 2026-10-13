// Wander — motion : révélations, compteurs, parallaxe, progression
(function () {
if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
const SEL = [
  ['.section-title-wrapper > *', 0.07], ['.filter-hub', 0], ['.how-step', 0.12], ['.how-arrow', 0.12],
  ['.benefit-card', 0.08], ['.why-stat', 0.1], ['.testimonial-card', 0.12], ['.faq-item', 0.06],
  ['.accordion-item', 0.05], ['.quote-info-side', 0], ['.quote-form-side', 0.15], ['.footer-container > *', 0.08],
  ['.offer-card', 0.07], ['.op-crumb', 0], ['.op-head', 0.05], ['.op-gal', 0.1], ['.op-desc', 0],
  ['.op-h', 0], ['.pricing-table-wrapper', 0], ['.modal-notes-list', 0], ['.op-book', 0.2], ['.op-simgrid a', 0.08]
];
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('in'); io.unobserve(e.target);
  if (e.target.dataset.count) countUp(e.target);
}), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

function scan(root) {
  SEL.forEach(([s, step]) => (root || document).querySelectorAll(s).forEach(el => {
    if (el.dataset.mv) return;
    el.dataset.mv = 1;
    const sib = el.parentElement ? [...el.parentElement.children].filter(c => c.matches && c.matches(s.split('>').pop().trim())) : [el];
    const i = Math.max(0, sib.indexOf(el)) % 6;
    el.style.setProperty('--d', (i * step).toFixed(2) + 's');
    el.classList.add('mv');
    io.observe(el);
  }));
  (root || document).querySelectorAll('.accent-line').forEach(el => { if (el.dataset.mv) return; el.dataset.mv = 1; el.classList.add('mv-line'); io.observe(el); });
  (root || document).querySelectorAll('.stat-num,.why-num').forEach(el => {
    if (el.dataset.count) return;
    const m = el.textContent.trim().match(/^([\d\s\u00a0]+)(.*)$/); if (!m) return;
    el.dataset.count = parseInt(m[1].replace(/\s/g, ''), 10); el.dataset.suffix = m[2]; el.dataset.group = /\s/.test(m[1].trim()) ? 1 : 0;
    el.textContent = '0' + m[2]; io.observe(el);
  });
}
function countUp(el) {
  const to = +el.dataset.count, suf = el.dataset.suffix, t0 = performance.now(), dur = 1400;
  if (!to) { el.textContent = '0' + suf; return; }
  (function f(t) {
    const p = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - p, 4)));
    el.textContent = (el.dataset.group === '1' ? v.toLocaleString('fr-FR') : v) + suf;
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}

// Barre de progression, en-tête, parallaxe hero
const bar = document.createElement('div'); bar.id = 'mv-progress'; document.body.appendChild(bar);
const hdr = document.querySelector('.main-header'), hero = document.querySelector('.hero-content');
let tick = false;
function onScroll() {
  if (tick) return; tick = true;
  requestAnimationFrame(() => {
    tick = false;
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (hdr) hdr.classList.toggle('scrolled', y > 20);
    if (hero && y < innerHeight) { hero.style.transform = 'translateY(' + (y * 0.14) + 'px)'; hero.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.9)); }
  });
}
addEventListener('scroll', onScroll, { passive: true });

// Contenus rendus dynamiquement (cartes filtrées, page offre)
['offers-grid', 'offer-root', 'partners-accordion'].forEach(id => {
  const n = document.getElementById(id); if (!n) return;
  new MutationObserver(() => requestAnimationFrame(() => scan(n))).observe(n, { childList: true });
});
// Total animé dans le configurateur
const watchTotal = () => { const t = document.getElementById('bk-total'); if (!t || t.dataset.w) return; t.dataset.w = 1;
  new MutationObserver(() => { t.classList.remove('pop'); void t.offsetWidth; t.classList.add('pop'); }).observe(t, { childList: true, characterData: true, subtree: true }); };
const root = document.getElementById('offer-root');
if (root) new MutationObserver(watchTotal).observe(root, { childList: true, subtree: true });

function init() { scan(); onScroll(); }
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => setTimeout(init, 0)) : setTimeout(init, 0);
})();
