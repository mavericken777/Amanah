# AMANAH China Trip — Platform Demonstration Guide

**Control date:** 7 October 2026  
**Purpose:** one coherent, meeting-ready walkthrough of the complete AMANAH / Global Halal Digital Trust platform.

## Start here

### Public presentation
- GitHub Pages home: `https://mavericken777.github.io/Amanah/`
- One-click Platform Tour: `https://mavericken777.github.io/Amanah/platform-tour.html`
- Complete framework: `/standards.html`
- Smart Audit: `/smart-audit.html`
- China → GCC: `/china-gcc.html`
- GCC Importer: `/gcc-importer.html`
- GCC Distributor: `/distributor.html`
- Retail / Marketplace: `/retail-market.html`
- API & Interoperability: `/interoperability.html`
- Cybersecurity: `/cybersecurity.html`
- Command Center: `/command-center.html`
- Verification: `/verify.html`

### Protected operational application
- Canonical application: `https://amanah-yq9x.vercel.app/`
- One-click platform tour: `/ahte/platform-tour`
- Manufacturer onboarding: `/onboarding`
- AHTE control plane: `/ahte`
- Laboratory: `/ahte/laboratory`
- Audit / CAPA: `/ahte/controls`
- Production monitoring: `/ahte/monitoring`
- Trade / custody: `/ahte/shipments`
- GCC Importer: `/ahte/gcc-importer`
- Distributor / 3PL: `/ahte/distributor`
- Retail / Marketplace: `/ahte/retail-market`
- 24/7 Command Center: `/ahte/command-center`
- China Mission workspace: `/china-trip`

## 12-minute default meeting flow

1. **Platform Tour** — establish the full manufacturer → GCC consumer story.
2. **Authority topology** — AHTE ⇄ Direct JAKIM API ⇄ JAKIM; AI assists, authorised humans / competent authorities decide.
3. **Manufacturer onboarding** — organisation, KYC, facility, product/SKU, suppliers/materials, documents, readiness.
4. **Standards and evidence** — complete applicable Malaysian/JAKIM framework, applicability, controls, HCP/SCCP and evidence.
5. **Laboratory + Smart Audit** — sample chain, method/QC/report; smart-glass/tablet capture, findings, CAPA, re-verification.
6. **Production + Digital Twin** — ERP/MES/QMS/WMS/LIMS/IoT evidence, devices, batches and continuous monitoring.
7. **Sinotrans + custody** — origin warehouse, pickup, vehicle/container/seal, GNSS/condition, port handoffs.
8. **GCC Importer** — pre-arrival, port release reference, receiving, discrepancy/quarantine, acceptance and inventory.
9. **Distributor / 3PL** — lot movement, FEFO/FIFO, allocation, custody transfer, delivery and withdrawal.
10. **Retail / Marketplace** — listing eligibility, receiving, shelf/fulfilment status, verification and recall.
11. **Command Center** — cross-corridor exceptions, predictive/preemptive recommendation, incident and recall coordination.
12. **Verification** — approved disclosure to buyer/retailer/authority/consumer.

## Guided platform walkthrough

Use the connected platform journey to explain how AMANAH works end to end without exposing internal fixture identifiers or engineering-state chatter. Where a meeting needs example data, use the platform's guided journey presentation and replace it with authorised project records when available.

## Partner pivots

### CODA / manufacturers
Stay on Platform Tour → Manufacturer onboarding → Standards → Hardware → Smart Audit → Command Center.

### Sinotrans
Stay on China → GCC → Trade / custody → Distributor → Command Center → API & Interoperability.

### Laboratory / traceability
Stay on Laboratory → Digital Trust → Smart Audit → Verification → API & Interoperability.

### GCC importer / retailer
Stay on GCC Importer → Distributor → Retail / Marketplace → Verification → Recall / Command Center.

### Institutional / authority discussion
Stay on Standards → Digital Trust → authority topology → evidence / trust-state separation → Command Center.

### Technology / cybersecurity
Stay on Hardware → API & Interoperability → Cybersecurity → continuity/offline evidence → Command Center.

## Core statements to keep consistent

- **AHTE ⇄ Direct JAKIM API ⇄ JAKIM.**
- **China → GCC direct.**
- **Complete applicable Malaysian/JAKIM framework — not MS1500 + MS2400 only.**
- **AI assists; authorised humans and competent authorities decide.**
- **NOT_DETECTED ≠ HALAL.**
- **Evidence before trust. Trust before operational release.**
- **Importer, distributor, retailer and consumer are first-class participants.**
- **A hash proves integrity of recorded bytes, not truth of the underlying statement.**

## Exception demonstration

Use the canonical sequence:

**DETECTED → CLASSIFIED → CONTAINED / HOLD → INVESTIGATING → CAPA → RE-VERIFICATION → CLOSED / ESCALATED / RECALLED**

Then show blast radius across material → batch → SKU → shipment → container → importer → warehouse → distributor → retailer → public verification state.

## Meeting close

End with the stakeholder-specific next step:
- onboarding candidate;
- pilot lane/site;
- method/sampling integration;
- WMS/TMS/API discovery;
- importer/retailer receiving requirements;
- sandbox/UAT;
- MOA schedule;
- named owner and decision date.

The platform should be demonstrated as a complete operating architecture; do not reduce the demonstration to a certificate-checking workflow.
