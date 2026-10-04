# Platinum homepage design notes

## Implementation choice

Amanah is already a Next.js application with a source-generated static ecosystem site. GitHub Pages is built from `scripts/build-ecosystem-site.mjs`; Vite is not the source of the published site. The redesign keeps the existing generator and application build intact instead of adding a parallel bundler or a second animation runtime.

## Audit decisions\n\n- **Keep:** the existing visitor headline, trust journey, participant pathways, Amanah/AHTE explanation, global corridor and deeper technical links. These already give the homepage a coherent product story.\n- **Improve:** unify the homepage under an obsidian and warm-gold system, bring the Amanah trust mark into the hero, and add a visible, explorable explanation of how product identity, evidence, review and handoff connect.\n- **Rewrite:** keep the story in stakeholder language and make the boundary between platform coordination and official decisions explicit in the architecture explanation.\n- **Remove:** avoid release-gate language, unsupported metrics, fictitious activations and customer or authority claims.\n\n## Experience

The homepage uses an obsidian and warm-gold palette, the existing GHSCL brand assets, an inline geometric Amanah shield motif, and the current visitor story. A four-card trust terminal uses native `<details>` disclosures to explain source identity, evidence context, accountable review and custody handoff. Each card works with keyboard and without JavaScript.

The interaction is an illustrative architecture view, not operational status. No laboratory result, live shipment, customer, authority integration, certification, or release outcome is invented. Authority boundaries remain in the plain-language story and deeper architecture pages.

## Motion and performance

The page uses CSS composition and native HTML. No Three.js, GSAP, Lenis, D3, or Motion runtime is added. This keeps the static homepage light and avoids a second animation system; reduced-motion and reduced-transparency preferences are covered in `platinum.css`. The design uses no tracking script or runtime API.

## Validation checklist

- `npm run web:build`
- `npm run web:lint`
- `npm test`
- CI browser smoke: public routes and auth surfaces at 375, 768, 1024 and 1440 CSS pixels; navigation keyboard behavior; horizontal overflow; JavaScript errors; trust-terminal disclosure.
- Capture and inspect Lighthouse output; manually review visual quality, keyboard focus, contrast and motion before any Pages deployment.

A passing CI build does not prove 60fps on a physical mobile device or a Lighthouse score. Those measurements remain empirical checks, not design claims.
