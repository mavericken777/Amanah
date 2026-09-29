import { requireUser } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function ProjectDetail({params}:{params:Promise<{projectId:string}>}){
  const {supabase,user}=await requireUser(); const {projectId}=await params;
  const {data:project}=await supabase.from("projects").select("id,name,slug,module_key,status,start_date,end_date,description,organization_id").eq("id",projectId).maybeSingle();
  if(!project)notFound();
  const {data:membership}=await supabase.from("organization_members").select("role").eq("organization_id",project.organization_id).eq("user_id",user.id).maybeSingle();
  if(!membership)notFound();
  const [{count:tasks},{count:meetings},{count:documents},{count:risks},{count:decisions},{count:expenses}]=await Promise.all([
    supabase.from("tasks").select("id",{count:"exact",head:true}).eq("organization_id",project.organization_id).eq("project_id",project.id),
    supabase.from("meetings").select("id",{count:"exact",head:true}).eq("organization_id",project.organization_id).eq("project_id",project.id),
    supabase.from("documents").select("id",{count:"exact",head:true}).eq("organization_id",project.organization_id).eq("project_id",project.id),
    supabase.from("risks").select("id",{count:"exact",head:true}).eq("organization_id",project.organization_id).eq("project_id",project.id),
    supabase.from("decisions").select("id",{count:"exact",head:true}).eq("organization_id",project.organization_id).eq("project_id",project.id),
    supabase.from("expenses").select("id",{count:"exact",head:true}).eq("organization_id",project.organization_id).eq("project_id",project.id)
  ]);
  return <div className="page stack-xl"><header className="page-header"><div><div className="eyebrow">{project.module_key}</div><h1>{project.name}</h1><p className="lead">{project.description??"Project command centre."}</p></div><span className="status">{project.status}</span></header><section className="metric-grid"><div className="metric-card"><span>Tasks</span><strong>{tasks??0}</strong></div><div className="metric-card"><span>Meetings</span><strong>{meetings??0}</strong></div><div className="metric-card"><span>Documents</span><strong>{documents??0}</strong></div><div className="metric-card"><span>Risks</span><strong>{risks??0}</strong></div></section><section className="card-grid"><div className="card"><h2>Decisions</h2><p className="muted">{decisions??0} recorded</p></div><div className="card"><h2>Expenses</h2><p className="muted">{expenses??0} recorded</p></div><div className="card"><h2>Module</h2><p className="muted">{project.module_key}</p></div></section></div>;
}
