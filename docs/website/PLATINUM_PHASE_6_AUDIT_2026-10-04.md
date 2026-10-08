# Platinum Site Phase 6 Audit — refreshed 2026-10-08

**Audited main commit:** `c858a1af29aab8d8d84a626933ae0911b705535b`  
**Main CI run:** 37737399678 — SUCCESS  
**Pages promotion:** 37737908070 — SUCCESS  
**Disposition:** The prior 4 October audit is superseded by this evidence. All currently automatable Phase 6 gates pass. A physical-device frame-rate profile remains open; do not claim it was measured.

## Verified on current main

- Main CI passed all jobs, including build, browser smoke, mobile smoke, route smoke, accessibility, Lighthouse, policies and reference-runtime suites.
- CI generated 25 secondary HTML routes in addition to the homepage.
- Responsive and accessibility smoke passed at 375, 768, 1024 and 1440 px.
- Reduced-motion content remained available without the motion enhancements. The mobile smoke emulated `prefers-reduced-transparency: reduce` and verified the opaque blur-free glass fallback.
- The controlling homepage is included in desktop Lighthouse collection: 13 URL runs (homepage plus 12 visitor routes). Mobile Lighthouse assesses the homepage. The configured score and timing thresholds passed.
- Simulated mobile 3G rendered the homepage in 3,182 ms, below the 45-second usability limit. This is browser emulation, not a physical-device measurement.
- Aggregate JavaScript gzip measured 200,863 bytes, below the 204,800-byte (200 KiB) ceiling. CSS measured 93,601 bytes; the built site artifact measured 738,161 bytes.
- This PR changes the budget gate to fail when aggregate JavaScript exceeds 204,800 bytes. The measured current build is under that threshold.

## Remaining device-specific validation

| Requirement | Current evidence | Remaining work |
|---|---|---|
| Physical-device mobile usability | Responsive viewport and simulated 3G CI checks pass. | Validate on a representative physical mid-range Android or iOS device and retain the results. |
| 60 fps on mid-range mobile | No physical-device frame-time profile is available. | Profile the journey, map and remaining animated elements on a representative mid-range device. |

## Scope boundary

This audit concerns the platinum website performance and interaction gates. Production authentication, real partner integrations, authority acceptance, production UAT and Shipment 001 evidence remain in the private activation checklist and are not satisfied by this site audit.

**Completion rule:** Keep the device-specific gate open until physical-device evidence is recorded.