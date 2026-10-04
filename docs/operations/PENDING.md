# Pending closure

Current mutable repository head is controlled by `docs/operations/STATUS.md`; historical batch SHAs remain audit-time snapshots.

The verified freeze remains `master-standards-stack/verified-2026-09-17/`.

Repository-controlled architecture synchronization is handled in `docs/operations/STATUS.md`. Historical reconciliation reports remain historical evidence and are not rewritten to imply later review.

## Authority integration topology

AHTE ⇄ Direct JAKIM API ⇄ JAKIM. China → GCC direct. Malaysia provides governance, assurance and authority connectivity.

## External / account / transaction gates

- [SOURCE-LOCKED: licensed normative requirement text — required: licensed authority/standards source artifacts]
- [SOURCE-LOCKED: exact production direct JAKIM API endpoints, authentication, scopes, permissions and payload contracts — required: authorised JAKIM technical integration specification]
- [OPEN GATE: competent-authority decisions — owner: JAKIM/MAIN/JAIN or applicable competent authority — blocking: Authority Gate]
- [OPEN GATE: China laboratory production API/credentials/method scope — owner: laboratory/system operator — blocking: Sample → Evidence]
- [OPEN GATE: Sinotrans production WMS/TMS/Y2T/MIS/EDI/IoT interfaces and site/lane security agreement — owner: Sinotrans + GHSCL — blocking: Custody / Platinum Monitoring]
- [OPEN GATE: origin and GCC port/customs production interfaces/permissions — owner: sovereign port/customs authorities — blocking: Port Custody → Operational Release]
- [OPEN GATE: GCC destination acceptance/import release — owner: applicable GCC authority/importer — blocking: Operational Release]
- [OPEN GATE: Shariah Finance/Takaful/tokenomics counterparties and product approvals — owner: applicable bank/financier/Takaful/Shariah/legal/regulatory parties — blocking: finance transaction activation]
- [OPEN GATE: real Shipment 001 evidence — owner: transaction participants — blocking: Evidence → Audit Test → Authority Gate]
- [OPEN GATE: authenticated production UAT identities/roles and stakeholder acceptance — owner: authorised platform administrators + participating organisations — blocking: authenticated production UAT; deployment health must be checked at the exact commit]
- [OPEN GATE: Amanah GitHub branch-protection administration — owner: repository administrator — blocking: repository governance hardening]
- [OPEN GATE: GlobalHalalDigitalTrust GitHub branch-protection administration — owner: repository administrator — blocking: canonical source governance hardening]
- [OPEN GATE: Vercel account build-rate limit — owner: hosting account administrator — blocking: Vercel deployment contexts for current commits; GitHub Pages deployment remains separately verified]


- [OPEN GATE: final legal/counterparty execution — exact entities, governing law, liability, data roles, commercial schedules and authorised signatures required]

- [OPEN GATE: validated GHSCL price/cost book — owner: GHSCL commercial/finance — blocking: production numeric pricing and unit-economics forecast]

- [OPEN GATE: externally binding SLA values — owner: contracting parties — blocking: contractual KPI/SLA commitments]

- [OPEN GATE: statutory recognition of Academy qualifications — owner: competent authority — blocking: regulated professional recognition]

**FULL ARCHITECTURE NOW → REAL CONNECTORS WHEN AVAILABLE → NO REDESIGN REQUIRED.**

An external gate does not authorize removal, hiding or architectural downgrade of direct JAKIM API, Command Center, predictive/preemptive analytics, Sinotrans warehouse/logistics integration, port/customs APIs, GCC workflows or Shariah finance/Takaful/tokenomics.

Development/sandbox providers may exercise complete workflows only when clearly labelled non-production and must never generate fake authority, shipment, lab, customs, finance, Takaful or token legal-state evidence.

[PILOT: Shipment 001 — China → GCC direct; NOT-INSTANTIATED]

## 2 October normalized domain closure

The platform now has first-class schema objects for ProductionLine, SKU, CertificationScope, Vehicle, Driver, Warehouse, Pallet, Package, Container, Seal, RouteEvent and VerificationEvent, plus typed Sensor/Gateway profiles and typed Ingredient/RawMaterial material roles. This closes the repository-controlled data-model gap without altering the frozen standards package.

## 2 October provenance/schema reconciliation

Current implementation provenance remains pinned to `GlobalHalalDigitalTrust@ccc10ca476b3ee07e77f11d0d6901e0b2ec744c5`. The public static site remains explicitly pinned to target architecture snapshot `14456e99937d6f11d63bd041dcffdb903d12594f`, which is an ancestor of current main; the five later commits are control/provenance additions. Application query-contract validation now uses `lib/database.target.types.ts`, which composes the current schema with the controlled target extension tables used by the application.
