import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function RecallPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;
  const [complaints, recalls, scope] = await Promise.all([
    supabase.from("ahte_complaints").select("source,complaint,severity,status,received_at").eq("organization_id", org.id).order("received_at", { ascending: false }).limit(100),
    supabase.from("ahte_recalls").select("recall_code,reason,status,authority_reference,initiated_at").eq("organization_id", org.id).order("initiated_at", { ascending: false }),
    supabase.from("ahte_recall_scopes").select("entity_type,entity_id,action,status,created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(100),
  ]);
  return <div className="page stack-xl">
    <header><div className="eyebrow">AHTE / INCIDENT</div><h1>Complaints, recall & containment</h1><p className="lead">Complaint → investigation → hold → trace-back/trace-forward → recall → closure/re-verification.</p></header>
    <section className="card"><h2>Complaints</h2>{(complaints.data ?? []).map((c: any, i: number) => <div className="row-between" key={i}><span>{c.source} · {c.complaint}</span><span className="status">{c.severity} · {c.status}</span></div>)}</section>
    <section className="card"><h2>Recalls</h2>{(recalls.data ?? []).map((r: any) => <div className="row-between" key={r.recall_code}><span><strong>{r.recall_code}</strong> · {r.reason}</span><span className="status">{r.status}</span></div>)}</section>
    <section className="card"><h2>Recall scope actions</h2>{(scope.data ?? []).map((s: any, i: number) => <div className="row-between" key={i}><span>{s.entity_type} / {s.entity_id} · {s.action}</span><span className="status">{s.status}</span></div>)}</section>
  </div>;
}
function Empty() { return <div className="page"><div className="card"><h1>No workspace</h1></div></div>; }
