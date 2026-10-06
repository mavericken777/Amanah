import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const prompt=fs.readFileSync('docs/AMANAH_CHINA_TRIP_MASTER_DELIVERY_PROMPT_2026-10-07.md','utf8');
const operating=JSON.parse(fs.readFileSync('docs/ahte/MS_OPERATING_SET.json','utf8'));

test('complete Malaysian/JAKIM standards catalogue is first-class in the China-trip prompt',()=>{
  assert.equal(operating.catalog_count,17);
  assert.equal(operating.standards.length,17);
  for(const s of operating.standards) assert.ok(prompt.includes(s.code),'prompt missing '+s.code);
  for(const item of ['MPPHM 2020','MHMS 2020','HAS','IHCS','protocols','circulars','authority instructions','destination rules','laboratory methods']) {
    assert.ok(prompt.includes(item),'framework layer missing '+item);
  }
  assert.ok(prompt.includes('MS 2683:2017'));
});

test('master deliverable index points to the China-trip package',()=>{
  const idx=JSON.parse(fs.readFileSync('docs/operations/MASTER_DELIVERABLE_INDEX_2026-10-02.json','utf8'));
  assert.equal(idx.platform.standards_count,17);
  assert.equal(idx.platform.authority_topology,'AHTE ⇄ Direct JAKIM API ⇄ JAKIM');
  assert.equal(idx.platform.corridor,'China → GCC direct');
  assert.ok(idx.deliverables.some(x=>x.path==='docs/AMANAH_CHINA_TRIP_MASTER_DELIVERY_PROMPT_2026-10-07.md'));
});

function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    const p=path.join(dir,e.name);
    return e.isDirectory()?walk(p):[p];
  });
}

test('public website contains no retired authority hop or default China-to-Malaysia route',()=>{
  const files=walk('ghscl-website').filter(p=>/\.(html|json|js|css|svg)$/i.test(p));
  const text=files.map(p=>fs.readFileSync(p,'utf8')).join('\n');
  assert.doesNotMatch(text,/AHTE\s*⇄\s*NurAI|NurAI\s*⇄\s*Direct JAKIM/i);
  assert.doesNotMatch(text,/China\s*(?:→|->)\s*Malaysia\s*(?:→|->)\s*GCC/i);
  assert.doesNotMatch(text,/AI (?:certifies|certified) Halal/i);
});
