import { requireUser } from "@/lib/auth";
import Link from "next/link";

export default async function ChinaTripPage() {
  const { supabase, user } = await requireUser();

  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id, organizations(id, name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  const organization = memberships?.[0]?.organizations as { id: string; name: string } | undefined;

  if (!organization) {
    return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>;
  }

  const { data: project } = await supabase
    .from("projects")
    .select("id, name, status, start_date, end_date")
    .eq("organization_id", organization.id)
    .eq("module_key", "travel.china-trip")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!project) {
    return (
      <div className="page stack-xl">
        <header>
          <div className="eyebrow">TRAVEL MODULE</div>
          <h1>China Trip</h1>
          <p className="lead">The China Trip is the first Amanah domain module built from the original MD specification.</p>
        </header>
        <div className="card">
          <h2>Create the trip project</h2>
          <p className="muted">Go to Projects and select the Travel / China Trip module.</p>
          <Link className="button" href="/projects">Open Projects</Link>
        </div>
      </div>
    );
  }

  const [{ count: itineraryCount }, { count: meetingCount }, { count: travellerCount }, { count: openTaskCount }] =
    await Promise.all([
      supabase.from("itinerary_events").select("id", { count: "exact", head: true }).eq("organization_id", organization.id).eq("project_id", project.id),
      supabase.from("meetings").select("id", { count: "exact", head: true }).eq("organization_id", organization.id).eq("project_id", project.id),
      supabase.from("travellers").select("id", { count: "exact", head: true }).eq("organization_id", organization.id).eq("project_id", project.id),
      supabase.from("tasks").select("id", { count: "exact", head: true }).eq("organization_id", organization.id).eq("project_id", project.id).neq("status", "done"),
    ]);

  return (
    <div className="page stack-xl">
      <header className="page-header">
        <div>
          <div className="eyebrow">TRAVEL / CHINA TRIP</div>
          <h1>{project.name}</h1>
          <p className="lead">Trip planning is a module of Amanah, not the platform itself.</p>
        </div>
        <Link className="button button-secondary" href="/tasks">Open task register</Link>
      </header>

      <section className="metric-grid">
        <Metric label="Itinerary events" value={itineraryCount ?? 0} />
        <Metric label="Meetings" value={meetingCount ?? 0} />
        <Metric label="Travellers" value={travellerCount ?? 0} />
        <Metric label="Open trip actions" value={openTaskCount ?? 0} />
      </section>

      <section className="card-grid">
        {[
          ["Itinerary", "Dates, cities, activities, transport and daily briefs."],
          ["Logistics", "Flights, ground transport and connectivity."],
          ["Accommodation", "Hotels, allocations, check-in and check-out."],
          ["Meetings", "Objectives, attendees, documents, outcomes and follow-up."],
          ["Documents", "Compliance checklist and secure references."],
          ["Budget", "Planned spend, actuals, variance and expenses."],
          ["Risks", "Travel and operational risks with mitigation."],
          ["Decisions", "Formal record of agreed decisions and impact."],
        ].map(([title, text]) => (
          <article className="card" key={title}>
            <div className="eyebrow">MODULE</div>
            <h2>{title}</h2>
            <p className="muted">{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="metric-card"><span>{label}</span><strong>{value}</strong></div>;
}
