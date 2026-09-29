import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function LaboratoryPage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;

  const [labs, samples, results] = await Promise.all([
    supabase.from("ahte_laboratories").select("name,accreditation_status,accreditation_scope,method_scope,acceptance_status").eq("organization_id", org.id).order("name"),
    supabase.from("ahte_lab_samples").select("specimen_id,matrix,method_code,method_version,status,collected_at,chain_of_custody_ref").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(100),
    supabase.from("ahte_lab_results").select("analyte,result_value,unit,interpretation,result_class,status,created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(100),
  ]);

  return <div className="page stack-xl">
    <header><div className="eyebrow">AHTE / LABORATORY</div><h1>Laboratory evidence</h1><p className="lead">Sample, method, result, report and chain-of-custody records. Analytical findings do not by themselves create halal certification.</p></header>
    <section className="card"><h2>Laboratory partners</h2>{(labs.data ?? []).map((l: any, i: number) => <div className="row-between" key={i}><span>{l.name}</span><span className="status">{l.accreditation_status} · {l.acceptance_status}</span></div>)}</section>
    <section className="card"><h2>Samples</h2>{(samples.data ?? []).map((s: any) => <div className="row-between" key={s.specimen_id}><span>{s.specimen_id} · {s.method_code || "method pending"}</span><span className="status">{s.status}</span></div>)}</section>
    <section className="card"><h2>Results</h2>{(results.data ?? []).map((r: any, i: number) => <div className="row-between" key={i}><span>{r.analyte} · {r.result_value || "—"} {r.unit || ""}</span><span className="status">{r.result_class} · {r.status}</span></div>)}</section>
    <div className="card"><strong>Authority boundary:</strong> NOT DETECTED is not HALAL. AHTE records analytical evidence and provenance; competent-authority certification remains external.</div>
  </div>;
}

function Empty() { return <div className="page"><div className="card"><h1>No workspace</h1></div></div>; }
