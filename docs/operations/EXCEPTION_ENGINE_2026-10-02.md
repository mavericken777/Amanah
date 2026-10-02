# AMANAH Exception Engine — Item 39

**Version:** 1.1.0 | **Control date:** 2026-10-02 | **Implementation:** trust fractures + Command Center alerts + CAPA/re-verification controls

## Canonical exception states
HOLD · QUARANTINED · DISPUTED · CORRECTIVE-ACTION · RE-VERIFICATION · EXPIRED · SUSPENDED · REVOKED · RECALLED.

These exception states do not collapse authority, AHTE trust, operational, customs or finance state into one field.

## Detection inputs
Evidence expiry/missing/conflict; supplier/material substitution; HCP/SCCP deviation; lab/sample custody or method exception; audit finding; device/telemetry anomaly; seal/tamper event; route/geofence deviation; warehouse/custody mismatch; authority status change; port/customs hold; GCC receiving exception; security incident; predictive risk crossing a configured threshold.

## Governed transition loop
DETECT → classify severity/domain → bind affected ObjectID/EventID/EvidenceID/ActorID/Timestamp/IntegrityProof → determine blast radius → alert/assign → D4 HOLD only where configured → investigate → corrective action → collect new evidence → re-verification → authorized human decision → close/escalate/recall.

## Enforcement already in repository
- `ahte_fracture_events` persists fracture type, severity, D4 auto-hold and resolution.
- `ahte_blast_radius` persists affected entities/impact.
- `ahte_command_center_alerts` supports open/assigned/held/in_review/capa/reverification/closed/escalated/recalled.
- `20260930035500_release_gate_enforcement.sql` prevents fracture identity mutation and requires authenticated human resolution with re-verification linkage.
- Command Center queries unresolved fractures and policy holds separately.

## Response matrix
| Exception | Default response | Accountable escalation | Closure evidence |
|---|---|---|---|
| expired/invalid certificate reference | HOLD affected verification/release path | compliance/authority as applicable | current authority evidence + re-evaluation |
| supplier/material invalid or substitution | HOLD affected dependency | QA/auditor | approved change + provenance |
| temperature/condition breach | alert + scoped HOLD | logistics/QA | excursion review + disposition |
| seal/tamper | QUARANTINE/HOLD scope | logistics + sovereign authority where applicable | inspection + authorized decision |
| route/geofence deviation | alert/risk assessment | logistics | route/custody evidence |
| laboratory exception | HOLD linked batch/case | laboratory + authorized reviewer | valid result/disposition; NOT_DETECTED ≠ HALAL |
| missing/contradictory evidence | information-required/HOLD by policy | evidence owner | accepted evidence + re-verification |
| cyber/device compromise | isolate/revoke + HOLD affected evidence scope | security/operations | incident closure + integrity/replay check |
| recall trigger | RECALLED + blast-radius propagation | accountable authority/operator | recall closure evidence |

## Non-negotiable gates
AI may detect, assess, recommend and execute configured D4 holds. AI may not execute D5/D6, certify Halal, release a human-reserved hold, approve finance/Takaful or create sovereign/legal state.

Closure requires evidence of resolution + re-verification where required + accountable actor. A missing external dependency keeps the exception open; it does not become PASS.
