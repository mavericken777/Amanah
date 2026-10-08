-- Current Malaysian/JAKIM standards reference catalogue.
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

create or replace function private.ahte_seed_on_org_created()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  perform private.ahte_seed_operating_rules(new.id);
  perform private.ahte_seed_reference_catalog(new.id);
  return new;
end $$;

drop trigger if exists ahte_seed_rules_on_org_created on public.organizations;
create trigger ahte_seed_rules_on_org_created after insert on public.organizations for each row execute procedure private.ahte_seed_on_org_created();

do $$ declare r record; begin for r in select id from public.organizations loop perform private.ahte_seed_reference_catalog(r.id); end loop; end $$;

revoke all on function private.ahte_seed_reference_catalog(uuid) from public;
revoke all on function private.ahte_seed_on_org_created() from public;
