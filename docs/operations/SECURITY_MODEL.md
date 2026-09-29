# Amanah / AHTE authorization model

## Principle

Organization membership grants workspace visibility. It does not by itself grant authority to mutate source, authority, trust-state or release records.

## Role tiers

| Role | General intent |
|---|---|
| `owner` | Workspace ownership and destructive administration. |
| `admin` | Workspace/security administration. |
| `executive` | Elevated governance and authority-evidence recording. |
| `project_manager` | Operational project/trust-state management. |
| `contributor` | Operational evidence/control work where permitted. |
| `member` | Read/participation role without generic AHTE control-plane mutation. |
| `viewer` | Read-only workspace visibility. |

## AHTE policy groups

### Source / authority registry

Tables such as authorities, instruments, requirements, mappings, certificates, authority gates and authority decisions use elevated mutation roles (`owner`, `admin`, `executive`). This is application authorization only; these roles do not confer sovereign certification authority.

### Trust / release state

Release decisions, trust states and fracture state use `owner`, `admin`, `executive`, `project_manager` for mutation. Operational release remains distinct from certification.

### Operational assurance records

Evidence, assessments, audit tests, findings, controls, custody, trust packets and related operational objects allow mutation by explicit writer roles including `contributor`, subject to table constraints and API controls.

### Read access

Authenticated organization members may read organization-scoped AHTE records under RLS.

### Destructive access

Deletion on the hardened original AHTE control-plane set is restricted to `owner`/`admin`.

## Defense in depth

RLS is the database enforcement boundary. API route checks supplement but do not replace RLS. The assurance Edge Function also enforces organization membership, mutation rate limiting, idempotency, D5/D6 reservation and specific elevated-role checks for release and authority-decision recording.

## Authority evidence

Amanah rejects `issued_by_ahte=true` at the assurance API. Authority decision records in `signed` or `final` lifecycle state require an external decision reference and signature hash. These records represent externally owned decisions; they do not make Amanah the issuer.
