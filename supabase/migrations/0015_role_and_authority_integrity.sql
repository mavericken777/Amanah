-- AHTE role and authority integrity hardening.
-- Operational application controls only; this migration does not create certification authority.

alter table public.ahte_authority_decisions
  drop constraint if exists ahte_authority_decision_external_proof;

alter table public.ahte_authority_decisions
  add constraint ahte_authority_decision_external_proof
  check (
    status <> 'signed'
    or (decision_reference is not null and signature_hash is not null)
  );

-- Replace the broad organization-member FOR ALL policies introduced by the
-- initial AHTE foundation with explicit read/write/delete policies.
do $$
declare
  t text;
  write_roles text[];
begin
  foreach t in array array[
    'ahte_ai_provenance','ahte_applicability','ahte_assessments','ahte_audit_tests',
    'ahte_authorities','ahte_authority_decisions','ahte_authority_gates','ahte_certificates',
    'ahte_controls','ahte_corrective_actions','ahte_critical_points','ahte_custody_events',
    'ahte_evidence','ahte_findings','ahte_fracture_events','ahte_hitm_cases',
    'ahte_identities','ahte_instruments','ahte_laboratories','ahte_partners',
    'ahte_port_custody_events','ahte_release_decisions','ahte_requirements','ahte_reverifications',
    'ahte_shipment_items','ahte_shipments','ahte_standard_mappings','ahte_trust_packets',
    'ahte_trust_states','ahte_trust_vectors'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || '_org_access', t);
    execute format('drop policy if exists %I on public.%I', t || '_member_select', t);
    execute format('drop policy if exists %I on public.%I', t || '_writer_insert', t);
    execute format('drop policy if exists %I on public.%I', t || '_writer_update', t);
    execute format('drop policy if exists %I on public.%I', t || '_admin_delete', t);

    execute format(
      'create policy %I on public.%I for select to authenticated using (private.is_org_member(organization_id))',
      t || '_member_select', t
    );

    if t = any(array[
      'ahte_authorities','ahte_authority_decisions','ahte_authority_gates',
      'ahte_certificates','ahte_instruments','ahte_requirements','ahte_standard_mappings'
    ]) then
      write_roles := array['owner','admin','executive'];
    elsif t = any(array[
      'ahte_release_decisions','ahte_trust_states','ahte_fracture_events'
    ]) then
      write_roles := array['owner','admin','executive','project_manager'];
    else
      write_roles := array['owner','admin','executive','project_manager','contributor'];
    end if;

    execute format(
      'create policy %I on public.%I for insert to authenticated with check (private.has_org_role(organization_id, %L::text[]))',
      t || '_writer_insert', t, write_roles
    );
    execute format(
      'create policy %I on public.%I for update to authenticated using (private.has_org_role(organization_id, %L::text[])) with check (private.has_org_role(organization_id, %L::text[]))',
      t || '_writer_update', t, write_roles, write_roles
    );
    execute format(
      'create policy %I on public.%I for delete to authenticated using (private.has_org_role(organization_id, ARRAY[''owner'',''admin'']::text[]))',
      t || '_admin_delete', t
    );
  end loop;
end $$;

comment on table public.ahte_authority_decisions is
  'Records externally owned competent-authority decisions. AHTE records evidence; it does not issue Halal certification.';
comment on table public.ahte_release_decisions is
  'Operational release decisions only. Operational release is not Halal certification.';
