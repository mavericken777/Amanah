import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href);
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),args:['--no-sandbox']});
const root=(process.env.PREVIEW_URL||'http://127.0.0.1:4173').replace(/\/$/,'');
try{
 for(const [route,locale] of [['hardware','en'],['hardware-zh-Hans','zh-Hans'],['hardware-zh-Hant','zh-Hant'],['hardware-ar','ar']]){
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(`${root}/${route}.html`,{waitUntil:'networkidle'});
  assert.equal(await page.locator('html').getAttribute('lang'),locale);
  assert.equal(await page.locator('.hardware-page').getAttribute('dir'),locale==='ar'?'rtl':'ltr');
  assert.equal(await page.locator('h1').count(),1);
  assert.equal(await page.locator('.hardware-film video').evaluate(v=>v.paused),true);
  assert.equal(await page.locator('#environments button').count(),9);
  await page.locator('#environments button').nth(6).click();
  assert.equal(await page.locator('#environments button').nth(6).getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('#equipment details').count(),8);
  await page.locator('#equipment summary').first().click();
  assert.equal(await page.locator('#equipment details').first().getAttribute('open'),'');
  const buttons=page.locator('#hardware-evidence-flow .process-flow-steps button');
  assert.equal(await buttons.count(),11);
  for(let i=0;i<11;i++){
   await buttons.nth(i).click();
   const selected=(await buttons.nth(i).locator('span').nth(1).textContent()).trim();
   assert.equal((await page.locator('#hardware-evidence-flow .process-story-action').textContent()).trim(),selected);
   assert.ok((await page.locator('#hardware-evidence-flow .process-story-detail').textContent()).length>40);
   assert.equal(await page.locator('#hardware-evidence-flow .process-story-pause').count(),0);
   assert.equal(await page.locator('#hardware-evidence-flow .process-scene-3d').getAttribute('data-scene-paused'),'true');
  }
  await page.locator('#evidence button').nth(1).click();
  const hold=await page.locator('.hardware-event').textContent();
  await page.locator('#evidence button').nth(2).click();
  assert.notEqual(await page.locator('.hardware-event').textContent(),hold);
  for(const width of [360,390,768,1440]){
   await page.setViewportSize({width,height:900});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${route} overflow at ${width}`);
  }
  await page.locator('#capture').scrollIntoViewIfNeeded();
  if(locale==='en'){
   await page.emulateMedia({reducedMotion:'no-preference'});
   const controls=page.locator('#hardware-evidence-flow .process-flow-controls');
   await controls.getByRole('button',{name:'Play',exact:true}).click();
   const before=await page.locator('#hardware-evidence-flow .process-story-action').textContent();
   await page.waitForFunction(previous=>document.querySelector('#hardware-evidence-flow .process-story-action').textContent!==previous,before);
   await controls.getByRole('button',{name:'Pause',exact:true}).click();
   const paused=await page.locator('#hardware-evidence-flow .process-story-action').textContent();
   await page.waitForTimeout(5500);
   assert.equal(await page.locator('#hardware-evidence-flow .process-story-action').textContent(),paused);
   await page.locator('.hardware-languages a[lang="ar"]').click();
   assert.ok(page.url().endsWith('/hardware-ar.html#capture'));
  }
  assert.deepEqual(errors,[]);
  await page.close();
 }
 console.log('Hardware languages, RTL, all device steps, independent scenarios, playback and responsive layout passed.');
}finally{await browser.close();}
