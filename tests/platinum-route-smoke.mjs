import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const mod = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const { chromium } = mod;
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });

const routes = [
  "ecosystem.html","how-it-works.html","digital-trust.html","command-center.html",
  "traceability.html","smart-audit.html","china-gcc.html","partners.html",
  "manufacturers.html","finance-takaful.html","verify.html","contact.html"
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
const verificationViews = page.locator(".secondary-path-grid button");
assert.equal(await verificationViews.count(), 3, "public verifier must expose product, batch and shipment views");
await verificationViews.first().click();
assert.equal(await page.locator(".passport-heading h3").textContent(), "Premium Halal food product", "guided product view must render the product journey");
assert.doesNotMatch(await page.locator(".passport-heading").textContent() ?? "", /CN-DEMO|DEMO-SHIPMENT|GHSC-DEMO/i, "public verifier must not expose internal fixture identifiers");
assert.equal(await page.locator(".passport-timeline li").count(), 4, "product view should expose the four lifecycle evidence groups");
const labJourneySource = await readFile("platinum-site/src/data/demoJourney.ts", "utf8");
assert.match(labJourneySource, /For the China laboratory workstream, the named institution is National Food Safety \\(Hengqin\\) Innovation Center/);
assert.doesNotMatch(labJourneySource, /National Food Safety \\(Hengqin\\) Innovation Center laboratory operator \/ reviewer/, "named institution must not be assigned as accountable operator");

await page.goto("http://127.0.0.1:4173/manufacturers.html", { waitUntil: "networkidle" });
assert.equal(await page.locator(".secondary-checklist input").count(), 5);

await page.goto("http://127.0.0.1:4173/contact.html", { waitUntil: "networkidle" });
assert.equal(await page.locator(".secondary-path-grid span").count(), 6);

await browser.close();
console.log("Platinum secondary-route smoke passed for all public pages.");
