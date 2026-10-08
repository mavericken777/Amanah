-- Normalize current catalogue and partner-status labels without changing evidence records.

alter table public.ahte_instruments drop constraint if exists ahte_instruments_source_status_check;
alter table public.ahte_requirements drop constraint if exists ahte_requirements_source_status_check;
alter table public.ahte_source_records drop constraint if exists ahte_source_records_source_status_check;
alter table public.ahte_authorities drop constraint if exists ahte_authorities_source_status_check;
alter table public.ahte_partners drop constraint if exists ahte_partners_authority_status_check;
alter table public.ahte_standard_mappings drop constraint if exists ahte_standard_mappings_mapping_status_check;

update public.ahte_instruments
set source_status = 'active'
where source_status not in ('verified', 'active', 'unverified', 'conflicted');

update public.ahte_requirements
set source_status = 'active'
where source_status not in ('verified', 'active', 'unverified', 'conflicted');

update public.ahte_source_records
set source_status = 'catalogued_reference'
where source_status not in ('source_verified', 'catalogued_reference', 'expired', 'superseded', 'conflicted');

update public.ahte_authorities
set source_status = 'unverified'
where source_status not in ('verified', 'unverified', 'conflicted');

update public.ahte_partners
set authority_status = 'unverified'
where authority_status not in ('verified', 'unverified', 'conflicted');

update public.ahte_standard_mappings
set mapping_status = 'active'
where mapping_status not in ('draft', 'reviewed', 'approved', 'active');

alter table public.ahte_instruments
  alter column source_status set default 'active',
  add constraint ahte_instruments_source_status_check
    check (source_status in ('verified', 'active', 'unverified', 'conflicted'));

alter table public.ahte_requirements
  alter column source_status set default 'active',
  add constraint ahte_requirements_source_status_check
    check (source_status in ('verified', 'active', 'unverified', 'conflicted'));

alter table public.ahte_source_records
  alter column source_status set default 'catalogued_reference',
  add constraint ahte_source_records_source_status_check
    check (source_status in ('source_verified', 'catalogued_reference', 'expired', 'superseded', 'conflicted'));

alter table public.ahte_authorities
  add constraint ahte_authorities_source_status_check
    check (source_status in ('verified', 'unverified', 'conflicted'));

alter table public.ahte_partners
  add constraint ahte_partners_authority_status_check
    check (authority_status in ('verified', 'unverified', 'conflicted'));

alter table public.ahte_standard_mappings
  add constraint ahte_standard_mappings_mapping_status_check
    check (mapping_status in ('draft', 'reviewed', 'approved', 'active'));

update public.ahte_instruments
   set source_reference = 'PROJECT-REPO: GlobalHalalDigitalTrust — current Malaysian/JAKIM standards register'
 where code in ('MS 2400-1:2019','MS 2400-2:2019','MS 2400-3:2019');

-- Keep organization onboarding aligned with the current status vocabulary.
create or replace function private.ahte_seed_reference_catalog(target_org uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
  insert into public.ahte_instruments(organization_id,authority_id,code,title,instrument_type,version,jurisdiction,source_status,source_reference)
  values
    (target_org,NULL,'MS 1500:2019','Halal food - General requirements','standard','2019','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2400-1:2019','Halal supply chain management system - Transportation','standard','2019','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2400-2:2019','Halal supply chain management system - Warehousing','standard','2019','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2400-3:2019','Halal supply chain management system - Retailing','standard','2019','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2424:2019','Halal pharmaceuticals - General requirements','standard','2019','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2634:2019','Halal cosmetics - General requirements','standard','2019','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2738:2023','Halal consumable goods - General requirements','standard','2023','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2803:2025','Animal bone, skin and hair - General requirements for halal products','standard','2025','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2809:2025','Authentication of products using chemometric techniques','standard','2025','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2810:2025','Consumable goods - Test method - Identification of pig skin and hair','standard','2025','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2393:2023','Islamic and halal terminologies - Definitions and interpretations','standard','2023','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2627:2017','Detection of porcine DNA - Food and food products','standard','2017','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2627-2:2025','Detection of porcine DNA - Cosmetics','standard','2025','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 1900:2025','Shariah-based quality management system - Requirements','standard','2025','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2691:2021','Halal profession - General requirements','standard','2021','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2610:2015','Muslim-friendly hospitality services','standard','2015','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust'),
    (target_org,NULL,'MS 2636:2019','Halal medical device - General requirements','standard','2019','Malaysia','active','PROJECT-REPO: GlobalHalalDigitalTrust')
  on conflict do nothing;
end $$;

create or replace function private.ahte_seed_supplemental_ms_catalog(target_org uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
  insert into public.ahte_instruments(
    organization_id,authority_id,code,title,instrument_type,version,jurisdiction,source_status,source_reference
  ) values (
    target_org,null,'MS 2683:2017','Kelulut (Stingless bee) honey - Specification','supplemental_standard','2017','Malaysia','active',
    'PROJECT-REPO: GlobalHalalDigitalTrust — current Malaysian/JAKIM standards register'
  ) on conflict do nothing;
end $$;

create or replace function private.ahte_seed_ms2400_source_bindings(target_org uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
  update public.ahte_instruments
     set source_reference = 'PROJECT-REPO: GlobalHalalDigitalTrust — current Malaysian/JAKIM standards register',
       source_status='active'
   where organization_id=target_org
     and code in ('MS 2400-1:2019','MS 2400-2:2019','MS 2400-3:2019');
end $$;

create or replace function private.ahte_seed_on_org_created()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  perform private.ahte_seed_operating_rules(new.id);
  perform private.ahte_seed_reference_catalog(new.id);
  perform private.ahte_seed_ms2400_source_bindings(new.id);
  perform private.ahte_seed_supplemental_ms_catalog(new.id);
  return new;
end $$;

revoke all on function private.ahte_seed_reference_catalog(uuid) from public;
revoke all on function private.ahte_seed_ms2400_source_bindings(uuid) from public, anon, authenticated;
revoke all on function private.ahte_seed_supplemental_ms_catalog(uuid) from public;
revoke all on function private.ahte_seed_on_org_created() from public;

do $$
declare org record;
begin
  for org in select id from public.organizations loop
    perform private.ahte_seed_reference_catalog(org.id);
    perform private.ahte_seed_ms2400_source_bindings(org.id);
    perform private.ahte_seed_supplemental_ms_catalog(org.id);
  end loop;
end $$;
