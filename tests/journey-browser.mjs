import assert from 'node:assert/strict';
import fs from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
fs.mkdirSync('browser-results',{recursive:true});
try {
 for(const width of [375,768,1024,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce',bypassCSP:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.JOURNEY_URL||'http://127.0.0.1:8080/index.html');
  await page.locator('#stageNav button').first().waitFor();
  assert.equal(await page.locator('#stageNav button').count(),20);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.match(await page.locator('h1').evaluate(e=>getComputedStyle(e).fontFamily),/Arial/);
  assert.equal(await page.locator('.platinum-shield,canvas,.home-hero-image').count(),0);
  for(let i=0;i<20;i++){
    await page.locator('#stageNav button').nth(i).click();
    assert.ok((await page.locator('#stageTitle').textContent()).length>2);
    assert.doesNotMatch(await page.locator('body').textContent(),/CN-DEMO|GHSC-DEMO|DEMO-SHIPMENT|DIGITAL TRUST PASSPORT|PROJECT-REPO|Source foundation/i);
    assert.ok((await page.locator('#journeySummary').textContent()).length>20);
  }
  for(const view of ['Process','People & accountability','Evidence','Risk & response']){
    await page.locator('#viewModes button').filter({hasText:new RegExp(`^${view}import assert from 'node:assert/strict';
import fs from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
fs.mkdirSync('browser-results',{recursive:true});
try {
 for(const width of [375,768,1024,1440]) {
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce',bypassCSP:true});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.env.JOURNEY_URL||'http://127.0.0.1:8080/index.html');
  await page.locator('#stageNav button').first().waitFor();
  assert.equal(await page.locator('#stageNav button').count(),20);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.match(await page.locator('h1').evaluate(e=>getComputedStyle(e).fontFamily),/Arial/);
  assert.equal(await page.locator('.platinum-shield,canvas,.home-hero-image').count(),0);
  )}).click();
    assert.ok((await page.locator('#stageDetail').textContent()).length>20);
  }
  for(let i=0;i<12;i++)await page.locator('#auditNext').click();assert.match(await page.locator('#auditCheckpoint').textContent(),/Sync \/ reconciliation/);
  await page.locator('#auditReset').click();assert.ok(await page.locator('#auditPrevious').isDisabled());
  await page.locator('#labSteps button').last().click();assert.match(await page.locator('#labCurrent').textContent(),/Evidence binding/);
  await page.locator('#warehouseZones button').filter({hasText:'Quarantine'}).click();assert.match(await page.locator('#warehouseDetail').textContent(),/Quarantine/);
  for(const id of ['custodyRibbon','portNodes','actorButtons','architectureButtons'])await page.locator(`#${id} button`).last().click();
  for(const view of ['Map','Timeline','Custody','Evidence','Exceptions'])await page.locator('#monitorViews button').filter({hasText:new RegExp(`^${view}$`)}).click();
  await page.locator('#monitorViews button').filter({hasText:/^Custody$/}).click();
  await page.locator('#stageNav button').first().click();
  assert.match(await page.locator('#monitorPanel').textContent(),/Manufacturer|China/);
  await page.locator('#monitorViews button').filter({hasText:/^Exceptions$/}).click();
  await page.locator('#exceptionButtons button').first().click();assert.match(await page.locator('#exceptionState').textContent(),/HOLD/);assert.match(await page.locator('#monitorPanel').textContent(),/Temperature excursion/);
    await page.locator('#resetException').click();  await page.locator('#consumerScan').click();assert.match(await page.locator('#consumerRecord').textContent(),/Premium Halal food product/);
  assert.equal(await page.locator('#playPauseJourney').count(),1);assert.equal(await page.locator('#restartJourney').count(),1);await page.locator('#restartJourney').click();assert.match(await page.locator('#stageTitle').textContent(),/Manufacturer onboarding/);
  await page.locator('#scrubber').focus();await page.keyboard.press('Home');assert.match(await page.locator('#stageTitle').textContent(),/Origin/);
  if(process.env.AXE_PATH){await page.addScriptTag({path:process.env.AXE_PATH});const results=await page.evaluate(async()=>await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));fs.writeFileSync(`browser-results/journey-axe-${width}.json`,JSON.stringify(results,null,2));assert.deepEqual(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);}
  assert.deepEqual(errors,[]);await page.screenshot({path:`browser-results/journey-${width}.png`,fullPage:true});await page.close();
 }
 console.log('Journey interactions, keyboard, typography and states passed at all 4 widths.');
} finally {await browser.close();}
