# AMANAH Exception Engine

**Version:** 1.0.0 | **Control date:** 2026-10-02

| Exception | Default severity | Automated response | Human escalation | Closure evidence |
|---|---|---|---|---|
| Expired certificate | high | block affected verification/release path | compliance/authority as required | valid replacement + gate |
| Supplier invalid/expired | high | hold material/product dependency | QA | verified supplier evidence |
| Temperature breach | high | alert + hold affected custody scope | logistics/QA | excursion review + disposition |
| Seal tamper | critical | quarantine affected container/shipment scope | authority/operator | inspection + decision |
| Route deviation | medium/high | risk alert | logistics | route explanation/evidence |
| Failed lab result | critical | hold linked batch/case | lab + authorised reviewer | valid disposition/retest |
| Missing document | medium | information-required | compliance | evidence uploaded/accepted |
| Door opening anomaly | high | alert + scope freeze | operator/QA | inspection/custody evidence |
| Ingredient substitution | high | open change case; hold affected product | QA/auditor | approved change/reassessment |
| Cyber/device failure | high | isolate/revoke device; buffer events | security/ops | incident closure + integrity check |

No exception auto-closes a D5/D6 authority decision. Every exception creates an auditable state transition and preserves evidence.
