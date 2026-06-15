"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ArrowRight, Clock, Tag } from "lucide-react";

const articles = [
  {
    category: "Conseils Voyage",
    tag: "Business Travel",
    date: "Avril 2026",
    readTime: "5 min",
    title: "Comment optimiser vos déplacements d'affaires au Maroc",
    excerpt: "Transferts VIP, protocole aéroport et hébergement premium : nos conseils pour des déplacements fluides et sans stress à Casablanca, Marrakech et Rabat.",
    image: "/images/services/aviation-fast-track/avion commercial/avion-commercial-coucher.jpg",
    href: "#",
  },
  {
    category: "Tendances Événementielles",
    tag: "MICE",
    date: "Mars 2026",
    readTime: "7 min",
    title: "Les nouvelles tendances des séminaires corporate en 2026",
    excerpt: "Formats hybrides, immersion nature, design d'expérience : découvrez comment les entreprises réinventent leurs séminaires pour maximiser l'engagement.",
    image: "/images/services/seminaires-conferences/seminaire (2).jpg",
    href: "#",
  },
  {
    category: "Guides Destinations",
    tag: "Marrakech",
    date: "Février 2026",
    readTime: "6 min",
    title: "Marrakech pour les incentives corporate : notre guide complet",
    excerpt: "De l'hébergement en riad de luxe aux activités culturelles scénarisées, notre guide pour organiser un incentive mémorable à Marrakech.",
    image: "/images/destination/DISTINATION  (2).jpg",
    href: "#",
  },
  {
    category: "Actualités Wander",
    tag: "Corporate",
    date: "Janvier 2026",
    readTime: "3 min",
    title: "Wander lance son nouveau pôle Employee Benefits",
    excerpt: "Wander élargit son offre corporate avec une solution dédiée aux avantages collaborateurs. Découvrez comment en faire bénéficier vos équipes.",
    image: "/images/services/incentive-team-building/team-bulding (1).jpg",
    href: "#",
  },
  {
    category: "Conseils Voyage",
    tag: "VIP",
    date: "Décembre 2025",
    readTime: "4 min",
    title: "Jet privé vs vol commercial : ce que nos clients corporate choisissent",
    excerpt: "Analyse des critères de décision pour les dirigeants et équipes de direction : gain de temps, confidentialité et confort sont-ils suffisants ?",
    image: "/images/services/aviation-fast-track/jet prive/jet prive (2).jpg",
    href: "#",
  },
  {
    category: "Tendances Événementielles",
    tag: "Teambuilding",
    date: "Novembre 2025",
    readTime: "5 min",
    title: "Team building en 2026 : au-delà des activités classiques",
    excerpt: "Ateliers gastronomiques, expériences nature, studios créatifs : les nouvelles formules qui créent un impact durable sur la cohésion d'équipe.",
    image: "/images/services/incentive-team-building/team-bulding (2).jpg",
    href: "#",
  },
];

const categories = ["Tous", "Conseils Voyage", "Tendances Événementielles", "Guides Destinations", "Actualités Wander"];

export default function Blog() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.06),transparent_60%)]" />
        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-primary tracking-[0.4em] uppercase text-xs font-bold mb-6 block"
          >
            Le Magazine Wander
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight tracking-tight mb-6"
          >
            Conseils, Tendances &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic">
              Inspirations
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-white/50 font-light leading-relaxed max-w-xl mx-auto"
          >
            Décryptages, guides destinations, tendances événementielles et actualités Wander. Le regard de nos experts pour enrichir vos projets.
          </motion.p>
        </div>
      </section>

      {/* FILTERS */}
      <div className="relative z-10 pb-12 flex justify-center">
        <div className="flex flex-wrap gap-3 px-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border transition-all ${
                cat === "Tous"
                  ? "bg-primary text-black border-primary"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES */}
      <section className="relative z-10 pb-32">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Featured */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            <Link href={articles[0].href} className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 bg-[#0a0a0a] h-[500px] flex flex-col justify-end">
              <img src={articles[0].image} alt={articles[0].title} className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-primary/90 text-black text-[9px] font-bold uppercase tracking-widest rounded-full">{articles[0].tag}</span>
                  <span className="text-white/30 text-[10px] flex items-center gap-1.5"><Clock size={10} />{articles[0].readTime}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-white font-bold mb-3 group-hover:text-primary transition-colors leading-snug">{articles[0].title}</h2>
                <p className="text-white/50 font-light text-sm leading-relaxed">{articles[0].excerpt}</p>
              </div>
            </Link>
            <Link href={articles[1].href} className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 bg-[#0a0a0a] h-[500px] flex flex-col justify-end">
              <img src={articles[1].image} alt={articles[1].title} className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:scale-105 group-hover:brightness-[0.45] transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="relative z-10 p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/10 text-white text-[9px] font-bold uppercase tracking-widest rounded-full border border-white/20">{articles[1].tag}</span>
                  <span className="text-white/30 text-[10px] flex items-center gap-1.5"><Clock size={10} />{articles[1].readTime}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-white font-bold mb-3 group-hover:text-primary transition-colors leading-snug">{articles[1].title}</h2>
                <p className="text-white/50 font-light text-sm leading-relaxed">{articles[1].excerpt}</p>
              </div>
            </Link>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.slice(2).map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={article.href} className="group flex flex-col rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 bg-[#0a0a0a] h-full">
                  <div className="relative h-44 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-primary text-[9px] font-bold uppercase tracking-wider">{article.tag}</span>
                      <span className="text-white/20">•</span>
                      <span className="text-white/30 text-[9px] flex items-center gap-1"><Clock size={9} />{article.readTime}</span>
                    </div>
                    <h3 className="font-serif text-base text-white font-bold mb-2 group-hover:text-primary transition-colors leading-snug">{article.title}</h3>
                    <p className="text-white/40 font-light text-xs leading-relaxed line-clamp-3">{article.excerpt}</p>
                    <div className="mt-auto pt-4 flex items-center gap-1 text-primary text-[10px] font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
                      Lire <ArrowRight size={10} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
