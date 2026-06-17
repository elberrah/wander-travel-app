"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WanderBentoSection from "@/components/sections/WanderBentoSection";
import { ArrowRight, CheckCircle2, CreditCard, Building2, Users, Shield, Wallet, Phone, Mail, Calendar } from "lucide-react";

const paymentModes = [
  {
    icon: CreditCard,
    title: "Acompte & Solde",
    desc: "Versez un acompte à la commande et réglez le solde à l'issue du projet selon un calendrier convenu.",
    benefit: "Visibilité budgétaire dès le départ",
  },
  {
    icon: Building2,
    title: "Virement Entreprise",
    desc: "Règlement par virement bancaire avec facture pro-forma, bon de commande et comptabilité intégrée.",
    benefit: "Compatible avec vos circuits internes",
  },
  {
    icon: Shield,
    title: "Règlement Structuré",
    desc: "Nous adaptons le calendrier de règlement à vos contraintes budgétaires et cycles de validation interne.",
    benefit: "Alignement avec vos processus finance",
  },
  {
    icon: Wallet,
    title: "Paiement Échelonné",
    desc: "Selon éligibilité et nature du projet, un paiement en plusieurs fois peut être mis en place.",
    benefit: "Charge financière étalée dans le temps",
  },
];

const benefits = [
  "Meilleure anticipation budgétaire",
  "Alignement avec les circuits de validation internes",
  "Fluidité pour les équipes finance et achats",
  "Pilotage plus serein du projet",
  "Facture officielle avec mentions légales complètes",
  "Interlocuteur dédié pour le suivi administratif",
];

const walletUses = [
  "Attribuer un budget ou avantage à des collaborateurs",
  "Activer une enveloppe dédiée à certains temps forts",
  "Soutenir un programme RH ou incentive",
  "Faciliter l'accès à des expériences Wander sélectionnées",
  "Fidéliser et valoriser les meilleurs collaborateurs",
  "Renforcer la marque employeur par l'expérience",
];

const employeeBenefits = [
  { title: "Expériences Premium", desc: "Vos collaborateurs accèdent à un catalogue d'expériences sélectionnées : voyages, séjours, activités." },
  { title: "Dispositifs RH", desc: "Intégrez les avantages Wander dans votre politique de rémunération et d'engagement." },
  { title: "Marque Employeur", desc: "Valorisez votre entreprise comme employeur de choix avec des avantages différenciants." },
  { title: "Activation Simple", desc: "Portail dédié ou coordination directe. Activation sans friction pour vos équipes RH." },
];

const contactFormFields = [
  { id: "nom", label: "Nom", type: "text", placeholder: "Votre nom" },
  { id: "societe", label: "Société", type: "text", placeholder: "Nom de votre société" },
  { id: "fonction", label: "Fonction", type: "text", placeholder: "Votre poste" },
  { id: "email", label: "Email", type: "email", placeholder: "email@societe.com" },
  { id: "telephone", label: "Téléphone", type: "tel", placeholder: "+212 6XX XXX XXX" },
  { id: "budget", label: "Budget indicatif", type: "text", placeholder: "Budget estimatif" },
];

export default function PaiementAvantages() {
  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-24 bg-[#050505]">
        {/* Background Globe for Global Corporate Reach */}
        <div className="absolute inset-0 z-0 opacity-40">
          <HeroGlobe />
        </div>
        
        <div className="absolute inset-0 z-0">
          <img src="/images/services/hebergement-palace-stay/HOTEL (1).avif" alt="Paiement" className="w-full h-full object-cover brightness-[0.1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-background/70 to-background" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <Reveal>
            <span className="text-primary tracking-[0.4em] uppercase text-xs font-bold mb-6 block">
              Pôle Entreprise
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight tracking-tight mb-8"
            >
              Des modalités de règlement pensées pour les entreprises,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic">
                des avantages conçus pour les collaborateurs
              </span>
            </motion.h1>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Wander accompagne les sociétés avec une approche structurée du paiement et des solutions premium dédiées aux équipes, pour simplifier l'organisation tout en valorisant l'expérience collaborateur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="#contact-b2b" className="px-12 py-5 bg-primary text-black font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_40px_rgba(197,160,89,0.35)] hover:scale-105 transition-all rounded-sm">
                Échanger avec un conseiller
              </Link>
              <Link href="/entreprise/offres" className="px-12 py-5 border border-white/20 text-white hover:border-primary hover:text-primary transition-all text-[11px] font-bold uppercase tracking-widest flex items-center gap-2 rounded-sm group">
                Offres Entreprise <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MODALITÉS PAIEMENT */}
      <section className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Flexibilité & Rigueur</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">Modalités de Paiement Corporate</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paymentModes.map((mode, i) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 border border-white/5 rounded-2xl bg-white/[0.015] hover:border-primary/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <mode.icon size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-primary transition-colors">{mode.title}</h3>
                  <p className="text-white/50 font-light text-sm leading-relaxed mb-3">{mode.desc}</p>
                  <p className="flex items-center gap-2 text-primary text-[11px] font-bold uppercase tracking-[0.15em]">
                    <CheckCircle2 size={12} />
                    {mode.benefit}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI C'EST RASSURANT */}
      <section className="relative z-10 py-24 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Réassurance</span>
            <h2 className="font-serif text-4xl text-white font-bold">Pourquoi les équipes finance apprécient Wander</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-5 border border-white/5 rounded-xl hover:border-primary/20 transition-all"
              >
                <CheckCircle2 size={16} className="text-primary shrink-0" />
                <span className="text-white/70 text-sm">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAGES SALARIÉS */}
      <section className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Outil RH Premium</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold">Avantages Salariés</h2>
            <p className="text-white/40 max-w-xl mx-auto mt-4 font-light">Des expériences valorisantes pour vos collaborateurs, conçues comme un outil stratégique de fidélisation et de marque employeur.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {employeeBenefits.map((eb, i) => (
              <motion.div
                key={eb.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 border border-white/5 rounded-2xl bg-white/[0.015] hover:border-primary/20 transition-all group"
              >
                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-primary transition-colors font-serif">{eb.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{eb.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WALLET ENTREPRISE */}
      <section className="relative z-10 py-24 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Innovation RH</span>
              <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-6">Wallet Entreprise</h2>
              <p className="text-white/50 font-light leading-relaxed mb-8">
                Le Wallet Entreprise est un dispositif flexible permettant à l'entreprise de mettre à disposition de ses collaborateurs une enveloppe d'expériences Wander, sans friction administrative.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-black font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all">
                Activer un Wallet <ArrowRight size={12} />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1">
              <ul className="flex flex-col gap-4">
                {walletUses.map((use, i) => (
                  <li key={use} className="flex items-start gap-3 p-4 border border-white/5 rounded-xl hover:border-primary/20 transition-all">
                    <span className="text-primary font-bold text-sm shrink-0">0{i + 1}</span>
                    <span className="text-white/60 text-sm leading-relaxed">{use}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTACT B2B */}
      <section id="contact-b2b" className="relative z-10 py-32 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Contact Dédié</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">Pôle Entreprise Wander</h2>
            <p className="text-white/40 max-w-lg mx-auto font-light">Un interlocuteur dédié pour votre projet corporate. Réponse sous 24h ouvrées.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact infos */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
              <a href="tel:+212702093107" className="flex items-center gap-4 p-6 border border-white/5 rounded-2xl hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Ligne Directe Entreprise</p>
                  <p className="text-white font-bold">+212 702 093 107</p>
                </div>
              </a>
              <a href="mailto:corporate@wandertravel-event.com" className="flex items-center gap-4 p-6 border border-white/5 rounded-2xl hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Email Corporate</p>
                  <p className="text-white font-bold">corporate@wandertravel-event.com</p>
                </div>
              </a>
              <div className="p-6 border border-primary/20 rounded-2xl bg-primary/5">
                <h3 className="text-primary font-bold text-sm mb-3 uppercase tracking-widest">Engagements</h3>
                <ul className="flex flex-col gap-2">
                  {["Réponse sous 24h ouvrées", "Proposition détaillée sous 48h", "Interlocuteur dédié sur toute la durée", "Confidentialité garantie"].map((e) => (
                    <li key={e} className="flex items-center gap-2 text-white/60 text-sm">
                      <CheckCircle2 size={12} className="text-primary" />
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Formulaire */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactFormFields.map((f) => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 block">{f.label}</label>
                      <input
                        id={f.id} type={f.type} placeholder={f.placeholder}
                        className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label htmlFor="besoin" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 block">Besoin Principal</label>
                  <select id="besoin" className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white/70 text-sm focus:outline-none focus:border-primary/50 transition-colors">
                    <option value="">Sélectionner votre besoin</option>
                    <option>Team Day</option>
                    <option>Team Offsite 3 jours</option>
                    <option>Sales Kickoff</option>
                    <option>Incentive</option>
                    <option>Guest Desk</option>
                    <option>Wallet / Employee Benefits</option>
                    <option>Facilités de paiement</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="participants" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 block">Nombre de Participants estimé</label>
                  <input id="participants" type="number" placeholder="Ex: 50" className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors" />
                </div>
                <div>
                  <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2 block">Message</label>
                  <textarea id="message" rows={4} placeholder="Décrivez votre projet ou votre besoin…" className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-colors resize-none" />
                </div>
                <button type="submit" className="w-full py-5 bg-primary text-black font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all rounded-sm">
                  Envoyer ma demande企業
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENTO GRID (EMPLOYEE BENEFITS) */}
      <WanderBentoSection />

      <Footer />
    </main>
  );
}
