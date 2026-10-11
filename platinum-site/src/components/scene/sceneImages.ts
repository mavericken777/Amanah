export type ProcessKind = "corridor" | "onboarding" | "materials" | "facility" | "laboratory" | "audit" | "warehouse" | "transport" | "port" | "market" | "authority" | "verification" | "monitoring";

export const inferKind = (label: string): ProcessKind => {
  const value = label.toLowerCase();
  if (/real product journey|full (?:china to gcc )?journey|complete corridor/.test(value)) return "corridor";
  if (/command.center|monitor|predict|exception|risk|incident|response/.test(value)) return "monitoring";
  if (/lab|sample|method|qc|science/.test(value)) return "laboratory";
  if (/audit|capa|inspection|finding/.test(value)) return "audit";
  if (/warehouse|storage|segregation|inventory/.test(value)) return "warehouse";
  if (/sinotrans|logistic|custody|transit|carrier|vehicle/.test(value)) return "transport";
  if (/\b(?:port|customs?|border|export|import|arrival)\b/.test(value)) return "port";
  if (/gcc|market|retail|distribut|consumer/.test(value)) return /consumer|verify|disclosure/.test(value) ? "verification" : "market";
  if (/authority|jakim|standard|requirement|certification/.test(value)) return "authority";
  if (/verify|disclosure|passport/.test(value)) return "verification";
  if (/organisation|organization|onboarding|kyc|representative|licence|license/.test(value)) return "onboarding";
  if (/supplier|ingredient|material|sku|formula|batch/.test(value)) return "materials";
  if (/facility|production|manufactur|product|sku|supplier|origin|producer/.test(value)) return "facility";
  return "corridor";
};

export const sceneImage = (kind: ProcessKind): string => ({
  corridor: "journey-panorama.avif",
  onboarding: "scene-onboarding.avif",
  materials: "scene-materials.avif",
  facility: "scene-origin.avif",
  laboratory: "scene-lab.avif",
  audit: "scene-assurance.avif",
  warehouse: "scene-warehouse.avif",
  transport: "scene-logistics.avif",
  port: "scene-port.avif",
  market: "scene-market.avif",
  authority: "scene-authority.avif",
  verification: "scene-consumer.avif",
  monitoring: "scene-command-center.avif",
})[kind];

export function sceneAssetUrl(kind: ProcessKind, pathname = typeof window === "undefined" ? "/" : window.location.pathname): string {
  const match = pathname.match(/^(.*?\/(?:Amanah|trust-journey))(?:\/|$)/i);
  return `${match ? match[1] : ""}/assets/${sceneImage(kind)}`;
}

// One photograph per operating stage; the overview remains a separate scene.
export const cinematicStageImages = [
  'scene-origin.avif','scene-assurance.avif','scene-lab.avif','scene-authority.avif',
  'scene-warehouse.avif','scene-logistics.avif','scene-export.avif','scene-transit.avif',
  'scene-port.avif','scene-command-center.avif','scene-market.avif','scene-consumer.avif',
] as const;

// Dedicated journey imagery avoids repeating the photographs in the chapters below.
export const journeySceneImage = (kind:ProcessKind):string => ({
  corridor:'scene-export.avif',onboarding:'scene-onboarding.avif',materials:'scene-materials.avif',
  facility:'scene-origin.avif',laboratory:'scene-journey-lab.avif',audit:'scene-journey-audit.avif',
  warehouse:'scene-journey-warehouse.avif',transport:'scene-journey-logistics.avif',port:'scene-export.avif',
  market:'scene-journey-market.avif',authority:'scene-authority.avif',verification:'scene-journey-consumer.avif',
  monitoring:'scene-authority.avif',
})[kind];
