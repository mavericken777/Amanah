import type { Database as GeneratedDatabase, Json } from "@/lib/database.types";

/**
 * Current live schema = generated base schema + 2026-10-01 target-architecture extensions.
 * The extension block is kept explicit so the application remains type-safe immediately after
 * the forward migrations while the historical generated snapshot remains reproducible.
 */
type ExtensionTables = {
  ahte_command_center_alerts: {
    Row: {
      alert_code: string; created_at: string; created_by: string | null; creates_authority_decision: boolean;
      decision_class: string; detected_at: string; event_refs: string[]; evidence_refs: string[]; id: string;
      organization_id: string; owner_role: string | null; prediction_id: string | null; project_id: string | null;
      severity: string; shipment_id: string | null; status: string; strategy_id: string | null;
      subject_objects: string[]; taxonomy: string | null; trigger_code: string; updated_at: string;
    };
    Insert: {
      alert_code: string; created_at?: string; created_by?: string | null; creates_authority_decision?: false;
      decision_class: string; detected_at?: string; event_refs?: string[]; evidence_refs?: string[]; id?: string;
      organization_id: string; owner_role?: string | null; prediction_id?: string | null; project_id?: string | null;
      severity: string; shipment_id?: string | null; status?: string; strategy_id?: string | null;
      subject_objects: string[]; taxonomy?: string | null; trigger_code: string; updated_at?: string;
    };
    Update: {
      alert_code?: string; created_at?: string; created_by?: string | null; creates_authority_decision?: false;
      decision_class?: string; detected_at?: string; event_refs?: string[]; evidence_refs?: string[]; id?: string;
      organization_id?: string; owner_role?: string | null; prediction_id?: string | null; project_id?: string | null;
      severity?: string; shipment_id?: string | null; status?: string; strategy_id?: string | null;
      subject_objects?: string[]; taxonomy?: string | null; trigger_code?: string; updated_at?: string;
    };
    Relationships: [
      { foreignKeyName: "ahte_command_center_alerts_created_by_fkey"; columns: ["created_by"]; isOneToOne: false; referencedRelation: "profiles"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_command_center_alerts_organization_id_fkey"; columns: ["organization_id"]; isOneToOne: false; referencedRelation: "organizations"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_command_center_alerts_prediction_fk"; columns: ["prediction_id"]; isOneToOne: false; referencedRelation: "ahte_predictions"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_command_center_alerts_project_id_fkey"; columns: ["project_id"]; isOneToOne: false; referencedRelation: "projects"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_command_center_alerts_shipment_id_fkey"; columns: ["shipment_id"]; isOneToOne: false; referencedRelation: "ahte_shipments"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_command_center_alerts_strategy_fk"; columns: ["strategy_id"]; isOneToOne: false; referencedRelation: "ahte_preemptive_strategies"; referencedColumns: ["id"] }
    ];
  };
  ahte_predictions: {
    Row: {
      blast_radius_refs: string[]; confidence: string; created_at: string; created_by: string | null;
      creates_authority_decision: boolean; decision_class: string; evidence_refs: string[]; explanation: string;
      feature_refs: string[]; generated_at: string; horizon: string | null; id: string; model_id: string;
      model_version: string; organization_id: string; predicted_failure: string | null; prediction_code: string;
      project_id: string | null; risk_type: string; score: number | null; subject_objects: string[];
    };
    Insert: {
      blast_radius_refs?: string[]; confidence?: string; created_at?: string; created_by?: string | null;
      creates_authority_decision?: false; decision_class?: "D2"; evidence_refs?: string[]; explanation: string;
      feature_refs: string[]; generated_at?: string; horizon?: string | null; id?: string; model_id: string;
      model_version: string; organization_id: string; predicted_failure?: string | null; prediction_code: string;
      project_id?: string | null; risk_type: string; score?: number | null; subject_objects: string[];
    };
    Update: {
      blast_radius_refs?: string[]; confidence?: string; created_at?: string; created_by?: string | null;
      creates_authority_decision?: false; decision_class?: "D2"; evidence_refs?: string[]; explanation?: string;
      feature_refs?: string[]; generated_at?: string; horizon?: string | null; id?: string; model_id?: string;
      model_version?: string; organization_id?: string; predicted_failure?: string | null; prediction_code?: string;
      project_id?: string | null; risk_type?: string; score?: number | null; subject_objects?: string[];
    };
    Relationships: [
      { foreignKeyName: "ahte_predictions_created_by_fkey"; columns: ["created_by"]; isOneToOne: false; referencedRelation: "profiles"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_predictions_organization_id_fkey"; columns: ["organization_id"]; isOneToOne: false; referencedRelation: "organizations"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_predictions_project_id_fkey"; columns: ["project_id"]; isOneToOne: false; referencedRelation: "projects"; referencedColumns: ["id"] }
    ];
  };
  ahte_preemptive_strategies: {
    Row: {
      alternative_actions: string[]; confidence: string; created_by: string | null; creates_authority_decision: boolean;
      decision_class: string; evidence_refs: string[]; expected_impact: string; expires_at: string | null;
      explanation: string; generated_at: string; id: string; model_id: string; model_version: string;
      organization_id: string; outcome_refs: string[]; prediction_id: string; project_id: string | null;
      recommended_action: string; required_human_role: string | null; status: string; strategy_code: string;
      subject_objects: string[]; updated_at: string; urgency: string;
    };
    Insert: {
      alternative_actions?: string[]; confidence?: string; created_by?: string | null; creates_authority_decision?: false;
      decision_class: string; evidence_refs?: string[]; expected_impact: string; expires_at?: string | null;
      explanation: string; generated_at?: string; id?: string; model_id: string; model_version: string;
      organization_id: string; outcome_refs?: string[]; prediction_id: string; project_id?: string | null;
      recommended_action: string; required_human_role?: string | null; status?: string; strategy_code: string;
      subject_objects: string[]; updated_at?: string; urgency: string;
    };
    Update: {
      alternative_actions?: string[]; confidence?: string; created_by?: string | null; creates_authority_decision?: false;
      decision_class?: string; evidence_refs?: string[]; expected_impact?: string; expires_at?: string | null;
      explanation?: string; generated_at?: string; id?: string; model_id?: string; model_version?: string;
      organization_id?: string; outcome_refs?: string[]; prediction_id?: string; project_id?: string | null;
      recommended_action?: string; required_human_role?: string | null; status?: string; strategy_code?: string;
      subject_objects?: string[]; updated_at?: string; urgency?: string;
    };
    Relationships: [
      { foreignKeyName: "ahte_preemptive_strategies_created_by_fkey"; columns: ["created_by"]; isOneToOne: false; referencedRelation: "profiles"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_preemptive_strategies_organization_id_fkey"; columns: ["organization_id"]; isOneToOne: false; referencedRelation: "organizations"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_preemptive_strategies_prediction_id_fkey"; columns: ["prediction_id"]; isOneToOne: false; referencedRelation: "ahte_predictions"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_preemptive_strategies_project_id_fkey"; columns: ["project_id"]; isOneToOne: false; referencedRelation: "projects"; referencedColumns: ["id"] }
    ];
  };
  ahte_finance_evidence_packets: {
    Row: {
      ahte_trust_state_ref: string | null; created_at: string; created_by: string | null; creates_financing_decision: boolean;
      creates_takaful_decision: boolean; custody_refs: string[]; disclosure_policy: string; evidence_refs: string[];
      exception_refs: string[]; formal_authority_status_ref: string | null; id: string; integrity_manifest_ref: string | null;
      is_halal_certification: boolean; issued_at: string; organization_id: string; packet_code: string; project_id: string | null;
      purpose: string; requesting_party: string; signature_or_auth_ref: string | null; subject_objects: string[];
      supply_chain_state_ref: string | null; valid_until: string | null;
    };
    Insert: {
      ahte_trust_state_ref?: string | null; created_at?: string; created_by?: string | null; creates_financing_decision?: false;
      creates_takaful_decision?: false; custody_refs?: string[]; disclosure_policy: string; evidence_refs?: string[];
      exception_refs?: string[]; formal_authority_status_ref?: string | null; id?: string; integrity_manifest_ref?: string | null;
      is_halal_certification?: false; issued_at?: string; organization_id: string; packet_code: string; project_id?: string | null;
      purpose: string; requesting_party: string; signature_or_auth_ref?: string | null; subject_objects: string[];
      supply_chain_state_ref?: string | null; valid_until?: string | null;
    };
    Update: {
      ahte_trust_state_ref?: string | null; created_at?: string; created_by?: string | null; creates_financing_decision?: false;
      creates_takaful_decision?: false; custody_refs?: string[]; disclosure_policy?: string; evidence_refs?: string[];
      exception_refs?: string[]; formal_authority_status_ref?: string | null; id?: string; integrity_manifest_ref?: string | null;
      is_halal_certification?: false; issued_at?: string; organization_id?: string; packet_code?: string; project_id?: string | null;
      purpose?: string; requesting_party?: string; signature_or_auth_ref?: string | null; subject_objects?: string[];
      supply_chain_state_ref?: string | null; valid_until?: string | null;
    };
    Relationships: [
      { foreignKeyName: "ahte_finance_evidence_packets_created_by_fkey"; columns: ["created_by"]; isOneToOne: false; referencedRelation: "profiles"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_finance_evidence_packets_organization_id_fkey"; columns: ["organization_id"]; isOneToOne: false; referencedRelation: "organizations"; referencedColumns: ["id"] },
      { foreignKeyName: "ahte_finance_evidence_packets_project_id_fkey"; columns: ["project_id"]; isOneToOne: false; referencedRelation: "projects"; referencedColumns: ["id"] }
    ];
  };
};

type PublicSchema = GeneratedDatabase["public"];

export type Database = Omit<GeneratedDatabase, "public"> & {
  public: Omit<PublicSchema, "Tables"> & {
    Tables: PublicSchema["Tables"] & ExtensionTables;
  };
};

export type { Json };
