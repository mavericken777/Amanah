import test from "node:test";
import assert from "node:assert/strict";

function nextTaskStatus(current, next) {
  const allowed = {
    open: ["in_progress", "blocked", "done", "cancelled"],
    in_progress: ["open", "blocked", "done", "cancelled"],
    blocked: ["in_progress", "cancelled"],
    done: ["open"],
    cancelled: ["open"],
  };
  return allowed[current]?.includes(next) ? next : null;
}

function variance(planned, actual) {
  return Number(planned) - Number(actual);
}

function safeNext(value) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

function canUseMachineDecision(decisionClass) {
  return !["D5", "D6"].includes(decisionClass);
}

function releaseEligible({ assuranceComplete, unresolvedFractures, pendingDecisions, requiresCertificationDecision, certificationDecisionRecorded }) {
  return assuranceComplete
    && unresolvedFractures === 0
    && pendingDecisions === 0
    && (!requiresCertificationDecision || certificationDecisionRecorded);
}

function publicDisclosureSafe(payload) {
  return payload && payload.not_certification === true && payload.disclosure !== undefined;
}

test("blocked tasks cannot jump directly to done", () => {
  assert.equal(nextTaskStatus("blocked", "done"), null);
});

test("budget variance is planned minus actual", () => {
  assert.equal(variance(1000, 850), 150);
  assert.equal(variance("500.00", "550.00"), -50);
});

test("auth redirect validation blocks external targets", () => {
  assert.equal(safeNext("/projects"), "/projects");
  assert.equal(safeNext("https://example.com"), "/dashboard");
  assert.equal(safeNext("//example.com"), "/dashboard");
});

test("D5 and D6 are reserved from machine execution", () => {
  assert.equal(canUseMachineDecision("D2"), true);
  assert.equal(canUseMachineDecision("D4"), true);
  assert.equal(canUseMachineDecision("D5"), false);
  assert.equal(canUseMachineDecision("D6"), false);
});

test("operational status follows evidence completeness, exceptions and recorded certification decisions", () => {
  assert.equal(releaseEligible({ assuranceComplete: true, unresolvedFractures: 0, pendingDecisions: 0, requiresCertificationDecision: false, certificationDecisionRecorded: false }), true);
  assert.equal(releaseEligible({ assuranceComplete: false, unresolvedFractures: 0, pendingDecisions: 0, requiresCertificationDecision: false, certificationDecisionRecorded: false }), false);
  assert.equal(releaseEligible({ assuranceComplete: true, unresolvedFractures: 1, pendingDecisions: 0, requiresCertificationDecision: false, certificationDecisionRecorded: false }), false);
  assert.equal(releaseEligible({ assuranceComplete: true, unresolvedFractures: 0, pendingDecisions: 1, requiresCertificationDecision: false, certificationDecisionRecorded: false }), false);
  assert.equal(releaseEligible({ assuranceComplete: true, unresolvedFractures: 0, pendingDecisions: 0, requiresCertificationDecision: true, certificationDecisionRecorded: false }), false);
  assert.equal(releaseEligible({ assuranceComplete: true, unresolvedFractures: 0, pendingDecisions: 0, requiresCertificationDecision: true, certificationDecisionRecorded: true }), true);
});

test("public verification responses must not represent certification", () => {
  assert.equal(publicDisclosureSafe({ not_certification: true, disclosure: {} }), true);
  assert.equal(publicDisclosureSafe({ not_certification: false, disclosure: {} }), false);
});
