import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const assurance = readFileSync(new URL("../supabase/functions/assurance/index.ts", import.meta.url), "utf8");
const migration15 = readFileSync(new URL("../supabase/migrations/0015_role_and_authority_integrity.sql", import.meta.url), "utf8");
const migration16 = readFileSync(new URL("../supabase/migrations/0016_authority_decision_api_compatibility.sql", import.meta.url), "utf8");

test("assurance API rejects AHTE-issued authority decisions", () => {
  assert.match(assurance, /ahte_cannot_issue_authority_decision/);
  assert.match(assurance, /issued_by_ahte:\s*false/);
});

test("AI cannot execute human certification decision classes", () => {
  assert.match(assurance, /decisionClass === "D5" \|\| decisionClass === "D6"/);
  assert.match(assurance, /human_certification_decision_required/);
});

test("operational release is explicitly not certification", () => {
  assert.match(assurance, /is_certification:\s*false/);
  assert.match(assurance, /conditions:\s*\{\s*is_certification:\s*false\s*\}/);
});

test("broad original AHTE org-access policies are removed", () => {
  assert.match(migration15, /drop policy if exists %I on public\.%I/);
  assert.match(migration15, /_org_access/);
  assert.match(migration15, /private\.has_org_role/);
});

test("signed and final authority decisions require external proof", () => {
  assert.match(migration16, /status not in \('signed','final'\)/);
  assert.match(migration16, /decision_reference is not null/);
  assert.match(migration16, /signature_hash is not null/);
});
