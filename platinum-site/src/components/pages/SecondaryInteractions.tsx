import { useState } from "react";

export function SecondaryInteractions({slug}:{slug:string}){
  const [token,setToken]=useState("");
  const [checks,setChecks]=useState<Record<string,boolean>>({});
  if(slug==="verify")return <section className="secondary-special glass"><p className="eyebrow">AUTHORIZED DISCLOSURE</p><h2>Verify without exposing private factory records.</h2><label htmlFor="route-token">Issuer-authorised token or QR link</label><div className="secondary-inline-form"><input id="route-token" value={token} onChange={e=>setToken(e.target.value)} placeholder="Paste token or QR link"/><button type="button" onClick={()=>setToken(value=>value.trim())}>Preview</button></div><div className="secondary-result" aria-live="polite"><strong>{token.trim()?"DEMO ONLY":"AWAITING ISSUER TOKEN"}</strong><p>{token.trim()?"No live verification request has been sent. This demonstrates the controlled disclosure UX only.":"Private product, batch and shipment records are not publicly searchable without an authorised disclosure."}</p></div></section>;
  if(slug==="manufacturers"){
    const items=["Legal entity profile","Facility scope","Product / SKU","Supplier and ingredient graph","Evidence / audit readiness"];
    const complete=Object.values(checks).filter(Boolean).length;
    return <section className="secondary-special glass"><p className="eyebrow">MANUFACTURER READINESS</p><h2>Prepare the evidence journey before onboarding.</h2><div className="secondary-checklist">{items.map(item=><label key={item}><input type="checkbox" checked={Boolean(checks[item])} onChange={e=>setChecks(current=>({...current,[item]:e.target.checked}))}/><span>{item}</span></label>)}</div><p className="secondary-progress">{complete} / {items.length} preparation areas marked. Self-reporting does not establish compliance or authority approval.</p><a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Continue in secure Amanah workspace ↗</a></section>;
  }
  if(slug==="contact")return <section className="secondary-special glass"><p className="eyebrow">ENGAGEMENT PATH</p><h2>Choose the operating workstream.</h2><div className="secondary-path-grid">{["Manufacturer onboarding","Laboratory integration","Sinotrans / logistics","Port / customs","Institutional / Direct JAKIM API","Finance / Takaful"].map(item=><span key={item}>{item}</span>)}</div><p>Credentials, identity records and confidential evidence remain inside authenticated controlled channels.</p></section>;
  return null;
}
