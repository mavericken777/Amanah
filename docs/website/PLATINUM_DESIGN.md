# Current public website design

## Brand and presentation

- Identify the company as **Global Halal Supply Chain Ltd** and the platform as Amanah / Global Halal Digital Trust.
- Use the black-and-gold premium palette with Arial, Helvetica or a close neutral sans-serif system font throughout.
- Keep the homepage free of an oversized shield or decorative centerpiece. Show the actual process and the information carried between stages.
- Use restrained motion to explain the end-to-end journey. Each stage must identify its actor, object, evidence and next handoff. Provide pause, restart, keyboard access and reduced-motion behavior.
- Keep diagrams, labels and motion focused on onboarding, applicable requirements, certified premises and SKUs, laboratory evidence, audit, production, custody, destination operations, verification and continuous monitoring.

## Current operating model

The public narrative presents China → GCC direct and AHTE ⇄ Direct JAKIM API ⇄ JAKIM. It explains that the platform continuously monitors evidence, certification status, custody and operational events across the connected journey. AI/ML assists monitoring, prediction, impact analysis and preemptive strategy; JAKIM/JAIN/JAIM, muftis, scholars and authorised halal auditors decide certification award or revocation. PHC and JAKIM work in parallel across Malaysian state and federal governance.

The interface uses source records for external decisions and integrations. It does not present a demonstration event as a real transaction or replace certification, customs, finance or Takaful decision owners.

## Implementation and quality

The published site is generated from `ghscl-website/ecosystem.en.json` by `scripts/build-ecosystem-site.mjs`. The Vite experience in `platinum-site/` supplies the public homepage and journey. The Next.js application at the repository root remains the authenticated Amanah workspace.

Website changes are checked with `npm run web:build`, `npm run web:lint`, `npm test`, typecheck, production build, browser journeys, accessibility and Lighthouse CI.
