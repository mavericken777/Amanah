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
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, window.innerHeight);
  });
  await page.waitForFunction(() => document.documentElement.classList.contains("platinum-smooth-scroll"), { timeout: 10000 });
  await page.locator(".platinum-scroll-progress").waitFor({ state: "attached" });
  assert.ok(await page.evaluate(() => document.documentElement.classList.contains("platinum-smooth-scroll")), "Lenis smooth scroll must initialize on first scroll when reduced motion is off");
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
  if (width >= 1280) {
    const headingLines = await page.locator("#hero-title").evaluate(el => Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight)));
    assert.ok(headingLines <= 2, `desktop hero headline must stay to two lines, got ${headingLines}`);
  }
  assert.equal(await page.locator("#primary-nav a").count(), 7, "primary navigation should expose the main visitor journeys");
  const phaseOne = await page.evaluate(() => ({
    header: Boolean(document.querySelector(".platinum-header")),
    hero: Boolean(document.querySelector("#top")),
    ecosystem: Boolean(document.querySelector("#ecosystem")),
    trust: Boolean(document.querySelector("#trust")),
    corridor: Boolean(document.querySelector("#corridor")),
    monitoring: Boolean(document.querySelector("#monitoring")),
    pathways: Boolean(document.querySelector("#pathways")),
    loginLinks: [...document.querySelectorAll('a[href*="amanah-yq9x.vercel.app/login"]')].length,
    verifyLinks: [...document.querySelectorAll('a[href*="verify.html"]')].length
  }));
  assert.ok(phaseOne.header && phaseOne.hero && phaseOne.ecosystem && phaseOne.trust && phaseOne.corridor && phaseOne.monitoring && phaseOne.pathways,
    `phase 1 structure incomplete at ${width}px: ${JSON.stringify(phaseOne)}`);
  assert.ok(phaseOne.loginLinks >= 2, "secure portal entry points missing");
  assert.equal(await page.locator('.halal-shield-stage,.static-shield').count(),0,'Superseded hero shield must be absent');
  assert.ok(phaseOne.verifyLinks >= 1, "public verification entry point missing");

  const stageButtons = page.locator(".corridor-nav button");
  assert.equal(await stageButtons.count(), 12, "goods journey must expose twelve accountable handoffs");
  await stageButtons.nth(6).click();
  assert.equal(await page.locator(".corridor-detail h3").textContent(), "Sinotrans warehouse", "warehouse handoff interaction did not update");
  await stageButtons.nth(11).click();
  assert.equal(await page.locator(".corridor-detail h3").textContent(), "Consumer verification & response", "consumer endpoint interaction did not update");
  assert.match(await page.locator(".journey-evidence").textContent() ?? "", /Purpose-bound disclosure/, "consumer evidence and handoff detail missing");
  const perspectiveButtons = page.locator(".journey-perspective-controls button");
  assert.equal(await perspectiveButtons.count(), 4, "journey must expose Journey, Actor, Standards and Trust record views");
  await page.getByRole("button", { name: "Standards", exact: true }).click();
  assert.equal(await page.locator(".journey-perspective-panel").getAttribute("data-perspective"), "standards");
  assert.match(await page.locator(".journey-perspective-panel h3").textContent() ?? "", /Consumer disclosure/);
  await stageButtons.nth(7).click();
  assert.match(await page.locator(".journey-perspective-panel h3").textContent() ?? "", /Transport custody/, "standards view must follow active handoff");
  await page.getByRole("button", { name: "Actor", exact: true }).click();
  assert.match(await page.locator(".journey-perspective-panel h3").textContent() ?? "", /Sinotrans transport operations/);
  await page.getByRole("button", { name: "Trust record", exact: true }).click();
  assert.match(await page.locator(".journey-perspective-panel").textContent() ?? "", /CN-DEMO-24001/);
  await page.getByRole("button", { name: "Journey", exact: true }).click();
  await stageButtons.nth(11).click();
  await page.getByRole("button", { name: "GHSC-MY-2026-8891" }).click();
  assert.equal(await page.locator(".verify-result h3").textContent(), "Premium Halal food product", "public sample must follow the canonical demo product");
  assert.match(await page.locator(".verify-result").textContent() ?? "", /Batch CN-DEMO-24001/, "public sample batch must match the journey passport");

  const phaseTwo = await page.evaluate(() => ({
    standards: Boolean(document.querySelector("#standards")),
    standardsCatalogCount: document.querySelectorAll("#standards .standards-catalog-grid .standard-card").length,
    completeStandardsSet: [
      "MS 1500:2019","MS 2400-1:2019","MS 2400-2:2019","MS 2400-3:2019","MS 2424:2019","MS 2634:2019","MS 2636:2019","MS 2738:2023","MS 2803:2025","MS 2393:2023","MS 2627:2017","MS 2627-2:2025","MS 1900:2025","MS 2691:2021","MS 2610:2015","MS 2809:2025","MS 2810:2025"
    ].every(code => document.body.textContent?.includes(code) ?? false),
    certificationLayer: ["MPPHM 2020","MHMS 2020","HAS","IHCS"].every(code => document.body.textContent?.includes(code) ?? false),
    assurance: Boolean(document.querySelector("#assurance")),
    laboratory: Boolean(document.querySelector("#laboratory")),
    smartAudit: Boolean(document.querySelector("#smart-audit")),
    labEvidence: document.body.textContent?.includes("LABORATORY EVIDENCE") ?? false,
    command: Boolean(document.querySelector("#command")),
    verify: Boolean(document.querySelector("#verify")),
    directJakim: document.body.textContent?.includes("AHTE ⇄ Direct JAKIM API ⇄ JAKIM") ?? false
  }));
  assert.ok(
    phaseTwo.standards && phaseTwo.assurance && phaseTwo.laboratory && phaseTwo.smartAudit && phaseTwo.labEvidence && phaseTwo.command && phaseTwo.verify,
    `phase 2 structure incomplete at ${width}px: ${JSON.stringify(phaseTwo)}`
  );
  assert.equal(phaseTwo.standardsCatalogCount, 17, "flagship standards catalogue must expose exactly 17 core standards");
  assert.ok(phaseTwo.completeStandardsSet, "complete 17-standard operating set is not visible");
  assert.ok(phaseTwo.certificationLayer, "MPPHM/MHMS/HAS/IHCS framework layer is missing");
  assert.ok(phaseTwo.labEvidence, "laboratory evidence workflow missing");

  const labButtons = page.locator("#laboratory .stepper button");
  assert.equal(await labButtons.count(), 5, "laboratory chain must expose five stages");
  await labButtons.nth(3).click();
  assert.equal(await page.locator("#laboratory .step-detail h3").textContent(), "Technical review & signature", "laboratory interaction did not update");

  const auditButtons = page.locator("#smart-audit .stepper button");
  assert.equal(await auditButtons.count(), 5, "smart audit must expose five stages");
  await auditButtons.nth(4).click();
  assert.equal(await page.locator("#smart-audit .step-detail h3").textContent(), "CAPA & re-verification", "audit interaction did not update");

  const monitorButtons = page.locator(".monitoring-nav button");
  assert.equal(await monitorButtons.count(), 7, "full-stack monitoring must expose seven stages");
  await monitorButtons.nth(6).click();
  assert.match(await page.locator(".monitoring-detail h3").textContent() ?? "", /Correct & close/, "monitoring response path did not update");

  const eventButtons = page.locator(".event-list button");
  assert.equal(await eventButtons.count(), 3, "command centre must expose illustrative exceptions");
  await eventButtons.nth(2).click();
  assert.equal(await page.locator(".command-detail h3").textContent(), "Route deviation", "command-centre interaction did not update");

  assert.equal(await page.locator(".connector-row").count(), 0, "connector readiness panel removed");

  const phaseThree = await page.evaluate(() => ({
    institutions: Boolean(document.querySelector("#institutions")),
    partners: Boolean(document.querySelector("#partners")),
    engage: Boolean(document.querySelector("#engage")),
    phc: document.body.textContent?.includes("Perak Halal Corporation") ?? false,
    ghscl: document.body.textContent?.includes("Global Halal Supply Chain Limited") ?? false,
    authorityTopology: document.body.textContent?.includes("AHTE ⇄ Direct JAKIM API ⇄ JAKIM") ?? false,
    finance: document.body.textContent?.includes("Islamic finance / Takaful") ?? false,
    corporateProfile: [...document.querySelectorAll('a[href*="corporate-profile.html"]')].length
  }));
  assert.ok(phaseThree.institutions && phaseThree.partners && phaseThree.engage,
    `phase 3 structure incomplete at ${width}px: ${JSON.stringify(phaseThree)}`);
  assert.ok(phaseThree.phc && phaseThree.ghscl, "institutional identity incomplete");
  assert.ok(phaseThree.finance, "finance / Takaful partner pathway missing");
  assert.ok(phaseThree.corporateProfile >= 1, "corporate profile conversion path missing");

  await page.locator("#terminal").scrollIntoViewIfNeeded();
  await page.locator(".terminal-card").first().waitFor({ state: "attached" });
  await page.locator("#verification-journey").scrollIntoViewIfNeeded();
  await page.locator(".journey-stage").first().waitFor({ state: "attached" });

  const phaseFour = await page.evaluate(() => ({
    terminal: Boolean(document.querySelector("#terminal")),
    journey: Boolean(document.querySelector("#verification-journey")),
    terminalCards: document.querySelectorAll(".terminal-card").length,
    journeyStages: document.querySelectorAll(".journey-stage").length,
  }));
  assert.ok(phaseFour.terminal && phaseFour.journey, `phase 4 structure incomplete at ${width}px: ${JSON.stringify(phaseFour)}`);
  assert.equal(phaseFour.terminalCards, 4, "trust terminal must expose four interactive cards");
  assert.equal(phaseFour.journeyStages, 4, "verification journey must expose four stages");

  await page.locator("#terminal").scrollIntoViewIfNeeded();
  const logisticsNodes = page.locator(".logistics-map .route-node");
  await logisticsNodes.first().waitFor({ state: "attached" });
  assert.equal(await logisticsNodes.count(), 3, "D3 logistics schematic must expose origin, GCC destination and Malaysia governance nodes");
  await logisticsNodes.nth(2).click();
  assert.match(await page.locator(".terminal-detail strong").textContent() ?? "", /Malaysia Governance/, "governance node did not update logistics detail");
  assert.match(await page.locator(".terminal-detail small").textContent() ?? "", /(governance.*only|not.*physical transit)/i, "Malaysia governance boundary missing");

  await page.locator(".terminal-finance .gold-action").click();
  assert.match(await page.locator(".terminal-state").textContent() ?? "", /DEMO RELEASE REQUEST GENERATED/, "finance interaction must remain a simulation");

  const complianceButtons = page.locator(".compliance-list button");
  assert.equal(await complianceButtons.count(), 4, "compliance card must expose four evidence artifacts");
  await complianceButtons.nth(3).click();
  assert.equal(await complianceButtons.nth(3).getAttribute("aria-expanded"), "true", "compliance artifact did not expand");
  assert.match(await complianceButtons.nth(3).textContent() ?? "", /Pending authorization/i, "Direct JAKIM connector state must not be represented as live");

  if (width <= 768) {
    const toggle = page.locator(".mobile-menu-toggle");
    assert.equal(await toggle.count(), 1, "mobile navigation toggle missing");
    await toggle.click();
    assert.equal(await toggle.getAttribute("aria-expanded"), "true", "mobile navigation did not open");
    assert.ok(await page.locator("#primary-nav").evaluate(el => el.classList.contains("open")), "mobile navigation open class missing");
    await page.keyboard.press("Escape");
    assert.equal(await toggle.getAttribute("aria-expanded"), "false", "Escape did not close mobile navigation");
  }

  await page.addScriptTag({ path: axePath });
  const axe = await page.evaluate(async () => await globalThis.axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] }
  }));
  const severe = axe.violations.filter(v => ["serious", "critical"].includes(v.impact ?? ""));
  const severeDetails = severe.map(v => ({
    id: v.id,
    impact: v.impact,
    nodes: v.nodes.map(n => ({ target: n.target, html: n.html, failureSummary: n.failureSummary }))
  }));
  assert.equal(severe.length, 0, `axe serious/critical violations at ${width}px: ${JSON.stringify(severeDetails)}`);

  await page.screenshot({ path: `platinum-site/quality-results/platinum-${width}.png`, fullPage: true });
}

await page.emulateMedia({ reducedMotion: "reduce" });
await page.setViewportSize({ width: 375, height: 900 });
await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
assert.equal(await page.evaluate(() => document.documentElement.classList.contains("platinum-smooth-scroll")), false, "Reduced motion must disable Lenis");
await page.locator("#verification-journey").scrollIntoViewIfNeeded();
await page.locator(".journey-stage").first().waitFor({ state: "attached" });
assert.equal(await page.locator(".journey-stage").count(), 4, "Reduced-motion Phase 4 fallback must preserve all journey stages");
assert.equal(await page.locator(".static-shield").count(), 0, "Superseded hero shield must be absent");
assert.equal(await page.locator(".halal-shield-stage canvas").count(), 0, "Reduced-motion Phase 4 fallback must not require WebGL");

const verifierPage = await browser.newPage({ viewport: { width: 375, height: 812 } });
await verifierPage.goto("http://127.0.0.1:4173/verify.html", { waitUntil: "networkidle" });
await verifierPage.locator("#route-token").fill("GHSC-MY-2026-8891");
await verifierPage.locator(".passport-result").waitFor({ state: "visible" });
assert.equal(await verifierPage.locator(".passport-result h3").textContent(), "Premium Halal food product", "secondary verifier must use the canonical demo product");
assert.match(await verifierPage.locator(".passport-result").textContent() ?? "", /CN-DEMO-24001/, "secondary verifier batch must match the journey passport");
await verifierPage.close();

await browser.close();
console.log("Platinum responsive and accessibility smoke passed at 375/768/1024/1440.");
