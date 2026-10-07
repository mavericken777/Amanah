export const demoProduct = {
  name: "Premium Halal food product",
  batch: "Current product batch",
  origin: "China",
  destination: "GCC",
  shipment: "Current shipment",
};

export type DemoJourneyStage = [string, string, string, string, string];

export const demoJourneyStages: DemoJourneyStage[] = [
  ["Origin & producer", "Establish the producer, source location and accountable organisation before materials enter the controlled chain.", "Producer / source owner", "Origin record, producer identity, source relationship and material provenance", "Known source → organisation onboarding"],
  ["Organisation & KYC", "Register the manufacturer, authorised representatives, licences, jurisdiction and accountable users.", "Manufacturer authorised representative", "Organisation profile, KYC, authorised users and licences", "Verified organisation → facility setup"],
  ["Facility & production line", "Register the facility, production line, process scope, equipment and operating controls.", "Manufacturer quality / Halal team", "Facility profile, line scope, process map, equipment and training records", "Controlled facility → product registration"],
  ["Product & SKU", "Create product, SKU, formulation, packaging, destination and change-control relationships.", "Product owner", "Product record, SKU, formulation/BOM, packaging and market scope", "Stable product identity → supplier/material mapping"],
  ["Supplier & materials", "Connect ingredients and raw materials to approved suppliers, origin, lots, certificates and supporting evidence.", "Procurement / assurance team", "Supplier graph, ingredient/raw-material links, lot provenance and current evidence", "Approved material graph → applicability assessment"],
  ["Standards & controls", "Resolve the complete applicable Malaysian/JAKIM framework and destination requirements for the actual product, process and market.", "Assurance team", "Applicable instruments, requirements, controls, HCP/SCCP and evidence obligations", "Applicable controls → laboratory and audit evidence"],
  ["Laboratory evidence", "Bind sample identity, seal, chain of custody, method, QC, technical review and signed report to the product and batch.", "Laboratory operator / reviewer", "Sample record, custody, method/QC context, reviewed result and signed report", "Reviewed scientific evidence → assurance case"],
  ["Smart audit & CAPA", "Guide the assigned auditor through scoped controls, capture attributable evidence, record findings and close CAPA through re-verification.", "Assigned human auditor", "Audit scope, observations, media, findings, corrective action, re-verification and signed session", "Human assessment → authority workflow"],
  ["Authority workflow", "Present the complete evidence context through the authority-connectivity path while preserving the independently owned authority decision.", "Authorised competent authority", "Evidence dossier, submission reference and authority-owned status", "Authority state → operational readiness"],
  ["Controlled production", "Bind approved inputs, line status, cleaning, operator competence, process events and batch genealogy during production.", "Manufacturer production / quality", "Material consumption, process events, cleaning evidence, line and batch links", "Batch genealogy → warehouse receiving"],
  ["Origin warehouse", "Receive, segregate, store, inspect, pick and prepare the finished batch for dispatch.", "Warehouse operator", "Receiving, zone, segregation, storage condition, pallet/package and dispatch records", "Warehouse readiness → logistics pickup"],
  ["Sinotrans logistics", "Assign vehicle, container and seal; record loading, custody transfer, GNSS, door and condition events.", "Sinotrans / logistics operator", "Vehicle/container/seal identity, route, telemetry, handover and exception records", "Transport custody → origin port"],
  ["Origin port & customs", "Reconcile shipment identity, authorised documents, container/seal and inspection events before export handoff.", "Origin port / customs authority", "Manifest, document checks, inspection, seal condition and authority response", "Sovereign export decision → international transit"],
  ["International transit", "Maintain custody, route, seal and environmental continuity while exceptions are monitored across the corridor.", "Carrier / Command Center", "Transit milestones, route, condition, custody and exception events", "Transit continuity → GCC port"],
  ["GCC port & customs", "Resolve pre-arrival data, inspections, holds and the competent authority-owned import outcome.", "Destination authority", "Arrival, inspection, authority response, hold/release reference and custody transfer", "Sovereign import outcome → importer receiving"],
  ["GCC importer", "Verify product/SKU/batch, container/seal, condition, documents and authority status; accept, record discrepancy or quarantine.", "Importer receiving team", "Receiving inspection, discrepancy, quarantine/acceptance, claims and warehouse placement", "Importer acceptance → destination inventory"],
  ["Destination warehouse", "Create inventory lots, preserve condition and segregation, and determine onward distribution eligibility.", "Warehouse / 3PL", "Inventory lot, location, condition, custody and eligibility records", "Eligible inventory → distributor allocation"],
  ["Distributor / 3PL", "Allocate stock, apply FEFO/FIFO as appropriate, record route and vehicle custody, and confirm proof of delivery.", "Distributor operator", "Allocation, transfer order, route, custody handoff, delivery and withdrawal records", "Distributor handoff → retail receiving"],
  ["Retail / marketplace", "Check listing eligibility, receive SKU/batch, manage inventory/shelf or fulfilment status, and propagate withdrawals or recalls.", "Retail receiving / marketplace team", "Listing state, receiving scan, inventory, expiry, sale status and recall records", "Retail state → buyer verification"],
  ["Consumer verification & response", "Present approved identity, issuing authority, validity, provenance summary and selected custody confirmation; propagate post-market exceptions and recall when required.", "Issuer, authorised buyer and responsible operator", "Purpose-bound disclosure, current verification state, event history and recall links", "Post-market signal → continuous assurance"],
];

export type DemoVerificationRecord = {
  token: string;
  label: string;
  product: string;
  batch: string;
  detail: string;
  events: Array<[string, string]>;
  stages: string[];
};

const sharedEvents: Array<[string, string]> = [
  ["01 / Product identity", "China-origin product identity, source and batch are linked."],
  ["02 / Assurance evidence", "Laboratory and audit evidence are associated with the same product and production context."],
  ["03 / Custody", "Warehouse, seal, condition and China-to-GCC handoffs remain connected."],
  ["04 / Market verification", "Approved disclosure presents the relevant product journey and current verification state."],
];

const sharedStages = [
  "Product identity and China origin linked",
  "Laboratory and audit evidence assembled",
  "Warehouse, seal and condition events recorded",
  "GCC market verification available",
];

export const demoVerificationRecords: DemoVerificationRecord[] = [
  { token: "AMANAH-PRODUCT", label: "Product provenance", product: demoProduct.name, batch: demoProduct.batch, detail: "Approved product-level disclosure", events: sharedEvents, stages: sharedStages },
  { token: "AMANAH-CUSTODY", label: "Custody history", product: demoProduct.name, batch: demoProduct.batch, detail: "Approved custody and handoff summary", events: sharedEvents, stages: sharedStages },
  { token: "AMANAH-STATUS", label: "Verification status", product: demoProduct.name, batch: demoProduct.batch, detail: "Current approved verification state", events: sharedEvents, stages: sharedStages },
];
