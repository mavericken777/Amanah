import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./design.css";
import "./platinum.css";
import { PageMotion } from "@/components/page-motion";

export const metadata: Metadata = {
  title: { default: "Amanah | Global Halal Digital Trust", template: "%s | Amanah" },
  description: "Amanah is the operational workspace for the Global Halal Digital Trust ecosystem: evidence, standards, audit, laboratory, custody, monitoring and accountable human decisions across the China → GCC corridor.",
  applicationName: "Amanah",
};

export const viewport: Viewport = {
  themeColor: "#060606",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<PageMotion /></body></html>;
}
