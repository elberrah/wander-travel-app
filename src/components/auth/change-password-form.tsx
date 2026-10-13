"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { Alert, PasswordField, SubmitButton } from "./fields";

export function ChangePasswordForm() {
  const [msg, setMsg] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const newPassword = String(form.get("newPassword"));
    if (newPassword !== String(form.get("confirmNew"))) return setMsg({ kind: "error", text: "Les deux mots de passe ne correspondent pas." });
    setLoading(true);
    const { error } = await authClient.changePassword({
      currentPassword: String(form.get("currentPassword")),
      newPassword,
      revokeOtherSessions: true,
    });
    setLoading(false);
    if (error) return setMsg({ kind: "error", text: authErrorMessage(error) });
    formEl.reset();
    setMsg({ kind: "success", text: "Mot de passe modifié. Vos autres sessions ont été fermées." });
  }

  return (
    <form onSubmit={onSubmit}>
      {msg && <Alert kind={msg.kind}>{msg.text}</Alert>}
      <PasswordField label="Mot de passe actuel" id="currentPassword" autoComplete="current-password" required />
      <PasswordField label="Nouveau mot de passe" id="newPassword" autoComplete="new-password" required minLength={10} maxLength={128} />
      <PasswordField label="Confirmer" id="confirmNew" autoComplete="new-password" required minLength={10} maxLength={128} />
      <SubmitButton loading={loading}>Modifier</SubmitButton>
    </form>
  );
}
