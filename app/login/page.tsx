"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { AuthStory } from "@/components/auth-story";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { safeNext } from "@/lib/safe-redirect";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = safeNext(searchParams.get("next"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setBusy(false);
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <main className="auth-page">
      <AuthStory />
      <div className="auth-panel"><div className="auth-card">
        <div className="brand-mark">A</div>
        <div className="eyebrow">AMANAH PLATFORM</div>
        <h1>Welcome to Amanah.</h1>
        <p className="muted">Projects, actions, meetings, decisions, risks, documents and operational modules in one controlled workspace.</p>
        <form className="stack" onSubmit={submit}>
          <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
          <label>Password<input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" /></label>
          {error ? <p role="alert" className="error">{error}</p> : null}
          <button className="button" disabled={busy} type="submit">{busy ? "Signing inâ€¦" :  <>Sign in <span className="button-icon" aria-hidden="true">↗</span></>}</button>
        </form>
        <p className="muted small">New to Amanah? <Link href="/auth/sign-up">Create an account</Link></p>
      </div></div>
    </main>
  );
}
