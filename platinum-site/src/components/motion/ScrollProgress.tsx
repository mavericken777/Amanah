import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="platinum-scroll-progress"
      style={{ scaleX: reducedMotion ? scrollYProgress : springProgress }}
      aria-hidden="true"
    />
  );
}
