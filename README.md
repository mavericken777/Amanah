# Amanah

Amanah is the operational application layer for the Amanah Halal Trust Ecosystem (AHTE), with a general-purpose operational core and domain modules. Its trust architecture is reconciled to the GlobalHalalDigitalTrust IQ300 doctrine and schema/path registries.

## Current platform

- Core operational platform: identity, organizations, projects, tasks, meetings, documents, decisions, risks, finance, updates, notifications, audit, workflows, approvals and collaboration.
- AHTE / IQ300 control plane: source and authority registry, standards/instruments, requirements, applicability, controls, HCP/SCCP, evidence, audit tests, findings, corrective actions, re-verification, authority gates, trust states, HITM cases, authority decisions, AI provenance, trust vectors, fracture/hold events, operational release, trust packets, identities, certificates, custody, port custody, partners, laboratories and shipments.
- Trade pilot: China → GCC direct / Shipment 001 model.
- Travel module: China Trip operational workspace.

## Source binding

Primary doctrine/reference repository: `mavericken777/GlobalHalalDigitalTrust` (`main`). See `docs/ahte/SOURCE_BINDING.md` and `docs/ahte/AHTE_PLATFORM_ARCHITECTURE.md`.

The GlobalHalalDigitalTrust doctrine states that Amanah/AHTE is an orchestration and evidence layer and does not replace competent authorities. AI is advisory; authority decisions are accountable human/competent-authority decisions. Normative text that is not held is source-locked rather than invented.

## Canonical path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

## Supabase

Project ref: `lqvyyylrydcpjochknag`  
Region: `ap-northeast-1`

The live database now includes AHTE migration `0008_ahte_trust_platform` with 30 AHTE tables, all protected by organization-scoped RLS policies. The existing operational tables remain in place.

## Development

`main` is the released default branch. AHTE reconciliation is developed on `feat/ahte-platform-reconciliation` until CI and review gates are satisfied.

Never commit secrets, private keys, access tokens, personal identity documents or other sensitive material to the repository.
