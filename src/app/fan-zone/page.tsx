"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { Star, Trophy, Users, Calendar, ArrowRight } from "lucide-react";

export default function FanZonePage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/events/fanzone-hero.jpg" 
            alt="Fan Zone Hero" 
            className="w-full h-full object-cover opacity-40 grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary tracking-[0.5em] uppercase text-xs font-bold mb-6"
          >
            Road to 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif font-bold text-white mb-8"
          >
            WANDER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-200 italic">
              FAN ZONE
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-white/50 max-w-2xl mx-auto mb-12"
          >
            Vivez l'émotion du sport dans un cadre d'exception. 
            VIP Hospitality, Villages Mondiaux et Expériences Immersives.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Link href="/contact" className="px-10 py-5 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
              Réserver votre accès VIP
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-32 bg-[#050505] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Trophy, title: "Lieux Iconiques", desc: "Hippodrome de Casablanca, Hotels de Prestige..." },
              { icon: Users, title: "B2B Hospitality", desc: "Espaces dédiés pour vos collaborateurs et clients." },
              { icon: Star, title: "Service 5 Étoiles", desc: "Catering gourmet et conciergerie sur place." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-white/5 bg-white/[0.02] rounded-3xl"
              >
                <f.icon className="text-primary mb-6" size={32} />
                <h3 className="text-xl text-white font-bold mb-4">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
