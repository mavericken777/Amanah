import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

// Compile the actual internal contracts without requiring an external service or TS loader.
const code=ts.transpileModule(fs.readFileSync('lib/integrations/contracts.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const mod={exports:{}};new Function('exports','module',code)(mod.exports,mod);
const {AuthorityGateway,LabGateway,LogisticsGateway,IntegrityService,UnconfiguredConnector,validateContext}=mod.exports;
const context={organizationId:'org',actorId:'actor',environment:'development',idempotencyKey:'request',authorizedScopes:['integration:exchange']};
const event={organizationId:'org',objectId:'object',eventId:'event',evidenceId:'evidence',actorId:'actor',timestamp:'2026-09-30T00:00:00Z',eventType:'TEST',environment:'development',simulated:true,source:{sourceSystem:'fixture',sourceRecordId:'fixture-only',sourceVersion:'1'},integrity:{contentHash:'reference-only',signatureReference:'fixture-reference',keyId:'fixture',policyVersion:'demo'}};

test('development ports accept fixtures without producing external evidence or decisions',async()=>{
 for(const kind of ['jakim-api','laboratory','sinotrans-logistics','port-customs','shariah-finance','command-center','erp','mes','wms','tms','qms','lims','iot','identity','integrity-anchor']) {
   const connector=new mod.exports.DevelopmentConnector(kind);
   assert.equal(await connector.health(),'ready');
   const receipt=await connector.exchange({event},context);
   assert.equal(receipt.status,'received');assert.equal(receipt.sourceReceiptReference,undefined);
   assert.equal(receipt.developmentAcknowledgement.createsAuthorityDecision,false);
   assert.equal(receipt.developmentAcknowledgement.createsTransactionEvidence,false);
   assert.equal(receipt.developmentAcknowledgement.simulated,true);
   assert.equal(receipt.notCertification,true);
   assert.deepEqual(await connector.exchange({event},context),receipt);
   const conflict=await connector.exchange({event:{...event,objectId:'tampered'}},context);
   assert.ok(conflict.errors.includes('idempotency_payload_conflict'));
   const real=await connector.exchange({event:{...event,simulated:false}},context);
   assert.ok(real.errors.includes('development_requires_simulated_event'));
   const prod=await connector.exchange({event:{...event,environment:'production'}},{...context,environment:'production'});
   assert.ok(prod.errors.includes('environment_mismatch'));
   const other=await connector.exchange({event},{...context,organizationId:'other'});
   assert.ok(other.errors.includes('organization_scope_mismatch'));
 }
});
test('unconfigured authority never creates an official receipt or certification',async()=>{
 const gateway=new AuthorityGateway(new UnconfiguredConnector('authority','development'));
 const result=await gateway.exchange({event,authorityId:'authority',caseReference:'case',evidenceReferences:[],requestedAction:'read-status'},context);
 assert.equal(result.status,'rejected');assert.equal(result.notCertification,true);assert.ok(result.errors.includes('connector_not_configured'));assert.equal(result.sourceReceiptReference,undefined);
});
test('gateway rejects cross-organization, cross-actor and unauthorized requests before transport',async()=>{
 let invoked=false;const connector={kind:'authority',environment:'development',health:async()=> 'ready',exchange:async()=>{invoked=true;throw new Error('Should not run');}};
 const gateway=new AuthorityGateway(connector);
 const result=await gateway.exchange({event,authorityId:'authority',caseReference:'case',evidenceReferences:[],requestedAction:'read-status'},{...context,organizationId:'other',actorId:'other',authorizedScopes:[]});
 assert.equal(invoked,false);assert.ok(result.errors.includes('organization_scope_mismatch'));assert.ok(result.errors.includes('actor_scope_mismatch'));assert.ok(result.errors.includes('scope_not_authorized'));
});
test('production denies simulated events and missing provenance',()=>{
 const errors=validateContext({...event,environment:'production',source:{sourceSystem:'',sourceRecordId:'',sourceVersion:''}},{...context,environment:'production'},'production');
 assert.ok(errors.includes('simulated_event_denied_in_production'));assert.ok(errors.includes('source_provenance_required'));
});
test('lab and logistics ports reject missing physical custody bindings',async()=>{
 let invoked=false;const connector={environment:'development',exchange:async()=>{invoked=true;throw new Error('Should not run');}};
 const lab=await new LabGateway(connector).exchange({event,sampleId:'s',accessionId:'a',laboratoryId:'l',methodReference:'m',methodScopeReference:'scope',matrix:'matrix',sealId:'seal',reportReference:'r',reportVersion:'1',custodyReferences:[]},context);
 assert.ok(lab.errors.includes('sample_custody_required'));
 const logistics=await new LogisticsGateway(connector).exchange({event,shipmentId:'shipment',objectReferences:[],custodyReferences:[],exceptionReferences:[],telemetryReferences:[]},context);
 assert.ok(logistics.errors.includes('shipment_object_binding_required'));assert.ok(logistics.errors.includes('custody_reference_required'));assert.equal(invoked,false);
});
test('integrity service detects altered source bytes without asserting certification',async()=>{
 const service=new IntegrityService();const bytes=new TextEncoder().encode('abc');
 const expected='ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad';
 assert.equal(await service.digest(bytes),expected);assert.equal(await service.matches(bytes,expected),true);
 assert.equal(await service.matches(new TextEncoder().encode('abcd'),expected),false);assert.equal(await service.matches(bytes,'not-a-digest'),false);
});
