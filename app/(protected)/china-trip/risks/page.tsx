import { requireQueryResult } from "@/lib/query-results";
import { CreateRiskForm } from "@/components/forms";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

const riskDomains = [
  ["Authority & regulatory", "JAKIM connectivity, competent-authority decision rights, destination acceptance and regulatory dependencies."],
  ["Partner & commercial", "Partner mandate, contracting entity, responsibilities, deliverables, commercial assumptions and decision ownership."],
  ["Laboratory & evidence", "Origin testing, sample custody, laboratory scope, result integrity, evidence completeness and re-verification."],
  ["Logistics & custody", "Sinotrans operations, warehouse controls, vehicle telemetry, seals, route exceptions and custody transfers."],
  ["Port & border", "Pre-arrival information, certificate/status verification, container/seal checks, inspection and authority release."],
  ["Technology & integration", "API contracts, legacy adapters, connectivity, identity, data mapping, retries, offline operation and interoperability."],
  ["Cybersecurity & data", "Identity, access, encryption, device security, evidence integrity, data governance and incident response."],
  ["Execution & mission", "Travel, meetings, documents, decisions, actions, scheduling, budget and stakeholder readiness."],
];

export default async function TripRisksPage(){
  const {supabase,user}=await requireUser();
  const w=await getPrimaryWorkspace(supabase,user.id);
  if(!w)return <Empty/>;
  const {data:p}=requireQueryResult(await supabase.from("projects").select("id,name,status").eq("organization_id",w.id).eq("module_key","travel.china-trip").order("created_at",{ascending:false}).limit(1));
  const project=p?.[0];
  if(!project)return <Empty text="Create the China Mission project from Projects first."/>;
  const {data:risks}=requireQueryResult(await supabase.from("risks").select("id,risk_code,description,impact,likelihood,mitigation,status").eq("organization_id",w.id).eq("project_id",project.id).order("created_at",{ascending:false}));

  return <div className="page stack-xl">
    <header className="page-header">
      <div>
        <div className="eyebrow">CHINA MISSION / RISK & ASSURANCE</div>
        <h1>Mission risks</h1>
        <p className="lead">A controlled risk register for the China mission and its downstream AMANAH operating dependencies. Risks are recorded with impact, likelihood, mitigation and status; material decisions remain subject to the appropriate human or competent-authority gate.</p>
      </div>
    </header>

    <section className="card-grid">
      {riskDomains.map(([title,text])=><article className="card" key={title}>
        <div className="eyebrow">RISK DOMAIN</div>
        <h2>{title}</h2>
        <p className="muted">{text}</p>
      </article>)}
    </section>

    <section className="card">
      <div className="eyebrow">CONTROL PRINCIPLES</div>
      <h2>How AMANAH handles material risk</h2>
      <div className="card-grid">
        {[
          ["Evidence first", "Material claims are linked to evidence, provenance, timestamps and integrity records. A hash establishes integrity of the recorded object; it does not by itself establish the truth of the underlying claim."],
          ["AI assists", "AI/ML may identify anomalies, missing evidence, inconsistencies, risk signals and recommended preemptive actions. It does not independently certify halal or exercise the sovereign/authority decision."],
          ["Human governance", "Certification, approval, suspension, revocation and other high-impact decisions remain with the authorised human or competent authority according to the applicable governance framework."],
          ["Separate states", "Authority status, AHTE trust state, operational state, customs state and finance state are kept distinct so one system signal cannot silently become another party's legal decision."],
        ].map(([title,text])=><article className="card" key={title}><h3>{title}</h3><p className="muted">{text}</p></article>)}
      </div>
    </section>

    <div className="content-grid">
      <CreateRiskForm organizationId={w.id} projectId={project.id}/>
      <section className="card table-wrap">
        <div className="eyebrow">LIVE REGISTER</div>
        <h2>Recorded project risks</h2>
        <table><thead><tr><th>ID</th><th>Risk</th><th>Impact</th><th>Likelihood</th><th>Mitigation</th><th>Status</th></tr></thead><tbody>{(risks??[]).map(r=><tr key={r.id}><td>{r.risk_code}</td><td>{r.description}</td><td>{r.impact}</td><td>{r.likelihood}</td><td>{r.mitigation??"—"}</td><td><span className="status">{r.status}</span></td></tr>)}</tbody></table>
        {(risks??[]).length===0&&<p className="muted">No project risks have been recorded yet. Use the form to create the first controlled risk record.</p>}
      </section>
    </div>
  </div>
}

function Empty({text="Create a workspace from the dashboard first."}:{text?:string}){return <div className="page"><div className="card"><h1>Mission risks</h1><p className="muted">{text}</p></div></div>}
