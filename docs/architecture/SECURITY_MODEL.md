# Amanah Security Model

## Boundaries

Browser -> Next.js server -> Supabase/Postgres -> approved secure document storage.

GitHub stores source and non-sensitive requirements, not secrets.

## Authorization

Tenant access is enforced through organization membership and Postgres RLS. Roles: owner, admin, executive, project_manager, member, contributor, viewer.

UI visibility is not authorization.

## Prohibited repository data

Passwords, API keys, tokens, recovery codes, passport/identity scans, payment-card data, private authentication links and unapproved confidential files.

## Audit

Business-critical changes record actor, operation, entity, before/after values and timestamp.

## Higher-assurance release gates

MFA policy, SSO where required, secrets management, dependency scanning, penetration testing, backup restore drills, audit retention and incident response.
