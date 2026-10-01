-- AMANAH manufacturer onboarding transaction boundary.
-- Control date: 2026-10-02. Post-freeze; frozen standards are untouched.
-- SECURITY INVOKER preserves existing RLS tenant controls and makes the workflow atomic.

create or replace function public.ahte_register_manufacturer_onboarding(
  p_org uuid,
  p_payload jsonb
) returns jsonb
language plpgsql
security invoker
set search_path=public
as $$
declare
  actor uuid := auth.uid();
  identity_id uuid;
  partner_id uuid;
  facility_id uuid;
  product_id uuid;
  sku_id uuid;
  product_version_id uuid;
  supplier_id uuid;
  material_id uuid;
  formula_material_id uuid;
  production_line_id uuid;
  warehouse_id uuid;
  zone_id uuid;
  legal_name text := nullif(trim(p_payload->>'legal_name'),'');
  registration_no text := nullif(trim(p_payload->>'registration_no'),'');
  jurisdiction text := coalesce(nullif(trim(p_payload->>'jurisdiction'),''),'China');
  facility_name text := nullif(trim(p_payload->>'facility_name'),'');
  site_code text := nullif(trim(p_payload->>'site_code'),'');
  product_name text := nullif(trim(p_payload->>'product_name'),'');
  product_category text := nullif(trim(p_payload->>'product_category'),'');
  sku_code text := nullif(trim(p_payload->>'sku_code'),'');
  sku_name text := coalesce(nullif(trim(p_payload->>'sku_name'),''),product_name);
  gtin text := nullif(trim(p_payload->>'gtin'),'');
  supplier_name text := nullif(trim(p_payload->>'supplier_name'),'');
  supplier_registration_no text := nullif(trim(p_payload->>'supplier_registration_no'),'');
  material_name text := nullif(trim(p_payload->>'material_name'),'');
  material_role text := coalesce(nullif(trim(p_payload->>'material_role'),''),'raw_material');
  material_origin text := coalesce(nullif(trim(p_payload->>'material_origin'),''),jurisdiction);
  production_line_code text := nullif(trim(p_payload->>'production_line_code'),'');
  production_line_name text := coalesce(nullif(trim(p_payload->>'production_line_name'),''),production_line_code);
  warehouse_code text := nullif(trim(p_payload->>'warehouse_code'),'');
  warehouse_name text := coalesce(nullif(trim(p_payload->>'warehouse_name'),''),warehouse_code);
  warehouse_type text := coalesce(nullif(trim(p_payload->>'warehouse_type'),''),'ambient');
  zone_code text := nullif(trim(p_payload->>'zone_code'),'');
  zone_type text := coalesce(nullif(trim(p_payload->>'zone_type'),''),'controlled');
begin
  if actor is null then
    raise exception 'authentication_required' using errcode='42501';
  end if;
  if not exists (
    select 1 from public.organization_members
    where organization_id=p_org and user_id=actor
  ) then
    raise exception 'workspace_forbidden' using errcode='42501';
  end if;
  if legal_name is null or facility_name is null or site_code is null or product_name is null or sku_code is null then
    raise exception 'manufacturer_required_fields_missing' using errcode='22023';
  end if;
  if material_role not in ('ingredient','raw_material','processing_aid','packaging','other') then
    raise exception 'invalid_material_role' using errcode='22023';
  end if;

  insert into public.ahte_identities(
    organization_id,entity_type,legal_name,registration_no,jurisdiction,verification_status,metadata
  ) values (
    p_org,'manufacturer',legal_name,registration_no,jurisdiction,'unverified',
    jsonb_build_object('onboarding_source','manufacturer_portal','created_by_user',actor)
  ) returning id into identity_id;

  insert into public.ahte_partners(
    organization_id,name,partner_type,role,authority_status,identity_id,notes
  ) values (
    p_org,legal_name,'manufacturer','origin / manufacturer','unverified',identity_id,
    'Created through AMANAH onboarding. External authority status is not inferred.'
  ) returning id into partner_id;

  insert into public.ahte_facilities(
    organization_id,legal_name,site_code,jurisdiction,address,status,metadata
  ) values (
    p_org,facility_name,site_code,jurisdiction,jsonb_build_object('country',jurisdiction),'draft',
    jsonb_build_object('onboarding_source','manufacturer_portal')
  ) returning id into facility_id;

  if production_line_code is not null then
    insert into public.ahte_production_lines(
      organization_id,facility_id,line_code,name,status,created_by
    ) values (
      p_org,facility_id,production_line_code,production_line_name,'draft',actor
    ) returning id into production_line_id;
  end if;

  if zone_code is not null then
    insert into public.ahte_facility_zones(
      organization_id,facility_id,zone_code,zone_type,halal_status,status,metadata
    ) values (
      p_org,facility_id,zone_code,zone_type,'controlled','active',
      jsonb_build_object('onboarding_source','manufacturer_portal')
    ) returning id into zone_id;
  end if;

  insert into public.ahte_products(
    organization_id,manufacturer_partner_id,name,category,status,market_status,metadata
  ) values (
    p_org,partner_id,product_name,product_category,'draft','not_cleared',
    jsonb_build_object('onboarding_source','manufacturer_portal','facility_id',facility_id,
      'production_line_id',production_line_id)
  ) returning id into product_id;

  insert into public.ahte_skus(
    organization_id,product_id,sku_code,name,gtin,status,metadata,created_by
  ) values (
    p_org,product_id,sku_code,sku_name,gtin,'draft',
    jsonb_build_object('onboarding_source','manufacturer_portal'),actor
  ) returning id into sku_id;

  insert into public.ahte_product_versions(
    organization_id,product_id,version_no,formula_ref,status,metadata
  ) values (
    p_org,product_id,'1.0','FORMULA-'||sku_code,'draft',
    jsonb_build_object('onboarding_source','manufacturer_portal','sku_id',sku_id)
  ) returning id into product_version_id;

  if supplier_name is not null then
    insert into public.ahte_suppliers(
      organization_id,legal_name,registration_no,jurisdiction,risk_class,verification_status,status,metadata
    ) values (
      p_org,supplier_name,supplier_registration_no,material_origin,'medium','unverified','active',
      jsonb_build_object('onboarding_source','manufacturer_portal')
    ) returning id into supplier_id;
  end if;

  if material_name is not null then
    insert into public.ahte_materials(
      organization_id,supplier_id,name,material_role,category,source_type,origin_country,halal_status,status,metadata
    ) values (
      p_org,supplier_id,material_name,material_role,material_role,
      case when supplier_id is null then 'direct' else 'supplier' end,
      material_origin,'unverified','active',
      jsonb_build_object('onboarding_source','manufacturer_portal')
    ) returning id into material_id;

    insert into public.ahte_formula_materials(
      organization_id,product_version_id,material_id,quantity,unit,status,metadata
    ) values (
      p_org,product_version_id,material_id,null,null,'active',
      jsonb_build_object('onboarding_source','manufacturer_portal')
    ) returning id into formula_material_id;
  end if;

  if warehouse_code is not null then
    insert into public.ahte_warehouses(
      organization_id,facility_id,warehouse_code,name,warehouse_type,status,address,metadata,created_by
    ) values (
      p_org,facility_id,warehouse_code,warehouse_name,warehouse_type,'active',
      jsonb_build_object('country',jurisdiction),
      jsonb_build_object('onboarding_source','manufacturer_portal'),actor
    ) returning id into warehouse_id;
  end if;

  return jsonb_build_object(
    'identity_id',identity_id,'partner_id',partner_id,'facility_id',facility_id,
    'production_line_id',production_line_id,'zone_id',zone_id,'product_id',product_id,
    'sku_id',sku_id,'product_version_id',product_version_id,'supplier_id',supplier_id,
    'material_id',material_id,'formula_material_id',formula_material_id,'warehouse_id',warehouse_id
  );
end $$;

revoke all on function public.ahte_register_manufacturer_onboarding(uuid,jsonb) from public,anon;
grant execute on function public.ahte_register_manufacturer_onboarding(uuid,jsonb) to authenticated;