import { CreateProjectForm } from "@/components/create-project-form";
import { requireUser } from "@/lib/auth";
import Link from "next/link";

export default async function ProjectsPage() {
  const {supabase,user}=await requireUser();
  const {data:memberships}=await supabase.from("organization_members").select("organization_id,organizations(id,name)").eq("user_id",user.id).order("created_at",{ascending:true});
  const organization=memberships?.[0]?.organizations as {id:string;name:string}|undefined;
  if(!organization)return <Empty/>;
  const {data:projects}=await supabase.from("projects").select("id,name,slug,module_key,status,start_date,end_date,created_at").eq("organization_id",organization.id).order("created_at",{ascending:false});
  return <div className="page stack-xl"><header><div className="eyebrow">CORE PLATFORM</div><h1>Projects</h1><p className="lead">Every operational module lives inside a controlled Amanah project/workspace.</p></header>
    <div className="content-grid"><CreateProjectForm organizationId={organization.id}/><section className="stack">{(projects??[]).map(p=><article className="card" key={p.id}><div className="row-between"><div><div className="eyebrow">{p.module_key}</div><h2>{p.name}</h2></div><span className="status">{p.status}</span></div><p className="muted">/{p.slug}</p><Link href={p.module_key==="travel.china-trip"?"/china-trip":`/projects/${p.id}`}>Open project →</Link></article>)}{!projects?.length&&<div className="card empty">No projects yet.</div>}</section></div></div>;
}
function Empty(){return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create one from the dashboard first.</p></div></div>}
