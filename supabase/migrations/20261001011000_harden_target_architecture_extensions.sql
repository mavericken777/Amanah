-- Harden post-freeze target extension records before transaction data exists.
-- These constraints ensure prediction/strategy provenance and disclosure-policy completeness.

alter table public.ahte_command_center_alerts
  add constraint ahte_cc_subject_objects_nonempty check (cardinality(subject_objects) > 0),
  add constraint ahte_cc_alert_code_nonblank check (btrim(alert_code) <> ''),
  add constraint ahte_cc_trigger_code_nonblank check (btrim(trigger_code) <> '');

alter table public.ahte_predictions
  alter column model_version set not null,
  alter column explanation set not null,
  add constraint ahte_predictions_subject_objects_nonempty check (cardinality(subject_objects) > 0),
  add constraint ahte_predictions_feature_refs_nonempty check (cardinality(feature_refs) > 0),
  add constraint ahte_predictions_code_nonblank check (btrim(prediction_code) <> ''),
  add constraint ahte_predictions_model_id_nonblank check (btrim(model_id) <> ''),
  add constraint ahte_predictions_model_version_nonblank check (btrim(model_version) <> ''),
  add constraint ahte_predictions_explanation_nonblank check (btrim(explanation) <> '');

alter table public.ahte_preemptive_strategies
  alter column expected_impact set not null,
  alter column model_id set not null,
  alter column model_version set not null,
  alter column explanation set not null,
  add constraint ahte_strategies_subject_objects_nonempty check (cardinality(subject_objects) > 0),
  add constraint ahte_strategies_code_nonblank check (btrim(strategy_code) <> ''),
  add constraint ahte_strategies_action_nonblank check (btrim(recommended_action) <> ''),
  add constraint ahte_strategies_expected_impact_nonblank check (btrim(expected_impact) <> ''),
  add constraint ahte_strategies_model_id_nonblank check (btrim(model_id) <> ''),
  add constraint ahte_strategies_model_version_nonblank check (btrim(model_version) <> ''),
  add constraint ahte_strategies_explanation_nonblank check (btrim(explanation) <> '');

alter table public.ahte_finance_evidence_packets
  add constraint ahte_finance_subject_objects_nonempty check (cardinality(subject_objects) > 0),
  add constraint ahte_finance_packet_code_nonblank check (btrim(packet_code) <> ''),
  add constraint ahte_finance_requesting_party_nonblank check (btrim(requesting_party) <> ''),
  add constraint ahte_finance_disclosure_policy_nonblank check (btrim(disclosure_policy) <> '');
