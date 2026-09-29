"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export function DownloadDocumentButton({ path }: { path: string | null }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function download() {
    if (!path) return;
    setBusy(true);
    setError("");
    const supabase = createClient();
    const { data, error: signedError } = await supabase
      .storage
      .from("amanah-documents")
      .createSignedUrl(path, 300);

    if (signedError || !data?.signedUrl) {
      setError(signedError?.message ?? "Could not create a secure download link.");
      setBusy(false);
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
    setBusy(false);
  }

  return (
    <span>
      <button className="button secondary small-button" type="button" disabled={!path || busy} onClick={download}>
        {busy ? "Preparing…" : "Open"}
      </button>
      {error ? <span className="error inline-error">{error}</span> : null}
    </span>
  );
}
