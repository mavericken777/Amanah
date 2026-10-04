# GHSCL Amanah Platinum Website — Phase 0 Tasks 1–5

**Control date:** 2026-10-04  
**Status:** COMPLETE TO PROJECT CONTROL — EXACT-HEAD CI REQUIRED BEFORE MERGE  
**Source basis:** user-supplied platinum-tier website execution specification.

## Completed tasks

| # | Task | Repository implementation | Status |
|---:|---|---|---|
| 1 | Vite + TypeScript foundation | `platinum-site/` with React/TypeScript/Vite config and validation page | COMPLETE |
| 2 | Motion/data/3D dependencies | GSAP, Lenis, Motion, D3, Three.js and type packages declared in `platinum-site/package.json` | COMPLETE |
| 3 | Obsidian & Gold tokens | `platinum-site/src/styles/tokens.css` using `oklch()` tokens | COMPLETE |
| 4 | Reduced-motion catch-all | `platinum-site/src/styles/motion.css` | COMPLETE |
| 5 | Glass + transparency fallbacks | `platinum-site/src/styles/glass.css` with unsupported and reduced-transparency fallbacks | COMPLETE |

## Architecture decision

The platinum Vite foundation is isolated in `platinum-site/` instead of replacing the repository root Next.js application. This prevents a visual-site migration from destabilising the authenticated Amanah operational application or the existing production website. Promotion to the public Pages deployment must occur only after its own gates pass.

## Validation

A dedicated `platinum-foundation` CI job installs the isolated package, runs its TypeScript/Vite production build and verifies the mandatory CSS safeguards. Existing Amanah typecheck, test, edge-function, policy, reference-runtime/platform, build and browser-smoke jobs remain unchanged as regression gates.

## Authority and evidence boundaries

This phase creates visual/runtime foundation only. It does not create Halal certification, laboratory truth, JAKIM decisions, Shipment 001 evidence, customs release, finance approval or Takaful approval.

**AHTE ⇄ Direct JAKIM API ⇄ JAKIM** remains controlling.  
**China → GCC direct** remains controlling.  
**Shipment 001 remains NOT-INSTANTIATED.**

## Next task

Phase 0 task 6 is the Lighthouse CI workflow and baseline capture. It is intentionally not marked complete in this five-task batch.
