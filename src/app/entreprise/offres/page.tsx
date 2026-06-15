"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ArrowRight, CheckCircle2, Calendar, Users, MapPin, Star, Clock, Briefcase, Coffee, Sun, Moon } from "lucide-react";

const offers = [
  {
    id: "team-day",
    badge: "Format phare",
    title: "Wander Team Day",
    subtitle: "Journée Cohésion Clé en Main",
    desc: "Une journée complète, fluide et qualitative à Casablanca et environs pour renforcer la cohésion, remercier les équipes et offrir un moment marquant.",
    image: "/images/02_Offres_Entreprise/02_team_day.jpg",
    highlights: ["Cadrage & conseil de format", "Sélection du lieu", "Animation & activité", "Restauration premium", "Transport si nécessaire", "Coordination globale"],
    target: "Équipes, RH, Managers",
    duration: "1 journée",
    participants: "10 à 500+",
  },
  {
    id: "team-offsite",
    badge: "Best seller corporate",
    title: "Wander Team Offsite",
    subtitle: "Séjour Stratégique 3 Jours",
    desc: "Un offsite structuré pour aligner les équipes, nourrir la cohésion et créer un cadre propice au travail comme à l'expérience collective.",
    image: "/images/02_Offres_Entreprise/03_team_offsite.jpg",
    highlights: ["Hébergement premium", "Espaces de travail équipés", "Ateliers & workshops", "Activité cohésion", "Dîner signature", "Assistance dédiée"],
    target: "CODIR, Équipes commerciales, Managers",
    duration: "3 jours / 2 nuits",
    participants: "15 à 200+",
  },
  {
    id: "sales-kickoff",
    badge: "Impact commercial",
    title: "Wander Sales Kickoff",
    subtitle: "Lancement de Cycle Commercial",
    desc: "Format premium pour lancer un trimestre, semestre ou année commerciale avec messages de direction, séquences d'alignement et moments de cohésion.",
    image: "/images/02_Offres_Entreprise/04_sales_kickoff.jpg",
    highlights: ["Scénarisation éditoriale", "Plénière direction", "Ateliers commerciaux", "Remises de prix", "Soirée de lancement", "Coordination complète"],
    target: "Équipes sales, Direction commerciale",
    duration: "1 à 3 jours",
    participants: "20 à 400+",
  },
  {
    id: "incentive",
    badge: "Reward & Motivation",
    title: "Wander Incentive",
    subtitle: "Programme de Reconnaissance",
    desc: "Récompensez une performance, valorisez une équipe et renforcez l'engagement par une expérience à forte valeur perçue et à contenu mémorable.",
    image: "/images/02_Offres_Entreprise/05_incentive.jpg",
    highlights: ["Destination sur mesure", "Expériences exclusives", "Hôtel premium", "Activités VIP", "Soirée galas", "Accompagnement complet"],
    target: "Top performers, Équipes récompensées",
    duration: "2 à 5 jours",
    participants: "10 à 150",
  },
  {
    id: "guest-desk",
    badge: "Accueil & Hospitalité",
    title: "Guest Desk Entreprise",
    subtitle: "Accueil VIP d'Exception",
    desc: "Dispositif d'accueil dédié pour invités, délégations, partenaires ou speakers, avec coordination, présence et image de marque maîtrisée.",
    image: "/images/02_Offres_Entreprise/06_guest_desk.jpg",
    highlights: ["Coordination entrée-sortie", "Transferts privatisés", "Accueil personnalisé", "Accompagnement terrain", "Communication dédiée", "Branding event"],
    target: "Conférences, Forums, Sommets",
    duration: "Sur mesure",
    participants: "Illimité",
  },
  {
    id: "employee-benefits",
    badge: "RH Premium",
    title: "Employee Benefits / Wallet",
    subtitle: "Avantages Collaborateurs",
    desc: "Solution permettant à l'entreprise de proposer des avantages collaborateurs, d'activer une enveloppe dédiée à certaines expériences Wander.",
    image: "/images/services/hebergement-palace-stay/HOTEL (1).avif",
    highlights: ["Enveloppe entreprise dédiée", "Catalogue d'expériences", "Activation collaborative", "Reporting & suivi", "Programmes RH", "Marque employeur"],
    target: "RH, CHRO, Direction générale",
    duration: "Programme continu",
    participants: "Par collaborateur",
  },
];

const teamDaySchedule = [
  { icon: Coffee, time: "08h30", phase: "Matin", items: ["Accueil café & viennoiseries premium", "Arrivée & introduction", "Activité d'ouverture ou atelier créatif"] },
  { icon: Sun, time: "12h30", phase: "Midi", items: ["Déjeuner assis ou buffet premium", "Moment convivial libre", "Networking informel"] },
  { icon: Star, time: "14h30", phase: "Après-midi", items: ["Activité collective de cohésion", "Challenge d'équipe ou moment inspiration", "Clôture et bilan"] },
  { icon: Moon, time: "18h00", phase: "Fin de journée", items: ["Cocktail de clôture", "Retour organisé ou départ libre", "Débrief opérationnel"] },
];

const offsiteSchedule = [
  {
    day: "Jour 1",
    items: ["Arrivée & check-in hôtel", "Déjeuner de bienvenue", "Session de travail plénière", "Activité soft de cohésion", "Dîner d'équipe signature"],
  },
  {
    day: "Jour 2",
    items: ["Petit-déjeuner business", "Workshop stratégique ou alignment", "Activité cohésion premium", "Déjeuner raffiné", "Soirée exclusive & networking"],
  },
  {
    day: "Jour 3",
    items: ["Breakfast & conclusion", "Synthèse & roadmap partagée", "Activité légère de clôture", "Check-out & transferts retour"],
  },
];

export default function OffresEntreprise() {
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0">
          <img src="/images/02_Offres_Entreprise/01_hero_offres.jpg" alt="Corporate" className="w-full h-full object-cover brightness-[0.18]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background/70 to-background" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-primary tracking-[0.4em] uppercase text-xs font-bold mb-6 block"
          >
            Pôle Entreprise
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white leading-[0.95] tracking-tight mb-8"
          >
            Des expériences entreprise pensées pour <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic">
              fédérer, engager et valoriser
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            Wander conçoit et coordonne des formats corporate premium, du team day au offsite stratégique, avec une exécution fluide, soignée et adaptée à vos enjeux RH, managériaux et business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Link href="/contact" className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] transition-all">
              Demander une proposition
            </Link>
            <Link href="/entreprise/paiement-avantages" className="px-12 py-5 border border-white/20 text-white hover:border-primary hover:text-primary transition-all text-[11px] font-bold uppercase tracking-widest">
              Voir les solutions paiement
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BADGES */}
      <section className="relative z-10 py-10 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-4">
            {["Sur-mesure", "Corporate Premium", "Paiement Structuré", "Coordination de bout en bout", "Interlocuteur Dédié", "1 500+ Partenaires Hôteliers"].map((b) => (
              <span key={b} className="px-5 py-2 border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* GRILLE OFFRES */}
      <section className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Nos Formats</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">6 Offres Corporate Signature</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer, i) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 bg-[#0a0a0a] flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={offer.image} alt={offer.title} className="w-full h-full object-cover brightness-[0.5] group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-black text-[9px] font-bold uppercase tracking-widest rounded-full">
                    {offer.badge}
                  </span>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl text-white font-bold mb-1 group-hover:text-primary transition-colors">{offer.title}</h3>
                  <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">{offer.subtitle}</p>
                  <p className="text-white/50 font-light text-sm leading-relaxed mb-6">{offer.desc}</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="flex items-center gap-1.5 text-white/40 text-[10px]"><Clock size={10} />{offer.duration}</span>
                    <span className="flex items-center gap-1.5 text-white/40 text-[10px]"><Users size={10} />{offer.participants}</span>
                    <span className="flex items-center gap-1.5 text-white/40 text-[10px]"><Briefcase size={10} />{offer.target}</span>
                  </div>
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <button
                      onClick={() => setActiveOffer(activeOffer === offer.id ? null : offer.id)}
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-colors flex items-center gap-2"
                    >
                      {activeOffer === offer.id ? "Réduire" : "Voir le détail"} <ArrowRight size={10} className={activeOffer === offer.id ? "rotate-90" : ""} />
                    </button>
                    <AnimatePresence>
                      {activeOffer === offer.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 flex flex-col gap-2">
                            {offer.highlights.map((h) => (
                              <li key={h} className="flex items-start gap-2 text-white/50 text-[11px]">
                                <CheckCircle2 size={12} className="text-primary shrink-0 mt-0.5" />
                                {h}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM DAY DÉTAIL */}
      <section className="relative z-10 py-32 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Format Phare</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">Wander Team Day</h2>
            <p className="text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
              Une journée clé en main à Casablanca et environs pour renforcer la cohésion, remercier les équipes et offrir une expérience fluide et qualitative.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamDaySchedule.map((slot, i) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/5 rounded-2xl bg-white/[0.015] hover:border-primary/20 transition-all group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <slot.icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-primary font-bold text-sm">{slot.time}</p>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest">{slot.phase}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-3">
                  {slot.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/50 text-[11px] leading-relaxed">
                      <span className="text-primary mt-1 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFSITE 3 JOURS */}
      <section className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Best Seller Corporate</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">Team Offsite — 3 Jours</h2>
            <p className="text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
              Un offsite structuré pour aligner les équipes, nourrir la cohésion et créer un cadre propice au travail comme à l'expérience.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offsiteSchedule.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative p-8 border border-white/5 rounded-2xl bg-white/[0.015] hover:border-primary/20 transition-all group"
              >
                <div className="absolute -top-4 -left-2 font-serif text-7xl font-bold text-primary/8 group-hover:text-primary/15 transition-colors select-none">
                  0{i + 1}
                </div>
                <h3 className="text-white font-bold text-xl mb-6 font-serif relative z-10">{day.day}</h3>
                <ul className="flex flex-col gap-3 relative z-10">
                  {day.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-white/50 text-sm leading-relaxed">
                      <CheckCircle2 size={13} className="text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-6">Construisons votre projet ensemble</h2>
            <p className="text-white/40 max-w-xl mx-auto mb-10 font-light leading-relaxed">
              Partagez vos enjeux, votre équipe et vos ambitions. Nous vous proposons un format adapté, une logistique fluide et une expérience mémorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/contact" className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] transition-all">
                Recevoir une proposition
              </Link>
              <Link href="/entreprise/paiement-avantages" className="px-12 py-5 border border-white/20 text-white hover:border-primary hover:text-primary transition-all text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                Solutions Paiement <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
