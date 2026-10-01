# AMANAH / Global Halal Digital Trust — Refreshed Truth Baseline

**Control date:** 2026-10-02 | **Freeze:** master-standards-stack/verified-2026-09-17/

## Live baseline

| Domain | Current verified state |
|---|---|
| GlobalHalalDigitalTrust | main HEAD 14456e99937d |
| Amanah | main HEAD 69697fd51d6 |
| Supabase | ACTIVE_HEALTHY; Postgres 17.11; ap-northeast-1 |
| Edge functions | assurance ACTIVE v9; public-verify ACTIVE v5; ghscl-site ACTIVE v3 |
| Live AHTE records | zero production users/shipments/authority decisions observed in current snapshot |
| Schema normalization | migration canonical_domain_normalization_2026_10_02 applied successfully |

## Classification

**VERIFIED CURRENT FACT:** repository/database/deployment observations above.

**REPOSITORY-IMPLEMENTED CAPABILITY:** AHTE control plane, evidence/trust objects, audit/lab/logistics/port models, command-centre objects, public verification and connector contracts.

**PROJECT-DEFINED CAPABILITY:** complete AMANAH lifecycle, Platinum monitoring, predictive/preemptive assurance and integrated stakeholder operating model.

**PLANNED EXTERNAL INTEGRATION:** JAKIM production API, China lab production interface, Sinotrans production systems, port/customs interfaces, GCC acceptance, finance/Takaful connectors.

**COMMERCIAL PROPOSAL:** CODA hardware financing, service bundles, partner economics and bounded exclusivity.

**ASSUMPTION REQUIRING VALIDATION:** any external mandate, accreditation, endpoint, credential, destination acceptance or partner commitment not evidenced in the controlling source set.

## Security gate

The live Supabase security advisor currently reports four WARN findings related to authenticated access to SECURITY DEFINER proxy wrappers. These require production hardening or formally documented compensating controls before unrestricted production exposure.

## External activation gates

JAKIM specification/scopes/credentials; China lab identity/scope; Sinotrans exact contracting entity/sites/system contracts; port/customs permissions; GCC importer/destination acceptance; financial/Takaful/regulatory onboarding; real Shipment 001 evidence; production hosting/identity UAT.

These gates delimit external activation and do not make the AMANAH platform story a prototype.
