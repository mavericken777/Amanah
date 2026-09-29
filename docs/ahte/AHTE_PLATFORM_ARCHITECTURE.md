# Amanah — AHTE / IQ300 Platform Architecture

## Source binding
This architecture is reconciled from `mavericken777/GlobalHalalDigitalTrust` `main`, principally `IQ300_DOCTRINE.md`, `canonical-path-machine-map.json`, `schema-registry.json`, and `RECONCILIATION_2026-09-27.md`. GlobalHalalDigitalTrust remains the doctrine/reference repository; Amanah is the operational application implementation.

## Authority boundary
Amanah is an orchestration, evidence and operational-release platform. It does **not** replace JAKIM/MAIN/JAIN certification decisions, GCC destination decisions, laboratories, importers or other competent authorities. AI outputs are advisory. HITM cases and signed authority decisions are distinct records. QR, blockchain, sensor, laboratory and platform records do not independently create Halal certification.

## Canonical path
`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

Every AHTE record is designed to attach to one or more points on this path. Where normative text is not held, the record is `source_locked`; the application must not invent clause wording.

## Platform planes
1. **Source and authority:** authorities, instruments, requirements, applicability, source status.
2. **Control:** controls, HCP/SCCP, audit tests, findings, corrective actions, re-verification.
3. **Evidence:** E1 screening, E2 verified documentary, E3 independent verification, E4 transaction, E5 authority decision; hashes, validity and provenance.
4. **Human decision:** advisory AI assessments, HITM cases, accountable authority decisions and signatures.
5. **Trust:** trust state, trust vector, hard gates, descriptive score, fracture/auto-hold and operational release.
6. **Transaction:** identities, certificates, partners, laboratories, shipments, custody, port custody and trust packets.

## Shipment 001
Default pilot corridor: **China → GCC direct**. Shipment 001 is not instantiated by architecture alone. It requires transaction-native evidence: legal entity, factory, SKU/formula, current certificate and scope, destination acceptance, label/import requirements, importer/buyer, commercial terms, pilot batch, laboratory evidence, logistics/custody, border release and receiving verification.

## Malaysian standards operating set
The current doctrine catalogues the 17-standard operating set including MS 1500:2019; MS 2400-1/-2/-3:2019; MS 2424:2019; MS 2634:2019; MS 2636:2019; MS 2738:2023; MS 2803:2025; MS 2393:2023; MS 2627:2017; MS 2627-2:2025; MS 1900:2025; MS 2691:2021; MS 2610:2015; MS 2809:2025; and MS 2810:2025. Detailed normative subclauses remain source-locked where the source repository says they are source-locked.

## Trust packet
Amanah stores identity, certificate, evidence, custody, audit, authority gate, trust state and port custody objects as structured JSON components. Schema conformance is a formatting/control property; it does not create authority status.

## Completion semantics
`100% complete` means every required workstream is completed and evidenced, explicitly source-locked with the missing authoritative source identified, or an external transaction dependency with a named closure condition. It does not mean invented certificates, approvals, contracts, legal conclusions or shipment events.

## Freeze / promotion
The doctrine freeze boundary remains `master-standards-stack/verified-2026-09-17/`. Post-freeze material is treated as proposal/evidence-update content until formally promoted. Amanah records source status and provenance rather than silently promoting repository content into normative authority.
