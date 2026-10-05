# Controlling website delivery — 5 October 2026

Controlling source: `Pasted markdown.md`, recovered as the latest attachment from ChatGPT conversation `6abedbf1-4d3c-83ec-aa9e-9c1f0ad2708f`. The 84-section creative/product/interaction brief is read in full. The user's direct corrections supersede its crest and font proposals: no oversized homepage shield or replacement emblem; Arial / Helvetica / sans-serif throughout.

| Domain | Controller |
| --- | --- |
| Homepage narrative and chapter hierarchy | `scripts/build-trust-journey.mjs` |
| Single product identity and interactive state | `ghscl-website/journey.js` |
| Black/gold design, mobile, focus and reduced motion | `ghscl-website/journey.css` |
| Other public routes | `ghscl-website/ecosystem.en.json`, generated routes and existing Platinum secondary routes |
| Neutral typography across public routes | `ghscl-website/neutral-font.css`; neutral application and Platinum CSS |
| Vercel shared public experience | `scripts/copy-trust-experience.mjs`, generated `public/trust-journey/` |
| Release | CI → exact-head release verification → Pages promotion → controlling-brief homepage build |
| Behavioral acceptance | `tests/journey-browser.mjs` at 375 / 768 / 1024 / 1440 pixels |
| Lighthouse | `lighthouserc.journey.cjs`, `lighthouserc.journey-mobile.cjs` |

## Requirements mapping

| Brief scope | Implemented experience |
| --- | --- |
| §§6–11, 42–43, 62–65 | One product, thirteen stages, synchronized passport / event timeline / route / actor / evidence / custody, eight view modes and keyboard-operable scrubber |
| §§12–16 | Fourteen checkpoints in the smart-glasses audit walkthrough, AI guidance, accountable human review and attributable proof-of-audit fields |
| §§17–21 | Ten sample / custody / method / review steps; source-bound requirements and Standards mode |
| §§22–28 | Warehouse zones, custody transfer explorer, Sinotrans reference role, port checkpoints and direct China–GCC route |
| §§29–35 | Five monitoring views, five exception scenarios, HOLD / corrective action / re-verification path, GCC distribution and retail |
| §§36–41 | Consumer provenance, twelve actor roles and seven clickable architecture layers tied to the actual operational model |
| §§44–61 | Documentary chapter hierarchy, informational route hero, progressive disclosure, neutral fonts, semantic controls, mobile layouts, focus and reduced motion |
| §§66–84 | Existing site / repository / deployment inspection, updated regression assumptions, browser / axe / Lighthouse / repository CI gates |

## Authority and source constraints

The immutable `master-standards-stack/verified-2026-09-17/` baseline is unchanged. AHTE ⇄ Direct JAKIM API ⇄ JAKIM. China → GCC direct. AI assists; authorized humans / competent authority decide. Exact normative text remains source-locked when unavailable.

`DEMO-SHIPMENT-001` / `CN-DEMO-24001` is an explicitly illustrative website record. It is not the real pilot. Shipment 001 remains NOT-INSTANTIATED without real execution evidence. No certification, customs release, financing approval, laboratory result, integrity signature or production API response is fabricated.

Named laboratory relationship / accreditation and Sinotrans activation are disclosed at the relevant detail level. External credentials do not remove interface capability. Formal authority, AHTE, operational, customs and finance states remain separate.

## Validation state

Implementation and local behavioral validation complete; exact-head CI, Lighthouse and deployment read-back must pass before release completion is asserted. Deployment URLs and merge SHA are reported only after verification.
