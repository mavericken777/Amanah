import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, reducedMotion
    ? { stiffness: 1000, damping: 1000, mass: 0.01 }
    : { stiffness: 180, damping: 32, mass: 0.22 });

  return (
    <motion.div
      className="platinum-scroll-progress"
      style={{ scaleX: reducedMotion ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  );
}
