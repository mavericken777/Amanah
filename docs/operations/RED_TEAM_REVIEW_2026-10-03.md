# AMANAH Red-Team Review — Programme-Wide

**Version:** 1.0.0  
**Control date:** 2026-10-03  
**Item:** 61  
**Method:** adversarial review against authority, evidence, operational, legal, commercial, cybersecurity and deployment failure modes.

## Executive result

No repository-controlled red-team finding in this review requires a change to the canonical architecture. The architecture remains:

**AHTE ⇄ Direct JAKIM API ⇄ JAKIM**  
**China → GCC direct**  
**AI assists; authorised humans / competent authorities decide.**

External activation gates remain open where real authority/partner/transaction evidence is unavailable.

## Findings

| ID | Attack / challenge | Risk | Repository control | Status |
|---|---|---|---|---|
| RT-01 | Platform is mistaken for Halal certifier | Authority overreach | D5/D6 reserved; public/legal/mission wording separates certification | CLOSED IN REPO |
| RT-02 | AI recommendation silently becomes approval | Governance failure | Decision-rights model + human approval + immutable audit trail | CLOSED IN REPO |
| RT-03 | Lab “not detected” marketed as Halal | Scientific overclaim | `NOT_DETECTED ≠ HALAL` enforced across SOP/mission/tests | CLOSED IN REPO |
| RT-04 | Hash treated as proof of real-world truth | Evidence overclaim | Integrity-vs-truth rule explicit | CLOSED IN REPO |
| RT-05 | Historical NurAI hop reappears publicly | Topology drift | Public site scan contains no NurAI authority hop; archive retained as superseded history | CLOSED IN REPO |
| RT-06 | China→Malaysia physical route reappears as default | Corridor drift | Public/canonical controls use China→GCC direct; Malaysia governance plane | CLOSED IN REPO |
| RT-07 | Sandbox response shown as production authority response | False external state | connector lifecycle + environment labels + no fabricated receipts | CLOSED IN REPO |
| RT-08 | shipment workflow inferred from architecture/demo | Transaction fabrication | NOT-INSTANTIATED state enforced | CLOSED IN REPO |
| RT-09 | One aggregate trust score masks critical failure | Safety/assurance failure | hard gates and separate state domains; non-compensatory critical controls | CLOSED IN REPO |
| RT-10 | Evidence is overwritten after finding | Audit tampering | append-only evidence + supersession | CLOSED IN REPO |
| RT-11 | Compromised account accesses another tenant | Data breach | tenant RLS + membership/role checks; production identity UAT remains required | CONTROLLED / UAT GATE |
| RT-12 | Compromised device emits false telemetry | Device trust failure | DeviceID, credentials/certificates, provenance, anomaly review; real device commissioning external | CONTROLLED / EXTERNAL |
| RT-13 | Sinotrans subcontractor breaks custody | Custody fracture | handover/custody events + exception engine + named-subcontractor requirement | CONTROLLED / PARTNER GATE |
| RT-14 | Port/customs interface implies authority to release | Sovereign overreach | sovereign release state externally owned | CLOSED IN REPO |
| RT-15 | Buyer sees confidential manufacturer records | Disclosure breach | purpose-bound / minimum-necessary verification | CLOSED IN REPO |
| RT-16 | Commercial proposal shown as binding price | Commercial misstatement | pricing classified proposal pending validated price/cost book | CLOSED IN REPO |
| RT-17 | SLA proposal represented as signed commitment | Contract misstatement | KPI/SLA framework separates proposed metric from executed SLA | CLOSED IN REPO |
| RT-18 | Academy credential mistaken for statutory authority | Competence overclaim | academy explicitly disclaims statutory authority | CLOSED IN REPO |
| RT-19 | Partner name/logo implies endorsement | Reputational/legal risk | legal/publicity approval control; relationship status evidence-bound | CONTROLLED |
| RT-20 | Vercel failure is hidden as “live” | Deployment misstatement | STATUS/PENDING retain build-rate-limit as external gate | CLOSED IN REPO |
| RT-21 | Corporate profile duplicates create two controllers | Document-control conflict | PR #50 closed as superseded; PR #51 merged as controlling profile/page | CLOSED |
| RT-22 | Mission verbal agreement becomes executed MOA | Legal overstatement | meeting close-out separates discussion/proposal/decision/execution | CLOSED IN REPO |
| RT-23 | Finance/Takaful evidence becomes credit/underwriting decision | Financial authority overreach | external decision plane retained | CLOSED IN REPO |
| RT-24 | Recall misses related objects | Containment failure | blast-radius graph + custody/genealogy relationships | CONTROLLED / REAL DATA GATE |
| RT-25 | Normative clause invented because source unavailable | Source-fidelity failure | SOURCE-LOCKED rule | CLOSED IN REPO |

## Red-team acceptance criteria

A release is blocked if any current controlling artifact:
- claims software/AI/lab/blockchain creates Halal certification;
- inserts an intermediary into AHTE ⇄ Direct JAKIM API ⇄ JAKIM;
- changes default physical corridor away from China → GCC direct;
- fabricates external response, partner commitment or shipment workflow evidence;
- merges authority/trust/customs/finance state;
- removes an external gate because credentials/evidence are unavailable.

## Remaining genuine external attack surfaces

[OPEN GATE: production identity/UAT]  
[OPEN GATE: Direct JAKIM production contract/credentials]  
[OPEN GATE: laboratory production system/accreditation/method scope]  
[OPEN GATE: Sinotrans sites/lanes/systems/security]  
[OPEN GATE: port/customs authorization]  
[OPEN GATE: GCC destination acceptance]  
[OPEN GATE: finance/Takaful counterparties]  
[OPEN GATE: real shipment workflow evidence]

**Closure:** Item 61 complete to project control.
