import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { SmoothScroll } from "./components/motion/SmoothScroll";
import { CircuitMapBackground } from "./components/hero/CircuitMapBackground";
import { HalalShield3D } from "./components/hero/HalalShield3D";
const ScrollProgress = lazy(() => import("./components/motion/ScrollProgress").then(module => ({ default: module.ScrollProgress })));
const TrustTerminal = lazy(() => import("./components/terminal/TrustTerminal").then(module => ({ default: module.TrustTerminal })));
const VerificationJourney = lazy(() => import("./components/journey/VerificationJourney").then(module => ({ default: module.VerificationJourney })));

function ScrollProgressOnIntent() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.scrollY > 0) {
      setEnabled(true);
      return;
    }
    const enable = () => setEnabled(true);
    window.addEventListener("scroll", enable, { once: true, passive: true });
    return () => window.removeEventListener("scroll", enable);
  }, []);

  return enabled ? (
    <Suspense fallback={null}>
      <ScrollProgress />
    </Suspense>
  ) : null;
}

function DeferredFeature({ id, minHeight, children }: { id: string; minHeight: number; children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (!("IntersectionObserver" in window)) {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: "720px 0px" });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <div id={id} ref={hostRef} className="deferred-feature" aria-busy={!ready} style={{ minHeight: `${minHeight}px` }}>
      {ready ? children : null}
    </div>
  );
}

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
  ["Source & suppliers", "Map farms, raw materials, supplier identity, origin documents and approved source relationships before the product enters a controlled factory.", "Supplier and manufacturer", "Source identity, supplier documents, material lot and custody events", "Qualified source record → receiving and formulation"],
  ["Factory & product setup", "Register the entity, facility, production line, SKU, ingredients, packaging and process scope. Map applicable requirements to each product and market.", "Manufacturer quality / Halal team", "Facility and line profile, product formula, supplier links, control plan and training", "Applicable controls → sampling and audit"],
  ["Laboratory evidence", "Register a sealed, identified sample against the exact product and batch; record collection, custody, method, QC, review and signed result.", "China Food Security & Innovation Laboratory / authorised laboratory", "Sample ID, seal, custody, method and QC record, signed report and evidence link", "Reviewed scientific evidence → audit and product control"],
  ["Smart-glasses audit", "Guide an auditor through the scoped checklist in the factory. AI can surface relevant controls and flag gaps; the auditor observes, assesses and signs.", "Assigned human auditor", "Control reference, actor, timestamp, object, observation, photo or document evidence, signature", "Verified audit evidence → findings or scope recommendation"],
  ["Controlled production", "Bind approved inputs, line status, cleaning and sertu records where applicable, operator training, production run and lot genealogy.", "Manufacturer production / quality", "Material consumption, process events, cleaning evidence, line and batch links", "Batch genealogy → finished-goods release review"],
  ["Manufacturer warehouse", "Prepare dispatch by lot, pallet and package. Confirm identity, segregation, status, seal, loading and accountable handover.", "Manufacturer warehouse and carrier", "Pick / pack, pallet IDs, segregation, seal, vehicle, handover actor and time", "Custody transfer → Sinotrans receiving"],
  ["Sinotrans warehouse", "Receive, scan, assign storage location and monitor the shipment under the configured Halal logistics control plan.", "Sinotrans warehouse operator", "Inbound condition, location, segregation, cleaning, temperature, access and outbound events", "Warehouse custody → transport planning"],
  ["China → GCC transport", "Bind vehicle, container and seal; capture location and condition events; raise exceptions and hold affected scope for accountable review.", "Sinotrans transport operations", "Vehicle / container / seal identity, route, telemetry, handovers and exception actions", "In-transit custody → origin port"],
  ["Origin port & export", "Present the shipment and authorised records to origin-port and export processes. Inspection, customs acceptance and release remain external decisions.", "Origin port, customs and exporter", "Manifest references, seal check, inspection events, authority responses and release evidence", "Authorised export handoff → GCC port"],
  ["GCC port & import", "Resolve the authorised disclosure, process destination inspections, holds and import steps, then capture the authority-owned outcome.", "GCC port, customs and importer", "Arrival, custody, inspection, import documents, holds and official release record", "Sovereign import outcome → destination receiving"],
  ["GCC receiving & distribution", "Reconcile received lots, condition and seals; place stock into controlled storage; preserve custody across distributors and retailers.", "Importer, distributor and retailer", "Receipt reconciliation, storage location, onward dispatch and discrepancy records", "Verified receiving record → buyer or retail disclosure"],
  ["Consumer verification & response", "Let a buyer scan an issuer-authorised QR disclosure. If evidence changes, trace affected lots, notify accountable operators and coordinate recall action.", "Issuer, authorised buyer and responsible operator", "Purpose-bound disclosure, current trust state, event history and recall links", "Post-market signal → investigation and corrective action"],
];

const pathways = [
  ["Manufacturer", "Onboard enterprise, facility, products, suppliers and evidence."],
  ["Laboratory", "Bind scientific evidence to exact samples, methods and signed results."],
  ["Logistics", "Connect warehouse, vehicle, container, seal and custody events."],
  ["Authority", "Review evidence through the direct authority-connectivity path."],
  ["Buyer / Retail", "Inspect issuer-authorised product, batch or shipment disclosures."],
];

const labStages = [
  ["Sample registered", "Give the sample a unique ID and bind it to the exact product, SKU and batch. Record collector, time, seal and sampling basis before analysis."],
  ["Custody accepted", "The receiving analyst confirms identity, seal condition and handover. Each custodian, timestamp and condition is linked to the same sample record."],
  ["Method & quality controls", "The China Food Security & Innovation Laboratory records selected method, scope, instrument context, controls and QC. Applicable product requirements map to controlled MS 1500:2019 references; method and laboratory scope are confirmed for each test."],
  ["Technical review & signature", "An authorised reviewer checks the result against the method, QC and sample chain, then signs the report. A laboratory result is scientific evidence; it does not issue Halal certification."],
  ["Evidence bound to product", "AHTE attaches the signed report to the relevant product, batch and control with provenance. “Not detected” is not equivalent to “Halal”; the competent authority's decision remains separate."],
];

const auditStages = [
  ["Scope & prepare", "Select facility, production line, SKU, process and applicable controls. Smart glasses show the approved checklist and required evidence at each control."],
  ["Guided observation", "At the control point, the wearable view guides the auditor to the relevant area and captures an attributable image, note or reading against the identified object."],
  ["AI assistance in context", "AI can organise observations, read permitted labels and flag a possible gap or contradiction. It offers prompts for the auditor to assess; it does not declare a product Halal or make an authority decision."],
  ["Human assessment & audit proof", "The auditor confirms and signs the observation. The record binds control ID, product or facility object, human actor, timestamp, source media and integrity reference. This is an auditable inspection record, not a certificate by itself."],
  ["CAPA & re-verification", "Assign findings to an accountable owner with a due date and corrective evidence. Revisit the affected control and route any certification decision through the competent authority."],
];

const monitorStages = [
  ["Capture", "Temperature, door, seal, GNSS, warehouse and production events are associated with the relevant asset, lot and time. The physical sensor and source remain identifiable."],
  ["Validate at edge", "A gateway checks device identity, timestamp and payload shape; buffers events during network loss and protects the event before forwarding."],
  ["Bind the evidence", "The platform correlates sensor observations with product, batch, vehicle, container, seal, route, custody actor and applicable control."],
  ["Apply controls", "Configured limits and rule checks identify a suspected breach, missing handover or conflicting record. A finding retains its rule, source event and affected scope."],
  ["Assess & predict", "Command Center operators see the affected chain and possible blast radius. AI can prioritise signals and recommend prevention; its output is attributed and reviewable."],
  ["Hold & escalate", "An authorised operational role may place a scoped D4 hold and assign an owner. Certification, customs and sovereign D5/D6 decisions stay with competent authorities."],
  ["Correct & close", "The owner attaches corrective evidence; a reviewer re-verifies the control and records disposition. Only the appropriate accountable actor advances the next state."],
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
  const [activeMonitor, setActiveMonitor] = useState(0);
  const [verifyQuery, setVerifyQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
      <SmoothScroll />
      <ScrollProgressOnIntent />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="platinum-header glass">
        <a className="identity" href="#top" aria-label="Global Halal Supply Chain Limited home">
          <span className="identity-mark" aria-hidden="true">
            <svg viewBox="0 0 120 140" focusable="false">
              <defs><linearGradient id="brand-gold" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#F2D78D"/><stop offset=".52" stopColor="#D4AF5F"/><stop offset="1" stopColor="#8E641F"/></linearGradient></defs>
              <path d="M60 5 110 25v39c0 33-20 56-50 71C30 120 10 97 10 64V25L60 5Z" fill="#090909" stroke="url(#brand-gold)" strokeWidth="3"/>
              <path d="M60 13 102 30v34c0 28-16 48-42 62C34 112 18 92 18 64V30l42-17Z" fill="none" stroke="url(#brand-gold)" strokeWidth="1.4"/>
              <path d="M60 24 91 37v27c0 21-12 36-31 47C41 100 29 85 29 64V37l31-13Z" fill="none" stroke="#D4AF5F" strokeWidth="1" opacity=".72"/>
              <circle cx="60" cy="63" r="25" fill="none" stroke="url(#brand-gold)" strokeWidth="1.2"/>
              <circle cx="60" cy="63" r="20" fill="none" stroke="#D4AF5F" strokeWidth=".8" opacity=".7"/>
              <path d="m60 37 6 9 11-3-3 11 9 9-9 6 3 11-11-3-6 9-6-9-11 3 3-11-9-6 9-9-3-11 11 3 6-9Z" fill="none" stroke="url(#brand-gold)" strokeWidth="1.1"/>
              <path d="M41 44c7 4 10 10 9 16-7-3-12-3-17 0 1-7 3-12 8-16Zm38 0c-7 4-10 10-9 16 7-3 12-3 17 0-1-7-3-12-8-16ZM41 82c7-4 10-10 9-16-7 3-12 3-17 0 1 7 3 12 8 16Zm38 0c-7-4-10-10-9-16 7 3 12 3 17 0-1 7-3 12-8 16Z" fill="none" stroke="#D4AF5F" strokeWidth="1"/>
              <circle cx="60" cy="63" r="15" fill="#090909" stroke="url(#brand-gold)" strokeWidth="1.2"/>
              <text x="60" y="68" textAnchor="middle" fill="#F2D78D" fontFamily="serif" fontSize="11" fontWeight="700">حلال</text>
              <path d="M34 102c8 7 17 12 26 17 9-5 18-10 26-17" fill="none" stroke="#D4AF5F" strokeWidth="1" opacity=".7"/>
            </svg>
          </span>
          <span className="identity-copy">
            <strong>GLOBAL HALAL SUPPLY CHAIN LIMITED</strong>
            <small>AMANAH · GLOBAL HALAL DIGITAL TRUST · HONG KONG</small>
          </span>
        </a>
        <button
          type="button"
          className="mobile-menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen(value => !value)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
        </button>
        <nav id="primary-nav" aria-label="Primary navigation" className={menuOpen ? "open" : ""}>
          <a href="#trust" onClick={() => setMenuOpen(false)}>Trust model</a>
          <a href="#corridor" onClick={() => setMenuOpen(false)}>Goods journey</a>
          <a href="#assurance" onClick={() => setMenuOpen(false)}>Audit &amp; lab</a>
          <a href="#command" onClick={() => setMenuOpen(false)}>Command Center</a>
          <a href="#monitoring" onClick={() => setMenuOpen(false)}>Monitoring</a>
          <a href="#partners" onClick={() => setMenuOpen(false)}>Partners</a>
          <a href="#verify" onClick={() => setMenuOpen(false)}>Verify</a>
        </nav>
        <a className="header-cta" href="https://amanah-yq9x.vercel.app/login">Secure portal ↗</a>
      </header>

      <main id="main">
        <section className="hero hero-phase4" id="top" aria-labelledby="hero-title">
          <CircuitMapBackground />
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">GLOBAL HALAL DIGITAL TRUST &amp; TRADE INFRASTRUCTURE</p>
              <h1 id="hero-title">Evidence before trust.<br /><em>Trust before release.</em></h1>
              <p className="hero-principle">A Halal assurance journey you can inspect, stage by stage.</p>
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
              <div className="shield-orbit">
                <span className="orbit orbit-one" aria-hidden="true" />
                <span className="orbit orbit-two" aria-hidden="true" />
                <HalalShield3D />
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

        <section className="section institutional-section" id="institutions">
          <div className="section-heading">
            <p className="eyebrow">02 / INSTITUTIONAL STRUCTURE</p>
            <h2>One ecosystem. Four clearly separated roles.</h2>
            <p>The operating model keeps governance, international operations, digital trust and competent-authority decisions visible rather than blending them into one platform claim.</p>
          </div>
          <div className="institution-grid">
            <article className="institution-card glass">
              <span>PHC</span>
              <h3>Perak Halal Corporation</h3>
              <p>Perak State Government halal-industry GLC supporting halal-industry development, governance and international ecosystem coordination.</p>
            </article>
            <article className="institution-card glass">
              <span>GHSCL HK</span>
              <h3>Global Halal Supply Chain Limited</h3>
              <p>International operating and digital-infrastructure vehicle for China → GCC coordination and 24/7 Command Center operations.</p>
            </article>
            <article className="institution-card glass">
              <span>AHTE</span>
              <h3>Amanah Halal Trust Ecosystem</h3>
              <p>Standards, applicability, controls, evidence, digital twins, custody, AI-assisted assurance, exceptions and trust-state orchestration.</p>
            </article>
            <article className="institution-card authority-card glass">
              <span>AUTHORITY</span>
              <h3>AHTE ⇄ Direct JAKIM API ⇄ JAKIM</h3>
              <p>Formal Halal certification and D5/D6 authority decisions remain with authorised humans and the competent authority.</p>
            </article>
          </div>
        </section>

        <section className="section trust-section" id="trust">
          <div className="section-heading">
            <p className="eyebrow">03 / CANONICAL TRUST PATH</p>
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
            <p className="eyebrow">04 / CHINA → GCC DIRECT</p>
            <h2>Follow every product handoff from factory to GCC consumer.</h2>
            <p>Choose a stage to see who acts, what evidence is created and what must be true before custody moves forward. The physical pilot corridor is China → GCC direct; Malaysia is the governance, assurance and authority-connectivity plane.</p>
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
              <p className="eyebrow">CURRENT HANDOFF · {String(activeCorridor + 1).padStart(2, "0")} / {String(corridor.length).padStart(2, "0")}</p>
              <h3>{corridor[activeCorridor][0]}</h3>
              <p>{corridor[activeCorridor][1]}</p>
              <div className="journey-progress" aria-label={`Stage ${activeCorridor + 1} of ${corridor.length}`}><div className="journey-progress-label"><span>GOODS JOURNEY</span><strong>{String(activeCorridor + 1).padStart(2, "0")} / {String(corridor.length).padStart(2, "0")}</strong></div><div className="journey-progress-track"><span style={{ width: `${((activeCorridor + 1) / corridor.length) * 100}%` }} /></div></div>
              <dl className="journey-evidence"><div><dt>Accountable owner</dt><dd>{corridor[activeCorridor][2]}</dd></div><div><dt>Evidence at this handoff</dt><dd>{corridor[activeCorridor][3]}</dd></div><div><dt>Next accountable handoff</dt><dd>{corridor[activeCorridor][4]}</dd></div></dl>
              <small>Interactive architecture walkthrough · no live shipment or sovereign release data.</small>
            </article>
          </div>
          <div className="standards-note standards-map"><strong>Standards in the operating model</strong><span>Food and manufacturing controls: MS 1500:2019. Transport: MS 2400-1:2019. Warehousing: MS 2400-2:2019. Retailing: MS 2400-3:2019. The platform maps licensed, controlled requirements to evidence; an operator’s conformity is established through scope, records and competent review.</span><a href="https://www.jsm.gov.my/announcement/781-kelulusan-malaysian-standards-ms-bil-5-2024" target="_blank" rel="noreferrer">View Standards Malaysia revision notice ↗</a></div>
        </section>

        <section className="section assurance-section" id="assurance">
          <div className="section-heading">
            <p className="eyebrow">05 / LABORATORY + SMART AUDIT</p>
            <h2>Evidence becomes useful when its chain is inspectable.</h2>
            <p>Laboratory science and audit observations remain distinct evidence streams. Neither independently creates Halal certification.</p>
          </div>

          <div className="assurance-grid">
            <article className="assurance-panel glass" id="laboratory">
              <div className="panel-head">
                <span className="eyebrow">CHINA FOOD SECURITY &amp; INNOVATION LABORATORY</span>
                <span className="state-chip">EVIDENCE · NOT CERTIFICATION</span>
              </div>
              <p className="partner-intro">Sample intake → sealed custody → method and QC → technical review → signed report → product evidence.</p>
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
                <small>LAB EVIDENCE · STAGE {String(activeLab + 1).padStart(2, "0")}</small>
                <h3>{labStages[activeLab][0]}</h3>
                <p>{labStages[activeLab][1]}</p>
              </div>
              <div className="standards-note"><strong>Standards mapping</strong><span>MS 1500:2019 · Halal food — general requirements. The applicable requirement links to its control and evidence through a licensed, controlled source; normative clauses are not reproduced here.</span>
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
                <small>SMART-GLASSES AUDIT · STAGE {String(activeAudit + 1).padStart(2, "0")}</small>
                <h3>{auditStages[activeAudit][0]}</h3>
                <p>{auditStages[activeAudit][1]}</p>
              </div>
              <div className="smart-glasses-demo" aria-label="Simulated smart-glasses audit overlay"><div className="smart-glasses-view"><span>FIELD VIEW · DEMONSTRATION</span><strong>CONTROL {String(activeAudit + 1).padStart(2, "0")} / {auditStages[activeAudit][0].toUpperCase()}</strong><i className="view-reticle" aria-hidden="true" /><small>AI GUIDE · REVIEW REQUIRED</small></div><div className="smart-glasses-proof"><span>INSPECTION RECORD</span><strong>Object · actor · time · evidence</strong><p>Auditor confirms and signs each observation. The audit trail supports assurance review; it does not itself confer certification.</p></div></div>
            </article>
          </div>
        </section>

        <section className="section command-section" id="command">
          <div className="section-heading">
            <p className="eyebrow">06 / 24/7 COMMAND CENTER</p>
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

        <section className="section monitoring-section" id="monitoring">
          <div className="section-heading">
            <p className="eyebrow">07 / CONTINUOUS MONITORING · FULL STACK</p>
            <h2>One signal. A traceable response across the whole chain.</h2>
            <p>Explore how an event moves from sensor to accountable closure: source, edge, evidence, controls, Command Center, authorised action and re-verification.</p>
          </div>
          <div className="monitoring-layout">
            <div className="monitoring-nav" role="tablist" aria-label="End-to-end monitoring stages">
              {monitorStages.map(([title], index) => <button key={title} type="button" role="tab" aria-selected={activeMonitor === index} className={activeMonitor === index ? "active" : ""} onClick={() => setActiveMonitor(index)}><span>{String(index + 1).padStart(2, "0")}</span>{title}</button>)}
            </div>
            <article className="monitoring-detail glass" role="tabpanel" aria-live="polite">
              <p className="eyebrow">MONITORING LAYER {String(activeMonitor + 1).padStart(2, "0")} / {String(monitorStages.length).padStart(2, "0")}</p>
              <h3>{monitorStages[activeMonitor][0]}</h3>
              <p>{monitorStages[activeMonitor][1]}</p>
              <div className="monitoring-chain" aria-label="Sensor to response architecture">{["Sensor", "Edge", "Evidence", "Rules", "Command", "Human / authority"].map((label, index) => <span className={index <= Math.min(activeMonitor, 5) ? "reached" : ""} key={label}>{label}</span>)}</div>
              <small>Illustrative platform flow · real telemetry, connected counterparties and production credentials are not represented by this walkthrough.</small>
            </article>
          </div>
        </section>

        <section className="section verify-section" id="verify">
          <div className="section-heading">
            <p className="eyebrow">08 / PUBLIC VERIFICATION</p>
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
            <p className="eyebrow">09 / CONNECTOR READINESS</p>
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

        <section className="section partner-section" id="partners">
          <div className="section-heading">
            <p className="eyebrow">10 / PARTNER + TRADE ENABLEMENT</p>
            <h2>Connect operational evidence to the organisations that need it.</h2>
            <p>Each partner receives a purpose-bound view while retaining its own mandate, contractual responsibility and decision authority.</p>
          </div>
          <div className="partner-grid">
            {[
              ["China manufacturers", "Enterprise, facility, product, supplier, raw-material and production evidence."],
              ["Laboratories", "Sample, custody, method/QC, result, review and signed evidence."],
              ["Sinotrans", "Warehouse, TMS/WMS, telemetry, container, seal and custody events."],
              ["Ports / customs", "Authorised trust resolution; inspection, hold and sovereign release remain externally owned."],
              ["GCC import / retail", "Receiving, warehouse, distribution, retail and issuer-authorised verification."],
              ["Islamic finance / Takaful", "Purpose-bound evidence packets; financing, underwriting and claims decisions remain with approved providers."],
            ].map(([title, text]) => (
              <article className="partner-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="pathways">
          <div className="section-heading">
            <p className="eyebrow">11 / PARTICIPANT PATHWAYS</p>
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

        <DeferredFeature id="terminal" minHeight={650}>
          <Suspense fallback={<p className="feature-loading" role="status">Loading interactive trust terminal…</p>}>
            <TrustTerminal sectionId="" />
          </Suspense>
        </DeferredFeature>

        <DeferredFeature id="verification-journey" minHeight={680}>
          <Suspense fallback={<p className="feature-loading" role="status">Loading verification journey…</p>}>
            <VerificationJourney sectionId="" />
          </Suspense>
        </DeferredFeature>

        <section className="section engagement-section" id="engage">
          <div className="section-heading">
            <p className="eyebrow">12 / ENGAGEMENT</p>
            <h2>Start from the role, corridor or integration you actually control.</h2>
            <p>Use the secure Amanah workspace for authenticated operations. Use the current public site for corporate profile, onboarding context and disclosure verification.</p>
          </div>
          <div className="engagement-grid">
            <a className="engagement-card glass" href="https://amanah-yq9x.vercel.app/login">
              <span>SECURE WORKSPACE</span><strong>Open Amanah</strong><small>Authenticated operations ↗</small>
            </a>
            <a className="engagement-card glass" href="https://mavericken777.github.io/Amanah/corporate-profile.html">
              <span>INSTITUTIONAL</span><strong>Corporate profile</strong><small>GHSCL ecosystem profile ↗</small>
            </a>
            <a className="engagement-card glass" href="https://mavericken777.github.io/Amanah/manufacturers.html">
              <span>MANUFACTURER</span><strong>Start onboarding</strong><small>Prepare enterprise readiness ↗</small>
            </a>
            <a className="engagement-card glass" href="https://mavericken777.github.io/Amanah/verify.html">
              <span>PUBLIC TRUST</span><strong>Verify disclosure</strong><small>Issuer-authorised evidence ↗</small>
            </a>
          </div>
          <p className="engagement-note">English is the controlling public language for this build. Chinese and Arabic corporate identity lines are present; full translated operational content is not represented as complete until reviewed translations are source-controlled.</p>
        </section>

        <section className="final-cta glass" aria-labelledby="final-title">
          <div>
            <p className="eyebrow">12 / SECURE PLATFORM ACCESS</p>
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
