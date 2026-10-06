import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('current controlling handoff is the 100% end-to-end platform prompt',()=>{
  const readme=fs.readFileSync('README.md','utf8');
  const prompt=fs.readFileSync('docs/AMANAH_100_PERCENT_END_TO_END_MASTER_EXECUTION_PROMPT_2026-10-07.md','utf8');
  const china=fs.readFileSync('docs/AMANAH_CHINA_TRIP_MASTER_DELIVERY_PROMPT_2026-10-07.md','utf8');
  const website=fs.readFileSync('docs/operations/WEBSITE_BRIEF_2026-10-05.md','utf8');

  assert.match(readme,/100% End-to-End Master Execution Prompt/);
  assert.match(prompt,/COMPLETE MALAYSIAN \/ JAKIM HALAL FRAMEWORK/);
  assert.match(prompt,/GCC IMPORTER — DEDICATED PLATFORM EXPERIENCE/);
  assert.match(prompt,/RETAILER \/ MARKETPLACE \/ E-COMMERCE — DEDICATED PLATFORM EXPERIENCE/);
  assert.match(prompt,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(prompt,/China → GCC direct/);
  assert.match(prompt,/17 is not a permanent ceiling|not be conceptually hard-coded to a permanent number/i);
  assert.match(china,/100% END-TO-END MASTER EXECUTION PROMPT/);
  assert.match(website,/no oversized decorative shield/i);
  assert.match(website,/Arial \/ Helvetica \/ neutral sans-serif/);
  assert.match(website,/GCC importer — onboarding, pre-arrival, receiving, quarantine/i);
  assert.match(website,/retailer \/ marketplace \/ e-commerce/i);
});

test('destination-market experiences are first-class repository deliverables',()=>{
  for(const path of [
    'app/(protected)/ahte/gcc-importer/page.tsx',
    'app/(protected)/ahte/retail-market/page.tsx',
    'docs/gcc/GCC_IMPORTER_DISTRIBUTOR_RETAILER_PLAYBOOK_2026-10-07.md'
  ]) assert.ok(fs.existsSync(path), path);

  const nav=fs.readFileSync('config/platform-navigation.ts','utf8');
  assert.match(nav,/\/ahte\/gcc-importer/);
  assert.match(nav,/\/ahte\/retail-market/);

  const publicConfig=JSON.parse(fs.readFileSync('ghscl-website/ecosystem.en.json','utf8'));
  const slugs=new Set(publicConfig.pages.map(p=>p.slug));
  assert.ok(slugs.has('gcc-importer'));
  assert.ok(slugs.has('retail-market'));
});
