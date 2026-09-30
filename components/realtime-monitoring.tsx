"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

type Event = { kind: string; at: string; summary: string };

export function RealtimeMonitoring({ organizationId }: { organizationId: string }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [connection, setConnection] = useState("CONNECTING");
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let active = true;
    setEvents([]);
    setConnection("CONNECTING");
    const channel = supabase
      .channel("ahte-realtime-" + organizationId)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ahte_telemetry_events", filter: "organization_id=eq." + organizationId }, payload => {
        if (!active) return;
        const row = payload.new as Record<string, unknown>;
        setEvents(prev => [{ kind: "Telemetry", at: String(row.observed_at ?? new Date().toISOString()), summary: String(row.event_code ?? row.metric_type ?? "telemetry event") }, ...prev].slice(0, 12));
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ahte_fracture_events", filter: "organization_id=eq." + organizationId }, payload => {
        if (!active) return;
        const row = payload.new as Record<string, unknown>;
        setEvents(prev => [{ kind: "Trust fracture", at: String(row.detected_at ?? new Date().toISOString()), summary: String(row.fracture_type ?? "fracture") + " · HOLD" }, ...prev].slice(0, 12));
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "ahte_trust_states", filter: "organization_id=eq." + organizationId }, payload => {
        if (!active) return;
        const row = payload.new as Record<string, unknown>;
        setEvents(prev => [{ kind: "Trust state", at: String(row.effective_at ?? new Date().toISOString()), summary: String(row.state ?? "state") }, ...prev].slice(0, 12));
      })
      .subscribe(status => {
        if (active) setConnection(status === "SUBSCRIBED" ? "CONNECTED" : status === "TIMED_OUT" ? "RECONNECTING" : status === "CHANNEL_ERROR" ? "UNAVAILABLE" : "DISCONNECTED");
      });

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [organizationId, supabase]);

  return (
    <section className="card">
      <div className="row-between"><div><div className="eyebrow">LIVE STREAM</div><h2>Realtime operator feed</h2></div><span className="status" role="status">{connection}</span></div>
      {events.length ? events.map((event, index) => (
        <div className="row-between" key={event.at + event.kind + index}><span><strong>{event.kind}</strong> · {event.summary}</span><span className="muted">{new Date(event.at).toLocaleString()}</span></div>
      )) : <p className="muted">{connection === "CONNECTED" ? "Listening for telemetry, fracture and trust-state events." : connection === "UNAVAILABLE" ? "Operator feed unavailable. Refresh to reconnect." : "Awaiting the operator feed. Stored records are listed below."}</p>}
    </section>
  );
}
