# AHTE Assurance API

[PROPOSAL: engineering implementation of canonical authority-aware API; not certification API]

Base URL:
`/functions/v1/assurance`

Authentication:
Every request uses a Supabase JWT in Authorization: Bearer <token>. Requests are restricted to the organization identified by organization_id and the authenticated user's membership.

Mutating requests should use Idempotency-Key. Rate limiting is enforced at 120 requests per organization/user/route/minute.

## Endpoints

| Method | Route | Purpose | Authority boundary |
|---|---|---|---|
| GET | /health | authenticated service/workspace health | none |
| POST | /packets | create draft trust packet | never certification |
| POST | /evidence | append evidence object | E5 requires external authority reference |
| POST | /assess | store AI/advisory assessment | D2 only; no authority decision |
| POST | /hitm/evaluate | create HITM case | D5/D6 default-deny |
| POST | /products | create product record | no market/certification claim |
| GET | /products/{id}/verification | product verification view | descriptive, not certification |
| POST | /lab-results | ingest laboratory result | analytical evidence only |
| POST | /shipments | create shipment transaction record | transaction gate remains explicit |
| POST | /logistics-events | ingest custody/logistics event | event integrity + fracture hooks |
| POST | /retail-events | record receiving/storage/dispatch activity | operational evidence |
| POST | /telemetry | ingest device telemetry | does not certify |
| POST | /inbound-events | ingest external system event | source-system provenance |
| POST | /credential-checks | record external credential verification | external authority/source evidence |
| POST | /market-registrations | record market/product registration | destination gate remains external |
| POST | /twins | upsert Digital Audit Twin snapshot | state only |
| POST | /public-verifications | create token-scoped disclosure | public disclosure only |
| POST | /hold | record fracture/hold | auto-hold allowed |
| POST | /release | operational release | never certification; hard gates required |
| POST | /authority-decisions | record external authority decision | AHTE cannot issue D5/D6 |
| GET | /evidence/{id} | evidence integrity metadata | source-linked |
| GET | /state/{packet_id} | trust state/vector/fractures | score descriptive |
| POST | /cases/{finding_id}/corrective-actions | create CAPA | human operational workflow |
| POST | /recalls | initiate recall and scope actions | external authority/customer closure where applicable |

## D5/D6 protection

The service rejects machine execution of D5/D6 in the HITM evaluation route and rejects any attempt to mark an AHTE authority decision as issued_by_ahte.

## Release protection

Release calls are evaluated against the latest trust state, failed hard gates, unresolved fractures, reserved D5/D6 cases and optional authority-gate approval. Releases are stored with is_certification=false.

## Public verification

Public verification is served by the separate `public-verify` Edge Function using a capability token. The service does not expose the internal organization membership or private project data.

## External integrations

ERP/WMS/TMS/LIMS/customs/retail/Sinotrans/device integrations should send canonical events through the inbound-events, logistics-events and telemetry routes. Authentication credentials and signed-event arrangements are deployment-specific external gates.

## Idempotency

The idempotency record stores the request hash and response. Reusing a key with a different request is rejected with 409.

## Error model

Typical errors: authentication_required, invalid_token, organization_id_required, workspace_forbidden, rate_limit_exceeded, idempotency_key_reused_with_different_request, authority_gate_reserved, release_blocked, packet_not_found, evidence_not_found.

## Source boundary

AHTE is an orchestration and evidence layer. It does not replace competent authorities, certification bodies or laboratories and never creates sovereign halal certification.