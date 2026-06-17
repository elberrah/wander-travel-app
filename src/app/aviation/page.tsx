"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { CheckCircle2, Plane, Clock, Shield, Globe, Wind, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const aircraftFleet = [
  {
    type: "Jet Léger",
    model: "Cessna Citation XLS+",
    range: "3 700 km",
    passengers: "7 Pax",
    desc: "Idéal pour des vols d'affaires régionaux rapides. Flexibilité totale entre Casablanca, Paris et Madrid.",
    img: "/images/services/aviation-fast-track/avion-commercial-vol.jpg",
  },
  {
    type: "Mid-size Jet",
    model: "Challenger 350",
    range: "5 900 km",
    passengers: "10 Pax",
    desc: "La polyvalence absolue. Cabin pressurisée, espace lounge et connectivité haut débit.",
    img: "/images/services/aviation-fast-track/jet prive/jet prive (2).jpg",
  },
  {
    type: "Ultra-long Range",
    model: "Global 7500",
    range: "14 260 km",
    passengers: "17 Pax",
    desc: "Non-stop Casablanca–New York ou Dubaï. L'appareil de référence pour les délégations officielles.",
    img: "/images/services/aviation-fast-track/avion-commercial-vol.jpg", // Placeholder local
  },
];

export default function AviationPage() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-jet", {
        yPercent: 35,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-jet",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      <Header />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center pt-24 overflow-hidden border-b border-white/5 bg-[#050505]">
        {/* 3D Globe Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <HeroGlobe />
        </div>
        
        <div className="absolute inset-0 z-0">
          <img
            src="/images/aviation/private-jet-exterior.jpg"
            className="parallax-jet w-full h-full object-cover brightness-[0.2] scale-110"
            alt="Aviation Excellence"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <Reveal>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-px bg-primary" />
              <span className="text-primary tracking-[0.5em] uppercase text-xs font-bold font-serif italic">Wings of Wander</span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-bold text-white mb-10 leading-[0.85] tracking-tighter text-balance">
              Le Ciel <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic pr-8">
                Sans Limite
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-white/40 font-light max-w-2xl mb-16 leading-relaxed">
               Affrètement de jets privés, hélicoptères VIP et billetterie corporate premium. 
               Nous orchestrons chaque plan de vol avec une précision absolue.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-center">
               <Link href="/contact" className="px-16 py-6 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all shadow-[0_30px_100px_rgba(197,160,89,0.25)] rounded-sm">
                  Demander un Plan de Vol
               </Link>
               <div className="flex items-center gap-4 text-white/30 lowercase italic text-sm">
                  <span>Décollage garanti en 4h</span>
                  <div className="w-1 h-1 bg-primary rounded-full" />
                  <span>Discrétion Totale</span>
               </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. STATS ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#080808] border-b border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
           <Reveal>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                {[
                  { icon: <Clock size={24} />, label: "Réactivité 4h", desc: "De la demande au décollage." },
                  { icon: <Shield size={24} />, label: "Confidentialité", desc: "Protocoles d'État garantis." },
                  { icon: <Globe size={24} />, label: "Global Reach", desc: "Accès à 5 000+ aéroports." },
                  { icon: <Zap size={24} />, label: "Priority Fast-Track", desc: "Zéro attente au terminal." },
                ].map((s, i) => (
                  <div key={i} className="text-center md:text-left">
                     <div className="text-primary mb-6 flex justify-center md:justify-start">{s.icon}</div>
                     <h3 className="text-white font-bold text-lg mb-2">{s.label}</h3>
                     <p className="text-white/30 font-light text-sm">{s.desc}</p>
                  </div>
                ))}
             </div>
           </Reveal>
        </div>
      </section>

      {/* ── 3. LA FLOTTE ──────────────────────────────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="flex flex-col lg:flex-row justify-between items-end mb-28 gap-8">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="max-w-2xl">
                 <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Sélection Exclusive</span>
                 <h2 className="font-serif text-4xl md:text-7xl text-white font-bold leading-tight">La Flotte Wander</h2>
              </motion.div>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-white/40 font-light text-lg max-w-md lg:mb-4">
                 Nous sélectionnons les appareils les plus récents, certifiés par les plus hautes instances de l'aviation civile internationale.
              </motion.p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {aircraftFleet.map((plane, i) => (
                <motion.div
                  key={plane.model}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.015] hover:border-primary/20 transition-all flex flex-col"
                >
                   <div className="aspect-[4/3] overflow-hidden">
                      <img src={plane.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] brightness-75 group-hover:brightness-50" />
                   </div>
                   <div className="p-10 flex-1 flex flex-col">
                      <span className="text-primary uppercase tracking-widest text-[10px] font-bold mb-3 block">{plane.type}</span>
                      <h3 className="text-2xl font-serif font-bold text-white mb-6 transition-colors group-hover:text-primary">{plane.model}</h3>
                      <p className="text-white/40 text-sm mb-8 font-light flex-1">{plane.desc}</p>
                      <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                         <div>
                            <div className="text-white font-bold text-sm">{plane.range}</div>
                            <div className="text-primary/40 text-[9px] uppercase tracking-widest mt-1">Autonomie</div>
                         </div>
                         <div>
                            <div className="text-white font-bold text-sm">{plane.passengers}</div>
                            <div className="text-primary/40 text-[9px] uppercase tracking-widest mt-1">Capacité</div>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── 4. FAST TRACK & SALON VIP VIDEO ────────────────────────────────── */}
      <section className="py-32 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative aspect-video rounded-[3rem] overflow-hidden group shadow-2xl">
                  {/* Vidéo Fast Track validée par l'user */}
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-[0.5]">
                     <source src="/images/services/aviation-fast-track/fasttrack/fast track-maroc.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-20 h-20 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Wind size={32} />
                     </div>
                  </div>
               </motion.div>
               <div>
                  <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                     <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Services Aéroport Premium</span>
                     <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-8 leading-tight">Expérience Sol <br /> Sans Attente</h2>
                     <p className="text-white/40 font-light text-lg mb-10 leading-relaxed">
                        Évitez les files d'attente à l'immigration et aux contrôles de sécurité. Nos agents vous escortent personnellement de la porte de l'avion au salon VIP jusqu'à votre chauffeur Wander.
                     </p>
                     <ul className="space-y-6">
                        {[
                          { title: "Fast Track Prioritaire", desc: "Passage aux formalités en moins de 10 minutes." },
                          { icon: <Shield size={16} />, title: "Lounge Selection", desc: "Accès aux meilleurs salons mondiaux (Emirates, Etihad, etc.)." },
                          { icon: <Shield size={16} />, title: "Conciergerie Bagages", desc: "Prise en charge intégrale de vos effets personnels." },
                        ].map((item, i) => (
                           <li key={i} className="flex gap-5">
                              <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center shrink-0 text-primary">
                                 <CheckCircle2 size={16} />
                              </div>
                              <div>
                                 <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                 <p className="text-white/30 text-xs font-light">{item.desc}</p>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* ── 5. GALERIE AVIATION COMMERCIALE ───────────────────────────────── */}
      <section className="py-32 bg-background">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-24">
               <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">International Commercial Wings</span>
               <h2 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight">Billetterie Corporate d'Élite</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
               <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative rounded-[3rem] overflow-hidden group">
                  <img src="/images/services/aviation-fast-track/avion-commercial-vol.jpg" className="w-full h-full object-cover brightness-[0.5] group-hover:scale-105 transition-transform duration-[4000ms]" />
                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                     <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-3">Long-courriers & Business Class</span>
                     <h3 className="text-3xl text-white font-serif font-bold">Optimisation des Itinéraires</h3>
                  </div>
               </motion.div>
               <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative rounded-[3rem] overflow-hidden group">
                  <img src="/images/services/aviation-fast-track/jet-prive.jpg" className="w-full h-full object-cover brightness-[0.5] group-hover:scale-105 transition-transform duration-[4000ms]" />
                  <div className="absolute inset-0 p-12 flex flex-col justify-end text-right items-end">
                     <span className="text-primary font-bold uppercase tracking-widest text-[10px] mb-3">First Class Services</span>
                     <h3 className="text-3xl text-white font-serif font-bold">Réservation & Conciergerie 24/7</h3>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* ── 6. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.08),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-5xl md:text-[8rem] text-white font-bold leading-[0.85] mb-16 tracking-tighter">
                 Décollage <br /> <span className="text-primary italic">Immédiat</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                 <Link href="/contact" className="px-16 py-7 bg-primary text-black font-bold uppercase tracking-[0.4em] text-xs hover:bg-white transition-all shadow-[0_30px_100px_rgba(197,160,89,0.25)]">
                   Ouvrir un Dossier Vol
                 </Link>
                 <div className="flex items-center gap-4">
                    <Plane size={20} className="text-primary/60" />
                    <span className="text-white/30 uppercase tracking-[0.3em] font-bold text-[10px]">Wander Global Aviation</span>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
