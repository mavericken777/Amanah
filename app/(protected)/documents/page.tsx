import { CreateDocumentForm } from "@/components/forms";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function DocumentsPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;
  const { data: projects } = await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("status","active").order("created_at",{ascending:false});
  const project=projects?.[0];
  const {data:documents}=await supabase.from("documents").select("id,title,classification,status,required_by,storage_provider,projects(name)").eq("organization_id",workspace.id).order("required_by",{ascending:true,nullsFirst:false}).limit(100);
  return <div className="page stack-xl"><header><div className="eyebrow">CORE PLATFORM</div><h1>Documents</h1><p className="lead">Metadata, compliance status and secure storage references. Sensitive source files stay outside Git.</p></header>
  {project?<div className="content-grid"><CreateDocumentForm organizationId={workspace.id} projectId={project.id}/><section className="card table-wrap"><table><thead><tr><th>Document</th><th>Classification</th><th>Required by</th><th>Project</th><th>Status</th><th>Storage</th></tr></thead><tbody>{(documents??[]).map(d=>{const p=d.projects as Array<{name:string}>|null;return <tr key={d.id}><td>{d.title}</td><td>{d.classification}</td><td>{d.required_by??"—"}</td><td>{p?.[0]?.name??"—"}</td><td><span className="status">{d.status}</span></td><td>{d.storage_provider??"Secure reference only"}</td></tr>})}</tbody></table>{!documents?.length&&<p className="muted">No document records yet.</p>}</section></div>:<div className="card"><h2>Create a project first</h2></div>}
  </div>;
}
function EmptyState(){return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create one from the dashboard first.</p></div></div>}
