-- Bind MS 2400:2019 catalogue identities to every Amanah organization.
-- This stores source identity metadata and integrity locators.

create unique index if not exists idx_ahte_source_records_identity
  on public.ahte_source_records(organization_id, document_id, edition, hash12);

create or replace function private.ahte_seed_ms2400_source_bindings(target_org uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.ahte_source_records(
    organization_id, source_type, issuer, document_id, edition,
    source_url, retrieved_at, hash12, source_status
  ) values
    (target_org,'licensed_standard','Department of Standards Malaysia','MS 2400-1:2019','2019',NULL,now(),'1e5c635cbb43','catalogued_reference'),
    (target_org,'licensed_standard','Department of Standards Malaysia','MS 2400-2:2019','2019',NULL,now(),'d6369596a188','catalogued_reference'),
    (target_org,'licensed_standard','Department of Standards Malaysia','MS 2400-3:2019','2019',NULL,now(),'8e757fa1821e','catalogued_reference')
  on conflict (organization_id, document_id, edition, hash12) do update
    set issuer=excluded.issuer,
        source_type=excluded.source_type,
        source_status='active';

  update public.ahte_instruments
     set source_reference = case code
       when 'MS 2400-1:2019' then 'STATIC: MS2400-1_2019.pdf | SHA256:1e5c635cbb434465f4deb43ffb0ae7a52040210eab46a517593390443bc4d7a2'
       when 'MS 2400-2:2019' then 'STATIC: MS2400-2_2019.pdf | SHA256:d6369596a188446a5916e0d7d946d56e2a0bdcf6675d01d1a9e1cff204ff6720'
       when 'MS 2400-3:2019' then 'STATIC: MS2400-3_2019.pdf | SHA256:8e757fa1821edb7a246dbf3146d8e44533c4d32badf5c214b9ab7d32b1c61058'
       else source_reference end,
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
