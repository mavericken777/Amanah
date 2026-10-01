"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoutButton } from "@/components/logout-button";

const groups: ReadonlyArray<readonly [string, ReadonlyArray<readonly [string, string]>]> = [
  ["Workspace", [["/dashboard", "Overview"], ["/projects", "Projects"], ["/tasks", "Tasks"], ["/meetings", "Meetings"], ["/documents", "Documents"], ["/decisions", "Decisions"], ["/risks", "Risks"], ["/finance", "Finance"], ["/updates", "Updates"], ["/approvals", "Approvals"], ["/workflows", "Workflows"], ["/notifications", "Notifications"], ["/search", "Search"], ["/audit", "Audit"], ["/settings", "Settings"]]],
  ["Trust infrastructure", [["/ahte", "Control plane"], ["/ahte/source", "Source & authority"], ["/ahte/controls", "Controls & audit"], ["/ahte/hitm", "Human decisions"], ["/ahte/trust", "Trust state"], ["/ahte/shipments", "Trade & custody"], ["/ahte/packets", "Trust packets"], ["/ahte/governance", "Governance"], ["/ahte/operations", "Operations"], ["/ahte/laboratory", "Laboratory"], ["/ahte/monitoring", "Platinum monitoring"], ["/ahte/command-center", "24/7 command center"], ["/ahte/shariah-finance", "Shariah finance / Takaful"]]],
  ["Modules", [["/china-trip", "China trip"], ["/admin", "Workspace members"]]],
] as const;

export function PlatformShell({ name, children }: { name: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = mobileMenu.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
    const previous = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  function closeMenu() { setOpen(false); menuButton.current?.focus(); }
  const current = groups.flatMap(([, links]) => links).find(([href]) => href === pathname)?.[1] ?? "Workspace";
  function navigation() {
    return <nav className="nav" aria-label="Platform navigation">{groups.map(([label, links]) => <div className="nav-group" key={label}><div className="nav-group-label">{label}</div>{links.map(([href, title]) => <Link href={href} key={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}><span>{title}</span><span aria-hidden="true" className="nav-arrow">↗</span></Link>)}</div>)}</nav>;
  }
  return <div className="app-shell">
    <a className="skip-link" href="#workspace-main">Skip to workspace</a>
    <aside className="sidebar"><Link href="/dashboard" className="brand"><div className="brand-mark" aria-hidden="true">A</div><div><strong>Amanah<span className="brand-dot">.</span></strong><span>Digital trust infrastructure</span></div></Link>{navigation()}<div className="sidebar-footer"><div className="account-label"><span className="account-avatar" aria-hidden="true">{name.slice(0, 1).toUpperCase()}</span><span>{name}</span></div><LogoutButton /></div></aside>
    <div className="workspace-content"><header className="workspace-bar"><div className="workspace-breadcrumb"><span>Amanah</span><span aria-hidden="true">/</span><strong>{current}</strong></div><div className="workspace-tools"><Link href="/verify">Public verification <span aria-hidden="true">↗</span></Link><button ref={menuButton} className="menu-toggle" type="button" aria-expanded={open} aria-controls="workspace-menu" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"}><span className={open ? "menu-lines is-open" : "menu-lines"} aria-hidden="true"><i /><i /></span></button></div></header><main id="workspace-main" className="main-content" tabIndex={-1}>{children}</main></div>
    <dialog id="workspace-menu" ref={mobileMenu} className="workspace-menu" onCancel={closeMenu} onClose={() => setOpen(false)}><div className="mobile-menu-heading"><strong>Amanah<span className="brand-dot">.</span></strong><button type="button" className="button button-secondary" onClick={closeMenu}>Close <span aria-hidden="true">×</span></button></div>{navigation()}<div className="sidebar-footer"><div className="small muted">{name}</div><LogoutButton /></div></dialog>
  </div>;
}
