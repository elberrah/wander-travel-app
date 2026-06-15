"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  imageUrl: string;
  title: string;
  subtitle: string;
  imageClassName?: string;
  className?: string; // Appended to the wrapper for things like aspect-[4/5]
}

export function TiltCard({ children, imageUrl, title, subtitle, imageClassName, className = "aspect-[3/4] md:aspect-[4/5]" }: TiltCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize mouse position between -0.5 and 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${className} rounded-[2rem] overflow-hidden cursor-pointer group shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/5 hover:border-[#c5a059]/30 transition-colors duration-500`}
    >
      {/* Background Image with Parallax Depth */}
      <motion.div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform brightness-[0.85] contrast-125 saturate-50 sepia-[.15] ${imageClassName || ""}`}
        style={{
          backgroundImage: `url('${imageUrl}')`,
          transform: "translateZ(-50px)",
        }}
      />
      
      {/* Glare/Lighting effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

      {/* Content wrapper with perspective translation */}
      <motion.div 
        style={{ transform: "translateZ(60px)" }} // Pop out in 3D space
        className="absolute inset-0 z-20 p-8 flex flex-col justify-end"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">
          {subtitle}
        </span>
        <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
          {title}
        </h3>
        
        {children}
      </motion.div>
    </motion.div>
  );
}
