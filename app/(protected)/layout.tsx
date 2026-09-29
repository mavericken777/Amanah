import { LogoutButton } from "@/components/logout-button";
import { requireUser } from "@/lib/auth";
import Link from "next/link";

const coreNavigation = [
  ["/dashboard","Dashboard"],["/projects","Projects"],["/tasks","Tasks"],["/meetings","Meetings"],
  ["/documents","Documents"],["/decisions","Decisions"],["/risks","Risks"],["/finance","Finance"],
  ["/updates","Updates"],["/approvals","Approvals"],["/workflows","Workflows"],["/notifications","Notifications"],
  ["/search","Search"],["/audit","Audit"],["/settings","Settings"],
] as const;

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireUser();
  const name=(user.user_metadata?.full_name as string|undefined)||user.email||"Amanah user";
  return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark">A</div><div><strong>Amanah</strong><span>Operational platform</span></div></div>
    <nav className="nav" aria-label="Core navigation"><div className="nav-group-label">Core</div>{coreNavigation.map(([href,label])=><Link href={href} key={href}>{label}</Link>)}<div className="nav-group-label">Travel module</div><Link href="/china-trip">China Trip</Link><div className="nav-group-label">Administration</div><Link href="/admin">Workspace members</Link></nav>
    <div className="sidebar-footer"><div className="small muted">{name}</div><LogoutButton/></div></aside><main className="main-content">{children}</main></div>;
}
