import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync('lib/safe-redirect.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};new Function('exports','module',code)(mod.exports,mod);
test('login and callback reject normalized off-origin return paths',()=>{
 const {safeNext}=mod.exports;
 for(const value of [null,'https://evil.example','//evil.example','/\\evil.example','/\n/evil.example','/\t/evil.example']) assert.equal(safeNext(value),'/dashboard',String(value));
 assert.equal(safeNext('/ahte/command-center?tab=alerts#open'),'/ahte/command-center?tab=alerts#open');
 for(const path of ['app/login/page.tsx','app/auth/callback/route.ts']) assert.match(fs.readFileSync(path,'utf8'),/import \{ safeNext \} from "@\/lib\/safe-redirect"/);
});
