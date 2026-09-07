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

      if (desktop && document.querySelector(".portal-reveal")) {
        const journey = document.querySelector<HTMLElement>(".hero-journey")!;
        journey.classList.add("is-cinematic");
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: journey, start: "top top", end: "bottom bottom", scrub: 0.65,
          invalidateOnRefresh: true,
        }});
        timeline.to(".hero-copy, .hero .nav, .scroll-cue", { autoAlpha: 0, y: -35, duration: 0.25 }, 0)
          .to(".architecture", { scale: 2.7, transformOrigin: "72% 47%", duration: 1, ease: "power1.inOut" }, 0)
          .fromTo(".portal-reveal", { clipPath: "circle(0% at 72% 47%)" }, { clipPath: "circle(110% at 72% 47%)", duration: 0.65, ease: "power2.inOut" }, 0.28)
          .fromTo(".reveal-surface", { scale: 1.16 }, { scale: 1, duration: 0.65, ease: "power1.out" }, 0.3)
          .fromTo(".reveal-caption", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.18 }, 0.8)
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
      if (desktop) {
        const stack = gsap.timeline({ scrollTrigger: { trigger: ".craft-chapters", start: "top 65%", end: "bottom 80%", scrub: 0.7 } });
        stack.to(".plane-interface", { y: -170, rotateX: 6, rotateY: -8, rotateZ: -4, duration: 1 }, 0)
          .to(".plane-logic", { y: 90, rotateX: 6, rotateY: -8, rotateZ: -4, duration: 1 }, 0)
          .to(".plane-data", { y: 290, rotateX: 6, rotateY: -8, rotateZ: -4, duration: 1 }, 0)
          .to(".craft-orbit", { scale: 1.1, duration: 1 }, 0);
      }
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
