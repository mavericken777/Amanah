import type { SupabaseClient } from "@supabase/supabase-js";

type WorkspaceMembership = {
  organization_id: string;
  role: string;
  organizations: { id: string; name: string } | null;
};

export async function getPrimaryWorkspace(
  supabase: SupabaseClient,
  userId: string,
) {
  const { data } = await supabase
    .from("organization_members")
    .select("organization_id, role, organizations(id, name)")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(1);

  const membership = data?.[0] as WorkspaceMembership | undefined;
  if (!membership?.organizations) return null;

  return {
    id: membership.organizations.id,
    name: membership.organizations.name,
    role: membership.role,
  };
}
