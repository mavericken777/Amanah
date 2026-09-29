-- [PROPOSAL: closes hard-gate/release enforcement drift — path point: Control -> Evidence -> Authority Gate -> Trust State -> Operational Release]
-- Source binding: GlobalHalalDigitalTrust@3d5cc29fabf7c3ed0da20cd938219fed83e74830
-- Authority boundary: Operational Release is not certification. D5/D6 remain externally reserved.

-- -----------------------------------------------------------------------------
-- 1. Production trust-state vocabulary follows the current post-freeze machine
--    spec. The older conceptual vocabulary remains documented as a source conflict.
-- -----------------------------------------------------------------------------
alter table public.ahte_trust_states drop constraint if exists ahte_trust_states_state_check;
alter table public.ahte_trust_states add constraint ahte_trust_states_state_check
  check (state in (
    'draft','evidence_incomplete','assessed','hitm_open','authority_pending',
    'authority_decided','eligible','released','held','quarantined','contested','withdrawn'
  ));

alter table public.ahte_trust_states drop constraint if exists ahte_trust_state_gate_consistency;
alter table public.ahte_trust_states add constraint ahte_trust_state_gate_consistency
  check (
    (state not in ('eligible','released') or hard_gate_status = 'passed')
    and (hard_gate_status <> 'failed' or state in ('held','quarantined'))
  );

alter table public.ahte_trust_states drop constraint if exists ahte_trust_states_hard_gate_status_check;
alter table public.ahte_trust_states add constraint ahte_trust_states_hard_gate_status_check
  check (hard_gate_status in ('open','passed','failed'));

-- -----------------------------------------------------------------------------
-- 2. Per-entity gate result. A score never substitutes for this evidence record.
-- -----------------------------------------------------------------------------
create table if not exists public.ahte_hard_gate_results (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  gate_code text not null,
  status text not null default 'open' check (status in ('open','passed','failed','waived')),
  evidence_id uuid references public.ahte_evidence(id) on delete set null,
  authority_decision_id uuid references public.ahte_authority_decisions(id) on delete set null,
  rationale text,
  evaluated_by uuid references auth.users(id) on delete set null,
  evaluated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, entity_type, entity_id, gate_code)
);

create index if not exists ahte_hard_gate_results_entity_idx
  on public.ahte_hard_gate_results(organization_id,entity_type,entity_id,status);
create index if not exists ahte_hard_gate_results_gate_idx
  on public.ahte_hard_gate_results(organization_id,gate_code,status);
create index if not exists ahte_hard_gate_results_evidence_idx
  on public.ahte_hard_gate_results(evidence_id) where evidence_id is not null;
create index if not exists ahte_hard_gate_results_authority_idx
  on public.ahte_hard_gate_results(authority_decision_id) where authority_decision_id is not null;

alter table public.ahte_hard_gate_results enable row level security;
grant select,insert,update on public.ahte_hard_gate_results to authenticated;
revoke all on public.ahte_hard_gate_results from anon;

create policy ahte_hard_gate_results_member_select on public.ahte_hard_gate_results
  for select to authenticated using (private.is_org_member(organization_id));
create policy ahte_hard_gate_results_writer_insert on public.ahte_hard_gate_results
  for insert to authenticated
  with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));
create policy ahte_hard_gate_results_writer_update on public.ahte_hard_gate_results
  for update to authenticated
  using (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']))
  with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));
create policy ahte_hard_gate_results_admin_delete on public.ahte_hard_gate_results
  for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin']));

-- Configuration is governance-controlled, not member-editable.
drop policy if exists ahte_hard_gate_rules_member_insert on public.ahte_hard_gate_rules;
drop policy if exists ahte_hard_gate_rules_member_update on public.ahte_hard_gate_rules;
create policy ahte_hard_gate_rules_admin_insert on public.ahte_hard_gate_rules
  for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin']));
create policy ahte_hard_gate_rules_admin_update on public.ahte_hard_gate_rules
  for update to authenticated
  using (private.has_org_role(organization_id,array['owner','admin']))
  with check (private.has_org_role(organization_id,array['owner','admin']));

drop policy if exists ahte_state_transitions_member_insert on public.ahte_state_transitions;
drop policy if exists ahte_state_transitions_member_update on public.ahte_state_transitions;
create policy ahte_state_transitions_admin_insert on public.ahte_state_transitions
  for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin']));
create policy ahte_state_transitions_admin_update on public.ahte_state_transitions
  for update to authenticated
  using (private.has_org_role(organization_id,array['owner','admin']))
  with check (private.has_org_role(organization_id,array['owner','admin']));

-- -----------------------------------------------------------------------------
-- 3. Seed the canonical hard gates and current machine transitions for every org.
-- -----------------------------------------------------------------------------
create or replace function private.ahte_seed_canonical_control_plane(p_org uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  insert into public.ahte_hard_gate_rules
    (organization_id,code,dimension,fail_condition,decision_class,compensable,active)
  values
    (p_org,'HG-AUTH','authority_certificate','required certificate missing, expired, suspended, or out of scope','D5',false,true),
    (p_org,'HG-ID','identity','legal entity / factory / SKU / batch identity unresolved',null,false,true),
    (p_org,'HG-LAB','laboratory','positive prohibited analyte or contested lab packet used as HALAL',null,false,true),
    (p_org,'HG-SEAL','seal','seal break or seal-id mismatch without human close-out','D4',false,true),
    (p_org,'HG-CUSTODY','custody','unexplained custody gap on the corridor',null,false,true),
    (p_org,'HG-DEST','destination','destination hold / refusal','D5',false,true),
    (p_org,'HG-HITM','human_decision','open D5/D6 HITM case',null,false,true)
  on conflict (organization_id,code) do update set
    dimension=excluded.dimension,
    fail_condition=excluded.fail_condition,
    decision_class=excluded.decision_class,
    compensable=false,
    active=true;

  insert into public.ahte_state_transitions
    (organization_id,machine,from_state,to_state,event,required_decision_class,active)
  values
    (p_org,'trust','draft','evidence_incomplete','packet_opened',null,true),
    (p_org,'trust','evidence_incomplete','assessed','D2_assessment','D2',true),
    (p_org,'trust','assessed','hitm_open','D3_D6_detect','D3',true),
    (p_org,'trust','assessed','eligible','hard_gates_pass_and_no_reserved',null,true),
    (p_org,'trust','hitm_open','authority_pending','D5_D6_case','D5',true),
    (p_org,'trust','authority_pending','authority_decided','E5_authority_decision','D5',true),
    (p_org,'trust','eligible','released','operational_release',null,true),
    (p_org,'trust','assessed','held','fracture_D4','D4',true),
    (p_org,'trust','eligible','held','fracture_D4','D4',true),
    (p_org,'trust','released','held','fracture_D4','D4',true),
    (p_org,'trust','held','eligible','human_determination_and_reverification','D3',true),
    (p_org,'trust','held','authority_pending','escalated_D5','D5',true),
    (p_org,'trust','released','withdrawn','authority_suspension','D5',true)
  on conflict (organization_id,machine,from_state,event) do update set
    to_state=excluded.to_state,
    required_decision_class=excluded.required_decision_class,
    active=true;
end;
$$;
revoke all on function private.ahte_seed_canonical_control_plane(uuid) from public,anon,authenticated;

create or replace function private.ahte_seed_canonical_control_plane_trigger()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform private.ahte_seed_canonical_control_plane(new.id);
  return new;
end;
$$;
revoke all on function private.ahte_seed_canonical_control_plane_trigger() from public,anon,authenticated;

drop trigger if exists ahte_seed_canonical_control_plane_on_org on public.organizations;
create trigger ahte_seed_canonical_control_plane_on_org
  after insert on public.organizations
  for each row execute function private.ahte_seed_canonical_control_plane_trigger();

do $$ declare r record; begin
  for r in select id from public.organizations loop
    perform private.ahte_seed_canonical_control_plane(r.id);
  end loop;
end $$;

-- -----------------------------------------------------------------------------
-- 4. Gate results are evidence-bound. Reserved D5 gates need E5 + final/signed
--    external authority decision. Waivers are competent-authority acts only.
-- -----------------------------------------------------------------------------
create or replace function private.ahte_validate_hard_gate_result()
returns trigger language plpgsql security definer set search_path = '' as $$
declare
  r record;
  ev record;
  ad record;
  actor uuid;
begin
  select code,decision_class,compensable into r
  from public.ahte_hard_gate_rules
  where organization_id=new.organization_id and code=new.gate_code and active=true;
  if r.code is null then raise exception 'unknown_or_inactive_hard_gate:%',new.gate_code using errcode='23514'; end if;
  if r.compensable then raise exception 'hard_gate_must_be_noncompensable:%',new.gate_code using errcode='23514'; end if;

  actor := auth.uid();
  if actor is not null then new.evaluated_by := actor; end if;
  new.evaluated_at := now();
  new.updated_at := now();

  if new.status='passed' then
    if new.evidence_id is null then raise exception 'passed_gate_requires_verified_evidence:%',new.gate_code using errcode='23514'; end if;
    select evidence_class,status,metadata into ev
    from public.ahte_evidence
    where id=new.evidence_id and organization_id=new.organization_id;
    if ev.status is null or ev.status <> 'verified' then
      raise exception 'passed_gate_requires_verified_evidence:%',new.gate_code using errcode='23514';
    end if;
  end if;

  if new.status='waived' or (new.status='passed' and r.decision_class='D5') then
    if new.authority_decision_id is null then
      raise exception 'reserved_or_waived_gate_requires_authority_decision:%',new.gate_code using errcode='23514';
    end if;
    select status,decision_reference,signature_hash into ad
    from public.ahte_authority_decisions
    where id=new.authority_decision_id and organization_id=new.organization_id;
    if ad.status is null or ad.status not in ('signed','final') or ad.decision_reference is null or ad.signature_hash is null then
      raise exception 'authority_decision_not_final_or_proven:%',new.gate_code using errcode='23514';
    end if;
  end if;

  if new.status='passed' and r.decision_class='D5' then
    if ev.evidence_class is distinct from 'E5'
       or coalesce(ev.metadata->>'external_authority_reference','')='' then
      raise exception 'D5_gate_requires_verified_E5_external_authority_evidence:%',new.gate_code using errcode='23514';
    end if;
  end if;

  return new;
end;
$$;
revoke all on function private.ahte_validate_hard_gate_result() from public,anon,authenticated;

drop trigger if exists ahte_validate_hard_gate_result on public.ahte_hard_gate_results;
create trigger ahte_validate_hard_gate_result
  before insert or update on public.ahte_hard_gate_results
  for each row execute function private.ahte_validate_hard_gate_result();

create or replace function private.ahte_evaluate_hard_gates(p_org uuid,p_entity_type text,p_entity_id uuid)
returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  required_count integer := 0;
  satisfied_count integer := 0;
  blockers jsonb := '[]'::jsonb;
begin
  select count(*) into required_count
  from public.ahte_hard_gate_rules r
  where r.organization_id=p_org and r.active=true;

  if required_count=0 then
    return jsonb_build_object('passed',false,'required_count',0,'satisfied_count',0,'blockers',jsonb_build_array(jsonb_build_object('code','CONTROL-PLANE','status','rules_not_seeded')));
  end if;

  select count(*) into satisfied_count
  from public.ahte_hard_gate_rules r
  join public.ahte_hard_gate_results g
    on g.organization_id=r.organization_id
   and g.gate_code=r.code
   and g.entity_type=p_entity_type
   and g.entity_id=p_entity_id
  where r.organization_id=p_org and r.active=true and r.compensable=false
    and g.status in ('passed','waived');

  select coalesce(jsonb_agg(jsonb_build_object(
      'code',r.code,
      'dimension',r.dimension,
      'status',coalesce(g.status,'missing'),
      'fail_condition',r.fail_condition
    ) order by r.code),'[]'::jsonb) into blockers
  from public.ahte_hard_gate_rules r
  left join public.ahte_hard_gate_results g
    on g.organization_id=r.organization_id
   and g.gate_code=r.code
   and g.entity_type=p_entity_type
   and g.entity_id=p_entity_id
  where r.organization_id=p_org and r.active=true
    and (g.id is null or g.status not in ('passed','waived'));

  return jsonb_build_object(
    'passed',satisfied_count=required_count,
    'required_count',required_count,
    'satisfied_count',satisfied_count,
    'blockers',blockers,
    'score_compensation_allowed',false,
    'not_certification',true
  );
end;
$$;
revoke all on function private.ahte_evaluate_hard_gates(uuid,text,uuid) from public,anon,authenticated;

create or replace function public.ahte_evaluate_hard_gates_proxy(p_org uuid,p_entity_type text,p_entity_id uuid)
returns jsonb language plpgsql security invoker set search_path = 'public' as $$
begin
  if not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
  return private.ahte_evaluate_hard_gates(p_org,p_entity_type,p_entity_id);
end;
$$;
revoke all on function public.ahte_evaluate_hard_gates_proxy(uuid,text,uuid) from public,anon;
grant execute on function public.ahte_evaluate_hard_gates_proxy(uuid,text,uuid) to authenticated;

create or replace function public.ahte_record_hard_gate_result_proxy(
  p_org uuid,p_project uuid,p_entity_type text,p_entity_id uuid,p_gate_code text,p_status text,
  p_evidence_id uuid default null,p_authority_decision_id uuid default null,p_rationale text default null
) returns uuid language plpgsql security invoker set search_path='public' as $$
declare rid uuid;
begin
  if not private.has_org_role(p_org,array['owner','admin','executive','project_manager']) then
    raise exception 'workspace_forbidden' using errcode='42501';
  end if;
  insert into public.ahte_hard_gate_results(
    organization_id,project_id,entity_type,entity_id,gate_code,status,evidence_id,authority_decision_id,rationale,evaluated_by
  ) values (
    p_org,p_project,p_entity_type,p_entity_id,p_gate_code,p_status,p_evidence_id,p_authority_decision_id,p_rationale,auth.uid()
  ) on conflict (organization_id,entity_type,entity_id,gate_code) do update set
    project_id=excluded.project_id,status=excluded.status,evidence_id=excluded.evidence_id,
    authority_decision_id=excluded.authority_decision_id,rationale=excluded.rationale,evaluated_by=auth.uid()
  returning id into rid;
  return rid;
end;
$$;
revoke all on function public.ahte_record_hard_gate_result_proxy(uuid,uuid,text,uuid,text,text,uuid,uuid,text) from public,anon;
grant execute on function public.ahte_record_hard_gate_result_proxy(uuid,uuid,text,uuid,text,text,uuid,uuid,text) to authenticated;

-- -----------------------------------------------------------------------------
-- 5. Database-level trust-state enforcement prevents Data API bypass.
-- -----------------------------------------------------------------------------
create or replace function private.ahte_enforce_trust_state_hard_gates()
returns trigger language plpgsql security definer set search_path = '' as $$
declare gate_eval jsonb;
begin
  if new.state in ('eligible','released') or new.hard_gate_status='passed' then
    gate_eval := private.ahte_evaluate_hard_gates(new.organization_id,new.entity_type,new.entity_id);
    if coalesce((gate_eval->>'passed')::boolean,false) is not true then
      raise exception 'hard_gate_evidence_incomplete:%',gate_eval::text using errcode='23514';
    end if;
    new.hard_gate_status := 'passed';
  end if;
  return new;
end;
$$;
revoke all on function private.ahte_enforce_trust_state_hard_gates() from public,anon,authenticated;

drop trigger if exists ahte_enforce_trust_state_hard_gates on public.ahte_trust_states;
create trigger ahte_enforce_trust_state_hard_gates
  before insert or update on public.ahte_trust_states
  for each row execute function private.ahte_enforce_trust_state_hard_gates();

-- -----------------------------------------------------------------------------
-- 6. Authority-gate PASS itself must be backed by a signed/final external record.
-- -----------------------------------------------------------------------------
create or replace function private.ahte_enforce_authority_gate_pass()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  if new.status='passed' then
    if not exists (
      select 1 from public.ahte_authority_decisions d
      where d.organization_id=new.organization_id
        and d.authority_gate_id=new.id
        and d.status in ('signed','final')
        and d.decision_reference is not null
        and d.signature_hash is not null
    ) then
      raise exception 'authority_gate_pass_requires_external_final_decision' using errcode='23514';
    end if;
  end if;
  return new;
end;
$$;
revoke all on function private.ahte_enforce_authority_gate_pass() from public,anon,authenticated;

drop trigger if exists ahte_enforce_authority_gate_pass on public.ahte_authority_gates;
create trigger ahte_enforce_authority_gate_pass
  before insert or update on public.ahte_authority_gates
  for each row execute function private.ahte_enforce_authority_gate_pass();

-- -----------------------------------------------------------------------------
-- 7. Replace stale release evaluator enums and derive gates from evidence results.
-- -----------------------------------------------------------------------------
create or replace function private.ahte_evaluate_release(
  p_org uuid,p_entity_type text,p_entity_id uuid,p_requires_authority boolean default false
) returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare
  ts record;
  blockers jsonb := '[]'::jsonb;
  eligible boolean := true;
  unresolved_fractures integer := 0;
  reserved_cases integer := 0;
  passed_authority_gates integer := 0;
  gate_eval jsonb;
begin
  select * into ts from public.ahte_trust_states
  where organization_id=p_org and entity_type=p_entity_type and entity_id=p_entity_id
  order by effective_at desc limit 1;
  if ts.id is null then return jsonb_build_object('eligible',false,'blockers',jsonb_build_array('no_trust_state'),'not_certification',true); end if;

  gate_eval := private.ahte_evaluate_hard_gates(p_org,p_entity_type,p_entity_id);
  if coalesce((gate_eval->>'passed')::boolean,false) is not true then
    blockers := blockers || jsonb_build_array('hard_gates_not_passed');
    eligible := false;
  end if;

  select count(*) into unresolved_fractures from public.ahte_fracture_events
  where organization_id=p_org and entity_type=p_entity_type and entity_id=p_entity_id and resolution is null;
  if unresolved_fractures>0 then blockers:=blockers||jsonb_build_array('unresolved_trust_fracture'); eligible:=false; end if;

  select count(*) into reserved_cases
  from public.ahte_hitm_cases h
  left join public.ahte_assessments a on a.id=h.assessment_id
  where h.organization_id=p_org
    and h.status in ('open','under_review')
    and h.decision_class in ('D5','D6')
    and ((a.subject_type=p_entity_type and a.subject_id=p_entity_id)
      or (h.project_id is not distinct from ts.project_id and ts.project_id is not null and a.id is null));
  if reserved_cases>0 then blockers:=blockers||jsonb_build_array('open_reserved_authority_case'); eligible:=false; end if;

  if p_requires_authority then
    select count(*) into passed_authority_gates
    from public.ahte_authority_gates g
    where g.organization_id=p_org and g.project_id is not distinct from ts.project_id and g.status='passed';
    if passed_authority_gates=0 then blockers:=blockers||jsonb_build_array('authority_gate_not_passed'); eligible:=false; end if;
  end if;

  return jsonb_build_object(
    'eligible',eligible,'not_certification',true,'blockers',blockers,
    'trust_state_id',ts.id,'hard_gate_status',case when (gate_eval->>'passed')::boolean then 'passed' else 'open' end,
    'hard_gate_evaluation',gate_eval,'project_id',ts.project_id
  );
end;
$$;
revoke all on function private.ahte_evaluate_release(uuid,text,uuid,boolean) from public,anon,authenticated;

-- -----------------------------------------------------------------------------
-- 8. API/schema compatibility corrections found in the repository-wide audit.
-- -----------------------------------------------------------------------------
alter table public.ahte_fracture_events add column if not exists metadata jsonb not null default '{}'::jsonb;

alter table public.ahte_applicability drop constraint if exists ahte_applicability_decision_check;
alter table public.ahte_applicability add constraint ahte_applicability_decision_check
  check (decision in ('applicable','not_applicable','conditional','pending','undetermined'));

create or replace function private.ahte_normalize_release_decision()
returns trigger language plpgsql set search_path = '' as $$
begin
  if new.decision='released' then new.decision:='release'; end if;
  return new;
end;
$$;
revoke all on function private.ahte_normalize_release_decision() from public,anon,authenticated;
drop trigger if exists ahte_normalize_release_decision on public.ahte_release_decisions;
create trigger ahte_normalize_release_decision
  before insert or update on public.ahte_release_decisions
  for each row execute function private.ahte_normalize_release_decision();

-- Audit per-gate result changes with the existing immutable audit mechanism.
drop trigger if exists ahte_hard_gate_results_audit on public.ahte_hard_gate_results;
create trigger ahte_hard_gate_results_audit
  after insert or update or delete on public.ahte_hard_gate_results
  for each row execute function private.audit_row_change();
