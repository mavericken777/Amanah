import { requireQueryResult, requireQueryResults } from "@/lib/query-results";
import { CreateExpenseForm } from "@/components/forms";
import { getPrimaryWorkspace } from "@/lib/workspace";
import { requireUser } from "@/lib/auth";

export default async function FinancePage() {
  const {supabase,user}=await requireUser(); const workspace=await getPrimaryWorkspace(supabase,user.id); if(!workspace)return <EmptyState/>;
  const {data:projects}=requireQueryResult(await supabase.from("projects").select("id,name").eq("organization_id",workspace.id).eq("status","active").order("created_at",{ascending:false})); const project=projects?.[0];
  const [{data:budgets},{data:expenses}]=requireQueryResults(await Promise.all([
    supabase.from("budgets").select("id,category,planned,actual,status,projects!budgets_project_id_fkey(name)").eq("organization_id",workspace.id).order("category"),
    supabase.from("expenses").select("id,spent_on,category,description,amount,currency,reimbursable,status,projects!expenses_project_id_fkey(name)").eq("organization_id",workspace.id).order("spent_on",{ascending:false}).limit(100)
  ] as const));
  return <div className="page stack-xl"><header><div className="eyebrow">CORE PLATFORM</div><h1>Finance</h1><p className="lead">Budget planning and expense records with traceable project context.</p></header>
  {project?<div className="content-grid"><CreateExpenseForm organizationId={workspace.id} projectId={project.id}/><div className="stack"><section className="card table-wrap"><h2>Budgets</h2><table><thead><tr><th>Category</th><th>Project</th><th>Planned</th><th>Actual</th><th>Variance</th><th>Status</th></tr></thead><tbody>{(budgets??[]).map(b=>{const p=b.projects as {name:string}|null;const v=Number(b.planned)-Number(b.actual);return <tr key={b.id}><td>{b.category}</td><td>{p?.name??"—"}</td><td>{b.planned}</td><td>{b.actual}</td><td>{v.toFixed(2)}</td><td><span className="status">{b.status}</span></td></tr>})}</tbody></table></section><section className="card table-wrap"><h2>Expenses</h2><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Project</th><th>Reimbursable</th><th>Status</th></tr></thead><tbody>{(expenses??[]).map(e=>{const p=e.projects as {name:string}|null;return <tr key={e.id}><td>{e.spent_on}</td><td>{e.category}</td><td>{e.description}</td><td>{e.amount} {e.currency}</td><td>{p?.name??"—"}</td><td>{e.reimbursable?"Yes":"No"}</td><td><span className="status">{e.status}</span></td></tr>})}</tbody></table></section></div></div>:<div className="card"><h2>Create a project first</h2></div>}</div>;
}
function EmptyState(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
