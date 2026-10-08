# Certification / Credential Lifecycle

**Version:** 1.0.0 | **Control date:** 2026-10-02

## State separation

Amanah keeps four distinct states: competent-authority certification, AHTE trust state, operational state, and customs/destination state. No AHTE or blockchain state is a Halal certificate.

## Lifecycle

`Draft → Submitted → Review → Information Required → Evidence/Laboratory → Audit/Assessment → Authority Review → Approved/Active → Amended → Suspended → Expired → Revoked/Withdrawn`.

A credential record must identify issuer/authority, subject/scope, product/facility references, issue/validity dates, status, authority reference, signature/integrity reference where provided, and supersession/amendment lineage.

## Change triggers

Reassessment is triggered by material changes to product formulation, supplier/origin, facility/line, process aid, critical process, certificate scope, authority status, legal entity, destination requirement, or evidence validity.

## Hard rules

- AHTE never mints a Halal certification decision.
- A laboratory result is evidence only.
- Operational release cannot substitute for a formal authority decision.
- Revoked/suspended/expired credentials cannot be promoted by a trust score.
- Any current-state projection must preserve the original issued record and amendment/revocation history.
