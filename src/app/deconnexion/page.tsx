import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignOut } from "@/components/auth/other-forms";

export const metadata: Metadata = { title: "Déconnexion | Wander Travel & Event", robots: { index: false, follow: false } };

export default function DeconnexionPage() {
  return (
    <AuthShell title="À bientôt">
      <SignOut />
    </AuthShell>
  );
}
