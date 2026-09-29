import test from "node:test";
import assert from "node:assert/strict";

function nextTaskStatus(current, next) {
  const allowed = {
    open: ["in_progress", "blocked", "done", "cancelled"],
    in_progress: ["open", "blocked", "done", "cancelled"],
    blocked: ["in_progress", "cancelled"],
    done: ["open"],
    cancelled: ["open"]
  };
  return allowed[current]?.includes(next) ? next : null;
}

function variance(planned, actual) {
  return Number(planned) - Number(actual);
}

function safeNext(value) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
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
