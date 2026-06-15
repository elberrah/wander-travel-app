"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ArrowRight, Star } from "lucide-react";

const caseStudies = [
  {
    category: "MICE & Corporate",
    client: "Grand Compte B2B — Industrie",
    title: "Séminaire Stratégique 3 Jours",
    desc: "Coordination complète d'un séminaire de rentrée pour 120 participants. Hébergement 5 étoiles, plénières, ateliers et soirée de gala.",
    metrics: ["120 participants", "3 jours", "Marrakech"],
    image: "/images/services/seminaires-conferences/seminaire (1).jpg",
  },
  {
    category: "Incentive",
    client: "Équipe Commerciale — Services",
    title: "Programme Incentive Top Performers",
    desc: "Programme de récompense haut de gamme pour 40 commerciaux performants. Voyage sur mesure, activités exclusives et expériences premium.",
    metrics: ["40 participants", "5 jours", "Dubaï"],
    image: "/images/destination/DISTINATION  (1).jpg",
  },
  {
    category: "Aviation & VIP",
    client: "Direction Générale — Finance",
    title: "Déplacement Corporate Stratégique",
    desc: "Organisation complète d'un déplacement stratégique pour 8 dirigeants : jet privé, hôtel VIP, protocole et sécurité.",
    metrics: ["8 participants", "2 jours", "Paris — Genève"],
    image: "/images/services/aviation-fast-track/jet prive/jet prive (1).jpg",
  },
  {
    category: "Team Building",
    client: "Équipe RH — Technologie",
    title: "Team Day Cohésion Casablanca",
    desc: "Journée team building pour 80 collaborateurs. Activités créatives, déjeuner premium et cocktail de clôture en bord de mer.",
    metrics: ["80 participants", "1 journée", "Casablanca"],
    image: "/images/services/incentive-team-building/team-bulding (1).jpg",
  },
  {
    category: "Événement Privé",
    title: "Soirée de Gala Annuelle",
    client: "Groupe International — Retail",
    desc: "Conception et coordination d'une soirée de gala pour 200 personnes. Scénographie, animation, traiteur étoilé et prodution live.",
    metrics: ["200 invités", "1 soirée", "Rabat"],
    image: "/images/services/aviation-fast-track/jet prive/jet prive (2).jpg",
  },
  {
    category: "Guest Desk",
    title: "Forum International B2B",
    client: "Organisation sectorielle",
    desc: "Dispositif d'accueil VIP pour délégations internationales lors d'un forum de 3 jours. Transferts, hospitalité et coordination multilingue.",
    metrics: ["15 délégations", "3 jours", "Casablanca"],
    image: "/images/02_Offres_Entreprise/02_team_day.jpg",
  },
];

const testimonials = [
  {
    quote: "Wander a transformé notre séminaire annuel en un véritable moment fondateur pour nos équipes. Exécution parfaite, du premier contact au bilan post-événement.",
    author: "DRH, Groupe Industriel Marocain",
    stars: 5,
  },
  {
    quote: "Une réactivité et un professionnalisme remarquables. Notre direction a été transportée par la qualité des prestations. Nous renouvelons chaque année.",
    author: "Directeur Commercial, Société de Services",
    stars: 5,
  },
  {
    quote: "Le team day organisé par Wander a eu un impact direct sur la cohésion de nos équipes. Tout était pensé dans les moindres détails.",
    author: "Responsable RH, Startup Tech",
    stars: 5,
  },
];

export default function Realisations() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 grid grid-cols-3 gap-0">
          {["/images/02_Offres_Entreprise/02_team_day.jpg", "/images/services/seminaires-conferences/seminaire (1).jpg", "/images/services/aviation-fast-track/jet prive/jet prive (1).jpg"].map((src, i) => (
            <div key={i} className="relative overflow-hidden">
              <img src={src} alt="" className="w-full h-full object-cover brightness-[0.2]" />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background/70 to-background" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-primary tracking-[0.4em] uppercase text-xs font-bold mb-6 block"
          >
            Nos Réalisations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight tracking-tight mb-8"
          >
            L'Excellence en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic">
              Action
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Des missions corporate, des événements privés et des expériences VIP conçus et orchestrés avec soin. Voici quelques-uns de nos projets marquants.
          </motion.p>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <motion.div
                key={cs.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 bg-[#0a0a0a] flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={cs.image} alt={cs.title} className="w-full h-full object-cover brightness-[0.45] group-hover:scale-105 group-hover:brightness-[0.6] transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/60 border border-white/10 text-white/70 text-[9px] font-bold uppercase tracking-widest rounded-full backdrop-blur-sm">
                    {cs.category}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{cs.client}</p>
                  <h3 className="font-serif text-xl text-white font-bold mb-3 group-hover:text-primary transition-colors">{cs.title}</h3>
                  <p className="text-white/50 font-light text-sm leading-relaxed mb-6">{cs.desc}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {cs.metrics.map((m) => (
                      <span key={m} className="px-3 py-1 bg-white/[0.03] border border-white/5 text-white/40 text-[10px] font-medium rounded-full">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-32 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Ils nous font confiance</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">Témoignages Clients</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-8 border border-white/5 rounded-2xl bg-white/[0.015] hover:border-primary/20 transition-all flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={12} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-white/70 font-light leading-relaxed italic mb-6 flex-1">"{t.quote}"</p>
                <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em]">{t.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 py-24 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-6">Votre projet, notre prochaine réalisation</h2>
            <p className="text-white/40 max-w-xl mx-auto mb-10 font-light leading-relaxed">
              Chaque projet est unique. Partagez vos ambitions et découvrez comment Wander peut les concrétiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/contact" className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all">
                Démarrer un projet
              </Link>
              <Link href="/entreprise/offres" className="px-12 py-5 border border-white/20 text-white hover:border-primary hover:text-primary transition-all text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                Offres Entreprise <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
