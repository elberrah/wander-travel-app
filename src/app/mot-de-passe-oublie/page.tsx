import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/other-forms";

export const metadata: Metadata = { title: "Mot de passe oublié | Wander Travel & Event", robots: { index: false, follow: false } };

export default function MotDePasseOubliePage() {
  return (
    <AuthShell
      title="Mot de passe oublié"
      subtitle="Indiquez l'email de votre compte : nous vous envoyons un lien sécurisé pour choisir un nouveau mot de passe."
      footer={<Link href="/connexion" className="font-semibold text-primary hover:text-white">← Retour à la connexion</Link>}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
