import test from 'node:test';
import assert from 'node:assert/strict';
import {requireQueryResult,requireQueryResults} from '../lib/query-results.ts';

test('successful empty results remain distinct from query failures',()=>{
 const empty={data:[],count:0,error:null};
 assert.equal(requireQueryResult(empty),empty);
 assert.throws(()=>requireQueryResult({data:null,count:null,error:{message:'connection failed'}}),/unavailable/);
});
test('one failed read prevents a composite assurance view from reporting success',()=>{
 assert.throws(()=>requireQueryResults([{data:[],error:null},{data:null,error:{message:'permission denied'}}]),/unavailable/);
 const success=[{data:[{state:'held'}],error:null}];
 assert.equal(requireQueryResults(success),success);
});
