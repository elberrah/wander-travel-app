"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { ArrowRight, MapPin, Star, Compass, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const destinationRegions = [
  {
    name: "Maroc Imperial & Désert",
    subtitle: "Notre Terre Natale",
    img: "/images/destination/DISTINATION  (1).jpg",
    desc: "Marrakech, Agafay, Casablanca. L'hospitalité marocaine élevée au rang d'art diplomatique.",
    features: ["Palaces Exclusifs", "Désert & Bivouacs", "Golf de Prestige"],
  },
  {
    name: "Espaces Europe",
    subtitle: "Héritage Corporate",
    img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
    desc: "Paris, Madrid, Londres. Les capitales du business avec une logistique Wander sans couture.",
    features: ["Hôtels Iconiques", "Accès Sold-out Events", "Coordination Multi-sites"],
  },
  {
    name: "Golfe & Moyen-Orient",
    subtitle: "L'Ère de l'Opulence",
    img: "/images/destination/DISTINATION  (4).JPG",
    desc: "Dubaï, Doha, AlUla. L'avant-garde du luxe et du business international.",
    features: ["Suites Burj Al Arab", "Protocoles VIP Arrivée", "Expériences Golfiques"],
  },
  {
    name: "Afrique & Océan Indien",
    subtitle: "Exploration Sauvage",
    img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    desc: "Kenya, Maurice, Seychelles. Des retraites exclusives pour cadres et délégations.",
    features: ["Safaris Privatisés", "Villas Bord de Mer", "Héli-transferts"],
  },
];

export default function DestinationsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-dest", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-dest",
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
      <section className="relative h-screen flex items-center justify-center pt-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/02_Offres_Entreprise/04_sales_kickoff.jpg"
            className="parallax-dest w-full h-full object-cover brightness-[0.35] scale-110"
            alt="Maroc - Agafay - Atlas"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="w-20 h-20 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md flex items-center justify-center text-primary mx-auto mb-10"
          >
            <Compass size={32} strokeWidth={1} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[10rem] font-serif font-bold text-white mb-10 leading-[0.85] tracking-tighter"
          >
             Le Monde <br /> 
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic pr-8">Wander</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Du cœur battant de Marrakech aux centres financiers de Tokyo. 
            Découvrez nos destinations de prédilection, opérées avec une excellence sans compromis.
          </motion.p>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <div className="w-px h-20 bg-gradient-to-b from-primary to-transparent" />
        </motion.div>
      </section>

      {/* ── 2. GLOBAL FOOTPRINT ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#080808] border-b border-white/5">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
               {[
                 { label: "Maroc", sub: "ADN Local" },
                 { label: "Europe", sub: "Capitaux Internationaux" },
                 { label: "Moyen-Orient", sub: "Expansion & Luxe" },
                 { label: "Afrique", sub: "Opportunités Émergentes" },
               ].map((item, i) => (
                 <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="text-white font-serif italic text-2xl mb-2">{item.label}</div>
                    <div className="text-primary tracking-widest uppercase text-[9px] font-bold opacity-60">{item.sub}</div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ── 3. DESTINATIONS GRID ────────────────────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {destinationRegions.map((dest, i) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.8 }}
                  className="group relative h-[600px] rounded-[3rem] overflow-hidden border border-white/5 bg-white/[0.01]"
                >
                   <img src={dest.img} className="absolute inset-0 w-full h-full object-cover brightness-[0.45] group-hover:scale-105 transition-transform duration-[3000ms]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                   
                   <div className="absolute inset-x-0 bottom-0 p-12 lg:p-16">
                      <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">{dest.subtitle}</span>
                      <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 transition-colors group-hover:text-primary">{dest.name}</h3>
                      <p className="text-white/40 text-sm mb-10 font-light leading-relaxed max-w-md">{dest.desc}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                         {dest.features.map(f => (
                           <div key={f} className="flex items-center gap-3 text-white/60 text-xs lowercase italic">
                              <Star size={10} className="text-primary/60 shrink-0" />
                              {f}
                           </div>
                         ))}
                      </div>

                      <Link href="/contact" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white">
                         Ouvrir un Dossier Voyage <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform text-primary" />
                      </Link>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── 4. CONCIERGE EXPERIENCE ──────────────────────────────────────── */}
      <section className="py-32 bg-[#080808] border-y border-white/5">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 font-serif italic">The Wanderer's Concierge</span>
                  <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-10 leading-tight">Un Expert Local, <br /> Dans Chaque Hub.</h2>
                  <p className="text-white/30 font-light text-lg mb-12 leading-relaxed">
                     Que vous soyez à la Mamounia de Marrakech ou au Claridge's de Londres, votre assistant Wander orchestre vos besoins en temps réel. Accès aux clubs fermés, réservations prioritaires et facilitation diplomatique.
                  </p>
                  
                  <div className="space-y-6">
                     {[
                       { t: "Maroc", d: "Maîtrise totale des palaces et déserts privatifs." },
                       { t: "International", d: "Réseau de 1 500+ hôtels 5* avec avantages VIP." },
                       { t: "Logistique", d: "Liaisons jets privés et hélicoptères en 4h." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-6 group">
                          <div className="w-12 h-12 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center shrink-0 group-hover:border-primary/20 transition-all font-serif italic text-primary">0{i+1}</div>
                          <div>
                             <h4 className="text-white font-bold text-sm mb-1">{item.t}</h4>
                             <p className="text-white/20 text-xs font-light">{item.d}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </motion.div>

               <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                  <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/5">
                     <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover brightness-[0.5]" alt="Concierge" />
                     <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                     <div className="absolute bottom-16 left-16 right-16">
                        <div className="p-10 border border-white/10 bg-black/40 backdrop-blur-xl rounded-[2.5rem]">
                           <MapPin size={32} className="text-primary mb-6" />
                           <h4 className="text-white font-bold text-2xl mb-4 italic font-serif">La Maîtrise des Détails</h4>
                           <p className="text-white/40 text-sm font-light">Nous ne listons pas des lieux, nous louons des héritages.</p>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* ── 5. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-48 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.06),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-5xl md:text-[8rem] text-white font-bold leading-[0.85] mb-20 tracking-tighter">
                 Votre Itinéraire <br /> <span className="text-primary italic">Commence Ici</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                 <Link href="/contact" className="px-16 py-7 bg-primary text-black font-bold uppercase tracking-[0.4em] text-xs hover:bg-white transition-all shadow-[0_30px_100px_rgba(197,160,89,0.2)]">Ouvrir un Dossier</Link>
                 <div className="flex items-center gap-6 justify-center">
                    <Globe size={24} className="text-primary/60" />
                    <span className="text-white/30 uppercase tracking-[0.3em] font-bold text-[10px]">Wander Global Logistics</span>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
