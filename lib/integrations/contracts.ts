/**
 * [PROPOSAL] Replaceable integration ports aligned to GlobalHalalDigitalTrust@ae3f662f7467.
 * External transports remain unconfigured until authorised production contracts exist.
 * These are internal adapter envelopes, not invented external authority API schemas.
 */
export type ConnectorEnvironment = "development" | "production";
export type ConnectorHealth = "unconfigured" | "ready" | "degraded" | "unavailable";
export type IntegrationKind =
  | "jakim-api"
  | "authority"
  | "laboratory"
  | "sinotrans-logistics"
  | "port-customs"
  | "shariah-finance"
  | "command-center"
  | "erp" | "mes" | "wms" | "tms" | "qms" | "lims" | "iot" | "identity" | "integrity-anchor";

export interface SourceReference { sourceSystem: string; sourceRecordId: string; sourceVersion: string; }
export interface IntegrityProof { contentHash: string; signatureReference: string; keyId: string; policyVersion: string; }
export interface EvidenceEvent {
  organizationId: string; objectId: string; eventId: string; evidenceId: string; actorId: string;
  timestamp: string; eventType: string; source: SourceReference; integrity: IntegrityProof;
  environment: ConnectorEnvironment; simulated: boolean;
}
export interface ConnectorContext {
  organizationId: string; actorId: string; environment: ConnectorEnvironment;
  idempotencyKey: string; authorizedScopes: readonly string[];
}
export interface ConnectorReceipt {
  eventId: string; status: "received" | "rejected" | "pending";
  sourceReceiptReference?: string; errors: readonly string[]; notCertification: true;
}
export interface Connector<T> {
  readonly kind: IntegrationKind; readonly environment: ConnectorEnvironment;
  health(): Promise<ConnectorHealth>;
  exchange(payload: T, context: ConnectorContext): Promise<ConnectorReceipt>;
}

export interface JakimApiExchange {
  event: EvidenceEvent;
  authorityId: "JAKIM" | string;
  caseReference: string;
  evidenceReferences: readonly string[];
  requestedAction: "submit-evidence" | "read-status" | "sync-authority-event";
  authorityStatusReference?: string;
}
export type AuthorityExchange = JakimApiExchange;

export interface LabExchange {
  event: EvidenceEvent; sampleId: string; accessionId: string; laboratoryId: string;
  methodReference: string; methodScopeReference: string; matrix: string;
  custodyReferences: readonly string[]; sealId: string; reportReference: string;
  reportVersion: string; supersedesReportReference?: string;
}
export interface LogisticsExchange {
  event: EvidenceEvent; shipmentId: string; objectReferences: readonly string[];
  containerId?: string; sealId?: string; warehouseId?: string;
  custodyReferences: readonly string[]; exceptionReferences: readonly string[];
  telemetryReferences: readonly string[];
  logisticsStage?: "booking" | "pickup" | "warehouse_receipt" | "storage" | "warehouse_dispatch" | "port_handoff" | "transit" | "destination_receipt" | "proof_of_delivery";
}
export interface PortCustomsExchange {
  event: EvidenceEvent; jurisdiction: string; portId: string; shipmentId: string;
  containerId?: string; sealId?: string; inspectionReference?: string;
  custodyReferences: readonly string[]; evidenceReferences: readonly string[];
  requestedAction: "lookup-trust" | "submit-inspection" | "submit-sampling" | "submit-hold" | "submit-release" | "submit-custody";
}
export interface PredictionObject {
  predictionId: string; modelId: string; modelVersion: string; generatedAt: string;
  subjectObjects: readonly string[]; riskType: string; predictedFailure?: string;
  score?: number | null; confidence: "low" | "medium" | "high" | "unscored";
  evidenceReferences: readonly string[]; featureReferences: readonly string[];
  explanation: string; blastRadiusReferences: readonly string[]; decisionClass: "D2";
  createsAuthorityDecision: false;
}
export interface PreemptiveStrategyObject {
  strategyId: string; predictionId: string; subjectObjects: readonly string[];
  recommendedAction: string; alternativeActions: readonly string[]; expectedImpact?: string;
  urgency: "low" | "medium" | "high" | "critical"; evidenceReferences: readonly string[];
  modelId: string; modelVersion: string; confidence: "low" | "medium" | "high" | "unscored";
  explanation: string; decisionClass: "D2" | "D3" | "D4" | "D5" | "D6";
  requiredHumanRole?: string | null; generatedAt: string; status: "proposed" | "queued" | "approved" | "rejected" | "executed" | "expired" | "superseded";
  createsAuthorityDecision: false;
}
export interface CommandCenterAlertExchange {
  event: EvidenceEvent; alertId: string; trigger: string; severity: "S0" | "S1" | "S2" | "S3" | "S4" | "S5";
  subjectObjects: readonly string[]; shipmentId?: string; eventReferences: readonly string[];
  evidenceReferences: readonly string[]; predictionReference?: string; strategyReference?: string;
  ownerRole?: string; decisionClass: "D0" | "D1" | "D2" | "D3" | "D4" | "D5" | "D6";
  status: "open" | "assigned" | "held" | "in_review" | "capa" | "reverification" | "closed" | "escalated" | "recalled";
  createsAuthorityDecision: false;
}
export interface FinanceEvidenceExchange {
  event: EvidenceEvent; packetId: string;
  purpose: "trade_finance" | "purchase_order_finance" | "inventory_finance" | "shipment_finance" | "takaful_underwriting" | "takaful_claim" | "asset_state_verification" | "tokenomics_support" | "other";
  requestingParty: string; subjectObjects: readonly string[];
  formalAuthorityStatusReference?: string; ahteTrustStateReference?: string; supplyChainStateReference?: string;
  evidenceReferences: readonly string[]; custodyReferences: readonly string[]; exceptionReferences: readonly string[];
  disclosurePolicy: string; createsFinancingDecision: false; createsTakafulDecision: false; isHalalCertification: false;
}
export interface AuditExchange {
  event: EvidenceEvent; auditId: string; deviceId: string; facilityId: string;
  requirementId: string; hcpId: string; observationReference: string; mediaHash: string;
  syncState: "local" | "queued" | "received" | "reconciled" | "conflict";
  findingReferences: readonly string[]; correctiveActionReferences: readonly string[]; reverificationReferences: readonly string[];
}

export type JakimApiConnector = Connector<JakimApiExchange>;
export type AuthorityConnector = JakimApiConnector;
export type LabConnector = Connector<LabExchange>;
export type LogisticsConnector = Connector<LogisticsExchange>;
export type PortCustomsConnector = Connector<PortCustomsExchange>;
export type CommandCenterConnector = Connector<CommandCenterAlertExchange>;
export type ShariahFinanceConnector = Connector<FinanceEvidenceExchange>;

/** No endpoint, credential or official receipt is synthesized when unconfigured. */
export class UnconfiguredConnector<T extends { event: EvidenceEvent }> implements Connector<T> {
  constructor(readonly kind: IntegrationKind, readonly environment: ConnectorEnvironment) {}
  async health(): Promise<ConnectorHealth> { return "unconfigured"; }
  async exchange(payload: T, context: ConnectorContext): Promise<ConnectorReceipt> {
    return { eventId: payload.event.eventId, status: "rejected", errors: [
      ...validateContext(payload.event, context, this.environment), "connector_not_configured"
    ], notCertification: true };
  }
}

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

export class DirectJakimApiGateway {
  constructor(private readonly connector: JakimApiConnector) {}
  async exchange(payload: JakimApiExchange, context: ConnectorContext): Promise<ConnectorReceipt> {
    const errors = validateContext(payload.event, context, this.connector.environment);
    if (!payload.authorityId || !payload.caseReference) errors.push("jakim_case_binding_required");
    if (!payload.evidenceReferences.length && payload.requestedAction === "submit-evidence") errors.push("evidence_reference_required");
    if (errors.length) return { eventId: payload.event.eventId, status: "rejected", errors, notCertification: true };
    return this.connector.exchange(payload, context);
  }
}

/** @deprecated Internal compatibility alias. Public/project topology is Direct JAKIM API. */
export class AuthorityGateway extends DirectJakimApiGateway {}

export class LabGateway {
  constructor(private readonly connector: LabConnector) {}
  async exchange(payload: LabExchange, context: ConnectorContext): Promise<ConnectorReceipt> {
    const errors = validateContext(payload.event, context, this.connector.environment);
    if (![payload.sampleId,payload.accessionId,payload.laboratoryId,payload.methodReference,payload.methodScopeReference,payload.matrix,payload.sealId,payload.reportReference,payload.reportVersion].every(v=>v.trim())) errors.push("lab_binding_incomplete");
    if (!payload.custodyReferences.length || payload.custodyReferences.some(v=>!v.trim())) errors.push("sample_custody_required");
    if (payload.supersedesReportReference === payload.reportReference) errors.push("invalid_report_supersession");
    if (errors.length) return { eventId: payload.event.eventId, status: "rejected", errors, notCertification: true };
    return this.connector.exchange(payload, context);
  }
}

export class LogisticsGateway {
  constructor(private readonly connector: LogisticsConnector) {}
  async exchange(payload: LogisticsExchange, context: ConnectorContext): Promise<ConnectorReceipt> {
    const errors = validateContext(payload.event, context, this.connector.environment);
    if (!payload.shipmentId || !payload.objectReferences.length || payload.objectReferences.some(v=>!v.trim())) errors.push("shipment_object_binding_required");
    if (!payload.custodyReferences.length || payload.custodyReferences.some(v=>!v.trim())) errors.push("custody_reference_required");
    if (errors.length) return { eventId: payload.event.eventId, status: "rejected", errors, notCertification: true };
    return this.connector.exchange(payload, context);
  }
}

export class PortCustomsGateway {
  constructor(private readonly connector: PortCustomsConnector) {}
  async exchange(payload: PortCustomsExchange, context: ConnectorContext): Promise<ConnectorReceipt> {
    const errors = validateContext(payload.event, context, this.connector.environment);
    if (!payload.jurisdiction || !payload.portId || !payload.shipmentId) errors.push("port_scope_binding_required");
    if (errors.length) return { eventId: payload.event.eventId, status: "rejected", errors, notCertification: true };
    return this.connector.exchange(payload, context);
  }
}

export class ShariahFinanceGateway {
  constructor(private readonly connector: ShariahFinanceConnector) {}
  async exchange(payload: FinanceEvidenceExchange, context: ConnectorContext): Promise<ConnectorReceipt> {
    const errors = validateContext(payload.event, context, this.connector.environment);
    if (!payload.packetId || !payload.requestingParty || !payload.subjectObjects.length) errors.push("finance_packet_binding_required");
    if (payload.createsFinancingDecision !== false || payload.createsTakafulDecision !== false || payload.isHalalCertification !== false) errors.push("decision_boundary_violation");
    if (errors.length) return { eventId: payload.event.eventId, status: "rejected", errors, notCertification: true };
    return this.connector.exchange(payload, context);
  }
}

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
