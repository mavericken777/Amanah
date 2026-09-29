# Amanah Setup Guide

This guide is intentionally written for a non-technical owner.

## What you need

- GitHub access to this repository
- a Supabase account
- Node.js 22.18+ on the machine used for development

## Create the database

1. Create a Supabase project.
2. Open the SQL Editor.
3. Run supabase/migrations/0001_amanah_core.sql.
4. Copy the Supabase Project URL.
5. Copy the Supabase Publishable Key.

Do not put a secret/service-role key in browser code.

## Configure Amanah

Copy .env.example to .env.local and set:

NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key

## Start

Run:

npm install
npm run dev

Then open:

http://localhost:3000

## First test

1. Create an account.
2. Create a workspace.
3. Create a project.
4. Create a task.
5. Refresh the dashboard.
6. Confirm counts are visible.
7. Test that organization boundaries work.

## Production gate

Do not treat the foundation as production-ready until authentication settings, RLS tests, backups, monitoring, secure document storage and deployment secrets have been reviewed.
