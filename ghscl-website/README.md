# Global Halal Digital Trust Ecosystem website

Static stakeholder-facing website for Global Halal Supply Chain Ltd HK (GHSCL).

Proposal V7 is bound to `GlobalHalalDigitalTrust@ae3f662f7467aba78e64060c031db0f098dbdd49` and the unchanged freeze `master-standards-stack/verified-2026-09-17/`.

The public information architecture now covers:

- ecosystem roles and authority boundaries;
- complete operating lifecycle;
- AHTE digital trust;
- 24/7 GHSCL + JAKIM-connected Command Center;
- predictive analytics + explicit Preemptive Strategy Engine;
- end-to-end traceability;
- smart-glass AI-assisted audit;
- China → GCC direct corridor;
- Sinotrans warehouse + end-to-end logistics real-time integration;
- port/customs API trust interfaces;
- manufacturers/onboarding;
- Shariah Financing API / Takaful / tokenomics target plane;
- public verification;
- contact / workstream routing.

The project authority topology displayed publicly is:

`AHTE ⇄ Direct JAKIM API ⇄ JAKIM`

A generic software gateway may exist internally as an adapter abstraction, but the public/project topology must not insert a fictional intermediary between AHTE and JAKIM.

## Build

English content is structured in `ecosystem.en.json`; `scripts/build-ecosystem-site.mjs` generates public pages, navigation/footer, source links and SEO artifacts.

The GitHub Pages workflow now performs:

1. `npm ci`
2. `npm run web:build`
3. `npm run web:lint`
4. Pages artifact upload/deployment

This prevents source-content changes from leaving generated public pages stale.

Chinese, Malay and Arabic remain planned, not delivered translations.

## Public boundary

Interactive architecture examples are demonstration-only. Smart audit is not connected hardware/AI inference unless a production provider is configured. Manufacturer readiness/contact tools do not create applications, certification or authority records.

Public verification uses an issuer-authorized token. It does not search private factory data, expose service credentials, independently verify all upstream signatures, or create formal certification.

The website must never imply that:

- AI/ML certifies Halal;
- laboratory results certify Halal;
- cryptographic hashes prove the underlying claim is true;
- AHTE creates JAKIM decisions;
- AHTE creates sovereign port/customs release;
- AHTE creates financing/Takaful decisions;
- tokenization itself changes legal title, regulatory status, Shariah status or certification state.

## Corridor

Default physical corridor: **China → GCC direct**.

Malaysia remains the governance/assurance plane unless a separate physical movement is explicitly scoped. Shipment 001 remains `[PILOT]` and is not instantiated by website content or demonstrations.

## Temporary hosting

GitHub Pages publishes this folder as the temporary stakeholder site:

`https://mavericken777.github.io/Amanah/`

External production integrations remain explicit gates: direct JAKIM API, China laboratory, Sinotrans production systems, port/customs authorities, GCC destination systems, and Shariah finance/Takaful/tokenomics counterparties.