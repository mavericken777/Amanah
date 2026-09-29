# Contributing to Amanah

Amanah is an operational system. Changes should be traceable, reviewable and safe.

## Pull requests

Include:

- what changed
- why
- related requirement
- security implications
- test evidence
- migration notes when schema changes

## Data safety

Never commit passwords, API keys, access tokens, recovery codes, identity scans, payment-card details, private authentication links or confidential material not approved for source control.

## Database changes

All schema changes belong in supabase/migrations/.

Do not make undocumented production-only database changes.

## Commit style

Examples:

- feat: add task ownership
- feat: add China Trip itinerary
- fix: enforce task RLS
- docs: update deployment guide
