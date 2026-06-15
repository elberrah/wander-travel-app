"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const marqueeItems = [
  { id: 1, title: "MICE Strategy", label: "Conference", img: "/images/02_Offres_Entreprise/05_incentive.jpg" },
  { id: 2, title: "Palace Stay", label: "Hospitality", img: "/images/services/hebergement-palace-stay/HOTEL (10).jpg" },
  { id: 3, title: "Elite Mobility", label: "Chauffeur", img: "/images/services/mobilite-vip/VIP VOITURE (1).jpg" },
  { id: 4, title: "Private Jet", label: "Aviation", img: "/images/services/aviation-fast-track/avion-commercial-vol.jpg" },
  { id: 5, title: "Agafay Rally", label: "Incentive", img: "/images/02_Offres_Entreprise/04_sales_kickoff.jpg" },
  { id: 6, title: "Digital Pass", label: "Technology", img: "/images/experience-blocks/conference-stage/digital-studio.png" },
];

export const ExperienceMarquee = () => {
  // Duplicating items to create seamless loop
  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="relative py-24 bg-background overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
         <div>
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-3 block">Wander Lifestyle</span>
            <h2 className="font-serif text-3xl md:text-5xl text-white font-bold">Un Univers d'Exceptions</h2>
         </div>
         <p className="text-white/30 text-xs font-light max-w-[200px] text-right hidden md:block uppercase tracking-wider leading-relaxed">
            20+ Experiences <br /> Orchesrées par Wander
         </p>
      </div>

      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-6 whitespace-nowrap"
        >
          {duplicatedItems.map((item, idx) => (
            <div
              key={idx}
              className="relative w-[300px] md:w-[450px] h-[300px] md:h-[400px] rounded-[2.5rem] overflow-hidden group flex-shrink-0"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover brightness-[0.5] group-hover:scale-110 transition-transform duration-[3000ms]"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-between border border-white/5">
                 <div className="flex justify-between items-start">
                    <span className="px-4 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-md text-white/60 text-[9px] uppercase tracking-widest font-bold">
                       {item.label}
                    </span>
                    <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-primary hover:text-black hover:border-primary">
                       <ArrowUpRight size={16} />
                    </button>
                 </div>
                 
                 <div>
                    <h3 className="text-white font-serif text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-500">
                       {item.title}
                    </h3>
                    <div className="w-0 group-hover:w-full h-px bg-primary transition-all duration-700" />
                 </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
