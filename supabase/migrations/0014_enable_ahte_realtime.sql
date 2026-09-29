-- Enable realtime subscriptions for critical AHTE operational streams.
do $$
declare t text;
begin
  foreach t in array array[
    'ahte_telemetry_events',
    'ahte_event_ledger',
    'ahte_fracture_events',
    'ahte_trust_states',
    'notifications',
    'ahte_inbound_events'
  ] loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname='supabase_realtime' and schemaname='public' and tablename=t
    ) then
      execute format('alter publication supabase_realtime add table public.%I',t);
    end if;
  end loop;
end $$;
