import "server-only";
import { getMigrations } from "better-auth/db/migration";
import { authOptions } from "./auth";

export async function runAuthMigrations() {
  if (!process.env.BETTER_AUTH_SECRET) {
    const msg = "[auth] BETTER_AUTH_SECRET manquant : générez-le avec « openssl rand -base64 32 ».";
    if (process.env.NODE_ENV === "production") throw new Error(msg);
    console.warn(msg);
  }
  const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(authOptions);
  if (toBeCreated.length || toBeAdded.length) {
    await runMigrations();
    console.info(`[auth] Base mise à jour (${toBeCreated.map((t) => t.table).join(", ") || "colonnes"}).`);
  }
}
