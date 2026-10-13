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
