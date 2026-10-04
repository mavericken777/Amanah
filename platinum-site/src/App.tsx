import { useMemo, useState } from "react";

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

const labStages = [
  ["Sample registered", "Sample identity is bound to the exact product, SKU, batch or case before testing begins."],
  ["Custody accepted", "Seal, handoff, actor and timestamp evidence preserve the sample chain."],
  ["Method / QC", "The laboratory records method scope, controls, instrument context and quality checks."],
  ["Result reviewed", "Technical review and authorised signature convert a laboratory result into attributable evidence."],
  ["Evidence attached", "AHTE binds the signed laboratory evidence to the relevant control without turning the result into certification."],
];

const auditStages = [
  ["Scope", "Confirm facility, process, product scope, applicable controls and assigned auditor."],
  ["Observe", "Capture attributable evidence against the identified object or control point."],
  ["Assess", "AI may flag gaps or contradictions; the human auditor owns the assessment and finding."],
  ["Correct", "Assign corrective action, due date, accountable owner and supporting evidence."],
  ["Re-verify", "Retest the affected control and preserve the superseding evidence trail before closure."],
];

const commandEvents = [
  {
    id: "EX-01",
    title: "Custody exception",
    severity: "HIGH",
    object: "Container / seal",
    state: "HOLD",
    action: "Confirm seal event, assess blast radius and route to logistics owner.",
  },
  {
    id: "EX-02",
    title: "Evidence expiry",
    severity: "MEDIUM",
    object: "Supplier certificate",
    state: "CORRECTIVE-ACTION",
    action: "Request current evidence and suspend affected dependency until re-verified.",
  },
  {
    id: "EX-03",
    title: "Route deviation",
    severity: "HIGH",
    object: "Shipment",
    state: "QUARANTINED",
    action: "Correlate geofence, custody and condition evidence before next operational decision.",
  },
];

const connectors = [
  ["Direct JAKIM API", "PENDING AUTHORIZATION", "AHTE ⇄ Direct JAKIM API ⇄ JAKIM"],
  ["Laboratory connector", "SANDBOX / CONTRACT READY", "Sample, custody, method/QC, result, review and signed evidence"],
  ["Sinotrans connector", "SANDBOX / CONTRACT READY", "Warehouse, TMS/WMS, telemetry, container, seal and custody events"],
  ["Port / customs adapters", "PENDING AUTHORIZATION", "REST / SOAP / XML / EDI / CSV / SFTP / MQ / webhooks / batch"],
  ["Finance / Takaful", "PENDING AUTHORIZATION", "Purpose-bound evidence packets and externally owned case decisions"],
];

export default function App() {
  const [activeCorridor, setActiveCorridor] = useState(0);
  const [activeLab, setActiveLab] = useState(0);
  const [activeAudit, setActiveAudit] = useState(0);
  const [activeEvent, setActiveEvent] = useState(0);
  const [verifyQuery, setVerifyQuery] = useState("");

  const verifyPreview = useMemo(() => {
    const trimmed = verifyQuery.trim();
    if (!trimmed) {
      return {
        title: "No disclosure selected",
        state: "AWAITING ISSUER TOKEN",
        detail: "Public verification requires an issuer-authorised disclosure token or QR link. Private factory records are not searchable here.",
      };
    }
    return {
      title: "Illustrative verification preview",
      state: "DEMO ONLY",
      detail: `“${trimmed.slice(0, 42)}${trimmed.length > 42 ? "…" : ""}” has not been sent to a live verification service. This preview demonstrates the disclosure UX only.`,
    };
  }, [verifyQuery]);

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
          <a href="#assurance">Assurance</a>
          <a href="#command">Command Center</a>
          <a href="#verify">Verify</a>
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
                <span /><span /><span /><span /><span />
              </div>
              <small>Illustrative architecture state · no live shipment or sovereign release data.</small>
            </article>
          </div>
        </section>

        <section className="section assurance-section" id="assurance">
          <div className="section-heading">
            <p className="eyebrow">04 / LABORATORY + SMART AUDIT</p>
            <h2>Evidence becomes useful when its chain is inspectable.</h2>
            <p>Laboratory science and audit observations remain distinct evidence streams. Neither independently creates Halal certification.</p>
          </div>

          <div className="assurance-grid">
            <article className="assurance-panel glass" id="laboratory">
              <div className="panel-head">
                <span className="eyebrow">LABORATORY EVIDENCE CHAIN</span>
                <span className="state-chip">NOT_DETECTED ≠ HALAL</span>
              </div>
              <div className="stepper" role="tablist" aria-label="Laboratory evidence stages">
                {labStages.map(([title], index) => (
                  <button
                    key={title}
                    type="button"
                    role="tab"
                    aria-selected={activeLab === index}
                    className={activeLab === index ? "active" : ""}
                    onClick={() => setActiveLab(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>{title}
                  </button>
                ))}
              </div>
              <div className="step-detail" role="tabpanel" aria-live="polite">
                <small>STAGE {String(activeLab + 1).padStart(2, "0")}</small>
                <h3>{labStages[activeLab][0]}</h3>
                <p>{labStages[activeLab][1]}</p>
              </div>
            </article>

            <article className="assurance-panel glass" id="smart-audit">
              <div className="panel-head">
                <span className="eyebrow">SMART AUDIT / CAPA</span>
                <span className="state-chip">HUMAN ASSESSMENT</span>
              </div>
              <div className="stepper" role="tablist" aria-label="Smart audit stages">
                {auditStages.map(([title], index) => (
                  <button
                    key={title}
                    type="button"
                    role="tab"
                    aria-selected={activeAudit === index}
                    className={activeAudit === index ? "active" : ""}
                    onClick={() => setActiveAudit(index)}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>{title}
                  </button>
                ))}
              </div>
              <div className="step-detail" role="tabpanel" aria-live="polite">
                <small>STAGE {String(activeAudit + 1).padStart(2, "0")}</small>
                <h3>{auditStages[activeAudit][0]}</h3>
                <p>{auditStages[activeAudit][1]}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section command-section" id="command">
          <div className="section-heading">
            <p className="eyebrow">05 / 24/7 COMMAND CENTER</p>
            <h2>Exceptions need ownership, not decoration.</h2>
            <p>The Command Center separates observation, assessment, hold state, accountable action and re-verification.</p>
          </div>
          <div className="command-grid">
            <div className="event-list" role="tablist" aria-label="Illustrative exception events">
              {commandEvents.map((event, index) => (
                <button
                  key={event.id}
                  type="button"
                  role="tab"
                  aria-selected={activeEvent === index}
                  className={activeEvent === index ? "active" : ""}
                  onClick={() => setActiveEvent(index)}
                >
                  <span className={`severity severity-${event.severity.toLowerCase()}`}>{event.severity}</span>
                  <strong>{event.title}</strong>
                  <small>{event.object}</small>
                </button>
              ))}
            </div>
            <article className="command-detail glass" role="tabpanel" aria-live="polite">
              <div className="command-head">
                <span>{commandEvents[activeEvent].id}</span>
                <span className="state-chip">{commandEvents[activeEvent].state}</span>
              </div>
              <h3>{commandEvents[activeEvent].title}</h3>
              <p>{commandEvents[activeEvent].action}</p>
              <div className="decision-ladder">
                <span>D0 ingest</span><span>D1 control</span><span>D2 assess</span><span>D3 recommend</span><span>D4 hold</span><span>D5 authority</span><span>D6 sovereign</span>
              </div>
              <small>Illustrative event only · no live telemetry, shipment, authority or customs decision.</small>
            </article>
          </div>
        </section>

        <section className="section verify-section" id="verify">
          <div className="section-heading">
            <p className="eyebrow">06 / PUBLIC VERIFICATION</p>
            <h2>Reveal only what the issuer has authorised.</h2>
            <p>Product, batch and shipment disclosures are purpose-bound. Public verification is not a search engine for confidential factory data.</p>
          </div>
          <div className="verify-grid">
            <form className="verify-form glass" onSubmit={(event) => event.preventDefault()}>
              <label htmlFor="verify-token">Verification token or issuer-authorised QR value</label>
              <input
                id="verify-token"
                value={verifyQuery}
                onChange={(event) => setVerifyQuery(event.target.value)}
                placeholder="Paste a token to preview the disclosure experience"
                autoComplete="off"
              />
              <p>No value entered here is sent to a live authority or production verifier in this isolated website build.</p>
              <div className="qr-schematic" aria-hidden="true">
                {Array.from({ length: 36 }, (_, index) => <i key={index} className={index % 3 === 0 || index % 7 === 0 ? "on" : ""} />)}
              </div>
            </form>
            <article className="verify-result glass" aria-live="polite">
              <span className="eyebrow">DISCLOSURE STATE</span>
              <h3>{verifyPreview.title}</h3>
              <strong>{verifyPreview.state}</strong>
              <p>{verifyPreview.detail}</p>
              <dl>
                <div><dt>Evidence integrity</dt><dd>Issuer signature + provenance required</dd></div>
                <div><dt>Authority status</dt><dd>Separate from AHTE trust state</dd></div>
                <div><dt>Scope</dt><dd>Product / batch / shipment as authorised</dd></div>
              </dl>
              <a href="https://mavericken777.github.io/Amanah/verify.html">Open current public verifier ↗</a>
            </article>
          </div>
        </section>

        <section className="section connector-section" id="connectors">
          <div className="section-heading">
            <p className="eyebrow">07 / CONNECTOR READINESS</p>
            <h2>Complete interfaces now. Activate external systems without redesign.</h2>
            <p>Connector state is explicit so architecture readiness is never confused with production authorisation.</p>
          </div>
          <div className="connector-table glass" role="table" aria-label="Connector readiness">
            <div className="connector-row connector-head" role="row">
              <span role="columnheader">Interface</span><span role="columnheader">State</span><span role="columnheader">Scope</span>
            </div>
            {connectors.map(([name, state, scope]) => (
              <div className="connector-row" role="row" key={name}>
                <strong role="cell">{name}</strong>
                <span role="cell" className="state-chip">{state}</span>
                <p role="cell">{scope}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="pathways">
          <div className="section-heading">
            <p className="eyebrow">08 / PARTICIPANT PATHWAYS</p>
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
            <p className="eyebrow">09 / SECURE PLATFORM ACCESS</p>
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
