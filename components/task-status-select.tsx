"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = ["open","in_progress","blocked","done","cancelled"] as const;

export function TaskStatusSelect({ taskId, status }: { taskId: string; status: string }) {
  const router = useRouter();
  const [busy,setBusy]=useState(false);
  async function change(value:string){
    setBusy(true);
    const supabase=createClient();
    await supabase.from("tasks").update({status:value}).eq("id",taskId);
    setBusy(false); router.refresh();
  }
  return <select value={status} disabled={busy} onChange={e=>change(e.target.value)} aria-label="Task status">{statuses.map(s=><option key={s} value={s}>{s.replace("_"," ")}</option>)}</select>;
}
