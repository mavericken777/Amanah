import Link from "next/link";
import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function RetailMarketPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;
  const db = supabase as any;

  const [products, items, verifications, fractures, alerts] = requireQueryResults(await Promise.all([
    db.from("ahte_products").select("id,name,category,market_status,status").eq("organization_id",org.id).order("name").limit(100),
    db.from("ahte_shipment_items").select("shipment_id,sku,batch_no,eligibility_status").eq("organization_id",org.id).order("created_at",{ascending:false}).limit(100),
    db.from("ahte_verification_events").select("subject_type,subject_id,verification_type,result,verified_at,disclosure_scope").eq("organization_id",org.id).order("verified_at",{ascending:false}).limit(100),
    db.from("ahte_fracture_events").select("entity_type,entity_id,fracture_type,severity,auto_hold,resolution").eq("organization_id",org.id).order("detected_at",{ascending:false}).limit(100),
    db.from("ahte_command_center_alerts").select("alert_code,severity,status,detected_at").eq("organization_id",org.id).order("detected_at",{ascending:false}).limit(100),
  ] as const));

  const blocked=(items.data??[]).filter((x:any)=>!["eligible","approved","released"].includes(String(x.eligibility_status??"").toLowerCase()));
  const openFractures=(fractures.data??[]).filter((x:any)=>!x.resolution);
  const openAlerts=(alerts.data??[]).filter((x:any)=>String(x.status).toLowerCase()!=="closed");

  return <div className="page stack-xl">
    <header>
      <div className="eyebrow">AMANAH / RETAIL & MARKETPLACE</div>
      <h1>Listing, receiving, sale eligibility, verification & recall propagation</h1>
      <p className="lead">Retailers and marketplaces verify product identity, credential/trust state, batch/lot lineage and open exceptions before listing, receiving, selling and during recall.</p>
    </header>

    <section className="grid-3">
      <article className="card"><div className="eyebrow">Products</div><h2>{(products.data??[]).length}</h2><p>Organization-scoped product portfolio.</p></article>
      <article className="card"><div className="eyebrow">Blocked / review items</div><h2>{blocked.length}</h2><p>Shipment items not currently eligible/released.</p></article>
      <article className="card"><div className="eyebrow">Open exception signals</div><h2>{openFractures.length+openAlerts.length}</h2><p>Fractures and alerts that may affect listing, receiving, stock or recall decisions.</p></article>
    </section>

    <section className="card"><h2>Retail listing & receiving flow</h2><p><strong>Approved supplier/importer → product/SKU listing → credential/trust check → PO/ASN → SKU/batch scan → quantity/condition → storage/shelf/fulfilment → sale availability → verification → withdrawal/recall when required.</strong></p></section>

    <section className="card"><h2>Product / market state</h2>{(products.data??[]).length?(products.data??[]).map((x:any)=><div className="row-between" key={x.id}><span>{x.name} <span className="muted">{x.category??""}</span></span><span className="status">{x.market_status} · {x.status}</span></div>):<p className="muted">No product records yet.</p>}</section>

    <section className="card"><h2>SKU / batch receiving eligibility</h2>{(items.data??[]).length?(items.data??[]).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.sku}{x.batch_no?" · batch "+x.batch_no:""}</span><span className="status">{x.eligibility_status}</span></div>):<p className="muted">No shipment-item records yet.</p>}</section>

    <section className="card"><h2>Verification events</h2>{(verifications.data??[]).length?(verifications.data??[]).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.verification_type} · {x.subject_type}</span><span className="status">{x.result} · {x.disclosure_scope}</span></div>):<p className="muted">No retailer/buyer verification events yet.</p>}</section>

    <section className="card"><h2>Recall / withdrawal readiness</h2><p>Trace product/SKU → batch/lot → importer inventory → distributor transfer → retail DC/store/order → verification/customer contact.</p>{openFractures.slice(0,20).map((x:any,i:number)=><div className="row-between" key={i}><span>{x.fracture_type} · {x.entity_type}</span><span className="status">{x.severity}{x.auto_hold?" · HOLD":""}</span></div>)}</section>

    <section className="card"><h2>Destination workflow</h2><p><Link href="/ahte/gcc-importer">Open GCC Importer →</Link> · <Link href="/verify">Open verification →</Link> · <Link href="/ahte/command-center">Open 24/7 Command Center →</Link></p></section>
  </div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
