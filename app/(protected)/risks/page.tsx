import { requireQueryResult } from "@/lib/query-results";
import { CreateRiskForm } from "@/components/forms";
import { getPrimaryWorkspace } from "@/lib/workspace";
import { requireUser } from "@/lib/auth";

export default async function RisksPage() {
  const {supabase,user}=await requireUser(); const workspace=await getPrimaryWorkspace(supabase,user.id); if(!workspace)return <EmptyState/>;
  const {data:projects}=requireQueryResult(await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("status","active").order("created_at",{ascending:false})); const project=projects?.[0];
  const {data:risks}=requireQueryResult(await supabase.from("risks").select("id,risk_code,description,impact,likelihood,mitigation,status,projects!risks_project_id_fkey(name)").eq("organization_id",workspace.id).order("created_at",{ascending:false}));
  return <div className="page stack-xl"><header><div className="eyebrow">CORE PLATFORM</div><h1>Risks</h1><p className="lead">Impact, likelihood, mitigation, ownership and escalation status.</p></header>
  {project?<div className="content-grid"><CreateRiskForm organizationId={workspace.id} projectId={project.id}/><section className="card table-wrap"><table><thead><tr><th>ID</th><th>Risk</th><th>Impact</th><th>Likelihood</th><th>Mitigation</th><th>Status</th><th>Project</th></tr></thead><tbody>{(risks??[]).map(r=>{const p=r.projects as {name:string}|null;return <tr key={r.id}><td>{r.risk_code}</td><td>{r.description}</td><td>{r.impact}</td><td>{r.likelihood}</td><td>{r.mitigation??"—"}</td><td><span className="status">{r.status}</span></td><td>{p?.name??"—"}</td></tr>})}</tbody></table></section></div>:<div className="card"><h2>Create a project first</h2></div>}</div>;
}
function EmptyState(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
