import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

const base='ghscl-website';
const data=JSON.parse(fs.readFileSync(path.join(base,'ecosystem.en.json'),'utf8'));
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
    assert.match(html,/Skip to content/);assert.match(html,/AI assists\. Humans decide\./);
  }
});

test('source links bind to the reviewed canonical tree and protected text is not copied',()=>{
  assert.equal(data.canonicalCommit,'3d5cc29fabf7c3ed0da20cd938219fed83e74830');
  const manifest=JSON.parse(fs.readFileSync(path.join(base,'source-manifest.json'),'utf8'));
  assert.equal(manifest.canonical_commit,data.canonicalCommit);
  for(const p of data.pages)for(const source of p.sources) {
    const record=manifest.sources.find(r=>r.path===source);
    assert.ok(record,`missing reviewed source ${source}`);
    assert.match(record.sha256_local_reference,/^[a-f0-9]{64}$/);
    assert.ok(record.url.includes(data.canonicalCommit));
  }
  const all=data.pages.map(p=>JSON.stringify(p)).join('\n');
  for(const term of ['PHC','GHSCL','AHTE','Authority Gateway','HCP','SCCP','MPPHM','MHMS','Sinotrans','accreditation','custody','supersession','re-verification'])assert.ok(all.includes(term),term);
});

test('demo architecture never fabricates real records or authority receipts',()=>{
  const fixture=JSON.parse(fs.readFileSync(path.join(base,'fixtures/architecture-demo.json'),'utf8'));
  assert.equal(fixture.environment,'demo');assert.equal(fixture.simulated,true);
  assert.equal(fixture.chains.length,4);
  for(const n of fixture.nodes)assert.ok(n.evidence&&n.relations&&n.state);
  assert.match(fixture.audit.at(-1).proof,/No live upload or authority receipt/);
  const js=fs.readFileSync(path.join(base,'ecosystem.js'),'utf8');
  assert.doesNotThrow(()=>new vm.Script(js));
  assert.doesNotMatch(js,/innerHTML|localStorage|sessionStorage/);
  assert.match(js,/verification_scope!==?'disclosure_token_only'/);
  assert.match(js,/credentials:'omit'/);
  assert.match(js,/controller\.abort/);
});

test('static generator is repeatable and all routes appear in the sitemap',()=>{
  const before=pages.map(p=>fs.readFileSync(path.join(base,p),'utf8'));
  execFileSync(process.execPath,['scripts/build-ecosystem-site.mjs']);
  assert.deepEqual(pages.map(p=>fs.readFileSync(path.join(base,p),'utf8')),before);
  const sitemap=fs.readFileSync(path.join(base,'sitemap.xml'),'utf8');
  for(const p of pages)assert.ok(sitemap.includes(data.baseUrl+p));
  assert.match(fs.readFileSync(path.join(base,'robots.txt'),'utf8'),/Sitemap:/);
});
