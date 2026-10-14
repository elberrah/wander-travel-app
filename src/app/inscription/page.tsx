import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";
import { isGoogleEnabled } from "@/lib/auth-config";
import { safeCallbackUrl } from "@/lib/safe-redirect";

export const metadata: Metadata = { title: "Créer un compte | Wander Travel & Event", robots: { index: false, follow: false } };

export default async function InscriptionPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const callbackUrl = safeCallbackUrl((await searchParams).callbackUrl);
  return (
    <AuthShell
      title="Créer un compte"
      subtitle="Rejoignez l'espace Wander en quelques secondes."
      footer={
        <>
          Déjà inscrit ?{" "}
          <Link href={`/connexion?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-semibold text-[#D9BE85] underline-offset-4 hover:text-[#F5F1E8] hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <SignupForm callbackUrl={callbackUrl} googleEnabled={isGoogleEnabled} />
    </AuthShell>
  );
}
