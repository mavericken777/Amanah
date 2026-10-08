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
  if(width===375){
   await page.waitForTimeout(5000);
   assert.match(await page.locator('#stageTitle').textContent(),/^02/,'journey auto-advances');
   await page.locator('#playJourney').click();
   const paused=await page.locator('#stageTitle').textContent();
   await page.waitForTimeout(4500);
   assert.equal(await page.locator('#stageTitle').textContent(),paused,'pause stops automatic progression');
   await page.locator('#playbackSpeed button[data-speed="2"]').click();assert.equal(await page.locator('#playbackSpeed button[data-speed="2"]').getAttribute('aria-pressed'),'true');
   await page.locator('#playbackSpeed button[data-speed="1"]').click();assert.equal(await page.locator('#playbackSpeed button[data-speed="1"]').getAttribute('aria-pressed'),'true');
   await page.locator('#restartJourney').click();
   assert.match(await page.locator('#stageTitle').textContent(),/^01/,'restart returns to origin');
  }
  const publicMarkup=await page.locator('body').textContent();
  assert.doesNotMatch(publicMarkup,/CN-DEMO|DEMO-SHIPMENT|GHSC-DEMO|DIGITAL TRUST PASSPORT|DEMO RELEASE|DEMO TOPOLOGY|PROJECT-REPO|Source foundation|Relationship and activation|UNCONFIGURED|PENDING_AUTHORIZATION/i);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.match(await page.locator('h1').evaluate(e=>getComputedStyle(e).fontFamily),/Arial/);
  assert.equal(await page.locator('.platinum-shield,canvas,.home-hero-image').count(),0);
  assert.equal(await page.locator('#stageNav button').count(),20);assert.equal(await page.locator('#playJourney').count(),1);assert.equal(await page.locator('#restartJourney').count(),1);assert.equal(await page.locator('#playbackSpeed button').count(),3);assert.equal(await page.locator('#journeyTimer').count(),1);for(let i=0;i<20;i++){await page.locator('#stageNav button').nth(i).click();assert.match(await page.locator('#stageTitle').textContent(),new RegExp(`^${String(i+1).padStart(2,'0')}`));assert.ok((await page.locator('#passportBody').textContent()).length>40);}
  for(const stage of ['GCC importer','Destination warehouse','Distributor / 3PL','Retail / marketplace','Consumer verification & continuous assurance']){
   await page.locator('#stageNav button').filter({hasText:stage}).click();
   assert.ok((await page.locator('#stageTitle').textContent()).toLowerCase().includes(stage.toLowerCase()));
  }
  for(const view of ['Journey','Trust','Actor','Standards','Custody','Monitoring','Consumer','Technical']){await page.locator('#viewModes button').filter({hasText:new RegExp(`^${view}$`)}).click();assert.ok((await page.locator('#modeExplanation').textContent()).length>20);}
  for(let i=0;i<12;i++)await page.locator('#auditNext').click();assert.match(await page.locator('#auditCheckpoint').textContent(),/Sync \/ reconciliation/);
  await page.locator('#auditReset').click();assert.ok(await page.locator('#auditPrevious').isDisabled());
  await page.locator('#labSteps button').last().click();assert.match(await page.locator('#labCurrent').textContent(),/Evidence binding/);
  await page.locator('#warehouseZones button').filter({hasText:'Quarantine'}).click();assert.match(await page.locator('#warehouseDetail').textContent(),/Quarantine/);
  for(const id of ['custodyRibbon','portNodes','actorButtons','architectureButtons'])await page.locator(`#${id} button`).last().click();
  for(const view of ['Map','Timeline','Custody','Evidence','Exceptions'])await page.locator('#monitorViews button').filter({hasText:new RegExp(`^${view}$`)}).click();
  await page.locator('#monitorViews button').filter({hasText:/^Custody$/}).click();
  await page.locator('#stageNav button').first().click();
  assert.match(await page.locator('#monitorPanel').textContent(),/Producer/);
  await page.locator('#monitorViews button').filter({hasText:/^Exceptions$/}).click();
  await page.locator('#exceptionButtons button').first().click();assert.match(await page.locator('#exceptionState').textContent(),/D4 operational hold/);assert.match(await page.locator('#monitorPanel').textContent(),/Temperature excursion/);
  assert.equal(await page.locator('#playJourney').isDisabled(),true,'play is locked during an exception hold');assert.equal(await page.locator('#restartJourney').isDisabled(),true,'restart cannot bypass an exception hold');const heldStage=await page.locator('#stageTitle').textContent();await page.waitForTimeout(4500);assert.equal(await page.locator('#stageTitle').textContent(),heldStage,'an exception hold pauses autoplay');
  assert.match(await page.locator('#exceptionBlastRadius').textContent(),/importer inventory.*distributor transfers.*retail stock/i);assert.equal(await page.locator('#exceptionBlastRadius ul li').count(),5,'recall scope branches from the affected product identity');
  assert.match(await page.locator('#governanceMatrix').textContent(),/D0.*D1.*D2.*D3.*D4.*D5.*D6/s);
  await page.locator('#passportTabs button').filter({hasText:'Overview'}).click();assert.match(await page.locator('#passportBody').textContent(),/HOLD/);
  for(const action of ['Record investigation','Record corrective action','Complete re-verification','Finish response walkthrough'])await page.locator('#exceptionActions button').filter({hasText:action}).click();
  assert.match(await page.locator('#exceptionState').textContent(),/accountable operator and competent authority/i);
  assert.match(await page.locator('#monitorPanel').textContent(),/Re-verification recorded/);
  await page.locator('#resetException').click();assert.match(await page.locator('#monitorPanel').textContent(),/No exception selected/);
  await page.locator('#consumerScan').click();assert.match(await page.locator('#consumerRecord').textContent(),/Premium Halal food product/);assert.doesNotMatch(await page.locator('#consumerRecord').textContent(),/CN-DEMO|DEMO-SHIPMENT|GHSC-DEMO/i);
  await page.locator('#scrubber').focus();await page.keyboard.press('Home');assert.match(await page.locator('#stageTitle').textContent(),/Origin/);
  if(process.env.AXE_PATH){await page.addScriptTag({path:process.env.AXE_PATH});const results=await page.evaluate(async()=>await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}}));fs.writeFileSync(`browser-results/journey-axe-${width}.json`,JSON.stringify(results,null,2));assert.deepEqual(results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),[]);}
  assert.deepEqual(errors,[]);await page.screenshot({path:`browser-results/journey-${width}.png`,fullPage:true});await page.close();
 }
 console.log('Journey interactions, keyboard, typography and states passed at all 4 widths.');
} finally {await browser.close();}
