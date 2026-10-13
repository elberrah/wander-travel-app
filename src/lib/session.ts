import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

// Couche d'accès : chaque page, route ou action privée revérifie la session ici,
// côté serveur, indépendamment du proxy.
export const getSession = cache(async () => auth.api.getSession({ headers: await headers() }));

export async function requireUser(callbackUrl = "/espace") {
  const session = await getSession();
  if (!session) redirect(`/connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  return session;
}

export async function requireAdmin() {
  const session = await requireUser("/admin/utilisateurs");
  if (session.user.role !== "admin") redirect("/espace?refus=admin");
  return session;
}

export function isAdmin(session: { user: { role?: string | null } } | null) {
  return session?.user.role === "admin";
}
