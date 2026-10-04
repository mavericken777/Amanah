# Platinum Site Phase 6 Audit — 2026-10-04

**Audited main commit:** `3a900d445538777a2d6e96071a11c3a61dd89cf6`  
**Phase 5 PR:** #72, merged at `8c57cac7949dfe005abaf1bbad1b4259a0b20771`  
**Main CI:** run 37186573562 — SUCCESS  
**Pages promotion:** run 37186740517 — SUCCESS  
**Disposition:** Phase 5 rollout is deployed. The attached specification's full Phase 6 gate is **not yet met**; do not describe the entire site as fully complete or travel-ready.

## Verified

- All main CI jobs passed on the audited commit, including typecheck, tests, builds, browser smoke, route smoke, accessibility/Lighthouse quality, policy and runtime suites.
- Platinum CI generated the homepage and 12 secondary HTML routes.
- Responsive smoke exercised 375, 768, 1024 and 1440 px widths, interaction flows and axe WCAG 2.1 A/AA checks. It asserted no serious or critical axe violations.
- Reduced-motion smoke confirmed all four journey stages remain present and the shield has a static fallback without requiring WebGL.
- Lighthouse CI met the configured thresholds: performance ≥ 0.90, accessibility 1.00, best practices ≥ 0.95, SEO 1.00, FCP ≤ 2 s, LCP ≤ 2.5 s, CLS ≤ 0.10 and TBT ≤ 200 ms.
- Pages workflow succeeded for the exact main commit. The public homepage was reloaded and inspected after deployment.
- Production-facing copy correctly retains pending JAKIM authorization, non-live sample/telemetry disclosures, China → GCC default corridor, and Shipment 001 not instantiated.

## Open specification gaps

| Requirement | Observed state | Closure needed |
|---|---|---|
| Total JS ≤ 200 KB gzipped | Build emitted 366,930 bytes (358.3 KiB) across entry and async chunks. Entry alone is 90,957 bytes; the current budget checks entry size and each async chunk separately, so the aggregate target is not enforced. | Reduce aggregate shipped JavaScript to ≤204,800 bytes, or obtain an explicit revised budget interpretation before marking this gate complete. |
| Lenis + GSAP single RAF and Motion scroll progress | Implemented in PR #75: Lenis uses `autoRaf: false` and GSAP's ticker; Motion `useScroll/useSpring` drives progress, with reduced-motion bypass. | Closed after exact-head and post-merge CI pass. |
| Lighthouse coverage of homepage | CI processes five discovered URLs; the run log does not list the homepage among them. | Add the root route explicitly to Lighthouse collection and confirm it is assessed on mobile. |
| Reduced-transparency behavior | CSS fallback exists and CI checks for its selector, but the browser smoke does not emulate reduced transparency. | Add automated emulation coverage where supported and inspect fallback rendering. |
| Physical-device / 3G validation | CI uses desktop Chromium viewport emulation. No physical phone or throttled 3G test is recorded. | Run the attached real-device and 3G checks and save the results before closing Phase 6. |
| 60 fps on mid-range mobile | No device-profiled frame-rate evidence is present in CI. | Profile the interactive shield, map and journey on a representative mid-range phone. |

## Bundle measurement from exact-main CI

- Entry JavaScript gzip: 90,957 bytes
- Lazy shield runtime gzip: 138,928 bytes
- D3/map chunk gzip: 92,540 bytes
- GSAP chunk gzip: 27,107 bytes
- ScrollTrigger chunk gzip: 17,398 bytes
- Aggregate gzip: 366,930 bytes (358.3 KiB)
- Compressed CSS: 10.1 KiB; uncompressed CSS: 49,152 bytes
- Total built artifact: 1,319,325 bytes

The optional shield, map and animation chunks are split from the entry and loaded lazily, which protects initial load, but that does not satisfy the brief's literal aggregate-JavaScript ceiling.

## Source/documentation corrections

- Phase 4 closeout previously claimed Lenis and Motion integrations that the shipped components do not implement. The documentation now describes the actual CSS/requestAnimationFrame behavior and marks task 26 partial.
- Phase 4 previously remained marked verification-pending after its successor had merged and deployed. Its deployment status is reconciled here without treating its remaining requirements as complete.
- Phase 5 status reflects successful exact-head CI, post-merge CI and Pages promotion.

**Completion rule:** keep Phase 6 open until all open specification gaps above are closed and verified.