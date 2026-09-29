import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({service:"amanah-api",version:"v1",status:"ok",timestamp:new Date().toISOString()});}
