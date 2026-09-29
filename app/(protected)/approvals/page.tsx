import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function ApprovalsPage(){
  const {supabase,user}=await requireUser();const w=await getPrimaryWorkspace(supabase,user.id);if(!w)return <Empty/>;
  const {data:approvals}=await supabase.from("approvals").select("id,entity_type,entity_id,requested_by,approver_user_id,status,decision_notes,requested_at,decided_at,projects(name)").eq("organization_id",w.id).order("requested_at",{ascending:false}).limit(100);
  return <div className="page stack-xl"><header><div className="eyebrow">GOVERNANCE</div><h1>Approvals</h1><p className="lead">Controlled approval records for material project changes.</p></header><section className="card table-wrap"><table><thead><tr><th>Entity</th><th>Project</th><th>Requested</th><th>Approver</th><th>Status</th><th>Notes</th></tr></thead><tbody>{(approvals??[]).map(a=>{const p=a.projects as Array<{name:string}>|null;return <tr key={a.id}><td>{a.entity_type} / {a.entity_id}</td><td>{p?.[0]?.name??"—"}</td><td>{new Date(a.requested_at).toLocaleString()}</td><td>{a.approver_user_id}</td><td><span className="status">{a.status}</span></td><td>{a.decision_notes??"—"}</td></tr>})}</tbody></table>{!approvals?.length&&<p className="muted">No approval requests yet.</p>}</section></div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
