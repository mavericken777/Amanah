import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=p=>fs.readFileSync(p,'utf8');

test('viewer-facing authentication and public shell hide engineering status chatter',()=>{
  const auth=read('components/auth-story.tsx');
  const shell=read('scripts/refresh-ecosystem-shell.mjs');
  assert.doesNotMatch(auth,/CONNECTOR:\s*PENDING AUTHORIZATION/i);
  assert.match(auth,/AUTHORITY CONNECTIVITY/i);
  assert.doesNotMatch(shell,/Platform foundations\s*·\s*Canonical|Freeze:\s*verified-/i);
});

test('public and flagship journeys are presentation-safe and automated',()=>{
  const home=read('ghscl-website/index.html');
  const journey=read('ghscl-website/journey.js');
  const app=read('platinum-site/src/App.tsx');
  for(const text of [home,journey,app]) {
    assert.doesNotMatch(text,/CN-DEMO|GHSC-DEMO|DEMO-SHIPMENT|DIGITAL TRUST PASSPORT/i);
  }
  assert.match(home,/Automatic guided walkthrough|automatically/i);
  assert.match(home,/max="19"/);
  assert.match(journey,/stages:\s*\[/);
  assert.match(app,/journey-playback/);
});
