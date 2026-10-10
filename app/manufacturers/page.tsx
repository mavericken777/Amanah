import type { Metadata } from "next";
import { ManufacturerHero } from "./manufacturer-hero";
import "./manufacturers.css";

export const metadata: Metadata = {
  title: "Manufacturer Readiness",
  description:
    "Prepare your products for the next market. Connect facility, ingredient, supplier, control and evidence readiness in one Amanah journey.",
  openGraph: {
    title: "Manufacturer Readiness | Amanah",
    description:
      "A clearer route from manufacturer preparation to market engagement, with evidence and accountable human decisions.",
    type: "website",
  },
};

export default function ManufacturersPage() {
  return <ManufacturerHero />;
}
