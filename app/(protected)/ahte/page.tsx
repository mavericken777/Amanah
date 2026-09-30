import { requireQueryResults } from "@/lib/query-results";
import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

const modules = [
  ["/ahte/source","Source & authority","Authorities, instruments, requirements, applicability and direct-JAKIM target boundary."],
  ["/ahte/controls","Controls & audit","Controls, HCP/SCCP, evidence, tests, findings, CAPA and re-verification."],
  ["/ahte/hitm","HITM decision plane","AI advisory assessments, human review cases and reserved authority decisions."],
  ["/ahte/trust","Trust plane","Trust state, trust vector, fracture events, holds and operational release."],
  ["/ahte/shipments","Trade & custody","China → GCC direct corridor, identity, certificate, Sinotrans custody and port events."],
  ["/ahte/packets","Trust packets","Structured identity, certificate, evidence, custody, audit and authority-gate objects."],
  ["/ahte/laboratory","Laboratory","Sample, seal, custody, accession, method, result and report evidence."],
  ["/ahte/monitoring","Platinum monitoring","Devices, telemetry, trust fractures, blast radius and predictive inputs."],
  ["/ahte/command-center","24/7 Command Center","GHSCL + JAKIM-connected monitoring, prediction, preemptive strategy and escalation."],
  ["/ahte/governance","Governance","Authority boundaries, decision classes, source controls and accountable oversight."],
] as const;

export default async function AHTEPage(){
  const {supabase,user}=await requireUser();
  const org=await getPrimaryWorkspace(supabase,user.id);
  if(!org)return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace before using AHTE.</p></div></div>;
  const db=supabase as any;
  const tables=["ahte_authorities","ahte_instruments","ahte_requirements","ahte_controls","ahte_evidence","ahte_findings","ahte_authority_gates","ahte_trust_states","ahte_shipments","ahte_trust_packets"] as const;
  const counts=requireQueryResults(await Promise.all(tables.map(table=>db.from(table).select("id",{count:"exact",head:true}).eq("organization_id",org.id))));
  const labels=["Authorities","Instruments","Requirements","Controls","Evidence","Findings","Authority gates","Trust states","Shipments","Trust packets"];
  return <div className="page stack-xl">
    <header className="page-header"><div><div className="eyebrow">AHTE / IQ300 CONTROL PLANE</div><h1>Amanah Halal Trust Ecosystem</h1><p className="lead">Operational evidence, 24/7 monitoring, predictive assurance and trust infrastructure mapped to the canonical IQ300 path.</p></div><Link href="/projects" className="button">Projects</Link></header>
    <section className="card"><div className="eyebrow">CANONICAL PATH</div><p><strong>Authority → Standard / Instrument → Clause / Requirement → Applicability → Control → HCP / SCCP → Evidence → Audit Test → Finding → Corrective Action → Re-verification → Authority Gate → Trust State → Operational Release</strong></p><p className="muted">Current project target: AHTE ⇄ Direct JAKIM API ⇄ JAKIM. Amanah does not replace competent-authority decisions; AI/ML remains governed decision support and operational release is not certification.</p></section>
    <section className="metric-grid">{labels.map((label,i)=><div className="metric-card" key={label}><span>{label}</span><strong>{counts[i].count??0}</strong></div>)}</section>
    <section className="card-grid">{modules.map(([href,title,description])=><Link className="card" href={href} key={href}><div className="eyebrow">AHTE MODULE</div><h2>{title}</h2><p className="muted">{description}</p><span>Open →</span></Link>)}</section>
  </div>
}
