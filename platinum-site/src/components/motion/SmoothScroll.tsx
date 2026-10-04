import { useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    document.documentElement.classList.add("platinum-smooth-scroll");
    return () => document.documentElement.classList.remove("platinum-smooth-scroll");
  }, [reducedMotion]);

  return null;
}
