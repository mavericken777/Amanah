import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const trust = readFileSync(new URL("../supabase/migrations/0008_ahte_trust_platform.sql", import.meta.url), "utf8");
const ops = readFileSync(new URL("../supabase/migrations/0009_ahte_operational_primitives.sql", import.meta.url), "utf8");
const roles = readFileSync(new URL("../supabase/migrations/0015_role_and_authority_integrity.sql", import.meta.url), "utf8");
const authority = readFileSync(new URL("../supabase/migrations/0016_authority_decision_api_compatibility.sql", import.meta.url), "utf8");
const release = readFileSync(new URL("../supabase/migrations/20260930035500_release_gate_enforcement.sql", import.meta.url), "utf8");
const assurance = readFileSync(new URL("../supabase/functions/assurance/index.ts", import.meta.url), "utf8");
const architecture = readFileSync(new URL("../config/current-target-architecture-2026-09-30.json", import.meta.url), "utf8");

test("evidence management retains provenance, hash and validity semantics", () => {
  for (const field of ["ahte_evidence","content_hash","source_uri","valid_from","valid_to","evidence_class"]) assert.match(trust,new RegExp(field));
  assert.match(release,/cross_organization_evidence/);
  assert.match(release,/verified/);
});

test("AI review has assessment/provenance primitives and cannot execute D5/D6", () => {
  assert.match(roles,/ahte_assessments/);
  assert.match(roles,/ahte_ai_provenance/);
  assert.match(assurance,/decisionClass === "D5" \|\| decisionClass === "D6"/);
  assert.match(assurance,/authority_gate_reserved/);
  assert.match(architecture,/"d5_bypass":false/);
  assert.match(architecture,/"d6_bypass":false/);
});

test("human governance keeps HITM and signed authority proof explicit", () => {
  assert.match(roles,/ahte_hitm_cases/);
  assert.match(authority,/decision_reference is not null/);
  assert.match(authority,/signature_hash is not null/);
  assert.match(assurance,/ahte_cannot_issue_authority_decision/);
});

test("laboratory primitives preserve custody, method and result evidence", () => {
  for (const field of ["ahte_laboratories","ahte_lab_samples","chain_of_custody_ref","method_code","method_version"]) assert.match(ops,new RegExp(field));
  assert.match(architecture,/NOT_DETECTED != HALAL/);
});

test("audit chain contains findings, CAPA and re-verification", () => {
  for (const table of ["ahte_audit_tests","ahte_findings","ahte_corrective_actions","ahte_reverifications"]) assert.match(trust,new RegExp(table));
  assert.match(architecture,/smart-glass audit/);
  assert.match(architecture,/finding \/ CAPA \/ re-verification/);
});
