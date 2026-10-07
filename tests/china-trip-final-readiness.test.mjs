import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');
const publicRoutes=[
  'ghscl-website/laboratory.html',
  'ghscl-website/hardware.html',
  'ghscl-website/gcc-importer.html',
  'ghscl-website/distributor.html',
  'ghscl-website/retail-market.html',
  'ghscl-website/interoperability.html',
  'ghscl-website/cybersecurity.html'
];

test('China Mission public runbook routes are materialized in the repository',()=>{
  for(const p of publicRoutes) assert.ok(fs.existsSync(p),p);
  const runbook=read('docs/mission/CHINA_MISSION_PUBLIC_DEMO_RUNBOOK_2026-10-07.md');
  for(const p of publicRoutes) assert.ok(runbook.includes(p.replace('ghscl-website/','')),p);
});

test('protected application exposes one-click tour and first-class distributor',()=>{
  assert.ok(fs.existsSync('app/(protected)/ahte/platform-tour/page.tsx'));
  assert.ok(fs.existsSync('app/(protected)/ahte/distributor/page.tsx'));
  const nav=read('config/platform-navigation.ts');
  for(const route of ['/ahte/platform-tour','/ahte/gcc-importer','/ahte/distributor','/ahte/retail-market']) assert.ok(nav.includes(route),route);
  const ahte=read('app/(protected)/ahte/page.tsx');
  for(const route of ['/ahte/platform-tour','/ahte/gcc-importer','/ahte/distributor','/ahte/retail-market']) assert.ok(ahte.includes(route),route);
});

test('trip demonstration preserves synthetic-record and real-pilot boundaries',()=>{
  const tour=read('app/(protected)/ahte/platform-tour/page.tsx');
  assert.match(tour,/CN-DEMO-24001/);
  assert.match(tour,/DEMO-SHIPMENT-001/);
  assert.match(tour,/Shipment 001 remains NOT-INSTANTIATED/);
  assert.match(tour,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(tour,/China → GCC direct/);
});

test('distributor workspace is operationally first-class',()=>{
  const distributor=read('app/(protected)/ahte/distributor/page.tsx');
  for(const term of ['FEFO/FIFO','custody transfer','retailer allocation','withdrawal','recall']) assert.ok(distributor.toLowerCase().includes(term.toLowerCase()),term);
});

test('unsupported PHC certification-review wording is absent from public source and tracked output',()=>{
  const source=read('ghscl-website/ecosystem.en.json');
  const how=read('ghscl-website/how-it-works.html');
  const stale='PHC + JAKIM Mufti / scholars / authorised Halal officers human review';
  assert.ok(!source.includes(stale));
  assert.ok(!how.includes(stale));
  assert.match(source,/Authorised competent-authority human review/);
});

test('public sitemap contains complete trip-facing module routes',()=>{
  const map=read('ghscl-website/sitemap.xml');
  for(const p of publicRoutes) assert.ok(map.includes(p.replace('ghscl-website/','')),p);
  assert.ok(map.includes('china-mission.html'));
});
