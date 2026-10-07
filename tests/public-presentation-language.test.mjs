import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const files=[
  'platinum-site/src/components/journey/VerificationJourney.tsx',
  'ghscl-website/fixtures/architecture-demo.json',
  'ghscl-website/ecosystem.en.json'
];

test('viewer-facing platform copy contains no development/demo chatter',()=>{
  const text=files.map(f=>fs.readFileSync(f,'utf8')).join('\n');
  assert.doesNotMatch(text,/HCP evidence: illustrative|Production state: no live feed|Sample: demo object|Token: demo only|DEMO · Mixing line|No AI inference is performed in this demonstration|No live upload or authority receipt claimed|Architecture and simulations do not instantiate/i);
});
