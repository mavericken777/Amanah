import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const types=readFileSync(new URL("../lib/database.current.types.ts",import.meta.url),"utf8");
const hardware=readFileSync(new URL("../docs/hardware/PLATINUM_HARDWARE_MASTER_BOM_2026-10-02.json",import.meta.url),"utf8");
const cert=readFileSync(new URL("../docs/architecture/CERTIFICATION_CREDENTIAL_LIFECYCLE_2026-10-02.md",import.meta.url),"utf8");
const monitor=readFileSync(new URL("../docs/operations/REAL_TIME_PRODUCTION_MONITORING_2026-10-02.md",import.meta.url),"utf8");

test("certification lifecycle preserves authority separation",()=>{assert.match(cert,/AHTE never mints a Halal certification decision/);assert.match(cert,/Suspended/);assert.match(cert,/Revoked/);});
test("production monitoring primitives remain in target schema",()=>{assert.match(types,/ahte_telemetry_events/);assert.match(types,/ahte_batches/);assert.match(types,/ahte_sensors/);assert.match(monitor,/HOLD/);});
test("platinum hardware master BOM includes core deployment classes",()=>{for(const x of ["RealWear","Zebra","Sensirion","Vaisala","Axis","Teltonika","Moxa","Cisco"])assert.match(hardware,new RegExp(x));});
