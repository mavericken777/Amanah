> HISTORICAL / SUPERSEDED / NON-CONTROLLING. Original audit evidence is retained below. Current source binding, topology, readiness and gates are controlled by [STATUS](../operations/STATUS.md), [SOURCE_BINDING](../ahte/SOURCE_BINDING.md) and [PENDING](../operations/PENDING.md). Historical closure claims apply only to their recorded review.

# Global Halal Digital Trust website rebuild — V7 reconciliation

BOUNDARY CHECK: derived from `GlobalHalalDigitalTrust@0fab4c64240b569caef947fb2568ccda9d3fa0d3`; freeze remains `master-standards-stack/verified-2026-09-17/`.

## Purpose

This review supersedes V6 **for current public architecture only**. Historical V6 records remain evidence of their earlier review state.

## Current public architecture

| Required architecture | V7 implementation |
|---|---|
| China → GCC direct | explicit on corridor and lifecycle pages |
| Malaysia governance/assurance/authority-connectivity | explicit; no default Malaysia physical hop |
| Direct JAKIM API | public topology is `AHTE ⇄ Direct JAKIM API ⇄ JAKIM` |
| PHC + JAKIM authorised human review | authority decision remains human/competent-authority workflow |
| 24/7 GHSCL + authorised JAKIM-side Command Center | dedicated public page and homepage positioning |
| AI/ML predictive analytics | explicit analytics layer |
| Preemptive Strategy Engine | explicit first-class control loop |
| China traceability + laboratory | serialization/aggregation/anti-diversion plus sample/custody/method/result evidence |
| Sinotrans warehouse + logistics | WMS/TMS/Y2T/MIS/EDI/IoT and custody/telemetry scope |
| Port/customs API | explicit sovereign trust interface |
| Manufacturer onboarding | full scalable onboarding architecture |
| Shariah finance / Takaful / approved tokenomics | dedicated public target page with decision boundaries |
| Federated data sovereignty | minimum-necessary signed assertions/references/hashes/scoped metadata |
| Public verification | issuer-authorized disclosure only |

## Source and generation model

`ghscl-website/ecosystem.en.json` is the V7 structured presentation source. Build-time source binding must resolve to the current project target `0fab4c64240b...`; current project source links use the canonical uppercase `master-standards-stack/CHINA_EXECUTION_PACK/` and current China lab traceability profile.

`scripts/build-ecosystem-site.mjs` generates the public pages. GitHub Pages runs `npm ci`, `npm run web:build`, and `npm run web:lint` before deployment, preventing static pages from being published from an unvalidated source state.

## Prohibited public claims

The website must not say or imply that:

- AI/ML certifies Halal;
- laboratory results create certification;
- AHTE creates JAKIM decisions;
- AHTE creates port/customs sovereign release;
- a hash proves truth rather than integrity relative to a digest;
- financing approval follows automatically from Halal/trust state;
- Takaful decisions are made by AHTE;
- tokenization itself changes ownership/title/Shariah/regulatory/certification status;
- Shipment 001 is live merely because architecture/demo state exists.

## Production boundary

Direct JAKIM API, laboratory, Sinotrans, port/customs, GCC and finance/Takaful/tokenomics production connectors remain explicit external/engineering gates until authorised contracts, credentials, security controls and transaction evidence exist.

**FULL ARCHITECTURE NOW → REAL CONNECTORS WHEN AVAILABLE → NO REDESIGN REQUIRED.**

[PILOT: Shipment 001 — China → GCC direct; NOT-INSTANTIATED]
