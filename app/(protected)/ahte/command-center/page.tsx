import Link from "next/link";
import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

const domains = [
  "Manufacturer / facility", "Supplier / raw material", "Laboratory / sample", "HCP / SCCP",
  "Smart-glass audit", "Authority status", "Sinotrans warehouse", "Sinotrans logistics",
  "Container / seal", "Telemetry / route / geofence", "Custody", "Origin + GCC ports",
  "GCC receiving", "CAPA / re-verification", "Evidence expiry", "Trust fracture",
  "Predictive risk", "Preemptive strategy", "Recall / blast radius",
];

export default async function CommandCenterPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <div className="page"><div className="card"><h1>No workspace</h1></div></div>;

  const [telemetry, fractures, blast] = requireQueryResults(await Promise.all([
    supabase.from("ahte_telemetry_events").select("event_code,metric_type,observed_at").eq("organization_id", org.id).order("observed_at", { ascending: false }).limit(25),
    supabase.from("ahte_fracture_events").select("fracture_type,severity,auto_hold,resolution,detected_at").eq("organization_id", org.id).order("detected_at", { ascending: false }).limit(25),
    supabase.from("ahte_blast_radius").select("entity_type,impact_type,status,created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(25),
  ] as const));

  const openFractures = (fractures.data ?? []).filter((f: any) => !f.resolution).length;
  const activeHolds = (fractures.data ?? []).filter((f: any) => f.auto_hold && !f.resolution).length;

  return <div className="page stack-xl">
    <header>
      <div className="eyebrow">AHTE / 24×7 COMMAND CENTER</div>
      <h1>GHSCL + JAKIM-connected monitoring, prediction & preemption</h1>
      <p className="lead">Observe → correlate → detect → predict → generate strategy → assign → escalate/hold where policy allows → human/authority action → CAPA/re-verification → outcome.</p>
      <p className="muted">This view is the AHTE operating layer. It does not create certification, sovereign release, financing or Takaful decisions.</p>
    </header>

    <section className="grid-3">
      <article className="card"><div className="eyebrow">Recent telemetry</div><h2>{(telemetry.data ?? []).length}</h2><p>Latest organization-scoped events loaded.</p></article>
      <article className="card"><div className="eyebrow">Open fractures</div><h2>{openFractures}</h2><p>Require governed resolution / re-verification.</p></article>
      <article className="card"><div className="eyebrow">Active policy holds</div><h2>{activeHolds}</h2><p>D4 holds cannot be silently released by AI.</p></article>
    </section>

    <section className="card"><h2>24/7 monitored domains</h2><div className="tag-list">{domains.map(d => <span className="status" key={d}>{d}</span>)}</div></section>

    <section className="card">
      <h2>Predictive → preemptive control loop</h2>
      <p>Evidence Gap Predictor · Anomaly Engine · Contradiction Engine · Trust Fracture Engine · Predictive Compliance Engine · Recall Blast-Radius Engine · <strong>Preemptive Strategy Engine</strong>.</p>
      <p className="muted">Predictions and strategies must retain model/version, input/evidence references, affected objects, confidence/score where applicable, explanation, decision class, human reviewer linkage and outcome references.</p>
    </section>

    <section className="card"><h2>Recent trust fractures</h2>{(fractures.data ?? []).length ? (fractures.data ?? []).map((f: any, i: number) => <div className="row-between" key={i}><span>{f.fracture_type}</span><span className="status">{f.severity} · {f.auto_hold ? "HOLD" : "review"}{f.resolution ? " · resolved" : ""}</span></div>) : <p className="muted">No fracture records in this workspace.</p>}</section>

    <section className="card"><h2>Blast-radius state</h2>{(blast.data ?? []).length ? (blast.data ?? []).map((b: any, i: number) => <div className="row-between" key={i}><span>{b.entity_type} · {b.impact_type}</span><span className="status">{b.status}</span></div>) : <p className="muted">No blast-radius records in this workspace.</p>}</section>

    <section className="card"><h2>Authority & ecosystem boundaries</h2><p><strong>AHTE ⇄ Direct JAKIM API ⇄ JAKIM</strong> is the target project topology. Sinotrans supplies warehouse/logistics events; port/customs authorities return sovereign inspection/hold/release events; finance/Takaful counterparties make their own decisions.</p><p><Link href="/ahte/monitoring">Open Platinum Monitoring →</Link></p></section>
  </div>;
}
