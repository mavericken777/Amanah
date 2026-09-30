-- [PROPOSAL] Post-freeze operational controls; no certification authority.
-- Canonical binding: GlobalHalalDigitalTrust@3d5cc29fabf7c3ed0da20cd938219fed83e74830.
create table public.ahte_gate_results (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references public.organizations(id),
 project_id uuid references public.projects(id), entity_type text not null, entity_id uuid not null,
 gate_id text not null check(gate_id in ('HG-AUTH','HG-ID','HG-LAB','HG-SEAL','HG-CUSTODY','HG-DEST','HG-HITM')),
 result text not null check(result in ('passed','failed','waived')),
 evidence_id uuid not null references public.ahte_evidence(id),
 authority_decision_id uuid references public.ahte_authority_decisions(id),
 reviewed_by uuid not null references auth.users(id),
 rationale text not null check(length(trim(rationale))>0),
 reviewed_at timestamptz not null default clock_timestamp(), expires_at timestamptz,
 unique(organization_id,entity_type,entity_id,gate_id,reviewed_at)
);
create index ahte_gate_results_entity_idx on public.ahte_gate_results(organization_id,entity_type,entity_id,gate_id,reviewed_at desc);
create index ahte_gate_results_evidence_idx on public.ahte_gate_results(evidence_id);
create index ahte_gate_results_authority_idx on public.ahte_gate_results(authority_decision_id);
create index ahte_gate_results_project_idx on public.ahte_gate_results(project_id);
create index ahte_gate_results_reviewer_idx on public.ahte_gate_results(reviewed_by);
alter table public.ahte_gate_results enable row level security;
create policy gate_results_read on public.ahte_gate_results for select to authenticated using(private.is_org_member(organization_id));
create policy gate_results_write on public.ahte_gate_results for insert to authenticated with check(private.has_org_role(organization_id,array['owner','admin','executive','project_manager']) and reviewed_by=(select auth.uid()));
grant select,insert on public.ahte_gate_results to authenticated;
revoke update,delete on public.ahte_gate_results from authenticated;

alter table public.ahte_trust_states add column transition_event text, add column previous_state_id uuid references public.ahte_trust_states(id);
alter table public.ahte_fracture_events add column reverification_id uuid references public.ahte_reverifications(id);
create index ahte_fracture_reverification_idx on public.ahte_fracture_events(reverification_id);
create index ahte_trust_states_previous_idx on public.ahte_trust_states(previous_state_id);
alter table public.ahte_trust_states drop constraint ahte_trust_states_state_check;
alter table public.ahte_release_decisions drop constraint ahte_release_decisions_organization_id_project_id_key;
alter table public.ahte_trust_states add constraint ahte_trust_states_state_check check(state in ('draft','evidence_incomplete','assessed','hitm_open','authority_pending','authority_decided','eligible','released','held','quarantined','contested','withdrawn','unverified','verified','conditionally_verified','expired','rejected'));
-- Legacy vocabularies remain readable; new mutations use the bound machine proposal.

create or replace function private.ahte_same_org_guard() returns trigger
language plpgsql security definer set search_path='' as $$
declare j jsonb; c record; target uuid; parent_org uuid;
begin
 j:=case when tg_op='DELETE' then to_jsonb(old) else to_jsonb(new) end;
 perform pg_advisory_xact_lock(hashtext(j->>'organization_id'));
 if tg_op='DELETE' then return old; end if;
 if tg_op='UPDATE' and new.organization_id is distinct from old.organization_id then raise exception 'organization_immutable' using errcode='23514'; end if;
 for c in
  select con.confrelid::regclass as parent,a.attname as child_col,pa.attname as parent_col
  from pg_constraint con
  join pg_attribute a on a.attrelid=con.conrelid and a.attnum=con.conkey[1]
  join pg_attribute pa on pa.attrelid=con.confrelid and pa.attnum=con.confkey[1]
  where con.conrelid=tg_relid and con.contype='f' and cardinality(con.conkey)=1
   and exists(select 1 from pg_attribute x where x.attrelid=con.confrelid and x.attname='organization_id' and not x.attisdropped)
 loop
  target:=(j->>c.child_col)::uuid;
  if target is not null then
   execute format('select organization_id from %s where %I=$1',c.parent,c.parent_col) into parent_org using target;
   if parent_org is distinct from (j->>'organization_id')::uuid then raise exception 'cross_organization_reference: %',c.child_col using errcode='23514'; end if;
  end if;
 end loop;
 if j ? 'evidence_ids' and exists(select 1 from jsonb_array_elements_text(j->'evidence_ids') x(id) left join public.ahte_evidence e on e.id=x.id::uuid and e.organization_id=(j->>'organization_id')::uuid where e.id is null) then raise exception 'cross_organization_evidence' using errcode='23514'; end if;
 return new;
end $$;

create or replace function private.ahte_gate_blockers(p_org uuid,p_type text,p_id uuid,p_project uuid) returns jsonb
language plpgsql security definer set search_path='' as $$
declare blockers jsonb:='[]'; g text; r record; e record; d record; gate record; authority record; fracture_time timestamptz;
begin
 select max(detected_at) into fracture_time from public.ahte_fracture_events where organization_id=p_org and entity_type=p_type and entity_id=p_id;
 foreach g in array array['HG-AUTH','HG-ID','HG-LAB','HG-SEAL','HG-CUSTODY','HG-DEST','HG-HITM'] loop
  select * into r from public.ahte_gate_results where organization_id=p_org and entity_type=p_type and entity_id=p_id and gate_id=g order by reviewed_at desc,id desc limit 1;
  if r.id is null or r.project_id is distinct from p_project or r.result='failed' or (r.expires_at is not null and r.expires_at<=now()) or (fracture_time is not null and r.reviewed_at<=fracture_time) then
   blockers:=blockers||jsonb_build_array(g||':missing_failed_expired_or_stale'); continue;
  end if;
  select * into e from public.ahte_evidence where id=r.evidence_id and organization_id=p_org;
  if e.id is null or e.status<>'verified' or nullif(trim(e.content_hash),'') is null or (e.valid_from is not null and e.valid_from>now()) or (e.valid_to is not null and e.valid_to<=now()) then blockers:=blockers||jsonb_build_array(g||':invalid_evidence'); end if;
  if (e.metadata->>'entity_type') is distinct from p_type or (e.metadata->>'entity_id') is distinct from p_id::text then blockers:=blockers||jsonb_build_array(g||':evidence_subject_mismatch'); end if;
  if r.result='waived' or g in ('HG-AUTH','HG-DEST') then
   select * into d from public.ahte_authority_decisions where id=r.authority_decision_id and organization_id=p_org;
   select * into gate from public.ahte_authority_gates where id=d.authority_gate_id and organization_id=p_org;
   select * into authority from public.ahte_authorities where id=gate.authority_id and organization_id=p_org;
   if e.evidence_class<>'E5' or d.id is null or d.status not in ('signed','final') or d.decision<>'approved' or nullif(trim(d.decision_reference),'') is null or nullif(trim(d.signature_hash),'') is null or (e.metadata->>'external_authority_reference') is distinct from d.decision_reference or (e.metadata->>'authority_signature_hash') is distinct from d.signature_hash or gate.id is null or gate.project_id is distinct from p_project or gate.status<>'passed' or authority.id is null or authority.status<>'active' or authority.source_status<>'verified' then blockers:=blockers||jsonb_build_array(g||':external_authority_proof_required'); end if;
  end if;
 end loop;
 if exists(select 1 from public.ahte_lab_results lr join public.ahte_lab_samples s on s.id=lr.sample_id and s.organization_id=p_org join public.ahte_batches b on b.id=s.batch_id and b.organization_id=p_org where lr.organization_id=p_org and lr.status<>'void' and (lr.result_class in ('detected','positive','contested') or lr.status='contested') and ((p_type='batch' and b.id=p_id) or (p_type='product' and b.product_id=p_id))) then blockers:=blockers||jsonb_build_array('HG-LAB:adverse_or_contested_result'); end if;
 if exists(select 1 from public.ahte_fracture_events where organization_id=p_org and entity_type=p_type and entity_id=p_id and (nullif(trim(resolution),'') is null or resolved_by is null or resolved_at is null)) then blockers:=blockers||jsonb_build_array('unresolved_trust_fracture'); end if;
 if exists(select 1 from public.ahte_fracture_events f left join public.ahte_reverifications rv on rv.id=f.reverification_id and rv.organization_id=p_org left join public.ahte_evidence ev on ev.id=rv.evidence_id and ev.organization_id=p_org where f.organization_id=p_org and f.entity_type=p_type and f.entity_id=p_id and (rv.id is null or rv.result<>'passed' or rv.tester_user_id is null or rv.tested_at is null or rv.tested_at<f.detected_at or ev.id is null or ev.status<>'verified' or (ev.valid_to is not null and ev.valid_to<=now()))) then blockers:=blockers||jsonb_build_array('human_reverification_required'); end if;
 if exists(select 1 from public.ahte_hitm_cases h left join public.ahte_assessments a on a.id=h.assessment_id and a.organization_id=p_org where h.organization_id=p_org and h.decision_class in ('D5','D6') and h.status<>'closed' and ((a.subject_type=p_type and a.subject_id=p_id) or (h.assessment_id is null and (h.project_id is null or h.project_id is not distinct from p_project)))) then blockers:=blockers||jsonb_build_array('open_reserved_authority_case'); end if;
 return blockers;
end $$;

create or replace function private.ahte_evaluate_release(p_org uuid,p_entity_type text,p_entity_id uuid,p_requires_authority boolean default false) returns jsonb
language plpgsql security definer set search_path='' as $$
declare ts record; blockers jsonb;
begin
 perform pg_advisory_xact_lock(hashtext(p_org::text));
 select * into ts from public.ahte_trust_states where organization_id=p_org and entity_type=p_entity_type and entity_id=p_entity_id order by effective_at desc,id desc limit 1;
 if ts.id is null then return jsonb_build_object('eligible',false,'blockers',jsonb_build_array('no_trust_state'),'not_certification',true); end if;
 blockers:=private.ahte_gate_blockers(p_org,p_entity_type,p_entity_id,ts.project_id);
 if ts.state not in ('eligible','released') or (ts.expires_at is not null and ts.expires_at<=now()) then blockers:=blockers||jsonb_build_array('state_not_eligible_or_expired'); end if;
 return jsonb_build_object('eligible',jsonb_array_length(blockers)=0,'blockers',blockers,'trust_state_id',ts.id,'project_id',ts.project_id,'hard_gate_status',case when jsonb_array_length(blockers)=0 then 'passed' else 'failed' end,'not_certification',true);
end $$;

create or replace function private.ahte_state_guard() returns trigger
language plpgsql security definer set search_path='' as $$
declare prior record; from_state text; allowed boolean:=false; blockers jsonb;
begin
 if tg_op<>'INSERT' then raise exception 'trust_state_append_only' using errcode='23514'; end if;
 perform pg_advisory_xact_lock(hashtext(new.organization_id::text));
 select * into prior from public.ahte_trust_states where organization_id=new.organization_id and entity_type=new.entity_type and entity_id=new.entity_id order by effective_at desc,id desc limit 1;
 if new.previous_state_id is distinct from prior.id then raise exception 'stale_trust_state' using errcode='40001'; end if;
 if prior.id is not null and new.project_id is distinct from prior.project_id then raise exception 'trust_project_immutable' using errcode='23514'; end if;
 from_state:=coalesce(prior.state,'draft');
 allowed:=case new.transition_event
  when 'packet_opened' then from_state='draft' and new.state='evidence_incomplete'
  when 'D2_assessment' then from_state='evidence_incomplete' and new.state='assessed' and exists(select 1 from public.ahte_assessments where organization_id=new.organization_id and subject_type=new.entity_type and subject_id=new.entity_id)
  when 'D3_D6_detect' then from_state='assessed' and new.state='hitm_open'
  when 'hard_gates_pass_and_no_reserved' then from_state='assessed' and new.state='eligible'
  when 'D5_D6_case' then from_state='hitm_open' and new.state='authority_pending'
  when 'E5_authority_decision' then false -- Reserved: use externally evidenced authority workflow; never machine execute.
  when 'operational_release' then from_state='eligible' and new.state='released' and exists(select 1 from public.ahte_release_decisions where organization_id=new.organization_id and trust_state_id=prior.id and decision in ('release','release_with_conditions') and decided_by=auth.uid())
  when 'fracture_D4' then from_state in ('assessed','eligible','released') and new.state='held'
  when 'human_determination_and_reverification' then from_state='held' and new.state='eligible' and auth.uid() is not null and private.has_org_role(new.organization_id,array['owner','admin','executive','project_manager'])
  when 'escalated_D5' then from_state='held' and new.state='authority_pending'
  when 'authority_suspension' then from_state='released' and new.state='withdrawn'
  else false end;
 if not coalesce(allowed,false) then raise exception 'undefined_or_reserved_transition' using errcode='23514'; end if;
 if new.state in ('eligible','released') then
  blockers:=private.ahte_gate_blockers(new.organization_id,new.entity_type,new.entity_id,new.project_id);
  if jsonb_array_length(blockers)>0 then raise exception 'hard_gates_blocked: %',blockers using errcode='23514'; end if;
  new.hard_gate_status:='passed';
 else new.hard_gate_status:=case when new.state='held' then 'failed' else 'open' end; end if;
 new.effective_at:=greatest(clock_timestamp(),coalesce(prior.effective_at + interval '1 microsecond','-infinity'::timestamptz));
 return new;
end $$;
create trigger z_ahte_state_guard before insert or update or delete on public.ahte_trust_states for each row execute function private.ahte_state_guard();

create or replace function private.ahte_release_guard() returns trigger
language plpgsql security definer set search_path='' as $$
declare ts record; evaluation jsonb;
begin
 if tg_op<>'INSERT' then raise exception 'release_decision_append_only' using errcode='23514'; end if;
 if new.decision in ('release','release_with_conditions') then
  select * into ts from public.ahte_trust_states where id=new.trust_state_id and organization_id=new.organization_id;
  if ts.id is null or ts.project_id is distinct from new.project_id then raise exception 'release_subject_required' using errcode='23514'; end if;
  evaluation:=private.ahte_evaluate_release(new.organization_id,ts.entity_type,ts.entity_id,true);
  if evaluation->>'eligible'<>'true' or (evaluation->>'trust_state_id')::uuid<>ts.id then raise exception 'release_blocked: %',evaluation using errcode='23514'; end if;
  if auth.uid() is null or new.decided_by is distinct from auth.uid() then raise exception 'human_release_required' using errcode='42501'; end if;
 end if;
 return new;
end $$;
create trigger z_ahte_release_guard before insert or update or delete on public.ahte_release_decisions for each row execute function private.ahte_release_guard();

create or replace function private.ahte_release_state() returns trigger
language plpgsql security definer set search_path='' as $$
declare ts record;
begin
 if new.decision in ('release','release_with_conditions') then
  select * into ts from public.ahte_trust_states where id=new.trust_state_id;
  if ts.state='eligible' then
   insert into public.ahte_trust_states(organization_id,project_id,entity_type,entity_id,state,transition_event,previous_state_id,rationale)
   values(new.organization_id,ts.project_id,ts.entity_type,ts.entity_id,'released','operational_release',ts.id,new.reason);
  end if;
 end if;
 return new;
end $$;
create trigger ahte_release_state after insert on public.ahte_release_decisions for each row execute function private.ahte_release_state();

create or replace function private.ahte_control_audit() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 perform private.ahte_record_event(new.organization_id,tg_table_name||'_INSERT',tg_table_name,new.id,'user',auth.uid(),to_jsonb(new),'database-control',null);
 return new;
end $$;
create trigger ahte_state_audit after insert on public.ahte_trust_states for each row execute function private.ahte_control_audit();
create trigger ahte_release_audit after insert on public.ahte_release_decisions for each row execute function private.ahte_control_audit();
create trigger ahte_gate_audit after insert on public.ahte_gate_results for each row execute function private.ahte_control_audit();

create or replace function private.ahte_gate_review_guard() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if tg_op<>'INSERT' then raise exception 'gate_result_append_only' using errcode='23514'; end if;
 if auth.uid() is null or new.reviewed_by is distinct from auth.uid() then raise exception 'human_gate_review_required' using errcode='42501'; end if;
 new.reviewed_at:=clock_timestamp();
 return new;
end $$;
create trigger z_ahte_gate_review before insert or update or delete on public.ahte_gate_results for each row execute function private.ahte_gate_review_guard();

create or replace function private.ahte_fracture_guard() returns trigger
language plpgsql security definer set search_path='' as $$
begin
 if tg_op='DELETE' then raise exception 'fracture_history_required' using errcode='23514'; end if;
 if tg_op='INSERT' then
  new.detected_at:=clock_timestamp(); new.auto_hold:=true;
  if new.resolution is not null then raise exception 'fracture_must_open_unresolved' using errcode='23514'; end if;
 else
  if (new.organization_id,new.entity_type,new.entity_id,new.detected_at,new.fracture_type) is distinct from (old.organization_id,old.entity_type,old.entity_id,old.detected_at,old.fracture_type) then raise exception 'fracture_identity_immutable' using errcode='23514'; end if;
  if new.resolution is not null then
   if auth.uid() is null or new.resolved_by is distinct from auth.uid() or new.reverification_id is null then raise exception 'human_reverification_required' using errcode='42501'; end if;
   new.resolved_at:=clock_timestamp();
  end if;
 end if;
 return new;
end $$;
create trigger z_ahte_fracture_guard before insert or update or delete on public.ahte_fracture_events for each row execute function private.ahte_fracture_guard();

create or replace function private.ahte_auto_hold() returns trigger
language plpgsql security definer set search_path='' as $$
declare ts record;
begin
 select * into ts from public.ahte_trust_states where organization_id=new.organization_id and entity_type=new.entity_type and entity_id=new.entity_id order by effective_at desc,id desc limit 1;
 if ts.id is not null and ts.state in ('assessed','eligible','released') then
  insert into public.ahte_trust_states(organization_id,project_id,entity_type,entity_id,state,transition_event,previous_state_id,rationale)
  values(new.organization_id,ts.project_id,new.entity_type,new.entity_id,'held','fracture_D4',ts.id,'Automatic hold on trust fracture; human re-verification required');
 end if;
 perform private.ahte_record_event(new.organization_id,'TRUST_FRACTURE','fracture',new.id,'user',auth.uid(),to_jsonb(new),'database-control',null);
 return new;
end $$;
create trigger ahte_fracture_auto_hold after insert on public.ahte_fracture_events for each row execute function private.ahte_auto_hold();

-- Ledger is written only through audited database controls and the authenticated proxy.
revoke insert,update,delete on public.ahte_event_ledger from authenticated,anon;
create or replace function public.ahte_record_event_proxy(p_org uuid,p_event_type text,p_entity_type text,p_entity_id uuid,p_actor_type text,p_actor_id uuid,p_payload jsonb,p_source_system text default null,p_signature text default null)
returns bigint language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not private.is_org_member(p_org) or p_actor_id is distinct from auth.uid() or p_actor_type<>'user' then raise exception 'event_actor_forbidden' using errcode='42501'; end if;
 return private.ahte_record_event(p_org,p_event_type,p_entity_type,p_entity_id,p_actor_type,p_actor_id,p_payload,p_source_system,p_signature);
end $$;
revoke all on function public.ahte_record_event_proxy(uuid,text,text,uuid,text,uuid,jsonb,text,text) from public,anon;
grant execute on function public.ahte_record_event_proxy(uuid,text,text,uuid,text,uuid,jsonb,text,text) to authenticated;

-- Serialize every organization-owned AHTE mutation and reject tenant-crossing FKs.
do $$ declare t record; begin for t in select table_name from information_schema.columns where table_schema='public' and column_name='organization_id' and table_name like 'ahte_%' loop
 execute format('create trigger a_ahte_same_org before insert or update or delete on public.%I for each row execute function private.ahte_same_org_guard()',t.table_name);
end loop; end $$;
-- Member-edited transition/rule rows cannot define enforcement. Restrict edits nonetheless.
do $$ declare t text; p record; begin foreach t in array array['ahte_hard_gate_rules','ahte_state_transitions'] loop
 for p in select policyname from pg_policies where schemaname='public' and tablename=t and cmd<>'SELECT' loop execute format('drop policy %I on public.%I',p.policyname,t); end loop;
 execute format('create policy controlled_policy_write on public.%I for all to authenticated using(private.has_org_role(organization_id,array[''owner'',''admin'',''executive''])) with check(private.has_org_role(organization_id,array[''owner'',''admin'',''executive'']))',t);
end loop; end $$;
revoke all on function private.ahte_same_org_guard(),private.ahte_gate_blockers(uuid,text,uuid,uuid),private.ahte_state_guard(),private.ahte_release_guard(),private.ahte_control_audit(),private.ahte_gate_review_guard() from public,anon,authenticated;
revoke all on function private.ahte_fracture_guard(),private.ahte_auto_hold() from public,anon,authenticated;
revoke all on function private.ahte_release_state() from public,anon,authenticated;

-- Authenticated wrapper owns the private call; callers cannot execute helpers.
create or replace function public.ahte_evaluate_release_proxy(p_org uuid,p_entity_type text,p_entity_id uuid,p_requires_authority boolean default false)
returns jsonb language plpgsql security definer set search_path='' as $$
begin
 if auth.uid() is null or not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
 return private.ahte_evaluate_release(p_org,p_entity_type,p_entity_id,true);
end $$;
revoke all on function public.ahte_evaluate_release_proxy(uuid,text,uuid,boolean) from public,anon;
grant execute on function public.ahte_evaluate_release_proxy(uuid,text,uuid,boolean) to authenticated;

create or replace function private.ahte_mutation_audit() returns trigger
language plpgsql security definer set search_path='' as $$
declare row_data jsonb;
begin
 row_data:=case when tg_op='DELETE' then to_jsonb(old) else to_jsonb(new) end;
 perform private.ahte_record_event((row_data->>'organization_id')::uuid,tg_table_name||'_'||tg_op,tg_table_name,(row_data->>'id')::uuid,case when auth.uid() is null then 'system' else 'user' end,auth.uid(),row_data,'database-audit',null);
 if tg_op='DELETE' then return old; end if;
 return new;
end $$;
-- Every business mutation gets a ledger event in the same transaction.
do $$ declare t record; begin for t in select table_name from information_schema.columns where table_schema='public' and column_name='organization_id' and table_name like 'ahte_%' and table_name not in ('ahte_event_ledger','ahte_trust_states','ahte_gate_results','ahte_release_decisions','ahte_fracture_events') loop
 execute format('create trigger ahte_business_audit after insert or update or delete on public.%I for each row execute function private.ahte_mutation_audit()',t.table_name);
end loop; end $$;
revoke all on function private.ahte_mutation_audit() from public,anon,authenticated;

do $$ declare p record; begin for p in select policyname from pg_policies where schemaname='public' and tablename='ahte_api_idempotency' loop execute format('drop policy %I on public.ahte_api_idempotency',p.policyname); end loop; end $$;
create policy idempotency_actor_read on public.ahte_api_idempotency for select to authenticated using(private.is_org_member(organization_id) and actor_user_id=(select auth.uid()));
create policy idempotency_actor_insert on public.ahte_api_idempotency for insert to authenticated with check(private.is_org_member(organization_id) and actor_user_id=(select auth.uid()));
create policy idempotency_actor_update on public.ahte_api_idempotency for update to authenticated using(private.is_org_member(organization_id) and actor_user_id=(select auth.uid())) with check(private.is_org_member(organization_id) and actor_user_id=(select auth.uid()));
