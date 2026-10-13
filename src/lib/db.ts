import "server-only";
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

// Base SQLite locale, hors du dossier public. Chemin réglable par DATABASE_PATH
// (en production : /var/lib/wander/wander.db, voir docs/AUTHENTIFICATION.md).
const dbPath = path.resolve(
  /* turbopackIgnore: true */ process.env.DATABASE_PATH || path.join(/* turbopackIgnore: true */ process.cwd(), "data", "wander.db"),
);

const globalForDb = globalThis as unknown as { wanderDb?: Database.Database };

function open() {
  // Pendant « next build » : base en mémoire, aucun fichier créé ni embarqué.
  if (process.env.NEXT_PHASE === "phase-production-build") return new Database(":memory:");
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

export const db = globalForDb.wanderDb ?? open();
if (process.env.NODE_ENV !== "production") globalForDb.wanderDb = db;
