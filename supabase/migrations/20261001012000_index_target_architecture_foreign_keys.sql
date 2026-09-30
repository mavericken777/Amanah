-- Cover foreign keys introduced by the 2026-10-01 target-architecture extensions.
create index if not exists ahte_cc_alerts_created_by_idx on public.ahte_command_center_alerts(created_by);
create index if not exists ahte_cc_alerts_prediction_idx on public.ahte_command_center_alerts(prediction_id);
create index if not exists ahte_cc_alerts_project_idx on public.ahte_command_center_alerts(project_id);
create index if not exists ahte_cc_alerts_shipment_idx on public.ahte_command_center_alerts(shipment_id);
create index if not exists ahte_cc_alerts_strategy_idx on public.ahte_command_center_alerts(strategy_id);
create index if not exists ahte_finance_packets_created_by_idx on public.ahte_finance_evidence_packets(created_by);
create index if not exists ahte_finance_packets_project_idx on public.ahte_finance_evidence_packets(project_id);
create index if not exists ahte_predictions_created_by_idx on public.ahte_predictions(created_by);
create index if not exists ahte_predictions_project_idx on public.ahte_predictions(project_id);
create index if not exists ahte_strategies_created_by_idx on public.ahte_preemptive_strategies(created_by);
create index if not exists ahte_strategies_prediction_idx on public.ahte_preemptive_strategies(prediction_id);
create index if not exists ahte_strategies_project_idx on public.ahte_preemptive_strategies(project_id);
