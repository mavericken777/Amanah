import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const files=['RISK_REGISTER.md','PROJECT_OVERVIEW.md','BUDGET_AND_EXPENSES.md','DOCUMENTS_AND_COMPLIANCE.md','TEAM_AND_RESPONSIBILITIES.md'];

test('China mission root pack is practical, current and presentation-ready',()=>{
  for(const file of files){
    const text=fs.readFileSync(file,'utf8');
    assert.doesNotMatch(text,/SOURCE-LOCKED|OPEN GATE|CONTROLLING mission|NAMES SOURCE-LOCKED/i);
  }

  const overview=fs.readFileSync('PROJECT_OVERVIEW.md','utf8');
  assert.match(overview,/end-to-end operational and digital trust platform/i);
  assert.match(overview,/registry-driven standards model/i);
  assert.match(overview,/MS 1500 and MS 2400/i);
  assert.match(overview,/MPPHM 2020/);
  assert.match(overview,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(overview,/China → GCC direct/);

  const risk=fs.readFileSync('RISK_REGISTER.md','utf8');
  assert.match(risk,/CM-R08/);
  assert.match(risk,/Confirm before signing/);

  const budget=fs.readFileSync('BUDGET_AND_EXPENSES.md','utf8');
  assert.match(budget,/Flights \/ rail/);
  assert.match(budget,/Meeting venues \/ event setup/);

  const docs=fs.readFileSync('DOCUMENTS_AND_COMPLIANCE.md','utf8');
  assert.match(docs,/MOA \/ legal execution copies/);
  assert.match(docs,/Mandarin summaries/);

  const team=fs.readFileSync('TEAM_AND_RESPONSIBILITIES.md','utf8');
  assert.match(team,/Legal \/ MOA lead/);
  assert.match(team,/Laboratory lead/);
  assert.match(team,/Sinotrans \/ logistics lead/);
});
