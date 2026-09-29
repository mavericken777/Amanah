# Requirements Traceability

This map connects the original Markdown specification to the Amanah implementation.

| Source | Requirement | Capability | Status |
|---|---|---|---|
| PROJECT_OVERVIEW.md | Single source of truth | Organization/project/dashboard model | Foundation |
| PROJECT_OVERVIEW.md | Responsibilities visible | Users/memberships + task owners | Foundation |
| PROJECT_OVERVIEW.md | Current itinerary | Travel itinerary entity | Schema |
| PROJECT_OVERVIEW.md | Record decisions | Decisions entity | Schema |
| PROJECT_OVERVIEW.md | Track risks | Risks entity | Schema |
| ACTION_ITEMS.md | Owner/due/priority/status | Tasks entity | Foundation |
| TEAM_AND_RESPONSIBILITIES.md | Role/responsibility/backup | Membership/profile model | Foundation |
| MEETINGS.md | Engagements and follow-up | Meetings + related records | Schema |
| DOCUMENTS_AND_COMPLIANCE.md | Compliance tracking | Document metadata | Schema |
| BUDGET_AND_EXPENSES.md | Planned/actual/variance | Budgets + expenses | Schema |
| RISK_REGISTER.md | Impact/likelihood/mitigation | Risks | Schema |
| DECISIONS.md | Decision register | Decisions | Schema |
| UPDATES.md | Dated progress | Updates | Schema |
| SECURITY.md | No secrets in repo | Security architecture | Foundation |
| SECURITY.md | Secure references | Document metadata | Schema |
| TEAM_GUIDE.md | Reviewable changes | Git workflow + CI | Foundation |
| CHANGELOG.md | Change visibility | Audit events | Foundation |
| ITINERARY.md | City/date/time/activity | Itinerary events | Schema |
| LOGISTICS.md | Flights/ground/connectivity | Transport segments | Schema |
| ACCOMMODATION.md | Property/check-in/out | Accommodations | Schema |

## Deferred implementation gaps

The following are retained as explicit backlog items:

- complete CRUD UI for every entity
- document upload and secure preview
- approvals
- notification delivery
- full-text search
- expense approval/reimbursement workflow
- daily travel briefings
- reporting
- integrations
- mobile/PWA
- enterprise SSO
- MFA enforcement policy
- configurable workflows
- custom fields
- import/export
