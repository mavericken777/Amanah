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
      ahte_api_idempotency: {
        Row: {
          actor_user_id: string | null
          created_at: string
          id: string
          idempotency_key: string
          organization_id: string
          request_hash: string
          response_body: Json | null
          response_status: number | null
        }
        Insert: {
          actor_user_id?: string | null
          created_at?: string
          id?: string
          idempotency_key: string
          organization_id: string
          request_hash: string
          response_body?: Json | null
          response_status?: number | null
        }
        Update: {
          actor_user_id?: string | null
          created_at?: string
          id?: string
          idempotency_key?: string
          organization_id?: string
          request_hash?: string
          response_body?: Json | null
          response_status?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_api_idempotency_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_api_rate_limits: {
        Row: {
          actor_user_id: string
          organization_id: string
          request_count: number
          route: string
          updated_at: string
          window_start: string
        }
        Insert: {
          actor_user_id: string
          organization_id: string
          request_count?: number
          route: string
          updated_at?: string
          window_start: string
        }
        Update: {
          actor_user_id?: string
          organization_id?: string
          request_count?: number
          route?: string
          updated_at?: string
          window_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_api_rate_limits_organization_id_fkey"
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
      ahte_audit_observations: {
        Row: {
          audit_id: string
          control_id: string | null
          created_at: string
          evidence_id: string | null
          id: string
          observation: string
          organization_id: string
          result: string
          severity: string | null
          status: string
        }
        Insert: {
          audit_id: string
          control_id?: string | null
          created_at?: string
          evidence_id?: string | null
          id?: string
          observation: string
          organization_id: string
          result?: string
          severity?: string | null
          status?: string
        }
        Update: {
          audit_id?: string
          control_id?: string | null
          created_at?: string
          evidence_id?: string | null
          id?: string
          observation?: string
          organization_id?: string
          result?: string
          severity?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_audit_observations_audit_id_fkey"
            columns: ["audit_id"]
            isOneToOne: false
            referencedRelation: "ahte_audits"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_audit_observations_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "ahte_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_audit_observations_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_audit_observations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      ahte_audits: {
        Row: {
          audit_code: string
          audit_type: string
          auditor_user_id: string | null
          completed_at: string | null
          created_at: string
          facility_id: string | null
          id: string
          metadata: Json
          organization_id: string
          project_id: string | null
          started_at: string | null
          status: string
        }
        Insert: {
          audit_code: string
          audit_type: string
          auditor_user_id?: string | null
          completed_at?: string | null
          created_at?: string
          facility_id?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          project_id?: string | null
          started_at?: string | null
          status?: string
        }
        Update: {
          audit_code?: string
          audit_type?: string
          auditor_user_id?: string | null
          completed_at?: string | null
          created_at?: string
          facility_id?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          project_id?: string | null
          started_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_audits_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "ahte_facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_audits_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_audits_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
      ahte_batch_genealogy: {
        Row: {
          child_entity_id: string
          child_entity_type: string
          created_at: string
          id: string
          organization_id: string
          parent_entity_id: string
          parent_entity_type: string
          quantity: number | null
          unit: string | null
        }
        Insert: {
          child_entity_id: string
          child_entity_type: string
          created_at?: string
          id?: string
          organization_id: string
          parent_entity_id: string
          parent_entity_type: string
          quantity?: number | null
          unit?: string | null
        }
        Update: {
          child_entity_id?: string
          child_entity_type?: string
          created_at?: string
          id?: string
          organization_id?: string
          parent_entity_id?: string
          parent_entity_type?: string
          quantity?: number | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_batch_genealogy_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_batches: {
        Row: {
          batch_no: string
          created_at: string
          facility_id: string | null
          id: string
          metadata: Json
          organization_id: string
          produced_at: string | null
          product_id: string
          product_version_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          batch_no: string
          created_at?: string
          facility_id?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          produced_at?: string | null
          product_id: string
          product_version_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          batch_no?: string
          created_at?: string
          facility_id?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          produced_at?: string | null
          product_id?: string
          product_version_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_batches_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "ahte_facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_batches_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_batches_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "ahte_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_batches_product_version_id_fkey"
            columns: ["product_version_id"]
            isOneToOne: false
            referencedRelation: "ahte_product_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_blast_radius: {
        Row: {
          closed_at: string | null
          created_at: string
          entity_id: string
          entity_type: string
          fracture_id: string
          id: string
          impact_type: string
          organization_id: string
          status: string
        }
        Insert: {
          closed_at?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          fracture_id: string
          id?: string
          impact_type: string
          organization_id: string
          status?: string
        }
        Update: {
          closed_at?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          fracture_id?: string
          id?: string
          impact_type?: string
          organization_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_blast_radius_fracture_id_fkey"
            columns: ["fracture_id"]
            isOneToOne: false
            referencedRelation: "ahte_fracture_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_blast_radius_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
          product_id: string | null
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
          product_id?: string | null
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
          product_id?: string | null
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
            foreignKeyName: "ahte_certificates_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "ahte_products"
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
      ahte_change_requests: {
        Row: {
          approval_status: string
          change_type: string
          created_at: string
          id: string
          impact_assessment: string | null
          implementation_status: string
          organization_id: string
          project_id: string | null
          re_verification_required: boolean
          requested_by: string | null
          subject_id: string
          subject_type: string
          updated_at: string
        }
        Insert: {
          approval_status?: string
          change_type: string
          created_at?: string
          id?: string
          impact_assessment?: string | null
          implementation_status?: string
          organization_id: string
          project_id?: string | null
          re_verification_required?: boolean
          requested_by?: string | null
          subject_id: string
          subject_type: string
          updated_at?: string
        }
        Update: {
          approval_status?: string
          change_type?: string
          created_at?: string
          id?: string
          impact_assessment?: string | null
          implementation_status?: string
          organization_id?: string
          project_id?: string | null
          re_verification_required?: boolean
          requested_by?: string | null
          subject_id?: string
          subject_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_change_requests_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_change_requests_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_competencies: {
        Row: {
          assessed_at: string | null
          competency: string
          created_at: string
          evidence_id: string | null
          expires_at: string | null
          id: string
          metadata: Json
          organization_id: string
          status: string
          user_id: string
        }
        Insert: {
          assessed_at?: string | null
          competency: string
          created_at?: string
          evidence_id?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          status?: string
          user_id: string
        }
        Update: {
          assessed_at?: string | null
          competency?: string
          created_at?: string
          evidence_id?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_competencies_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_competencies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_complaints: {
        Row: {
          batch_id: string | null
          closed_at: string | null
          complaint: string
          id: string
          organization_id: string
          product_id: string | null
          received_at: string
          severity: string
          source: string
          status: string
        }
        Insert: {
          batch_id?: string | null
          closed_at?: string | null
          complaint: string
          id?: string
          organization_id: string
          product_id?: string | null
          received_at?: string
          severity?: string
          source: string
          status?: string
        }
        Update: {
          batch_id?: string | null
          closed_at?: string | null
          complaint?: string
          id?: string
          organization_id?: string
          product_id?: string | null
          received_at?: string
          severity?: string
          source?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_complaints_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "ahte_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_complaints_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_complaints_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "ahte_products"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_consumer_scans: {
        Row: {
          batch_id: string | null
          coarse_location: Json | null
          consented: boolean
          disclosure_version: string | null
          id: string
          metadata: Json
          organization_id: string
          packet_id: string | null
          product_id: string | null
          scanned_at: string
          verification_result: string
        }
        Insert: {
          batch_id?: string | null
          coarse_location?: Json | null
          consented?: boolean
          disclosure_version?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          packet_id?: string | null
          product_id?: string | null
          scanned_at?: string
          verification_result?: string
        }
        Update: {
          batch_id?: string | null
          coarse_location?: Json | null
          consented?: boolean
          disclosure_version?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          packet_id?: string | null
          product_id?: string | null
          scanned_at?: string
          verification_result?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_consumer_scans_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "ahte_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_consumer_scans_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_consumer_scans_packet_id_fkey"
            columns: ["packet_id"]
            isOneToOne: false
            referencedRelation: "ahte_trust_packets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_consumer_scans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "ahte_products"
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
      ahte_credential_checks: {
        Row: {
          certificate_id: string
          checked_at: string
          checked_until: string | null
          content_hash: string | null
          created_at: string
          evidence_id: string | null
          id: string
          issuer_verified: boolean
          notes: string | null
          organization_id: string
          scope_match: boolean
          source_reference: string | null
          source_type: string
          validity_status: string
        }
        Insert: {
          certificate_id: string
          checked_at?: string
          checked_until?: string | null
          content_hash?: string | null
          created_at?: string
          evidence_id?: string | null
          id?: string
          issuer_verified?: boolean
          notes?: string | null
          organization_id: string
          scope_match?: boolean
          source_reference?: string | null
          source_type: string
          validity_status?: string
        }
        Update: {
          certificate_id?: string
          checked_at?: string
          checked_until?: string | null
          content_hash?: string | null
          created_at?: string
          evidence_id?: string | null
          id?: string
          issuer_verified?: boolean
          notes?: string | null
          organization_id?: string
          scope_match?: boolean
          source_reference?: string | null
          source_type?: string
          validity_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_credential_checks_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "ahte_certificates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_credential_checks_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_credential_checks_organization_id_fkey"
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
      ahte_data_access_policies: {
        Row: {
          active: boolean
          allowed_roles: string[]
          classification: string
          created_at: string
          id: string
          jurisdiction: string | null
          legal_basis: string | null
          organization_id: string
          purpose: string
          record_type: string
          retention_days: number | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          allowed_roles?: string[]
          classification?: string
          created_at?: string
          id?: string
          jurisdiction?: string | null
          legal_basis?: string | null
          organization_id: string
          purpose: string
          record_type: string
          retention_days?: number | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          allowed_roles?: string[]
          classification?: string
          created_at?: string
          id?: string
          jurisdiction?: string | null
          legal_basis?: string | null
          organization_id?: string
          purpose?: string
          record_type?: string
          retention_days?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_data_access_policies_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_device_maintenance: {
        Row: {
          activity_type: string
          calibration_reference: string | null
          created_at: string
          device_id: string
          evidence_id: string | null
          id: string
          notes: string | null
          organization_id: string
          performed_at: string
          performed_by: string | null
          status: string
        }
        Insert: {
          activity_type: string
          calibration_reference?: string | null
          created_at?: string
          device_id: string
          evidence_id?: string | null
          id?: string
          notes?: string | null
          organization_id: string
          performed_at?: string
          performed_by?: string | null
          status?: string
        }
        Update: {
          activity_type?: string
          calibration_reference?: string | null
          created_at?: string
          device_id?: string
          evidence_id?: string | null
          id?: string
          notes?: string | null
          organization_id?: string
          performed_at?: string
          performed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_device_maintenance_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "ahte_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_device_maintenance_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_device_maintenance_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_devices: {
        Row: {
          calibration_due: string | null
          created_at: string
          device_code: string
          device_type: string
          id: string
          identity_reference: string | null
          metadata: Json
          organization_id: string
          provisioning_status: string
          serial_no: string | null
          status: string
          updated_at: string
        }
        Insert: {
          calibration_due?: string | null
          created_at?: string
          device_code: string
          device_type: string
          id?: string
          identity_reference?: string | null
          metadata?: Json
          organization_id: string
          provisioning_status?: string
          serial_no?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          calibration_due?: string | null
          created_at?: string
          device_code?: string
          device_type?: string
          id?: string
          identity_reference?: string | null
          metadata?: Json
          organization_id?: string
          provisioning_status?: string
          serial_no?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_devices_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_digital_twins: {
        Row: {
          content_hash: string | null
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          organization_id: string
          snapshot: Json
          source_event_id: number | null
          status: string
          twin_version: number
          updated_at: string
        }
        Insert: {
          content_hash?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          organization_id: string
          snapshot?: Json
          source_event_id?: number | null
          status?: string
          twin_version?: number
          updated_at?: string
        }
        Update: {
          content_hash?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          organization_id?: string
          snapshot?: Json
          source_event_id?: number | null
          status?: string
          twin_version?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_digital_twins_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_digital_twins_source_event_id_fkey"
            columns: ["source_event_id"]
            isOneToOne: false
            referencedRelation: "ahte_event_ledger"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_event_ledger: {
        Row: {
          actor_id: string | null
          actor_type: string | null
          created_at: string
          entity_id: string
          entity_type: string
          event_hash: string
          event_type: string
          id: number
          occurred_at: string
          organization_id: string
          payload: Json
          previous_hash: string | null
          signature: string | null
          source_system: string | null
        }
        Insert: {
          actor_id?: string | null
          actor_type?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          event_hash: string
          event_type: string
          id?: never
          occurred_at?: string
          organization_id: string
          payload?: Json
          previous_hash?: string | null
          signature?: string | null
          source_system?: string | null
        }
        Update: {
          actor_id?: string | null
          actor_type?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          event_hash?: string
          event_type?: string
          id?: never
          occurred_at?: string
          organization_id?: string
          payload?: Json
          previous_hash?: string | null
          signature?: string | null
          source_system?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_event_ledger_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      ahte_facilities: {
        Row: {
          address: Json
          created_at: string
          id: string
          jurisdiction: string | null
          legal_name: string
          metadata: Json
          organization_id: string
          site_code: string
          status: string
          updated_at: string
        }
        Insert: {
          address?: Json
          created_at?: string
          id?: string
          jurisdiction?: string | null
          legal_name: string
          metadata?: Json
          organization_id: string
          site_code: string
          status?: string
          updated_at?: string
        }
        Update: {
          address?: Json
          created_at?: string
          id?: string
          jurisdiction?: string | null
          legal_name?: string
          metadata?: Json
          organization_id?: string
          site_code?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_facilities_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_facility_zones: {
        Row: {
          created_at: string
          facility_id: string
          halal_status: string
          id: string
          metadata: Json
          organization_id: string
          segregation_class: string | null
          status: string
          zone_code: string
          zone_type: string
        }
        Insert: {
          created_at?: string
          facility_id: string
          halal_status?: string
          id?: string
          metadata?: Json
          organization_id: string
          segregation_class?: string | null
          status?: string
          zone_code: string
          zone_type: string
        }
        Update: {
          created_at?: string
          facility_id?: string
          halal_status?: string
          id?: string
          metadata?: Json
          organization_id?: string
          segregation_class?: string | null
          status?: string
          zone_code?: string
          zone_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_facility_zones_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "ahte_facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_facility_zones_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      ahte_formula_materials: {
        Row: {
          created_at: string
          id: string
          material_id: string
          metadata: Json
          organization_id: string
          product_version_id: string
          quantity: number | null
          status: string
          unit: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          material_id: string
          metadata?: Json
          organization_id: string
          product_version_id: string
          quantity?: number | null
          status?: string
          unit?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          material_id?: string
          metadata?: Json
          organization_id?: string
          product_version_id?: string
          quantity?: number | null
          status?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_formula_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "ahte_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_formula_materials_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_formula_materials_product_version_id_fkey"
            columns: ["product_version_id"]
            isOneToOne: false
            referencedRelation: "ahte_product_versions"
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
          reverification_id: string | null
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
          reverification_id?: string | null
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
          reverification_id?: string | null
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
          {
            foreignKeyName: "ahte_fracture_events_reverification_id_fkey"
            columns: ["reverification_id"]
            isOneToOne: false
            referencedRelation: "ahte_reverifications"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_gate_results: {
        Row: {
          authority_decision_id: string | null
          entity_id: string
          entity_type: string
          evidence_id: string
          expires_at: string | null
          gate_id: string
          id: string
          organization_id: string
          project_id: string | null
          rationale: string
          result: string
          reviewed_at: string
          reviewed_by: string
        }
        Insert: {
          authority_decision_id?: string | null
          entity_id: string
          entity_type: string
          evidence_id: string
          expires_at?: string | null
          gate_id: string
          id?: string
          organization_id: string
          project_id?: string | null
          rationale: string
          result: string
          reviewed_at?: string
          reviewed_by: string
        }
        Update: {
          authority_decision_id?: string | null
          entity_id?: string
          entity_type?: string
          evidence_id?: string
          expires_at?: string | null
          gate_id?: string
          id?: string
          organization_id?: string
          project_id?: string | null
          rationale?: string
          result?: string
          reviewed_at?: string
          reviewed_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_gate_results_authority_decision_id_fkey"
            columns: ["authority_decision_id"]
            isOneToOne: false
            referencedRelation: "ahte_authority_decisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_gate_results_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_gate_results_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_gate_results_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_geofences: {
        Row: {
          code: string
          created_at: string
          geometry: Json
          id: string
          name: string
          organization_id: string
          status: string
        }
        Insert: {
          code: string
          created_at?: string
          geometry: Json
          id?: string
          name: string
          organization_id: string
          status?: string
        }
        Update: {
          code?: string
          created_at?: string
          geometry?: Json
          id?: string
          name?: string
          organization_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_geofences_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_hard_gate_rules: {
        Row: {
          active: boolean
          code: string
          compensable: boolean
          created_at: string
          decision_class: string | null
          dimension: string
          fail_condition: string
          id: string
          organization_id: string
        }
        Insert: {
          active?: boolean
          code: string
          compensable?: boolean
          created_at?: string
          decision_class?: string | null
          dimension: string
          fail_condition: string
          id?: string
          organization_id: string
        }
        Update: {
          active?: boolean
          code?: string
          compensable?: boolean
          created_at?: string
          decision_class?: string | null
          dimension?: string
          fail_condition?: string
          id?: string
          organization_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_hard_gate_rules_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      ahte_inbound_events: {
        Row: {
          created_at: string
          error_message: string | null
          event_type: string
          external_event_id: string
          id: string
          integration_id: string
          organization_id: string
          payload: Json
          payload_hash: string
          received_at: string
          status: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          event_type: string
          external_event_id: string
          id?: string
          integration_id: string
          organization_id: string
          payload: Json
          payload_hash: string
          received_at?: string
          status?: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          event_type?: string
          external_event_id?: string
          id?: string
          integration_id?: string
          organization_id?: string
          payload?: Json
          payload_hash?: string
          received_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_inbound_events_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "ahte_integrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_inbound_events_organization_id_fkey"
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
      ahte_integrations: {
        Row: {
          auth_mode: string
          configuration: Json
          created_at: string
          endpoint: string | null
          id: string
          last_error: string | null
          last_error_at: string | null
          last_success_at: string | null
          name: string
          organization_id: string
          status: string
          system_type: string
          updated_at: string
        }
        Insert: {
          auth_mode?: string
          configuration?: Json
          created_at?: string
          endpoint?: string | null
          id?: string
          last_error?: string | null
          last_error_at?: string | null
          last_success_at?: string | null
          name: string
          organization_id: string
          status?: string
          system_type: string
          updated_at?: string
        }
        Update: {
          auth_mode?: string
          configuration?: Json
          created_at?: string
          endpoint?: string | null
          id?: string
          last_error?: string | null
          last_error_at?: string | null
          last_success_at?: string | null
          name?: string
          organization_id?: string
          status?: string
          system_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_integrations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_lab_results: {
        Row: {
          analyte: string
          created_at: string
          id: string
          interpretation: string | null
          organization_id: string
          report_ref: string | null
          result_class: string
          result_value: string | null
          sample_id: string
          signature_hash: string | null
          status: string
          unit: string | null
        }
        Insert: {
          analyte: string
          created_at?: string
          id?: string
          interpretation?: string | null
          organization_id: string
          report_ref?: string | null
          result_class?: string
          result_value?: string | null
          sample_id: string
          signature_hash?: string | null
          status?: string
          unit?: string | null
        }
        Update: {
          analyte?: string
          created_at?: string
          id?: string
          interpretation?: string | null
          organization_id?: string
          report_ref?: string | null
          result_class?: string
          result_value?: string | null
          sample_id?: string
          signature_hash?: string | null
          status?: string
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_lab_results_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_lab_results_sample_id_fkey"
            columns: ["sample_id"]
            isOneToOne: false
            referencedRelation: "ahte_lab_samples"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_lab_samples: {
        Row: {
          batch_id: string | null
          chain_of_custody_ref: string | null
          collected_at: string | null
          created_at: string
          evidence_id: string | null
          id: string
          laboratory_id: string | null
          matrix: string | null
          metadata: Json
          method_code: string | null
          method_version: string | null
          organization_id: string
          specimen_id: string
          status: string
        }
        Insert: {
          batch_id?: string | null
          chain_of_custody_ref?: string | null
          collected_at?: string | null
          created_at?: string
          evidence_id?: string | null
          id?: string
          laboratory_id?: string | null
          matrix?: string | null
          metadata?: Json
          method_code?: string | null
          method_version?: string | null
          organization_id: string
          specimen_id: string
          status?: string
        }
        Update: {
          batch_id?: string | null
          chain_of_custody_ref?: string | null
          collected_at?: string | null
          created_at?: string
          evidence_id?: string | null
          id?: string
          laboratory_id?: string | null
          matrix?: string | null
          metadata?: Json
          method_code?: string | null
          method_version?: string | null
          organization_id?: string
          specimen_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_lab_samples_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "ahte_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_lab_samples_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_lab_samples_laboratory_id_fkey"
            columns: ["laboratory_id"]
            isOneToOne: false
            referencedRelation: "ahte_laboratories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_lab_samples_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      ahte_market_registrations: {
        Row: {
          authority_reference: string | null
          created_at: string
          effective_from: string | null
          evidence_id: string | null
          expires_on: string | null
          halal_acceptance_reference: string | null
          id: string
          importer_name: string | null
          market_code: string
          organization_id: string
          product_id: string
          registration_reference: string | null
          status: string
          updated_at: string
        }
        Insert: {
          authority_reference?: string | null
          created_at?: string
          effective_from?: string | null
          evidence_id?: string | null
          expires_on?: string | null
          halal_acceptance_reference?: string | null
          id?: string
          importer_name?: string | null
          market_code: string
          organization_id: string
          product_id: string
          registration_reference?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          authority_reference?: string | null
          created_at?: string
          effective_from?: string | null
          evidence_id?: string | null
          expires_on?: string | null
          halal_acceptance_reference?: string | null
          id?: string
          importer_name?: string | null
          market_code?: string
          organization_id?: string
          product_id?: string
          registration_reference?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_market_registrations_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_market_registrations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_market_registrations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "ahte_products"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_material_lots: {
        Row: {
          created_at: string
          evidence_id: string | null
          id: string
          lot_no: string
          material_id: string
          metadata: Json
          organization_id: string
          received_at: string | null
          status: string
        }
        Insert: {
          created_at?: string
          evidence_id?: string | null
          id?: string
          lot_no: string
          material_id: string
          metadata?: Json
          organization_id: string
          received_at?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          evidence_id?: string | null
          id?: string
          lot_no?: string
          material_id?: string
          metadata?: Json
          organization_id?: string
          received_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_material_lots_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_material_lots_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "ahte_materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_material_lots_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_materials: {
        Row: {
          category: string | null
          created_at: string
          halal_status: string
          id: string
          metadata: Json
          name: string
          organization_id: string
          origin_country: string | null
          source_type: string | null
          specification_ref: string | null
          status: string
          supplier_id: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          halal_status?: string
          id?: string
          metadata?: Json
          name: string
          organization_id: string
          origin_country?: string | null
          source_type?: string | null
          specification_ref?: string | null
          status?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          halal_status?: string
          id?: string
          metadata?: Json
          name?: string
          organization_id?: string
          origin_country?: string | null
          source_type?: string | null
          specification_ref?: string | null
          status?: string
          supplier_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_materials_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_materials_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "ahte_suppliers"
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
      ahte_person_roles: {
        Row: {
          authority_level: string
          created_at: string
          effective_from: string | null
          expires_at: string | null
          facility_id: string | null
          id: string
          mandate_source: string | null
          metadata: Json
          organization_id: string
          role_type: string
          status: string
          user_id: string
        }
        Insert: {
          authority_level?: string
          created_at?: string
          effective_from?: string | null
          expires_at?: string | null
          facility_id?: string | null
          id?: string
          mandate_source?: string | null
          metadata?: Json
          organization_id: string
          role_type: string
          status?: string
          user_id: string
        }
        Update: {
          authority_level?: string
          created_at?: string
          effective_from?: string | null
          expires_at?: string | null
          facility_id?: string | null
          id?: string
          mandate_source?: string | null
          metadata?: Json
          organization_id?: string
          role_type?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_person_roles_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "ahte_facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_person_roles_organization_id_fkey"
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
      ahte_process_steps: {
        Row: {
          control_id: string | null
          created_at: string
          critical_point_id: string | null
          description: string | null
          facility_id: string | null
          id: string
          metadata: Json
          name: string
          organization_id: string
          product_version_id: string
          sequence_no: number
          status: string
        }
        Insert: {
          control_id?: string | null
          created_at?: string
          critical_point_id?: string | null
          description?: string | null
          facility_id?: string | null
          id?: string
          metadata?: Json
          name: string
          organization_id: string
          product_version_id: string
          sequence_no: number
          status?: string
        }
        Update: {
          control_id?: string | null
          created_at?: string
          critical_point_id?: string | null
          description?: string | null
          facility_id?: string | null
          id?: string
          metadata?: Json
          name?: string
          organization_id?: string
          product_version_id?: string
          sequence_no?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_process_steps_control_id_fkey"
            columns: ["control_id"]
            isOneToOne: false
            referencedRelation: "ahte_controls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_process_steps_critical_point_id_fkey"
            columns: ["critical_point_id"]
            isOneToOne: false
            referencedRelation: "ahte_critical_points"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_process_steps_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "ahte_facilities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_process_steps_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_process_steps_product_version_id_fkey"
            columns: ["product_version_id"]
            isOneToOne: false
            referencedRelation: "ahte_product_versions"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_product_versions: {
        Row: {
          created_at: string
          effective_from: string | null
          formula_ref: string | null
          id: string
          metadata: Json
          organization_id: string
          product_id: string
          status: string
          version_no: string
        }
        Insert: {
          created_at?: string
          effective_from?: string | null
          formula_ref?: string | null
          id?: string
          metadata?: Json
          organization_id: string
          product_id: string
          status?: string
          version_no: string
        }
        Update: {
          created_at?: string
          effective_from?: string | null
          formula_ref?: string | null
          id?: string
          metadata?: Json
          organization_id?: string
          product_id?: string
          status?: string
          version_no?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_product_versions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_product_versions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "ahte_products"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          manufacturer_partner_id: string | null
          market_status: string
          metadata: Json
          name: string
          organization_id: string
          status: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          manufacturer_partner_id?: string | null
          market_status?: string
          metadata?: Json
          name: string
          organization_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          manufacturer_partner_id?: string | null
          market_status?: string
          metadata?: Json
          name?: string
          organization_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_products_manufacturer_partner_id_fkey"
            columns: ["manufacturer_partner_id"]
            isOneToOne: false
            referencedRelation: "ahte_partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_products_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_public_verifications: {
        Row: {
          created_at: string
          created_by: string | null
          disclosure: Json
          expires_at: string | null
          id: string
          organization_id: string
          packet_id: string
          revoked_at: string | null
          token_hash: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          disclosure?: Json
          expires_at?: string | null
          id?: string
          organization_id: string
          packet_id: string
          revoked_at?: string | null
          token_hash: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          disclosure?: Json
          expires_at?: string | null
          id?: string
          organization_id?: string
          packet_id?: string
          revoked_at?: string | null
          token_hash?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_public_verifications_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_public_verifications_packet_id_fkey"
            columns: ["packet_id"]
            isOneToOne: false
            referencedRelation: "ahte_trust_packets"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_recall_scopes: {
        Row: {
          action: string
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          organization_id: string
          recall_id: string
          status: string
        }
        Insert: {
          action: string
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          organization_id: string
          recall_id: string
          status?: string
        }
        Update: {
          action?: string
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          organization_id?: string
          recall_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_recall_scopes_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_recall_scopes_recall_id_fkey"
            columns: ["recall_id"]
            isOneToOne: false
            referencedRelation: "ahte_recalls"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_recalls: {
        Row: {
          authority_reference: string | null
          created_at: string
          id: string
          initiated_at: string
          organization_id: string
          reason: string
          recall_code: string
          scope: Json
          status: string
          updated_at: string
        }
        Insert: {
          authority_reference?: string | null
          created_at?: string
          id?: string
          initiated_at?: string
          organization_id: string
          reason: string
          recall_code: string
          scope?: Json
          status?: string
          updated_at?: string
        }
        Update: {
          authority_reference?: string | null
          created_at?: string
          id?: string
          initiated_at?: string
          organization_id?: string
          reason?: string
          recall_code?: string
          scope?: Json
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_recalls_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
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
      ahte_retail_events: {
        Row: {
          action: string
          actor_user_id: string | null
          batch_id: string | null
          evidence_id: string | null
          id: string
          location: string | null
          metadata: Json
          occurred_at: string
          organization_id: string
          project_id: string | null
        }
        Insert: {
          action: string
          actor_user_id?: string | null
          batch_id?: string | null
          evidence_id?: string | null
          id?: string
          location?: string | null
          metadata?: Json
          occurred_at?: string
          organization_id: string
          project_id?: string | null
        }
        Update: {
          action?: string
          actor_user_id?: string | null
          batch_id?: string | null
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
            foreignKeyName: "ahte_retail_events_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "ahte_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_retail_events_evidence_id_fkey"
            columns: ["evidence_id"]
            isOneToOne: false
            referencedRelation: "ahte_evidence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_retail_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_retail_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
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
      ahte_source_conflicts: {
        Row: {
          closed_at: string | null
          conflict_point: string
          created_at: string
          escalated_to: string | null
          id: string
          organization_id: string
          resolution_ref: string | null
          source_a: string
          source_b: string
          status: string
        }
        Insert: {
          closed_at?: string | null
          conflict_point: string
          created_at?: string
          escalated_to?: string | null
          id?: string
          organization_id: string
          resolution_ref?: string | null
          source_a: string
          source_b: string
          status?: string
        }
        Update: {
          closed_at?: string | null
          conflict_point?: string
          created_at?: string
          escalated_to?: string | null
          id?: string
          organization_id?: string
          resolution_ref?: string | null
          source_a?: string
          source_b?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_source_conflicts_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_source_conflicts_source_a_fkey"
            columns: ["source_a"]
            isOneToOne: false
            referencedRelation: "ahte_source_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_source_conflicts_source_b_fkey"
            columns: ["source_b"]
            isOneToOne: false
            referencedRelation: "ahte_source_records"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_source_records: {
        Row: {
          created_at: string
          document_id: string | null
          edition: string | null
          effective_date: string | null
          hash12: string | null
          id: string
          issuer: string | null
          organization_id: string
          retrieved_at: string | null
          source_status: string
          source_type: string
          source_url: string | null
          supersedes_id: string | null
        }
        Insert: {
          created_at?: string
          document_id?: string | null
          edition?: string | null
          effective_date?: string | null
          hash12?: string | null
          id?: string
          issuer?: string | null
          organization_id: string
          retrieved_at?: string | null
          source_status?: string
          source_type: string
          source_url?: string | null
          supersedes_id?: string | null
        }
        Update: {
          created_at?: string
          document_id?: string | null
          edition?: string | null
          effective_date?: string | null
          hash12?: string | null
          id?: string
          issuer?: string | null
          organization_id?: string
          retrieved_at?: string | null
          source_status?: string
          source_type?: string
          source_url?: string | null
          supersedes_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_source_records_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_source_records_supersedes_id_fkey"
            columns: ["supersedes_id"]
            isOneToOne: false
            referencedRelation: "ahte_source_records"
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
      ahte_state_transitions: {
        Row: {
          active: boolean
          created_at: string
          event: string
          from_state: string
          id: string
          machine: string
          organization_id: string
          required_decision_class: string | null
          to_state: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          event: string
          from_state: string
          id?: string
          machine?: string
          organization_id: string
          required_decision_class?: string | null
          to_state: string
        }
        Update: {
          active?: boolean
          created_at?: string
          event?: string
          from_state?: string
          id?: string
          machine?: string
          organization_id?: string
          required_decision_class?: string | null
          to_state?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_state_transitions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_suppliers: {
        Row: {
          created_at: string
          id: string
          jurisdiction: string | null
          legal_name: string
          metadata: Json
          organization_id: string
          registration_no: string | null
          risk_class: string
          status: string
          updated_at: string
          verification_status: string
        }
        Insert: {
          created_at?: string
          id?: string
          jurisdiction?: string | null
          legal_name: string
          metadata?: Json
          organization_id: string
          registration_no?: string | null
          risk_class?: string
          status?: string
          updated_at?: string
          verification_status?: string
        }
        Update: {
          created_at?: string
          id?: string
          jurisdiction?: string | null
          legal_name?: string
          metadata?: Json
          organization_id?: string
          registration_no?: string | null
          risk_class?: string
          status?: string
          updated_at?: string
          verification_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "ahte_suppliers_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      ahte_telemetry_events: {
        Row: {
          batch_id: string | null
          device_id: string
          event_code: string | null
          event_hash: string
          id: string
          metadata: Json
          metric_type: string
          metric_value: number | null
          observed_at: string
          organization_id: string
          received_at: string
          sequence_no: number | null
          shipment_id: string | null
          signature: string | null
          unit: string | null
        }
        Insert: {
          batch_id?: string | null
          device_id: string
          event_code?: string | null
          event_hash: string
          id?: string
          metadata?: Json
          metric_type: string
          metric_value?: number | null
          observed_at: string
          organization_id: string
          received_at?: string
          sequence_no?: number | null
          shipment_id?: string | null
          signature?: string | null
          unit?: string | null
        }
        Update: {
          batch_id?: string | null
          device_id?: string
          event_code?: string | null
          event_hash?: string
          id?: string
          metadata?: Json
          metric_type?: string
          metric_value?: number | null
          observed_at?: string
          organization_id?: string
          received_at?: string
          sequence_no?: number | null
          shipment_id?: string | null
          signature?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ahte_telemetry_events_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "ahte_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_telemetry_events_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "ahte_devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_telemetry_events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ahte_telemetry_events_shipment_id_fkey"
            columns: ["shipment_id"]
            isOneToOne: false
            referencedRelation: "ahte_shipments"
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
          previous_state_id: string | null
          project_id: string | null
          rationale: string | null
          score: number | null
          state: string
          transition_event: string | null
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
          previous_state_id?: string | null
          project_id?: string | null
          rationale?: string | null
          score?: number | null
          state: string
          transition_event?: string | null
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
          previous_state_id?: string | null
          project_id?: string | null
          rationale?: string | null
          score?: number | null
          state?: string
          transition_event?: string | null
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
            foreignKeyName: "ahte_trust_states_previous_state_id_fkey"
            columns: ["previous_state_id"]
            isOneToOne: false
            referencedRelation: "ahte_trust_states"
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
      ahte_create_public_verification_proxy: {
        Args: {
          p_disclosure: Json
          p_expires_at?: string
          p_org: string
          p_packet_id: string
        }
        Returns: string
      }
      ahte_create_recall_proxy: {
        Args: { p_body: Json; p_org: string }
        Returns: Json
      }
      ahte_evaluate_release_proxy: {
        Args: {
          p_entity_id: string
          p_entity_type: string
          p_org: string
          p_requires_authority?: boolean
        }
        Returns: Json
      }
      ahte_public_verify: { Args: { p_token: string }; Returns: Json }
      ahte_rate_limit_proxy: {
        Args: { p_limit?: number; p_org: string; p_route: string }
        Returns: boolean
      }
      ahte_record_event_proxy: {
        Args: {
          p_actor_id: string
          p_actor_type: string
          p_entity_id: string
          p_entity_type: string
          p_event_type: string
          p_org: string
          p_payload: Json
          p_signature?: string
          p_source_system?: string
        }
        Returns: number
      }
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
