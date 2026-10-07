import Link from "next/link";

const stages=[
  ["01","China manufacturer","Organisation registration, KYC, facility, production line and accountable representatives."],
  ["02","Product / SKU","Product identity, formulas/BOM, SKU scope, change control and market applicability."],
  ["03","Supplier / material graph","Ingredient → raw material → supplier → supplier facility/origin → certificate → evidence."],
  ["04","Standards & controls","Complete applicable Malaysian/JAKIM framework → requirements → controls → HCP/SCCP."],
  ["05","Evidence & AI assist","Supporting documents, provenance, gap detection, anomaly assessment and human governance."],
  ["06","Laboratory","Sample request → identity → seal → custody → method/QC → technical review → signed report."],
  ["07","Smart audit","Auditor identity, smart glasses/tablet, evidence capture, findings, CAPA and re-verification."],
  ["08","Authority workflow","AHTE ⇄ Direct JAKIM API ⇄ JAKIM target topology; authorised humans own certification decisions."],
  ["09","Production & digital twin","ERP/MES/QMS/WMS/LIMS/IoT evidence, devices, batches, monitoring and exceptions."],
  ["10","Origin warehouse","Receiving, segregation, storage, pallet/package identity, pick/load and sanitation evidence."],
  ["11","Sinotrans","Vehicle, driver, container, seal, GNSS, door/condition telemetry and digital custody."],
  ["12","Origin port / customs","Pre-arrival/export data, inspection evidence and sovereign release state."],
  ["13","International transit","Milestones, condition, custody continuity and exception propagation."],
  ["14","GCC port / customs","Destination pre-arrival, authority/customs status, inspection and sovereign release."],
  ["15","GCC importer","Receiving inspection, discrepancy, quarantine, acceptance, warehouse placement and claims."],
  ["16","Distributor / 3PL","Inventory lot, FEFO/FIFO, allocation, route, custody transfer, delivery and withdrawal."],
  ["17","Retail / marketplace","Listing eligibility, receiving scan, shelf/fulfilment state, verification and recall."],
  ["18","Consumer / buyer verification","Issuer-authorised product, credential, validity, provenance and selected custody disclosure."],
  ["19","24/7 Command Center","Cross-corridor monitoring, predictive/preemptive recommendation, incidents and escalation."],
  ["20","Recall / blast radius","Material → batch → SKU → shipment → importer → warehouse → distributor → retailer → public state."]
] as const;

export default function PlatformTourPage(){
  return <div className="page stack-xl">
    <header className="page-header">
      <div><div className="eyebrow">CHINA MISSION / COMPLETE PLATFORM</div><h1>AMANAH end-to-end platform tour</h1><p className="lead">Use this page in meetings to explain the complete China → GCC operating model without jumping between modules.</p></div>
      <Link className="button" href="/ahte">Open AHTE</Link>
    </header>

    <section className="card">
      <div className="eyebrow">CONTROLLING ARCHITECTURE</div>
      <h2>AHTE ⇄ Direct JAKIM API ⇄ JAKIM</h2>
      <p><strong>China → GCC direct.</strong> Malaysia is the governance, assurance, standards and authority-connectivity plane unless a specific physical movement is separately scoped. AI assists; authorised humans and competent authorities decide.</p>
    </section>

    <section className="card"><h2>One connected operating story</h2><p>The tour follows the platform capability from manufacturer onboarding through market verification. Each module shows the information, accountable actor, evidence and next handoff needed to understand how AMANAH works end to end.</p></section>

    <section className="card-grid">{stages.map(([n,title,body])=><article className="card" key={n}><div className="eyebrow">STAGE {n}</div><h2>{title}</h2><p className="muted">{body}</p></article>)}</section>

    <section className="card">
      <h2>Decision classes</h2>
      <p><strong>D0</strong> ingest · <strong>D1</strong> encoded control · <strong>D2</strong> machine assessment · <strong>D3</strong> recommendation · <strong>D4</strong> configured trust-fracture hold · <strong>D5</strong> authority gate · <strong>D6</strong> sovereign/legal decision.</p>
      <p className="muted">AI may execute D0–D2 and configured D4 holds. AI does not independently certify Halal, execute D5/D6, release sovereign/customs holds, approve financing/Takaful or establish legal title.</p>
    </section>

    <section className="card">
      <h2>Open the live module for the stakeholder in the room</h2>
      <p><Link href="/onboarding">Manufacturer onboarding →</Link> · <Link href="/ahte/laboratory">Laboratory →</Link> · <Link href="/ahte/controls">Audit / CAPA →</Link> · <Link href="/ahte/monitoring">Production monitoring →</Link> · <Link href="/ahte/shipments">Trade / custody →</Link> · <Link href="/ahte/gcc-importer">GCC importer →</Link> · <Link href="/ahte/distributor">Distributor / 3PL →</Link> · <Link href="/ahte/retail-market">Retail / marketplace →</Link> · <Link href="/ahte/command-center">Command Center →</Link></p>
    </section>
  </div>
}
