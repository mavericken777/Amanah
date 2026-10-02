# Digital Chain of Custody

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Purpose

Maintain attributable custody from material/batch through warehouse, container, transit, port, destination receipt and downstream distribution without confusing physical custody with certification.

## Core custody event

`ObjectID + EventID + EvidenceID + ActorID + Timestamp + IntegrityProof + LocationRef + FromCustodian + ToCustodian + Condition + SealRef + SourceSystemRef`.

## State path

`CREATED → IN_CUSTODY → HANDED_OVER → IN_TRANSIT → RECEIVED`

Exception states:
`HOLD / TAMPER_SUSPECTED / CONDITION_EXCEPTION / DISPUTED / QUARANTINED / RECALLED`.

## Required event types

- material/batch handoff;
- warehouse receipt/location/hold/release;
- pack/pallet aggregation;
- container stuffing;
- seal application/change/break;
- gate-out/pickup;
- route/geofence event;
- port handoff;
- vessel/air/road transfer reference;
- destination port receipt;
- customs/inspection reference;
- importer/warehouse receipt;
- distribution/retail handoff.

## Integrity rules

1. Events are append-only; corrections use superseding events.
2. Every handoff identifies outgoing and incoming accountable actors where available.
3. Custody identity must bind to the physical object hierarchy.
4. Hash/signature proves integrity of the recorded payload, not truth of the underlying event.
5. Missing or contradictory custody may trigger D4 HOLD; only authorized actors can resolve according to policy.
6. Sovereign release remains a port/customs authority action.

## Offline operation

Device events may be queued locally with sequence number, local timestamp, DeviceID, hash/signature and previous-event reference. Server reconciliation checks duplication, ordering, signature, actor scope and object binding before commit.

[OPEN GATE: production Sinotrans, carrier, port/customs and GCC receiving event contracts/credentials.]
