import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const dir='docs/mission/moa-signing-pack-2026-10';
const required=[
'01-CODA-strategic-cooperation.md',
'02-LULU-procurement-cooperation.md',
'03-China-laboratory-evidence.md',
'04-agricultural-development.md',
'05-SINOTRANS-logistics.md',
'06-SINOTRANS-warehouse.md',
'07-China-traceability-platform.md',
'08-Carrefour-MAF-retail.md',
'09-Tamimi-retail.md',
'10-noon-marketplace.md',
'11-BORONEX-technology.md',
'12-Macau-Chamber-institutional.md'
];

test('China Mission MOA signing pack contains all 12 controlled instruments',()=>{
  for(const file of required) assert.ok(fs.existsSync(path.join(dir,file)),file);
  const register=fs.readFileSync(path.join(dir,'00-REGISTER.md'),'utf8');
  for(const file of required) assert.ok(register.includes(file),'register missing '+file);
});

test('every MOA preserves authority, corridor and execution gates',()=>{
  for(const file of required){
    const text=fs.readFileSync(path.join(dir,file),'utf8');
    assert.match(text,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
    assert.match(text,/China → GCC direct/);
    assert.match(text,/does not independently certify Halal/);
    assert.match(text,/exact registered legal name/);
    assert.match(text,/authorised signatory/);
    assert.match(text,/Annex B/);
    assert.match(text,/not executed/i);
  }
});

test('instrument-specific hard boundaries are retained',()=>{
  assert.match(fs.readFileSync(path.join(dir,'03-China-laboratory-evidence.md'),'utf8'),/NOT_DETECTED ≠ HALAL/);
  assert.match(fs.readFileSync(path.join(dir,'02-LULU-procurement-cooperation.md'),'utf8'),/No purchase order or listing approval inferred/);
  assert.match(fs.readFileSync(path.join(dir,'10-noon-marketplace.md'),'utf8'),/seller-of-record/i);
});
