import { useEffect, useRef, useState } from "react";

const logisticsNodes = [
  { id: "cn", label: "China Origin", x: 90, y: 145, detail: "Manufacturer / laboratory / origin evidence" },
  { id: "ae", label: "Jebel Ali / GCC", x: 560, y: 135, detail: "Destination import, receiving and downstream verification" },
  { id: "my", label: "Malaysia Governance", x: 320, y: 235, detail: "Governance, assurance and authority-connectivity plane — not default physical transit" },
];

const complianceRows = [
  ["Laboratory evidence", "Evidence chain inspectable", "Sample → custody → method/QC → result → review/signature → evidence."],
  ["Alcohol control", "Control evidence required", "A control conclusion depends on the applicable source, method, scope and accountable review."],
  ["Audit trail", "Human assessment preserved", "AI may assist analysis; the human auditor owns findings and corrective-action closure."],
  ["Direct JAKIM API", "Pending authorization", "Integration architecture is implemented; production activation requires authorised endpoint and credentials."],
];

export function TrustTerminal({ sectionId = "terminal" }: { sectionId?: string }) {
  const logisticsRef = useRef<SVGSVGElement>(null);
  const [logisticsNode, setLogisticsNode] = useState(logisticsNodes[0]);
  const [releaseState, setReleaseState] = useState("EVIDENCE PACKET READY");
  const [expandedCompliance, setExpandedCompliance] = useState<number | null>(null);

  useEffect(() => {
    const svgElement = logisticsRef.current;
    if (!svgElement) return;

    let cancelled = false;
    let teardown = () => {};

    const observer = new IntersectionObserver(async entries => {
      if (!entries.some(entry => entry.isIntersecting) || cancelled) return;
      observer.disconnect();
      const d3 = await import("d3");
      if (cancelled || !logisticsRef.current) return;

      const svg = d3.select(svgElement);
      svg.selectAll("*").remove();

      const layer = svg.append("g").attr("class", "d3-layer");
      const directRoute = [{ x: 90, y: 145 }, { x: 250, y: 82 }, { x: 410, y: 85 }, { x: 560, y: 135 }];
      const line = d3.line<{x:number;y:number}>().x(d => d.x).y(d => d.y).curve(d3.curveBasis);

      layer.append("path")
        .attr("class", "route-line route-line-direct")
        .attr("d", line(directRoute) ?? "");

      layer.append("path")
        .attr("class", "route-line route-line-governance")
        .attr("d", line([{x:320,y:235},{x:320,y:160},{x:410,y:85}]) ?? "");

      const nodes = layer.selectAll<SVGGElement, typeof logisticsNodes[number]>("g.route-node")
        .data(logisticsNodes)
        .join(enter => {
          const group = enter.append("g")
            .attr("class", "route-node")
            .attr("tabindex", 0)
            .attr("role", "button")
            .attr("aria-label", d => `${d.label}: ${d.detail}`)
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .on("click", (_, d) => setLogisticsNode(d))
            .on("keydown", (event, d) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setLogisticsNode(d);
              }
            });

          group.append("circle").attr("r", 8);
          group.append("text").attr("y", -16).attr("text-anchor", "middle").text(d => d.label);
          return group;
        });

      nodes.classed("active", d => d.id === logisticsNode.id);

      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([.9, 2])
        .on("zoom", event => layer.attr("transform", event.transform.toString()));

      svg.call(zoom).call(zoom.transform, d3.zoomIdentity);
      teardown = () => svg.on(".zoom", null);
    }, { rootMargin: "160px" });

    observer.observe(svgElement);
    return () => {
      cancelled = true;
      observer.disconnect();
      teardown();
    };
  }, [logisticsNode.id]);

  function simulateReleaseRequest() {
    setReleaseState("DEMO RELEASE REQUEST GENERATED");
    window.setTimeout(() => setReleaseState("EVIDENCE PACKET READY"), 2200);
  }

  return (
    <section className="section terminal-section" id={sectionId || undefined} aria-labelledby="terminal-title">
      <div className="section-heading">
        <p className="eyebrow">08 / INTERACTIVE TRUST TERMINAL</p>
        <h2 id="terminal-title">Inspect the trust property behind every interaction.</h2>
        <p>These controls demonstrate the evidence model and operating boundaries. They do not display live shipments, laboratory results, authority decisions or financing approvals.</p>
      </div>

      <div className="terminal-bento">
        <article className="terminal-card terminal-logistics glass">
          <div className="terminal-card-head">
            <span className="eyebrow">LOGISTICS / D3 CORRIDOR</span>
            <span className="state-chip">DEMO TOPOLOGY</span>
          </div>
          <svg ref={logisticsRef} className="logistics-map" viewBox="0 0 650 300" aria-label="Interactive China to GCC corridor schematic" />
          <div className="terminal-detail" aria-live="polite">
            <strong>{logisticsNode.label}</strong>
            <p>{logisticsNode.detail}</p>
            <small>Pan / zoom enabled. China → GCC is the physical default corridor; Malaysia is shown as governance connectivity only.</small>
          </div>
        </article>

        <article className="terminal-card terminal-finance glass">
          <div className="terminal-card-head">
            <span className="eyebrow">SHARIAH FINANCE / EVIDENCE PACKET</span>
            <span className="state-chip">EXTERNAL DECISION</span>
          </div>
          <div className="finance-chart" aria-label="Illustrative evidence completeness bars">
            {[82, 94, 76, 88].map((value, index) => (
              <div className="finance-bar" key={index}>
                <span style={{ transform: `scaleY(${value / 100})` }} />
                <small>{["Identity","Custody","Evidence","Exceptions"][index]}</small>
              </div>
            ))}
          </div>
          <button type="button" className="gold-action" onClick={simulateReleaseRequest}>Simulate evidence release request</button>
          <p className="terminal-state" aria-live="polite">{releaseState}</p>
          <small>Illustrative only. AHTE does not approve financing, Takaful, title transfer or sovereign release.</small>
        </article>

        <article className="terminal-card terminal-lab glass">
          <div className="terminal-card-head">
            <span className="eyebrow">LABORATORY / SCIENTIFIC EVIDENCE</span>
            <span className="state-chip">NOT_DETECTED ≠ HALAL</span>
          </div>
          <svg className="pcr-graph" viewBox="0 0 520 190" role="img" aria-label="Illustrative PCR evidence pattern, not a live result">
            <path className="pcr-grid" d="M20 30H500M20 70H500M20 110H500M20 150H500M80 20V170M160 20V170M240 20V170M320 20V170M400 20V170M480 20V170" />
            <path className="pcr-line pcr-line-a" d="M25 150 C90 149 130 146 175 141 S250 125 300 90 S365 48 495 36" />
            <path className="pcr-line pcr-line-b" d="M25 150 C120 149 210 148 305 147 S420 145 495 144" />
          </svg>
          <div className="lab-annotation">
            <strong>Illustrative assay visualization</strong>
            <p>No live sample, analyte concentration, accreditation claim or Halal conclusion is represented.</p>
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
