"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { Alert, Checkbox, Divider, Field, PasswordField, SubmitButton } from "./fields";
import { GoogleButton } from "./google-button";

export function LoginForm({ callbackUrl, googleEnabled, initialError, notice }: { callbackUrl: string; googleEnabled: boolean; initialError?: string; notice?: string }) {
  const [error, setError] = useState(initialError || "");
  const [info, setInfo] = useState(notice || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const { error } = await authClient.signIn.email({
      email: String(form.get("email")).trim(),
      password: String(form.get("password")),
      rememberMe: form.get("remember") === "on",
      // Lien de confirmation renvoyé si l'email n'est pas encore vérifié.
      callbackURL: `/connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`,
    });
    if (error) {
      setLoading(false);
      if (error.code === "EMAIL_NOT_VERIFIED") setInfo(authErrorMessage(error));
      else setError(authErrorMessage(error));
      return;
    }
    // Rechargement complet : la session (cookie HttpOnly) est relue par le serveur.
    setLoading(false);
    setSuccess(true);
    window.location.assign(callbackUrl);
  }

  return (
    <>
      <Alert>{error}</Alert>
      <Alert kind="info">{info}</Alert>

      <GoogleButton enabled={googleEnabled} callbackUrl={callbackUrl} onError={setError} />
      <Divider label="ou avec votre email" />

      <form onSubmit={onSubmit} noValidate={false}>
        <Field label="Adresse email professionnelle" id="email" type="email" autoComplete="email" inputMode="email" required placeholder="prenom.nom@entreprise.ma" />
        <PasswordField
          label="Mot de passe"
          id="password"
          autoComplete="current-password"
          required
          aside={
            <Link href="/mot-de-passe-oublie" className="mb-2 text-[13px] font-medium text-[#D9BE85] underline-offset-4 transition-colors hover:text-[#F5F1E8] hover:underline">
              Mot de passe oublié ?
            </Link>
          }
        />
        <div className="mb-7 mt-1">
          <Checkbox name="remember" label="Rester connecté sur cet appareil" defaultChecked />
        </div>
        <SubmitButton loading={loading} success={success} loadingLabel="Connexion en cours…" successLabel="Connexion réussie">
          Se connecter
        </SubmitButton>
      </form>
    </>
  );
}
