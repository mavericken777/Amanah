# Amanah Live Supabase State

Verified: 2026-09-29

## Project

- Project: Amanah
- Project ref: lqvyyylrydcpjochknag
- Region: ap-northeast-1
- Status: ACTIVE_HEALTHY
- PostgreSQL: 17.6

## Database

The live project contains the Amanah core and platform-extension schema.

Core domains include:

- profiles
- organizations and memberships
- projects
- tasks
- meetings and attendees
- documents
- decisions
- risks
- budgets and expenses
- itinerary and travel records
- travellers
- transport
- accommodation
- updates
- notifications
- audit events

Platform extensions include:

- project members
- comments
- task dependencies
- workflow definitions
- approvals
- saved views

## Security controls

- Public tables have Row Level Security enabled.
- Authorization is organization-scoped.
- Cross-organization project references are constrained at database level.
- Privileged database helper and trigger functions live in the private schema.
- Anonymous EXECUTE is not granted on those functions.
- Authenticated execution is only granted to the two RLS lookup helpers.
- The document bucket is private.
- Document storage policies are organization/role scoped.
- Audit triggers capture material record changes.

## Verification

Supabase security advisors: no findings.

Performance advisor output: informational unused-index notices remain because the project is new and has no representative production workload. Duplicate-index warnings were removed.

## Application binding

The Next.js application uses the generated database types stored at:

lib/database.types.ts

The environment template points to the live project URL. A publishable key must be supplied through the deployment environment; secrets are not committed to GitHub.
