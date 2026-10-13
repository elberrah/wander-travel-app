import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serveur Node requis : l'authentification et la protection des pages
  // se font côté serveur (l'export statique ne peut rien protéger).
  output: "standalone",
  serverExternalPackages: ["better-sqlite3"],
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
