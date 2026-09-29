import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function AdminPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const { data: members } = await supabase.from("organization_members").select("id, user_id, role, created_at").eq("organization_id", workspace.id).order("created_at");

  return (
    <div className="page stack-xl">
      <header><div className="eyebrow">ADMINISTRATION</div><h1>Workspace members</h1><p className="lead">Membership and role visibility. Role changes are intentionally owner-controlled in this foundation.</p></header>
      <section className="card table-wrap"><table><thead><tr><th>User ID</th><th>Role</th><th>Joined</th></tr></thead>
      <tbody>{(members ?? []).map(m => <tr key={m.id}><td>{m.user_id}</td><td><span className="status">{m.role}</span></td><td>{new Date(m.created_at).toLocaleString()}</td></tr>)}</tbody></table></section>
    </div>
  );
}
function EmptyState() { return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>; }
