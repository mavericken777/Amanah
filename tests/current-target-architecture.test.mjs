import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const target=JSON.parse(fs.readFileSync('config/current-target-architecture-2026-09-30.json','utf8'));
const schemas=JSON.parse(fs.readFileSync('config/target-extension-schemas-2026-09-30.json','utf8'));

test('current target binds Amanah to reconciled GHDT commit without moving the freeze',()=>{
  assert.equal(target.source_commit,'ae3f662f7467aba78e64060c031db0f098dbdd49');
  assert.equal(target.freeze_boundary,'master-standards-stack/verified-2026-09-17/');
  assert.equal(target.authority_effect,'none');
  assert.equal(target.default_corridor.physical_route,'China -> GCC direct');
  assert.match(target.default_corridor.malaysia_role,/governance \/ assurance/);
});

test('authority, logistics and port roles remain separated',()=>{
  assert.match(target.actors.jakim.integration,/direct authorised JAKIM API/i);
  assert.match(target.actors.sinotrans.role,/logistics and warehouse/i);
  assert.equal(target.actors.port_customs.ahte_overrides_decision,false);
});

test('predictive and preemptive architecture is explicit and cannot bypass authority',()=>{
  assert.ok(target.ai_ml.modules.includes('Preemptive Strategy Engine'));
  assert.ok(target.ai_ml.modules.includes('Predictive Compliance Engine'));
  assert.ok(target.ai_ml.cannot.some(x=>x.includes('D5')));
  assert.ok(target.ai_ml.cannot.some(x=>x.includes('D6')));
  assert.ok(target.command_center.domains.includes('Sinotrans warehouse'));
  assert.ok(target.command_center.domains.includes('preemptive strategy'));
});

test('target extension schemas keep machine objects non-authoritative',()=>{
  const cc=schemas.schemas.command_center_alert_object;
  const prediction=schemas.schemas.prediction_object;
  const strategy=schemas.schemas.preemptive_strategy_object;
  assert.equal(cc.properties.creates_authority_decision.const,false);
  assert.equal(prediction.properties.creates_authority_decision.const,false);
  assert.equal(strategy.properties.creates_authority_decision.const,false);
});
