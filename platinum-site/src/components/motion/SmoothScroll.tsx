import { useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let cleanup = () => {};
    const start = async () => {
      const [{ default: Lenis }, { gsap }] = await Promise.all([
        import("lenis"),
        import("gsap"),
      ]);
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.88,
      });

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };

    const idle = "requestIdleCallback" in window
      ? window.requestIdleCallback(() => void start(), { timeout: 900 })
      : window.setTimeout(() => void start(), 250);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window && typeof idle === "number") {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
      cleanup();
    };
  }, [reducedMotion]);

  return null;
}
