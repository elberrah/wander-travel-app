"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Parallax GSAP ScrollTrigger hook.
 * @param speed  - vitesse de déplacement vertical (ex: 0.3 = 30% du scroll). Positif = vers le bas.
 * @param scale  - si true, ajoute un léger zoom pendant le scroll.
 */
export function useParallax(
  speed: number = 0.3,
  scale: boolean = false
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const distance = el.offsetHeight * speed;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -distance / 2, scale: scale ? 1.12 : 1 },
        {
          y: distance / 2,
          scale: scale ? 1 : 1,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed, scale]);

  return ref;
}

/**
 * Parallax pour les sections hero avec fond d'image.
 * L'image monte plus lentement que le scroll → effet cinématique.
 */
export function useHeroParallax(speed: number = 0.4) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current?.parentElement || ref.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

/**
 * Parallax de galerie : déplace les photos à des vitesses différentes.
 */
export function useGalleryParallax(speed: number = 0.15) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: el.offsetHeight * speed * -0.5 },
        {
          y: el.offsetHeight * speed * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 1.5,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}
