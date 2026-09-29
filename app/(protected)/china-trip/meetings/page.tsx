import { CreateMeetingForm } from "@/components/forms";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function TripMeetingsPage() {
  const {supabase,user}=await requireUser(); const w=await getPrimaryWorkspace(supabase,user.id); if(!w)return <Empty/>;
  const {data:p}=await supabase.from("projects").select("id,name").eq("organization_id",w.id).eq("module_key","travel.china-trip").order("created_at",{ascending:false}).limit(1); const project=p?.[0]; if(!project)return <Empty text="Create the China Trip project from Projects first."/>;
  const {data:meetings}=await supabase.from("meetings").select("id,starts_at,organisation_or_person,city,purpose,status").eq("organization_id",w.id).eq("project_id",project.id).order("starts_at",{ascending:true,nullsFirst:false});
  return <div className="page stack-xl"><header><div className="eyebrow">CHINA TRIP / MEETINGS</div><h1>Meetings & engagements</h1><p className="lead">Objectives, attendees, outcomes and follow-up work for the trip.</p></header><div className="content-grid"><CreateMeetingForm organizationId={w.id} projectId={project.id}/><section className="card table-wrap"><table><thead><tr><th>Date / time</th><th>Organisation / person</th><th>City</th><th>Purpose</th><th>Status</th></tr></thead><tbody>{(meetings??[]).map(m=><tr key={m.id}><td>{m.starts_at?new Date(m.starts_at).toLocaleString():"TBD"}</td><td>{m.organisation_or_person}</td><td>{m.city??"—"}</td><td>{m.purpose??"—"}</td><td><span className="status">{m.status}</span></td></tr>)}</tbody></table></section></div></div>;
}
function Empty({text="Create a workspace from the dashboard first."}:{text?:string}){return <div className="page"><div className="card"><h1>China Trip</h1><p className="muted">{text}</p></div></div>}
