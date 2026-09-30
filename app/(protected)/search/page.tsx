import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";
import Link from "next/link";

type Result = { id: string; title: string; detail: string; href: string; type: string };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <Empty />;
  const params = await searchParams;
  const q = (params.q ?? "").trim();

  let results: Result[] = [];
  if (q) {
    const pattern = `%${q}%`;
    const [{ data: projects }, { data: tasks }, { data: meetings }, { data: documents }, { data: decisions }, { data: risks }] = requireQueryResults(await Promise.all([
      supabase.from("projects").select("id,name,description").eq("organization_id", workspace.id).ilike("name", pattern).limit(20),
      supabase.from("tasks").select("id,title,description").eq("organization_id", workspace.id).or(`title.ilike.${pattern},description.ilike.${pattern}`).limit(20),
      supabase.from("meetings").select("id,organisation_or_person,purpose,city").eq("organization_id", workspace.id).or(`organisation_or_person.ilike.${pattern},purpose.ilike.${pattern},city.ilike.${pattern}`).limit(20),
      supabase.from("documents").select("id,title,description").eq("organization_id", workspace.id).or(`title.ilike.${pattern},description.ilike.${pattern}`).limit(20),
      supabase.from("decisions").select("id,decision_code,decision").eq("organization_id", workspace.id).or(`decision_code.ilike.${pattern},decision.ilike.${pattern}`).limit(20),
      supabase.from("risks").select("id,risk_code,description").eq("organization_id", workspace.id).or(`risk_code.ilike.${pattern},description.ilike.${pattern}`).limit(20),
    ] as const));
    results = [
      ...(projects ?? []).map(x=>({id:x.id,title:x.name,detail:x.description??"Project",href:"/projects",type:"Project"})),
      ...(tasks ?? []).map(x=>({id:x.id,title:x.title,detail:x.description??"Task",href:"/tasks",type:"Task"})),
      ...(meetings ?? []).map(x=>({id:x.id,title:x.organisation_or_person,detail:[x.city,x.purpose].filter(Boolean).join(" • "),href:"/meetings",type:"Meeting"})),
      ...(documents ?? []).map(x=>({id:x.id,title:x.title,detail:x.description??"Document",href:"/documents",type:"Document"})),
      ...(decisions ?? []).map(x=>({id:x.id,title:x.decision_code,detail:x.decision,href:"/decisions",type:"Decision"})),
      ...(risks ?? []).map(x=>({id:x.id,title:x.risk_code,detail:x.description,href:"/risks",type:"Risk"})),
    ];
  }

  return <div className="page stack-xl"><header><div className="eyebrow">AMANAH SEARCH</div><h1>Search the workspace</h1><p className="lead">Tenant-aware search across operational records.</p></header>
    <form className="search-form" method="get"><input name="q" defaultValue={q} placeholder="Search projects, tasks, meetings, documents, decisions or risks" aria-label="Search"/><button className="button" type="submit">Search</button></form>
    {q ? <section className="stack"><div className="section-heading"><h2>{results.length} result{results.length===1?"":"s"}</h2></div>{results.map(r=><Link className="card result-card" href={r.href} key={`${r.type}-${r.id}`}><div className="eyebrow">{r.type}</div><h3>{r.title}</h3><p className="muted">{r.detail||"—"}</p></Link>)}{!results.length&&<div className="card empty">No matching operational records.</div>}</section>:<div className="card"><p className="muted">Enter a search term to find operational records.</p></div>}
  </div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1></div></div>}
