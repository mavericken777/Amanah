-- Amanah approval FK performance indexes.
create index if not exists approvals_approver_org_idx
  on public.approvals(approver_user_id, organization_id);
create index if not exists approvals_requested_by_org_idx
  on public.approvals(requested_by, organization_id);
