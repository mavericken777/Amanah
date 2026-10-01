# Amanah visual design

This presentation update applies to the operational platform and the partner-facing GHSCL website. It is based on Amanah main `d31562fd04be6833d1f09ffe7ae929ce8a118e7f`, with canonical authority architecture verified against GlobalHalalDigitalTrust main `14456e99937d6f11d63bd041dcffdb903d12594f`.

## Design system

- Emerald, warm ivory and pale sage establish the shared palette. Public pages use a darker expression; operational screens preserve readable, compact working surfaces.
- Manrope is requested explicitly from Google Fonts. Bahnschrift and Segoe UI provide local fallbacks when external fonts are unavailable.
- Shared app styling covers existing forms, tables, metric cards, status chips, loading, error and empty states without replacing domain data.
- Sign-in and sign-up pair an editorial introduction with the existing authentication forms.
- Platform navigation is injected from configuration and marks the closest configured parent for nested routes. Mobile navigation uses a native modal dialog for focus containment and Escape behavior.
- Public pages retain native details navigation, keyboard focus indicators, demo labels, issuer-authorized verification and local-only preparation forms.
- Custom motion uses transform and opacity, viewport observation and reduced-motion support. Cards avoid backdrop blur; fixed navigation retains it.

## Implementation

App styles: `app/design.css`; shared components: `components/platform-shell.tsx`, `components/auth-story.tsx`, `components/page-motion.tsx`.

Public styles and enhancements: `ghscl-website/premium.css` and `ghscl-website/premium.js`. The ecosystem build script includes these assets in every generated page and the flagship homepage, so regenerating pages retains the design. The not-found page also shares the presentation.

## Controls

The controlling authority topology remains AHTE / Direct JAKIM API / JAKIM. The physical corridor remains China to GCC direct. Malaysia retains its governance, assurance and authority-connectivity role. The verified standards freeze is unchanged.

This update changes presentation and navigation only. It introduces no database migration, authorization exception, audit-state mutation, connector activation, certification or production operational claim.

## Verification

Run `npm run web:build`, `npm run web:lint`, `npm run typecheck`, `npm test` and `npm run build`. Run the existing `tests/browser-smoke.mjs` against local public and application servers to verify desktop/mobile pages, public interactions, protected-route redirects and anonymous API guards. Authenticated operational screens require an authorized workspace session for live-data acceptance testing.

Review closure adds navigation regressions for nested routes, segment boundaries and alternative module configurations. Browser checks also enforce readable canonical source-panel contrast and validate authentication layout at desktop and mobile sizes. Cinematic film/progress values update continuously through animation frames while the section is visible; unchanged scroll positions perform no layout reads. Entry animation starts only when the viewport observer marks an element as entered.
