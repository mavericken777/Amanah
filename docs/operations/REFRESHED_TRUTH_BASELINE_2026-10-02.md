# AMANAH / Global Halal Digital Trust — Refreshed Truth Baseline

**Control date:** 2026-10-02 | **Freeze:** master-standards-stack/verified-2026-09-17/

## Live baseline

| Domain | Current verified state |
|---|---|
| GlobalHalalDigitalTrust | main HEAD ccc10ca476b3ee07e77f11d0d6901e0b2ec744c5 |
| Amanah | main HEAD 11ac9ae7b4cd37cee63337ce180372da0ffbe9d6 |
| Frozen standards | master-standards-stack/verified-2026-09-17/ unchanged |
| Supabase | ACTIVE_HEALTHY; Postgres 17.11; ap-northeast-1 |
| Live AHTE records | zero production users/shipments/authority decisions observed in current snapshot |
| Schema normalization | canonical_domain_normalization_2026_10_02 applied successfully |

## Classification

**VERIFIED CURRENT FACT:** repository heads and database observations above.

**REPOSITORY-IMPLEMENTED CAPABILITY:** AHTE control plane, evidence/trust objects, normalized domain model, manufacturer onboarding, audit/lab/logistics/port models, Command Center objects, public verification and connector contracts.

**PROJECT-DEFINED CAPABILITY:** complete AMANAH lifecycle, Platinum monitoring, predictive/preemptive assurance and integrated stakeholder operating model.

**PLANNED EXTERNAL INTEGRATION:** JAKIM production API, China lab production interface, Sinotrans production systems, port/customs interfaces, GCC acceptance, finance/Takaful connectors.

**COMMERCIAL PROPOSAL:** CODA hardware financing, service bundles, partner economics and bounded exclusivity.

**ASSUMPTION REQUIRING VALIDATION:** any external mandate, accreditation, endpoint, credential, destination acceptance or partner commitment not evidenced in the controlling source set.

## Reconciliation corrections

1. The previous baseline checkpoint 8fe86c0db558 is historical and is superseded by current Amanah main 11ac9ae7b4.
2. GlobalHalalDigitalTrust ccc10ca476b contains the 69-programme binding that references Amanah e18fca1221; that is retained as historical implementation provenance, not current main.
3. The public static website source manifest pins target snapshot 14456e99937d6f11. This remains controlled target-snapshot provenance and must not be presented as current implementation provenance.
4. Current STATUS/PENDING record an external Vercel build-rate-limit condition; public wording must not imply confirmed production deployment solely from source presence.

## Security gate

The current project baseline records four Supabase SECURITY DEFINER proxy-wrapper WARN findings. Production exposure requires the documented hardening/compensating-control gate to be closed.

## External activation gates

JAKIM specification/scopes/credentials; China lab identity/scope; Sinotrans exact contracting entity/sites/system contracts; port/customs permissions; GCC importer/destination acceptance; financial/Takaful/regulatory onboarding; real shipment workflow evidence; production hosting/identity UAT.

## Batch QA rule

Every five-item batch must be rechecked against current main of both repositories, affected implementation, public material, tests/CI and the frozen standards boundary before its status is marked complete.