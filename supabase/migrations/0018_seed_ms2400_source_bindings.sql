-- Connect MS 2400 catalogue entries to the active project standards register.

create or replace function private.ahte_seed_ms2400_source_bindings(target_org uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.ahte_instruments
     set source_reference = 'PROJECT-REPO: GlobalHalalDigitalTrust — current Malaysian/JAKIM standards register',
       source_status='active'
   where organization_id=target_org
     and code in ('MS 2400-1:2019','MS 2400-2:2019','MS 2400-3:2019');
end;
$$;

revoke all on function private.ahte_seed_ms2400_source_bindings(uuid) from public;
revoke all on function private.ahte_seed_ms2400_source_bindings(uuid) from anon;
revoke all on function private.ahte_seed_ms2400_source_bindings(uuid) from authenticated;

create or replace function private.ahte_seed_on_org_created()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  perform private.ahte_seed_operating_rules(new.id);
  perform private.ahte_seed_reference_catalog(new.id);
  perform private.ahte_seed_ms2400_source_bindings(new.id);
  return new;
end;
$$;

do $$
declare r record;
begin
  for r in select id from public.organizations loop
    perform private.ahte_seed_ms2400_source_bindings(r.id);
  end loop;
end $$;
