-- Amanah approval integrity and member visibility.
create unique index if not exists organization_members_user_org_key
  on public.organization_members(user_id, organization_id);

alter table public.approvals
  drop constraint if exists approvals_requested_by_org_fk;
alter table public.approvals
  add constraint approvals_requested_by_org_fk
  foreign key (requested_by, organization_id)
  references public.organization_members(user_id, organization_id)
  on delete cascade;

alter table public.approvals
  drop constraint if exists approvals_approver_org_fk;
alter table public.approvals
  add constraint approvals_approver_org_fk
  foreign key (approver_user_id, organization_id)
  references public.organization_members(user_id, organization_id)
  on delete cascade;

drop policy if exists members_self_or_admin_select on public.organization_members;
drop policy if exists members_member_select on public.organization_members;
create policy members_member_select on public.organization_members
for select to authenticated
using (private.is_org_member(organization_id));

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
