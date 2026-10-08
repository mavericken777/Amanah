import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('current repository overview is free of retired freeze and private transaction detail',()=>{
  for(const path of ['README.md','REPO_INDEX.md','docs/ahte/SOURCE_BINDING.md']) {
    const text=fs.readFileSync(path,'utf8');
    assert.doesNotMatch(text,/verified-2026-09-17|Shipment 001|INST-003|INST-004|79801544|original verification remains open/i,path);
  }
  const site=fs.readFileSync('ghscl-website/index.html','utf8');
  assert.match(site,/GLOBAL HALAL SUPPLY CHAIN LIMITED/);
  assert.match(site,/id="journey"/);
});
