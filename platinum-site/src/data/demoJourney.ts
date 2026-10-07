export const demoProduct = {
  name: "China-origin Halal product",
  batch: "Current production batch",
  origin: "China",
  destination: "GCC",
  shipment: "China → GCC shipment",
};

export type DemoJourneyStage = [string, string, string, string, string];

export const demoJourneyStages: DemoJourneyStage[] = [
  ["Manufacturer onboarding","Register the organisation, KYC, authorised representatives and market scope.","Manufacturer","Organisation profile, KYC, roles and readiness","Facility and production scope"],
  ["Facility & production line","Register facilities, production lines, controlled areas and accountable operating owners.","Manufacturer quality / Halal team","Facility profile, line identity, licences, training and control ownership","Product and SKU setup"],
  ["Product & SKU","Define product, SKU, formulation/BOM, packaging, intended markets and change-control baseline.","Product / quality team","Product master, SKU, formulation/BOM, packaging and destination scope","Supplier and raw-material graph"],
  ["Suppliers & raw materials","Map ingredient, raw material, supplier, supplier facility/origin and supporting credentials.","Procurement / assurance","Supplier graph, origin, material lots, credentials and change history","Standards applicability"],
  ["Standards & applicability","Resolve the complete applicable Malaysian/JAKIM framework and destination requirements by scope.","Assurance team","Applicable instruments, requirements, controls, HCP/SCCP and source references","Evidence readiness"],
  ["Documents & evidence","Bind supporting records to the exact object, actor, event and control.","Assurance team","Documents, attestations, timestamps, signatures and integrity references","Laboratory and audit"],
  ["Laboratory evidence","Create sample identity, preserve seal/custody, execute method/QC and complete technical review.","Laboratory","Sample identity, custody, method, QC, result, review and signed report","Smart audit and control assessment"],
  ["Smart audit","Guide the human auditor through applicable controls using smart glasses/tablet and contextual assistance.","Assigned human auditor","Observations, media, notes, object IDs, control references and signature","Findings / CAPA"],
  ["Findings & CAPA","Classify findings, assign actions, attach corrective evidence and re-verify affected controls.","Manufacturer + auditor","Finding, owner, due date, corrective evidence and re-verification","Authority workflow"],
  ["Authority workflow","Present the complete evidence dossier through the authorised authority-connectivity path.","Competent authority","Evidence/status exchange and independently owned authority decision","Controlled production"],
  ["Production & digital twin","Bind approved inputs, batch genealogy, cleaning, training, line state and monitored process events.","Production / quality","Batch, material consumption, line events, sanitation and digital-twin state","Origin warehouse"],
  ["Origin warehouse","Receive, segregate, store, pick and prepare the batch for controlled dispatch.","Warehouse operator","Pallet/package IDs, zone, condition, segregation and loading record","Sinotrans custody"],
  ["Sinotrans logistics","Assign vehicle/container/seal and capture custody, GNSS, door and condition events.","Sinotrans operations","Vehicle, driver, container, seal, route, telemetry and custody events","Origin port / customs"],
  ["Origin port & customs","Reconcile shipment identity, documentation, inspection and sovereign release status.","Origin port / customs","Pre-arrival data, inspection, customs status and release reference","International transit"],
  ["International transit","Monitor route, condition, seal and custody continuity across the international leg.","Carrier / Command Center","Transit milestones, telemetry, custody and exception evidence","GCC port / customs"],
  ["GCC port & customs","Process destination pre-arrival, inspections, holds and sovereign release.","Destination authority / customs","Arrival, inspection, customs/authority status and release reference","GCC importer"],
  ["GCC importer","Verify scope, reconcile container/seal/condition and accept, quarantine or reject receiving.","Importer","Receiving inspection, discrepancy, quarantine/acceptance and warehouse placement","Distributor / 3PL"],
  ["Distributor & 3PL","Manage inventory lots, FEFO/FIFO as applicable, allocation, route and custody transfer.","Distributor / 3PL","Inventory lot, allocation, route, proof of delivery and withdrawal state","Retail / marketplace"],
  ["Retail / marketplace","Check listing eligibility, receiving, shelf/fulfilment status, verification and withdrawal/recall.","Retailer / marketplace","Listing state, receiving scan, inventory/shelf state and verification event","Consumer / buyer verification"],
  ["Consumer verification & continuous assurance","Expose approved verification fields while the 24/7 Command Center monitors exceptions, recalls and blast radius.","Consumer / buyer + GHSCL operations","Approved disclosure, current verification state, alerts, CAPA and recall propagation","Continuous monitoring and market feedback"]
];

export type DemoVerificationRecord = {
  token: string;
  label: string;
  product: string;
  detail: string;
  events: Array<[string, string]>;
};

const productEvents: Array<[string, string]> = [
  ["Product identity","Manufacturer, product/SKU and current credential state are shown within the approved disclosure scope."],
  ["Provenance summary","Selected supplier/origin and production context is presented without exposing confidential factory data."],
  ["Current verification","The latest approved verification state is shown with validity and issuing-authority context."]
];

const batchEvents: Array<[string, string]> = [
  ["Batch lineage","The selected batch is linked to product, production and applicable evidence."],
  ["Assurance evidence","Relevant laboratory, audit and corrective-action context is presented within disclosure permissions."],
  ["Custody summary","Selected warehouse/logistics handoffs are shown where authorised."]
];

const shipmentEvents: Array<[string, string]> = [
  ["Shipment identity","Product/SKU/batch scope is tied to the relevant shipment context."],
  ["Custody continuity","Selected container/seal, receiving and handoff information is shown."],
  ["Destination state","Importer/market verification and any active withdrawal/recall state is reflected."]
];

export const demoVerificationRecords: DemoVerificationRecord[] = [
  { token:"PRODUCT", label:"Product view", product:demoProduct.name, detail:"Approved product-level disclosure", events:productEvents },
  { token:"BATCH", label:"Batch view", product:demoProduct.name, detail:"Approved batch-level disclosure", events:batchEvents },
  { token:"SHIPMENT", label:"Shipment view", product:demoProduct.name, detail:"Approved shipment-level disclosure", events:shipmentEvents }
];
