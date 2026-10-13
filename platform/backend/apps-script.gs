/**
 * Wander — back-end Google Sheets
 * 1. Créez un Google Sheet vide (ex : « Wander — données »). Extensions > Apps Script, collez ce fichier.
 * 2. Remplacez ADMIN_TOKEN par un mot de passe long de votre choix, et NOTIFY_EMAIL par votre email.
 * 3. Déployer > Nouveau déploiement > Application web. Exécuter en tant que : moi. Accès : tout le monde.
 * 4. Copiez l'adresse de l'application web dans sync.js (SYNC_URL). Les onglets se créent tout seuls.
 */
const ADMIN_TOKEN = 'CHANGEZ-MOI';
const NOTIFY_EMAIL = 'resa@wandertravel-event.com';
const SITE_URL = 'https://VOTRE-SITE/index.html';
const SALT = 'wander-2026';
// Domaines d'email acceptés automatiquement (ex : ['axa.ma', 'ocp.ma']). Les autres inscriptions attendent votre validation.
const ALLOWED_DOMAINS = [];
const STATUTS = ['Nouveau', 'Contacté', 'Confirmé', 'Annulé'];

function sheet_(name, head) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); s.appendRow(head); s.setFrozenRows(1); s.getRange(1, 1, 1, head.length).setFontWeight('bold'); }
  return s;
}
const H_DEM = ['Date', 'Statut', 'Prénom', 'Nom', 'Email', 'Entreprise', 'Téléphone', 'Produit', 'Formule', 'Départ', 'Nuits', 'Chambres', 'Adultes', 'Enfants -12', 'Bébés', 'Estimation', 'Conseiller'];
const H_ACC = ['Identifiant', 'Hash', 'Nom', 'Prénom', 'Email', 'Entreprise', 'Actif', 'Créé le'];
const H_VIS = ['Date', 'Page', 'Offre', 'Visiteur'];
const out_ = o => ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
const auth_ = t => t && t === ADMIN_TOKEN;

const hash_ = pw => Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, SALT + pw));
const sign_ = s => Utilities.base64Encode(Utilities.computeHmacSha256Signature(s, ADMIN_TOKEN));
function rndPw_() { const c = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789'; let p = ''; for (let i = 0; i < 10; i++) p += c[Math.floor(Math.random() * c.length)]; return p; }
function mailAccess_(to, prenom, id, pw) {
  MailApp.sendEmail(to, 'Votre accès à la plateforme Wander', 'Bonjour ' + prenom + ',\n\nVotre accès aux offres Wander Travel & Event est créé.\n\nSite : ' + SITE_URL + '\nIdentifiant : ' + id + '\nMot de passe : ' + pw + '\n\nVous pouvez consulter les offres, puis envoyer une demande de réservation depuis la fiche de chaque offre.\n\nWander Travel & Event');
}
function readOv_() {
  const s = sheet_('Config', ['Données (ne pas modifier à la main)']);
  const n = s.getLastRow(); if (n < 2) return {};
  const txt = s.getRange(2, 1, n - 1, 1).getValues().map(r => r[0]).join('');
  try { return JSON.parse(txt); } catch (e) { return {}; }
}
function writeOv_(ov) {
  const s = sheet_('Config', ['Données (ne pas modifier à la main)']);
  if (s.getLastRow() > 1) s.getRange(2, 1, s.getLastRow() - 1, 1).clear();
  const txt = JSON.stringify(ov), parts = [];
  for (let i = 0; i < txt.length; i += 40000) parts.push([txt.slice(i, i + 40000)]);
  if (parts.length) s.getRange(2, 1, parts.length, 1).setValues(parts);
}

function doGet(e) {
  const a = (e.parameter || {}).action, tok = (e.parameter || {}).token;
  if (a === 'ping') return out_({ ok: true, time: new Date().toISOString() });
  if (a === 'overrides') return out_(readOv_());
  if (!auth_(tok)) return out_({ error: 'auth' });
  if (a === 'users') {
    const u = sheet_('Accès', H_ACC).getDataRange().getValues().slice(1);
    return out_(u.map((r, i) => ({ row: i + 2, id: r[0], ln: r[2], fn: r[3], em: r[4], co: r[5], active: r[6] !== 'Non' })));
  }
  if (a === 'stats') {
    const v = sheet_('Visites', H_VIS).getDataRange().getValues().slice(1);
    const d = sheet_('Demandes', H_DEM).getDataRange().getValues().slice(1);
    return out_({
      visits: v.map(r => ({ t: new Date(r[0]).getTime(), p: r[1], o: r[2], v: r[3] })),
      requests: d.map((r, i) => ({ row: i + 2, t: new Date(r[0]).getTime(), status: r[1], fn: r[2], ln: r[3], em: r[4], co: r[5], ph: r[6], product: r[7], variant: r[8], date: r[9], nights: r[10], rooms: r[11], adults: r[12], children: r[13], babies: r[14], total: r[15], advisor: r[16] })).reverse().slice(0, 500)
    });
  }
  return out_({ error: 'action' });
}

function doPost(e) {
  let b = {}; try { b = JSON.parse(e.postData.contents); } catch (x) { return out_({ error: 'json' }); }
  if (b.action === 'visit') {
    sheet_('Visites', H_VIS).appendRow([new Date(), String(b.page || ''), String(b.offer || ''), String(b.vid || '')]);
    return out_({ ok: true });
  }
  if (b.action === 'signup') {
    const s = sheet_('Accès', H_ACC), rows = s.getDataRange().getValues().slice(1);
    const em = String(b.em || '').trim().toLowerCase(), fn = String(b.fn || '').trim(), ln = String(b.ln || '').trim(), co = String(b.co || '').trim();
    if (!/^\S+@\S+\.\S+$/.test(em) || !fn || !ln) return out_({ ok: false, error: 'invalid' });
    if (rows.some(x => String(x[4]).toLowerCase() === em)) return out_({ ok: false, error: 'exists' });
    const base = (fn[0] + ln).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
    let id = base, n = 1; while (rows.some(x => String(x[0]).toLowerCase() === id)) id = base + (++n);
    const auto = ALLOWED_DOMAINS.indexOf(em.split('@')[1]) > -1;
    if (auto) {
      const pw = rndPw_(); s.appendRow([id, hash_(pw), ln, fn, em, co, 'Oui', new Date()]); mailAccess_(em, fn, id, pw);
      return out_({ ok: true, status: 'active' });
    }
    s.appendRow([id, '', ln, fn, em, co, 'Non', new Date()]);
    try { MailApp.sendEmail(em, 'Votre demande d\'accès Wander', 'Bonjour ' + fn + ',\n\nNous avons bien reçu votre demande d\'inscription. Nous la vérifions et vous recevrez vos identifiants par email.\n\nWander Travel & Event'); } catch (x) {}
    try { MailApp.sendEmail(NOTIFY_EMAIL, 'Nouvelle inscription à valider', fn + ' ' + ln + ' (' + co + ') — ' + em + '\nActivez-la dans le tableau de bord, onglet Salariés.'); } catch (x) {}
    return out_({ ok: true, status: 'pending' });
  }
  if (b.action === 'forgot') {
    const s = sheet_('Accès', H_ACC), rows = s.getDataRange().getValues().slice(1), em = String(b.em || '').trim().toLowerCase();
    const i = rows.findIndex(x => String(x[4]).toLowerCase() === em && x[6] !== 'Non');
    if (i > -1) { const pw = rndPw_(); s.getRange(i + 2, 2).setValue(hash_(pw)); mailAccess_(rows[i][4], rows[i][3], rows[i][0], pw); }
    Utilities.sleep(600); return out_({ ok: true });
  }
  if (b.action === 'login') {
    const s = sheet_('Accès', H_ACC), rows = s.getDataRange().getValues().slice(1);
    const id = String(b.id || '').trim().toLowerCase(), r = rows.find(x => String(x[0]).toLowerCase() === id);
    if (!r || r[6] === 'Non' || r[1] !== hash_(String(b.pw || ''))) { Utilities.sleep(800); return out_({ ok: false }); }
    const exp = Date.now() + 30 * 864e5, p = r[0] + '|' + exp;
    return out_({ ok: true, id: r[0], fn: r[3], ln: r[2], em: r[4], co: r[5], exp: exp, token: p + '|' + sign_(p) });
  }
  if (b.action === 'request') {
    sheet_('Demandes', H_DEM).appendRow([new Date(), 'Nouveau', b.fn, b.ln, b.em, b.co, b.ph, b.product, b.variant, b.date, b.nights, b.rooms, b.adults, b.children, b.babies, b.total, '']);
    const ref = 'W-' + (sheet_('Demandes', H_DEM).getLastRow() - 1);
    try {
      if (b.em) MailApp.sendEmail(b.em, 'Votre demande ' + ref + ' : ' + b.product, 'Bonjour ' + b.fn + ',\n\nNous avons bien reçu votre demande de réservation. Un conseiller Wander vous répond pour confirmer la disponibilité et le tarif.\n\nRéférence : ' + ref + '\nProduit : ' + b.product + ' — ' + b.variant + '\nDépart : ' + b.date + (b.nights ? ' · ' + b.nights + ' nuit(s) · ' + b.rooms + ' chambre(s)' : '') + '\nAdultes : ' + b.adults + ' · Enfants -12 ans : ' + b.children + ' · Bébés : ' + b.babies + '\nEstimation : ' + b.total + '\n\nWander Travel & Event');
    } catch (x) {}
    try {
      MailApp.sendEmail(NOTIFY_EMAIL, 'Nouvelle demande : ' + b.product,
        b.fn + ' ' + b.ln + ' (' + b.co + ')\n' + b.em + ' · ' + b.ph + '\n\n' + b.product + ' — ' + b.variant + '\nDépart : ' + b.date + ' · ' + b.nights + ' nuit(s) · ' + b.rooms + ' chambre(s)\nAdultes : ' + b.adults + ' · Enfants -12 ans : ' + b.children + ' · Bébés : ' + b.babies + '\nEstimation : ' + b.total);
    } catch (x) {}
    return out_({ ok: true });
  }
  if (!auth_(b.token)) return out_({ error: 'auth' });
  if (b.action === 'addUser') {
    const s = sheet_('Accès', H_ACC), rows = s.getDataRange().getValues().slice(1);
    const base = (String(b.fn || 'x')[0] + String(b.ln || 'user')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
    let id = base, n = 1; while (rows.some(x => String(x[0]).toLowerCase() === id)) id = base + (++n);
    const pw = rndPw_();
    s.appendRow([id, hash_(pw), b.ln, b.fn, b.em, b.co, 'Oui', new Date()]);
    mailAccess_(b.em, b.fn, id, pw);
    return out_({ ok: true, id: id });
  }
  if (b.action === 'resetPw') {
    const s = sheet_('Accès', H_ACC), r = s.getRange(b.row, 1, 1, 8).getValues()[0], pw = rndPw_();
    s.getRange(b.row, 2).setValue(hash_(pw)); s.getRange(b.row, 7).setValue('Oui'); mailAccess_(r[4], r[3], r[0], pw);
    return out_({ ok: true });
  }
  if (b.action === 'setActive') { sheet_('Accès', H_ACC).getRange(b.row, 7).setValue(b.active ? 'Oui' : 'Non'); return out_({ ok: true }); }
  if (b.action === 'save') { writeOv_(b.overrides || {}); return out_({ ok: true }); }
  if (b.action === 'status') {
    const s = sheet_('Demandes', H_DEM);
    if (STATUTS.indexOf(b.status) > -1 && b.row > 1) s.getRange(b.row, 2).setValue(b.status);
    if (b.advisor !== undefined && b.row > 1) s.getRange(b.row, 17).setValue(b.advisor);
    return out_({ ok: true });
  }
  return out_({ error: 'action' });
}

// À exécuter une fois depuis l'éditeur (menu Exécuter > setup) : crée les onglets et demande les autorisations Gmail et Sheets.
function setup() {
  sheet_('Demandes', H_DEM); sheet_('Visites', H_VIS); sheet_('Accès', H_ACC); sheet_('Config', ['Données (ne pas modifier à la main)']);
  MailApp.sendEmail(NOTIFY_EMAIL, 'Wander : installation réussie', 'Les onglets sont créés et l\'envoi d\'emails fonctionne.');
}
