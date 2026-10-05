import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('ghscl-website/index.html','utf8');
const css=fs.readFileSync('ghscl-website/journey.css','utf8');
test('complete connected product journey and authority boundary',()=>{
 for(const id of ['top','journey','origin','audit','laboratory','standards','warehouse','logistics','ports','route','monitoring','exceptions','gcc','consumer','architecture','actors','vision']) assert.ok(html.includes('id="'+id+'"'),id);
 assert.equal((html.match(/<h1\b/g)||[]).length,1);
 for(const phrase of ['CN-DEMO-24001','DEMO-SHIPMENT-001','AHTE ⇄ Direct JAKIM API ⇄ JAKIM','China → GCC direct','NOT_DETECTED ≠ HALAL','NOT-INSTANTIATED']) assert.ok(html.includes(phrase),phrase);
 assert.doesNotMatch(html,/platinum-shield|HalalShield|ghscl-worldmark|home-hero-image|<canvas|fonts\.googleapis|Cinzel|Cormorant/);
 assert.match(css,/font-family:Arial,\s*Helvetica,\s*sans-serif/);
});
test('single illustrative identity never asserts verified or released outcomes',()=>{
 const context={module:{exports:{}}};vm.runInNewContext(fs.readFileSync('ghscl-website/journey.js','utf8'),context);
 const data=context.module.exports;
 assert.equal(data.batch,'CN-DEMO-24001');assert.equal(data.shipment,'DEMO-SHIPMENT-001');assert.equal(data.stages.length,13);assert.equal(data.audit.length,14);assert.equal(data.lab.length,10);
 for(const s of data.stages)assert.ok(!['VERIFIED','RELEASED'].includes(s[6]));
});
test('interactive controls and accessible responsive rules',()=>{
 for(const id of ['scrubber','passportTabs','auditNext','labSteps','warehouseZones','portNodes','exceptionButtons','consumerScan','actorButtons','architectureButtons'])assert.ok(html.includes('id="'+id+'"'),id);
 for(const rule of ['max-width:1024px','max-width:900px','max-width:767px','max-width:480px','max-width:390px','prefers-reduced-motion:reduce','prefers-reduced-transparency:reduce',':focus-visible'])assert.ok(css.includes(rule),rule);
});
