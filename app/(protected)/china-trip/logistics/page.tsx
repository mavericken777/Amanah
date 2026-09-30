import { requireQueryResult } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function LogisticsPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;
  const { data: project } = requireQueryResult(await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("module_key","travel.china-trip").order("created_at",{ascending:false}).limit(1).maybeSingle());
  if (!project) return <EmptyState text="Create a Travel / China Trip project from Projects first." />;
  const { data: segments } = requireQueryResult(await supabase.from("transport_segments").select("id,segment_type,segment_label,travel_date,origin,destination,departure_at,arrival_at,booking_status,notes").eq("organization_id",workspace.id).eq("project_id",project.id).order("travel_date"));
  return <div className="page stack-xl"><header><div className="eyebrow">CHINA TRIP / LOGISTICS</div><h1>Flights & transport</h1><p className="lead">Flights, train and ground movement with booking status.</p></header><section className="card table-wrap"><table><thead><tr><th>Type</th><th>Segment</th><th>Date</th><th>Origin</th><th>Destination</th><th>Departure</th><th>Arrival</th><th>Status</th></tr></thead><tbody>{(segments??[]).map(s=><tr key={s.id}><td>{s.segment_type}</td><td>{s.segment_label??"—"}</td><td>{s.travel_date??"—"}</td><td>{s.origin??"—"}</td><td>{s.destination??"—"}</td><td>{s.departure_at?new Date(s.departure_at).toLocaleString():"—"}</td><td>{s.arrival_at?new Date(s.arrival_at).toLocaleString():"—"}</td><td><span className="status">{s.booking_status}</span></td></tr>)}</tbody></table></section></div>;
}
function EmptyState({text="No workspace. Create one from the dashboard first."}:{text?:string}){return <div className="page"><div className="card"><h1>Logistics</h1><p className="muted">{text}</p></div></div>;}
