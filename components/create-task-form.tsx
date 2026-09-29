"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateTaskForm({ organizationId, projectId }: { organizationId: string; projectId: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const supabase = createClient();
    const { error: insertError } = await supabase.from("tasks").insert({
      organization_id: organizationId,
      project_id: projectId,
      title: title.trim(),
      priority,
      due_date: dueDate || null,
      status: "open",
    });

    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }

    setTitle("");
    setDueDate("");
    router.refresh();
    setBusy(false);
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <div>
        <div className="eyebrow">ACTION REGISTER</div>
        <h2>Capture an action</h2>
      </div>
      <label>
        Task
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Confirm Shanghai meeting" />
      </label>
      <div className="grid-2">
        <label>
          Priority
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </label>
        <label>
          Due date
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
      </div>
      {error ? <p className="error">{error}</p> : null}
      <button className="button" disabled={busy} type="submit">{busy ? "Saving…" : "Add task"}</button>
    </form>
  );
}
