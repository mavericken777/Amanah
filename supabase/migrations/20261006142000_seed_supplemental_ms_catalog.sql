-- Post-freeze supplemental MS applicability registry.
-- Control date: 2026-10-06
-- Does not alter master-standards-stack/verified-2026-09-17/.
-- Source: GlobalHalalDigitalTrust current main, supplemental technical/product standard register.

create or replace function private.ahte_seed_supplemental_ms_catalog(target_org uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
  insert into public.ahte_instruments(
    organization_id,authority_id,code,title,instrument_type,version,jurisdiction,source_status,source_reference
  )
  values (
    target_org,
    null,
    'MS 2683:2017',
    'Kelulut (Stingless bee) honey - Specification',
    'supplemental_standard',
    '2017',
    'Malaysia',
    'source_locked',
    'PROJECT-REPO: GlobalHalalDigitalTrust — master-standards-stack/03_SECTOR_STANDARDS_CONTROL_MAP.md'
  )
  on conflict do nothing;
end $$;

create or replace function private.ahte_seed_on_org_created()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  perform private.ahte_seed_operating_rules(new.id);
  perform private.ahte_seed_reference_catalog(new.id);
  perform private.ahte_seed_supplemental_ms_catalog(new.id);
  return new;
end $$;

do $$
declare r record;
begin
  for r in select id from public.organizations loop
    perform private.ahte_seed_supplemental_ms_catalog(r.id);
  end loop;
end $$;

revoke all on function private.ahte_seed_supplemental_ms_catalog(uuid) from public;
revoke all on function private.ahte_seed_on_org_created() from public;
