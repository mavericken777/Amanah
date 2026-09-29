"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateWorkspace({ userId }: { userId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);

    const supabase = createClient();
    const { error: insertError } = await supabase.from("organizations").insert({
      name: name.trim(),
      owner_user_id: userId,
    });

    if (insertError) {
      setError(insertError.message);
      setBusy(false);
      return;
    }

    router.refresh();
    setName("");
    setBusy(false);
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <div>
        <div className="eyebrow">FIRST STEP</div>
        <h2>Create your Amanah workspace</h2>
        <p className="muted">A workspace contains your people, projects, permissions and operational records.</p>
      </div>
      <label>
        Workspace name
        <input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Amanah Operations" />
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button className="button" disabled={busy} type="submit">{busy ? "Creating…" : "Create workspace"}</button>
    </form>
  );
}
