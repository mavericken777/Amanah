import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function UpdatesPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const { data: updates } = await supabase.from("updates").select("id, title, overall_status, completed, in_progress, blocked, next_actions, published_at, projects(name)").eq("organization_id", workspace.id).order("published_at", { ascending: false }).limit(50);

  return (
    <div className="page stack-xl">
      <header><div className="eyebrow">CORE PLATFORM</div><h1>Updates</h1><p className="lead">Dated operational communications for executives and teams.</p></header>
      <section className="stack">{(updates ?? []).map(u => { const p=u.projects as Array<{name:string}>|null; return <article className="card" key={u.id}><div className="row-between"><div><div className="eyebrow">{p?.[0]?.name ?? "Workspace"}</div><h2>{u.title}</h2></div><span className="status">{u.overall_status ?? "Update"}</span></div><p className="muted">{new Date(u.published_at).toLocaleString()}</p><p><strong>Completed:</strong> {u.completed ?? "—"}</p><p><strong>In progress:</strong> {u.in_progress ?? "—"}</p><p><strong>Blocked:</strong> {u.blocked ?? "—"}</p><p><strong>Next:</strong> {u.next_actions ?? "—"}</p></article>; })}</section>
      {!updates?.length ? <div className="card empty">No updates recorded yet.</div> : null}
    </div>
  );
}
function EmptyState() { return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>; }
