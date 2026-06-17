"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/providers/transitions";
import { HeroGlobe } from "@/components/ui/hero-globe";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { TiltCard } from "@/components/ui/tilt-card";
import Link from "next/link";
import { Wallet, Gift, Heart, Star, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const benefits = [
  {
    title: "Expériences Signature",
    desc: "Offrez à vos talents l'accès à un catalogue exclusif de séjours, de dîners en palaces et d'activités insolites, négociés aux meilleurs tarifs.",
    icon: Star,
  },
  {
    title: "Le Wallet Entreprise",
    desc: "Un budget digital alloué à chaque collaborateur, qu'il peut utiliser librement sur la plateforme Wander pour ses loisirs ou voyages.",
    icon: Wallet,
  },
  {
    title: "Programmes Bien-être",
    desc: "Retraites yoga, week-ends spa et déconnexion totale pour valoriser la santé mentale et l'équilibre vie pro/vie perso.",
    icon: Heart,
  },
  {
    title: "Incentives Personnalisés",
    desc: "Récompensez les performances exceptionnelles par des dotations de voyage sur-mesure, de Marrakech aux Maldives.",
    icon: Gift,
  },
];

export default function AvantagesSalariesPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#050505] min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <HeroGlobe />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-6 block">
                Capital Humain & Engagement
              </span>
              <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-[1.05] tracking-tighter">
                Valorisez vos Talents, <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-200 to-primary/80">
                  Inspirez la Fidélité
                </span>
              </h1>
              <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed mb-12">
                Wander Travel & Event conçoit des solutions d'avantages salariés premium pour transformer votre culture d'entreprise en une expérience de vie inoubliable.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/contact" className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all shadow-[0_30px_80px_rgba(197,160,89,0.2)] rounded-sm text-center">
                  Consulter nos Solutions RH
                </Link>
                <div className="flex items-center gap-4 text-white/30 text-sm italic">
                   <ShieldCheck className="text-primary/50 w-5 h-5" />
                   <span>Dispositif 100% sécurisé</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── LE CONCEPT WALLET ────────────────────────────────────────────── */}
      <section className="py-32 bg-background border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal>
              <div className="relative rounded-[3rem] overflow-hidden group aspect-square lg:aspect-auto lg:h-[600px]">
                <img 
                  src="/images/products/wallet-entreprise/solution entreprise.png" 
                  alt="Wallet Entreprise" 
                  className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110 brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12 right-12">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 backdrop-blur-xl border border-primary/30 flex items-center justify-center mb-6">
                    <Wallet className="text-primary w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white mb-4">Le Wallet Wander</h3>
                  <p className="text-gray-300 font-light leading-relaxed">
                    Une enveloppe budgétaire flexible, gérée via une interface simplifiée pour vos collaborateurs.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-12">
              <Reveal delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">L'Innovation au service <br /> de votre Marque Employeur</h2>
                <p className="text-gray-400 font-light text-lg">
                  Finis les avantages standards. Wander propose un écosystème où chaque salarié choisit l'expérience qui lui ressemble.
                </p>
              </Reveal>

              <div className="space-y-8">
                {[
                  { t: "Fidélisation Accrue", d: "Réduisez le turnover en offrant des moments de vie d'exception.", icon: Zap },
                  { t: "Bien-être au Travail", d: "Encouragez la déconnexion avec des séjours 'Reset' sélectionnés.", icon: Heart },
                  { t: "Simplicité de Gestion", d: "Nous gérons toute la logistique, du choix à la réservation.", icon: Sparkles },
                ].map((item, i) => (
                  <Reveal key={i} delay={0.1 * i}>
                    <div className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">{item.t}</h4>
                        <p className="text-gray-500 text-sm font-light leading-relaxed">{item.d}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID AVANTAGES ───────────────────────────────────────────────── */}
      <section className="py-32 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-5 block">Catalogue Premium</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Nos Piliers d'Engagement</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-10 border border-white/5 rounded-[2rem] bg-white/[0.02] hover:border-primary/30 transition-all group h-full flex flex-col">
                  <b.icon className="text-primary w-10 h-10 mb-8 transition-transform group-hover:scale-110" />
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{b.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-8 flex-1">{b.desc}</p>
                  <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mt-auto">
                    Découvrir l'offre <CheckCircle2 className="w-3 h-3" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / REFERENCE ──────────────────────────────────────── */}
      <section className="py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <div className="relative p-12 md:p-20 rounded-[3rem] border border-primary/20 bg-primary/5 text-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-[0.03] blur-[100px] -mr-32 -mt-32" />
              <div className="relative z-10">
                <Sparkles className="text-primary w-12 h-12 mx-auto mb-10" />
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Prêt à transformer l'expérience de vos collaborateurs ?</h2>
                <p className="text-gray-400 text-lg font-light mb-12 max-w-2xl mx-auto italic">
                  "Depuis l'intégration du Wallet Wander, l'engagement de nos équipes a augmenté de 40% sur nos enquêtes RH internes."
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/contact" className="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-primary transition-colors">
                    Demander une Démo
                  </Link>
                  <Link href="/entreprise/offres" className="px-10 py-5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:border-primary transition-colors flex items-center justify-center gap-2">
                    Voir les Offres <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
