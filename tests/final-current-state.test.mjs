import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=(p)=>fs.readFileSync(p,'utf8');

test('current presentation state is China-trip focused and free of stale programme closure walls',()=>{
  const readme=read('README.md');
  const status=read('docs/operations/STATUS.md');
  const pending=read('docs/operations/PENDING.md');
  const human=read('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-03.md');
  const machine=JSON.parse(read('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-02.json'));

  assert.match(readme,/China Trip master delivery prompt/);
  assert.match(readme,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(readme,/China → GCC direct/);
  assert.match(status,/standards architecture is registry-driven/i);
  assert.match(status,/17-standard operating catalogue/i);
  assert.match(pending,/external activation/i);
  assert.doesNotMatch(readme,/69\/69 COMPLETE|execution register|batch 56|batch 61/i);
  assert.doesNotMatch(status,/69-item|69\/69|exact-head CI/i);
  assert.doesNotMatch(human,/69-item|69\/69|final closure/i);
  assert.equal(machine.platform.standards_count,17);
  assert.equal(machine.platform.authority_topology,'AHTE ⇄ Direct JAKIM API ⇄ JAKIM');
  assert.equal(machine.platform.corridor,'China → GCC direct');
});
