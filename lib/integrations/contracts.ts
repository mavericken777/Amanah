/**
 * [PROPOSAL] Replaceable integration ports. External transports remain unconfigured.
 * References: canonical source 3d5cc29fabf7, laboratory profile and smart-glass spec.
 * These are internal adapter envelopes, not invented external authority API schemas.
 */
export type ConnectorEnvironment = "development" | "production";
export type ConnectorHealth = "unconfigured" | "ready" | "degraded" | "unavailable";
export type IntegrationKind = "authority" | "laboratory" | "logistics" | "erp" | "mes" | "wms" | "qms" | "lims" | "iot" | "identity" | "integrity-anchor";

export interface SourceReference {
  sourceSystem: string;
  sourceRecordId: string;
  sourceVersion: string;
}
export interface IntegrityProof {
  contentHash: string;
  signatureReference: string;
  keyId: string;
  policyVersion: string;
}
export interface EvidenceEvent {
  organizationId: string;
  objectId: string;
  eventId: string;
  evidenceId: string;
  actorId: string;
  timestamp: string;
  eventType: string;
  source: SourceReference;
  integrity: IntegrityProof;
  environment: ConnectorEnvironment;
  simulated: boolean;
}
export interface ConnectorContext {
  organizationId: string;
  actorId: string;
  environment: ConnectorEnvironment;
  idempotencyKey: string;
  authorizedScopes: readonly string[];
}
export interface ConnectorReceipt {
  eventId: string;
  status: "received" | "rejected" | "pending";
  sourceReceiptReference?: string;
  errors: readonly string[];
  notCertification: true;
}
export interface Connector<T> {
  readonly kind: IntegrationKind;
  readonly environment: ConnectorEnvironment;
  health(): Promise<ConnectorHealth>;
  exchange(payload: T, context: ConnectorContext): Promise<ConnectorReceipt>;
}
export interface AuthorityExchange {
  event: EvidenceEvent;
  authorityId: string;
  caseReference: string;
  evidenceReferences: readonly string[];
  requestedAction: "submit-evidence" | "read-status";
}
export interface LabExchange {
  event: EvidenceEvent;
  sampleId: string;
  accessionId: string;
  laboratoryId: string;
  methodReference: string;
  methodScopeReference: string;
  matrix: string;
  custodyReferences: readonly string[];
  sealId: string;
  reportReference: string;
  reportVersion: string;
  supersedesReportReference?: string;
}
export interface LogisticsExchange {
  event: EvidenceEvent;
  shipmentId: string;
  objectReferences: readonly string[];
  containerId?: string;
  sealId?: string;
  custodyReferences: readonly string[];
  exceptionReferences: readonly string[];
  telemetryReferences: readonly string[];
}
export interface AuditExchange {
  event: EvidenceEvent;
  auditId: string;
  deviceId: string;
  facilityId: string;
  requirementId: string;
  hcpId: string;
  observationReference: string;
  mediaHash: string;
  syncState: "local" | "queued" | "received" | "reconciled" | "conflict";
  findingReferences: readonly string[];
  correctiveActionReferences: readonly string[];
  reverificationReferences: readonly string[];
}
export type AuthorityConnector = Connector<AuthorityExchange>;
export type LabConnector = Connector<LabExchange>;
export type LogisticsConnector = Connector<LogisticsExchange>;

/** No endpoint, credential or official receipt is synthesized when unconfigured. */
export class UnconfiguredConnector<T extends { event: EvidenceEvent }> implements Connector<T> {
  constructor(readonly kind: IntegrationKind, readonly environment: ConnectorEnvironment) {}
  async health(): Promise<ConnectorHealth> { return "unconfigured"; }
  async exchange(payload: T, context: ConnectorContext): Promise<ConnectorReceipt> {
    return { eventId: payload.event.eventId, status: "rejected", errors: [
      ...validateContext(payload.event, context, this.environment),
      "connector_not_configured"
    ], notCertification: true };
  }
}

/** Boundary validation only; transport, schema, signature and mandate checks remain required. */
export function validateContext(event: EvidenceEvent, context: ConnectorContext, environment: ConnectorEnvironment): string[] {
  const errors: string[] = [];
  if (!context.organizationId || event.organizationId !== context.organizationId) errors.push("organization_scope_mismatch");
  if (!context.actorId || event.actorId !== context.actorId) errors.push("actor_scope_mismatch");
  if (!context.idempotencyKey.trim()) errors.push("idempotency_key_required");
  if (!context.authorizedScopes.includes("integration:exchange")) errors.push("scope_not_authorized");
  if (event.environment !== environment || context.environment !== environment) errors.push("environment_mismatch");
  if (environment === "production" && event.simulated) errors.push("simulated_event_denied_in_production");
  if (!event.eventId || !event.objectId || !event.evidenceId || !Number.isFinite(Date.parse(event.timestamp))) errors.push("event_binding_incomplete");
  if (!event.source.sourceRecordId || !event.source.sourceVersion || !event.source.sourceSystem) errors.push("source_provenance_required");
  if (!event.integrity.contentHash || !event.integrity.signatureReference || !event.integrity.keyId || !event.integrity.policyVersion) errors.push("integrity_reference_required");
  return errors;
}

export class AuthorityGateway {
  constructor(private readonly connector: AuthorityConnector) {}
  async exchange(payload: AuthorityExchange, context: ConnectorContext): Promise<ConnectorReceipt> {
    const errors = validateContext(payload.event, context, this.connector.environment);
    if (!payload.authorityId || !payload.caseReference) errors.push("authority_case_binding_required");
    if (errors.length) return { eventId: payload.event.eventId, status: "rejected", errors, notCertification: true };
    return this.connector.exchange(payload, context);
  }
}

export class LabGateway {
  constructor(private readonly connector: LabConnector) {}
  async exchange(payload: LabExchange, context: ConnectorContext): Promise<ConnectorReceipt> {
    const errors = validateContext(payload.event, context, this.connector.environment);
    if (![payload.sampleId, payload.accessionId, payload.laboratoryId, payload.methodReference, payload.methodScopeReference, payload.matrix, payload.sealId, payload.reportReference, payload.reportVersion].every(v => v.trim())) errors.push("lab_binding_incomplete");
    if (!payload.custodyReferences.length || payload.custodyReferences.some(v => !v.trim())) errors.push("sample_custody_required");
    if (payload.supersedesReportReference === payload.reportReference) errors.push("invalid_report_supersession");
    if (errors.length) return { eventId: payload.event.eventId, status: "rejected", errors, notCertification: true };
    return this.connector.exchange(payload, context);
  }
}

export class LogisticsGateway {
  constructor(private readonly connector: LogisticsConnector) {}
  async exchange(payload: LogisticsExchange, context: ConnectorContext): Promise<ConnectorReceipt> {
    const errors = validateContext(payload.event, context, this.connector.environment);
    if (!payload.shipmentId || !payload.objectReferences.length || payload.objectReferences.some(v => !v.trim())) errors.push("shipment_object_binding_required");
    if (!payload.custodyReferences.length || payload.custodyReferences.some(v => !v.trim())) errors.push("custody_reference_required");
    if (errors.length) return { eventId: payload.event.eventId, status: "rejected", errors, notCertification: true };
    return this.connector.exchange(payload, context);
  }
}

/** Hash exact source bytes; serialization is owned by the source profile. This is not signature or truth verification. */
export class IntegrityService {
  async digest(bytes: Uint8Array): Promise<string> {
    const hash = await crypto.subtle.digest("SHA-256", new Uint8Array(bytes));
    return Array.from(new Uint8Array(hash), v => v.toString(16).padStart(2, "0")).join("");
  }
  async matches(bytes: Uint8Array, expectedHex: string): Promise<boolean> {
    if (!/^[a-f0-9]{64}$/i.test(expectedHex)) return false;
    return (await this.digest(bytes)) === expectedHex.toLowerCase();
  }
}
