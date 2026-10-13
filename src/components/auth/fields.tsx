"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function Field({ label, id, ...props }: { label: string; id: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-2">
        {label}
      </label>
      <input
        id={id}
        name={id}
        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[15px] text-white placeholder:text-white/25 outline-none transition focus:border-primary/70 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/20"
        {...props}
      />
    </div>
  );
}

export function PasswordField({ label, id, hint, ...props }: { label: string; id: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 pr-12 text-[15px] text-white placeholder:text-white/25 outline-none transition focus:border-primary/70 focus:bg-white/[0.05] focus:ring-2 focus:ring-primary/20"
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/40 hover:text-primary transition-colors"
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {hint && <p className="mt-2 text-[11px] text-white/35">{hint}</p>}
    </div>
  );
}

export function SubmitButton({ loading, children }: { loading?: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="mt-2 flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-black transition-all hover:bg-white disabled:cursor-wait disabled:opacity-60 shadow-[0_20px_60px_rgba(197,160,89,0.15)]"
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}

export function Alert({ kind = "error", children }: { kind?: "error" | "success" | "info"; children: ReactNode }) {
  if (!children) return null;
  const styles = {
    error: "border-red-400/30 bg-red-500/10 text-red-200",
    success: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
    info: "border-primary/30 bg-primary/10 text-primary",
  }[kind];
  return (
    <div role={kind === "error" ? "alert" : "status"} className={`mb-6 rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`}>
      {children}
    </div>
  );
}

export function Divider() {
  return (
    <div className="my-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-white/30">
      <span className="h-px flex-1 bg-white/10" /> ou <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}
