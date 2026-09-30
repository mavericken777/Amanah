-- [PROPOSAL] Technical enforcement only; no authority decision or certification.
-- Keep SELECT policy independent from the privileged write policies.
do $$ declare t text; action text; begin
 foreach t in array array['ahte_hard_gate_rules','ahte_state_transitions'] loop
  execute format('drop policy controlled_policy_write on public.%I',t);
  foreach action in array array['INSERT','UPDATE','DELETE'] loop
   execute format('create policy controlled_%s on public.%I for %s to authenticated %s',lower(action),t,action,
    case action when 'INSERT' then 'with check(private.has_org_role(organization_id,array[''owner'',''admin'',''executive'']))'
     when 'UPDATE' then 'using(private.has_org_role(organization_id,array[''owner'',''admin'',''executive''])) with check(private.has_org_role(organization_id,array[''owner'',''admin'',''executive'']))'
     else 'using(private.has_org_role(organization_id,array[''owner'',''admin'',''executive'']))' end);
  end loop;
 end loop;
end $$;

-- Explicit operator-provided product binding. An identity UUID is not a product UUID.
alter table public.ahte_certificates add column product_id uuid references public.ahte_products(id) on delete restrict;
create index ahte_certificates_product_idx on public.ahte_certificates(product_id);
comment on column public.ahte_certificates.product_id is 'Explicit externally evidenced product scope binding; does not create certification.';

create or replace function private.ahte_domain_hold() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 case new.entity_type
  when 'shipment' then update public.ahte_shipments set status='border_hold' where organization_id=new.organization_id and id=new.entity_id;
  when 'batch' then update public.ahte_batches set status='held' where organization_id=new.organization_id and id=new.entity_id;
  when 'material_lot' then update public.ahte_material_lots set status='quarantine' where organization_id=new.organization_id and id=new.entity_id;
  when 'shipment_item' then update public.ahte_shipment_items set eligibility_status='held' where organization_id=new.organization_id and id=new.entity_id;
  when 'product' then update public.ahte_products set status='suspended',market_status='not_cleared' where organization_id=new.organization_id and id=new.entity_id;
  else null;
 end case;
 return new;
end $$;
create trigger ahte_fracture_domain_hold after insert on public.ahte_fracture_events for each row execute function private.ahte_domain_hold();
revoke all on function private.ahte_domain_hold() from public,anon,authenticated;

-- RLS remains active; failed scopes roll back the parent and all audit events.
create function public.ahte_create_recall_proxy(p_org uuid,p_body jsonb) returns jsonb
language plpgsql security invoker set search_path='' as $$
declare recall public.ahte_recalls; item jsonb;
begin
 if auth.uid() is null or not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
 if jsonb_typeof(p_body) is distinct from 'object' or nullif(trim(p_body->>'recall_code'),'') is null or nullif(trim(p_body->>'reason'),'') is null then raise exception 'recall_code_and_reason_required' using errcode='22023'; end if;
 if p_body ? 'scope_entities' and jsonb_typeof(p_body->'scope_entities') is distinct from 'array' then raise exception 'scope_entities_array_required' using errcode='22023'; end if;
 insert into public.ahte_recalls(organization_id,recall_code,reason,scope,authority_reference,status)
 values(p_org,p_body->>'recall_code',p_body->>'reason',coalesce(p_body->'scope','{}'::jsonb),p_body->>'authority_reference','open') returning * into recall;
 for item in select value from jsonb_array_elements(coalesce(p_body->'scope_entities','[]'::jsonb)) loop
  if jsonb_typeof(item) is distinct from 'object' or nullif(trim(item->>'entity_type'),'') is null or nullif(trim(item->>'entity_id'),'') is null then raise exception 'recall_scope_subject_required' using errcode='22023'; end if;
  insert into public.ahte_recall_scopes(organization_id,recall_id,entity_type,entity_id,action,status)
  values(p_org,recall.id,item->>'entity_type',(item->>'entity_id')::uuid,coalesce(item->>'action','monitor'),'open');
 end loop;
 return to_jsonb(recall);
end $$;
revoke all on function public.ahte_create_recall_proxy(uuid,jsonb) from public,anon;
grant execute on function public.ahte_create_recall_proxy(uuid,jsonb) to authenticated;
