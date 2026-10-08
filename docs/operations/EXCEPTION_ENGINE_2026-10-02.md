# AMANAH Exception Engine

**Version:** 1.0.0 | **Control date:** 2026-10-02

| Exception | Default severity | Automated response | Human escalation | Closure evidence |
|---|---|---|---|---|
| Expired certificate | high | place affected verification/release path on hold | compliance/authority as required | valid replacement evidence + authorised disposition |
| Supplier invalid/expired | high | hold material/product dependency | QA | verified supplier evidence |
| Temperature breach | high | alert + hold affected custody scope | logistics/QA | excursion review + disposition |
| Seal tamper | critical | quarantine affected container/shipment scope | authority/operator | inspection + decision |
| Route deviation | medium/high | risk alert | logistics | route explanation/evidence |
| Failed lab result | critical | hold linked batch/case | lab + authorised reviewer | valid disposition/retest |
| Missing document | medium | information-required | compliance | evidence uploaded/accepted |
| Door opening anomaly | high | alert + contain affected scope | operator/QA | inspection/custody evidence |
| Ingredient substitution | high | open change case; hold affected product | QA/auditor | approved change/reassessment |
| Cyber/device failure | high | isolate/revoke device; buffer events | security/ops | incident closure + integrity check |

No exception auto-closes a authorised certification decision workflow authority decision. Every exception creates an auditable state transition and preserves evidence.
