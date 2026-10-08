# AMANAH SOP Library — Master Operating Set

**Version:** 1.0.0  
**Control date:** 2026-10-03  
**Classification:** PROJECT-CONTROLLED OPERATING PROCEDURES  
**Scope:** Global Halal Digital Trust Ecosystem / China → GCC direct corridor  
**Authority topology:** AHTE ⇄ Direct JAKIM API ⇄ JAKIM

## 1. Operating rule

Every SOP follows the canonical assurance path:

Authority → Standard/Instrument → Requirement → Applicability → Control → HCP/SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → certification review → Trust State → Operational Release.

AI may assist D0–D2 and configured D4 holds. authorised certification decision workflow authority and sovereign decisions remain with authorised humans / competent authorities. Laboratory results, cryptographic proofs, sensors, QR/NFC, smart glasses, blockchain or platform states do not independently create Halal certification.

## 2. SOP control format

Each SOP must identify: trigger; accountable owner; authorised actors; required inputs; system of record; minimum evidence; validation tests; exception path; escalation; output; retention/audit log; and connected provider and authority workflows.

## 3. Master SOP set

| ID | SOP | Trigger | Primary owner | Required output |
|---|---|---|---|---|
| SOP-01 | Organisation / KYC onboarding | New tenant / partner | Platform operations | Verified organisation profile + roles |
| SOP-02 | Manufacturer onboarding | New manufacturer | Manufacturer success | Readiness case + evidence gap register |
| SOP-03 | Facility digital twin | New / changed facility | Manufacturer + AHTE | Facility twin + zones / lines / controls |
| SOP-04 | Product / SKU onboarding | New / amended SKU | Manufacturer | Product/SKU record + applicability |
| SOP-05 | Supplier / material qualification | New / changed supplier/material | Procurement / QA | Approved provenance graph or HOLD |
| SOP-06 | Document / evidence ingestion | New evidence | Evidence operations | Versioned evidence object + provenance |
| SOP-07 | AI-assisted review | Evidence submitted | AHTE review | D0–D2 assessment with confidence + rationale |
| SOP-08 | Human review / approval | Machine assessment ready | Authorised reviewer | Signed human decision / escalation |
| SOP-09 | Laboratory sample chain | Test required | Laboratory coordinator | Custody-complete signed lab evidence |
| SOP-10 | Smart audit / site inspection | Audit assigned | Auditor | Observation, finding, evidence, CAR/CAPA |
| SOP-11 | Corrective action | Finding issued | Finding owner | CAPA evidence + re-verification request |
| SOP-12 | Re-verification | CAPA submitted | Auditor/reviewer | Verified closure or continued finding |
| SOP-13 | Certification / authority dossier | Evidence complete | Authority liaison | Authority-ready dossier; no auto-certification |
| SOP-14 | Production monitoring | Production run active | Manufacturer command centre | Batch/process evidence + exception events |
| SOP-15 | Warehouse receipt / dispatch | Physical handoff | Warehouse operator | Identity/custody/condition event |
| SOP-16 | Shipment / container / seal | Shipment built | Logistics operator | Bound shipment/container/seal lineage |
| SOP-17 | Route / telemetry exception | Threshold / route anomaly | Command centre | HOLD / investigation / action record |
| SOP-18 | Port / customs interface | Border event | Port/customs integration | Signed lookup/event exchange; sovereign state external |
| SOP-19 | GCC importer pre-arrival / receiving | Destination receipt | Importer | Dossier + reconciliation + accept/discrepancy/quarantine + inventory eligibility |
| SOP-19A | Distributor / 3PL transfer | Importer allocation / transfer order | Distributor / 3PL | Batch/lot custody + storage + delivery / return evidence |
| SOP-19B | Retail / marketplace listing & receiving | Listing / PO / ASN | Retailer / marketplace | Listing eligibility + receiving + stock/sale state |
| SOP-19C | Retail withdrawal / recall | Hold / recall trigger | Retailer + Command Center | Affected DC/store/order scope + containment evidence |
| SOP-20 | Public / buyer / retailer / authority verification | Authorized token presented | Verification service | Scoped disclosure only |
| SOP-21 | Incident / cybersecurity | Security event | Security | Containment, evidence, recovery, notification |
| SOP-22 | Business continuity / failover | Service disruption | Operations | Recovery action + continuity evidence |
| SOP-23 | Recall / blast radius | Recall trigger | Command centre | Affected object graph + containment actions |
| SOP-24 | Finance / Takaful evidence packet | Approved case request | Finance integration | Purpose-bound packet; external decision remains external |
| SOP-25 | Connector promotion | Sandbox → production request | Integration governance | Verified authorization, credentials, UAT, promotion record |

## 4. Critical procedure details

### SOP-06 — Evidence ingestion
1. Assign EvidenceID and bind ObjectID, EventID, ActorID and Timestamp.
2. Preserve source URI/system, uploader/issuer identity and original file.
3. Canonicalize where required and compute IntegrityProof.
4. Record version, confidentiality, retention and replacement/supersession relationship.
5. Run deterministic validation.
6. Never overwrite accepted audit evidence; corrections occur by supersession.
7. Reject or HOLD evidence with missing provenance, broken signature/hash, wrong scope, expired validity or contradictory state.

### SOP-09 — Laboratory
Sample → seal → custody → accession → method/QC → result → technical review → signature → evidence binding.  
**Hard rule:** `NOT_DETECTED ≠ HALAL`. Laboratory output is evidence; certification remains with the competent authority.

### SOP-10 — Smart audit
Auditor + DeviceID + MFA → assigned audit → facility/scope → requirement/HCP/SCCP → walkthrough → object identification → observation/evidence → AI assist → auditor assessment → finding → CAPA → re-verification → signed session → sync/reconcile.

### SOP-13 — Authority dossier
The platform may assemble evidence, validate completeness and transmit through the Direct JAKIM API integration point when authorised. It may not invent official endpoints, fabricate receipts, or convert an internal assessment into a formal authority decision.

### SOP-17 — Trust fracture / exception
Detect → classify → configured D4 HOLD where allowed → determine blast radius → assign owner → collect evidence → human review → CAPA / re-verification → certification review if required → operational disposition. A D4 HOLD cannot be silently machine-released where human/authority review is reserved.

### SOP-19 — GCC destination
Pre-arrival dossier → port release reference → importer receiving → container/seal/SKU/batch/condition reconciliation → credential/document check → accept/discrepancy/quarantine → destination inventory → distributor/3PL transfer → retailer/marketplace listing/receiving → verification. All destination events preserve upstream lineage.

### SOP-19C — Retail withdrawal / recall
Recall trigger → determine affected product/SKU/batch → importer inventory → distributor transfers → retail DC/store/order → block/withdraw → notification/evidence → reconciliation → governed closure.

### SOP-25 — Production connector promotion
Connector states: UNCONFIGURED → DEVELOPMENT → SANDBOX → PENDING_AUTHORIZATION → PRODUCTION.  
Production requires: named counterparty; legal/technical authorization; production endpoint; authentication/PKI material; scopes; payload contract; error/retry policy; UAT evidence; monitoring; rollback plan; owner approval.

## 5. Minimum audit record

Every controlled procedure records:
`ObjectID + EventID + EvidenceID + ActorID + Timestamp + IntegrityProof`, plus decision actor, source system, state before/after, exception reason, approval/override reason where applicable, and supersession reference.

## 6. Provider and authority workflows

[SOURCE-LOCKED: licensed normative requirement text]  
[PILOT: shipment workflow — China → GCC direct — NOT-INSTANTIATED]
