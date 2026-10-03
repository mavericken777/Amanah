# AMANAH Final Operating Test

**Version:** 1.0.0
**Control date:** 2026-10-03
**Item:** 69
**Status:** FINAL PROJECT-CONTROLLED OPERATING TEST

## Test objective

A serious stakeholder must be able to answer the following questions and locate the controlled evidence without relying on unstated assumptions.

| # | Question | Controlled answer / evidence | Result |
|---:|---|---|---|
| 1 | Authority topology? | AHTE ⇄ Direct JAKIM API ⇄ JAKIM — architecture / SOURCE_BINDING | PASS |
| 2 | Who certifies Halal? | competent authority / authorised human workflow; not AI/platform/lab/blockchain — decision rights / legal / SOP | PASS |
| 3 | Physical corridor? | China → GCC direct — architecture / corridor / website | PASS |
| 4 | Malaysia role? | governance / assurance / authority-connectivity unless separately scoped — architecture | PASS |
| 5 | Manufacturer entry? | organisation/KYC → facility → product/SKU → supplier/material → evidence → audit/readiness — onboarding / SOP | PASS |
| 6 | Facility model? | digital twin with zones/lines/storage/control points/devices — data model | PASS |
| 7 | Supplier/material provenance? | product/SKU → ingredient/raw material → supplier/origin/certificate/evidence — data model | PASS |
| 8 | Evidence protection? | append-only, provenance-linked, supersession, integrity proof — evidence controls | PASS |
| 9 | What does a hash prove? | integrity, not truth — trust controls | PASS |
| 10 | AI authority? | D0–D2 + configured D4; no D5/D6 — decision rights / policy | PASS |
| 11 | Laboratory role? | sample/custody/method/QC/result/review/signature evidence — SOP | PASS |
| 12 | Does NOT_DETECTED mean Halal? | No — lab controls | PASS |
| 13 | Audit workflow? | scoped inspection → evidence → human finding → CAPA → re-verification — audit/SOP | PASS |
| 14 | Certification state? | external competent-authority decision via authorised workflow/integration — architecture/API | PASS |
| 15 | Production monitoring? | batch/process/device evidence + exceptions — monitoring / Command Center | PASS |
| 16 | Trust fracture? | HOLD/exception → blast radius → owner → review → CAPA/re-verification — exception controls | PASS |
| 17 | Sinotrans role? | warehouse/logistics/custody/telemetry; no certification/sovereign release — Sinotrans playbook | PASS |
| 18 | Shipment/container/seal? | bound identity/custody/events/evidence — logistics controls | PASS |
| 19 | Port/customs release? | sovereign authority — port model/API | PASS |
| 20 | GCC receiving? | importer/authority/receiving reconciliation and destination acceptance — corridor/SOP | PASS |
| 21 | Command Center? | evidence, manufacturing, lab, audit, custody, logistics, ports, destination, risk/exceptions — Command Center | PASS |
| 22 | Product verification? | issuer-authorised minimum-necessary disclosure — verification controls | PASS |
| 23 | Finance/Takaful approval? | external provider decision; AHTE supplies purpose-bound evidence — finance/legal | PASS |
| 24 | Partner activation? | connector lifecycle + authorisation/UAT before PRODUCTION — API/partner kit/SOP | PASS |
| 25 | Direct JAKIM production state? | integration point implemented; exact production activation remains source-locked/pending authorisation unless verified — STATUS/PENDING | PASS |
| 26 | Shipment 001 real? | No; NOT-INSTANTIATED until transaction-native evidence — STATUS/PENDING | PASS |
| 27 | Deliverables available? | master deliverable index — index | PASS |
| 28 | Proposal vs fact? | claim verification register — claim register | PASS |
| 29 | External dependencies? | JAKIM/lab/Sinotrans/ports/GCC/finance/hosting/real shipment evidence — PENDING | PASS |
| 30 | Real connectors without redesign? | yes; controlled contracts/interfaces and connector states exist — API/architecture | PASS |

## Repository usability

Navigation path:
REPO_INDEX.md → domain controller → evidence/implementation → STATUS/PENDING → QA/claim register.

Result: **PASS to project-controlled scope**.

## Technical release gate

Final closure requires exact-head success for:
- typecheck
- application/schema/tests
- edge functions
- reference runtime/platform
- policies
- production build
- browser smoke

## External-state distinction

This PASS means repository-controlled architecture, implementation contracts, operating materials and evidence paths are internally complete and consistent. It does not fabricate external production activation.

**Items 1–69: COMPLETE TO PROJECT-CONTROLLED SCOPE**, subject to exact-head final CI and merge.

Shipment 001 remains NOT-INSTANTIATED.

**Closure:** Item 69 complete to project control after final exact-head CI and merge.
