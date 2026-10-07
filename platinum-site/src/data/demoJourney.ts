export const demoProduct = {
  name: "Premium Halal food product",
  batch: "Current production batch",
  origin: "China",
  destination: "GCC",
  shipment: "Current China → GCC shipment",
};

export type DemoJourneyStage = [string, string, string, string, string];

export const demoJourneyStages: DemoJourneyStage[] = [
  ["Origin & producer", "Establish producer identity, source location and accountable ownership before materials enter the controlled chain.", "Producer / source owner", "Origin record, producer identity, source relationship and material provenance", "Organisation registration and controlled receiving"],
  ["Organisation & KYC", "Register the manufacturer, authorised representatives, licences, jurisdiction and operating scope.", "Manufacturer authorised representative", "Organisation profile, KYC, authorised users, licences and jurisdiction", "Facility and production-line registration"],
  ["Facility & production line", "Register facilities, lines, process scope, equipment and relevant operating controls.", "Manufacturer quality / Halal team", "Facility profile, line scope, process map, equipment and training records", "Product and SKU registration"],
  ["Product & SKU", "Create product, SKU, formulation, packaging, destination scope and controlled change relationships.", "Product owner", "Product identity, SKU, formulation/BOM, packaging and destination scope", "Supplier and material graph"],
  ["Supplier & materials", "Connect ingredients and raw materials to approved suppliers, origin, lots, certificates and supporting evidence.", "Procurement / assurance team", "Supplier graph, ingredient/raw-material links, lot provenance and current evidence", "Standards applicability and evidence readiness"],
  ["Standards & applicability", "Resolve the complete applicable Malaysian/JAKIM framework and destination requirements for the actual product, process and market.", "Assurance team", "Applicable instruments, controls, HCP/SCCP and evidence obligations", "Laboratory and audit requirements"],
  ["Laboratory evidence", "Bind sample identity, seal, custody, method, QC, technical review and signed report to the exact product and batch.", "Laboratory operator / reviewer", "Sample identity, custody, method/QC context, reviewed result and signed report", "Smart audit and assurance review"],
  ["Smart audit & CAPA", "Guide the human auditor through scoped controls, capture attributable evidence, record findings and close corrective action through re-verification.", "Assigned human auditor", "Audit scope, observations, media, findings, CAPA, re-verification and signed session", "Authority workflow"],
  ["Authority workflow", "Present the complete evidence context through the authority-connectivity path while preserving the independently owned authority decision.", "Authorised competent authority", "Evidence dossier, submission reference and authority-owned status", "Controlled production"],
  ["Controlled production", "Bind approved inputs, line status, cleaning, operator competence, process events and batch genealogy during production.", "Manufacturer production / quality", "Material consumption, process events, cleaning evidence, line and batch links", "Origin warehouse"],
  ["Origin warehouse", "Receive, segregate, store, inspect, pick and prepare finished goods for dispatch.", "Warehouse operator", "Receiving, zone, segregation, condition, pallet/package and dispatch records", "Sinotrans logistics"],
  ["Sinotrans logistics", "Assign vehicle, container and seal; record loading, custody transfer, GNSS, door and condition events.", "Sinotrans / logistics operator", "Vehicle/container/seal identity, route, telemetry, handover and exception records", "Origin port and customs"],
  ["Origin port & customs", "Reconcile shipment identity, authorised documents, container/seal and inspection events before export handoff.", "Origin port / customs authority", "Manifest, document checks, inspection, seal condition and authority response", "International transit"],
  ["International transit", "Maintain custody, route, seal and environmental continuity while exceptions are monitored across the corridor.", "Carrier / Command Center", "Transit milestones, route, condition, custody and exception events", "GCC port and customs"],
  ["GCC port & customs", "Resolve pre-arrival data, inspections, holds and the competent authority-owned import outcome.", "Destination authority", "Arrival, inspection, authority response, hold/release reference and custody transfer", "GCC importer receiving"],
  ["GCC importer", "Verify product/SKU/batch, container/seal, condition, documents and authority status; accept, record discrepancy or quarantine.", "Importer receiving team", "Receiving inspection, discrepancy, quarantine/acceptance, claims and warehouse placement", "Destination warehouse"],
  ["Destination warehouse", "Create inventory lots, preserve condition and segregation, and determine onward distribution eligibility.", "Destination warehouse / 3PL", "Inventory lot, location, condition, custody and distribution-eligibility records", "Distributor / 3PL"],
  ["Distributor / 3PL", "Allocate stock, apply FEFO/FIFO as appropriate, record route and custody transfer, and confirm proof of delivery.", "Distributor operator", "Allocation, transfer order, route, custody handoff, delivery and withdrawal records", "Retail / marketplace receiving"],
  ["Retail / marketplace", "Check listing eligibility, receive SKU/batch, manage inventory/shelf or fulfilment status, and propagate withdrawals or recalls.", "Retail / marketplace team", "Listing state, receiving scan, inventory, expiry, sale status and recall records", "Buyer / consumer verification"],
  ["Consumer verification & continuous assurance", "Present approved product identity, authority, validity, provenance and selected custody information while the Command Center remains ready to trace exceptions and recall scope.", "Issuer / buyer / consumer / Command Center", "Purpose-bound disclosure, verification event, alert lineage and recall links", "Continuous assurance and post-market response"],
];

export type DemoVerificationRecord = {
  token: string;
  product: string;
  batch: string;
  events: Array<[string, string]>;
  stages: string[];
};

const sharedEvents: Array<[string, string]> = [
  ["01 / Identity", "China-origin product identity, manufacturer and product scope are connected."],
  ["02 / Assurance", "Standards applicability, laboratory evidence and human audit remain linked to the same product."],
  ["03 / Custody", "Warehouse, seal, route, condition and China-to-GCC handoffs remain connected."],
  ["04 / Market verification", "Approved product and provenance information is presented for the intended verification audience."],
];

const sharedStages = [
  "Product identity and China origin connected",
  "Assurance evidence assembled",
  "Custody and condition events recorded",
  "GCC market verification prepared",
];

export const demoVerificationRecords: DemoVerificationRecord[] = [
  { token: "GHSC-MY-2026-8891", product: demoProduct.name, batch: demoProduct.batch, events: sharedEvents, stages: sharedStages },
  { token: "JAKIM-AMANAH-0921", product: demoProduct.name, batch: demoProduct.batch, events: sharedEvents, stages: sharedStages },
  { token: "HK-GHSC-2026-1188", product: demoProduct.name, batch: demoProduct.batch, events: sharedEvents, stages: sharedStages },
];
