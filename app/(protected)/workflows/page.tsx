import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function WorkflowsPage(){
  const {supabase,user}=await requireUser();const w=await getPrimaryWorkspace(supabase,user.id);if(!w)return <Empty/>;
  const {data:workflows}=await supabase.from("workflow_definitions").select("id,name,entity_type,active,definition,created_at,updated_at").or(`organization_id.eq.${w.id},organization_id.is.null`).order("name");
  return <div className="page stack-xl"><header><div className="eyebrow">PLATFORM ENGINE</div><h1>Workflows</h1><p className="lead">Reusable lifecycle definitions for tasks, documents, approvals and future modules.</p></header><section className="card table-wrap"><table><thead><tr><th>Name</th><th>Entity</th><th>Active</th><th>Definition</th><th>Updated</th></tr></thead><tbody>{(workflows??[]).map(x=><tr key={x.id}><td>{x.name}</td><td>{x.entity_type}</td><td>{x.active?"Yes":"No"}</td><td><code>{JSON.stringify(x.definition)}</code></td><td>{new Date(x.updated_at).toLocaleString()}</td></tr>)}</tbody></table>{!workflows?.length&&<p className="muted">No custom workflows yet. Built-in lifecycles remain enforced by the domain model.</p>}</section></div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
