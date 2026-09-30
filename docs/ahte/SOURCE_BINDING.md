# AHTE source binding

## Primary project source

`mavericken777/GlobalHalalDigitalTrust` — branch `main`.

[PROJECT-REPO: https://github.com/mavericken777/GlobalHalalDigitalTrust/tree/3d5cc29fabf7c3ed0da20cd938219fed83e74830 — 3d5cc29fabf7 — 2026-09-30T03:35:27Z — canonical implementation review]

The full binding is `3d5cc29fabf7c3ed0da20cd938219fed83e74830`. The 43 mirrored files are tracked in `config/canonical-mirror-manifest.json` using canonical Git-blob SHA-256 values. Historical `b1c0fc63be72` records are superseded for current runtime parity, not rewritten as if they reviewed this newer commit.

[OPEN GATE: SOURCE CONFLICT — trust-state-reference-layer — owner: AHTE/IQ300 source governance — blocking: frozen-vocabulary promotion]

The conceptual vocabulary and the post-freeze machine proposal remain distinct. New mutations bind to the machine proposal; legacy states remain readable. Reserved authority transitions remain blocked and `authority_decided` has no onward transition in the controlling proposal. No new transition is inferred.

The controlling freeze remains `master-standards-stack/verified-2026-09-17/`. The reviewed repository commit is post-freeze and is used as project doctrine / implementation guidance, not as substituted authority text.

## Reviewed artifacts

- `00_EXECUTIVE_COMMAND/IQ300_DOCTRINE.md` — IQ300 doctrine v3.1, freeze boundary, authority model and completion semantics.
- `00_EXECUTIVE_COMMAND/canonical-path-machine-map.json` — machine-to-canonical-path mapping.
- `00_EXECUTIVE_COMMAND/schema-registry.json` — structured trust/evidence schema index.
- `00_EXECUTIVE_COMMAND/trust-packet-schemas.json` — evidence, authority, trust-state, HITM and release object schemas.
- `00_EXECUTIVE_COMMAND/RECONCILIATION_2026-09-27.md` — repository corrections, external gates and evidence-status overlay.

## Source rules implemented in Amanah

- Source provenance first.
- Authority boundaries explicit.
- Evidence versioned.
- AI advisory.
- Decisions accountable.
- Physical and digital trust continuously linked.
- Malaysian Standards are technical instruments, not certification authorities.
- Certification decisions remain with competent authorities.
- Destination decisions remain with relevant GCC authority/importer processes.
- `NOT DETECTED != HALAL`.
- Trust score is descriptive and secondary to hard gates.
- Operational release is not certification.
- Source-locked normative text is never invented.

## Canonical path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

Amanah machine nodes refine this path but do not replace it. AI Assessment maps to Evidence / Audit Test; HITM operates before or at reserved decision gates; signed competent-authority decisions remain external E5 evidence; trust vectors and scores remain descriptive Trust State artifacts; release remains operational rather than certification.

## Freeze discipline

The GlobalHalalDigitalTrust doctrine identifies `master-standards-stack/verified-2026-09-17/` as the freeze boundary. Post-freeze corrections, schemas and engineering implementation are source-qualified rather than silently promoted into the frozen standards package.

Normative wording not held at the required source depth remains `[SOURCE-LOCKED]`. Amanah must not synthesize missing clauses or authority decisions to close those gates.

## Current implementation status — 2026-09-30

The AHTE database/control plane is no longer limited to migration `0008`. The live Amanah project and repository lineage are reconciled through:

- `0013_seed_17_standard_reference_catalog`
- `0014_enable_ahte_realtime`
- `0015_role_and_authority_integrity`
- `0016_authority_decision_api_compatibility`

The live Supabase database now has 98 public tables with RLS enabled on all 98. Forward migrations `release_gate_enforcement` and `reconciliation_followup` add database-enforced gates, append-only transitions, human operational release, domain holds, atomic recalls and explicit product/certificate bindings. The initial broad AHTE member-level mutation policy has been replaced with explicit read/write/delete policies on the original AHTE control-plane tables. Authority/source mutation is elevated; operational trust/release mutation is elevated; ordinary members/viewers do not receive generic mutation rights.

The assurance API reserves D5/D6 decisions from machine execution and records authority decisions as externally owned evidence. `issued_by_ahte=true` is rejected. Authority decisions in `signed` or deployed-API `final` lifecycle state require decision reference plus signature hash.

## Transaction boundary

No real user, organization, project or Shipment 001 transaction data existed in the live project during this review. Therefore transaction-native evidence, authority decisions, importer/buyer commitments, shipment events and destination releases remain external/transaction gates and are not fabricated.

[PILOT: Shipment 001 — China → GCC direct]

Shipment 001 becomes instantiated only when real transaction-native evidence exists.

This document is an implementation provenance record. It is not an authority instrument and does not create certification status.
