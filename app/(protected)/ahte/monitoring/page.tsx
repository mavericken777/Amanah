import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";
import { RealtimeMonitoring } from "@/components/realtime-monitoring";

export default async function MonitoringPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;

  const [devices, telemetry, fractures, blast] = requireQueryResults(await Promise.all([
    supabase.from("ahte_devices").select("device_code,device_type,status,provisioning_status,calibration_due").eq("organization_id", org.id).order("device_code"),
    supabase.from("ahte_telemetry_events").select("metric_type,metric_value,unit,event_code,observed_at,event_hash,device_id").eq("organization_id", org.id).order("observed_at", { ascending: false }).limit(100),
    supabase.from("ahte_fracture_events").select("entity_type,entity_id,fracture_type,severity,auto_hold,resolution,detected_at").eq("organization_id", org.id).order("detected_at", { ascending: false }).limit(100),
    supabase.from("ahte_blast_radius").select("entity_type,entity_id,impact_type,status,fracture_id").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(100),
  ] as const));

  return <div className="page stack-xl">
    <header><div className="eyebrow">AHTE / PLATINUM</div><h1>Real-time monitoring & trust fractures</h1><p className="lead">Device identity → telemetry → event integrity → exception → hold → blast-radius → re-verification.</p></header>
    <RealtimeMonitoring organizationId={org.id} />
    <section className="card"><h2>Devices</h2>{(devices.data ?? []).map((d: any) => <div className="row-between" key={d.device_code}><span>{d.device_code} · {d.device_type}</span><span className="status">{d.status} · {d.provisioning_status}</span></div>)}</section>
    <section className="card"><h2>Telemetry</h2>{(telemetry.data ?? []).map((t: any, i: number) => <div className="row-between" key={t.event_hash + "-" + i}><span>{t.event_code || t.metric_type} · {t.metric_value ?? "—"} {t.unit || ""}</span><span className="muted">{new Date(t.observed_at).toLocaleString()}</span></div>)}</section>
    <section className="card"><h2>Fractures / holds</h2>{(fractures.data ?? []).map((f: any, i: number) => <div className="row-between" key={i}><span>{f.entity_type} / {f.fracture_type}</span><span className="status">{f.severity} · hold {f.auto_hold ? "ON" : "OFF"}{f.resolution ? " · resolved" : ""}</span></div>)}</section>
    <section className="card"><h2>Blast radius</h2>{(blast.data ?? []).map((b: any, i: number) => <div className="row-between" key={i}><span>{b.entity_type} / {b.impact_type}</span><span className="status">{b.status}</span></div>)}</section>
  </div>;
}

function Empty() { return <div className="page"><div className="card"><h1>No workspace</h1></div></div>; }
