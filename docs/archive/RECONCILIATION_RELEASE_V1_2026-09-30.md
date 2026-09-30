> HISTORICAL / SUPERSEDED / NON-CONTROLLING. Original audit evidence is retained below. Current source binding, topology, readiness and gates are controlled by [STATUS](../operations/STATUS.md), [SOURCE_BINDING](../ahte/SOURCE_BINDING.md) and [PENDING](../operations/PENDING.md). Historical closure claims apply only to their recorded review.

# Reconciliation release candidate v1 — 2026-09-30

[PROPOSAL: closes source-mirror, migration-replay and operational release bypass defects — path point: Control → Evidence → Audit Test → Re-verification → Authority Gate → Trust State → Operational Release]

BOUNDARY CHECK: derived from canonical project implementation and observed Amanah database metadata; freeze: CROSSING → [PROPOSAL]. No frozen standards artifact is edited.

Canonical source: `GlobalHalalDigitalTrust@3d5cc29fabf7c3ed0da20cd938219fed83e74830`; SHA12 `3d5cc29fabf7`. Current mirrors use Git-blob SHA-256 digests, not platform-dependent checkout line endings. The manifest contains 43 source-bound files.

## Behavior repaired

- State changes are serialized, append-only and linked to the preceding state. The caller cannot assert hard-gate success. Undefined or reserved authority transitions are denied.
- Seven gate reviews are required; their evidence must be verified/current and match the exact entity. Authority/waiver reviews require matching E5 references and approved external authority decision records. Scores cannot compensate for missing/failed gates.
- Fractures force HOLD on assessed/eligible/released subjects and block release until human re-verification and fresh gate reviews. No auto-release is introduced.
- Release records are tenant/subject/project bound, re-evaluated at database write time, retain `is_certification=false`, and advance the state atomically with ledger writes.
- AHTE organization-owned foreign keys and evidence arrays reject cross-tenant references. Database controls serialize mutations and audit business writes. Ordinary members cannot redefine transition/policy controls or forge ledger rows.
- Shipment, batch, material-lot and shipment-item release fields require an already released, gate-valid Trust State; they cannot create a parallel release path. Authenticated rate-limit/release/public-disclosure RPC wrappers enforce membership/roles before calling private helpers.
- API JSON parsing, packet component validation, idempotency actor/route/body binding, unfinished response handling, state lookup errors, release enum/project scoping and hold schema compatibility are repaired.

## Baseline lineage repair

Fresh replay exposed a malformed dollar-quote in migration 0001, 33 absent table definitions needed before 0009, an absent organization-rule initializer and non-idempotent revokes of an already absent legacy RPC. The absent tables, 132 policies and 83 indexes were recovered from Supabase database metadata for project `lqvyyylrydcpjochknag` on 2026-09-30. This is a technical schema snapshot, not an authority publication.

The repository baseline is repaired for fresh installs. Existing live installations must not reapply or rewrite historical migration ledger entries. The separate CLI-created `20260930035500_release_gate_enforcement.sql` is the forward migration. Fresh replay is exercised against a disposable PostgreSQL runtime with minimal Supabase auth/storage scaffolding; platform business SQL is executed as supplied.

## Verification at candidate preparation

- Node suite: 67 tests passed, including 43 mirror checks.
- Entire migration sequence replayed successfully; direct gate bypass, stale transitions, immutable state history, expiry, automatic hold, authenticated release proxy, forbidden ledger insertion and tenant access boundaries exercised.
- A synthetic positive gate-review path reaches eligible; a human operational release advances to released. These are local disposable fixtures, never real authority/shipment evidence.
- TypeScript check passed.
- Production build passed before the final API changes; exact-head CI remains the release gate.
- Assurance Deno check passed before the final lookup-error changes; exact-head CI rechecks all three functions.
- Python/OPA checks are now included in CI. No passing result is claimed until those checks actually finish.

## Remaining bounded gaps

[OPEN GATE: SOURCE CONFLICT — trust-state-reference-layer — owner: AHTE/IQ300 source governance — blocking: frozen-vocabulary promotion]

The machine proposal defines `authority_decided` without an onward transition. This implementation does not invent one or let AI execute D5/D6. Authority workflow integration and promotion remain source-governance decisions.

- The file inventory covers every tracked path; it is not a completed semantic review of every documentary artifact.
- Production UAT with genuine authorized operators and transaction evidence is not exercised in the empty live tenant environment.
- Complex multi-request API operations such as recall-scope creation and response/idempotency completion still require broader transactional integration review. Failures are explicit, not represented as successful closure.
- Review attestations and stored hashes are evidence bindings; independent issuer signatures, instrument authenticity, accredited assay interpretation and destination acceptance remain external evidence gates.

[SOURCE-LOCKED: exact licensed normative wording — required: controlling licensed source when exact clause verification is performed]
[PILOT: Shipment 001 — no transaction evidence instantiated]

Certification remains with JAKIM/MAIN/JAIN. Destination gates remain with applicable GCC authorities/importers. `NOT DETECTED ≠ HALAL`. Operational release never creates Halal certification.
