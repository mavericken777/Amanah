# Amanah

Amanah is a modular operational platform designed to give teams one controlled source of truth for projects, actions, meetings, documents, decisions, risks, finance, updates and domain-specific workflows.

The original China Trip Markdown workspace is preserved in this repository and is now treated as the first business-requirements source for the Travel / China Trip module.

## Current release

**Amanah v1 platform foundation is released on main.**

Verified on 2026-09-29:

- Next.js 16 App Router
- React 19.2
- TypeScript strict mode
- Supabase Auth and Postgres
- 25 public Postgres tables with Row Level Security enabled
- Organization/member/role model
- Projects and tasks
- Meetings
- Documents with private storage and signed access
- Decisions
- Risks
- Finance
- Updates
- Notifications
- Audit trail
- Workflow definitions
- Approvals
- Comments
- Task dependencies
- China Trip travel module
- CI: tests, typecheck and production build all passing on main
- Architecture, security, requirements and Supabase operations documentation

## Live backend

Supabase project: Amanah
Project ref: lqvyyylrydcpjochknag
Region: ap-northeast-1

Database migrations through 0007 are tracked in supabase/migrations/.

## Start here

1. Read SETUP.md.
2. Read docs/architecture/PLATFORM_ARCHITECTURE.md.
3. Read docs/requirements/REQUIREMENTS_TRACEABILITY.md.
4. Read docs/DELIVERY_PLAN.md.
5. Read docs/operations/SUPABASE_STATE.md.
6. Keep the original planning Markdown files as the business requirements baseline.

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
    Workflows
    Approvals
    Collaboration

  Domain Modules
    Travel / China Trip
      Travellers
      Itinerary
      Logistics
      Accommodation
      Travel Documents
      Trip Finance
      Meetings
      Actions
      Decisions
      Risks
      Updates

## Important security rule

This repository is not a secret store.

Never commit passwords, API keys, tokens, recovery codes, identity documents, payment-card data, private authentication links or confidential material that has not been approved for source control.

## Branch model

main is the released default branch.
build/amanah-platform-v1 contains the implementation history used for the v1 release and may be retained for traceability.
setup/china-trip-project contains the original trip requirements workspace and is preserved as a requirements source.
