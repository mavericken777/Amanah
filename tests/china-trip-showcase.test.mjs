import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const publicRoutes=[
  'ghscl-website/platform-tour.html',
  'ghscl-website/laboratory.html',
  'ghscl-website/hardware.html',
  'ghscl-website/gcc-importer.html',
  'ghscl-website/distributor.html',
  'ghscl-website/retail-market.html',
  'ghscl-website/interoperability.html',
  'ghscl-website/cybersecurity.html'
];

test('China trip presentation routes are materialized in the repository',()=>{
  for(const p of publicRoutes) assert.ok(fs.existsSync(p),p);
  assert.ok(fs.existsSync('app/(protected)/ahte/platform-tour/page.tsx'));
  assert.ok(fs.existsSync('app/(protected)/ahte/distributor/page.tsx'));
});

test('platform tour covers the complete market-side lifecycle without viewer-facing fixture identifiers',()=>{
  const pub=read('ghscl-website/platform-tour.html');
  const app=read('app/(protected)/ahte/platform-tour/page.tsx');
  for(const term of ['China manufacturer','Laboratory','Smart audit','Sinotrans','GCC importer','Distributor','Retail','Consumer','Command Center','Recall']) {
    assert.ok((pub+'\n'+app).toLowerCase().includes(term.toLowerCase()),term);
  }
  assert.doesNotMatch(app,/CN-DEMO|DEMO-SHIPMENT|NOT-INSTANTIATED|Presentation record/i);
  assert.match(app,/Guided platform walkthrough/);
});

test('authority boundary does not regress to unsupported PHC certification wording',()=>{
  const eco=read('ghscl-website/ecosystem.en.json');
  const how=read('ghscl-website/how-it-works.html');
  assert.doesNotMatch(eco,/PHC \+ JAKIM Mufti \/ scholars \/ authorised Halal officers human review/);
  assert.doesNotMatch(how,/PHC \+ JAKIM Mufti \/ scholars \/ authorised Halal officers human review/);
  assert.match(eco,/Authorised competent-authority human review/);
});

test('protected navigation exposes importer distributor retailer and one-click tour',()=>{
  const nav=read('config/platform-navigation.ts');
  for(const route of ['/ahte/platform-tour','/ahte/gcc-importer','/ahte/distributor','/ahte/retail-market']) assert.ok(nav.includes(route),route);
});

test('public sitemap includes all trip-facing first-class routes',()=>{
  const map=read('ghscl-website/sitemap.xml');
  for(const p of publicRoutes) assert.ok(map.includes(p.replace('ghscl-website/','')),p);
});
