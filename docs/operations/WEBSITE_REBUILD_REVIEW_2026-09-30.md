# Global Halal Digital Trust website rebuild — V6 proposal

Boundary check: derived from GlobalHalalDigitalTrust@3d5cc29fabf7c3ed0da20cd938219fed83e74830 and the user’s 2026-09-30 website directive. Presentation and internal connector ports are post-freeze proposals; no frozen artifact or normative text is changed.

## Delivery structure

The public website remains static HTML/CSS/JavaScript on GitHub Pages, beside the retained Next.js operational portal. Ten substantive pages supplement the cinematic homepage. Shared content, navigation, footer, card/flow components and SEO generation use `ghscl-website/ecosystem.en.json` and `scripts/build-ecosystem-site.mjs`. The original WebGL globe, eight chapters, film, opt-in sound, renders, standards catalogue, stakeholder views and fourteen-stage path are preserved.

The pre-restructure inventory records file hashes and KEEP/UPDATE dispositions in `WEBSITE_REBUILD_INVENTORY_2026-09-30.json`. Prior local onboarding/audit sections were retained. Historical assets were not deleted. This is a public-site inventory; it does not close the separate all-repository semantic audit.

## Acceptance mapping

| Required architecture | Public implementation |
|---|---|
| PHC, GHSCL HK, AHTE and independent authority | `ecosystem.html`; separate role cards and authority gateway diagram |
| PHC/JAKIM Mufti/scholar human participation | Proposed institutional workflow with explicit mandate conflict; no certification power inferred |
| JAKIM API / Authority Gateway | `ecosystem.html#authority`, `digital-trust.html#connectors`; internal typed AuthorityGateway port; official transport unconfigured |
| Complete standards/applicability | Homepage seventeen-instrument catalogue; `how-it-works.html#standards`; MPPHM/MHMS/Meat & Poultry/circular/destination architecture |
| Manufacturer identity, facilities, SKU/BOM, material, suppliers, origin and systems | `manufacturers.html`; ten-area interactive readiness checklist and downloadable local preparation brief |
| Raw-material origin / sample / lab / authenticated evidence | `how-it-works.html#origin`, `#lab`; LabConnector/LabGateway ports with custody and scope-reference checks |
| Smart glasses, device/auditor identity, AI assist, evidence, HCP/SCCP | `smart-audit.html`; simulated seven-stage HUD/evidence walkthrough and complete session/device/offline specification |
| Findings, CAR/CAPA, re-verification | Audit/manufacturer workflows; evidence references; human assessment preserved |
| Approval/disapproval / formal certification | `ecosystem.html#human`, `digital-trust.html#state`; external authority evidence and certification state remain distinct |
| Integrity / append-only supersession | `digital-trust.html#integrity`; SHA-256 source-byte IntegrityService; no claim that hashing verifies truth or certification |
| Digital twins / evidence graph / trust graph | `digital-trust.html`; sixteen selectable architecture nodes with relationship, evidence obligation, gate, integrity and timestamp-disclosure fields |
| Event architecture / continuous trust monitoring | `digital-trust.html#monitoring`; retained simulated Platinum console; explicit exception/HOLD/re-verification responses |
| Four synchronized chains | `traceability.html`; interactive physical, identity/custody, evidence, authority/trust explorer |
| Logistics / Sinotrans / warehouse / container / seal / port | Traceability/corridor/partners pages and LogisticsConnector/LogisticsGateway ports |
| China / GCC / importer / receiving / retail | `china-gcc.html`, `traceability.html`; Shipment 001 explicitly pilot-only |
| Verification / selective disclosure | `verify.html`; existing issuer-token public service; loading, unknown/expired, timeout/unavailable and successful authorized-field rendering |
| Role-based transparency / data sovereignty / security | Role-specific content and federated minimal exchange; existing portal auth/RLS retained; public CSP, no-referrer, safe text rendering and no client secret |
| Contact / conversion | Manufacturer preparation and local enquiry brief; no fictional delivery endpoint/contact address |
| Localization | English dictionary and planned zh-Hans/ms/ar; logical CSS properties/RTL overrides. Translations and locale routing are not shipped |
| SEO / mobile / accessibility | Unique headings, canonical/OG/Twitter/JSON-LD, sitemap/robots, responsive flows, semantic details menu, labels, focus, live regions and reduced-motion CSS |

## Observed validation

- Public syntax/content check passes; TypeScript passes.
- Repository tests cover generated links/assets/fragments, source binding, demo separation, generator repeatability, connector authorization/isolation and source-byte integrity.
- Next.js production build compiles and generates all 52 existing portal pages.
- All ten new public pages checked in the browser at 390 × 844: no horizontal overflow and no failed loaded images.
- Manufacturer checklist changes from zero to one prepared area without uploading records.
- Smart-audit walkthrough advances from assignment through scan and capture; state reflects the selected simulated stage.
- Tablet 768px trust graph selects Lab and shows scope/recognition gates; no overflow.
- Four-chain explorer selects Evidence and shows findings, corrective action and re-verification.
- Menu opens and Escape closes it. Public unknown test token receives the expected no-current-disclosure response from the existing service.
- Desktop homepage retains rendered globe and source boundaries. CSP and generated-page changes receive a final regression check before publishing.

No genuine positive disclosure token, operator session, authority API, laboratory system, wearable, live shipment or completed pilot was available for operational acceptance. Reduced-motion and no-JavaScript behavior are inspected in source; no OS-preference emulation or full WCAG certification is claimed. Automated Core Web Vitals/contrast profiling is not claimed.

## Production activation boundaries

Typed internal authority/lab/logistics/audit envelopes are adapter contracts, not official external API schemas. Gateway checks cover organization/actor/environment/scope and physical/source bindings; signature trust, official mandate, credentials, external schema mapping, durable retry/idempotency, telemetry transport and production acceptance remain integration work. Unconfigured connectors reject rather than issue synthetic receipts. The new ports are not wired into existing authority state transitions or database mutations.

Manufacturer/contact briefs are local preparation tools. Authenticated application submission and verified company contact delivery require authorized configuration. The existing scoped verification endpoint is used; positive response display is not independent signature verification. No backend or Supabase migration is introduced in this release.

`CLAIMS_AND_GATES_2026-09-30.json` records PHC mandate, laboratory recognition and source state-vocabulary conflicts without resolving them. The canonical `authority_decided` machine state remains without an onward transition. Certification stays with JAKIM/MAIN/JAIN; GCC destination acceptance stays with competent authorities/importers.

[PILOT: Shipment 001 — China → GCC]. The film remains an editorial motion study over AI concept stills. Full animated photoreal production and real-world photography remain external media gates.

Canonical path: Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release.
