import { requireQueryResult } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function TravellersPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;
  const { data: project } = requireQueryResult(await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("module_key","travel.china-trip").order("created_at",{ascending:false}).limit(1).maybeSingle());
  if (!project) return <EmptyState text="Create a Travel / China Trip project from Projects first." />;
  const { data: travellers } = requireQueryResult(await supabase.from("travellers").select("id,display_name,role,contact_method,backup_contact_method,status").eq("organization_id",workspace.id).eq("project_id",project.id).order("display_name"));
  return <div className="page stack-xl"><header><div className="eyebrow">CHINA TRIP / PEOPLE</div><h1>Travellers</h1><p className="lead">Trip participants, roles, contact methods and backup arrangements.</p></header><section className="card table-wrap"><table><thead><tr><th>Name</th><th>Role</th><th>Contact</th><th>Backup</th><th>Status</th></tr></thead><tbody>{(travellers??[]).map(t=><tr key={t.id}><td>{t.display_name}</td><td>{t.role??"—"}</td><td>{t.contact_method??"—"}</td><td>{t.backup_contact_method??"—"}</td><td><span className="status">{t.status}</span></td></tr>)}</tbody></table></section></div>;
}
function EmptyState({text="No workspace. Create one from the dashboard first."}:{text?:string}){return <div className="page"><div className="card"><h1>Travellers</h1><p className="muted">{text}</p></div></div>;}
