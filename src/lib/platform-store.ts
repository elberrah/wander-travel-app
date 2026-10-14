import "server-only";
import type BetterSqlite3 from "better-sqlite3";
import type { Pool } from "pg";
import { db } from "./db";

// Données de la plateforme Avantages Salariés (ex-Google Sheets) :
// modifications d'offres publiées par l'admin, visites et demandes de réservation.
// Même base que les comptes (Postgres sur Vercel, SQLite sur le VPS).

const isPg = !("prepare" in db);

async function run<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
  if (isPg) {
    let i = 0;
    const res = await (db as Pool).query(sql.replace(/\?/g, () => `$${++i}`), params);
    return res.rows as T[];
  }
  const stmt = (db as BetterSqlite3.Database).prepare(sql);
  return (stmt.reader ? stmt.all(...params) : (stmt.run(...params), [])) as T[];
}

let ready: Promise<void> | null = null;
function ensureTables() {
  ready ??= (async () => {
    const id = isPg ? "BIGSERIAL PRIMARY KEY" : "INTEGER PRIMARY KEY AUTOINCREMENT";
    await run(`CREATE TABLE IF NOT EXISTS wander_config (k TEXT PRIMARY KEY, v TEXT NOT NULL)`);
    await run(`CREATE TABLE IF NOT EXISTS wander_visit (id ${id}, t BIGINT NOT NULL, page TEXT, offer TEXT, user_id TEXT)`);
    await run(`CREATE INDEX IF NOT EXISTS wander_visit_t ON wander_visit (t)`);
    await run(`CREATE TABLE IF NOT EXISTS wander_request (id ${id}, t BIGINT NOT NULL, status TEXT NOT NULL, user_id TEXT, data TEXT NOT NULL)`);
    // Notifications : panier en cours, préférences, appareils (push), envois déjà faits.
    await run(`CREATE TABLE IF NOT EXISTS wander_cart (user_id TEXT PRIMARY KEY, items TEXT NOT NULL, updated BIGINT NOT NULL, reminded INTEGER NOT NULL DEFAULT 0, last_reminded BIGINT)`);
    await run(`CREATE TABLE IF NOT EXISTS wander_prefs (user_id TEXT PRIMARY KEY, cart INTEGER NOT NULL DEFAULT 1, promos INTEGER NOT NULL DEFAULT 0, news INTEGER NOT NULL DEFAULT 0, asked INTEGER NOT NULL DEFAULT 0)`);
    await run(`CREATE TABLE IF NOT EXISTS wander_push (endpoint TEXT PRIMARY KEY, user_id TEXT NOT NULL, p256dh TEXT NOT NULL, auth TEXT NOT NULL, t BIGINT NOT NULL)`);
    await run(`CREATE TABLE IF NOT EXISTS wander_notif_log (k TEXT PRIMARY KEY, t BIGINT NOT NULL)`);
    // Photos importées depuis le tableau de bord (ordinateur ou téléphone).
    await run(`CREATE TABLE IF NOT EXISTS wander_photo (id TEXT PRIMARY KEY, mime TEXT NOT NULL, data TEXT NOT NULL, size INTEGER NOT NULL, t BIGINT NOT NULL, user_id TEXT)`);
  })().catch((e) => {
    ready = null;
    throw e;
  });
  return ready;
}

export const REQUEST_STATUSES = ["Nouveau", "Contacté", "Confirmé", "Annulé"];

export async function getOverrides(): Promise<unknown> {
  await ensureTables();
  const [row] = await run<{ v: string }>(`SELECT v FROM wander_config WHERE k = ?`, ["overrides"]);
  return row ? JSON.parse(row.v) : {};
}

export async function saveOverrides(ov: unknown) {
  await ensureTables();
  const v = JSON.stringify(ov ?? {});
  await run(`INSERT INTO wander_config (k, v) VALUES (?, ?) ON CONFLICT (k) DO UPDATE SET v = excluded.v`, ["overrides", v]);
}

export async function addVisit(page: string, offer: string, userId: string) {
  await ensureTables();
  await run(`INSERT INTO wander_visit (t, page, offer, user_id) VALUES (?, ?, ?, ?)`, [Date.now(), page, offer, userId]);
}

export async function addRequest(data: Record<string, unknown>, userId: string) {
  await ensureTables();
  await run(`INSERT INTO wander_request (t, status, user_id, data) VALUES (?, ?, ?, ?)`, [Date.now(), "Nouveau", userId, JSON.stringify(data)]);
}

export async function setRequestStatus(id: number, status: string) {
  await ensureTables();
  await run(`UPDATE wander_request SET status = ? WHERE id = ?`, [status, id]);
}

// Format attendu par le tableau de bord (admin.html).
export async function getStats() {
  await ensureTables();
  const since = Date.now() - 90 * 864e5;
  const visits = await run<{ t: string | number; page: string; offer: string; user_id: string }>(
    `SELECT t, page, offer, user_id FROM wander_visit WHERE t > ? ORDER BY t DESC LIMIT 50000`,
    [since],
  );
  const requests = await run<{ id: string | number; t: string | number; status: string; data: string }>(
    `SELECT id, t, status, data FROM wander_request ORDER BY id DESC LIMIT 500`,
  );
  // Qui consulte : un compte = un visiteur (nom, entreprise, pages vues, dernière visite).
  const people = await run<{ name: string; email: string; company: string | null; n: string | number; last: string | number }>(
    `SELECT u.name AS name, u.email AS email, u.company AS company, COUNT(*) AS n, MAX(v.t) AS last
     FROM wander_visit v JOIN "user" u ON u.id = v.user_id WHERE v.t > ?
     GROUP BY u.id, u.name, u.email, u.company ORDER BY MAX(v.t) DESC LIMIT 200`,
    [since],
  );
  return {
    people: people.map((p) => ({ name: p.name, email: p.email, company: p.company || "", n: Number(p.n), last: Number(p.last) })),
    visits: visits.map((v) => ({ t: Number(v.t), p: v.page, o: v.offer, v: v.user_id })),
    requests: requests.map((r) => ({ ...JSON.parse(r.data), row: Number(r.id), t: Number(r.t), status: r.status })),
  };
}

// ---------- Panier (relances) ----------

export type CartItem = { title?: string; variant?: string; date?: string; end?: string; total?: number; offerId?: string };

export async function saveCart(userId: string, items: CartItem[]) {
  await ensureTables();
  if (!items.length) {
    await run(`DELETE FROM wander_cart WHERE user_id = ?`, [userId]);
    return;
  }
  // Panier inchangé (simple nouvelle visite) : on garde le compte à rebours en cours.
  const json = JSON.stringify(items);
  const [cur] = await run<{ items: string }>(`SELECT items FROM wander_cart WHERE user_id = ?`, [userId]);
  if (cur && cur.items === json) return;
  // Panier modifié : le compte à rebours des relances repart de zéro.
  await run(
    `INSERT INTO wander_cart (user_id, items, updated, reminded, last_reminded) VALUES (?, ?, ?, 0, NULL)
     ON CONFLICT (user_id) DO UPDATE SET items = excluded.items, updated = excluded.updated, reminded = 0, last_reminded = NULL`,
    [userId, json, Date.now()],
  );
}

export type PendingCart = { userId: string; items: CartItem[]; updated: number; reminded: number; lastReminded: number | null };

export async function getPendingCarts(): Promise<PendingCart[]> {
  await ensureTables();
  const rows = await run<{ user_id: string; items: string; updated: string | number; reminded: string | number; last_reminded: string | number | null }>(
    `SELECT user_id, items, updated, reminded, last_reminded FROM wander_cart ORDER BY updated DESC LIMIT 1000`,
  );
  return rows.map((r) => ({
    userId: r.user_id,
    items: JSON.parse(r.items),
    updated: Number(r.updated),
    reminded: Number(r.reminded),
    lastReminded: r.last_reminded == null ? null : Number(r.last_reminded),
  }));
}

export async function markCartReminded(userId: string, step: number) {
  await ensureTables();
  await run(`UPDATE wander_cart SET reminded = ?, last_reminded = ? WHERE user_id = ?`, [step, Date.now(), userId]);
}

// ---------- Préférences ----------

export type Prefs = { cart: boolean; promos: boolean; news: boolean; asked: boolean };

export async function getPrefs(userId: string): Promise<Prefs> {
  await ensureTables();
  const [r] = await run<{ cart: number; promos: number; news: number; asked: number }>(
    `SELECT cart, promos, news, asked FROM wander_prefs WHERE user_id = ?`,
    [userId],
  );
  return r
    ? { cart: !!Number(r.cart), promos: !!Number(r.promos), news: !!Number(r.news), asked: !!Number(r.asked) }
    : { cart: true, promos: false, news: false, asked: false };
}

export async function setPrefs(userId: string, p: Partial<Prefs>) {
  const cur = { ...(await getPrefs(userId)), ...p };
  await run(
    `INSERT INTO wander_prefs (user_id, cart, promos, news, asked) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT (user_id) DO UPDATE SET cart = excluded.cart, promos = excluded.promos, news = excluded.news, asked = excluded.asked`,
    [userId, +cur.cart, +cur.promos, +cur.news, +cur.asked],
  );
  return cur;
}

// ---------- Appareils (notifications push) ----------

export type PushSub = { endpoint: string; p256dh: string; auth: string; userId: string };

export async function addPushSub(userId: string, endpoint: string, p256dh: string, auth: string) {
  await ensureTables();
  await run(
    `INSERT INTO wander_push (endpoint, user_id, p256dh, auth, t) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT (endpoint) DO UPDATE SET user_id = excluded.user_id, p256dh = excluded.p256dh, auth = excluded.auth, t = excluded.t`,
    [endpoint, userId, p256dh, auth, Date.now()],
  );
}

export async function removePushSub(endpoint: string, userId?: string) {
  await ensureTables();
  if (userId) await run(`DELETE FROM wander_push WHERE endpoint = ? AND user_id = ?`, [endpoint, userId]);
  else await run(`DELETE FROM wander_push WHERE endpoint = ?`, [endpoint]);
}

export async function getPushSubs(userId?: string): Promise<PushSub[]> {
  await ensureTables();
  const rows = await run<{ endpoint: string; user_id: string; p256dh: string; auth: string }>(
    userId ? `SELECT endpoint, user_id, p256dh, auth FROM wander_push WHERE user_id = ?` : `SELECT endpoint, user_id, p256dh, auth FROM wander_push`,
    userId ? [userId] : [],
  );
  return rows.map((r) => ({ endpoint: r.endpoint, userId: r.user_id, p256dh: r.p256dh, auth: r.auth }));
}

// ---------- Destinataires et journal des envois ----------

export type Member = { id: string; email: string; name: string; company: string; prefs: Prefs; banned: boolean; verified: boolean };

export async function getMembers(): Promise<Member[]> {
  await ensureTables();
  const rows = await run<Record<string, unknown>>(
    `SELECT u.id AS id, u.email AS email, u.name AS name, u.company AS company, u."emailVerified" AS verified, u.banned AS banned,
            p.cart AS cart, p.promos AS promos, p.news AS news, p.asked AS asked
     FROM "user" u LEFT JOIN wander_prefs p ON p.user_id = u.id`,
  );
  return rows.map((r) => ({
    id: String(r.id),
    email: String(r.email),
    name: String(r.name || ""),
    company: String(r.company || ""),
    verified: r.verified === true || Number(r.verified) === 1,
    banned: r.banned === true || Number(r.banned) === 1,
    prefs: {
      cart: r.cart == null ? true : !!Number(r.cart),
      promos: !!Number(r.promos || 0),
      news: !!Number(r.news || 0),
      asked: !!Number(r.asked || 0),
    },
  }));
}

/** Réserve une clé d'envoi (true si elle n'existait pas : l'envoi peut partir). */
export async function claimNotif(k: string): Promise<boolean> {
  await ensureTables();
  const rows = await run<{ k: string }>(`INSERT INTO wander_notif_log (k, t) VALUES (?, ?) ON CONFLICT (k) DO NOTHING RETURNING k`, [k, Date.now()]);
  return rows.length > 0;
}

export async function hasNotif(k: string): Promise<boolean> {
  await ensureTables();
  return (await run(`SELECT k FROM wander_notif_log WHERE k = ?`, [k])).length > 0;
}

// ---------- Photos importées ----------

export async function addPhoto(id: string, mime: string, data: Buffer, userId: string) {
  await ensureTables();
  await run(`INSERT INTO wander_photo (id, mime, data, size, t, user_id) VALUES (?, ?, ?, ?, ?, ?)`, [
    id,
    mime,
    data.toString("base64"),
    data.length,
    Date.now(),
    userId,
  ]);
}

export async function getPhoto(id: string): Promise<{ mime: string; data: Buffer } | null> {
  await ensureTables();
  const [r] = await run<{ mime: string; data: string }>(`SELECT mime, data FROM wander_photo WHERE id = ?`, [id]);
  return r ? { mime: r.mime, data: Buffer.from(r.data, "base64") } : null;
}
