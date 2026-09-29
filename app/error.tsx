"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="page"><div className="card stack"><div className="eyebrow">AMANAH</div><h1>Something went wrong</h1><p className="muted">The application could not complete that request.</p><div className="inline-actions"><button className="button" onClick={() => reset()}>Try again</button><Link className="button secondary" href="/dashboard">Dashboard</Link></div></div></main>;
}
