# Amanah

Amanah is the operational application layer for the Amanah Halal Trust Ecosystem (AHTE). It combines a general operational platform with the IQ300 source-aware assurance, evidence, HITM, trust-state and trade-control layers.

## Platform scope

- Operational core: identity, organizations, projects, tasks, meetings, documents, decisions, risks, finance, updates, notifications, audit, workflows, approvals, collaboration and administration.
- AHTE / IQ300 control plane: authorities, standards/instruments, requirements, applicability, controls, HCP/SCCP, evidence, audit tests, findings, corrective actions, re-verification, authority gates, trust states, HITM cases, external authority decisions, AI provenance, trust vectors, fracture/hold events and operational release.
- Assurance objects: trust packets, identities, certificates, custody, port custody, partners, laboratories, products, batches, logistics events, telemetry, digital twins, credential checks, market registrations, public verification and recalls.
- Trade pilot model: China → GCC direct / Shipment 001.
- Operational support: China Trip workspace and project-management modules.

## Authority boundary

Amanah/AHTE is an orchestration, evidence and decision-support layer. It does **not** replace competent authorities and does **not** independently create Halal certification.

- AI assessments are advisory.
- Laboratory results are evidence, not certification.
- Blockchain/cryptographic records preserve integrity; they do not create certification authority.
- Operational release is not certification.
- Authority decision records represent externally owned competent-authority decisions and require external decision evidence.
- Source-locked normative text is never invented.

## Canonical path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

## Source binding

Primary doctrine/reference repository: `mavericken777/GlobalHalalDigitalTrust` (`main`).

Current reviewed canonical snapshot:

- Repository commit: `0fab4c64240b569caef947fb2568ccda9d3fa0d3`
- SHA12: `0fab4c64240b`
- Verified: `2026-09-30T18:36:26Z`
- Freeze boundary: `master-standards-stack/verified-2026-09-17/`
- Doctrine: `00_EXECUTIVE_COMMAND/IQ300_DOCTRINE.md`
- Machine path map: `00_EXECUTIVE_COMMAND/canonical-path-machine-map.json`
- Schema registry: `00_EXECUTIVE_COMMAND/schema-registry.json`
- Trust-packet schemas: `00_EXECUTIVE_COMMAND/trust-packet-schemas.json`

See `docs/ahte/SOURCE_BINDING.md` and `docs/ahte/AHTE_PLATFORM_ARCHITECTURE.md`.

## Current integration topology

- Direct JAKIM API is the intended Malaysian authority-system connectivity path; no generic public “authority gateway” is presented as a substitute for the authority system.
- GHSCL operates the international digital/operational infrastructure and the 24/7 Command Center with JAKIM visibility.
- AHTE provides continuous standards, evidence, trust, predictive and preemptive intelligence.
- Manufacturers, laboratories, logistics providers, warehouses and port/customs participants contribute source evidence through controlled integrations.
- Sinotrans is the logistics/warehouse integration plane for the China → GCC direct pilot.
- Port/customs authority interfaces are explicit integration surfaces.
- Shariah financing, Takaful and tokenomics are separate financial/trade-support capabilities and do not create Halal certification.

## Supabase

Project ref: `lqvyyylrydcpjochknag`  
Region: `ap-northeast-1`

Observed/verified 2026-10-01:

- project status: `ACTIVE_HEALTHY`
- PostgreSQL: 17.6.1
- 98 public tables; RLS enabled on all 98
- no public SQL views
- four intentional authenticated privileged-wrapper security-advisor warnings remain; the wrappers require an authenticated user and organization/membership/role checks, anonymous execution is denied, and private helpers have restricted ACLs
- AHTE realtime publication enabled for critical operational streams
- `assurance` Edge Function requires JWT authentication
- `public-verify` uses scoped verification tokens and returns `not_certification: true`

A managed PostgreSQL minor upgrade is an external Supabase administration operation and is **not** represented as completed merely because the database is healthy. The pre-check is complete; the upgrade remains an explicit maintenance-window gate.

The database is structurally provisioned but contains no real users, organizations, projects or Shipment 001 transaction evidence yet. Transaction-native records must be created by real platform activity; they are not seeded or fabricated.

## Security and authorization

AHTE tables use organization-scoped RLS. The initial broad member-level mutation policy has been replaced for the original AHTE control-plane tables:

- organization members may read records in their workspace;
- source/authority registries and authority decisions require elevated roles;
- trust/release mutation requires elevated operational roles;
- other AHTE operational writes require explicit writer roles;
- destructive operations are restricted to owner/admin roles.

Secrets, private keys, access tokens, identity documents and other sensitive material must never be committed to this repository.

## Development and verification

`main` is the released default branch. Amanah CI is the required validation suite for review/merge governance. GitHub ruleset administration is external to the connected repository tool and remains an account-level gate until configured by a GitHub administrator.

CI performs:

1. TypeScript type checking.
2. Node test suite.
3. Deno type checking for all three Supabase Edge Functions.
4. Canonical Python runtime, platform and OPA policy checks.
5. Next.js production build.

A committed npm lockfile and `npm ci` provide deterministic dependency installation. Canonical mirrors are source-qualified and historical snapshots are not silently treated as current.

See `docs/operations/RECONCILIATION_LIVE_VERIFICATION_2026-09-30.md` and `docs/operations/PENDING.md` for current verification and remaining external gates. Historical completion claims are superseded; a registered gap is not a completed implementation.
