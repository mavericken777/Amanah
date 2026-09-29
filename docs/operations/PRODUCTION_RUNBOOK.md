# Amanah Production Runbook

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
