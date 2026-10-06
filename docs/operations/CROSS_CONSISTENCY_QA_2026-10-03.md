# AMANAH Cross-Consistency QA

**Version:** 1.0.0  
**Control date:** 2026-10-03  
**Item:** 60 — Cross-consistency QA  
**Result:** PROJECT-CONTROLLED CONSISTENCY BASELINE ESTABLISHED

## 1. Canonical assertions

The following must be identical across architecture, website, application, corporate profile, legal/commercial packs, media, mission materials and partner documentation.

| Control | Canonical value | QA result |
|---|---|---|
| Authority topology | AHTE ⇄ Direct JAKIM API ⇄ JAKIM | PASS |
| Physical corridor | China → GCC direct | PASS |
| Malaysia role | governance / assurance / authority-connectivity unless separately scoped | PASS |
| AI authority | D0–D2 + configured D4 holds; no D5/D6 | PASS |
| Lab rule | NOT_DETECTED ≠ HALAL | PASS |
| Integrity rule | Hash proves integrity, not truth | PASS |
| Evidence rule | append-only; correction by supersession | PASS |
| Minimum binding | ObjectID + EventID + EvidenceID + ActorID + Timestamp + IntegrityProof | PASS |
| Shipment 001 | NOT-INSTANTIATED pending real evidence | PASS |
| Connector lifecycle | UNCONFIGURED / DEVELOPMENT / SANDBOX / PENDING_AUTHORIZATION / PRODUCTION | PASS |
| Authority/trust/operational/customs/finance state | separate state domains | PASS |
| Sinotrans | warehouse/logistics/custody/telemetry; no certification/sovereign release | PASS |
| GCC importer | pre-arrival/receiving/quarantine/inventory eligibility is first-class | PASS |
| Distributor / 3PL | destination custody/transfers/POD/recall is first-class | PASS |
| Retail / marketplace | listing/receiving/sale eligibility/withdrawal/recall is first-class | PASS |
| Standards completeness | current primary registry is not a permanent ceiling; all verified applicable instruments are scope-driven | PASS |
| Finance/Takaful | evidence support only; independent decision | PASS |

## 2. Deliverable-family reconciliation

| Family | Controlling artifact | Cross-check focus | Result |
|---|---|---|---|
| Architecture | docs/architecture/PLATFORM_ARCHITECTURE.md | topology, corridor, ownership | PASS |
| Data model | docs/architecture/DATA_MODEL.md | IDs, evidence/state separation | PASS |
| API | docs/api/AMANAH_CANONICAL_API_CONTRACT_2026-10-02.yaml | non-authoritative connector contracts | PASS |
| Website | ghscl-website/ | public topology / claims / black-gold identity | PASS WITH EXTERNAL DEPLOYMENT GATE |
| Corporate profile | docs/corporate/GHSCL_CORPORATE_PROFILE_2026.md | institutional narrative / boundaries | PASS |
| Sinotrans | docs/sinotrans/SINOTRANS_A_TO_Z_PLAYBOOK_2026-10-02.md | custody / systems / partner validation | PASS |
| CODA | docs/coda/CODA_HARDWARE_FINANCING_EXECUTIVE_PACK_2026-10-02.md | proposal vs commitment | PASS |
| Legal | docs/legal/AMANAH_MASTER_LEGAL_CONTRACTUAL_PACK_2026-10-03.md | reserved authority / execution gaps | PASS |
| Commercial | docs/commercial/AMANAH_COMMERCIAL_MODEL_UNIT_ECONOMICS_2026-10-03.md | proposal / price validation | PASS |
| KPI/SLA | docs/operations/AMANAH_KPI_SLA_FRAMEWORK_2026-10-03.md | contractual vs proposed SLA | PASS |
| Academy | docs/training/AMANAH_TRAINING_ACADEMY_2026-10-03.md | competence vs statutory authority | PASS |
| GCC destination | docs/gcc/GCC_IMPORTER_DISTRIBUTOR_RETAILER_PLAYBOOK_2026-10-07.md | importer/distributor/retail operating continuity | PASS |
| Master prompt | docs/AMANAH_100_PERCENT_END_TO_END_MASTER_EXECUTION_PROMPT_2026-10-07.md | complete end-to-end acceptance and deliverables | PASS |
| Mandarin | docs/localization/MANDARIN_MASTER_ADAPTATION_2026-10-03.md | topology / corridor / boundary parity | PASS |
| Mission | docs/mission/CHINA_MISSION_EXECUTIVE_PACK_2026-10-03.md | meeting claims / readiness evidence | PASS |
| SOPs | docs/sop/AMANAH_SOP_LIBRARY_MASTER_2026-10-03.md | operational path / escalation / evidence | PASS |
| Objection book | docs/mission/OBJECTION_HANDLING_BOOK_2026-10-03.md | claims discipline | PASS |

## 3. Detected repository-control defects corrected in this batch

### QA-60-01 — execution register
The execution register previously identified Items 56–60 as the next batch. This batch advances them to complete-to-project-control and moves the next active gate to Items 61–65.

### QA-60-02 — mutable status provenance
`docs/operations/STATUS.md` contained a stale mutable Amanah reconciliation SHA. Mutable current-state documents must not hardcode a superseded current-head value. This batch changes the status wording to point to repository `main` as current mutable state while preserving historical SHAs only in historical audit artifacts.

### QA-60-03 — pending-file escaped newline artifacts
`docs/operations/PENDING.md` contained literal escaped newline sequences in prose. This batch normalizes them to real line breaks.

### QA-60-04 — master deliverable index
The deliverable index stopped at Item 55 output. This batch adds controlled deliverables for Items 56–60.

### QA-60-05 — destination-market depth
Importer, distributor/3PL and retailer/marketplace were previously present but too generic compared with origin, lab and Sinotrans. They are now first-class platform, website, Command Center, SOP, training, media and playbook experiences.

### QA-60-06 — standards ceiling
The current verified primary catalogue count is descriptive, not architectural. Public and controlled material now states that every additional verified applicable Malaysian/JAKIM standard or instrument is loaded by scope without redesign.

## 4. External conditions intentionally not “fixed” by repository text

- Direct JAKIM production API specification/authorization.
- China laboratory production identity/accreditation/method scope/API.
- Sinotrans exact production sites/lanes/systems/credentials.
- Port/customs permissions.
- GCC importer/authority acceptance.
- Finance/Takaful counterparties/approvals.
- Production hosting / Vercel capacity.
- Real Shipment 001 evidence.

These remain genuine external gates. Removing the gate from documentation would be a false claim, not completion.

## 5. Cross-consistency release test

A release fails consistency QA if any controlled artifact:
- inserts NurAI as a required authority hop;
- changes the physical corridor to China → Malaysia by default;
- says AI/blockchain/lab/platform certifies Halal;
- treats a hash as proof of truth;
- collapses authority and AHTE trust states;
- represents a sandbox/development receipt as production;
- represents Shipment 001 as instantiated without real evidence;
- states a proposed price/SLA/partner commitment as an executed fact.

## 6. Closure

Item 60 is complete to project control when:
1. this matrix exists;
2. mutable status/register/index are reconciled;
3. CI tests enforce critical assertions;
4. no identified repository-controlled inconsistency remains unresolved in this batch.

External activation gates remain separately visible in `PENDING.md`.
