import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const target=JSON.parse(fs.readFileSync('config/current-target-architecture-2026-09-30.json','utf8'));
const schemas=JSON.parse(fs.readFileSync('config/target-extension-schemas-2026-09-30.json','utf8'));

test('current target binds Amanah to current GHDT snapshot without moving the freeze',()=>{
  assert.equal(target.source_commit,'0fab4c64240b569caef947fb2568ccda9d3fa0d3');
  assert.equal(target.freeze_boundary,'master-standards-stack/verified-2026-09-17/');
  assert.equal(target.authority_effect,'none');
  assert.equal(target.default_corridor.physical_route,'China -> GCC direct');
  assert.match(target.default_corridor.malaysia_role,/governance \/ assurance/);
  assert.equal(target.canonical_china_pack,'master-standards-stack/CHINA_EXECUTION_PACK/');
});

test('implementation completeness forbids artificial capability downgrades',()=>{
  assert.equal(target.implementation_principle.no_artificial_blocks,true);
  assert.equal(target.implementation_principle.no_arbitrary_feature_caps,true);
  assert.equal(target.implementation_principle.development_provider_replaces_connectivity_not_capability,true);
  assert.equal(target.implementation_principle.fabricate_live_external_state,false);
});

test('authority, logistics, port and finance roles remain separated',()=>{
  assert.match(target.authority_workflow.connectivity,/DIRECT JAKIM API/);
  assert.equal(target.authority_workflow.nur_ai_platform_hop,false);
  assert.equal(target.authority_workflow.ai_makes_formal_certification_decision,false);
  assert.match(target.actors.sinotrans.role,/warehouse and logistics/i);
  assert.equal(target.actors.port_customs.ahte_overrides_decision,false);
  assert.equal(target.finance_plane.halal_certification_equals_finance_approval,false);
  assert.equal(target.finance_plane.ahte_trust_state_equals_credit_decision,false);
});

test('predictive and preemptive architecture is explicit and cannot bypass authority',()=>{
  assert.ok(target.ai_ml.modules.includes('Preemptive Strategy Engine'));
  assert.ok(target.ai_ml.modules.includes('Predictive Compliance Engine'));
  assert.equal(target.ai_ml.decision_controls.d5_bypass,false);
  assert.equal(target.ai_ml.decision_controls.d6_bypass,false);
  assert.equal(target.ai_ml.decision_controls.automatic_d4_release,false);
  assert.ok(target.command_center.domains.includes('Sinotrans warehouse'));
  assert.ok(target.command_center.domains.includes('preemptive strategy'));
});

test('target extension schemas cover connector, prediction, finance, Takaful and token boundaries',()=>{
  for(const key of ['connector_state_object','command_center_alert_object','prediction_object','preemptive_strategy_object','finance_evidence_packet_object','financing_case_object','takaful_case_object','tokenized_asset_reference_object']) assert.ok(schemas.schemas[key],key);
  assert.equal(schemas.schemas.command_center_alert_object.properties.creates_authority_decision.const,false);
  assert.equal(schemas.schemas.prediction_object.properties.creates_authority_decision.const,false);
  assert.equal(schemas.schemas.preemptive_strategy_object.properties.creates_authority_decision.const,false);
  assert.equal(schemas.schemas.finance_evidence_packet_object.properties.creates_financing_decision.const,false);
  assert.equal(schemas.schemas.finance_evidence_packet_object.properties.creates_takaful_decision.const,false);
  assert.equal(schemas.schemas.finance_evidence_packet_object.properties.is_halal_certification.const,false);
  assert.equal(schemas.schemas.financing_case_object.properties.ahte_approves_financing.const,false);
  assert.equal(schemas.schemas.takaful_case_object.properties.ahte_underwrites_or_decides_claim.const,false);
  assert.equal(schemas.schemas.tokenized_asset_reference_object.properties.ahte_is_title_registry.const,false);
  assert.equal(schemas.schemas.tokenized_asset_reference_object.properties.tokenization_creates_halal_status.const,false);
});
