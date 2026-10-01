# AMANAH Business Continuity and Data Governance

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Continuity targets
| Scenario | RTO target | RPO target | Control |
|---|---:|---:|---|
| Field network loss | immediate | 0 for locally acknowledged events | encrypted store-and-forward |
| API outage | <30 min failover/retry window | <1 min for committed queue | retry + circuit breaker |
| Gateway failure | site-defined failover | sensor buffer | redundant gateway where required |
| Cloud regional outage | contracted service target | last replicated event set | multi-zone backup/restore |
| Authority outage | no automatic release | preserve queue | manual/authority contingency |

Targets are engineering planning values and become binding only in an agreed SLA.

## Data governance
Data domains: evidence, business, confidential, personal, authority, operational telemetry. Each domain requires an owner, purpose, jurisdiction, retention rule, sharing scope and deletion rule. Source records remain with the enterprise/sovereign system of record; AHTE receives minimum-necessary assertions/references under approved policy. Audit evidence is not silently deleted or overwritten.
