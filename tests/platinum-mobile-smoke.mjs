import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const { chromium } = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const previewUrl = (process.env.PREVIEW_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });

const transparencyPage = await browser.newPage({ viewport: { width: 375, height: 812 } });
const transparencyCdp = await transparencyPage.context().newCDPSession(transparencyPage);
await transparencyCdp.send("Emulation.setEmulatedMedia", {
  features: [{ name: "prefers-reduced-transparency", value: "reduce" }]
});
await transparencyPage.goto(previewUrl + "/", { waitUntil: "domcontentloaded" });
const transparency = await transparencyPage.evaluate(() => ({
  supported: matchMedia("(prefers-reduced-transparency: reduce)").matches,
  glass: document.querySelector(".glass")
    ? getComputedStyle(document.querySelector(".glass")).backdropFilter
    : null
}));
if (transparency.supported) {
  assert.equal(transparency.glass, "none", "reduced-transparency preference must remove glass blur");
} else {
  console.log("Chromium does not expose prefers-reduced-transparency emulation; CSS fallback remains source-checked.");
}
await transparencyPage.close();

const mobilePage = await browser.newPage({
  viewport: { width: 375, height: 812 },
  isMobile: true,
  deviceScaleFactor: 2
});
const mobileCdp = await mobilePage.context().newCDPSession(mobilePage);
await mobileCdp.send("Network.enable");
await mobileCdp.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 300,
  downloadThroughput: 50 * 1024,
  uploadThroughput: 20 * 1024,
  connectionType: "cellular3g"
});
const pageErrors = [];
mobilePage.on("pageerror", error => pageErrors.push(String(error)));
const started = Date.now();
await mobilePage.goto(previewUrl + "/", {
  waitUntil: "domcontentloaded",
  timeout: 60000
});
await mobilePage.locator("#hero-title").waitFor({ state: "visible", timeout: 30000 });
const elapsedMs = Date.now() - started;
const mobileState = await mobilePage.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  viewportWidth: innerWidth,
  title: document.querySelector("#hero-title")?.textContent?.trim()
}));
assert.ok(mobileState.title, "homepage headline must render on a throttled mobile connection");
assert.ok(mobileState.scrollWidth <= mobileState.viewportWidth + 1, "mobile layout must not overflow on a throttled connection");
assert.equal(pageErrors.length, 0, `page errors on throttled mobile: ${pageErrors.join(" | ")}`);
assert.ok(elapsedMs < 45000, `mobile homepage did not become usable within 45 seconds over simulated 3G (${elapsedMs} ms)`);
console.log(`Throttled mobile homepage rendered in ${elapsedMs} ms over simulated 3G.`);

await browser.close();
