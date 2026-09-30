# Amanah — AHTE / IQ300 Platform Architecture

## Source binding

Current project target: `mavericken777/GlobalHalalDigitalTrust@ae3f662f7467aba78e64060c031db0f098dbdd49`.

Freeze: `master-standards-stack/verified-2026-09-17/` remains unchanged.

[PROPOSAL: Amanah implementation synchronization to 30 Sep target architecture — path point: Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release]

## Authority boundary

Amanah is an orchestration, evidence, continuous-monitoring and operational-release platform. It does **not** replace JAKIM/MAIN/JAIN certification decisions, GCC destination decisions, laboratories, financiers, Takaful operators, port/customs authorities, importers or other competent actors.

AI/ML outputs are decision support. Laboratory results are evidence. Cryptographic integrity protects history. Operational release is distinct from certification. Financing/Takaful/tokenomics decisions remain with their lawful/Shariah-governed counterparties.

## Canonical path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

Every AHTE record attaches to one or more points on this path. Where normative text is not held, the record is `source_locked`; the application must not invent clause wording.

## Governing target topology

```text
CHINA RAW-MATERIAL ORIGIN
→ SUPPLIER / PRODUCER
→ SAMPLE / SEAL / CUSTODY
→ CHINA LABORATORY / TRACEABILITY
→ SIGNED SCIENTIFIC EVIDENCE
→ MANUFACTURER / ERP / MES / QMS / WMS / LIMS / IoT
→ APPLICABILITY / HCP / SCCP
→ SMART-GLASS AI-ASSISTED AUDIT
→ FINDING / CAPA / RE-VERIFICATION
→ DIRECT JAKIM API / HUMAN AUTHORITY WORKFLOW
→ FORMAL AUTHORITY STATUS
→ AHTE TRUST STATE
→ PACKAGING / LOT / PALLET
→ SINOTRANS WAREHOUSE
→ SINOTRANS END-TO-END LOGISTICS
→ CONTAINER / SEAL / TELEMETRY / CUSTODY
→ ORIGIN PORT/CUSTOMS API
→ INTERNATIONAL TRANSIT
→ GCC PORT/CUSTOMS API
→ DESTINATION RELEASE
→ IMPORTER / WAREHOUSE / DISTRIBUTION / RETAIL
→ AUTHORISED BUYER / CONSUMER VERIFICATION
```

Default corridor: **China → GCC direct**. Malaysia remains the governance/assurance plane unless separately scoped as a physical movement.

[PILOT: Shipment 001 — China → GCC direct; not instantiated until transaction-native evidence exists]

## Platform planes

1. **Source and authority** — authorities, instruments, requirements, applicability, source status, direct JAKIM API case/status exchange.
2. **Control** — controls, HCP/SCCP, audit tests, findings, corrective actions, re-verification.
3. **Evidence** — E1 screening, E2 verified documentary, E3 independent verification, E4 transaction, E5 authority decision; hashes, validity, provenance and supersession.
4. **Human decision** — AI/ML advisory outputs, HITM cases, accountable authority decisions and signatures.
5. **Trust** — trust state, trust vector, hard gates, fracture/auto-hold, release and recall.
6. **Transaction** — identities, certificates, partners, laboratories, products, batches, shipments, custody, port custody and trust packets.
7. **Command Center** — 24/7 GHSCL + JAKIM-connected monitoring, analytics, alerting, escalation, intervention, CAPA/re-verification and recall.
8. **Predictive/preemptive assurance** — prediction, blast-radius analysis, preemptive strategy generation, governed execution and outcome feedback.
9. **Logistics/warehouse** — Sinotrans end-to-end warehouse and logistics execution with real-time evidence feeds.
10. **Port/customs** — authorised API/trust interface for minimum-necessary shipment verification, inspection, hold/release and custody events.
11. **Shariah finance/trade** — Shariah Financing API, Takaful evidence, financing support and tokenomics/digital-value mechanisms where separately Shariah/legal/regulatory approved.

## Direct JAKIM API target boundary

Public/project topology is:

`AHTE ⇄ DIRECT JAKIM API ⇄ JAKIM`

Internal software may retain a generic connector abstraction for replaceability, but user-facing architecture and project-specific connector profiles must identify the direct JAKIM API target. No official endpoint, credential, scope or payload contract may be fabricated before an authorised technical specification exists.

## 24/7 Command Center

The Command Center is a first-class operating plane, not a passive dashboard.

Monitored domains include manufacturer/facility, supplier/raw material, laboratory/sample, HCP/SCCP, smart-glass audit, authority status, Sinotrans warehouse/logistics, container/seal, telemetry, route/geofence, custody, ports, GCC receiving, CAPA, evidence expiry, trust fracture, predictive risk, preemptive strategy and recall.

Operating loop:

`OBSERVE → CORRELATE → DETECT → PREDICT → GENERATE STRATEGY → PRIORITISE → ASSIGN → ALERT/ESCALATE/HOLD WHERE POLICY ALLOWS → HUMAN/AUTHORITY ACTION → CAPA/RE-VERIFICATION → OUTCOME`

## AI/ML decision classes

Existing AHTE modules remain active: Evidence Gap Predictor, Anomaly Engine, Contradiction Engine, Trust Fracture Engine, Predictive Compliance Engine and Recall Blast-Radius Engine.

The target architecture adds an explicit **Preemptive Strategy Engine**.

AI/ML may execute configured D0/D1/D2 functions and policy-authorised D4 holds. It must not bypass D5 authority gates, D6 sovereign/legal decisions or automatically release a human-reserved hold.

Every prediction/strategy retains model ID/version, input/evidence references, timestamp, confidence/score where applicable, explanation metadata, affected objects, decision class, recommended action, reviewer/decision linkage and outcome references.

## Laboratory integration

`SampleID → Collection → Seal → Custody → Receipt/Accession → Method/QC → Technical Review → Signed Result/Report → Canonicalisation → Integrity Proof → AHTE Evidence → Authority workflow where authorised`.

`NOT DETECTED ≠ HALAL` remains a hard rule.

The China traceability/anti-counterfeit system contributes physical/digital identity, serialization, aggregation, scan/channel and traceability evidence; it does not itself create certification.

## Sinotrans integration

Sinotrans is modelled as end-to-end logistics **and warehouse** execution, not a narrow transport connector.

Target integration:

`Y2T / MIS / EDI / WMS / TMS / IoT / operational systems → secure adapter/API → canonical event normalization → AHTE evidence/trust graph → Command Center`.

Required event classes include booking, pickup, warehouse receipt/dispatch, pallet/lot mapping, storage/segregation, container/seal, custody transfer, telemetry, route/geofence, port handoff, customs references, destination receipt, proof of delivery and exceptions.

## Port/customs API plane

Authorised port/customs users receive minimum-necessary trust resolution through an API/interface supporting shipment lookup, container/seal reconciliation, authority-status references, laboratory/evidence references, custody history, telemetry exceptions, inspection/sampling, hold/release and signed event return.

AHTE records and propagates official events; it does not create sovereign clearance decisions.

## Shariah Financing / Takaful / tokenomics plane

Amanah exposes a target **Shariah Financing API** for authorised trust/trade evidence.

Supported target purposes include Islamic trade finance, purchase-order finance, inventory/shipment finance, Takaful underwriting, Takaful claims evidence, asset-state verification and tokenomics/digital-value support where separately approved.

Hard boundaries:

- AHTE trust state is not a credit decision.
- Halal certification is not financing approval.
- Takaful underwriting/claims decisions are externally owned.
- Tokenization does not by itself change legal title, ownership, Shariah status, regulatory status or certification state.

## Trust packet and extension objects

Core trust packets remain identity, certificate, evidence, custody, audit, authority gate, trust state and port custody objects.

Target extension objects add:

- `command_center_alert_object`
- `prediction_object`
- `preemptive_strategy_object`
- `finance_evidence_packet_object`

Schemas are mirrored in `config/target-extension-schemas-2026-09-30.json` and are post-freeze proposal schemas. Conformance does not create authority, financing or underwriting status.

## Completion semantics

Architecture completeness means the full intended capability, contract boundary, workflow and UI state exist without artificial omission. Where external production systems are unavailable, Amanah uses replaceable non-production connectors without pretending they are live.

Production activation still requires real counterparties, permissions, credentials, security controls, source evidence and transaction-native records.

## Freeze / promotion

The doctrine freeze boundary remains `master-standards-stack/verified-2026-09-17/`. Post-freeze architecture remains source-qualified until formally promoted. Amanah records provenance rather than silently converting project architecture into authority text.