"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, Globe, MessageSquare } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    icon: Phone,
    label: "Ligne Directe & WhatsApp",
    value: "+212 702 093 107",
    sub: "Disponible 24h/24 pour urgences VIP",
    href: "tel:+212702093107",
  },
  {
    icon: Mail,
    label: "Service Client Général",
    value: "contact@wandertravel-event.com",
    sub: "Réponse sous 2 heures ouvrées",
    href: "mailto:contact@wandertravel-event.com",
  },
  {
    icon: MessageSquare,
    label: "Projets & Devis",
    value: "sales@wandertravel-event.com",
    sub: "MICE, Aviation & Corporate",
    href: "mailto:sales@wandertravel-event.com",
  },
  {
    icon: MapPin,
    label: "Siège Social",
    value: "36 Rue Oulad Mhanna, Casablanca",
    sub: "Quartier Gauthier, Maroc",
    href: "https://maps.google.com/?q=36+Rue+Oulad+Mhanna+Casablanca+Maroc",
  },
];

const services = [
  "MICE & Séminaires",
  "Aviation Privée",
  "VIP Limousines",
  "Packages Signature",
  "Digital Studio",
  "Autre demande spécifique",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".parallax-contact", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-contact",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/20">
      <Header />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[70vh] flex items-center justify-center pt-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="parallax-contact w-full h-full object-cover brightness-[0.3] scale-110">
            <source src="https://videos.pexels.com/video-files/3129957/3129957-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-primary tracking-[0.5em] uppercase text-xs font-bold mb-8 block"
          >
            Écrivons votre prochaine Expérience
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif font-bold text-white mb-10 leading-[1.1]"
          >
            Parlons de votre <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic pr-4">
              Ambition
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="text-lg text-white/40 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Une demande urgente ? Un projet d'envergure ? 
            Nous vous répondons sous 120 minutes.
          </motion.p>
        </div>
      </section>

      {/* ── 2. CONTACT HUB ───────────────────────────────────────────────── */}
      <section className="py-32 bg-background relative z-10">
        <div className="container mx-auto px-6 max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
              
              {/* Left: Info Cards */}
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                 <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Centrale Opérationnelle</span>
                 <h2 className="font-serif text-4xl text-white font-bold mb-10 leading-snug">Disponibilité Totale, <br /> Partout dans le Monde.</h2>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                    {contactInfo.map((info, i) => (
                      <motion.a 
                        key={i} 
                        href={info.href}
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="p-8 border border-white/5 bg-white/[0.015] rounded-[2rem] hover:border-primary/20 transition-all group"
                      >
                         <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-500">
                            <info.icon size={24} strokeWidth={1.5} />
                         </div>
                         <div className="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-bold">{info.label}</div>
                         <div className="text-white font-bold text-sm mb-1">{info.value}</div>
                         <div className="text-white/20 text-[11px] font-serif italic lowercase">{info.sub}</div>
                      </motion.a>
                    ))}
                 </div>

                 <div className="pt-10 border-t border-white/5 flex flex-wrap gap-10 items-center">
                    <div>
                       <div className="text-primary font-serif italic text-3xl mb-1">2h</div>
                       <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Délai de Réponse Max</div>
                    </div>
                    <div className="w-px h-12 bg-white/5 hidden sm:block" />
                    <div>
                       <div className="text-primary font-serif italic text-3xl mb-1">24/7</div>
                       <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Assistance VIP</div>
                    </div>
                 </div>
              </motion.div>

              {/* Right: Concierge Form */}
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                 <div className="relative p-10 md:p-16 border border-white/10 bg-white/[0.015] backdrop-blur-xl rounded-[3rem] overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                       <Globe size={150} strokeWidth={0.5} className="text-primary" />
                    </div>

                    {submitted ? (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                         <div className="w-24 h-24 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-primary mb-8">
                            <CheckCircle2 size={48} strokeWidth={1} />
                         </div>
                         <h3 className="font-serif text-3xl text-white font-bold mb-4">Demande Reçue</h3>
                         <p className="text-white/40 font-light max-w-sm">Un chef de projet dédié analyse votre demande et vous recontactera personnellement.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                         <div className="flex flex-col gap-2 mb-10">
                            <h3 className="font-serif text-3xl text-white font-bold">Formulaire Conciergerie</h3>
                            <p className="text-white/40 text-sm font-light">Veuillez renseigner les détails critiques de votre projet.</p>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <label className="text-[10px] text-primary/60 uppercase tracking-widest font-bold px-2">Identité</label>
                               <input required type="text" placeholder="Nom Complet" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-light placeholder:text-white/10" />
                            </div>
                            <div className="space-y-4">
                               <label className="text-[10px] text-primary/60 uppercase tracking-widest font-bold px-2">Coordonnées</label>
                               <input required type="email" placeholder="Email Professionnel" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-light placeholder:text-white/10" />
                            </div>
                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                               <label className="text-[10px] text-primary/60 uppercase tracking-widest font-bold px-2">Téléphone</label>
                               <input required type="tel" placeholder="+212 ..." className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-light placeholder:text-white/10" />
                            </div>
                            <div className="space-y-4">
                               <label className="text-[10px] text-primary/60 uppercase tracking-widest font-bold px-2">Type de Service</label>
                               <select required className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white/60 text-sm focus:outline-none focus:border-primary/50 transition-all font-light appearance-none">
                                  {services.map(s => <option key={s} value={s} className="bg-black">{s}</option>)}
                               </select>
                            </div>
                         </div>

                         <div className="space-y-4">
                            <label className="text-[10px] text-primary/60 uppercase tracking-widest font-bold px-2">Détails Critiques</label>
                            <textarea required rows={4} placeholder="Dates, destinations, nombre de pax, budget indicatif..." className="w-full bg-white/5 border border-white/5 rounded-3xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-light placeholder:text-white/10 resize-none" />
                         </div>

                         <button 
                            disabled={loading}
                            type="submit" 
                            className="w-full py-6 bg-primary text-black font-bold uppercase tracking-[0.4em] text-xs hover:bg-white transition-all shadow-[0_30px_100px_rgba(197,160,89,0.15)] flex items-center justify-center gap-4"
                         >
                            {loading ? <span className="animate-pulse">Transmission...</span> : <>Envoyer le Dossier <Send size={14} /></>}
                         </button>
                      </form>
                    )}
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* ── 3. MAP FOCUS ─────────────────────────────────────────────────── */}
      <section className="h-[60vh] bg-background relative overflow-hidden flex items-center justify-center border-t border-white/5">
         <div className="absolute inset-0 z-0 grayscale opacity-20 contrast-125 brightness-50">
            <img 
               src="https://images.unsplash.com/photo-1548013146-72479768b921?auto=format&fit=crop&w=2000&q=80" 
               className="w-full h-full object-cover" 
               alt="Map Global"
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
         
         <div className="relative z-10 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
               <div className="w-20 h-20 rounded-full border border-primary/20 bg-primary/10 flex items-center justify-center text-primary mx-auto mb-10">
                  <MapPin size={32} />
               </div>
               <h3 className="font-serif text-3xl text-white font-bold mb-4">Centres Opérationnels</h3>
               <p className="text-white/40 uppercase tracking-[0.4em] font-bold text-[10px]">Casablanca | Marrakech | Dubai | Paris</p>
            </motion.div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
