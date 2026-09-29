import { ApprovalDecisionActions } from "@/components/approval-decision-actions";
import { CreateApprovalForm } from "@/components/create-approval-form";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function ApprovalsPage(){
  const {supabase,user}=await requireUser();const w=await getPrimaryWorkspace(supabase,user.id);if(!w)return <Empty/>;
  const [{data:approvals},{data:members}]=await Promise.all([
    supabase.from("approvals").select("id,entity_type,entity_id,requested_by,approver_user_id,status,decision_notes,requested_at,decided_at,projects!approvals_project_id_fkey(name)").eq("organization_id",w.id).order("requested_at",{ascending:false}).limit(100),
    supabase.from("organization_members").select("user_id,role").eq("organization_id",w.id).in("role",["owner","admin","executive","project_manager"]).order("created_at")
  ]);
  return <div className="page stack-xl"><header><div className="eyebrow">GOVERNANCE</div><h1>Approvals</h1><p className="lead">Controlled approval records for material project changes.</p></header>
    <div className="content-grid"><CreateApprovalForm organizationId={w.id} approvers={members??[]} /><section className="card table-wrap"><table><thead><tr><th>Entity</th><th>Project</th><th>Requested</th><th>Approver</th><th>Status</th><th>Notes</th><th>Decision</th></tr></thead>
    <tbody>{(approvals??[]).map(a=>{const p=a.projects as {name:string}|null;return <tr key={a.id}><td>{a.entity_type} / {a.entity_id}</td><td>{p?.name??"—"}</td><td>{new Date(a.requested_at).toLocaleString()}</td><td>{a.approver_user_id}</td><td><span className="status">{a.status}</span></td><td>{a.decision_notes??"—"}</td><td><ApprovalDecisionActions approvalId={a.id} status={a.status}/></td></tr>})}</tbody></table>{!approvals?.length&&<p className="muted">No approval requests yet.</p>}</section></div>
  </div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
