import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {PGlite} from '@electric-sql/pglite';
import {pgcrypto} from '@electric-sql/pglite/contrib/pgcrypto';

test('migration replay and database release enforcement',async()=>{
 const db=new PGlite({extensions:{pgcrypto}});
 try {
 await db.exec(`create role anon; create role authenticated; create role service_role; create schema auth; create schema storage;
 create table auth.users(id uuid primary key,raw_user_meta_data jsonb default '{}');
 create function auth.uid() returns uuid language sql stable as $$select nullif(current_setting('request.jwt.claim.sub',true),'')::uuid$$;
 create table storage.buckets(id text primary key,name text,public boolean);
 create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text,name text);
 create function storage.foldername(text) returns text[] language sql immutable as $$select string_to_array($1,'/')$$;
 create publication supabase_realtime; grant usage on schema auth to anon,authenticated;`);
 const root=new URL('../supabase/migrations/',import.meta.url);
 for(const file of readdirSync(root).filter(x=>x.endsWith('.sql')).sort()){
  try{await db.exec(readFileSync(new URL(file,root),'utf8'));}catch(e){throw new Error('Migration '+file+': '+e.message);}
 }
 const user='00000000-0000-4000-8000-000000000001',org='00000000-0000-4000-8000-000000000002',subject='00000000-0000-4000-8000-000000000003';
 await db.exec(`insert into auth.users(id) values('${user}'); insert into public.organizations(id,name,owner_user_id) values('${org}','SYNTHETIC TEST ONLY','${user}'); select set_config('request.jwt.claim.sub','${user}',false);`);
 await assert.rejects(db.exec(`insert into ahte_trust_states(organization_id,entity_type,entity_id,state,hard_gate_status,transition_event) values('${org}','test','${subject}','released','passed','operational_release')`),/undefined_or_reserved_transition/);
 await db.exec(`insert into ahte_trust_states(organization_id,entity_type,entity_id,state,transition_event) values('${org}','test','${subject}','evidence_incomplete','packet_opened')`);
 const first=(await db.query(`select id from ahte_trust_states where entity_id='${subject}'`)).rows[0].id;
 await assert.rejects(db.exec(`update ahte_trust_states set hard_gate_status='passed' where id='${first}'`),/append_only/);
 await assert.rejects(db.exec(`insert into ahte_trust_states(organization_id,entity_type,entity_id,state,transition_event) values('${org}','test','${subject}','assessed','D2_assessment')`),/stale_trust_state/);
 await db.exec(`insert into ahte_assessments(organization_id,subject_type,subject_id,assessment) values('${org}','test','${subject}','SYNTHETIC ADVISORY ONLY'); insert into ahte_trust_states(organization_id,entity_type,entity_id,state,transition_event,previous_state_id) values('${org}','test','${subject}','assessed','D2_assessment','${first}')`);
 const current=(await db.query(`select id from ahte_trust_states where entity_id='${subject}' order by effective_at desc limit 1`)).rows[0].id;
 await assert.rejects(db.exec(`insert into ahte_trust_states(organization_id,entity_type,entity_id,state,hard_gate_status,transition_event,previous_state_id) values('${org}','test','${subject}','eligible','passed','hard_gates_pass_and_no_reserved','${current}')`),/hard_gates_blocked/);
 const evaluation=(await db.query(`select private.ahte_evaluate_release('${org}','test','${subject}',false) as value`)).rows[0].value;
 assert.equal(evaluation.eligible,false); for(const gate of ['HG-AUTH','HG-ID','HG-LAB','HG-SEAL','HG-CUSTODY','HG-DEST','HG-HITM']) assert.ok(evaluation.blockers.some(x=>x.startsWith(gate)));
 assert.equal((await db.query("select count(*)::integer as n from ahte_event_ledger where entity_type='ahte_trust_states'")).rows[0].n,2);
 assert.equal((await db.query("select count(*)::integer as n from (select previous_hash,lag(event_hash) over(partition by organization_id order by id) as expected from ahte_event_ledger) x where previous_hash is distinct from expected")).rows[0].n,0);
 const evidence='00000000-0000-4000-8000-000000000004',authority='00000000-0000-4000-8000-000000000005',gate='00000000-0000-4000-8000-000000000006',decision='00000000-0000-4000-8000-000000000007';
 await db.exec(`insert into ahte_authorities(id,organization_id,code,name,source_status) values('${authority}','${org}','SYNTHETIC','SYNTHETIC TEST AUTHORITY','verified'); insert into ahte_authority_gates(id,organization_id,authority_id,gate_code,gate_type,status) values('${gate}','${org}','${authority}','SYNTHETIC','SYNTHETIC','passed'); insert into ahte_authority_decisions(id,organization_id,authority_gate_id,decision,decision_reference,signature_hash,status) values('${decision}','${org}','${gate}','approved','SYNTHETIC-NOT-REAL','SYNTHETIC-NOT-A-SIGNATURE','final'); insert into ahte_evidence(id,organization_id,title,evidence_type,evidence_class,status,content_hash,metadata) values('${evidence}','${org}','SYNTHETIC TEST ONLY','test','E5','verified','SYNTHETIC-NOT-A-HASH','{"entity_type":"test","entity_id":"${subject}","external_authority_reference":"SYNTHETIC-NOT-REAL","authority_signature_hash":"SYNTHETIC-NOT-A-SIGNATURE"}');`);
 for(const g of ['HG-AUTH','HG-ID','HG-LAB','HG-SEAL','HG-CUSTODY','HG-DEST','HG-HITM']) await db.exec(`insert into ahte_gate_results(organization_id,entity_type,entity_id,gate_id,result,evidence_id,authority_decision_id,reviewed_by,rationale) values('${org}','test','${subject}','${g}','passed','${evidence}','${decision}','${user}','SYNTHETIC TEST ONLY')`);
 await db.exec(`insert into ahte_trust_states(organization_id,entity_type,entity_id,state,transition_event,previous_state_id) values('${org}','test','${subject}','eligible','hard_gates_pass_and_no_reserved','${current}')`);
 assert.equal((await db.query(`select private.ahte_evaluate_release('${org}','test','${subject}',false) as value`)).rows[0].value.eligible,true);
 const eligible=(await db.query(`select id from ahte_trust_states where entity_id='${subject}' order by effective_at desc limit 1`)).rows[0].id;
 await db.exec(`insert into ahte_release_decisions(organization_id,trust_state_id,decision,reason,decided_by) values('${org}','${eligible}','release','SYNTHETIC OPERATIONAL RELEASE ONLY','${user}')`);
 assert.equal((await db.query(`select state from ahte_trust_states where entity_id='${subject}' order by effective_at desc limit 1`)).rows[0].state,'released');
 await db.exec(`update ahte_evidence set valid_to=now()-interval '1 second' where id='${evidence}'`);
 assert.equal((await db.query(`select private.ahte_evaluate_release('${org}','test','${subject}',false) as value`)).rows[0].value.eligible,false);
 await db.exec(`update ahte_evidence set valid_to=null where id='${evidence}'; insert into ahte_fracture_events(organization_id,entity_type,entity_id,fracture_type) values('${org}','test','${subject}','SYNTHETIC SEAL BREAK')`);
 assert.equal((await db.query(`select state from ahte_trust_states where entity_id='${subject}' order by effective_at desc limit 1`)).rows[0].state,'held');
 await assert.rejects(db.exec(`insert into ahte_release_decisions(organization_id,trust_state_id,decision,reason,decided_by) values('${org}','${current}','release','SYNTHETIC','${user}')`),/release_blocked/);
 await db.exec('set role authenticated');
 assert.equal((await db.query(`select public.ahte_evaluate_release_proxy('${org}','test','${subject}',false) as value`)).rows[0].value.eligible,false);
 await assert.rejects(db.exec(`insert into ahte_event_ledger(organization_id,event_type,entity_type,entity_id,event_hash) values('${org}','FORGED','test','${subject}','FORGED')`),/permission denied/);
 await assert.rejects(db.exec(`select public.ahte_evaluate_release_proxy('00000000-0000-4000-8000-000000000099','test','${subject}',false)`),/workspace_forbidden/);
 await db.exec('reset role');
 await assert.rejects(db.exec(`insert into ahte_shipments(organization_id,shipment_code,status) values('${org}','SYNTHETIC-UNAUTHORIZED-RELEASE','released')`),/domain_release_requires_operational_release/);
 const shipment='00000000-0000-4000-8000-000000000020';
 await db.exec(`insert into ahte_shipments(id,organization_id,shipment_code) values('${shipment}','${org}','SYNTHETIC-DOMAIN-HOLD'); insert into ahte_fracture_events(organization_id,entity_type,entity_id,fracture_type) values('${org}','shipment','${shipment}','SYNTHETIC FRACTURE');`);
 assert.equal((await db.query(`select status from ahte_shipments where id='${shipment}'`)).rows[0].status,'border_hold');
 const ledgerBefore=(await db.query('select count(*)::integer as n from ahte_event_ledger')).rows[0].n;
 await db.exec('set role authenticated');
 await assert.rejects(db.exec(`select public.ahte_create_recall_proxy('${org}','{"recall_code":"SYNTHETIC-ROLLBACK","reason":"TEST ONLY","scope_entities":[{"entity_type":"shipment","entity_id":"invalid-uuid"}]}')`),/invalid input syntax/);
 assert.equal((await db.query("select count(*)::integer as n from ahte_recalls where recall_code='SYNTHETIC-ROLLBACK'")).rows[0].n,0);
 assert.equal((await db.query('select count(*)::integer as n from ahte_event_ledger')).rows[0].n,ledgerBefore);
 const recall=(await db.query(`select public.ahte_create_recall_proxy('${org}','{"recall_code":"SYNTHETIC-ATOMIC","reason":"TEST ONLY","scope_entities":[{"entity_type":"shipment","entity_id":"${shipment}","action":"monitor"}]}') as value`)).rows[0].value;
 assert.equal((await db.query(`select count(*)::integer as n from ahte_recall_scopes where recall_id='${recall.id}'`)).rows[0].n,1);
 await db.exec('reset role');
 } finally { await db.close(); }
});
