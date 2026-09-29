import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function AuditPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const { data: events } = await supabase.from("audit_events").select("id, actor_user_id, action, entity_type, entity_id, occurred_at").eq("organization_id", workspace.id).order("occurred_at", { ascending: false }).limit(100);

  return (
    <div className="page stack-xl">
      <header><div className="eyebrow">GOVERNANCE</div><h1>Audit history</h1><p className="lead">Who changed what, and when. This view is read-only for normal users.</p></header>
      <section className="card table-wrap"><table><thead><tr><th>When</th><th>Actor</th><th>Action</th><th>Entity</th><th>Entity ID</th></tr></thead>
      <tbody>{(events ?? []).map(e => <tr key={e.id}><td>{new Date(e.occurred_at).toLocaleString()}</td><td>{e.actor_user_id ?? "System"}</td><td>{e.action}</td><td>{e.entity_type}</td><td>{e.entity_id ?? "—"}</td></tr>)}</tbody></table></section>
    </div>
  );
}
function EmptyState() { return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>; }
