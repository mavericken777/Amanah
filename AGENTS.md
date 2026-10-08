# Amanah repository guidance

## Product model

Amanah and AHTE connect and continuously monitor the full halal assurance journey for certified premises and products/SKUs: onboarding, suppliers and materials, applicable requirements, JAKIM-certified laboratories, audit and certification records, production, warehouses, logistics, ports, GCC receiving, distribution and verification.

Global Halal Supply Chain Limited operates the international digital-infrastructure layer. PHC and JAKIM work in parallel across Perak/state and federal Malaysian governance. JAKIM/JAIN/JAIM, muftis, scholars and authorised halal auditors decide certification award and revocation through their applicable processes. AI/ML assists with evidence monitoring, prediction and preemptive strategy recommendations.

Topology: **AHTE ⇄ Direct JAKIM API ⇄ JAKIM**. Physical corridor: **China → GCC direct**.

## Engineering rules

- Keep organisation-owned data scoped by organization_id and protected by row-level authorization.
- Keep business-critical changes auditable and source-linked.
- Keep secrets out of Git.
- Preserve modular business logic and shared platform services.
- Never bypass authorization for convenience.
- Keep connector interfaces ready across development, sandbox, authorization and production environments; report actual provider state only.
- Preserve certification status, platform assurance, operational custody, customs disposition and finance decisions as distinct source-owned records.
- Use current authoritative instrument wording and preserve its source identity and edition.

## Verification

Run relevant tests, typecheck, documentation/site lint, builds and browser checks. Update the controlling documentation with the implementation in the same change. Report the exact checks and results that were observed.
