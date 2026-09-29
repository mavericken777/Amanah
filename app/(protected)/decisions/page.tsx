import { CreateDecisionForm } from "@/components/forms";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function DecisionsPage() {
  const { supabase, user } = await requireUser();
  const workspace=await getPrimaryWorkspace(supabase,user.id);
  if(!workspace)return <EmptyState/>;
  const {data:projects}=await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("status","active").order("created_at",{ascending:false});
  const project=projects?.[0];
  const {data:decisions}=await supabase.from("decisions").select("id,decision_code,decided_on,decision,reason_context,impact,projects(name)").eq("organization_id",workspace.id).order("decided_on",{ascending:false,nullsFirst:false});
  return <div className="page stack-xl"><header><div className="eyebrow">CORE PLATFORM</div><h1>Decisions</h1><p className="lead">The formal record of agreed decisions, reasons, alternatives and impacts.</p></header>
  {project?<div className="content-grid"><CreateDecisionForm organizationId={workspace.id} projectId={project.id}/><section className="card table-wrap"><table><thead><tr><th>ID</th><th>Date</th><th>Decision</th><th>Reason</th><th>Impact</th><th>Project</th></tr></thead><tbody>{(decisions??[]).map(d=>{const p=d.projects as Array<{name:string}>|null;return <tr key={d.id}><td>{d.decision_code}</td><td>{d.decided_on??"—"}</td><td>{d.decision}</td><td>{d.reason_context??"—"}</td><td>{d.impact??"—"}</td><td>{p?.[0]?.name??"—"}</td></tr>})}</tbody></table></section></div>:<div className="card"><h2>Create a project first</h2></div>}</div>;
}
function EmptyState(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
