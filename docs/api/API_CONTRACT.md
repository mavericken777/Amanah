# Amanah API Contract v1

Base path: /api/v1

## Health

GET /api/v1/health

## Projects

GET /api/v1/projects

POST /api/v1/projects

Body:

    {"name":"China Trip 2026","module_key":"travel.china-trip"}

## Tasks

GET /api/v1/tasks?project_id=<uuid>

POST /api/v1/tasks

Body:

    {"project_id":"<uuid>","title":"Confirm meeting","priority":"high","due_date":"2026-10-01"}

## Rules

Authentication is required. Organization context is derived from authorized memberships/projects. Do not trust client-supplied organization_id as the security boundary. Validate inputs and preserve RLS. Material mutations must be auditable. External side-effecting integrations should use idempotency keys before production.
