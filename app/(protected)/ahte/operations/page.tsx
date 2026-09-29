import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function OperationsPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;

  const [facilities, suppliers, materials, products, batches] = await Promise.all([
    supabase.from("ahte_facilities").select("site_code,legal_name,jurisdiction,status").eq("organization_id", org.id).order("site_code"),
    supabase.from("ahte_suppliers").select("legal_name,risk_class,verification_status,status").eq("organization_id", org.id).order("legal_name"),
    supabase.from("ahte_materials").select("name,category,source_type,origin_country,halal_status,status").eq("organization_id", org.id).order("name"),
    supabase.from("ahte_products").select("name,category,market_status,status").eq("organization_id", org.id).order("name"),
    supabase.from("ahte_batches").select("batch_no,status,produced_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(100),
  ]);

  return <div className="page stack-xl">
    <header><div className="eyebrow">AHTE / OPERATIONS</div><h1>Facility, material & product assurance</h1><p className="lead">Facility zoning, supplier risk, material provenance, product versions and batch genealogy.</p></header>
    <section className="card"><h2>Facilities</h2>{(facilities.data ?? []).map((x: any) => <div className="row-between" key={x.site_code}><span><strong>{x.site_code}</strong> — {x.legal_name}</span><span className="status">{x.status}</span></div>)}</section>
    <section className="card"><h2>Suppliers</h2>{(suppliers.data ?? []).map((x: any, i: number) => <div className="row-between" key={i}><span>{x.legal_name}</span><span className="status">{x.risk_class} · {x.verification_status}</span></div>)}</section>
    <section className="card"><h2>Materials</h2>{(materials.data ?? []).map((x: any, i: number) => <div className="row-between" key={i}><span>{x.name} <span className="muted">{x.origin_country || ""}</span></span><span className="status">{x.halal_status}</span></div>)}</section>
    <section className="card"><h2>Products</h2>{(products.data ?? []).map((x: any, i: number) => <div className="row-between" key={i}><span>{x.name}</span><span className="status">{x.market_status} · {x.status}</span></div>)}</section>
    <section className="card"><h2>Batches</h2>{(batches.data ?? []).map((x: any) => <div className="row-between" key={x.batch_no}><span>{x.batch_no}</span><span className="status">{x.status}</span></div>)}</section>
  </div>;
}

function Empty() { return <div className="page"><div className="card"><h1>No workspace</h1></div></div>; }
