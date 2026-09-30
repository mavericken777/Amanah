import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({error:"Unauthorized"}, {status:401});
  const { data: memberships } = await supabase.from("organization_members").select("organization_id").eq("user_id",user.id);
  const orgIds=(memberships??[]).map(x=>x.organization_id);
  if (!orgIds.length) return NextResponse.json({data:[]});
  const {data,error}=await supabase.from("projects").select("id,name,slug,module_key,status,start_date,end_date,created_at,updated_at").in("organization_id",orgIds).order("created_at",{ascending:false});
  if(error)return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json({data:data??[]});
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({error:"Unauthorized"}, {status:401});
  let body: any;
  try { body=await request.json(); } catch { return NextResponse.json({error:"Invalid JSON"},{status:400}); }
  if(!body||typeof body!=="object"||Array.isArray(body))return NextResponse.json({error:"JSON object required"},{status:400});
  const name=typeof body.name==="string"?body.name.trim():"";
  if(name.length<2||name.length>200)return NextResponse.json({error:"name must be 2-200 characters"},{status:422});
  const {data:membership}=await supabase.from("organization_members").select("organization_id,role").eq("user_id",user.id).in("role",["owner","admin","executive","project_manager"]).order("created_at",{ascending:true}).limit(1).maybeSingle();
  if(!membership)return NextResponse.json({error:"Project management permission required"},{status:403});
  const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,80)||crypto.randomUUID().slice(0,8);
  const {data,error}=await supabase.from("projects").insert({organization_id:membership.organization_id,name,slug,module_key:typeof body.module_key==="string"?body.module_key:"core",status:"active",created_by:user.id}).select().single();
  if(error)return NextResponse.json({error:error.message},{status:400});
  return NextResponse.json({data},{status:201});
}
