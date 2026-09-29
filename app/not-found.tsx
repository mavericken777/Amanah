import Link from "next/link";

export default function NotFound() {
  return <main className="page"><div className="card stack"><div className="eyebrow">AMANAH</div><h1>Not found</h1><p className="muted">The requested Amanah record or page does not exist.</p><Link className="button" href="/dashboard">Return to dashboard</Link></div></main>;
}
