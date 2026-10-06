# Global Halal Digital Trust Ecosystem website

Static stakeholder-facing website for Global Halal Supply Chain Ltd HK (GHSCL).

Website brief: [5 October 2026 delivery brief](../docs/operations/WEBSITE_BRIEF_2026-10-05.md). China-trip stakeholder presentation follows the [7 October Platinum-Tier master prompt](../docs/mission/CHINA_TRIP_PLATINUM_MASTER_PROMPT_2026-10-07.md). The homepage is a single interactive China → GCC product journey with Arial/Helvetica-style typography, black/gold institutional styling and no oversized decorative shield.

Proposal V7.2 is bound to `GlobalHalalDigitalTrust@14456e99937d6f11d63bd041dcffdb903d12594f` and the unchanged freeze `master-standards-stack/verified-2026-09-17/`.

The public information architecture covers:

- ecosystem roles and authority boundaries;
- complete operating lifecycle;
- AHTE digital trust;
- China traceability + laboratory integration;
- 24/7 GHSCL operational + authorised JAKIM authority-side Command Center;
- predictive analytics + explicit Preemptive Strategy Engine;
- end-to-end traceability;
- smart-glass AI-assisted audit;
- China → GCC direct corridor;
- Sinotrans warehouse + end-to-end logistics real-time integration;
- origin/GCC port-customs API trust interfaces;
- manufacturers/onboarding;
- Shariah Financing API / Takaful / approved tokenomics target plane;
- public verification;
- contact / workstream routing.

The project authority topology displayed publicly is:

`AHTE ⇄ Direct JAKIM API ⇄ JAKIM`

Formal certification review remains an authorised human authority workflow. A generic software gateway may exist internally as an adapter abstraction, but the public/project topology must not insert a fictional intermediary between AHTE and JAKIM.

## Build

English content is structured in `ecosystem.en.json`; `scripts/build-ecosystem-site.mjs` generates public pages, navigation/footer, source links and SEO artifacts.

The GitHub Pages workflow performs:

1. `npm ci`
2. `npm run web:build`
3. `npm run web:lint`
4. Pages artifact upload/deployment

This prevents source-content changes from leaving generated public pages stale.

Simplified Chinese, Malay and Arabic/RTL remain planned localization targets until delivered translations are actually present.

## Presentation accuracy

Keep stakeholder pages clean and confident while preserving the real decision model:

- AI assists; authorised humans / competent authorities decide.
- Laboratory results are evidence.
- Hashes preserve integrity; they do not establish the truth of an underlying claim.
- Port/customs release remains a sovereign decision.
- Financing/Takaful decisions remain with the relevant authorised institutions.
- External partnerships and production connections are represented as executed only when supporting evidence exists.

Do not repeat these points as warning panels throughout the site; place them only where they explain the relevant workflow.

## Corridor

Default physical corridor: **China → GCC direct**.

Malaysia remains the governance/assurance/authority-connectivity plane unless a separate physical movement is explicitly scoped. Shipment 001 remains `[PILOT]` and is not instantiated by website content or demonstrations.

Current China execution sources use canonical `master-standards-stack/CHINA_EXECUTION_PACK/`; the lower-case duplicate path is retired lineage.

## Temporary hosting

GitHub Pages publishes this folder as the temporary stakeholder site:

`https://mavericken777.github.io/Amanah/`

The website presents the complete platform architecture. Production partner connections use the same architecture when counterpart credentials and permissions are activated.
