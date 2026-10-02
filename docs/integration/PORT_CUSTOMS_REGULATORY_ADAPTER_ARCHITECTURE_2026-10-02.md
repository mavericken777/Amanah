# Port / Customs / Regulatory Adapter Architecture

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Adapter perimeter
Supported protocol adapters: **REST, SOAP, XML, EDI, CSV, SFTP, MQ, batch, webhooks, events**.

All external transports map into a canonical envelope:
`ConnectorID + MessageID/EventID + SourceSystem + Actor/AuthorityRef + ObjectRefs + Timestamp + PayloadRef + IntegrityProof + IdempotencyKey + CorrelationID`.

## Inbound
arrival/manifest references; inspection orders/results; sampling references; hold/release status; customs event references; custody events.

## Outbound
minimum-necessary identity/trust/evidence assertions; authorized document references; shipment/container/seal/custody context.

## Reliability
- idempotency and duplicate suppression;
- signed webhook verification;
- retries with bounded exponential backoff;
- dead-letter/quarantine queue;
- timeout/circuit breaker;
- versioned transforms;
- replay with immutable original message;
- reconciliation dashboard.

## Security
OAuth2/OIDC where supported; mTLS/PKI; IP/network allowlists where required; key rotation; least privilege; purpose-scoped disclosure; immutable access/audit logs.

No endpoint name is represented as an official authority API until supplied/authorized by that authority.
