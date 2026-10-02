# AMANAH Data Governance Architecture — Item 37

**Version:** 1.0.0 | **Control date:** 2026-10-02 | **Principle:** Data stays where it belongs; trust travels.

## Data register minimum
Every governed dataset/object must resolve: owner; controller/processor role; purpose; classification; source/system of record; jurisdiction; permitted recipients; retention; archival/deletion rule; confidentiality; integrity control; transfer mechanism; incident owner; version/supersession history.

## Classification
| Class | Examples | Default handling |
|---|---|---|
| Public | approved public corporate/verification disclosure | publish only approved scope |
| Internal | operating metadata, non-sensitive configuration | tenant controlled |
| Confidential commercial | formulas, supplier terms, BOM detail | minimum necessary; purpose bound |
| Personal | users, drivers, auditors, contacts | minimize; lawful/authorized purpose |
| Evidence | audit, lab, custody, CAPA, signatures | append-only history; supersede, do not silently overwrite |
| Authority | authority case/status/decision records | authority scope + minimum necessary |
| Security | credentials, keys, incident details | restricted; secrets never public |
| Telemetry | device/location/condition events | scoped by asset, purpose and jurisdiction |

## Cross-border decision rule
Need data? → establish purpose → classify → determine source/system of record → prefer signed assertion/reference/hash over source record → verify legal/contractual transfer basis → apply approved mechanism → transmit minimum necessary → log disclosure → verify recipient/use/expiry.

China-origin operational records remain in their governed source environment unless an authorized workflow permits transfer. GCC and Malaysian/authority requirements are applied per actual jurisdiction and transaction.

## Evidence lifecycle
Create/ingest → identify source/actor/time → integrity proof → classify → link to canonical path → review → retain → supersede by new evidence when corrected → expire/restrict where applicable → archive/delete only under approved policy.

**Hash proves integrity, not truth.** `NOT_DETECTED ≠ HALAL`.

## Access and separation
Organization-scoped RLS is the default platform enforcement. Authority, AHTE trust, operational, customs and finance states remain separate. A party receives only the fields required for its authorized role/purpose.

## Retention
No universal retention duration is invented. Retention values are policy/jurisdiction/source dependent and must be registered before production activation.
[SOURCE-LOCKED: binding statutory/authority retention periods by jurisdiction and record class]
