# Partner Integration Kit

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Package
1. architecture/authority-boundary brief;
2. connector-state model;
3. data dictionary and canonical identifiers;
4. OpenAPI/AsyncAPI/schema bundle;
5. authentication/security requirements;
6. event/evidence envelope;
7. sample fixtures with synthetic data;
8. UAT checklist;
9. error/retry/idempotency profile;
10. onboarding questionnaire;
11. data-processing/retention worksheet;
12. production cutover and rollback checklist.

## Onboarding sequence
Legal/technical owner → system inventory → data classification → source contract → mapping → sandbox → security review → UAT → authorization → production credentials → monitored cutover → post-cutover reconciliation.

## Partner-specific adapters
Laboratory; Sinotrans WMS/TMS/Y2T/MIS/EDI/IoT; port/customs; GCC receiving; Direct JAKIM API; finance/Takaful providers.

## Non-negotiable boundaries
Partner data/evidence does not automatically create another actor's decision. Hash proves integrity, not truth. External decisions remain separately sourced and referenced.
