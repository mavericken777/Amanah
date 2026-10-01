"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("entered"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    const elements = document.querySelectorAll(".page > header, .page > section, .auth-story-copy, .auth-card");
    elements.forEach(element => { element.classList.add("motion-entry"); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach(element => element.classList.remove("motion-entry", "entered")); };
  }, [pathname]);
  return null;
}
