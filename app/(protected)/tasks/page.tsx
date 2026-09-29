import { CreateTaskForm } from "@/components/create-task-form";
import { requireUser } from "@/lib/auth";

export default async function TasksPage() {
  const { supabase, user } = await requireUser();

  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id, organizations(id, name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  const organization = memberships?.[0]?.organizations as { id: string; name: string } | undefined;

  if (!organization) {
    return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>;
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, module_key")
    .eq("organization_id", organization.id)
    .order("created_at", { ascending: false });

  const activeProject = projects?.[0];

  const { data: tasks } = await supabase
    .from("tasks")
    .select("id, title, status, priority, due_date, projects(name)")
    .eq("organization_id", organization.id)
    .order("due_date", { ascending: true, nullsFirst: false })
    .limit(50);

  return (
    <div className="page stack-xl">
      <header>
        <div className="eyebrow">CORE PLATFORM</div>
        <h1>Tasks & actions</h1>
        <p className="lead">Amanah turns the action register into accountable, queryable work.</p>
      </header>

      <div className="content-grid">
        {activeProject ? <CreateTaskForm organizationId={organization.id} projectId={activeProject.id} /> : <div className="card"><h2>Create a project first</h2><p className="muted">Tasks belong to projects.</p></div>}

        <section className="card">
          <div className="section-heading">
            <div><div className="eyebrow">OPEN WORK</div><h2>Action register</h2></div>
          </div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Task</th><th>Project</th><th>Priority</th><th>Due</th><th>Status</th></tr></thead>
              <tbody>
                {(tasks ?? []).map((task) => {
                  const project = task.projects as Array<{ name: string }> | null;
                  return (
                    <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>{project?.[0]?.name ?? "—"}</td>
                      <td>{task.priority}</td>
                      <td>{task.due_date ?? "—"}</td>
                      <td><span className="status">{task.status}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {!tasks?.length ? <p className="muted">No tasks yet.</p> : null}
        </section>
      </div>
    </div>
  );
}
