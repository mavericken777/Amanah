import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html=fs.readFileSync('ghscl-website/index.html','utf8');
const css=fs.readFileSync('ghscl-website/journey.css','utf8');

test('complete connected product journey and certification decision workflow',()=>{
  for(const id of ['top','journey','origin','audit','laboratory','standards','warehouse','logistics','ports','route','monitoring','exceptions','gcc','consumer','architecture','actors','vision','exceptionActions','exceptionBlastRadius','governanceMatrix']) {
    assert.ok(html.includes('id="'+id+'"'),id);
  }
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  for(const phrase of ['AHTE ⇄ Direct JAKIM API ⇄ JAKIM','China → GCC direct','NOT_DETECTED ≠ HALAL']) {
    assert.ok(html.includes(phrase),phrase);
  }
  assert.doesNotMatch(html,/platinum-shield|HalalShield|ghscl-worldmark|home-hero-image|<canvas|fonts\.googleapis|Cinzel|Cormorant/);
  assert.match(css,/font-family:Arial,\s*Helvetica,\s*sans-serif/);
});

test('public journey connects applicable Malaysian/JAKIM standards with assurance workflows',()=>{
  const standards=[
    'MS 1500:2019','MS 2400-1:2019','MS 2400-2:2019','MS 2400-3:2019',
    'MS 2424:2019','MS 2634:2019','MS 2636:2019','MS 2738:2023',
    'MS 2803:2025','MS 2393:2023','MS 2627:2017','MS 2627-2:2025',
    'MS 1900:2025','MS 2691:2021','MS 2610:2015','MS 2809:2025','MS 2810:2025'
  ];
  const standardsPage=fs.readFileSync('ghscl-website/standards.html','utf8');
  for(const code of standards) assert.ok(standardsPage.includes(code),'missing '+code);
  for(const item of ['MPPHM 2020','MHMS 2020','HAS','IHCS']) assert.ok(standardsPage.includes(item),'missing '+item);
  assert.ok(standardsPage.includes('MS 2683:2017'),'supplemental standard missing');
});

test('published journey assets use release-versioned URLs',()=>{
  for(const asset of ['journey.css','journey.js','home-menu.js']) {
    const marker=asset+'?v=';
    const offset=html.indexOf(marker);
    assert.ok(offset>=0,'missing cache-versioned '+asset);
    assert.match(html.slice(offset+marker.length,offset+marker.length+40),/^(?:[a-f0-9]{40}|local)/);
  }
});

test('generated public pages omit internal source metadata from visible footers',()=>{
  const pages=['china-gcc','china-mission','command-center','contact','cybersecurity','digital-trust','distributor','ecosystem','finance-takaful','gcc-importer','hardware','how-it-works','interoperability','laboratory','manufacturers','partners','platform-tour','retail-market','smart-audit','traceability','verify'];
  for(const page of pages) {
    const html=fs.readFileSync(`ghscl-website/${page}.html`,'utf8');
    assert.doesNotMatch(html,/<p class="site-provenance">|Platform foundations\s*·\s*Canonical/i,page);
    assert.match(html,/<h2>How this capability connects<\/h2>/,`${page} should explain its platform connection in stakeholder language`);
  }
});

test('website policy preserves the current ecosystem catalogue version',()=>{
  const policy=fs.readFileSync('scripts/apply-website-policy.mjs','utf8');
  assert.doesNotMatch(policy,/data\.version\s*=/,'copy policy must not downgrade or silently rewrite catalogue version metadata');
});

test('public journey models the complete lifecycle without asserting sovereign or operational release',()=>{
  const context={module:{exports:{}}};
  vm.runInNewContext(fs.readFileSync('ghscl-website/journey.js','utf8'),context);
  const data=context.module.exports;
  assert.equal(data.stages.length,20);
  assert.equal(data.audit.length,13);
  assert.equal(data.lab.length,17);
  for(const s of data.stages) assert.notEqual(s[6],'RELEASED');
});

test('public homepage contains no engineering/demo presentation leakage and auto-plays all 20 stages',()=>{
  for(const term of ['CN-DEMO-24001','DEMO-shipment-workflow','DIGITAL TRUST PASSPORT','DEMO RELEASE REQUEST GENERATED','DEMO TOPOLOGY','PROJECT-REPO','Source foundation:','illustrative','simulation','prototype']) assert.ok(!html.toLowerCase().includes(term.toLowerCase()),term);
  assert.match(html,/id="playJourney"/);
  assert.match(html,/id="restartJourney"/);
  assert.match(html,/GLOBAL HALAL SUPPLY CHAIN LTD/,'legal company name must appear in the primary brand');
  assert.match(html,/class="hero-scene"/,'hero needs an informative animated route visual');
  assert.match(html,/id="journeyScene"[^>]+data-process-scene="true"/,'the complete journey must use the animated 3D scene');
  assert.match(html,/process-scene-3d process-scene-hero/,'the landing hero must use an informative 3D scene');
  assert.doesNotMatch(html,/<svg[^>]+class="journey-world"|id="platformCargo"/,'retired ornamental / 2D journey artwork must not return');
  assert.match(html,/data-stage-label="corridor · full China to GCC journey"/,'the 3D hero must identify the live process it represents');
  assert.match(html,/id="stageDetail"/,'selected process stages must retain inspectable actor and evidence detail');
  assert.match(html,/JAKIM-certified laborat/);
  const context={module:{exports:{}}};
  vm.runInNewContext(fs.readFileSync('ghscl-website/journey.js','utf8'),context);
  assert.equal(context.module.exports.stages.length,20);
  assert.match(fs.readFileSync('platinum-site/src/App.tsx','utf8'),/journeyPlaying/);
});

test('journey stage changes preserve page position and prevent document-level sideways overflow',()=>{
  const motion=fs.readFileSync('ghscl-website/motion.css','utf8');
  const script=fs.readFileSync('ghscl-website/journey.js','utf8');
  assert.match(motion,/overflow-x:clip/);
  assert.match(motion,/grid-template-columns:minmax\(0,1\.2fr\) minmax\(0,1fr\)/);
  assert.match(motion,/\.content-section\{grid-template-columns:minmax\(0,1fr\) minmax\(0,1\.8fr\)!important\}/);
  assert.match(motion,/\.content-section\{grid-template-columns:minmax\(0,1fr\)!important\}/);
  assert.doesNotMatch(script,/scrollIntoView\(/,'stage navigation must not jump the page away from the hero');
  assert.match(script,/nav\.scrollTo\(/,'keep stage focus inside its horizontal timeline');
});

test('all public pages share the motion system and reduced-motion behavior',()=>{
  const pages=['index.html','china-mission.html','manufacturers.html','laboratory.html','smart-audit.html','gcc-importer.html','distributor.html','retail-market.html','verify.html','login/index.html'];
  for(const page of pages){
    const content=fs.readFileSync('ghscl-website/'+page,'utf8');
    assert.match(content,/motion\.css/,page+' motion stylesheet');
    assert.match(content,/motion\.js/,page+' motion behavior');
  }
  const css=fs.readFileSync('ghscl-website/motion.css','utf8');
  assert.match(css,/perspective:/,'3D process presentation');
  assert.match(css,/prefers-reduced-motion:reduce/,'reduced motion stylesheet');
  assert.match(fs.readFileSync('ghscl-website/journey.js','utf8'),/prefers-reduced-motion: reduce/,'autoplay must respect reduced-motion preference');
});

test('interactive controls and accessible responsive rules',()=>{
  for(const id of ['playJourney','restartJourney','scrubber','passportTabs','auditNext','labSteps','warehouseZones','portNodes','exceptionButtons','consumerScan','actorButtons','architectureButtons']) assert.ok(html.includes('id="'+id+'"'),id);
  for(const rule of ['max-width:1024px','max-width:900px','max-width:767px','max-width:480px','max-width:390px','prefers-reduced-motion:reduce','prefers-reduced-transparency:reduce',':focus-visible']) assert.ok(css.includes(rule),rule);
});


test('public experience includes first-class China Mission, GCC importer and retail market routes',()=>{
  assert.ok(fs.existsSync('ghscl-website/china-mission.html'),'china-mission.html');
  const mission=fs.readFileSync('ghscl-website/china-mission.html','utf8');
  assert.match(mission,/Walk the complete China → GCC platform/);
  assert.match(mission,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(mission,/manufacturer \/ organisation \/ KYC/i);
  assert.match(mission,/GCC importer/i);
  assert.match(mission,/Retailer \/ marketplace/i);
  assert.match(html,/china-mission\.html/);
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

  for (const route of ['laboratory.html','hardware.html','distributor.html','interoperability.html','cybersecurity.html']) {
    assert.ok(fs.existsSync('ghscl-website/' + route), route);
  }
  const laboratory=fs.readFileSync('ghscl-website/laboratory.html','utf8');
  assert.match(laboratory,/NOT_DETECTED ≠ HALAL/);
  assert.match(laboratory,/JAKIM-certified laborat/);
  assert.match(fs.readFileSync('ghscl-website/hardware.html','utf8'),/Device trust and offline continuity/);
  assert.match(fs.readFileSync('ghscl-website/distributor.html','utf8'),/Distributor \/ 3PL operating flow/);
  assert.match(fs.readFileSync('ghscl-website/interoperability.html','utf8'),/REST, SOAP and XML/);
  assert.match(fs.readFileSync('ghscl-website/cybersecurity.html','utf8'),/Zero-trust controls/);
});


test('nested public routes retain local Arial typography and recursive normalization',()=>{
  const login=fs.readFileSync('ghscl-website/login/index.html','utf8');
  assert.doesNotMatch(login,/Cinzel|Cormorant|fonts\.googleapis|fonts\.gstatic/);
  assert.match(login,/Arial,\s*Helvetica,\s*sans-serif/);
  const builder=fs.readFileSync('scripts/build-trust-journey.mjs','utf8');
  assert.match(builder,/walkFiles/);
  assert.match(builder,/path\.relative\(path\.dirname\(file\),path\.join\(site,'neutral-font\.css'\)\)/);
});
