import Link from "next/link";

const links = [
  ["Mission Control","/china-trip"],
  ["Itinerary","/china-trip/itinerary"],
  ["Delegation","/china-trip/travellers"],
  ["Logistics","/china-trip/logistics"],
  ["Accommodation","/china-trip/accommodation"],
  ["Meetings","/china-trip/meetings"],
  ["Evidence","/china-trip/documents"],
  ["Budget","/china-trip/budget"],
  ["Risks","/china-trip/risks"],
  ["Decisions","/china-trip/decisions"],
  ["Actions","/china-trip/actions"],
  ["Updates","/china-trip/updates"],
] as const;

export default function ChinaTripLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stack-xl">
      <nav className="subnav" aria-label="China Mission navigation">
        {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      {children}
    </div>
  );
}
