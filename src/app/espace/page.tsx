import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Gift, Globe, LogOut, ShieldCheck, Users } from "lucide-react";
import { requireUser, isAdmin } from "@/lib/session";
import { auth } from "@/lib/auth";
import { ChangePasswordForm } from "@/components/auth/change-password-form";

export const metadata: Metadata = { title: "Mon espace | Wander Travel & Event", robots: { index: false, follow: false } };

export default async function EspacePage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const session = await requireUser("/espace");
  const sp = await searchParams;
  const admin = isAdmin(session);
  const providers = (await (await auth.$context).internalAdapter.findAccounts(session.user.id)).map((a) => a.providerId);
  const hasPassword = providers.includes("credential");
  const firstName = session.user.name?.split(" ")[0] || "";

  const spaces = [
    { href: "/plateforme/index.html", icon: Gift, title: "Avantages Salariés", desc: "Hôtels, résidences, Omra, Istanbul, colonies : vos offres et demandes de réservation.", external: true },
    { href: "/", icon: Globe, title: "Univers Wander", desc: "Services MICE, corporate travel, VIP, destinations et réalisations." },
    ...(admin
      ? [
          { href: "/admin/utilisateurs", icon: Users, title: "Gestion des comptes", desc: "Utilisateurs, rôles, suspensions et sessions." },
          { href: "/plateforme/admin.html", icon: ShieldCheck, title: "Tableau de bord offres", desc: "Offres, prix, photos, demandes et salariés de la plateforme.", external: true },
        ]
      : []),
  ];

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-8 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(197,160,89,0.08),transparent_55%)] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl">
        <header className="mb-14 flex flex-wrap items-center justify-between gap-6">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-[0.2em] text-white leading-none">WANDER</span>
            <span className="text-primary text-[9px] font-bold tracking-[0.5em] uppercase mt-1.5 opacity-80">Travel &amp; Event</span>
          </Link>
          <Link href="/deconnexion" className="flex items-center gap-2 border border-white/10 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 hover:border-primary/50 hover:text-primary transition">
            <LogOut size={14} /> Se déconnecter
          </Link>
        </header>

        {sp.refus === "admin" && (
          <div role="alert" className="mb-8 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Cet espace est réservé aux administrateurs.
          </div>
        )}

        <span className="block text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Mon espace</span>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">Bonjour {firstName},</h1>
        <p className="text-white/50 font-light mb-14">
          Connecté en tant que <span className="text-white">{session.user.email}</span> ·{" "}
          <span className="text-primary">{admin ? "Administrateur" : "Utilisateur"}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {spaces.map((s) => {
            const inner = (
              <>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <s.icon size={20} />
                </div>
                <h2 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{s.title}</h2>
                <p className="text-white/40 text-sm font-light leading-relaxed mb-8">{s.desc}</p>
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
                  Accéder <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </>
            );
            const cls = "group block rounded-[2rem] border border-white/5 bg-white/[0.015] p-8 md:p-10 hover:border-primary/25 transition-all";
            // Pages de la plateforme : navigation classique (hors routeur Next).
            return s.external ? (
              <a key={s.href} href={s.href} className={cls}>{inner}</a>
            ) : (
              <Link key={s.href} href={s.href} className={cls}>{inner}</Link>
            );
          })}
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-t border-white/5 pt-14">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white mb-3">Mon compte</h2>
            <dl className="space-y-3 text-sm">
              <div className="flex gap-3"><dt className="w-36 text-white/40">Nom</dt><dd className="text-white">{session.user.name}</dd></div>
              <div className="flex gap-3"><dt className="w-36 text-white/40">Email</dt><dd className="text-white break-all">{session.user.email}</dd></div>
              {session.user.company && <div className="flex gap-3"><dt className="w-36 text-white/40">Entreprise</dt><dd className="text-white">{session.user.company}</dd></div>}
              <div className="flex gap-3">
                <dt className="w-36 text-white/40">Connexion</dt>
                <dd className="text-white">{[hasPassword && "Email et mot de passe", providers.includes("google") && "Google"].filter(Boolean).join(" · ")}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-white mb-6">Mot de passe</h2>
            {hasPassword ? (
              <ChangePasswordForm />
            ) : (
              <p className="text-sm text-white/50 leading-relaxed">
                Vous vous connectez avec Google. Pour ajouter un mot de passe, utilisez{" "}
                <Link href="/mot-de-passe-oublie" className="text-primary hover:text-white">« Mot de passe oublié »</Link> : un lien vous sera envoyé par email.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
