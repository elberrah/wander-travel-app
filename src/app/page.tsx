"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroCanvas from "@/components/sections/HeroCanvas";
import { TiltCard } from "@/components/ui/tilt-card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, Star, Shield, Clock, Globe } from "lucide-react";
import { ExperienceMarquee } from "@/components/sections/ExperienceMarquee";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── DATA ────────────────────────────────────────────────────────────────────

const stats = [
  { value: "17", suffix: "ans", label: "d'excellence" },
  { value: "1 500", suffix: "+", label: "partenaires hôteliers" },
  { value: "40", suffix: "+", label: "destinations mondiales" },
  { value: "24/7", suffix: "", label: "disponibilité" },
];

const mainExpertises = [
  {
    title: "Aviation & VIP",
    subtitle: "Aviation d'Affaires",
    href: "/aviation",
    imageUrl: "/images/services/aviation-fast-track/avion-commercial-vol.jpg",
    desc: "Jets privés, hélicoptères et transferts prioritaires sur-mesure.",
    aspect: "aspect-[3/4]"
  },
  {
    title: "MICE & Corporate",
    subtitle: "Événements Stratégiques",
    href: "/corporate",
    imageUrl: "/images/services/seminaires-conferences/seminaire (1).png",
    desc: "Séminaires, congrès et lancements de produits d'exception.",
    aspect: "aspect-square md:aspect-[4/5]"
  },
  {
    title: "VIP Events",
    subtitle: "Accès Événementiels",
    href: "/services",
    imageUrl: "/images/services/mobilite-vip/VIP VOITURE (4).jpg",
    desc: "Loges exclusives et hospitalité haut de gamme mondiale.",
    aspect: "aspect-[4/5]"
  },
  {
    title: "Digital Studio",
    subtitle: "Création & Branding",
    href: "/services",
    imageUrl: "/images/services/mice-event-strategy/03_service_digital.png",
    desc: "Production visuelle, live streaming et billetterie digitale.",
    aspect: "aspect-[16/9] md:aspect-[3/4]"
  },
];

const premiumPackages = [
  { 
    name: "Business Travel Premium", 
    desc: "Optimisation totale et confort absolu pour vos équipes.",
    benefit: "Gain de temps de 35% sur la logistique.",
    href: "/services" 
  },
  { 
    name: "Executive VIP", 
    desc: "Accompagnement diplomatique et discrétion garantie.",
    benefit: "Interlocuteur unique 24/7 disponible en 4h.",
    href: "/services" 
  },
  { 
    name: "MICE Signature", 
    desc: "Conception événementielle créative de A à Z.",
    benefit: "Réseau de 1 500+ lieux partenaires.",
    href: "/services" 
  },
  { 
    name: "Incentive Experience", 
    desc: "Programmes de motivation transformateurs et exclusifs.",
    benefit: "ROI mesuré sur la cohésion d'équipe.",
    href: "/services" 
  },
];

const partners = [
  { name: "ENSA", logo: "/images/partners/ensa.png" },
  { name: "CGEM", logo: "/images/partners/cgem.png" },
  { name: "ISCAE", logo: "/images/partners/iscae.png" },
  { name: "ENCG", logo: "/images/partners/encg.png" },
  { name: "SIHAMCO", logo: "/images/partners/sihamco.png" },
  { name: "Richard Mille", logo: "/images/partners/richard-mille.png" },
  { name: "Aramco", logo: "/images/partners/aramco.png" },
  { name: "Groupe Lafayette", logo: "/images/partners/lafayette.png" },
  { name: "PROfm", logo: "/images/partners/profm.png" },
  { name: "AKSAM", logo: "/images/partners/aksam.png" },
  { name: "CRDP", logo: "/images/partners/crdp.png" },
  { name: "Entraide Nationale", logo: "/images/partners/entraide.png" },
  { name: "ONICL", logo: "/images/partners/onicl.png" },
  { name: "Savola", logo: "/images/partners/savola.png" },
  { name: "Comexi", logo: "/images/partners/comexi.png" },
  { name: "Mapping Engineering", logo: "/images/partners/mapping.png" }
];

// Mélange de photos premium et photos réelles (raw) demandées par l'user - structure modulaire de cadrage
const immersiveGallery = [
  { src: "/images/services/incentive-team-building/team-bulding (6).png", title: "Team Building", aspect: "aspect-[4/5] object-top" },
  { src: "/images/services/travel-management/DISTINATION-MARBELLA.png", title: "Destination Premium", aspect: "aspect-[3/4]" },
  { src: "/images/experience-blocks/fast-track/fast track-maroc.png", title: "Fast Track", aspect: "aspect-[16/9]" },
  { src: "/images/products/employee-benefits/avantage -salarie.png", title: "Employee Benefits", aspect: "aspect-square" },
  { src: "/images/products/wallet-entreprise/solution entreprise.png", title: "Corporate Solutions", aspect: "aspect-[3/4]" },
  { src: "/images/services/mice-event-strategy/02_service_corporate.JPEG", title: "Stratégie", aspect: "aspect-video" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".parallax-card").forEach((card: any) => {
        gsap.to(card, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      <Header />

      {/* ── 1. HERO SECTION (EDITORIAL & LAYERED CARDS) ───────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
        <HeroCanvas />
        {/* Background Subtle Video & Gradients */}
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <img 
            src="/images/hero/hero-main-display.png" 
            alt="Wander Luxury" 
            className="w-full h-full object-cover brightness-[0.3] saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/80 to-background" />
        </motion.div>

        <div className="container relative z-10 mx-auto px-6 max-w-7xl pt-24 pb-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 min-h-[90vh]">
          
          {/* Left Column: Editoral Typography */}
          <div className="flex-1 text-center lg:text-left z-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <span className="text-primary tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold mb-6 block drop-shadow-md">
                Wander Travel & Event
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              className="text-5xl md:text-7xl xl:text-[6.5rem] font-serif font-medium text-white leading-tight tracking-tighter mb-8 drop-shadow-2xl"
            >
              L'Excellence <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] via-[#f5eedf] to-[#c5a059] italic pr-8">
                Sans Limite
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }}
              className="text-lg md:text-xl text-white/50 max-w-lg mx-auto lg:mx-0 font-light mb-12 leading-relaxed"
            >
              Votre stratégie voyage, votre logistique événementielle et vos services VIP, 
              orchestrés avec une précision absolue, au Maroc et à l’international.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row gap-5 items-center justify-center lg:justify-start"
            >
              <Link href="/contact" className="group relative px-10 md:px-12 py-4 bg-[#c5a059] text-[#050505] font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs overflow-hidden transition-all duration-500 hover:bg-[#d4b472] hover:scale-105 hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] rounded-sm">
                 Architecturer un projet
              </Link>
              <Link href="/services" className="px-10 md:px-12 py-4 bg-transparent text-white border border-white/10 hover:border-[#c5a059]/50 hover:bg-[#c5a059]/5 transition-all duration-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] rounded-sm">
                L'Écosystème
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Layered Premium Images */}
          <div className="flex-1 relative w-full h-[500px] lg:h-[700px] mt-8 lg:mt-0 perspective-[2000px] hidden md:block group">
             
             {/* Back Layer - MICE/Corporate */}
             <motion.div 
               initial={{ opacity: 0, x: 80, y: -40, rotateY: -20, rotateZ: 8 }} 
               animate={{ opacity: 0.5, x: 40, y: -20, rotateY: -15, rotateZ: 5 }} 
               transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
               className="absolute top-10 right-0 w-[60%] h-[60%] rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5 origin-bottom-right transition-transform duration-700 group-hover:-translate-y-4 group-hover:rotate-z-6"
             >
               <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-500 group-hover:opacity-20" />
               <img src="/images/experience-blocks/conference-stage/04_layer_conference (1).jpg" alt="MICE Event" className="w-full h-full object-cover brightness-[0.8] contrast-125 saturate-50 sepia-[.15]" />
             </motion.div>
             
             {/* Middle Layer - VIP Transport */}
             <motion.div 
               initial={{ opacity: 0, x: 50, y: 80, rotateY: -12, rotateZ: -6 }} 
               animate={{ opacity: 0.8, x: -30, y: 60, rotateY: -8, rotateZ: -3 }} 
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
               className="absolute bottom-10 right-[10%] w-[65%] h-[65%] rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/5 origin-bottom-left z-10 transition-transform duration-700 group-hover:translate-x-4 group-hover:-rotate-z-5"
             >
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
               <img src="/images/services/mobilite-vip/VIP VOITURE (4).jpg" alt="VIP Transport" className="w-full h-full object-cover brightness-[0.8] contrast-125 saturate-50 sepia-[.15]" />
               <p className="absolute bottom-8 left-10 z-20 text-white font-serif italic text-lg opacity-90 decoration-[#c5a059] decoration-1 underline underline-offset-4">Mobilité d'Exception</p>
             </motion.div>

             {/* Front Layer - Aviation */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.85, y: 30, rotateY: 10 }} 
               animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0, rotateZ: 0 }} 
               transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
               className="absolute top-1/2 left-0 -translate-y-1/2 w-[70%] h-[75%] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.95)] border border-[#c5a059]/20 z-20 transition-transform duration-700 group-hover:scale-[1.02]"
             >
               <img src="/images/services/aviation-fast-track/jet-prive.jpg" alt="Private Jet" className="w-full h-full object-cover brightness-[0.9] contrast-[1.15] saturate-50 sepia-[.15]" />
               <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent">
                  <h3 className="text-white font-serif text-3xl font-bold">Aviation & Logistique</h3>
                  <p className="text-[#c5a059] text-[10px] tracking-[0.2em] uppercase mt-3 font-bold opacity-90">Opérations Sans Coutures</p>
               </div>
             </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div animate={{ y: [0, 8, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">
           <div className="w-[1px] h-16 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
        </motion.div>
      </section>

      {/* ── 2. STATS ────────────────────────────────────────────────── */}
      <section className="relative z-10 py-20 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.value}<span className="text-xl md:text-2xl ml-1">{stat.suffix}</span></div>
                <div className="text-[10px] text-white/30 uppercase tracking-[0.25em] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2b. CORPORATE À LA UNE ─────────────────────────────────── */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-[#050505] via-[#090909] to-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 relative">
            <span className="text-[#c5a059] font-bold tracking-[0.4em] uppercase text-xs mb-5 block">Pôle Entreprise</span>
            <h2 className="font-serif text-5xl md:text-7xl text-white font-medium leading-[1.1] mb-6">Vos expériences entreprise, <br />avec plus de fluidité</h2>
            <p className="text-white/50 font-light max-w-2xl mx-auto leading-relaxed text-lg">
              Wander accompagne les entreprises avec des offres sur-mesure, des modalités de règlement structurées et des avantages exclusifs pensés pour les collaborateurs.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-14">
            {["Team Day","Team Offsite","Incentive","Guest Desk","Paiement par acompte","Virement entreprise","Paiement échelonné","Avantages salariés","Wallet entreprise"].map((item,i) => (
              <motion.div key={item} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.07 }}
                className="px-4 py-4 border border-white/5 rounded-2xl bg-[#080808] hover:border-[#c5a059]/40 hover:shadow-[0_0_20px_rgba(197,160,89,0.1)] transition-all duration-300 text-center group cursor-default">
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 group-hover:text-[#c5a059] transition-colors duration-300">{item}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["Sur-mesure","Corporate Premium","Paiement Structuré","Coordination de bout en bout"].map(b => (
              <span key={b} className="px-5 py-2.5 border border-[#c5a059]/20 bg-[#c5a059]/[0.02] text-[#c5a059] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full drop-shadow-sm">{b}</span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <Link href="/entreprise/offres" className="group relative px-12 py-5 bg-[#c5a059] text-black font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-[#d4b472] hover:scale-105 hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] transition-all duration-500 rounded-sm">
              Découvrir les offres entreprise
            </Link>
            <Link href="/entreprise/paiement-avantages" className="group px-12 py-5 border border-white/10 text-white hover:border-[#c5a059]/50 hover:bg-[#c5a059]/5 transition-all duration-500 text-[11px] font-bold uppercase tracking-[0.2em] rounded-sm">
              Solutions de paiement
            </Link>
          </div>
        </div>
      </section>

      {/* ── 3. EXPERTISES ─────────────────────────────────────────────────── */}
      <section className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-28">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-5 block">Notre Savoir-Faire</span>
            <h2 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight">Une Approche Globale <br /> Pour Un Client Unique</h2>
          </motion.div>

          <div className="columns-1 md:columns-2 lg:columns-4 gap-8 space-y-8">
            {mainExpertises.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }} className="parallax-card break-inside-avoid">
                <TiltCard title={service.title} subtitle={service.subtitle} imageUrl={service.imageUrl} className={service.aspect || "aspect-[3/4]"}>
                  <p className="text-white/50 font-light text-sm mb-8 leading-relaxed line-clamp-3">{service.desc}</p>
                  <Link href={service.href} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#c5a059] group transition-colors duration-300">
                    Découvrir <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HORIZONTAL TICKER (20+ CARDS ANIMATED) ───────────────────── */}
      <ExperienceMarquee />

      {/* ── 5. IMMERSIVE MIX GALLERY (User request: Mix real & premium) ─── */}
      <section className="relative z-10 py-32 bg-background overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="mb-20 text-center">
              <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-6">Instants de Perfection</h2>
              <p className="text-white/40 font-light max-w-xl mx-auto">Un mélange d'authenticité et d'excellence, capturé à travers nos missions globales.</p>
           </div>
           
           <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {immersiveGallery.map((img, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ delay: i * 0.1 }}
                    className={`relative rounded-[2rem] overflow-hidden group border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] break-inside-avoid ${img.aspect || 'aspect-[4/5]'}`}
                  >
                     <img src={img.src} alt={img.title} className={`w-full h-full object-cover brightness-[0.6] contrast-125 saturate-50 sepia-[.15] group-hover:brightness-[0.9] group-hover:scale-105 transition-all duration-1000 ${img.aspect?.includes('object-') ? img.aspect.split(' ').find(c => c.startsWith('object-')) : ''}`} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />
                     <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <h4 className="text-white font-serif font-medium text-2xl translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">{img.title}</h4>
                     </div>
                  </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── 5. Signature PACKAGES ─────────────────────────────────────────── */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-background via-[#090909] to-[#050505]">
        <div className="container mx-auto px-6 max-w-7xl">
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
              <span className="text-[#c5a059] font-bold tracking-[0.4em] uppercase text-xs mb-5 block">Collections Wander</span>
              <h2 className="font-serif text-5xl md:text-7xl text-white font-medium leading-[1.1]">Nos Packages Signature</h2>
           </motion.div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {premiumPackages.map((pkg, i) => (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="p-10 lg:p-12 border border-white/5 bg-[#080808] rounded-[2rem] hover:border-[#c5a059]/30 hover:shadow-[0_20px_60px_rgba(197,160,89,0.05)] transition-all duration-500 group flex flex-col h-full">
                   <h3 className="text-white font-serif text-2xl mb-4 group-hover:text-[#c5a059] transition-colors duration-300">{pkg.name}</h3>
                   <p className="text-white/40 font-light text-sm mb-8 leading-relaxed">{pkg.desc}</p>
                   <div className="mt-auto pt-6 border-t border-white/5">
                      <div className="flex items-center gap-2 text-primary font-serif italic text-sm mb-6">
                         <CheckCircle2 size={14} className="text-primary/60 shrink-0" />
                         {pkg.benefit}
                      </div>
                      <Link href={pkg.href} className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">Découvrir →</Link>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── 5b. SERVICES ENTREPRISE ──────────────────────────────── */}
      <section className="relative z-10 py-32 bg-background border-t border-white/[0.03]">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-20">
            <span className="text-[#c5a059] font-bold tracking-[0.4em] uppercase text-xs mb-5 block">Formats Corporate</span>
            <h2 className="font-serif text-5xl md:text-7xl text-white font-medium leading-[1.1]">Solutions Entreprise</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title:"Wander Team Day", desc:"Journée cohésion clé en main à Casablanca et environs.", href:"/entreprise/offres" },
              { title:"Wander Team Offsite", desc:"Séjour 3 jours pour aligner et fédérer vos équipes.", href:"/entreprise/offres" },
              { title:"Wander Incentive", desc:"Programme de reconnaissance à forte valeur perçue.", href:"/entreprise/offres" },
              { title:"Wander Sales Kickoff", desc:"Lancement de cycle commercial avec impact et cohésion.", href:"/entreprise/offres" },
              { title:"Guest Desk Entreprise", desc:"Accueil VIP de vos invités, délégations et partenaires.", href:"/entreprise/offres" },
              { title:"Employee Benefits", desc:"Wallet entreprise et avantages collaborateurs premium.", href:"/entreprise/paiement-avantages" },
            ].map((s,i) => (
              <motion.div key={s.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="p-10 lg:p-12 border border-white/5 bg-[#080808] rounded-[2rem] hover:border-[#c5a059]/30 hover:bg-[#c5a059]/[0.02] hover:shadow-[0_15px_40px_rgba(197,160,89,0.08)] transition-all duration-500 group flex flex-col">
                <h3 className="text-white font-serif text-2xl mb-4 group-hover:text-[#c5a059] transition-colors duration-300">{s.title}</h3>
                <p className="text-white/40 font-light text-sm mb-10 leading-relaxed">{s.desc}</p>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <Link href={s.href} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-[#c5a059] transition-colors flex items-center gap-2 group-hover:pl-2 duration-300">
                    Découvrir <ArrowRight size={10} className="group-hover:translate-x-1 duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5c. PROCESSUS ────────────────────────────────────────── */}
      <section className="relative z-10 py-24 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Notre Approche</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">De l'Idée à l'Exécution</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {["Brief","Proposition","Validation","Production","Coordination","Suivi"].map((step,i) => (
              <motion.div key={step} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                className="text-center p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-xs">0{i+1}</span>
                </div>
                <p className="text-white font-bold text-sm group-hover:text-primary transition-colors">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. RÉFÉRENCES (ÉCOSYSTÈME D'EXCELLENCE) ────────────────────────── */}
      <section className="relative z-10 py-40 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-7xl">
           <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-center mb-24">
              <h2 className="font-serif text-4xl md:text-7xl text-primary font-bold mb-6">Des Références qui parlent</h2>
              <div className="text-white/30 tracking-[0.4em] uppercase text-xs font-medium">L'Écosystème d'Excellence</div>
           </motion.div>

           <div className="flex justify-center mb-24">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative w-56 md:w-80 h-32 md:h-48 group">
                 <img src="/images/02_Offres_Entreprise/06_guest_desk.jpg" alt="Wander Logo" className="w-full h-full object-contain brightness-110 drop-shadow-[0_0_30px_rgba(197,160,89,0.1)] group-hover:scale-105 transition-transform duration-700" />
              </motion.div>
           </div>

           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10">
              {partners.map((p, i) => (
                <motion.div key={p.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="px-6 py-10 border border-white/[0.03] bg-white/[0.005] hover:border-primary/20 hover:bg-white/[0.015] transition-all rounded-2xl flex flex-col items-center justify-center text-center group">
                   <div className="h-12 w-full flex items-center justify-center mb-4 opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                      <img 
                        src={p.logo} 
                        alt={p.name} 
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                   </div>
                   <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-primary transition-colors duration-500">{p.name}</span>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
