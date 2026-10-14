import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { safeCallbackUrl } from "@/lib/safe-redirect";

// Verrou global : toute requête sans session valide est refusée.
// Pages -> redirection vers /connexion (avec retour à la page demandée).
// API   -> 401 JSON. Zones admin -> rôle "admin" exigé.

const AUTH_PAGES = ["/connexion", "/inscription", "/mot-de-passe-oublie", "/reinitialiser-mot-de-passe", "/verifier-email"];
// Ressources nécessaires à l'affichage de la page de connexion.
const PUBLIC_FILES = [
  "/wander-consent.js",
  "/images/gallery/casa-skyline.png",
  "/images/brand/wander-mark-gold.png",
  // Photo de la page de connexion (déposer le fichier pour l'activer).
  "/images/login/casablanca.jpg",
  "/favicon.ico",
  "/robots.txt",
  // Application installable et notifications (chargés sans cookie par le navigateur).
  "/manifest-plateforme.webmanifest",
  "/icons/wander-192.png",
  "/icons/wander-512.png",
  "/icons/wander-badge.png",
];
// Pages publiques, sans connexion (Google exige une politique de confidentialité accessible).
const PUBLIC_PAGES = ["/confidentialite", "/desabonnement"];
// Robot de notifications : protégé par son propre secret (CRON_SECRET).
const PUBLIC_API = ["/api/cron/notifications"];

const matches = (pathname: string, base: string) => pathname === base || pathname.startsWith(base + "/");

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (matches(pathname, "/api/auth") || PUBLIC_FILES.includes(pathname) || PUBLIC_PAGES.includes(pathname) || PUBLIC_API.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({ headers: request.headers }).catch(() => null);
  const isAuthPage = AUTH_PAGES.some((p) => matches(pathname, p));

  if (isAuthPage) {
    // Déjà connecté : inutile de revoir la connexion (sauf mot de passe : lien par email).
    const passwordPage = matches(pathname, "/reinitialiser-mot-de-passe") || matches(pathname, "/mot-de-passe-oublie");
    if (session && !passwordPage) {
      const next = safeCallbackUrl(request.nextUrl.searchParams.get("callbackUrl"));
      return NextResponse.redirect(new URL(next, request.url));
    }
    return NextResponse.next();
  }

  if (!session) {
    if (matches(pathname, "/api")) {
      return NextResponse.json({ error: "Authentification requise." }, { status: 401 });
    }
    const login = new URL("/connexion", request.url);
    if (pathname !== "/" || search) login.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(login);
  }

  const adminZone = matches(pathname, "/admin") || matches(pathname, "/api/admin") || pathname === "/plateforme/admin.html";
  if (adminZone && session.user.role !== "admin") {
    if (matches(pathname, "/api")) return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
    return NextResponse.redirect(new URL("/espace?refus=admin", request.url));
  }

  const res = NextResponse.next();
  // Contenu privé : jamais en cache partagé (CDN, proxy).
  // (Les photos importées gardent leur propre cache longue durée, défini par leur route.)
  if (!matches(pathname, "/plateforme") && !matches(pathname, "/api/plateforme/photo")) {
    res.headers.set("Cache-Control", /\.[a-z0-9]+$/i.test(pathname) ? "private, max-age=86400" : "private, no-store");
  }
  return res;
}

export const config = {
  // Tout, sauf les fichiers internes de Next (code JS/CSS compilé, sans données).
  matcher: ["/((?!_next/static|_next/image).*)"],
};
