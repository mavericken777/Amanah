import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
let handler;
const code=ts.transpileModule(fs.readFileSync('supabase/functions/ghscl-site/index.ts','utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText;
new Function('Deno',code)({serve:fn=>{handler=fn;}});
test('retired edge microsite redirects to the one current public website',()=>{
 for(const method of ['GET','HEAD']) {
  const response=handler(new Request('https://legacy.invalid/anything?next=https://evil.example',{method}));
  assert.equal(response.status,307);
  assert.equal(response.headers.get('Location'),'https://mavericken777.github.io/Amanah/');
  assert.equal(response.headers.get('Cache-Control'),'no-store');
 }
 assert.equal(handler(new Request('https://legacy.invalid/',{method:'POST'})).status,405);
 assert.equal(handler(new Request('https://legacy.invalid/',{method:'OPTIONS'})).status,204);
});
