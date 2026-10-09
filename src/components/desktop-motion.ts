import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function startDesktopMotion() {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 900px)", mobile: "(max-width: 899px)", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;
      // Lenis resolves in-page anchors short of their target on this layout, and native anchor
      // handling also keeps focus moving for the skip link, so the browser keeps that job.
      const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: false });
      let frame = 0;
      const update = (time: number) => {
        lenis.raf(time);
        frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
      lenis.on("scroll", ScrollTrigger.update);
      const onVisibility = () => {
        cancelAnimationFrame(frame);
        if (!document.hidden) frame = requestAnimationFrame(update);
      };
      document.addEventListener("visibilitychange", onVisibility);

      if (desktop && document.querySelector(".build-scene")) {
        const journey = document.querySelector<HTMLElement>(".hero-journey")!;
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: journey, start: "top top", end: "bottom top", scrub: 0.65,
          invalidateOnRefresh: true,
        }});
        timeline.to(".layer-interface", { y: -75, rotateZ: -3, duration: 1, ease: "none" }, 0)
          .to(".layer-logic", { y: -20, x: 20, duration: 1, ease: "none" }, 0)
          .to(".layer-data", { y: 45, x: 35, duration: 1, ease: "none" }, 0)
          .to(".journey-progress span", { scaleX: 1, duration: 1, ease: "none" }, 0);
      } else {
        gsap.to(".architecture", { y: 24, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      }
      gsap.utils.toArray<HTMLElement>("[data-project-card]").forEach((card) => {
        const plate = card.querySelector(".exhibit-plate");
        const info = card.querySelector(".exhibit-info");
        if (desktop && plate && info) {
          // Each exhibit settles into place as it takes the frame, then eases back as the next covers it.
          gsap.fromTo(plate, { scale: 1.08, yPercent: 4 }, {
            scale: 1, yPercent: 0, ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 90%", end: "top 12%", scrub: 0.6 },
          });
          gsap.from(info.children, {
            y: 26, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 68%", once: true },
          });
          return;
        }
        gsap.from(card, {
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%", once: true },
        });
      });
      gsap.from(".study-phone", { y: 48, rotate: 5, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".responsive-study", start: "top 80%", once: true } });
      gsap.utils.toArray<HTMLElement>(".craft-chapter, .about-portrait, .about-facts, .contact-intro").forEach((section) => {
        gsap.from(section, { y: 28, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 88%", once: true } });
      });
      gsap.from(".process-track span", { scaleX: 0, ease: "none", scrollTrigger: { trigger: ".process-section", start: "top 70%", end: "bottom 75%", scrub: true } });
      gsap.from(".process-steps li", { y: 24, stagger: 0.12, duration: 0.65, scrollTrigger: { trigger: ".process-steps", start: "top 88%", once: true } });
      return () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
        document.removeEventListener("visibilitychange", onVisibility);
        document.querySelector(".hero-journey")?.classList.remove("is-cinematic");
      };
    });

    return () => {
      media.revert();
    };
}
