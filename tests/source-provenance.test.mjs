import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createHash} from 'node:crypto';

const json=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const binding=json('config/source-binding.json');
const publicCommit=binding.public_site_commit||binding.commit;
test('current implementation provenance is coherent and the public site is explicitly pinned to its target snapshot',()=>{
  assert.match(binding.commit,/^[a-f0-9]{40}$/);
  assert.match(publicCommit,/^[a-f0-9]{40}$/);
  assert.equal(binding.repository,'mavericken777/GlobalHalalDigitalTrust');
  assert.equal(binding.branch,'main');
  assert.equal(binding.freeze,'master-standards-stack/verified-2026-09-17/');
  assert.equal(binding.authority_effect,'none');
  assert.equal(json('config/current-target-architecture-2026-09-30.json').source_commit,binding.commit);
  assert.equal(json('config/target-extension-schemas-2026-09-30.json').source_commit,binding.commit);
  assert.equal(json('config/canonical-mirror-manifest.json').canonical_commit,binding.commit);
  assert.equal(json('ghscl-website/ecosystem.en.json').canonicalCommit,publicCommit);
  const manifest=json('ghscl-website/source-manifest.json');
  assert.equal(manifest.canonical_commit,publicCommit);
  for(const source of manifest.sources) assert.equal(source.url,`https://github.com/${binding.repository}/blob/${publicCommit}/${source.path}`);
  const site=json('ghscl-website/ecosystem.en.json');
  for(const name of ['index',...site.pages.map(p=>p.slug)]) {
    const html=fs.readFileSync(`ghscl-website/${name}.html`,'utf8');
    const urls=[...html.matchAll(/GlobalHalalDigitalTrust\/(?:blob|tree)\/([a-f0-9]{40})/g)];
    assert.ok(urls.length,name+' needs source provenance');
    for(const [,sha] of urls) assert.equal(sha,publicCommit,name);
  }
});
test('mirror blob IDs verify exact canonical bytes, not just renamed provenance',()=>{
  for(const m of json('config/canonical-mirror-manifest.json').mirrors) {
    const bytes=fs.readFileSync(m.amanah_path);
    const git=createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
    assert.equal(git,m.canonical_blob_sha,m.canonical_path);
  }
});
