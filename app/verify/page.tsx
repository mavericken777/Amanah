"use client";

import { useEffect, useState } from "react";

export default function VerifyPage() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("token");
    if (fromUrl) setToken(fromUrl);
  }, []);

  async function verify(event: React.FormEvent) {
    event.preventDefault();
    if (!token.trim()) return;
    setBusy(true);
    try {
      const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "") + "/functions/v1/public-verify?token=" + encodeURIComponent(token.trim());
      const response = await fetch(url);
      setResult(await response.json());
    } catch (error) {
      setResult({ valid: false, reason: error instanceof Error ? error.message : "verification_failed" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page">
      <div className="card stack-xl">
        <div><div className="eyebrow">AHTE PUBLIC VERIFICATION</div><h1>Verify an authorised disclosure</h1><p className="lead">Enter an AHTE verification token to view only the disclosure that its issuer has authorised.</p></div>
        <form className="stack" onSubmit={verify}>
          <label>Verification token<input value={token} onChange={e=>setToken(e.target.value)} placeholder="Paste token" /></label>
          <button className="button" disabled={busy || !token.trim()}>{busy ? "Verifying…" : "Verify"}</button>
        </form>
        {result ? <pre className="card-soft">{JSON.stringify(result, null, 2)}</pre> : null}
        <p className="muted">AHTE public verification does not itself create, amend or replace a competent-authority halal certification.</p>
      </div>
    </main>
  );
}
