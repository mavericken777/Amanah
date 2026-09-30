# Reconciliation live verification — 2026-09-30

[PROPOSAL: closes operational enforcement, schema/API and verification gaps — path point: Control → Evidence → Audit Test → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release]

BOUNDARY CHECK: derived from canonical project code and observed technical service state; freeze: CROSSING → [PROPOSAL]. No frozen standards package changed.

[PROJECT-REPO: https://raw.githubusercontent.com/mavericken777/GlobalHalalDigitalTrust/3d5cc29fabf7c3ed0da20cd938219fed83e74830/00_EXECUTIVE_COMMAND/IQ300_DOCTRINE.md — 3d5cc29fabf7 — 2026-09-30T06:07:00Z — 00_EXECUTIVE_COMMAND/IQ300_DOCTRINE.md]

Canonical main was checked again and remains `3d5cc29fabf7c3ed0da20cd938219fed83e74830`. The corrected source binding and 43 hash-checked mirrors remain in force. This is project doctrine, not authority text.

## Completed release

- [PR #13](https://github.com/mavericken777/Amanah/pull/13) merged as `f4aecb03d910a88cda904d3e9beb242b23fc931e`.
- Exact PR head `376354009882a14bfd391d4f9d1cdb554363a6ff` passed all seven jobs in [CI run 36675005298](https://github.com/mavericken777/Amanah/actions/runs/36675005298): Node tests, TypeScript, three Edge Function checks, Python reference runtime/platform, OPA policies and production build.
- Forward migration `release_gate_enforcement` applied at live migration version `20260930055245`; historical entries were not rewritten.
- Assurance version 7 is ACTIVE with JWT verification. Readback matched all five runtime files exactly: index, validation, packet schemas, trust machine and Deno import configuration. The deployment bundler does not return its input lockfile in readback.
- Live unauthenticated assurance health request returned HTTP 401.

## Follow-up verification

Forward migration `reconciliation_followup` applied at `20260930060741` after successful disposable PostgreSQL replay and enforcement tests. It adds explicit nullable certificate.product_id binding, synchronized domain holds and an invoker RPC for atomic recall/scope writes. It separates privileged INSERT/UPDATE/DELETE policies from member SELECT policies.

Malformed recall scopes roll back their parent and ledger events in the local PostgreSQL test. Authenticated successful recall scope insertion is also exercised. No live synthetic user, tenant, authority, evidence or shipment fixtures were created. Generated TypeScript types were obtained from the resulting live schema.

The follow-up assurance code uses product_id rather than identity_id for product certificate lookup, uses atomic recall creation, handles finding-query errors and relies on database audit transactions rather than duplicate post-write ledger RPCs.

[PR #14](https://github.com/mavericken777/Amanah/pull/14) merged as `3700806f5a196ff6b6a92a85641bf69aa4148f22`. Exact head `f8d4dd2443bf25c2ad838bd6e8154356aa63ca09` passed all seven jobs in [CI run 36677410118](https://github.com/mavericken777/Amanah/actions/runs/36677410118). Assurance version 8 is ACTIVE with JWT verification and exact five-file source readback. Deployment explicitly supplied deno.json as its import map after the service initially reused the old version's absolute map path; that failed attempt did not replace the active v7 function.

All three canonical workflows also passed at the bound commit: [gateway/OPA](https://github.com/mavericken777/GlobalHalalDigitalTrust/actions/runs/36633518092), [repository integrity](https://github.com/mavericken777/GlobalHalalDigitalTrust/actions/runs/36633518093) and [reference runtime](https://github.com/mavericken777/GlobalHalalDigitalTrust/actions/runs/36633518057). Reference circuit/escrow assets remain specifications or experiments, with no production certification claim.

## Observed technical state

Project `lqvyyylrydcpjochknag`, checked via the connected Supabase service on 2026-09-30:

| Check | Result |
|---|---|
| Public tables / RLS | 98 / 98 |
| Real organizations / users | 0 / 0 |
| Empty subject release evaluation | eligible=false; no_trust_state; not_certification=true |
| State/release/gate-review/domain guards | Installed and checked in live trigger metadata |
| Anonymous privileged-wrapper execution | Denied |
| Private enforcement-helper execution by authenticated users | Denied |
| Unauthenticated release/rate wrapper body | Insufficient-privilege denial verified |
| Security advisor | Four intentional authenticated SECURITY DEFINER wrapper warnings |
| Performance advisor | 310 unused-index informational notices; duplicate-policy warnings cleared |

The four public wrappers intentionally expose guarded calls to private functions. They require auth.uid plus organization membership, elevated role for disclosure, or actor binding for ledger events. They use an empty search_path, fully qualified references and explicit grants. [Supabase advisor explanation](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable). These warnings are retained and documented; the report does not claim a zero-warning security result.

Unused indexes in this empty environment are not evidence of redundant indexes. No index is removed merely for having no production queries yet. [Advisor explanation](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index).

## Boundaries and remaining work

Server-rendered workspace pages now guard 63 reads across 41 pages, including composite assurance queries. Database failures reach the error boundary rather than being rendered as zero counts, empty registries or missing records. Workspace lookup errors are explicit. Project/task API lookup failures return 500 rather than false empty/404/403 responses. The query-guard tests distinguish valid empty results from unavailable data; tuple types and parallel querying are preserved. UI verification is limited to build/type checks until genuine operator UAT.

The tracked-file/hash inventory covers all baseline paths. A complete semantic disposition of every documentary file remains pending. Idempotent HTTP response finalization remains separate from business writes; unfinished reservations deny retries rather than repeating an uncertain write. Production UAT requires real authorized operators and genuine transaction inputs.

[OPEN GATE: SOURCE CONFLICT — trust-state-reference-layer — owner: AHTE/IQ300 source governance — blocking: frozen-vocabulary promotion]

The canonical machine proposal still has no onward transition from authority_decided. No transition is invented. D5/D6 remain reserved. No field, gate review, stored hash, QR, AI or platform release creates certification.

[SOURCE-LOCKED: licensed normative wording — required: controlling licensed standards/authority artifacts]
[OPEN GATE: competent-authority certification — owner: JAKIM/MAIN/JAIN — blocking: Authority Gate]
[OPEN GATE: destination acceptance — owner: applicable GCC authority/importer — blocking: Operational Release]
[PILOT: Shipment 001 — China → GCC; no real transaction evidence instantiated]

`NOT DETECTED ≠ HALAL`. Operational release remains separate from certification.
