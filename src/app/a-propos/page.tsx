"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ArrowRight, CheckCircle2, Award, Heart, Globe, Zap, Shield, Users } from "lucide-react";

const timeline = [
  { year: "2007", title: "Les Débuts", desc: "Création de Wander avec une vision claire : offrir des expériences de voyage sur mesure, sans compromis." },
  { year: "2012", title: "L'Expansion Corporate", desc: "Développement du pôle entreprise. Premiers grands comptes MICE, séminaires et conventions." },
  { year: "2016", title: "L'International", desc: "Ouverture vers les destinations internationales. Partenariats avec plus de 500 établissements premium." },
  { year: "2020", title: "La Résilience", desc: "Adaptation, innovation, maintien du cap. Lancement des offres hybrides et digital studio." },
  { year: "2024", title: "L'Excellence Consolidée", desc: "Plus de 1 500 partenaires hôteliers, 40+ destinations, et une équipe dédiée aux projets les plus exigeants." },
];

const values = [
  { icon: Award, title: "Excellence", desc: "Chaque détail compte. Nous sélectionnons les meilleurs partenaires, les meilleurs espaces, les meilleures expériences." },
  { icon: Heart, title: "Sur-Mesure", desc: "Aucun projet ne ressemble à un autre. Nous construisons chaque mission autour de vos besoins réels." },
  { icon: Shield, title: "Fiabilité", desc: "Vous nous faites confiance pour des moments importants. Nous prenons cette responsabilité au sérieux." },
  { icon: Zap, title: "Réactivité", desc: "Un interlocuteur disponible, des réponses claires, une coordination sans faille de A à Z." },
  { icon: Globe, title: "Réseau Global", desc: "Casablanca, Paris, Dubaï, New York. Notre réseau vous accompagne partout dans le monde." },
  { icon: Users, title: "Engagement", desc: "Nous nous impliquons comme si c'était notre propre événement. Votre succès est notre priorité." },
];

const method = [
  { step: "01", title: "Brief & Écoute", desc: "Nous prenons le temps de comprendre vos enjeux, vos attentes, votre budget et vos contraintes." },
  { step: "02", title: "Conception", desc: "Nous imaginons une proposition sur mesure, créative et cohérente avec votre identité." },
  { step: "03", title: "Validation", desc: "Vous avez un retour clair, une proposition détaillée et un interlocuteur dédié pour affiner." },
  { step: "04", title: "Production", desc: "Notre équipe coordonne tous les prestataires, réserve les espaces et orchestre la logistique." },
  { step: "05", title: "Exécution", desc: "Nous sommes présents le jour J pour garantir la fluidité et la qualité de chaque instant." },
  { step: "06", title: "Suivi", desc: "Après la mission, nous recueillons vos retours et préparons la prochaine étape." },
];

export default function APropos() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img
            src="/images/02_Offres_Entreprise/02_team_day.jpg"
            alt="Wander"
            className="w-full h-full object-cover brightness-[0.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background/60 to-background" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-primary tracking-[0.4em] uppercase text-xs font-bold mb-6 block"
          >
            Notre Histoire
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight tracking-tight mb-8"
          >
            Wander Travel <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic">
              & Event
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            17 ans d'excellence au service des entreprises, des dirigeants et des voyageurs exigeants. Une agence construite sur la conviction que chaque expérience mérite d'être pensée avec soin.
          </motion.p>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-24"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Notre Parcours</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">17 ans d'Excellence</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            <div className="flex flex-col gap-16">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`relative flex gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} pl-20 md:pl-0`}
                >
                  <div className="hidden md:flex flex-1 justify-end items-center">
                    {i % 2 === 0 && (
                      <div className="text-right">
                        <h3 className="text-white font-serif text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-white/50 font-light leading-relaxed max-w-xs">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute left-4 md:left-1/2 top-1 md:-translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/60 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="hidden md:flex flex-1 items-center">
                    {i % 2 !== 0 && (
                      <div>
                        <h3 className="text-white font-serif text-2xl font-bold mb-2">{item.title}</h3>
                        <p className="text-white/50 font-light leading-relaxed max-w-xs">{item.desc}</p>
                      </div>
                    )}
                  </div>
                  {/* Mobile */}
                  <div className="md:hidden">
                    <span className="text-primary font-bold text-3xl font-serif mb-2 block">{item.year}</span>
                    <h3 className="text-white font-serif text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/50 font-light leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="hidden md:block absolute left-0 md:left-1/2 top-0 md:-translate-x-[calc(50%+24px)]">
                    <span className="text-primary font-bold text-4xl font-serif opacity-0">|</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NOTRE MÉTHODE */}
      <section className="relative z-10 py-32 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Comment nous travaillons</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">Notre Méthode</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {method.map((m, i) => (
              <motion.div
                key={m.step}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/5 bg-white/[0.015] rounded-2xl hover:border-primary/20 transition-all group"
              >
                <span className="text-5xl font-serif font-bold text-primary/20 group-hover:text-primary/40 transition-colors mb-4 block">{m.step}</span>
                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-primary transition-colors">{m.title}</h3>
                <p className="text-white/40 font-light leading-relaxed text-sm">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALEURS */}
      <section className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Ce qui nous définit</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">Nos Engagements</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-8 border border-white/5 rounded-2xl hover:border-primary/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <v.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                  <p className="text-white/40 font-light leading-relaxed text-sm">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 py-24 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-6">Travaillons Ensemble</h2>
            <p className="text-white/40 font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Chaque projet est une occasion de créer quelque chose de mémorable. Racontez-nous le vôtre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/contact" className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all">
                Ouvrir un Dossier
              </Link>
              <Link href="/services" className="px-12 py-5 border border-white/20 text-white hover:border-primary hover:text-primary transition-all text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                Nos Services <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
