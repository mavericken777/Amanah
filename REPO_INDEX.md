# Amanah repository index

| Domain | Controlling artifact / implementation |
| --- | --- |
| Current state | [STATUS](docs/operations/STATUS.md) |
| External gates | [PENDING](docs/operations/PENDING.md) |
| Canonical binding | [SOURCE_BINDING](docs/ahte/SOURCE_BINDING.md), [machine binding](config/source-binding.json) |
| Architecture | [AHTE platform](docs/ahte/AHTE_PLATFORM_ARCHITECTURE.md), [current target registry](config/current-target-architecture-2026-09-30.json) |
| Canonical mirrors | [checksum manifest](config/canonical-mirror-manifest.json) |
| Protected application | `app/(protected)/`, `lib/`, `proxy.ts` |
| Website | [website source](ghscl-website/ecosystem.en.json), [provenance](ghscl-website/source-manifest.json) |
| Database | `supabase/migrations/` (applied history), `lib/database.types.ts` (base) + `lib/database.current.types.ts` (forward extensions) + `lib/database.target.types.ts` (application view) |
| Integration | [internal contracts](lib/integrations/contracts.ts); canonical runtime mirrors under `reference-runtime/` |
| CI / delivery | [.github/workflows/ci.yml](.github/workflows/ci.yml), [.github/workflows/ghscl-pages.yml](.github/workflows/ghscl-pages.yml) |
| Security | [authorization model](docs/operations/SECURITY_MODEL.md) |
| Release | [checklist](docs/operations/RELEASE_CHECKLIST.md), [runbook](docs/operations/DEPLOYMENT_RUNBOOK.md) |
| Historical audit | [archive](docs/archive/README.md) |

AHTE ⇄ Direct JAKIM API ⇄ JAKIM. China → GCC direct. Shipment 001 remains NOT-INSTANTIATED. Full architecture now; real connectors when available; no redesign required.
