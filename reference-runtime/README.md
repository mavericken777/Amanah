# AHTE Reference Runtime

[PROJECT-REPO: https://github.com/mavericken777/GlobalHalalDigitalTrust — SHA12 b1c0fc63be72 — 2026-09-30]
[TOOL-SPEC UNVERIFIED: reference runtime dependencies — simulation/compatibility only]

This directory preserves the executable reference runtime supplied by the canonical AHTE project repository.

## Important

The canonical runtime is a reference/simulation implementation. It uses fixture identifiers, example authorities/DIDs and in-memory state. It does not constitute a deployed sovereign certification service.

Production Amanah uses the Supabase-backed AHTE control plane and the deployed `assurance` / `public-verify` Edge Functions instead.

## Contents

- gateway: FastAPI gateway, Ed25519 signing, smart-seal codec, FSM and Pydantic models.
- engine: reference 12-state consignment FSM and signed receipt engine.
- policies: OPA/Rego rules and fixture data.

## Boundary

Do not deploy this folder as the production certification service. Do not treat demo fixture results, example DIDs, fixture facility identifiers, HTI values or generated example credentials as authority evidence.
