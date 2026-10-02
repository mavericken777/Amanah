# AMANAH Claim Verification Register

**Version:** 1.0.0  
**Control date:** 2026-10-03  
**Item:** 64  
**Purpose:** prevent architecture, proposals, simulations and working documents from being presented as external facts.

## Claim classes

- **VERIFIED CURRENT FACT** — evidenced by current controlled repository or verified external source.
- **REPOSITORY-IMPLEMENTED CAPABILITY** — code/schema/control exists; production activation may still be gated.
- **PROJECT-DEFINED CAPABILITY** — controlling architecture/specification.
- **PLANNED EXTERNAL INTEGRATION** — complete interface target awaiting external authorization/credentials.
- **COMMERCIAL PROPOSAL** — non-binding until executed.
- **ASSUMPTION REQUIRING VALIDATION** — cannot be promoted without evidence.

## Verified / controlled claims

| Claim | Classification | Evidence/control | Publication rule |
|---|---|---|---|
| Authority topology is AHTE ⇄ Direct JAKIM API ⇄ JAKIM | PROJECT-DEFINED / CONTROLLING | architecture/source binding | publish |
| Default physical corridor is China → GCC direct | PROJECT-DEFINED / CONTROLLING | architecture/corridor controls | publish |
| Malaysia is governance/assurance/authority-connectivity unless separately scoped | PROJECT-DEFINED | architecture | publish |
| AI does not execute D5/D6 | PROJECT-DEFINED + IMPLEMENTED CONTROL | decision rights / policy/tests | publish |
| Evidence is append-only with supersession | PROJECT-DEFINED + IMPLEMENTED CONTROL | evidence model | publish |
| Hash proves integrity, not truth | CONTROLLING PRINCIPLE | evidence/crypto controls | publish |
| NOT_DETECTED ≠ HALAL | CONTROLLING PRINCIPLE | lab controls | publish |
| Shipment 001 is NOT-INSTANTIATED | VERIFIED CURRENT FACT | STATUS/PENDING/register | publish |
| Amanah protected application exists in source | REPOSITORY-IMPLEMENTED CAPABILITY | app/ | publish with deployment distinction |
| Public website exists in source | REPOSITORY-IMPLEMENTED CAPABILITY | ghscl-website/ | publish with deployment distinction |
| Manufacturer / authority command-centre views exist | REPOSITORY-IMPLEMENTED CAPABILITY | protected app | publish as implemented capability |
| Internal API contract/adapters exist | REPOSITORY-IMPLEMENTED CAPABILITY | docs/api + lib/integrations | publish as internal contract |
| Corporate profile / media / Mandarin / mission packs exist | VERIFIED REPOSITORY FACT | docs + website assets | publish |

## Claims that must remain gated

| Claim | Required classification now | Promotion evidence required |
|---|---|---|
| “JAKIM production API is live” | PLANNED EXTERNAL INTEGRATION | authorised JAKIM spec, credentials, UAT and production receipt |
| “Laboratory integrated in production” | PLANNED EXTERNAL INTEGRATION | exact lab identity/accreditation/method scope/API/UAT |
| “Sinotrans is live end-to-end” | PLANNED EXTERNAL INTEGRATION | contracting entity/sites/lanes/systems/credentials/UAT |
| “Ports/customs connected” | PLANNED EXTERNAL INTEGRATION | sovereign authorization/interface/UAT |
| “GCC market accepted Shipment 001” | ASSUMPTION REQUIRING VALIDATION | real importer/authority/receiving evidence |
| “Shipment 001 exists” | FALSE UNTIL PROMOTED | product/batch/shipment/custody/destination evidence |
| “CODA financing approved” | COMMERCIAL PROPOSAL / external decision | executed financier decision |
| “Takaful approved” | external decision | underwriting/contract evidence |
| “GHSCL price is X” | COMMERCIAL PROPOSAL | validated price/cost book / approved schedule |
| “SLA is binding” | PROPOSAL UNTIL EXECUTED | signed contract schedule |
| “Academy credential confers statutory authority” | NOT SUPPORTED | competent-authority recognition |
| “PHC/JAKIM has approved a named product” | NOT SUPPORTED absent case evidence | formal authority record |
| “Retailer will list/buy product” | NOT SUPPORTED | PO/listing/vendor approval |
| “No cybersecurity vulnerabilities” | NOT SUPPORTABLE absolute claim | do not publish absolute claim |
| “100% compliant” | NOT SUPPORTABLE aggregate claim | do not publish as blanket claim |

## Automated claim scan

Current public website search was checked for:
- NurAI authority hop;
- AI certification;
- blockchain certification;
- lab certification;
- China → Malaysia default physical corridor.

No such prohibited public-site claim was identified in the controlled public website paths during this QA batch.

Historical/archive files may contain superseded wording only where explicitly preserved as historical/non-controlling evidence.

## Promotion rule

No claim moves from proposal/assumption/integration target to verified current fact merely because:
- a document exists;
- a UI screen exists;
- a sandbox response exists;
- a meeting occurred;
- a hash exists;
- a partner name appears in architecture;
- a MOA template exists.

**Closure:** Item 64 complete to project control.
