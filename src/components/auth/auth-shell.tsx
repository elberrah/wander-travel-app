import Link from "next/link";
import type { ReactNode } from "react";

// Cadre commun des pages d'authentification : panneau de marque + formulaire.
export function AuthShell({ title, subtitle, children, footer }: { title: string; subtitle?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <main className="relative min-h-screen bg-background text-foreground grid lg:grid-cols-[1.05fr_1fr]">
      {/* Panneau de marque (ordinateur et tablette paysage) */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden border-r border-white/5 p-14">
        <img src="/images/gallery/casa-skyline.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover brightness-[0.35]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(197,160,89,0.18),transparent_60%)]" />
        <Brand className="relative z-10" />
        <div className="relative z-10 max-w-md">
          <span className="block text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6">Espace privé</span>
          <h2 className="font-serif text-5xl xl:text-6xl font-bold text-white leading-[0.95] tracking-tight mb-6">
            L&apos;excellence <br /> <span className="italic text-primary">sur invitation.</span>
          </h2>
          <p className="text-white/50 font-light leading-relaxed">
            Voyages corporate, MICE et avantages salariés : votre espace Wander est réservé aux membres et partenaires.
          </p>
        </div>
        <p className="relative z-10 text-[10px] uppercase tracking-[0.3em] text-white/30">Casablanca · Depuis 17 ans</p>
      </aside>

      {/* Formulaire */}
      <section className="relative flex flex-col justify-center px-4 py-12 sm:px-10 md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(197,160,89,0.08),transparent_55%)] pointer-events-none" />
        <div className="relative mx-auto w-full max-w-md">
          <Brand className="mb-12 lg:hidden" />
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h1>
          {subtitle && <p className="text-white/50 font-light mb-10 leading-relaxed">{subtitle}</p>}
          {children}
          {footer && <div className="mt-10 text-sm text-white/50">{footer}</div>}
          <p className="mt-12 text-[11px] text-white/30 leading-relaxed">
            Besoin d&apos;aide ? <a className="text-primary/80 hover:text-primary" href="mailto:contact@wandertravel-event.com">contact@wandertravel-event.com</a> ·{" "}
            <a className="text-primary/80 hover:text-primary" href="https://wa.me/212702093107" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </p>
        </div>
      </section>
    </main>
  );
}

function Brand({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Wander Travel & Event — accueil" className={`group inline-flex items-center ${className}`}>
      <div className="flex flex-col">
        <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-white leading-none transition-colors group-hover:text-primary">WANDER</span>
        <span className="text-primary text-[9px] md:text-[10px] font-bold tracking-[0.5em] uppercase mt-1.5 opacity-80">Travel &amp; Event</span>
      </div>
    </Link>
  );
}
