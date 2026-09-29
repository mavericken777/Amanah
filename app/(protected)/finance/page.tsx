import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function FinancePage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const [{ data: budgets }, { data: expenses }] = await Promise.all([
    supabase.from("budgets").select("id, category, planned, actual, status, projects(name)").eq("organization_id", workspace.id).order("category"),
    supabase.from("expenses").select("id, spent_on, category, description, amount, currency, reimbursable, status, projects(name)").eq("organization_id", workspace.id).order("spent_on", { ascending: false }).limit(100),
  ]);

  return (
    <div className="page stack-xl">
      <header><div className="eyebrow">CORE PLATFORM</div><h1>Finance</h1><p className="lead">Budget planning and expense records with traceable project context.</p></header>
      <section className="stack">
        <h2>Budgets</h2>
        <div className="card table-wrap"><table><thead><tr><th>Category</th><th>Project</th><th>Planned</th><th>Actual</th><th>Variance</th><th>Status</th></tr></thead>
        <tbody>{(budgets ?? []).map(b => { const p=b.projects as Array<{name:string}>|null; const variance=Number(b.planned)-Number(b.actual); return <tr key={b.id}><td>{b.category}</td><td>{p?.[0]?.name ?? "—"}</td><td>{b.planned}</td><td>{b.actual}</td><td>{variance.toFixed(2)}</td><td><span className="status">{b.status}</span></td></tr>; })}</tbody></table></div>
      </section>
      <section className="stack">
        <h2>Expenses</h2>
        <div className="card table-wrap"><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Project</th><th>Reimbursable</th><th>Status</th></tr></thead>
        <tbody>{(expenses ?? []).map(e => { const p=e.projects as Array<{name:string}>|null; return <tr key={e.id}><td>{e.spent_on}</td><td>{e.category}</td><td>{e.description}</td><td>{e.amount} {e.currency}</td><td>{p?.[0]?.name ?? "—"}</td><td>{e.reimbursable ? "Yes" : "No"}</td><td><span className="status">{e.status}</span></td></tr>; })}</tbody></table></div>
      </section>
    </div>
  );
}
function EmptyState() { return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>; }
