# AMANAH / GHSCL KPI & SLA Framework

**Version:** 1.0.0  
**Control date:** 2026-10-03  
**Status:** PROJECT-DEFINED CONTROL FRAMEWORK / EXTERNAL SLA VALUES REQUIRE AGREEMENT

## 1. Rule

KPIs measure performance. SLAs create commitments only when executed in a contract. No proposed target in this document is a partner or authority commitment unless adopted in a signed SLA.

## 2. Platform engineering KPIs

| KPI | Formula / evidence | Owner |
|---|---|---|
| API availability | successful service minutes / scoped minutes | Platform Ops |
| API error rate | failed valid requests / valid requests | Platform Ops |
| P95 response latency | request telemetry percentile | Platform Ops |
| Event processing latency | accepted timestamp → committed event timestamp | Event Fabric |
| Evidence ingestion success | committed evidence / valid submitted evidence | Evidence Ops |
| Backup success | completed verified backups / scheduled backups | Platform Ops |
| Restore-test success | successful restore exercises / planned exercises | BCP owner |
| Security incident MTTA | incident created → acknowledged | Security |
| Security incident MTTR | incident created → containment/recovery | Security |

## 3. Evidence / assurance KPIs

| KPI | Definition |
|---|---|
| Evidence completeness | required evidence objects satisfied / applicable required evidence |
| Evidence expiry exposure | open objects linked to expired evidence |
| Provenance completeness | evidence with required source/actor/time/integrity binding / scoped evidence |
| Supersession integrity | corrected evidence with explicit supersession linkage |
| Open findings | unresolved audit findings by severity |
| CAPA ageing | days from corrective-action creation to closure |
| Re-verification cycle time | CAPA ready → verified outcome |
| Trust-fracture ageing | HOLD creation → accountable disposition |

## 4. Manufacturer KPIs

- onboarding milestone completion;
- missing-evidence count;
- supplier/material provenance completeness;
- training competence completion;
- audit-readiness gaps;
- change-control cases;
- production exception frequency;
- batch evidence completeness.

## 5. Laboratory KPIs

- sample accession completeness;
- custody break count;
- method/scope mismatch count;
- QC exception count;
- result turnaround time;
- amended-report rate;
- signed-result evidence completeness.

Laboratory KPIs do not measure or assert Halal certification authority.

## 6. Logistics / Sinotrans KPIs

- warehouse inbound/outbound event completeness;
- seal mismatch/tamper exceptions;
- telemetry coverage;
- temperature/condition excursion rate where applicable;
- custody handoff completeness;
- route/geofence exception count;
- proof-of-delivery completeness;
- logistics exception resolution time.

## 7. Port/customs and destination KPIs

Metrics may cover pre-arrival packet completeness, interface delivery, query response, evidence availability and handoff timing. Sovereign inspection/release time is not a GHSCL SLA unless the relevant authority formally accepts such a commitment.

## 8. Command Center KPIs

- alert acknowledgement time;
- priority-event triage time;
- owner assignment time;
- unresolved critical exceptions;
- prediction-to-action conversion;
- intervention effectiveness;
- recall blast-radius determination time;
- CAPA/re-verification tracking completeness.

## 9. Proposed internal severity model

| Severity | Meaning | Internal response objective |
|---|---|---|
| SEV-1 | authority/security/trust fracture with material operational exposure | immediate 24/7 escalation |
| SEV-2 | significant service/evidence degradation with workaround | priority escalation |
| SEV-3 | limited degradation / non-critical defect | business-priority queue |
| SEV-4 | request / minor issue | standard queue |

Exact contractual response times require an executed SLA schedule.

## 10. SLA schedule template

Each SLA row must contain:
- service;
- scope/location;
- service hours;
- target;
- measurement source;
- exclusions;
- maintenance window;
- dependency assumptions;
- breach calculation;
- service credit/remedy if any;
- reporting cadence;
- dispute mechanism;
- effective date.

## 11. Reporting cadence

- real-time: critical alerts / service health;
- daily: operational exceptions;
- weekly: open findings/CAPA/connector health;
- monthly: KPI/SLA scorecard and trend;
- quarterly: governance, BCP, security, commercial and improvement review.

## 12. Anti-gaming controls

- denominator and exclusion rules fixed before reporting period;
- raw measurement retained;
- missing data flagged, not silently treated as success;
- authority decision time kept separate from platform processing time;
- partner downtime distinguished from AHTE downtime;
- simulation data cannot be merged into production KPI without explicit labeling.
