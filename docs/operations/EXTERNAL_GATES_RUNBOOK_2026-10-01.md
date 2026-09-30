# Amanah external operations closure runbook — 2026-10-01

## Purpose

This document records the four remaining account/managed-service operations that cannot be completed by the repository connector itself. It is an execution runbook, not authority text, and does not change the IQ300 freeze.

## 1. Supabase PostgreSQL minor upgrade

Project: `lqvyyylrydcpjochknag`  
Current engine: PostgreSQL 17.6.1  
Region: `ap-northeast-1`  
Current status: `ACTIVE_HEALTHY`

### Pre-check completed

- `ltree` not installed.
- `btree_gist` not installed.
- No custom operators in `public`.
- No application functions in `public` or `private` call pgcrypto PGP routines.
- Current project remains healthy.

### Maintenance procedure

1. Select a low-traffic maintenance window and notify all operators.
2. Confirm a current backup is available.
3. Pause application writes and external ingestion during the window.
4. In Supabase Dashboard → Project Settings → General, use **Upgrade project** and review the platform's final eligibility warnings/time estimate.
5. Execute the managed upgrade.
6. Wait for the project to return to `ACTIVE_HEALTHY`.
7. Verify `show server_version;` and confirm the expected PostgreSQL minor version.
8. Run Amanah smoke tests: authentication, RLS, critical reads/writes, Edge Functions, realtime publication, public verification, release/hold controls and audit events.
9. Run Supabase security/performance advisors.
10. Record the resulting version, start/end timestamps, verification results and any remediation in the live-state record.

The managed upgrade is **not marked complete in this repository until the dashboard operation and post-upgrade verification actually occur**.

## 2. Protect Amanah `main`

Required repository ruleset for `mavericken777/Amanah`:

- Target branch: `main`.
- Require pull request before merge.
- Block direct pushes to `main`.
- Require the Amanah CI success check before merge.
- Recommended required checks: `typecheck`, `test`, `edge-functions`, `policies`, `reference-platform`, `reference-runtime`, and `build`.
- Block force pushes and branch deletion.
- Require conversation resolution before merge.
- Do not grant a routine bypass to administrators; use an explicitly controlled emergency bypass only if governance requires one.

Current repository observation: **no GitHub rulesets are configured**. The connected GitHub tool exposes ruleset reads but not ruleset/branch-protection writes. Therefore this is an account-administration gate, not a code defect.

## 3. Protect GlobalHalalDigitalTrust `main`

Apply the equivalent repository ruleset to `mavericken777/GlobalHalalDigitalTrust`:

- Target `main`.
- Pull request required.
- Direct pushes prohibited.
- Required CI status checks appropriate to the canonical repository: `CI`, `Repository Integrity`, `Platform Reference` and any required job checks currently exposed by the workflows.
- Block force pushes and branch deletion.
- Require conversation resolution.
- Controlled emergency bypass only if explicitly governed.

Current repository observation: **no GitHub rulesets are configured**. The connected GitHub tool exposes ruleset reads but not ruleset/branch-protection writes.

## 4. Production Amanah web hosting

Supabase project URL:

`https://lqvyyylrydcpjochknag.supabase.co`

Required production application environment:

```text
NEXT_PUBLIC_SUPABASE_URL=https://lqvyyylrydcpjochknag.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<current Supabase publishable key>
NEXT_PUBLIC_SITE_URL=https://<final-production-domain>/
```

Never commit the publishable key or any service-role/secret key to Git. Configure production environment variables in the hosting provider's secret/environment-variable surface.

### Auth callback validation

The application already has `app/auth/callback/route.ts` and exchanges the Supabase authorization code for a session. Before production launch, configure the final production Site URL and exact production redirect URL(s) in Supabase Auth URL Configuration.

Minimum production callback target:

`https://<final-production-domain>/auth/callback`

If preview deployments are enabled, add provider-specific preview redirect patterns only as required. Production should use an exact production URL rather than a broad wildcard.

### Hosting gate

No production host is currently connected through the available toolset. The Vercel deployment action is unavailable and no Vercel project is currently present. An alternate host requires explicit account authorization.

Therefore the repository is deployment-ready in configuration terms but **production hosting is not claimed as live** until a supported host is authorized, connected, deployed, and smoke-tested.

## Closure evidence required

This file may be marked closed only after evidence exists for each gate:

- Supabase: post-upgrade version + health + smoke-test evidence.
- Amanah GitHub: ruleset read-back showing `main` protected.
- GlobalHalalDigitalTrust GitHub: ruleset read-back showing `main` protected.
- Hosting: production URL + successful build/deployment + Auth callback test + environment verification without exposing secrets.

[OPEN GATE: Supabase managed PostgreSQL minor upgrade — owner: Supabase project administrator — blocking: infrastructure maintenance hardening]
[OPEN GATE: Amanah GitHub branch protection — owner: GitHub repository administrator — blocking: repository governance hardening]
[OPEN GATE: GlobalHalalDigitalTrust GitHub branch protection — owner: GitHub repository administrator — blocking: canonical source governance hardening]
[OPEN GATE: production Amanah hosting authorization — owner: Maverick / hosting account administrator — blocking: production UAT]
