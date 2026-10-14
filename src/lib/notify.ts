import "server-only";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import webpush from "web-push";
import { baseURL } from "./auth";
import { sendNotificationEmail, type MailLine } from "./email";
import {
  claimNotif,
  getMembers,
  getOverrides,
  getPendingCarts,
  getPushSubs,
  hasNotif,
  markCartReminded,
  removePushSub,
  type CartItem,
  type Member,
} from "./platform-store";

// Notifications des salariés : relance du panier, Jeudi Promo, nouveautés.
// Canaux : email (toujours) + notification push sur les appareils autorisés.

const HOUR = 3600_000;
const demoEmail = (process.env.DEMO_EMAIL || "").trim().toLowerCase();
const pushReady = Boolean(process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY);
if (pushReady) {
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:contact@wandertravel-event.com",
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );
}

export const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || "";

const fmt = (n?: number | null) => (n ? `${Math.round(n).toLocaleString("fr-FR")} MAD` : "Sur devis");
const dateFr = (d?: string) => (d ? new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "");
const link = (p: string) => new URL(p, baseURL).toString();

// ---------- Désabonnement (lien signé, sans connexion) ----------

function sign(userId: string) {
  return crypto.createHmac("sha256", process.env.BETTER_AUTH_SECRET || "dev").update(`unsub:${userId}`).digest("base64url").slice(0, 32);
}
export function unsubscribeUrl(userId: string) {
  return link(`/desabonnement?u=${encodeURIComponent(userId)}&t=${sign(userId)}`);
}
export function checkUnsubscribe(userId: string, token: string) {
  const a = Buffer.from(sign(userId));
  const b = Buffer.from(token || "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

// ---------- Catalogue (platform/data.js + modifications publiées) ----------

type Offer = { id: string; title: string; location?: string; startingPrice?: number | null; priceLabel?: string; hidden?: boolean; promo?: boolean };
type Overrides = { deleted?: string[]; added?: Offer[]; offers?: Record<string, Partial<Offer> & { hidden?: boolean; promo?: boolean }> };

function baseOffers(): Offer[] {
  try {
    const file = path.join(/* turbopackIgnore: true */ process.cwd(), "platform", "data.js");
    const ctx: Record<string, unknown> = { console: { log() {}, warn() {} } };
    vm.createContext(ctx);
    vm.runInContext(`${fs.readFileSync(file, "utf8")}\n;globalThis.__offers = OFFERS_DATA;`, ctx, { timeout: 2000 });
    return (ctx.__offers as Offer[]) || [];
  } catch (e) {
    console.error("[notify] catalogue illisible :", e);
    return [];
  }
}

export async function catalogue() {
  const ov = ((await getOverrides()) || {}) as Overrides;
  const deleted = new Set(ov.deleted || []);
  const all = [...baseOffers(), ...(ov.added || [])].filter((o) => !deleted.has(o.id));
  return {
    ov,
    offers: all
      .map((o) => {
        const p = (ov.offers || {})[o.id] || {};
        return {
          ...o,
          title: p.title || o.title,
          location: p.location || o.location,
          priceLabel: p.priceLabel || o.priceLabel,
          startingPrice: p.startingPrice != null && String(p.startingPrice) !== "" ? Number(p.startingPrice) : o.startingPrice,
          hidden: !!p.hidden,
          promo: p.promo !== undefined ? !!p.promo : !!o.promo,
        };
      })
      .filter((o) => !o.hidden),
  };
}

const offerLine = (o: Offer): MailLine => ({
  title: o.title,
  detail: o.location || undefined,
  price: o.startingPrice ? `dès ${fmt(o.startingPrice)}${o.priceLabel ? ` · ${o.priceLabel}` : ""}` : "Tarif sur demande",
});

// ---------- Envoi push ----------

export async function pushTo(userId: string, payload: { title: string; body: string; url: string; tag?: string }) {
  if (!pushReady) return 0;
  let sent = 0;
  for (const s of await getPushSubs(userId)) {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload), { TTL: 86400 });
      sent++;
    } catch (e) {
      const code = (e as { statusCode?: number }).statusCode;
      // Appareil désinscrit ou abonnement expiré : on l'oublie.
      if (code === 404 || code === 410) await removePushSub(s.endpoint);
      else console.error("[notify] push :", code || e);
    }
  }
  return sent;
}

const reachable = (m: Member) => m.verified && !m.banned && m.email.toLowerCase() !== demoEmail;

async function each<T>(list: T[], fn: (x: T) => Promise<void>, concurrency = 4) {
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, list.length) }, async () => {
      while (i < list.length) {
        const x = list[i++];
        try {
          await fn(x);
        } catch (e) {
          console.error("[notify] envoi :", e);
        }
      }
    }),
  );
}

// ---------- 1. Relance du panier (24 h puis 72 h) ----------

function cartLines(items: CartItem[]): MailLine[] {
  return items.slice(0, 6).map((i) => ({
    title: [i.title, i.variant].filter(Boolean).join(" — "),
    detail: i.date ? `Du ${dateFr(i.date)}${i.end ? ` au ${dateFr(i.end)}` : ""}` : undefined,
    price: i.total ? fmt(i.total) : undefined,
  }));
}

export async function sendCartReminder(m: Member, items: CartItem[], step: 1 | 2) {
  const first = m.name.split(" ")[0] || "";
  const main = items[0]?.title || "votre séjour";
  const url = link("/plateforme/index.html?panier=1");
  await sendNotificationEmail({
    to: m.email,
    subject: step === 1 ? `${first ? first + ", v" : "V"}otre séjour ${main} vous attend 🌴` : `Dernier rappel : vos dates pour ${main} ne sont pas garanties`,
    title: step === 1 ? "Votre panier vous attend" : "Ne laissez pas passer vos dates",
    intro:
      step === 1
        ? `Bonjour ${first}, vous avez sélectionné ${items.length > 1 ? "ces séjours" : "ce séjour"} sur la plateforme Wander. Vos tarifs collaborateur sont toujours disponibles : finalisez votre demande en un clic, un conseiller Wander vous confirme la disponibilité.`
        : `Bonjour ${first}, votre panier est toujours en attente. Les places sur ces dates sont limitées : finalisez votre demande pour que nous puissions bloquer votre séjour.`,
    lines: cartLines(items),
    cta: "Finaliser ma demande",
    url,
    unsubscribeUrl: unsubscribeUrl(m.id),
  });
  await pushTo(m.id, {
    title: step === 1 ? "Votre panier vous attend 🌴" : "Dernier rappel pour vos dates",
    body: `${first ? first + ", v" : "V"}otre séjour ${main} est encore dans votre panier. Finalisez avant que les dates partent.`,
    url,
    tag: "panier",
  });
}

export async function runCartReminders(now = Date.now()) {
  const members = new Map((await getMembers()).map((m) => [m.id, m]));
  let sent = 0;
  for (const c of await getPendingCarts()) {
    const m = members.get(c.userId);
    if (!m || !reachable(m) || !m.prefs.cart || !c.items.length) continue;
    let step: 1 | 2 | 0 = 0;
    if (c.reminded === 0 && now - c.updated >= 24 * HOUR) step = 1;
    else if (c.reminded === 1 && c.lastReminded && now - c.lastReminded >= 48 * HOUR) step = 2;
    if (!step) continue;
    // Marqué avant l'envoi : jamais deux relances identiques, même en cas d'erreur.
    await markCartReminded(c.userId, step);
    try {
      await sendCartReminder(m, c.items, step);
      sent++;
    } catch (e) {
      console.error("[notify] relance panier :", e);
    }
  }
  return sent;
}

// ---------- 2. Jeudi Promo ----------

function casablanca(now: number) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Casablanca", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(new Date(now))
      .map((p) => [p.type, p.value]),
  );
  return { weekday: parts.weekday, day: `${parts.year}-${parts.month}-${parts.day}` };
}

export async function promoContent() {
  const { offers } = await catalogue();
  return offers.filter((o) => o.promo).slice(0, 8);
}

export async function sendPromo(m: Member, promos: Offer[]) {
  const first = m.name.split(" ")[0] || "";
  const url = link("/plateforme/index.html#promo-flash");
  await sendNotificationEmail({
    to: m.email,
    subject: `🔥 Jeudi Promo Wander : ${promos[0].title}${promos.length > 1 ? ` et ${promos.length - 1} autre${promos.length > 2 ? "s" : ""} offre${promos.length > 2 ? "s" : ""}` : ""}`,
    title: "Jeudi Promo",
    intro: `Bonjour ${first}, voici les offres de la semaine réservées aux collaborateurs des entreprises partenaires Wander. Places limitées.`,
    lines: promos.map(offerLine),
    cta: "Voir les promos",
    url,
    unsubscribeUrl: unsubscribeUrl(m.id),
  });
  await pushTo(m.id, { title: "🔥 Jeudi Promo Wander", body: `${promos[0].title} et les offres de la semaine pour les collaborateurs.`, url, tag: "promo" });
}

export async function runThursdayPromo(now = Date.now(), force = false) {
  const { weekday, day } = casablanca(now);
  if (!force && weekday !== "Thu") return { sent: 0, reason: "pas jeudi" };
  const promos = await promoContent();
  if (!promos.length) return { sent: 0, reason: "aucune offre cochée « Promo du jeudi »" };
  if (!(await claimNotif(`jeudi:${day}`))) return { sent: 0, reason: "déjà envoyé aujourd'hui" };
  const list = (await getMembers()).filter((m) => reachable(m) && m.prefs.promos);
  let sent = 0;
  await each(list, async (m) => {
    await sendPromo(m, promos);
    sent++;
  });
  return { sent };
}

// ---------- 3. Nouveautés (offre ajoutée au catalogue) ----------

export async function sendNews(m: Member, fresh: Offer[]) {
  const first = m.name.split(" ")[0] || "";
  const url = fresh.length === 1 ? link(`/plateforme/offre.html?id=${encodeURIComponent(fresh[0].id)}`) : link("/plateforme/index.html#offres");
  await sendNotificationEmail({
    to: m.email,
    subject: `Nouveau chez Wander : ${fresh[0].title}`,
    title: fresh.length === 1 ? "Nouveauté sur votre plateforme" : "Nouveautés sur votre plateforme",
    intro: `Bonjour ${first}, ${fresh.length === 1 ? "une nouvelle offre vient d'arriver" : "de nouvelles offres viennent d'arriver"} sur la plateforme Avantages Salariés, avec vos tarifs collaborateur.`,
    lines: fresh.map(offerLine),
    cta: "Découvrir",
    url,
    unsubscribeUrl: unsubscribeUrl(m.id),
  });
  await pushTo(m.id, { title: "Nouveau chez Wander ✨", body: fresh.map((o) => o.title).join(" · "), url, tag: "nouveau" });
}

export async function runNewOffers() {
  const { ov, offers } = await catalogue();
  const added = (ov.added || []).map((a) => offers.find((o) => o.id === a.id)).filter((o): o is NonNullable<typeof o> => !!o);
  // Premier passage : les offres déjà publiées ne sont pas annoncées.
  if (!(await hasNotif("init:new"))) {
    for (const o of added) await claimNotif(`new:${o.id}`);
    await claimNotif("init:new");
    return { sent: 0, reason: "initialisation" };
  }
  const fresh: Offer[] = [];
  for (const o of added) if (await claimNotif(`new:${o.id}`)) fresh.push(o);
  if (!fresh.length) return { sent: 0 };
  const list = (await getMembers()).filter((m) => reachable(m) && m.prefs.news);
  let sent = 0;
  await each(list, async (m) => {
    await sendNews(m, fresh);
    sent++;
  });
  return { sent, offers: fresh.map((o) => o.title) };
}
