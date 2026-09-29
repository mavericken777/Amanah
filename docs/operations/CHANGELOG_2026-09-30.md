# Change record — 2026-09-30 end-to-end hardening

## Fixed

- Reconciled Supabase migration history for AHTE realtime enablement (`0014`).
- Replaced broad organization-member mutation policy on original AHTE control-plane tables with role-specific RLS (`0015`).
- Aligned authority-decision status constraints with the deployed assurance API while requiring external proof for signed/final states (`0016`).
- Pinned `@supabase/supabase-js` to the deployed runtime version `2.114.0`.
- Extended CI Deno validation to both Edge Functions.
- Added security-boundary regression tests.
- Corrected stale README and AHTE source-binding statements.
- Added completion/gate register, security model and release checklist.
- Strengthened pull-request governance template for source/authority/RLS checks.

## Verified live

- Supabase project healthy.
- 97 public tables with RLS enabled on all 97.
- zero Supabase security-advisor findings after hardening.
- critical AHTE realtime streams published.
- no live users/organizations/projects at review time; real transaction testing therefore remains transaction-gated rather than synthetically populated.

## Open gates

See `END_TO_END_COMPLETION_2026-09-30.md` for source, authority, transaction and engineering closure conditions.
