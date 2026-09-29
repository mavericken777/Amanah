-- AHTE execution layer: state evaluation, event ledger, fractures, lifecycle triggers and public proxies.
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
  from public.ahte_hitm_cases h
  left join public.ahte_assessments a on a.id=h.assessment_id
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

create or replace function public.ahte_record_event_proxy(p_org uuid,p_event_type text,p_entity_type text,p_entity_id uuid,p_actor_type text,p_actor_id uuid,p_payload jsonb,p_source_system text default null,p_signature text default null)
returns bigint language plpgsql security invoker set search_path=public as $$
begin
  if not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
  return private.ahte_record_event(p_org,p_event_type,p_entity_type,p_entity_id,p_actor_type,p_actor_id,p_payload,p_source_system,p_signature);
end $$;

create or replace function public.ahte_evaluate_release_proxy(p_org uuid,p_entity_type text,p_entity_id uuid,p_requires_authority boolean default false)
returns jsonb language plpgsql security invoker set search_path=public as $$
begin
  if not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
  return private.ahte_evaluate_release(p_org,p_entity_type,p_entity_id,p_requires_authority);
end $$;

revoke all on function private.ahte_record_event(uuid,text,text,uuid,text,uuid,jsonb,text,text) from public;
revoke all on function private.ahte_evaluate_release(uuid,text,uuid,boolean) from public;
revoke all on function public.ahte_record_event_proxy(uuid,text,text,uuid,text,uuid,jsonb,text,text) from public;
revoke all on function public.ahte_evaluate_release_proxy(uuid,text,uuid,boolean) from public;
grant execute on function public.ahte_record_event_proxy(uuid,text,text,uuid,text,uuid,jsonb,text,text) to authenticated;
grant execute on function public.ahte_evaluate_release_proxy(uuid,text,uuid,boolean) to authenticated;

create or replace function private.validate_task_status_transition() returns trigger language plpgsql set search_path=public as $$
begin
  if tg_op='INSERT' or new.status is not distinct from old.status then return new; end if;
  if not ((old.status='open' and new.status in ('in_progress','blocked','done','cancelled')) or
          (old.status='in_progress' and new.status in ('open','blocked','done','cancelled')) or
          (old.status='blocked' and new.status in ('in_progress','cancelled')) or
          (old.status='done' and new.status='open') or
          (old.status='cancelled' and new.status='open')) then
    raise exception 'Invalid task status transition: % -> %',old.status,new.status using errcode='22023';
  end if;
  return new;
end $$;

drop trigger if exists task_validate_status on public.tasks;
create trigger task_validate_status before update on public.tasks for each row execute procedure private.validate_task_status_transition();

create or replace function private.validate_approval_status_transition() returns trigger language plpgsql set search_path=public as $$
begin
  if tg_op='INSERT' or new.status is not distinct from old.status then return new; end if;
  if old.status<>'pending' or new.status not in ('approved','rejected','cancelled') then
    raise exception 'Invalid approval status transition: % -> %',old.status,new.status using errcode='22023';
  end if;
  if new.decided_at is null then new.decided_at=now(); end if;
  return new;
end $$;

drop trigger if exists approval_validate_status on public.approvals;
create trigger approval_validate_status before update on public.approvals for each row execute procedure private.validate_approval_status_transition();

create or replace function private.audit_row_change() returns trigger language plpgsql security definer set search_path=public as $$
declare actor uuid:=(select auth.uid()); org_id uuid; record_id uuid; before_payload jsonb; after_payload jsonb;
begin
  if tg_op='INSERT' then org_id:=new.organization_id; record_id:=new.id; after_payload:=to_jsonb(new);
  elsif tg_op='DELETE' then org_id:=old.organization_id; record_id:=old.id; before_payload:=to_jsonb(old);
  else org_id:=new.organization_id; record_id:=new.id; before_payload:=to_jsonb(old); after_payload:=to_jsonb(new); end if;
  insert into public.audit_events(organization_id,actor_user_id,action,entity_type,entity_id,before_data,after_data)
  values(org_id,actor,tg_op,tg_table_name,record_id,before_payload,after_payload);
  if tg_op='DELETE' then return old; end if; return new;
end $$;

create or replace function private.notify_task_events() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if new.owner_user_id is not null then
    if tg_op='INSERT' and new.status='open' then
      insert into public.notifications(organization_id,user_id,type,title,body,href) values(new.organization_id,new.owner_user_id,'task_opened','Task assigned/opened',new.title,'/tasks');
    elsif tg_op='UPDATE' and new.status='blocked' and old.status is distinct from new.status then
      insert into public.notifications(organization_id,user_id,type,title,body,href) values(new.organization_id,new.owner_user_id,'task_blocked','Task blocked',new.title,'/tasks');
    end if;
  end if; return new;
end $$;

create or replace function private.notify_risk_escalation() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if new.status='escalated' and (tg_op='INSERT' or (tg_op='UPDATE' and old.status is distinct from new.status)) then
    insert into public.notifications(organization_id,user_id,type,title,body,href)
    select new.organization_id,om.user_id,'risk_escalated','Risk escalated',new.description,'/risks'
    from public.organization_members om
    where om.organization_id=new.organization_id and om.role in ('owner','admin','executive','project_manager');
  end if; return new;
end $$;

create or replace function private.rollup_expense_to_budget() returns trigger language plpgsql security definer set search_path=public as $$
begin
  if tg_op='INSERT' then
    update public.budgets set actual=actual+new.amount,updated_at=now() where project_id=new.project_id and organization_id=new.organization_id and category=new.category;
  elsif tg_op='UPDATE' then
    if old.project_id=new.project_id and old.organization_id=new.organization_id and old.category=new.category then
      update public.budgets set actual=actual-old.amount+new.amount,updated_at=now() where project_id=new.project_id and organization_id=new.organization_id and category=new.category;
    else
      update public.budgets set actual=greatest(0,actual-old.amount),updated_at=now() where project_id=old.project_id and organization_id=old.organization_id and category=old.category;
      update public.budgets set actual=actual+new.amount,updated_at=now() where project_id=new.project_id and organization_id=new.organization_id and category=new.category;
    end if;
  elsif tg_op='DELETE' then
    update public.budgets set actual=greatest(0,actual-old.amount),updated_at=now() where project_id=old.project_id and organization_id=old.organization_id and category=old.category;
  end if; return case when tg_op='DELETE' then old else new end;
end $$;

drop trigger if exists task_notification_events on public.tasks;
create trigger task_notification_events after insert or update on public.tasks for each row execute procedure private.notify_task_events();
drop trigger if exists risk_notification_escalation on public.risks;
create trigger risk_notification_escalation after insert or update on public.risks for each row execute procedure private.notify_risk_escalation();
drop trigger if exists expense_budget_rollup on public.expenses;
create trigger expense_budget_rollup after insert or update or delete on public.expenses for each row execute procedure private.rollup_expense_to_budget();
