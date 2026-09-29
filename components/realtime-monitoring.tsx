"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

type Event = { kind: string; at: string; summary: string };

export function RealtimeMonitoring({ organizationId }: { organizationId: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const channel = supabase
      .channel("ahte-realtime-" + organizationId)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ahte_telemetry_events", filter: "organization_id=eq." + organizationId }, payload => {
        const row = payload.new as Record<string, unknown>;
        setEvents(prev => [{ kind: "Telemetry", at: String(row.observed_at ?? new Date().toISOString()), summary: String(row.event_code ?? row.metric_type ?? "telemetry event") }, ...prev].slice(0, 12));
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ahte_fracture_events", filter: "organization_id=eq." + organizationId }, payload => {
        const row = payload.new as Record<string, unknown>;
        setEvents(prev => [{ kind: "Trust fracture", at: String(row.detected_at ?? new Date().toISOString()), summary: String(row.fracture_type ?? "fracture") + " · HOLD" }, ...prev].slice(0, 12));
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ahte_trust_states", filter: "organization_id=eq." + organizationId }, payload => {
        const row = payload.new as Record<string, unknown>;
        setEvents(prev => [{ kind: "Trust state", at: String(row.effective_at ?? new Date().toISOString()), summary: String(row.state ?? "state") }, ...prev].slice(0, 12));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [organizationId, supabase]);

  return (
    <section className="card">
      <div className="row-between"><div><div className="eyebrow">LIVE STREAM</div><h2>Realtime operator feed</h2></div><span className="status">CONNECTED</span></div>
      {events.length ? events.map((event, index) => (
        <div className="row-between" key={event.at + event.kind + index}><span><strong>{event.kind}</strong> · {event.summary}</span><span className="muted">{new Date(event.at).toLocaleString()}</span></div>
      )) : <p className="muted">Listening for telemetry, fracture and trust-state events.</p>}
    </section>
  );
}
