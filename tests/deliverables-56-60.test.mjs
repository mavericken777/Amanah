import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const prompt=fs.readFileSync('docs/AMANAH_100_PERCENT_END_TO_END_MASTER_EXECUTION_PROMPT_2026-10-07.md','utf8');

test('controlling platform prompt defines the complete operating system',()=>{
  for(const phrase of [
    'COMPLETE MALAYSIAN / JAKIM HALAL FRAMEWORK',
    'AHTE ⇄ Direct JAKIM API ⇄ JAKIM',
    'China → GCC direct',
    'GCC IMPORTER — DEDICATED PLATFORM EXPERIENCE',
    'RETAILER / MARKETPLACE / E-COMMERCE — DEDICATED PLATFORM EXPERIENCE',
    'AI assists',
    'laboratory',
    'Command Center'
  ]) assert.ok(prompt.toLowerCase().includes(phrase.toLowerCase()),'missing '+phrase);
});

test('authority decisions and evidence provenance remain explicit',()=>{
  assert.match(prompt,/AI assists\. Authorised humans and competent authorities decide/i);
  assert.match(prompt,/ObjectID \+ EventID \+ EvidenceID \+ ActorID \+ Timestamp \+ IntegrityProof/);
  assert.match(prompt,/NOT_DETECTED ≠ HALAL/);
});
