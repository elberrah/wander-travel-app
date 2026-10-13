"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { Alert, Divider, Field, PasswordField, SubmitButton } from "./fields";
import { GoogleButton } from "./google-button";

export function LoginForm({ callbackUrl, googleEnabled, initialError, notice }: { callbackUrl: string; googleEnabled: boolean; initialError?: string; notice?: string }) {
  const [error, setError] = useState(initialError || "");
  const [info, setInfo] = useState(notice || "");
  const [loading, setLoading] = useState(false);

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
    window.location.assign(callbackUrl);
  }

  return (
    <>
      <Alert>{error}</Alert>
      <Alert kind="info">{info}</Alert>

      <GoogleButton enabled={googleEnabled} callbackUrl={callbackUrl} onError={setError} />
      <Divider />

      <form onSubmit={onSubmit} noValidate={false}>
        <Field label="Email" id="email" type="email" autoComplete="email" required placeholder="prenom.nom@entreprise.ma" />
        <PasswordField label="Mot de passe" id="password" autoComplete="current-password" required />
        <div className="mb-6 flex items-center justify-between gap-4 text-[12px]">
          <label className="flex items-center gap-2 text-white/50 cursor-pointer">
            <input type="checkbox" name="remember" defaultChecked className="h-4 w-4 accent-[#c5a059]" /> Rester connecté
          </label>
          <Link href="/mot-de-passe-oublie" className="text-primary/80 hover:text-primary">
            Mot de passe oublié ?
          </Link>
        </div>
        <SubmitButton loading={loading}>Se connecter</SubmitButton>
      </form>
    </>
  );
}
