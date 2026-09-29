-- Amanah operational integrity hardening.
-- Enforces task/approval lifecycles, safe audit/notification triggers, and correct expense budget roll-ups.
create or replace function private.validate_task_status_transition() returns trigger language plpgsql set search_path = public as $$
begin
  if tg_op='INSERT' or new.status is not distinct from old.status then return new; end if;
  if not ((old.status='open' and new.status in ('in_progress','blocked','done','cancelled')) or
          (old.status='in_progress' and new.status in ('open','blocked','done','cancelled')) or
          (old.status='blocked' and new.status in ('in_progress','cancelled')) or
          (old.status='done' and new.status='open') or
          (old.status='cancelled' and new.status='open')) then
    raise exception 'Invalid task status transition: % -> %', old.status, new.status using errcode='22023';
  end if;
  return new;
end; $$;
drop trigger if exists task_validate_status on public.tasks;
create trigger task_validate_status before update on public.tasks for each row execute procedure private.validate_task_status_transition();
revoke all on function private.validate_task_status_transition() from public;

create or replace function private.validate_approval_status_transition() returns trigger language plpgsql set search_path = public as $$
begin
  if tg_op='INSERT' or new.status is not distinct from old.status then return new; end if;
  if old.status <> 'pending' or new.status not in ('approved','rejected','cancelled') then
    raise exception 'Invalid approval status transition: % -> %', old.status, new.status using errcode='22023';
  end if;
  if new.decided_at is null then new.decided_at=now(); end if;
  return new;
end; $$;
drop trigger if exists approval_validate_status on public.approvals;
create trigger approval_validate_status before update on public.approvals for each row execute procedure private.validate_approval_status_transition();
revoke all on function private.validate_approval_status_transition() from public;

create or replace function private.audit_row_change() returns trigger language plpgsql security definer set search_path = public as $$
declare actor uuid := (select auth.uid()); org_id uuid; record_id uuid; before_payload jsonb; after_payload jsonb;
begin
  if tg_op='INSERT' then org_id:=new.organization_id; record_id:=new.id; after_payload:=to_jsonb(new);
  elsif tg_op='DELETE' then org_id:=old.organization_id; record_id:=old.id; before_payload:=to_jsonb(old);
  else org_id:=new.organization_id; record_id:=new.id; before_payload:=to_jsonb(old); after_payload:=to_jsonb(new);
  end if;
  insert into public.audit_events(organization_id,actor_user_id,action,entity_type,entity_id,before_data,after_data)
  values(org_id,actor,tg_op,tg_table_name,record_id,before_payload,after_payload);
  if tg_op='DELETE' then return old; end if; return new;
end; $$;
revoke all on function private.audit_row_change() from public;

create or replace function private.notify_task_events() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.owner_user_id is not null then
    if tg_op='INSERT' and new.status='open' then
      insert into public.notifications(organization_id,user_id,type,title,body,href) values(new.organization_id,new.owner_user_id,'task_opened','Task assigned/opened',new.title,'/tasks');
    elsif tg_op='UPDATE' and new.status='blocked' and old.status is distinct from new.status then
      insert into public.notifications(organization_id,user_id,type,title,body,href) values(new.organization_id,new.owner_user_id,'task_blocked','Task blocked',new.title,'/tasks');
    end if;
  end if;
  return new;
end; $$;
revoke all on function private.notify_task_events() from public;

create or replace function private.notify_risk_escalation() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status='escalated' and (tg_op='INSERT' or (tg_op='UPDATE' and old.status is distinct from new.status)) then
    insert into public.notifications(organization_id,user_id,type,title,body,href)
    select new.organization_id,om.user_id,'risk_escalated','Risk escalated',new.description,'/risks'
    from public.organization_members om
    where om.organization_id=new.organization_id and om.role in ('owner','admin','executive','project_manager');
  end if;
  return new;
end; $$;
revoke all on function private.notify_risk_escalation() from public;

create or replace function private.rollup_expense_to_budget() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if tg_op='INSERT' then
    update public.budgets set actual=actual+new.amount,updated_at=now()
    where project_id=new.project_id and organization_id=new.organization_id and category=new.category;
  elsif tg_op='UPDATE' then
    if old.project_id=new.project_id and old.organization_id=new.organization_id and old.category=new.category then
      update public.budgets set actual=actual-old.amount+new.amount,updated_at=now()
      where project_id=new.project_id and organization_id=new.organization_id and category=new.category;
    else
      update public.budgets set actual=greatest(0,actual-old.amount),updated_at=now()
      where project_id=old.project_id and organization_id=old.organization_id and category=old.category;
      update public.budgets set actual=actual+new.amount,updated_at=now()
      where project_id=new.project_id and organization_id=new.organization_id and category=new.category;
    end if;
  elsif tg_op='DELETE' then
    update public.budgets set actual=greatest(0,actual-old.amount),updated_at=now()
    where project_id=old.project_id and organization_id=old.organization_id and category=old.category;
  end if;
  return case when tg_op='DELETE' then old else new end;
end; $$;
revoke all on function private.rollup_expense_to_budget() from public;