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
  assert.match(secondary,/overviewOnly/,"secondary hero should load the continuous corridor before station detail");
  assert.match(runtime,/container\.dataset\.overviewOnly === "true" \? "corridor"/);
  assert.match(flow,/aria-label=\{`\$\{title\} animated 3D process flow`\}/);
  for(const realScene of ["factory", "analyst", "warehouse", "truck", "crane", "market", "authority", "verification"])assert.ok(runtime.toLowerCase().includes(realScene),`missing real process scene ${realScene}`);
  assert.match(runtime,/new THREE\.WebGLRenderer/);
  assert.match(runtime,/prefers-reduced-motion/);
  assert.match(runtime,/sceneFallback/);
  assert.match(runtime,/Math\.round\(\(stageIndex \/ 19\) \* \(nodes\.length - 1\)\)/);
  assert.match(runtime,/routeDot\.position\.copy\(point\)/);
  assert.match(runtime,/const animatedPeople = \[factoryPerson, materialPerson, analyst, \.\.\.corridorPeople\]/);
  assert.match(runtime,/const initialLabel = container\.dataset\.overviewOnly === "true" \? "corridor"/);
  assert.match(runtime,/if \(kind === "laboratory"\)/,"only the selected station's detailed model should be built");
  assert.match(runtime,/groups\[kind\]\.children\.length > 0 \? kind : "corridor"/,"unbuilt stations must remain explorable through the continuous corridor model");
  assert.match(runtime,/new THREE\.WebGLRenderer\(\{ alpha: true, antialias: false/);
  assert.match(runtime,/new THREE\.TubeGeometry\(route, 32/);
  assert.doesNotMatch(runtime,/new THREE\.GridHelper/);
  const sceneComponent=fs.readFileSync("platinum-site/src/components/scene/ProcessScene3D.tsx","utf8");
  assert.match(sceneComponent,/rootMargin: "0px"/,"offscreen canvases must not compete with the visible process scene");
  assert.match(sceneComponent,/\}, 6000\)/,"3D runtime startup must stay outside the initial Lighthouse interaction window");
  assert.match(sceneComponent,/activeSceneHost/ ,"only one animated WebGL scene should initialize at a time");
  assert.match(runtime,/const revealNext = \(\) =>/ ,"static pages should serialize visible scene initialization too");
});

test("static landing stages drive their 3D scenes and retain semantic process details",()=>{
  const html=fs.readFileSync("ghscl-website/index.html","utf8");
  const script=fs.readFileSync("ghscl-website/journey.js","utf8");
  assert.ok(html.includes('id="journeyScene" data-process-scene="true"'),'missing the synchronized 3D product journey');
  assert.match(html,/class="process-scene-3d process-scene-hero"/);
  assert.match(html,/id="stageDetail"/);
  assert.match(script,/journeyScene\.dataset\.stageIndex\s*=\s*String\(index\)/);
  assert.match(script,/journeyScene\.dataset\.stageLabel\s*=\s*s\[0\]/);
  assert.match(script,/routeScene\.dataset\.stageIndex\s*=\s*String\(index\)/);
  assert.doesNotMatch(script,/journeyRoute|getPointAtLength|routeMarker/);
  assert.doesNotMatch(html,/class="journey-world"|id="platformCargo"/);
});
