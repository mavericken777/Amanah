# GHSCL Amanah Platinum Site — Phase 0

This package is the Vite + TypeScript foundation for the next-generation public trust-terminal experience.

It is intentionally isolated from the existing Next.js protected Amanah application and the current generated GitHub Pages site so Phase 0 can be built and validated without destabilising production surfaces. Later promotion into the public deployment must pass the repository release gates.

## Phase 0 implemented

1. Vite + TypeScript + React foundation.
2. GSAP, Lenis, Motion, D3 and Three.js dependency manifest.
3. `src/styles/tokens.css` — Obsidian & Gold tokens using `oklch()`.
4. `src/styles/motion.css` — global reduced-motion safeguard.
5. `src/styles/glass.css` — glass treatment with unsupported/reduced-transparency fallbacks.

The foundation page renders the token system for validation only. It does not claim live telemetry, laboratory results, authority decisions or Shipment 001 evidence.

## Local commands

```bash
cd platinum-site
npm install
npm run dev
npm run build
npm run preview
```

The repository CI runs the Phase 0 build and validates the required CSS safeguards.
