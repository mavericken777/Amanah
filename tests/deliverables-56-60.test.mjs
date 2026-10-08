import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const sources=['README.md','docs/operations/STATUS.md','docs/architecture/PLATFORM_ARCHITECTURE.md','docs/ahte/SOURCE_BINDING.md'];
const current=sources.map(p=>fs.readFileSync(p,'utf8')).join('\n');
test('current platform model covers end-to-end assurance and certification decisions',()=>{
  for(const phrase of ['AHTE ⇄ Direct JAKIM API ⇄ JAKIM','China → GCC direct','PHC and JAKIM','JAKIM/JAIN/JAIM','real-time monitoring','laboratory','Command Center']) assert.ok(current.toLowerCase().includes(phrase.toLowerCase()),'missing '+phrase);
});
test('evidence model supports certified product and premise monitoring',()=>{
  assert.match(current,/SKU/i); assert.match(current,/premises/i); assert.match(current,/award and revocation/i);
  assert.match(current,/AI\/ML/);
  assert.match(current,/NOT DETECTED|NOT_DETECTED ≠ HALAL/i);
});
