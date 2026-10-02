# Port Tablet Application Specification

**Version:** 1.0.0 | **Control date:** 2026-10-02 | **Status:** IMPLEMENTATION SPEC

## Primary screens
1. Secure sign-in / device trust.
2. Work queue — arrivals, inspections, holds.
3. Scan — QR/RFID/container/seal.
4. Shipment summary — identity, route, consignee, scoped trust packet.
5. Evidence — only authorized minimum-necessary records.
6. Inspection checklist.
7. Sampling/custody capture.
8. Exception/hold creation.
9. Authority-decision reference capture.
10. Custody handoff and sync status.

## Offline mode
Encrypted queue with DeviceID, sequence, local timestamp, object ID and local integrity proof. Reconciliation must detect duplicates, ordering conflicts and authorization changes. Offline state cannot create a final sovereign release.

## UX safeguards
Display separate badges for **Authority status / AHTE trust / Customs status / Operational state**. Never collapse them into a universal score.

## Security
MFA; managed device; short-lived tokens; mTLS where supported; least-privilege role; remote revoke; no secrets in app bundle; local data minimization; tamper-aware audit log.
