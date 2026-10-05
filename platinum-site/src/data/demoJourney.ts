export const demoProduct = {
  name: "Premium Halal food product",
  batch: "CN-DEMO-24001",
  origin: "China",
  destination: "GCC",
  shipment: "DEMO-SHIPMENT-001",
};

export type DemoJourneyStage = [string, string, string, string, string];

export const demoJourneyStages: DemoJourneyStage[] = [
  ["Source & suppliers", "Map farms, raw materials, supplier identity, origin documents and approved source relationships before the product enters a controlled factory.", "Supplier and manufacturer", "Source identity, supplier documents, material lot and custody events", "Qualified source record → receiving and formulation"],
  ["Factory & product setup", "Register the entity, facility, production line, SKU, ingredients, packaging and process scope. Map applicable requirements to each product and market.", "Manufacturer quality / Halal team", "Facility and line profile, product formula, supplier links, control plan and training", "Applicable controls → sampling and audit"],
  ["Laboratory evidence", "Register a sealed, identified sample against the exact product and batch; record collection, custody, method, QC, review and signed result.", "Laboratory operator for the applicable market", "Sample ID, seal, custody, method and QC record, signed report and evidence link", "Reviewed scientific evidence → audit and product control"],
  ["Smart-glasses audit", "Guide an auditor through the scoped checklist in the factory. AI can surface relevant controls and flag gaps; the auditor observes, assesses and signs.", "Assigned human auditor", "Control reference, actor, timestamp, object, observation, photo or document evidence, signature", "Verified audit evidence → findings or scope recommendation"],
  ["Controlled production", "Bind approved inputs, line status, cleaning and sertu records where applicable, operator training, production run and lot genealogy.", "Manufacturer production / quality", "Material consumption, process events, cleaning evidence, line and batch links", "Batch genealogy → finished-goods release review"],
  ["Manufacturer warehouse", "Prepare dispatch by lot, pallet and package. Confirm identity, segregation, status, seal, loading and accountable handover.", "Manufacturer warehouse and carrier", "Pick / pack, pallet IDs, segregation, seal, vehicle, handover actor and time", "Custody transfer → Sinotrans receiving"],
  ["Sinotrans warehouse", "Receive, scan, assign storage location and monitor the shipment under the configured Halal logistics control plan.", "Sinotrans warehouse operator", "Inbound condition, location, segregation, cleaning, temperature, access and outbound events", "Warehouse custody → transport planning"],
  ["China → GCC transport", "Bind vehicle, container and seal; capture location and condition events; raise exceptions and hold affected scope for accountable review.", "Sinotrans transport operations", "Vehicle / container / seal identity, route, telemetry, handovers and exception actions", "In-transit custody → origin port"],
  ["Origin port & export", "Present the shipment and authorised records to origin-port and export processes. Record document checks, physical inspection, seal condition and the port or customs response before export handoff.", "Origin port, customs and exporter", "Manifest references, seal check, inspection events, authority responses and release evidence", "Authorised export handoff → GCC port"],
  ["GCC port & import", "Resolve the authorised disclosure, process destination inspections, holds and import steps, then capture the authority-owned outcome.", "GCC port, customs and importer", "Arrival, custody, inspection, import documents, holds and official release record", "Sovereign import outcome → destination receiving"],
  ["GCC receiving & distribution", "Reconcile received lots, condition and seals; place stock into controlled storage; preserve custody across distributors and retailers.", "Importer, distributor and retailer", "Receipt reconciliation, storage location, onward dispatch and discrepancy records", "Verified receiving record → buyer or retail disclosure"],
  ["Consumer verification & response", "Let a buyer scan an issuer-authorised QR disclosure. If evidence changes, trace affected lots, notify accountable operators and coordinate recall action.", "Issuer, authorised buyer and responsible operator", "Purpose-bound disclosure, current trust state, event history and recall links", "Post-market signal → investigation and corrective action"],
];;

export type DemoVerificationRecord = {
  token: string;
  product: string;
  batch: string;
  events: Array<[string, string]>;
  stages: string[];
};

const sharedEvents: Array<[string, string]> = [
  ["01 / Identity", "China-origin product identity, source and batch CN-DEMO-24001 are linked."],
  ["02 / Audit & laboratory", "Audit observations and reviewed scientific evidence are associated with the same product batch."],
  ["03 / Cold-chain custody", "Warehouse, seal, temperature and China-to-GCC shipment handoffs are recorded for the same batch."],
  ["04 / Consumer view", "The issuer-authorised passport presents this product journey and its relevant evidence."],
];

const sharedStages = [
  "Product identity and China origin linked",
  "Audit and laboratory evidence assembled",
  "Warehouse, seal and temperature events recorded",
  "GCC consumer passport prepared",
];

export const demoVerificationRecords: DemoVerificationRecord[] = [
  { token: "GHSC-MY-2026-8891", product: demoProduct.name, batch: demoProduct.batch, events: sharedEvents, stages: sharedStages },
  { token: "JAKIM-AMANAH-0921", product: demoProduct.name, batch: demoProduct.batch, events: sharedEvents, stages: sharedStages },
  { token: "HK-GHSC-2026-1188", product: demoProduct.name, batch: demoProduct.batch, events: sharedEvents, stages: sharedStages },
];
