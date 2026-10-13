// Crée / met à jour les tables d'authentification sur Postgres (Vercel + Neon),
// avant la mise en ligne. Lancé par « npm run build » quand DATABASE_URL existe.
// Le schéma doit rester aligné sur src/lib/auth.ts (champs et plugins) :
// au démarrage, Better Auth refuse de fonctionner si un écart subsiste.
import { betterAuth } from "better-auth";
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

const schemaOptions = {
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET || "migration-only",
  emailAndPassword: { enabled: true },
  user: { additionalFields: { company: { type: "string", required: false, input: true } } },
  rateLimit: { enabled: true, storage: "database" },
  plugins: [admin()],
};

// Compte de démonstration (tests DRH), défini par DEMO_EMAIL / DEMO_PASSWORD :
// rôle « user » imposé, email confirmé, mot de passe remis à la valeur de la
// variable à chaque déploiement. Jamais administrateur.
async function seedDemoAccount() {
  const email = (process.env.DEMO_EMAIL || "").trim().toLowerCase();
  const password = process.env.DEMO_PASSWORD || "";
  if (!email || !password) return;
  const admins = (process.env.ADMIN_EMAILS || "").toLowerCase().split(",").map((e) => e.trim());
  if (admins.includes(email)) throw new Error("[demo] DEMO_EMAIL ne peut pas figurer dans ADMIN_EMAILS.");
  if (password.length < 10) throw new Error("[demo] DEMO_PASSWORD : 10 caractères minimum.");

  const ctx = await betterAuth(schemaOptions).$context;
  const hash = await ctx.password.hash(password);
  let user = await ctx.internalAdapter.findUserByEmail(email).then((r) => r?.user);
  if (!user) {
    user = await ctx.internalAdapter.createUser({
      email,
      name: process.env.DEMO_NAME || "Démo DRH",
      emailVerified: true,
      role: "user",
      company: process.env.DEMO_COMPANY || "Démo Entreprise",
    });
    await ctx.internalAdapter.linkAccount({ userId: user.id, providerId: "credential", accountId: user.id, password: hash });
    console.log("[demo] Compte de démonstration créé.");
  } else {
    await ctx.internalAdapter.updateUser(user.id, { role: "user", emailVerified: true });
    const accounts = await ctx.internalAdapter.findAccounts(user.id);
    if (accounts.some((a) => a.providerId === "credential")) await ctx.internalAdapter.updatePassword(user.id, hash);
    else await ctx.internalAdapter.linkAccount({ userId: user.id, providerId: "credential", accountId: user.id, password: hash });
    console.log("[demo] Compte de démonstration mis à jour.");
  }
}

try {
  const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(schemaOptions);
  if (toBeCreated.length || toBeAdded.length) {
    await runMigrations();
    console.log(`[migrate] Base mise à jour : ${toBeCreated.map((t) => t.table).join(", ") || "colonnes ajoutées"}.`);
  } else {
    console.log("[migrate] Base déjà à jour.");
  }
  await seedDemoAccount();
} finally {
  await pool.end();
}
