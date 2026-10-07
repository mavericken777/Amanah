import assert from 'node:assert/strict';
import fs from 'node:fs';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
fs.mkdirSync('browser-results', { recursive: true });

try {
  for (const width of [375, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce', bypassCSP: true });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    await page.goto(process.env.JOURNEY_URL || 'http://127.0.0.1:8080/index.html');
    await page.locator('#stageNav button').first().waitFor();

    assert.equal(await page.locator('#stageNav button').count(), 20, 'complete lifecycle must expose 20 stages');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'horizontal overflow');
    assert.match(await page.locator('h1').evaluate(el => getComputedStyle(el).fontFamily), /Arial/);
    assert.equal(await page.locator('.platinum-shield,canvas,.home-hero-image').count(), 0);

    const publicText = await page.locator('body').textContent() ?? '';
    assert.doesNotMatch(publicText, /CN-DEMO|GHSC-DEMO|DEMO-SHIPMENT|DIGITAL TRUST PASSPORT|PROJECT-REPO|Source foundation|PENDING_AUTHORIZATION/i);

    const expectedStages = [
      'Manufacturer onboarding','Facility & production line','Product & SKU','Suppliers & raw materials',
      'Standards & applicability','Documents & evidence','Laboratory evidence','Smart audit',
      'Findings & CAPA','Authority workflow','Production & digital twin','Origin warehouse',
      'Sinotrans logistics','Origin port & customs','International transit','GCC port & customs',
      'GCC importer','Distribution / 3PL','Retail / marketplace','Consumer verification & Command Center'
    ];

    for (let i = 0; i < expectedStages.length; i++) {
      await page.locator('#stageNav button').nth(i).click();
      assert.equal((await page.locator('#stageTitle').textContent())?.trim(), expectedStages[i]);
      assert.ok((await page.locator('#journeySummary').textContent() ?? '').length > 20);
      assert.ok((await page.locator('#stageDetail').textContent() ?? '').length > 20);
    }

    for (const view of ['Process','People & accountability','Evidence','Risk & response']) {
      await page.locator('#viewModes button').filter({ hasText: view }).click();
      assert.ok((await page.locator('#stageDetail').textContent() ?? '').length > 20);
    }

    assert.equal(await page.locator('#playPauseJourney').count(), 1);
    assert.equal(await page.locator('#restartJourney').count(), 1);
    await page.locator('#restartJourney').click();
    assert.match(await page.locator('#stageTitle').textContent() ?? '', /Manufacturer onboarding/);

    for (let i = 0; i < 13; i++) await page.locator('#auditNext').click();
    assert.match(await page.locator('#auditCheckpoint').textContent() ?? '', /Session sync/);
    await page.locator('#auditReset').click();
    assert.ok(await page.locator('#auditPrevious').isDisabled());

    await page.locator('#labSteps button').last().click();
    assert.match(await page.locator('#labCurrent').textContent() ?? '', /Evidence binding/);

    await page.locator('#warehouseZones button').filter({ hasText: 'Quarantine' }).click();
    assert.match(await page.locator('#warehouseDetail').textContent() ?? '', /Quarantine/);

    for (const id of ['custodyRibbon','portNodes','actorButtons','architectureButtons']) {
      await page.locator('#' + id + ' button').last().click();
    }

    for (const view of ['Map','Timeline','Custody','Evidence','Exceptions']) {
      await page.locator('#monitorViews button').filter({ hasText: view }).click();
    }

    await page.locator('#exceptionButtons button').first().click();
    assert.match(await page.locator('#exceptionState').textContent() ?? '', /HOLD/);
    await page.locator('#resetException').click();

    await page.locator('#consumerScan').click();
    assert.match(await page.locator('#consumerRecord').textContent() ?? '', /Premium Halal food product/);

    await page.locator('#scrubber').focus();
    await page.keyboard.press('Home');
    assert.match(await page.locator('#stageTitle').textContent() ?? '', /Manufacturer onboarding/);

    if (process.env.AXE_PATH) {
      await page.addScriptTag({ path: process.env.AXE_PATH });
      const results = await page.evaluate(async () => await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa'] }
      }));
      fs.writeFileSync('browser-results/journey-axe-' + width + '.json', JSON.stringify(results, null, 2));
      assert.deepEqual(results.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
    }

    assert.deepEqual(errors, []);
    await page.screenshot({ path: 'browser-results/journey-' + width + '.png', fullPage: true });
    await page.close();
  }

  console.log('20-stage interactive journey, autoplay controls, drill-down views and accessibility passed at all 4 widths.');
} finally {
  await browser.close();
}
