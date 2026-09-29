# Amanah Platform Architecture v1

**Status:** Implementation baseline  
**Date:** 2026-09-29  
**Repository:** mavericken777/Amanah

## 1. Purpose

Amanah is a general-purpose operational platform. The China Trip is the first domain module, not the definition of the platform.

The platform provides one controlled source of truth for projects and the work around them: people, responsibilities, tasks, meetings, documents, decisions, risks, finance, communications, notifications, audit history and domain-specific workflows.

## 2. Requirements baseline

The original Markdown specification remains preserved and is treated as the business-requirements baseline. Key files include:

PROJECT_OVERVIEW.md, ACTION_ITEMS.md, TEAM_AND_RESPONSIBILITIES.md, ITINERARY.md, LOGISTICS.md, ACCOMMODATION.md, MEETINGS.md, DOCUMENTS_AND_COMPLIANCE.md, BUDGET_AND_EXPENSES.md, RISK_REGISTER.md, DECISIONS.md, UPDATES.md, TEAM_GUIDE.md, SECURITY.md and CHANGELOG.md.

Implementation must not silently erase those requirements.

## 3. Platform model

    Organization
       |
       +-- Users / memberships / roles
       |
       +-- Projects
              |
              +-- Core capabilities
              |     +-- Tasks
              |     +-- Meetings
              |     +-- Documents
              |     +-- Decisions
              |     +-- Risks
              |     +-- Finance
              |     +-- Updates
              |     +-- Notifications
              |     +-- Audit
              |
              +-- Domain modules
                    +-- Travel / China Trip
                    +-- future modules

The reusable core must not become dependent on trip-specific concepts.

## 4. Technology baseline

- Next.js 16.3.6 App Router
- React 19.2
- TypeScript strict mode
- Supabase Auth
- Supabase Postgres
- Postgres Row Level Security
- Supabase Storage or another approved secure document vault
- GitHub Actions
- Node.js 22.18+

The project uses Next.js 16's proxy convention and Supabase's current SSR model with cookie-based sessions.

## 5. Why the stack

The deadline favors managed infrastructure for authentication, sessions, PostgreSQL and document storage rather than building those primitives from scratch.

Business logic remains application-owned so Amanah is not conceptually tied to one UI or one module.

## 6. Core entities

- Organization
- Profile
- Organization membership
- Project
- Task
- Meeting
- Meeting attendee
- Document metadata
- Decision
- Risk
- Budget
- Expense
- Update
- Notification
- Audit event

## 7. China Trip entities

- Itinerary event
- Traveller
- Transport segment
- Accommodation

The current migration places these domain records under an Amanah project and keeps organization_id on every row for direct tenant isolation.

## 8. Tenant isolation

Every organization-owned table carries organization_id.

RLS is enabled.

A user is allowed to read or mutate records only when they have a membership in the owning organization. Administrative writes use organization roles.

Baseline roles:

owner, admin, executive, project_manager, member, contributor, viewer.

Important rule:

> Interface visibility is not authorization.

Database policies and server-side checks are the security enforcement layers.

## 9. Authentication

Flow:

1. Create or sign in to an account.
2. Supabase maintains the session.
3. Next.js proxy refreshes the cookie-based session.
4. Protected server code verifies identity.
5. Postgres RLS restricts data access.

Use getClaims for server-side verification and getUser when a current user record is needed. Do not use getSession as an authorization decision.

## 10. Onboarding workflow

Account -> profile -> organization -> owner membership -> project -> task.

Creating an organization automatically creates the owner membership through a database trigger.

## 11. Business workflows

### Tasks

Open -> In Progress -> Done

Open -> Blocked -> In Progress

Open -> Cancelled

Material tasks should have owner, due date where relevant, completion condition and status.

### Meetings

Pending -> Tentative -> Confirmed

Confirmed -> Cancelled

Meetings can relate to attendees, documents, outcomes, decisions and follow-up tasks.

### Risks

Open -> Monitoring -> Mitigated -> Closed

Open -> Escalated

### Documents

Pending -> In Review -> Approved

Pending/In Review -> Rejected

Approved -> Expired

### Itinerary

Pending -> Tentative -> Confirmed

Tentative/Confirmed -> Blocked or Cancelled

## 12. Audit model

High-value operational records have database audit triggers.

Recorded fields:

- organization
- actor
- action
- entity type
- entity id
- previous row snapshot
- resulting row snapshot
- timestamp

The audit table is readable by organization members but not directly writable through normal client permissions.

Future production hardening should add retention policy, tamper-evidence and privileged audit export.

## 13. Document model

Amanah separates document metadata from document content.

Metadata includes title, classification, owner, required-by date, status and secure storage reference.

Sensitive source files do not belong in Git. Passport scans, access tokens, banking information, authentication links and similar secrets remain outside the repository in approved secure storage.

## 14. API direction

The first slice can use Supabase's data API from Server Components and controlled Client Components.

As features mature, introduce a versioned application boundary:

    /api/v1/projects
    /api/v1/tasks
    /api/v1/meetings
    /api/v1/documents
    /api/v1/decisions
    /api/v1/risks
    /api/v1/finance
    /api/v1/travel

The application API should own validation, business rules, authorization checks, idempotency and integration boundaries.

## 15. UI information architecture

Core:

Dashboard
Projects
Tasks
Meetings
Documents
Decisions
Risks
Finance
Updates
Audit
Administration

Travel module:

China Trip
- Overview
- Travellers
- Itinerary
- Logistics
- Accommodation
- Meetings
- Documents
- Budget
- Risks
- Decisions
- Actions
- Updates

## 16. Executive dashboard contract

The dashboard must answer the questions from PROJECT_OVERVIEW.md:

- Where are we going?
- When?
- Who is travelling?
- Who owns each task?
- What meetings are scheduled?
- What is confirmed and what is pending?
- What documents are outstanding?
- What changed?
- What decisions have been made?
- What risks are active?
- What needs action now?

## 17. Notification engine

Future event sources:

- task due soon
- task overdue
- task blocked
- meeting changed/cancelled
- risk escalated
- document overdue/expired
- decision recorded
- project status changed

Initial channel: in-app.

Future channels: email and controlled external integrations.

Notifications must be tenant-scoped, preference-aware and deduplicated.

## 18. Search

Search must cover projects, tasks, meetings, documents, decisions, risks, updates and travel records while preserving RLS boundaries.

Start with Postgres full-text search. Introduce an external search engine only when scale or relevance requirements justify it.

## 19. Reliability

Production requirements:

- automated database backups
- restore procedure
- monitoring
- structured application logs
- error tracking
- health endpoint
- CI
- dependency review
- migration review
- environment separation

Environment model:

local -> preview/test -> staging -> production.

## 20. Delivery phases

### P0

Authentication, organizations, memberships, projects, tasks, RLS, audit, dashboard.

### P1

Meetings, documents, decisions, risks, updates, notifications, search, administration.

### P2

China Trip itinerary, travellers, logistics, accommodation, compliance, budget and trip dashboard.

### P3

Workflow builder, custom fields, approvals, integrations, reporting, mobile/PWA, external API and automation.

## 21. Definition of done

A feature is complete only when:

- data model is defined
- migration exists
- authorization is reviewed
- validation exists
- UI exists
- error/loading/empty states exist
- audit behavior is defined
- tests exist
- documentation is updated
- CI passes
- security implications have been reviewed

## 22. Important scope statement

The initial implementation is a foundation plus a working vertical slice. It is not being represented as a finished enterprise production system.

The architecture is intentionally designed so the remaining A–Z modules can be added without replacing the core.
