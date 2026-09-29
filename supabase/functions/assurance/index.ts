import { createClient } from "npm:@supabase/supabase-js@2.114.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, idempotency-key",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, "Content-Type": "application/json" },
  });
}

async function hash(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function route(req: Request) {
  const url = new URL(req.url);
  return url.pathname.replace(/^\/functions\/v1\/assurance\/?/, "").split("/").filter(Boolean);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return reply({ ok: true });

  const authorization = req.headers.get("authorization");
  if (!authorization || !authorization.toLowerCase().startsWith("bearer ")) {
    return reply({ error: "authentication_required" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const publicKey = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY");
  if (!supabaseUrl || !publicKey) return reply({ error: "server_configuration_missing" }, 500);

  const supabase = createClient(supabaseUrl, publicKey, {
    global: { headers: { Authorization: authorization } },
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData.user) return reply({ error: "invalid_token" }, 401);
  const userId = userData.user.id;

  let body: Record<string, unknown> = {};
  if (req.method === "POST" && (req.headers.get("content-type") ?? "").includes("application/json")) {
    const parsed = await req.json();
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) body = parsed as Record<string, unknown>;
  }

  const organizationId = typeof body.organization_id === "string" ? body.organization_id : null;
  if (req.method === "POST" && !organizationId) return reply({ error: "organization_id_required" }, 400);

  if (organizationId) {
    const { data: membership, error } = await supabase
      .from("organization_members")
      .select("organization_id,role")
      .eq("organization_id", organizationId)
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !membership) return reply({ error: "workspace_forbidden" }, 403);
  }

  const idempotencyKey = req.headers.get("idempotency-key");
  if (req.method === "POST" && organizationId && idempotencyKey) {
    const requestHash = await hash(JSON.stringify(body));
    const { data: prior } = await supabase
      .from("ahte_api_idempotency")
      .select("request_hash,response_status,response_body")
      .eq("organization_id", organizationId)
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();
    if (prior) {
      if (prior.request_hash !== requestHash) return reply({ error: "idempotency_key_reused_with_different_request" }, 409);
      return reply(prior.response_body ?? { ok: true }, prior.response_status ?? 200);
    }
    const { error: reserveError } = await supabase.from("ahte_api_idempotency").insert({
      organization_id: organizationId, idempotency_key: idempotencyKey, actor_user_id: userId, request_hash: requestHash,
    });
    if (reserveError) return reply({ error: reserveError.message }, 409);
  }

  async function finish(payload: unknown, status = 200) {
    if (req.method === "POST" && organizationId && idempotencyKey) {
      await supabase.from("ahte_api_idempotency")
        .update({ response_status: status, response_body: payload })
        .eq("organization_id", organizationId)
        .eq("idempotency_key", idempotencyKey)
        .eq("actor_user_id", userId);
    }
    return reply(payload, status);
  }

  const parts = route(req);
  const head = parts[0] ?? "";

  if (req.method === "POST" && head === "packets") {
    if (typeof body.packet_type !== "string" || typeof body.schema_version !== "string" || !body.identity_object || !body.evidence_object) {
      return finish({ error: "packet_type_schema_version_identity_and_evidence_required" }, 400);
    }
    const contentHash = typeof body.content_hash === "string" ? body.content_hash : await hash(JSON.stringify(body.evidence_object));
    const { data, error } = await supabase.from("ahte_trust_packets").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      packet_type: body.packet_type, schema_version: body.schema_version, identity_object: body.identity_object,
      certificate_object: body.certificate_object ?? null, evidence_object: body.evidence_object, custody_object: body.custody_object ?? null,
      audit_object: body.audit_object ?? null, authority_gate_object: body.authority_gate_object ?? null,
      trust_state_object: body.trust_state_object ?? null, port_custody_object: body.port_custody_object ?? null,
      content_hash: contentHash, status: "draft",
    }).select("id,packet_type,schema_version,status,content_hash").single();
    if (error) return finish({ error: error.message }, 400);
    await supabase.rpc("ahte_record_event_proxy", {
      p_org: organizationId, p_event_type: "E-TRUST-PACKET-DRAFT", p_entity_type: "trust_packet", p_entity_id: data.id,
      p_actor_type: "user", p_actor_id: userId, p_payload: { packet_type: data.packet_type, packet_id: data.id }, p_source_system: "assurance-api",
    });
    return finish({ data, is_certification: false }, 201);
  }

  if (req.method === "POST" && head === "evidence") {
    const { data, error } = await supabase.from("ahte_evidence").insert({
      organization_id: organizationId, title: typeof body.title === "string" ? body.title : "Untitled evidence",
      evidence_class: typeof body.evidence_class === "string" ? body.evidence_class : "E2",
      status: typeof body.status === "string" ? body.status : "unverified",
      source_type: typeof body.source_type === "string" ? body.source_type : null,
      source_reference: typeof body.source_reference === "string" ? body.source_reference : null,
      hash12: typeof body.hash12 === "string" ? body.hash12 : null,
      captured_at: typeof body.captured_at === "string" ? body.captured_at : null,
      storage_reference: typeof body.storage_reference === "string" ? body.storage_reference : null,
      metadata: body.metadata ?? {},
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "assess") {
    const conclusion = typeof body.conclusion === "string" ? body.conclusion : (typeof body.assessment === "string" ? body.assessment : "");
    if (!conclusion || typeof body.subject_type !== "string" || typeof body.subject_id !== "string") return finish({ error: "subject_and_conclusion_required" }, 400);
    const { data, error } = await supabase.from("ahte_assessments").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      subject_type: body.subject_type, subject_id: body.subject_id,
      model_name: typeof body.model_name === "string" ? body.model_name : "AHTE-advisory-placeholder",
      model_version: typeof body.model_version === "string" ? body.model_version : "unconfigured",
      assessment: conclusion, confidence: typeof body.confidence === "number" ? body.confidence : null,
      evidence_ids: Array.isArray(body.evidence_ids) ? body.evidence_ids : [], status: "advisory",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, authority_decision_created: false, evidence_class: "E4", hitm_class: "D2" }, 201);
  }

  if (req.method === "POST" && head === "hitm" && parts[1] === "evaluate") {
    const decisionClass = typeof body.decision_class === "string" ? body.decision_class : "";
    if (!["D3","D4","D5","D6"].includes(decisionClass)) return finish({ error: "invalid_decision_class" }, 400);
    if (decisionClass === "D5" || decisionClass === "D6") return finish({ error: "authority_gate_reserved", default: "deny" }, 403);
    const { data, error } = await supabase.from("ahte_hitm_cases").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      decision_class: decisionClass, jurisdiction: typeof body.jurisdiction === "string" ? body.jurisdiction : null,
      decision_type: typeof body.decision_type === "string" ? body.decision_type : "HITM review",
      question: typeof body.question === "string" ? body.question : "Human review required",
      assigned_to: typeof body.assigned_to === "string" ? body.assigned_to : null, status: "open",
      ai_confidence: typeof body.ai_confidence === "string" ? body.ai_confidence : "unscored",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, default_deny: true }, 201);
  }

  if (req.method === "POST" && head === "hold") {
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string" || typeof body.trigger !== "string") return finish({ error: "entity_and_trigger_required" }, 400);
    const { data, error } = await supabase.from("ahte_fracture_events").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      entity_type: body.entity_type, entity_id: body.entity_id, fracture_type: body.trigger, severity: "high", auto_hold: true, auto_release: false,
      metadata: { source: "assurance-api", actor_user_id: userId },
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, released: false }, 201);
  }

  if (req.method === "POST" && head === "release") {
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string") return finish({ error: "entity_required" }, 400);
    const requiresAuthority = body.requires_authority_gate === true;
    const { data: eligibility, error: evalError } = await supabase.rpc("ahte_evaluate_release_proxy", {
      p_org: organizationId, p_entity_type: body.entity_type, p_entity_id: body.entity_id, p_requires_authority: requiresAuthority,
    });
    if (evalError) return finish({ error: evalError.message }, 400);
    if (!eligibility || eligibility.eligible !== true) return finish({ error: "release_blocked", eligibility }, 409);
    const { data, error } = await supabase.from("ahte_release_decisions").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      trust_state_id: eligibility.trust_state_id ?? null, decision: "released",
      reason: typeof body.reason === "string" ? body.reason : "Operational release after eligibility evaluation",
      decided_by: userId, conditions: { is_certification: false },
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, is_certification: false, eligibility }, 201);
  }

  if (req.method === "POST" && head === "authority-decisions") {
    if (body.issued_by_ahte === true) return finish({ error: "ahte_cannot_issue_authority_decision" }, 403);
    if (typeof body.decision !== "string" || typeof body.decision_reference !== "string" || typeof body.authority_gate_id !== "string") return finish({ error: "external_authority_decision_fields_required" }, 400);
    const { data, error } = await supabase.from("ahte_authority_decisions").insert({
      organization_id: organizationId, authority_gate_id: body.authority_gate_id, hitm_case_id: typeof body.hitm_case_id === "string" ? body.hitm_case_id : null,
      decision: body.decision, decision_reference: body.decision_reference, signed_by: typeof body.signed_by === "string" ? body.signed_by : null,
      signature_hash: typeof body.signature_hash === "string" ? body.signature_hash : null, decided_at: new Date().toISOString(), status: "final",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, evidence_class: "E5", issued_by_ahte: false }, 201);
  }

  if (req.method === "GET" && head === "state" && parts[1]) {
    const packetId = parts[1];
    const { data: packet, error: packetError } = await supabase.from("ahte_trust_packets")
      .select("id,organization_id,packet_type,status,content_hash").eq("id", packetId).eq("organization_id", organizationId).maybeSingle();
    if (packetError) return reply({ error: packetError.message }, 400);
    if (!packet) return reply({ error: "packet_not_found" }, 404);
    const { data: state } = await supabase.from("ahte_trust_states").select("*").eq("organization_id", organizationId).eq("entity_type","trust_packet").eq("entity_id",packetId).order("effective_at",{ascending:false}).limit(1).maybeSingle();
    const { data: vector } = await supabase.from("ahte_trust_vectors").select("*").eq("organization_id", organizationId).eq("entity_type","trust_packet").eq("entity_id",packetId).order("calculated_at",{ascending:false}).limit(1).maybeSingle();
    return reply({ packet, trust_state: state, trust_vector: vector, score_is_sovereign: false, not_certification: true });
  }

  return reply({ error: "route_not_found", supported: ["/packets","/evidence","/assess","/hitm/evaluate","/hold","/release","/authority-decisions","/state/{packet_id}"] }, 404);
});