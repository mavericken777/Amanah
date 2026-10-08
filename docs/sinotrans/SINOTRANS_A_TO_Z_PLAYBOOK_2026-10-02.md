# Sinotrans A-to-Z Operating Playbook — China → GCC Direct

**Version:** 1.0.0 | **Control date:** 2026-10-02 | **Status:** PARTNER-VALIDATION READY

This is the controlling Amanah implementation playbook for the proposed Sinotrans warehouse + end-to-end logistics role. It does not assert executed production access or shipment activity.

| Section | Operating control |
|---|---|
| A — Accountabilities | Named legal/operating entity, site, lane, owner, escalation matrix |
| B — Booking | Booking reference, shipper/consignee, route, mode, cutoffs |
| C — Cargo identity | SKU/batch/lot/package/pallet/container hierarchy |
| D — Documentation | Commercial/export/import references, evidence links, version control |
| E — Evidence | Object/Event/Evidence/Actor/Timestamp/IntegrityProof binding |
| F — Facility | Named warehouse/CFS zones, segregation, access, cleaning ownership |
| G — Gate-in/out | identity, seal, condition, time, vehicle/driver, custody handoff |
| H — Handling | segregation, damage, rework, hold and authorized movement rules |
| I — Inventory | location, quantity, batch genealogy, HOLD/release state |
| J — Journey | planned route, milestones, geofences, ETA and deviation logic |
| K — Keys/security | credentials, device identity, mTLS/API secrets, least privilege |
| L — Loading | load plan, container identity, seal application, evidence capture |
| M — Monitoring | telemetry, temperature/condition, route, device health, exceptions |
| N — Nonconformance | HOLD, quarantine, NCR/CAR/CAPA, owner and due date |
| O — Origin port | handoff, inspection/customs references, sovereign decision separation |
| P — Port/transit | carrier events, transfer references, delay/exception management |
| Q — Quality | evidence completeness, calibration, custody and service-quality checks |
| R — Receiving GCC | destination port/customs, importer receipt, discrepancy handling |
| S — SLA | pickup, scan/event latency, exception acknowledgement, evidence availability |
| T — Traceability | backward/forward genealogy and recall blast-radius support |
| U — UAT/release | sandbox → UAT → authorized production connector; no redesign |

## Interfaces
Existing WMS/TMS/Y2T/MIS/EDI/IoT → secure Sinotrans adapter/API → AHTE event fabric → Command Center.

## certification workflow
Sinotrans executes logistics/custody. It does not issue Halal certification, customs release, financing approval or destination authority acceptance.
