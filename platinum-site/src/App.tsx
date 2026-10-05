import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { SmoothScroll } from "./components/motion/SmoothScroll";
import { HalalShield3D } from "./components/hero/HalalShield3D";
import { demoProduct, demoVerificationRecords, demoJourneyStages } from "./data/demoJourney";
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

const corridor = demoJourneyStages;

const standardsTopics = ["Supplier and material scope", "Facility and product controls", "Sample and laboratory evidence", "Audit and human assessment", "Controlled production", "Warehouse dispatch", "Warehouse receiving and storage", "Transport custody", "Export handoff", "Import and release", "Destination distribution", "Consumer disclosure"];

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
  ["Method & quality controls", "The selected laboratory records method, scope, instrument context, controls and QC. Applicable requirements map to controlled MS 1500:2019 references; the method and laboratory scope must be confirmed for each test."],
  ["Technical review & signature", "An authorised reviewer checks the result against the method, QC and sample chain, then signs the report. The report becomes scientific evidence for the relevant product and control review."],
  ["Evidence bound to product", "AHTE attaches the signed report to the relevant product, batch and control with provenance. A test finding is considered alongside ingredients, process, handling and the applicable authority review."],
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
  ["Hold & escalate", "A scoped operational hold preserves the affected lot or shipment while the accountable owner investigates, escalates the event and attaches corrective evidence."],
  ["Correct & close", "The owner attaches corrective evidence; a reviewer re-verifies the control and records disposition. Only the appropriate accountable actor advances the next state."],
];

const verificationRecords = demoVerificationRecords;

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


export default function App() {
  const [activeCorridor, setActiveCorridor] = useState(0);
  const [journeyPerspective, setJourneyPerspective] = useState<"journey" | "actor" | "standards" | "trust">("journey");
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
    const trimmed = verifyQuery.trim().toUpperCase();
    if (!trimmed) {
      return { title: "Choose a product journey", state: "READY TO EXPLORE", detail: "Enter a reference or select a demonstration record to follow identity, assurance and cold-chain custody.", events: [] as Array<[string, string]> };
    }
    const record = verificationRecords.find(item => item.token === trimmed);
    if (record) {
      return { title: record.product, state: "ILLUSTRATIVE PASSPORT", detail: `${record.token} · Batch ${record.batch}`, events: record.events };
    }
    return { title: "No matching record", state: "CHECK THE REFERENCE", detail: "Select one of the demonstration references below, or enter an issuer-provided product passport code.", events: [] as Array<[string, string]> };
  }, [verifyQuery]);

  return (
    <div className="platinum-shell">
      <SmoothScroll />
      <ScrollProgressOnIntent />
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="platinum-header glass">
        <a className="identity" href="#top" aria-label="Global Halal Supply Chain Limited home">
          <span className="identity-mark" aria-hidden="true"><img src="media/ghscl-favicon.png" alt="" /></span>
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
          <a href="#passport-route-gold" onClick={() => setMenuOpen(false)}>Trust passport</a>
          <a href="#assurance" onClick={() => setMenuOpen(false)}>Audit &amp; lab</a>
          <a href="#command" onClick={() => setMenuOpen(false)}>Command Center</a>
          <a href="#verify" onClick={() => setMenuOpen(false)}>Verify</a>
          <a href="#partners" onClick={() => setMenuOpen(false)}>Partners</a>
        </nav>
        <details className="site-nav-menu">
          <summary>Explore</summary>
          <div className="site-nav-menu-panel">
            <a href="ecosystem.html">Complete ecosystem</a>
            <a href="corporate-profile.html">Corporate profile</a>
            <a href="digital-trust.html">Digital trust</a>
            <a href="traceability.html">Traceability</a>
            <a href="smart-audit.html">Smart audit</a>
            <a href="china-gcc.html">China → GCC</a>
            <a href="command-center.html">Command Center</a>
            <a href="manufacturers.html">Manufacturers</a>
            <a href="partners.html">Partners</a>
            <a href="finance-takaful.html">Finance &amp; Takaful</a>
            <a href="visuals.html">Visual journey</a>
            <a href="contact.html">Contact</a>
            <a href="zh-Hant.html" lang="zh-Hant">繁體中文</a>
            <a href="ar.html" lang="ar" dir="rtl">العربية</a>
            <a href="login/index.html">Institutional access</a>
          </div>
        </details>
        <a className="header-cta" href="https://amanah-yq9x.vercel.app/login">Secure portal ↗</a>
      </header>

      <main id="main">
        <section className="hero hero-phase4" id="top" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">AMANAH · GLOBAL HALAL DIGITAL TRUST</p>
              <h1 id="hero-title">The infrastructure of trust.<br /><em>From origin to market.</em></h1>
              <p className="hero-principle">Every product carries evidence. Every handoff carries accountability.</p>
              <p className="hero-lede">
                Follow one continuous China → GCC product identity across manufacturer onboarding, materials, audit, laboratory evidence, production, custody, Sinotrans logistics, ports, GCC distribution and consumer verification—under accountable human and competent-authority governance.
              </p>
              <div className="hero-actions">
                <a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Open Amanah ↗</a>
                <a className="button-secondary" href="#terminal">Enter the trust journey ↓</a>
              </div>
            </div>

            <aside className="hero-terminal" aria-label="Amanah trust principles">
              <img className="brand-world-art" src="media/ghscl-worldmark.webp" alt="" aria-hidden="true" />
              <div className="terminal-head">
                <span>AMANAH / DIGITAL TRUST</span>
                <span>ONE PRODUCT · TRACEABLE HANDOFFS</span>
              </div>
              <div className="shield-orbit">
                <HalalShield3D />
              </div>
              <dl>
                <div><dt>Identity</dt><dd>One record across product and batch</dd></div>
                <div><dt>Evidence</dt><dd>Source, scope and review stay visible</dd></div>
                <div><dt>Custody</dt><dd>Each handoff carries its own event</dd></div>
                <div><dt>Authority</dt><dd>Certification remains a human decision</dd></div>
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
            <p>Choose a stage to see who acts, what evidence is created and what must be true before custody moves forward. The physical corridor is China → GCC direct; Malaysia is the governance, assurance and authority-connectivity plane.</p>
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
            </article>
          </div>
          <section className="journey-perspectives" aria-label="Explore the selected handoff in different views">
            <div className="journey-perspective-controls" role="group" aria-label="Journey view">
              {([
                ["journey", "Journey"],
                ["actor", "Actor"],
                ["standards", "Standards"],
                ["trust", "Trust record"],
              ] as const).map(([perspective, label]) => (
                <button key={perspective} type="button" aria-pressed={journeyPerspective === perspective} onClick={() => setJourneyPerspective(perspective)}>{label}</button>
              ))}
            </div>
            <div className="journey-perspective-panel glass" data-perspective={journeyPerspective} aria-live="polite">
              {journeyPerspective === "journey" ? <>
                <p className="eyebrow">ONE JOURNEY · ONE PRODUCT IDENTITY</p>
                <h3>{corridor[activeCorridor][0]}</h3>
                <p>Use the twelve handoffs and journey scrubber above to follow this same product from source to consumer.</p>
              </> : journeyPerspective === "actor" ? <>
                <p className="eyebrow">ACTOR VIEW · ACCOUNTABILITY STAYS WITH THE ACTOR</p>
                <h3>{corridor[activeCorridor][2]}</h3>
                <dl className="journey-evidence"><div><dt>Action</dt><dd>{corridor[activeCorridor][0]} · {corridor[activeCorridor][1]}</dd></div><div><dt>Evidence created or consumed</dt><dd>{corridor[activeCorridor][3]}</dd></div><div><dt>Next handoff</dt><dd>{corridor[activeCorridor][4]}</dd></div></dl>
              </> : journeyPerspective === "standards" ? <>
                <p className="eyebrow">STANDARDS VIEW · APPLICABILITY DEPENDS ON SCOPE</p>
                <h3>{standardsTopics[activeCorridor]}</h3>
                <dl className="journey-evidence"><div><dt>Control objective</dt><dd>{corridor[activeCorridor][1]}</dd></div><div><dt>Evidence</dt><dd>{corridor[activeCorridor][3]}</dd></div><div><dt>Responsible actor</dt><dd>{corridor[activeCorridor][2]}</dd></div></dl>
                <p className="standards-scope-note">Confirm the applicable instrument, edition and clause against the controlled source for this product, operator and market. Use the controlled source and competent review for the applicable scope, instrument and conformity decision.</p>
              </> : <>
                <p className="eyebrow">TRUST RECORD · SAME PRODUCT, CURRENT HANDOFF</p>
                <h3>{corridor[activeCorridor][0]}</h3>
                <dl className="journey-evidence"><div><dt>Journey ID</dt><dd>GHSC-DEMO-24001</dd></div><div><dt>Product batch</dt><dd>{demoProduct.batch}</dd></div><div><dt>Actor / event</dt><dd>{corridor[activeCorridor][2]} · {corridor[activeCorridor][0]}</dd></div><div><dt>Evidence reference</dt><dd>{corridor[activeCorridor][3]}</dd></div></dl>
                <p className="standards-scope-note">An integrity proof helps show that recorded content has not changed; it does not prove that the underlying claim is true.</p>
              </>}
            </div>
          </section>
          <section className="trust-passport glass" aria-labelledby="passport-title" data-stage={activeCorridor + 1}>
            <div className="passport-heading">
              <div>
                <p className="eyebrow">DIGITAL TRUST PASSPORT</p>
                <h3 id="passport-title">One product record. Every accountable handoff.</h3>
                <p>Follow how identity, evidence and custody build as the product moves from origin to market.</p>
              </div>
              <div className="passport-id"><span>JOURNEY ID</span><strong>GHSC-DEMO-24001</strong><small>China → GCC direct</small></div>
            </div>
            <div className="passport-body">
              <div className="passport-map" role="img" aria-label={`Journey marker at ${corridor[activeCorridor][0]} along the China to GCC route`}>
                <svg viewBox="0 0 700 190" aria-hidden="true">
                  <defs><linearGradient id="passport-route-gold" x1="0" x2="1"><stop stopColor="#8e682c"/><stop offset=".52" stopColor="#e9cb85"/><stop offset="1" stopColor="#b58a43"/></linearGradient></defs>
                  <path className="passport-route-base" d="M54 132 C198 22 492 22 646 132"/>
                  <path className="passport-route-progress" d="M54 132 C198 22 492 22 646 132" pathLength="100" style={{ strokeDasharray: "100", strokeDashoffset: `${100 - ((activeCorridor + 1) / corridor.length) * 100}` }} />
                  <circle className="passport-node" cx="54" cy="132" r="6"/><circle className="passport-node" cx="646" cy="132" r="6"/>
                  <circle className="passport-governance" cx="396" cy="71" r="5"/>
                  <circle className="passport-current" cx={54 + activeCorridor * (592 / (corridor.length - 1))} cy={132 - 60 * Math.sin(Math.PI * activeCorridor / (corridor.length - 1))} r="9"/>
                  <text x="42" y="165">CHINA · ORIGIN</text><text x="538" y="165">GCC · MARKET</text><text x="342" y="48">MALAYSIA · ASSURANCE</text>
                </svg>
              </div>
              <div className="passport-details">
                <div className="passport-detail">
                  <span>PRODUCT</span><strong>{demoProduct.name}</strong><small>Batch {demoProduct.batch}</small>
                </div>
                <div className="passport-detail">
                  <span>CURRENT HANDOFF · {String(activeCorridor + 1).padStart(2, "0")} / {String(corridor.length).padStart(2, "0")}</span><strong>{corridor[activeCorridor][0]}</strong><small>{corridor[activeCorridor][2]}</small>
                </div>
                <div className="passport-detail passport-evidence">
                  <span>EVIDENCE &amp; CUSTODY</span><strong>{corridor[activeCorridor][3]}</strong><small>Next: {corridor[activeCorridor][4]}</small>
                </div>
              </div>
            </div>
            <div className="passport-scrubber">
              <label htmlFor="journey-scrubber"><span>Journey scrubber</span><strong>{corridor[activeCorridor][0]}</strong></label>
              <input id="journey-scrubber" type="range" min="0" max={corridor.length - 1} value={activeCorridor} onChange={event => setActiveCorridor(Number(event.target.value))} aria-valuetext={`Stage ${activeCorridor + 1}: ${corridor[activeCorridor][0]}`} />
              <div className="passport-scrubber-labels"><span>Origin</span><span>Audit</span><span>Warehouse</span><span>Port</span><span>GCC consumer</span></div>
            </div>
          </section>
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
                <span className="eyebrow">LABORATORY EVIDENCE</span>
                <span className="state-chip">NOT DETECTED ≠ HALAL</span>
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
              <div className="verification-samples" aria-label="Demonstration records"><span>Try a journey</span>{verificationRecords.map(record => <button key={record.token} type="button" onClick={() => setVerifyQuery(record.token)}>{record.token}</button>)}</div>
              <div className="qr-schematic" aria-hidden="true">
                {Array.from({ length: 36 }, (_, index) => <i key={index} className={index % 3 === 0 || index % 7 === 0 ? "on" : ""} />)}
              </div>
            </form>
            <article className="verify-result glass" aria-live="polite">
              <span className="eyebrow">DISCLOSURE STATE</span>
              <h3>{verifyPreview.title}</h3>
              <strong>{verifyPreview.state}</strong>
              <p>{verifyPreview.detail}</p>
              {verifyPreview.events.length > 0 ? <ol className="verification-events">{verifyPreview.events.map(([title, detail]) => <li key={title}><strong>{title}</strong><span>{detail}</span></li>)}</ol> : null}
              <dl>
                <div><dt>Evidence integrity</dt><dd>Issuer signature + provenance required</dd></div>
                <div><dt>Authority status</dt><dd>Separate from AHTE trust state</dd></div>
                <div><dt>Scope</dt><dd>Product / batch / shipment as authorised</dd></div>
              </dl>
              <a href="verify.html">Open current public verifier ↗</a>
            </article>
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
              ["Ports / customs", "Authorised trust resolution, inspection and hold events, release outcomes and destination handoff records."],
              ["GCC import / retail", "Receiving, warehouse, distribution, retail and issuer-authorised verification."],
              ["Islamic finance / Takaful", "Purpose-bound evidence packets support approved financing and Takaful workflows; providers make their own commercial, legal and Shariah decisions."],
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
            <a className="engagement-card glass" href="corporate-profile.html">
              <span>INSTITUTIONAL</span><strong>Corporate profile</strong><small>GHSCL ecosystem profile ↗</small>
            </a>
            <a className="engagement-card glass" href="manufacturers.html">
              <span>MANUFACTURER</span><strong>Start onboarding</strong><small>Prepare enterprise readiness ↗</small>
            </a>
            <a className="engagement-card glass" href="verify.html">
              <span>PUBLIC TRUST</span><strong>Verify disclosure</strong><small>Issuer-authorised evidence ↗</small>
            </a>
          </div>
          <nav className="language-links" aria-label="Language"><span>Explore in</span><a href="zh-Hant.html" lang="zh-Hant">繁體中文</a><a href="ar.html" lang="ar" dir="rtl">العربية</a></nav>
        </section>

        <section className="final-cta glass" aria-labelledby="final-title">
          <div>
            <p className="eyebrow">12 / SECURE PLATFORM ACCESS</p>
            <h2 id="final-title">Global visibility. Controlled access.</h2>
            <p>Use the secure workspace for authenticated operations, or inspect an issuer-authorised disclosure through the public verifier.</p>
          </div>
          <div className="final-actions">
            <a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Secure portal ↗</a>
            <a className="button-secondary" href="verify.html">Verify disclosure ↗</a>
          </div>
        </section>
      </main>

      <footer className="platinum-footer"><img className="footer-lockup" src="media/ghscl-multilingual.webp" alt="Global Halal Supply Chain Limited in English, Traditional Chinese and Arabic" />
        <div>
          <strong>GLOBAL HALAL SUPPLY CHAIN LIMITED</strong>
          <span>全球清真供應鏈有限公司 · سلسلة التوريد العالمية للحلال</span>
        </div>
      </footer>
    </div>
  );
}
