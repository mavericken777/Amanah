create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) >= 2),
  slug text generated always as (lower(regexp_replace(trim(name), '[^a-zA-Z0-9]+', '-', 'g'))) stored,
  owner_user_id uuid not null references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists organizations_slug_key on public.organizations(slug);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','executive','project_manager','member','contributor','viewer')),
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  slug text not null,
  module_key text not null default 'core',
  status text not null default 'active' check (status in ('draft','active','paused','completed','cancelled')),
  start_date date,
  end_date date,
  description text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, slug)
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  description text,
  owner_user_id uuid references auth.users(id),
  due_date date,
  priority text not null default 'medium' check (priority in ('low','medium','high','critical')),
  status text not null default 'open' check (status in ('open','in_progress','blocked','done','cancelled')),
  completion_condition text,
  dependency_notes text,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  starts_at timestamptz,
  ends_at timestamptz,
  organisation_or_person text not null,
  city text,
  venue text,
  purpose text,
  objective text,
  desired_outcome text,
  agenda text,
  outcome_notes text,
  owner_user_id uuid references auth.users(id),
  status text not null default 'pending' check (status in ('confirmed','tentative','pending','blocked','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.meeting_attendees (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.meetings(id) on delete cascade,
  user_id uuid references auth.users(id),
  external_name text,
  external_contact text,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  description text,
  classification text not null default 'internal' check (classification in ('public','internal','confidential','restricted')),
  status text not null default 'pending' check (status in ('pending','in_review','approved','rejected','expired')),
  required_by date,
  owner_user_id uuid references auth.users(id),
  storage_provider text,
  storage_reference text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.decisions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  decision_code text not null,
  decided_on date,
  decision text not null,
  reason_context text,
  alternatives_considered text,
  owner_user_id uuid references auth.users(id),
  impact text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, decision_code)
);

create table if not exists public.risks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  risk_code text not null,
  description text not null,
  impact text not null check (impact in ('low','medium','high')),
  likelihood text not null check (likelihood in ('low','medium','high')),
  mitigation text,
  owner_user_id uuid references auth.users(id),
  status text not null default 'open' check (status in ('open','monitoring','mitigated','closed','escalated')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, risk_code)
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  category text not null,
  planned numeric(14,2) not null default 0 check (planned >= 0),
  actual numeric(14,2) not null default 0 check (actual >= 0),
  owner_user_id uuid references auth.users(id),
  status text not null default 'pending' check (status in ('pending','active','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, category)
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  spent_on date not null,
  category text not null,
  description text not null,
  amount numeric(14,2) not null check (amount >= 0),
  currency char(3) not null,
  paid_by_user_id uuid references auth.users(id),
  reimbursable boolean not null default false,
  receipt_document_id uuid references public.documents(id) on delete set null,
  status text not null default 'pending' check (status in ('pending','approved','reimbursed','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.itinerary_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  event_date date not null,
  city text,
  starts_at timestamptz,
  ends_at timestamptz,
  activity text not null,
  location text,
  transport text,
  owner_user_id uuid references auth.users(id),
  status text not null default 'pending' check (status in ('confirmed','tentative','pending','blocked','cancelled')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.travellers (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  display_name text not null,
  role text,
  contact_method text,
  backup_contact_method text,
  status text not null default 'confirmed' check (status in ('planned','confirmed','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transport_segments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  segment_type text not null check (segment_type in ('flight','train','ground','other')),
  segment_label text,
  travel_date date,
  origin text,
  destination text,
  departure_at timestamptz,
  arrival_at timestamptz,
  booking_status text not null default 'pending' check (booking_status in ('confirmed','tentative','pending','cancelled')),
  reference_document_id uuid references public.documents(id) on delete set null,
  owner_user_id uuid references auth.users(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.accommodations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  city text not null,
  property_name text not null,
  check_in date,
  check_out date,
  room_allocation text,
  booking_status text not null default 'pending' check (booking_status in ('confirmed','tentative','pending','cancelled')),
  owner_user_id uuid references auth.users(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.updates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  overall_status text,
  completed text,
  in_progress text,
  blocked text,
  next_actions text,
  published_at timestamptz not null default now(),
  author_user_id uuid references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id bigint generated always as identity primary key,
  organization_id uuid references public.organizations(id) on delete cascade,
  actor_user_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  occurred_at timestamptz not null default now()
);

create index if not exists projects_org_idx on public.projects(organization_id);
create index if not exists tasks_org_project_idx on public.tasks(organization_id, project_id);
create index if not exists tasks_owner_status_idx on public.tasks(owner_user_id, status);
create index if not exists tasks_due_date_idx on public.tasks(due_date);
create index if not exists meetings_org_project_idx on public.meetings(organization_id, project_id);
create index if not exists documents_org_project_idx on public.documents(organization_id, project_id);
create index if not exists decisions_org_idx on public.decisions(organization_id);
create index if not exists risks_org_idx on public.risks(organization_id);
create index if not exists expenses_org_project_idx on public.expenses(organization_id, project_id);
create index if not exists itinerary_org_project_date_idx on public.itinerary_events(organization_id, project_id, event_date);
create index if not exists audit_org_time_idx on public.audit_events(organization_id, occurred_at desc);
create index if not exists notifications_user_unread_idx on public.notifications(user_id, read_at, created_at desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''))
  on conflict (id) do update set full_name = excluded.full_name, updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.add_owner_membership()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.organization_members (organization_id, user_id, role)
  values (new.id, new.owner_user_id, 'owner')
  on conflict (organization_id, user_id) do update set role = 'owner';
  return new;
end;
$$;

drop trigger if exists on_organization_created on public.organizations;
create trigger on_organization_created
after insert on public.organizations
for each row execute procedure public.add_owner_membership();

create or replace function public.is_org_member(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where organization_id = target_org
      and user_id = auth.uid()
  );
$$;

create or replace function public.has_org_role(target_org uuid, allowed_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.organization_members
    where organization_id = target_org
      and user_id = auth.uid()
      and role = any(allowed_roles)
  );
$$;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.meetings enable row level security;
alter table public.meeting_attendees enable row level security;
alter table public.documents enable row level security;
alter table public.decisions enable row level security;
alter table public.risks enable row level security;
alter table public.budgets enable row level security;
alter table public.expenses enable row level security;
alter table public.itinerary_events enable row level security;
alter table public.travellers enable row level security;
alter table public.transport_segments enable row level security;
alter table public.accommodations enable row level security;
alter table public.updates enable row level security;
alter table public.notifications enable row level security;
alter table public.audit_events enable row level security;

create policy profiles_self_select on public.profiles for select to authenticated using (id = auth.uid());
create policy profiles_self_update on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy organizations_member_select on public.organizations for select to authenticated using (public.is_org_member(id));
create policy organizations_owner_insert on public.organizations for insert to authenticated with check (owner_user_id = auth.uid());
create policy organizations_admin_update on public.organizations for update to authenticated using (public.has_org_role(id, array['owner','admin'])) with check (public.has_org_role(id, array['owner','admin']));

create policy members_self_or_admin_select on public.organization_members for select to authenticated using (
  user_id = auth.uid() or public.has_org_role(organization_id, array['owner','admin'])
);
create policy members_admin_insert on public.organization_members for insert to authenticated with check (
  public.has_org_role(organization_id, array['owner','admin'])
);
create policy members_admin_update on public.organization_members for update to authenticated using (
  public.has_org_role(organization_id, array['owner','admin'])
);
create policy members_admin_delete on public.organization_members for delete to authenticated using (
  public.has_org_role(organization_id, array['owner','admin'])
);

create policy projects_member_select on public.projects for select to authenticated using (public.is_org_member(organization_id));
create policy projects_member_insert on public.projects for insert to authenticated with check (public.is_org_member(organization_id));
create policy projects_member_update on public.projects for update to authenticated using (public.is_org_member(organization_id));
create policy projects_admin_delete on public.projects for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy tasks_member_select on public.tasks for select to authenticated using (public.is_org_member(organization_id));
create policy tasks_member_insert on public.tasks for insert to authenticated with check (public.is_org_member(organization_id));
create policy tasks_member_update on public.tasks for update to authenticated using (public.is_org_member(organization_id));
create policy tasks_admin_delete on public.tasks for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy meetings_member_select on public.meetings for select to authenticated using (public.is_org_member(organization_id));
create policy meetings_member_insert on public.meetings for insert to authenticated with check (public.is_org_member(organization_id));
create policy meetings_member_update on public.meetings for update to authenticated using (public.is_org_member(organization_id));
create policy meetings_admin_delete on public.meetings for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy meeting_attendee_member_select on public.meeting_attendees for select to authenticated using (
  exists (select 1 from public.meetings m where m.id = meeting_id and public.is_org_member(m.organization_id))
);
create policy meeting_attendee_member_insert on public.meeting_attendees for insert to authenticated with check (
  exists (select 1 from public.meetings m where m.id = meeting_id and public.is_org_member(m.organization_id))
);
create policy meeting_attendee_member_update on public.meeting_attendees for update to authenticated using (
  exists (select 1 from public.meetings m where m.id = meeting_id and public.is_org_member(m.organization_id))
);
create policy meeting_attendee_admin_delete on public.meeting_attendees for delete to authenticated using (
  exists (select 1 from public.meetings m where m.id = meeting_id and public.has_org_role(m.organization_id, array['owner','admin']))
);

create policy documents_member_select on public.documents for select to authenticated using (public.is_org_member(organization_id));
create policy documents_member_insert on public.documents for insert to authenticated with check (public.is_org_member(organization_id));
create policy documents_member_update on public.documents for update to authenticated using (public.is_org_member(organization_id));
create policy documents_admin_delete on public.documents for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy decisions_member_select on public.decisions for select to authenticated using (public.is_org_member(organization_id));
create policy decisions_member_insert on public.decisions for insert to authenticated with check (public.is_org_member(organization_id));
create policy decisions_member_update on public.decisions for update to authenticated using (public.is_org_member(organization_id));
create policy decisions_admin_delete on public.decisions for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy risks_member_select on public.risks for select to authenticated using (public.is_org_member(organization_id));
create policy risks_member_insert on public.risks for insert to authenticated with check (public.is_org_member(organization_id));
create policy risks_member_update on public.risks for update to authenticated using (public.is_org_member(organization_id));
create policy risks_admin_delete on public.risks for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy budgets_member_select on public.budgets for select to authenticated using (public.is_org_member(organization_id));
create policy budgets_member_insert on public.budgets for insert to authenticated with check (public.is_org_member(organization_id));
create policy budgets_member_update on public.budgets for update to authenticated using (public.is_org_member(organization_id));
create policy budgets_admin_delete on public.budgets for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy expenses_member_select on public.expenses for select to authenticated using (public.is_org_member(organization_id));
create policy expenses_member_insert on public.expenses for insert to authenticated with check (public.is_org_member(organization_id));
create policy expenses_member_update on public.expenses for update to authenticated using (public.is_org_member(organization_id));
create policy expenses_admin_delete on public.expenses for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy itinerary_member_select on public.itinerary_events for select to authenticated using (public.is_org_member(organization_id));
create policy itinerary_member_insert on public.itinerary_events for insert to authenticated with check (public.is_org_member(organization_id));
create policy itinerary_member_update on public.itinerary_events for update to authenticated using (public.is_org_member(organization_id));
create policy itinerary_admin_delete on public.itinerary_events for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy travellers_member_select on public.travellers for select to authenticated using (public.is_org_member(organization_id));
create policy travellers_member_insert on public.travellers for insert to authenticated with check (public.is_org_member(organization_id));
create policy travellers_member_update on public.travellers for update to authenticated using (public.is_org_member(organization_id));
create policy travellers_admin_delete on public.travellers for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy transport_member_select on public.transport_segments for select to authenticated using (public.is_org_member(organization_id));
create policy transport_member_insert on public.transport_segments for insert to authenticated with check (public.is_org_member(organization_id));
create policy transport_member_update on public.transport_segments for update to authenticated using (public.is_org_member(organization_id));
create policy transport_admin_delete on public.transport_segments for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy accommodations_member_select on public.accommodations for select to authenticated using (public.is_org_member(organization_id));
create policy accommodations_member_insert on public.accommodations for insert to authenticated with check (public.is_org_member(organization_id));
create policy accommodations_member_update on public.accommodations for update to authenticated using (public.is_org_member(organization_id));
create policy accommodations_admin_delete on public.accommodations for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy updates_member_select on public.updates for select to authenticated using (public.is_org_member(organization_id));
create policy updates_member_insert on public.updates for insert to authenticated with check (public.is_org_member(organization_id));
create policy updates_member_update on public.updates for update to authenticated using (public.is_org_member(organization_id));
create policy updates_admin_delete on public.updates for delete to authenticated using (public.has_org_role(organization_id, array['owner','admin']));

create policy notifications_self_select on public.notifications for select to authenticated using (user_id = auth.uid());
create policy notifications_self_update on public.notifications for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy audit_member_select on public.audit_events for select to authenticated using (public.is_org_member(organization_id));

create or replace function public.audit_row_change()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  actor uuid := auth.uid();
begin
  insert into public.audit_events (
    organization_id, actor_user_id, action, entity_type, entity_id, before_data, after_data
  )
  values (
    coalesce(new.organization_id, old.organization_id),
    actor,
    tg_op,
    tg_table_name,
    coalesce(new.id, old.id),
    case when tg_op = 'INSERT' then null else to_jsonb(old) end,
    case when tg_op = 'DELETE' then null else to_jsonb(new) end
  );
  return case when tg_op = 'DELETE' then old else new end;
end;
$$;

drop trigger if exists audit_projects on public.projects;
create trigger audit_projects after insert or update or delete on public.projects for each row execute procedure public.audit_row_change();
drop trigger if exists audit_tasks on public.tasks;
create trigger audit_tasks after insert or update or delete on public.tasks for each row execute procedure public.audit_row_change();
drop trigger if exists audit_meetings on public.meetings;
create trigger audit_meetings after insert or update or delete on public.meetings for each row execute procedure public.audit_row_change();
drop trigger if exists audit_documents on public.documents;
create trigger audit_documents after insert or update or delete on public.documents for each row execute procedure public.audit_row_change();
drop trigger if exists audit_decisions on public.decisions;
create trigger audit_decisions after insert or update or delete on public.decisions for each row execute procedure public.audit_row_change();
drop trigger if exists audit_risks on public.risks;
create trigger audit_risks after insert or update or delete on public.risks for each row execute procedure public.audit_row_change();
drop trigger if exists audit_budgets on public.budgets;
create trigger audit_budgets after insert or update or delete on public.budgets for each row execute procedure public.audit_row_change();
drop trigger if exists audit_expenses on public.expenses;
create trigger audit_expenses after insert or update or delete on public.expenses for each row execute procedure public.audit_row_change();
drop trigger if exists audit_itinerary on public.itinerary_events;
create trigger audit_itinerary after insert or update or delete on public.itinerary_events for each row execute procedure public.audit_row_change();
drop trigger if exists audit_travellers on public.travellers;
create trigger audit_travellers after insert or update or delete on public.travellers for each row execute procedure public.audit_row_change();
drop trigger if exists audit_transport on public.transport_segments;
create trigger audit_transport after insert or update or delete on public.transport_segments for each row execute procedure public.audit_row_change();
drop trigger if exists audit_accommodations on public.accommodations;
create trigger audit_accommodations after insert or update or delete on public.accommodations for each row execute procedure public.audit_row_change();
drop trigger if exists audit_updates on public.updates;
create trigger audit_updates after insert or update or delete on public.updates for each row execute procedure public.audit_row_change();
