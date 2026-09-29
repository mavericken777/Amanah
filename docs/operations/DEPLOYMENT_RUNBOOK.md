# Amanah Deployment Runbook

[PROPOSAL: engineering operating procedure]

## GitHub

Production source is `main`.

Required checks:

- web tests
- TypeScript typecheck
- AHTE Edge Function Deno typecheck
- production build

## Environment

Client-side:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

Server-only:
- SUPABASE_SERVICE_ROLE_KEY for the public-verify Edge Function.

Never commit secrets.

## Supabase

Project: `lqvyyylrydcpjochknag`.

After any schema change:
1. create a versioned migration;
2. apply it;
3. regenerate `lib/database.types.ts`;
4. run security advisor;
5. run performance advisor;
6. verify RLS coverage;
7. verify Edge Functions;
8. run CI.

## AHTE release

Before operational release:
- latest trust state exists;
- hard gates pass;
- no unresolved fracture;
- no related open D5/D6 case;
- authority gate is approved where required;
- release records `is_certification=false`.

Before authority decision recording:
- external authority reference exists;
- signature hash exists;
- AHTE is not represented as issuer.

## Shipment 001

[PILOT: Shipment 001 — China → GCC direct]

Do not create fictional evidence, certificates, results or shipment events.

## Platinum

Platinum requires real devices, provisioning, calibration, connectivity and telemetry. Amanah stores and evaluates those inputs; it does not fabricate readings.

## Rollback

Do not rewrite applied migrations. Preserve the previous known-good application deployment and use approved database recovery procedures for migration failures.
