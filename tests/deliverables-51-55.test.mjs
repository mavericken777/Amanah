import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const required=[
  'docs/localization/MANDARIN_MASTER_ADAPTATION_2026-10-03.md',
  'ghscl-website/i18n/zh-Hans.json',
  'ghscl-website/zh-Hans.html',
  'docs/legal/AMANAH_MASTER_LEGAL_CONTRACTUAL_PACK_2026-10-03.md',
  'docs/legal/CONTRACT_SCHEDULE_REGISTER_2026-10-03.json',
  'docs/commercial/AMANAH_COMMERCIAL_MODEL_UNIT_ECONOMICS_2026-10-03.md',
  'docs/commercial/UNIT_ECONOMICS_MODEL_2026-10-03.json',
  'docs/operations/AMANAH_KPI_SLA_FRAMEWORK_2026-10-03.md',
  'docs/training/AMANAH_TRAINING_ACADEMY_2026-10-03.md',
  'docs/training/ACADEMY_CURRICULUM_2026-10-03.json'
];

test('items 51-55 controlled deliverables exist',()=>{
  for(const p of required) assert.ok(fs.existsSync(p),'missing '+p);
});

test('Mandarin adaptation preserves topology corridor and decision boundary',()=>{
  const zh=fs.readFileSync('docs/localization/MANDARIN_MASTER_ADAPTATION_2026-10-03.md','utf8');
  assert.match(zh,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(zh,/中国 → GCC/);
  assert.match(zh,/NOT_DETECTED ≠ HALAL/);
  const data=JSON.parse(fs.readFileSync('ghscl-website/i18n/zh-Hans.json','utf8'));
  assert.equal(data.authority_topology,'AHTE ⇄ Direct JAKIM API ⇄ JAKIM');
});

test('legal pack does not delegate reserved authority',()=>{
  const legal=fs.readFileSync('docs/legal/AMANAH_MASTER_LEGAL_CONTRACTUAL_PACK_2026-10-03.md','utf8');
  assert.match(legal,/do not independently create Halal certification/);
  assert.match(legal,/No simulated receipt may be represented as a production authority or partner response/);
  assert.match(legal,/COUNTERPARTY \+ COUNSEL REVIEW REQUIRED/);
});

test('commercial model uses formulas and explicit validation gate',()=>{
  const model=JSON.parse(fs.readFileSync('docs/commercial/UNIT_ECONOMICS_MODEL_2026-10-03.json','utf8'));
  assert.match(model.formulas.gross_profit,/revenue-direct_cost/);
  assert.match(model.hard_rule,/No numeric price/);
  assert.equal(model.classification,'COMMERCIAL PROPOSAL');
});

test('KPI SLA keeps proposed measures distinct from signed commitments',()=>{
  const kpi=fs.readFileSync('docs/operations/AMANAH_KPI_SLA_FRAMEWORK_2026-10-03.md','utf8');
  assert.match(kpi,/SLAs create commitments only when executed in a contract/);
  assert.match(kpi,/authority decision time kept separate from platform processing time/);
});

test('academy preserves human authority and competence boundaries',()=>{
  const academy=fs.readFileSync('docs/training/AMANAH_TRAINING_ACADEMY_2026-10-03.md','utf8');
  assert.match(academy,/AI may support D0–D2 and configured D4; D5\/D6 reserved/);
  assert.match(academy,/does not confer statutory Halal auditor\/officer authority/);
  const machine=JSON.parse(fs.readFileSync('docs/training/ACADEMY_CURRICULUM_2026-10-03.json','utf8'));
  assert.ok(machine.critical_failures.includes('AI can certify Halal'));
});
