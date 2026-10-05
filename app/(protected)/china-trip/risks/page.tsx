import { requireQueryResult } from "@/lib/query-results";
import { CreateRiskForm } from "@/components/forms";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

const riskDomains = [
  ["Authority & regulatory", "Direct JAKIM connectivity, competent-authority decision rights, destination acceptance and regulatory dependencies."],
  ["Partner & commercial", "Counterpart mandate, contracting entity, responsibilities, deliverables, commercial assumptions and decision ownership."],
  ["Laboratory & evidence", "Origin testing, sample custody, laboratory scope, result integrity, evidence completeness and re-verification."],
  ["Logistics & custody", "Sinotrans operations, warehouse controls, vehicle telemetry, seals, route exceptions and custody transfers."],
  ["Port & border", "Pre-arrival information, credential/status verification, container and seal checks, inspection and sovereign release."],
  ["Technology & integration", "API contracts, legacy adapters, connectivity, identity, data mapping, retries, offline operation and interoperability."],
  ["Cybersecurity & data", "Identity, access, encryption, device security, evidence integrity, data governance and incident response."],
  ["Execution & mission", "Meetings, documents, decisions, actions, scheduling, budget and stakeholder readiness."],
];

export default async function TripRisksPage(){
  const {supabase,user}=await requireUser();
  const w=await getPrimaryWorkspace(supabase,user.id);
  if(!w)return <Empty/>;
  const {data:p}=requireQueryResult(await supabase.from("projects").select("id,name,status").eq("organization_id",w.id).eq("module_key","travel.china-trip").order("created_at",{ascending:false}).limit(1));
  const project=p?.[0];
  if(!project)return <Empty text="Create the China Mission workspace from Projects first."/>;
  const {data:risks}=requireQueryResult(await supabase.from("risks").select("id,risk_code,description,impact,likelihood,mitigation,status").eq("organization_id",w.id).eq("project_id",project.id).order("created_at",{ascending:false}));

  const records=risks??[];
  const openCount=records.filter(r=>r.status!=="closed"&&r.status!=="resolved").length;

  return <div className="page stack-xl">
    <header className="mission-banner">
      <div className="eyebrow">CHINA MISSION / RISK & ASSURANCE</div>
      <h1>Mission risk intelligence</h1>
      <p className="lead">Identify the risks that can break evidence continuity, partner execution, integration, custody or authority readiness—and keep ownership and mitigation visible before they become corridor exceptions.</p>
      <div className="mission-route"><span>{records.length} recorded risks</span><b>•</b><span>{openCount} open / active</span><b>•</b><span>China → GCC</span></div>
    </header>

    <section className="card-grid">
      {riskDomains.map(([title,text])=><article className="card risk-domain-card" key={title}>
        <div className="eyebrow">RISK DOMAIN</div>
        <h2>{title}</h2>
        <p className="muted">{text}</p>
      </article>)}
    </section>

    <section className="card">
      <div className="eyebrow">ASSURANCE MODEL</div>
      <h2>From signal to accountable resolution</h2>
      <div className="card-grid">
        {[
          ["Detect", "Evidence gaps, anomalies, deviations and emerging risks are surfaced against the affected object, actor and workflow."],
          ["Assess", "Deterministic controls and AI/ML assistance support prioritisation, blast-radius understanding and recommended preemptive action."],
          ["Escalate", "Material issues enter the appropriate human, partner or competent-authority gate. Authority, operational, customs and finance states remain separate."],
          ["Resolve", "Corrective action, re-verification and supporting evidence close the loop while preserving the full history."],
        ].map(([title,text])=><article className="card" key={title}><h3>{title}</h3><p className="muted">{text}</p></article>)}
      </div>
    </section>

    <div className="content-grid">
      <CreateRiskForm organizationId={w.id} projectId={project.id}/>
      <section className="card table-wrap">
        <div className="eyebrow">CONTROLLED REGISTER</div>
        <h2>Recorded mission risks</h2>
        <table><thead><tr><th>ID</th><th>Risk</th><th>Impact</th><th>Likelihood</th><th>Mitigation</th><th>Status</th></tr></thead><tbody>{records.map(r=><tr key={r.id}><td>{r.risk_code}</td><td>{r.description}</td><td>{r.impact}</td><td>{r.likelihood}</td><td>{r.mitigation??"—"}</td><td><span className="status">{r.status}</span></td></tr>)}</tbody></table>
        {records.length===0&&<p className="muted">The controlled register is ready for the first mission risk.</p>}
      </section>
    </div>
  </div>
}

function Empty({text="Create a controlled workspace from the dashboard first."}:{text?:string}){return <div className="page"><div className="card"><div className="eyebrow">CHINA MISSION</div><h1>Mission risk intelligence</h1><p className="muted">{text}</p></div></div>}
