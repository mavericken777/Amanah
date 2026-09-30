import { requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

const services = [
  ["Islamic trade finance", "Authorised transaction/trust evidence for financing workflows."],
  ["Purchase-order finance", "Purpose-bound evidence disclosure for eligible counterparties."],
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
  const [packets, packetCount] = requireQueryResults(await Promise.all([
    db.from("ahte_finance_evidence_packets").select("packet_code,purpose,requesting_party,issued_at,valid_until,formal_authority_status_ref,ahte_trust_state_ref,supply_chain_state_ref").eq("organization_id", org.id).order("issued_at", { ascending: false }).limit(50),
    db.from("ahte_finance_evidence_packets").select("id", { count: "exact", head: true }).eq("organization_id", org.id),
  ] as const));

  return <div className="page stack-xl">
    <header><div className="eyebrow">AHTE / SHARIAH FINANCE & TRADE</div><h1>Shariah Financing API / Takaful / tokenomics</h1><p className="lead">Authorised trust and trade evidence can support financing, underwriting and asset-state workflows without turning AHTE into the financing, Takaful or certification decision-maker.</p></header>

    <section className="grid-3">{services.map(([title, text]) => <article className="card" key={title}><h2>{title}</h2><p>{text}</p></article>)}</section>

    <section className="card"><div className="eyebrow">PERSISTED FINANCE EVIDENCE PACKETS</div><h2>{packetCount.count ?? 0}</h2><p className="muted">Organization-scoped evidence packets. A packet is not a financing, underwriting, Shariah or certification decision.</p></section>

    <section className="card"><h2>Recent evidence packets</h2>{(packets.data ?? []).length ? (packets.data ?? []).map((p:any)=><div className="row-between" key={p.packet_code}><span><strong>{p.packet_code}</strong> · {p.purpose} · {p.requesting_party}</span><span className="status">{new Date(p.issued_at).toLocaleDateString()}</span></div>) : <p className="muted">No finance/Takaful evidence packets exist in this workspace.</p>}</section>

    <section className="card"><h2>Hard decision boundaries</h2><ul><li>AHTE trust state is not a credit decision.</li><li>Halal certification is not financing approval.</li><li>Takaful underwriting and claims decisions remain with the Takaful operator.</li><li>Tokenization does not itself change legal title, ownership, Shariah status, regulatory status or certification state.</li></ul></section>

    <section className="card"><h2>Finance evidence packet contract</h2><p>Target packet fields include purpose, requesting party, subject objects, authority-status reference, AHTE trust-state reference, supply-chain state, evidence/custody/exception references, disclosure policy, integrity manifest and authentication/signature reference.</p><p className="muted">Hard flags: creates_financing_decision=false · creates_takaful_decision=false · is_halal_certification=false.</p></section>

    <section className="card"><h2>Activation status</h2><p>[PROPOSAL] Architecture and persistence are implemented. Live counterparties, product structures, Shariah approvals, legal/regulatory treatment and production APIs remain external gates.</p></section>
  </div>;
}
