"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const WanderBentoSection = () => {
  const videoUrl =
    "https://videos.pexels.com/video-files/2169880/2169880-uhd_3840_2160_25fps.mp4";

  // Images du projet officiel
  const imageWalletPath = "/images/services/hebergement-palace-stay/HOTEL (1).avif";
  const imageAppPath = "/images/services/incentive-team-building/team-bulding (1).avif";

  return (
    <section className="relative min-h-screen w-full bg-[#050505] overflow-hidden text-white font-sans">
      {/* 1. Texte WANDER en arrière-plan masqué */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[28vw] font-extrabold leading-none tracking-tighter text-white/[0.03]">
          WANDER
        </h1>
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.06),transparent_70%)] pointer-events-none" />

      {/* 2. Bento Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-5 p-8 md:p-12 lg:p-16 min-h-screen">

        {/* CASE 1 : Employee Benefits Wallet — Grande carte gauche */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
          className={cn(
            "md:col-span-2 md:row-span-2",
            "bg-white/[0.03] backdrop-blur-md rounded-3xl p-8 border border-white/8",
            "transition-all duration-500 group overflow-hidden hover:border-primary/30 flex flex-col"
          )}
        >
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
            Pôle Entreprise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-200 to-primary/70">
              Employee Benefits
            </span>{" "}
            Wallet
          </h2>
          <p className="text-white/50 text-base mb-8 max-w-md font-light leading-relaxed">
            Wander simplifie l'accès aux avantages salariés. Attribuez une
            enveloppe, activez des expériences, valorisez vos équipes.
          </p>
          <div className="flex-1 relative rounded-2xl overflow-hidden min-h-[220px]">
            <motion.img
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              src={imageWalletPath}
              alt="Wander Employee Benefits Wallet"
              className="w-full h-full object-cover brightness-[0.6] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 bg-primary/90 text-black text-[9px] font-bold uppercase tracking-widest rounded-full">
                Disponible maintenant
              </span>
            </div>
          </div>
        </motion.div>

        {/* CASE 2 : Aperçu App — Carte centrale */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className={cn(
            "md:col-span-1 md:row-span-2",
            "bg-primary/5 backdrop-blur-lg rounded-3xl p-6 border border-primary/20",
            "transition-all duration-500 flex flex-col items-center justify-center group overflow-hidden"
          )}
        >
          <div className="relative w-full flex-1 min-h-[200px] rounded-2xl overflow-hidden mb-4">
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              src={imageAppPath}
              alt="Wander App Interface"
              className="w-full h-full object-cover brightness-[0.5] group-hover:scale-110 group-hover:brightness-[0.7] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <p className="text-center font-bold text-primary text-sm uppercase tracking-[0.2em]">
            Suivi & Expériences
          </p>
          <p className="text-center text-white/40 text-xs mt-1 font-light">
            Vos avantages en temps réel
          </p>
        </motion.div>

        {/* CASE 3 : Paiement flexible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          whileHover={{ scale: 1.04 }}
          className={cn(
            "md:col-span-1",
            "bg-white/[0.03] backdrop-blur-md rounded-3xl p-6 border border-white/8",
            "transition-all duration-500 flex flex-col hover:border-primary/25"
          )}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary/10 p-3 rounded-xl border border-primary/20 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Paiement flexible</h3>
          </div>
          <p className="text-white/40 text-sm font-light leading-relaxed">
            Différé ou en plusieurs fois, selon vos besoins et votre circuit de
            validation interne.
          </p>
          <div className="mt-auto pt-4 border-t border-white/5 flex gap-2 flex-wrap">
            {["Acompte", "Virement", "Échelonné"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 border border-primary/30 text-primary text-[9px] font-bold uppercase tracking-widest rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CASE 4 : Destination avec hover vidéo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
          whileHover={{ scale: 1.03 }}
          className={cn(
            "md:col-span-1 md:row-span-2",
            "relative bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/8",
            "transition-all duration-500 group overflow-hidden hover:border-primary/25"
          )}
        >
          {/* Vidéo qui apparaît au hover */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-700"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="relative z-10 p-6 flex flex-col h-full">
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-2 font-bold">
              Prochain Voyage
            </p>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Destinations Exclusives
            </h3>
            <p className="text-white/40 text-sm font-light">
              Maroc · Europe · Moyen-Orient · Asie
            </p>
            <div className="mt-auto">
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-white transition-colors"
              >
                Explorer →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* CASE 5 : CTA Activer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className={cn(
            "md:col-span-1",
            "bg-white/[0.03] backdrop-blur-md rounded-3xl p-6 border-2 border-white/8",
            "transition-all duration-500 flex items-center justify-center hover:border-primary/40 group"
          )}
        >
          <Link
            href="/entreprise/paiement-avantages"
            className="bg-primary hover:shadow-[0_0_30px_rgba(197,160,89,0.4)] text-black font-bold py-4 px-10 rounded-full transition-all duration-500 group-hover:scale-105 text-sm uppercase tracking-widest"
          >
            Activer le Wallet
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WanderBentoSection;
