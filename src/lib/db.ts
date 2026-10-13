import "server-only";
import fs from "node:fs";
import path from "node:path";
import type BetterSqlite3 from "better-sqlite3";
import type { Pool } from "pg";

// Base de données des comptes :
// - DATABASE_URL (postgres://…) : Postgres (Vercel + Neon, hébergement sans disque persistant)
// - sinon SQLite locale, hors du dossier public (VPS) : DATABASE_PATH ou ./data/wander.db
const globalForDb = globalThis as unknown as { wanderDb?: BetterSqlite3.Database | Pool };

function openPostgres(url: string): Pool {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Pool } = require("pg") as typeof import("pg");
  // Certificat vérifié par défaut ; DATABASE_SSL=no-verify pour les fournisseurs à CA privée (Supabase).
  const local = /sslmode=disable|localhost|127\.0\.0\.1/.test(url);
  const ssl = local ? undefined : { rejectUnauthorized: process.env.DATABASE_SSL !== "no-verify" };
  // Les paramètres sslmode de l'URL sont ignorés au profit du réglage ci-dessus.
  const connectionString = url.replace(/([?&])sslmode=[^&]*&?/, "$1").replace(/[?&]$/, "");
  return new Pool({ connectionString, max: 5, ssl });
}

function openSqlite(): BetterSqlite3.Database {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require("better-sqlite3") as typeof BetterSqlite3;
  // Pendant « next build » : base en mémoire, aucun fichier créé ni embarqué.
  if (process.env.NEXT_PHASE === "phase-production-build") return new Database(":memory:");
  // Vercel sans DATABASE_URL : disque en lecture seule, repli temporaire dans /tmp
  // (effacé à chaque redémarrage — reliez une base Postgres pour un usage réel).
  const fallback = process.env.VERCEL ? "/tmp/wander.db" : path.join(/* turbopackIgnore: true */ process.cwd(), "data", "wander.db");
  if (process.env.VERCEL && !process.env.DATABASE_PATH) console.warn("[db] Aucune DATABASE_URL : base temporaire /tmp (non persistante).");
  const dbPath = path.resolve(/* turbopackIgnore: true */ process.env.DATABASE_PATH || fallback);
  fs.mkdirSync(path.dirname(dbPath), { recursive: true, mode: 0o700 });
  const db = new Database(dbPath);
  try {
    fs.chmodSync(dbPath, 0o600);
  } catch {}
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.pragma("busy_timeout = 5000");
  return db;
}

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
export const db = globalForDb.wanderDb ?? (url ? openPostgres(url) : openSqlite());
if (process.env.NODE_ENV !== "production") globalForDb.wanderDb = db;
