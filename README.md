# Amanah

Amanah is a modular operational platform designed to give teams one controlled source of truth for projects, actions, meetings, documents, decisions, risks, finance, updates and domain-specific workflows.

The original China Trip Markdown workspace is preserved in this repository and is now treated as the first business-requirements source for the Travel / China Trip module.

## Current build

This repository contains the Amanah v1 technical foundation:

- Next.js 16 App Router
- React 19.2
- TypeScript strict mode
- Supabase Auth and Postgres
- Row Level Security
- Organization/member/role model
- Projects
- Tasks and action register
- Audit trail
- China Trip domain schema
- CI workflow
- Architecture and delivery documentation

## Start here

1. Read SETUP.md.
2. Read docs/architecture/PLATFORM_ARCHITECTURE.md.
3. Read docs/requirements/REQUIREMENTS_TRACEABILITY.md.
4. Read docs/DELIVERY_PLAN.md.
5. Keep the original planning Markdown files as the business requirements baseline.

## Platform structure

Amanah
  Core Platform
    Identity
    Organizations
    Projects
    Tasks
    Meetings
    Documents
    Decisions
    Risks
    Finance
    Updates
    Notifications
    Audit

  Domain Modules
    Travel / China Trip
      Travellers
      Itinerary
      Logistics
      Accommodation
      Travel Documents
      Trip Finance

## Important security rule

This repository is not a secret store.

Never commit passwords, API keys, tokens, recovery codes, identity documents, payment-card data, private authentication links or confidential material that has not been approved for source control.

## Development branch

The implementation is being developed on:

build/amanah-platform-v1

The original requirements workspace remains on:

setup/china-trip-project
