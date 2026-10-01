import Link from "next/link";
import { requireQueryResult, requireQueryResults } from "@/lib/query-results";
import { requireUser } from "@/lib/auth";

export default async function ChinaTripPage() {
  const { supabase, user } = await requireUser();

  const { data: memberships } = requireQueryResult(await supabase
    .from("organization_members")
    .select("organization_id, organizations(id, name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true }));

  const organization = memberships?.[0]?.organizations as { id: string; name: string } | undefined;

  if (!organization) {
    return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>;
  }

  const { data: project } = requireQueryResult(await supabase
    .from("projects")
    .select("id, name, status, start_date, end_date")
    .eq("organization_id", organization.id)
    .eq("module_key", "travel.china-trip")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle());

  if (!project) {
    return (
      <div className="page stack-xl">
        <header>
          <div className="eyebrow">CHINA MISSION / WORKSPACE</div>
          <h1>China Mission</h1>
          <p className="lead">Amanah uses this workspace to coordinate China mission preparation, stakeholder meetings, evidence, decisions, actions and operational risks.</p>
        </header>
        <div className="card">
          <h2>Create the China Mission project</h2>
          <p className="muted">Go to Projects and select the Travel / China Trip module.</p>
          <Link className="button" href="/projects">Open Projects</Link>
        </div>
      </div>
    );
  }

  const [{ count: itineraryCount }, { count: meetingCount }, { count: travellerCount }, { count: openTaskCount }] =
    requireQueryResults(await Promise.all([
      supabase.from("itinerary_events").select("id", { count: "exact", head: true }).eq("organization_id", organization.id).eq("project_id", project.id),
      supabase.from("meetings").select("id", { count: "exact", head: true }).eq("organization_id", organization.id).eq("project_id", project.id),
      supabase.from("travellers").select("id", { count: "exact", head: true }).eq("organization_id", organization.id).eq("project_id", project.id),
      supabase.from("tasks").select("id", { count: "exact", head: true }).eq("organization_id", organization.id).eq("project_id", project.id).neq("status", "done"),
    ] as const));

  return (
    <div className="page stack-xl">
      <header className="page-header">
        <div>
          <div className="eyebrow">CHINA MISSION / AMANAH</div>
          <h1>{project.name}</h1>
          <p className="lead">Mission preparation is a controlled workspace inside AMANAH. It coordinates people, evidence, meetings, decisions, actions, budget and risk without changing the canonical platform architecture.</p>
        </div>
        <Link className="button button-secondary" href="/tasks">Open task register</Link>
      </header>

      <section className="metric-grid">
        <Metric label="Itinerary events" value={itineraryCount ?? 0} />
        <Metric label="Meetings" value={meetingCount ?? 0} />
        <Metric label="Travellers" value={travellerCount ?? 0} />
        <Metric label="Open actions" value={openTaskCount ?? 0} />
      </section>

      <section className="card-grid">
        {[
          ["Itinerary", "Dates, cities, activities, transport and daily briefs."],
          ["Logistics", "Flights, ground transport and mission connectivity."],
          ["Accommodation", "Hotels, allocations, check-in and check-out."],
          ["Meetings", "Objectives, attendees, briefing material, outcomes and follow-up."],
          ["Documents", "Controlled mission documents, evidence references and compliance material."],
          ["Budget", "Planned spend, actuals, variance and expenses."],
          ["Risks", "Mission, partner, regulatory, integration, cybersecurity and operational risks with mitigation and escalation."],
          ["Decisions", "Formal record of agreed decisions, owners, evidence and impact."],
        ].map(([title, text]) => (
          <article className="card" key={title}>
            <div className="eyebrow">MISSION MODULE</div>
            <h2>{title}</h2>
            <p className="muted">{text}</p>
          </article>
        ))}
      </section>

      <section className="card-grid">
        <article className="card">
          <div className="eyebrow">CANONICAL TOPOLOGY</div>
          <h2>AHTE ⇄ Direct JAKIM API ⇄ JAKIM</h2>
          <p className="muted">The mission workspace coordinates preparation and evidence. It does not replace the competent authority, create halal certification by software, or introduce an intermediary authority hop.</p>
        </article>
        <article className="card">
          <div className="eyebrow">CORRIDOR</div>
          <h2>China → GCC direct</h2>
          <p className="muted">China is the production/origin ecosystem and GCC is the primary destination ecosystem. Malaysia remains the governance, assurance and authority-connectivity context unless separately scoped.</p>
        </article>
        <article className="card">
          <div className="eyebrow">COMMAND CENTRE</div>
          <h2>Continuous assurance</h2>
          <p className="muted">The wider AMANAH model connects laboratory evidence, audit, production, logistics, port and destination signals into continuous monitoring with AI/ML predictive and preemptive assistance and human governance.</p>
        </article>
        <article className="card">
          <div className="eyebrow">TRUTH STATUS</div>
          <h2>Evidence before trust</h2>
          <p className="muted">Project-defined capabilities and planned external integrations remain clearly separated from verified production facts. Shipment 001 remains not instantiated until real evidence exists.</p>
        </article>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="metric-card"><span>{label}</span><strong>{value}</strong></div>;
}
