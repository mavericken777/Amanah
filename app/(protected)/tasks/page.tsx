import { CreateTaskForm } from "@/components/create-task-form";
import { TaskStatusSelect } from "@/components/task-status-select";
import { getPrimaryWorkspace } from "@/lib/workspace";
import { requireUser } from "@/lib/auth";

export default async function TasksPage() {
  const {supabase,user}=await requireUser();
  const organization=await getPrimaryWorkspace(supabase,user.id);
  if(!organization)return <Empty/>;
  const {data:projects}=await supabase.from("projects").select("id,name,module_key").eq("organization_id",organization.id).order("created_at",{ascending:false});
  const activeProject=projects?.[0];
  const {data:tasks}=await supabase.from("tasks").select("id,title,status,priority,due_date,projects!tasks_project_id_fkey(name)").eq("organization_id",organization.id).order("due_date",{ascending:true,nullsFirst:false}).limit(100);
  return <div className="page stack-xl"><header><div className="eyebrow">CORE PLATFORM</div><h1>Tasks & actions</h1><p className="lead">Accountable work with owner, priority, status and due date.</p></header>
    <div className="content-grid">{activeProject?<CreateTaskForm organizationId={organization.id} projectId={activeProject.id}/>:<div className="card"><h2>Create a project first</h2></div>}
    <section className="card table-wrap"><table><thead><tr><th>Task</th><th>Project</th><th>Priority</th><th>Due</th><th>Status</th></tr></thead><tbody>{(tasks??[]).map(t=>{const p=t.projects as {name:string}|null;return <tr key={t.id}><td>{t.title}</td><td>{p?.name??"—"}</td><td>{t.priority}</td><td>{t.due_date??"—"}</td><td><TaskStatusSelect taskId={t.id} status={t.status}/></td></tr>})}</tbody></table>{!tasks?.length&&<p className="muted">No tasks yet.</p>}</section></div></div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create one from the dashboard first.</p></div></div>}
