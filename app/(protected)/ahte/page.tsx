import { requireQueryResults } from "@/lib/query-results";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

const modules = [
  ["/ahte/platform-tour","China → GCC product journey","Follow product onboarding, assurance, custody and destination operations across the complete lifecycle."],
  ["/ahte/source","Source & authority","Standards, applicability, certification workflow and direct JAKIM connectivity."],
  ["/ahte/controls","Controls & audit","Controls, HCP/SCCP, evidence, tests, findings, CAPA and re-verification."],
  ["/ahte/hitm","HITM decision plane","AI-assisted evidence review and certification decision records."],
  ["/ahte/trust","Trust plane","Trust state, trust vector, fracture events, holds and operational release."],
  ["/ahte/shipments","Trade & custody","China → GCC direct corridor, identity, certificate, Sinotrans custody and port events."],
  ["/ahte/gcc-importer","GCC importer","Pre-arrival, port release reference, receiving, quarantine, inventory and onward-distribution eligibility."],
  ["/ahte/distributor","Distributor / 3PL","Destination inventory, FEFO/FIFO, allocation, custody transfer, delivery and recall readiness."],
  ["/ahte/retail-market","Retail / marketplace","Listing, receiving, sale eligibility, verification and withdrawal/recall propagation."],
  ["/ahte/packets","Trust packets","Structured identity, certificate, evidence, custody, audit and certification decision records."],
  ["/ahte/laboratory","Laboratory","Sample, seal, custody, accession, method, result and report evidence."],
  ["/ahte/monitoring","Platinum monitoring","Devices, telemetry, trust fractures, blast radius and predictive inputs."],
  ["/ahte/command-center","24/7 Command Center","GHSCL + JAKIM-connected monitoring, prediction, preemptive strategy and escalation."],
  ["/ahte/governance","Governance","PHC/JAKIM parallel governance, certification decisions and accountable oversight."],
] as const;

export default async function AHTEPage(){
  const {supabase,user}=await requireUser();
  const org=await getPrimaryWorkspace(supabase,user.id);
  if(!org)return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace before using AHTE.</p></div></div>;
  const db=supabase as any;
  const tables=["ahte_authorities","ahte_instruments","ahte_requirements","ahte_controls","ahte_evidence","ahte_findings","ahte_authority_decisions","ahte_trust_states","ahte_shipments","ahte_trust_packets"] as const;
  const counts=requireQueryResults(await Promise.all(tables.map(table=>db.from(table).select("id",{count:"exact",head:true}).eq("organization_id",org.id))));
  const labels=["Authorities","Instruments","Requirements","Controls","Evidence","Findings","Certification decisions","Trust states","Shipments","Trust packets"];
  return <div className="page stack-xl">
    <header className="page-header"><div><div className="eyebrow">AHTE / IQ300 CONTROL PLANE</div><h1>Amanah Halal Assurance and Monitoring</h1><p className="lead">Continuous evidence and real-time monitoring across certified premises, SKUs, laboratories, audits, production, warehouses and logistics, with predictive analytics and preemptive strategies.</p></div><Link href="/projects" className="button">Projects</Link></header>
    <section className="card"><div className="eyebrow">CANONICAL PATH</div><p><strong>Premises + SKU → applicable requirements → controls + evidence → laboratory + audit → certification decisions → production + custody → destination verification → continuous monitoring</strong></p><p className="muted">PHC and JAKIM work in parallel across Malaysia’s state and federal governance. JAKIM/JAIN/JAIM, muftis, scholars and authorised halal auditors decide certification award or revocation. AI/ML supports evidence review, real-time risk prediction and preemptive strategy recommendations.</p></section>
    <section className="metric-grid">{labels.map((label,i)=><div className="metric-card" key={label}><span>{label}</span><strong>{counts[i].count??0}</strong></div>)}</section>
    <section className="card-grid">{modules.map(([href,title,description])=><Link className="card" href={href} key={href}><div className="eyebrow">AHTE MODULE</div><h2>{title}</h2><p className="muted">{description}</p><span>Open →</span></Link>)}</section>
  </div>
}
