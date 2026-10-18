"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sparkles, ArrowRight, Loader2, CheckCircle2, Users, Calendar, Briefcase, Wallet, Mail } from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export function AIDevisForm() {
  const [step, setStep] = useState<Step>(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<null | { price: string; email: string }>(null);
  
  const [formData, setFormData] = useState({
    eventType: "",
    guests: "10",
    date: "",
    budget: "premium",
    email: "",
  });

  const nextStep = () => setStep((s) => (s + 1) as Step);
  const prevStep = () => setStep((s) => (s - 1) as Step);

  const onSubmit = async () => {
    setIsSimulating(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    let basePrice = 500;
    if (formData.budget === "premium") basePrice = 1800;
    if (formData.budget === "luxury") basePrice = 5500;
    
    const guests = parseInt(formData.guests) || 10;
    const total = basePrice * guests;
    
    setResult({
      price: new Intl.NumberFormat('fr-MA', { style: 'currency', currency: 'MAD' }).format(total),
      email: formData.email
    });
    setIsSimulating(false);
  };

  const stepsDetails = [
    { title: "Votre Vision", icon: <Briefcase size={20} /> },
    { title: "Logistique", icon: <Users size={20} /> },
    { title: "Ambition", icon: <Wallet size={20} /> },
    { title: "Finalisation", icon: <Mail size={20} /> },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-900/10 to-primary/20 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
      
      <div className="relative z-10 bg-[#080808]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-16 shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-center">
        
        {/* PROGRESS HEADER */}
        {!result && (
          <div className="flex justify-between items-center mb-16 px-4">
             {stepsDetails.map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-3 relative">
                   <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-700 ${step > i + 1 ? "bg-primary border-primary text-black" : step === i + 1 ? "border-primary text-primary shadow-[0_0_20px_rgba(197,160,89,0.3)]" : "border-white/10 text-white/20"}`}>
                      {step > i + 1 ? <CheckCircle2 size={18} strokeWidth={3} /> : s.icon}
                   </div>
                   <span className={`text-[10px] uppercase tracking-[0.2em] font-bold hidden md:block transition-colors ${step === i + 1 ? "text-primary" : "text-white/20"}`}>{s.title}</span>
                </div>
             ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
               key={step} 
               initial={{ opacity: 0, x: 20 }} 
               animate={{ opacity: 1, x: 0 }} 
               exit={{ opacity: 0, x: -20 }}
               transition={{ duration: 0.5, ease: "circOut" }}
               className="space-y-10"
            >
               {step === 1 && (
                  <div className="space-y-8">
                     <div className="space-y-4">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">Étape 01</span>
                        <h3 className="text-3xl md:text-4xl text-white font-serif font-bold">Quel univers souhaitez-vous explorer ?</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                           { id: "seminaire", label: "Séminaire / Congrès", desc: "Expertise logistique & corporate." },
                           { id: "teambuilding", label: "Team Building / Incentive", desc: "Expériences transformatrices." },
                           { id: "gala", label: "Gala / VIP Event", desc: "Prestige, protocole & excellence." },
                           { id: "aviation", label: "Aviation / Mobilité", desc: "Vols privés & transferts d'élite." },
                        ].map((opt) => (
                           <button 
                              key={opt.id}
                              onClick={() => { setFormData({...formData, eventType: opt.id}); nextStep(); }}
                              className={`p-8 rounded-[2rem] border transition-all text-left group ${formData.eventType === opt.id ? "bg-primary border-primary text-black" : "bg-white/[0.02] border-white/5 hover:border-primary/30 text-white"}`}
                           >
                              <div className="font-bold text-lg mb-2">{opt.label}</div>
                              <div className={`text-[11px] font-light ${formData.eventType === opt.id ? "text-black/60" : "text-white/30"}`}>{opt.desc}</div>
                           </button>
                        ))}
                     </div>
                  </div>
               )}

               {step === 2 && (
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">Étape 02</span>
                        <h3 className="text-3xl md:text-4xl text-white font-serif font-bold">Logistique & Tempo</h3>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-4">
                           <label className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Participants estimatifs</label>
                           <input 
                              type="range" min="1" max="500" step="5"
                              value={formData.guests}
                              onChange={(e) => setFormData({...formData, guests: e.target.value})}
                              className="w-full accent-primary" 
                           />
                           <div className="flex justify-between items-center">
                              <span className="text-white/60 text-xs italic font-serif">1 Pax</span>
                              <span className="text-primary font-bold text-xl">{formData.guests} <span className="text-[10px] uppercase font-serif text-white/40 ml-1">Invités</span></span>
                              <span className="text-white/60 text-xs italic font-serif">500+ Pax</span>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <label className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Date approximative</label>
                           <input 
                              type="date"
                              onChange={(e) => setFormData({...formData, date: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 [color-scheme:dark]" 
                           />
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button onClick={prevStep} className="px-8 py-4 border border-white/10 text-white/40 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">Retour</button>
                        <button onClick={nextStep} className="px-12 py-4 bg-primary text-black text-[10px] uppercase font-bold tracking-widest">Étape Suivante</button>
                     </div>
                  </div>
               )}

               {step === 3 && (
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">Étape 03</span>
                        <h3 className="text-3xl md:text-4xl text-white font-serif font-bold">Quel degré d'Ambition ?</h3>
                     </div>
                     <div className="flex flex-col gap-4">
                        {[
                           { id: "standard", label: "Business Elite", desc: "Hôtels 4* sup / 5* standards. Excellence opérationnelle pure." },
                           { id: "premium", label: "Wander Signature", desc: "Hôtels 5* Luxe / Palaces. Conciergerie intégrée & services exclusifs." },
                           { id: "luxury", label: "Ultra Mirage", desc: "Villas privatisées, Jets, Protocoles d'exception. Le luxe sans limites." },
                        ].map((opt) => (
                           <button 
                              key={opt.id}
                              onClick={() => { setFormData({...formData, budget: opt.id}); nextStep(); }}
                              className={`p-8 rounded-[2rem] border transition-all text-left flex items-center justify-between group ${formData.budget === opt.id ? "bg-primary border-primary text-black" : "bg-white/[0.02] border-white/5 hover:border-primary/20 text-white"}`}
                           >
                              <div>
                                 <div className="font-bold text-lg mb-1">{opt.label}</div>
                                 <div className={`text-[11px] font-light ${formData.budget === opt.id ? "text-black/60" : "text-white/30"}`}>{opt.desc}</div>
                              </div>
                              <ArrowRight size={20} className={formData.budget === opt.id ? "text-black" : "opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all"} />
                           </button>
                        ))}
                     </div>
                  </div>
               )}

               {step === 4 && (
                  <div className="space-y-10">
                     <div className="space-y-4">
                        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px]">Étape 04</span>
                        <h3 className="text-3xl md:text-4xl text-white font-serif font-bold">Où devons-nous transmettre le dossier ?</h3>
                     </div>
                     <div className="space-y-6">
                        <div className="space-y-4">
                           <label className="text-[10px] text-white/30 uppercase tracking-widest font-bold px-2">Email de Contact Pro</label>
                           <input 
                              type="email" required
                              placeholder="vous@entreprise.com"
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-white/5 border border-white/10 rounded-[2rem] px-8 py-5 text-white text-lg focus:outline-none focus:border-primary transition-all font-light placeholder:text-white/10" 
                           />
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <button onClick={prevStep} className="px-8 py-4 border border-white/10 text-white/40 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors">Retour</button>
                        <button 
                           onClick={onSubmit}
                           disabled={isSimulating || !formData.email}
                           className="flex-1 py-6 bg-primary text-black text-[11px] uppercase font-bold tracking-[0.3em] flex items-center justify-center gap-4 hover:shadow-[0_20px_50px_rgba(197,160,89,0.3)] transition-all disabled:opacity-30"
                        >
                           {isSimulating ? <Loader2 size={18} className="animate-spin" /> : "Générer la Simulation IA"}
                        </button>
                     </div>
                  </div>
               )}
            </motion.div>
          ) : (
            <motion.div
               key="result"
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
               className="py-10 flex flex-col items-center justify-center text-center space-y-10"
            >
               <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(197,160,89,0.15)]">
                  <Sparkles size={40} className="text-primary animate-pulse" />
               </div>
               <div className="space-y-4">
                  <h4 className="text-2xl md:text-4xl font-serif text-white font-bold italic">Analyse Complétée</h4>
                  <p className="text-white/40 text-sm font-light max-w-sm mx-auto">Basé sur votre ambition <span className="text-white">{formData.budget}</span>, notre matrice de calcul a généré une enveloppe prévisionnelle.</p>
               </div>

               <div className="p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] w-full max-w-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                     <Briefcase size={120} />
                  </div>
                  <span className="text-primary text-[10px] uppercase tracking-widest block mb-4 font-bold">Investissement Prévu Global</span>
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter text-white">{result.price}</span>
               </div>

               <p className="text-white/30 text-xs italic font-serif leading-relaxed max-w-sm">
                  L'IA Wander a transmis votre dossier à un Account Manager. Un consultant expert vous contactera d'ici 120 minutes pour affiner ce budget sur <span className="text-white">{result.email}</span>.
               </p>

               <button 
                  onClick={() => { setResult(null); setStep(1); }}
                  className="mt-8 text-[10px] font-bold uppercase tracking-widest text-primary/60 hover:text-primary transition-colors underline underline-offset-8"
               >
                  Effectuer une Nouvelle Simulation
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
