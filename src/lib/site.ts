// Site vitrine officiel (projet Vercel distinct). La plateforme y renvoie
// au lieu d'afficher sa propre copie des pages du site.
export const MAIN_SITE_URL = (process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://www.wandertravel-event.com").replace(/\/$/, "");
