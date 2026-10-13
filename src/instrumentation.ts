// Au démarrage du serveur : création / mise à jour des tables d'authentification.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { runAuthMigrations } = await import("./lib/migrate");
  await runAuthMigrations();
}
