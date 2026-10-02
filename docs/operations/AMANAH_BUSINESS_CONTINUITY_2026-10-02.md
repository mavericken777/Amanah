# AMANAH Business Continuity and Disaster Recovery
**Status:** PROJECT-DEFINED / IMPLEMENTATION CONTROL

## Service tiers
| Tier | Scope | Required behavior |
|---|---|---|
| T0 | authority/evidence integrity | fail closed; no synthetic authority decision |
| T1 | custody/exception/command centre | durable queue; replay idempotently |
| T2 | onboarding/document workflows | degrade to read-only/queued submission |
| T3 | public content | cached/static continuity |

Recovery uses immutable backups, restore drills, connector replay, idempotency keys, evidence sequence checks and post-recovery reconciliation. An outage cannot convert HOLD to RELEASED or create D5/D6 decisions.

[OPEN GATE: production RTO/RPO approval, cloud region/account selection, backup tenancy and external connector recovery SLAs.]