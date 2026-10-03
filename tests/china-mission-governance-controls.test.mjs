import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const files=['RISK_REGISTER.md','PROJECT_OVERVIEW.md','BUDGET_AND_EXPENSES.md','DOCUMENTS_AND_COMPLIANCE.md','TEAM_AND_RESPONSIBILITIES.md'];

test('China mission governance root controls are evidence-bound and current',()=>{
  for(const file of files){
    const text=fs.readFileSync(file,'utf8');
    assert.doesNotMatch(text,/\|\s*TBD\s*\|/);
    assert.doesNotMatch(text,/Project owner:\s*TBD/);
  }
  assert.match(fs.readFileSync('PROJECT_OVERVIEW.md','utf8'),/69-item project-controlled programme is complete/);
  assert.match(fs.readFileSync('RISK_REGISTER.md','utf8'),/CM-R08/);
  assert.match(fs.readFileSync('BUDGET_AND_EXPENSES.md','utf8'),/NO APPROVED NUMERIC BUDGET/);
  assert.match(fs.readFileSync('DOCUMENTS_AND_COMPLIANCE.md','utf8'),/SOURCE-LOCKED: current immigration\/entry requirements/);
  assert.match(fs.readFileSync('TEAM_AND_RESPONSIBILITIES.md','utf8'),/NAMES SOURCE-LOCKED UNTIL CONFIRMED/);
});
