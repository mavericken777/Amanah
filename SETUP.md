# Amanah Setup

## What Amanah is

Amanah is the AHTE operational platform for Global Halal Supply Chain Ltd HK. It uses the GlobalHalalDigitalTrust repository as the canonical project architecture/reference source and Supabase as the live application data plane.

## Local development

Requirements:

- Node.js 22+
- npm
- A Supabase project
- The publishable Supabase key for the target environment

Copy .env.example to .env.local and set:

`NEXT_PUBLIC_SUPABASE_URL=https://lqvyyylrydcpjochknag.supabase.co`

`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your publishable key>`

Never use the Supabase service-role key in browser/client code.

Install and run:

`npm install`

`npm run dev`

Quality checks:

`npm test`

`npm run typecheck`

`npm run build`

## Live backend

Supabase project reference: `lqvyyylrydcpjochknag`

The live backend contains the current AHTE schema, RLS, storage, lifecycle triggers, event ledger, rate limiting, realtime publication and assurance/public-verification Edge Functions.

## Important certification workflow

Amanah does not issue sovereign halal certification. AI is advisory. authorised certification decision workflow decisions are reserved. Operational release is not certification.

## Source-lock boundary

Exact normative standards text is not invented or reconstructed. Use the licensed/approved controlling source when exact clause wording is required.
