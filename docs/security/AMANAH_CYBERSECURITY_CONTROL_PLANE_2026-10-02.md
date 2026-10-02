# AMANAH Cybersecurity Control Plane
**Status:** PROJECT-DEFINED / IMPLEMENTATION CONTROL

## Boundaries
Zero-trust identity, MFA, RBAC/ABAC, tenant isolation, least privilege, mTLS for partner connectors, signed evidence, secrets outside source, encryption in transit/at rest, immutable audit events, incident containment.

## Decision separation
D0-D2 machine operations and configured D4 holds are separable from D5 authority gate and D6 sovereign/legal decision. Platform administration cannot impersonate authority.

## Control matrix
| Surface | Prevent | Detect | Respond |
|---|---|---|---|
| Identity | MFA/OIDC, least privilege | anomalous auth events | revoke/session isolate |
| API | OAuth2/OIDC, mTLS, rate limits | request/audit correlation | circuit-break/credential rotate |
| Evidence | signature/hash/provenance | integrity verification | HOLD + supersession; never overwrite |
| IoT | device identity, signed telemetry | sequence/tamper anomaly | quarantine device/evidence |
| Data | RLS/tenant boundaries | access audit | contain/export evidence |
| Supply chain | dependency pinning/CI | SCA/test gates | patch/rebuild/re-verify |

Security events bind ActorID, EventID, ObjectID where applicable, Timestamp and IntegrityProof. Hash proves integrity, not truth.

[OPEN GATE: production IdP, SIEM/SOC routing, HSM/KMS tenancy, partner certificates and authority-approved production security profiles.]