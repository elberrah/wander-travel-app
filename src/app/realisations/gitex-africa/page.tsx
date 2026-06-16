"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GitexAfricaPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <Header />
      
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/corporate/corporate-event-group.jpg" 
            alt="GITEX Africa" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Link href="/realisations" className="inline-flex items-center gap-2 text-primary text-xs uppercase font-bold tracking-widest mb-10 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Retour aux Réalisations
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            GITEX AFRICA
          </motion.h1>
          <p className="text-primary text-sm uppercase tracking-[0.5em] font-bold">Logistique & Hospitalité VIP</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-2xl text-white font-bold mb-6 font-serif">Le Défi</h2>
              <p className="text-white/50 leading-relaxed font-light">
                Gérer la logistique complète, les transferts VIP et l'hospitalité pour l'un des plus grands événements technologiques du continent. Exigence de ponctualité absolue et de standing 5 étoiles.
              </p>
            </div>
            <div>
              <h2 className="text-2xl text-white font-bold mb-6 font-serif">La Solution Wander</h2>
              <p className="text-white/50 leading-relaxed font-light">
                Mise en place d'une flotte dédiée de 20 véhicules de luxe, coordination 24/7 via notre Command Center, et déploiement d'une équipe de conciergerie multilingue sur site.
              </p>
            </div>
          </div>

          <div className="p-12 border border-white/5 bg-white/[0.02] rounded-3xl">
            <h3 className="text-xl text-white font-bold mb-10 text-center uppercase tracking-widest">Résultats Clés</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl text-primary font-bold mb-2">500+</div>
                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Transferts</div>
              </div>
              <div>
                <div className="text-3xl text-primary font-bold mb-2">100%</div>
                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl text-primary font-bold mb-2">0</div>
                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Incidents</div>
              </div>
              <div>
                <div className="text-3xl text-primary font-bold mb-2">24/7</div>
                <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
