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
    return <div className="page"><div className="card"><div className="eyebrow">AMANAH / ACCESS</div><h1>No workspace</h1><p className="muted">Create a controlled workspace from the dashboard first.</p></div></div>;
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
        <header className="mission-banner">
          <div className="eyebrow">CHINA MISSION / COMMAND WORKSPACE</div>
          <h1>China Mission</h1>
          <p className="lead">Coordinate stakeholder engagement, evidence, decisions, actions and operating readiness for the China → GCC trust corridor.</p>
          <div className="mission-route"><span>China Origin</span><b>→</b><span>AHTE Trust</span><b>→</b><span>Sinotrans / Port</span><b>→</b><span>GCC Destination</span></div>
        </header>
        <div className="card">
          <div className="eyebrow">MISSION SETUP</div>
          <h2>Create the China Mission workspace</h2>
          <p className="muted">Use the Travel / China Trip module to establish the controlled mission record, then connect meetings, evidence, actions, risks and decisions.</p>
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
      <header className="mission-banner">
        <div className="eyebrow">CHINA MISSION / COMMAND WORKSPACE</div>
        <h1>{project.name}</h1>
        <p className="lead">One mission-control workspace for counterpart engagement, evidence, meetings, decisions, actions, logistics, budget and operating risk across the China → GCC deployment programme.</p>
        <div className="mission-route" aria-label="Canonical mission corridor"><span>China Origin</span><b>→</b><span>Lab / Audit / AHTE</span><b>→</b><span>Sinotrans / Port</span><b>→</b><span>GCC Destination</span></div>
      </header>

      <section className="metric-grid" aria-label="Mission readiness metrics">
        <Metric label="Itinerary events" value={itineraryCount ?? 0} />
        <Metric label="Stakeholder meetings" value={meetingCount ?? 0} />
        <Metric label="Delegation members" value={travellerCount ?? 0} />
        <Metric label="Open actions" value={openTaskCount ?? 0} />
      </section>

      <section className="card-grid">
        {[
          ["Itinerary", "Dates, cities, counterpart sessions, transport and daily mission briefs."],
          ["Logistics", "Flights, ground transport, site access and mission connectivity."],
          ["Accommodation", "Hotels, allocations, check-in, check-out and delegation coordination."],
          ["Meetings", "Objectives, attendees, counterpart briefs, outcomes, commitments and follow-up."],
          ["Evidence", "Controlled mission documents, technical packs, evidence references and signing material."],
          ["Budget", "Planned spend, actuals, variance, expenses and mission cost visibility."],
          ["Risks", "Authority, partner, laboratory, logistics, port, technology, cyber and execution risks."],
          ["Decisions", "Formal record of agreed decisions, owners, evidence, dependencies and impact."],
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
          <div className="eyebrow">AUTHORITY CONNECTIVITY</div>
          <h2>AHTE ⇄ Direct JAKIM API ⇄ JAKIM</h2>
          <p className="muted">Evidence and status connectivity supports the competent-authority workflow while formal decisions remain with authorised humans and the competent authority.</p>
        </article>
        <article className="card">
          <div className="eyebrow">CORRIDOR</div>
          <h2>China → GCC direct</h2>
          <p className="muted">China anchors origin and production. GCC is the primary destination ecosystem. Malaysia provides governance, assurance and authority connectivity unless a separate physical route is scoped.</p>
        </article>
        <article className="card">
          <div className="eyebrow">24/7 COMMAND CENTER</div>
          <h2>Continuous assurance</h2>
          <p className="muted">Laboratory, audit, production, logistics, port and destination signals feed monitoring, AI/ML risk intelligence, preemptive strategy and accountable escalation.</p>
        </article>
        <article className="card">
          <div className="eyebrow">TRUST PRINCIPLE</div>
          <h2>Evidence before trust</h2>
          <p className="muted">Object identity, events, evidence, actors, timestamps and integrity proof remain linked so every material state can be traced and reviewed.</p>
        </article>
      </section>

      <div className="row-between">
        <Link className="button" href="/china-trip/meetings">Open stakeholder meetings</Link>
        <Link className="button button-secondary" href="/tasks">Open mission action register</Link>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="metric-card"><span>{label}</span><strong>{value}</strong></div>;
}
