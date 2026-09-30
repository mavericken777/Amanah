import { createClient } from "npm:@supabase/supabase-js@2.114.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
};

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

async function sha256(input: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return reply({ ok: true });
  if (req.method !== "GET") return reply({ error: "method_not_allowed" }, 405);
  const token = new URL(req.url).searchParams.get("token");
  if (!token || token.length < 32) return reply({ valid: false, reason: "token_required" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return reply({ error: "server_configuration_missing" }, 500);

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });

  const tokenHash = await sha256(token);
  const { data: verification, error: verificationError } = await supabase
    .from("ahte_public_verifications")
    .select("id,organization_id,packet_id,disclosure,expires_at,revoked_at")
    .eq("token_hash", tokenHash)
    .is("revoked_at", null)
    .or("expires_at.is.null,expires_at.gt." + new Date().toISOString())
    .maybeSingle();

  if (verificationError) return reply({ valid: false, reason: "verification_unavailable" }, 503);
  if (!verification) return reply({ valid: false, reason: "not_found_or_expired" }, 404);

  const { data: packet, error: packetError } = await supabase
    .from("ahte_trust_packets")
    .select("id,packet_type,schema_version,status,content_hash")
    .eq("id", verification.packet_id)
    .eq("organization_id", verification.organization_id)
    .maybeSingle();

  if (packetError) return reply({ valid: false, reason: "verification_unavailable" }, 503);
  if (!packet) return reply({ valid: false, reason: "packet_not_found" }, 404);

  return reply({
    valid: true,
    verification_scope: "disclosure_token_only",
    packet_id: packet.id,
    packet_type: packet.packet_type,
    schema_version: packet.schema_version,
    status: packet.status,
    content_hash: packet.content_hash,
    disclosure: verification.disclosure,
    not_certification: true,
  });
});
