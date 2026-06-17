"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/providers/transitions";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { TiltCard } from "@/components/ui/tilt-card";
import Link from "next/link";
import { Sparkles, Trophy, Users, Ticket, MapPin } from "lucide-react";

const experiences = [
  {
    title: "GITEX Global Dubaï",
    subtitle: "Tech & Innovation",
    imageUrl: "https://images.unsplash.com/photo-1582653280643-e77c738edec1?auto=format&fit=crop&w=1000&q=80",
    desc: "Vivez le plus grand salon tech au monde avec Wander. Accès VIP, networking exclusif et séjours de luxe à Dubaï.",
  },
  {
    title: "Fan Zone MCE",
    subtitle: "Expérience Supporters",
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19e3adca174f?auto=format&fit=crop&w=1000&q=80",
    desc: "L'adrénaline du sport combinée au confort Wander. Hospitalités premium pour les plus grands événements mondiaux.",
  },
  {
    title: "Hospitalités VIP",
    subtitle: "Privilège & Émotion",
    imageUrl: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1000&q=80",
    desc: "Loges privées, transferts en limousine et services de conciergerie 24/7 pour vos déplacements sportifs.",
  },
];

export default function FanZonePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Header />

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#080808] z-0" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent z-0" />
        
        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <span className="text-primary font-medium tracking-[0.3em] uppercase text-xs mb-6 block">
                Expériences Immersives • Fan Zone 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-[1.1]">
                Où le sport rencontre <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200/80">
                  le Prestige
                </span>
              </h1>
              <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
                Wander Travel & Event redéfinit l'expérience des fans. De GITEX Dubaï aux plus grands stades du monde, nous créons des moments d'exception pour les passionnés et les entreprises.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GITEX SPECIAL SECTION ────────────────────────────────────────── */}
      <section className="py-24 bg-background border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="relative aspect-video rounded-3xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80" 
                  alt="GITEX Dubai" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-8 left-8">
                  <div className="flex items-center gap-2 bg-primary/90 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                    <Sparkles className="w-3 h-3" />
                    Offre Spéciale
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-white">GITEX Global Dubaï</h3>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-8">
                <h2 className="text-4xl font-serif font-bold text-white">Vivez le Futur de la Tech</h2>
                <p className="text-gray-400 font-light text-lg">
                  Participez au GITEX Global avec un package premium conçu par Wander. Nous gérons tout : de votre vol en Business Class à votre hébergement dans les plus beaux palaces de Dubaï.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: Ticket, text: "Badges VIP & Fast Track" },
                    { icon: MapPin, text: "Hébergement 5* Downtown" },
                    { icon: Users, text: "Networking & Soirées" },
                    { icon: Trophy, text: "Conciergerie Dédiée" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5">
                      <item.icon className="w-6 h-6 text-primary" />
                      <span className="text-sm font-medium text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact" className="inline-block px-10 py-4 bg-primary text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors">
                  Réserver mon pack GITEX
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCES GRID ─────────────────────────────────────────────── */}
      <section className="py-32 bg-[#080808]">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Nos Concepts Fan Experience</h2>
              <p className="text-gray-500 max-w-2xl mx-auto italic">
                Chaque événement est une opportunité de créer un lien unique.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experiences.map((exp, i) => (
              <Reveal key={i} delay={i * 0.15}>
                <TiltCard
                  title={exp.title}
                  subtitle={exp.subtitle}
                  imageUrl={exp.imageUrl}
                >
                  <p className="text-gray-400 font-light text-sm mb-6">{exp.desc}</p>
                  <Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
                    En savoir plus →
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Un événement à venir ?</h2>
            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12">
              Que vous soyez une fédération, un club ou une entreprise, nous concevons votre Fan Zone sur-mesure.
            </p>
            <Link href="/contact" className="inline-block px-12 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-primary transition-colors">
              Discuter de mon projet
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
