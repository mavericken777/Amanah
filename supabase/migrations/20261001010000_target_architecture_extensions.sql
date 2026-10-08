-- Target architecture persistence derived from GlobalHalalDigitalTrust project architecture.
-- These objects are operational/evidence records. They do not create certification, sovereign release,
-- financing approval, Takaful underwriting decisions or legal title.

create table if not exists public.ahte_command_center_alerts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  alert_code text not null,
  trigger_code text not null,
  taxonomy text,
  severity text not null check (severity in ('S0','S1','S2','S3','S4','S5')),
  subject_objects text[] not null default '{}',
  shipment_id uuid references public.ahte_shipments(id) on delete set null,
  event_refs text[] not null default '{}',
  evidence_refs uuid[] not null default '{}',
  prediction_id uuid,
  strategy_id uuid,
  detected_at timestamptz not null default now(),
  owner_role text,
  decision_class text not null check (decision_class in ('D0','D1','D2','D3','D4','D5','D6')),
  status text not null default 'open' check (status in ('open','assigned','held','in_review','capa','reverification','closed','escalated','recalled')),
  creates_authority_decision boolean not null default false check (creates_authority_decision=false),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(organization_id, alert_code)
);

create table if not exists public.ahte_predictions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  prediction_code text not null,
  model_id text not null,
  model_version text not null,
  generated_at timestamptz not null default now(),
  subject_objects text[] not null default '{}',
  risk_type text not null,
  predicted_failure text,
  score numeric,
  confidence text not null default 'unscored' check (confidence in ('low','medium','high','unscored')),
  horizon text,
  evidence_refs uuid[] not null default '{}',
  feature_refs text[] not null default '{}',
  explanation text,
  blast_radius_refs text[] not null default '{}',
  decision_class text not null default 'D2' check (decision_class='D2'),
  creates_authority_decision boolean not null default false check (creates_authority_decision=false),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  unique(organization_id, prediction_code)
);

create table if not exists public.ahte_preemptive_strategies (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  strategy_code text not null,
  prediction_id uuid not null references public.ahte_predictions(id) on delete restrict,
  subject_objects text[] not null default '{}',
  recommended_action text not null,
  alternative_actions text[] not null default '{}',
  expected_impact text,
  urgency text not null check (urgency in ('low','medium','high','critical')),
  evidence_refs uuid[] not null default '{}',
  model_id text,
  model_version text,
  confidence text not null default 'unscored' check (confidence in ('low','medium','high','unscored')),
  explanation text,
  decision_class text not null check (decision_class in ('D2','D3','D4','D5','D6')),
  required_human_role text,
  generated_at timestamptz not null default now(),
  expires_at timestamptz,
  status text not null default 'proposed' check (status in ('proposed','queued','approved','rejected','executed','expired','superseded')),
  outcome_refs text[] not null default '{}',
  creates_authority_decision boolean not null default false check (creates_authority_decision=false),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  updated_at timestamptz not null default now(),
  unique(organization_id, strategy_code)
);

alter table public.ahte_command_center_alerts
  add constraint ahte_command_center_alerts_prediction_fk foreign key (prediction_id) references public.ahte_predictions(id) on delete set null;
alter table public.ahte_command_center_alerts
  add constraint ahte_command_center_alerts_strategy_fk foreign key (strategy_id) references public.ahte_preemptive_strategies(id) on delete set null;

create table if not exists public.ahte_finance_evidence_packets (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  packet_code text not null,
  purpose text not null check (purpose in ('trade_finance','purchase_order_finance','inventory_finance','shipment_finance','takaful_underwriting','takaful_claim','asset_state_verification','tokenomics_support','other')),
  requesting_party text not null,
  subject_objects text[] not null default '{}',
  formal_authority_status_ref text,
  ahte_trust_state_ref text,
  supply_chain_state_ref text,
  evidence_refs uuid[] not null default '{}',
  custody_refs text[] not null default '{}',
  exception_refs text[] not null default '{}',
  integrity_manifest_ref text,
  issued_at timestamptz not null default now(),
  valid_until timestamptz,
  disclosure_policy text not null,
  signature_or_auth_ref text,
  creates_financing_decision boolean not null default false check (creates_financing_decision=false),
  creates_takaful_decision boolean not null default false check (creates_takaful_decision=false),
  is_halal_certification boolean not null default false check (is_halal_certification=false),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  unique(organization_id, packet_code)
);

create index if not exists ahte_cc_alerts_org_status_idx on public.ahte_command_center_alerts(organization_id,status,severity,detected_at desc);
create index if not exists ahte_predictions_org_time_idx on public.ahte_predictions(organization_id,generated_at desc);
create index if not exists ahte_strategies_org_status_idx on public.ahte_preemptive_strategies(organization_id,status,urgency,generated_at desc);
create index if not exists ahte_finance_packets_org_time_idx on public.ahte_finance_evidence_packets(organization_id,issued_at desc);

alter table public.ahte_command_center_alerts enable row level security;
alter table public.ahte_predictions enable row level security;
alter table public.ahte_preemptive_strategies enable row level security;
alter table public.ahte_finance_evidence_packets enable row level security;

create policy ahte_cc_alerts_read on public.ahte_command_center_alerts for select to authenticated using (private.is_org_member(organization_id));
create policy ahte_predictions_read on public.ahte_predictions for select to authenticated using (private.is_org_member(organization_id));
create policy ahte_strategies_read on public.ahte_preemptive_strategies for select to authenticated using (private.is_org_member(organization_id));
create policy ahte_finance_packets_read on public.ahte_finance_evidence_packets for select to authenticated using (private.is_org_member(organization_id));

create policy ahte_cc_alerts_write on public.ahte_command_center_alerts for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));
create policy ahte_predictions_write on public.ahte_predictions for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));
create policy ahte_strategies_write on public.ahte_preemptive_strategies for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));
create policy ahte_finance_packets_write on public.ahte_finance_evidence_packets for insert to authenticated with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));

create policy ahte_cc_alerts_update on public.ahte_command_center_alerts for update to authenticated using (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])) with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));
create policy ahte_strategies_update on public.ahte_preemptive_strategies for update to authenticated using (private.has_org_role(organization_id,array['owner','admin','executive','project_manager'])) with check (private.has_org_role(organization_id,array['owner','admin','executive','project_manager']));

create policy ahte_cc_alerts_delete on public.ahte_command_center_alerts for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin']));
create policy ahte_predictions_delete on public.ahte_predictions for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin']));
create policy ahte_strategies_delete on public.ahte_preemptive_strategies for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin']));
create policy ahte_finance_packets_delete on public.ahte_finance_evidence_packets for delete to authenticated using (private.has_org_role(organization_id,array['owner','admin']));

-- Predictions and finance evidence packets are immutable after creation; corrections are new/superseding records.

create trigger audit_ahte_command_center_alerts after insert or update or delete on public.ahte_command_center_alerts for each row execute procedure private.audit_row_change();
create trigger audit_ahte_predictions after insert or delete on public.ahte_predictions for each row execute procedure private.audit_row_change();
create trigger audit_ahte_preemptive_strategies after insert or update or delete on public.ahte_preemptive_strategies for each row execute procedure private.audit_row_change();
create trigger audit_ahte_finance_evidence_packets after insert or delete on public.ahte_finance_evidence_packets for each row execute procedure private.audit_row_change();

alter publication supabase_realtime add table public.ahte_command_center_alerts;
alter publication supabase_realtime add table public.ahte_predictions;
alter publication supabase_realtime add table public.ahte_preemptive_strategies;
