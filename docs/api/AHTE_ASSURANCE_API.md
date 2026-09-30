# AHTE Assurance API

[PROPOSAL: engineering implementation of canonical authority-aware API; not certification API]

Current project target binding: `GlobalHalalDigitalTrust@1cc9b338a28e4d7ddf4e7b6509bc38dae9396596aba78e64060c031db0f098dbdd49`.

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

The current assurance Edge Function is not itself the direct JAKIM transport, Sinotrans transport, port/customs transport or finance transport. Those remain replaceable connectors around the canonical AHTE event/evidence model.

## Direct JAKIM API target boundary

Project topology:

`AHTE ⇄ DIRECT JAKIM API ⇄ JAKIM`

Amanah may use internal connector/gateway classes to enforce authentication, idempotency, schema validation, evidence binding and audit logging. Those internal classes must not be presented publicly as an additional authority layer between AHTE and JAKIM.

Exact JAKIM production endpoints, credentials, scopes, permissions, payload contracts and official receipts remain source-locked until an authorised technical integration specification exists.

## D5/D6 protection

The service rejects machine execution of D5/D6 in the HITM evaluation route and rejects any attempt to mark an AHTE authority decision as issued_by_ahte.

## Release protection

Release calls are enforced by database triggers against the latest eligible state and all seven non-compensable gates. Caller `requires_authority_gate=false` and `hard_gate_status=passed` cannot bypass checks. Gate evidence must be verified, current, hashed and bound through metadata.entity_type/entity_id to the exact subject. HG-AUTH/HG-DEST and waivers require linked, approved external authority decisions and matching E5 references/signature hashes. Resolved fractures additionally require human re-verification and fresh gate reviews. `NOT DETECTED ≠ HALAL`.

`POST /gate-results` records a human review with entity_type, entity_id, project_id, gate_id, result, evidence_id, rationale and authority_decision_id where required. Gate rows are append-only; the database supplies reviewer timestamps. This records a review, not an authority mandate or certification.

`POST /transition` uses the canonical machine proposal bundled with the function. State rows are append-only and linked by previous_state_id. Undefined/reserved transitions fail closed. The database serializes changes and writes ledger events atomically. `POST /release` stores decision=`release`, fixes the project to the evaluated subject, and advances eligible to released within the same transaction. Releases retain is_certification=false.

Draft packet creation checks each supplied component against the bundled canonical schema version. Optional missing components keep the packet a draft; a draft is not a claim of complete trust-packet schema conformance.

## Predictive / preemptive target objects

The reconciled target architecture adds explicit machine objects outside the existing `/assess` record:

- command-center alert;
- prediction;
- preemptive strategy;
- finance evidence packet.

Their proposal schemas are stored in `config/target-extension-schemas-2026-09-30.json`.

A prediction remains D2 decision support. A preemptive strategy can request or recommend D2/D3/D4 actions but cannot manufacture D5/D6 outcomes. A D4 hold may be policy-triggered where configured; release remains human/authority controlled according to the applicable gate.

## 24/7 Command Center target

The Command Center consumes the canonical event/evidence model rather than bypassing it.

Monitored domains include manufacturer/facility, supplier/material, laboratory/sample, HCP/SCCP, smart audit, authority status, Sinotrans warehouse/logistics, container/seal, telemetry, route/geofence, custody, ports, GCC receiving, CAPA, evidence expiry, trust fracture, predictive risk, preemptive strategy and recall.

## External integrations

Target connector families:

- factory ERP/MES/QMS/WMS/LIMS/IoT/DMS/identity;
- China laboratory + traceability/serialization;
- Sinotrans warehouse/logistics via WMS/TMS/Y2T/MIS/EDI/IoT;
- direct JAKIM API;
- origin and GCC port/customs API/trust interfaces;
- destination/importer/receiving systems;
- Shariah-finance/Takaful evidence interfaces.

External systems should exchange canonical events through the inbound-events/logistics-events/telemetry/evidence routes or dedicated adapter contracts. Authentication credentials and signed-event arrangements are deployment-specific external gates.

AHTE records externally owned authority, sovereign-release and finance-related references; it does not create them by ingesting a payload.

## Public verification

Public verification is served by the separate `public-verify` Edge Function using a capability token. The service does not expose internal organization membership or private project data.

## Idempotency

The idempotency record binds actor, method, route and request body. Reusing a key with a different request or actor is rejected. An unfinished reservation returns 409 rather than fabricated success. Records are restricted to the requesting actor. Mutations are audited in their database transaction; external API response finalization remains a separate operation and failed completion is reported explicitly.

## Error model

Recall creation and all supplied scope rows are one database transaction. A malformed scope rolls back the parent recall and its audit events. No synthetic default subject UUID is substituted. Product verification selects certificates through the explicit certificate.product_id binding; operators must supply genuine scope evidence before creating that binding. Fractures synchronize domain holds (`border_hold` for shipments, `held` for batches/items, `quarantine` for material lots, suspended/not-cleared for products); they never auto-release.

Typical errors: authentication_required, invalid_token, organization_id_required, workspace_forbidden, rate_limit_exceeded, idempotency_key_reused_with_different_request, authority_gate_reserved, release_blocked, packet_not_found, evidence_not_found.

## Source boundary

AHTE is an orchestration, evidence and decision-support layer. It does not replace competent authorities, certification bodies, laboratories, port/customs authorities, financiers or other externally accountable actors and never creates sovereign Halal certification.
