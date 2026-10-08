export function objectBody(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function requestIdentity(method: string, pathname: string, actor: string, body: unknown): string {
  return JSON.stringify({ method, pathname, actor, body });
}

export function packetError(body: Record<string, unknown>): string | null {
  if (!objectBody(body.identity_object) || !objectBody(body.evidence_object)) return "packet_objects_required";
  for (const key of ["certificate_object", "custody_object", "audit_object", "certification_decision_object", "trust_state_object", "port_custody_object"]) {
    if (body[key] != null && !objectBody(body[key])) return "invalid_packet_object:" + key;
  }
  if (typeof body.packet_type !== "string" || !body.packet_type.trim() || typeof body.schema_version !== "string" || !body.schema_version.trim()) return "packet_type_and_schema_version_required";
  if (body.schema_version !== registry.version) return "unsupported_schema_version";
  for (const key of ["identity_object", "evidence_object", "certificate_object", "custody_object", "audit_object", "certification_decision_object", "trust_state_object", "port_custody_object"] as const) {
    if (body[key] == null) continue;
    const schema = registry.schemas[key];
    const validate = ajv.getSchema(schema.$id);
    if (!validate || !validate(body[key])) return "packet_schema_invalid:" + key;
  }
  return null;
}
import { Ajv2020 } from "ajv/dist/2020.js";
import addFormatsModule from "ajv-formats";
import registry from "./packet-schemas.json" with { type: "json" };
const ajv = new Ajv2020({ strict: true, allErrors: true });
// ajv-formats is CommonJS; Node/Deno expose the callable export with different TS shapes.
const addFormats = addFormatsModule as unknown as (instance: Ajv2020) => void;
addFormats(ajv);
for (const schema of Object.values(registry.schemas)) ajv.addSchema(schema);
