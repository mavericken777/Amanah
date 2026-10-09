export type ProcessKind = "corridor" | "onboarding" | "materials" | "facility" | "laboratory" | "audit" | "warehouse" | "transport" | "port" | "market" | "authority" | "verification" | "monitoring";

export const inferKind = (label: string): ProcessKind => {
  const value = label.toLowerCase();
  if (/real product journey|full (?:china to gcc )?journey|complete corridor/.test(value)) return "corridor";
  if (/command.center|monitor|predict|exception|risk|incident|response/.test(value)) return "monitoring";
  if (/lab|sample|method|qc|science/.test(value)) return "laboratory";
  if (/audit|capa|inspection|finding/.test(value)) return "audit";
  if (/warehouse|storage|segregation|inventory/.test(value)) return "warehouse";
  if (/sinotrans|logistic|custody|transit|carrier|vehicle/.test(value)) return "transport";
  if (/port|custom|border|export|import|arrival/.test(value)) return "port";
  if (/gcc|market|retail|distribut|consumer/.test(value)) return /consumer|verify|disclosure/.test(value) ? "verification" : "market";
  if (/authority|jakim|standard|requirement|certification/.test(value)) return "authority";
  if (/verify|disclosure|passport/.test(value)) return "verification";
  if (/organisation|organization|onboarding|kyc|representative|licence|license/.test(value)) return "onboarding";
  if (/supplier|ingredient|material|sku|formula|batch/.test(value)) return "materials";
  if (/facility|production|manufactur|product|sku|supplier|origin|producer/.test(value)) return "facility";
  return "corridor";
};

export const sceneImage = (kind: ProcessKind): string => ({
  corridor: "journey-panorama.webp",
  onboarding: "scene-onboarding.webp",
  materials: "scene-onboarding.webp",
  facility: "scene-origin.webp",
  laboratory: "scene-lab.webp",
  audit: "scene-assurance.webp",
  warehouse: "scene-warehouse.webp",
  transport: "scene-logistics.webp",
  port: "scene-logistics.webp",
  market: "scene-market.webp",
  authority: "scene-assurance.webp",
  verification: "scene-market.webp",
  monitoring: "scene-command-center.webp",
})[kind];

export function sceneAssetUrl(kind: ProcessKind): string {
  const path = typeof window === "undefined" ? "" : window.location.pathname;
  const match = path.match(/^(.*?\/Amanah)(?:\/|$)/i);
  return `${match ? match[1] : ""}/assets/${sceneImage(kind)}`;
}
