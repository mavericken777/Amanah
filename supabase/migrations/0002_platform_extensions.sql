-- Amanah platform extensions
-- Collaboration, workflows, approvals, project membership, search and integrity controls.

create table if not exists public.project_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('manager','member','contributor','viewer')),
  created_at timestamptz not null default now(),
  unique(project_id, user_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  author_user_id uuid not null references auth.users(id),
  entity_type text not null,
  entity_id uuid not null,
  body text not null check (length(trim(body)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.task_dependencies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  depends_on_task_id uuid not null references public.tasks(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (task_id <> depends_on_task_id),
  unique(task_id, depends_on_task_id)
);

create table if not exists public.workflow_definitions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  name text not null,
  entity_type text not null,
  active boolean not null default true,
  definition jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  requested_by uuid not null references auth.users(id),
  approver_user_id uuid not null references auth.users(id),
  status text not null default 'pending' check (status in ('pending','approved','rejected','cancelled')),
  decision_notes text,
  requested_at timestamptz not null default now(),
  decided_at timestamptz
);

create table if not exists public.saved_views (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  entity_type text not null,
  filters jsonb not null default '{}'::jsonb,
  sort jsonb not null default '{}'::jsonb,
  columns jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(organization_id, user_id, name)
);

-- Composite keys prevent cross-organization references.
create unique index if not exists projects_id_org_key on public.projects(id, organization_id);
create unique index if not exists tasks_id_org_key on public.tasks(id, organization_id);
create unique index if not exists meetings_id_org_key on public.meetings(id, organization_id);
create unique index if not exists documents_id_org_key on public.documents(id, organization_id);
create unique index if not exists decisions_id_org_key on public.decisions(id, organization_id);
create unique index if not exists risks_id_org_key on public.risks(id, organization_id);
create unique index if not exists budgets_id_org_key on public.budgets(id, organization_id);
create unique index if not exists expenses_id_org_key on public.expenses(id, organization_id);
create unique index if not exists itinerary_id_org_key on public.itinerary_events(id, organization_id);
create unique index if not exists travellers_id_org_key on public.travellers(id, organization_id);
create unique index if not exists transport_id_org_key on public.transport_segments(id, organization_id);
create unique index if not exists accommodations_id_org_key on public.accommodations(id, organization_id);
create unique index if not exists project_members_id_org_key on public.project_members(id, organization_id);

alter table public.tasks drop constraint if exists tasks_project_org_fk;
alter table public.tasks add constraint tasks_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.meetings drop constraint if exists meetings_project_org_fk;
alter table public.meetings add constraint meetings_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.documents drop constraint if exists documents_project_org_fk;
alter table public.documents add constraint documents_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete set null;

alter table public.decisions drop constraint if exists decisions_project_org_fk;
alter table public.decisions add constraint decisions_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete set null;

alter table public.risks drop constraint if exists risks_project_org_fk;
alter table public.risks add constraint risks_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete set null;

alter table public.budgets drop constraint if exists budgets_project_org_fk;
alter table public.budgets add constraint budgets_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.expenses drop constraint if exists expenses_project_org_fk;
alter table public.expenses add constraint expenses_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.itinerary_events drop constraint if exists itinerary_project_org_fk;
alter table public.itinerary_events add constraint itinerary_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.travellers drop constraint if exists travellers_project_org_fk;
alter table public.travellers add constraint travellers_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.transport_segments drop constraint if exists transport_project_org_fk;
alter table public.transport_segments add constraint transport_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.accommodations drop constraint if exists accommodations_project_org_fk;
alter table public.accommodations add constraint accommodations_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.task_dependencies drop constraint if exists task_dependency_org_fk;
alter table public.task_dependencies add constraint task_dependency_org_fk
  foreign key (task_id, organization_id) references public.tasks(id, organization_id) on delete cascade;

alter table public.task_dependencies drop constraint if exists task_dependency_dep_org_fk;
alter table public.task_dependencies add constraint task_dependency_dep_org_fk
  foreign key (depends_on_task_id, organization_id) references public.tasks(id, organization_id) on delete cascade;

-- Explicitly link the project-member row to the same organization.
alter table public.project_members drop constraint if exists project_member_project_org_fk;
alter table public.project_members add constraint project_member_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

alter table public.comments drop constraint if exists comments_project_org_fk;
alter table public.comments add constraint comments_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete set null;

alter table public.approvals drop constraint if exists approvals_project_org_fk;
alter table public.approvals add constraint approvals_project_org_fk
  foreign key (project_id, organization_id) references public.projects(id, organization_id) on delete cascade;

create index if not exists project_members_project_idx on public.project_members(project_id);
create index if not exists project_members_user_idx on public.project_members(user_id);
create index if not exists comments_entity_idx on public.comments(entity_type, entity_id);
create index if not exists task_dependencies_task_idx on public.task_dependencies(task_id);
create index if not exists task_dependencies_dependency_idx on public.task_dependencies(depends_on_task_id);
create index if not exists approvals_org_status_idx on public.approvals(organization_id, status);
create index if not exists workflow_definitions_entity_idx on public.workflow_definitions(entity_type, active);
create index if not exists saved_views_user_idx on public.saved_views(user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists comments_set_updated_at on public.comments;
create trigger comments_set_updated_at before update on public.comments for each row execute procedure public.set_updated_at();
drop trigger if exists workflows_set_updated_at on public.workflow_definitions;
create trigger workflows_set_updated_at before update on public.workflow_definitions for each row execute procedure public.set_updated_at();
drop trigger if exists saved_views_set_updated_at on public.saved_views;
create trigger saved_views_set_updated_at before update on public.saved_views for each row execute procedure public.set_updated_at();

alter table public.project_members enable row level security;
alter table public.comments enable row level security;
alter table public.task_dependencies enable row level security;
alter table public.workflow_definitions enable row level security;
alter table public.approvals enable row level security;
alter table public.saved_views enable row level security;

create policy project_members_member_select on public.project_members for select to authenticated using (public.is_org_member(organization_id));
create policy project_members_manager_insert on public.project_members for insert to authenticated with check (public.has_org_role(organization_id, array['owner','admin','project_manager']));
create policy project_members_manager_update on public.project_members for update to authenticated using (public.has_org_role(organization_id, array['owner','admin','project_manager']));
create policy project_members_manager_delete on public.project_members for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin','project_manager']));

create policy comments_member_select on public.comments for select to authenticated using (public.is_org_member(organization_id));
create policy comments_member_insert on public.comments for insert to authenticated with check (public.is_org_member(organization_id) and author_user_id = auth.uid());
create policy comments_author_update on public.comments for update to authenticated using (author_user_id = auth.uid());
create policy comments_author_delete on public.comments for delete to authenticated using (
  author_user_id = auth.uid() or public.has_org_role(organization_id, array['owner','admin'])
);

create policy task_dependencies_member_select on public.task_dependencies for select to authenticated using (public.is_org_member(organization_id));
create policy task_dependencies_member_insert on public.task_dependencies for insert to authenticated with check (public.is_org_member(organization_id));
create policy task_dependencies_member_delete on public.task_dependencies for delete to authenticated using (public.is_org_member(organization_id));

create policy workflow_manager_select on public.workflow_definitions for select to authenticated using (
  organization_id is null or public.is_org_member(organization_id)
);
create policy workflow_manager_insert on public.workflow_definitions for insert to authenticated with check (
  organization_id is null or public.has_org_role(organization_id, array['owner','admin','project_manager'])
);
create policy workflow_manager_update on public.workflow_definitions for update to authenticated using (
  organization_id is null or public.has_org_role(organization_id, array['owner','admin','project_manager'])
);
create policy workflow_admin_delete on public.workflow_definitions for delete to authenticated using (
  organization_id is null or public.has_org_role(organization_id, array['owner','admin'])
);

create policy approvals_member_select on public.approvals for select to authenticated using (public.is_org_member(organization_id));
create policy approvals_manager_insert on public.approvals for insert to authenticated with check (public.is_org_member(organization_id) and requested_by = auth.uid());
create policy approvals_approver_update on public.approvals for update to authenticated using (
  approver_user_id = auth.uid() or public.has_org_role(organization_id, array['owner','admin','project_manager'])
);
create policy approvals_admin_delete on public.approvals for delete to authenticated using (
  public.has_org_role(organization_id, array['owner','admin'])
);

create policy saved_views_self_select on public.saved_views for select to authenticated using (user_id = auth.uid());
create policy saved_views_self_insert on public.saved_views for insert to authenticated with check (user_id = auth.uid() and public.is_org_member(organization_id));
create policy saved_views_self_update on public.saved_views for update to authenticated using (user_id = auth.uid());
create policy saved_views_self_delete on public.saved_views for delete to authenticated using (user_id = auth.uid());

drop policy if exists members_owner_update on public.organization_members;
create policy members_owner_update on public.organization_members for update to authenticated
using (public.has_org_role(organization_id, array['owner']))
with check (public.has_org_role(organization_id, array['owner']) and role <> 'owner');

drop trigger if exists audit_organization_members on public.organization_members;
create trigger audit_organization_members after insert or update or delete on public.organization_members
for each row execute procedure public.audit_row_change();

drop trigger if exists audit_project_members on public.project_members;
create trigger audit_project_members after insert or update or delete on public.project_members
for each row execute procedure public.audit_row_change();

drop trigger if exists audit_comments on public.comments;
create trigger audit_comments after insert or update or delete on public.comments
for each row execute procedure public.audit_row_change();

create index if not exists projects_search_idx on public.projects using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));
create index if not exists tasks_search_idx on public.tasks using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(description,'')));
create index if not exists meetings_search_idx on public.meetings using gin (to_tsvector('simple', coalesce(organisation_or_person,'') || ' ' || coalesce(purpose,'') || ' ' || coalesce(city,'')));
create index if not exists documents_search_idx on public.documents using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(description,'')));

create or replace function public.notify_task_events()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.owner_user_id is not null and new.status = 'blocked' and old.status is distinct from new.status then
    insert into public.notifications(organization_id, user_id, type, title, body, href)
    values (new.organization_id, new.owner_user_id, 'task_blocked', 'Task blocked', new.title, '/tasks');
  end if;

  if new.owner_user_id is not null and new.due_date is not null and new.status is distinct from old.status and new.status = 'open' then
    insert into public.notifications(organization_id, user_id, type, title, body, href)
    values (new.organization_id, new.owner_user_id, 'task_opened', 'Task assigned/opened', new.title, '/tasks');
  end if;

  return new;
end;
$$;

drop trigger if exists task_notification_events on public.tasks;
create trigger task_notification_events after insert or update on public.tasks
for each row execute procedure public.notify_task_events();

create or replace function public.notify_risk_escalation()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.status = 'escalated' and old.status is distinct from new.status then
    insert into public.notifications(organization_id, user_id, type, title, body, href)
    select new.organization_id, om.user_id, 'risk_escalated', 'Risk escalated', new.description, '/risks'
    from public.organization_members om
    where om.organization_id = new.organization_id
      and om.role in ('owner','admin','executive','project_manager');
  end if;
  return new;
end;
$$;

drop trigger if exists risk_notification_escalation on public.risks;
create trigger risk_notification_escalation after insert or update on public.risks
for each row execute procedure public.notify_risk_escalation();

create or replace function public.rollup_expense_to_budget()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.budgets
      set actual = actual + new.amount,
          updated_at = now()
      where project_id = new.project_id
        and organization_id = new.organization_id
        and category = new.category;
  elsif tg_op = 'UPDATE' then
    update public.budgets
      set actual = actual - old.amount + new.amount,
          updated_at = now()
      where project_id = new.project_id
        and organization_id = new.organization_id
        and category = new.category;
  elsif tg_op = 'DELETE' then
    update public.budgets
      set actual = greatest(0, actual - old.amount),
          updated_at = now()
      where project_id = old.project_id
        and organization_id = old.organization_id
        and category = old.category;
  end if;
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

drop trigger if exists expense_budget_rollup on public.expenses;
create trigger expense_budget_rollup after insert or update or delete on public.expenses
for each row execute procedure public.rollup_expense_to_budget();
