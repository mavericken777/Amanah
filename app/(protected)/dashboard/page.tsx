import { CreateWorkspace } from "@/components/create-workspace";
import { requireUser } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const { supabase, user } = await requireUser();

  const { data: memberships } = await supabase
    .from("organization_members")
    .select("organization_id, role, organizations(id, name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true });

  const organization = memberships?.[0]?.organizations as { id: string; name: string } | undefined;

  if (!organization) {
    return (
      <div className="page stack-xl">
        <header>
          <div className="eyebrow">AMANAH</div>
          <h1>Welcome to your operational platform.</h1>
          <p className="lead">Start by creating a workspace. The workspace becomes the container for people, projects, permissions and operational data.</p>
        </header>
        <CreateWorkspace userId={user.id} />
      </div>
    );
  }

  const orgId = organization.id;

  const [{ count: projectCount }, { count: taskCount }, { count: riskCount }, { count: documentCount }, { data: projects }] =
    await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("organization_id", orgId),
      supabase.from("tasks").select("id", { count: "exact", head: true }).eq("organization_id", orgId).neq("status", "done"),
      supabase.from("risks").select("id", { count: "exact", head: true }).eq("organization_id", orgId).eq("status", "open"),
      supabase.from("documents").select("id", { count: "exact", head: true }).eq("organization_id", orgId).neq("status", "approved"),
      supabase.from("projects").select("id, name, module_key, status, start_date, end_date").eq("organization_id", orgId).order("created_at", { ascending: false }).limit(6),
    ]);

  return (
    <div className="page stack-xl">
      <header className="page-header">
        <div>
          <div className="eyebrow">EXECUTIVE DASHBOARD</div>
          <h1>{organization.name}</h1>
          <p className="lead">Amanah is your current operational source of truth.</p>
        </div>
        <Link href="/projects" className="button">Manage projects</Link>
      </header>

      <section className="metric-grid">
        <Metric label="Projects" value={projectCount ?? 0} href="/projects" />
        <Metric label="Open tasks" value={taskCount ?? 0} href="/tasks" />
        <Metric label="Active risks" value={riskCount ?? 0} href="/projects" />
        <Metric label="Pending documents" value={documentCount ?? 0} href="/projects" />
      </section>

      <section className="stack">
        <div className="section-heading">
          <div>
            <div className="eyebrow">WORKSPACES / PROJECTS</div>
            <h2>Current projects</h2>
          </div>
        </div>
        <div className="card-grid">
          {(projects ?? []).map((project) => (
            <article className="card" key={project.id}>
              <div className="eyebrow">{project.module_key}</div>
              <h3>{project.name}</h3>
              <p className="muted">{project.status}</p>
              <Link href={project.module_key === "travel.china-trip" ? "/china-trip" : "/tasks"}>Open operational view →</Link>
            </article>
          ))}
          {!projects?.length ? <div className="empty card">No projects yet. Create the first one from Projects.</div> : null}
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value, href }: { label: string; value: number; href: string }) {
  return <Link className="metric-card" href={href}><span>{label}</span><strong>{value}</strong></Link>;
}
