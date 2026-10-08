import Link from "next/link";
import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function GccImporterPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;
  const db = supabase as any;

  const [shipments, ports, custody, trust, alerts] = requireQueryResults(await Promise.all([
    db.from("ahte_shipments").select("shipment_code,destination_market,importer,status,origin_country,corridor").eq("organization_id",org.id).order("created_at",{ascending:false}).limit(100),
    db.from("ahte_port_custody_events").select("port_code,event_type,status,occurred_at,authority_reference").eq("organization_id",org.id).order("occurred_at",{ascending:false}).limit(100),
    db.from("ahte_custody_events").select("entity_type,entity_id,event_type,location,occurred_at").eq("organization_id",org.id).order("occurred_at",{ascending:false}).limit(100),
    db.from("ahte_trust_states").select("entity_type,entity_id,state,hard_gate_status,expires_at").eq("organization_id",org.id).order("effective_at",{ascending:false}).limit(100),
    db.from("ahte_command_center_alerts").select("alert_code,severity,status,detected_at").eq("organization_id",org.id).order("detected_at",{ascending:false}).limit(100),
  ] as const));

  const inbound=(shipments.data??[]).filter((x:any)=>String(x.destination_market??"").toUpperCase().includes("GCC") || String(x.corridor??"").toUpperCase().includes("GCC"));
  const openAlerts=(alerts.data??[]).filter((x:any)=>String(x.status).toLowerCase()!=="closed");

  return <div className="page stack-xl">
    <header>
      <div className="eyebrow">AMANAH / GCC IMPORTER</div>
      <h1>Pre-arrival, receiving, inventory eligibility & destination assurance</h1>
      <p className="lead">A first-class importer workspace connecting port status, shipment identity, credential/trust evidence, custody, receiving exceptions and onward distribution eligibility.</p>
    </header>

    <section className="grid-3">
      <article className="card"><div className="eyebrow">Inbound GCC shipments</div><h2>{inbound.length}</h2><p>Latest organization-scoped inbound shipment records.</p></article>
      <article className="card"><div className="eyebrow">Port events</div><h2>{(ports.data??[]).length}</h2><p>Arrival, inspection, hold/release and custody references.</p></article>
      <article className="card"><div className="eyebrow">Open alerts</div><h2>{openAlerts.length}</h2><p>Receiving, evidence, custody and exception signals requiring action.</p></article>
    </section>

    <section className="card">
      <h2>Importer receiving flow</h2>
      <p><strong>GCC port release reference → receiving appointment → container/seal reconciliation → SKU/batch/quantity/condition checks → credential/document check → accept, discrepancy or quarantine → warehouse placement → inventory lot → distribution eligibility.</strong></p>
    </section>

    <section className="card"><h2>Inbound shipments</h2>{inbound.length?inbound.map((x:any)=><div className="row-between" key={x.shipment_code}><span><strong>{x.shipment_code}</strong> · {x.origin_country??"origin"} → {x.destination_market??"GCC"}</span><span className="status">{x.status}</span></div>):<p className="muted">No GCC inbound shipment records yet.</p>}</section>

    <section className="card"><h2>Port / authority events</h2>{(ports.data??[]).length?(ports.data??[]).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.port_code} · {x.event_type}{x.authority_reference?" · "+x.authority_reference:""}</span><span className="status">{x.status}</span></div>):<p className="muted">No port-custody records yet.</p>}</section>

    <section className="card"><h2>Trust / credential state</h2>{(trust.data??[]).length?(trust.data??[]).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.entity_type} · {x.entity_id}</span><span className="status">{x.state} · assurance {x.hard_gate_status}</span></div>):<p className="muted">No trust-state records yet.</p>}</section>

    <section className="card"><h2>Custody continuity</h2>{(custody.data??[]).length?(custody.data??[]).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.event_type} · {x.location??"location pending"}</span><span className="muted">{new Date(x.occurred_at).toLocaleString()}</span></div>):<p className="muted">No custody records yet.</p>}</section>

    <section className="card"><h2>Importer evidence / onward distribution</h2><p>Receiving evidence, quarantine/discrepancy decisions and distributor/retailer allocations remain linked to the same shipment, product and batch lineage.</p><p><Link href="/ahte/retail-market">Open Retail / Marketplace →</Link> · <Link href="/ahte/command-center">Open 24/7 Command Center →</Link></p></section>
  </div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
