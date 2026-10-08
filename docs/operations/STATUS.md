# AMANAH current platform summary

**Updated:** 8 October 2026

AMANAH / Global Halal Digital Trust is presented as one end-to-end platform for China-origin Halal trade, assurance, custody and GCC market verification.

## Controlling delivery prompts

Primary platform brief:

- [100% end-to-end master execution prompt](../AMANAH_100_PERCENT_END_TO_END_MASTER_EXECUTION_PROMPT_2026-10-07.md)

Mission-specific brief:

- [Master delivery prompt](../AMANAH_CHINA_TRIP_MASTER_DELIVERY_PROMPT_2026-10-07.md)
- [Prompt coverage audit](../mission/AMANAH_CHINA_TRIP_PROMPT_COVERAGE_AUDIT_2026-10-07.md)
- [Website presentation brief](WEBSITE_BRIEF_2026-10-05.md)
- [Master deliverable index](MASTER_DELIVERABLE_INDEX_2026-10-03.md)
- [Wholesome platform coverage audit](WHOLESOME_PLATFORM_COVERAGE_AUDIT_2026-10-07.md)

The trip-facing package prioritises finished decks, corporate profile, MOAs, partner playbooks, hardware/CODA material, API/port material, meeting briefs, Mandarin adaptations, website, infographics and film assets. Repository mechanics and engineering-status material stay outside the presentation package.

## Platform architecture

**AHTE ⇄ Direct JAKIM API ⇄ JAKIM**

**China → GCC direct**

AI assists. Authorised humans and competent authorities decide.

Evidence before trust. Trust before operational release.

The lifecycle connects manufacturer/KYC, facility, product/SKU, supplier/material provenance, standards applicability, evidence, laboratory, smart audit, CAPA, authority workflow, production/IoT/digital twin, batch, warehouse, Sinotrans logistics, custody, ports/customs, GCC importer receiving, distributor/3PL custody, retailer/marketplace operations, buyer/authority/consumer verification and the 24/7 Command Center.

## Malaysian / JAKIM framework

The standards architecture is registry-driven and is not limited to MS 1500 or MS 2400.

The registry is not capped to a permanent count. The current verified primary catalogue contains 17 current standards in `docs/ahte/MS_OPERATING_SET.json`; every additional verified applicable product/technical instrument, including MS 2683:2017 when in scope, is evaluated without redesign.

The wider framework includes MPPHM 2020, MHMS 2020, HAS, IHCS, protocols, circulars, authority instructions, destination rules and laboratory methods.

Historical/superseded editions remain available for provenance and change impact; they are not silently treated as current requirements.

## Presentation experience

The public website and authenticated application use the same platform story, including a one-click China Mission Platform Tour and first-class GCC importer, distributor/3PL and retailer/marketplace workspaces:

- black / obsidian + metallic gold;
- Arial / Helvetica / neutral sans-serif;
- no oversized decorative shield;
- complete Malaysian/JAKIM standards registry;
- manufacturer, laboratory, audit, production, logistics, ports, dedicated GCC importer, distributor/3PL, retailer/marketplace, verification, finance/Takaful and Command Center;
- concise institutional language suitable for China-mission meetings.

## Current public-site delivery

The animated end-to-end redesign is in [PR #130](https://github.com/mavericken777/Amanah/pull/130), commit `91a19decf3ff429dee7cfaec7f6a6a5b24aab764`. It includes an informative 20-stage process journey, neutral sans-serif typography, the full company name and no oversized front-page shield. The steps cover onboarding, standards, evidence, lab testing, smart audit, CAPA/re-verification, authority workflow, production, warehouse, Sinotrans custody, ports/customs, GCC receiving, distributor/retailer handling, verification and monitoring.

GitHub CI for the PR passes the code, build, tests, browser smoke and quality checks. The two Vercel preview checks currently report a provider build-rate limit. The PR remains open, and [GitHub Pages](https://mavericken777.github.io/Amanah/) still serves the previous release. The work is ready for review; the preview/deployment condition does not block continued implementation.

## Internal release validation

Repository releases still undergo the required automated build, type, test, security-policy, browser and deployment checks. Those mechanics are internal QA and are not part of the China-trip presentation material.
