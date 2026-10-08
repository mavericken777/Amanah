import Link from "next/link";
import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function ManufacturerCommandCenterPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;
  const db = supabase as any;
  const [facilities, products, evidence, findings, telemetry, shipments, alerts] = requireQueryResults(await Promise.all([
    db.from("ahte_facilities").select("id,status").eq("organization_id", org.id).limit(100),
    db.from("ahte_products").select("id,status").eq("organization_id", org.id).limit(100),
    db.from("ahte_evidence").select("id,status").eq("organization_id", org.id).limit(100),
    db.from("ahte_findings").select("id,status,severity").eq("organization_id", org.id).limit(100),
    db.from("ahte_telemetry_events").select("id,event_code,observed_at").eq("organization_id", org.id).order("observed_at",{ascending:false}).limit(25),
    db.from("ahte_shipments").select("id,status").eq("organization_id", org.id).limit(100),
    db.from("ahte_command_center_alerts").select("alert_code,severity,status,detected_at").eq("organization_id", org.id).order("detected_at",{ascending:false}).limit(25),
  ] as const));
  const openFindings=(findings.data??[]).filter((x:any)=>!["closed","verified"].includes(String(x.status).toLowerCase())).length;
  const openAlerts=(alerts.data??[]).filter((x:any)=>String(x.status).toLowerCase()!=="closed").length;
  return <div className="page stack-xl">
    <header><div className="eyebrow">AMANAH / MANUFACTURER COMMAND CENTER</div><h1>Readiness, evidence, production & action</h1><p className="lead">Organization-scoped operational view from facility and product readiness through evidence, findings, production signals, shipment state and exceptions.</p><p className="muted">This view does not create Halal certification or sovereign release.</p></header>
    <section className="grid-3">
      <article className="card"><div className="eyebrow">Facilities</div><h2>{(facilities.data??[]).length}</h2><p>Registered organization facilities.</p></article>
      <article className="card"><div className="eyebrow">Products</div><h2>{(products.data??[]).length}</h2><p>Organization product records.</p></article>
      <article className="card"><div className="eyebrow">Evidence</div><h2>{(evidence.data??[]).length}</h2><p>Latest scoped evidence window.</p></article>
    </section>
    <section className="grid-3">
      <article className="card"><div className="eyebrow">Open findings</div><h2>{openFindings}</h2><p>Require CAPA/re-verification as applicable.</p></article>
      <article className="card"><div className="eyebrow">Recent telemetry</div><h2>{(telemetry.data??[]).length}</h2><p>Latest production/operational signal window.</p></article>
      <article className="card"><div className="eyebrow">Shipments</div><h2>{(shipments.data??[]).length}</h2><p>Organization-scoped shipment records.</p></article>
    </section>
    <section className="card"><h2>Action queue</h2><div className="row-between"><span>Open Command Center alerts</span><span className="status">{openAlerts}</span></div><div className="row-between"><span>Open findings</span><span className="status">{openFindings}</span></div></section>
    <section className="card"><h2>Workflow</h2><p>Facility/product → supplier/material → evidence → laboratory/audit → CAPA/re-verification → certification decision records → production and custody monitoring.</p><p><Link href="/onboarding">Manufacturer onboarding →</Link> · <Link href="/ahte/monitoring">Production monitoring →</Link> · <Link href="/ahte/command-center">Global Command Center →</Link></p></section>
  </div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
