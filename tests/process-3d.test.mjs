import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("public and React pages share the cinematic process renderer",()=>{
  const app=fs.readFileSync("platinum-site/src/App.tsx","utf8");
  const secondary=fs.readFileSync("platinum-site/src/components/pages/SecondaryPage.tsx","utf8");
  assert.match(app,/<ProcessFlow3D title="Canonical trust path"/);
  assert.match(secondary,/section\.flow\?\.length[\s\S]*?<ProcessFlow3D/);
  const sceneMapping=fs.readFileSync("platinum-site/src/components/scene/sceneImages.ts","utf8");
  for(const image of ["scene-origin.avif","scene-market.avif","journey-panorama.avif","scene-onboarding.avif","scene-assurance.avif","scene-lab.avif","scene-warehouse.avif","scene-logistics.avif","scene-command-center.avif"]){
    assert.ok(fs.existsSync(`platinum-site/public/assets/${image}`),`missing optimized scene image ${image}`);
    assert.ok(sceneMapping.includes(image),`missing scene mapping for ${image}`);
  }
});

test("static landing stages drive their 3D scenes and retain semantic process details",()=>{
  const html=fs.readFileSync("ghscl-website/index.html","utf8");
  const script=fs.readFileSync("ghscl-website/journey.js","utf8");
  assert.ok(html.includes('id="journeyScene" data-process-scene="true"'),'missing the synchronized 3D product journey');
  assert.match(html,/process-scene-photograph" src="assets\/scene-origin\.avif"/);
  for(const image of ["scene-assurance.avif","scene-lab.avif","scene-warehouse.avif","scene-logistics.avif","scene-market.avif"]){
    assert.ok(html.includes(`src="assets/${image}"`),`static journey missing ${image}`);
  }
  assert.match(html,/class="process-scene-3d process-scene-hero"/);
  assert.match(html,/id="stageDetail"/);
  assert.match(script,/journeyScene\.dataset\.stageIndex\s*=\s*String\(index\)/);
  assert.match(script,/journeyScene\.dataset\.stageLabel\s*=\s*s\[0\]/);
  assert.match(script,/routeScene\.dataset\.stageIndex\s*=\s*String\(index\)/);
  assert.doesNotMatch(script,/journeyRoute|getPointAtLength|routeMarker/);
  assert.doesNotMatch(html,/class="journey-world"|id="platformCargo"/);
  const buildScript=fs.readFileSync("scripts/build-trust-journey.mjs","utf8");
  const journeyCss=fs.readFileSync("ghscl-website/journey.css","utf8");
  assert.doesNotMatch(buildScript,/Animated isometric route/);
  assert.match(buildScript,/China-to-GCC process explanation/);
  assert.match(journeyCss,/\.journey-hero\{display:grid/);
  assert.match(journeyCss,/\.hero-scene\{order:-1/,"the photographic scene should lead the mobile hero");
});

test("production prebuild contains the scene assets in the Vercel trust journey",()=>{
  const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
  const promotion=fs.readFileSync("scripts/promote-trust-assets.mjs","utf8");
  assert.match(pkg.scripts["preweb:build"],/npm run build --prefix platinum-site/);
  assert.match(pkg.scripts["preweb:build"],/promote-trust-assets\.mjs/);
  assert.match(pkg.scripts.prebuild,/copy-trust-experience\.mjs/);
  assert.match(promotion,/platinum-site.*dist.*assets/);
  assert.match(promotion,/ghscl-website.*assets/);
});
