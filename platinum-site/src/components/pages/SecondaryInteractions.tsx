import { useMemo, useState } from "react";
import { demoVerificationRecords } from "../../data/demoJourney";

const examples = demoVerificationRecords;

export function SecondaryInteractions({ slug }: { slug: string }) {
  const [token, setToken] = useState(examples[0]?.token ?? "");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const record = useMemo(
    () => examples.find((item) => item.token.toLowerCase() === token.trim().toLowerCase()) ?? examples[0],
    [token],
  );

  if (slug === "verify") return <section className="secondary-special glass">
    <p className="eyebrow">VERIFICATION EXPERIENCE</p>
    <h2>See the right information for the right verification purpose.</h2>
    <p>Switch between product, batch and shipment views. Each view exposes only the approved information needed by the viewer; confidential factory and commercial data stays protected.</p>
    <div className="secondary-path-grid" role="group" aria-label="Verification views">
      {examples.map(item => <button key={item.token} type="button" aria-pressed={token === item.token} onClick={() => setToken(item.token)}>{item.label}</button>)}
    </div>
    <input id="route-token" type="hidden" value={token} readOnly />
    <div className="passport-result" aria-live="polite">
      <div className="passport-heading"><div><p className="eyebrow">{record.label}</p><h3>{record.product}</h3><p>{record.detail}</p></div><span>Approved disclosure</span></div>
      <ol className="passport-timeline">{record.events.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{detail}</small></li>)}</ol>
      <p className="passport-note">The live verifier accepts issuer-authorised QR/token values and returns only permitted disclosure fields.</p>
    </div>
  </section>;

  if (slug === "manufacturers") {
    const items = ["Legal entity profile", "Facility scope", "Product / SKU", "Supplier and ingredient graph", "Evidence and audit readiness"];
    const complete = Object.values(checks).filter(Boolean).length;
    return <section className="secondary-special glass"><p className="eyebrow">MANUFACTURER READINESS</p><h2>Prepare the evidence journey before onboarding.</h2><div className="secondary-checklist">{items.map((item) => <label key={item}><input type="checkbox" checked={Boolean(checks[item])} onChange={(event) => setChecks((current) => ({ ...current, [item]: event.target.checked }))} /><span>{item}</span></label>)}</div><p className="secondary-progress">{complete} of {items.length} preparation areas selected.</p><a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Continue in Amanah workspace ↗</a></section>;
  }

  if (slug === "contact") return <section className="secondary-special glass"><p className="eyebrow">ENGAGEMENT PATH</p><h2>Choose an operating workstream.</h2><div className="secondary-path-grid">{["Manufacturer onboarding", "Laboratory integration", "Sinotrans / logistics", "Port / customs", "Institutional / Direct JAKIM API", "Finance / Takaful"].map((item) => <span key={item}>{item}</span>)}</div><a className="button-primary" href="login/index.html">Continue securely ↗</a></section>;

  return null;
}
