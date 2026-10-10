import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {initialPlatformState,transition,buildLedger,verifyLedger} from '../platinum-site/src/components/platform/stageEngine.ts';
const scenario=JSON.parse(fs.readFileSync('ghscl-website/fixtures/operating-scenario.json','utf8'));
const stages=Array.from({length:12},(_,i)=>({id:`stage-${i}`,rawJsonLog:{sku:scenario.sku,batch:scenario.batch,environment:scenario.environment,authorityActionExecuted:false}}));
const act=(state,action)=>transition(state,action,stages,scenario);
test('operating clock advances at each speed and stops at consumer completion',()=>{
 for(const speed of [1,2,4]){let state=act(initialPlatformState(stages,scenario),{type:'SPEED',speed});state=act(state,{type:'PLAY'});state=act(state,{type:'TICK',milliseconds:5000/speed-1});assert.equal(state.currentStageIndex,0);state=act(state,{type:'TICK',milliseconds:1});assert.equal(state.currentStageIndex,1);state=act(state,{type:'PAUSE'});assert.equal(act(state,{type:'TICK',milliseconds:5000}),state);state=act(state,{type:'SELECT',index:11});state=act(state,{type:'PLAY'});state=act(state,{type:'TICK',milliseconds:5000});assert.equal(state.playbackMode,'PAUSED');assert.equal(state.stageLogs.at(-1).event,'CONSUMER_LOOP_COMPLETE');}
});
test('every incident requires all phases and reviewed evidence; playback cannot bypass a hold',()=>{
 for(const kind of ['COLD_CHAIN','SEAL_TAMPER','PORCINE_DNA']){let state=act(initialPlatformState(stages,scenario),{type:'INJECT',kind});for(const action of [{type:'PLAY'},{type:'PAUSE'},{type:'SELECT',index:11},{type:'RESTART'},{type:'SPEED',speed:4},{type:'INJECT',kind},{type:'TICK',milliseconds:10000},{type:'RESOLVE'},{type:'CONFIRM',confirmed:true}])assert.equal(act(state,action),state);state=act(state,{type:'RECALL'});assert.deepEqual(state.stageLogs.at(-1).payload.affectedAllocations,scenario.allocations);assert.equal(state.stageLogs.at(-1).payload.unaffectedBatch,scenario.unaffectedBatch);for(const phase of ['INVESTIGATION','CORRECTIVE_ACTION','REVERIFICATION']){state=act(state,{type:'NEXT_PHASE'});assert.equal(state.activeException.phase,phase);assert.equal(act(state,{type:'RESOLVE'}),state);}state=act(state,{type:'CONFIRM',confirmed:true});state=act(state,{type:'RESOLVE'});assert.equal(state.activeException,null);assert.equal(state.playbackMode,'PAUSED');assert.equal(state.stageLogs.at(-1).payload.authorityActionExecuted,false);}
});
test('real SHA-256 chain detects altered evidence and preserves history on restart',async()=>{
 let state=initialPlatformState(stages,scenario);state=act(state,{type:'SELECT',index:7});state=act(state,{type:'RESTART'});assert.deepEqual(state.stageLogs.map(e=>e.sequence),[1,2,3]);const proofs=await buildLedger(state.stageLogs);assert.match(proofs[0].hash,/^[a-f0-9]{64}$/);assert.equal(proofs[1].previousHash,proofs[0].hash);assert.equal(await verifyLedger(proofs),true);const altered=structuredClone(proofs);altered[1].payload.batch='SUBSTITUTED';assert.equal(await verifyLedger(altered),false);const broken=structuredClone(proofs);broken[1].previousHash='0'.repeat(64);assert.equal(await verifyLedger(broken),false);
});
