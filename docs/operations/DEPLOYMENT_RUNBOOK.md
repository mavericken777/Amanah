# Amanah Deployment Runbook

[PROPOSAL: engineering operating procedure]

## GitHub

Production source is `main`.

Required checks:

- web tests
- TypeScript typecheck
- AHTE Edge Function Deno typecheck
- production build

## Vercel application deployment

The repository root is the Next.js Amanah application. `vercel.json` explicitly
selects the `nextjs` framework, installs with `npm ci` and builds with
`npm run build`. The Python AHTE reference runtime under `src/ahte` is not the
web application entrypoint; automatic FastAPI detection causes
`FASTAPI_ENTRYPOINT_NOT_FOUND` and must not control this deployment.

Configure the client-side Supabase variables below in the deployment environment
before accepting authentication flows. Preserve deployment protection and tenant
authorization. The static partner website continues to use its separate Pages
workflow. Verify the deployment reaches READY, the health endpoint responds and
anonymous protected routes redirect to login before operational acceptance.

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

## shipment workflow

[PILOT: shipment workflow — China → GCC direct]

Do not create fictional evidence, certificates, results or shipment events.

## Platinum

Platinum requires real devices, provisioning, calibration, connectivity and telemetry. Amanah stores and evaluates those inputs; it does not fabricate readings.

## Rollback

Do not rewrite applied migrations. Preserve the previous known-good application deployment and use approved database recovery procedures for migration failures.

## Environment, incident and recovery procedures

## Environments

local -> preview/test -> staging -> production

Never share production credentials with lower environments.

## Deployment gate

CI passes, migrations are reviewed, RLS is reviewed, auth redirects are configured, backups and monitoring are active, health endpoint responds, sensitive document storage is approved and test data is excluded.

## Incident response

Check deployment, health, logs and database availability. Roll back the application only when database compatibility is known. Prefer reviewed forward fixes for schema changes.

For a secret exposure: revoke/rotate, remove the current copy, review history and record the incident.

## Recovery

A backup is not sufficient until a restore drill succeeds.
