import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const base='ghscl-website';
const runBuild=()=>{
  execFileSync(process.execPath,['scripts/build-ecosystem-site.mjs'],{stdio:'pipe'});

};
runBuild();
const data=JSON.parse(fs.readFileSync(path.join(base,'ecosystem.en.json'),'utf8'));
const binding=JSON.parse(fs.readFileSync('config/source-binding.json','utf8'));
const pages=['index.html',...data.pages.map(p=>p.slug+'.html')];

test('every public route has resolvable assets, navigation and fragment targets',()=>{
  for(const name of pages) {
    const html=fs.readFileSync(path.join(base,name),'utf8');
    assert.equal((html.match(/<h1\b/g)||[]).length,1,name);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,`${name}: duplicate IDs`);
    for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const ref=match[1];if(/^(https:|data:)/.test(ref))continue;
      const [file,fragment]=ref.split('#');
      const target=path.join(base,file||name);
      assert.ok(fs.existsSync(target),`${name}: missing ${ref}`);
      if(fragment)assert.match(fs.readFileSync(target,'utf8'),new RegExp(`id="${fragment}"`),`${name}: missing #${fragment}`);
    }
    for(const [url] of data.navigation)assert.ok(html.includes(`href="${url}"`),`${name}: missing ${url}`);
    assert.match(html,/rel="canonical"/);assert.match(html,/property="og:title"/);assert.match(html,/application\/ld\+json/);
    assert.match(html,/Skip to content/);assert.match(html,/competent authorities decide|competent authority|Human authority/i);
  }
});

test('public source links bind to the declared public GHDT target snapshot and avoid retired topology/sources',()=>{
  assert.equal(data.canonicalCommit,binding.public_site_commit||binding.commit);
  const all=data.pages.map(p=>JSON.stringify(p)).join('\n');
  for(const term of ['PHC','GHSCL','AHTE','Direct JAKIM API','HCP','SCCP','Sinotrans','custody','re-verification','Command Center','Preemptive Strategy','Takaful','tokenomics','port/customs'])assert.ok(all.toLowerCase().includes(term.toLowerCase()),term);
  assert.ok(!all.includes('Secure Authority Gateway ⇅'),'stale public authority gateway topology');
  const allSources=data.pages.flatMap(p=>p.sources);
  assert.ok(!allSources.some(s=>s.includes('master-standards-stack/china-execution-pack/')),'retired lower-case China execution pack must not be a current source');
  assert.ok(!allSources.some(s=>s.includes('DIRECT_JAKIM_API_ALIGNMENT_ADDENDUM')),'retired lab alignment addendum must not be a current source');
  const corridor=data.pages.find(p=>p.slug==='china-gcc');
  const route=corridor?.sections.find(s=>s.id==='route');
  assert.ok(route?.flow?.includes('China origin'),'China origin missing from corridor route');
  assert.ok(route?.flow?.some(v=>String(v).includes('GCC port')),'GCC destination missing from corridor route');
  assert.ok(!route?.flow?.some(v=>String(v).includes('Malaysia')),'Malaysia must not be a default physical hop');
  for(const p of data.pages)for(const source of p.sources) assert.ok(source && !source.includes('..'),`invalid source ${source}`);
});

test('public architecture retains the required current target planes',()=>{
  const bySlug=new Map(data.pages.map(p=>[p.slug,p]));
  for(const slug of ['ecosystem','digital-trust','command-center','traceability','smart-audit','china-gcc','manufacturers','finance-takaful','verify'])assert.ok(bySlug.has(slug),slug);
  const finance=JSON.stringify(bySlug.get('finance-takaful'));
  for(const term of ['Shariah Financing API','Takaful','Tokenomics'])assert.ok(finance.toLowerCase().includes(term.toLowerCase()),term);
  const command=JSON.stringify(bySlug.get('command-center'));
  for(const term of ['predictive','preemptive','Sinotrans','laboratory','GCC'])assert.ok(command.toLowerCase().includes(term.toLowerCase()),term);
});

test('demo architecture never fabricates real records or authority receipts',()=>{
  const fixture=JSON.parse(fs.readFileSync(path.join(base,'fixtures/architecture-demo.json'),'utf8'));
  assert.equal(fixture.environment,'demo');assert.equal(fixture.simulated,true);
  assert.equal(fixture.chains.length,4);
  for(const n of fixture.nodes)assert.ok(n.evidence&&n.relations&&n.state);
  assert.match(fixture.audit.at(-1).proof,/Signed session, synchronization status and authority-workflow handoff remain attributable/);
  assert.match(fixture.audit.at(-1).text,/authorized human authority workflow/);
  assert.doesNotMatch(JSON.stringify(fixture),/fabricated authority receipt|live authority decision|production JAKIM response/i);
  const js=fs.readFileSync(path.join(base,'ecosystem.js'),'utf8');
  assert.doesNotThrow(()=>new vm.Script(js));
  assert.doesNotMatch(js,/innerHTML|localStorage|sessionStorage/);
  assert.match(js,/verification_scope!==?'disclosure_token_only'/);
  assert.match(js,/credentials:'omit'/);
  assert.match(js,/controller\.abort/);
});

test('static generator is repeatable and all routes appear in the sitemap',()=>{
  const before=pages.map(p=>fs.readFileSync(path.join(base,p),'utf8'));
  runBuild();
  assert.deepEqual(pages.map(p=>fs.readFileSync(path.join(base,p),'utf8')),before);
  const sitemap=fs.readFileSync(path.join(base,'sitemap.xml'),'utf8');
  for(const p of pages)assert.ok(sitemap.includes(data.baseUrl+p));
  assert.match(fs.readFileSync(path.join(base,'robots.txt'),'utf8'),/Sitemap:/);
});
