import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(readFileSync(new URL('config/canonical-mirror-manifest.json',root),'utf8'));
for(const entry of manifest.mirrors){
  test('canonical source binding: '+entry.amanah_path,()=>{
    const actual=createHash('sha256').update(readFileSync(new URL(entry.amanah_path,root))).digest('hex');
    assert.equal(actual,entry.sha256,'Mirror differs from '+entry.canonical_path+' at '+manifest.canonical_commit);
  });
}
