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
      <p>Amanah and AHTE connect standards, evidence and monitoring across the journey. JAKIM/JAIN/JAIM, muftis, scholars and authorised halal auditors decide certification award and revocation.</p>
    </section>

    <section className="card stack">
      <div className="row-between">
        <div>
          <div className="eyebrow">MALAYSIAN / JAKIM STANDARDS REGISTRY</div>
          <h2>Complete applicable standards registry</h2>
        </div>
        <span className="status">{operatingSet.catalog_count} standards</span>
      </div>
      <p className="muted">The applicability engine evaluates every applicable Malaysian/JAKIM Standard and product/technical instrument in the current standards register. The current primary catalogue is 17 standards, but 17 is not a permanent ceiling. MPPHM, MHMS, HAS, IHCS, protocols, circulars, authority instructions, destination rules and laboratory methods are layered by scope.</p>
      <div className="card-grid">
        {operatingSet.standards.map((standard)=><article className="card" key={standard.code}>
          <div className="eyebrow">{standard.code}</div>
          <h3>{standard.title}</h3>
          <p className="muted">Included in the current Malaysian/JAKIM applicability register</p>
        </article>)}
      </div>
      <div className="stack">
        <div>
          <div className="eyebrow">ADDITIONAL APPLICABLE MS INSTRUMENTS</div>
          <h3>Product / technical standards</h3>
        </div>
        {(operatingSet.supplemental_instruments??[]).map((standard)=><article className="card" key={standard.code}>
          <div className="eyebrow">{standard.code}</div>
          <h3>{standard.title}</h3>
          <p>{standard.role}</p>
          <p className="muted">{standard.role}</p>
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
