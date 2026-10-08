# Amanah Setup

## What Amanah is

Amanah is the AHTE operational platform operated by Global Halal Supply Chain Limited. It uses the GlobalHalalDigitalTrust repository for shared project architecture and Supabase as the application data plane.

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

Amanah monitors the assurance journey for certified products/SKUs, premises, suppliers, laboratories, production, warehouses and logistics. PHC and JAKIM work in parallel across Perak/state and federal governance. JAKIM/JAIN/JAIM, muftis, scholars and authorised halal auditors make certification award and revocation decisions through their applicable processes. AI/ML supports real-time monitoring, predictive analytics and preemptive strategies; it does not make certification decisions. Authority connectivity follows **AHTE ⇄ Direct JAKIM API ⇄ JAKIM**. The physical corridor is **China → GCC direct**.
