import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("public landing and route process flows use shared 3D scene components",()=>{
  const app=fs.readFileSync("platinum-site/src/App.tsx","utf8");
  const secondary=fs.readFileSync("platinum-site/src/components/pages/SecondaryPage.tsx","utf8");
  const flow=fs.readFileSync("platinum-site/src/components/scene/ProcessFlow3D.tsx","utf8");
  const runtime=fs.readFileSync("platinum-site/src/components/scene/processSceneRuntime.ts","utf8");
  assert.match(app,/ProcessScene3D mode="corridor" stage="Real product journey/);
  assert.match(app,/<ProcessFlow3D title="Canonical trust path"/);
  for(const mode of ["laboratory","audit","authority","transport"])assert.ok(app.includes(`mode="${mode}"`),`missing ${mode} scene`);
  assert.match(secondary,/section\.flow\?\.length[\s\S]*?<ProcessFlow3D/);
  assert.match(flow,/aria-label=\{`\$\{title\} animated 3D process flow`\}/);
  for(const realScene of ["factory", "analyst", "warehouse", "truck", "crane", "market", "authority", "verification"])assert.ok(runtime.toLowerCase().includes(realScene),`missing real process scene ${realScene}`);
  assert.match(runtime,/new THREE\.WebGLRenderer/);
  assert.match(runtime,/prefers-reduced-motion/);
  assert.match(runtime,/sceneFallback/);
});

test("static landing stages drive their 3D scenes and retain semantic process details",()=>{
  const html=fs.readFileSync("ghscl-website/index.html","utf8");
  const script=fs.readFileSync("ghscl-website/journey.js","utf8");
  for(const id of ["journeyScene","auditScene3d","labScene3d","warehouseScene3d","logisticsScene3d","portsScene3d","routeScene3d","monitorScene3d","exceptionScene3d","gccScene3d","consumerScene3d"])assert.ok(html.includes(`id="${id}"`),`missing 3D view ${id}`);
  assert.match(html,/class="process-scene-3d process-scene-hero"/);
  assert.match(html,/id="stageDetail"/);
  assert.match(script,/journeyScene\.dataset\.stageIndex=String\(index\)/);
  assert.match(script,/auditScene3d/);
  assert.match(script,/labScene3d/);
  assert.match(script,/warehouseScene3d/);
  assert.match(script,/logisticsScene3d/);
  assert.match(script,/portsScene3d/);
  assert.match(script,/routeScene3d/);
  assert.match(script,/monitorScene3d/);
  assert.doesNotMatch(html,/class="journey-world"|id="platformCargo"/);
});
