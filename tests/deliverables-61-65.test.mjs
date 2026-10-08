import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const prompt=fs.readFileSync('docs/architecture/PLATFORM_ARCHITECTURE.md','utf8');
const operating=JSON.parse(fs.readFileSync('docs/ahte/MS_OPERATING_SET.json','utf8'));

test('the current Malaysian/JAKIM standards register is connected to the platform',()=>{
  assert.equal(operating.catalog_count,17);
  assert.equal(operating.standards.length,17);
  for(const item of operating.standards) assert.ok(fs.readFileSync('ghscl-website/standards.html','utf8').includes(item.code),'public standards page missing '+item.code);
  for(const item of ['MPPHM 2020','MHMS 2020','HAS','IHCS','protocols','circulars','authority instructions','destination rules','laboratory methods']) {
    assert.ok(fs.readFileSync('docs/ahte/MS_OPERATING_SET.json','utf8').toLowerCase().includes(item.toLowerCase()),'framework layer missing '+item);
  }
});

function walk(dir){
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    const p=path.join(dir,e.name);
    return e.isDirectory()?walk(p):[p];
  });
}

test('public website preserves direct authority topology and the China-to-GCC corridor',()=>{
  const files=walk('ghscl-website').filter(p=>/\.(html|json|js|css|svg)$/i.test(p));
  const text=files.map(p=>fs.readFileSync(p,'utf8')).join('\n');
  assert.match(text,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(text,/China → GCC direct/);
  assert.doesNotMatch(text,/AHTE\s*⇄\s*NurAI|NurAI\s*⇄\s*Direct JAKIM/i);
  assert.doesNotMatch(text,/AI (?:certifies|certified) Halal/i);
});
