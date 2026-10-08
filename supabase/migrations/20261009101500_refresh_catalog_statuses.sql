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
