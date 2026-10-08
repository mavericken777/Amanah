# Amanah release checklist

Use this checklist for every production merge affecting AHTE/IQ300 behavior.

## Source and authority

- [ ] Freeze/source binding reviewed.
- [ ] Post-freeze material labelled as implementation guidance/proposal where applicable.
- [ ] No source-locked normative wording invented.
- [ ] AI/lab/blockchain/QR/sensor outputs do not claim certification authority.
- [ ] D5/D6 authority-reserved decisions remain human/competent-authority controlled.
- [ ] Operational release remains explicitly distinct from certification.

## Database and authorization

- [ ] New public tables have RLS enabled.
- [ ] SELECT/INSERT/UPDATE/DELETE policies reviewed independently.
- [ ] Viewer/member roles cannot mutate authority/trust state unless explicitly designed and approved.
- [ ] External authority decision records require evidence references.
- [ ] Destructive operations use elevated roles.
- [ ] Migration is idempotent where reconciliation requires it.
- [ ] Supabase migration history matches repository lineage.
- [ ] Supabase security advisor checked after DDL changes.

## Application / API

- [ ] TypeScript typecheck passes.
- [ ] Node tests pass.
- [ ] `assurance` Edge Function passes Deno check.
- [ ] `public-verify` Edge Function passes Deno check.
- [ ] Next.js production build passes.
- [ ] Authentication and organization membership are enforced.
- [ ] Idempotency and rate-limit behavior reviewed for mutation endpoints.
- [ ] Public disclosure is intentionally scoped and marked `not_certification=true`.

## Operational evidence

- [ ] No synthetic authority decision, certificate, buyer commitment or shipment event used to close a real gate.
- [ ] shipment workflow remains `[PILOT]` until promoted under doctrine.
- [ ] External and transaction gates have named owners and closure evidence.

## Supply chain

- [ ] Dependency versions reviewed.
- [ ] Lockfile is current and committed when npm registry access is available.
- [ ] CI uses deterministic installation (`npm ci`) once lockfile is present.

## Release record

Record the canonical repository SHA12, Amanah commit/PR, Supabase migration(s), security-advisor result, CI result and any remaining SOURCE-LOCKED / OPEN GATE items in the release notes.

## Functional and operational verification

## Functional

- [ ] Authentication
- [ ] Workspace
- [ ] Projects
- [ ] Tasks
- [ ] Meetings
- [ ] Documents
- [ ] Decisions
- [ ] Risks
- [ ] Finance
- [ ] Updates
- [ ] Notifications
- [ ] Search
- [ ] Approvals/workflows
- [ ] China Trip

## Security

- [ ] RLS verified
- [ ] Cross-tenant access tested
- [ ] No service-role key in browser
- [ ] Sensitive files outside Git
- [ ] Redirect targets validated
- [ ] Audit events verified
- [ ] Role controls verified

## Quality

- [ ] Typecheck
- [ ] Tests
- [ ] Production build
- [ ] Migration test
- [ ] Error/loading/empty states

## Operations

- [ ] Backups
- [ ] Restore plan
- [ ] Monitoring
- [ ] Error tracking
- [ ] Environment variables
- [ ] Rollback plan
