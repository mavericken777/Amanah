import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const required=[
  'docs/sop/AMANAH_SOP_LIBRARY_MASTER_2026-10-03.md',
  'docs/mission/CHINA_MISSION_EXECUTIVE_PACK_2026-10-03.md',
  'docs/mission/CHINA_MISSION_MEETING_BRIEF_BOOK_2026-10-03.md',
  'docs/mission/OBJECTION_HANDLING_BOOK_2026-10-03.md',
  'docs/operations/CROSS_CONSISTENCY_QA_2026-10-03.md',
  'docs/operations/AMANAH_69_BATCH_56_60_2026-10-03.md'
];

test('items 56-60 controlled deliverables exist',()=>{
  for(const p of required) assert.ok(fs.existsSync(p),'missing '+p);
});

test('SOP library preserves canonical authority and evidence controls',()=>{
  const s=fs.readFileSync(required[0],'utf8');
  assert.match(s,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(s,/NOT_DETECTED ≠ HALAL/);
  assert.match(s,/ObjectID \+ EventID \+ EvidenceID \+ ActorID \+ Timestamp \+ IntegrityProof/);
  assert.match(s,/UNCONFIGURED → DEVELOPMENT → SANDBOX → PENDING_AUTHORIZATION → PRODUCTION/);
});

test('China mission pack does not fabricate mission readiness',()=>{
  const s=fs.readFileSync(required[1],'utf8');
  assert.match(s,/11–18 October 2026/);
  assert.match(s,/planning records, not independent proof/);
  assert.match(s,/Shipment 001.*NOT-INSTANTIATED/s);
  assert.match(s,/Do not claim:[\s\S]*AI certification/);
});

test('meeting briefs preserve partner decision boundaries',()=>{
  const s=fs.readFileSync(required[2],'utf8');
  assert.match(s,/NOT_DETECTED ≠ HALAL/);
  assert.match(s,/Sinotrans custody evidence supports assurance; it does not create Halal certification or sovereign customs release/);
  assert.match(s,/Sovereign release remains with the port\/customs authority/);
});

test('objection book answers core misrepresentation risks',()=>{
  const s=fs.readFileSync(required[3],'utf8');
  assert.match(s,/Does AI certify Halal/);
  assert.match(s,/Hash proves integrity|hash proves integrity/i);
  assert.match(s,/Is Shipment 001 already real/);
  assert.match(s,/No\. It remains \*\*NOT-INSTANTIATED\*\*/);
});

test('cross-consistency QA enforces canonical architecture',()=>{
  const s=fs.readFileSync(required[4],'utf8');
  assert.match(s,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(s,/China → GCC direct/);
  assert.match(s,/inserts NurAI as a required authority hop/);
  assert.match(s,/represents a sandbox\/development receipt as production/);
});

test('pending file contains no escaped newline artifacts',()=>{
  const s=fs.readFileSync('docs/operations/PENDING.md','utf8');
  assert.equal(s.includes('\\n'),false);
});

test('execution register advances items 56-60',()=>{
  const s=fs.readFileSync('docs/operations/AMANAH_69_EXECUTION_REGISTER_2026-10-02.md','utf8');
  assert.match(s,/56–60 .*COMPLETE TO PROJECT CONTROL/);
  assert.match(s,/61–65 /);
});
