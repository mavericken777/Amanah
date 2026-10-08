import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=(p)=>fs.readFileSync(p,'utf8');

test('current presentation state is end-to-end stakeholder focused and free of stale programme closure walls',()=>{
  const readme=read('README.md');
  const status=read('docs/operations/STATUS.md');
  const pending=read('docs/operations/PENDING.md');
  const human=read('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-03.md');

  assert.match(readme,/100% End-to-End Master Execution Prompt/);
  assert.match(readme,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(readme,/China → GCC direct/);
  assert.match(status,/complete applicable Malaysian\/JAKIM/i);
  assert.match(pending,/engineering work areas/i);
  assert.doesNotMatch(readme,/69\/69 COMPLETE|execution register|batch 56|batch 61/i);
  assert.doesNotMatch(status,/69-item|69\/69|exact-head CI/i);
  assert.doesNotMatch(human,/69-item|69\/69|final closure/i);
  const operating=JSON.parse(read('docs/ahte/MS_OPERATING_SET.json'));
  assert.equal(operating.catalog_count,17);
  assert.match(operating.rule,/registry-driven/i);
});
