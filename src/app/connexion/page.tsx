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
      subtitle="Accédez à votre espace Wander : offres, avantages salariés et suivi de vos dossiers."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href={`/inscription?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-semibold text-primary hover:text-white">
            Créer un compte
          </Link>
        </>
      }
    >
      <LoginForm callbackUrl={callbackUrl} googleEnabled={isGoogleEnabled} initialError={sp.error ? authErrorMessage(sp.error) : undefined} notice={notice} />
    </AuthShell>
  );
}
