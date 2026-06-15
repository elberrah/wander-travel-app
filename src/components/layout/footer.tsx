"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, ExternalLink, MessageSquare, Phone, Mail, MapPin, ArrowUpRight, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-white/5 pt-32 pb-16 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-24">
          
          {/* Brand & Mission */}
          <div className="space-y-10 group">
            <Link href="/" className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-[0.2em] text-white">WANDER</span>
              <span className="text-primary text-[8px] font-bold tracking-[0.5em] uppercase mt-1">Travel & Event</span>
            </Link>
            <p className="text-white/30 text-sm font-light leading-relaxed max-w-xs lowercase italic">
               L'architecture du voyage d'affaires et de l'événementiel d'exception. Opéré au Maroc et à l'international depuis 2018.
            </p>
            <div className="flex gap-6">
              {[
                { icon: Camera, href: "https://www.instagram.com/wander_travel_event" },
                { icon: ExternalLink, href: "https://www.linkedin.com/company/wander-travel-event" },
                { icon: MessageSquare, href: "https://wa.me/212702093107" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-primary hover:border-primary/40 transition-all group-hover:scale-110"
                >
                   <social.icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Expertise */}
          <div className="space-y-10">
            <h4 className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">Expertises</h4>
            <ul className="space-y-4">
              {[
                { l: "Corportate & MICE", h: "/corporate" },
                { l: "VIP & Limousines", h: "/vip" },
                { l: "Aviation d'Affaires", h: "/aviation" },
                { l: "Studio Digital", h: "/services" },
                { l: "Destinations VIP", h: "/destinations" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.h} className="text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest flex items-center gap-2 group">
                     <span className="w-1 h-[1px] bg-primary/30 group-hover:w-4 transition-all" />
                     {link.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Logistics */}
          <div className="space-y-10">
            <h4 className="text-primary font-bold tracking-[0.4em] uppercase text-[10px]">Logistique</h4>
            <ul className="space-y-6">
              <li className="space-y-2">
                 <div className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Support 24/7</div>
                 <a href="tel:+212702093107" className="text-white text-sm font-light hover:text-primary transition-colors">+212 702 093 107</a>
              </li>
              <li className="space-y-2">
                 <div className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Sales & Projects</div>
                 <a href="mailto:sales@wandertravel-event.com" className="text-white text-sm font-light hover:text-primary transition-colors">sales@wandertravel-event.com</a>
              </li>
              <li className="space-y-2">
                 <div className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Siège Gauthier</div>
                 <span className="text-white text-xs font-light block leading-relaxed lowercase italic">36 Rue Oulad Mhanna, Casablanca</span>
              </li>
            </ul>
          </div>

          {/* Final Call */}
          <div className="space-y-10">
             <div className="p-8 border border-white/5 bg-white/[0.015] rounded-[2.5rem]">
                <h4 className="font-serif text-2xl text-white font-bold mb-4 italic">Parlons de Demain</h4>
                <p className="text-white/30 text-xs font-light mb-8 leading-relaxed">Préparez votre prochaine opération avec nos experts.</p>
                <Link href="/contact" className="w-full py-4 bg-primary text-black font-bold uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-white transition-colors">
                   Commencer <ArrowUpRight size={14} />
                </Link>
             </div>
             <div className="flex items-center gap-4 text-white/20 px-4">
                <Globe size={14} />
                <span className="text-[10px] uppercase font-bold tracking-widest">Casablanca | London | Paris</span>
             </div>
          </div>
        </div>

        {/* Legal & Final Signature */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-10">
              <span className="text-white/20 text-[10px] uppercase tracking-widest font-bold font-serif">© {currentYear} Wander Travel & Event</span>
              <div className="hidden md:flex gap-6">
                 <Link href="/contact" className="text-white/20 hover:text-primary transition-colors text-[9px] uppercase tracking-[0.2em] font-bold">Mentions Légales</Link>
                 <Link href="/contact" className="text-white/20 hover:text-primary transition-colors text-[9px] uppercase tracking-[0.2em] font-bold">Confidentialité</Link>
              </div>
           </div>
           
           <div className="text-white/10 text-[9px] uppercase tracking-[0.5em] font-bold hidden lg:block">
              L'excellence pour ADN.
           </div>
        </div>
      </div>
    </footer>
  );
}
