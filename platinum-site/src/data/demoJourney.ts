export const demoProduct = {
  name: "Premium Halal food product",
  batch: "CN-DEMO-24001",
  origin: "China",
  destination: "GCC",
  shipment: "DEMO-SHIPMENT-001",
};

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
