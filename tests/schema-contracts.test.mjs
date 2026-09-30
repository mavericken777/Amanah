import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import ts from 'typescript';

test('literal application queries use columns in the current live schema',(t)=>{
 const root=new URL('../',import.meta.url);
 const schema=ts.createSourceFile('database.types.ts',readFileSync(new URL('lib/database.types.ts',root),'utf8'),ts.ScriptTarget.Latest,true);
 const database=schema.statements.find(x=>ts.isTypeAliasDeclaration(x)&&x.name.text==='Database').type;
 const member=(node,name)=>node.members.find(x=>x.name?.getText(schema)===name).type;
 const tables=member(member(database,'public'),'Tables');
 const columns=new Map(tables.members.map(table=>[table.name.getText(schema),new Set(member(table.type,'Row').members.map(x=>x.name.getText(schema)))]));
 const extensionColumns={
  ahte_command_center_alerts:['id','organization_id','project_id','alert_code','trigger_code','taxonomy','severity','subject_objects','shipment_id','event_refs','evidence_refs','prediction_id','strategy_id','detected_at','owner_role','decision_class','status','creates_authority_decision','created_by','created_at','updated_at'],
  ahte_predictions:['id','organization_id','project_id','prediction_code','model_id','model_version','generated_at','subject_objects','risk_type','predicted_failure','score','confidence','horizon','evidence_refs','feature_refs','explanation','blast_radius_refs','decision_class','creates_authority_decision','created_by','created_at'],
  ahte_preemptive_strategies:['id','organization_id','project_id','strategy_code','prediction_id','subject_objects','recommended_action','alternative_actions','expected_impact','urgency','evidence_refs','model_id','model_version','confidence','explanation','decision_class','required_human_role','generated_at','expires_at','status','outcome_refs','creates_authority_decision','created_by','updated_at'],
  ahte_finance_evidence_packets:['id','organization_id','project_id','packet_code','purpose','requesting_party','subject_objects','formal_authority_status_ref','ahte_trust_state_ref','supply_chain_state_ref','evidence_refs','custody_refs','exception_refs','integrity_manifest_ref','issued_at','valid_until','disclosure_policy','signature_or_auth_ref','creates_financing_decision','creates_takaful_decision','is_halal_certification','created_by','created_at'],
  ahte_connector_states:['id','organization_id','project_id','connector_code','domain','provider','state','environment','production_evidence','last_success_at','last_error_at','last_error_code','notes','created_by','created_at','updated_at'],
  ahte_financing_cases:['id','organization_id','project_id','case_code','purpose','subject_objects','evidence_packet_id','connector_state_id','provider_ref','external_case_ref','status','external_decision_owner','decision_ref','decision_at','event_refs','ahte_approves_financing','created_by','created_at','updated_at'],
  ahte_takaful_cases:['id','organization_id','project_id','case_code','case_type','subject_objects','evidence_packet_id','connector_state_id','provider_ref','external_case_ref','status','external_decision_owner','policy_or_claim_ref','decision_ref','event_refs','ahte_underwrites_or_decides_claim','created_by','created_at','updated_at'],
  ahte_tokenized_asset_references:['id','organization_id','project_id','reference_code','subject_objects','connector_state_id','provider_ref','network_ref','external_token_ref','underlying_asset_type','ownership_title_source_ref','financing_case_id','custody_state_ref','authority_status_ref','legal_classification_status','shariah_review_status','regulatory_status','ahte_is_title_registry','tokenization_creates_halal_status','created_by','created_at','updated_at']
 };
 for(const [table,fields] of Object.entries(extensionColumns))columns.set(table,new Set(fields));
 const failures=[];let checked=0;
 function files(directory){return readdirSync(directory,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(join(directory,x.name)):/\.(ts|tsx)$/.test(x.name)?[join(directory,x.name)]:[]);}
 function sourceTable(call){let node=call.expression.expression;while(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)){
  if(node.expression.name.text==='from'&&ts.isStringLiteral(node.arguments[0]))return node.expression.expression.getText().endsWith('.storage')?null:node.arguments[0].text;
  node=node.expression.expression;
 }return null;}
 for(const directory of ['app','components','lib','supabase/functions'])for(const file of files(fileURLToPath(new URL(directory+'/',root)))){
  if(file.endsWith('database.types.ts')||file.endsWith('database.current.types.ts')||file.endsWith('database.target.types.ts'))continue;
  const ast=ts.createSourceFile(file,readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('.tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
  function visit(node){if(ts.isCallExpression(node)&&ts.isPropertyAccessExpression(node.expression)){
   const table=sourceTable(node),method=node.expression.name.text,allowed=columns.get(table);
   if(table&&!allowed)failures.push(file+': unknown table '+table);
   if(allowed&&['select','insert','update','upsert'].includes(method)){
    const arg=node.arguments[0];let fields=[];
    if(method==='select'&&arg&&ts.isStringLiteral(arg)){
     let depth=0,start=0;const parts=[];for(let i=0;i<arg.text.length;i++){if(arg.text[i]==='(')depth++;else if(arg.text[i]===')')depth--;else if(arg.text[i]===','&&depth===0){parts.push(arg.text.slice(start,i));start=i+1;}}parts.push(arg.text.slice(start));
     fields=parts.filter(x=>!x.includes('(')).map(x=>x.trim().split(':').at(-1));
    }else if(arg&&ts.isObjectLiteralExpression(arg))fields=arg.properties.filter(ts.isPropertyAssignment).map(x=>x.name.getText(ast).replace(/^['"]|['"]$/g,''));
    for(const field of fields){if(!field||field==='*')continue;checked++;if(!allowed.has(field))failures.push(file+': '+table+'.'+field+' in '+method);}
   }
  }ts.forEachChild(node,visit);}
  visit(ast);
 }
 assert.ok(checked>100,'Expected substantial query contract coverage');
 assert.deepEqual(failures,[]);
 t.diagnostic(checked+' literal column references checked; dynamic expressions and nested relation selectors are outside this check');
});
