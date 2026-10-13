// Après « next build » : copie public/ et .next/static/ dans le serveur autonome.
import fs from "node:fs";
const out = ".next/standalone";
if (!fs.existsSync(out)) process.exit(0);
fs.cpSync("public", `${out}/public`, { recursive: true });
fs.cpSync(".next/static", `${out}/.next/static`, { recursive: true });
fs.cpSync("scripts/promote-admin.mjs", `${out}/promote-admin.mjs`);
console.log("Serveur prêt : node .next/standalone/server.js");
