"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProfileForm({ userId, initialName }: { userId: string; initialName: string }) {
  const router = useRouter();
  const [fullName, setFullName] = useState(initialName);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() || null })
      .eq("id", userId);

    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }

    router.refresh();
    setBusy(false);
  }

  return <form className="card stack" onSubmit={submit}><div><div className="eyebrow">PROFILE</div><h2>Your profile</h2></div><label>Full name<input value={fullName} onChange={e=>setFullName(e.target.value)} /></label>{error?<p className="error">{error}</p>:null}<button className="button" disabled={busy}>{busy?"Saving…":"Save profile"}</button></form>;
}
