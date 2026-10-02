# AMANAH / Global Halal Digital Trust — Canonical Source Map

**Version:** 1.0.0 | **Control date:** 2026-10-02 | **Status:** CONTROLLING POST-FREEZE SOURCE MAP

## Purpose

This is the single source-routing map for the 69-section programme. It prevents historical branches, stale SHAs and duplicated specifications from silently becoming current truth.

## Authority hierarchy

1. Project files / verified package.
2. Current main of mavericken777/GlobalHalalDigitalTrust.
3. Current main of mavericken777/Amanah for implementation.
4. Live authority/partner sources only where required and registered.

Frozen standards boundary: master-standards-stack/verified-2026-09-17/

## Current repository heads

- GlobalHalalDigitalTrust main: ccc10ca476b3ee07e77f11d0d6901e0b2ec744c5
- Amanah main: 11ac9ae7b4cd37cee63337ce180372da0ffbe9d6

## Canonical domain map

| Domain | Controlling source | Classification |
|---|---|---|
| Doctrine | GlobalHalalDigitalTrust / IQ300_DOCTRINE | Project governance / source-controlled |
| Frozen standards | GlobalHalalDigitalTrust / verified-2026-09-17 | Immutable normative snapshot |
| Target architecture | GlobalHalalDigitalTrust / CURRENT_TARGET_ARCHITECTURE + registry | Post-freeze project architecture |
| Requirements traceability | GlobalHalalDigitalTrust / PLATFORM_REQUIREMENTS_TRACEABILITY | Project control |
| AHTE implementation architecture | Amanah / docs/architecture/PLATFORM_ARCHITECTURE.md | Repository-implemented |
| Domain model | Amanah / docs/architecture/DATA_MODEL.md | Repository-implemented |
| Operational status | Amanah / docs/operations/STATUS.md | Current repository state |
| External gates | Amanah / docs/operations/PENDING.md | Current open gates |
| Website content | Amanah / ghscl-website/ecosystem.en.json | Public target content |
| Website provenance | Amanah / ghscl-website/source-manifest.json | Target snapshot binding |
| Database | Amanah / supabase/migrations + current/target types | Repository implementation |
| Security | Amanah / docs/operations/SECURITY_MODEL.md | Repository control |
| CI | Amanah / .github/workflows/ci.yml | Validation authority |
| Public verification | Amanah / public-verify service + verification schema | Repository implementation |
| Hardware | Amanah / docs/hardware/PLATINUM_HARDWARE_MASTER_BOM_2026-10-02.json | RFQ-ready reference; current RFQ required |
| 69 programme | Amanah / docs/operations/AMANAH_69_EXECUTION_REGISTER_2026-10-02.md | Programme control |

## Source-state vocabulary

- VERIFIED CURRENT FACT — directly observed in current source/runtime.
- REPOSITORY-IMPLEMENTED CAPABILITY — code/schema/control exists in repository.
- PROJECT-DEFINED CAPABILITY — architecture/specification exists but is not necessarily production-connected.
- PLANNED EXTERNAL INTEGRATION — interface/workflow defined; external activation pending.
- COMMERCIAL PROPOSAL — proposed economics/terms, not executed.
- ASSUMPTION REQUIRING VALIDATION — not promoted to fact.

## Drift controls

A stale SHA may be retained for historical provenance, but it cannot be described as current.

A development/sandbox connector may exercise a complete workflow, but it cannot generate real authority, partner, laboratory, customs, finance, Takaful or Shipment 001 evidence.

A hash proves integrity, not truth.

A laboratory result is evidence, not certification.

Operational release is not Halal certification.

## Known discrepancies at control date

| ID | Finding | State | Required treatment |
|---|---|---|---|
| SRC-001 | Global 69-binding references Amanah e18fca1221; current Amanah main is 11ac9ae7b4 | RECONCILED | Current main controls; historical binding retained |
| SRC-002 | Amanah refreshed baseline references 8fe86c0db558 rather than current 11ac9ae7b4 | OPEN CORRECTION | Refresh baseline on current main |
| WEB-001 | Website says application is deployed while Vercel status is build-rate-limited | OPEN CORRECTION | Separate capability/source from confirmed production deployment |
| WEB-002 | Public static source manifest pins 14456e99937d as target snapshot | CONTROLLED | Retain with explicit target-snapshot label |
| STD-001 | Frozen 17 Sep standards package | PASS | Do not modify without explicit post-freeze authorization |