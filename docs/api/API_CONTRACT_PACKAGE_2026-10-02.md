# Amanah / AHTE API Contract Package

**Version:** 1.0.0 | **Control date:** 2026-10-02

## Required contract set
- OpenAPI for synchronous REST interfaces.
- AsyncAPI/event catalogue for event-driven interfaces.
- JSON Schema/canonical event schemas.
- OAuth2/OIDC scopes plus mTLS/PKI profile where required.
- Webhook signing/replay contract.
- Error, idempotency, retry, timeout and rate-limit contract.
- Versioning/deprecation policy.
- Sandbox/fixture examples and UAT conformance tests.

## HTTP conventions
Correlation ID and idempotency key are required on mutating operations where replay is possible. Errors use stable machine code + human message + correlation reference, never fabricated authority meaning.

## Versioning
Breaking changes require a new major API/schema version. Deprecation identifies replacement, migration instructions and retirement date. Existing signed evidence/events remain interpretable against the version that produced them.

## Webhooks/events
Verify signature, timestamp freshness and replay protection before processing. Preserve raw original + normalized canonical event + transform version.

## Connector states
`UNCONFIGURED / DEVELOPMENT / SANDBOX / PENDING_AUTHORIZATION / PRODUCTION`.

A production state requires actual credentials, permissions and successful conformance evidence. Development capability is not removed while authorization is pending.

## Direct JAKIM API
The typed authority integration point is built against the canonical contract. Official endpoint paths, auth mechanism, schemas and production credentials are bound only from authorized JAKIM materials; they are not invented by the platform.
