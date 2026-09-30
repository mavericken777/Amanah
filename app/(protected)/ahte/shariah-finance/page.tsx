import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

const services = [
  ["Islamic trade finance", "Authorised transaction/trust evidence for financing workflows."],
  ["Purchase-order / receivables finance", "Purpose-bound evidence disclosure for eligible counterparties."],
  ["Inventory / shipment finance", "Asset, custody, shipment and exception-state evidence."],
  ["Takaful underwriting", "Risk/evidence packet support; underwriting remains externally owned."],
  ["Takaful claims", "Claims evidence, custody, condition, exception and integrity references."],
  ["Tokenomics / digital value", "Target support only where separately Shariah, legal and regulatory approved."],
] as const;

export default async function ShariahFinancePage() {
  const { supabase, user } = await requireUser();
  const org = await getPrimaryWorkspace(supabase, user.id);
  if (!org) return <div className="page"><div className="card"><h1>No workspace</h1></div></div>;
  const db = supabase as any;
  const [packets, packetCount, financing, takaful, tokens, connectors] = requireQueryResults(await Promise.all([
    db.from("ahte_finance_evidence_packets").select("packet_code,purpose,requesting_party,issued_at,valid_until,formal_authority_status_ref,ahte_trust_state_ref,supply_chain_state_ref").eq("organization_id", org.id).order("issued_at", { ascending: false }).limit(50),
    db.from("ahte_finance_evidence_packets").select("id", { count: "exact", head: true }).eq("organization_id", org.id),
    db.from("ahte_financing_cases").select("case_code,purpose,status,external_decision_owner,provider_ref,created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(25),
    db.from("ahte_takaful_cases").select("case_code,case_type,status,external_decision_owner,provider_ref,created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(25),
    db.from("ahte_tokenized_asset_references").select("reference_code,underlying_asset_type,legal_classification_status,shariah_review_status,regulatory_status,provider_ref,created_at").eq("organization_id", org.id).order("created_at", { ascending: false }).limit(25),
    db.from("ahte_connector_states").select("connector_code,domain,provider,state,environment,production_evidence,updated_at").eq("organization_id", org.id).in("domain", ["finance","takaful","tokenomics"]).order("updated_at", { ascending: false }).limit(25),
  ] as const));

  return <div className="page stack-xl">
    <header><div className="eyebrow">AHTE / SHARIAH FINANCE & TRADE</div><h1>Shariah Financing API / Takaful / approved tokenomics</h1><p className="lead">Authorised trust and trade evidence can support financing, underwriting and asset-state workflows without turning AHTE into the financing, Takaful, title, Shariah or certification decision-maker.</p></header>

    <section className="grid-3">{services.map(([title, text]) => <article className="card" key={title}><h2>{title}</h2><p>{text}</p></article>)}</section>

    <section className="grid-3">
      <article className="card"><div className="eyebrow">Evidence packets</div><h2>{packetCount.count ?? 0}</h2><p>Purpose-bound evidence disclosures.</p></article>
      <article className="card"><div className="eyebrow">Financing cases</div><h2>{(financing.data ?? []).length}</h2><p>Latest case window; external decision owner preserved.</p></article>
      <article className="card"><div className="eyebrow">Takaful cases</div><h2>{(takaful.data ?? []).length}</h2><p>Latest underwriting/claim case window.</p></article>
    </section>

    <section className="card"><h2>Connector state</h2>{(connectors.data ?? []).length ? (connectors.data ?? []).map((c:any)=><div className="row-between" key={c.connector_code}><span>{c.domain} · {c.provider || "provider not bound"}</span><span className="status">{c.state} · {c.environment}{c.production_evidence ? " · production evidence" : ""}</span></div>) : <p className="muted">No finance/Takaful/tokenomics connector record has been activated in this workspace.</p>}</section>

    <section className="card"><h2>Recent evidence packets</h2>{(packets.data ?? []).length ? (packets.data ?? []).map((p:any)=><div className="row-between" key={p.packet_code}><span><strong>{p.packet_code}</strong> · {p.purpose} · {p.requesting_party}</span><span className="status">{new Date(p.issued_at).toLocaleDateString()}</span></div>) : <p className="muted">No finance/Takaful evidence packets exist in this workspace.</p>}</section>

    <section className="card"><h2>Financing cases</h2>{(financing.data ?? []).length ? (financing.data ?? []).map((c:any)=><div className="row-between" key={c.case_code}><span>{c.case_code} · {c.purpose} · owner: {c.external_decision_owner}</span><span className="status">{c.status}</span></div>) : <p className="muted">No financing cases exist in this workspace.</p>}</section>

    <section className="card"><h2>Takaful cases</h2>{(takaful.data ?? []).length ? (takaful.data ?? []).map((c:any)=><div className="row-between" key={c.case_code}><span>{c.case_code} · {c.case_type} · owner: {c.external_decision_owner}</span><span className="status">{c.status}</span></div>) : <p className="muted">No Takaful cases exist in this workspace.</p>}</section>

    <section className="card"><h2>Token / digital-asset references</h2>{(tokens.data ?? []).length ? (tokens.data ?? []).map((t:any)=><div className="row-between" key={t.reference_code}><span>{t.reference_code} · {t.underlying_asset_type}</span><span className="status">legal {t.legal_classification_status} · Shariah {t.shariah_review_status} · regulatory {t.regulatory_status}</span></div>) : <p className="muted">No token/digital-asset references exist in this workspace.</p>}</section>

    <section className="card"><h2>Hard decision boundaries</h2><ul><li>AHTE trust state is not a credit decision.</li><li>Halal certification is not financing approval.</li><li>Takaful underwriting and claims decisions remain with the Takaful operator.</li><li>AHTE is not the legal title registry.</li><li>Tokenization does not itself change title, ownership, Shariah status, regulatory status or certification state.</li></ul></section>

    <section className="card"><h2>Activation status</h2><p>[PROPOSAL] Complete target objects and workflows exist. Live counterparties, production API credentials, product structures, Shariah approvals and legal/regulatory treatment remain external gates and are represented through explicit connector state rather than missing capability.</p></section>
  </div>;
}
