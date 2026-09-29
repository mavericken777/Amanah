# Amanah Data Model

## Tenant hierarchy

Organization -> Project -> operational records.

Users belong to Organizations through organization_members. Project-specific access can be represented by project_members.

## Core relationships

- organization has members and projects
- project has tasks, meetings, documents, decisions, risks, budgets, expenses and updates
- China Trip projects have itinerary events, travellers, transport segments and accommodations

## Governance

- tasks can depend on other tasks
- records can have comments
- material changes can create audit events
- material entities can require approvals
- projects can use workflow definitions
- users can maintain saved views

## Integrity

Organization-owned records carry organization_id. Project-scoped rows also use organization-aware composite foreign keys where appropriate.

## Documents

Document rows represent metadata and secure storage references. Actual sensitive content stays outside Git.

## Finance

Budgets store planned and actual values. Matching expenses roll up to budget actuals. Currency and reimbursement policy must be finalized before authoritative reporting.
