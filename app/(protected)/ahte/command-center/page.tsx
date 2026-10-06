import Link from "next/link";
import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

const domains = [
  "Manufacturer / facility", "Supplier / raw material", "Laboratory / sample", "HCP / SCCP",
  "Smart-glass audit", "Authority status", "Sinotrans warehouse", "Sinotrans logistics",
  "Container / seal", "Telemetry / route / geofence", "Custody", "Origin + GCC ports",
  "GCC importer / receiving", "Distributor / 3PL", "Retail / marketplace", "CAPA / re-verification", "Evidence expiry", "Trust fracture",
  "Predictive risk", "Preemptive strategy", "Recall / blast radius",
];

export default async function CommandCenterPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <div className="page"><div className="card"><h1>No workspace</h1></div></div>;
  const db = supabase as any;

  const [telemetry, fractures, blast, openCount, holdCount, alerts, predictions, strategies] = requireQueryResults(await Promise.all([
    db.from("ahte_telemetry_events").select("event_code,metric_type,observed_at").eq("organization_id", org.id).order("observed_at", { ascending: false }).limit(25),
    db.from("ahte_fracture_events").select("fracture_type,severity,auto_hold,resolution,detected_at").eq("organization_id", org.id).order("detected_at", { ascending: false }).limit(25),
    db.from("ahte_blast_radius").select("entity_type,impact_type,status,created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(25),
    db.from("ahte_fracture_events").select("id", { count: "exact", head: true }).eq("organization_id", org.id).is("resolution", null),
    db.from("ahte_fracture_events").select("id", { count: "exact", head: true }).eq("organization_id", org.id).eq("auto_hold", true).is("resolution", null),
    db.from("ahte_command_center_alerts").select("alert_code,trigger_code,severity,status,detected_at").eq("organization_id", org.id).order("detected_at", { ascending: false }).limit(25),
    db.from("ahte_predictions").select("prediction_code,risk_type,confidence,generated_at,explanation").eq("organization_id", org.id).order("generated_at", { ascending: false }).limit(25),
    db.from("ahte_preemptive_strategies").select("strategy_code,recommended_action,urgency,status,generated_at").eq("organization_id", org.id).order("generated_at", { ascending: false }).limit(25),
  ] as const));

  return <div className="page stack-xl">
    <header>
      <div className="eyebrow">AHTE / 24×7 COMMAND CENTER</div>
      <h1>GHSCL + JAKIM-connected monitoring, prediction & preemption</h1>
      <p className="lead">Observe → correlate → detect → predict → generate strategy → assign → escalate/hold where policy allows → human/authority action → CAPA/re-verification → outcome.</p>
      <p className="muted">This view is the AHTE operating layer. It does not create certification, sovereign release, financing or Takaful decisions.</p>
    </header>

    <section className="grid-3">
      <article className="card"><div className="eyebrow">Recent telemetry</div><h2>{(telemetry.data ?? []).length}</h2><p>Latest 25 organization-scoped events.</p></article>
      <article className="card"><div className="eyebrow">Open fractures</div><h2>{openCount.count ?? 0}</h2><p>Organization-wide unresolved fracture count.</p></article>
      <article className="card"><div className="eyebrow">Active policy holds</div><h2>{holdCount.count ?? 0}</h2><p>Organization-wide unresolved auto-holds. D4 holds cannot be silently released by AI.</p></article>
    </section>

    <section className="grid-3">
      <article className="card"><div className="eyebrow">Open alert records</div><h2>{(alerts.data ?? []).filter((a:any)=>!['closed'].includes(a.status)).length}</h2><p>Latest operational alert window; detailed state remains persisted.</p></article>
      <article className="card"><div className="eyebrow">Prediction records</div><h2>{(predictions.data ?? []).length}</h2><p>Latest evidence-linked predictive outputs.</p></article>
      <article className="card"><div className="eyebrow">Strategy records</div><h2>{(strategies.data ?? []).length}</h2><p>Latest preemptive strategies awaiting or recording governed action.</p></article>
    </section>

    <section className="card"><h2>24/7 monitored domains</h2><div className="tag-list">{domains.map(d => <span className="status" key={d}>{d}</span>)}</div></section>

    <section className="card">
      <h2>Predictive → preemptive control loop</h2>
      <p>Evidence Gap Predictor · Anomaly Engine · Contradiction Engine · Trust Fracture Engine · Predictive Compliance Engine · Recall Blast-Radius Engine · <strong>Preemptive Strategy Engine</strong>.</p>
      <p className="muted">Predictions and strategies retain model/version, input/evidence references, affected objects, confidence/score where applicable, explanation, decision class, human reviewer linkage and outcome references.</p>
    </section>

    <section className="card"><h2>Recent Command Center alerts</h2>{(alerts.data ?? []).length ? (alerts.data ?? []).map((a:any)=><div className="row-between" key={a.alert_code}><span>{a.trigger_code}</span><span className="status">{a.severity} · {a.status}</span></div>) : <p className="muted">No Command Center alert records in this workspace.</p>}</section>
    <section className="card"><h2>Recent predictions</h2>{(predictions.data ?? []).length ? (predictions.data ?? []).map((p:any)=><div className="row-between" key={p.prediction_code}><span>{p.risk_type}{p.explanation ? ` · ${p.explanation}` : ""}</span><span className="status">{p.confidence}</span></div>) : <p className="muted">No prediction records in this workspace.</p>}</section>
    <section className="card"><h2>Recent preemptive strategies</h2>{(strategies.data ?? []).length ? (strategies.data ?? []).map((s:any)=><div className="row-between" key={s.strategy_code}><span>{s.recommended_action}</span><span className="status">{s.urgency} · {s.status}</span></div>) : <p className="muted">No preemptive strategy records in this workspace.</p>}</section>

    <section className="card"><h2>Recent trust fractures</h2>{(fractures.data ?? []).length ? (fractures.data ?? []).map((f: any, i: number) => <div className="row-between" key={i}><span>{f.fracture_type}</span><span className="status">{f.severity} · {f.auto_hold ? "HOLD" : "review"}{f.resolution ? " · resolved" : ""}</span></div>) : <p className="muted">No fracture records in this workspace.</p>}</section>
    <section className="card"><h2>Blast-radius state</h2>{(blast.data ?? []).length ? (blast.data ?? []).map((b: any, i: number) => <div className="row-between" key={i}><span>{b.entity_type} · {b.impact_type}</span><span className="status">{b.status}</span></div>) : <p className="muted">No blast-radius records in this workspace.</p>}</section>

    <section className="card"><h2>Authority & ecosystem boundaries</h2><p><strong>AHTE ⇄ Direct JAKIM API ⇄ JAKIM</strong> is the target project topology. Sinotrans supplies warehouse/logistics events; port/customs authorities return sovereign inspection/hold/release events; finance/Takaful counterparties make their own decisions.</p><p><Link href="/ahte/monitoring">Open Platinum Monitoring →</Link></p></section>
  </div>;
}
