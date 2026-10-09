"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { currentNavigation, type NavigationGroups } from "@/lib/navigation";
import { LogoutButton } from "@/components/logout-button";

export function PlatformShell({ name, groups, children }: { name: string; groups: NavigationGroups; children: React.ReactNode }) {
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
  const activeLink = currentNavigation(pathname, groups);
  const current = activeLink?.[1] ?? "Workspace";

  function navigation() {
    return <nav className="nav" aria-label="Platform navigation">{groups.map(([label, links]) => <div className="nav-group" key={label}><div className="nav-group-label">{label}</div>{links.map(([href, title]) => <Link href={href} key={href} aria-current={activeLink?.[0] === href ? "page" : undefined} onClick={() => setOpen(false)}><span>{title}</span><span aria-hidden="true" className="nav-arrow">↗</span></Link>)}</div>)}</nav>;
  }

  const identity = <Link href="/dashboard" className="brand" aria-label="Amanah — Global Halal Digital Trust">
    <img className="brand-crest" src="/company-logo.webp" alt="" />
    <span className="brand-copy">
      <strong>Amanah · Global Halal Digital Trust</strong>
      <span>Global Halal Supply Chain Ltd</span>
      <span className="brand-micro">AHTE · Evidence · Trust · Trade</span>
    </span>
  </Link>;

  return <div className="app-shell">
    <a className="skip-link" href="#workspace-main">Skip to workspace</a>
    <aside className="sidebar">{identity}{navigation()}<div className="sidebar-footer"><div className="account-label"><span className="account-avatar" aria-hidden="true">{name.slice(0, 1).toUpperCase()}</span><span>{name}</span></div><LogoutButton /></div></aside>
    <div className="workspace-content">
      <header className="workspace-bar">
        <div className="workspace-breadcrumb"><span>AHTE</span><span aria-hidden="true">/</span><strong>{current}</strong></div>
        <div className="workspace-tools"><Link href="/verify">Verify trust disclosure <span aria-hidden="true">↗</span></Link><button ref={menuButton} className="menu-toggle" type="button" aria-expanded={open} aria-controls="workspace-menu" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"}><span className={open ? "menu-lines is-open" : "menu-lines"} aria-hidden="true"><i /><i /></span></button></div>
      </header>
      <main id="workspace-main" className="main-content" tabIndex={-1}>{children}</main>
    </div>
    <dialog id="workspace-menu" ref={mobileMenu} className="workspace-menu" onCancel={closeMenu} onClose={() => setOpen(false)}>
      <div className="mobile-menu-heading"><span>Amanah · Global Halal Digital Trust</span><button type="button" className="button button-secondary" onClick={closeMenu}>Close <span aria-hidden="true">×</span></button></div>
      {navigation()}
      <div className="sidebar-footer"><div className="small muted">{name}</div><LogoutButton /></div>
    </dialog>
  </div>;
}
