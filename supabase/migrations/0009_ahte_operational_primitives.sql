-- Baseline lineage repair v1: 33 omitted table definitions recovered from live
-- Amanah Supabase lqvyyylrydcpjochknag on 2026-09-30; schema metadata only.
-- Existing live tables are unchanged. Fresh installs require these before 0009.
-- [PROPOSAL] No authority/certification effect. See reconciliation checkpoint.

create table if not exists public.ahte_api_idempotency (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  idempotency_key text not null,
  actor_user_id uuid,
  request_hash text not null,
  response_status integer,
  response_body jsonb,
  created_at timestamp with time zone default now() not null,
  constraint ahte_api_idempotency_actor_user_id_fkey FOREIGN KEY (actor_user_id) REFERENCES auth.users(id) ON DELETE SET NULL,
  constraint ahte_api_idempotency_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_api_idempotency_organization_id_idempotency_key_key UNIQUE (organization_id, idempotency_key),
  constraint ahte_api_idempotency_pkey PRIMARY KEY (id)
);
alter table public.ahte_api_idempotency enable row level security;

create table if not exists public.ahte_batch_genealogy (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  parent_entity_type text not null,
  parent_entity_id uuid not null,
  child_entity_type text not null,
  child_entity_id uuid not null,
  quantity numeric,
  unit text,
  created_at timestamp with time zone default now() not null,
  constraint ahte_batch_genealogy_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_batch_genealogy_parent_entity_type_parent_entity_id_ch_key UNIQUE (parent_entity_type, parent_entity_id, child_entity_type, child_entity_id),
  constraint ahte_batch_genealogy_pkey PRIMARY KEY (id)
);
alter table public.ahte_batch_genealogy enable row level security;

create table if not exists public.ahte_blast_radius (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  fracture_id uuid not null,
  entity_type text not null,
  entity_id uuid not null,
  impact_type text not null,
  status text default 'open'::text not null,
  created_at timestamp with time zone default now() not null,
  closed_at timestamp with time zone,
  constraint ahte_blast_radius_fracture_id_entity_type_entity_id_impact__key UNIQUE (fracture_id, entity_type, entity_id, impact_type),
  constraint ahte_blast_radius_fracture_id_fkey FOREIGN KEY (fracture_id) REFERENCES ahte_fracture_events(id) ON DELETE CASCADE,
  constraint ahte_blast_radius_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_blast_radius_pkey PRIMARY KEY (id)
);
alter table public.ahte_blast_radius enable row level security;

create table if not exists public.ahte_change_requests (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  project_id uuid,
  subject_type text not null,
  subject_id uuid not null,
  change_type text not null,
  impact_assessment text,
  requested_by uuid,
  approval_status text default 'pending'::text not null,
  implementation_status text default 'not_started'::text not null,
  re_verification_required boolean default true not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_change_requests_approval_status_check CHECK ((approval_status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text, 'deferred'::text]))),
  constraint ahte_change_requests_implementation_status_check CHECK ((implementation_status = ANY (ARRAY['not_started'::text, 'in_progress'::text, 'implemented'::text, 'reverted'::text]))),
  constraint ahte_change_requests_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_change_requests_pkey PRIMARY KEY (id),
  constraint ahte_change_requests_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
  constraint ahte_change_requests_requested_by_fkey FOREIGN KEY (requested_by) REFERENCES auth.users(id) ON DELETE SET NULL
);
alter table public.ahte_change_requests enable row level security;

create table if not exists public.ahte_competencies (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  user_id uuid not null,
  competency text not null,
  evidence_id uuid,
  assessed_at timestamp with time zone,
  expires_at timestamp with time zone,
  status text default 'pending'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_competencies_evidence_id_fkey FOREIGN KEY (evidence_id) REFERENCES ahte_evidence(id) ON DELETE SET NULL,
  constraint ahte_competencies_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_competencies_pkey PRIMARY KEY (id),
  constraint ahte_competencies_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'valid'::text, 'expired'::text, 'revoked'::text]))),
  constraint ahte_competencies_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
alter table public.ahte_competencies enable row level security;

create table if not exists public.ahte_data_access_policies (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  record_type text not null,
  jurisdiction text,
  purpose text not null,
  legal_basis text,
  retention_days integer,
  classification text default 'internal'::text not null,
  allowed_roles text[] default '{}'::text[] not null,
  active boolean default true not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_data_access_policies_classification_check CHECK ((classification = ANY (ARRAY['public'::text, 'internal'::text, 'confidential'::text, 'restricted'::text]))),
  constraint ahte_data_access_policies_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_data_access_policies_pkey PRIMARY KEY (id)
);
alter table public.ahte_data_access_policies enable row level security;

create table if not exists public.ahte_devices (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  device_code text not null,
  device_type text not null,
  serial_no text,
  status text default 'registered'::text not null,
  provisioning_status text default 'pending'::text not null,
  calibration_due date,
  identity_reference text,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_devices_organization_id_device_code_key UNIQUE (organization_id, device_code),
  constraint ahte_devices_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_devices_pkey PRIMARY KEY (id),
  constraint ahte_devices_provisioning_status_check CHECK ((provisioning_status = ANY (ARRAY['pending'::text, 'provisioned'::text, 'revoked'::text]))),
  constraint ahte_devices_status_check CHECK ((status = ANY (ARRAY['registered'::text, 'provisioning'::text, 'active'::text, 'suspended'::text, 'retired'::text])))
);
alter table public.ahte_devices enable row level security;

create table if not exists public.ahte_event_ledger (
  id bigint generated always as identity not null,
  organization_id uuid not null,
  event_type text not null,
  entity_type text not null,
  entity_id uuid not null,
  actor_type text,
  actor_id uuid,
  occurred_at timestamp with time zone default now() not null,
  payload jsonb default '{}'::jsonb not null,
  event_hash text not null,
  previous_hash text,
  signature text,
  source_system text,
  created_at timestamp with time zone default now() not null,
  constraint ahte_event_ledger_organization_id_event_hash_key UNIQUE (organization_id, event_hash),
  constraint ahte_event_ledger_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_event_ledger_pkey PRIMARY KEY (id)
);
alter table public.ahte_event_ledger enable row level security;

create table if not exists public.ahte_facilities (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  legal_name text not null,
  site_code text not null,
  jurisdiction text,
  address jsonb default '{}'::jsonb not null,
  status text default 'draft'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_facilities_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_facilities_organization_id_site_code_key UNIQUE (organization_id, site_code),
  constraint ahte_facilities_pkey PRIMARY KEY (id),
  constraint ahte_facilities_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'suspended'::text, 'closed'::text])))
);
alter table public.ahte_facilities enable row level security;

create table if not exists public.ahte_audits (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  project_id uuid,
  facility_id uuid,
  audit_code text not null,
  audit_type text not null,
  auditor_user_id uuid,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  status text default 'open'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_audits_auditor_user_id_fkey FOREIGN KEY (auditor_user_id) REFERENCES auth.users(id) ON DELETE SET NULL,
  constraint ahte_audits_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES ahte_facilities(id) ON DELETE SET NULL,
  constraint ahte_audits_organization_id_audit_code_key UNIQUE (organization_id, audit_code),
  constraint ahte_audits_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_audits_pkey PRIMARY KEY (id),
  constraint ahte_audits_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL,
  constraint ahte_audits_status_check CHECK ((status = ANY (ARRAY['planned'::text, 'open'::text, 'completed'::text, 'cancelled'::text])))
);
alter table public.ahte_audits enable row level security;

create table if not exists public.ahte_audit_observations (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  audit_id uuid not null,
  control_id uuid,
  evidence_id uuid,
  observation text not null,
  result text default 'pending'::text not null,
  severity text,
  status text default 'open'::text not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_audit_observations_audit_id_fkey FOREIGN KEY (audit_id) REFERENCES ahte_audits(id) ON DELETE CASCADE,
  constraint ahte_audit_observations_control_id_fkey FOREIGN KEY (control_id) REFERENCES ahte_controls(id) ON DELETE SET NULL,
  constraint ahte_audit_observations_evidence_id_fkey FOREIGN KEY (evidence_id) REFERENCES ahte_evidence(id) ON DELETE SET NULL,
  constraint ahte_audit_observations_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_audit_observations_pkey PRIMARY KEY (id),
  constraint ahte_audit_observations_result_check CHECK ((result = ANY (ARRAY['pending'::text, 'conformity'::text, 'non_conformity'::text, 'observation'::text])))
);
alter table public.ahte_audit_observations enable row level security;

create table if not exists public.ahte_facility_zones (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  facility_id uuid not null,
  zone_code text not null,
  zone_type text not null,
  halal_status text default 'controlled'::text not null,
  segregation_class text,
  status text default 'active'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_facility_zones_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES ahte_facilities(id) ON DELETE CASCADE,
  constraint ahte_facility_zones_facility_id_zone_code_key UNIQUE (facility_id, zone_code),
  constraint ahte_facility_zones_halal_status_check CHECK ((halal_status = ANY (ARRAY['controlled'::text, 'halal'::text, 'non_halal'::text, 'quarantine'::text, 'unknown'::text]))),
  constraint ahte_facility_zones_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_facility_zones_pkey PRIMARY KEY (id),
  constraint ahte_facility_zones_status_check CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text, 'quarantine'::text])))
);
alter table public.ahte_facility_zones enable row level security;

create table if not exists public.ahte_geofences (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  code text not null,
  name text not null,
  geometry jsonb not null,
  status text default 'active'::text not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_geofences_organization_id_code_key UNIQUE (organization_id, code),
  constraint ahte_geofences_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_geofences_pkey PRIMARY KEY (id),
  constraint ahte_geofences_status_check CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text])))
);
alter table public.ahte_geofences enable row level security;

create table if not exists public.ahte_hard_gate_rules (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  code text not null,
  dimension text not null,
  fail_condition text not null,
  decision_class text,
  compensable boolean default false not null,
  active boolean default true not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_hard_gate_noncompensable CHECK ((compensable = false)),
  constraint ahte_hard_gate_rules_organization_id_code_key UNIQUE (organization_id, code),
  constraint ahte_hard_gate_rules_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_hard_gate_rules_pkey PRIMARY KEY (id)
);
alter table public.ahte_hard_gate_rules enable row level security;

create table if not exists public.ahte_person_roles (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  user_id uuid not null,
  facility_id uuid,
  role_type text not null,
  mandate_source text,
  authority_level text default 'operational'::text not null,
  effective_from timestamp with time zone,
  expires_at timestamp with time zone,
  status text default 'active'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_person_roles_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES ahte_facilities(id) ON DELETE SET NULL,
  constraint ahte_person_roles_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_person_roles_pkey PRIMARY KEY (id),
  constraint ahte_person_roles_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'expired'::text, 'revoked'::text]))),
  constraint ahte_person_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);
alter table public.ahte_person_roles enable row level security;

create table if not exists public.ahte_products (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  manufacturer_partner_id uuid,
  name text not null,
  category text,
  market_status text default 'not_cleared'::text not null,
  status text default 'draft'::text not null,
  description text,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_products_manufacturer_partner_id_fkey FOREIGN KEY (manufacturer_partner_id) REFERENCES ahte_partners(id) ON DELETE SET NULL,
  constraint ahte_products_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_products_pkey PRIMARY KEY (id),
  constraint ahte_products_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'suspended'::text, 'retired'::text])))
);
alter table public.ahte_products enable row level security;

create table if not exists public.ahte_product_versions (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  product_id uuid not null,
  version_no text not null,
  formula_ref text,
  effective_from date,
  status text default 'draft'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_product_versions_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_product_versions_pkey PRIMARY KEY (id),
  constraint ahte_product_versions_product_id_fkey FOREIGN KEY (product_id) REFERENCES ahte_products(id) ON DELETE CASCADE,
  constraint ahte_product_versions_product_id_version_no_key UNIQUE (product_id, version_no),
  constraint ahte_product_versions_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'approved'::text, 'superseded'::text, 'withdrawn'::text])))
);
alter table public.ahte_product_versions enable row level security;

create table if not exists public.ahte_batches (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  product_id uuid not null,
  product_version_id uuid,
  facility_id uuid,
  batch_no text not null,
  produced_at timestamp with time zone,
  status text default 'quarantine'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_batches_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES ahte_facilities(id) ON DELETE SET NULL,
  constraint ahte_batches_organization_id_batch_no_key UNIQUE (organization_id, batch_no),
  constraint ahte_batches_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_batches_pkey PRIMARY KEY (id),
  constraint ahte_batches_product_id_fkey FOREIGN KEY (product_id) REFERENCES ahte_products(id) ON DELETE RESTRICT,
  constraint ahte_batches_product_version_id_fkey FOREIGN KEY (product_version_id) REFERENCES ahte_product_versions(id) ON DELETE SET NULL,
  constraint ahte_batches_status_check CHECK ((status = ANY (ARRAY['planned'::text, 'quarantine'::text, 'released'::text, 'held'::text, 'rejected'::text, 'recalled'::text])))
);
alter table public.ahte_batches enable row level security;

create table if not exists public.ahte_complaints (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  product_id uuid,
  batch_id uuid,
  source text not null,
  complaint text not null,
  severity text default 'medium'::text not null,
  status text default 'open'::text not null,
  received_at timestamp with time zone default now() not null,
  closed_at timestamp with time zone,
  constraint ahte_complaints_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES ahte_batches(id) ON DELETE SET NULL,
  constraint ahte_complaints_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_complaints_pkey PRIMARY KEY (id),
  constraint ahte_complaints_product_id_fkey FOREIGN KEY (product_id) REFERENCES ahte_products(id) ON DELETE SET NULL,
  constraint ahte_complaints_severity_check CHECK ((severity = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'critical'::text]))),
  constraint ahte_complaints_status_check CHECK ((status = ANY (ARRAY['open'::text, 'investigating'::text, 'resolved'::text, 'escalated'::text, 'closed'::text])))
);
alter table public.ahte_complaints enable row level security;

create table if not exists public.ahte_lab_samples (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  laboratory_id uuid,
  batch_id uuid,
  specimen_id text not null,
  matrix text,
  method_code text,
  method_version text,
  collected_at timestamp with time zone,
  chain_of_custody_ref text,
  status text default 'collected'::text not null,
  evidence_id uuid,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_lab_samples_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES ahte_batches(id) ON DELETE SET NULL,
  constraint ahte_lab_samples_evidence_id_fkey FOREIGN KEY (evidence_id) REFERENCES ahte_evidence(id) ON DELETE SET NULL,
  constraint ahte_lab_samples_laboratory_id_fkey FOREIGN KEY (laboratory_id) REFERENCES ahte_laboratories(id) ON DELETE SET NULL,
  constraint ahte_lab_samples_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_lab_samples_organization_id_specimen_id_key UNIQUE (organization_id, specimen_id),
  constraint ahte_lab_samples_pkey PRIMARY KEY (id),
  constraint ahte_lab_samples_status_check CHECK ((status = ANY (ARRAY['planned'::text, 'collected'::text, 'received'::text, 'testing'::text, 'reported'::text, 'void'::text])))
);
alter table public.ahte_lab_samples enable row level security;

create table if not exists public.ahte_lab_results (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  sample_id uuid not null,
  analyte text not null,
  result_value text,
  unit text,
  interpretation text,
  result_class text default 'indeterminate'::text not null,
  report_ref text,
  signature_hash text,
  status text default 'draft'::text not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_lab_results_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_lab_results_pkey PRIMARY KEY (id),
  constraint ahte_lab_results_result_class_check CHECK ((result_class = ANY (ARRAY['not_detected'::text, 'detected'::text, 'positive'::text, 'negative'::text, 'indeterminate'::text, 'contested'::text]))),
  constraint ahte_lab_results_sample_id_fkey FOREIGN KEY (sample_id) REFERENCES ahte_lab_samples(id) ON DELETE CASCADE,
  constraint ahte_lab_results_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'final'::text, 'contested'::text, 'void'::text])))
);
alter table public.ahte_lab_results enable row level security;

create table if not exists public.ahte_process_steps (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  product_version_id uuid not null,
  facility_id uuid,
  sequence_no integer not null,
  name text not null,
  description text,
  control_id uuid,
  critical_point_id uuid,
  status text default 'active'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_process_steps_control_id_fkey FOREIGN KEY (control_id) REFERENCES ahte_controls(id) ON DELETE SET NULL,
  constraint ahte_process_steps_critical_point_id_fkey FOREIGN KEY (critical_point_id) REFERENCES ahte_critical_points(id) ON DELETE SET NULL,
  constraint ahte_process_steps_facility_id_fkey FOREIGN KEY (facility_id) REFERENCES ahte_facilities(id) ON DELETE SET NULL,
  constraint ahte_process_steps_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_process_steps_pkey PRIMARY KEY (id),
  constraint ahte_process_steps_product_version_id_fkey FOREIGN KEY (product_version_id) REFERENCES ahte_product_versions(id) ON DELETE CASCADE,
  constraint ahte_process_steps_product_version_id_sequence_no_key UNIQUE (product_version_id, sequence_no)
);
alter table public.ahte_process_steps enable row level security;

create table if not exists public.ahte_recalls (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  recall_code text not null,
  reason text not null,
  scope jsonb default '{}'::jsonb not null,
  authority_reference text,
  initiated_at timestamp with time zone default now() not null,
  status text default 'open'::text not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_recalls_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_recalls_organization_id_recall_code_key UNIQUE (organization_id, recall_code),
  constraint ahte_recalls_pkey PRIMARY KEY (id),
  constraint ahte_recalls_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'open'::text, 'contained'::text, 'completed'::text, 'cancelled'::text])))
);
alter table public.ahte_recalls enable row level security;

create table if not exists public.ahte_recall_scopes (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  recall_id uuid not null,
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  status text default 'open'::text not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_recall_scopes_action_check CHECK ((action = ANY (ARRAY['trace_back'::text, 'trace_forward'::text, 'hold'::text, 'withdraw'::text, 'destroy'::text, 'monitor'::text]))),
  constraint ahte_recall_scopes_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_recall_scopes_pkey PRIMARY KEY (id),
  constraint ahte_recall_scopes_recall_id_entity_type_entity_id_action_key UNIQUE (recall_id, entity_type, entity_id, action),
  constraint ahte_recall_scopes_recall_id_fkey FOREIGN KEY (recall_id) REFERENCES ahte_recalls(id) ON DELETE CASCADE
);
alter table public.ahte_recall_scopes enable row level security;

create table if not exists public.ahte_retail_events (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  project_id uuid,
  batch_id uuid,
  location text,
  action text not null,
  actor_user_id uuid,
  occurred_at timestamp with time zone default now() not null,
  evidence_id uuid,
  metadata jsonb default '{}'::jsonb not null,
  constraint ahte_retail_events_actor_user_id_fkey FOREIGN KEY (actor_user_id) REFERENCES auth.users(id) ON DELETE SET NULL,
  constraint ahte_retail_events_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES ahte_batches(id) ON DELETE SET NULL,
  constraint ahte_retail_events_evidence_id_fkey FOREIGN KEY (evidence_id) REFERENCES ahte_evidence(id) ON DELETE SET NULL,
  constraint ahte_retail_events_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_retail_events_pkey PRIMARY KEY (id),
  constraint ahte_retail_events_project_id_fkey FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);
alter table public.ahte_retail_events enable row level security;

create table if not exists public.ahte_source_records (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  source_type text not null,
  issuer text,
  document_id text,
  edition text,
  effective_date date,
  source_url text,
  retrieved_at timestamp with time zone,
  hash12 text,
  source_status text default 'catalogued_reference'::text not null,
  supersedes_id uuid,
  created_at timestamp with time zone default now() not null,
  constraint ahte_source_records_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_source_records_pkey PRIMARY KEY (id),
  constraint ahte_source_records_source_status_check CHECK ((source_status = ANY (ARRAY['source_verified'::text, 'catalogued_reference'::text, 'expired'::text, 'superseded'::text, 'conflicted'::text]))),
  constraint ahte_source_records_supersedes_id_fkey FOREIGN KEY (supersedes_id) REFERENCES ahte_source_records(id) ON DELETE SET NULL
);
alter table public.ahte_source_records enable row level security;

create table if not exists public.ahte_source_conflicts (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  source_a uuid not null,
  source_b uuid not null,
  conflict_point text not null,
  status text default 'open'::text not null,
  escalated_to text,
  resolution_ref text,
  created_at timestamp with time zone default now() not null,
  closed_at timestamp with time zone,
  constraint ahte_source_conflicts_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_source_conflicts_pkey PRIMARY KEY (id),
  constraint ahte_source_conflicts_source_a_fkey FOREIGN KEY (source_a) REFERENCES ahte_source_records(id) ON DELETE CASCADE,
  constraint ahte_source_conflicts_source_b_fkey FOREIGN KEY (source_b) REFERENCES ahte_source_records(id) ON DELETE CASCADE,
  constraint ahte_source_conflicts_status_check CHECK ((status = ANY (ARRAY['open'::text, 'escalated'::text, 'closed'::text])))
);
alter table public.ahte_source_conflicts enable row level security;

create table if not exists public.ahte_state_transitions (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  machine text default 'trust'::text not null,
  from_state text not null,
  to_state text not null,
  event text not null,
  required_decision_class text,
  active boolean default true not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_state_transitions_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_state_transitions_organization_id_machine_from_state_e_key UNIQUE (organization_id, machine, from_state, event),
  constraint ahte_state_transitions_pkey PRIMARY KEY (id)
);
alter table public.ahte_state_transitions enable row level security;

create table if not exists public.ahte_suppliers (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  legal_name text not null,
  registration_no text,
  jurisdiction text,
  risk_class text default 'medium'::text not null,
  verification_status text default 'unverified'::text not null,
  status text default 'active'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_suppliers_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_suppliers_pkey PRIMARY KEY (id),
  constraint ahte_suppliers_risk_class_check CHECK ((risk_class = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'very_high'::text]))),
  constraint ahte_suppliers_status_check CHECK ((status = ANY (ARRAY['active'::text, 'suspended'::text, 'inactive'::text]))),
  constraint ahte_suppliers_verification_status_check CHECK ((verification_status = ANY (ARRAY['unverified'::text, 'screening'::text, 'verified'::text, 'expired'::text, 'contested'::text])))
);
alter table public.ahte_suppliers enable row level security;

create table if not exists public.ahte_materials (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  supplier_id uuid,
  name text not null,
  category text,
  source_type text,
  origin_country text,
  halal_status text default 'unverified'::text not null,
  status text default 'active'::text not null,
  specification_ref text,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  constraint ahte_materials_halal_status_check CHECK ((halal_status = ANY (ARRAY['unverified'::text, 'halal_referenced'::text, 'verified'::text, 'held'::text, 'rejected'::text]))),
  constraint ahte_materials_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_materials_pkey PRIMARY KEY (id),
  constraint ahte_materials_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'active'::text, 'suspended'::text, 'retired'::text]))),
  constraint ahte_materials_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES ahte_suppliers(id) ON DELETE SET NULL
);
alter table public.ahte_materials enable row level security;

create table if not exists public.ahte_formula_materials (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  product_version_id uuid not null,
  material_id uuid not null,
  quantity numeric,
  unit text,
  status text default 'active'::text not null,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_formula_materials_material_id_fkey FOREIGN KEY (material_id) REFERENCES ahte_materials(id) ON DELETE RESTRICT,
  constraint ahte_formula_materials_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_formula_materials_pkey PRIMARY KEY (id),
  constraint ahte_formula_materials_product_version_id_fkey FOREIGN KEY (product_version_id) REFERENCES ahte_product_versions(id) ON DELETE CASCADE,
  constraint ahte_formula_materials_product_version_id_material_id_key UNIQUE (product_version_id, material_id)
);
alter table public.ahte_formula_materials enable row level security;

create table if not exists public.ahte_material_lots (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  material_id uuid not null,
  lot_no text not null,
  received_at timestamp with time zone,
  status text default 'quarantine'::text not null,
  evidence_id uuid,
  metadata jsonb default '{}'::jsonb not null,
  created_at timestamp with time zone default now() not null,
  constraint ahte_material_lots_evidence_id_fkey FOREIGN KEY (evidence_id) REFERENCES ahte_evidence(id) ON DELETE SET NULL,
  constraint ahte_material_lots_material_id_fkey FOREIGN KEY (material_id) REFERENCES ahte_materials(id) ON DELETE CASCADE,
  constraint ahte_material_lots_material_id_lot_no_key UNIQUE (material_id, lot_no),
  constraint ahte_material_lots_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_material_lots_pkey PRIMARY KEY (id),
  constraint ahte_material_lots_status_check CHECK ((status = ANY (ARRAY['quarantine'::text, 'released'::text, 'rejected'::text, 'consumed'::text])))
);
alter table public.ahte_material_lots enable row level security;

create table if not exists public.ahte_telemetry_events (
  id uuid default gen_random_uuid() not null,
  organization_id uuid not null,
  device_id uuid not null,
  shipment_id uuid,
  batch_id uuid,
  metric_type text not null,
  metric_value numeric,
  unit text,
  observed_at timestamp with time zone not null,
  received_at timestamp with time zone default now() not null,
  sequence_no bigint,
  event_code text,
  event_hash text not null,
  signature text,
  metadata jsonb default '{}'::jsonb not null,
  constraint ahte_telemetry_events_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES ahte_batches(id) ON DELETE SET NULL,
  constraint ahte_telemetry_events_device_id_event_hash_key UNIQUE (device_id, event_hash),
  constraint ahte_telemetry_events_device_id_fkey FOREIGN KEY (device_id) REFERENCES ahte_devices(id) ON DELETE RESTRICT,
  constraint ahte_telemetry_events_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  constraint ahte_telemetry_events_pkey PRIMARY KEY (id),
  constraint ahte_telemetry_events_shipment_id_fkey FOREIGN KEY (shipment_id) REFERENCES ahte_shipments(id) ON DELETE SET NULL
);
alter table public.ahte_telemetry_events enable row level security;

create policy ahte_api_idempotency_admin_delete on public.ahte_api_idempotency as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_api_idempotency_member_insert on public.ahte_api_idempotency as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_api_idempotency_member_select on public.ahte_api_idempotency as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_api_idempotency_member_update on public.ahte_api_idempotency as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_audit_observations_admin_delete on public.ahte_audit_observations as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_audit_observations_member_insert on public.ahte_audit_observations as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_audit_observations_member_select on public.ahte_audit_observations as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_audit_observations_member_update on public.ahte_audit_observations as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_audits_admin_delete on public.ahte_audits as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_audits_member_insert on public.ahte_audits as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_audits_member_select on public.ahte_audits as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_audits_member_update on public.ahte_audits as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_batch_genealogy_admin_delete on public.ahte_batch_genealogy as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_batch_genealogy_member_insert on public.ahte_batch_genealogy as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_batch_genealogy_member_select on public.ahte_batch_genealogy as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_batch_genealogy_member_update on public.ahte_batch_genealogy as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_batches_admin_delete on public.ahte_batches as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_batches_member_insert on public.ahte_batches as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_batches_member_select on public.ahte_batches as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_batches_member_update on public.ahte_batches as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_blast_radius_admin_delete on public.ahte_blast_radius as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_blast_radius_member_insert on public.ahte_blast_radius as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_blast_radius_member_select on public.ahte_blast_radius as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_blast_radius_member_update on public.ahte_blast_radius as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_change_requests_admin_delete on public.ahte_change_requests as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_change_requests_member_insert on public.ahte_change_requests as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_change_requests_member_select on public.ahte_change_requests as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_change_requests_member_update on public.ahte_change_requests as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_competencies_admin_delete on public.ahte_competencies as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_competencies_member_insert on public.ahte_competencies as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_competencies_member_select on public.ahte_competencies as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_competencies_member_update on public.ahte_competencies as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_complaints_admin_delete on public.ahte_complaints as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_complaints_member_insert on public.ahte_complaints as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_complaints_member_select on public.ahte_complaints as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_complaints_member_update on public.ahte_complaints as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_data_access_policies_admin_delete on public.ahte_data_access_policies as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_data_access_policies_member_insert on public.ahte_data_access_policies as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_data_access_policies_member_select on public.ahte_data_access_policies as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_data_access_policies_member_update on public.ahte_data_access_policies as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_devices_admin_delete on public.ahte_devices as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_devices_member_insert on public.ahte_devices as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_devices_member_select on public.ahte_devices as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_devices_member_update on public.ahte_devices as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_event_ledger_admin_delete on public.ahte_event_ledger as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_event_ledger_member_insert on public.ahte_event_ledger as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_event_ledger_member_select on public.ahte_event_ledger as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_event_ledger_member_update on public.ahte_event_ledger as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_facilities_admin_delete on public.ahte_facilities as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_facilities_member_insert on public.ahte_facilities as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_facilities_member_select on public.ahte_facilities as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_facilities_member_update on public.ahte_facilities as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_facility_zones_admin_delete on public.ahte_facility_zones as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_facility_zones_member_insert on public.ahte_facility_zones as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_facility_zones_member_select on public.ahte_facility_zones as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_facility_zones_member_update on public.ahte_facility_zones as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_formula_materials_admin_delete on public.ahte_formula_materials as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_formula_materials_member_insert on public.ahte_formula_materials as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_formula_materials_member_select on public.ahte_formula_materials as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_formula_materials_member_update on public.ahte_formula_materials as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_geofences_admin_delete on public.ahte_geofences as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_geofences_member_insert on public.ahte_geofences as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_geofences_member_select on public.ahte_geofences as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_geofences_member_update on public.ahte_geofences as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_hard_gate_rules_admin_delete on public.ahte_hard_gate_rules as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_hard_gate_rules_member_insert on public.ahte_hard_gate_rules as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_hard_gate_rules_member_select on public.ahte_hard_gate_rules as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_hard_gate_rules_member_update on public.ahte_hard_gate_rules as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_lab_results_admin_delete on public.ahte_lab_results as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_lab_results_member_insert on public.ahte_lab_results as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_lab_results_member_select on public.ahte_lab_results as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_lab_results_member_update on public.ahte_lab_results as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_lab_samples_admin_delete on public.ahte_lab_samples as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_lab_samples_member_insert on public.ahte_lab_samples as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_lab_samples_member_select on public.ahte_lab_samples as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_lab_samples_member_update on public.ahte_lab_samples as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_material_lots_admin_delete on public.ahte_material_lots as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_material_lots_member_insert on public.ahte_material_lots as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_material_lots_member_select on public.ahte_material_lots as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_material_lots_member_update on public.ahte_material_lots as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_materials_admin_delete on public.ahte_materials as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_materials_member_insert on public.ahte_materials as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_materials_member_select on public.ahte_materials as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_materials_member_update on public.ahte_materials as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_person_roles_admin_delete on public.ahte_person_roles as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_person_roles_member_insert on public.ahte_person_roles as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_person_roles_member_select on public.ahte_person_roles as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_person_roles_member_update on public.ahte_person_roles as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_process_steps_admin_delete on public.ahte_process_steps as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_process_steps_member_insert on public.ahte_process_steps as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_process_steps_member_select on public.ahte_process_steps as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_process_steps_member_update on public.ahte_process_steps as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_product_versions_admin_delete on public.ahte_product_versions as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_product_versions_member_insert on public.ahte_product_versions as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_product_versions_member_select on public.ahte_product_versions as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_product_versions_member_update on public.ahte_product_versions as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_products_admin_delete on public.ahte_products as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_products_member_insert on public.ahte_products as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_products_member_select on public.ahte_products as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_products_member_update on public.ahte_products as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_recall_scopes_admin_delete on public.ahte_recall_scopes as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_recall_scopes_member_insert on public.ahte_recall_scopes as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_recall_scopes_member_select on public.ahte_recall_scopes as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_recall_scopes_member_update on public.ahte_recall_scopes as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_recalls_admin_delete on public.ahte_recalls as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_recalls_member_insert on public.ahte_recalls as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_recalls_member_select on public.ahte_recalls as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_recalls_member_update on public.ahte_recalls as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_retail_events_admin_delete on public.ahte_retail_events as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_retail_events_member_insert on public.ahte_retail_events as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_retail_events_member_select on public.ahte_retail_events as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_retail_events_member_update on public.ahte_retail_events as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_source_conflicts_admin_delete on public.ahte_source_conflicts as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_source_conflicts_member_insert on public.ahte_source_conflicts as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_source_conflicts_member_select on public.ahte_source_conflicts as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_source_conflicts_member_update on public.ahte_source_conflicts as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_source_records_admin_delete on public.ahte_source_records as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_source_records_member_insert on public.ahte_source_records as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_source_records_member_select on public.ahte_source_records as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_source_records_member_update on public.ahte_source_records as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_state_transitions_admin_delete on public.ahte_state_transitions as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_state_transitions_member_insert on public.ahte_state_transitions as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_state_transitions_member_select on public.ahte_state_transitions as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_state_transitions_member_update on public.ahte_state_transitions as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_suppliers_admin_delete on public.ahte_suppliers as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_suppliers_member_insert on public.ahte_suppliers as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_suppliers_member_select on public.ahte_suppliers as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_suppliers_member_update on public.ahte_suppliers as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
create policy ahte_telemetry_events_admin_delete on public.ahte_telemetry_events as PERMISSIVE for DELETE to authenticated using (private.has_org_role(organization_id, ARRAY['owner'::text, 'admin'::text]));
create policy ahte_telemetry_events_member_insert on public.ahte_telemetry_events as PERMISSIVE for INSERT to authenticated with check (private.is_org_member(organization_id));
create policy ahte_telemetry_events_member_select on public.ahte_telemetry_events as PERMISSIVE for SELECT to authenticated using (private.is_org_member(organization_id));
create policy ahte_telemetry_events_member_update on public.ahte_telemetry_events as PERMISSIVE for UPDATE to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id));
CREATE INDEX IF NOT EXISTS fk_ahte_api_idempotency_ahte_api_idempotency_actor_user_id_f ON public.ahte_api_idempotency USING btree (actor_user_id);
CREATE INDEX IF NOT EXISTS fk_ahte_api_idempotency_ahte_api_idempotency_organization_id ON public.ahte_api_idempotency USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_audit_observations_ahte_audit_observations_audit_id_ ON public.ahte_audit_observations USING btree (audit_id);
CREATE INDEX IF NOT EXISTS fk_ahte_audit_observations_ahte_audit_observations_control_i ON public.ahte_audit_observations USING btree (control_id);
CREATE INDEX IF NOT EXISTS fk_ahte_audit_observations_ahte_audit_observations_evidence_ ON public.ahte_audit_observations USING btree (evidence_id);
CREATE INDEX IF NOT EXISTS fk_ahte_audit_observations_ahte_audit_observations_organizat ON public.ahte_audit_observations USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_audits_org_idx ON public.ahte_audits USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_audits_ahte_audits_auditor_user_id_fkey ON public.ahte_audits USING btree (auditor_user_id);
CREATE INDEX IF NOT EXISTS fk_ahte_audits_ahte_audits_facility_id_fkey ON public.ahte_audits USING btree (facility_id);
CREATE INDEX IF NOT EXISTS fk_ahte_audits_ahte_audits_project_id_fkey ON public.ahte_audits USING btree (project_id);
CREATE INDEX IF NOT EXISTS fk_ahte_batch_genealogy_ahte_batch_genealogy_organization_id ON public.ahte_batch_genealogy USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_batches_org_idx ON public.ahte_batches USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_batches_product_idx ON public.ahte_batches USING btree (product_id);
CREATE INDEX IF NOT EXISTS fk_ahte_batches_ahte_batches_facility_id_fkey ON public.ahte_batches USING btree (facility_id);
CREATE INDEX IF NOT EXISTS fk_ahte_batches_ahte_batches_product_version_id_fkey ON public.ahte_batches USING btree (product_version_id);
CREATE INDEX IF NOT EXISTS ahte_blast_radius_fracture_idx ON public.ahte_blast_radius USING btree (fracture_id);
CREATE INDEX IF NOT EXISTS fk_ahte_blast_radius_ahte_blast_radius_organization_id_fkey ON public.ahte_blast_radius USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_change_requests_ahte_change_requests_organization_id ON public.ahte_change_requests USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_change_requests_ahte_change_requests_project_id_fkey ON public.ahte_change_requests USING btree (project_id);
CREATE INDEX IF NOT EXISTS fk_ahte_change_requests_ahte_change_requests_requested_by_fk ON public.ahte_change_requests USING btree (requested_by);
CREATE INDEX IF NOT EXISTS fk_ahte_competencies_ahte_competencies_evidence_id_fkey ON public.ahte_competencies USING btree (evidence_id);
CREATE INDEX IF NOT EXISTS fk_ahte_competencies_ahte_competencies_organization_id_fkey ON public.ahte_competencies USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_competencies_ahte_competencies_user_id_fkey ON public.ahte_competencies USING btree (user_id);
CREATE INDEX IF NOT EXISTS ahte_complaints_org_idx ON public.ahte_complaints USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_complaints_ahte_complaints_batch_id_fkey ON public.ahte_complaints USING btree (batch_id);
CREATE INDEX IF NOT EXISTS fk_ahte_complaints_ahte_complaints_product_id_fkey ON public.ahte_complaints USING btree (product_id);
CREATE INDEX IF NOT EXISTS fk_ahte_data_access_policies_ahte_data_access_policies_organ ON public.ahte_data_access_policies USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_devices_org_idx ON public.ahte_devices USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_event_ledger_org_time_idx ON public.ahte_event_ledger USING btree (organization_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS ahte_event_ledger_entity_idx ON public.ahte_event_ledger USING btree (organization_id, entity_type, entity_id, occurred_at DESC);
CREATE INDEX IF NOT EXISTS fk_ahte_event_ledger_ahte_event_ledger_organization_id_fkey ON public.ahte_event_ledger USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_facilities_org_idx ON public.ahte_facilities USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_facility_zones_ahte_facility_zones_facility_id_fkey ON public.ahte_facility_zones USING btree (facility_id);
CREATE INDEX IF NOT EXISTS fk_ahte_facility_zones_ahte_facility_zones_organization_id_f ON public.ahte_facility_zones USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_formula_materials_ahte_formula_materials_organizatio ON public.ahte_formula_materials USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_formula_materials_ahte_formula_materials_product_ver ON public.ahte_formula_materials USING btree (product_version_id);
CREATE INDEX IF NOT EXISTS ahte_formula_materials_material_idx ON public.ahte_formula_materials USING btree (material_id);
CREATE INDEX IF NOT EXISTS fk_ahte_geofences_ahte_geofences_organization_id_fkey ON public.ahte_geofences USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_hard_gate_rules_ahte_hard_gate_rules_organization_id ON public.ahte_hard_gate_rules USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_lab_results_sample_idx ON public.ahte_lab_results USING btree (sample_id);
CREATE INDEX IF NOT EXISTS fk_ahte_lab_results_ahte_lab_results_organization_id_fkey ON public.ahte_lab_results USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_lab_samples_org_idx ON public.ahte_lab_samples USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_lab_samples_ahte_lab_samples_batch_id_fkey ON public.ahte_lab_samples USING btree (batch_id);
CREATE INDEX IF NOT EXISTS fk_ahte_lab_samples_ahte_lab_samples_evidence_id_fkey ON public.ahte_lab_samples USING btree (evidence_id);
CREATE INDEX IF NOT EXISTS fk_ahte_lab_samples_ahte_lab_samples_laboratory_id_fkey ON public.ahte_lab_samples USING btree (laboratory_id);
CREATE INDEX IF NOT EXISTS fk_ahte_material_lots_ahte_material_lots_evidence_id_fkey ON public.ahte_material_lots USING btree (evidence_id);
CREATE INDEX IF NOT EXISTS fk_ahte_material_lots_ahte_material_lots_material_id_fkey ON public.ahte_material_lots USING btree (material_id);
CREATE INDEX IF NOT EXISTS fk_ahte_material_lots_ahte_material_lots_organization_id_fke ON public.ahte_material_lots USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_materials_org_idx ON public.ahte_materials USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_materials_ahte_materials_supplier_id_fkey ON public.ahte_materials USING btree (supplier_id);
CREATE INDEX IF NOT EXISTS fk_ahte_person_roles_ahte_person_roles_facility_id_fkey ON public.ahte_person_roles USING btree (facility_id);
CREATE INDEX IF NOT EXISTS fk_ahte_person_roles_ahte_person_roles_organization_id_fkey ON public.ahte_person_roles USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_person_roles_ahte_person_roles_user_id_fkey ON public.ahte_person_roles USING btree (user_id);
CREATE INDEX IF NOT EXISTS fk_ahte_process_steps_ahte_process_steps_control_id_fkey ON public.ahte_process_steps USING btree (control_id);
CREATE INDEX IF NOT EXISTS fk_ahte_process_steps_ahte_process_steps_critical_point_id_f ON public.ahte_process_steps USING btree (critical_point_id);
CREATE INDEX IF NOT EXISTS fk_ahte_process_steps_ahte_process_steps_facility_id_fkey ON public.ahte_process_steps USING btree (facility_id);
CREATE INDEX IF NOT EXISTS fk_ahte_process_steps_ahte_process_steps_organization_id_fke ON public.ahte_process_steps USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_process_steps_ahte_process_steps_product_version_id_ ON public.ahte_process_steps USING btree (product_version_id);
CREATE INDEX IF NOT EXISTS fk_ahte_product_versions_ahte_product_versions_organization_ ON public.ahte_product_versions USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_product_versions_ahte_product_versions_product_id_fk ON public.ahte_product_versions USING btree (product_id);
CREATE INDEX IF NOT EXISTS fk_ahte_products_ahte_products_manufacturer_partner_id_fkey ON public.ahte_products USING btree (manufacturer_partner_id);
CREATE INDEX IF NOT EXISTS fk_ahte_products_ahte_products_organization_id_fkey ON public.ahte_products USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_recall_scopes_ahte_recall_scopes_organization_id_fke ON public.ahte_recall_scopes USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_recall_scopes_ahte_recall_scopes_recall_id_fkey ON public.ahte_recall_scopes USING btree (recall_id);
CREATE INDEX IF NOT EXISTS ahte_recalls_org_idx ON public.ahte_recalls USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_retail_events_ahte_retail_events_actor_user_id_fkey ON public.ahte_retail_events USING btree (actor_user_id);
CREATE INDEX IF NOT EXISTS fk_ahte_retail_events_ahte_retail_events_batch_id_fkey ON public.ahte_retail_events USING btree (batch_id);
CREATE INDEX IF NOT EXISTS fk_ahte_retail_events_ahte_retail_events_evidence_id_fkey ON public.ahte_retail_events USING btree (evidence_id);
CREATE INDEX IF NOT EXISTS fk_ahte_retail_events_ahte_retail_events_organization_id_fke ON public.ahte_retail_events USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_retail_events_ahte_retail_events_project_id_fkey ON public.ahte_retail_events USING btree (project_id);
CREATE INDEX IF NOT EXISTS fk_ahte_source_conflicts_ahte_source_conflicts_organization_ ON public.ahte_source_conflicts USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_source_conflicts_ahte_source_conflicts_source_a_fkey ON public.ahte_source_conflicts USING btree (source_a);
CREATE INDEX IF NOT EXISTS fk_ahte_source_conflicts_ahte_source_conflicts_source_b_fkey ON public.ahte_source_conflicts USING btree (source_b);
CREATE INDEX IF NOT EXISTS ahte_source_records_org_idx ON public.ahte_source_records USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_source_records_ahte_source_records_supersedes_id_fke ON public.ahte_source_records USING btree (supersedes_id);
CREATE UNIQUE INDEX idx_ahte_source_records_identity ON public.ahte_source_records USING btree (organization_id, document_id, edition, hash12);
CREATE INDEX IF NOT EXISTS fk_ahte_state_transitions_ahte_state_transitions_organizatio ON public.ahte_state_transitions USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_suppliers_org_idx ON public.ahte_suppliers USING btree (organization_id);
CREATE INDEX IF NOT EXISTS ahte_telemetry_org_time_idx ON public.ahte_telemetry_events USING btree (organization_id, observed_at DESC);
CREATE INDEX IF NOT EXISTS fk_ahte_telemetry_events_ahte_telemetry_events_batch_id_fkey ON public.ahte_telemetry_events USING btree (batch_id);
CREATE INDEX IF NOT EXISTS fk_ahte_telemetry_events_ahte_telemetry_events_device_id_fke ON public.ahte_telemetry_events USING btree (device_id);
CREATE INDEX IF NOT EXISTS fk_ahte_telemetry_events_ahte_telemetry_events_organization_ ON public.ahte_telemetry_events USING btree (organization_id);
CREATE INDEX IF NOT EXISTS fk_ahte_telemetry_events_ahte_telemetry_events_shipment_id_f ON public.ahte_telemetry_events USING btree (shipment_id);

grant select,insert,update,delete on all tables in schema public to authenticated;
grant usage,select on all sequences in schema public to authenticated;


-- AHTE operational primitives: Digital Audit Twin, integrations, devices, disclosure and rate limiting.
-- Restored organization initializer, previously deployed but absent from Git.
create or replace function private.ahte_seed_operating_rules(target_org uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
 insert into public.ahte_hard_gate_rules(organization_id,code,dimension,fail_condition,decision_class) values
 (target_org,'HG-AUTH','authority_certificate','required certificate missing, expired, suspended or out of scope','D5'),
 (target_org,'HG-ID','identity','legal entity, factory, SKU or batch identity unresolved',null),
 (target_org,'HG-LAB','laboratory','positive prohibited analyte or contested laboratory packet used as HALAL',null),
 (target_org,'HG-SEAL','seal','seal break or seal-id mismatch without human close-out','D4'),
 (target_org,'HG-CUSTODY','custody','unexplained custody gap on the corridor',null),
 (target_org,'HG-DEST','destination','destination hold or refusal','D5'),
 (target_org,'HG-HITM','human_decision','open D5/D6 HITM case',null)
 on conflict(organization_id,code) do nothing;
 insert into public.ahte_state_transitions(organization_id,from_state,to_state,event,required_decision_class) values
 (target_org,'draft','evidence_incomplete','packet_opened',null),
 (target_org,'evidence_incomplete','assessed','D2_assessment','D2'),
 (target_org,'assessed','hitm_open','D3_D6_detect','D3'),
 (target_org,'assessed','eligible','hard_gates_pass_and_no_reserved',null),
 (target_org,'hitm_open','authority_pending','D5_D6_case','D5'),
 (target_org,'authority_pending','authority_decided','E5_authority_decision','D5'),
 (target_org,'eligible','released','operational_release',null),
 (target_org,'assessed','held','fracture_D4','D4'),
 (target_org,'eligible','held','fracture_D4','D4'),
 (target_org,'released','held','fracture_D4','D4'),
 (target_org,'held','eligible','human_determination_and_reverification',null),
 (target_org,'held','authority_pending','escalated_D5','D5'),
 (target_org,'released','withdrawn','authority_suspension','D5')
 on conflict(organization_id,machine,from_state,event) do nothing;
end $$;
revoke all on function private.ahte_seed_operating_rules(uuid) from public,anon,authenticated;
create table if not exists public.ahte_digital_twins (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  twin_version integer not null default 1,
  status text not null default 'active' check (status in ('draft','active','held','retired')),
  snapshot jsonb not null default '{}'::jsonb,
  content_hash text,
  source_event_id bigint references public.ahte_event_ledger(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, entity_type, entity_id)
);

create table if not exists public.ahte_integrations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  system_type text not null,
  endpoint text,
  auth_mode text not null default 'managed_secret',
  status text not null default 'draft' check (status in ('draft','active','paused','failed','retired')),
  configuration jsonb not null default '{}'::jsonb,
  last_success_at timestamptz,
  last_error_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, name)
);

create table if not exists public.ahte_inbound_events (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  integration_id uuid not null references public.ahte_integrations(id) on delete cascade,
  external_event_id text not null,
  event_type text not null,
  received_at timestamptz not null default now(),
  payload jsonb not null,
  payload_hash text not null,
  status text not null default 'received' check (status in ('received','normalized','processed','rejected','failed')),
  error_message text,
  created_at timestamptz not null default now(),
  unique (integration_id, external_event_id),
  unique (organization_id, payload_hash)
);

create table if not exists public.ahte_device_maintenance (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  device_id uuid not null references public.ahte_devices(id) on delete cascade,
  activity_type text not null,
  performed_at timestamptz not null default now(),
  performed_by uuid references auth.users(id) on delete set null,
  calibration_reference text,
  evidence_id uuid references public.ahte_evidence(id) on delete set null,
  status text not null default 'recorded' check (status in ('scheduled','recorded','failed','void')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.ahte_credential_checks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  certificate_id uuid not null references public.ahte_certificates(id) on delete cascade,
  checked_at timestamptz not null default now(),
  source_type text not null,
  source_reference text,
  issuer_verified boolean not null default false,
  scope_match boolean not null default false,
  validity_status text not null default 'unknown' check (validity_status in ('valid','expired','suspended','unknown','contested')),
  checked_until date,
  content_hash text,
  evidence_id uuid references public.ahte_evidence(id) on delete set null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.ahte_market_registrations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  product_id uuid not null references public.ahte_products(id) on delete cascade,
  market_code text not null,
  importer_name text,
  registration_reference text,
  halal_acceptance_reference text,
  status text not null default 'pending' check (status in ('pending','submitted','approved','rejected','expired','suspended')),
  effective_from date,
  expires_on date,
  authority_reference text,
  evidence_id uuid references public.ahte_evidence(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, product_id, market_code)
);

create table if not exists public.ahte_consumer_scans (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  product_id uuid references public.ahte_products(id) on delete set null,
  batch_id uuid references public.ahte_batches(id) on delete set null,
  packet_id uuid references public.ahte_trust_packets(id) on delete set null,
  scanned_at timestamptz not null default now(),
  coarse_location jsonb,
  consented boolean not null default false,
  verification_result text not null default 'unknown' check (verification_result in ('verified','held','not_found','expired','unknown')),
  disclosure_version text,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.ahte_api_rate_limits (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  actor_user_id uuid not null references auth.users(id) on delete cascade,
  route text not null,
  window_start timestamptz not null,
  request_count integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (organization_id, actor_user_id, route, window_start)
);

create table if not exists public.ahte_public_verifications (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  packet_id uuid not null references public.ahte_trust_packets(id) on delete cascade,
  token_hash text not null unique,
  disclosure jsonb not null default '{}'::jsonb,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists ahte_digital_twins_entity_idx on public.ahte_digital_twins(organization_id,entity_type,entity_id);
create index if not exists ahte_inbound_events_integration_idx on public.ahte_inbound_events(integration_id,received_at desc);
create index if not exists ahte_device_maintenance_device_idx on public.ahte_device_maintenance(device_id,performed_at desc);
create index if not exists ahte_credential_checks_certificate_idx on public.ahte_credential_checks(certificate_id,checked_at desc);
create index if not exists ahte_market_registrations_market_idx on public.ahte_market_registrations(organization_id,market_code,status);
create index if not exists ahte_consumer_scans_packet_idx on public.ahte_consumer_scans(packet_id,scanned_at desc);
create index if not exists ahte_api_rate_limits_updated_idx on public.ahte_api_rate_limits(organization_id,actor_user_id,updated_at desc);
create index if not exists ahte_public_verifications_packet_idx on public.ahte_public_verifications(packet_id,expires_at);

alter table public.ahte_digital_twins enable row level security;
alter table public.ahte_integrations enable row level security;
alter table public.ahte_inbound_events enable row level security;
alter table public.ahte_device_maintenance enable row level security;
alter table public.ahte_credential_checks enable row level security;
alter table public.ahte_market_registrations enable row level security;
alter table public.ahte_consumer_scans enable row level security;
alter table public.ahte_api_rate_limits enable row level security;
alter table public.ahte_public_verifications enable row level security;

do $$
declare t text;
begin
  foreach t in array array[
    'ahte_digital_twins','ahte_integrations','ahte_inbound_events','ahte_device_maintenance',
    'ahte_credential_checks','ahte_market_registrations','ahte_consumer_scans','ahte_api_rate_limits',
    'ahte_public_verifications'
  ] loop
    execute format('drop policy if exists %I_member_select on public.%I', t, t);
    execute format('create policy %I_member_select on public.%I for select to authenticated using (private.is_org_member(organization_id))', t, t);
    execute format('drop policy if exists %I_member_insert on public.%I', t, t);
    execute format('create policy %I_member_insert on public.%I for insert to authenticated with check (private.is_org_member(organization_id))', t, t);
    execute format('drop policy if exists %I_member_update on public.%I', t, t);
    execute format('create policy %I_member_update on public.%I for update to authenticated using (private.is_org_member(organization_id)) with check (private.is_org_member(organization_id))', t, t);
    execute format('drop policy if exists %I_admin_delete on public.%I', t, t);
    execute format('create policy %I_admin_delete on public.%I for delete to authenticated using (private.has_org_role(organization_id, array[''owner'',''admin'']))', t, t);
  end loop;
end $$;

create or replace function private.ahte_check_rate_limit(p_org uuid,p_actor uuid,p_route text,p_limit integer default 120)
returns boolean language plpgsql security definer set search_path=public as $$
declare w timestamptz:=date_trunc('minute',now()); c integer;
begin
  insert into public.ahte_api_rate_limits(organization_id,actor_user_id,route,window_start,request_count,updated_at)
  values(p_org,p_actor,p_route,w,1,now())
  on conflict (organization_id,actor_user_id,route,window_start)
  do update set request_count=public.ahte_api_rate_limits.request_count+1,updated_at=now()
  returning request_count into c;
  return c <= greatest(1,p_limit);
end $$;

create or replace function public.ahte_rate_limit_proxy(p_org uuid,p_route text,p_limit integer default 120)
returns boolean language plpgsql security invoker set search_path=public as $$
begin
  if not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
  return private.ahte_check_rate_limit(p_org,(select auth.uid()),p_route,p_limit);
end $$;

revoke all on function private.ahte_check_rate_limit(uuid,uuid,text,integer) from public;
revoke all on function public.ahte_rate_limit_proxy(uuid,text,integer) from public;
grant execute on function public.ahte_rate_limit_proxy(uuid,text,integer) to authenticated;

create or replace function private.ahte_create_public_verification(p_org uuid,p_packet_id uuid,p_disclosure jsonb,p_expires_at timestamptz default null)
returns text language plpgsql security definer set search_path=public as $$
declare token text:=encode(gen_random_bytes(24),'hex');
begin
  if not private.is_org_member(p_org) then raise exception 'workspace_forbidden' using errcode='42501'; end if;
  if not exists(select 1 from public.ahte_trust_packets where id=p_packet_id and organization_id=p_org) then raise exception 'packet_not_found'; end if;
  insert into public.ahte_public_verifications(organization_id,packet_id,token_hash,disclosure,expires_at,created_by)
  values(p_org,p_packet_id,encode(digest(token,'sha256'),'hex'),coalesce(p_disclosure,'{}'::jsonb),p_expires_at,(select auth.uid()));
  return token;
end $$;

create or replace function public.ahte_create_public_verification_proxy(p_org uuid,p_packet_id uuid,p_disclosure jsonb,p_expires_at timestamptz default null)
returns text language plpgsql security invoker set search_path=public as $$
begin
  if not private.has_org_role(p_org,array['owner','admin','executive','project_manager']) then raise exception 'public_verification_creation_restricted' using errcode='42501'; end if;
  return private.ahte_create_public_verification(p_org,p_packet_id,p_disclosure,p_expires_at);
end $$;

revoke all on function private.ahte_create_public_verification(uuid,uuid,jsonb,timestamptz) from public;
revoke all on function public.ahte_create_public_verification_proxy(uuid,uuid,jsonb,timestamptz) from public;
grant execute on function public.ahte_create_public_verification_proxy(uuid,uuid,jsonb,timestamptz) to authenticated;
