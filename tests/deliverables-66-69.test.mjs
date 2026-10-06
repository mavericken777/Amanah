import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const prompt='docs/AMANAH_CHINA_TRIP_MASTER_DELIVERY_PROMPT_2026-10-07.md';

test('trip-facing deliverable package has complete acceptance questions',()=>{
  const s=fs.readFileSync(prompt,'utf8');
  for(const q of [
    'What is AMANAH?',
    'What is AHTE?',
    'How does a manufacturer join?',
    'Which Malaysian/JAKIM standards are supported?',
    'How does the laboratory work?',
    'How does the audit work?',
    'How does Sinotrans operate?',
    'What happens at the port?',
    'How does product verification work?',
    'How does the Command Center operate?',
    'How are finance and Takaful connect?'
  ]) {
    const needle=q==='How are finance and Takaful connect?'?'How do finance and Takaful connect?':q;
    assert.ok(s.includes(needle),'acceptance question missing '+needle);
  }
});

test('trip-facing priority puts finished executive deliverables first',()=>{
  const s=fs.readFileSync(prompt,'utf8');
  const deck=s.indexOf('Complete master executive deck');
  const moa=s.indexOf('Counterparty-specific MOA / agreement pack');
  const website=s.indexOf('Website.',s.indexOf('# 25. EXECUTION PRIORITY'));
  assert.ok(deck>=0 && moa>deck && website>moa);
});

test('master indexes expose current trip delivery sources',()=>{
  const human=fs.readFileSync('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-03.md','utf8');
  assert.ok(human.includes('China Trip master delivery prompt'));
  assert.ok(human.includes('Complete Malaysian/JAKIM standards registry'));
  assert.ok(human.includes('Sinotrans A–Z playbook'));
  assert.ok(human.includes('Master legal / contractual pack'));
});
