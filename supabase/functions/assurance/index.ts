import { createClient } from "npm:@supabase/supabase-js@2.114.0";
import { objectBody, packetError, requestIdentity } from "./validation.ts";
import trustMachine from "./trust-machine.json" with { type: "json" };

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, idempotency-key",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
};

function reply(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

async function hash(input: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function requestParts(req: Request) {
  const url = new URL(req.url);
  return {
    url,
    parts: url.pathname.replace(/^\/functions\/v1\/assurance\/?/, "").split("/").filter(Boolean),
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return reply({ ok: true });
  if (!["GET", "POST"].includes(req.method)) return reply({ error: "method_not_allowed" }, 405);

  const authorization = req.headers.get("authorization");
  if (!authorization?.toLowerCase().startsWith("bearer ")) return reply({ error: "authentication_required" }, 401);

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
  const { url, parts } = requestParts(req);
  const head = parts[0] ?? "";

  let body: Record<string, unknown> = {};
  if (req.method === "POST") {
    if (!(req.headers.get("content-type") ?? "").includes("application/json")) return reply({ error: "json_content_type_required" }, 415);
    try {
      const parsed: unknown = await req.json();
      if (!objectBody(parsed)) return reply({ error: "json_object_required" }, 400);
      body = parsed;
    } catch { return reply({ error: "invalid_json" }, 400); }
  }

  const organizationId = typeof body.organization_id === "string"
    ? body.organization_id
    : (url.searchParams.get("organization_id") ?? null);
  if (!organizationId) return reply({ error: "organization_id_required" }, 400);

  const { data: membership, error: membershipError } = await supabase.from("organization_members")
    .select("organization_id,role").eq("organization_id", organizationId).eq("user_id", userId).maybeSingle();
  if (membershipError || !membership) return reply({ error: "workspace_forbidden" }, 403);

  if (req.method === "POST") {
    const { data: allowed, error: rateError } = await supabase.rpc("ahte_rate_limit_proxy", {
      p_org: organizationId, p_route: head || "root", p_limit: 120,
    });
    if (rateError) return reply({ error: rateError.message }, 500);
    if (allowed !== true) return reply({ error: "rate_limit_exceeded" }, 429);
  }

  const idempotencyKey = req.headers.get("idempotency-key");
  if (req.method === "POST" && idempotencyKey) {
    const requestHash = await hash(requestIdentity(req.method, url.pathname, userId, body));
    const { data: prior, error: priorError } = await supabase.from("ahte_api_idempotency")
      .select("actor_user_id,request_hash,response_status,response_body").eq("organization_id", organizationId)
      .eq("idempotency_key", idempotencyKey).maybeSingle();
    if (priorError) return reply({ error: "idempotency_lookup_failed" }, 500);
    if (prior) {
      if (prior.actor_user_id !== userId) return reply({ error: "idempotency_actor_mismatch" }, 409);
      if (prior.request_hash !== requestHash) return reply({ error: "idempotency_key_reused_with_different_request" }, 409);
      if (prior.response_status == null || prior.response_body == null) return reply({ error: "idempotency_request_in_progress" }, 409);
      return reply(prior.response_body, prior.response_status);
    }
    const { error: reserveError } = await supabase.from("ahte_api_idempotency").insert({
      organization_id: organizationId, idempotency_key: idempotencyKey, actor_user_id: userId, request_hash: requestHash,
    });
    if (reserveError) return reply({ error: reserveError.message }, 409);
  }

  async function finish(payload: unknown, status = 200) {
    if (req.method === "POST" && idempotencyKey) {
      const { error } = await supabase.from("ahte_api_idempotency").update({ response_status: status, response_body: payload })
        .eq("organization_id", organizationId).eq("idempotency_key", idempotencyKey).eq("actor_user_id", userId);
      if (error) return reply({ error: "idempotency_completion_failed" }, 500);
    }
    return reply(payload, status);
  }

  if (req.method === "GET" && head === "health") {
    return reply({ ok: true, service: "ahte-assurance", project: "Amanah", organization_id: organizationId });
  }

  if (req.method === "POST" && head === "packets") {
    const shapeError = packetError(body);
    if (shapeError) return finish({ error: shapeError }, 400);
    if (typeof body.packet_type !== "string" || typeof body.schema_version !== "string" || !body.identity_object || !body.evidence_object)
      return finish({ error: "packet_type_schema_version_identity_and_evidence_required" }, 400);
    const contentHash = typeof body.content_hash === "string" ? body.content_hash : await hash(JSON.stringify(body));
    const { data, error } = await supabase.from("ahte_trust_packets").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      packet_type: body.packet_type, schema_version: body.schema_version, identity_object: body.identity_object,
      certificate_object: body.certificate_object ?? null, evidence_object: body.evidence_object, custody_object: body.custody_object ?? null,
      audit_object: body.audit_object ?? null, authority_gate_object: body.authority_gate_object ?? null,
      trust_state_object: body.trust_state_object ?? null, port_custody_object: body.port_custody_object ?? null,
      content_hash: contentHash, status: "draft",
    }).select("id,packet_type,schema_version,status,content_hash").single();
    if (error) return finish({ error: error.message }, 400);
    const { error: eventError } = await supabase.rpc("ahte_record_event_proxy", {
      p_org: organizationId, p_event_type: "E-TRUST-PACKET-DRAFT", p_entity_type: "trust_packet", p_entity_id: data.id,
      p_actor_type: "user", p_actor_id: userId, p_payload: { packet_id: data.id, packet_type: data.packet_type }, p_source_system: "assurance-api",
    });
    if (eventError) return finish({ error: eventError.message }, 500);
    return finish({ data, is_certification: false }, 201);
  }

  if (req.method === "POST" && head === "evidence") {
    if (typeof body.title !== "string" || typeof body.evidence_type !== "string") return finish({ error: "title_and_evidence_type_required" }, 400);
    const evidenceClass = typeof body.evidence_class === "string" ? body.evidence_class : "E2";
    if (!["E1","E2","E3","E4","E5"].includes(evidenceClass)) return finish({ error: "invalid_evidence_class" }, 400);
    if (evidenceClass === "E5" && !body.external_authority_reference) return finish({ error: "e5_requires_external_authority_reference" }, 400);
    const metadata = { ...(body.metadata && typeof body.metadata === "object" ? body.metadata as Record<string, unknown> : {}),
      external_authority_reference: body.external_authority_reference ?? null, authority_signature_hash: body.signature_hash ?? null };
    const { data, error } = await supabase.from("ahte_evidence").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      control_id: typeof body.control_id === "string" ? body.control_id : null, evidence_class: evidenceClass, title: body.title, evidence_type: body.evidence_type,
      source_uri: typeof body.source_uri === "string" ? body.source_uri : null, content_hash: typeof body.content_hash === "string" ? body.content_hash : null,
      collected_at: typeof body.collected_at === "string" ? body.collected_at : null, valid_from: typeof body.valid_from === "string" ? body.valid_from : null,
      valid_to: typeof body.valid_to === "string" ? body.valid_to : null, status: typeof body.status === "string" ? body.status : "unverified",
      metadata, created_by: userId,
    }).select("id,title,evidence_class,evidence_type,status,content_hash").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "assess") {
    const conclusion = typeof body.conclusion === "string" ? body.conclusion : (typeof body.assessment === "string" ? body.assessment : "");
    if (!conclusion || typeof body.subject_type !== "string" || typeof body.subject_id !== "string") return finish({ error: "subject_and_conclusion_required" }, 400);
    const { data, error } = await supabase.from("ahte_assessments").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null, subject_type: body.subject_type,
      subject_id: body.subject_id, model_name: typeof body.model_name === "string" ? body.model_name : "external-advisory-model",
      model_version: typeof body.model_version === "string" ? body.model_version : "unconfigured", assessment: conclusion,
      confidence: typeof body.confidence === "number" ? body.confidence : null, evidence_ids: Array.isArray(body.evidence_ids) ? body.evidence_ids : [], status: "advisory",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, authority_decision_created: false, creates_certification: false, hitm_class: "D2" }, 201);
  }

  if (req.method === "POST" && head === "hitm" && parts[1] === "evaluate") {
    const decisionClass = typeof body.decision_class === "string" ? body.decision_class : "";
    if (!["D3","D4","D5","D6"].includes(decisionClass)) return finish({ error: "invalid_decision_class" }, 400);
    if (decisionClass === "D5" || decisionClass === "D6") return finish({ error: "authority_gate_reserved", default: "deny" }, 403);
    if (typeof body.question !== "string") return finish({ error: "question_required" }, 400);
    const { data, error } = await supabase.from("ahte_hitm_cases").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      assessment_id: typeof body.assessment_id === "string" ? body.assessment_id : null, decision_class: decisionClass, status: "open",
      assigned_to: typeof body.assigned_to === "string" ? body.assigned_to : null, question: body.question,
      evidence_ids: Array.isArray(body.evidence_ids) ? body.evidence_ids : [],
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, default_deny: true }, 201);
  }

  if (req.method === "POST" && head === "products") {
    if (typeof body.name !== "string") return finish({ error: "product_name_required" }, 400);
    const { data, error } = await supabase.from("ahte_products").insert({
      organization_id: organizationId, manufacturer_partner_id: typeof body.manufacturer_partner_id === "string" ? body.manufacturer_partner_id : null,
      name: body.name, category: typeof body.category === "string" ? body.category : null, market_status: typeof body.market_status === "string" ? body.market_status : "not_cleared",
      status: typeof body.status === "string" ? body.status : "draft", description: typeof body.description === "string" ? body.description : null, metadata: body.metadata ?? {},
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400); return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "lab-results") {
    if (typeof body.sample_id !== "string" || typeof body.analyte !== "string") return finish({ error: "sample_and_analyte_required" }, 400);
    const { data, error } = await supabase.from("ahte_lab_results").insert({
      organization_id: organizationId, sample_id: body.sample_id, analyte: body.analyte, result_value: typeof body.result_value === "string" ? body.result_value : null,
      unit: typeof body.unit === "string" ? body.unit : null, interpretation: typeof body.interpretation === "string" ? body.interpretation : null,
      result_class: typeof body.result_class === "string" ? body.result_class : "indeterminate", report_ref: typeof body.report_ref === "string" ? body.report_ref : null,
      signature_hash: typeof body.signature_hash === "string" ? body.signature_hash : null, status: typeof body.status === "string" ? body.status : "draft",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400); return finish({ data, not_certification: true }, 201);
  }

  if (req.method === "POST" && head === "shipments") {
    if (typeof body.shipment_code !== "string") return finish({ error: "shipment_code_required" }, 400);
    const { data, error } = await supabase.from("ahte_shipments").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null, shipment_code: body.shipment_code,
      corridor: typeof body.corridor === "string" ? body.corridor : "China → GCC direct", origin_country: typeof body.origin_country === "string" ? body.origin_country : null,
      destination_market: typeof body.destination_market === "string" ? body.destination_market : null, importer: typeof body.importer === "string" ? body.importer : null,
      exporter: typeof body.exporter === "string" ? body.exporter : null, status: typeof body.status === "string" ? body.status : "not_instantiated",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    const eventError = await supabase.rpc("ahte_record_event_proxy",{p_org:organizationId,p_event_type:"SHIPMENT_CREATED",p_entity_type:"shipment",p_entity_id:data.id,p_actor_type:"user",p_actor_id:userId,p_payload:{shipment_code:data.shipment_code},p_source_system:"assurance-api"});
    if (eventError.error) return finish({ error: eventError.error.message },500); return finish({ data },201);
  }

  if (req.method === "POST" && head === "logistics-events") {
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string" || typeof body.event_type !== "string") return finish({ error: "entity_and_event_required" },400);
    const occurredAt = typeof body.occurred_at === "string" ? body.occurred_at : new Date().toISOString();
    const { data, error } = await supabase.from("ahte_custody_events").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null, entity_type: body.entity_type, entity_id: body.entity_id,
      event_type: body.event_type, location: typeof body.location === "string" ? body.location : null, occurred_at: occurredAt,
      actor_identity_id: typeof body.actor_identity_id === "string" ? body.actor_identity_id : null, evidence_id: typeof body.evidence_id === "string" ? body.evidence_id : null,
      metadata: body.metadata ?? {},
    }).select("*").single();
    if (error) return finish({ error: error.message },400);
    await supabase.rpc("ahte_record_event_proxy",{p_org:organizationId,p_event_type:body.event_type,p_entity_type:body.entity_type,p_entity_id:body.entity_id,p_actor_type:"user",p_actor_id:userId,p_payload:{custody_event_id:data.id,location:data.location,occurred_at:data.occurred_at},p_source_system:"assurance-api"});
    return finish({ data },201);
  }

  if (req.method === "POST" && head === "retail-events") {
    if (typeof body.action !== "string") return finish({ error: "action_required" },400);
    const { data, error } = await supabase.from("ahte_retail_events").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null, batch_id: typeof body.batch_id === "string" ? body.batch_id : null,
      location: typeof body.location === "string" ? body.location : null, action: body.action, actor_user_id: userId, occurred_at: typeof body.occurred_at === "string" ? body.occurred_at : new Date().toISOString(),
      evidence_id: typeof body.evidence_id === "string" ? body.evidence_id : null, metadata: body.metadata ?? {},
    }).select("*").single();
    if (error) return finish({ error: error.message },400); return finish({ data },201);
  }

  if (req.method === "POST" && head === "telemetry") {
    if (typeof body.device_id !== "string" || typeof body.metric_type !== "string" || typeof body.event_hash !== "string") return finish({ error: "device_metric_hash_required" },400);
    const { data, error } = await supabase.from("ahte_telemetry_events").insert({
      organization_id: organizationId, device_id: body.device_id, shipment_id: typeof body.shipment_id === "string" ? body.shipment_id : null, batch_id: typeof body.batch_id === "string" ? body.batch_id : null,
      metric_type: body.metric_type, metric_value: typeof body.metric_value === "number" ? body.metric_value : null, unit: typeof body.unit === "string" ? body.unit : null,
      observed_at: typeof body.observed_at === "string" ? body.observed_at : new Date().toISOString(), received_at: new Date().toISOString(), sequence_no: typeof body.sequence_no === "number" ? body.sequence_no : null,
      event_code: typeof body.event_code === "string" ? body.event_code : null, event_hash: body.event_hash, signature: typeof body.signature === "string" ? body.signature : null, metadata: body.metadata ?? {},
    }).select("*").single();
    if (error) return finish({ error: error.message },400); return finish({ data },201);
  }

  if (req.method === "POST" && head === "inbound-events") {
    if (typeof body.integration_id !== "string" || typeof body.external_event_id !== "string" || typeof body.event_type !== "string" || !body.payload) return finish({ error: "integration_event_payload_required" },400);
    const payloadHash=await hash(JSON.stringify(body.payload));
    const { data, error } = await supabase.from("ahte_inbound_events").insert({ organization_id:organizationId,integration_id:body.integration_id,external_event_id:body.external_event_id,event_type:body.event_type,payload:body.payload,payload_hash:payloadHash,status:"received" }).select("*").single();
    if (error) return finish({ error:error.message },400); return finish({ data },201);
  }

  if (req.method === "POST" && head === "credential-checks") {
    if (typeof body.certificate_id !== "string" || typeof body.source_type !== "string") return finish({ error:"certificate_and_source_required" },400);
    const { data,error }=await supabase.from("ahte_credential_checks").insert({
      organization_id:organizationId,certificate_id:body.certificate_id,source_type:body.source_type,source_reference:typeof body.source_reference==="string"?body.source_reference:null,
      issuer_verified:body.issuer_verified===true,scope_match:body.scope_match===true,validity_status:typeof body.validity_status==="string"?body.validity_status:"unknown",
      checked_until:typeof body.checked_until==="string"?body.checked_until:null,content_hash:typeof body.content_hash==="string"?body.content_hash:null,evidence_id:typeof body.evidence_id==="string"?body.evidence_id:null,notes:typeof body.notes==="string"?body.notes:null
    }).select("*").single();
    if(error)return finish({error:error.message},400);return finish({data},201);
  }

  if (req.method === "POST" && head === "market-registrations") {
    if (typeof body.product_id !== "string" || typeof body.market_code !== "string") return finish({error:"product_and_market_required"},400);
    const {data,error}=await supabase.from("ahte_market_registrations").insert({
      organization_id:organizationId,product_id:body.product_id,market_code:body.market_code,importer_name:typeof body.importer_name==="string"?body.importer_name:null,
      registration_reference:typeof body.registration_reference==="string"?body.registration_reference:null,halal_acceptance_reference:typeof body.halal_acceptance_reference==="string"?body.halal_acceptance_reference:null,
      status:typeof body.status==="string"?body.status:"pending",effective_from:typeof body.effective_from==="string"?body.effective_from:null,expires_on:typeof body.expires_on==="string"?body.expires_on:null,
      authority_reference:typeof body.authority_reference==="string"?body.authority_reference:null,evidence_id:typeof body.evidence_id==="string"?body.evidence_id:null
    }).select("*").single();
    if(error)return finish({error:error.message},400);return finish({data},201);
  }

  if (req.method === "POST" && head === "twins") {
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string") return finish({error:"entity_required"},400);
    const contentHash=typeof body.content_hash==="string"?body.content_hash:await hash(JSON.stringify(body.snapshot??{}));
    const {data,error}=await supabase.from("ahte_digital_twins").upsert({organization_id:organizationId,entity_type:body.entity_type,entity_id:body.entity_id,twin_version:typeof body.twin_version==="number"?body.twin_version:1,status:typeof body.status==="string"?body.status:"active",snapshot:body.snapshot??{},content_hash:contentHash,source_event_id:typeof body.source_event_id==="number"?body.source_event_id:null},{onConflict:"organization_id,entity_type,entity_id"}).select("*").single();
    if(error)return finish({error:error.message},400);return finish({data},201);
  }

  if (req.method === "POST" && head === "public-verifications") {
    if (typeof body.packet_id !== "string") return finish({error:"packet_id_required"},400);
    const {data:token,error}=await supabase.rpc("ahte_create_public_verification_proxy",{p_org:organizationId,p_packet_id:body.packet_id,p_disclosure:body.disclosure??{},p_expires_at:typeof body.expires_at==="string"?body.expires_at:null});
    if(error)return finish({error:error.message},400);
    return finish({token,verification_url:supabaseUrl+"/functions/v1/public-verify?token="+encodeURIComponent(token),not_certification:true},201);
  }

  if (req.method === "POST" && head === "hold") {
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string" || typeof body.trigger !== "string") return finish({ error: "entity_and_trigger_required" }, 400);
    const { data, error } = await supabase.from("ahte_fracture_events").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null, entity_type: body.entity_type, entity_id: body.entity_id,
      fracture_type: body.trigger, severity: typeof body.severity === "string" ? body.severity : "high", auto_hold: true,
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, released: false }, 201);
  }

  if (req.method === "POST" && head === "release") {
    if (!["owner","admin","executive","project_manager"].includes(membership.role)) return finish({error:"release_restricted"},403);
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string") return finish({ error: "entity_required" }, 400);
    const { data: eligibility, error: evalError } = await supabase.rpc("ahte_evaluate_release_proxy", {
      p_org: organizationId, p_entity_type: body.entity_type, p_entity_id: body.entity_id, p_requires_authority: body.requires_authority_gate === true,
    });
    if (evalError) return finish({ error: evalError.message }, 400);
    if (!eligibility || eligibility.eligible !== true) return finish({ error: "release_blocked", eligibility }, 409);
    if (body.project_id != null && body.project_id !== eligibility.project_id) return finish({ error: "release_project_mismatch" }, 409);
    const { data, error } = await supabase.from("ahte_release_decisions").insert({
      organization_id: organizationId, project_id: eligibility.project_id ?? null, trust_state_id: eligibility.trust_state_id ?? null,
      decision: "release", reason: typeof body.reason === "string" ? body.reason : "Operational release after eligibility evaluation", decided_by: userId,
      conditions: { is_certification: false },
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, is_certification: false, eligibility }, 201);
  }

  if (req.method === "POST" && head === "authority-decisions") {
    if (body.issued_by_ahte === true) return finish({ error: "ahte_cannot_issue_authority_decision" }, 403);
    if (!["owner","admin","executive"].includes(membership.role)) return finish({ error:"authority_decision_recording_restricted" },403);
    if (typeof body.decision !== "string" || typeof body.decision_reference !== "string" || typeof body.authority_gate_id !== "string" || typeof body.signature_hash !== "string")
      return finish({ error: "external_authority_decision_fields_required" }, 400);
    const { data, error } = await supabase.from("ahte_authority_decisions").insert({
      organization_id: organizationId, authority_gate_id: body.authority_gate_id, hitm_case_id: typeof body.hitm_case_id === "string" ? body.hitm_case_id : null,
      decision: body.decision, decision_reference: body.decision_reference, signed_by: typeof body.signed_by === "string" ? body.signed_by : null,
      signature_hash: body.signature_hash, decided_at: new Date().toISOString(), status: "final",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, evidence_class: "E5", issued_by_ahte: false }, 201);
  }

  if (req.method === "GET" && head === "state" && parts[1]) {
    const packetId = parts[1];
    const { data: packet, error: packetError } = await supabase.from("ahte_trust_packets").select("id,organization_id,packet_type,status,content_hash").eq("id",packetId).eq("organization_id",organizationId).maybeSingle();
    if(packetError)return reply({error:packetError.message},400); if(!packet)return reply({error:"packet_not_found"},404);
    const results=await Promise.all([
      supabase.from("ahte_trust_states").select("*").eq("organization_id",organizationId).eq("entity_type","trust_packet").eq("entity_id",packetId).order("effective_at",{ascending:false}).limit(1).maybeSingle(),
      supabase.from("ahte_trust_vectors").select("*").eq("organization_id",organizationId).eq("entity_type","trust_packet").eq("entity_id",packetId).order("calculated_at",{ascending:false}).limit(1).maybeSingle(),
      supabase.from("ahte_fracture_events").select("fracture_type,severity,auto_hold,resolution,detected_at").eq("organization_id",organizationId).eq("entity_type","trust_packet").eq("entity_id",packetId).order("detected_at",{ascending:false}).limit(20)
    ]);
    if (results.some(result => result.error)) return reply({error:"state_lookup_failed"},500);
    const [{data:state},{data:vector},{data:fractures}]=results;
    return reply({packet,trust_state:state,trust_vector:vector,fractures:fractures??[],score_is_sovereign:false,not_certification:true});
  }

  if (req.method === "GET" && head === "evidence" && parts[1]) {
    const {data,error}=await supabase.from("ahte_evidence").select("id,title,evidence_class,evidence_type,status,source_uri,content_hash,collected_at,valid_from,valid_to,metadata").eq("id",parts[1]).eq("organization_id",organizationId).maybeSingle();
    if(error)return reply({error:error.message},400); if(!data)return reply({error:"evidence_not_found"},404);
    return reply({data,integrity:{hash_present:Boolean(data.content_hash),content_hash:data.content_hash,verification_method:"stored_hash_reference"}});
  }

  if (req.method === "GET" && head === "products" && parts[1] && parts[2] === "verification") {
    const productId=parts[1];
    const results=await Promise.all([
      supabase.from("ahte_products").select("id,name,category,market_status,status").eq("id",productId).eq("organization_id",organizationId).maybeSingle(),
      supabase.from("ahte_trust_states").select("*").eq("organization_id",organizationId).eq("entity_type","product").eq("entity_id",productId).order("effective_at",{ascending:false}).limit(1).maybeSingle(),
      supabase.from("ahte_certificates").select("certificate_no,authority_id,status,issued_on,expires_on,scope").eq("organization_id",organizationId).eq("identity_id",productId).limit(20),
      supabase.from("ahte_market_registrations").select("market_code,status,registration_reference,halal_acceptance_reference,expires_on").eq("organization_id",organizationId).eq("product_id",productId),
      supabase.from("ahte_fracture_events").select("fracture_type,severity,auto_hold,resolution,detected_at").eq("organization_id",organizationId).eq("entity_type","product").eq("entity_id",productId).order("detected_at",{ascending:false}).limit(20)
    ]);
    if (results.some(result => result.error)) return reply({error:"product_verification_lookup_failed"},500);
    const [{data:product},{data:state},{data:certs},{data:markets},{data:fractures}]=results;
    if(!product)return reply({error:"product_not_found"},404);
    return reply({product,trust_state:state,certificates:certs??[],market_registrations:markets??[],fractures:fractures??[],not_certification:true,score_is_sovereign:false});
  }

  if (req.method === "POST" && head === "cases" && parts[1] && parts[2] === "corrective-actions") {
    if (typeof body.action_plan !== "string") return finish({error:"action_plan_required"},400);
    const findingId=parts[1];
    const {data:finding}=await supabase.from("ahte_findings").select("id").eq("id",findingId).eq("organization_id",organizationId).maybeSingle();
    if(!finding)return finish({error:"finding_not_found"},404);
    const {data,error}=await supabase.from("ahte_corrective_actions").insert({organization_id:organizationId,finding_id:findingId,owner_user_id:typeof body.owner_user_id==="string"?body.owner_user_id:userId,root_cause:typeof body.root_cause==="string"?body.root_cause:null,action_plan:body.action_plan,due_date:typeof body.due_date==="string"?body.due_date:null,status:"open"}).select("*").single();
    if(error)return finish({error:error.message},400);return finish({data},201);
  }

  if (req.method === "POST" && head === "recalls") {
    if(typeof body.recall_code!=="string"||typeof body.reason!=="string")return finish({error:"recall_code_and_reason_required"},400);
    const {data:recall,error}=await supabase.from("ahte_recalls").insert({organization_id:organizationId,recall_code:body.recall_code,reason:body.reason,scope:body.scope??{},authority_reference:typeof body.authority_reference==="string"?body.authority_reference:null,status:"open"}).select("*").single();
    if(error)return finish({error:error.message},400);
    if(Array.isArray(body.scope_entities)){
      const rows=body.scope_entities.filter((x):x is Record<string,unknown>=>Boolean(x&&typeof x==="object")).map(x=>({organization_id:organizationId,recall_id:recall.id,entity_type:String(x.entity_type??"unknown"),entity_id:String(x.entity_id??"00000000-0000-0000-0000-000000000000"),action:String(x.action??"monitor"),status:"open"}));
      if(rows.length){ const {error:scopeError}=await supabase.from("ahte_recall_scopes").insert(rows); if(scopeError)return finish({error:"recall_scope_write_failed",recall_id:recall.id},400); }
    }
    return finish({data:recall},201);
  }


  if (req.method === "POST" && head === "controls") {
    if (typeof body.code !== "string" || typeof body.name !== "string") return finish({ error: "control_code_and_name_required" }, 400);
    const { data, error } = await supabase.from("ahte_controls").insert({
      organization_id: organizationId,
      requirement_id: typeof body.requirement_id === "string" ? body.requirement_id : null,
      project_id: typeof body.project_id === "string" ? body.project_id : null,
      code: body.code,
      name: body.name,
      description: typeof body.description === "string" ? body.description : null,
      owner_user_id: typeof body.owner_user_id === "string" ? body.owner_user_id : null,
      status: typeof body.status === "string" ? body.status : "planned",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "critical-points") {
    if (typeof body.control_id !== "string" || typeof body.point_type !== "string" || typeof body.process_step !== "string") return finish({ error: "control_point_type_process_required" }, 400);
    const { data, error } = await supabase.from("ahte_critical_points").insert({
      organization_id: organizationId,
      control_id: body.control_id,
      point_type: body.point_type,
      process_step: body.process_step,
      hazard: typeof body.hazard === "string" ? body.hazard : null,
      control_measure: typeof body.control_measure === "string" ? body.control_measure : null,
      monitoring_method: typeof body.monitoring_method === "string" ? body.monitoring_method : null,
      escalation_rule: typeof body.escalation_rule === "string" ? body.escalation_rule : null,
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "applicability") {
    if (typeof body.requirement_id !== "string" || typeof body.decision !== "string") return finish({ error: "requirement_and_decision_required" }, 400);
    const decision = body.decision;
    if (!["applicable", "not_applicable", "conditional", "undetermined"].includes(String(decision))) return finish({ error: "invalid_applicability_decision" }, 400);
    const { data, error } = await supabase.from("ahte_applicability").insert({
      organization_id: organizationId,
      requirement_id: body.requirement_id,
      project_id: typeof body.project_id === "string" ? body.project_id : null,
      shipment_id: typeof body.shipment_id === "string" ? body.shipment_id : null,
      decision: String(decision),
      rationale: typeof body.rationale === "string" ? body.rationale : null,
      decided_by: userId,
      decided_at: new Date().toISOString(),
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "audit-tests") {
    if (typeof body.test_code !== "string" || typeof body.method !== "string") return finish({ error: "test_code_and_method_required" }, 400);
    const { data, error } = await supabase.from("ahte_audit_tests").insert({
      organization_id: organizationId,
      control_id: typeof body.control_id === "string" ? body.control_id : null,
      evidence_id: typeof body.evidence_id === "string" ? body.evidence_id : null,
      test_code: body.test_code,
      method: body.method,
      tester_user_id: userId,
      result: typeof body.result === "string" ? body.result : "pending",
      tested_at: new Date().toISOString(),
      notes: typeof body.notes === "string" ? body.notes : null,
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "findings") {
    if (typeof body.finding_code !== "string" || typeof body.description !== "string") return finish({ error: "finding_code_and_description_required" }, 400);
    const { data, error } = await supabase.from("ahte_findings").insert({
      organization_id: organizationId,
      audit_test_id: typeof body.audit_test_id === "string" ? body.audit_test_id : null,
      control_id: typeof body.control_id === "string" ? body.control_id : null,
      finding_code: body.finding_code,
      severity: typeof body.severity === "string" ? body.severity : "medium",
      description: body.description,
      status: typeof body.status === "string" ? body.status : "open",
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "reverifications") {
    if (typeof body.corrective_action_id !== "string" || typeof body.result !== "string") return finish({ error: "corrective_action_and_result_required" }, 400);
    const { data, error } = await supabase.from("ahte_reverifications").insert({
      organization_id: organizationId,
      corrective_action_id: body.corrective_action_id,
      result: body.result,
      tester_user_id: userId,
      tested_at: new Date().toISOString(),
      evidence_id: typeof body.evidence_id === "string" ? body.evidence_id : null,
      notes: typeof body.notes === "string" ? body.notes : null,
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "authority-gates") {
    if (typeof body.gate_code !== "string" || typeof body.gate_type !== "string") return finish({ error: "gate_code_and_type_required" }, 400);
    const { data, error } = await supabase.from("ahte_authority_gates").insert({
      organization_id: organizationId,
      project_id: typeof body.project_id === "string" ? body.project_id : null,
      authority_id: typeof body.authority_id === "string" ? body.authority_id : null,
      gate_code: body.gate_code,
      gate_type: body.gate_type,
      status: "open",
      decision_reference: null,
      decision_date: null,
      decided_by: null,
      rationale: typeof body.rationale === "string" ? body.rationale : null,
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data }, 201);
  }

  if (req.method === "POST" && head === "source-conflicts") {
    if (typeof body.source_a !== "string" || typeof body.source_b !== "string" || typeof body.conflict_point !== "string") return finish({ error: "source_a_source_b_conflict_point_required" }, 400);
    const { data, error } = await supabase.from("ahte_source_conflicts").insert({
      organization_id: organizationId,
      source_a: body.source_a,
      source_b: body.source_b,
      conflict_point: body.conflict_point,
      status: "open",
      escalated_to: typeof body.escalated_to === "string" ? body.escalated_to : "appropriate competent authority",
      resolution_ref: null,
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, open_gate: "source_conflict" }, 201);
  }

  if (req.method === "POST" && head === "trust-vectors") {
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string" || !body.dimensions) return finish({ error: "entity_and_dimensions_required" }, 400);
    const { data, error } = await supabase.from("ahte_trust_vectors").insert({
      organization_id: organizationId,
      project_id: typeof body.project_id === "string" ? body.project_id : null,
      entity_type: body.entity_type,
      entity_id: body.entity_id,
      dimensions: body.dimensions,
      score: typeof body.score === "number" ? body.score : null,
      methodology_version: typeof body.methodology_version === "string" ? body.methodology_version : null,
      calculated_at: new Date().toISOString(),
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, score_is_sovereign: false }, 201);
  }

  if (req.method === "POST" && head === "transition") {
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string" || typeof body.event !== "string") return finish({ error: "entity_and_event_required" }, 400);
    const projectId = typeof body.project_id === "string" ? body.project_id : null;
    const { data: current, error: currentError } = await supabase.from("ahte_trust_states")
      .select("id,project_id,state,hard_gate_status,vector,entity_type,entity_id")
      .eq("organization_id", organizationId)
      .eq("entity_type", body.entity_type)
      .eq("entity_id", body.entity_id)
      .order("effective_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (currentError) return finish({error:"current_state_lookup_failed"},500);

    const fromState = current?.state ?? "draft";
    const rule = trustMachine.transitions.find((entry) =>
      (Array.isArray(entry.from) ? entry.from.includes(fromState) : entry.from === fromState) && entry.on === body.event);
    const transition = rule ? { to_state: rule.to, required_decision_class: rule.on === "E5_authority_decision" ? "D5" : null } : null;
    if (!transition) return finish({ error: "undefined_transition", from_state: fromState, event: body.event, default: "remain_or_hold" }, 409);
    if (["D5","D6"].includes(String(transition.required_decision_class ?? ""))) return finish({ error: "authority_gate_reserved", decision_class: transition.required_decision_class }, 403);

    if (transition.to_state === "released") {
      const { data: eligibility, error: evalError } = await supabase.rpc("ahte_evaluate_release_proxy", {
        p_org: organizationId,
        p_entity_type: body.entity_type,
        p_entity_id: body.entity_id,
        p_requires_authority: body.requires_authority_gate === true,
      });
      if (evalError) return finish({ error: evalError.message }, 400);
      if (!eligibility || eligibility.eligible !== true) return finish({ error: "release_blocked", eligibility }, 409);
    }

    const { data: nextState, error: stateError } = await supabase.from("ahte_trust_states").insert({
      organization_id: organizationId,
      project_id: projectId ?? current?.project_id ?? null,
      entity_type: body.entity_type,
      entity_id: body.entity_id,
      state: transition.to_state,
      hard_gate_status: "open", // Database derives gates; caller claims never grant eligibility.
      transition_event: body.event,
      previous_state_id: current?.id ?? null,
      vector: body.vector ?? current?.vector ?? {},
      rationale: typeof body.rationale === "string" ? body.rationale : "State transition: " + body.event,
      effective_at: new Date().toISOString(),
    }).select("*").single();

    if (stateError) return finish({ error: stateError.message }, 400);
    // State and ledger write are atomic in the database trigger.
    return finish({ data: nextState, from_state: fromState, to_state: transition.to_state, not_certification: transition.to_state === "released" }, 201);
  }

  if (req.method === "POST" && head === "gate-results") {
    if (!["owner","admin","executive","project_manager"].includes(membership.role)) return finish({ error: "gate_review_restricted" }, 403);
    if (typeof body.entity_type !== "string" || typeof body.entity_id !== "string" || typeof body.gate_id !== "string" || typeof body.evidence_id !== "string" || typeof body.rationale !== "string") return finish({ error: "gate_subject_evidence_and_rationale_required" }, 400);
    const { data, error } = await supabase.from("ahte_gate_results").insert({
      organization_id: organizationId, project_id: typeof body.project_id === "string" ? body.project_id : null,
      entity_type: body.entity_type, entity_id: body.entity_id, gate_id: body.gate_id,
      result: typeof body.result === "string" ? body.result : "failed", evidence_id: body.evidence_id,
      authority_decision_id: typeof body.authority_decision_id === "string" ? body.authority_decision_id : null,
      reviewed_by: userId, rationale: body.rationale, expires_at: typeof body.expires_at === "string" ? body.expires_at : null,
    }).select("*").single();
    if (error) return finish({ error: error.message }, 400);
    return finish({ data, not_certification: true }, 201);
  }

  return reply({error:"route_not_found",supported:["/health","/packets","/evidence","/assess","/hitm/evaluate","/products","/products/{id}/verification","/lab-results","/shipments","/logistics-events","/retail-events","/telemetry","/inbound-events","/credential-checks","/market-registrations","/twins","/public-verifications","/hold","/release","/authority-decisions","/evidence/{id}","/state/{packet_id}","/cases/{finding_id}/corrective-actions","/recalls"]},404);
});
