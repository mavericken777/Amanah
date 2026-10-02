# Digital Seal and Tamper Model

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Objects

`SealID → ContainerID / VehicleID / PalletID → ShipmentID → Batch/Lot hierarchy`.

Seal record fields: seal type, issuer/operator, serial/identifier, applied_by, applied_at, object bound, evidence reference, integrity proof, status, break/removal event, reason, actor, timestamp and replacement seal where applicable.

## States

`ISSUED → APPLIED → INTACT → BROKEN_AUTHORIZED / TAMPER_SUSPECTED / LOST → REPLACED / CLOSED`.

## Tamper triggers

- seal ID mismatch;
- unexpected seal removal/break;
- unplanned door/open event where monitored;
- route/geofence deviation correlated with seal event;
- repeated/duplicate physical identity;
- scan chronology conflict;
- unauthorized replacement;
- missing handoff evidence.

## Response

`Detect → D4 HOLD → preserve original event/media → identify blast radius → assign human owner → inspect/reconcile → CAPA where required → apply replacement seal if authorized → re-verification → release gate`.

Digital seal evidence does not itself prove Halal status and does not override customs/authority decisions.
