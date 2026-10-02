# AMANAH Stakeholder Operating Playbooks
**Version:** 1.0.0 | **Control date:** 2026-10-02 | **Status:** CONTROLLING PROJECT OPERATING PACK

## Common contract
Every role uses the canonical path: Authority → Standard/Instrument → Requirement → Applicability → Control → HCP/SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release.

| Stakeholder | Primary inputs | Primary outputs | System/interface | Decision boundary | Activation |
|---|---|---|---|---|---|
| Manufacturer | facility/product/SKU/BOM, supplier/material, documents, production events | readiness, evidence, CAPA, production/custody events | Amanah + ERP/MES/QMS/WMS/DMS/IoT | cannot issue authority decision | tenant + production connectors |
| Laboratory | sample/seal/custody, method/scope | signed result/report evidence | LIMS/Lab API | scientific evidence only; NOT_DETECTED ≠ HALAL | legal identity/accreditation/method scope/API |
| Auditor/Halal officer | scope, requirements, HCP/SCCP, evidence | observation, finding, CAPA/re-verification | smart audit/Amanah | human assessment per mandate | authorized identity/device |
| JAKIM/authority | scoped evidence/case | external authority status/decision reference | Direct JAKIM API | D5/D6 human/sovereign | authorized API/spec/credentials |
| GHSCL Command Center | cross-domain events/evidence | alerts, ownership, escalation, strategy records | AHTE event/evidence plane | D0–D2 + configured D4 only | operator roster + connectors |
| Sinotrans | shipment/object/custody/container/seal/telemetry | warehouse/logistics/custody events | WMS/TMS/Y2T/MIS/EDI/IoT adapters | no certification/customs decision | contract + sites/lanes + credentials |
| Port/customs | shipment/trust/custody/evidence | inspection/sample/hold/release/custody | sovereign API/EDI/SFTP/MQ/batch | sovereign release remains authority | permission + interface contract |
| GCC importer/destination | authority/custody/product/shipment evidence | acceptance, receiving, distribution verification | importer/WMS/customs interfaces | destination legal/market decisions remain local | named importer/authority/system |
| Finance/Takaful | purpose-limited evidence packet | independent finance/underwriting/claim decision | finance/Takaful adapter | AHTE cannot approve | counterparty/regulatory/Shariah approval |
| Buyer/consumer | authorized disclosure token | verification event/view | public verify | disclosure is not certification | issuer-authorized token |

## Engagement sequence
1. Confirm legal entity and mandate.
2. Register organization/role and data jurisdiction.
3. Agree object/evidence scope and RACI.
4. Map source systems and connector state.
5. Configure least-privilege identity/security.
6. Run sandbox/development contract tests with simulated data.
7. Complete partner UAT with authorized non-fictional records.
8. Approve production credentials and operational escalation.
9. Activate production connector.
10. Monitor evidence integrity, exceptions, CAPA/re-verification and SLA.

## Stakeholder-specific acceptance

### Manufacturer
Acceptance requires organization isolation, facility/product/SKU graph, supplier/material provenance, document/evidence readiness, lab/audit links, production/custody monitoring and action ownership.

### Laboratory
Acceptance requires legal/accreditation/method scope binding, sample/accession/seal/custody, method/QC/result, reviewer/signature, report version/supersession and evidence link. No laboratory output is presented as Halal certification.

### Authority
Acceptance requires authorized identity, case/evidence binding, external authority reference, signature/integrity reference, human decision audit trail and strict D5/D6 reservation.

### Sinotrans
Acceptance requires named sites/lanes, warehouse/logistics systems, container/seal identity, telemetry/custody events, exception routing, offline/replay/idempotency tests and proof-of-delivery reconciliation.

### Ports/customs and GCC destination
Acceptance requires jurisdiction, port/destination identifiers, permissioned interfaces, inspection/hold/release semantics, custody handoff and destination acceptance rules. AHTE does not replace sovereign systems.

### Finance/Takaful
Acceptance requires purpose, requesting party, subject objects, disclosure policy, evidence/custody/exception references and independent provider decision. Token/digital-value mechanisms remain inactive unless legally, regulatorily and Shariah approved.

## Status rule
UNCONFIGURED → DEVELOPMENT → SANDBOX → PENDING_AUTHORIZATION → PRODUCTION.

No status may be promoted without evidence of the preceding gate. External unavailability does not justify removing the interface.
