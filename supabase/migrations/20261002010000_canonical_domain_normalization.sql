-- Post-freeze AMANAH domain normalization: control date 2026-10-02.
-- Frozen standards are unchanged. This migration only normalizes first-class operational objects.

alter table public.ahte_materials add column if not exists material_role text not null default 'raw_material';
alter table public.ahte_materials drop constraint if exists ahte_materials_material_role_check;
alter table public.ahte_materials add constraint ahte_materials_material_role_check check (material_role = any(array['ingredient','raw_material','processing_aid','packaging','other']::text[]));

create table if not exists public.ahte_production_lines(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 facility_id uuid not null references public.ahte_facilities(id) on delete restrict, line_code text not null, name text not null,
 status text not null default 'draft' check(status=any(array['draft','active','suspended','retired']::text[])),
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id,line_code)
);
create table if not exists public.ahte_skus(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 product_id uuid not null references public.ahte_products(id) on delete restrict, sku_code text not null, name text not null, gtin text,
 status text not null default 'draft' check(status=any(array['draft','submitted','review','information_required','evidence','approved','active','amended','suspended','expired','withdrawn']::text[])),
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id,sku_code)
);
create table if not exists public.ahte_certification_scopes(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 certificate_id uuid not null references public.ahte_certificates(id) on delete cascade, scope_type text not null,
 product_id uuid references public.ahte_products(id) on delete restrict, facility_id uuid references public.ahte_facilities(id) on delete restrict,
 scope_reference text, valid_from date, valid_to date,
 status text not null default 'unverified' check(status=any(array['unverified','verified','expired','suspended','revoked','contested']::text[])),
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check(product_id is not null or facility_id is not null or scope_reference is not null)
);
create table if not exists public.ahte_vehicles(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 vehicle_code text not null, registration_no text, vehicle_type text, operator_name text,
 status text not null default 'registered' check(status=any(array['registered','ready','assigned','in_transit','maintenance','suspended','retired']::text[])),
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id,vehicle_code)
);
create table if not exists public.ahte_drivers(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 user_id uuid references auth.users(id) on delete set null, driver_code text not null, display_name text not null,
 status text not null default 'active' check(status=any(array['active','suspended','expired','retired']::text[])),
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id,driver_code)
);
create table if not exists public.ahte_warehouses(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 facility_id uuid references public.ahte_facilities(id) on delete restrict, warehouse_code text not null, name text not null,
 warehouse_type text not null default 'ambient', status text not null default 'active' check(status=any(array['draft','active','suspended','closed']::text[])),
 address jsonb not null default '{}', external_ids jsonb not null default '{}', metadata jsonb not null default '{}',
 created_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 unique(organization_id,warehouse_code)
);
create table if not exists public.ahte_pallets(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 pallet_code text not null, pallet_type text, batch_id uuid references public.ahte_batches(id) on delete set null,
 status text not null default 'assembled' check(status=any(array['assembled','stored','picked','loaded','in_transit','received','quarantined','retired']::text[])),
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id,pallet_code)
);
create table if not exists public.ahte_packages(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 package_code text not null, sku_id uuid references public.ahte_skus(id) on delete restrict, batch_id uuid references public.ahte_batches(id) on delete set null,
 parent_package_id uuid references public.ahte_packages(id) on delete set null, package_level text not null default 'unit',
 status text not null default 'active' check(status=any(array['planned','active','packed','picked','loaded','received','quarantined','recalled','retired']::text[])),
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id,package_code)
);
create table if not exists public.ahte_containers(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 container_no text not null, container_type text,
 status text not null default 'available' check(status=any(array['available','allocated','loaded','sealed','in_transit','arrived','held','released','retired']::text[])),
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id,container_no)
);
create table if not exists public.ahte_seals(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 container_id uuid references public.ahte_containers(id) on delete set null, seal_code text not null, seal_type text,
 status text not null default 'issued' check(status=any(array['issued','activated','applied','verified','opened_authorized','opened_unauthorized','replaced','void','retired']::text[])),
 activated_at timestamptz, opened_at timestamptz, external_ids jsonb not null default '{}', metadata jsonb not null default '{}',
 created_by uuid references auth.users(id), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id,seal_code)
);
create table if not exists public.ahte_route_events(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 shipment_id uuid not null references public.ahte_shipments(id) on delete cascade, vehicle_id uuid references public.ahte_vehicles(id) on delete set null,
 driver_id uuid references public.ahte_drivers(id) on delete set null, event_type text not null, status text not null default 'recorded',
 occurred_at timestamptz not null, latitude numeric, longitude numeric, geofence_id uuid references public.ahte_geofences(id) on delete set null,
 evidence_id uuid references public.ahte_evidence(id) on delete set null, external_event_id text, external_ids jsonb not null default '{}',
 metadata jsonb not null default '{}', created_by uuid references auth.users(id), created_at timestamptz not null default now()
);
create table if not exists public.ahte_verification_events(
 id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
 subject_type text not null, subject_id uuid not null, verification_type text not null,
 result text not null check(result=any(array['verified','not_verified','expired','suspended','revoked','inconclusive','contested']::text[])),
 verified_at timestamptz not null default now(), actor_identity_id uuid references public.ahte_identities(id) on delete set null,
 evidence_id uuid references public.ahte_evidence(id) on delete set null, source_reference text, disclosure_scope text not null default 'restricted',
 external_ids jsonb not null default '{}', metadata jsonb not null default '{}', created_by uuid references auth.users(id), created_at timestamptz not null default now()
);
create table if not exists public.ahte_sensors(
 device_id uuid primary key references public.ahte_devices(id) on delete cascade, organization_id uuid not null references public.organizations(id) on delete cascade,
 sensor_type text not null, measurement_unit text, range_min numeric, range_max numeric, accuracy text, response_time text, sampling_rate text,
 calibration_status text default 'pending', metadata jsonb not null default '{}', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.ahte_gateways(
 device_id uuid primary key references public.ahte_devices(id) on delete cascade, organization_id uuid not null references public.organizations(id) on delete cascade,
 gateway_type text not null, protocols text[] not null default '{}', edge_capabilities text[] not null default '{}', firmware_version text,
 secure_boot_status text, certificate_reference text, metadata jsonb not null default '{}', created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

do $$ declare t text; begin
 foreach t in array array['ahte_production_lines','ahte_skus','ahte_certification_scopes','ahte_vehicles','ahte_drivers','ahte_warehouses','ahte_pallets','ahte_packages','ahte_containers','ahte_seals','ahte_sensors','ahte_gateways'] loop
  execute format('create index if not exists %I on public.%I(organization_id)',t||'_org_idx',t);
  execute format('drop trigger if exists %I_updated_at on public.%I',t,t);
  execute format('create trigger %I_updated_at before update on public.%I for each row execute procedure private.set_updated_at()',t,t);
 end loop;
end $$;

do $$ declare t text; begin
 foreach t in array array['ahte_production_lines','ahte_skus','ahte_certification_scopes','ahte_vehicles','ahte_drivers','ahte_warehouses','ahte_pallets','ahte_packages','ahte_containers','ahte_seals','ahte_route_events','ahte_sensors','ahte_gateways'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('drop policy if exists %I_member_select on public.%I',t,t);
  execute format('drop policy if exists %I_member_insert on public.%I',t,t);
  execute format('drop policy if exists %I_member_update on public.%I',t,t);
  execute format('drop policy if exists %I_admin_delete on public.%I',t,t);
  execute format('create policy %I_member_select on public.%I for select to authenticated using (private.is_org_member(organization_id))',t,t);
  execute format('create policy %I_member_insert on public.%I for insert to authenticated with check (private.is_org_member(organization_id))',t,t);
  execute format('create policy %I_member_update on public.%I for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id))',t,t);
  execute format('create policy %I_admin_delete on public.%I for delete to authenticated using (private.has_org_role(organization_id,array[''owner'',''admin'']))',t,t);
 end loop;
 foreach t in array array['ahte_verification_events'] loop
  execute format('alter table public.%I enable row level security',t);
  execute format('drop policy if exists %I_member_select on public.%I',t,t);
  execute format('drop policy if exists %I_member_insert on public.%I',t,t);
  execute format('create policy %I_member_select on public.%I for select to authenticated using (private.is_org_member(organization_id))',t,t);
  execute format('create policy %I_member_insert on public.%I for insert to authenticated with check (private.is_org_member(organization_id))',t,t);
 end loop;
end $$;