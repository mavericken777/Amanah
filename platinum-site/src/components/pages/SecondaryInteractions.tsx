import { useMemo, useState } from "react";

const examples = [
  { token: "GHSC-MY-2026-8891", product: "Malaysia-origin product journey", batch: "MY-DEMO-2026-01", stages: ["Product identity linked", "Audit and laboratory evidence assembled", "Warehouse, seal and temperature events recorded", "Consumer passport prepared"] },
  { token: "JAKIM-AMANAH-0921", product: "Authority-reference journey", batch: "CN-DEMO-2026-02", stages: ["Sample reference linked to a batch", "Control observations and laboratory evidence grouped", "Container, route and condition events recorded", "Market disclosure view prepared"] },
  { token: "HK-GHSC-2026-1188", product: "Hong Kong coordination journey", batch: "CN-DEMO-2026-03", stages: ["Product identity and origin references assembled", "Audit and laboratory records linked to controls", "Warehouse, transport and port handoffs recorded", "Provenance view prepared for the market"] },
];

export function SecondaryInteractions({ slug }: { slug: string }) {
  const [token, setToken] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const record = useMemo(() => examples.find((item) => item.token.toLowerCase() === submitted.trim().toLowerCase()), [submitted]);
  if (slug === "verify") return <section className="secondary-special glass">
    <p className="eyebrow">PRODUCT PASSPORT</p><h2>Follow the evidence through the journey.</h2>
    <p>Enter a sample reference to explore how origin, assessment, custody and market disclosure connect.</p>
    <form className="secondary-inline-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(token); }}>
      <label className="sr-only" htmlFor="route-token">Sample reference</label><input id="route-token" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Try GHSC-MY-2026-8891" />
      <button type="submit">View passport</button>
    </form>
    {record && <div className="passport-result" aria-live="polite"><div className="passport-heading"><div><p className="eyebrow">{record.batch}</p><h3>{record.product}</h3></div><span>Journey view</span></div><ol className="passport-timeline">{record.stages.map((stage, index) => <li key={stage}><span>{String(index + 1).padStart(2, "0")}</span><strong>{stage}</strong></li>)}</ol><p className="passport-note">Sample journey · select a step in the home journey to explore its evidence and handoffs.</p></div>}
    {submitted && !record && <p className="secondary-result" role="status">No sample journey matches that reference. Try GHSC-MY-2026-8891, JAKIM-AMANAH-0921 or HK-GHSC-2026-1188.</p>}
  </section>;
  if (slug === "manufacturers") {
    const items = ["Legal entity profile", "Facility scope", "Product / SKU", "Supplier and ingredient graph", "Evidence and audit readiness"];
    const complete = Object.values(checks).filter(Boolean).length;
    return <section className="secondary-special glass"><p className="eyebrow">MANUFACTURER READINESS</p><h2>Prepare the evidence journey before onboarding.</h2><div className="secondary-checklist">{items.map((item) => <label key={item}><input type="checkbox" checked={Boolean(checks[item])} onChange={(event) => setChecks((current) => ({ ...current, [item]: event.target.checked }))} /><span>{item}</span></label>)}</div><p className="secondary-progress">{complete} of {items.length} preparation areas selected.</p><a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Continue in Amanah workspace ↗</a></section>;
  }
  if (slug === "contact") return <section className="secondary-special glass"><p className="eyebrow">ENGAGEMENT PATH</p><h2>Choose an operating workstream.</h2><div className="secondary-path-grid">{["Manufacturer onboarding", "Laboratory integration", "Sinotrans / logistics", "Port / customs", "Institutional / Direct JAKIM API", "Finance / Takaful"].map((item) => <span key={item}>{item}</span>)}</div><a className="button-primary" href="login/index.html">Continue securely ↗</a></section>;
  return null;
}
