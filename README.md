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

Current reviewed canonical snapshot for this hardening pass:

- Repository commit: `3d5cc29fabf7c3ed0da20cd938219fed83e74830`
- SHA12: `3d5cc29fabf7`
- Freeze boundary: `master-standards-stack/verified-2026-09-17/`
- Doctrine: `00_EXECUTIVE_COMMAND/IQ300_DOCTRINE.md`
- Machine path map: `00_EXECUTIVE_COMMAND/canonical-path-machine-map.json`
- Schema registry: `00_EXECUTIVE_COMMAND/schema-registry.json`
- Trust-packet schemas: `00_EXECUTIVE_COMMAND/trust-packet-schemas.json`

See `docs/ahte/SOURCE_BINDING.md` and `docs/ahte/AHTE_PLATFORM_ARCHITECTURE.md`.

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

`main` is the released default branch. Changes are developed on review branches and merged through pull requests.

CI performs:

1. TypeScript type checking.
2. Node test suite.
3. Deno type checking for all three Supabase Edge Functions.
4. Canonical Python runtime, platform and OPA policy checks.
5. Next.js production build.

A committed npm lockfile and `npm ci` provide deterministic dependency installation. Canonical mirrors are checked against 43 Git-blob SHA-256 bindings.

See `docs/operations/RECONCILIATION_LIVE_VERIFICATION_2026-09-30.md` and `docs/operations/PENDING.md` for current verification and remaining gates. Historical completion claims are superseded; a registered gap is not a completed implementation.
