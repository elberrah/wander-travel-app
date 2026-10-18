"use client";

import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "500+", label: "Événements organisés" },
  { value: "17", label: "Années d'expertise" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "40+", label: "Destinations" },
];

const corporateServices = [
  {
    title: "Comités de Direction",
    desc: "Des espaces confidentiels, ultra-sécurisés, alliant gastronomie d'exception et équipements technologiques de pointe.",
    icon: "🏛️",
  },
  {
    title: "Incentive & Team Building",
    desc: "Défis en haute mer, bivouacs de luxe en plein désert ou circuits culturels exclusifs pour souder vos équipes.",
    icon: "🤝",
  },
  {
    title: "Séminaires & Congrès",
    desc: "Capacité d'accueil de 10 à 1 000 participants avec traduction simultanée et logistique premium.",
    icon: "🎤",
  },
  {
    title: "Lancements de Produit",
    desc: "Scénographie immersive, captation 4K et gestion des flux VIP pour un impact maximal.",
    icon: "🎯",
  },
];

const stayGallery = [
  { src: "/images/services/hebergement-palace-stay/HOTEL (1).jpg", name: "Fairmont Rabat Sale" },
  { src: "/images/services/hebergement-palace-stay/HOTEL (11).jpg", name: "Hilton Taghazout Bay" },
  { src: "/images/services/mobilite-vip/VIP VOITURE (4).jpg", name: "Palace Excellence - Real View" }, // User photo
  { src: "/images/services/aviation-fast-track/jet prive/jet prive (2).jpg", name: "Executive Suite - Authentic" }, // User photo
];

export default function CorporatePage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-bg",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/20">
      <Header />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[85vh] flex items-center justify-center pt-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/corporate/corporate-event-group.jpg"
            alt="Seminar Excellence"
            className="parallax-bg w-full h-full object-cover brightness-[0.3] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <motion.div
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
             className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="w-12 h-px bg-primary/40" />
            <span className="text-primary tracking-[0.4em] uppercase text-[10px] md:text-sm font-bold">Solutions Corporate & MICE</span>
            <div className="w-12 h-px bg-primary/40" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-10 leading-[1.1]"
          >
            L'excellence <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic">Stratégique</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-14"
          >
            Mélange d'authenticité de terrain et de rigeur internationale pour vos événements.
          </motion.p>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 0.8 }}>
             <Link href="/contact" className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_50px_rgba(197,160,89,0.2)]">
                Lancer un Projet
             </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. SERVICES GRID ─────────────────────────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
             <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {corporateServices.map((service, i) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="p-10 border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all rounded-[2rem] group"
                  >
                    <div className="text-4xl mb-8">{service.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-white/40 font-light text-sm leading-relaxed">{service.desc}</p>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ── 3. GALERIE MIXTE (Real & Premium) ────────────────── */}
      <section className="py-32 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="md:col-span-8 h-[500px] relative rounded-[3rem] overflow-hidden group">
               <img src="/images/02_Offres_Entreprise/02_team_day.jpg" className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-[4000ms]" />
               <div className="absolute inset-0 p-12 flex flex-col justify-end items-start text-left">
                  <span className="text-primary uppercase tracking-widest text-[10px] font-bold mb-4">Événement Tech</span>
                  <h3 className="text-3xl md:text-5xl text-white font-serif font-bold">Congrès & Hospitalité VIP</h3>
               </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="md:col-span-4 h-[500px] relative rounded-[3rem] overflow-hidden group">
               <img src="/images/experience-blocks/conference-stage/digital-studio.png" className="w-full h-full object-cover brightness-[0.7] group-hover:scale-110 transition-transform duration-[4000ms]" />
               <div className="absolute inset-0 p-10 flex flex-col justify-end text-right">
                  <h3 className="text-2xl text-white font-serif">Digital Pass</h3>
               </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-7 h-[600px] relative rounded-[3rem] overflow-hidden group">
               <img src="/images/02_Offres_Entreprise/04_sales_kickoff.jpg" className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-[4000ms]" />
               <div className="absolute inset-0 p-10 flex flex-col justify-end">
                  <h3 className="text-2xl text-white font-bold">Incentive : Rallye Agafay</h3>
               </div>
            </motion.div>
            
            <div className="md:col-span-5 grid grid-rows-2 gap-8">
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-full rounded-[3rem] overflow-hidden group border border-white/10">
                 <img src="/images/services/seminaires-conferences/seminaire (4).jpg" className="w-full h-full object-cover brightness-[0.45] group-hover:scale-110 transition-all duration-[3000ms]" />
                 <div className="absolute inset-0 p-8 flex items-end">
                    <span className="text-white font-bold text-sm tracking-widest uppercase">Golf Experience</span>
                 </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative h-full rounded-[3rem] overflow-hidden group border border-white/10">
                 <img src="/images/services/incentive-team-building/team-bulding (10).jpg" className="w-full h-full object-cover brightness-[0.45] group-hover:scale-110 transition-all duration-[3000ms]" />
                 <div className="absolute inset-0 p-8 flex items-end">
                    <span className="text-white font-bold text-sm tracking-widest uppercase">Team Building Activity</span>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PALACES (Mix Real Photos) ─────────────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="text-center mb-20">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Selection Wander</span>
              <h2 className="font-serif text-4xl md:text-6xl text-white font-bold">Un Héritage d'Hospitalité</h2>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stayGallery.map((hotel, i) => (
                <motion.div
                  key={hotel.name}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                >
                  <img src={hotel.src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-[0.7] group-hover:brightness-[0.4]" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                     <h3 className="text-white font-serif font-bold text-xl translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">{hotel.name}</h3>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
