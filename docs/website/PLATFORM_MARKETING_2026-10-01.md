# Platform marketing website

The public homepage and all twelve platform pages now explain the complete
origin-to-market operating model in business language. The ecosystem page
introduces the full suite: manufacturer readiness, standards intelligence,
laboratory evidence, smart audit, digital twins, Command Center, logistics,
authority connectivity, finance/Takaful, verification and the Amanah workspace.

Each page leads with its value to participating organizations, explains the
workflow and offers an entry to the deployed application or a rollout brief.
Technical source references are expandable. Demonstrations remain labelled;
local enquiry/onboarding tools retain their existing behavior.

`ghscl-website/ecosystem.en.json` controls page copy. The generator refreshes
homepage module and page directories on every build, so subsequent generation
preserves the marketing content. The shared palette, media and interaction
runtime remain in place.

Deployment claims distinguish the deployed Amanah application from official
authority activation, live external integrations, real shipment execution and
external financing decisions. AHTE ⇄ Direct JAKIM API ⇄ JAKIM and the China → GCC
direct corridor are preserved, as is the verified standards freeze. No database,
authorization, audit-state or connector-activation changes are introduced.

Validation: public build, link/content lint, 97 Node tests and existing desktop /
mobile browser smoke coverage. Release acceptance also requires the exact-head
repository CI and successful Pages publication.
