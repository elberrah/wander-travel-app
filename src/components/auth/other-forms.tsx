"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, MailCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import { Alert, Field, PasswordField, SubmitButton } from "./fields";

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email = String(new FormData(e.currentTarget).get("email")).trim();
    const { error } = await authClient.requestPasswordReset({ email, redirectTo: "/reinitialiser-mot-de-passe" });
    setLoading(false);
    // Réponse identique que le compte existe ou non (pas de divulgation des emails inscrits).
    if (error && error.status === 429) return setError(authErrorMessage(error));
    setSent(true);
  }

  if (sent)
    return (
      <Alert kind="success">
        Si un compte existe pour cette adresse, un lien de réinitialisation vient d&apos;être envoyé. Il est valable 1 heure. Pensez à vérifier vos courriers indésirables.
      </Alert>
    );

  return (
    <form onSubmit={onSubmit}>
      <Alert>{error}</Alert>
      <Field label="Email" id="email" type="email" autoComplete="email" required />
      <SubmitButton loading={loading}>Recevoir le lien</SubmitButton>
    </form>
  );
}

export function ResetPasswordForm({ token, tokenError }: { token?: string; tokenError?: string }) {
  const [error, setError] = useState(tokenError ? authErrorMessage(tokenError) : "");
  const [loading, setLoading] = useState(false);

  if (!token)
    return (
      <>
        <Alert>{error || "Lien de réinitialisation invalide ou expiré."}</Alert>
        <Link href="/mot-de-passe-oublie" className="font-semibold text-[#D9BE85] underline-offset-4 hover:text-[#F5F1E8] hover:underline">
          Faire une nouvelle demande
        </Link>
      </>
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const newPassword = String(form.get("password"));
    if (newPassword !== String(form.get("confirm"))) return setError("Les deux mots de passe ne correspondent pas.");
    if (newPassword.length < 10) return setError("Le mot de passe doit contenir au moins 10 caractères.");
    setLoading(true);
    const { error } = await authClient.resetPassword({ newPassword, token });
    if (error) {
      setLoading(false);
      return setError(authErrorMessage(error));
    }
    window.location.assign("/connexion?reinitialise=1");
  }

  return (
    <form onSubmit={onSubmit}>
      <Alert>{error}</Alert>
      <PasswordField label="Nouveau mot de passe" id="password" autoComplete="new-password" required minLength={10} maxLength={128} hint="10 caractères minimum." />
      <PasswordField label="Confirmer" id="confirm" autoComplete="new-password" required minLength={10} maxLength={128} />
      <SubmitButton loading={loading}>Enregistrer le mot de passe</SubmitButton>
      <p className="mt-4 text-[11px] text-[#F5F1E8]/55">Par sécurité, toutes vos sessions ouvertes seront fermées.</p>
    </form>
  );
}

export function VerifyEmailPanel({ email, callbackUrl }: { email?: string; callbackUrl: string }) {
  const [msg, setMsg] = useState<{ kind: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function resend() {
    if (!email) return;
    setLoading(true);
    const { error } = await authClient.sendVerificationEmail({ email, callbackURL: `/connexion?callbackUrl=${encodeURIComponent(callbackUrl)}` });
    setLoading(false);
    setMsg(error ? { kind: "error", text: authErrorMessage(error) } : { kind: "success", text: "Nouveau lien envoyé." });
  }

  return (
    <div>
      <div className="mb-8 flex items-start gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <MailCheck className="mt-0.5 shrink-0 text-primary" size={22} />
        <p className="text-sm leading-relaxed text-white/70">
          Un lien de confirmation a été envoyé{email ? <> à <strong className="text-white">{email}</strong></> : null}. Cliquez dessus pour activer votre compte : vous serez connecté automatiquement. Le lien est valable 24 heures.
        </p>
      </div>
      {msg && <Alert kind={msg.kind}>{msg.text}</Alert>}
      {email && (
        <button type="button" onClick={resend} disabled={loading} className="flex items-center gap-2 text-sm font-semibold text-[#D9BE85] underline-offset-4 hover:text-[#F5F1E8] hover:underline disabled:opacity-50">
          {loading && <Loader2 size={14} className="animate-spin" />} Renvoyer le lien
        </button>
      )}
    </div>
  );
}

export function SignOut() {
  useEffect(() => {
    authClient.signOut().finally(() => {
      try {
        localStorage.removeItem("wander_session");
      } catch {}
      window.location.replace("/connexion?deconnecte=1");
    });
  }, []);
  return (
    <p className="flex items-center gap-3 text-white/60">
      <Loader2 size={16} className="animate-spin text-primary" /> Déconnexion en cours…
    </p>
  );
}
