# Amanah Engineering Instructions

## Mission

Build Amanah as a modular operational platform. Do not turn the codebase into a China-trip-only application.

## Requirements

The existing Markdown files are requirements material. Preserve their intent.

## Architecture rules

1. Organization-owned rows must carry organization_id.
2. Organization-owned tables must use RLS.
3. Business-critical changes must be auditable.
4. Secrets never belong in Git.
5. Domain modules consume shared platform services.
6. Generic platform components must not contain trip-specific assumptions.
7. Keep business logic testable.
8. Never bypass authorization for convenience.

## Quality gates

Before a feature is complete:

- typecheck passes
- migration is reviewed
- RLS is reviewed
- empty/loading/error states exist
- audit behavior is defined
- documentation is updated

## First domain module

travel.china-trip
