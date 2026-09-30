# Changelog

## 2026-10-01 — GHDT target-architecture synchronization

### Architecture

- Bound current Amanah implementation to `GlobalHalalDigitalTrust@0fab4c64240b569caef947fb2568ccda9d3fa0d3` while preserving the `verified-2026-09-17/` freeze.
- Adopted current target architecture v1.2.0 and the implementation rule: **FULL ARCHITECTURE NOW → REAL CONNECTORS WHEN AVAILABLE → NO REDESIGN REQUIRED.**
- Set China → GCC direct as the controlling physical corridor; Malaysia remains governance/assurance/authority-connectivity unless separately scoped as a physical hop.
- Replaced stale public generic Authority Gateway/NurAI-hop topology with `AHTE ⇄ Direct JAKIM API ⇄ JAKIM`.
- Recorded PHC + JAKIM authorised human certification review workflow while preserving competent-authority/human decision boundaries.
- Added joint 24/7 GHSCL operational + authorised JAKIM authority-side Command Center architecture.
- Added explicit AI/ML Preemptive Strategy Engine alongside predictive/anomaly/fracture/blast-radius functions.
- Integrated China traceability + laboratory architecture including serialization, aggregation, anti-diversion and sample/custody/method/result evidence.
- Elevated Sinotrans to end-to-end warehouse + logistics real-time integration.
- Added explicit origin/GCC port-customs API/trust interface target.
- Added Shariah Financing API / Takaful / approved tokenomics target architecture with separate external decision/legal/Shariah/regulatory states.
- Switched current China execution source paths to canonical uppercase `master-standards-stack/CHINA_EXECUTION_PACK/`; lower-case lineage is retired.

### Platform

- Added `/ahte/command-center` protected operational route and navigation.
- Added `/ahte/shariah-finance` protected operational view.
- Aligned AHTE home, source/authority and Platinum Monitoring pages to the current target architecture.
- Extended connector contracts for direct JAKIM API, laboratory, Sinotrans warehouse/logistics, port/customs and Shariah-finance evidence exchange.
- Added machine-readable current-target architecture and hardened target-extension schemas.
- Added database type overlays for forward target tables without falsifying the historical generated schema snapshot.

### Persistent target objects

Applied Supabase migrations for:

- `ahte_command_center_alerts`
- `ahte_predictions`
- `ahte_preemptive_strategies`
- `ahte_finance_evidence_packets`
- `ahte_connector_states`
- `ahte_financing_cases`
- `ahte_takaful_cases`
- `ahte_tokenized_asset_references`

Applied organization-scoped RLS, audit controls, required realtime publication and foreign-key indexing. Hardened prediction/strategy provenance and finance disclosure constraints before transaction data exists.

Hard non-decision controls include:

- `creates_authority_decision=false`
- `creates_financing_decision=false`
- `creates_takaful_decision=false`
- `is_halal_certification=false`
- `ahte_approves_financing=false`
- `ahte_underwrites_or_decides_claim=false`
- `ahte_is_title_registry=false`
- `tokenization_creates_halal_status=false`

### Supabase live state

- project `lqvyyylrydcpjochknag` remains `ACTIVE_HEALTHY`;
- PostgreSQL verified at `17.11`;
- new target-extension foreign-key indexes applied;
- no real Shipment 001 transaction records fabricated.

### Public website

- Upgraded V7 public architecture to current direct-JAKIM, Command Center, China traceability/lab, Sinotrans warehouse/logistics, port/customs and finance/Takaful/tokenomics target model.
- Added Command Center and Finance/Takaful public pages.
- Made public-site generation idempotent and required build/lint before GitHub Pages deployment.
- Added regression tests against stale generic Authority Gateway and incorrect physical-corridor topology.
- Current source manifest binds to `0fab4c64240b` and canonical uppercase China execution sources.

### Governance

- Historical `3d5cc29...` and `ae3f662...` reconciliation records remain historical and were not rewritten to claim later review.
- Shipment 001 remains `[PILOT]` and uninstantiated until real transaction-native evidence exists.
- No live JAKIM, laboratory, Sinotrans, port/GCC, financing, Takaful or tokenomics connection is fabricated by this release.
- Supabase managed PostgreSQL maintenance gate is closed for this synchronization after live 17.11 verification; normal future maintenance remains operational work.

## 2026-09-29 — Amanah v1

### Released

- Promoted the verified Amanah platform implementation to main.
- Added Next.js 16 App Router, React 19.2 and TypeScript application foundation.
- Added Supabase Auth and PostgreSQL integration.
- Added organization, membership, roles and Row Level Security.
- Added projects, tasks, meetings, documents, decisions, risks, finance and updates.
- Added workflows, approvals, comments, task dependencies and saved views.
- Added audit trail and notification triggers.
- Added private document storage with signed access.
- Added China Trip travel module.
- Added generated Supabase database types.
- Added CI for tests, typecheck and production build.

### Database migrations

- 0001_amanah_core
- 0002_platform_extensions
- 0003_security_storage_performance
- 0004_advisor_cleanup
- 0005_approval_integrity
- 0006_operational_integrity
- 0007_approval_fk_indexes

## 2026-09-29 — Original China Trip workspace

- Project overview.
- Itinerary tracker.
- Team and responsibility tracker.
- Logistics tracker.
- Accommodation tracker.
- Meetings tracker.
- Documents and compliance tracker.
- Budget and expense tracker.
- Risk register.
- Action item tracker.
- Decision log.
- Project update log.
- Team guide.
- Security guidance.
- Repository ignore rules.
- Pull request checklist.
