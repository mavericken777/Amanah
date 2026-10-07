import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const mod = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const { chromium } = mod;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });

const routes = [
  "ecosystem.html","how-it-works.html","digital-trust.html","command-center.html",
  "traceability.html","laboratory.html","smart-audit.html","hardware.html","china-gcc.html",
  "gcc-importer.html","distributor.html","retail-market.html","interoperability.html","cybersecurity.html",
  "platform-tour.html","partners.html","manufacturers.html","finance-takaful.html","verify.html","contact.html"
];

for (const route of routes) {
  const errors = [];
  const handler = error => errors.push(String(error));
  page.on("pageerror", handler);
  await page.goto("http://127.0.0.1:4173/" + route, { waitUntil: "networkidle" });
  page.off("pageerror", handler);
  const result = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    header: Boolean(document.querySelector(".secondary-header")),
    topology: document.body.textContent?.includes("AHTE ⇄ Direct JAKIM API ⇄ JAKIM") ?? false,
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
  }));
  assert.equal(errors.length, 0, route + " page errors: " + errors.join(" | "));
  assert.equal(result.h1, 1, route + " must expose exactly one h1");
  assert.ok(result.header && result.topology, route + " platinum shell/topology missing");
  assert.equal(result.overflow, false, route + " horizontal overflow");
}

await page.goto("http://127.0.0.1:4173/verify.html", { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Product provenance" }).click();
assert.equal(await page.locator(".passport-heading h3").textContent(), "Premium Halal food product", "verification route must use presentation-safe product context");
assert.doesNotMatch(await page.locator("body").textContent() ?? "", /CN-DEMO|GHSC-DEMO|DEMO-SHIPMENT|DIGITAL TRUST PASSPORT|PROJECT-REPO/i, "secondary public route must not expose internal demo identifiers or engineering provenance");
assert.equal(await page.locator(".passport-timeline li").count(), 4, "product verification view should expose the approved disclosure journey");

await page.goto("http://127.0.0.1:4173/manufacturers.html", { waitUntil: "networkidle" });
assert.equal(await page.locator(".secondary-checklist input").count(), 5);

await page.goto("http://127.0.0.1:4173/contact.html", { waitUntil: "networkidle" });
assert.equal(await page.locator(".secondary-path-grid span").count(), 6);

await browser.close();
console.log("Platinum secondary-route smoke passed for all public pages.");
