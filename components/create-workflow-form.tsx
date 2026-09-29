"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateWorkflowForm({ organizationId }: { organizationId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [entityType, setEntityType] = useState("task");
  const [definition, setDefinition] = useState('{"states":["open","in_progress","blocked","done"],"transitions":[]}');
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    let parsed: unknown;
    try {
      parsed = JSON.parse(definition);
    } catch {
      setError("Workflow definition must be valid JSON.");
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setError("Your session has expired. Sign in again.");
      setBusy(false);
      return;
    }

    const { error: insertError } = await supabase.from("workflow_definitions").insert({
      organization_id: organizationId,
      name: name.trim(),
      entity_type: entityType,
      definition: parsed,
      created_by: userData.user.id,
      active: true,
    });

    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }

    setName("");
    router.refresh();
    setBusy(false);
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <div><div className="eyebrow">WORKFLOW</div><h2>Create workflow definition</h2></div>
      <label>Name<input required minLength={2} maxLength={120} value={name} onChange={e=>setName(e.target.value)} placeholder="Task escalation" /></label>
      <label>Entity<select value={entityType} onChange={e=>setEntityType(e.target.value)}><option>task</option><option>document</option><option>approval</option><option>risk</option><option>meeting</option><option>project</option></select></label>
      <label>Definition (JSON)<textarea required rows={8} value={definition} onChange={e=>setDefinition(e.target.value)} spellCheck={false} /></label>
      {error ? <p className="error">{error}</p> : null}
      <button className="button" disabled={busy}>{busy ? "Saving…" : "Create workflow"}</button>
    </form>
  );
}
