"use client";

import { useId, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { AlertCircle, Check, CheckCircle2, Eye, EyeOff, Info, Loader2 } from "lucide-react";

// Champs des pages d'authentification — Obsidian / Graphite / Champagne / Ivory.
// La validation native du navigateur reste active : on remplace seulement la
// bulle par un message en français, lié au champ (aria-describedby) et lu par
// les lecteurs d'écran.

const inputCls =
  "peer w-full h-[52px] rounded-[10px] border border-[#2B2E31] bg-[#131416] px-4 text-[15px] text-[#F5F1E8] placeholder:text-[#F5F1E8]/40 outline-none transition-[border-color,box-shadow,background-color] duration-200 hover:border-[#3A3E42] focus:border-[#C7A35C] focus:bg-[#16181A] focus:shadow-[0_0_0_4px_rgba(199,163,92,0.16)] aria-[invalid=true]:border-[#E07A7A] aria-[invalid=true]:focus:shadow-[0_0_0_4px_rgba(224,122,122,0.16)]";

const labelCls = "mb-2 block text-[12px] font-medium tracking-[0.04em] text-[#F5F1E8]/80";

function messageFor(el: HTMLInputElement) {
  const v = el.validity;
  if (v.valueMissing) return el.type === "password" ? "Saisissez votre mot de passe." : "Ce champ est obligatoire.";
  if (v.typeMismatch && el.type === "email") return "Saisissez une adresse email valide, par exemple prenom.nom@entreprise.ma.";
  if (v.tooShort) return `${el.minLength} caractères minimum (actuellement ${el.value.length}).`;
  if (v.tooLong) return `${el.maxLength} caractères maximum.`;
  return el.validationMessage;
}

function useFieldError() {
  const [error, setError] = useState("");
  return {
    error,
    onInvalid: (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault(); // bulle native remplacée par le message ci-dessous (la saisie reste bloquée)
      setError(messageFor(e.currentTarget));
    },
    onInput: (e: FormEvent<HTMLInputElement>) => {
      if (error && e.currentTarget.validity.valid) setError("");
    },
  };
}

function FieldError({ id, children }: { id: string; children: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2 flex items-start gap-1.5 text-[13px] leading-snug text-[#F0A3A3]">
      <AlertCircle size={14} className="mt-[2px] shrink-0" aria-hidden />
      {children}
    </p>
  );
}

export function Field({ label, id, hint, ...props }: { label: string; id: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const { error, onInvalid, onInput } = useFieldError();
  const errId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className="mb-5">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={inputCls}
        aria-invalid={error ? true : undefined}
        aria-describedby={[error && errId, hint && hintId].filter(Boolean).join(" ") || undefined}
        onInvalid={onInvalid}
        onInput={onInput}
        {...props}
      />
      <FieldError id={errId}>{error}</FieldError>
      {hint && !error && (
        <p id={hintId} className="mt-2 text-[12px] text-[#F5F1E8]/55">
          {hint}
        </p>
      )}
    </div>
  );
}

export function PasswordField({ label, id, hint, aside, ...props }: { label: string; id: string; hint?: string; aside?: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  const [visible, setVisible] = useState(false);
  const { error, onInvalid, onInput } = useFieldError();
  const errId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div className="mb-5">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className={labelCls}>
          {label}
        </label>
        {aside}
      </div>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          className={`${inputCls} pr-12`}
          aria-invalid={error ? true : undefined}
          aria-describedby={[error && errId, hint && hintId].filter(Boolean).join(" ") || undefined}
          onInvalid={onInvalid}
          onInput={onInput}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-2 text-[#F5F1E8]/55 transition-colors hover:text-[#C7A35C]"
          aria-label={visible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          aria-pressed={visible}
        >
          {visible ? <EyeOff size={17} aria-hidden /> : <Eye size={17} aria-hidden />}
        </button>
      </div>
      <FieldError id={errId}>{error}</FieldError>
      {hint && !error && (
        <p id={hintId} className="mt-2 text-[12px] text-[#F5F1E8]/55">
          {hint}
        </p>
      )}
    </div>
  );
}

export function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  const id = useId();
  return (
    <label htmlFor={id} className="group inline-flex cursor-pointer select-none items-center gap-2.5 text-[13px] text-[#F5F1E8]/75">
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <input
          id={id}
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-[5px] border border-[#3A3E42] bg-[#131416] transition checked:border-[#C7A35C] checked:bg-[#C7A35C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C7A35C]"
        />
        <Check size={12} strokeWidth={3} className="pointer-events-none relative text-[#0B0C0D] opacity-0 peer-checked:opacity-100" aria-hidden />
      </span>
      {label}
    </label>
  );
}

type ButtonState = { loading?: boolean; success?: boolean; disabled?: boolean };

export function SubmitButton({ loading, success, disabled, children, loadingLabel, successLabel }: ButtonState & { children: ReactNode; loadingLabel?: string; successLabel?: string }) {
  const busy = loading || success;
  return (
    <button
      type="submit"
      disabled={disabled || busy}
      aria-busy={loading || undefined}
      data-state={success ? "success" : loading ? "loading" : "idle"}
      className="group relative mt-2 flex h-[52px] w-full items-center justify-center gap-2.5 overflow-hidden rounded-[10px] bg-[#C7A35C] px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-[#0B0C0D] shadow-[0_10px_30px_-12px_rgba(199,163,92,0.55)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-[#D4B475] hover:shadow-[0_14px_34px_-12px_rgba(199,163,92,0.7)] active:translate-y-px disabled:cursor-not-allowed disabled:bg-[#C7A35C]/45 disabled:text-[#0B0C0D]/70 disabled:shadow-none data-[state=loading]:cursor-wait data-[state=loading]:bg-[#C7A35C]/85 data-[state=success]:bg-[#7FB08A] data-[state=success]:text-[#0B0C0D]"
    >
      {loading && <Loader2 size={16} className="animate-spin" aria-hidden />}
      {success && <CheckCircle2 size={17} aria-hidden />}
      <span>{success ? successLabel || "C'est fait" : loading ? loadingLabel || children : children}</span>
    </button>
  );
}

export function Alert({ kind = "error", children }: { kind?: "error" | "success" | "info"; children: ReactNode }) {
  if (!children) return null;
  const styles = {
    error: { box: "border-[#E07A7A]/35 bg-[#E07A7A]/[0.08] text-[#F6C4C4]", icon: <AlertCircle size={17} className="text-[#F0A3A3]" aria-hidden /> },
    success: { box: "border-[#7FB08A]/35 bg-[#7FB08A]/[0.08] text-[#CFE6D4]", icon: <CheckCircle2 size={17} className="text-[#9FD0AA]" aria-hidden /> },
    info: { box: "border-[#C7A35C]/35 bg-[#C7A35C]/[0.08] text-[#EBDDBE]", icon: <Info size={17} className="text-[#C7A35C]" aria-hidden /> },
  }[kind];
  return (
    <div role={kind === "error" ? "alert" : "status"} aria-live={kind === "error" ? "assertive" : "polite"} className={`mb-6 flex items-start gap-3 rounded-[10px] border px-4 py-3.5 text-[14px] leading-relaxed ${styles.box}`}>
      <span className="mt-[2px] shrink-0">{styles.icon}</span>
      <span>{children}</span>
    </div>
  );
}

export function Divider({ label = "ou" }: { label?: string }) {
  return (
    <div className="my-7 flex items-center gap-4 text-[12px] text-[#F5F1E8]/55">
      <span className="h-px flex-1 bg-[#F5F1E8]/[0.09]" /> {label} <span className="h-px flex-1 bg-[#F5F1E8]/[0.09]" />
    </div>
  );
}
