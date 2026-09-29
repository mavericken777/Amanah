import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function AHTESourcePage() {
  const {supabase,user}=await requireUser(); const org=await getPrimaryWorkspace(supabase,user.id);
  if(!org)return <Empty/>;
  const [{data:authorities},{data:instruments},{data:requirements}]=await Promise.all([
    supabase.from("ahte_authorities").select("code,name,jurisdiction,source_status,status").eq("organization_id",org.id).order("name").limit(100),
    supabase.from("ahte_instruments").select("code,title,version,source_status,jurisdiction").eq("organization_id",org.id).order("code").limit(100),
    supabase.from("ahte_requirements").select("locator,title,source_status,applicability_rule").eq("organization_id",org.id).order("locator").limit(100)
  ]);
  return <div className="page stack-xl"><header><div className="eyebrow">AHTE / SOURCE</div><h1>Authority & source registry</h1><p className="lead">Source provenance first. Source-locked content is never silently promoted into normative authority.</p></header><section className="card"><h2>Authorities</h2>{(authorities??[]).map(x=><div className="row-between" key={x.code}><span>{x.name} <span className="muted">({x.code})</span></span><span className="status">{x.source_status}</span></div>)}{!authorities?.length&&<p className="muted">No authorities registered yet.</p>}</section><section className="card"><h2>Instruments</h2>{(instruments??[]).map(x=><div className="row-between" key={`${x.code}-${x.version}`}><span><strong>{x.code}</strong> — {x.title}</span><span className="status">{x.source_status}</span></div>)}{!instruments?.length&&<p className="muted">No instruments registered yet.</p>}</section><section className="card"><h2>Requirements / clause locators</h2>{(requirements??[]).map(x=><div className="row-between" key={x.locator}><span>{x.locator}{x.title?` — ${x.title}`:""}</span><span className="status">{x.source_status}</span></div>)}{!requirements?.length&&<p className="muted">No requirements registered yet.</p>}</section></div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
