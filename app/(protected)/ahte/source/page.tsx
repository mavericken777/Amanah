import operatingSet from "@/docs/ahte/MS_OPERATING_SET.json";
import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function AHTESourcePage(){
  const {supabase,user}=await requireUser();
  const org=await getPrimaryWorkspace(supabase,user.id);
  if(!org)return <Empty/>;
  const db=supabase as any;
  const [{data:authorities},{data:instruments},{data:requirements}]=requireQueryResults(await Promise.all([
    db.from("ahte_authorities").select("code,name,jurisdiction,source_status,status").eq("organization_id",org.id).order("name").limit(100),
    db.from("ahte_instruments").select("code,title,version,source_status,jurisdiction").eq("organization_id",org.id).order("code").limit(100),
    db.from("ahte_requirements").select("locator,title,source_status,applicability_rule").eq("organization_id",org.id).order("locator").limit(100)
  ] as const));

  return <div className="page stack-xl">
    <header>
      <div className="eyebrow">AHTE / SOURCE</div>
      <h1>Authority, standards & source registry</h1>
      <p className="lead">Amanah routes every product, service, facility and transaction through the complete applicable Malaysian/JAKIM Halal framework—not MS 1500 or MS 2400 alone.</p>
    </header>

    <section className="card">
      <div className="eyebrow">CURRENT PROJECT TARGET</div>
      <h2>AHTE ⇄ Direct JAKIM API ⇄ JAKIM</h2>
      <p>Standards applicability, evidence and control logic are handled by AHTE; formal D5/D6 decisions remain with authorised humans and the competent authority.</p>
    </section>

    <section className="card stack">
      <div className="row-between">
        <div>
          <div className="eyebrow">MASTER MS OPERATING SET</div>
          <h2>Complete 17-standard catalogue</h2>
        </div>
        <span className="status">{operatingSet.catalog_count} standards</span>
      </div>
      <p className="muted">The applicability engine considers the complete controlled set and layers it with MPPHM, MHMS, HAS, IHCS, protocols, circulars, authority instructions, destination rules and laboratory methods.</p>
      <div className="card-grid">
        {operatingSet.standards.map((standard)=><article className="card" key={standard.code}>
          <div className="eyebrow">{standard.code}</div>
          <h3>{standard.title}</h3>
          <p className="muted">{standard.source_status.replaceAll("_"," ")}</p>
        </article>)}
      </div>
    </section>

    <section className="card">
      <h2>Authorities</h2>
      {(authorities??[]).map((x:any)=><div className="row-between" key={x.code}><span>{x.name} <span className="muted">({x.code})</span></span><span className="status">{x.source_status}</span></div>)}
      {!authorities?.length&&<p className="muted">No authorities registered yet.</p>}
    </section>

    <section className="card">
      <h2>Workspace instruments</h2>
      <p className="muted">This organization-specific registry is seeded from the master standards catalogue and may also contain MPPHM/MHMS and other applicable instruments.</p>
      {(instruments??[]).map((x:any)=><div className="row-between" key={`${x.code}-${x.version}`}><span><strong>{x.code}</strong> — {x.title}</span><span className="status">{x.source_status}</span></div>)}
    </section>

    <section className="card">
      <h2>Requirements / clause locators</h2>
      {(requirements??[]).map((x:any)=><div className="row-between" key={x.locator}><span>{x.locator}{x.title?` — ${x.title}`:""}</span><span className="status">{x.source_status}</span></div>)}
    </section>
  </div>
}

function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
