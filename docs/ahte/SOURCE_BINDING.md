# AHTE source binding

## Current project source

`mavericken777/GlobalHalalDigitalTrust` — branch `main`.

[PROJECT-REPO: https://github.com/mavericken777/GlobalHalalDigitalTrust/tree/70246a361ca799d092d12d968a301c87c71ca2d7 — 70246a361ca7 — 2026-10-09 — current verified main]

The current source describes the platform architecture and integration interfaces. Private trip administration, transaction records, draft instruments and counterparty signatory data are outside the public repositories.

## Immutable standards reference

`master-standards-stack/verified-2026-09-17/` remains the dated standards-reference package. Its 2026-10-09 revision note records the owner's removal of transaction-specific identifiers and trip-administration material; the revision does not alter normative standards text or authority status. Use current authoritative sources for normative applicability. Exact normative text remains source-locked when authoritative material is unavailable.

## Architecture controls

- Public authority topology: `AHTE ⇄ Direct JAKIM API ⇄ JAKIM`.
- Default corridor: `China → GCC direct`.
- AI assists; authorized humans and competent authorities decide.
- Evidence precedes trust; trust precedes operational release.
- Hashes establish integrity, not truth. Laboratory results are evidence, not certification.
- Authority, AHTE trust, operational, customs and finance states remain separate.
- No architecture document, test fixture, connector mock or website demonstration creates real authority approval, sovereign release, financing approval, Takaful decision or legal title.

## Canonical path

`Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release`

## Current integration scope

The platform models onboarding, standards applicability, producer and supplier identity, sample custody and laboratory evidence, smart audit, findings and corrective action, authority review, trust-state propagation, production records, Sinotrans warehouse and logistics custody, ports and customs, GCC receiving and distribution, public verification, command-center monitoring, predictive assurance, recall analysis, and appropriately authorized finance and Takaful interfaces.

Machine-readable source and mirror bindings are maintained in `config/source-binding.json` and `config/canonical-mirror-manifest.json`.
