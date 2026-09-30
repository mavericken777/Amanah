import { requireQueryResult } from "@/lib/query-results";
import { ProfileForm } from "@/components/profile-form";
import { requireUser } from "@/lib/auth";
import { getPrimaryWorkspace } from "@/lib/workspace";

export default async function SettingsPage() {
  const { supabase, user } = await requireUser();
  const workspace = await getPrimaryWorkspace(supabase, user.id);
  const { data: profile } = requireQueryResult(await supabase.from("profiles").select("full_name,avatar_url").eq("id", user.id).maybeSingle());

  return (
    <div className="page stack-xl">
      <header>
        <div className="eyebrow">SETTINGS</div>
        <h1>Account settings</h1>
        <p className="lead">Update your Amanah profile. Authentication is managed by Supabase Auth.</p>
      </header>
      <div className="content-grid">
        <ProfileForm userId={user.id} initialName={profile?.full_name ?? ""} />
        <section className="card stack">
          <div className="eyebrow">SESSION</div>
          <h2>Signed in account</h2>
          <p className="muted">{user.email ?? "Email unavailable"}</p>
          <p className="muted">Workspace role: {workspace?.role ?? "No workspace"}</p>
          <p className="muted">For password, MFA and identity-provider controls, use the authentication provider configuration.</p>
        </section>
      </div>
    </div>
  );
}
