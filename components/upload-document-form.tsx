"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UploadDocumentForm({
  organizationId,
  projectId,
}: {
  organizationId: string;
  projectId: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [classification, setClassification] = useState("internal");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError("Select a file first.");
      return;
    }

    setBusy(true);
    setError("");
    const supabase = createClient();

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      setError("Your session has expired. Sign in again.");
      setBusy(false);
      return;
    }

    const { data: doc, error: docError } = await supabase
      .from("documents")
      .insert({
        organization_id: organizationId,
        project_id: projectId,
        title: title.trim() || file.name,
        classification,
        status: "pending",
        storage_provider: "supabase",
      })
      .select("id")
      .single();

    if (docError || !doc) {
      setError(docError?.message ?? "Could not create document record.");
      setBusy(false);
      return;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = organizationId + "/" + projectId + "/" + doc.id + "/" + safeName;

    const { error: uploadError } = await supabase
      .storage
      .from("amanah-documents")
      .upload(path, file, { upsert: false, contentType: file.type || undefined });

    if (uploadError) {
      setError(uploadError.message);
      setBusy(false);
      return;
    }

    const { error: linkError } = await supabase
      .from("documents")
      .update({ storage_reference: path })
      .eq("id", doc.id)
      .eq("organization_id", organizationId);

    if (linkError) {
      setError(linkError.message);
      setBusy(false);
      return;
    }

    setTitle("");
    setFile(null);
    setBusy(false);
    router.refresh();
  }

  return (
    <form className="card stack" onSubmit={submit}>
      <div>
        <div className="eyebrow">SECURE DOCUMENT</div>
        <h2>Upload file</h2>
        <p className="muted">Files are stored in the private Amanah document bucket. Do not upload material prohibited by the repository security policy.</p>
      </div>
      <label>Title<input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Passport record / agenda / contract" /></label>
      <label>Classification<select value={classification} onChange={(e) => setClassification(e.target.value)}><option value="public">Public</option><option value="internal">Internal</option><option value="confidential">Confidential</option><option value="restricted">Restricted</option></select></label>
      <label>File<input type="file" required onChange={(e) => setFile(e.target.files?.[0] ?? null)} /></label>
      {error ? <p className="error">{error}</p> : null}
      <button className="button" disabled={busy}>{busy ? "Uploading…" : "Upload securely"}</button>
    </form>
  );
}
