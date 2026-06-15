"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Globe, Phone, Camera, ExternalLink, ChevronDown, Building2, CreditCard } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  {
    label: "Entreprise",
    href: "#",
    dropdown: [
      {
        label: "Offres Entreprise",
        href: "/entreprise/offres",
        desc: "Team Day, Offsite, Incentive, Guest Desk…",
        icon: Building2,
      },
      {
        label: "Paiement & Avantages Salariés",
        href: "/entreprise/paiement-avantages",
        desc: "Modalités structurées & Employee Benefits",
        icon: CreditCard,
      },
    ],
  },
  { label: "Destinations", href: "/destinations" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enterpriseOpen, setEnterpriseOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEnterpriseOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "bg-black/70 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="relative z-[110] flex items-center gap-3 lg:gap-4 group">
            <motion.img 
              src="/images/logo.png" 
              alt="Wander Logo" 
              className="h-10 md:h-12 lg:h-14 w-auto object-contain mix-blend-screen brightness-110 saturate-[0.8] sepia-[.1]"
              animate={{ y: [-1, 1, -1] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] text-white transition-all group-hover:text-primary leading-none">
                WANDER
              </span>
              <span className="text-primary text-[9px] md:text-[10px] font-bold tracking-[0.5em] uppercase mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                Travel & Event
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setEnterpriseOpen(true)}
                  onMouseLeave={() => setEnterpriseOpen(false)}
                >
                  <button
                    className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition-all relative group"
                    onClick={() => setEnterpriseOpen(!enterpriseOpen)}
                  >
                    {item.label}
                    <ChevronDown
                      size={11}
                      className={`transition-transform duration-300 ${enterpriseOpen ? "rotate-180 text-primary" : ""}`}
                    />
                    <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
                  </button>

                  <AnimatePresence>
                    {enterpriseOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-[#0a0a0a] border border-white/8 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.6)] p-2 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none rounded-2xl" />
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setEnterpriseOpen(false)}
                            className="flex items-start gap-3 p-4 rounded-xl hover:bg-white/[0.04] transition-all group/sub"
                          >
                            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/sub:bg-primary/20 transition-colors">
                              <sub.icon size={15} className="text-primary" />
                            </div>
                            <div>
                              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white group-hover/sub:text-primary transition-colors mb-1">
                                {sub.label}
                              </p>
                              <p className="text-[10px] text-white/40 leading-relaxed">{sub.desc}</p>
                            </div>
                          </Link>
                        ))}
                        <div className="mt-2 mx-2 mb-2 pt-2 border-t border-white/5">
                          <Link
                            href="/contact"
                            onClick={() => setEnterpriseOpen(false)}
                            className="flex items-center justify-between w-full px-4 py-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-all group/cta"
                          >
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                              Demander une proposition
                            </span>
                            <ArrowRight size={12} className="text-primary group-hover/cta:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 hover:text-white transition-all relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-primary transition-all duration-500 group-hover:w-full" />
                </Link>
              )
            )}
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-8">
             <div className="flex items-center gap-6 border-r border-white/10 pr-8 mr-2">
                <a href="https://www.instagram.com/wander_travel_event" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
                   <Camera size={14} />
                </a>
                <a href="https://www.linkedin.com/company/wander-travel-event" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary transition-colors">
                   <ExternalLink size={14} />
                </a>
             </div>
             <div className="flex items-center gap-2 text-white/40 hover:text-white transition-colors cursor-pointer group">
                <Globe size={14} className="group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] uppercase font-bold tracking-widest">FR</span>
             </div>
             <Link 
                href="/contact" 
                className="px-8 py-3 bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:shadow-primary/20"
              >
               Ouvrir un Dossier
             </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-[110] text-white p-2 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col gap-1.5 items-end">
               <span className={`h-[1px] bg-current transition-all duration-500 ${mobileMenuOpen ? "w-8 rotate-45 translate-y-[7px]" : "w-8"}`} />
               <span className={`h-[1px] bg-current transition-all duration-500 ${mobileMenuOpen ? "opacity-0" : "w-5"}`} />
               <span className={`h-[1px] bg-current transition-all duration-500 ${mobileMenuOpen ? "w-8 -rotate-45 -translate-y-[7px]" : "w-8"}`} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-black flex flex-col justify-center p-12 lg:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,rgba(197,160,89,0.2),transparent_40%)]" />
            
            <nav className="relative z-10 flex flex-col gap-6">
              {navLinks.map((item, i) =>
                item.dropdown ? (
                  <div key={item.label}>
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="text-4xl md:text-6xl font-serif text-white/30 mb-3"
                    >
                      {item.label}
                    </motion.p>
                    <div className="pl-4 flex flex-col gap-4">
                      {item.dropdown.map((sub, j) => (
                        <motion.div
                          key={sub.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 + j * 0.06 }}
                        >
                          <Link
                            href={sub.href}
                            className="text-xl font-serif text-white hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            → {sub.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link
                      href={item.href}
                      className="text-4xl md:text-6xl font-serif text-white hover:text-primary transition-colors flex items-center gap-4 group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-primary text-sm font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                        0{i + 1}
                      </span>
                      {item.label}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
               className="mt-16 pt-8 border-t border-white/5 relative z-10 flex flex-col gap-6"
            >
               <div className="flex items-center gap-4 text-white/40">
                  <Phone size={16} />
                  <span className="text-sm">+212 702 093 107</span>
               </div>
               <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="px-10 py-5 bg-primary text-black font-bold uppercase tracking-[0.3em] text-xs flex items-center justify-between group">
                  Demander un devis
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
