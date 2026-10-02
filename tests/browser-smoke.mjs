import assert from 'node:assert/strict';
import fs from 'node:fs';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const data=JSON.parse(fs.readFileSync('ghscl-website/ecosystem.en.json','utf8'));
fs.mkdirSync('browser-results',{recursive:true});
const browser=await chromium.launch({headless:true});
try {
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
  const context=await browser.newContext({viewport,reducedMotion:'reduce'});
  // Only local fixture servers; no production reads/writes, fonts or disclosure requests.
  await context.route('**/*',route=>{
   const host=new URL(route.request().url()).hostname;
   return ['127.0.0.1','localhost'].includes(host)?route.continue():route.abort();
  });
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const name of ['index',...data.pages.map(p=>p.slug)]) {
   const response=await page.goto(`http://127.0.0.1:8080/${name}.html`);
   assert.equal(response.status(),200,name);
   await page.locator('h1').waitFor();
   assert.equal(await page.locator('h1').count(),1,name);
   assert.ok(await page.locator('h1').isVisible(),name);
   const overflow=await page.evaluate(()=>({
    ok: document.documentElement.scrollWidth<=innerWidth+1,
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth,
    offenders:[...document.querySelectorAll('body *')].map(el=>{const r=el.getBoundingClientRect();return {tag:el.tagName,cls:el.className||'',id:el.id||'',left:r.left,right:r.right,width:r.width};}).filter(x=>x.left<-1||x.right>innerWidth+1).slice(0,20)
   }));
   assert.ok(overflow.ok,name+' horizontal overflow: '+JSON.stringify(overflow));
   if(await page.locator('.source-panel').count()) {
    const contrast=await page.locator('.source-panel').evaluate(panel=>{
     function luminance(color) {
      const rgb=color.match(/[\d.]+/g).slice(0,3).map(Number).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;});
      return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
     }
     const background=luminance(getComputedStyle(panel).backgroundColor);
     return Math.min(...[...panel.querySelectorAll('a,p,h2')].map(el=>{const text=luminance(getComputedStyle(el).color);return (Math.max(text,background)+.05)/(Math.min(text,background)+.05);}));
    });
    assert.ok(contrast>=4.5,name+' source-panel contrast: '+contrast);
   }
   await page.locator('.site-menu summary').click();
   assert.ok(await page.locator('.site-menu').getAttribute('open')!==null,name+' menu');
   await page.keyboard.press('Escape');
   assert.equal(await page.locator('.site-menu').getAttribute('open'),null,name+' escape');
   if(await page.locator('#graphNodes').count()) {
    await page.locator('#graphNodes button').first().waitFor();
    await page.locator('#graphNodes button').last().click();
    assert.equal(await page.locator('#graphNodes button').last().getAttribute('aria-pressed'),'true');
   }
   if(await page.locator('#chainButtons').count()) {
    await page.locator('#chainButtons button').last().click();
    assert.equal(await page.locator('#chainButtons button').last().getAttribute('aria-pressed'),'true');
   }
   if(await page.locator('#auditNext').count()) {
    await page.locator('#auditNext').click();
    await page.locator('#auditReset').click();
    assert.equal(await page.locator('#auditPrevious').isDisabled(),true);
   }
   if(await page.locator('#onboardingChecklist').count()) {
    await page.locator('#onboardingChecklist input').first().check();
    assert.match(await page.locator('#readinessSummary').textContent(),/^1 of /);
   }
   if(name==='verify') {
    await page.locator('#verificationToken').fill('https://untrusted.example/?token=invalid');
    await page.locator('#verifyButton').click();
    assert.match(await page.locator('#verificationResult').textContent(),/known AHTE verification service/);
   }
   await page.screenshot({path:`browser-results/${name}-${viewport.width}.png`,fullPage:true});
   assert.deepEqual(errors,[],name+' JavaScript errors');
  }
  await context.close();
 }
 const page=await browser.newPage();
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]) {
  await page.setViewportSize(viewport);
  for(const route of ['/login','/auth/sign-up']) {
   await page.goto('http://127.0.0.1:3000'+route);
   await page.locator('h1').waitFor();
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route+' auth overflow');
   assert.ok(await page.locator('input[type="email"]').isVisible());
   assert.ok(await page.locator('input[type="password"]').isVisible());
   await page.screenshot({path:`browser-results/auth-${route.split('/').at(-1)}-${viewport.width}.png`,fullPage:true});
  }
 }
 const protectedPages=[];
 function walk(dir) {
  for(const item of fs.readdirSync(dir,{withFileTypes:true})) {
   const p=dir+'/'+item.name;
   if(item.isDirectory())walk(p);
   else if(item.name==='page.tsx')protectedPages.push('/'+p.replace('app/(protected)/','').replace('/page.tsx','').replace(/\[[^\]]+\]/g,'00000000-0000-0000-0000-000000000001'));
  }
 }
 walk('app/(protected)');
 for(const route of [...protectedPages,'/search?q=invoice&status=open','/ahte/shipments?status=HOLD']) {
  await page.goto('http://127.0.0.1:3000'+route);
  const url=new URL(page.url());
  assert.equal(url.pathname,'/login',route);
  assert.equal(url.searchParams.get('next'),route,route+' return path');
  assert.ok(await page.locator('input[type="email"]').isVisible());
 }
 for(const route of ['/api/v1/projects','/api/v1/tasks']) {
  const response=await page.request.get('http://127.0.0.1:3000'+route);
  assert.equal(response.status(),401,route);
 }
 console.log(`Browser smoke passed: ${data.pages.length+1} public pages × 2 viewports; ${protectedPages.length} protected routes; anonymous API guards. No production transaction was performed.`);
} finally {await browser.close();}
