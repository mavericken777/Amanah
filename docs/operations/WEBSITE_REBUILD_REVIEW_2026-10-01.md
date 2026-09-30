# Global Halal Digital Trust website rebuild — V7 reconciliation

BOUNDARY CHECK: derived from `GlobalHalalDigitalTrust@ae3f662f7467aba78e64060c031db0f098dbdd49`; freeze remains `master-standards-stack/verified-2026-09-17/`.

## Purpose

This review supersedes V6 **for current public architecture only**. Historical V6 records remain evidence of their earlier review state.

## Current public architecture

| Required architecture | V7 implementation |
|---|---|
| China → GCC direct | explicit on corridor and lifecycle pages |
| Malaysia governance/assurance | explicit; no default Malaysia physical hop |
| Direct JAKIM API | public topology is `AHTE ⇄ Direct JAKIM API ⇄ JAKIM` |
| 24/7 GHSCL + JAKIM-connected Command Center | dedicated public page and homepage positioning |
| AI/ML predictive analytics | explicit analytics layer |
| Preemptive Strategy Engine | explicit first-class control loop |
| Sinotrans warehouse + logistics | WMS/TMS/Y2T/MIS/EDI/IoT and custody/telemetry scope |
| Port/customs API | explicit sovereign trust interface |
| Laboratory integration | sample/custody/method/result evidence workflow |
| Manufacturer onboarding | nine-gate scalable onboarding architecture |
| Shariah finance / Takaful / tokenomics | dedicated public target page with decision boundaries |
| Public verification | issuer-authorized disclosure only |

## Source and generation model

`ghscl-website/ecosystem.en.json` is the V7 structured source and is pinned to the reconciled GHDT target commit.

`scripts/build-ecosystem-site.mjs` generates the public pages. GitHub Pages now runs `npm ci`, `npm run web:build`, and `npm run web:lint` before deployment, so static pages are regenerated from the current structured source rather than relying on manually committed stale HTML.

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
- Shipment 001 is live merely because the architecture/demo exists.

## Production boundary

Direct JAKIM API, laboratory, Sinotrans, port/customs, GCC and finance/Takaful/tokenomics production connectors remain external/engineering gates until their authorised contracts, credentials, security controls and transaction evidence exist.

[PILOT: Shipment 001 — China → GCC direct; NOT-INSTANTIATED]
