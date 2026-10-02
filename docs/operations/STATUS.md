# Current Amanah implementation status

Global control source binding: `mavericken777/GlobalHalalDigitalTrust@ccc10ca476b3ee07e77f11d0d6901e0b2ec744c5` (2 Oct 2026). Current mutable Amanah implementation state is repository `main`; exact release eligibility is determined from the commit under review and its CI/deployment evidence, not by a hard-coded mutable SHA in this file. Machine binding: [source-binding.json](../../config/source-binding.json). The 17 September verified freeze remains unchanged.

AHTE ⇄ Direct JAKIM API ⇄ JAKIM. China → GCC direct; Malaysia is the governance/assurance/authority-connectivity plane. Shipment 001 is **NOT-INSTANTIATED**. No fixture, architectural illustration or development receipt closes a transaction or authority gate.

## Controlling artifacts

| Domain | Current controller |
| --- | --- |
| Source provenance | [SOURCE_BINDING](../ahte/SOURCE_BINDING.md) and its machine binding |
| Target architecture | [AHTE_PLATFORM_ARCHITECTURE](../ahte/AHTE_PLATFORM_ARCHITECTURE.md) |
| External/source-locked gates | [PENDING](PENDING.md) |
| Authorization | [SECURITY_MODEL](SECURITY_MODEL.md) |
| Release validation | [RELEASE_CHECKLIST](RELEASE_CHECKLIST.md) and exact-head GitHub CI |
| Deployment and recovery | [DEPLOYMENT_RUNBOOK](DEPLOYMENT_RUNBOOK.md) |
| Website source provenance | [source-manifest.json](../../ghscl-website/source-manifest.json) |
| Navigation | [REPO_INDEX](../../REPO_INDEX.md) |

## Implementation and validation

The protected application, public website, SQL migrations, reference runtimes, OPA policies, internal connector envelopes and authority boundaries are implemented in source. Production connectors require authorised contracts/credentials. The isolated development provider accepts explicitly simulated development events and issues only internal, non-authoritative acknowledgements; it cannot instantiate Shipment 001 or supply external results.

Every release must pass TypeScript, Node/schema/migration/RLS tests, Deno Edge Function checks, OPA/reference-runtime checks, Next production build, public link/provenance checks and browser smoke tests at the exact PR head. CI results, not this prose, control release eligibility. Authenticated production UAT requires an authorised deployed workspace and real roles; anonymous browser tests and isolated database policy tests do not replace it.

2 October execution sync: manufacturer onboarding is implemented at `app/(protected)/onboarding/page.tsx`; the live schema normalization migration is represented in `supabase/migrations/20261002010000_canonical_domain_normalization.sql`; application query-contract validation now uses `lib/database.target.types.ts`, which composes the current generated schema with the controlled target extension tables actually used by the application. No production certification/authority/finance decision is created by onboarding.

Live Supabase read-back during this reconciliation: ACTIVE_HEALTHY, PostgreSQL 17.11, 120/120 public tables with RLS, repository migration lineage applied. Four security-definer RPC advisor warnings were reviewed: authentication, tenant membership, elevated role/actor guards and bounded rate limits remain enforced. Low-usage index advisories reflect absent production traffic and do not justify dropping integrity indexes.

Prior dated reports are [HISTORICAL / SUPERSEDED / NON-CONTROLLING](../archive/README.md). They preserve their original evidence and cannot control current readiness, topology or provenance.

The retired `ghscl-site` Edge Function redirects to the current public Pages website. `assurance` and `public-verify` remain separate protected/scoped backend services. Live read-back found zero authentication users, shipments and authority decisions; authenticated production UAT therefore remains an external deployment/identity gate.

## External CI/deployment condition

The current GitHub commit carries Vercel status failures for `amanah` and `amanah-yq9x` with target status `build-rate-limit`. This is an external Vercel capacity/rate-limit condition, not a source-code test result. It must not be represented as a successful production deployment. No code change was made to bypass that external gate.


## 3 October execution sync — Items 56–60

Repository-controlled SOPs, China mission executive pack, stakeholder meeting briefs, objection-handling book and cross-consistency QA are now controlled artifacts. Mission dates/roster/meeting confirmations remain evidence-bound; no working itinerary or discussion is converted into a confirmed external commitment by this status file.


## 3 October execution sync — Items 61–65

Programme-wide red-team, visual QC, document QC and claim verification now have controlling 2026-10-03 reports. The boardroom corporate-profile corrective implementation is merged; the duplicate corrective PR was closed as superseded. The human-readable master deliverable index now provides the stakeholder directory for Items 1–65. External production/authority/partner gates remain in PENDING.md.
