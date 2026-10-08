import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('current repository overview omits retired package labels and private transaction detail',()=>{
  for(const path of ['README.md','REPO_INDEX.md','docs/ahte/SOURCE_BINDING.md']) {
    const text=fs.readFileSync(path,'utf8');
    assert.doesNotMatch(text,/verified-\d{4}-\d{2}-\d{2}|Shipment\s+001|INST-00\d|\b\d{8}\b|verification.{0,20}open/i,path);
  }
  const site=fs.readFileSync('ghscl-website/index.html','utf8');
  assert.match(site,/GLOBAL HALAL SUPPLY CHAIN LIMITED/);
  assert.match(site,/id="journey"/);
});
