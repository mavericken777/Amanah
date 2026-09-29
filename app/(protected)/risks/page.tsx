import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function RisksPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const { data: risks } = await supabase
    .from("risks")
    .select("id, risk_code, description, impact, likelihood, mitigation, owner_user_id, status, projects(name)")
    .eq("organization_id", workspace.id)
    .order("created_at", { ascending: false });

  return (
    <div className="page stack-xl">
      <header><div className="eyebrow">CORE PLATFORM</div><h1>Risks</h1><p className="lead">Impact, likelihood, mitigation, ownership and escalation status.</p></header>
      <section className="card table-wrap">
        <table><thead><tr><th>ID</th><th>Risk</th><th>Impact</th><th>Likelihood</th><th>Mitigation</th><th>Status</th><th>Project</th></tr></thead>
        <tbody>{(risks ?? []).map((r) => {
          const project = r.projects as { name: string } | null;
          return <tr key={r.id}><td>{r.risk_code}</td><td>{r.description}</td><td>{r.impact}</td><td>{r.likelihood}</td><td>{r.mitigation ?? "—"}</td><td><span className="status">{r.status}</span></td><td>{project?.name ?? "—"}</td></tr>;
        })}</tbody></table>
        {!risks?.length ? <p className="muted">No risks recorded yet.</p> : null}
      </section>
    </div>
  );
}
function EmptyState() { return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>; }
