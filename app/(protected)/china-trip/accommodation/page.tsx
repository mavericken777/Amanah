import { requireQueryResult } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function AccommodationPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;
  const { data: project } = requireQueryResult(await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("module_key","travel.china-trip").order("created_at",{ascending:false}).limit(1).maybeSingle());
  if (!project) return <EmptyState text="Create a Travel / China Trip project from Projects first." />;
  const { data: stays } = requireQueryResult(await supabase.from("accommodations").select("id,city,property_name,check_in,check_out,room_allocation,booking_status,notes").eq("organization_id",workspace.id).eq("project_id",project.id).order("check_in"));
  return <div className="page stack-xl"><header><div className="eyebrow">CHINA TRIP / ACCOMMODATION</div><h1>Accommodation</h1><p className="lead">Properties, dates, allocations and booking status.</p></header><section className="card table-wrap"><table><thead><tr><th>City</th><th>Property</th><th>Check-in</th><th>Check-out</th><th>Room/allocation</th><th>Status</th></tr></thead><tbody>{(stays??[]).map(s=><tr key={s.id}><td>{s.city}</td><td>{s.property_name}</td><td>{s.check_in??"—"}</td><td>{s.check_out??"—"}</td><td>{s.room_allocation??"—"}</td><td><span className="status">{s.booking_status}</span></td></tr>)}</tbody></table></section></div>;
}
function EmptyState({text="No workspace. Create one from the dashboard first."}:{text?:string}){return <div className="page"><div className="card"><h1>Accommodation</h1><p className="muted">{text}</p></div></div>;}
