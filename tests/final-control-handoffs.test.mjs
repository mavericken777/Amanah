import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('current controlling project descriptions express end-to-end monitoring and certification workflow',()=>{
  const readme=fs.readFileSync('README.md','utf8');
  const binding=fs.readFileSync('docs/ahte/SOURCE_BINDING.md','utf8');
  const site=fs.readFileSync('scripts/build-trust-journey.mjs','utf8');
  for(const source of [readme,binding,site]) {
    assert.match(source,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
    assert.match(source,/China → GCC direct/);
  }
  for(const source of [readme,binding]) {
    assert.match(source,/JAKIM, JAIN\/JAIM, muftis, scholars/);
    assert.match(source,/continuous end-to-end assurance|continuously monitors/i);
  }
  assert.match(readme,/PHC and JAKIM work in parallel/i);
  assert.match(binding,/PHC and JAKIM operate in parallel/i);
});

test('destination-market experiences are first-class repository deliverables',()=>{
  for(const path of ['app/(protected)/ahte/gcc-importer/page.tsx','app/(protected)/ahte/retail-market/page.tsx','docs/gcc/GCC_IMPORTER_DISTRIBUTOR_RETAILER_PLAYBOOK_2026-10-07.md']) assert.ok(fs.existsSync(path),path);
  const nav=fs.readFileSync('config/platform-navigation.ts','utf8');
  assert.match(nav,/\/ahte\/gcc-importer/); assert.match(nav,/\/ahte\/retail-market/);
});
