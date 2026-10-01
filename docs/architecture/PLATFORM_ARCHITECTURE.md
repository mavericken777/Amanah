# AMANAH / Global Halal Digital Trust - Canonical Platform Architecture

**Version:** 2.0.0 | **Control date:** 2026-10-02 | **Status:** CONTROLLING POST-FREEZE ARCHITECTURE

## 1. Canonical system story
AMANAH connects origin, manufacturer, assurance, laboratory, audit, production, logistics, border, destination and verification as one evidence-linked lifecycle.

`Origin / Manufacturer -> Organisation -> Identity/KYC -> Facility -> Product -> SKU -> Supplier -> Ingredient/Raw Material -> Documentation -> AI Review -> Human Governance -> Laboratory -> Audit -> CAPA -> Authority/Credential -> Production -> IoT -> Batch -> Warehouse -> Logistics -> Digital Custody -> Port -> Authority Connectivity -> Cross-Border -> GCC Destination -> Distribution/Retail -> Verification -> Command Centre -> Continuous Assurance`

## 2. Authority boundary
`AHTE <-> Direct JAKIM API <-> JAKIM`

AHTE provides orchestration, applicability mapping, controls, evidence, AI assistance, trust state and operational decision support. It does not issue Halal certification, sovereign release, financing approval, Takaful decisions or legal title.

## 3. Platform planes
| Plane | Purpose | Accountable function | System of record | Evidence | Failure behaviour |
|---|---|---|---|---|---|
| Identity | organisations/users/roles/KYC refs | IAM | Auth + org tables | identity evidence | deny/escalate |
| Registration | facility/product/SKU/supplier/material/asset | domain owner | AHTE domain tables | registration refs | draft/information required |
| Compliance | standards/requirements/applicability/controls/HCP/SCCP | compliance | AHTE control plane | source/evidence | source-lock |
| Evidence | documents/lab/media/events | evidence steward | evidence + vault | hash/signature/provenance | append/supersede |
| Human governance | HITM/audit/authority | authorized human roles | HITM/authority stores | signed decision | hold |
| Trust | states/vectors/fractures/packets | AHTE | trust/event ledger | integrity proofs | hold/quarantine |
| Production | devices/sensors/telemetry/batches | manufacturer operations | AHTE + factory SOR | telemetry evidence | buffer/alert |
| Logistics | shipment/vehicle/driver/custody/seal | logistics operator | AHTE + operator SOR | handover/telemetry | hold/store-forward |
| Border | pre-arrival/inspection/release | port/customs authority | authority SOR | inspection/decision | hold/refer |
| Destination | importer/warehouse/retail/verification | destination operator/authority | destination SOR | receiving/market evidence | hold/refer |
| Intelligence | extraction/anomaly/prediction | AHTE intelligence | provenance/prediction | model/source refs | escalate/D4 hold |
| Integration | APIs/events/adapters/webhooks | integration engineering | connector state + external SOR | receipt/mapping | retry/circuit-break |
| Experience | role-specific interfaces | product teams | web/mobile/partner channels | user audit | safe empty/offline |

## 4. Component contract
Every component defines purpose, owner, inputs, outputs, SOR, authority boundary, security boundary, evidence, dependencies and failure behaviour. External systems never become AHTE SOR merely because an adapter exists.

## 5. Decision model
| Class | Meaning | AI | Human/authority |
|---|---|---|---|
| D0 | ingest | yes | no |
| D1 | encoded control | yes | rule-owner approval for rule changes |
| D2 | machine assessment | yes | review as configured |
| D3 | recommendation | yes | yes for material action |
| D4 | trust-fracture hold | configured | yes to resolve/release |
| D5 | authority gate | no | authorized authority |
| D6 | sovereign/legal decision | no | competent authority/legal actor |

## 6. Canonical evidence binding
`ObjectID + EventID + EvidenceID + ActorID + Timestamp + IntegrityProof`
A hash demonstrates integrity of recorded bytes; it does not prove the truth of the underlying claim.

## 7. Core graphs
Manufacturer: `Organisation -> KYC -> Facility -> ProductionLine -> Product -> SKU -> Formula -> Material -> Supplier -> Certificate/Evidence -> Audit -> CAPA -> Authority/Credential -> Batch`.

Laboratory: `Requirement -> Sample -> ChainOfCustody -> Method/QC -> TestResult -> Review/Signature -> Evidence -> Audit/Case`. **NOT DETECTED != HALAL**.

Logistics: `Batch/Lot -> Package -> Pallet -> Container -> Seal -> Shipment -> Vehicle/Driver -> Route/Custody -> Port -> Destination -> Verification`.

Trust: `Source -> Requirement -> Control -> Evidence -> AuditTest -> Finding -> CAPA -> Reverification -> AuthorityGate -> TrustState -> OperationalRelease`.

## 8. Resilience and sovereignty
Field workflows support store-and-forward. No outage is converted into synthetic success. Granular source records remain in their legally appropriate sovereign/enterprise systems; federation exposes minimum-necessary assertions, proofs, statuses and references.

## 9. Release principle
Operational release is a technical transition subject to configured hard gates and human/authority evidence. It is not Halal certification.

## 10. Current implementation binding
AHTE implementation includes control/evidence/trust, laboratory, audit, logistics/custody, digital twins, telemetry, Command Centre target objects, finance-evidence objects, connector contracts and public verification. The 2026-10-02 normalized domain migration adds first-class ProductionLine, SKU, CertificationScope, Vehicle, Driver, Warehouse, Pallet, Package, Container, Seal, RouteEvent and VerificationEvent objects and typed Sensor/Gateway profiles.

External production systems remain separately gated by contracts, credentials, permissions and UAT.
