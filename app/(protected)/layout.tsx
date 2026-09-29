import { LogoutButton } from "@/components/logout-button";
import { requireUser } from "@/lib/auth";
import Link from "next/link";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireUser();
  const name = (user.user_metadata?.full_name as string | undefined) || user.email || "Amanah user";

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">A</div>
          <div>
            <strong>Amanah</strong>
            <span>Operational platform</span>
          </div>
        </div>
        <nav className="nav">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/tasks">Tasks</Link>
          <Link href="/china-trip">China Trip</Link>
        </nav>
        <div className="sidebar-footer">
          <div className="small muted">{name}</div>
          <LogoutButton />
        </div>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
