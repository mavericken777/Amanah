import { useState } from "react";

const trustPath = [
  "Authority",
  "Standard / Instrument",
  "Requirement",
  "Applicability",
  "Control",
  "HCP / SCCP",
  "Evidence",
  "Audit Test",
  "Finding",
  "Corrective Action",
  "Re-verification",
  "Authority Gate",
  "Trust State",
  "Operational Release",
];

const corridor = [
  ["China origin", "Producer, supplier, manufacturer and factory systems"],
  ["Laboratory", "Sample → custody → method / QC → result → review / signature → evidence"],
  ["Sinotrans", "Warehouse, logistics, telemetry, seal and custody events"],
  ["Ports / customs", "Authorised trust interfaces; sovereign release remains external"],
  ["GCC destination", "Importer, receiving, warehouse, distribution, retail and verification"],
];

const pathways = [
  ["Manufacturer", "Onboard enterprise, facility, products, suppliers and evidence."],
  ["Laboratory", "Bind scientific evidence to exact samples, methods and signed results."],
  ["Logistics", "Connect warehouse, vehicle, container, seal and custody events."],
  ["Authority", "Review evidence through the direct authority-connectivity path."],
  ["Buyer / Retail", "Inspect issuer-authorised product, batch or shipment disclosures."],
];

export default function App() {
  const [activeCorridor, setActiveCorridor] = useState(0);

  return (
    <div className="platinum-shell">
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="platinum-header glass">
        <a className="identity" href="#top" aria-label="Global Halal Supply Chain Limited home">
          <span className="identity-mark" aria-hidden="true">حلال</span>
          <span className="identity-copy">
            <strong>GLOBAL HALAL SUPPLY CHAIN LIMITED</strong>
            <small>AMANAH · GLOBAL HALAL DIGITAL TRUST · HONG KONG</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#ecosystem">Ecosystem</a>
          <a href="#trust">AHTE Trust</a>
          <a href="#corridor">China → GCC</a>
          <a href="#pathways">Participants</a>
        </nav>
        <a className="header-cta" href="https://amanah-yq9x.vercel.app/login">Secure portal ↗</a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">GLOBAL HALAL DIGITAL TRUST &amp; TRADE INFRASTRUCTURE</p>
              <h1 id="hero-title">Evidence before trust.<br /><em>Trust before release.</em></h1>
              <p className="hero-lede">
                A premium operating layer for end-to-end Halal assurance across the China → GCC direct corridor:
                manufacturer readiness, laboratory evidence, smart audit, custody, command-centre intelligence and
                authority-connected review.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Open Amanah ↗</a>
                <a className="button-secondary" href="#ecosystem">Explore the ecosystem</a>
              </div>
              <div className="status-row" aria-label="Current architecture status">
                <span><i className="status-dot" /> AHTE ⇄ Direct JAKIM API ⇄ JAKIM</span>
                <span>Connector: pending authorisation</span>
                <span>Shipment 001: not instantiated</span>
              </div>
            </div>

            <aside className="hero-terminal glass" aria-label="Trust architecture summary">
              <div className="terminal-head">
                <span>AMANAH / TRUST TERMINAL</span>
                <span>PROJECT ARCHITECTURE</span>
              </div>
              <div className="shield-orbit" aria-hidden="true">
                <span className="orbit orbit-one" />
                <span className="orbit orbit-two" />
                <span className="hero-shield">حلال</span>
              </div>
              <dl>
                <div><dt>Authority</dt><dd>Human / competent authority</dd></div>
                <div><dt>Evidence</dt><dd>Append-only + provenance-linked</dd></div>
                <div><dt>AI</dt><dd>D0–D2 + configured D4 holds</dd></div>
                <div><dt>Release</dt><dd>After required authority gates</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="section" id="ecosystem">
          <div className="section-heading">
            <p className="eyebrow">01 / COMPLETE ECOSYSTEM</p>
            <h2>One operating model. Distinct responsibilities.</h2>
            <p>Technology connects evidence and action without collapsing certification, customs, operations or finance into one synthetic status.</p>
          </div>
          <div className="capability-grid">
            {[
              ["Manufacturer readiness", "Enterprise, facility, product, SKU, supplier and raw-material onboarding."],
              ["Laboratory evidence", "Sample identity, custody, method / QC, signed result and evidence binding."],
              ["Smart audit", "Guided inspection, evidence capture, findings, CAPA and re-verification."],
              ["Digital chain of custody", "Batch, pallet, shipment, container, seal, route and condition events."],
              ["24/7 Command Center", "Exceptions, predictive analysis, preemptive strategy and recall coordination."],
              ["Verification", "Purpose-bound product, batch and shipment disclosures for authorised users."],
            ].map(([title, text], index) => (
              <article className="capability-card glass" key={title}>
                <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section trust-section" id="trust">
          <div className="section-heading">
            <p className="eyebrow">02 / CANONICAL TRUST PATH</p>
            <h2>Every conclusion must be traceable to its basis.</h2>
            <p>The platform follows a controlled path from authority source to operational release.</p>
          </div>
          <ol className="trust-path" aria-label="Canonical trust path">
            {trustPath.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </li>
            ))}
          </ol>
          <div className="trust-note glass">
            <strong>Minimum evidence binding</strong>
            <code>ObjectID + EventID + EvidenceID + ActorID + Timestamp + IntegrityProof</code>
            <p>Hash proves integrity of the recorded content. It does not prove the truth of the underlying claim.</p>
          </div>
        </section>

        <section className="section" id="corridor">
          <div className="section-heading">
            <p className="eyebrow">03 / CHINA → GCC DIRECT</p>
            <h2>The corridor is a sequence of accountable handoffs.</h2>
            <p>Malaysia remains the governance, assurance and authority-connectivity plane unless a separate physical movement is explicitly scoped.</p>
          </div>
          <div className="corridor-layout">
            <div className="corridor-nav" role="tablist" aria-label="Corridor stages">
              {corridor.map(([title], index) => (
                <button
                  key={title}
                  type="button"
                  role="tab"
                  aria-selected={activeCorridor === index}
                  className={activeCorridor === index ? "active" : ""}
                  onClick={() => setActiveCorridor(index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {title}
                </button>
              ))}
            </div>
            <article className="corridor-detail glass" role="tabpanel" aria-live="polite">
              <p className="eyebrow">CURRENT STAGE</p>
              <h3>{corridor[activeCorridor][0]}</h3>
              <p>{corridor[activeCorridor][1]}</p>
              <div className="event-line" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <small>Illustrative architecture state · no live shipment or sovereign release data.</small>
            </article>
          </div>
        </section>

        <section className="section" id="pathways">
          <div className="section-heading">
            <p className="eyebrow">04 / PARTICIPANT PATHWAYS</p>
            <h2>Enter the ecosystem through the work you actually own.</h2>
          </div>
          <div className="pathway-grid">
            {pathways.map(([title, text]) => (
              <article className="pathway-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="https://amanah-yq9x.vercel.app/login">Enter Amanah ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta glass" aria-labelledby="final-title">
          <div>
            <p className="eyebrow">05 / SECURE PLATFORM ACCESS</p>
            <h2 id="final-title">Global visibility. Controlled access.</h2>
            <p>Use the secure workspace for authenticated operations, or inspect an issuer-authorised disclosure through the public verifier.</p>
          </div>
          <div className="final-actions">
            <a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Secure portal ↗</a>
            <a className="button-secondary" href="https://mavericken777.github.io/Amanah/verify.html">Verify disclosure ↗</a>
          </div>
        </section>
      </main>

      <footer className="platinum-footer">
        <div>
          <strong>GLOBAL HALAL SUPPLY CHAIN LIMITED</strong>
          <span>全球清真供應鏈有限公司 · سلسلة التوريد العالمية للحلال</span>
        </div>
        <p>AI assists. Authorised humans and competent authorities decide.</p>
      </footer>
    </div>
  );
}
