import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const prompt='docs/AMANAH_CHINA_TRIP_MASTER_DELIVERY_PROMPT_2026-10-07.md';

test('China-trip master delivery prompt replaces fragmented execution batches',()=>{
  assert.ok(fs.existsSync(prompt));
  const s=fs.readFileSync(prompt,'utf8');
  for(const phrase of [
    'Master Executive Deck',
    'MOA / Agreement Pack',
    'Sinotrans Pack',
    'CODA Pack',
    'Hardware Catalogue',
    'API / Integration Binder',
    'Cinematic Film Package',
    'Mandarin Adaptation'
  ]) assert.ok(s.includes(phrase),'missing '+phrase);
});

test('China mission materials remain available',()=>{
  for(const p of [
    'docs/mission/CHINA_MISSION_EXECUTIVE_PACK_2026-10-03.md',
    'docs/mission/CHINA_MISSION_MEETING_BRIEF_BOOK_2026-10-03.md',
    'docs/mission/OBJECTION_HANDLING_BOOK_2026-10-03.md',
    'docs/sop/AMANAH_SOP_LIBRARY_MASTER_2026-10-03.md'
  ]) assert.ok(fs.existsSync(p),'missing '+p);
});

test('master prompt preserves core platform identity',()=>{
  const s=fs.readFileSync(prompt,'utf8');
  assert.match(s,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(s,/China → GCC direct/);
  assert.match(s,/NOT_DETECTED ≠ HALAL/);
  assert.match(s,/ObjectID \+ EventID \+ EvidenceID \+ ActorID \+ Timestamp \+ IntegrityProof/);
});
