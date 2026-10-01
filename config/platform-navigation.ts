import type { NavigationGroups } from "@/lib/navigation";

export const platformNavigation: NavigationGroups = [
  ["Workspace", [["/dashboard", "Overview"], ["/projects", "Projects"], ["/tasks", "Tasks"], ["/meetings", "Meetings"], ["/documents", "Documents"], ["/decisions", "Decisions"], ["/risks", "Risks"], ["/finance", "Finance"], ["/updates", "Updates"], ["/approvals", "Approvals"], ["/workflows", "Workflows"], ["/notifications", "Notifications"], ["/search", "Search"], ["/audit", "Audit"], ["/settings", "Settings"]]],
  ["Trust infrastructure", [["/ahte", "Control plane"], ["/ahte/source", "Source & authority"], ["/ahte/controls", "Controls & audit"], ["/ahte/hitm", "Human decisions"], ["/ahte/trust", "Trust state"], ["/ahte/shipments", "Trade & custody"], ["/ahte/packets", "Trust packets"], ["/ahte/governance", "Governance"], ["/ahte/operations", "Operations"], ["/ahte/laboratory", "Laboratory"], ["/ahte/monitoring", "Platinum monitoring"], ["/ahte/command-center", "24/7 command center"], ["/ahte/shariah-finance", "Shariah finance / Takaful"]]],
  ["Modules", [["/china-trip", "China trip"], ["/admin", "Workspace members"]]],
] as const;
