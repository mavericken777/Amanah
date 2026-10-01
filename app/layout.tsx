import type { Metadata } from "next";
import "./globals.css";
import "./design.css";
import { PageMotion } from "@/components/page-motion";

export const metadata: Metadata = {
  title: { default: "Amanah", template: "%s | Amanah" },
  description: "Amanah operational project management platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<PageMotion /></body></html>;
}
