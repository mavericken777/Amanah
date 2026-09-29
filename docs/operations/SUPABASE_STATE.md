# Amanah Live Supabase State

Verified: 2026-09-29

## Project

- Project: Amanah
- Project ref: lqvyyylrydcpjochknag
- Region: ap-northeast-1
- Status: ACTIVE_HEALTHY
- PostgreSQL: 17.6

## Live schema

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

## Security

- Public operational tables use Row Level Security.
- Authorization is organization-scoped.
- Project references have same-organization composite constraints.
- Privileged trigger/helper functions live in the private schema.
- Anonymous execution is disabled for privileged helper functions.
- The document bucket amanah-documents is private and role/workspace scoped.
- Material operational changes are captured in audit events.
- Approval requester and approver are constrained to workspace members.

## Verification

Supabase security advisors: no findings after hardening.

Performance advisor output: informational unused-index notices remain on the new project because it has no representative production workload. RLS initialization and duplicate-index warnings were remediated.

## Application binding

Generated database types are stored in lib/database.types.ts.

The application environment template points to the live project URL. No service-role key is committed.
