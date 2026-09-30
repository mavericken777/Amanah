import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function GovernancePage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <Empty />;

  const [roles, competencies, changes, policies] = requireQueryResults(await Promise.all([
    supabase.from("ahte_person_roles").select("role_type,authority_level,status,effective_from,expires_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(100),
    supabase.from("ahte_competencies").select("competency,status,assessed_at,expires_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(100),
    supabase.from("ahte_change_requests").select("subject_type,change_type,approval_status,implementation_status,re_verification_required,created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(100),
    supabase.from("ahte_data_access_policies").select("record_type,jurisdiction,purpose,classification,retention_days,active").eq("organization_id", org.id).order("record_type").limit(100),
  ] as const));

  return <div className="page stack-xl">
    <header><div className="eyebrow">AHTE / GOVERNANCE</div><h1>Governance, competence & sovereignty</h1><p className="lead">Role mandate, competency state, change control and purpose-limited data access.</p></header>
    <section className="card"><h2>Authorised roles</h2>{(roles.data ?? []).map((r: any, i: number) => <div className="row-between" key={i}><span>{r.role_type} · {r.authority_level}</span><span className="status">{r.status}</span></div>)}</section>
    <section className="card"><h2>Competence</h2>{(competencies.data ?? []).map((c: any, i: number) => <div className="row-between" key={i}><span>{c.competency}</span><span className="status">{c.status}{c.expires_at ? " · expires " + c.expires_at : ""}</span></div>)}</section>
    <section className="card"><h2>Change control</h2>{(changes.data ?? []).map((c: any, i: number) => <div className="row-between" key={i}><span>{c.subject_type} · {c.change_type}</span><span className="status">{c.approval_status} / {c.implementation_status}{c.re_verification_required ? " · re-verification required" : ""}</span></div>)}</section>
    <section className="card"><h2>Data access policies</h2>{(policies.data ?? []).map((p: any, i: number) => <div className="row-between" key={i}><span>{p.record_type} · {p.purpose}</span><span className="status">{p.classification}{p.retention_days ? " · " + p.retention_days + "d" : ""}</span></div>)}</section>
  </div>;
}

function Empty() { return <div className="page"><div className="card"><h1>No workspace</h1></div></div>; }
