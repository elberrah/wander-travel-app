import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  // Plateforme privée : aucune page à indexer.
  { key: "X-Robots-Tag", value: "noindex, nofollow" },
  ...(isProd ? [{ key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" }] : []),
];

const nextConfig: NextConfig = {
  // Serveur Node requis : l'authentification et la protection des pages
  // se font côté serveur (l'export statique ne peut rien protéger).
  output: "standalone",
  poweredByHeader: false,
  serverExternalPackages: ["better-sqlite3", "pg"],
  // Fichiers de la plateforme Avantages Salariés (servis après connexion).
  outputFileTracingIncludes: {
    "/plateforme/[[...path]]": ["./platform/**/*"],
  },
  // Jamais dans le paquet livré : base locale, secrets, sources, scripts.
  outputFileTracingExcludes: {
    "**": ["./data/**", "./.env*", "./src/**", "./scripts/**", "./docs/**", "./deploy/**", "./*.ps1", "./*.sh", "./*.md", "./platform/backend/**", "./platform/scripts/**"],
  },
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
