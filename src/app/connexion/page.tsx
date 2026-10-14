import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { isGoogleEnabled } from "@/lib/auth-config";
import { authErrorMessage } from "@/lib/auth-errors";
import { safeCallbackUrl } from "@/lib/safe-redirect";

export const metadata: Metadata = { title: "Connexion | Wander Travel & Event", robots: { index: false, follow: false } };

export default async function ConnexionPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const callbackUrl = safeCallbackUrl(sp.callbackUrl);
  const notice = sp.reinitialise ? "Mot de passe modifié. Connectez-vous avec votre nouveau mot de passe." : sp.deconnecte ? "Vous êtes déconnecté." : undefined;

  return (
    <AuthShell
      title="Connexion"
      subtitle="Accédez à votre espace Wander : offres négociées, avantages salariés et suivi de vos demandes."
      footer={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span>Nouveau collaborateur ?</span>
          <Link
            href={`/inscription?callbackUrl=${encodeURIComponent(callbackUrl)}`}
            className="inline-flex h-11 items-center justify-center rounded-[10px] border border-[#C7A35C]/45 px-5 text-[13px] font-semibold tracking-[0.04em] text-[#D9BE85] transition-colors hover:border-[#C7A35C] hover:bg-[#C7A35C]/10 hover:text-[#F5F1E8]"
          >
            Créer un compte
          </Link>
        </div>
      }
    >
      <LoginForm callbackUrl={callbackUrl} googleEnabled={isGoogleEnabled} initialError={sp.error ? authErrorMessage(sp.error) : undefined} notice={notice} />
    </AuthShell>
  );
}
