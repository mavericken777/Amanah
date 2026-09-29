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
