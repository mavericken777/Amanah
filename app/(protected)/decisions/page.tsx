import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function DecisionsPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const { data: decisions } = await supabase
    .from("decisions")
    .select("id, decision_code, decided_on, decision, reason_context, owner_user_id, impact, projects(name)")
    .eq("organization_id", workspace.id)
    .order("decided_on", { ascending: false, nullsFirst: false });

  return (
    <div className="page stack-xl">
      <header><div className="eyebrow">CORE PLATFORM</div><h1>Decisions</h1><p className="lead">The formal record of agreed decisions, reasons, alternatives and impacts.</p></header>
      <section className="card table-wrap">
        <table><thead><tr><th>ID</th><th>Date</th><th>Decision</th><th>Reason</th><th>Impact</th><th>Project</th></tr></thead>
        <tbody>{(decisions ?? []).map((d) => {
          const project = d.projects as { name: string } | null;
          return <tr key={d.id}><td>{d.decision_code}</td><td>{d.decided_on ?? "—"}</td><td>{d.decision}</td><td>{d.reason_context ?? "—"}</td><td>{d.impact ?? "—"}</td><td>{project?.name ?? "—"}</td></tr>;
        })}</tbody></table>
        {!decisions?.length ? <p className="muted">No decisions recorded yet.</p> : null}
      </section>
    </div>
  );
}
function EmptyState() { return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>; }
