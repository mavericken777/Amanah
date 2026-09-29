import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'config/canonical-source-bindings.json'), 'utf8'));

function gitBlobSha(filePath) {
  const bytes = fs.readFileSync(filePath);
  const header = Buffer.from(`blob ${bytes.length}\0`, 'utf8');
  return crypto.createHash('sha1').update(header).update(bytes).digest('hex');
}

test('canonical source binding is pinned to reviewed GlobalHalalDigitalTrust merge', () => {
  assert.equal(manifest.source_repository, 'mavericken777/GlobalHalalDigitalTrust');
  assert.equal(manifest.source_commit, '3d5cc29fabf7c3ed0da20cd938219fed83e74830');
  assert.equal(manifest.freeze_boundary, 'master-standards-stack/verified-2026-09-17/');
});

test('all exact mirrors match canonical Git blob hashes', () => {
  for (const entry of manifest.exact_mirrors) {
    const local = path.join(root, entry.local);
    assert.ok(fs.existsSync(local), `missing mirror: ${entry.local}`);
    assert.equal(gitBlobSha(local), entry.blob, `${entry.local} drifted from ${entry.source}`);
  }
});

test('state machine retains canonical provenance and authority metadata', () => {
  const sm = JSON.parse(fs.readFileSync(path.join(root, 'config/ahte-state-machine.json'), 'utf8'));
  const d2 = sm.transitions.find((x) => x.on === 'D2_assessment');
  const e5 = sm.transitions.find((x) => x.on === 'E5_authority_decision');
  const release = sm.transitions.find((x) => x.on === 'operational_release');
  assert.equal(d2.object, 'assessment_object');
  assert.equal(e5.issuer, 'competent_authority_not_ahte');
  assert.equal(release.not, 'certification');
  assert.match(sm.failure_closed, /never auto-certify/i);
});

test('hard gates remain non-compensable and score cannot override eligibility', () => {
  const gates = JSON.parse(fs.readFileSync(path.join(root, 'config/ahte-hard-gates.json'), 'utf8'));
  assert.ok(gates.gates.every((g) => g.compensable === false));
  assert.ok(gates.gates.every((g) => typeof g.fail_if === 'string' && g.fail_if.length > 0));
  assert.match(gates.eligible_state_space, /all hard-gates passed/i);
  assert.match(gates.score_function, /only after/i);
});

test('D2/D4/D5/D6 authority boundaries remain explicit', () => {
  const reg = JSON.parse(fs.readFileSync(path.join(root, 'config/ahte-decision-classes.json'), 'utf8'));
  const byId = Object.fromEntries(reg.classes.map((c) => [c.id, c]));
  assert.equal(byId.D2.creates_assessment_object, true);
  assert.equal(byId.D2.creates_authority_decision, false);
  assert.equal(byId.D4.auto_release_allowed, false);
  assert.equal(byId.D5.ai_may_execute, false);
  assert.equal(byId.D6.ai_may_execute, false);
  assert.ok(reg.hard_rules.includes('NOT DETECTED != HALAL'));
  assert.ok(reg.hard_rules.includes('Operational release is never certification'));
});

test('trust fracture taxonomy never auto-releases', () => {
  const taxonomy = JSON.parse(fs.readFileSync(path.join(root, 'config/ahte-fracture-taxonomy.json'), 'utf8'));
  assert.ok(taxonomy.events.every((e) => e.auto_hold === true));
  assert.ok(taxonomy.events.every((e) => e.auto_release === false));
});
