"use client";

import { useActionState, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { banAction, createUserAction, removeUserAction, revokeSessionsAction, setRoleAction, type ActionResult } from "./actions";

type U = {
  id: string; name: string; email: string; company: string; role: "admin" | "user";
  banned: boolean; emailVerified: boolean; createdAt: string; providers: string[];
};

const btn = "px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] border border-white/10 text-white/60 hover:border-primary/50 hover:text-primary disabled:opacity-40 transition";

export function UserRow({ user, self }: { user: U; self: boolean }) {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<ActionResult | null>(null);
  const run = (fn: () => Promise<ActionResult>, confirmText?: string) => {
    if (confirmText && !window.confirm(confirmText)) return;
    start(async () => setMsg(await fn()));
  };

  return (
    <tr className="border-t border-white/5 align-top">
      <td className="px-4 py-4">
        <div className="font-semibold text-white">{user.name} {self && <span className="text-primary text-[10px] uppercase tracking-widest">(vous)</span>}</div>
        <div className="text-white/50 break-all">{user.email}</div>
        {user.company && <div className="text-white/35 text-xs">{user.company}</div>}
        <div className="text-white/25 text-[11px] mt-1">Créé le {user.createdAt}</div>
        {msg && <div className={`mt-2 text-xs ${msg.ok ? "text-emerald-300" : "text-red-300"}`}>{msg.message}</div>}
      </td>
      <td className="px-4 py-4 text-white/60 text-xs">
        {user.providers.map((p) => (p === "credential" ? "Mot de passe" : p === "google" ? "Google" : p)).join(" · ") || "—"}
      </td>
      <td className="px-4 py-4 text-xs">
        {user.banned ? <span className="text-red-300">Suspendu</span> : user.emailVerified ? <span className="text-emerald-300">Actif</span> : <span className="text-amber-300">Email non confirmé</span>}
      </td>
      <td className="px-4 py-4">
        <select
          aria-label={`Rôle de ${user.email}`}
          disabled={self || pending}
          value={user.role}
          onChange={(e) => {
            const role = e.target.value as "admin" | "user";
            run(() => setRoleAction(user.id, role), role === "admin" ? `Donner les droits Administrateur à ${user.email} ?` : undefined);
          }}
          className="rounded-lg border border-white/10 bg-[#0a0a0a] px-2 py-1.5 text-xs text-white disabled:opacity-50"
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
        </select>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-wrap justify-end gap-2">
          {pending && <Loader2 size={14} className="animate-spin text-primary self-center" />}
          {!self && (
            <button className={btn} disabled={pending} onClick={() => run(() => banAction(user.id, !user.banned), user.banned ? undefined : `Suspendre ${user.email} ?`)}>
              {user.banned ? "Réactiver" : "Suspendre"}
            </button>
          )}
          <button className={btn} disabled={pending} onClick={() => run(() => revokeSessionsAction(user.id), `Fermer toutes les sessions de ${user.email} ?`)}>
            Déconnecter
          </button>
          {!self && (
            <button className={`${btn} hover:!border-red-400/60 hover:!text-red-300`} disabled={pending} onClick={() => run(() => removeUserAction(user.id), `Supprimer définitivement le compte ${user.email} ?`)}>
              Supprimer
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

export function CreateUserForm() {
  const [state, action, pending] = useActionState(createUserAction, null);
  const input = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-primary/60 mb-4";
  return (
    <form action={action} className="rounded-2xl border border-white/5 bg-white/[0.015] p-6">
      <h2 className="font-serif text-xl font-bold text-white mb-2">Créer un compte</h2>
      <p className="text-xs text-white/40 mb-6 leading-relaxed">La personne reçoit un email pour choisir son mot de passe.</p>
      {state && <p className={`mb-4 text-xs ${state.ok ? "text-emerald-300" : "text-red-300"}`}>{state.message}</p>}
      <input name="name" required placeholder="Prénom Nom" className={input} maxLength={120} />
      <input name="email" type="email" required placeholder="email@entreprise.ma" className={input} maxLength={254} />
      <select name="role" defaultValue="user" className={`${input} bg-[#0a0a0a]`}>
        <option value="user">Utilisateur</option>
        <option value="admin">Administrateur</option>
      </select>
      <button disabled={pending} className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-black hover:bg-white disabled:opacity-60">
        {pending && <Loader2 size={14} className="animate-spin" />} Créer le compte
      </button>
    </form>
  );
}
