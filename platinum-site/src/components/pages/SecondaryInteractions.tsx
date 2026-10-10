import { lazy, Suspense, useMemo, useState } from "react";
import { demoVerificationRecords } from "../../data/demoJourney";

const examples = demoVerificationRecords;
const OperatingPlatform=lazy(()=>import('../platform/OperatingPlatform'));

export function SecondaryInteractions({ slug }: { slug: string }) {
  const [platformOpen,setPlatformOpen]=useState(false);
  const [token, setToken] = useState(examples[0]?.token ?? "");
  const [issuerToken,setIssuerToken]=useState('');
  const [verification,setVerification]=useState<{message:string;fields?:Record<string,unknown>}>({message:'Enter an issuer-provided QR link or disclosure token.'});
  const [verifying,setVerifying]=useState(false);
  async function verifyDisclosure(event:React.SubmitEvent<HTMLFormElement>){
    event.preventDefault();let value=issuerToken.trim();
    if(/^https?:/i.test(value)){try{const url=new URL(value);if(!['https://mavericken777.github.io','https://lqvyyylrydcpjochknag.supabase.co'].includes(url.origin))throw new Error();value=url.searchParams.get('token')||'';}catch{setVerification({message:'Use the issuer token or an Amanah verification link.'});return;}}
    if(value.length<32||value.length>2048){setVerification({message:'Enter a valid issuer-provided token.'});return;}
    setVerifying(true);setVerification({message:'Checking the issuer-authorised disclosure…'});
    const controller=new AbortController();const timeout=window.setTimeout(()=>controller.abort(),15000);
    try{const url=new URL('https://lqvyyylrydcpjochknag.supabase.co/functions/v1/public-verify');url.searchParams.set('token',value);
      const response=await fetch(url,{credentials:'omit',cache:'no-store',referrerPolicy:'no-referrer',signal:controller.signal});const result=await response.json();
      if(!response.ok||result.valid!==true){setVerification({message:response.status===404?'No current disclosure found. The token may be expired or revoked.':'Unable to verify this disclosure. Check the token and try again.'});return;}
      if(result.not_certification!==true||result.verification_scope!=='disclosure_token_only')throw new Error('Unexpected verification scope');
      setVerification({message:'Issuer-authorised disclosure retrieved.',fields:result.disclosure&&typeof result.disclosure==='object'?result.disclosure:{'Record state':result.status}});
    }catch{setVerification({message:'Verification is unavailable. Try again when the connection is restored.'});}finally{window.clearTimeout(timeout);setVerifying(false);}
  }
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const record = useMemo(
    () => examples.find((item) => item.token.toLowerCase() === token.trim().toLowerCase()) ?? examples[0],
    [token],
  );

  if(slug==='platform-tour')return <section id="interactive-platform" className="secondary-special"><p className="eyebrow">EXPLORE THE OPERATING PLATFORM</p><h2>Follow one SKU, batch and shipment through the complete loop.</h2><p>Twelve connected operating stages bring the product, digital twin, live readings, evidence ledger, D0–D6 decisions and downstream recall into one workspace.</p>{platformOpen?<Suspense fallback={<p role="status">Opening the connected operating platform…</p>}><OperatingPlatform/></Suspense>:<div className="platform-launch"><button className="button-primary" type="button" onClick={()=>setPlatformOpen(true)}>Open the operating platform</button><p>Inspect any handoff. Trigger a cold-chain, seal or laboratory exception. Trace the affected lots and complete investigation, corrective action and reviewed re-verification.</p></div>}</section>;

  if (slug === "verify") return <section className="secondary-special glass">
    <p className="eyebrow">VERIFICATION EXPERIENCE</p>
    <h2>See the right information for the right verification purpose.</h2>
    <p>Switch between product, batch and shipment views. Each view exposes only the approved information needed by the viewer; confidential factory and commercial data stays protected.</p>
    <form className="issuer-verification" onSubmit={verifyDisclosure}><label htmlFor="issuer-token">Issuer QR link or disclosure token</label><input id="issuer-token" type="text" value={issuerToken} onChange={event=>setIssuerToken(event.target.value)} required minLength={32} maxLength={2048} autoComplete="off" spellCheck={false}/><button className="button-primary" type="submit" disabled={verifying}>{verifying?'Verifying…':'Verify disclosure'}</button></form>
    <div role="status" aria-live="polite" aria-busy={verifying}><p>{verification.message}</p>{verification.fields?<dl>{Object.entries(verification.fields).map(([key,value])=><div key={key}><dt>{key}</dt><dd>{typeof value==='object'?JSON.stringify(value):String(value??'Not disclosed')}</dd></div>)}</dl>:null}</div>
    <div className="secondary-path-grid" role="group" aria-label="Verification views">
      {examples.map(item => <button key={item.token} type="button" aria-pressed={token === item.token} onClick={() => setToken(item.token)}>{item.label}</button>)}
    </div>
    <input id="route-token" type="hidden" value={token} readOnly />
    <div className="passport-result" aria-live="polite">
      <div className="passport-heading"><div><p className="eyebrow">{record.label}</p><h3>{record.product}</h3><p>{record.detail}</p></div><span>Product journey view</span></div>
      <ol className="passport-timeline">{record.events.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong><small>{detail}</small></li>)}</ol>
      <p className="passport-note">The live verifier accepts issuer-authorised QR/token values and returns only permitted disclosure fields.</p>
    </div>
  </section>;

  if (slug === "manufacturers") {
    const items = ["Legal entity profile", "Facility scope", "Product / SKU", "Supplier and ingredient graph", "Evidence and audit readiness"];
    const complete = Object.values(checks).filter(Boolean).length;
    return <section id="onboarding" className="secondary-special glass"><p className="eyebrow">MANUFACTURER READINESS</p><h2>Prepare the evidence journey before onboarding.</h2><div className="secondary-checklist">{items.map((item) => <label key={item}><input type="checkbox" checked={Boolean(checks[item])} onChange={(event) => setChecks((current) => ({ ...current, [item]: event.target.checked }))} /><span>{item}</span></label>)}</div><p className="secondary-progress">{complete} of {items.length} preparation areas selected.</p><a className="button-primary" href="https://amanah-yq9x.vercel.app/login">Continue in Amanah workspace ↗</a></section>;
  }

  if (slug === "contact") return <section id="enquiry" className="secondary-special glass"><p className="eyebrow">ENGAGEMENT PATH</p><h2>Choose an operating workstream.</h2><div className="secondary-path-grid">{["Manufacturer onboarding", "Laboratory integration", "Sinotrans / logistics", "Port / customs", "Institutional / Direct JAKIM API", "Finance / Takaful"].map((item) => <span key={item}>{item}</span>)}</div><a className="button-primary" href="login/index.html">Continue securely ↗</a></section>;

  return null;
}
