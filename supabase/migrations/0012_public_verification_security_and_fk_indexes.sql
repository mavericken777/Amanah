-- Remove public SECURITY DEFINER verification RPC and add advisor-required FK indexes.
revoke all on function public.ahte_public_verify(text) from public;
drop function if exists public.ahte_public_verify(text);

create index if not exists ahte_api_rate_limits_actor_idx on public.ahte_api_rate_limits(actor_user_id);
create index if not exists ahte_consumer_scans_batch_idx on public.ahte_consumer_scans(batch_id);
create index if not exists ahte_consumer_scans_org_idx on public.ahte_consumer_scans(organization_id);
create index if not exists ahte_consumer_scans_product_idx on public.ahte_consumer_scans(product_id);
create index if not exists ahte_credential_checks_evidence_idx on public.ahte_credential_checks(evidence_id);
create index if not exists ahte_credential_checks_org_idx on public.ahte_credential_checks(organization_id);
create index if not exists ahte_device_maintenance_evidence_idx on public.ahte_device_maintenance(evidence_id);
create index if not exists ahte_device_maintenance_org_idx on public.ahte_device_maintenance(organization_id);
create index if not exists ahte_device_maintenance_performed_by_idx on public.ahte_device_maintenance(performed_by);
create index if not exists ahte_digital_twins_source_event_idx on public.ahte_digital_twins(source_event_id);
create index if not exists ahte_market_registrations_evidence_idx on public.ahte_market_registrations(evidence_id);
create index if not exists ahte_market_registrations_product_fk_idx on public.ahte_market_registrations(product_id);
create index if not exists ahte_public_verifications_created_by_idx on public.ahte_public_verifications(created_by);
create index if not exists ahte_public_verifications_org_idx on public.ahte_public_verifications(organization_id);
create index if not exists ahte_evidence_project_fk_idx on public.ahte_evidence(project_id);
