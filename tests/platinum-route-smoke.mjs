import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const mod = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const { chromium } = mod;
const previewUrl = (process.env.PREVIEW_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const page = await browser.newPage({ viewport: { width: 1024, height: 900 } });

const routes = [
  "ecosystem.html","how-it-works.html","digital-trust.html","command-center.html",
  "traceability.html","smart-audit.html","china-gcc.html","partners.html","hardware.html","standards.html",
  "manufacturers.html","finance-takaful.html","verify.html","contact.html"
];

for (const route of routes) {
  const errors = [];
  const handler = error => errors.push(String(error));
  page.on("pageerror", handler);
  await page.goto(previewUrl + "/" + route, { waitUntil: "networkidle" });
  page.off("pageerror", handler);
  const result = await page.evaluate(() => ({
    h1: document.querySelectorAll("h1").length,
    header: Boolean(document.querySelector(".secondary-header")),
    topology: document.body.textContent?.includes("AHTE ⇄ Direct JAKIM API ⇄ JAKIM") ?? false,
    processFlows: document.querySelectorAll(".process-flow-experience").length,
    processScenes: document.querySelectorAll(".process-scene-3d").length,
    overflow: document.documentElement.scrollWidth > innerWidth + 1,
  }));
  assert.equal(errors.length, 0, route + " page errors: " + errors.join(" | "));
  assert.equal(result.h1, 1, route + " must expose exactly one h1");
  assert.ok(result.header && result.topology, route + " platinum shell/topology missing");
  assert.ok(result.processScenes >= 1, route + " must include its 3D scene");
  assert.equal(result.processScenes, result.processFlows + 1, route + " each process flow must have a corresponding 3D scene plus its page hero");
  assert.equal(result.overflow, false, route + " horizontal overflow");
}

await page.goto(previewUrl + "/verify.html", { waitUntil: "networkidle" });
const verificationViews = page.locator(".secondary-path-grid button");
assert.equal(await verificationViews.count(), 3, "public verifier must expose product, batch and shipment views");
await verificationViews.first().click();
assert.equal(await page.locator(".passport-heading h3").textContent(), "Premium Halal food product", "guided product view must render the product journey");
assert.doesNotMatch(await page.locator(".passport-heading").textContent() ?? "", /CN-DEMO|DEMO-SHIPMENT|GHSC-DEMO/i, "public verifier must not expose internal fixture identifiers");
assert.equal(await page.locator(".passport-timeline li").count(), 4, "product view should expose the four lifecycle evidence groups");
const verifierToken='test-verification-token-000000000000000000000';
await page.route('**/functions/v1/public-verify?*',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({valid:true,not_certification:true,verification_scope:'disclosure_token_only',disclosure:{product:'Authorised product',origin:'China'}})}));
await page.locator('#issuer-token').fill(verifierToken);
await page.getByRole('button',{name:'Verify disclosure',exact:true}).click();
await page.getByRole('status').filter({hasText:'Issuer-authorised disclosure retrieved.'}).waitFor();
assert.match(await page.getByRole('status').textContent(),/Authorised product/);
await page.unroute('**/functions/v1/public-verify?*');
await page.route('**/functions/v1/public-verify?*',route=>route.fulfill({status:404,contentType:'application/json',body:JSON.stringify({valid:false})}));
await page.getByRole('button',{name:'Verify disclosure',exact:true}).click();
await page.getByRole('status').filter({hasText:'No current disclosure found.'}).waitFor();
assert.doesNotMatch(await page.getByRole('status').textContent(),/Authorised product/,'a failed verification clears previously disclosed fields');
await page.unroute('**/functions/v1/public-verify?*');

const labJourneySource = await readFile("platinum-site/src/data/demoJourney.ts", "utf8");
assert.ok(labJourneySource.includes("The workflow is designed for JAKIM-certified laboratories within their applicable scope."));

await page.goto(previewUrl + "/manufacturers.html", { waitUntil: "networkidle" });
assert.equal(await page.locator(".secondary-checklist input").count(), 5);

await page.goto(previewUrl + "/contact.html", { waitUntil: "networkidle" });
assert.equal(await page.locator(".secondary-path-grid span").count(), 6);

const staticPage = await browser.newPage({ javaScriptEnabled: false });
await staticPage.goto(previewUrl + "/how-it-works.html");
assert.equal(await staticPage.locator("h1").count(), 1, "service pages must contain their heading before JavaScript runs");
assert.ok(await staticPage.locator(".secondary-hero p").first().isVisible(), "service content must be readable without JavaScript");
await staticPage.close();
await browser.close();
console.log("Platinum secondary-route smoke passed for all public pages.");
