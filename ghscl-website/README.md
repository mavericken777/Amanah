# Global Halal Digital Trust Ecosystem website

Static stakeholder-facing website for Global Halal Supply Chain Ltd HK (GHSCL).

Proposal V6 adds ten substantive public pages to the cinematic homepage: ecosystem, how it works, AHTE digital trust, traceability, smart audit, China → GCC, partners, manufacturers, verification and contact. The Next.js operational portal remains separate and unchanged.

English content is structured in `ecosystem.en.json`; `scripts/build-ecosystem-site.mjs` generates the public pages, shared navigation/footer and SEO artifacts. Run `npm run web:build` after changing the dictionary. Run `npm run web:lint` and `npm test` before publishing. Chinese, Malay and Arabic are planned, not delivered translations. Logical CSS properties and RTL overrides prepare the shared page system for Arabic.

Interactive architecture examples are isolated in `fixtures/architecture-demo.json` (`environment: demo`, `simulated: true`). Smart audit is a walkthrough, not connected hardware or AI inference. Manufacturer readiness and contact tools produce local briefs without uploading information. Contact delivery and authenticated manufacturer application submission remain explicit configuration gates.

Public verification calls the existing `public-verify` service using an issuer-authorized token. It never retrieves private factory payloads or exposes service-role credentials. A successful token response is not independent signature verification or formal certification. The portal’s role authorization remains required for deeper records.

`source-manifest.json` records source paths, pinned URLs, reference hashes and review time. Source/mandate conflicts and external activation gates are recorded in `docs/operations/CLAIMS_AND_GATES_2026-09-30.json`. Internal connector interfaces in `lib/integrations/contracts.ts` define replaceable ports; unconfigured transports reject exchange rather than fabricate authority receipts.

The hybrid flagship presentation (proposal V5, 2026-09-30) combines a vector identity, native WebGL globe and schematic corridors, eight narrative chapters, four original AI concept renders, a 24-second editorial motion study in MP4/WebM, opt-in Web Audio and a stakeholder playback panel. See [brand and media provenance](BRAND_AND_MEDIA.md) for the boundaries, asset prompts and open cinematic production gate.

Canonical source: GlobalHalalDigitalTrust@3d5cc29fabf7c3ed0da20cd938219fed83e74830. Shipment 001 remains a pilot concept; this site does not assert operating shipments, live telemetry, sovereign deployment, authority outcomes or certification.

## Source boundary

Public copy is intentionally limited to facts represented in the canonical GlobalHalalDigitalTrust project repository. Corporate contact details, directors, registered address and other company particulars are not invented.

## Temporary hosting

GitHub Pages is enabled for this public Amanah repository. The deployment workflow at `.github/workflows/ghscl-pages.yml` publishes the contents of this folder as the temporary GHSCL stakeholder website.

Expected public URL:

`https://mavericken777.github.io/Amanah/`

The repository remains the deployment source; updates under `ghscl-website/**` trigger the Pages workflow on `main`.
