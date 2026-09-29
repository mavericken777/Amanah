-- Amanah live Supabase hardening, private security helpers, private document storage and FK indexes.
create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

alter function public.set_updated_at() set schema private;
alter function public.is_org_member(uuid) set schema private;
alter function public.has_org_role(uuid, text[]) set schema private;
alter function public.handle_new_user() set schema private;
alter function public.add_owner_membership() set schema private;
alter function public.audit_row_change() set schema private;
alter function public.notify_task_events() set schema private;
alter function public.notify_risk_escalation() set schema private;
alter function public.rollup_expense_to_budget() set schema private;

create or replace function private.set_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

create or replace function private.is_org_member(target_org uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.organization_members where organization_id = target_org and user_id = (select auth.uid())); $$;

create or replace function private.has_org_role(target_org uuid, allowed_roles text[])
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.organization_members where organization_id = target_org and user_id = (select auth.uid()) and role = any(allowed_roles)); $$;

create or replace function private.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''))
  on conflict (id) do update set full_name = excluded.full_name, updated_at = now();
  return new;
end; $$;

create or replace function private.add_owner_membership()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  insert into public.organization_members (organization_id, user_id, role)
  values (new.id, new.owner_user_id, 'owner')
  on conflict (organization_id, user_id) do update set role = 'owner';
  return new;
end; $$;

create or replace function private.audit_row_change()
returns trigger language plpgsql security definer set search_path = public
as $$ declare actor uuid := (select auth.uid()); begin
  insert into public.audit_events (organization_id, actor_user_id, action, entity_type, entity_id, before_data, after_data)
  values (coalesce(new.organization_id, old.organization_id), actor, tg_op, tg_table_name, coalesce(new.id, old.id),
          case when tg_op = 'INSERT' then null else to_jsonb(old) end,
          case when tg_op = 'DELETE' then null else to_jsonb(new) end);
  return case when tg_op = 'DELETE' then old else new end;
end; $$;

create or replace function private.notify_task_events()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  if new.owner_user_id is not null and new.status = 'blocked' and old.status is distinct from new.status then
    insert into public.notifications(organization_id, user_id, type, title, body, href)
    values (new.organization_id, new.owner_user_id, 'task_blocked', 'Task blocked', new.title, '/tasks');
  end if;
  if new.owner_user_id is not null and new.status = 'open' and old.status is distinct from new.status then
    insert into public.notifications(organization_id, user_id, type, title, body, href)
    values (new.organization_id, new.owner_user_id, 'task_opened', 'Task assigned/opened', new.title, '/tasks');
  end if;
  return new;
end; $$;

create or replace function private.notify_risk_escalation()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  if new.status = 'escalated' and old.status is distinct from new.status then
    insert into public.notifications(organization_id, user_id, type, title, body, href)
    select new.organization_id, om.user_id, 'risk_escalated', 'Risk escalated', new.description, '/risks'
    from public.organization_members om
    where om.organization_id = new.organization_id
      and om.role in ('owner','admin','executive','project_manager');
  end if;
  return new;
end; $$;

create or replace function private.rollup_expense_to_budget()
returns trigger language plpgsql security definer set search_path = public
as $$ begin
  if tg_op = 'INSERT' then
    update public.budgets set actual = actual + new.amount, updated_at = now()
    where project_id = new.project_id and organization_id = new.organization_id and category = new.category;
  elsif tg_op = 'UPDATE' then
    update public.budgets set actual = actual - old.amount + new.amount, updated_at = now()
    where project_id = new.project_id and organization_id = new.organization_id and category = new.category;
  elsif tg_op = 'DELETE' then
    update public.budgets set actual = greatest(0, actual - old.amount), updated_at = now()
    where project_id = old.project_id and organization_id = old.organization_id and category = old.category;
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end; $$;

revoke all on function private.set_updated_at() from public;
revoke all on function private.handle_new_user() from public;
revoke all on function private.add_owner_membership() from public;
revoke all on function private.audit_row_change() from public;
revoke all on function private.notify_task_events() from public;
revoke all on function private.notify_risk_escalation() from public;
revoke all on function private.rollup_expense_to_budget() from public;
revoke all on function private.is_org_member(uuid) from public;
revoke all on function private.has_org_role(uuid, text[]) from public;
grant execute on function private.is_org_member(uuid) to authenticated;
grant execute on function private.has_org_role(uuid, text[]) to authenticated;

drop policy if exists organizations_owner_insert on public.organizations;
create policy organizations_owner_insert on public.organizations for insert to authenticated with check (owner_user_id = (select auth.uid()));
drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select on public.profiles for select to authenticated using ((select auth.uid()) = id);
drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
drop policy if exists members_owner_delete on public.organization_members;
create policy members_owner_delete on public.organization_members for delete to authenticated using (private.has_org_role(organization_id, array['owner']) and user_id <> (select auth.uid()));
drop policy if exists comments_member_insert on public.comments;
create policy comments_member_insert on public.comments for insert to authenticated with check (private.is_org_member(organization_id) and author_user_id = (select auth.uid()));
drop policy if exists comments_author_update on public.comments;
create policy comments_author_update on public.comments for update to authenticated using (author_user_id = (select auth.uid())) with check (author_user_id = (select auth.uid()));
drop policy if exists comments_author_delete on public.comments;
create policy comments_author_delete on public.comments for delete to authenticated using (author_user_id = (select auth.uid()) or private.has_org_role(organization_id, array['owner','admin']));
drop policy if exists approvals_manager_insert on public.approvals;
create policy approvals_manager_insert on public.approvals for insert to authenticated with check (private.is_org_member(organization_id) and requested_by = (select auth.uid()));
drop policy if exists saved_views_self_select on public.saved_views;
create policy saved_views_self_select on public.saved_views for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists saved_views_self_insert on public.saved_views;
create policy saved_views_self_insert on public.saved_views for insert to authenticated with check ((select auth.uid()) = user_id and private.is_org_member(organization_id));
drop policy if exists saved_views_self_update on public.saved_views;
create policy saved_views_self_update on public.saved_views for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists saved_views_self_delete on public.saved_views;
create policy saved_views_self_delete on public.saved_views for delete to authenticated using ((select auth.uid()) = user_id);
drop policy if exists notifications_self_select on public.notifications;
create policy notifications_self_select on public.notifications for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists notifications_self_update on public.notifications;
create policy notifications_self_update on public.notifications for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

insert into storage.buckets (id, name, public)
values ('amanah-documents','amanah-documents',false)
on conflict (id) do update set public = false;

drop policy if exists amanah_documents_select on storage.objects;
create policy amanah_documents_select on storage.objects for select to authenticated
using (bucket_id='amanah-documents' and (storage.foldername(name))[1] is not null and private.is_org_member(((storage.foldername(name))[1])::uuid));
drop policy if exists amanah_documents_insert on storage.objects;
create policy amanah_documents_insert on storage.objects for insert to authenticated
with check (bucket_id='amanah-documents' and (storage.foldername(name))[1] is not null and private.has_org_role(((storage.foldername(name))[1])::uuid, array['owner','admin','executive','project_manager','member','contributor']));
drop policy if exists amanah_documents_update on storage.objects;
create policy amanah_documents_update on storage.objects for update to authenticated
using (bucket_id='amanah-documents' and private.has_org_role(((storage.foldername(name))[1])::uuid, array['owner','admin','executive','project_manager','member','contributor']))
with check (bucket_id='amanah-documents' and private.has_org_role(((storage.foldername(name))[1])::uuid, array['owner','admin','executive','project_manager','member','contributor']));
drop policy if exists amanah_documents_delete on storage.objects;
create policy amanah_documents_delete on storage.objects for delete to authenticated
using (bucket_id='amanah-documents' and private.has_org_role(((storage.foldername(name))[1])::uuid, array['owner','admin']));

do $$
declare r record; idx_name text; cols text;
begin
  for r in
    select ns.nspname as schema_name, cl.relname as table_name, c.conname as constraint_name,
           array_agg(att.attname order by k.ord) as col_names
    from pg_constraint c
    join pg_class cl on cl.oid=c.conrelid
    join pg_namespace ns on ns.oid=cl.relnamespace
    join lateral unnest(c.conkey) with ordinality k(attnum,ord) on true
    join pg_attribute att on att.attrelid=cl.oid and att.attnum=k.attnum
    where c.contype='f' and ns.nspname='public'
    group by ns.nspname, cl.relname, c.conname
  loop
    idx_name := left('fkidx_' || r.table_name || '_' || r.constraint_name,60);
    cols := array_to_string(array(select format('%I',x) from unnest(r.col_names) x),', ');
    execute format('create index if not exists %I on %I.%I (%s)',idx_name,r.schema_name,r.table_name,cols);
  end loop;
end $$;