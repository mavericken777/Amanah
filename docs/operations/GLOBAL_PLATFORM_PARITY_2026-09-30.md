# GlobalHalalDigitalTrust → Amanah parity audit — 2026-09-30

[PROPOSAL: closes repository-controlled platform drift — path point: Control → Evidence → Authority Gate → Trust State → Operational Release]

BOUNDARY CHECK: derived from `mavericken777/GlobalHalalDigitalTrust@3d5cc29fabf7c3ed0da20cd938219fed83e74830`; freeze: CROSSING → [PROPOSAL].

## Coverage

Both repositories were recursively inventoried from non-truncated Git trees. Every tracked path was included in the inventory/hash pass. Existing Global repository audits were cross-checked, and every platform-affecting machine spec, runtime, gateway, policy, schema mapping, test, migration/API boundary and operations register was semantically reviewed. Binary/document deliverables that do not execute platform logic are covered by repository inventory/hash/format governance rather than falsely described as executable code review.

## Canonical source correction performed first

The Global repo itself contained stale D0-D6 semantics in its older FastAPI `platform/`. That implementation was corrected and merged through PR #16 before Amanah was rebound:

- canonical merge: `3d5cc29fabf7c3ed0da20cd938219fed83e74830`
- D0 = operational ingest
- D1 = encoded control execution
- D2 = machine assessment; assessment object only
- D3 = finding/CAPA classification; human accountable
- D4 = trust-fracture HOLD; no auto-release
- D5 = competent-authority gate reserved
- D6 = sovereign/legal reserved; no executable platform action

Global CI now runs both the newer runtime/OPA stack and the FastAPI reference platform tests.

## Amanah reconciliation

| Surface | Canonical source | Amanah status |
|---|---|---|
| State-machine machine spec | `12-autonomous-state-machine.json` | exact Git-blob mirror in `config/ahte-state-machine.json` |
| Hard-gate rules | `09-hard-gate-rules.json` | exact Git-blob mirror; restored `fail_if`, state-space and score rule |
| HITM decision classes | `hitm-decision-class-registry.json` | exact Git-blob mirror; restored examples, owners, path mappings and assessment metadata |
| Fracture taxonomy | `11-trust-fracture-taxonomy.json` | exact Git-blob mirror |
| `runtime/engine` | Global runtime | source-identical mirror; missing verifier restored |
| `runtime/gateway` | Global runtime | source-identical mirror |
| `runtime/policies` | Global runtime | source-identical mirror; missing policy tests restored |
| Global runtime tests | Global `tests/` runtime/e2e subset | source-identical mirror; missing helper/package files restored |
| FastAPI `platform/` | Global reference platform | complete source-identical mirror restored |
| Production data plane | Global semantics | stronger Supabase implementation; semantic parity required, byte parity not applicable |

## Production semantic parity

Amanah may be stronger than the reference demo, but cannot violate these invariants:

1. authority boundary remains external to AI/platform;
2. D5/D6 cannot be executed by AI;
3. assessment objects are not E5 authority decisions;
4. hard-gate failure is non-compensable;
5. `NOT DETECTED != HALAL`;
6. trust fractures may auto-HOLD but never auto-release;
7. release requires human determination/re-verification where reserved;
8. operational release is not certification;
9. Shipment 001 remains pilot/transaction-evidence gated;
10. missing normative text remains SOURCE-LOCKED.

## Source conflict retained

[OPEN GATE: SOURCE CONFLICT — trust-state-reference-layer — owner: AHTE/IQ300 source governance — blocking: promotion of one state vocabulary to frozen doctrine]

The older A–Z conceptual mapping and the post-freeze machine-state proposal use different trust-state vocabularies. Both are retained with metadata. This reconciliation does not silently promote either into the 2026-09-17 freeze.

## External gates

[SOURCE-LOCKED: licensed normative requirement text — required: controlling licensed/authoritative source artifacts]

[OPEN GATE: competent-authority decisions — owner: JAKIM/MAIN/JAIN or applicable competent authority — blocking: Authority Gate]

[OPEN GATE: GCC destination acceptance/import release — owner: applicable GCC authority/importer — blocking: Authority Gate / Operational Release]

[PILOT: Shipment 001 — China → GCC direct]

[OPEN GATE: real Shipment 001 evidence — owner: transaction participants — blocking: Evidence → Audit Test → Authority Gate → Operational Release]

No repository edit may close these with synthetic evidence.
