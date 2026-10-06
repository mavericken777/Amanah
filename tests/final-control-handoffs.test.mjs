import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('current handoff is the China-trip master delivery brief',()=>{
  const readme=fs.readFileSync('README.md','utf8');
  const prompt=fs.readFileSync('docs/AMANAH_CHINA_TRIP_MASTER_DELIVERY_PROMPT_2026-10-07.md','utf8');
  const website=fs.readFileSync('docs/operations/WEBSITE_BRIEF_2026-10-05.md','utf8');

  assert.match(readme,/China Trip master delivery prompt/);
  assert.match(prompt,/COMPLETE MALAYSIAN \/ JAKIM HALAL FRAMEWORK/);
  assert.match(prompt,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(prompt,/China → GCC direct/);
  assert.match(website,/no oversized decorative shield/i);
  assert.match(website,/Arial \/ Helvetica \/ neutral sans-serif/);
});
