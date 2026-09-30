-- Complete target-state persistence from GlobalHalalDigitalTrust@0fab4c64240b.
-- Operational/evidence records only: no certification, sovereign release, financing, underwriting,
-- token legal-title or Shariah decision is created by these tables.

create table if not exists public.ahte_connector_states (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade, connector_code text not null check (btrim(connector_code) <> ''),
  domain text not null check (domain in ('jakim','laboratory','sinotrans','origin_port_customs','gcc_port_customs','gcc_importer','finance','takaful','tokenomics','other')),
  provider text, state text not null check (state in ('development-provider-active','sandbox-connected','production-credentials-required','production-connected')),
  environment text not null check (environment in ('development','sandbox','staging','production')), production_evidence boolean not null default false,
  last_success_at timestamptz, last_error_at timestamptz, last_error_code text, notes text,
  created_by uuid references auth.users(id) on delete set null default auth.uid(), created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  unique(organization_id, connector_code), check (state <> 'production-connected' or environment = 'production')
);

create table if not exists public.ahte_financing_cases (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade, case_code text not null check (btrim(case_code) <> ''),
  purpose text not null check (purpose in ('trade_finance','purchase_order_finance','inventory_finance','shipment_finance','receivables_finance','other')),
  subject_objects text[] not null check (cardinality(subject_objects) > 0), evidence_packet_id uuid not null references public.ahte_finance_evidence_packets(id) on delete restrict,
  connector_state_id uuid references public.ahte_connector_states(id) on delete set null, provider_ref text, external_case_ref text,
  status text not null default 'draft' check (status in ('draft','evidence_packet_ready','submitted','received','under_review','info_required','offered','declined','accepted','documentation','funded','active','repaid','defaulted','cancelled')),
  external_decision_owner text not null check (btrim(external_decision_owner) <> ''), decision_ref text, decision_at timestamptz, event_refs text[] not null default '{}',
  ahte_approves_financing boolean not null default false check (ahte_approves_financing=false), created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id, case_code)
);

create table if not exists public.ahte_takaful_cases (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade, case_code text not null check (btrim(case_code) <> ''),
  case_type text not null check (case_type in ('underwriting','claim')), subject_objects text[] not null check (cardinality(subject_objects) > 0),
  evidence_packet_id uuid not null references public.ahte_finance_evidence_packets(id) on delete restrict, connector_state_id uuid references public.ahte_connector_states(id) on delete set null,
  provider_ref text, external_case_ref text,
  status text not null default 'draft' check (status in ('draft','evidence_packet_ready','submitted','under_review','info_required','terms_offered','declined','cover_active','incident','claim_submitted','claim_under_review','paid','rejected','partial','withdrawn','closed')),
  external_decision_owner text not null check (btrim(external_decision_owner) <> ''), policy_or_claim_ref text, decision_ref text, event_refs text[] not null default '{}',
  ahte_underwrites_or_decides_claim boolean not null default false check (ahte_underwrites_or_decides_claim=false), created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id, case_code)
);

create table if not exists public.ahte_tokenized_asset_references (
  id uuid primary key default gen_random_uuid(), organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade, reference_code text not null check (btrim(reference_code) <> ''), subject_objects text[] not null check (cardinality(subject_objects) > 0),
  connector_state_id uuid references public.ahte_connector_states(id) on delete set null, provider_ref text, network_ref text, external_token_ref text,
  underlying_asset_type text not null check (btrim(underlying_asset_type) <> ''), ownership_title_source_ref text,
  financing_case_id uuid references public.ahte_financing_cases(id) on delete set null, custody_state_ref text, authority_status_ref text,
  legal_classification_status text not null default 'unreviewed' check (legal_classification_status in ('unreviewed','under_review','approved_for_scope','not_approved','not_applicable')),
  shariah_review_status text not null default 'unreviewed' check (shariah_review_status in ('unreviewed','under_review','approved_for_scope','not_approved','not_applicable')),
  regulatory_status text not null default 'unreviewed' check (regulatory_status in ('unreviewed','under_review','approved_for_scope','not_approved','not_applicable')),
  ahte_is_title_registry boolean not null default false check (ahte_is_title_registry=false), tokenization_creates_halal_status boolean not null default false check (tokenization_creates_halal_status=false),
  created_by uuid references auth.users(id) on delete set null default auth.uid(), created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(organization_id, reference_code)
);

create index if not exists ahte_connector_states_org_domain_idx on public.ahte_connector_states(organization_id,domain,state);
create index if not exists ahte_connector_states_project_idx on public.ahte_connector_states(project_id); create index if not exists ahte_connector_states_created_by_idx on public.ahte_connector_states(created_by);
create index if not exists ahte_financing_cases_org_status_idx on public.ahte_financing_cases(organization_id,status,created_at desc); create index if not exists ahte_financing_cases_project_idx on public.ahte_financing_cases(project_id); create index if not exists ahte_financing_cases_packet_idx on public.ahte_financing_cases(evidence_packet_id); create index if not exists ahte_financing_cases_connector_idx on public.ahte_financing_cases(connector_state_id); create index if not exists ahte_financing_cases_created_by_idx on public.ahte_financing_cases(created_by);
create index if not exists ahte_takaful_cases_org_status_idx on public.ahte_takaful_cases(organization_id,status,created_at desc); create index if not exists ahte_takaful_cases_project_idx on public.ahte_takaful_cases(project_id); create index if not exists ahte_takaful_cases_packet_idx on public.ahte_takaful_cases(evidence_packet_id); create index if not exists ahte_takaful_cases_connector_idx on public.ahte_takaful_cases(connector_state_id); create index if not exists ahte_takaful_cases_created_by_idx on public.ahte_takaful_cases(created_by);
create index if not exists ahte_tokenized_asset_org_status_idx on public.ahte_tokenized_asset_references(organization_id,legal_classification_status,shariah_review_status,regulatory_status); create index if not exists ahte_tokenized_asset_project_idx on public.ahte_tokenized_asset_references(project_id); create index if not exists ahte_tokenized_asset_connector_idx on public.ahte_tokenized_asset_references(connector_state_id); create index if not exists ahte_tokenized_asset_financing_idx on public.ahte_tokenized_asset_references(financing_case_id); create index if not exists ahte_tokenized_asset_created_by_idx on public.ahte_tokenized_asset_references(created_by);

alter table public.ahte_connector_states enable row level security; alter table public.ahte_financing_cases enable row level security; alter table public.ahte_takaful_cases enable row level security; alter table public.ahte_tokenized_asset_references enable row level security;
create policy ahte_connector_states_read on public.ahte_connector_states for select to authenticated using (private.is_org_member(organization_id)); create policy ahte_financing_cases_read on public.ahte_financing_cases for select to authenticated using (private.is_org_member(organization_id)); create policy ahte_takaful_cases_read on public.ahte_takaful_cases for select to authenticated using (private.is_org_member(organization_id)); create policy ahte_tokenized_assets_read on public.ahte_tokenized_asset_references for select to authenticated using (private.is_org_member(organization_id));
create policy ahte_connector_states_write on public.ahte_connector_states for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])); create policy ahte_financing_cases_write on public.ahte_financing_cases for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])); create policy ahte_takaful_cases_write on public.ahte_takaful_cases for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])); create policy ahte_tokenized_assets_write on public.ahte_tokenized_asset_references for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));
create policy ahte_connector_states_update on public.ahte_connector_states for update to authenticated using (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])) with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])); create policy ahte_financing_cases_update on public.ahte_financing_cases for update to authenticated using (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])) with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])); create policy ahte_takaful_cases_update on public.ahte_takaful_cases for update to authenticated using (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])) with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])); create policy ahte_tokenized_assets_update on public.ahte_tokenized_asset_references for update to authenticated using (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])) with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));
create policy ahte_connector_states_delete on public.ahte_connector_states for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin'])); create policy ahte_financing_cases_delete on public.ahte_financing_cases for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin'])); create policy ahte_takaful_cases_delete on public.ahte_takaful_cases for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin'])); create policy ahte_tokenized_assets_delete on public.ahte_tokenized_asset_references for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin']));

create trigger audit_ahte_connector_states after insert or update or delete on public.ahte_connector_states for each row execute procedure private.audit_row_change(); create trigger audit_ahte_financing_cases after insert or update or delete on public.ahte_financing_cases for each row execute procedure private.audit_row_change(); create trigger audit_ahte_takaful_cases after insert or update or delete on public.ahte_takaful_cases for each row execute procedure private.audit_row_change(); create trigger audit_ahte_tokenized_asset_references after insert or update or delete on public.ahte_tokenized_asset_references for each row execute procedure private.audit_row_change();
alter publication supabase_realtime add table public.ahte_connector_states; alter publication supabase_realtime add table public.ahte_financing_cases; alter publication supabase_realtime add table public.ahte_takaful_cases;
