# GHSCL website identity and media

## Identity

- Company: **GLOBAL HALAL SUPPLY CHAIN LTD**.
- Platform: **AMANAH · GLOBAL HALAL DIGITAL TRUST**.
- Chinese identity: 全球清真供應鏈有限公司.
- Arabic identity: سلسلة التوريد العالمية للحلال.

Use the supplied gold-and-black shield artwork as the company logo in a restrained brand-lockup size. Pair it with the exact company name. Keep the homepage hero focused on the information-bearing supply-chain scene; do not place an oversized shield or ornamental centerpiece.

## Visual system

- Obsidian black, metallic gold, and warm ivory.
- Arial, Helvetica, or a similar neutral sans-serif throughout.
- Clear hierarchy, restrained surfaces, and diagrams tied to product, evidence, custody, and process information.
- Process animation advances through the 20-stage journey and responds to user selection. Reduced-motion settings retain readable static information.
- Sound starts only by user action.

## Public media

Site assets are concept illustrations unless identified as actual records. Illustrative scenes must not be presented as photographs of real facilities, live authority systems, or current transactions. Do not publish personal or transaction identifiers in media captions or fixtures.

### Cinematic process sequence

The public journey uses distinct, optimized photographic scenes for the chapter views and dedicated stage imagery for the interactive journey. The supplied `scene-origin`, `scene-market`, `scene-assurance`, and `scene-logistics` references are retained. Additional photographs supply the ingredient, port, document-review, consumer and transit views; dedicated photographs keep the interactive journey distinct from the chapters below. All images live in `platinum-site/public/assets/`; the production build promotes them into the public site and Vercel trust journey.

| Scene | Source | Journey use |
| --- | --- | --- |
| `scene-origin.avif` | Supplied | Producer, facility, production |
| `scene-onboarding.avif` | Generated | Organisation, product/SKU, suppliers and materials |
| `scene-assurance.avif` | Supplied | Applicable requirements, human audit/CAPA, authority interface |
| `scene-lab.avif` | Generated | Sample, laboratory method/QC, signed evidence |
| `scene-warehouse.avif` | Generated | Origin and destination controlled storage |
| `scene-logistics.avif` | Supplied | Sinotrans custody, vehicle/container, ports and transit |
| `scene-market.avif` | Supplied | GCC receiving, distribution, retail and consumer verification |
| `scene-command-center.avif` | Generated | Continuous monitoring, exceptions and response |
| `journey-panorama.avif` | Generated single-scene documentary photograph | Corridor overview and landing hero |

The generated-scene creative brief is photorealistic 16:9 documentary imagery: human-scale workplaces, dark steel and warm practical light, restrained gold evidence lines, and legible actions at each handoff. Onboarding shows Chinese food-factory managers reviewing product and supplier records. Laboratory shows technical sample handling and a human reviewer. Warehouse shows accountable receiving, segregated pallets and inventory handling. Command Center shows operators reviewing a left-to-right evidence chain and exception signals. The prompts exclude readable invented data, company or authority seals, and claims of live system connections.

The website animates these still scenes with restrained camera drift, stage-synchronized crossfades and an evidence trace. The full 20-stage journey advances automatically or by the visitor's controls; selecting a stage changes its photograph immediately. Reduced-motion preferences stop decorative motion. These are animated concept scenes, not footage of real people or transactions.

## Product narrative

Show the complete China → GCC direct product journey: origin, company and facility onboarding, product and supplier records, standards applicability, laboratory workflow, audit, production, Sinotrans custody and logistics, origin and destination ports, GCC receiving, distribution, retail verification, and Command Center monitoring. Show the direct integration path AHTE ⇄ Direct JAKIM API ⇄ JAKIM.

Use plain descriptions of the platform's evidence, workflow, and integration capabilities. Link certification and border status to their issuing records. Do not describe the platform as the issuer of those outcomes.

The corridor visual is illustrative and does not represent a specific transaction. Lab result context includes the statement `NOT_DETECTED ≠ HALAL`.

Company shield: transparent outer background, fitted without cropping. Favicon: 64 × 64 PNG, proportionate shield with a transparent safe margin. Photographs: AVIF, original composition retained, with restrained camera movement and reduced-motion support. Each operating dashboard stage has its own image. New scenes were produced by the built-in image-generation tool from photorealistic documentary briefs for laboratory sampling, smart-glasses audit, warehouse scanning, truck custody, GCC receiving and consumer provenance.

The landing hero replaces the earlier composite with one photorealistic scene: a Chinese factory quality professional wearing smart glasses, scanning a sealed product carton at a working dispatch conveyor. The brief excludes collage, holograms and futuristic glow; subject, scanner and carton stay inside the responsive camera window.
