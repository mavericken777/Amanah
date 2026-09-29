"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateProjectForm({ organizationId }: { organizationId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [moduleKey, setModuleKey] = useState("core");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const supabase = createClient();
    const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const { error: insertError } = await supabase.from("projects").insert({
      organization_id: organizationId,
      name: name.trim(),
      slug: slug || crypto.randomUUID().slice(0, 8),
      module_key: moduleKey,
      status: "active",
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
      <div>
        <div className="eyebrow">PROJECT</div>
        <h2>Create a project</h2>
      </div>
      <label>
        Name
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="China Trip 2026" />
      </label>
      <label>
        Module
        <select value={moduleKey} onChange={(e) => setModuleKey(e.target.value)}>
          <option value="core">Core / General</option>
          <option value="travel.china-trip">Travel / China Trip</option>
        </select>
      </label>
      {error ? <p className="error">{error}</p> : null}
      <button className="button" disabled={busy} type="submit">{busy ? "Creating…" : "Create project"}</button>
    </form>
  );
}
