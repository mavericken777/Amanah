# Amanah

Amanah is the operational application layer for the Amanah Halal Trust Ecosystem (AHTE). It combines the operational platform with IQ300 source-aware standards/applicability, evidence, HITM, trust-state, Command Center and trade-control layers.

## Platform scope

- Operational core: identity, organizations, projects, tasks, meetings, documents, decisions, risks, finance, updates, notifications, audit, workflows, approvals, collaboration and administration.
- AHTE / IQ300 control plane: authorities, instruments, requirements, applicability, controls, HCP/SCCP, evidence, audit tests, findings, CAPA, re-verification, authority gates, trust states, HITM cases, external authority decisions, AI provenance, trust vectors, fracture/hold events and operational release.
- Assurance objects: trust packets, identities, certificates, custody, port custody, partners, laboratories, products, batches, logistics events, telemetry, digital twins, credential checks, market registrations, public verification and recalls.
- 24/7 operations: GHSCL operational + authorised JAKIM authority-side Command Center monitoring, predictive analytics, preemptive strategies, alerting, escalation, CAPA/re-verification and recall/blast-radius monitoring.
- Integration planes: direct JAKIM API; China traceability/laboratory; factory systems; Sinotrans warehouse/logistics; origin and GCC port/customs APIs; GCC destination; Shariah Financing API / Takaful / approved tokenomics target plane.
- Trade pilot model: China → GCC direct / Shipment 001.
- Operational support: China Trip workspace and project-management modules.

## Authority boundary

Amanah/AHTE is an orchestration, evidence, monitoring and decision-support layer. It does **not** replace competent authorities and does **not** independently create Halal certification.

- AI/ML assessments, predictions and preemptive strategies are decision support.
- Laboratory results are evidence, not certification. `NOT DETECTED ≠ HALAL`.
- Blockchain/cryptographic records preserve integrity; they do not create certification authority or prove an underlying claim merely by hashing it.
- Operational release is not certification.
- Authority decision records represent externally owned competent-authority decisions and require external decision evidence.
- Port/customs release remains a sovereign authority action.
- Financing, Takaful and token/digital-asset decisions remain with the applicable financiers, operators, Shariah/legal/regulatory structures and counterparties.
- Source-locked normative text is never invented.

## Canonical path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

## Source binding

Primary doctrine/reference repository: `mavericken777/GlobalHalalDigitalTrust` (`main`).

Current reviewed project target snapshot:

- Repository commit: `0fab4c64240b569caef947fb2568ccda9d3fa0d3`
- SHA12: `0fab4c64240b`
- Verified project-repo snapshot: `2026-09-30T18:36:26Z`
- Freeze boundary: `master-standards-stack/verified-2026-09-17/`
- Doctrine: `00_EXECUTIVE_COMMAND/IQ300_DOCTRINE.md`
- Current target architecture: `00_EXECUTIVE_COMMAND/CURRENT_TARGET_ARCHITECTURE_2026-09-30.md`
- Machine target registry: `00_EXECUTIVE_COMMAND/current-target-architecture-2026-09-30.json` v1.2.0
- Requirements traceability: `00_EXECUTIVE_COMMAND/PLATFORM_REQUIREMENTS_TRACEABILITY_2026-09-30.md`
- Implementation rule: `00_EXECUTIVE_COMMAND/IMPLEMENTATION_COMPLETENESS_RULE_2026-09-30.md`
- Target extension schemas: `00_EXECUTIVE_COMMAND/target-extension-schemas-2026-09-30.json` v0.2.0
- Canonical China execution pack: `master-standards-stack/CHINA_EXECUTION_PACK/`

The verified freeze remains unchanged. Post-freeze project architecture is implementation guidance and does not become authority text merely by being implemented in Amanah.

See `docs/ahte/SOURCE_BINDING.md`, `docs/ahte/AHTE_PLATFORM_ARCHITECTURE.md`, `docs/operations/GHDT_SYNC_2026-10-01.md`, and `docs/operations/EXTERNAL_GATES_RUNBOOK_2026-10-01.md`.

## Current target topology

`Verified China raw-material origin → supplier/producer → physical + digital identity → sample/seal/custody → China traceability + laboratory system → signed scientific evidence → manufacturer/factory systems → applicability + HCP/SCCP → smart-glass audit → finding/CAPA/re-verification → direct JAKIM API → PHC + JAKIM authorised human review/approve-disapprove workflow → formal authority status → AHTE trust-state propagation → unit/box/carton/pallet → Sinotrans warehouse → Sinotrans end-to-end logistics → container/seal/telemetry/custody → origin port/customs API → transit → GCC port/customs API → destination inspection/release → importer/warehouse/distribution/retail → authorised buyer/consumer verification`.

Across the chain, Amanah/AHTE provides continuous evidence binding, digital twins, cryptographic integrity, federated minimum-necessary disclosure, real-time monitoring, AI/ML prediction, preemptive strategy generation and governed human/authority escalation.

## Implementation completeness rule

**FULL ARCHITECTURE NOW → REAL CONNECTORS WHEN AVAILABLE → NO REDESIGN REQUIRED.**

Missing production credentials or counterparties do not justify deleting or hiding target capabilities. Development/sandbox providers may exercise complete workflows only when clearly non-production and must never fabricate authority, shipment, laboratory, customs, financing, Takaful or token legal-state evidence.

## Supabase

Project ref: `lqvyyylrydcpjochknag`  
Region: `ap-northeast-1`

Live verification on 2026-10-01:

- project status: `ACTIVE_HEALTHY`
- PostgreSQL: `17.11`
- 102 public base tables; RLS enabled on all 102
- current target extension tables live: `ahte_command_center_alerts`, `ahte_predictions`, `ahte_preemptive_strategies`, `ahte_finance_evidence_packets`
- target extension RLS, audit triggers and realtime publication applied where specified
- foreign-key indexes for the new extension tables applied
- security advisor: no new target-extension warning; four pre-existing authenticated privileged-wrapper warnings remain documented and source-controlled
- performance advisor: no remaining new unindexed-FK finding after the target-extension index migration
- `assurance` Edge Function requires JWT authentication
- `public-verify` uses scoped verification tokens and returns `not_certification: true`

The database is structurally provisioned but contains no real Shipment 001 transaction evidence. Transaction-native records must be created by real platform activity; they are not seeded or fabricated.

## Security and authorization

AHTE tables use organization-scoped RLS. Source/authority mutation and authority decisions require elevated roles; trust/release mutation requires elevated operational roles; other operational writes require explicit writer roles; destructive operations are owner/admin restricted.

Secrets, private keys, access tokens, identity documents and other sensitive material must never be committed to this repository.

## Development and verification

`main` is the released default branch. Amanah CI is the merge gate for repository-controlled changes. The suite covers:

1. TypeScript type checking.
2. Node test suite including current target architecture and public-site regression checks.
3. Deno type checking for Supabase Edge Functions.
4. Canonical Python runtime/platform and OPA policy checks.
5. Next.js production build.
6. Public website build/lint in the test job.

A committed npm lockfile and `npm ci` provide deterministic dependency installation. Historical reconciliation/mirror records retain their original reviewed commit rather than being falsified as current.

See `docs/operations/PENDING.md` for external/transaction gates. Architecture completeness does not imply live production activation of JAKIM, laboratory, Sinotrans, port/GCC or finance/Takaful/tokenomics connectors.