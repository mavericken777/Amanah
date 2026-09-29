-- AHTE operational primitives: Digital Audit Twin, integrations, devices, disclosure and rate limiting.
create table if not exists public.ahte_digital_twins (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  twin_version integer not null default 1,
  status text not null default 'active' check (status in ('draft','active','held','retired')),
  snapshot jsonb not null default '{}'::jsonb,
  content_hash text,
  source_event_id bigint references public.ahte_event_ledger(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, entity_type, entity_id)
);

create table if not exists public.ahte_integrations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  system_type text not null,
  endpoint text,
  auth_mode text not null default 'managed_secret',
  status text not null default 'draft' check (status in ('draft','active','paused','failed','retired')),
  configuration jsonb not null default '{}'::jsonb,
  last_success_at timestamptz,
  last_error_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);

create table if not exists public.ahte_inbound_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  integration_id uuid not null references public.ahte_integrations(id) on delete cascade,
  external_event_id text not null,
  event_type text not null,
  received_at timestamptz not null default now(),
  payload jsonb not null,
  payload_hash text not null,
  status text not null default 'received' check (status in ('received','normalized','processed','rejected','failed')),
  error_message text,
  created_at timestamptz not null default now(),
  unique (integration_id, external_event_id),
  unique (organization_id, payload_hash)
);

create table if not exists public.ahte_device_maintenance (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  device_id uuid not null references public.ahte_devices(id) on delete cascade,
  activity_type text not null,
  performed_at timestamptz not null default now(),
  performed_by uuid references auth.users(id) on delete set null,
  calibration_reference text,
  evidence_id uuid references public.ahte_evidence(id) on delete set null,
  status text not null default 'recorded' check (status in ('scheduled','recorded','failed','void')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.ahte_credential_checks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  certificate_id uuid not null references public.ahte_certificates(id) on delete cascade,
  checked_at timestamptz not null default now(),
  source_type text not null,
  source_reference text,
  issuer_verified boolean not null default false,
  scope_match boolean not null default false,
  validity_status text not null default 'unknown' check (validity_status in ('valid','expired','suspended','unknown','contested')),
  checked_until date,
  content_hash text,
  evidence_id uuid references public.ahte_evidence(id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.ahte_market_registrations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  product_id uuid not null references public.ahte_products(id) on delete cascade,
  market_code text not null,
  importer_name text,
  registration_reference text,
  halal_acceptance_reference text,
  status text not null default 'pending' check (status in ('pending','submitted','approved','rejected','expired','suspended')),
  effective_from date,
  expires_on date,
  authority_reference text,
  evidence_id uuid references public.ahte_evidence(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, product_id, market_code)
);

create table if not exists public.ahte_consumer_scans (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  product_id uuid references public.ahte_products(id) on delete set null,
  batch_id uuid references public.ahte_batches(id) on delete set null,
  packet_id uuid references public.ahte_trust_packets(id) on delete set null,
  scanned_at timestamptz not null default now(),
  coarse_location jsonb,
  consented boolean not null default false,
  verification_result text not null default 'unknown' check (verification_result in ('verified','held','not_found','expired','unknown')),
  disclosure_version text,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.ahte_api_rate_limits (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_user_id uuid not null references auth.users(id) on delete cascade,
  route text not null,
  window_start timestamptz not null,
  request_count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (organization_id, actor_user_id, route, window_start)
);

create table if not exists public.ahte_public_verifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  packet_id uuid not null references public.ahte_trust_packets(id) on delete cascade,
  token_hash text not null unique,
  disclosure jsonb not null default '{}'::jsonb,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists ahte_digital_twins_entity_idx on public.ahte_digital_twins(organization_id,entity_type,entity_id);
create index if not exists ahte_inbound_events_integration_idx on public.ahte_inbound_events(integration_id,received_at desc);
create index if not exists ahte_device_maintenance_device_idx on public.ahte_device_maintenance(device_id,performed_at desc);
create index if not exists ahte_credential_checks_certificate_idx on public.ahte_credential_checks(certificate_id,checked_at desc);
create index if not exists ahte_market_registrations_market_idx on public.ahte_market_registrations(organization_id,market_code,status);
create index if not exists ahte_consumer_scans_packet_idx on public.ahte_consumer_scans(packet_id,scanned_at desc);
create index if not exists ahte_api_rate_limits_updated_idx on public.ahte_api_rate_limits(organization_id,actor_user_id,updated_at desc);
create index if not exists ahte_public_verifications_packet_idx on public.ahte_public_verifications(packet_id,expires_at);

alter table public.ahte_digital_twins enable row level security;
alter table public.ahte_integrations enable row level security;
alter table public.ahte_inbound_events enable row level security;
alter table public.ahte_device_maintenance enable row level security;
alter table public.ahte_credential_checks enable row level security;
alter table public.ahte_market_registrations enable row level security;
alter table public.ahte_consumer_scans enable row level security;
alter table public.ahte_api_rate_limits enable row level security;
alter table public.ahte_public_verifications enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'ahte_digital_twins','ahte_integrations','ahte_inbound_events','ahte_device_maintenance',
    'ahte_credential_checks','ahte_market_registrations','ahte_consumer_scans','ahte_api_rate_limits',
    'ahte_public_verifications'
  ] loop
    execute format('drop policy if exists %I_member_select on public.%I', t, t);
    execute format('create policy %I_member_select on public.%I for select to authenticated using (private.is_org_member(organization_id))', t, t);
    execute format('drop policy if exists %I_member_insert on public.%I', t, t);
    execute format('create policy %I_member_insert on public.%I for insert to authenticated with check (private.is_org_member(organization_id))', t, t);
    execute format('drop policy if exists %I_member_update on public.%I', t, t);
    execute format('create policy %I_member_update on public.%I for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id))', t, t);
    execute format('drop policy if exists %I_admin_delete on public.%I', t, t);
    execute format('create policy %I_admin_delete on public.%I for delete to authenticated using (private.has_org_role(organization_id, array[''owner'',''admin'']))', t, t);
  end loop;
end $$;

create or replace function private.ahte_check_rate_limit(p_org uuid,p_actor uuid,p_route text,p_limit integer default 120)
returns boolean language plpgsql security definer set search_path=public as $$
declare w timestamptz:=date_trunc('minute',now()); c integer;
begin
  insert into public.ahte_api_rate_limits(organization_id,actor_user_id,route,window_start,request_count,updated_at)
  values(p_org,p_actor,p_route,w,1,now())
  on conflict (organization_id,actor_user_id,route,window_start)
  do update set request_count=public.ahte_api_rate_limits.request_count+1,updated_at=now()
  returning request_count into c;
  return c <= greatest(1,p_limit);
end $$;

create or replace function public.ahte_rate_limit_proxy(p_org uuid,p_route text,p_limit integer default 120)
returns boolean language plpgsql security invoker set search_path=public as $$
begin
  if not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
  return private.ahte_check_rate_limit(p_org,(select auth.uid()),p_route,p_limit);
end $$;

revoke all on function private.ahte_check_rate_limit(uuid,uuid,text,integer) from public;
revoke all on function public.ahte_rate_limit_proxy(uuid,text,integer) from public;
grant execute on function public.ahte_rate_limit_proxy(uuid,text,integer) to authenticated;

create or replace function private.ahte_create_public_verification(p_org uuid,p_packet_id uuid,p_disclosure jsonb,p_expires_at timestamptz default null)
returns text language plpgsql security definer set search_path=public as $$
declare token text:=encode(gen_random_bytes(24),'hex');
begin
  if not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
  if not exists(select 1 from public.ahte_trust_packets where id=p_packet_id and organization_id=p_org) then raise exception 'packet_not_found'; end if;
  insert into public.ahte_public_verifications(organization_id,packet_id,token_hash,disclosure,expires_at,created_by)
  values(p_org,p_packet_id,encode(digest(token,'sha256'),'hex'),coalesce(p_disclosure,'{}'::jsonb),p_expires_at,(select auth.uid()));
  return token;
end $$;

create or replace function public.ahte_create_public_verification_proxy(p_org uuid,p_packet_id uuid,p_disclosure jsonb,p_expires_at timestamptz default null)
returns text language plpgsql security invoker set search_path=public as $$
begin
  if not private.has_org_role(p_org,array['owner','admin','executive','project_manager']) then raise exception 'public_verification_creation_restricted' using errcode='42501'; end if;
  return private.ahte_create_public_verification(p_org,p_packet_id,p_disclosure,p_expires_at);
end $$;

revoke all on function private.ahte_create_public_verification(uuid,uuid,jsonb,timestamptz) from public;
revoke all on function public.ahte_create_public_verification_proxy(uuid,uuid,jsonb,timestamptz) from public;
grant execute on function public.ahte_create_public_verification_proxy(uuid,uuid,jsonb,timestamptz) to authenticated;
