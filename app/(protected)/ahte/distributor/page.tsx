import Link from "next/link";
import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function DistributorPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;
  const db = supabase as any;

  const [items, custody, trust, alerts, shipments] = requireQueryResults(await Promise.all([
    db.from("ahte_shipment_items").select("shipment_id,sku,batch_no,eligibility_status").eq("organization_id",org.id).order("created_at",{ascending:false}).limit(150),
    db.from("ahte_custody_events").select("entity_type,entity_id,event_type,location,occurred_at").eq("organization_id",org.id).order("occurred_at",{ascending:false}).limit(150),
    db.from("ahte_trust_states").select("entity_type,entity_id,state,hard_gate_status,expires_at").eq("organization_id",org.id).order("effective_at",{ascending:false}).limit(150),
    db.from("ahte_command_center_alerts").select("alert_code,severity,status,detected_at").eq("organization_id",org.id).order("detected_at",{ascending:false}).limit(100),
    db.from("ahte_shipments").select("shipment_code,destination_market,importer,status").eq("organization_id",org.id).order("created_at",{ascending:false}).limit(100),
  ] as const));

  const eligible=(items.data??[]).filter((x:any)=>["eligible","approved","released"].includes(String(x.eligibility_status??"").toLowerCase()));
  const review=(items.data??[]).filter((x:any)=>!["eligible","approved","released"].includes(String(x.eligibility_status??"").toLowerCase()));
  const openAlerts=(alerts.data??[]).filter((x:any)=>String(x.status).toLowerCase()!=="closed");

  return <div className="page stack-xl">
    <header>
      <div className="eyebrow">AMANAH / GCC DISTRIBUTOR & 3PL</div>
      <h1>Destination inventory, allocation, custody transfer and recall readiness</h1>
      <p className="lead">A first-class distributor workspace between importer receiving and retail/marketplace delivery. It keeps product/SKU, batch/lot, trust state, warehouse movement and custody evidence connected.</p>
    </header>

    <section className="grid-3">
      <article className="card"><div className="eyebrow">Eligible items</div><h2>{eligible.length}</h2><p>Shipment items currently eligible for onward distribution.</p></article>
      <article className="card"><div className="eyebrow">Review / hold items</div><h2>{review.length}</h2><p>Items requiring review before allocation or delivery.</p></article>
      <article className="card"><div className="eyebrow">Open exception signals</div><h2>{openAlerts.length}</h2><p>Alerts requiring operational ownership before downstream release.</p></article>
    </section>

    <section className="card">
      <h2>Distributor operating flow</h2>
      <p><strong>Importer allocation → distributor receiving → warehouse assignment → pallet/package identity → inventory lot → FEFO/FIFO as applicable → condition monitoring → transfer order → route/vehicle → custody transfer → retailer allocation → proof of delivery → return / withdrawal / recall.</strong></p>
    </section>

    <section className="card"><h2>Distribution-eligible SKU / batch records</h2>{(items.data??[]).length?(items.data??[]).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.sku}{x.batch_no?" · batch "+x.batch_no:""}</span><span className="status">{x.eligibility_status}</span></div>):<p className="muted">No shipment-item records yet.</p>}</section>

    <section className="card"><h2>Custody transfers</h2>{(custody.data??[]).length?(custody.data??[]).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.event_type} · {x.entity_type} · {x.location??"location pending"}</span><span className="muted">{new Date(x.occurred_at).toLocaleString()}</span></div>):<p className="muted">No custody records yet.</p>}</section>

    <section className="card"><h2>Trust / hard-gate state</h2>{(trust.data??[]).length?(trust.data??[]).slice(0,50).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.entity_type} · {x.entity_id}</span><span className="status">{x.state} · gate {x.hard_gate_status}</span></div>):<p className="muted">No trust-state records yet.</p>}</section>

    <section className="card"><h2>Destination shipment context</h2>{(shipments.data??[]).length?(shipments.data??[]).slice(0,30).map((x:any)=><div className="row-between" key={x.shipment_code}><span>{x.shipment_code} · {x.importer??"importer pending"} · {x.destination_market??"GCC"}</span><span className="status">{x.status}</span></div>):<p className="muted">No destination shipments yet.</p>}</section>

    <section className="card"><h2>Next handoff</h2><p><Link href="/ahte/gcc-importer">GCC Importer →</Link> · <Link href="/ahte/retail-market">Retail / Marketplace →</Link> · <Link href="/ahte/command-center">24/7 Command Center →</Link></p></section>
  </div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
