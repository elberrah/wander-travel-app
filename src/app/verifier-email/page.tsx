import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { VerifyEmailPanel } from "@/components/auth/other-forms";
import { safeCallbackUrl } from "@/lib/safe-redirect";

export const metadata: Metadata = { title: "Confirmez votre email | Wander Travel & Event", robots: { index: false, follow: false } };

export default async function VerifierEmailPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return (
    <AuthShell
      title="Vérifiez votre boîte mail"
      subtitle="Dernière étape avant d'accéder à la plateforme."
      footer={<Link href="/connexion" className="font-semibold text-primary hover:text-white">← Retour à la connexion</Link>}
    >
      <VerifyEmailPanel email={sp.email} callbackUrl={safeCallbackUrl(sp.callbackUrl)} />
    </AuthShell>
  );
}
