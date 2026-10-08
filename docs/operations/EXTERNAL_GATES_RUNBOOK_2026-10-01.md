# Amanah External Operations Runbook

**Original control date:** 2026-10-01  
**Reconciled:** 2026-10-03  
**Purpose:** account / managed-service / counterparty gates that repository code cannot close by itself.

This runbook is operational guidance, not authority text, and does not change the verified freeze.

## 1. Managed service state

Supabase project state is controlled by `docs/operations/STATUS.md`. Managed maintenance, backup/restore and production operations remain normal platform responsibilities rather than architecture gaps.

## 2. Protect Amanah `main`

Required repository governance:
- pull request required;
- direct pushes prohibited;
- required Amanah CI checks;
- force pushes / branch deletion blocked;
- conversation resolution required;
- emergency bypass only where explicitly governed.

[OPEN GATE: Amanah GitHub branch-protection administration — owner: repository administrator — blocking: repository governance hardening]

## 3. Protect GlobalHalalDigitalTrust `main`

Apply equivalent source-governance controls appropriate to the canonical repository.

[OPEN GATE: GlobalHalalDigitalTrust GitHub branch-protection administration — owner: repository administrator — blocking: canonical source governance hardening]

## 4. Production hosting and authenticated UAT

Production hosting/deployment state is reported in `docs/operations/STATUS.md`; the obsolete generic “hosting authorization” gate is not the current blocker.

Required remaining UAT evidence:
- authorized production test identities;
- correct tenant / role membership;
- sign-in and callback verification;
- representative protected-route access;
- role/permission negative tests;
- stakeholder acceptance record;
- environment verification without exposing secrets.

### Environment configuration

Configure production secrets and public environment values only in the hosting provider’s protected environment. Never commit credentials, service-role keys or secret keys.

Supabase URL:
`https://lqvyyylrydcpjochknag.supabase.co`

Expected public variables include:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

Auth redirect URLs must match the authorized production domain and `/auth/callback`.

[OPEN GATE: authenticated production UAT identities/roles and stakeholder acceptance — owner: authorized platform administrators + participating organisations]

## 5. External connector activation

Production activation requires attributable counterparty/authority evidence:
- Direct JAKIM API specification, authorization, credentials and UAT;
- laboratory identity/accreditation/method scope and production interface;
- Sinotrans contracting entity/sites/lanes/systems and security agreement;
- origin/GCC port/customs permissions;
- GCC destination acceptance/import release;
- finance/Takaful/regulatory counterparties and approvals.

No missing external input justifies removing the implemented integration point.

## 6. Transaction activation

shipment workflow remains NOT-INSTANTIATED until transaction-native product, buyer/importer, batch, authority, laboratory, custody/logistics and destination evidence exists.

## Closure evidence

An external gate closes only when its exact evidence is attached/referenced in the controlled system. Development fixtures, architecture diagrams and internal receipts do not close production gates.
