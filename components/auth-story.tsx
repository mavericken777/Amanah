import Link from "next/link";

export function AuthStory() {
  return (
    <aside className="auth-story">
      <Link href="/login" className="brand" aria-label="Global Halal Supply Chain Ltd — Amanah">
        <img className="auth-brand-crest" src="/company-logo.webp?v=20261011" alt="" />
        <span className="auth-brand-copy">
          <strong>GLOBAL HALAL SUPPLY CHAIN LTD</strong>
          <span>AMANAH · GLOBAL HALAL DIGITAL TRUST</span>
          <span className="auth-brand-multilingual">
            <b lang="zh-Hant">全球清真供應鏈有限公司</b>
            <i aria-hidden="true">•</i>
            <b lang="ar" dir="rtl">سلسلة التوريد العالمية للحلال</b>
          </span>
        </span>
      </Link>
      <div className="auth-story-copy">
        <span className="eyebrow">THE INFRASTRUCTURE OF TRUST</span>
        <h2>Evidence connected.<br /><em>Responsibility clear.</em></h2>
        <p>A controlled institutional workspace connecting origin, standards, evidence, audit, custody, human review and operational action across the China → GCC corridor.</p>
        <div className="trust-path" aria-label="Amanah trust workflow">
          <span>Evidence</span><i aria-hidden="true">→</i><span>Assessment</span><i aria-hidden="true">→</i><span>Human authority</span><i aria-hidden="true">→</i><span>Release</span>
        </div>
      </div>
      <div className="auth-story-foot">
        <span>AHTE ⇄ DIRECT JAKIM API ⇄ JAKIM · AUTHORITY CONNECTIVITY</span>
        <span className="auth-story-links">
          <Link href="https://mavericken777.github.io/Amanah/verify.html">Verify disclosure <span aria-hidden="true">↗</span></Link>
          <Link href="/trust-journey/index.html">Explore the Trust Journey <span aria-hidden="true">↗</span></Link>
        </span>
      </div>
    </aside>
  );
}
