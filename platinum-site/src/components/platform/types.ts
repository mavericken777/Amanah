export type DecisionLevel = 'D0_AUTO' | 'D1_RULE' | 'D2_AI_CHECK' | 'D3_AI_RECOMMEND' | 'D4_AUTO_HOLD' | 'D5_HUMAN_CERT' | 'D6_SOVEREIGN_RELEASE';
export type GovernanceCategory = 'AUTOMATED_IOT' | 'AI_ASSISTED' | 'HUMAN_SOVEREIGN';
export type TelemetryStatus = 'OPTIMAL' | 'WARNING' | 'CRITICAL';
export type PlaybackMode = 'AUTONOMOUS_PLAY' | 'PAUSED' | 'EXCEPTION_HOLD';
export type ExceptionKind = 'COLD_CHAIN' | 'SEAL_TAMPER' | 'PORCINE_DNA';
export interface TelemetryMetric { id: string; label: string; value: string | number; unit?: string; status: TelemetryStatus }
export interface JourneyStage {
  id: string; stageNumber: number; title: string; subtitle: string; actor: string; location: string;
  decisionLevel: DecisionLevel; governanceType: GovernanceCategory; summary: string;
  telemetryData: TelemetryMetric[]; standardsInScope: string[]; operatorSignature: string;
  rawJsonLog: Record<string, unknown>; kind: 'factory' | 'audit' | 'lab' | 'standards' | 'warehouse' | 'logistics' | 'port' | 'transit' | 'monitoring' | 'retail' | 'consumer';
}
export interface Allocation { batch: string; lot: string; distributor: string; store: string; order: string; cases: number }
export interface Scenario {
  id: string; environment: string; startedAt: string; product: string; sku: string; batch: string; facility: string;
  sample: string; audit: string; shipment: string; container: string; seal: string; importerLot: string;
  purchaseOrder: string; asn: string; origin: string; exportPort: string; destinationPort: string;
  destination: string; laboratory: string; allocations: Allocation[]; unaffectedBatch: string;
  temperatureBaseline: number; temperatureLimit: number;
}
export interface ExceptionEvent {
  id: string; kind: ExceptionKind; title: string; severity: 'CRITICAL'; triggeredAtStage: number;
  breachMetric: string; observedValue: string; thresholdValue: string; capaAction: string;
  affectedBatches: string[]; affectedSKUs: string[]; phase: 'HOLD' | 'INVESTIGATION' | 'CORRECTIVE_ACTION' | 'REVERIFICATION';
}
export interface LedgerEvent { sequence: number; timestamp: string; stageId: string; event: string; payload: Record<string, unknown> }
export interface LedgerProof extends LedgerEvent { hash: string; previousHash: string }
export interface PlatformState {
  currentStageIndex: number; playbackMode: PlaybackMode; playbackSpeed: 1 | 2 | 4;
  activeException: ExceptionEvent | null; stageLogs: LedgerEvent[]; sequence: number;
  elapsed: number; virtualTime: number; evidenceConfirmed: boolean; resolution: string;
}
