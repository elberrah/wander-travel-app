"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqCategories = [
  {
    label: "Général",
    questions: [
      { q: "Qui est Wander Travel & Event ?", a: "Wander est une agence de voyages et d'événements premium, fondée en 2007, spécialisée dans les projets sur mesure pour les entreprises et les particuliers. Nous intervenons sur l'ensemble du spectre : voyages d'affaires, MICE, séminaires, incentives, événements privés et services VIP." },
      { q: "Quelles destinations couvrez-vous ?", a: "Nous couvrons plus de 40 destinations mondiales, avec une expertise particulière sur le Maroc, l'Europe, le Moyen-Orient, l'Afrique et l'Asie. Notre réseau de partenaires locaux nous permet d'opérer avec fluidité partout dans le monde." },
      { q: "Travaillez-vous avec des particuliers ou uniquement des entreprises ?", a: "Wander accompagne aussi bien les entreprises (MICE, corporate, incentives) que les particuliers (voyages sur mesure, événements privés, services VIP). Chaque projet est traité avec le même niveau d'exigence et de personnalisation." },
    ],
  },
  {
    label: "Corporate & Entreprise",
    questions: [
      { q: "Quels formats corporate proposez-vous ?", a: "Nous proposons 6 offres corporate signature : Wander Team Day (journée cohésion), Wander Team Offsite 3 jours, Wander Sales Kickoff, Wander Incentive, Guest Desk Entreprise et Employee Benefits / Wallet Entreprise. Chaque format est entièrement personnalisable." },
      { q: "Comment fonctionne la coordination opérationnelle ?", a: "Dès validation de votre projet, vous bénéficiez d'un interlocuteur dédié qui gère l'ensemble de la coordination : hébergement, transport, prestataires, logistique terrain. Nous sommes présents le jour J et assurons un suivi post-mission." },
      { q: "Gérez-vous les projets de grande envergure ?", a: "Oui, nous gérons régulièrement des projets pour 100 à 500+ participants. Notre infrastructure opérationnelle, notre réseau de partenaires et notre expérience nous permettent d'absorber des volumes importants sans compromettre la qualité." },
      { q: "Proposez-vous des offres annuelles pour les entreprises ?", a: "Oui, nous proposons des programmes d'accompagnement annuels pour les entreprises souhaitant externaliser leur gestion événementielle ou voyage d'affaires. Contactez notre pôle entreprise pour en discuter." },
    ],
  },
  {
    label: "Paiement & Budget",
    questions: [
      { q: "Quelles sont les modalités de paiement acceptées ?", a: "Nous acceptons le paiement par acompte + solde, le virement entreprise avec facture pro-forma, le règlement structuré selon votre calendrier interne, et selon l'éligibilité du projet, un paiement échelonné peut être mis en place. Toutes nos factures incluent les mentions légales complètes." },
      { q: "Fournissez-vous des devis détaillés ?", a: "Oui, systématiquement. Après réception de votre brief, nous préparons une proposition détaillée avec une ventilation budgétaire claire, un planning prévisionnel et les engagements de notre part." },
      { q: "Y a-t-il un budget minimum pour travailler avec Wander ?", a: "Nous n'imposons pas de budget minimum, mais nos services s'adressent à des projets premium. Nous vous guidons dès la phase de brief pour identifier le meilleur format selon votre enveloppe." },
      { q: "Qu'est-ce que le Wallet Entreprise ?", a: "Le Wallet Entreprise est un dispositif permettant à une société d'allouer une enveloppe budgétaire dédiée à des expériences Wander pour ses collaborateurs. Il peut être activé dans le cadre d'un programme RH, d'incentive ou d'avantages salariés structurés." },
    ],
  },
  {
    label: "Process & Délais",
    questions: [
      { q: "Quel est le délai typique entre brief et confirmation ?", a: "Pour un projet standard, nous vous remettons une proposition sous 48 heures ouvrées. Pour des projets complexes (500+ personnes, destinations spécifiques, logistique internationale), comptez 3 à 5 jours." },
      { q: "Comment se passe le brief initial ?", a: "Le brief peut se faire par téléphone, visioconférence ou en personne. Nous recueillons vos objectifs, votre budget, vos contraintes, le nombre de participants et vos préférences. C'est à partir de là que nous construisons votre proposition sur mesure." },
      { q: "Combien de temps à l'avance faut-il nous contacter ?", a: "Pour les projets corporates de grande envergure, nous recommandons un délai de 4 à 8 semaines minimum. Pour les formats plus légers (Team Day), un délai de 2 semaines peut suffire selon la période." },
      { q: "Puis-je modifier mon projet après validation ?", a: "Oui, dans les limites contractuelles et opérationnelles. Votre interlocuteur dédié est là pour adapter le projet à vos évolutions. Nous privilégions toujours la flexibilité et la relation long terme." },
    ],
  },
];

function FaqItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
      >
        <span className={`font-semibold text-base transition-colors ${isOpen ? "text-primary" : "text-white/80 group-hover:text-white"}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "border-primary/40 bg-primary/10 rotate-180" : "group-hover:border-white/20"}`}>
          <ChevronDown size={14} className={isOpen ? "text-primary" : "text-white/40"} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/50 font-light leading-relaxed text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      <Header />

      {/* HERO */}
      <section className="relative pt-40 pb-24 text-center px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-primary tracking-[0.4em] uppercase text-xs font-bold mb-6 block"
          >
            Questions Fréquentes
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-6xl font-serif font-bold text-white leading-tight tracking-tight mb-6"
          >
            Tout ce que vous <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-100 to-primary/80 italic">
              souhaitez savoir
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
            className="text-white/50 font-light leading-relaxed"
          >
            Retrouvez les réponses aux questions les plus courantes sur nos services, notre process et nos modalités de travail.
          </motion.p>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 pb-32">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {faqCategories.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => { setActiveCategory(i); setOpenIndex(null); }}
                className={`px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full border transition-all ${
                  activeCategory === i
                    ? "bg-primary text-black border-primary"
                    : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Questions */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-white/5 rounded-2xl bg-white/[0.015] px-8 divide-y-0"
          >
            {faqCategories[activeCategory].questions.map((item, i) => (
              <FaqItem
                key={i}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="mt-16 text-center p-10 border border-primary/20 rounded-2xl bg-primary/5"
          >
            <h3 className="font-serif text-2xl text-white font-bold mb-3">Vous ne trouvez pas la réponse ?</h3>
            <p className="text-white/40 font-light mb-8">Notre équipe est disponible pour répondre à toutes vos questions spécifiques.</p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link href="/contact" className="px-10 py-4 bg-primary text-black font-bold uppercase tracking-widest text-[11px] hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all">
                Nous Contacter
              </Link>
              <a href="tel:+212702093107" className="px-10 py-4 border border-white/20 text-white hover:border-primary hover:text-primary transition-all text-[11px] font-bold uppercase tracking-widest flex items-center gap-2">
                +212 702 093 107 <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
