import { headers } from "next/headers";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { auth } from "@/lib/auth";

// Plateforme Avantages Salariés (dossier /platform, hors du dossier public) :
// chaque fichier n'est servi qu'après vérification de la session côté serveur.
// Les prix (data.js), photos et le tableau de bord ne sont donc plus lisibles
// sans compte.

export const dynamic = "force-dynamic";

const ROOT = path.join(process.cwd(), "platform");

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

// Jamais servis : script Google, documentation, outils.
const BLOCKED_DIRS = ["backend", "scripts"];
const ADMIN_FILES = ["admin.html"];

const jsonForScript = (v: unknown) => JSON.stringify(v).replace(/</g, "\\u003c");

export async function GET(_req: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const { path: segments = [] } = await ctx.params;
  const rel = segments.join("/");

  if (!session) {
    const target = "/plateforme/" + (rel || "index.html");
    return NextResponse.redirect(new URL(`/connexion?callbackUrl=${encodeURIComponent(target)}`, _req.url));
  }

  // /plateforme -> /plateforme/index.html (les liens relatifs du site en dépendent).
  if (!rel) return NextResponse.redirect(new URL("/plateforme/index.html", _req.url));

  // Ancienne page de connexion de la plateforme : remplacée par la vraie déconnexion / connexion.
  if (rel === "login.html") return NextResponse.redirect(new URL("/deconnexion", _req.url));

  if (ADMIN_FILES.includes(rel) && session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/espace?refus=admin", _req.url));
  }

  const file = path.resolve(ROOT, rel);
  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext];
  if (
    !file.startsWith(ROOT + path.sep) ||
    !type ||
    segments.some((s) => s.startsWith(".")) ||
    BLOCKED_DIRS.includes(segments[0])
  ) {
    return new NextResponse("Introuvable", { status: 404 });
  }

  let body: Buffer;
  try {
    body = await fs.readFile(file);
  } catch {
    return new NextResponse("Introuvable", { status: 404 });
  }

  const resHeaders: Record<string, string> = {
    "Content-Type": type,
    "X-Content-Type-Options": "nosniff",
    "X-Robots-Tag": "noindex, nofollow",
    "Cache-Control": ext === ".html" || ext === ".js" ? "private, no-store" : "private, max-age=86400",
  };

  if (ext !== ".html") return new NextResponse(new Uint8Array(body), { headers: resHeaders });

  // Le compte connecté alimente la session attendue par sync.js : formulaires
  // pré-remplis, bouton « Se déconnecter » existant, identifiant des demandes.
  const [fn, ...rest] = (session.user.name || "").trim().split(/\s+/);
  const platformSession = {
    ok: true,
    id: session.user.id,
    fn: fn || "",
    ln: rest.join(" "),
    em: session.user.email,
    co: (session.user as { company?: string | null }).company || "",
    exp: new Date(session.session.expiresAt).getTime(),
  };
  // Espace salarié / panier (shop.js) : ouvert directement avec le compte connecté,
  // sans l'ancien « code entreprise ».
  const member = {
    code: "COMPTE",
    company: platformSession.co || "Wander",
    email: session.user.email,
    name: session.user.name || session.user.email,
    verified: Boolean(session.user.emailVerified),
  };
  const inject =
    `<script>try{localStorage.setItem('wander_session',${jsonForScript(JSON.stringify(platformSession))});` +
    `localStorage.setItem('wander_member',${jsonForScript(JSON.stringify(member))})}catch(e){}</script>`;
  const html = body.toString("utf8").replace(/<head([^>]*)>/i, (m) => m + inject);
  return new NextResponse(html, { headers: resHeaders });
}
