import { useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let disposed = false;
    let destroy = () => {};

    void Promise.all([import("lenis"), import("gsap")]).then(([lenisModule, gsapModule]) => {
      if (disposed) return;

      const lenis = new lenisModule.default({ autoRaf: false });
      const ticker = (time: number) => lenis.raf(time * 1000);
      const { gsap } = gsapModule;

      gsap.ticker.lagSmoothing(0);
      gsap.ticker.add(ticker);
      document.documentElement.classList.add("platinum-smooth-scroll");

      destroy = () => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
        document.documentElement.classList.remove("platinum-smooth-scroll");
      };
    }).catch((error: unknown) => {
      console.error("Lenis smooth scrolling could not initialize; native scrolling remains available.", error);
    });

    return () => {
      disposed = true;
      destroy();
      document.documentElement.classList.remove("platinum-smooth-scroll");
    };
  }, [reducedMotion]);

  return null;
}
