import Link from "next/link";
import type { ReactNode } from "react";
import { BadgeCheck, Building2, ShieldCheck } from "lucide-react";

// Cadre commun des pages d'authentification (connexion, inscription, mot de passe…).
// Gauche (55 %) : univers Wander. Droite (45 %) : formulaire.
// Palette : Obsidian #0B0C0D · Graphite #191B1D · Champagne #C7A35C · Ivory #F5F1E8.

// Photo d'architecture de Casablanca : déposer public/images/login/casablanca.jpg
// (photo sous licence adaptée). Tant qu'elle est absente, le motif Art déco reste visible.
const PHOTO = "/images/login/casablanca.jpg";

const TRUST = [
  { icon: BadgeCheck, text: "Agence agréée tourisme · ODV-9266" },
  { icon: ShieldCheck, text: "Données protégées · loi 09-08" },
  { icon: Building2, text: "Réservé aux entreprises partenaires" },
];

export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <main className="wa relative min-h-screen bg-[#0B0C0D] text-[#F5F1E8] grid lg:grid-cols-[55fr_45fr]">
      <style>{`
        @keyframes wa-rise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes wa-drift { from { transform: scale(1.06) } to { transform: scale(1) } }
        .wa-rise { animation: wa-rise .9s cubic-bezier(.2,.7,.2,1) both }
        .wa-d1 { animation-delay: .08s } .wa-d2 { animation-delay: .18s } .wa-d3 { animation-delay: .28s } .wa-d4 { animation-delay: .38s }
        .wa-drift { animation: wa-drift 14s ease-out both }
        @media (prefers-reduced-motion: reduce) { .wa-rise, .wa-drift { animation: none } }
        .wa :focus-visible { outline: 2px solid #C7A35C; outline-offset: 3px }
      `}</style>

      {/* ---------- Univers Wander (ordinateur et tablette paysage) ---------- */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden border-r border-[#F5F1E8]/[0.06] px-14 py-12 xl:px-20">
        <DecoBackdrop />
        <div aria-hidden className="wa-drift absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${PHOTO})` }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,12,13,.55)_0%,rgba(11,12,13,.35)_35%,rgba(11,12,13,.85)_75%,#0B0C0D_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_15%_0%,rgba(199,163,92,.14),transparent_70%)]" />

        <Brand className="relative z-10 wa-rise" />

        <div className="relative z-10 max-w-[560px]">
          <p className="wa-rise wa-d1 mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#C7A35C]">
            <span className="h-px w-8 bg-[#C7A35C]" /> Espace privé
          </p>
          <h2 className="wa-rise wa-d2 font-serif text-[clamp(3rem,4.6vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.01em] text-[#F5F1E8]">
            L&apos;excellence
            <br />
            <span className="italic text-[#D9BE85]">sur invitation.</span>
          </h2>
          <p className="wa-rise wa-d3 mt-7 max-w-[470px] text-[17px] leading-[1.7] text-[#F5F1E8]/80">
            Le portail Wander réunit vos voyages d&apos;affaires, événements MICE et avantages salariés négociés, dans un espace sécurisé dédié aux collaborateurs de nos entreprises partenaires.
          </p>
          <ul className="wa-rise wa-d4 mt-10 grid gap-3">
            {TRUST.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[14px] text-[#F5F1E8]/85">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C7A35C]/35 bg-[#0B0C0D]/40 text-[#C7A35C]">
                  <Icon size={15} strokeWidth={1.75} aria-hidden />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[#F5F1E8]/60">
          Casablanca <span className="h-1 w-1 rounded-full bg-[#C7A35C]" /> Depuis 17 ans
        </p>
      </aside>

      {/* ---------- Formulaire ---------- */}
      <section className="relative flex flex-col bg-[#0B0C0D] lg:bg-[linear-gradient(180deg,#121315_0%,#0B0C0D_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_100%_0%,rgba(199,163,92,.07),transparent_70%)]" />
        <div className="relative flex flex-1 items-center justify-center px-5 py-10 sm:px-10 md:py-16">
          <div className="w-full max-w-[420px]">
            <Brand className="mb-12 lg:hidden" />
            <h1 className="wa-rise font-serif text-[2.35rem] sm:text-[2.6rem] font-medium leading-[1.1] text-[#F5F1E8]">{title}</h1>
            {subtitle && <p className="wa-rise wa-d1 mt-3 mb-9 text-[15px] leading-[1.65] text-[#F5F1E8]/70">{subtitle}</p>}
            {!subtitle && <div className="mb-9" />}
            <div className="wa-rise wa-d2">{children}</div>
            {footer && <div className="mt-8 border-t border-[#F5F1E8]/[0.08] pt-7 text-[14px] text-[#F5F1E8]/70">{footer}</div>}
          </div>
        </div>
        <footer className="relative px-5 pb-8 sm:px-10">
          <p className="mx-auto max-w-[420px] text-center text-[12px] leading-relaxed text-[#F5F1E8]/55">
            Besoin d&apos;aide ?{" "}
            <a className="text-[#D9BE85] underline-offset-4 hover:underline" href="mailto:contact@wandertravel-event.com">contact@wandertravel-event.com</a>
            <span aria-hidden> · </span>
            <a className="text-[#D9BE85] underline-offset-4 hover:underline" href="https://wa.me/212702093107" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <span aria-hidden> · </span>
            <Link className="text-[#D9BE85] underline-offset-4 hover:underline" href="/confidentialite">Confidentialité</Link>
          </p>
        </footer>
      </section>
    </main>
  );
}

function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Wander Travel & Event — accueil" className={`group inline-flex items-center gap-3.5 ${className}`}>
      <img src="/images/brand/wander-mark-gold.png" alt="" width={44} height={40} className="h-10 w-auto transition-transform duration-500 group-hover:-rotate-6" />
      <span className="flex flex-col">
        <span className="font-serif text-[1.55rem] font-semibold leading-none tracking-[0.18em] text-[#F5F1E8]">WANDER</span>
        <span className="mt-1.5 text-[9.5px] font-semibold uppercase tracking-[0.48em] text-[#C7A35C]">Travel &amp; Event</span>
      </span>
    </Link>
  );
}

// Fond Art déco inspiré des façades blanches de Casablanca (arcs, verticales, soleil levant).
function DecoBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,#191B1D_0%,#111214_55%,#0B0C0D_100%)]">
      <svg className="wa-drift absolute inset-0 h-full w-full opacity-[0.55]" viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wa-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#C7A35C" stopOpacity=".55" />
            <stop offset="1" stopColor="#C7A35C" stopOpacity=".05" />
          </linearGradient>
          <pattern id="wa-arch" width="120" height="240" patternUnits="userSpaceOnUse">
            <path d="M10 240V90a50 50 0 0 1 100 0v150" fill="none" stroke="url(#wa-g)" strokeWidth="1" />
            <path d="M30 240V100a30 30 0 0 1 60 0v140" fill="none" stroke="#C7A35C" strokeOpacity=".12" strokeWidth="1" />
            <path d="M60 60V20" stroke="#C7A35C" strokeOpacity=".18" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="380" width="800" height="620" fill="url(#wa-arch)" />
        <g fill="none" stroke="#C7A35C" strokeOpacity=".22" strokeWidth="1">
          <circle cx="600" cy="300" r="120" />
          <circle cx="600" cy="300" r="170" strokeOpacity=".12" />
          <circle cx="600" cy="300" r="230" strokeOpacity=".07" />
          {Array.from({ length: 13 }, (_, i) => {
            const a = Math.PI + (i * Math.PI) / 12;
            return <line key={i} x1={600 + Math.cos(a) * 130} y1={300 + Math.sin(a) * 130} x2={600 + Math.cos(a) * 300} y2={300 + Math.sin(a) * 300} strokeOpacity=".08" />;
          })}
        </g>
      </svg>
    </div>
  );
}
