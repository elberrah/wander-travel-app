// Crée / met à jour les tables d'authentification sur Postgres (Vercel + Neon),
// avant la mise en ligne. Lancé par « npm run build » quand DATABASE_URL existe.
// Le schéma doit rester aligné sur src/lib/auth.ts (champs et plugins) :
// au démarrage, Better Auth refuse de fonctionner si un écart subsiste.
import { getMigrations } from "better-auth/db/migration";
import { admin } from "better-auth/plugins";
import pg from "pg";

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
if (!url) {
  console.log("[migrate] Pas de DATABASE_URL : étape ignorée (SQLite migré au démarrage).");
  process.exit(0);
}

const local = /sslmode=disable|localhost|127\.0\.0\.1/.test(url);
const pool = new pg.Pool({
  connectionString: url.replace(/([?&])sslmode=[^&]*&?/, "$1").replace(/[?&]$/, ""),
  ssl: local ? undefined : { rejectUnauthorized: process.env.DATABASE_SSL !== "no-verify" },
  max: 1,
});

try {
  const { toBeCreated, toBeAdded, runMigrations } = await getMigrations({
    database: pool,
    secret: process.env.BETTER_AUTH_SECRET || "migration-only",
    emailAndPassword: { enabled: true },
    user: { additionalFields: { company: { type: "string", required: false, input: true } } },
    rateLimit: { enabled: true, storage: "database" },
    plugins: [admin()],
  });
  if (toBeCreated.length || toBeAdded.length) {
    await runMigrations();
    console.log(`[migrate] Base mise à jour : ${toBeCreated.map((t) => t.table).join(", ") || "colonnes ajoutées"}.`);
  } else {
    console.log("[migrate] Base déjà à jour.");
  }
} finally {
  await pool.end();
}
