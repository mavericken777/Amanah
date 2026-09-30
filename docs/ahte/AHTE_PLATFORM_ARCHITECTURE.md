# Amanah — AHTE / IQ300 Platform Architecture

## Source binding

Current project target: `mavericken777/GlobalHalalDigitalTrust@1cc9b338a28e4d7ddf4e7b6509bc38dae9396596`.

Freeze: `master-standards-stack/verified-2026-09-17/` remains unchanged.

[PROPOSAL: Amanah implementation synchronization to current post-freeze target architecture — path point: Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release]

## Implementation completeness

**FULL ARCHITECTURE NOW → REAL CONNECTORS WHEN AVAILABLE → NO REDESIGN REQUIRED.**

- no artificial blocks;
- no arbitrary feature caps;
- development providers replace connectivity, not capability;
- simulated/sandbox state must never be represented as live authority, laboratory, shipment, customs, finance, Takaful or token legal-state evidence.

## Authority boundary

Amanah is an orchestration, evidence, continuous-monitoring and operational-release platform. It does **not** replace JAKIM/MAIN/JAIN certification decisions, GCC destination decisions, laboratories, financiers, Takaful operators, port/customs authorities, importers or other competent actors.

Project connectivity:

`AHTE ⇄ DIRECT JAKIM API ⇄ JAKIM`

Project formal certification review is a **PHC + JAKIM authorised human workflow**, involving authorised JAKIM halal officers/decision-makers and Mufti/scholars as applicable to the implemented authority process. AI/ML does not make the formal certification decision.

Laboratory results are evidence. Cryptographic integrity protects history. Operational release is distinct from certification. Financing/Takaful/token/digital-asset states are distinct from certification, AHTE trust state, supply-chain state and sovereign release state.

## Canonical path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

Every AHTE record attaches to one or more points on this path. Where normative text is not held, the record remains `source_locked`; the application must not invent clause wording.

## Governing physical / digital topology

```text
VERIFIED CHINA RAW-MATERIAL ORIGIN
→ PRODUCER / SUPPLIER / LOT / PROVENANCE
→ PHYSICAL + DIGITAL IDENTITY
→ SAMPLE / SEAL / CHAIN OF CUSTODY
→ CHINA TRACEABILITY + LABORATORY SYSTEM
→ SIGNED SCIENTIFIC EVIDENCE
→ MANUFACTURER / ERP / MES / QMS / WMS / LIMS / IoT / DMS
→ PRODUCT / FORMULA / BOM / PROCESS
→ STANDARDS + APPLICABILITY
→ HCP / SCCP / CONTROLS
→ SMART-GLASS AI-ASSISTED AUDIT
→ FINDING / CAPA / RE-VERIFICATION
→ DIRECT JAKIM API
→ PHC + JAKIM AUTHORISED HUMAN REVIEW / APPROVE-DISAPPROVE WORKFLOW
→ FORMAL AUTHORITY STATUS
→ AHTE TRUST-STATE PROPAGATION
→ UNIT / BOX / CARTON / PALLET
→ SINOTRANS WAREHOUSE
→ SINOTRANS END-TO-END LOGISTICS
→ CONTAINER / SEAL / TELEMETRY / CUSTODY
→ ORIGIN PORT/CUSTOMS API
→ INTERNATIONAL TRANSIT
→ GCC PORT/CUSTOMS API
→ DESTINATION INSPECTION / RELEASE
→ IMPORTER / DESTINATION WAREHOUSE / DISTRIBUTION / RETAIL
→ AUTHORISED BUYER / CONSUMER VERIFICATION
```

Default corridor: **China → GCC direct**. Malaysia is the governance/assurance/authority-connectivity plane unless separately scoped as a physical hop.

[PILOT: Shipment 001 — China → GCC direct; NOT-INSTANTIATED until transaction-native evidence exists]

## Platform planes

1. **Source and authority** — authorities, instruments, requirements, applicability, source status, direct JAKIM API case/status exchange.
2. **Control** — controls, HCP/SCCP, audit tests, findings, CAPA and re-verification.
3. **Evidence** — E1 screening, E2 documentary, E3 independent verification, E4 transaction, E5 authority decision; hashes, signatures, validity, provenance and supersession.
4. **Human decision** — AI/ML advisory outputs, HITM cases, accountable authority decisions and signatures.
5. **Trust** — trust state, trust vector, hard gates, fracture/auto-hold, release and recall.
6. **Transaction** — identities, certificates, partners, laboratories, products, batches, shipments, custody, port custody and trust packets.
7. **Command Center** — 24/7 GHSCL operational + authorised JAKIM authority-side monitoring, analytics, alerts, escalation, intervention, CAPA/re-verification and recall.
8. **Predictive/preemptive assurance** — prediction, blast-radius analysis, preemptive strategy generation, governed execution and outcome feedback.
9. **China traceability + laboratory** — enterprise/product identity, one-item-one-code, physical anti-counterfeit identity where deployed, aggregation, scan/channel analytics, anti-diversion, sample/custody/method/QC/result evidence.
10. **Logistics/warehouse** — Sinotrans end-to-end warehouse and logistics execution with real-time evidence feeds.
11. **Port/customs** — authorised API/trust interface for minimum-necessary shipment verification, inspection, sampling, hold/release and custody events.
12. **GCC destination** — importer, receiving, warehouse, distribution, retail and destination acceptance state.
13. **Shariah finance/trade** — Shariah Financing API, Takaful evidence/case workflows and approved token/digital-value references where separately Shariah/legal/regulatory approved.
14. **Federated sovereignty/security** — source-domain ownership, minimum-necessary signed assertions/references/hashes/scoped metadata, RBAC/ABAC, audit, device/service identity and protected keys.

## China traceability / laboratory plane

Physical/digital identity chain:

`Enterprise → Product → Batch → Unique code → Unit → Box → Carton → Pallet → Logistic Unit → Container → Shipment → GCC destination inventory`.

The China traceability system may contribute serialization, microdot/QR/VOID identity where deployed, binding/aggregation, verification, abnormal-scan/anti-diversion signals and channel analytics. AHTE distinguishes presented information from authenticated evidence.

Laboratory chain:

`SampleID → Collection → Seal → Custody → Receipt/Accession → Method/QC → Technical Review → Signed Result/Report → Canonicalisation → Integrity Proof → AHTE Evidence → Authority workflow where authorised`.

`NOT DETECTED ≠ HALAL` remains a hard rule.

Current project profile: `partners/china-food-security-lab/AHTE_CHINA_LAB_TRACEABILITY_INTEGRATION_PROFILE_2026-09-30.md`.

## Smart-glass audit

Identity baseline:

`DeviceID + AuditorID + MFA + role/scope policy`.

Workflow:

`Assigned audit → facility/scope → requirements/HCPs → physical walkthrough → object scan → observation/evidence → local hash/signature → AI assist → auditor assessment → finding → CAR/CAPA → re-verification → signed session → sync/reconcile`.

AI assists; the human auditor owns findings and formal certification remains with authorised authority workflow.

## 24/7 Command Center

The Command Center is a first-class operating plane, not a passive dashboard.

Operators have distinct scopes: GHSCL performs corridor/platform operational monitoring; authorised JAKIM-side roles perform authority-side monitoring. They do not have identical permissions.

Monitored domains include manufacturer/facility, supplier/raw material/origin, China traceability, laboratory/sample, HCP/SCCP, smart audit, authority/certification status, Sinotrans warehouse/logistics, shipment/container/seal, telemetry/route/geofence, custody, origin/GCC ports, GCC receiving, CAPA/re-verification, evidence integrity/expiry, trust fracture, predictive risk, preemptive strategy, recall/blast radius and authorised finance/Takaful support state.

Operating loop:

`OBSERVE → CORRELATE → DETECT → PREDICT → GENERATE STRATEGY → PRIORITISE → ASSIGN → ALERT/ESCALATE/HOLD WHERE POLICY ALLOWS → HUMAN/AUTHORITY ACTION → CAPA/RE-VERIFICATION → OUTCOME`.

Persistent objects:

- `ahte_command_center_alerts`
- `ahte_predictions`
- `ahte_preemptive_strategies`

## AI/ML decision classes

AHTE modules include Evidence Gap Predictor, Anomaly Engine, Contradiction Engine, Trust Fracture Engine, Predictive Compliance Engine, Recall Blast-Radius Engine and explicit **Preemptive Strategy Engine**.

AI/ML may perform configured D0/D1/D2 functions and policy-authorised D4 holds. It must not bypass D5 authority gates, D6 sovereign/legal decisions or automatically release a human-reserved hold.

Prediction/strategy provenance includes model ID/version, input/evidence references, feature references, timestamp, confidence/score where applicable, explanation, affected objects, blast radius, decision class, human-role linkage and outcome refs.

## Sinotrans integration

Sinotrans is end-to-end logistics **and warehouse** execution, not a narrow transport connector.

Target integration:

`Y2T / MIS / EDI / WMS / TMS / IoT / operational systems → secure adapter/API → canonical event normalization → AHTE evidence/trust graph → Command Center`.

Required domains include booking/order, warehouse receipt/dispatch, zone/segregation/storage, inventory/batch genealogy, pickup, vehicle, pallet/lot, container, seal, loading, route/geofence, telemetry, custody handovers, port transfer, customs-document references, proof of delivery and damage/tamper/route/telemetry exceptions.

AHTE does not replace Sinotrans operational systems merely to join the ecosystem.

## Port/customs API plane

Authorised port/customs users receive minimum-necessary trust resolution supporting shipment lookup, product/batch/container/seal reconciliation, authorised trust packet, authority/certification-status reference, laboratory/document/evidence references, custody history, telemetry exceptions, inspection/sampling, hold/release and signed authority/custody event return.

AHTE records and propagates official events; it does not create or override sovereign clearance decisions.

## Shariah Financing / Takaful / approved tokenomics

Persistent target objects:

- `ahte_finance_evidence_packets`
- `ahte_financing_cases`
- `ahte_takaful_cases`
- `ahte_tokenized_asset_references`
- `ahte_connector_states`

Supported target purposes include Islamic trade finance, purchase-order/receivables finance, inventory/shipment finance, Takaful underwriting, Takaful claims evidence, asset/collateral state verification and approved token/digital-value mechanisms.

Hard boundaries:

- AHTE trust state is not a credit decision.
- Halal certification is not financing approval.
- AHTE does not approve financing (`ahte_approves_financing=false`).
- AHTE does not underwrite Takaful or decide claims (`ahte_underwrites_or_decides_claim=false`).
- AHTE is not the legal-title registry (`ahte_is_title_registry=false`).
- Tokenization does not create Halal status (`tokenization_creates_halal_status=false`).
- legal classification, Shariah review and regulatory status are explicit external state fields.

## Connector state model

Unavailable external credentials do not become missing product capability. `ahte_connector_states` records one of:

- `development-provider-active`
- `sandbox-connected`
- `production-credentials-required`
- `production-connected`

A connector marked `production-connected` must be a production environment. Connector state never creates authority or counterparty decision state.

## Machine schema / persistence

Current proposal schema families:

1. connector state
2. Command Center alert
3. prediction
4. preemptive strategy
5. finance evidence packet
6. financing case
7. Takaful case
8. tokenized-asset reference

They are implemented in `config/target-extension-schemas-2026-09-30.json` and corresponding Supabase forward migrations with organization-scoped RLS, audit triggers and required indexing/realtime controls.

Schema conformance does not create authority, financing, underwriting, legal-title, regulatory or Shariah status.

## Data sovereignty

AHTE is federated:

`Data stays where it belongs; trust travels.`

Cross-border default is minimum-necessary signed assertions, references, hashes and scoped metadata. Detailed source records stay in their governed domains unless a lawful/authorised workflow requires otherwise.

## Experiences

Target experiences include public website, manufacturer portal, supplier/material workflows, laboratory/sample interface, smart-glass auditor interface, 24/7 Command Center, Sinotrans warehouse/logistics integration views, port/customs API/officer interface, GCC importer/receiving view, retailer/buyer view, consumer verification, finance/Takaful purpose-specific interface and administration/security/governance.

Language architecture supports English, Simplified Chinese, Malay and Arabic/RTL; delivery status remains a separate implementation matter.

## Canonical execution pack

Current canonical China execution pack: `master-standards-stack/CHINA_EXECUTION_PACK/`.

The lower-case duplicate `master-standards-stack/china-execution-pack/` is retired lineage and must not be used as a current source path.

## Completion semantics

Architecture completeness means the full intended capability, contract boundary, workflow, persistent object and UI state exist without artificial omission. External production activation still requires real counterparties, permissions, credentials, security controls, source evidence and transaction-native records.

## Freeze / promotion

The doctrine freeze boundary remains `master-standards-stack/verified-2026-09-17/`. Post-freeze architecture remains source-qualified until formally promoted. Amanah records provenance rather than silently converting project architecture into authority text.