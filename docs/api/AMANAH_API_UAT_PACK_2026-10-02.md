# AMANAH API UAT and Integration Certification Pack

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Integration verification scenarios

| Test | Expected |
|---|---|
| Unauthenticated access | 401/403; no mutation |
| Cross-tenant reference | rejected |
| Idempotency replay | no duplicate side effect |
| Evidence missing provenance | rejected |
| AI assessment | D2 advisory only |
| authorised certification decision workflow machine decision | rejected |
| Lab result | linked to sample/batch/evidence; no certification inference |
| Shipment event | custody/provenance only |
| Port hold | hold + exception; no automatic release |
| Offline replay | duplicate/replay detection |
| Public verification | disclosure limited by policy |
| Unconfigured connector | explicit state; no fabricated receipt |

Production acceptance requires environment classification, identity/tenant controls, API version, evidence digest, test actor, timestamp, fixture ID, expected/actual result and reviewer sign-off.
