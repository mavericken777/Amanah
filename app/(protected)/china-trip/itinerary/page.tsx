import { requireQueryResult } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function ChinaTripItineraryPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const { data: project } = requireQueryResult(await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("module_key","travel.china-trip").order("created_at",{ascending:false}).limit(1).maybeSingle());
  if (!project) return <EmptyState text="Create a Travel / China Trip project from Projects first." />;

  const { data: events } = requireQueryResult(await supabase.from("itinerary_events").select("id,event_date,city,starts_at,ends_at,activity,location,transport,status,notes").eq("organization_id",workspace.id).eq("project_id",project.id).order("event_date").order("starts_at",{ascending:true}));

  return <div className="page stack-xl"><header><div className="eyebrow">CHINA TRIP / ITINERARY</div><h1>{project.name}</h1><p className="lead">Dates, cities, movements, activities and daily operational notes.</p></header><section className="card table-wrap"><table><thead><tr><th>Date</th><th>City</th><th>Time</th><th>Activity</th><th>Location</th><th>Transport</th><th>Status</th></tr></thead><tbody>{(events??[]).map(e=><tr key={e.id}><td>{e.event_date}</td><td>{e.city??"—"}</td><td>{e.starts_at?new Date(e.starts_at).toLocaleTimeString():"—"}</td><td>{e.activity}</td><td>{e.location??"—"}</td><td>{e.transport??"—"}</td><td><span className="status">{e.status}</span></td></tr>)}</tbody></table></section></div>;
}
function EmptyState({text="No workspace. Create one from the dashboard first."}:{text?:string}){return <div className="page"><div className="card"><h1>China Trip</h1><p className="muted">{text}</p></div></div>;}
