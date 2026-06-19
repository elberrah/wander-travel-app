"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { CheckCircle2, Shield, Star, Clock, Globe, MapPin } from "lucide-react";
import { Reveal } from "@/components/providers/transitions";
import { HeroGlobe } from "@/components/ui/hero-globe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const vipFleet = [
  {
    model: "Mercedes-Maybach S-Class",
    category: "Ultra-Luxe",
    desc: "Le summum du confort exécutif avec sièges massants et discrétion absolue.",
    features: ["Sièges Inclinables", "Minibar", "Wifi 5G", "Silence Total"],
    img: "/images/services/mobilite-vip/VIP VOITURE (1).jpg",
  },
  {
    model: "Range Rover Autobiography",
    category: "Executive SUV",
    desc: "Puissance et prestige pour vos déplacements urbains ou transferts longue distance.",
    features: ["Toutes Terrains", "Cuir Nappa", "Délégations"],
    img: "/images/services/hebergement-palace-stay/HOTEL (1).jpg", // Real user photo mixed in
  },
  {
    model: "Mercedes Sprinter VIP",
    category: "Business Jet on Wheels",
    desc: "Configuration salon pour vos délégations et réunions mobiles.",
    features: ["8 Passagers", "Espace Lounge", "Blue LED", "Table de travail"],
    img: "/images/services/mobilite-vip/VIP VOITURE (2).jpg",
  },
  {
    model: "V-Class Luxury",
    category: "Executive Van",
    desc: "L'outil parfait pour vos transferts d'affaires groupés.",
    features: ["Chauffeur Dédié", "Confort Mobile", "Discrétion"],
    img: "/images/services/mobilite-vip/VIP VOITURE (1).jpg",
  },
];

const galleryVip = [
  { src: "/images/services/mobilite-vip/VIP VOITURE (1).jpg", caption: "Cockpit Excellence", type: "Interior" },
  { src: "/images/services/aviation-fast-track/jet prive/jet prive (2).jpg", caption: "Authentic VIP Check", type: "Real" }, // Real user photo
  { src: "/images/services/aviation-fast-track/jet prive/jet prive (3).jpg", caption: "Precision Fleet", type: "Real" }, // Real user photo
  { src: "/images/services/mobilite-vip/VIP VOITURE (4).jpg", caption: "Prestige Details", type: "Luxe" },
];

export default function VipLimousinesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-vip", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-vip",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      <Header />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-center justify-center pt-24 overflow-hidden border-b border-white/5 bg-[#050505]">
        {/* 3D Globe Background Overlay */}
        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
          <HeroGlobe />
        </div>
        
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay loop muted playsInline
            className="parallax-vip w-full h-full object-cover brightness-[0.25] scale-125"
          >
            <source src="https://videos.pexels.com/video-files/3773461/3773461-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center max-w-5xl">
          <Reveal>
            <div className="text-primary tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold mb-8 block drop-shadow-lg">
              Mobilité Prestige & Chauffeurs VIP
            </div>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-10 leading-[1] drop-shadow-2xl">
              L'Élite, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic pr-4">
                Sans Compromis.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto mb-14">
              Découvrez une mobilité qui mêle authenticité de terrain et excellence internationale.
            </p>
            <div className="flex justify-center">
               <Link href="/contact" className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-105 transition-all shadow-[0_0_60px_rgba(197,160,89,0.3)] rounded-sm">
                  Réserver mon Chauffeur
               </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. SERVICES VIP ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#080808] border-b border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
           <Reveal>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { icon: <Shield size={32} />, title: "Sécurité & Discret", desc: "Chauffeurs formés aux protocoles de protection." },
                  { icon: <Clock size={32} />, title: "Réactivité 24/7", desc: "Prêt à opérer à tout moment." },
                  { icon: <Globe size={32} />, title: "Réseau Maroc & Global", desc: "Expertise locale ancrée dans le terrain." },
                ].map((s, i) => (
                  <div key={i} className="flex gap-6">
                     <div className="text-primary shrink-0">{s.icon}</div>
                     <div>
                        <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                        <p className="text-white/40 font-light text-sm leading-relaxed">{s.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
           </Reveal>
        </div>
      </section>

      {/* ── 3. LA FLOTTE MIXTE (Premium + Authentic) ────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="text-center mb-24">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-5 block">Vaisseaux & Opérations</span>
              <h2 className="font-serif text-4xl md:text-6xl text-white font-bold">L'Authenticité du Luxe</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {vipFleet.map((car, i) => (
                <motion.div
                  key={car.model}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="group relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.01] hover:border-primary/20 transition-all"
                >
                   <div className="aspect-[16/9] overflow-hidden">
                      <img src={car.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms] brightness-90 group-hover:brightness-50" />
                      <div className="absolute top-4 left-4">
                         <span className="text-[10px] uppercase font-bold tracking-widest px-3 py-1 bg-black/60 text-primary border border-primary/20 rounded-full">{car.category}</span>
                      </div>
                   </div>
                   <div className="p-10">
                      <h3 className="text-2xl font-serif font-bold text-white mb-4 transition-colors group-hover:text-primary">{car.model}</h3>
                      <p className="text-white/40 text-sm mb-8 font-light max-w-sm">{car.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {car.features.map(f => (
                          <span key={f} className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/5 bg-white/[0.02] text-white/60 group-hover:text-primary group-hover:border-primary/20 transition-all rounded-full">{f}</span>
                        ))}
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── 4. GALERIE MIXTURE ────────────────────────────────────────────── */}
      <section className="py-32 bg-[#080808] border-y border-white/5">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
                  {galleryVip.map((img, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="aspect-square rounded-2xl overflow-hidden group border border-white/5">
                       <img src={img.src} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                       <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-primary font-bold text-[10px] uppercase tracking-widest">{img.caption}</span>
                       </div>
                    </motion.div>
                  ))}
               </div>
               <div className="order-1 lg:order-2">
                  <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                     <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Le Terrain & L'Excellence</span>
                     <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-8 leading-tight">Une Flotte Vivante</h2>
                     <p className="text-white/40 font-light text-lg mb-10 leading-relaxed">
                        Nos photos ne sont pas que des clichés de studio. Elles reflètent la réalité de nos opérations quotidiennes au service des plus grandes institutions et personnalités.
                     </p>
                     <ul className="space-y-6">
                        <li className="flex gap-5">
                            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center shrink-0">
                               <CheckCircle2 size={16} className="text-primary" />
                            </div>
                            <div>
                               <h4 className="text-white font-bold mb-1">Audit Flotte</h4>
                               <p className="text-white/30 text-xs font-light">Maintenance rigoureuse et propreté clinique garantie avant chaque mission.</p>
                            </div>
                        </li>
                     </ul>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
