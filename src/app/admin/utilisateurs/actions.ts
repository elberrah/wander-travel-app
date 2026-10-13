"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/session";

// Chaque action revérifie le rôle admin côté serveur, puis passe par les
// endpoints du plugin admin (qui contrôlent à nouveau les permissions).

export type ActionResult = { ok: boolean; message: string };

const done = (message: string): ActionResult => {
  revalidatePath("/admin/utilisateurs");
  return { ok: true, message };
};
const fail = (e: unknown): ActionResult => ({
  ok: false,
  message: (e as { body?: { message?: string } })?.body?.message || "Action impossible.",
});

async function guard(userId: string) {
  const session = await requireAdmin();
  if (!userId || typeof userId !== "string") throw new Error("Utilisateur manquant.");
  return { session, h: await headers(), self: session.user.id === userId };
}

export async function setRoleAction(userId: string, role: "admin" | "user"): Promise<ActionResult> {
  try {
    const { h, self } = await guard(userId);
    if (self) return { ok: false, message: "Vous ne pouvez pas modifier votre propre rôle." };
    if (role !== "admin" && role !== "user") return { ok: false, message: "Rôle inconnu." };
    await auth.api.setRole({ body: { userId, role }, headers: h });
    return done(role === "admin" ? "Rôle Administrateur attribué." : "Rôle Utilisateur attribué.");
  } catch (e) {
    return fail(e);
  }
}

export async function banAction(userId: string, banned: boolean): Promise<ActionResult> {
  try {
    const { h, self } = await guard(userId);
    if (self) return { ok: false, message: "Vous ne pouvez pas suspendre votre propre compte." };
    if (banned) await auth.api.banUser({ body: { userId, banReason: "Suspendu par un administrateur" }, headers: h });
    else await auth.api.unbanUser({ body: { userId }, headers: h });
    return done(banned ? "Compte suspendu et sessions fermées." : "Compte réactivé.");
  } catch (e) {
    return fail(e);
  }
}

export async function revokeSessionsAction(userId: string): Promise<ActionResult> {
  try {
    const { h } = await guard(userId);
    await auth.api.revokeUserSessions({ body: { userId }, headers: h });
    return done("Toutes les sessions de ce compte ont été fermées.");
  } catch (e) {
    return fail(e);
  }
}

export async function removeUserAction(userId: string): Promise<ActionResult> {
  try {
    const { h, self } = await guard(userId);
    if (self) return { ok: false, message: "Vous ne pouvez pas supprimer votre propre compte." };
    await auth.api.removeUser({ body: { userId }, headers: h });
    return done("Compte supprimé.");
  } catch (e) {
    return fail(e);
  }
}

export async function createUserAction(_: ActionResult | null, form: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const h = await headers();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const name = String(form.get("name") || "").trim();
    const role = form.get("role") === "admin" ? "admin" : "user";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name) return { ok: false, message: "Nom et email valides requis." };
    // Mot de passe aléatoire jamais communiqué : l'utilisateur choisit le sien via le lien reçu par email.
    await auth.api.createUser({ body: { email, name, role, password: randomBytes(24).toString("base64url") }, headers: h });
    await auth.api.requestPasswordReset({ body: { email, redirectTo: "/reinitialiser-mot-de-passe" }, headers: h });
    return done(`Compte créé. ${email} reçoit un lien pour définir son mot de passe.`);
  } catch (e) {
    return fail(e);
  }
}
