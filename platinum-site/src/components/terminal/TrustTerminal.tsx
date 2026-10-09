import { useState } from "react";
import { ProcessScene3D } from "../scene/ProcessScene3D";

const logisticsNodes = [
  { id: "cn", label: "China Origin", x: 90, y: 145, detail: "Manufacturer / laboratory / origin evidence" },
  { id: "ae", label: "Jebel Ali / GCC", x: 560, y: 135, detail: "Destination import, receiving and downstream verification" },
  { id: "my", label: "Malaysia Governance", x: 320, y: 235, detail: "Governance, assurance and authority-connectivity plane — not default physical transit" },
];

const complianceRows = [
  ["Laboratory evidence", "Evidence chain inspectable", "Sample → custody → method/QC → result → review/signature → evidence."],
  ["Alcohol control", "Control evidence required", "A control conclusion depends on the applicable source, method, scope and accountable review."],
  ["Audit trail", "Human assessment preserved", "AI may assist analysis; the human auditor owns findings and corrective-action closure."],
  ["Authority connectivity", "Governed authority interface", "Authority connectivity is handled through the direct AHTE ⇄ JAKIM integration model; the competent authority owns formal decisions."],
];

export function TrustTerminal({ sectionId = "terminal" }: { sectionId?: string }) {
  const [logisticsNode, setLogisticsNode] = useState(logisticsNodes[0]);
  const [releaseState, setReleaseState] = useState("EVIDENCE PACKET READY");
  const [expandedCompliance, setExpandedCompliance] = useState<number | null>(null);

  function prepareEvidencePacket() {
    setReleaseState("EVIDENCE PACKET PREPARED");
    window.setTimeout(() => setReleaseState("EVIDENCE PACKET READY"), 2200);
  }

  return (
    <section className="section terminal-section" id={sectionId || undefined} aria-labelledby="terminal-title">
      <div className="section-heading">
        <p className="eyebrow">08 / INTERACTIVE TRUST TERMINAL</p>
        <h2 id="terminal-title">Inspect the trust property behind every interaction.</h2>
        <p>Explore how logistics, laboratory evidence, compliance review and finance evidence remain connected while each accountable organisation retains its own decision authority.</p>
      </div>

      <div className="terminal-bento">
        <article className="terminal-card terminal-logistics glass">
          <div className="terminal-card-head">
            <span className="eyebrow">ORIGIN → GCC / DIRECT CORRIDOR</span>
            <span className="state-chip">DIRECT CORRIDOR</span>
          </div>
          <ProcessScene3D mode={logisticsNode.id === "my" ? "authority" : "port"} stage={logisticsNode.label} className="terminal-route-scene" />
          <div className="terminal-route-controls" role="group" aria-label="Choose corridor responsibility">
            {logisticsNodes.map(node => <button key={node.id} type="button" aria-pressed={logisticsNode.id === node.id} onClick={() => setLogisticsNode(node)}>{node.label}</button>)}
          </div>
          <div className="terminal-detail" aria-live="polite">
            <strong>{logisticsNode.label}</strong>
            <p>{logisticsNode.detail}</p>
            <small>Select a node. China → GCC is the physical default corridor; Malaysia is shown as governance connectivity only.</small>
          </div>
        </article>

        <article className="terminal-card terminal-finance glass">
          <div className="terminal-card-head">
            <span className="eyebrow">SHARIAH FINANCE / EVIDENCE PACKET</span>
            <span className="state-chip">EXTERNAL DECISION</span>
          </div>
          <div className="finance-chart" aria-label="Evidence completeness bars">
            {[82, 94, 76, 88].map((value, index) => (
              <div className="finance-bar" key={index}>
                <span style={{ transform: `scaleY(${value / 100})` }} />
                <small>{["Identity","Custody","Evidence","Exceptions"][index]}</small>
              </div>
            ))}
          </div>
          <button type="button" className="gold-action" onClick={prepareEvidencePacket}>Prepare evidence packet</button>
          <p className="terminal-state" aria-live="polite">{releaseState}</p>
          <small>AHTE provides evidence to approved finance or Takaful providers; those providers retain their own decisions.</small>
        </article>

        <article className="terminal-card terminal-lab glass">
          <div className="terminal-card-head">
            <span className="eyebrow">LABORATORY / SCIENTIFIC EVIDENCE</span>
            <span className="state-chip">NOT_DETECTED ≠ HALAL</span>
          </div>
          <svg className="pcr-graph" viewBox="0 0 520 190" role="img" aria-label="PCR evidence pattern showing analytical evidence context">
            <path className="pcr-grid" d="M20 30H500M20 70H500M20 110H500M20 150H500M80 20V170M160 20V170M240 20V170M320 20V170M400 20V170M480 20V170" />
            <path className="pcr-line pcr-line-a" d="M25 150 C90 149 130 146 175 141 S250 125 300 90 S365 48 495 36" />
            <path className="pcr-line pcr-line-b" d="M25 150 C120 149 210 148 305 147 S420 145 495 144" />
          </svg>
          <div className="lab-annotation">
            <strong>Analytical evidence context</strong>
            <p>Laboratory results remain linked to sample identity, method, QC and technical review; laboratory evidence does not independently create Halal certification.</p>
          </div>
        </article>

        <article className="terminal-card terminal-compliance glass">
          <div className="terminal-card-head">
            <span className="eyebrow">COMPLIANCE / EVIDENCE ARTIFACTS</span>
            <span className="state-chip">ACCOUNTABLE REVIEW</span>
          </div>
          <div className="compliance-list">
            {complianceRows.map(([label, state, detail], index) => (
              <button
                type="button"
                key={label}
                className={expandedCompliance === index ? "expanded" : ""}
                aria-expanded={expandedCompliance === index}
                onClick={() => setExpandedCompliance(expandedCompliance === index ? null : index)}
              >
                <span className="compliance-dot" aria-hidden="true" />
                <span><strong>{label}</strong><small>{state}</small></span>
                <b aria-hidden="true">{expandedCompliance === index ? "−" : "+"}</b>
                {expandedCompliance === index ? <p>{detail}</p> : null}
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
