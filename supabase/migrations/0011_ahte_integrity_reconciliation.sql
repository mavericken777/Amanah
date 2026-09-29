-- AHTE integrity reconciliation: serialized event chain and scoped release blockers.
create or replace function private.ahte_record_event(
  p_org uuid,p_event_type text,p_entity_type text,p_entity_id uuid,p_actor_type text,p_actor_id uuid,p_payload jsonb,
  p_source_system text default null,p_signature text default null
) returns bigint language plpgsql security definer set search_path=public as $$
declare previous text; h text; new_id bigint;
begin
  perform pg_advisory_xact_lock(hashtext(p_org::text));
  select event_hash into previous from public.ahte_event_ledger where organization_id=p_org order by id desc limit 1;
  h:=encode(digest(coalesce(previous,'')||'|'||p_event_type||'|'||p_entity_type||'|'||p_entity_id::text||'|'||coalesce(p_payload::text,'{}')||'|'||coalesce(p_actor_type,'')||'|'||coalesce(p_actor_id::text,'')||'|'||coalesce(p_source_system,'')||'|'||coalesce(p_signature,''),'sha256'),'hex');
  insert into public.ahte_event_ledger(organization_id,event_type,entity_type,entity_id,actor_type,actor_id,payload,event_hash,previous_hash,signature,source_system)
  values(p_org,p_event_type,p_entity_type,p_entity_id,p_actor_type,p_actor_id,coalesce(p_payload,'{}'::jsonb),h,previous,p_signature,p_source_system)
  returning id into new_id;
  return new_id;
end $$;

create or replace function private.ahte_evaluate_release(p_org uuid,p_entity_type text,p_entity_id uuid,p_requires_authority boolean default false)
returns jsonb language plpgsql stable security definer set search_path=public as $$
declare ts record; blockers jsonb:='[]'::jsonb; eligible boolean:=true; unresolved_fractures integer:=0; reserved_cases integer:=0; approved_gates integer:=0;
begin
  select * into ts from public.ahte_trust_states where organization_id=p_org and entity_type=p_entity_type and entity_id=p_entity_id order by effective_at desc limit 1;
  if ts.id is null then return jsonb_build_object('eligible',false,'blockers',jsonb_build_array('no_trust_state')); end if;
  if coalesce(ts.hard_gate_status,'open')<>'passed' then blockers:=blockers||jsonb_build_array('hard_gates_not_passed'); eligible:=false; end if;
  select count(*) into unresolved_fractures from public.ahte_fracture_events where organization_id=p_org and entity_type=p_entity_type and entity_id=p_entity_id and resolution is null;
  if unresolved_fractures>0 then blockers:=blockers||jsonb_build_array('unresolved_trust_fracture'); eligible:=false; end if;
  select count(*) into reserved_cases
  from public.ahte_hitm_cases h left join public.ahte_assessments a on a.id=h.assessment_id
  where h.organization_id=p_org and h.status in ('open','escalated','held') and h.decision_class in ('D5','D6')
    and (((a.subject_type=p_entity_type) and (a.subject_id=p_entity_id))
      or (h.project_id is not distinct from ts.project_id and ts.project_id is not null and a.id is null));
  if reserved_cases>0 then blockers:=blockers||jsonb_build_array('open_reserved_authority_case'); eligible:=false; end if;
  if p_requires_authority then
    select count(*) into approved_gates from public.ahte_authority_gates where organization_id=p_org and project_id is not distinct from ts.project_id and status='approved';
    if approved_gates=0 then blockers:=blockers||jsonb_build_array('authority_gate_not_approved'); eligible:=false; end if;
  end if;
  return jsonb_build_object('eligible',eligible,'not_certification',true,'blockers',blockers,'trust_state_id',ts.id,'hard_gate_status',ts.hard_gate_status,'project_id',ts.project_id);
end $$;
