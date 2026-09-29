import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function DocumentsPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  if (!workspace) return <EmptyState />;

  const { data: documents } = await supabase
    .from("documents")
    .select("id, title, classification, status, required_by, owner_user_id, storage_provider, storage_reference, projects(name)")
    .eq("organization_id", workspace.id)
    .order("required_by", { ascending: true, nullsFirst: false })
    .limit(100);

  return (
    <div className="page stack-xl">
      <header><div className="eyebrow">CORE PLATFORM</div><h1>Documents</h1><p className="lead">Metadata, compliance status and secure storage references. Sensitive source files stay outside Git.</p></header>
      <section className="card table-wrap">
        <table><thead><tr><th>Document</th><th>Classification</th><th>Required by</th><th>Project</th><th>Status</th><th>Storage</th></tr></thead>
        <tbody>{(documents ?? []).map((d) => {
          const project = d.projects as Array<{ name: string }> | null;
          return <tr key={d.id}><td>{d.title}</td><td>{d.classification}</td><td>{d.required_by ?? "—"}</td><td>{project?.[0]?.name ?? "—"}</td><td><span className="status">{d.status}</span></td><td>{d.storage_provider ? d.storage_provider : "Secure reference only"}</td></tr>;
        })}</tbody></table>
        {!documents?.length ? <p className="muted">No document records yet.</p> : null}
      </section>
    </div>
  );
}
function EmptyState() { return <div className="page"><div className="card"><h1>No workspace</h1><p className="muted">Create a workspace from the dashboard first.</p></div></div>; }
