import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('final control handoffs reflect verified programme closure and current external gates',()=>{
  const decisions=fs.readFileSync('DECISIONS.md','utf8');
  const updates=fs.readFileSync('UPDATES.md','utf8');
  const guide=fs.readFileSync('TEAM_GUIDE.md','utf8');
  const closure=fs.readFileSync('docs/operations/AMANAH_69_FINAL_CLOSURE_2026-10-03.md','utf8');
  const gates=fs.readFileSync('docs/operations/EXTERNAL_GATES_RUNBOOK_2026-10-01.md','utf8');

  assert.match(decisions,/D-006/);
  assert.doesNotMatch(decisions,/\|\s*TBD\s*\|/);
  assert.match(updates,/69\/69 COMPLETE TO PROJECT-CONTROLLED SCOPE/);
  assert.doesNotMatch(updates,/Overall status:\s*Setup/);
  assert.match(guide,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(closure,/COMPLETE \/ EXACT-HEAD CI \+ MERGE VERIFIED/);
  assert.doesNotMatch(closure,/SUBJECT TO EXACT-HEAD CI/);
  assert.match(gates,/authenticated production UAT identities\/roles and stakeholder acceptance/);
  assert.doesNotMatch(gates,/OPEN GATE: production Amanah hosting authorization/);
});
