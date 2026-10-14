// Wander — Promo du jeudi : offres cochées « Promo jeudi » (data.js ou tableau de bord) affichées dans #promo-flash.
(function () {
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]); }
function render() {
  const box = document.getElementById('flash-offers'), grid = document.getElementById('flash-offers-grid');
  if (!box || !grid || typeof OFFERS_DATA === 'undefined') return;
  const list = OFFERS_DATA.filter(o => o.promo).slice(0, 6);
  if (!list.length) { box.hidden = true; return; }
  grid.innerHTML = list.map(o => {
    const rows = ((o.details && o.details.tableRows) || []).filter(r => r.length === 2).slice(0, 4);
    const url = 'offre.html?id=' + encodeURIComponent(o.id);
    const price = o.startingPrice == null ? 'Tarif sur demande' : 'Dès ' + Number(o.startingPrice).toLocaleString('fr-FR') + ' MAD';
    return '<article class="flash-offer">'
      + '<a class="flash-offer-media" href="' + url + '" tabindex="-1" aria-hidden="true"><img src="' + esc(o.image) + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'"><span class="flash-offer-badge"><i class="fa-solid fa-fire"></i> Promo jeudi</span></a>'
      + '<div class="flash-offer-body">'
      + '<p class="flash-offer-loc"><i class="fa-solid fa-location-dot"></i> ' + esc(o.location) + '</p>'
      + '<h4><a href="' + url + '">' + esc(o.title) + '</a></h4>'
      + (o.stars ? '<p class="flash-offer-meta">' + esc(o.stars) + '</p>' : '')
      + ((o.equipments || []).length ? '<ul class="flash-offer-tags">' + o.equipments.slice(0, 6).map(e => '<li>' + esc(e) + '</li>').join('') + '</ul>' : '')
      + (rows.length ? '<ul class="flash-offer-rates">' + rows.map(r => '<li><span>' + esc(r[0]) + '</span><b>' + esc(r[r.length - 1]) + '</b></li>').join('') + '</ul>' : '')
      + '<div class="flash-offer-foot"><div><b>' + price + '</b>' + (o.priceLabel ? '<small>' + esc(o.priceLabel) + '</small>' : '') + '</div>'
      + '<a class="flash-offer-cta" href="' + url + '">Voir l’offre <i class="fa-solid fa-arrow-right"></i></a></div>'
      + '</div></article>';
  }).join('');
  grid.classList.toggle('solo', list.length === 1);
  box.hidden = false;
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
