import Link from "next/link";

export function AuthStory() {
  return <aside className="auth-story"><Link href="/login" className="brand"><div className="brand-mark" aria-hidden="true">A</div><strong>Amanah<span className="brand-dot">.</span></strong></Link><div className="auth-story-copy"><span className="eyebrow">THE INFRASTRUCTURE OF TRUST</span><h2>Evidence connected.<br /><em>Responsibility clear.</em></h2><p>A controlled workspace for the people, evidence and decisions behind cross-border Halal supply chains.</p><div className="trust-path" aria-label="Evidence workflow"><span>Evidence</span><i aria-hidden="true">→</i><span>Human review</span><i aria-hidden="true">→</i><span>Accountable action</span></div></div><div className="auth-story-foot"><span>AMANAH HALAL TRUST ECOSYSTEM</span><Link href="https://mavericken777.github.io/Amanah/partners.html">Explore the ecosystem <span aria-hidden="true">↗</span></Link></div></aside>;
}
