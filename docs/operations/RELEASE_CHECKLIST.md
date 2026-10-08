# Release verification record

Use these checks to validate a production change. Record observed results and the exact source revision; this document does not represent an external authority, partner or transaction status.

## Product and data

- Confirm the updated workflow matches the current product journey and source records.
- Confirm organization scoping, row-level access, audit events and error states.
- Confirm certification status, platform assurance, logistics custody, customs disposition and finance decisions stay distinct.
- Confirm AI/ML assistance does not replace the applicable human certification decision process.
- Confirm public verification does not generate an official certificate or claim a decision that was not provided by its source.

## Engineering

- TypeScript typecheck and relevant automated tests pass.
- Edge Functions pass their configured checks where changed.
- Public-site lint/build and Next.js production build pass where affected.
- Database migrations are reviewed, idempotent where needed, and retain authorization controls.
- Authentication, organization membership, idempotency and rate limits are verified for changed endpoints.
- Dependency and lockfile updates are consistent.

## Release evidence

Record the GlobalHalalDigitalTrust source SHA, Amanah commit/PR, migration identifiers, security results, CI links and deployment verification. State any provider’s actual connector state using observed provider data.
