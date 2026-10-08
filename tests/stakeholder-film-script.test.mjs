import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const narration=readFileSync(new URL('../docs/stakeholder-video/AHTE_10_MINUTE_INSTITUTIONAL_NARRATION.txt',import.meta.url),'utf8').replace(/\r\n/g,'\n').trim();
const words=narration.split(/\s+/);

test('institutional documentary narration stays within the ten-minute word band',()=>{
  assert.ok(words.length>=1380 && words.length<=1420, `word count: ${words.length}`);
});
test('narration preserves required institutional and authority language',()=>{
  assert.ok(narration.startsWith('Global Halal Supply Chain Limited, based in Hong Kong'));
  const principle='Evidence before trust. Trust before operational release. Authority before certification.';
  assert.equal(narration.split(principle).length-1,2);
  assert.ok(narration.includes('AI assists. Humans and competent authorities decide.'));
  assert.ok(narration.includes('AHTE ⇄ Direct JAKIM API ⇄ JAKIM'));
  assert.ok(narration.includes('AMANAH does not replace JAKIM, competent Halal authorities, laboratories, auditors, certification bodies, customs authorities, port authorities or Shariah authorities.'));
  assert.equal(narration.split(/\n/).at(-1),'AMANAH — Global Halal Digital Trust.');
});
test('plain narration paragraphs contain two to four spoken sentences',()=>{
  const paragraphs=narration.split(/\n\n/);
  for(const [index,paragraph] of paragraphs.entries()) {
    const sentences=paragraph.match(/[.!?](?:[”’])?(?=\s|$)/g)||[];
    assert.ok(sentences.length>=2 && sentences.length<=4, `paragraph ${index+1}: ${sentences.length} sentences`);
  }
});
