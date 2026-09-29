import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  const url=new URL(request.url);const projectId=url.searchParams.get("project_id");
  const {data:memberships}=await supabase.from("organization_members").select("organization_id").eq("user_id",user.id);const orgIds=(memberships??[]).map(x=>x.organization_id);if(!orgIds.length)return NextResponse.json({data:[]});
  let query=supabase.from("tasks").select("id,organization_id,project_id,title,description,owner_user_id,due_date,priority,status,completion_condition,dependency_notes,created_at,updated_at").in("organization_id",orgIds).order("due_date",{ascending:true,nullsFirst:false});
  if(projectId)query=query.eq("project_id",projectId);
  const {data,error}=await query.limit(200);if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({data:data??[]});
}

export async function POST(request: Request) {
  const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.json({error:"Unauthorized"},{status:401});
  let body:any;try{body=await request.json()}catch{return NextResponse.json({error:"Invalid JSON"},{status:400})}
  const projectId=typeof body.project_id==="string"?body.project_id:"";const title=typeof body.title==="string"?body.title.trim():"";
  if(!projectId||title.length<2||title.length>500)return NextResponse.json({error:"project_id and a 2-500 character title are required"},{status:422});
  const {data:project}=await supabase.from("projects").select("id,organization_id").eq("id",projectId).maybeSingle();if(!project)return NextResponse.json({error:"Project not found"},{status:404});
  const {data:membership}=await supabase.from("organization_members").select("role").eq("organization_id",project.organization_id).eq("user_id",user.id).maybeSingle();if(!membership)return NextResponse.json({error:"Forbidden"},{status:403});
  const {data,error}=await supabase.from("tasks").insert({organization_id:project.organization_id,project_id:project.id,title,description:typeof body.description==="string"?body.description.trim():null,due_date:body.due_date??null,priority:["low","medium","high","critical"].includes(body.priority)?body.priority:"medium",status:"open",created_by:user.id}).select().single();
  if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({data},{status:201});
}
