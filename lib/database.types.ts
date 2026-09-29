export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      accommodations: {
        Row: {
          booking_status: string
          check_in: string | null
          check_out: string | null
          city: string
          created_at: string
          id: string
          notes: string | null
          organization_id: string
          owner_user_id: string | null
          project_id: string
          property_name: string
          room_allocation: string | null
          updated_at: string
        }
        Insert: {
          booking_status?: string
          check_in?: string | null
          check_out?: string | null
          city: string
          created_at?: string
          id?: string
          notes?: string | null
          organization_id: string
          owner_user_id?: string | null
          project_id: string
          property_name: string
          room_allocation?: string | null
          updated_at?: string
        }
        Update: {
          booking_status?: string
          check_in?: string | null
          check_out?: string | null
          city?: string
          created_at?: string
          id?: string
          notes?: string | null
          organization_id?: string
          owner_user_id?: string | null
          project_id?: string
          property_name?: string
          room_allocation?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "accommodations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accommodations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accommodations_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      ahte_ai_provenance: {
        Row: {
          assessment_id: string | null
          created_at: string
          id: string
          input_hash: string | null
          model_name: string | null
          model_version: string | null
          organization_id: string
          output_hash: string | null
          prompt_hash: string | null
          provider: string | null
        }
        Insert: {
          assessment_id?: string | null
          created_at?: string
          id?: string
          input_hash?: string | null
          model_name?: string | null
          model_version?: string | null
          organization_id: string
          output_hash?: string | null
          prompt_hash?: string | null
          provider?: string | null
        }
        Update: {
          assessment_id?: string | null
          created_at?: string
          id?: string
          input_hash?: string | null
          model_name?: string | null
          model_version?: string | null
          organization_id?: string
          output_hash?: string | null
          prompt_hash?: string | null
          provider?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_ai_provenance_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "ahte_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_ai_provenance_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_applicability: {
        Row: {
          created_at: string
          decided_at: string | null
          decided_by: string | null
          decision: string
          id: string
          organization_id: string
          project_id: string | null
          rationale: string | null
          requirement_id: string
          shipment_id: string | null
        }
        Insert: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision: string
          id?: string
          organization_id: string
          project_id?: string | null
          rationale?: string | null
          requirement_id: string
          shipment_id?: string | null
        }
        Update: {
          created_at?: string
          decided_at?: string | null
          decided_by?: string | null
          decision?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          rationale?: string | null
          requirement_id?: string
          shipment_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_applicability_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_applicability_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_applicability_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "ahte_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_assessments: {
        Row: {
          assessment: string
          confidence: number | null
          created_at: string
          evidence_ids: string[]
          id: string
          model_name: string | null
          model_version: string | null
          organization_id: string
          project_id: string | null
          status: string
          subject_id: string
          subject_type: string
        }
        Insert: {
          assessment: string
          confidence?: number | null
          created_at?: string
          evidence_ids?: string[]
          id?: string
          model_name?: string | null
          model_version?: string | null
          organization_id: string
          project_id?: string | null
          status?: string
          subject_id: string
          subject_type: string
        }
        Update: {
          assessment?: string
          confidence?: number | null
          created_at?: string
          evidence_ids?: string[]
          id?: string
          model_name?: string | null
          model_version?: string | null
          organization_id?: string
          project_id?: string | null
          status?: string
          subject_id?: string
          subject_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_assessments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_assessments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_audit_tests: {
        Row: {
          control_id: string | null
          created_at: string
          evidence_id: string | null
          id: string
          method: string
          notes: string | null
          organization_id: string
          result: string
          test_code: string
          tested_at: string | null
          tester_user_id: string | null
        }
        Insert: {
          control_id?: string | null
          created_at?: string
          evidence_id?: string | null
          id?: string
          method: string
          notes?: string | null
          organization_id: string
          result?: string
          test_code: string
          tested_at?: string | null
          tester_user_id?: string | null
        }
        Update: {
          control_id?: string | null
          created_at?: string
          evidence_id?: string | null
          id?: string
          method?: string
          notes?: string | null
          organization_id?: string
          result?: string
          test_code?: string
          tested_at?: string | null
          tester_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_audit_tests_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "ahte_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_audit_tests_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_audit_tests_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_authorities: {
        Row: {
          authority_type: string
          code: string
          created_at: string
          id: string
          jurisdiction: string | null
          name: string
          organization_id: string
          source_reference: string | null
          source_status: string
          status: string
          updated_at: string
        }
        Insert: {
          authority_type?: string
          code: string
          created_at?: string
          id?: string
          jurisdiction?: string | null
          name: string
          organization_id: string
          source_reference?: string | null
          source_status?: string
          status?: string
          updated_at?: string
        }
        Update: {
          authority_type?: string
          code?: string
          created_at?: string
          id?: string
          jurisdiction?: string | null
          name?: string
          organization_id?: string
          source_reference?: string | null
          source_status?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_authorities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_authority_decisions: {
        Row: {
          authority_gate_id: string | null
          created_at: string
          decided_at: string | null
          decision: string
          decision_reference: string | null
          hitm_case_id: string | null
          id: string
          organization_id: string
          signature_hash: string | null
          signed_by: string | null
          status: string
        }
        Insert: {
          authority_gate_id?: string | null
          created_at?: string
          decided_at?: string | null
          decision: string
          decision_reference?: string | null
          hitm_case_id?: string | null
          id?: string
          organization_id: string
          signature_hash?: string | null
          signed_by?: string | null
          status?: string
        }
        Update: {
          authority_gate_id?: string | null
          created_at?: string
          decided_at?: string | null
          decision?: string
          decision_reference?: string | null
          hitm_case_id?: string | null
          id?: string
          organization_id?: string
          signature_hash?: string | null
          signed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_authority_decisions_authority_gate_id_fkey"
            columns: ["authority_gate_id"]
            isOneToOne: false
            referencedRelation: "ahte_authority_gates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_authority_decisions_hitm_case_id_fkey"
            columns: ["hitm_case_id"]
            isOneToOne: false
            referencedRelation: "ahte_hitm_cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_authority_decisions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_authority_gates: {
        Row: {
          authority_id: string | null
          created_at: string
          decided_by: string | null
          decision_date: string | null
          decision_reference: string | null
          gate_code: string
          gate_type: string
          id: string
          organization_id: string
          project_id: string | null
          rationale: string | null
          status: string
          updated_at: string
        }
        Insert: {
          authority_id?: string | null
          created_at?: string
          decided_by?: string | null
          decision_date?: string | null
          decision_reference?: string | null
          gate_code: string
          gate_type: string
          id?: string
          organization_id: string
          project_id?: string | null
          rationale?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          authority_id?: string | null
          created_at?: string
          decided_by?: string | null
          decision_date?: string | null
          decision_reference?: string | null
          gate_code?: string
          gate_type?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          rationale?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_authority_gates_authority_id_fkey"
            columns: ["authority_id"]
            isOneToOne: false
            referencedRelation: "ahte_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_authority_gates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_authority_gates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_certificates: {
        Row: {
          authority_id: string | null
          certificate_no: string | null
          created_at: string
          expires_on: string | null
          id: string
          identity_id: string | null
          issued_on: string | null
          organization_id: string
          scope: string | null
          source_evidence_id: string | null
          status: string
        }
        Insert: {
          authority_id?: string | null
          certificate_no?: string | null
          created_at?: string
          expires_on?: string | null
          id?: string
          identity_id?: string | null
          issued_on?: string | null
          organization_id: string
          scope?: string | null
          source_evidence_id?: string | null
          status?: string
        }
        Update: {
          authority_id?: string | null
          certificate_no?: string | null
          created_at?: string
          expires_on?: string | null
          id?: string
          identity_id?: string | null
          issued_on?: string | null
          organization_id?: string
          scope?: string | null
          source_evidence_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_certificates_authority_id_fkey"
            columns: ["authority_id"]
            isOneToOne: false
            referencedRelation: "ahte_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_certificates_identity_id_fkey"
            columns: ["identity_id"]
            isOneToOne: false
            referencedRelation: "ahte_identities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_certificates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_certificates_source_evidence_id_fkey"
            columns: ["source_evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_controls: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          organization_id: string
          owner_user_id: string | null
          project_id: string | null
          requirement_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          organization_id: string
          owner_user_id?: string | null
          project_id?: string | null
          requirement_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          organization_id?: string
          owner_user_id?: string | null
          project_id?: string | null
          requirement_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_controls_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_controls_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_controls_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "ahte_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_corrective_actions: {
        Row: {
          action_plan: string
          created_at: string
          due_date: string | null
          finding_id: string
          id: string
          organization_id: string
          owner_user_id: string | null
          root_cause: string | null
          status: string
          updated_at: string
          verification_notes: string | null
          verified_at: string | null
        }
        Insert: {
          action_plan: string
          created_at?: string
          due_date?: string | null
          finding_id: string
          id?: string
          organization_id: string
          owner_user_id?: string | null
          root_cause?: string | null
          status?: string
          updated_at?: string
          verification_notes?: string | null
          verified_at?: string | null
        }
        Update: {
          action_plan?: string
          created_at?: string
          due_date?: string | null
          finding_id?: string
          id?: string
          organization_id?: string
          owner_user_id?: string | null
          root_cause?: string | null
          status?: string
          updated_at?: string
          verification_notes?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_corrective_actions_finding_id_fkey"
            columns: ["finding_id"]
            isOneToOne: false
            referencedRelation: "ahte_findings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_corrective_actions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_critical_points: {
        Row: {
          control_id: string
          control_measure: string | null
          created_at: string
          escalation_rule: string | null
          hazard: string | null
          id: string
          monitoring_method: string | null
          organization_id: string
          point_type: string
          process_step: string
        }
        Insert: {
          control_id: string
          control_measure?: string | null
          created_at?: string
          escalation_rule?: string | null
          hazard?: string | null
          id?: string
          monitoring_method?: string | null
          organization_id: string
          point_type: string
          process_step: string
        }
        Update: {
          control_id?: string
          control_measure?: string | null
          created_at?: string
          escalation_rule?: string | null
          hazard?: string | null
          id?: string
          monitoring_method?: string | null
          organization_id?: string
          point_type?: string
          process_step?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_critical_points_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "ahte_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_critical_points_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_custody_events: {
        Row: {
          actor_identity_id: string | null
          created_at: string
          entity_id: string
          entity_type: string
          event_type: string
          evidence_id: string | null
          id: string
          location: string | null
          metadata: Json
          occurred_at: string
          organization_id: string
          project_id: string | null
        }
        Insert: {
          actor_identity_id?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          event_type: string
          evidence_id?: string | null
          id?: string
          location?: string | null
          metadata?: Json
          occurred_at: string
          organization_id: string
          project_id?: string | null
        }
        Update: {
          actor_identity_id?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          event_type?: string
          evidence_id?: string | null
          id?: string
          location?: string | null
          metadata?: Json
          occurred_at?: string
          organization_id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_custody_events_actor_identity_id_fkey"
            columns: ["actor_identity_id"]
            isOneToOne: false
            referencedRelation: "ahte_identities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_custody_events_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_custody_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_custody_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_evidence: {
        Row: {
          collected_at: string | null
          content_hash: string | null
          control_id: string | null
          created_at: string
          created_by: string | null
          evidence_class: string
          evidence_type: string
          id: string
          metadata: Json
          organization_id: string
          project_id: string | null
          source_uri: string | null
          status: string
          title: string
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          collected_at?: string | null
          content_hash?: string | null
          control_id?: string | null
          created_at?: string
          created_by?: string | null
          evidence_class: string
          evidence_type: string
          id?: string
          metadata?: Json
          organization_id: string
          project_id?: string | null
          source_uri?: string | null
          status?: string
          title: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          collected_at?: string | null
          content_hash?: string | null
          control_id?: string | null
          created_at?: string
          created_by?: string | null
          evidence_class?: string
          evidence_type?: string
          id?: string
          metadata?: Json
          organization_id?: string
          project_id?: string | null
          source_uri?: string | null
          status?: string
          title?: string
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_evidence_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "ahte_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_evidence_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_evidence_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_findings: {
        Row: {
          audit_test_id: string | null
          control_id: string | null
          created_at: string
          description: string
          finding_code: string
          id: string
          organization_id: string
          severity: string
          status: string
          updated_at: string
        }
        Insert: {
          audit_test_id?: string | null
          control_id?: string | null
          created_at?: string
          description: string
          finding_code: string
          id?: string
          organization_id: string
          severity?: string
          status?: string
          updated_at?: string
        }
        Update: {
          audit_test_id?: string | null
          control_id?: string | null
          created_at?: string
          description?: string
          finding_code?: string
          id?: string
          organization_id?: string
          severity?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_findings_audit_test_id_fkey"
            columns: ["audit_test_id"]
            isOneToOne: false
            referencedRelation: "ahte_audit_tests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_findings_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "ahte_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_findings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_fracture_events: {
        Row: {
          auto_hold: boolean
          detected_at: string
          entity_id: string
          entity_type: string
          fracture_type: string
          id: string
          organization_id: string
          project_id: string | null
          resolution: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
        }
        Insert: {
          auto_hold?: boolean
          detected_at?: string
          entity_id: string
          entity_type: string
          fracture_type: string
          id?: string
          organization_id: string
          project_id?: string | null
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
        }
        Update: {
          auto_hold?: boolean
          detected_at?: string
          entity_id?: string
          entity_type?: string
          fracture_type?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          resolution?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_fracture_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_fracture_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_hitm_cases: {
        Row: {
          assessment_id: string | null
          assigned_to: string | null
          created_at: string
          decision_class: string
          evidence_ids: string[]
          id: string
          organization_id: string
          project_id: string | null
          question: string
          status: string
          updated_at: string
        }
        Insert: {
          assessment_id?: string | null
          assigned_to?: string | null
          created_at?: string
          decision_class: string
          evidence_ids?: string[]
          id?: string
          organization_id: string
          project_id?: string | null
          question: string
          status?: string
          updated_at?: string
        }
        Update: {
          assessment_id?: string | null
          assigned_to?: string | null
          created_at?: string
          decision_class?: string
          evidence_ids?: string[]
          id?: string
          organization_id?: string
          project_id?: string | null
          question?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_hitm_cases_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "ahte_assessments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_hitm_cases_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_hitm_cases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_identities: {
        Row: {
          created_at: string
          entity_type: string
          id: string
          jurisdiction: string | null
          legal_name: string
          metadata: Json
          organization_id: string
          registration_no: string | null
          verification_status: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          entity_type: string
          id?: string
          jurisdiction?: string | null
          legal_name: string
          metadata?: Json
          organization_id: string
          registration_no?: string | null
          verification_status?: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          entity_type?: string
          id?: string
          jurisdiction?: string | null
          legal_name?: string
          metadata?: Json
          organization_id?: string
          registration_no?: string | null
          verification_status?: string
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_identities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_instruments: {
        Row: {
          authority_id: string | null
          code: string
          created_at: string
          effective_from: string | null
          effective_to: string | null
          id: string
          instrument_type: string
          jurisdiction: string | null
          organization_id: string
          source_reference: string | null
          source_status: string
          supersedes_id: string | null
          title: string
          updated_at: string
          version: string | null
        }
        Insert: {
          authority_id?: string | null
          code: string
          created_at?: string
          effective_from?: string | null
          effective_to?: string | null
          id?: string
          instrument_type?: string
          jurisdiction?: string | null
          organization_id: string
          source_reference?: string | null
          source_status?: string
          supersedes_id?: string | null
          title: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          authority_id?: string | null
          code?: string
          created_at?: string
          effective_from?: string | null
          effective_to?: string | null
          id?: string
          instrument_type?: string
          jurisdiction?: string | null
          organization_id?: string
          source_reference?: string | null
          source_status?: string
          supersedes_id?: string | null
          title?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_instruments_authority_id_fkey"
            columns: ["authority_id"]
            isOneToOne: false
            referencedRelation: "ahte_authorities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_instruments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_instruments_supersedes_id_fkey"
            columns: ["supersedes_id"]
            isOneToOne: false
            referencedRelation: "ahte_instruments"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_laboratories: {
        Row: {
          acceptance_status: string
          accreditation_scope: string | null
          accreditation_status: string
          created_at: string
          id: string
          method_scope: string | null
          name: string
          organization_id: string
          partner_id: string | null
        }
        Insert: {
          acceptance_status?: string
          accreditation_scope?: string | null
          accreditation_status?: string
          created_at?: string
          id?: string
          method_scope?: string | null
          name: string
          organization_id: string
          partner_id?: string | null
        }
        Update: {
          acceptance_status?: string
          accreditation_scope?: string | null
          accreditation_status?: string
          created_at?: string
          id?: string
          method_scope?: string | null
          name?: string
          organization_id?: string
          partner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_laboratories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_laboratories_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "ahte_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_partners: {
        Row: {
          authority_status: string
          created_at: string
          id: string
          identity_id: string | null
          name: string
          notes: string | null
          organization_id: string
          partner_type: string
          role: string | null
        }
        Insert: {
          authority_status?: string
          created_at?: string
          id?: string
          identity_id?: string | null
          name: string
          notes?: string | null
          organization_id: string
          partner_type: string
          role?: string | null
        }
        Update: {
          authority_status?: string
          created_at?: string
          id?: string
          identity_id?: string | null
          name?: string
          notes?: string | null
          organization_id?: string
          partner_type?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_partners_identity_id_fkey"
            columns: ["identity_id"]
            isOneToOne: false
            referencedRelation: "ahte_identities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_partners_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_port_custody_events: {
        Row: {
          authority_reference: string | null
          created_at: string
          event_type: string
          evidence_id: string | null
          id: string
          metadata: Json
          occurred_at: string | null
          organization_id: string
          port_code: string
          project_id: string | null
          status: string
        }
        Insert: {
          authority_reference?: string | null
          created_at?: string
          event_type: string
          evidence_id?: string | null
          id?: string
          metadata?: Json
          occurred_at?: string | null
          organization_id: string
          port_code: string
          project_id?: string | null
          status?: string
        }
        Update: {
          authority_reference?: string | null
          created_at?: string
          event_type?: string
          evidence_id?: string | null
          id?: string
          metadata?: Json
          occurred_at?: string | null
          organization_id?: string
          port_code?: string
          project_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_port_custody_events_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_port_custody_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_port_custody_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_release_decisions: {
        Row: {
          conditions: Json
          decided_at: string
          decided_by: string | null
          decision: string
          id: string
          organization_id: string
          project_id: string | null
          reason: string
          trust_state_id: string | null
        }
        Insert: {
          conditions?: Json
          decided_at?: string
          decided_by?: string | null
          decision: string
          id?: string
          organization_id: string
          project_id?: string | null
          reason: string
          trust_state_id?: string | null
        }
        Update: {
          conditions?: Json
          decided_at?: string
          decided_by?: string | null
          decision?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          reason?: string
          trust_state_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_release_decisions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_release_decisions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_release_decisions_trust_state_id_fkey"
            columns: ["trust_state_id"]
            isOneToOne: false
            referencedRelation: "ahte_trust_states"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_requirements: {
        Row: {
          applicability_rule: string | null
          created_at: string
          id: string
          instrument_id: string
          locator: string
          organization_id: string
          requirement_text: string | null
          source_status: string
          title: string | null
          updated_at: string
        }
        Insert: {
          applicability_rule?: string | null
          created_at?: string
          id?: string
          instrument_id: string
          locator: string
          organization_id: string
          requirement_text?: string | null
          source_status?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          applicability_rule?: string | null
          created_at?: string
          id?: string
          instrument_id?: string
          locator?: string
          organization_id?: string
          requirement_text?: string | null
          source_status?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_requirements_instrument_id_fkey"
            columns: ["instrument_id"]
            isOneToOne: false
            referencedRelation: "ahte_instruments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_requirements_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_reverifications: {
        Row: {
          corrective_action_id: string
          created_at: string
          evidence_id: string | null
          id: string
          notes: string | null
          organization_id: string
          result: string
          tested_at: string | null
          tester_user_id: string | null
        }
        Insert: {
          corrective_action_id: string
          created_at?: string
          evidence_id?: string | null
          id?: string
          notes?: string | null
          organization_id: string
          result: string
          tested_at?: string | null
          tester_user_id?: string | null
        }
        Update: {
          corrective_action_id?: string
          created_at?: string
          evidence_id?: string | null
          id?: string
          notes?: string | null
          organization_id?: string
          result?: string
          tested_at?: string | null
          tester_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_reverifications_corrective_action_id_fkey"
            columns: ["corrective_action_id"]
            isOneToOne: false
            referencedRelation: "ahte_corrective_actions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_reverifications_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_reverifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_shipment_items: {
        Row: {
          batch_no: string | null
          certificate_id: string | null
          created_at: string
          eligibility_status: string
          id: string
          identity_id: string | null
          organization_id: string
          quantity: number | null
          shipment_id: string
          sku: string
          unit: string | null
        }
        Insert: {
          batch_no?: string | null
          certificate_id?: string | null
          created_at?: string
          eligibility_status?: string
          id?: string
          identity_id?: string | null
          organization_id: string
          quantity?: number | null
          shipment_id: string
          sku: string
          unit?: string | null
        }
        Update: {
          batch_no?: string | null
          certificate_id?: string | null
          created_at?: string
          eligibility_status?: string
          id?: string
          identity_id?: string | null
          organization_id?: string
          quantity?: number | null
          shipment_id?: string
          sku?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_shipment_items_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "ahte_certificates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_shipment_items_identity_id_fkey"
            columns: ["identity_id"]
            isOneToOne: false
            referencedRelation: "ahte_identities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_shipment_items_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_shipment_items_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "ahte_shipments"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_shipments: {
        Row: {
          corridor: string
          created_at: string
          destination_market: string | null
          exporter: string | null
          id: string
          importer: string | null
          organization_id: string
          origin_country: string | null
          project_id: string | null
          shipment_code: string
          status: string
          updated_at: string
        }
        Insert: {
          corridor?: string
          created_at?: string
          destination_market?: string | null
          exporter?: string | null
          id?: string
          importer?: string | null
          organization_id: string
          origin_country?: string | null
          project_id?: string | null
          shipment_code: string
          status?: string
          updated_at?: string
        }
        Update: {
          corridor?: string
          created_at?: string
          destination_market?: string | null
          exporter?: string | null
          id?: string
          importer?: string | null
          organization_id?: string
          origin_country?: string | null
          project_id?: string | null
          shipment_code?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_shipments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_shipments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_standard_mappings: {
        Row: {
          control_id: string | null
          created_at: string
          id: string
          instrument_id: string
          mapping_status: string
          notes: string | null
          organization_id: string
          requirement_id: string | null
        }
        Insert: {
          control_id?: string | null
          created_at?: string
          id?: string
          instrument_id: string
          mapping_status?: string
          notes?: string | null
          organization_id: string
          requirement_id?: string | null
        }
        Update: {
          control_id?: string | null
          created_at?: string
          id?: string
          instrument_id?: string
          mapping_status?: string
          notes?: string | null
          organization_id?: string
          requirement_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_standard_mappings_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "ahte_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_standard_mappings_instrument_id_fkey"
            columns: ["instrument_id"]
            isOneToOne: false
            referencedRelation: "ahte_instruments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_standard_mappings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_standard_mappings_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "ahte_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_trust_packets: {
        Row: {
          audit_object: Json | null
          authority_gate_object: Json | null
          certificate_object: Json | null
          content_hash: string | null
          created_at: string
          custody_object: Json | null
          evidence_object: Json
          id: string
          identity_object: Json
          organization_id: string
          packet_type: string
          port_custody_object: Json | null
          project_id: string | null
          schema_version: string
          status: string
          trust_state_object: Json | null
          updated_at: string
        }
        Insert: {
          audit_object?: Json | null
          authority_gate_object?: Json | null
          certificate_object?: Json | null
          content_hash?: string | null
          created_at?: string
          custody_object?: Json | null
          evidence_object: Json
          id?: string
          identity_object: Json
          organization_id: string
          packet_type: string
          port_custody_object?: Json | null
          project_id?: string | null
          schema_version: string
          status?: string
          trust_state_object?: Json | null
          updated_at?: string
        }
        Update: {
          audit_object?: Json | null
          authority_gate_object?: Json | null
          certificate_object?: Json | null
          content_hash?: string | null
          created_at?: string
          custody_object?: Json | null
          evidence_object?: Json
          id?: string
          identity_object?: Json
          organization_id?: string
          packet_type?: string
          port_custody_object?: Json | null
          project_id?: string | null
          schema_version?: string
          status?: string
          trust_state_object?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_trust_packets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_trust_packets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_trust_states: {
        Row: {
          created_at: string
          effective_at: string
          entity_id: string
          entity_type: string
          expires_at: string | null
          hard_gate_status: string
          id: string
          organization_id: string
          project_id: string | null
          rationale: string | null
          score: number | null
          state: string
          vector: Json
        }
        Insert: {
          created_at?: string
          effective_at?: string
          entity_id: string
          entity_type: string
          expires_at?: string | null
          hard_gate_status?: string
          id?: string
          organization_id: string
          project_id?: string | null
          rationale?: string | null
          score?: number | null
          state: string
          vector?: Json
        }
        Update: {
          created_at?: string
          effective_at?: string
          entity_id?: string
          entity_type?: string
          expires_at?: string | null
          hard_gate_status?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          rationale?: string | null
          score?: number | null
          state?: string
          vector?: Json
        }
        Relationships: [
          {
            foreignKeyName: "ahte_trust_states_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_trust_states_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_trust_vectors: {
        Row: {
          calculated_at: string
          dimensions: Json
          entity_id: string
          entity_type: string
          id: string
          methodology_version: string | null
          organization_id: string
          project_id: string | null
          score: number | null
        }
        Insert: {
          calculated_at?: string
          dimensions?: Json
          entity_id: string
          entity_type: string
          id?: string
          methodology_version?: string | null
          organization_id: string
          project_id?: string | null
          score?: number | null
        }
        Update: {
          calculated_at?: string
          dimensions?: Json
          entity_id?: string
          entity_type?: string
          id?: string
          methodology_version?: string | null
          organization_id?: string
          project_id?: string | null
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_trust_vectors_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_trust_vectors_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      approvals: {
        Row: {
          approver_user_id: string
          decided_at: string | null
          decision_notes: string | null
          entity_id: string
          entity_type: string
          id: string
          organization_id: string
          project_id: string | null
          requested_at: string
          requested_by: string
          status: string
        }
        Insert: {
          approver_user_id: string
          decided_at?: string | null
          decision_notes?: string | null
          entity_id: string
          entity_type: string
          id?: string
          organization_id: string
          project_id?: string | null
          requested_at?: string
          requested_by: string
          status?: string
        }
        Update: {
          approver_user_id?: string
          decided_at?: string | null
          decision_notes?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          requested_at?: string
          requested_by?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "approvals_approver_org_fk"
            columns: ["approver_user_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "organization_members"
            referencedColumns: ["user_id", "organization_id"]
          },
          {
            foreignKeyName: "approvals_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "approvals_requested_by_org_fk"
            columns: ["requested_by", "organization_id"]
            isOneToOne: false
            referencedRelation: "organization_members"
            referencedColumns: ["user_id", "organization_id"]
          },
        ]
      }
      audit_events: {
        Row: {
          action: string
          actor_user_id: string | null
          after_data: Json | null
          before_data: Json | null
          entity_id: string | null
          entity_type: string
          id: number
          occurred_at: string
          organization_id: string | null
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: never
          occurred_at?: string
          organization_id?: string | null
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          after_data?: Json | null
          before_data?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: never
          occurred_at?: string
          organization_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      budgets: {
        Row: {
          actual: number
          category: string
          created_at: string
          id: string
          organization_id: string
          owner_user_id: string | null
          planned: number
          project_id: string
          status: string
          updated_at: string
        }
        Insert: {
          actual?: number
          category: string
          created_at?: string
          id?: string
          organization_id: string
          owner_user_id?: string | null
          planned?: number
          project_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          actual?: number
          category?: string
          created_at?: string
          id?: string
          organization_id?: string
          owner_user_id?: string | null
          planned?: number
          project_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budgets_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budgets_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      comments: {
        Row: {
          author_user_id: string
          body: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          organization_id: string
          project_id: string | null
          updated_at: string
        }
        Insert: {
          author_user_id: string
          body: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          organization_id: string
          project_id?: string | null
          updated_at?: string
        }
        Update: {
          author_user_id?: string
          body?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      decisions: {
        Row: {
          alternatives_considered: string | null
          created_at: string
          decided_on: string | null
          decision: string
          decision_code: string
          id: string
          impact: string | null
          organization_id: string
          owner_user_id: string | null
          project_id: string | null
          reason_context: string | null
          updated_at: string
        }
        Insert: {
          alternatives_considered?: string | null
          created_at?: string
          decided_on?: string | null
          decision: string
          decision_code: string
          id?: string
          impact?: string | null
          organization_id: string
          owner_user_id?: string | null
          project_id?: string | null
          reason_context?: string | null
          updated_at?: string
        }
        Update: {
          alternatives_considered?: string | null
          created_at?: string
          decided_on?: string | null
          decision?: string
          decision_code?: string
          id?: string
          impact?: string | null
          organization_id?: string
          owner_user_id?: string | null
          project_id?: string | null
          reason_context?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "decisions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decisions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decisions_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      documents: {
        Row: {
          classification: string
          created_at: string
          description: string | null
          id: string
          organization_id: string
          owner_user_id: string | null
          project_id: string | null
          required_by: string | null
          status: string
          storage_provider: string | null
          storage_reference: string | null
          title: string
          updated_at: string
        }
        Insert: {
          classification?: string
          created_at?: string
          description?: string | null
          id?: string
          organization_id: string
          owner_user_id?: string | null
          project_id?: string | null
          required_by?: string | null
          status?: string
          storage_provider?: string | null
          storage_reference?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          classification?: string
          created_at?: string
          description?: string | null
          id?: string
          organization_id?: string
          owner_user_id?: string | null
          project_id?: string | null
          required_by?: string | null
          status?: string
          storage_provider?: string | null
          storage_reference?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          currency: string
          description: string
          id: string
          organization_id: string
          paid_by_user_id: string | null
          project_id: string
          receipt_document_id: string | null
          reimbursable: boolean
          spent_on: string
          status: string
          updated_at: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          currency: string
          description: string
          id?: string
          organization_id: string
          paid_by_user_id?: string | null
          project_id: string
          receipt_document_id?: string | null
          reimbursable?: boolean
          spent_on: string
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          currency?: string
          description?: string
          id?: string
          organization_id?: string
          paid_by_user_id?: string | null
          project_id?: string
          receipt_document_id?: string | null
          reimbursable?: boolean
          spent_on?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "expenses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expenses_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "expenses_receipt_document_id_fkey"
            columns: ["receipt_document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      itinerary_events: {
        Row: {
          activity: string
          city: string | null
          created_at: string
          ends_at: string | null
          event_date: string
          id: string
          location: string | null
          notes: string | null
          organization_id: string
          owner_user_id: string | null
          project_id: string
          starts_at: string | null
          status: string
          transport: string | null
          updated_at: string
        }
        Insert: {
          activity: string
          city?: string | null
          created_at?: string
          ends_at?: string | null
          event_date: string
          id?: string
          location?: string | null
          notes?: string | null
          organization_id: string
          owner_user_id?: string | null
          project_id: string
          starts_at?: string | null
          status?: string
          transport?: string | null
          updated_at?: string
        }
        Update: {
          activity?: string
          city?: string | null
          created_at?: string
          ends_at?: string | null
          event_date?: string
          id?: string
          location?: string | null
          notes?: string | null
          organization_id?: string
          owner_user_id?: string | null
          project_id?: string
          starts_at?: string | null
          status?: string
          transport?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "itinerary_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "itinerary_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      meeting_attendees: {
        Row: {
          created_at: string
          external_contact: string | null
          external_name: string | null
          id: string
          meeting_id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          external_contact?: string | null
          external_name?: string | null
          id?: string
          meeting_id: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          external_contact?: string | null
          external_name?: string | null
          id?: string
          meeting_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meeting_attendees_meeting_id_fkey"
            columns: ["meeting_id"]
            isOneToOne: false
            referencedRelation: "meetings"
            referencedColumns: ["id"]
          },
        ]
      }
      meetings: {
        Row: {
          agenda: string | null
          city: string | null
          created_at: string
          desired_outcome: string | null
          ends_at: string | null
          id: string
          objective: string | null
          organisation_or_person: string
          organization_id: string
          outcome_notes: string | null
          owner_user_id: string | null
          project_id: string
          purpose: string | null
          starts_at: string | null
          status: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          agenda?: string | null
          city?: string | null
          created_at?: string
          desired_outcome?: string | null
          ends_at?: string | null
          id?: string
          objective?: string | null
          organisation_or_person: string
          organization_id: string
          outcome_notes?: string | null
          owner_user_id?: string | null
          project_id: string
          purpose?: string | null
          starts_at?: string | null
          status?: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          agenda?: string | null
          city?: string | null
          created_at?: string
          desired_outcome?: string | null
          ends_at?: string | null
          id?: string
          objective?: string | null
          organisation_or_person?: string
          organization_id?: string
          outcome_notes?: string | null
          owner_user_id?: string | null
          project_id?: string
          purpose?: string | null
          starts_at?: string | null
          status?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meetings_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meetings_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          href: string | null
          id: string
          organization_id: string
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          href?: string | null
          id?: string
          organization_id: string
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          href?: string | null
          id?: string
          organization_id?: string
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string
          id: string
          name: string
          owner_user_id: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          owner_user_id: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          owner_user_id?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_members: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          project_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          project_id: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          project_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_member_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "project_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          id: string
          module_key: string
          name: string
          organization_id: string
          slug: string
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          module_key?: string
          name: string
          organization_id: string
          slug: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          module_key?: string
          name?: string
          organization_id?: string
          slug?: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      risks: {
        Row: {
          created_at: string
          description: string
          id: string
          impact: string
          likelihood: string
          mitigation: string | null
          organization_id: string
          owner_user_id: string | null
          project_id: string | null
          risk_code: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          impact: string
          likelihood: string
          mitigation?: string | null
          organization_id: string
          owner_user_id?: string | null
          project_id?: string | null
          risk_code: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          impact?: string
          likelihood?: string
          mitigation?: string | null
          organization_id?: string
          owner_user_id?: string | null
          project_id?: string | null
          risk_code?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "risks_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      saved_views: {
        Row: {
          columns: Json
          created_at: string
          entity_type: string
          filters: Json
          id: string
          name: string
          organization_id: string
          sort: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          columns?: Json
          created_at?: string
          entity_type: string
          filters?: Json
          id?: string
          name: string
          organization_id: string
          sort?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          columns?: Json
          created_at?: string
          entity_type?: string
          filters?: Json
          id?: string
          name?: string
          organization_id?: string
          sort?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_views_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      task_dependencies: {
        Row: {
          created_at: string
          depends_on_task_id: string
          id: string
          organization_id: string
          task_id: string
        }
        Insert: {
          created_at?: string
          depends_on_task_id: string
          id?: string
          organization_id: string
          task_id: string
        }
        Update: {
          created_at?: string
          depends_on_task_id?: string
          id?: string
          organization_id?: string
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_dependencies_depends_on_task_id_fkey"
            columns: ["depends_on_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependencies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependencies_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_dependency_dep_org_fk"
            columns: ["depends_on_task_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "task_dependency_org_fk"
            columns: ["task_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      tasks: {
        Row: {
          completion_condition: string | null
          created_at: string
          created_by: string | null
          dependency_notes: string | null
          description: string | null
          due_date: string | null
          id: string
          organization_id: string
          owner_user_id: string | null
          priority: string
          project_id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          completion_condition?: string | null
          created_at?: string
          created_by?: string | null
          dependency_notes?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id: string
          owner_user_id?: string | null
          priority?: string
          project_id: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          completion_condition?: string | null
          created_at?: string
          created_by?: string | null
          dependency_notes?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          organization_id?: string
          owner_user_id?: string | null
          priority?: string
          project_id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      transport_segments: {
        Row: {
          arrival_at: string | null
          booking_status: string
          created_at: string
          departure_at: string | null
          destination: string | null
          id: string
          notes: string | null
          organization_id: string
          origin: string | null
          owner_user_id: string | null
          project_id: string
          reference_document_id: string | null
          segment_label: string | null
          segment_type: string
          travel_date: string | null
          updated_at: string
        }
        Insert: {
          arrival_at?: string | null
          booking_status?: string
          created_at?: string
          departure_at?: string | null
          destination?: string | null
          id?: string
          notes?: string | null
          organization_id: string
          origin?: string | null
          owner_user_id?: string | null
          project_id: string
          reference_document_id?: string | null
          segment_label?: string | null
          segment_type: string
          travel_date?: string | null
          updated_at?: string
        }
        Update: {
          arrival_at?: string | null
          booking_status?: string
          created_at?: string
          departure_at?: string | null
          destination?: string | null
          id?: string
          notes?: string | null
          organization_id?: string
          origin?: string | null
          owner_user_id?: string | null
          project_id?: string
          reference_document_id?: string | null
          segment_label?: string | null
          segment_type?: string
          travel_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transport_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
          {
            foreignKeyName: "transport_segments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transport_segments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transport_segments_reference_document_id_fkey"
            columns: ["reference_document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      travellers: {
        Row: {
          backup_contact_method: string | null
          contact_method: string | null
          created_at: string
          display_name: string
          id: string
          organization_id: string
          project_id: string
          role: string | null
          status: string
          updated_at: string
        }
        Insert: {
          backup_contact_method?: string | null
          contact_method?: string | null
          created_at?: string
          display_name: string
          id?: string
          organization_id: string
          project_id: string
          role?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          backup_contact_method?: string | null
          contact_method?: string | null
          created_at?: string
          display_name?: string
          id?: string
          organization_id?: string
          project_id?: string
          role?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "travellers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travellers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "travellers_project_org_fk"
            columns: ["project_id", "organization_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "organization_id"]
          },
        ]
      }
      updates: {
        Row: {
          author_user_id: string | null
          blocked: string | null
          completed: string | null
          created_at: string
          id: string
          in_progress: string | null
          next_actions: string | null
          organization_id: string
          overall_status: string | null
          project_id: string | null
          published_at: string
          title: string
        }
        Insert: {
          author_user_id?: string | null
          blocked?: string | null
          completed?: string | null
          created_at?: string
          id?: string
          in_progress?: string | null
          next_actions?: string | null
          organization_id: string
          overall_status?: string | null
          project_id?: string | null
          published_at?: string
          title: string
        }
        Update: {
          author_user_id?: string | null
          blocked?: string | null
          completed?: string | null
          created_at?: string
          id?: string
          in_progress?: string | null
          next_actions?: string | null
          organization_id?: string
          overall_status?: string | null
          project_id?: string | null
          published_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "updates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_definitions: {
        Row: {
          active: boolean
          created_at: string
          created_by: string | null
          definition: Json
          entity_type: string
          id: string
          name: string
          organization_id: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          definition?: Json
          entity_type: string
          id?: string
          name: string
          organization_id?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          definition?: Json
          entity_type?: string
          id?: string
          name?: string
          organization_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_definitions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
