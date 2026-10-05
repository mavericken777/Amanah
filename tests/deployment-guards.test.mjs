import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';

test('Pages privileged job only accepts this repository main push or main manual dispatch',()=>{
 const yaml=fs.readFileSync('.github/workflows/ghscl-pages.yml','utf8').replaceAll('\r\n','\n');
 const expression=yaml.match(/    if: >-\n([\s\S]*?)\n    runs-on:/)[1].trim();
 const allowed=new Function('github',`return (${expression});`);
 const run={conclusion:'success',event:'push',head_branch:'main',head_repository:{full_name:'mavericken777/Amanah'}};
 const context=(event_name,workflow_run=run,ref='refs/heads/main')=>({event_name,ref,repository:'mavericken777/Amanah',event:{workflow_run}});
 assert.equal(allowed(context('workflow_run')),true);
 assert.equal(allowed(context('workflow_dispatch')),true);
 for(const change of [{event:'pull_request'},{event:'pull_request',head_repository:{full_name:'attacker/Amanah'}},{head_repository:{full_name:'attacker/Amanah'}},{head_branch:'feature'},{conclusion:'failure'}]) {
  assert.equal(allowed(context('workflow_run',{...run,...change})),false,JSON.stringify(change));
 }
 assert.equal(allowed(context('workflow_dispatch',run,'refs/heads/feature')),false);
});

test('deployed artifact verification compares 404 content, including HTTP 404 responses',()=>{
 const script=`
  import fs from 'node:fs';
  const visited=[];
  globalThis.fetch=async url=>{
   const name=new URL(url).pathname.split('/').at(-1);
   visited.push(name);
   return {ok:name!=='404.html',status:name==='404.html'?404:200,text:async()=>fs.readFileSync('ghscl-website/'+name,'utf8')};
  };
  await import('./scripts/verify-pages-deployment.mjs');
  if(!visited.includes('404.html'))throw new Error('Missing 404 verification');
 `;
 execFileSync(process.execPath,['--input-type=module','-e',script],{stdio:'pipe'});
 const corrupted=script.replace("fs.readFileSync('ghscl-website/'+name,'utf8')","name==='404.html'?'wrong deployed error page':fs.readFileSync('ghscl-website/'+name,'utf8')").replace('const visited=[];','const visited=[]; globalThis.setTimeout=fn=>fn();');
 assert.throws(()=>execFileSync(process.execPath,['--input-type=module','-e',corrupted],{stdio:'pipe'}),/404 deployment differs/);
});
