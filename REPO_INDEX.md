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


## 2 October canonical deliverables

- [Canonical architecture](docs/architecture/PLATFORM_ARCHITECTURE.md)
- [Canonical data model](docs/architecture/DATA_MODEL.md)
- [69-section execution register](docs/operations/AMANAH_69_EXECUTION_REGISTER_2026-10-02.md)
- [Refreshed truth baseline](docs/operations/REFRESHED_TRUTH_BASELINE_2026-10-02.md)
- [Master deliverable index](docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-02.json)
- Manufacturer onboarding: `app/(protected)/onboarding/page.tsx`
- [API UAT pack](docs/api/AMANAH_API_UAT_PACK_2026-10-02.md)
- [Platinum hardware RFQ BOM](docs/hardware/PLATINUM_HARDWARE_MASTER_BOM_2026-10-02.json)
- [Corporate profile master](docs/corporate/GHSCL_CORPORATE_PROFILE_2026.md)
- [Master infographic suite](docs/media/MASTER_INFOGRAPHIC_SUITE_2026.md)
- [Master cinematic video control](docs/media/MASTER_CINEMATIC_VIDEO_2026.md)
- [Master voiceover control](docs/media/MASTER_VOICEOVER_EN_2026.md)
- [Voiceover asset manifest](docs/media/VOICEOVER_ASSET_MANIFEST_2026-10-03.json)
- Public corporate profile: `ghscl-website/corporate-profile.html`
- Public infographic gallery: `ghscl-website/visuals.html`

## 3 October batch 51–55

- [Mandarin master adaptation](docs/localization/MANDARIN_MASTER_ADAPTATION_2026-10-03.md)
- Mandarin public landing: `ghscl-website/zh-Hans.html`
- [Master legal / contractual pack](docs/legal/AMANAH_MASTER_LEGAL_CONTRACTUAL_PACK_2026-10-03.md)
- [Commercial model / unit economics](docs/commercial/AMANAH_COMMERCIAL_MODEL_UNIT_ECONOMICS_2026-10-03.md)
- [KPI / SLA framework](docs/operations/AMANAH_KPI_SLA_FRAMEWORK_2026-10-03.md)
- [Training academy](docs/training/AMANAH_TRAINING_ACADEMY_2026-10-03.md)


## 3 October batch 56–60

- [SOP library](docs/sop/AMANAH_SOP_LIBRARY_MASTER_2026-10-03.md)
- [China Mission executive pack](docs/mission/CHINA_MISSION_EXECUTIVE_PACK_2026-10-03.md)
- [China Mission meeting brief book](docs/mission/CHINA_MISSION_MEETING_BRIEF_BOOK_2026-10-03.md)
- [Objection-handling book](docs/mission/OBJECTION_HANDLING_BOOK_2026-10-03.md)
- [Cross-consistency QA](docs/operations/CROSS_CONSISTENCY_QA_2026-10-03.md)
- [Batch 56–60 execution audit](docs/operations/AMANAH_69_BATCH_56_60_2026-10-03.md)
