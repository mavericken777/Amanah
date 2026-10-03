import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const read=(p)=>fs.readFileSync(p,'utf8');

test('current-state controls contain no stale runtime or closure claims',()=>{
  const readme=read('README.md');
  const pending=read('docs/operations/PENDING.md');
  const human=read('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-03.md');
  const machine=JSON.parse(read('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-02.json'));

  assert.match(readme,/120 public tables; RLS enabled on all 120/);
  assert.doesNotMatch(readme,/106 public base tables; RLS enabled on all 106/);

  assert.match(pending,/authenticated production UAT identities\/roles and stakeholder acceptance/);
  assert.doesNotMatch(pending,/production Amanah hosting authorization/);

  assert.match(human,/Final exact-head CI and merge are verified\./);
  assert.doesNotMatch(human,/subject to final exact-head CI and merge/i);

  assert.match(machine.programme_status,/69\/69 COMPLETE TO PROJECT-CONTROLLED SCOPE/);
  assert.match(machine.programme_status,/FINAL EXACT-HEAD CI \+ MERGE VERIFIED/);
  assert.doesNotMatch(machine.programme_status,/SUBJECT TO FINAL EXACT-HEAD CI/);
});
