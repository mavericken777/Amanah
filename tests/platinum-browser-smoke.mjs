import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

const mod = await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const { chromium } = mod;
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const axePath = process.env.AXE_PATH;
const viewports = [375, 768, 1024, 1440];

for (const width of viewports) {
  await page.setViewportSize({ width, height: 900 });
  const errors = [];
  page.on("pageerror", error => errors.push(String(error)));
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  assert.equal(errors.length, 0, `page errors at ${width}px: ${errors.join(" | ")}`);

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth,
    title: document.title,
    lang: document.documentElement.lang,
    h1: document.querySelectorAll("h1").length
  }));
  assert.ok(metrics.scrollWidth <= metrics.innerWidth + 1, `horizontal overflow at ${width}px: ${JSON.stringify(metrics)}`);
  assert.ok(metrics.title.length > 0, "missing document title");
  assert.equal(metrics.lang, "en", "document language must be English");
  assert.equal(metrics.h1, 1, "exactly one h1 required");
  const phaseOne = await page.evaluate(() => ({
    header: Boolean(document.querySelector(".platinum-header")),
    hero: Boolean(document.querySelector("#top")),
    ecosystem: Boolean(document.querySelector("#ecosystem")),
    trust: Boolean(document.querySelector("#trust")),
    corridor: Boolean(document.querySelector("#corridor")),
    pathways: Boolean(document.querySelector("#pathways")),
    loginLinks: [...document.querySelectorAll('a[href*="amanah-yq9x.vercel.app/login"]')].length,
    verifyLinks: [...document.querySelectorAll('a[href*="verify.html"]')].length
  }));
  assert.ok(phaseOne.header && phaseOne.hero && phaseOne.ecosystem && phaseOne.trust && phaseOne.corridor && phaseOne.pathways,
    `phase 1 structure incomplete at ${width}px: ${JSON.stringify(phaseOne)}`);
  assert.ok(phaseOne.loginLinks >= 2, "secure portal entry points missing");
  assert.ok(phaseOne.verifyLinks >= 1, "public verification entry point missing");

  const stageButtons = page.locator(".corridor-nav button");
  assert.equal(await stageButtons.count(), 5, "corridor must expose five accountable stages");
  await stageButtons.nth(1).click();
  assert.equal(await page.locator(".corridor-detail h3").textContent(), "Laboratory", "corridor interaction did not update");

  await page.addScriptTag({ path: axePath });
  const axe = await page.evaluate(async () => await globalThis.axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] }
  }));
  const severe = axe.violations.filter(v => ["serious", "critical"].includes(v.impact ?? ""));
  assert.equal(severe.length, 0, `axe serious/critical violations at ${width}px: ${JSON.stringify(severe.map(v => ({ id:v.id, impact:v.impact, nodes:v.nodes.length })))}`);

  await page.screenshot({ path: `platinum-site/quality-results/platinum-${width}.png`, fullPage: true });
}

await browser.close();
console.log("Platinum responsive and accessibility smoke passed at 375/768/1024/1440.");
