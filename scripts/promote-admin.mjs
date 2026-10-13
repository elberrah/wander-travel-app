// Donne (ou retire) le rôle administrateur à un compte existant.
//   node scripts/promote-admin.mjs email@domaine.com          -> admin
//   node scripts/promote-admin.mjs email@domaine.com --user   -> utilisateur
// Base : DATABASE_PATH, sinon ./data/wander.db
import Database from "better-sqlite3";
import path from "node:path";

const email = (process.argv[2] || "").trim().toLowerCase();
const role = process.argv.includes("--user") ? "user" : "admin";
if (!email) {
  console.error("Usage : node scripts/promote-admin.mjs email@domaine.com [--user]");
  process.exit(1);
}
const db = new Database(path.resolve(process.env.DATABASE_PATH || "data/wander.db"));
const r = db.prepare("UPDATE user SET role = ? WHERE lower(email) = ?").run(role, email);
if (!r.changes) {
  console.error(`Aucun compte pour ${email}. La personne doit d'abord créer son compte.`);
  process.exit(1);
}
console.log(`${email} -> ${role === "admin" ? "Administrateur" : "Utilisateur"}`);
