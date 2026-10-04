# GHSCL Amanah Platinum Website — Phase 0 Tasks 1–10

**Control date:** 2026-10-04  
**Status:** TASKS 1–10 COMPLETE / VERIFIED — PR QUALITY EVIDENCE CAPTURED  
**Source basis:** user-supplied platinum-tier website execution specification plus the repository validation checklist in `docs/website/PLATINUM_DESIGN.md`.

## Completed / implemented tasks

| # | Task | Repository implementation | Status |
|---:|---|---|---|
| 1 | Vite + TypeScript foundation | `platinum-site/` with React/TypeScript/Vite config and validation page | COMPLETE |
| 2 | Motion/data/3D dependencies | GSAP, Lenis, Motion, D3, Three.js and type packages declared in `platinum-site/package.json` | COMPLETE |
| 3 | Obsidian & Gold tokens | `platinum-site/src/styles/tokens.css` using `oklch()` tokens | COMPLETE |
| 4 | Reduced-motion catch-all | `platinum-site/src/styles/motion.css` | COMPLETE |
| 5 | Glass + transparency fallbacks | `platinum-site/src/styles/glass.css` with unsupported and reduced-transparency fallbacks | COMPLETE |
| 6 | Lighthouse CI + baseline capture | `platinum-site/lighthouserc.cjs` and `platinum-quality` CI job; performance/accessibility/best-practice/SEO and Web Vitals thresholds | COMPLETE / VERIFIED |
| 7 | Automated accessibility gate | Playwright + axe-core WCAG A/AA check; serious/critical violations fail CI | COMPLETE / VERIFIED |
| 8 | Responsive browser / visual baseline | 375, 768, 1024 and 1440 px validation, console-error and horizontal-overflow guards, full-page screenshots | COMPLETE / VERIFIED |
| 9 | Bundle / asset performance budgets | `platinum-site/scripts/check-budget.mjs` limits JS, CSS and total promoted bundle size and rejects source maps | COMPLETE / VERIFIED |
| 10 | Promotion-readiness gate + evidence artifact | `check-promotion.mjs` validates built HTML/assets and CI uploads build, screenshots and Lighthouse results without deploying | COMPLETE / VERIFIED |

## Quality thresholds

The Phase 0 quality gate currently requires:

- Lighthouse performance ≥ **0.85**
- Lighthouse accessibility ≥ **0.95**
- Lighthouse best practices ≥ **0.90**
- Lighthouse SEO ≥ **0.90**
- FCP ≤ **2.0 s**
- LCP ≤ **2.5 s**
- CLS ≤ **0.10**
- no serious/critical axe WCAG A/AA violations
- no horizontal overflow at 375 / 768 / 1024 / 1440
- no page-level JavaScript errors during the isolated browser run
- JS bundle ≤ **550 KiB**
- CSS bundle ≤ **140 KiB**
- total built artifact ≤ **1.5 MiB**
- no promoted source maps, localhost references or insecure `http://` references in built HTML

These are repository quality gates, not claims about production users, real networks or physical devices. CI measurements are evidence for the exact tested build only.

## Architecture decision

The platinum Vite foundation remains isolated in `platinum-site/` instead of replacing the repository-root Next.js application or the current generated GitHub Pages site. This prevents a visual-site migration from destabilising the authenticated Amanah operational application or the current public site.

Task 10 deliberately produces a **promotion-ready artifact**, not an automatic public deployment. Promotion requires the quality gates to pass and a controlled decision to switch the public-site source.

## Validation

Amanah CI now separates:

1. `platinum-foundation` — dependency installation, TypeScript/Vite production build and CSS safeguard checks.
2. `platinum-quality` — bundle budget, promotion structure, browser/a11y validation, Lighthouse baseline and evidence artifact upload.

Existing Amanah typecheck, tests, edge functions, policies, reference runtime/platform, Next.js build and current-site browser smoke remain regression gates.

## Authority and evidence boundaries

This phase creates visual/runtime and quality-assurance infrastructure only. It does not create Halal certification, laboratory truth, JAKIM decisions, Shipment 001 evidence, customs release, finance approval or Takaful approval.

**AHTE ⇄ Direct JAKIM API ⇄ JAKIM** remains controlling.  
**China → GCC direct** remains controlling.  
**Shipment 001 remains NOT-INSTANTIATED.**

## Close-out rule

Tasks 6–10 may be changed from **COMPLETE / VERIFIED** to **COMPLETE / VERIFIED** only after the exact PR head passes both `platinum-foundation` and `platinum-quality`, the standard repository CI remains green, and the generated quality artifact is present. No production deployment is implied by that close-out.
