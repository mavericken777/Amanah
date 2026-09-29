# Amanah Delivery Plan

## Objective

Move from Markdown requirements to an operational application quickly without losing requirements or compromising tenant security.

## Branch strategy

- main: release-ready baseline
- setup/china-trip-project: preserved requirements branch
- build/amanah-platform-v1: current implementation branch

Do not delete the requirements branch.

## First release gate

The first verified vertical slice is:

Account -> Workspace -> Project -> Task -> RLS -> Dashboard -> Audit

Once this flow is reliable, the rest of the modules can be layered on the same foundation.

## Execution order

### Step 1: Environment

Create the Supabase project, obtain the project URL and publishable key, apply the migration and install npm dependencies.

### Step 2: Identity

Verify sign-up, sign-in, sign-out, callback and session refresh.

### Step 3: Workspace

Create a workspace and verify automatic owner membership.

### Step 4: Projects

Create a general project and a travel.china-trip project.

### Step 5: Tasks

Create task records and verify organization isolation.

### Step 6: Operations

Implement complete meetings, documents, decisions and risks screens.

### Step 7: China Trip

Implement travellers, itinerary, logistics, accommodation, compliance and trip finance.

### Step 8: Platform services

Implement notifications, search, audit viewing and administration.

### Step 9: Hardening

Add automated tests, backups, monitoring, deployment environments and production review.

## Non-negotiable security controls

- no secrets in Git
- no service-role key in browser code
- RLS enabled
- authorization tested
- private documents protected
- audit trail enabled for material changes
- production and non-production secrets separated
