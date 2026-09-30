# Amanah external operations closure runbook — 2026-10-01

## Purpose

This document records the remaining account/managed-service operations that cannot be completed by repository code alone. It is an execution runbook, not authority text, and does not change the IQ300 freeze.

## 1. Supabase PostgreSQL maintenance

Project: `lqvyyylrydcpjochknag`  
Region: `ap-northeast-1`

The project health/version must be verified from the live service before any maintenance action. Managed upgrades are not marked complete merely because repository migrations pass.

### Maintenance procedure

1. Select a low-traffic maintenance window and notify all operators.
2. Confirm a current backup is available.
3. Pause application writes and external ingestion during the window.
4. Review the platform's final eligibility warnings/time estimate.
5. Execute the managed upgrade if still required.
6. Wait for the project to return to `ACTIVE_HEALTHY`.
7. Verify the resulting PostgreSQL version.
8. Run Amanah smoke tests: authentication, RLS, critical reads/writes, Edge Functions, realtime publication, public verification, release/hold controls and audit events.
9. Run Supabase security/performance advisors.
10. Record the resulting version, timestamps, verification results and remediation.

## 2. Protect Amanah `main`

Required repository ruleset for `mavericken777/Amanah`:

- target branch: `main`;
- require pull request before merge;
- block direct pushes;
- require Amanah CI checks: `typecheck`, `test`, `edge-functions`, `policies`, `reference-platform`, `reference-runtime`, `build`;
- block force pushes and branch deletion;
- require conversation resolution;
- use only explicitly governed emergency bypasses.

The currently connected GitHub integration exposes ruleset reads but not ruleset/branch-protection administration. This remains an account-administration gate rather than a code defect.

## 3. Protect GlobalHalalDigitalTrust `main`

Apply equivalent source-governance controls to `mavericken777/GlobalHalalDigitalTrust`:

- target `main`;
- pull request required;
- direct pushes prohibited;
- required CI checks appropriate to that repository;
- block force pushes and branch deletion;
- require conversation resolution;
- controlled emergency bypass only where explicitly governed.

## 4. Production Amanah web hosting

Supabase project URL:

`https://lqvyyylrydcpjochknag.supabase.co`

Required production application environment:

```text
NEXT_PUBLIC_SUPABASE_URL=https://lqvyyylrydcpjochknag.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<current Supabase publishable key>
NEXT_PUBLIC_SITE_URL=https://<final-production-domain>/
```

Never commit credentials, service-role keys or secret keys. Configure production environment variables in the hosting provider's protected environment surface.

### Auth callback validation

Before production launch, configure the final production Site URL and exact production redirect URL(s) in Supabase Auth URL Configuration.

Minimum production callback target:

`https://<final-production-domain>/auth/callback`

## Closure evidence required

This file may be marked closed only after evidence exists for each applicable gate:

- Supabase maintenance: post-operation version + health + smoke-test evidence;
- Amanah GitHub: ruleset read-back showing `main` protected;
- GlobalHalalDigitalTrust GitHub: ruleset read-back showing `main` protected;
- Hosting: production URL + successful build/deployment + Auth callback test + environment verification without exposing secrets.

[OPEN GATE: Supabase managed PostgreSQL maintenance — owner: Supabase project administrator — blocking: infrastructure maintenance hardening]
[OPEN GATE: Amanah GitHub branch protection — owner: GitHub repository administrator — blocking: repository governance hardening]
[OPEN GATE: GlobalHalalDigitalTrust GitHub branch protection — owner: GitHub repository administrator — blocking: canonical source governance hardening]
[OPEN GATE: production Amanah hosting authorization — owner: Maverick / hosting account administrator — blocking: production UAT]
