# AMANAH Business Continuity Architecture — Item 38

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Continuity rule
Loss of connectivity or a partner system must degrade connectivity, not fabricate evidence, bypass authority gates or silently release a HOLD.

## Planning targets
These are engineering targets, not contractual SLAs until adopted by the responsible operator/counterparty.

| Failure | Target behavior | Planning RTO | Planning RPO |
|---|---|---:|---:|
| Field network loss | encrypted local queue/store-and-forward; preserve sequence | immediate degraded mode | 0 for locally acknowledged durable events |
| API/connector outage | bounded retry + idempotency + circuit breaker + queue | <30 min recovery/failover window | <1 min committed queue |
| Gateway failure | redundant gateway where risk requires; buffered sensors | site-defined | last durable sensor/gateway buffer |
| Application deployment fault | rollback to last validated release | <30 min target | last committed database state |
| Database/service outage | provider recovery + backup/restore procedure | contracted/provider target | last verified backup/replica point |
| Authority API outage | queue case/evidence; no automatic authority decision/release | service-dependent | no loss of committed case/evidence |
| Logistics/lab/port outage | preserve local/source record; reconcile later | counterparty-dependent | source-system record controls |

## Recovery sequence
Declare incident → freeze risky writes if required → preserve evidence/audit logs → establish service/source health → recover identity/data plane → validate integrity and tenant isolation → reconcile queued events/idempotency → re-run trust/exception checks → require human review for reserved decisions → restore service → record recovery evidence → post-incident CAPA.

## Exercises
Quarterly tabletop; restore test at least per contracted provider capability; connector failover/replay test before production activation; annual multi-party corridor exercise after real counterparties are onboarded. Exercise frequency becomes binding only when adopted in operating SLA/policy.

## Prohibited continuity shortcuts
No fake partner response; no fabricated authority/lab/customs result; no AI D5/D6 decision; no silent evidence overwrite; no release solely because a dependency is unavailable.

[OPEN GATE: production hosting SLA/backup policy/region and recovery evidence]
[OPEN GATE: counterparty continuity contacts and agreed RTO/RPO]
