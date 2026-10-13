import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { checkUnsubscribe } from "@/lib/notify";
import { setPrefs } from "@/lib/platform-store";

// Lien « se désabonner » des emails : fonctionne sans connexion (lien signé).
export const metadata: Metadata = { title: "Notifications | Wander Travel & Event", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

async function unsubscribe(formData: FormData) {
  "use server";
  const u = String(formData.get("u") || "");
  const t = String(formData.get("t") || "");
  if (!checkUnsubscribe(u, t)) return;
  await setPrefs(u, { cart: false, promos: false, news: false, asked: true });
  redirect(`/desabonnement?u=${encodeURIComponent(u)}&t=${encodeURIComponent(t)}&ok=1`);
}

export default async function Desabonnement({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { u = "", t = "", ok } = await searchParams;
  const valid = checkUnsubscribe(u, t);
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="mb-10">
          <span className="block font-serif text-2xl font-bold tracking-[0.2em] text-white">WANDER</span>
          <span className="block text-primary text-[9px] font-bold tracking-[0.5em] uppercase mt-1.5 opacity-80">Travel &amp; Event</span>
        </div>
        {!valid ? (
          <p className="text-white/60">Ce lien n&apos;est pas valide. Gérez vos notifications depuis votre espace.</p>
        ) : ok ? (
          <>
            <h1 className="font-serif text-3xl text-white mb-4">C&apos;est noté</h1>
            <p className="text-white/60 mb-8">Vous ne recevrez plus d&apos;emails ni de notifications Wander. Vous pouvez les réactiver à tout moment depuis votre espace.</p>
          </>
        ) : (
          <>
            <h1 className="font-serif text-3xl text-white mb-4">Se désabonner</h1>
            <p className="text-white/60 mb-8">Ne plus recevoir les rappels de panier, le Jeudi Promo et les nouveautés Wander ?</p>
            <form action={unsubscribe}>
              <input type="hidden" name="u" value={u} />
              <input type="hidden" name="t" value={t} />
              <button type="submit" className="w-full bg-primary px-6 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-black hover:bg-white transition">
                Confirmer le désabonnement
              </button>
            </form>
          </>
        )}
        <Link href="/espace" className="mt-8 inline-block text-sm text-primary hover:text-white">Gérer mes préférences dans mon espace</Link>
      </div>
    </main>
  );
}
