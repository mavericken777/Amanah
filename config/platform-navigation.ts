import type { NavigationGroups } from "@/lib/navigation";

export const platformNavigation: NavigationGroups = [
  ["Workspace", [["/dashboard", "Overview"], ["/projects", "Projects"], ["/tasks", "Tasks"], ["/meetings", "Meetings"], ["/documents", "Documents"], ["/decisions", "Decisions"], ["/risks", "Risks"], ["/finance", "Finance"], ["/updates", "Updates"], ["/approvals", "Approvals"], ["/workflows", "Workflows"], ["/notifications", "Notifications"], ["/search", "Search"], ["/audit", "Audit"], ["/settings", "Settings"]]],
  ["AMANAH lifecycle", [["/onboarding", "Manufacturer onboarding"], ["/ahte/operations", "Facility / product"], ["/ahte/laboratory", "Laboratory"], ["/ahte/controls", "Audit / CAPA"], ["/ahte/monitoring", "Production monitoring"], ["/ahte/shipments", "Trade / custody"], ["/ahte/manufacturer-command-center", "Manufacturer command center"], ["/ahte/command-center", "24/7 command center"], ["/ahte/packets", "Trust packets"], ["/ahte/trust", "Trust state"], ["/ahte/governance", "Human governance"]]],
  ["AHTE source & authority", [["/ahte", "Control plane"], ["/ahte/source", "Source & authority"], ["/ahte/hitm", "Human decisions"], ["/ahte/shariah-finance", "Shariah finance / Takaful"]]],
  ["Modules", [["/china-trip", "China trip"], ["/admin", "Workspace members"]]],
] as const;
