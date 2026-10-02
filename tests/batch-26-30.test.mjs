import test from "node:test";import assert from "node:assert/strict";import{readFileSync}from"node:fs";
const sin=readFileSync(new URL("../docs/sinotrans/SINOTRANS_A_TO_Z_PLAYBOOK_2026-10-02.md",import.meta.url),"utf8");
const audit=readFileSync(new URL("../docs/sinotrans/SINOTRANS_AUDIT_READINESS_PACKAGE_2026-10-02.md",import.meta.url),"utf8");
const port=readFileSync(new URL("../docs/port/PORT_OPERATING_MODEL_2026-10-02.md",import.meta.url),"utf8");
const tab=readFileSync(new URL("../docs/port/PORT_TABLET_APP_2026-10-02.md",import.meta.url),"utf8");
test("Sinotrans playbook spans A-U and preserves authority boundary",()=>{for(const x of ["A —","U —","does not issue Halal certification"])assert.match(sin,new RegExp(x));});
test("audit readiness covers staged countdown",()=>{for(const x of ["T-30","T-14","T-7","T-48"])assert.match(audit,new RegExp(x));});
test("port model reserves sovereign release",()=>{assert.match(port,/cannot issue customs release/);});
test("tablet keeps states separate and offline release prohibited",()=>{assert.match(tab,/Authority status \/ AHTE trust \/ Customs status \/ Operational state/);assert.match(tab,/cannot create a final sovereign release/);});
