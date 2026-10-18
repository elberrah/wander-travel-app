"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Reveal } from "@/components/providers/transitions";
import { HeroGlobe } from "@/components/ui/hero-globe";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Globe, Shield, Zap, Star, Layout, Laptop } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const mainExpertises = [
  {
    id: "01",
    title: "Voyages & Aviation",
    desc: "Billetterie corporate, affrètement de jets privés et hélicoptères.",
    features: ["Conciergerie 24/7", "Accès Salons VIP", "Fast Track Tarmac"],
    img: "/images/services/aviation-fast-track/avion-commercial-vol.jpg",
    href: "/aviation"
  },
  {
    id: "02",
    title: "Corporate & MICE",
    desc: "Séminaires, congrès et lancements de produits d'exception.",
    features: ["Chef de Projet Dédié", "Réseau 1500+ Hôtels", "Logistique Horlogère"],
    img: "/images/02_Offres_Entreprise/05_incentive.jpg",
    href: "/corporate"
  },
  {
    id: "03",
    title: "VIP Mobility",
    desc: "Transferts prestige et chauffeurs de direction.",
    features: ["Maybach & Mercedes S", "Chauffeurs Polyglottes", "Sécurité Renforcée"],
    img: "/images/services/mobilite-vip/VIP VOITURE (1).jpg",
    href: "/vip"
  },
  {
    id: "04",
    title: "Fast Track & Escorte",
    desc: "Escorte aéroportuaire VIP et accès aux salons privés mondiaux.",
    features: ["Priorité Immigration", "Bagagiste Dédié", "Salons Grand Luxe"],
    img: "/images/02_Offres_Entreprise/06_guest_desk.jpg",
    href: "/aviation"
  },
  {
    id: "05",
    title: "Digital Studio",
    desc: "Captation, design et solutions digitales événementielles.",
    features: ["Production 4K Live", "Branding Luxe", "Billetterie Digitale"],
    img: "/images/experience-blocks/conference-stage/digital-studio.png",
    href: "/services"
  },
];

const detailedServices = [
  {
    category: "L'Univers Aérien",
    title: "Priorité & Mobilité Globale",
    desc: "Nous optimisons vos flux de voyage pour que votre temps reste votre atout le plus précieux.",
    items: [
      { t: "Billetterie Optimisée", d: "Gestion proactive des tarifs et modifications." },
      { t: "Jets & Hélicoptères", d: "Affrètement de dernière minute (décollage 4h)." },
      { t: "Fast Track Global", d: "Escorte aéroportuaire dans le monde entier." }
    ]
  },
  {
    category: "L'Ingénierie MICE",
    title: "Événements Stratégiques",
    desc: "Du comité de direction restreint au congrès de 1 000 participants.",
    items: [
      { t: "Sourcing Lieux", d: "Accès exclusif aux plus beaux palaces." },
      { t: "Scénographie Immérsive", d: "Design sonore et visuel de pointe." },
      { t: "Incentive & Team Building", d: "Expériences transformatrices et ROI." }
    ]
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-services", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-services",
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
      <section className="relative h-[85vh] flex items-center justify-center pt-24 overflow-hidden border-b border-white/5 bg-[#050505]">
        {/* 3D Globe Background Overlay */}
        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
          <HeroGlobe />
        </div>
        
        <div className="absolute inset-0 z-0">
          <video
            autoPlay loop muted playsInline
            className="parallax-services w-full h-full object-cover brightness-[0.2] scale-110"
          >
            <source src="https://videos.pexels.com/video-files/2169880/2169880-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center max-w-5xl">
          <Reveal>
            <div className="text-primary tracking-[0.5em] uppercase text-[10px] md:text-xs font-bold mb-8 block">
              Services & Solutions Globales
            </div>
            <h1 className="text-5xl md:text-[8rem] font-serif font-bold text-white mb-10 leading-[0.9] tracking-tighter">
              L'Excellence <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic">Opérationnelle</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 font-light max-w-3xl mx-auto mb-16 leading-relaxed">
              Un interlocuteur unique pour orchestrer vos voyages d'affaires, vos événements MICE et votre mobilité prestige, du Maroc au reste du monde.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 2. STATS & WHY ───────────────────────────────────────────────── */}
      <section className="py-24 bg-[#080808] border-b border-white/5">
         <div className="container mx-auto px-6 max-w-7xl">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                 <div>
                    <h2 className="font-serif text-4xl text-white font-bold mb-8 leading-snug">Votre réussite, notre seule mesure de performance.</h2>
                    <p className="text-white/40 font-light text-lg mb-10">Depuis 17 ans, nous transformons chaque mission en un standard d'excellence, alliant discrétion diplomatique et réactivité absolue.</p>
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <div className="text-3xl font-serif font-bold text-primary mb-1">1 500+</div>
                          <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Hôtels Partenaires</div>
                       </div>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { icon: <Shield size={20} />, t: "Confidentialité Protégée", d: "Gestion sécurisée des données et identités." },
                      { icon: <Zap size={20} />, t: "Réactivité 120min", d: "Première proposition technique transmise en 2h." },
                      { icon: <Globe size={20} />, t: "Logistique 360", d: "Maîtrise totale de la chaîne de valeur." },
                      { icon: <Star size={20} />, t: "Sur-mesure Radical", d: "Aucun template, que de la création pure." },
                    ].map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 border border-white/5 bg-white/[0.015] rounded-3xl">
                         <div className="text-primary mb-4">{item.icon}</div>
                         <h4 className="text-white font-bold text-sm mb-2">{item.t}</h4>
                         <p className="text-white/30 text-[11px] leading-relaxed">{item.d}</p>
                      </motion.div>
                    ))}
                 </div>
              </div>
            </Reveal>
         </div>
      </section>

      {/* ── 3. EXPERTISES GRILLE ─────────────────────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="text-center mb-24">
              <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-5 block">Pôles d'Excellence</span>
              <h2 className="font-serif text-4xl md:text-6xl text-white font-bold">Nos Domaines d'Intervention</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {mainExpertises.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="group relative flex flex-col h-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.015] hover:border-primary/20 transition-all"
                >
                   <div className="aspect-[4/3] overflow-hidden">
                      <img src={s.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] brightness-75 group-hover:brightness-50" />
                   </div>
                   <div className="p-10 flex-1 flex flex-col">
                      <div className="text-primary font-serif italic text-3xl mb-4 opacity-40">{s.id}</div>
                      <h3 className="text-2xl font-serif font-bold text-white mb-6 transition-colors group-hover:text-primary">{s.title}</h3>
                      <p className="text-white/40 text-sm mb-8 font-light flex-1">{s.desc}</p>
                      <ul className="space-y-3 mb-8 pt-6 border-t border-white/5">
                        {s.features.map(f => (
                          <li key={f} className="flex items-center gap-3 text-white/60 text-xs lowercase italic">
                             <CheckCircle2 size={12} className="text-primary/60 shrink-0" />
                             {f}
                          </li>
                        ))}
                      </ul>
                      <Link href={s.href} className="group flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                         Détails <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* ── 4. PACKAGES SUR-MESURE ───────────────────────────────────────── */}
      <section className="py-32 bg-[#080808] border-y border-white/5 relative overflow-hidden">
         <div className="absolute inset-0 z-0 opacity-10">
            <img src="/images/destination/DISTINATION  (5).png" className="w-full h-full object-cover" />
         </div>
         <div className="container mx-auto px-6 max-w-7xl relative z-10">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
               <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:w-1/3">
                  <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 block">Solutions Prêtes</span>
                  <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-10 leading-tight">Nos Packages Signature</h2>
                  <p className="text-white/40 font-light text-lg mb-12">Pour simplifier vos décisions critiques, nous avons conçu des offres packagées entièrement modulables selon vos ambitions.</p>
                  
                  <div className="p-10 rounded-[2.5rem] bg-primary text-black">
                     <h4 className="font-bold text-xl mb-4">Besoin d'un audit complet sur votre budget voyage ?</h4>
                     <Link href="/contact" className="inline-flex items-center gap-3 font-bold uppercase tracking-widest text-[10px] bg-black text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
                        Prendre rendez-vous <ArrowRight size={14} />
                     </Link>
                  </div>
               </motion.div>
               
               <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    { t: "Executive VIP", d: "Aviation privée, protocoles de sécurité et hôtellerie 5* exclusive." },
                    { t: "Business Travel Premium", d: "Optimisation des flux corporate, Fast Track et billetterie 24/7." },
                    { t: "MICE Strategy", d: "Organisation de séminaires et congrès de direction avec ROI mesuré." },
                    { t: "Incentive Pulse", d: "Programmes de motivation transformateurs et expériences hors-normes." }
                  ].map((pkg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-10 border border-white/10 bg-black/40 backdrop-blur-md rounded-[2.5rem] group hover:border-primary/30 transition-all">
                       <h3 className="text-white font-bold text-xl mb-4 group-hover:text-primary transition-colors">{pkg.t}</h3>
                       <p className="text-white/30 text-sm font-light leading-relaxed mb-8">{pkg.d}</p>
                       <Link href="/contact" className="text-[10px] font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors">Découvrir l'offre →</Link>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* ── 5. DIGITAL STUDIO FOCUS ──────────────────────────────────────── */}
      <section className="py-32 bg-background">
         <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 lg:order-1">
                      <img src="/images/experience-blocks/conference-stage/digital-studio.png" className="w-full h-full object-cover rounded-[3rem] shadow-2xl brightness-90 hover:brightness-110 transition-all duration-1000" />
               </motion.div>
               <div className="order-1 lg:order-2">
                  <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                     <span className="text-primary font-bold tracking-[0.4em] uppercase text-xs mb-6 font-serif italic">The Wander Lab</span>
                     <h2 className="font-serif text-4xl md:text-6xl text-white font-bold mb-10 leading-tight">Wander <br /> Digital Studio</h2>
                     <p className="text-white/40 font-light text-lg mb-12 leading-relaxed">
                        Chaque événement mérite une résonance numérique. Notre studio interne conçoit vos plateformes, capte vos moments en 4K et gère votre billetterie digitale avec une direction artistique de haut vol.
                     </p>
                     
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        <div>
                           <div className="flex items-center gap-3 mb-4">
                              <Layout size={18} className="text-primary" />
                              <h4 className="text-white font-bold text-sm">UI/UX Événementiel</h4>
                           </div>
                           <p className="text-white/30 text-xs font-light font-serif lowercase italic">Sites web, Apps & Landing pages dédiées.</p>
                        </div>
                        <div>
                           <div className="flex items-center gap-3 mb-4">
                              <Laptop size={18} className="text-primary" />
                              <h4 className="text-white font-bold text-sm">Production Live</h4>
                           </div>
                           <p className="text-white/30 text-xs font-light font-serif lowercase italic">Streaming multi-caméras 4K & Real-time coverage.</p>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>

      {/* ── 6. FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="py-48 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.06),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-primary font-bold tracking-[0.5em] uppercase text-xs mb-10 block">Prêt à Transformer votre Vision ?</span>
              <h2 className="font-serif text-5xl md:text-[10rem] text-white font-bold leading-[0.85] mb-20 tracking-tighter">
                 Parlons de <br /> votre <br /> <span className="text-primary italic">Ambition</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                 <Link href="/contact" className="px-16 py-7 bg-primary text-black font-bold uppercase tracking-[0.4em] text-xs hover:bg-white transition-all shadow-[0_30px_100px_rgba(197,160,89,0.2)]">Ouvrir un Dossier</Link>
                 <Link href="/services" className="px-16 py-7 border border-white/10 text-white font-bold uppercase tracking-[0.4em] text-xs hover:border-primary hover:text-primary transition-all">Explorer les Expertises</Link>
              </div>
           </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
