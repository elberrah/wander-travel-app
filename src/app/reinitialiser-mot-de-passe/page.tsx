import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { ResetPasswordForm } from "@/components/auth/other-forms";

export const metadata: Metadata = { title: "Nouveau mot de passe | Wander Travel & Event", robots: { index: false, follow: false } };

export default async function ReinitialiserPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  return (
    <AuthShell title="Nouveau mot de passe" subtitle="Choisissez un mot de passe que vous n'utilisez sur aucun autre site.">
      <ResetPasswordForm token={sp.error ? undefined : sp.token} tokenError={sp.error} />
    </AuthShell>
  );
}
