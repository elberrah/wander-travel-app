import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/session";
import { CreateUserForm, UserRow } from "./ui";

export const metadata: Metadata = { title: "Gestion des comptes | Wander Travel & Event", robots: { index: false, follow: false } };

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const session = await requireAdmin();
  const q = ((await searchParams).q || "").trim().slice(0, 120);

  const { users, total } = await auth.api.listUsers({
    headers: await headers(),
    query: { limit: 200, sortBy: "createdAt", sortDirection: "desc", ...(q ? { searchValue: q, searchField: "email", searchOperator: "contains" } : {}) },
  });

  const providers = new Map<string, string[]>();
  for (const a of db.prepare("SELECT userId, providerId FROM account").all() as { userId: string; providerId: string }[]) {
    providers.set(a.userId, [...(providers.get(a.userId) || []), a.providerId]);
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-8 md:py-16">
      <div className="mx-auto max-w-7xl">
        <Link href="/espace" className="mb-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-primary">
          <ArrowLeft size={12} /> Mon espace
        </Link>
        <span className="block text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-4">Administration</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Gestion des comptes</h1>
        <p className="text-white/50 font-light mb-12">{total} compte{total > 1 ? "s" : ""} · rôles, suspensions et sessions.</p>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-10">
          <section>
            <form className="mb-6 flex gap-3" action="/admin/utilisateurs">
              <input name="q" defaultValue={q} placeholder="Rechercher par email…" className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-primary/60" />
              <button className="border border-white/10 px-5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 hover:border-primary/50 hover:text-primary">Filtrer</button>
            </form>
            <div className="overflow-x-auto rounded-2xl border border-white/5">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-white/40">
                  <tr>
                    <th className="px-4 py-3 font-bold">Utilisateur</th>
                    <th className="px-4 py-3 font-bold">Connexion</th>
                    <th className="px-4 py-3 font-bold">Statut</th>
                    <th className="px-4 py-3 font-bold">Rôle</th>
                    <th className="px-4 py-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <UserRow
                      key={u.id}
                      self={u.id === session.user.id}
                      user={{
                        id: u.id,
                        name: u.name,
                        email: u.email,
                        company: (u as { company?: string | null }).company || "",
                        role: u.role === "admin" ? "admin" : "user",
                        banned: Boolean(u.banned),
                        emailVerified: Boolean(u.emailVerified),
                        createdAt: new Date(u.createdAt).toLocaleDateString("fr-FR"),
                        providers: providers.get(u.id) || [],
                      }}
                    />
                  ))}
                  {!users.length && (
                    <tr><td colSpan={5} className="px-4 py-10 text-center text-white/40">Aucun compte trouvé.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
          <aside>
            <CreateUserForm />
          </aside>
        </div>
      </div>
    </main>
  );
}
