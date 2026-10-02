import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const required=[
  'docs/operations/RED_TEAM_REVIEW_2026-10-03.md',
  'docs/operations/VISUAL_QC_REPORT_2026-10-03.md',
  'docs/operations/DOCUMENT_QC_REPORT_2026-10-03.md',
  'docs/operations/CLAIM_VERIFICATION_REGISTER_2026-10-03.md',
  'docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-03.md',
  'docs/operations/AMANAH_69_BATCH_61_65_2026-10-03.md'
];

test('items 61-65 controlled deliverables exist',()=>{
  for(const p of required) assert.ok(fs.existsSync(p),'missing '+p);
});

test('red-team review covers authority evidence deployment and partner risks',()=>{
  const s=fs.readFileSync(required[0],'utf8');
  assert.match(s,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(s,/AI recommendation silently becomes approval/);
  assert.match(s,/Hash treated as proof of real-world truth/);
  assert.match(s,/Vercel failure is hidden as “live”/);
  assert.match(s,/Corporate profile duplicates create two controllers/);
});

test('visual QC preserves corporate identity and no false live authority state',()=>{
  const s=fs.readFileSync(required[1],'utf8');
  assert.match(s,/obsidian black, imperial\/champagne gold/);
  assert.match(s,/no horizontal overflow in browser smoke/i);
  assert.match(s,/no green “connected\/live JAKIM” badge without evidence/);
});

test('document QC establishes one controller per domain',()=>{
  const s=fs.readFileSync(required[2],'utf8');
  assert.match(s,/PR #51 retained\/merged; PR #50 closed as superseded/);
  assert.match(s,/DATA NOT AVAILABLE — SOURCE-LOCKED/);
});

test('claim register separates implemented capability from external activation',()=>{
  const s=fs.readFileSync(required[3],'utf8');
  assert.match(s,/REPOSITORY-IMPLEMENTED CAPABILITY/);
  assert.match(s,/“JAKIM production API is live”/);
  assert.match(s,/PLANNED EXTERNAL INTEGRATION/);
  assert.match(s,/“Shipment 001 exists”/);
});

test('human master index covers mission quality and final batch',()=>{
  const s=fs.readFileSync(required[4],'utf8');
  assert.match(s,/## I\. China Mission/);
  assert.match(s,/## J\. Quality state/);
  assert.match(s,/Next: Items 66–69/);
});

function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    const p=path.join(dir,e.name);
    return e.isDirectory()?walk(p):[p];
  });
}

test('public website contains no retired authority hop or default China-to-Malaysia route',()=>{
  const files=walk('ghscl-website').filter(p=>/\.(html|json|js|css|svg)$/i.test(p));
  const text=files.map(p=>fs.readFileSync(p,'utf8')).join('\n');
  assert.doesNotMatch(text,/AHTE\s*⇄\s*NurAI|NurAI\s*⇄\s*Direct JAKIM/i);
  assert.doesNotMatch(text,/China\s*(?:→|->)\s*Malaysia\s*(?:→|->)\s*GCC/i);
  assert.doesNotMatch(text,/AI (?:certifies|certified) Halal/i);
  assert.doesNotMatch(text,/blockchain (?:certifies|certified) Halal/i);
  assert.doesNotMatch(text,/laborator(?:y|ies) (?:certifies|certified) Halal/i);
});

test('execution register advances items 61-65',()=>{
  const s=fs.readFileSync('docs/operations/AMANAH_69_EXECUTION_REGISTER_2026-10-02.md','utf8');
  assert.match(s,/61–65 .*COMPLETE TO PROJECT CONTROL/);
  assert.match(s,/66–69 .*NEXT \/ FINAL EXECUTION BATCH/);
});

test('machine index points to current QA controllers',()=>{
  const idx=JSON.parse(fs.readFileSync('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-02.json','utf8'));
  const d15=idx.deliverables.find(x=>x.id==='D15');
  const d29=idx.deliverables.find(x=>x.id==='D29');
  const d33=idx.deliverables.find(x=>x.id==='D33');
  assert.match(d15.status,/SUPERSEDED/);
  assert.equal(d29.path,'docs/operations/RED_TEAM_REVIEW_2026-10-03.md');
  assert.equal(d33.path,'docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-03.md');
});
