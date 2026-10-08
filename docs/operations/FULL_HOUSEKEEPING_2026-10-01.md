# Full repository housekeeping — 1 October 2026

This record describes source reconciliation and its validation scope. It is not certification, travel/signing clearance or proof of production connector activation.

## Start state

- Canonical main freshly fetched: `1cc9b338a28e4d7ddf4e7b6509bc38dae9396596`; PR #18 and #19 already merged. No open canonical PR at initial inspection.
- Amanah main freshly fetched: `a421baba7cf04eaadab4941c9448a92c9e1efd6f`. Existing PR #20 head: `12215ca27d6076be8f7cc6817ee1f2d57d96acdd`; eight CI jobs passed in run [36780545818](https://github.com/mavericken777/Amanah/actions/runs/36780545818), with four unresolved review findings.
- All remote branch refs were inventoried. Historical branches are preserved; the requirements branch `setup/china-trip-project` is retained. Historical/unmerged branch refs are retained for lineage; no branch deletion was attempted.
- Ruleset collection read-back returned empty arrays for both repositories. Administration is not exposed by the connected integration, so protection remains an explicitly owned account gate.
- Existing Pages source/CI configuration inspected. The live duplicate `ghscl-site` function was still version 2; redirect source is included in this release and requires deployment after merge.

## Canonical corrections and final binding

Canonical PR [#20](https://github.com/mavericken777/GlobalHalalDigitalTrust/pull/20) merged to **`14456e99937d6f11d63bd041dcffdb903d12594f`** after exact-head reference-runtime, integrity, gateway and OPA CI passed (runs 36784130046, 36784130092, 36784129919; additional push integrity 36784127000).

| Canonical file | Correction |
| --- | --- |
| `05_PLATINUM_REAL_TIME_MONITORING/PLATINUM_FULL_STACK_ARCHITECTURE.md` | Direct JAKIM API diagram; internal adapter distinguished from an external intermediary; existing security controls preserved. |
| `master-standards-stack/IQ300_AHTE_PLATFORM_README.md` | China → GCC direct; Malaysian governance/assurance plane; shipment workflow NOT-INSTANTIATED. |
| `master-standards-stack/CHINA_EXECUTION_PACK/02_RULE_PRECEDENCE_ENGINE.md` | Jurisdiction precedence distinguished from physical transit legs. |
| `master-standards-stack/CHINA_EXECUTION_PACK/03_shipment_workflow_EVENT_CATALOGUE.md` | Explicit internal Direct JAKIM API adapter and mandate-scoped authority interfaces. |

Amanah and public provenance bind to that canonical main. All 43 mirror file byte sequences were verified against that commit, together with stored SHA-256/Git blob hashes. No frozen path changed. Remaining NurAI/gateway/old-route mentions in canonical current sources prohibit or supersede the old architecture; historical/frozen integrity evidence remains preserved.

## Review findings closed in source

- Pages publishing requires a successful `push` from this repository's `main`, or manual dispatch on `main`; fork/PR triggers cannot enter the privileged job. Release script independently confirms current main and all eight CI checks.
- Deployment verification compares every generated public HTML page, including `404.html`, against exact built bytes. HTTP 404 for that file is accepted only with matching content. A regression proves corrupted 404 content fails.
- Login redirects preserve protected query strings; return-path validation still rejects off-origin/backslash/control-character escapes. Browser validation includes saved searches and filtered shipment URLs.
- Original delivery vertical slice, implementation sequence, requirements-branch preservation and security controls are consolidated in [DELIVERY_PLAN](DELIVERY_PLAN.md).

## Schema and database scope

No schema or migration changes in this housekeeping PR. Existing complete migration replay/RLS tests remain enforced. Live read-back on 1 October Malaysia time: Amanah ACTIVE_HEALTHY / PostgreSQL 17.11; 106/106 public tables have RLS; zero auth users, shipments and authority decisions. Migration lineage and active Edge Functions were read back.

Four advisor warnings describe intentionally callable authenticated SECURITY DEFINER RPCs; the repository functions enforce auth.uid(), tenant membership, elevated roles/actor constraints and bounded rate limits as appropriate. No warning was silently counted as a closed production security assessment. [Advisor explanation](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable).

## Validation and release evidence

Local checks after review fixes: deterministic npm install, website generation/lint/link checks, 94 Node tests (including SQL migration replay/RLS and deployed-artifact regressions), typecheck and Next production build passed. Canonical strict integrity, local links and five trip-control regressions passed. Website generation is idempotent. Dependency audit reports zero known vulnerabilities. The four authenticated security-definer wrappers were read back live: anonymous EXECUTE is denied; empty search_path and authentication/tenant/role/actor/rate-limit guards match source.

The release remains subject to **all eight exact-head CI jobs**, unresolved-thread read-back and main verification. Pages publishes only after main CI passes and records exact artifact read-back in its workflow. These dynamic results must be read from [Amanah PR #20](https://github.com/mavericken777/Amanah/pull/20) and its linked Actions runs; this source file cannot contain its own eventual merge SHA without creating a different commit.

## External and product scope

[STATUS](STATUS.md), [PENDING](PENDING.md), [RELEASE_CHECKLIST](RELEASE_CHECKLIST.md) and [external operations runbook](EXTERNAL_GATES_RUNBOOK_2026-10-01.md) control current evidence and deployment gates. Real authority/partner/lab/customs/GCC/finance credentials, contracts and decisions remain external/source-locked. Production authenticated UAT, hosting authorization and branch protection remain account gates. shipment workflow remains NOT-INSTANTIATED.

This housekeeping record closes the listed source/provenance/review defects; it does not promote reference code into production, certify external operations, or claim every optional future product enhancement is complete. Original requirements and acceptance scopes remain preserved in delivery/requirements documentation.

## Exact Amanah change inventory

Compared with start main `a421baba7cf04eaadab4941c9448a92c9e1efd6f`; this includes the resumed PR's earlier source changes and current review closure. Generated Command Center/Finance pages are reproduced by CI, not manually published separately.

## Archived evidence

| Change | Path | Reason / replacement |
| --- | --- | --- |
| R094 | `docs/archive/AHTE_AZ_ENGINEERING_CLOSURE.md` | `docs/ahte/AHTE_AZ_ENGINEERING_CLOSURE.md` → `docs/archive/AHTE_AZ_ENGINEERING_CLOSURE.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| R078 | `docs/archive/CHANGELOG_2026-09-30.md` | `docs/operations/CHANGELOG_2026-09-30.md` → `docs/archive/CHANGELOG_2026-09-30.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| A | `docs/archive/CLAIMS_AND_GATES_2026-09-30.json` | Historical audit evidence, original findings and source commit preserved; current controllers explicitly linked. |
| R085 | `docs/archive/CONTROLLED_SOURCE_ARTIFACT_MANIFEST.md` | `docs/ahte/CONTROLLED_SOURCE_ARTIFACT_MANIFEST.md` → `docs/archive/CONTROLLED_SOURCE_ARTIFACT_MANIFEST.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| R095 | `docs/archive/END_TO_END_COMPLETION_2026-09-30.md` | `docs/operations/END_TO_END_COMPLETION_2026-09-30.md` → `docs/archive/END_TO_END_COMPLETION_2026-09-30.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| R096 | `docs/archive/GHDT_SYNC_2026-10-01.md` | `docs/operations/GHDT_SYNC_2026-10-01.md` → `docs/archive/GHDT_SYNC_2026-10-01.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| A | `docs/archive/README.md` | Historical audit evidence, original findings and source commit preserved; current controllers explicitly linked. |
| R093 | `docs/archive/RECONCILIATION_CHECKPOINT_2026-09-30.md` | `docs/operations/RECONCILIATION_CHECKPOINT_2026-09-30.md` → `docs/archive/RECONCILIATION_CHECKPOINT_2026-09-30.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| A | `docs/archive/RECONCILIATION_INVENTORY_2026-09-30.json` | Historical audit evidence, original findings and source commit preserved; current controllers explicitly linked. |
| R095 | `docs/archive/RECONCILIATION_LIVE_VERIFICATION_2026-09-30.md` | `docs/operations/RECONCILIATION_LIVE_VERIFICATION_2026-09-30.md` → `docs/archive/RECONCILIATION_LIVE_VERIFICATION_2026-09-30.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| R094 | `docs/archive/RECONCILIATION_RELEASE_V1_2026-09-30.md` | `docs/operations/RECONCILIATION_RELEASE_V1_2026-09-30.md` → `docs/archive/RECONCILIATION_RELEASE_V1_2026-09-30.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| R086 | `docs/archive/VERIFICATION_2026-09-30.md` | `ghscl-website/VERIFICATION_2026-09-30.md` → `docs/archive/VERIFICATION_2026-09-30.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| A | `docs/archive/WEBSITE_REBUILD_INVENTORY_2026-09-30.json` | Historical audit evidence, original findings and source commit preserved; current controllers explicitly linked. |
| R095 | `docs/archive/WEBSITE_REBUILD_REVIEW_2026-09-30.md` | `docs/operations/WEBSITE_REBUILD_REVIEW_2026-09-30.md` → `docs/archive/WEBSITE_REBUILD_REVIEW_2026-09-30.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |
| R090 | `docs/archive/WEBSITE_REBUILD_REVIEW_2026-10-01.md` | `docs/operations/WEBSITE_REBUILD_REVIEW_2026-10-01.md` → `docs/archive/WEBSITE_REBUILD_REVIEW_2026-10-01.md`; original audit content/date/commit retained with HISTORICAL / SUPERSEDED / NON-CONTROLLING status. Current source/status/pending controls supersede the report. |

## Deleted or consolidated artifacts

| Change | Path | Reason / replacement |
| --- | --- | --- |
| D | `docs/DELIVERY_PLAN.md` | docs/operations/DELIVERY_PLAN.md — full delivery intent retained; historical implementation branch is labelled. |
| D | `docs/RELEASE_CHECKLIST.md` | docs/operations/RELEASE_CHECKLIST.md — release/security/operations controls consolidated. |
| D | `docs/ahte/BRANCH_SYNC_2026-09-30.md` | docs/ahte/SOURCE_BINDING.md — current main supersedes branch note. |
| D | `docs/architecture/SECURITY_MODEL.md` | docs/operations/SECURITY_MODEL.md — authorization and original security intent consolidated. |
| D | `docs/operations/.keep` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/AUTHORITY_BOUNDARY.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/BRANCH.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/CANONICAL_PATH.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/CI_REQUIRED.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/CLAIMS_AND_GATES_2026-09-30.json` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/DO_NOT_FAKE.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/FINAL_NOTE.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/MAINLINE_SYNC_NOTE_2026-10-01.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/MERGE_TARGET.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/PRODUCTION_RUNBOOK.md` | docs/operations/DEPLOYMENT_RUNBOOK.md — environment, incident and recovery requirements retained. |
| D | `docs/operations/README-HARDENING.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/RECONCILIATION_INVENTORY_2026-09-30.json` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/REVIEW_SCOPE.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/SNAPSHOT.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/VERIFY.md` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `docs/operations/WEBSITE_REBUILD_INVENTORY_2026-09-30.json` | Redundant operations/branch stub consolidated into current STATUS, PENDING, INDEX, source binding, security and release controls; Git history preserves lineage. |
| D | `ghscl-website/script.js` | ghscl-website/flagship-v3.js and hybrid-v5.js — unused obsolete script removed. |

## Updated and added artifacts

| Change | Path | Reason / replacement |
| --- | --- | --- |
| M | `.github/workflows/ci.yml` | Complete exact-head CI; trusted-main-only Pages publishing and exact deployed artifact verification. |
| M | `.github/workflows/ghscl-pages.yml` | Complete exact-head CI; trusted-main-only Pages publishing and exact deployed artifact verification. |
| M | `.gitignore` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `CHANGELOG.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `README.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| A | `REPO_INDEX.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `app/auth/callback/route.ts` | Protected route/login return handling; off-origin/backslash/control-character escapes blocked; queries retained. |
| M | `app/login/page.tsx` | Protected route/login return handling; off-origin/backslash/control-character escapes blocked; queries retained. |
| M | `config/canonical-mirror-manifest.json` | Single canonical source binding; 43 mirrors verified by SHA-256 and Git blob identity; freeze unchanged. |
| M | `config/current-target-architecture-2026-09-30.json` | Single canonical source binding; 43 mirrors verified by SHA-256 and Git blob identity; freeze unchanged. |
| A | `config/source-binding.json` | Single canonical source binding; 43 mirrors verified by SHA-256 and Git blob identity; freeze unchanged. |
| M | `config/target-extension-schemas-2026-09-30.json` | Single canonical source binding; 43 mirrors verified by SHA-256 and Git blob identity; freeze unchanged. |
| M | `docs/ahte/AHTE_PLATFORM_ARCHITECTURE.md` | Single canonical source binding; 43 mirrors verified by SHA-256 and Git blob identity; freeze unchanged. |
| M | `docs/ahte/SOURCE_BINDING.md` | Single canonical source binding; 43 mirrors verified by SHA-256 and Git blob identity; freeze unchanged. |
| M | `docs/api/AHTE_ASSURANCE_API.md` | Single canonical source binding; 43 mirrors verified by SHA-256 and Git blob identity; freeze unchanged. |
| M | `docs/operations/DEPLOYMENT_RUNBOOK.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `docs/operations/EXTERNAL_GATES_RUNBOOK_2026-10-01.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `docs/operations/INDEX.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `docs/operations/PENDING.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `docs/operations/README.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `docs/operations/RELEASE_CHECKLIST.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `docs/operations/SECURITY_MODEL.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `docs/operations/STATUS.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `ghscl-website/BRAND_AND_MEDIA.md` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/README.md` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/china-gcc.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/contact.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/digital-trust.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/ecosystem.en.json` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/ecosystem.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/how-it-works.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/index.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/manufacturers.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/partners.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/sitemap.xml` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/smart-audit.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/source-manifest.json` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/traceability.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `ghscl-website/verify.html` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| M | `lib/integrations/contracts.ts` | Isolated simulated development connector with scope/environment/actor validation and idempotent conflict detection; no external transaction decisions. |
| A | `lib/safe-redirect.ts` | Protected route/login return handling; off-origin/backslash/control-character escapes blocked; queries retained. |
| M | `proxy.ts` | Protected route/login return handling; off-origin/backslash/control-character escapes blocked; queries retained. |
| M | `scripts/check-ecosystem-site.mjs` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| A | `scripts/check-repository-links.mjs` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `scripts/refresh-ecosystem-shell.mjs` | Current generated website/source provenance and validation; canonical source links bound to 14456e99937d6f11d63bd041dcffdb903d12594f. |
| A | `scripts/verify-pages-deployment.mjs` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| A | `scripts/verify-release-head.mjs` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| M | `supabase/functions/ghscl-site/index.ts` | Retire duplicate microsite through fixed redirect to current Pages site; deployed function must be read back after merge. |
| A | `tests/auth-redirect.test.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |
| A | `tests/browser-smoke.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |
| M | `tests/current-target-architecture.test.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |
| M | `tests/ecosystem-site.test.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |
| M | `tests/ghscl-site.test.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |
| M | `tests/integration-boundaries.test.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |
| A | `tests/legacy-site.test.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |
| A | `tests/source-provenance.test.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |
| A | `docs/operations/DELIVERY_PLAN.md` | Consolidated current discovery, governance or operations controls; historical audit claims remain non-controlling. |
| A | `tests/deployment-guards.test.mjs` | Semantic provenance, connector, authentication, deployment or browser regression coverage. |

The inventory record itself is added at `docs/operations/FULL_HOUSEKEEPING_2026-10-01.md`. No user evidence, frozen standards or live database table is deleted.
