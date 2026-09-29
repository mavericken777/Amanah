import { CreateMeetingForm } from "@/components/forms";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function MeetingsPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const { data: projects } = await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("status","active").order("created_at",{ascending:false});
  const project = projects?.[0];

  const { data: meetings } = await supabase.from("meetings")
    .select("id, starts_at, organisation_or_person, city, purpose, status, projects(name)")
    .eq("organization_id", workspace.id).order("starts_at",{ascending:true,nullsFirst:false}).limit(100);

  return <div className="page stack-xl"><header><div className="eyebrow">CORE PLATFORM</div><h1>Meetings</h1><p className="lead">Engagements with objectives, attendees, outcomes and follow-up work.</p></header>
    {project ? <div className="content-grid"><CreateMeetingForm organizationId={workspace.id} projectId={project.id}/><section className="card table-wrap"><table><thead><tr><th>Date / time</th><th>Organisation / person</th><th>City</th><th>Purpose</th><th>Project</th><th>Status</th></tr></thead><tbody>{(meetings??[]).map(m=>{const p=m.projects as Array<{name:string}>|null;return <tr key={m.id}><td>{m.starts_at?new Date(m.starts_at).toLocaleString():"TBD"}</td><td>{m.organisation_or_person}</td><td>{m.city??"—"}</td><td>{m.purpose??"—"}</td><td>{p?.[0]?.name??"—"}</td><td><span className="status">{m.status}</span></td></tr>})}</tbody></table>{!meetings?.length&&<p className="muted">No meetings recorded yet.</p>}</section></div> : <div className="card"><h2>Create a project first</h2></div>}
  </div>;
}
function EmptyState(){return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create one from the dashboard first.</p></div></div>}
