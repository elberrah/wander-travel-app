"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { Alert, Divider, Field, PasswordField, SubmitButton } from "./fields";
import { GoogleButton } from "./google-button";

export function SignupForm({ callbackUrl, googleEnabled }: { callbackUrl: string; googleEnabled: boolean }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));
    if (password !== String(form.get("confirm"))) return setError("Les deux mots de passe ne correspondent pas.");
    if (password.length < 10) return setError("Le mot de passe doit contenir au moins 10 caractères.");

    setLoading(true);
    const email = String(form.get("email")).trim().toLowerCase();
    const name = `${String(form.get("firstName")).trim()} ${String(form.get("lastName")).trim()}`.trim();
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      company: String(form.get("company") || "").trim() || undefined,
      // Après clic sur le lien de confirmation : connexion automatique puis retour ici.
      callbackURL: `/connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`,
    });
    if (error) {
      setLoading(false);
      return setError(authErrorMessage(error));
    }
    window.location.assign(`/verifier-email?email=${encodeURIComponent(email)}&callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

  return (
    <>
      <Alert>{error}</Alert>
      <GoogleButton enabled={googleEnabled} callbackUrl={callbackUrl} onError={setError} />
      <Divider />
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
          <Field label="Prénom" id="firstName" autoComplete="given-name" required maxLength={60} />
          <Field label="Nom" id="lastName" autoComplete="family-name" required maxLength={60} />
        </div>
        <Field label="Email professionnel" id="email" type="email" autoComplete="email" required maxLength={254} />
        <Field label="Entreprise (facultatif)" id="company" autoComplete="organization" maxLength={120} />
        <PasswordField label="Mot de passe" id="password" autoComplete="new-password" required minLength={10} maxLength={128} hint="10 caractères minimum. Une phrase de passe est idéale." />
        <PasswordField label="Confirmer le mot de passe" id="confirm" autoComplete="new-password" required minLength={10} maxLength={128} />
        <SubmitButton loading={loading}>Créer mon compte</SubmitButton>
        <p className="mt-4 text-[11px] leading-relaxed text-white/35">
          Un email de confirmation vous sera envoyé. Vos données restent strictement confidentielles et ne sont utilisées que pour votre accès Wander.
        </p>
      </form>
    </>
  );
}
