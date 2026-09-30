# Amanah

Amanah is the operational application layer for the Amanah Halal Trust Ecosystem (AHTE). It combines a general operational platform with the IQ300 source-aware assurance, evidence, HITM, trust-state, command-center and trade-control layers.

## Platform scope

- Operational core: identity, organizations, projects, tasks, meetings, documents, decisions, risks, finance, updates, notifications, audit, workflows, approvals, collaboration and administration.
- AHTE / IQ300 control plane: authorities, standards/instruments, requirements, applicability, controls, HCP/SCCP, evidence, audit tests, findings, corrective actions, re-verification, authority gates, trust states, HITM cases, external authority decisions, AI provenance, trust vectors, fracture/hold events and operational release.
- Assurance objects: trust packets, identities, certificates, custody, port custody, partners, laboratories, products, batches, logistics events, telemetry, digital twins, credential checks, market registrations, public verification and recalls.
- 24/7 operations: GHSCL + JAKIM-connected Command Center, predictive analytics, preemptive strategies, alerting, escalation, CAPA/re-verification and recall/blast-radius monitoring.
- Integration planes: direct JAKIM API target connectivity; China laboratory/traceability; Sinotrans warehouse/logistics; port/customs APIs; GCC destination; Shariah Financing API / Takaful / tokenomics target plane.
- Trade pilot model: China → GCC direct / Shipment 001.
- Operational support: China Trip workspace and project-management modules.

## Authority boundary

Amanah/AHTE is an orchestration, evidence, monitoring and decision-support layer. It does **not** replace competent authorities and does **not** independently create Halal certification.

- AI/ML assessments, predictions and preemptive strategies are decision support.
- Laboratory results are evidence, not certification.
- Blockchain/cryptographic records preserve integrity; they do not create certification authority.
- Operational release is not certification.
- Authority decision records represent externally owned competent-authority decisions and require external decision evidence.
- Port/customs release remains sovereign authority action.
- Financing/Takaful/tokenomics decisions remain with the applicable financiers, operators, Shariah/regulatory structures and counterparties.
- Source-locked normative text is never invented.

## Canonical path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

## Source binding

Primary doctrine/reference repository: `mavericken777/GlobalHalalDigitalTrust` (`main`).

Current reconciled project target snapshot:

- Repository commit: `ae3f662f7467aba78e64060c031db0f098dbdd49`
- SHA12: `ae3f662f7467`
- Control date: `2026-09-30`
- Freeze boundary: `master-standards-stack/verified-2026-09-17/`
- Doctrine: `00_EXECUTIVE_COMMAND/IQ300_DOCTRINE.md`
- Current target architecture: `00_EXECUTIVE_COMMAND/CURRENT_TARGET_ARCHITECTURE_2026-09-30.md`
- Machine target registry: `00_EXECUTIVE_COMMAND/current-target-architecture-2026-09-30.json`
- Schema registry: `00_EXECUTIVE_COMMAND/schema-registry.json`
- Target extension schemas: `00_EXECUTIVE_COMMAND/target-extension-schemas-2026-09-30.json`

The verified freeze remains unchanged. The 30 September target architecture is post-freeze project architecture and does not become authority text by being implemented in Amanah.

See `docs/ahte/SOURCE_BINDING.md`, `docs/ahte/AHTE_PLATFORM_ARCHITECTURE.md` and `docs/operations/GHDT_SYNC_2026-10-01.md`.

## Current target topology

`China raw-material origin → laboratory evidence → manufacturer/factory systems → HCP/SCCP + smart audit → direct JAKIM API / human authority workflow → AHTE trust state → Sinotrans warehouse/logistics → origin port/customs API → transit → GCC port/customs API → importer/warehouse/distribution/retail`.

Across the chain, Amanah/AHTE provides continuous evidence binding, digital twins, cryptographic integrity, real-time monitoring, AI/ML prediction, preemptive strategy generation and governed human/authority escalation.

## Supabase

Project ref: `lqvyyylrydcpjochknag`  
Region: `ap-northeast-1`

Observed during the 2026-09-30 end-to-end hardening pass:

- project status: `ACTIVE_HEALTHY`
- PostgreSQL: 17.6.1
- 98 public tables; RLS enabled on all 98
- no public SQL views
- security advisor: four intentional authenticated privileged-wrapper warnings; membership/role guards, anonymous denial and private-helper ACLs verified
- AHTE realtime publication enabled for critical operational streams
- forward migrations `release_gate_enforcement` and `reconciliation_followup` applied without rewriting historical migration entries
- `assurance` Edge Function requires JWT authentication
- `public-verify` uses scoped verification tokens and returns `not_certification: true`

The database is structurally provisioned but contains no real Shipment 001 transaction evidence. Transaction-native records must be created by real platform activity; they are not seeded or fabricated.

## Security and authorization

AHTE tables use organization-scoped RLS. The initial broad member-level mutation policy has been replaced for the original AHTE control-plane tables:

- organization members may read records in their workspace;
- source/authority registries and authority decisions require elevated roles;
- trust/release mutation requires elevated operational roles;
- other AHTE operational writes require explicit writer roles;
- destructive operations are restricted to owner/admin roles.

Secrets, private keys, access tokens, identity documents and other sensitive material must never be committed to this repository.

## Development and verification

`main` is the released default branch. Changes are developed on review branches and merged through pull requests.

CI performs:

1. TypeScript type checking.
2. Node test suite.
3. Deno type checking for Supabase Edge Functions.
4. Canonical Python runtime, platform and OPA policy checks.
5. Next.js production build.

A committed npm lockfile and `npm ci` provide deterministic dependency installation. Canonical mirror hashes remain content bindings; the project-level target architecture binding is tracked separately so historical review evidence is not silently rewritten.

See `docs/operations/PENDING.md` for external/transaction gates. Architecture completeness does not imply live JAKIM, Sinotrans, laboratory, port/GCC or finance integrations are already activated.