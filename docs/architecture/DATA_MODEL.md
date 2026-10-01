# AMANAH / Global Halal Digital Trust - Canonical Data Model

**Version:** 2.0.0 | **Control date:** 2026-10-02 | **Status:** CONTROLLING DOMAIN MODEL

## 1. Tenant hierarchy
`Organisation -> Users -> Roles -> Projects / Domain Records`
Every organization-owned domain record carries `organization_id` and is protected by RLS. Authority privilege is not inferred from generic workspace role.

## 2. Canonical entities
| Entity | Canonical store | Relationships |
|---|---|---|
| Organisation | organizations | root tenant |
| User | auth.users + profiles | memberships/person roles |
| Role | organization_members + ahte_person_roles | scope/mandate/facility |
| Manufacturer | partner + organisation identity | facility/product owner |
| Facility | ahte_facilities | lines/zones/batches/audits |
| ProductionLine | ahte_production_lines | facility/products/batches |
| Product | ahte_products | versions/SKUs/certificates/batches |
| SKU | ahte_skus | product/package/verification |
| Supplier | ahte_suppliers | materials/evidence |
| Ingredient/RawMaterial | ahte_materials typed by material_role | supplier/lot/formula |
| Certificate | ahte_certificates | authority/scope/product |
| CertificationScope | ahte_certification_scopes | certificate/product/facility |
| Standard/Instrument | ahte_instruments + mappings | requirements |
| Requirement | ahte_requirements | applicability/control |
| Control | ahte_controls | HCP/SCCP/evidence |
| Evidence | ahte_evidence | control/object refs |
| Document | documents | source metadata |
| Laboratory | ahte_laboratories | samples/results |
| Sample | ahte_lab_samples | laboratory/batch/custody |
| TestResult | ahte_lab_results | sample/method/report |
| Auditor | user + competency/role | audit |
| Audit | ahte_audits | facility/observations |
| Finding | ahte_findings | evidence/CAPA |
| CorrectiveAction | ahte_corrective_actions | finding/reverification |
| Device | ahte_devices | telemetry/sensor/gateway |
| Sensor | ahte_sensors | device profile |
| Gateway | ahte_gateways | device profile |
| Vehicle | ahte_vehicles | route/shipment |
| Driver | ahte_drivers | vehicle/shipment |
| Warehouse | ahte_warehouses | facility/pallet/package |
| Batch | ahte_batches | product/version/facility |
| Lot | ahte_material_lots | material/evidence |
| Pallet | ahte_pallets | batch/package |
| Package | ahte_packages | SKU/batch/parent |
| Shipment | ahte_shipments | items/custody/port |
| Container | ahte_containers | shipment/seal |
| Seal | ahte_seals | container/opening |
| CustodyEvent | ahte_custody_events | object/evidence/actor |
| RouteEvent | ahte_route_events | shipment/vehicle/geofence |
| PortEvent | ahte_port_custody_events | shipment/authority ref |
| AuthorityDecision | ahte_authority_decisions | authority gate |
| Exception | ahte_fracture_events + findings | hold/CAPA |
| Alert | ahte_command_center_alerts | prediction/strategy |
| VerificationEvent | ahte_verification_events | public/buyer/authority |

## 3. Required envelope
Material event/evidence objects support canonical ID, external IDs, owner, actor, lifecycle/status, timestamps, evidence refs, integrity/signature refs, version/supersession, jurisdiction/confidentiality and audit history.

## 4. Genealogy
`Manufacturer -> Facility -> ProductionLine -> Product -> SKU -> Batch -> Package -> Pallet -> Container -> Shipment -> Custody/Route -> Port -> Destination -> Verification`

Material provenance:
`Product/SKU -> FormulaMaterial -> Material(role) -> Supplier -> MaterialLot -> Certificate/Evidence`

## 5. Change control
Ingredient, supplier, origin, facility, production line, formulation, packaging, certificate or applicable regulatory changes create auditable change events and may trigger reassessment/reverification according to the applicable rule pack.

## 6. Authority separation
`ahte_authority_decisions` stores external decisions; `ahte_authority_gates` evaluates prerequisite gates; `ahte_release_decisions` represents operational release. They remain distinct.

## 7. Security contract
New normalized tables use member SELECT/INSERT/UPDATE and owner/admin DELETE unless append-only semantics are stricter. Authority-sensitive operations remain role checked server/database side. Client-supplied organization ID is not trusted as sole authorization.

## 8. Semantic authority
Machine-readable entity catalogue: `config/canonical-domain-model-2026-10-02.json`. Generated TypeScript types are derivatives of the live database schema.
