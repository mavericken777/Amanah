import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html=fs.readFileSync('ghscl-website/index.html','utf8');
const css=fs.readFileSync('ghscl-website/journey.css','utf8');

test('complete connected product journey and authority boundary',()=>{
  for(const id of ['top','journey','origin','audit','laboratory','standards','warehouse','logistics','ports','route','monitoring','exceptions','gcc','consumer','architecture','actors','vision']) {
    assert.ok(html.includes('id="'+id+'"'),id);
  }
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  for(const phrase of ['AHTE ⇄ Direct JAKIM API ⇄ JAKIM','China → GCC direct','NOT_DETECTED ≠ HALAL']) {
    assert.ok(html.includes(phrase),phrase);
  }
  assert.doesNotMatch(html,/platinum-shield|HalalShield|ghscl-worldmark|home-hero-image|<canvas|fonts\.googleapis|Cinzel|Cormorant/);
  assert.match(css,/font-family:Arial,\s*Helvetica,\s*sans-serif/);
});

test('public journey exposes the complete Malaysian/JAKIM framework rather than MS1500/MS2400 only',()=>{
  const standards=[
    'MS 1500:2019','MS 2400-1:2019','MS 2400-2:2019','MS 2400-3:2019',
    'MS 2424:2019','MS 2634:2019','MS 2636:2019','MS 2738:2023',
    'MS 2803:2025','MS 2393:2023','MS 2627:2017','MS 2627-2:2025',
    'MS 1900:2025','MS 2691:2021','MS 2610:2015','MS 2809:2025','MS 2810:2025'
  ];
  for(const code of standards) assert.ok(html.includes(code),'missing '+code);
  for(const item of ['MPPHM 2020','MHMS 2020','HAS','IHCS']) assert.ok(html.includes(item),'missing '+item);
  assert.ok(html.includes('MS 2683:2017'),'supplemental standard missing');
});

test('journey data remains internally illustrative without asserting verified or released outcomes',()=>{
  const context={module:{exports:{}}};
  vm.runInNewContext(fs.readFileSync('ghscl-website/journey.js','utf8'),context);
  const data=context.module.exports;
  assert.equal(data.stages.length,13);
  assert.equal(data.audit.length,14);
  assert.equal(data.lab.length,10);
  for(const s of data.stages) assert.ok(!['VERIFIED','RELEASED'].includes(s[6]));
});

test('interactive controls and accessible responsive rules',()=>{
  for(const id of ['scrubber','passportTabs','auditNext','labSteps','warehouseZones','portNodes','exceptionButtons','consumerScan','actorButtons','architectureButtons']) assert.ok(html.includes('id="'+id+'"'),id);
  for(const rule of ['max-width:1024px','max-width:900px','max-width:767px','max-width:480px','max-width:390px','prefers-reduced-motion:reduce','prefers-reduced-transparency:reduce',':focus-visible']) assert.ok(css.includes(rule),rule);
});


test('public experience includes first-class GCC importer and retail market routes',()=>{
  assert.ok(fs.existsSync('ghscl-website/gcc-importer.html'),'gcc-importer.html');
  assert.ok(fs.existsSync('ghscl-website/retail-market.html'),'retail-market.html');
  const importer=fs.readFileSync('ghscl-website/gcc-importer.html','utf8');
  const retail=fs.readFileSync('ghscl-website/retail-market.html','utf8');
  assert.match(importer,/Pre-arrival readiness/);
  assert.match(importer,/Importer Command Center/);
  assert.match(retail,/Listing eligibility/);
  assert.match(retail,/Retailer Command Center/);
  assert.match(html,/Importer receiving/);
  assert.match(html,/Retail \/ marketplace workspace/);
});


test('nested public routes retain local Arial typography and recursive normalization',()=>{
  const login=fs.readFileSync('ghscl-website/login/index.html','utf8');
  assert.doesNotMatch(login,/Cinzel|Cormorant|fonts\.googleapis|fonts\.gstatic/);
  assert.match(login,/Arial,\s*Helvetica,\s*sans-serif/);
  const builder=fs.readFileSync('scripts/build-trust-journey.mjs','utf8');
  assert.match(builder,/walkFiles/);
  assert.match(builder,/path\.relative\(path\.dirname\(file\),path\.join\(site,'neutral-font\.css'\)\)/);
});
