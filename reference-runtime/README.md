# AHTE Reference Runtime

[PROJECT-REPO: https://github.com/mavericken777/GlobalHalalDigitalTrust — SHA12 3d5cc29fabf7 — 2026-09-30]
[PROPOSAL: source-bound reference mirror — path point: Control → Evidence → Authority Gate → Trust State → Operational Release]

This directory preserves the executable reference layers from the canonical project repository at commit `3d5cc29fabf7c3ed0da20cd938219fed83e74830`.

## Exact mirror contract

`config/canonical-source-bindings.json` records the canonical Git blob SHA for each mirrored machine spec, runtime, policy, test and FastAPI reference file. `tests/canonical-parity.test.mjs` recomputes Git blob hashes locally and fails CI on one-byte drift.

The historical mirror layout keeps `engine/`, `gateway/` and `policies/` directly under this directory. Git symlink adapters under `runtime/` preserve the canonical source tests' original relative paths without editing the source test bytes.

## Important

The canonical runtime and FastAPI `platform/` are reference/simulation implementations. They use fixture identifiers, example authorities/DIDs and/or in-memory state. They do not constitute a deployed sovereign certification service.

Production Amanah uses the Supabase-backed AHTE control plane and deployed Edge Functions. Production is required to preserve semantic authority/HITM/hard-gate behavior, but may strengthen persistence, authentication, RLS, audit, idempotency and rate limiting.

## Boundary

Do not deploy this folder as the production certification service. Do not treat demo fixture results, example DIDs, fixture facility identifiers, HTI values or generated example credentials as authority evidence. Operational release is not certification.
