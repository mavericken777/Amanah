# AMANAH Cybersecurity Architecture — Item 36

**Version:** 1.0.0 | **Control date:** 2026-10-02 | **Classification:** PROJECT-DEFINED / REPOSITORY-IMPLEMENTED CONTROLS

## Security objective
Protect identity, tenant isolation, evidence integrity, API/connector boundaries, devices, audit history and authority-facing workflows without claiming that cryptography proves factual truth or that the platform is invulnerable.

## Control stack
| Layer | Required control | Repository implementation / enforcement |
|---|---|---|
| Identity | authenticated user/service identity; MFA/elevated-role gates where configured | `lib/auth.ts`, Supabase Auth, role guards |
| Tenant | organization membership + least privilege | Postgres RLS on public tables; workspace scoping |
| Authorization | RBAC/ABAC; authority roles separate from platform administration | `docs/operations/SECURITY_MODEL.md`; policy/role checks |
| Evidence | append-only provenance; supersession; hashes/signatures where available | evidence tables, audit triggers, integrity fields |
| API | OAuth/OIDC/mTLS/PKI-ready contracts; idempotency/retry/rate limits | Item 34 API contract package + connector envelopes |
| Database | RLS, FK/check constraints, audit triggers, guarded security-definer RPCs | Supabase migrations and policy tests |
| Trust fracture | D4 policy hold permitted; no AI release of human-reserved hold | `20260930035500_release_gate_enforcement.sql` |
| Secrets | no secrets in client/public repo; environment/provider secret stores | deployment configuration boundary |
| Device/service | unique identity, credential/key protection, provisioning/revocation | Platinum monitoring/device model |
| Monitoring | alerts, fractures, telemetry, prediction/strategy provenance | Command Center tables/views |
| Supply chain | dependency/CI/build/test gates | GitHub Actions exact-head validation |

## Threat model
Credential theft; tenant breakout; privilege escalation; ransomware; malicious insider; API replay/injection; dependency compromise; device spoofing; telemetry forgery; evidence tampering; key compromise; data exfiltration; model/prompt manipulation; denial of service; compromised partner connector.

## Mandatory response
Detect → contain → preserve evidence → revoke/rotate credentials where required → scope blast radius → HOLD where policy authorizes → investigate → corrective action → re-verification → human/authority decision where applicable → recover → post-incident review.

## Hard authority boundary
Security controls may block, isolate or hold. They do **not** certify Halal, make D5/D6 decisions, release sovereign holds, approve financing/Takaful or create legal title.

## External activation gates
[SOURCE-LOCKED: production JAKIM security profile, endpoint/authentication/scopes and key-management requirements]
[OPEN GATE: partner production security agreements, credentials, certificates, allowlists and incident contacts]
[OPEN GATE: production penetration test / independent assurance scope and results]

No external gate removes the interface or security control from the architecture.
