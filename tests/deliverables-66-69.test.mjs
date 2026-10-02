import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const required=[
  'docs/operations/DEFINITION_OF_DONE_2026-10-03.md',
  'docs/operations/EXECUTION_PRIORITY_SEQUENCE_2026-10-03.md',
  'docs/operations/STANDING_EXECUTION_INSTRUCTION_2026-10-03.md',
  'docs/operations/FINAL_OPERATING_TEST_2026-10-03.md',
  'docs/operations/AMANAH_69_FINAL_CLOSURE_2026-10-03.md'
];

test('items 66-69 final control artifacts exist',()=>{
  for(const p of required) assert.ok(fs.existsSync(p),'missing '+p);
});

test('definition of done requires usability implementation evidence and validation',()=>{
  const s=fs.readFileSync(required[0],'utf8');
  assert.ok(s.includes('target stakeholder can actually use it'));
  assert.ok(s.includes('Implementation exists where implementation is feasible'));
  assert.ok(s.includes('DATA NOT AVAILABLE — SOURCE-LOCKED'));
  assert.ok(s.toLowerCase().includes('exact-head validation fails'));
});

test('execution sequence preserves mandated order and dependency rule',()=>{
  const s=fs.readFileSync(required[1],'utf8');
  const terms=['Truth baseline','Canonical architecture','China-blocking execution deliverables','Public and executive deliverables','Operational controls','Commercial / legal / assurance','Final QA and hard-freeze discipline'];
  for(const term of terms) assert.ok(s.includes(term),'missing '+term);
  assert.ok(s.includes('Do not advance a downstream artifact by inventing an upstream answer'));
});

test('standing instruction preserves canonical architecture and close-out loop',()=>{
  const s=fs.readFileSync(required[2],'utf8');
  assert.ok(s.includes('AHTE ⇄ Direct JAKIM API ⇄ JAKIM'));
  assert.ok(s.includes('China → GCC direct'));
  assert.ok(s.includes('VERIFY → RECONCILE → EXECUTE → VALIDATE → CROSS-CHECK → AUDIT → CLOSE / OPEN GATE'));
  assert.ok(s.includes('Do not fabricate production responses') || s.includes('Never fabricate production responses'));
});

test('final operating test answers core stakeholder questions',()=>{
  const s=fs.readFileSync(required[3],'utf8');
  assert.ok(s.includes('Who certifies Halal'));
  assert.ok(s.includes('Direct JAKIM production state'));
  assert.ok(s.includes('Shipment 001 real'));
  assert.ok(s.includes('NOT-INSTANTIATED'));
  assert.ok(s.includes('Items 1–69: COMPLETE TO PROJECT-CONTROLLED SCOPE'));
});

test('execution register records 69 of 69 project-controlled closure',()=>{
  const s=fs.readFileSync('docs/operations/AMANAH_69_EXECUTION_REGISTER_2026-10-02.md','utf8');
  assert.ok(s.includes('69/69 COMPLETE TO PROJECT-CONTROLLED SCOPE'));
  assert.match(s,/66–69 .*COMPLETE TO PROJECT CONTROL/);
});

test('master indexes expose final controls',()=>{
  const idx=JSON.parse(fs.readFileSync('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-02.json','utf8'));
  assert.ok(idx.programme_status.includes('69/69 COMPLETE'));
  for(const id of ['D34','D35','D36','D37','D38']) assert.ok(idx.deliverables.some(x=>x.id===id),'missing '+id);
  const human=fs.readFileSync('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-03.md','utf8');
  assert.ok(human.includes('## K. Final programme controls'));
  assert.ok(human.includes('Final operating test'));
});

test('final closure does not close external gates or instantiate Shipment 001',()=>{
  const s=fs.readFileSync(required[4],'utf8');
  assert.ok(s.includes('Genuine authority, partner and transaction dependencies remain external OPEN GATEs'));
  assert.ok(s.includes('Shipment 001: **NOT-INSTANTIATED**'));
  const pending=fs.readFileSync('docs/operations/PENDING.md','utf8');
  assert.ok(pending.includes('Direct JAKIM API endpoints'));
  assert.ok(pending.includes('real Shipment 001 evidence'));
});
