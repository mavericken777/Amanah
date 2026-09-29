import type { SupabaseClient } from "@supabase/supabase-js";

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

  const membership = data?.[0];
  if (!membership) return null;

  const organizations = membership.organizations as
    | Array<{ id: string; name: string }>
    | null;
  const organization = organizations?.[0];

  return organization
    ? { id: organization.id, name: organization.name, role: membership.role }
    : null;
}
