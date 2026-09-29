-- Amanah performance cleanup.
-- Remaining advisor output is only expected unused-index info on a fresh database.

drop policy if exists members_self_or_admin_select on public.organization_members;
create policy members_self_or_admin_select on public.organization_members
for select to authenticated
using (
  user_id = (select auth.uid())
  or (select private.has_org_role(organization_id, array['owner','admin']))
);

drop policy if exists approvals_approver_update on public.approvals;
create policy approvals_approver_update on public.approvals
for update to authenticated
using (
  approver_user_id = (select auth.uid())
  or (select private.has_org_role(organization_id, array['owner','admin','project_manager']))
)
with check (
  approver_user_id = (select auth.uid())
  or (select private.has_org_role(organization_id, array['owner','admin','project_manager']))
);

drop index if exists public.fkidx_decisions_decisions_organization_id_fkey;
drop index if exists public.fkidx_project_members_project_members_project_id_fkey;
drop index if exists public.fkidx_project_members_project_members_user_id_fkey;
drop index if exists public.fkidx_projects_projects_organization_id_fkey;
drop index if exists public.fkidx_risks_risks_organization_id_fkey;
drop index if exists public.fkidx_saved_views_saved_views_user_id_fkey;
drop index if exists public.fkidx_task_dependencies_task_dependencies_depends_on_task_id;
drop index if exists public.fkidx_task_dependencies_task_dependencies_task_id_fkey;
