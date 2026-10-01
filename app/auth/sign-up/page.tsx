"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { AuthStory } from "@/components/auth-story";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name.trim() } },
    });

    if (authError) {
      setError(authError.message);
      setBusy(false);
      return;
    }

    if (data.session) {
      router.replace("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Account created. Check your email if confirmation is enabled, then sign in.");
    setBusy(false);
  }

  return (
    <main className="auth-page">
      <AuthStory />
      <div className="auth-panel"><div className="auth-card">
        <div className="brand-mark">A</div>
        <div className="eyebrow">AMANAH PLATFORM</div>
        <h1>Create your account.</h1>
        <form className="stack" onSubmit={submit}>
          <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
          <label>Email<input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
          <label>Password<input minLength={8} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" /></label>
          {error ? <p role="alert" className="error">{error}</p> : null}
          {message ? <p role="status" className="success">{message}</p> : null}
          <button className="button" disabled={busy} type="submit">{busy ? "Creating\u2026" :  <>Create account <span className="button-icon" aria-hidden="true">↗</span></>}</button>
        </form>
        <p className="muted small"><Link href="/login">Back to sign in</Link></p>
      </div></div>
    </main>
  );
}
