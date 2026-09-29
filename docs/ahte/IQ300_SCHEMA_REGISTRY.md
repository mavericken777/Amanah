# IQ300 Schema Registry Mapping

Amanah implements the operational database for the structured domains defined by GlobalHalalDigitalTrust.

| Schema domain | Amanah table(s) |
|---|---|
| identity-object | `ahte_identities` |
| certificate-object | `ahte_certificates` |
| evidence-object | `ahte_evidence` |
| custody-object | `ahte_custody_events` |
| port-custody-object | `ahte_port_custody_events` |
| audit-object | `ahte_audit_tests`, `ahte_findings` |
| trust-state-object | `ahte_trust_states` |
| assessment-object | `ahte_assessments` |
| hitm-case-object | `ahte_hitm_cases` |
| authority-decision-object | `ahte_authority_decisions` |
| ai-provenance-object | `ahte_ai_provenance` |
| trust-vector-object | `ahte_trust_vectors` |
| release-decision-object | `ahte_release_decisions` |
| fracture-event-object | `ahte_fracture_events` |
| trust-packet | `ahte_trust_packets` |
| standard-mapping | `ahte_standard_mappings` |

This registry is an implementation mapping, not a replacement for the source repository's JSON Schema. Validate serialized packets against the authoritative schema registry before external delivery.
