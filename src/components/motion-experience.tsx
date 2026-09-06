"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MotionExperience() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let frame = 0;
    const update = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    lenis.on("scroll", ScrollTrigger.update);

    const context = gsap.context(() => {
      gsap.to(".portal-scene", {
        yPercent: 22,
        rotate: -3,
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 46,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        });
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      context.revert();
    };
  }, []);

  return null;
}
