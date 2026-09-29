"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateApprovalForm({
  organizationId,
  projectId,
  approvers,
}: {
  organizationId: string;
  projectId?: string;
  approvers: { user_id: string; role: string }[];
}) {
  const router = useRouter();
  const [entityType, setEntityType] = useState("project");
  const [entityId, setEntityId] = useState("");
  const [approver, setApprover] = useState(approvers[0]?.user_id ?? "");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setError("Your session has expired. Sign in again.");
      setBusy(false);
      return;
    }

    const { error: insertError } = await supabase.from("approvals").insert({
      organization_id: organizationId,
      project_id: projectId ?? null,
      entity_type: entityType,
      entity_id: entityId.trim(),
      requested_by: userData.user.id,
      approver_user_id: approver,
      status: "pending",
    });

    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }

    setEntityId("");
    router.refresh();
    setBusy(false);
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <div><div className="eyebrow">APPROVAL REQUEST</div><h2>Request approval</h2></div>
      <label>Entity type<select value={entityType} onChange={e=>setEntityType(e.target.value)}><option>project</option><option>task</option><option>document</option><option>decision</option><option>risk</option><option>expense</option><option>meeting</option></select></label>
      <label>Entity ID<input required value={entityId} onChange={e=>setEntityId(e.target.value)} placeholder="Record UUID" /></label>
      <label>Approver<select required value={approver} onChange={e=>setApprover(e.target.value)}>{approvers.map(a=><option key={a.user_id} value={a.user_id}>{a.user_id} ({a.role})</option>)}</select></label>
      {error ? <p className="error">{error}</p> : null}
      <button className="button" disabled={busy || !approver}>{busy ? "Submitting…" : "Request approval"}</button>
    </form>
  );
}
