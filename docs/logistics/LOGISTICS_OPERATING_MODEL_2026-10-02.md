# China → GCC Direct Logistics Operating Model

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Physical flow

`Manufacturer → Sinotrans warehouse/CFS → pickup/loading → container/seal → origin port/customs → international transit → GCC port/customs → importer receiving → destination warehouse → distribution/retail`.

Malaysia remains the governance/assurance/authority-connectivity plane unless a separately scoped physical movement is created.

## Operating roles

| Actor | Operational responsibility | Decision boundary |
|---|---|---|
| Manufacturer | product/batch readiness, pack identity, dispatch evidence | no sovereign release |
| GHSCL/AHTE | orchestration, evidence/trust monitoring, exceptions, Command Center | no Halal certification/customs release |
| Sinotrans | warehouse, transport, container/seal, route and custody execution | no certification |
| Origin port/customs | inspection/release under sovereign mandate | independent |
| Carrier | carriage and transport events | no certification |
| GCC port/customs | destination inspection/customs release | independent |
| Importer/receiver | commercial/receiving acceptance and downstream custody | no substitution for authority decision |

## Pre-dispatch checks

- product/SKU/batch identity;
- applicable authority/certification evidence where required;
- packaging/label destination readiness;
- shipment and consignee data;
- container/vehicle and seal identity;
- custody handoff plan;
- required condition monitoring;
- port/customs documents;
- exception contacts.

## Exception classes

identity mismatch; seal/tamper; temperature/condition; route delay/deviation; custody gap; document mismatch; authority hold; receiving rejection; evidence expiry/withdrawal.

## Command Center

Every material exception receives:
`AlertID → affected ObjectIDs → evidence → severity → owner → due time → action → re-verification/outcome`.
