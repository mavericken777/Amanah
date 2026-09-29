"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = ["open","in_progress","blocked","done","cancelled"] as const;

export function TaskStatusSelect({ taskId, status }: { taskId: string; status: string }) {
  const router = useRouter();
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState("");

  async function change(value:string){
    setBusy(true);
    setError("");
    const supabase=createClient();
    const { error: updateError } = await supabase
      .from("tasks")
      .update({status:value})
      .eq("id",taskId);

    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }

    setBusy(false);
    router.refresh();
  }

  return <span className="stack-inline"><select value={status} disabled={busy} onChange={e=>change(e.target.value)} aria-label="Task status">{statuses.map(s=><option key={s} value={s}>{s.replace("_"," ")}</option>)}</select>{error?<span className="error inline-error">{error}</span>:null}</span>;
}
