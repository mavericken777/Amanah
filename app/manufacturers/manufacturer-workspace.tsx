"use client";

import { useMemo, useState } from "react";

const readinessAreas = [
  { id: "facility", number: "01", title: "Facility & scope", description: "Site identity, production lines, product scope and accountable contacts.", tasks: ["Confirm legal entity and site", "List production lines and SKUs", "Assign responsible owners"] },
  { id: "materials", number: "02", title: "Ingredients & suppliers", description: "Ingredient specifications, supplier status, origin and supporting certificates.", tasks: ["Map ingredients to each SKU", "Collect current supplier evidence", "Flag unknown or restricted materials"] },
  { id: "controls", number: "03", title: "Process controls", description: "Cleaning, segregation, change control, storage and production records.", tasks: ["Map controls to each process", "Check cleaning and segregation records", "Record open corrective actions"] },
  { id: "laboratory", number: "04", title: "Laboratory & evidence", description: "Test reports, sampling context, document validity and chain of custody.", tasks: ["Index relevant test reports", "Verify dates, scope and sample IDs", "Link evidence to the applicable batch"] },
  { id: "assurance", number: "05", title: "Audit & market readiness", description: "Audit findings, certification scope, shipment records and market requirements.", tasks: ["Review findings and due dates", "Confirm authority and certificate scope", "Prepare traceable dispatch records"] },
];

const systems = [
  { id: "ERP", name: "Enterprise resource planning", detail: "Product, supplier and order master data" },
  { id: "MES", name: "Manufacturing execution", detail: "Line, batch and production events" },
  { id: "QMS", name: "Quality management", detail: "Controls, deviations and corrective actions" },
  { id: "WMS", name: "Warehouse management", detail: "Inventory, location and custody events" },
  { id: "LIMS", name: "Laboratory information", detail: "Samples, methods and test results" },
  { id: "IoT", name: "Sensors & devices", detail: "Environmental and equipment observations" },
  { id: "DMS", name: "Document management", detail: "Controlled records and document versions" },
];

const onboardingSteps = [
  ["Set up the organisation", "Confirm legal entity, operating name and primary contact."],
  ["Register the production site", "Record the site address, local identifiers and site owner."],
  ["Define product scope", "Select the product families and SKUs included in this readiness exercise."],
  ["Map production lines", "Connect each selected product to the line or process where it is made."],
  ["Identify accountable owners", "Assign people to maintain supplier, process and evidence records."],
  ["Map ingredients", "List materials used by each product and identify unknowns."],
  ["Register suppliers", "Capture supplier identity, site and relevant approval evidence."],
  ["Review material evidence", "Check specification versions, certificate scope and expiry dates."],
  ["Map process steps", "Document the production flow from receiving through packing."],
  ["Check segregation controls", "Record measures that prevent mix-ups and cross-contact."],
  ["Check cleaning controls", "Link procedures, schedules, records and deviations."],
  ["Review change control", "Capture changes to ingredients, suppliers, equipment and process."],
  ["Register laboratory evidence", "Index reports with sample identity, method, date and issuing lab."],
  ["Connect batch records", "Relate production events to the materials and line used."],
  ["Review audit findings", "Track observations, owners, due dates and corrective evidence."],
  ["Confirm certificate scope", "Record the relevant issuing authority, scope and validity as evidence."],
  ["Map warehouse controls", "Record location, status, handling and segregation practices."],
  ["Prepare shipment traceability", "Connect finished batch, package, dispatch and receiving handoff."],
  ["Review unresolved gaps", "Prioritise missing, expired, conflicting or unverified evidence."],
  ["Prepare human review", "Compile an evidence pack for the competent authority or authorised reviewer."],
] as const;

const controlRows = [
  { requirement: "Product and ingredient scope", evidence: "SKU list, formulation, material specifications", owner: "Technical / procurement" },
  { requirement: "Supplier assurance", evidence: "Supplier approval and valid supporting documents", owner: "Procurement" },
  { requirement: "Process integrity", evidence: "Cleaning, segregation and change-control records", owner: "Operations / quality" },
  { requirement: "Laboratory claims", evidence: "Traceable reports, methods, samples and dates", owner: "Laboratory / quality" },
  { requirement: "Audit closure", evidence: "Finding, root cause, action and closure evidence", owner: "Quality / management" },
  { requirement: "Shipment chain of custody", evidence: "Batch, package, seal and handoff events", owner: "Warehouse / logistics" },
];

export function ManufacturerWorkspace() {
  const [checked, setChecked] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [openArea, setOpenArea] = useState("facility");
  const totalTasks = readinessAreas.reduce((sum, area) => sum + area.tasks.length, 0);
  const completed = checked.length;
  const percent = Math.round((completed / totalTasks) * 100);
  const currentArea = useMemo(() => readinessAreas.find((area) => area.id === openArea) ?? readinessAreas[0], [openArea]);

  const toggleTask = (taskId: string) => {
    setChecked((previous) => previous.includes(taskId) ? previous.filter((item) => item !== taskId) : [...previous, taskId]);
  };

  return (
    <>
      <section className="manufacturer-systems" id="systems" aria-labelledby="manufacturer-systems-title">
        <div className="manufacturer-section-heading">
          <p className="manufacturer-eyebrow"><span /> DESIGNED TO CONNECT</p>
          <h2 id="manufacturer-systems-title">Keep your systems.<br /><em>Connect the evidence.</em></h2>
          <p>Amanah is designed to bring relevant records into a common evidence view. This diagram describes intended integration points; it does not claim that your systems are already connected.</p>
        </div>
        <div className="manufacturer-integration" aria-label="System integration concept diagram">
          <div className="manufacturer-integration-hub">
            <span className="manufacturer-hub-mark">A</span><strong>AMANAH</strong><small>Evidence & readiness layer</small>
            <div className="manufacturer-hub-tags"><span>PROVENANCE</span><span>CONTROL</span><span>REVIEW</span></div>
          </div>
          <div className="manufacturer-system-grid">
            {systems.map((system) => <article className="manufacturer-system-card" key={system.id}><span className="manufacturer-system-code">{system.id}</span><div><strong>{system.name}</strong><small>{system.detail}</small></div><span className="manufacturer-system-status">CONNECTABLE</span></article>)}
          </div>
          <p className="manufacturer-integration-note"><span aria-hidden="true">↳</span> Integrations require source-system permissions, mapping, validation and an agreed data-sharing model.</p>
        </div>
      </section>

      <section className="manufacturer-checker" id="readiness" aria-labelledby="manufacturer-checker-title">
        <div className="manufacturer-section-heading">
          <p className="manufacturer-eyebrow"><span /> READINESS CHECK / SELF-ASSESSMENT</p>
          <h2 id="manufacturer-checker-title">See what is ready.<br /><em>See what is missing.</em></h2>
          <p>Use this local checklist to organise your preparation. It is not an official halal decision, a certificate, or a substitute for review by the competent authority.</p>
        </div>
        <div className="manufacturer-checker-layout">
          <aside className="manufacturer-readiness-score" aria-live="polite">
            <span className="manufacturer-score-label">CHECKLIST COMPLETION</span>
            <div className="manufacturer-score-ring" style={{ "--completion": percent + "%" } as React.CSSProperties}><div><strong>{percent}<small>%</small></strong><span>{completed} / {totalTasks} items</span></div></div>
            <p>{percent === 100 ? "All checklist items have been marked. Review the underlying evidence before sharing." : "Mark an item only when the supporting record has been located and reviewed."}</p>
            <button type="button" className="manufacturer-reset" onClick={() => setChecked([])} disabled={completed === 0}>Reset checklist</button>
            <small className="manufacturer-local-note">Your selections stay in this page session and are not saved to your account.</small>
          </aside>
          <div className="manufacturer-area-list">
            {readinessAreas.map((area) => {
              const areaCompleted = area.tasks.filter((task) => checked.includes(area.id + ":" + task)).length;
              const expanded = openArea === area.id;
              return <article className={"manufacturer-area-card" + (expanded ? " is-open" : "")} key={area.id}>
                <button className="manufacturer-area-toggle" type="button" aria-expanded={expanded} onClick={() => setOpenArea(expanded ? "" : area.id)}>
                  <span className="manufacturer-area-number">{area.number}</span><span className="manufacturer-area-title"><strong>{area.title}</strong><small>{area.description}</small></span><span className="manufacturer-area-progress">{areaCompleted}/{area.tasks.length}</span><span className="manufacturer-area-chevron" aria-hidden="true">{expanded ? "−" : "+"}</span>
                </button>
                {expanded && <div className="manufacturer-area-tasks">{area.tasks.map((task) => {
                  const id = area.id + ":" + task;
                  return <label className="manufacturer-task" key={id}><input type="checkbox" checked={checked.includes(id)} onChange={() => toggleTask(id)} /><span className="manufacturer-custom-check" aria-hidden="true" /><span>{task}</span></label>;
                })}</div>}
              </article>;
            })}
            <div className="manufacturer-checker-disclaimer"><strong>What this score means</strong><p>It measures only the checklist items you marked. It does not validate documents, determine halal status, predict certification, or replace decisions by JAKIM, the relevant state religious authority, or another competent authority.</p></div>
          </div>
        </div>
      </section>

      <section className="manufacturer-control-matrix" id="controls" aria-labelledby="manufacturer-control-title">
        <div className="manufacturer-section-heading">
          <p className="manufacturer-eyebrow"><span /> CONTROL-TO-EVIDENCE MAP</p>
          <h2 id="manufacturer-control-title">Make every requirement<br /><em>traceable to evidence.</em></h2>
          <p>A practical starting matrix for preparation. Applicable requirements and acceptance criteria must be confirmed for the product, facility, destination market and competent authority.</p>
        </div>
        <div className="manufacturer-matrix-wrap"><table className="manufacturer-matrix"><thead><tr><th>Preparation area</th><th>Example evidence to assemble</th><th>Suggested owner</th></tr></thead><tbody>{controlRows.map((row) => <tr key={row.requirement}><th scope="row">{row.requirement}</th><td>{row.evidence}</td><td><span className="manufacturer-owner-pill">{row.owner}</span></td></tr>)}</tbody></table></div>
      </section>

      <section className="manufacturer-onboarding" id="onboarding" aria-labelledby="manufacturer-onboarding-title">
        <div className="manufacturer-onboarding-intro">
          <p className="manufacturer-eyebrow"><span /> THE 20-STEP JOURNEY</p>
          <h2 id="manufacturer-onboarding-title">From first details<br /><em>to review-ready.</em></h2>
          <p>A guided sequence to help a manufacturer assemble its operating scope and supporting evidence. Move through the steps at your own pace.</p>
          <div className="manufacturer-step-count"><strong>{String(step + 1).padStart(2, "0")}</strong><span> / 20 STEPS</span><div><i style={{ width: (((step + 1) / onboardingSteps.length) * 100) + "%" }} /></div></div>
        </div>
        <div className="manufacturer-step-panel" aria-live="polite">
          <div className="manufacturer-step-panel-top"><span>PREPARATION WORKFLOW</span><span>STEP {String(step + 1).padStart(2, "0")}</span></div>
          <div className="manufacturer-step-panel-body"><span className="manufacturer-step-index">{String(step + 1).padStart(2, "0")}</span><h3>{onboardingSteps[step][0]}</h3><p>{onboardingSteps[step][1]}</p><div className="manufacturer-step-boundary"><span>YOUR INPUT</span><strong>Record the relevant details and attach supporting evidence in your approved workspace.</strong></div></div>
          <div className="manufacturer-step-controls">
            <button type="button" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0}>← Previous</button>
            <div className="manufacturer-step-dots" aria-label={"Step " + (step + 1) + " of " + onboardingSteps.length}>{onboardingSteps.map((item, index) => <button key={item[0]} type="button" className={index === step ? "active" : ""} aria-label={"Go to step " + (index + 1) + ": " + item[0]} aria-current={index === step ? "step" : undefined} onClick={() => setStep(index)} />)}</div>
            <button type="button" className="manufacturer-step-next" onClick={() => setStep((value) => Math.min(onboardingSteps.length - 1, value + 1))} disabled={step === onboardingSteps.length - 1}>Next step →</button>
          </div>
        </div>
      </section>

      <section className="manufacturer-authority-note">
        <div className="manufacturer-authority-symbol" aria-hidden="true">◇</div>
        <div><p className="manufacturer-eyebrow">ASSISTED INTELLIGENCE. ACCOUNTABLE DECISIONS.</p><h2>AI can organise the evidence.<br /><em>Authority remains human.</em></h2><p>Amanah supports preparation, traceability and review. It does not independently grant halal certification or override decisions made by the competent authority and authorised human reviewers.</p></div>
        <a className="manufacturer-button-primary" href="/login">Open Amanah workspace <span aria-hidden="true">↗</span></a>
      </section>
    </>
  );
}
