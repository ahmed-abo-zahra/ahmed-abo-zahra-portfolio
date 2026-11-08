"use client";

import { useEffect } from "react";

function startMobileMotion() {
  const animations: Animation[] = [];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const stagger = entry.target.matches('.process-steps li') ? Array.from(entry.target.parentElement!.children).indexOf(entry.target) * 120 : 0;
      animations.push(entry.target.animate(
        [{ transform: 'translateY(24px)' }, { transform: 'translateY(0)' }],
        { duration: 700, delay: stagger, easing: 'cubic-bezier(.22,1,.36,1)' },
      ));
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -12% 0px' });
  document.querySelectorAll('[data-project-card], .process-steps li').forEach(element => observer.observe(element));

  const architecture = document.querySelector<HTMLElement>('.architecture');
  const hero = document.querySelector<HTMLElement>('.hero');
  let frame = 0;
  let height = hero?.offsetHeight || 1;
  const draw = () => {
    frame = 0;
    if (architecture) architecture.style.transform = `translateY(${Math.min(1, Math.max(0, window.scrollY / height)) * 24}px)`;
  };
  const scroll = () => { if (!frame) frame = requestAnimationFrame(draw); };
  const resize = () => { height = hero?.offsetHeight || 1; scroll(); };
  window.addEventListener('scroll', scroll, { passive: true });
  window.addEventListener('resize', resize);
  draw();
  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    animations.forEach(animation => animation.cancel());
    window.removeEventListener('scroll', scroll);
    window.removeEventListener('resize', resize);
    architecture?.style.removeProperty('transform');
  };
}

export default function MotionExperience() {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let generation = 0;
    let dispose: (() => void) | undefined;
    const update = () => {
      const current = ++generation;
      dispose?.();
      dispose = undefined;
      if (reduced.matches) return;
      if (!desktop.matches) {
        dispose = startMobileMotion();
        return;
      }
      // Desktop choreography is fetched only when it will actually be used.
      void import('./desktop-motion').then(({ startDesktopMotion }) => {
        if (current === generation) dispose = startDesktopMotion();
      }).catch(() => { /* The complete static page remains usable if the enhancement cannot load. */ });
    };
    update();
    desktop.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      generation++;
      dispose?.();
      desktop.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);
  return null;
}
