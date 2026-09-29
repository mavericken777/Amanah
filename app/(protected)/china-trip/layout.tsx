import Link from "next/link";

export default function ChinaTripLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="stack-xl">
      <nav className="subnav">
        <Link href="/china-trip">Overview</Link>
        <Link href="/china-trip/itinerary">Itinerary</Link>
        <Link href="/china-trip/travellers">Travellers</Link>
        <Link href="/china-trip/logistics">Logistics</Link>
        <Link href="/china-trip/accommodation">Accommodation</Link>
      </nav>
      {children}
    </div>
  );
}
