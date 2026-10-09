import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("public landing and route process flows use shared 3D scene components",()=>{
  const app=fs.readFileSync("platinum-site/src/App.tsx","utf8");
  const secondary=fs.readFileSync("platinum-site/src/components/pages/SecondaryPage.tsx","utf8");
  const flow=fs.readFileSync("platinum-site/src/components/scene/ProcessFlow3D.tsx","utf8");
  const runtime=fs.readFileSync("platinum-site/src/components/scene/processSceneRuntime.ts","utf8");
  assert.match(flow,/ANIMATED OPERATING VIEW/);
  assert.match(app,/ProcessScene3D mode="corridor" stage="Real product journey/);
  assert.match(app,/<ProcessFlow3D title="Canonical trust path"/);
  for(const mode of ["laboratory","audit","authority","transport"])assert.ok(app.includes(`mode="${mode}"`),`missing ${mode} scene`);
  assert.match(secondary,/section\.flow\?\.length[\s\S]*?<ProcessFlow3D/);
  assert.match(secondary,/overviewOnly/,"secondary hero should load its page-specific photographic scene");
  assert.match(runtime,/container\.dataset\.overviewOnly === "true" \? container\.dataset\.scene/);
  assert.match(flow,/aria-label=\{`\$\{title\} animated 3D process flow`\}/);
  for(const realScene of ["onboarding", "materials", "factory", "analyst", "warehouse", "truck", "crane", "market", "authority", "verification"])assert.ok(runtime.toLowerCase().includes(realScene),`missing real process scene ${realScene}`);
  assert.match(runtime,/new THREE\.WebGLRenderer/);
  assert.match(runtime,/prefers-reduced-motion/);
  assert.match(runtime,/sceneFallback/);
  assert.match(runtime,/routeDot\.position\.copy\(point\)/);
  assert.match(runtime,/const animatedPeople = \[factoryPerson, materialPerson, analyst\]/,"the full-corridor overview should avoid toy-like avatar models");
  assert.match(runtime,/overview\.visible = false/,"full-corridor overview should focus on custody, while focused stages show the facility scenes");
  assert.match(runtime,/box\(2, \.55, \.52\)/,"route cargo should use realistic shipping-container proportions");
  assert.match(runtime,/const axleGroups = \[-\.58, \.12, \.65\]/,"the moving container should be grounded on an animated trailer");
  assert.match(runtime,/const initialLabel = container\.dataset\.overviewOnly === "true" \? container\.dataset\.scene/);
  assert.match(runtime,/if \(kind === "laboratory"\)/,"only the selected station's detailed model should be built");
  assert.match(runtime,/groups\[kind\]\.children\.length > 0 \? kind : "corridor"/,"unbuilt stations must remain explorable through the continuous corridor model");
  assert.match(runtime,/if \(scene\.setStage\(label, index\)\) return/,"a selected stage should preserve its scene when that type is already mounted");
  assert.match(runtime,/const nextScene = mountProcessScene\(container\)/,"a new stage should load its own detailed scene when needed");
  assert.match(runtime,/new THREE\.WebGLRenderer\(\{ alpha: true, antialias: true/);
  assert.match(runtime,/new THREE\.CapsuleGeometry\(radius, length/,"figures should use smooth, proportioned anatomy rather than block characters");
  assert.match(runtime,/new THREE\.SphereGeometry\(\.115, 24, 18\)/,"human heads should be smoothly shaded at scene scale");
  assert.match(runtime,/renderer\.toneMapping = THREE\.ACESFilmicToneMapping/);
  assert.match(runtime,/renderer\.shadowMap\.enabled = true/);
  assert.match(runtime,/person\.position\.y = 0/,"figures should stay grounded instead of bobbing like game avatars");
  assert.match(runtime,/routeLine\.visible = true/,"the evidence route should remain visible across every cinematic operating scene");
  assert.match(runtime,/Object\.values\(groups\)\.forEach\(group => \{ group\.visible = false; \}\)/,"procedural toy-like props should not cover the human-scale reference imagery");
  assert.match(runtime,/process-scene-photograph/);
  assert.match(runtime,/process-scene-dataflow/);
  assert.match(runtime,/sceneAssetUrl\(kind\)/,"selected process types should select the corresponding photographic scene");
  assert.match(runtime,/cinematic\.src = nextImage/,"stage changes should transition to their matching environment");
  const sceneMapping=fs.readFileSync("platinum-site/src/components/scene/sceneImages.ts","utf8");
  for(const image of ["scene-origin.webp","scene-market.webp","journey-panorama.webp","scene-onboarding.webp","scene-assurance.webp","scene-lab.webp","scene-warehouse.webp","scene-logistics.webp","scene-command-center.webp"]){
    assert.ok(fs.existsSync(`platinum-site/public/assets/${image}`),`missing optimized scene image ${image}`);
    assert.ok(sceneMapping.includes(image),`missing scene mapping for ${image}`);
  }
  const visualCss=fs.readFileSync("platinum-site/src/styles/process-3d.css","utf8");
  assert.match(visualCss,/cinematic-drift/);
  assert.match(visualCss,/evidence-flow/);
  assert.match(visualCss,/prefers-reduced-motion:reduce/);
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
  assert.match(html,/process-scene-photograph" src="assets\/scene-origin\.webp"/);
  for(const image of ["scene-assurance.webp","scene-lab.webp","scene-warehouse.webp","scene-logistics.webp","scene-market.webp"]){
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
  assert.match(buildScript,/Cinematic China-to-GCC supply chain scene with animated evidence flow/);
  assert.match(journeyCss,/\.journey-hero\{display:grid/);
  assert.match(journeyCss,/\.hero-scene\{order:-1/,"the photographic scene should lead the mobile hero");
});

test("production prebuild contains the scene assets in the Vercel trust journey",()=>{
  const pkg=JSON.parse(fs.readFileSync("package.json","utf8"));
  const promotion=fs.readFileSync("scripts/promote-trust-assets.mjs","utf8");
  assert.match(pkg.scripts.prebuild,/npm run build --prefix platinum-site/);
  assert.match(pkg.scripts.prebuild,/promote-trust-assets\.mjs/);
  assert.match(pkg.scripts.prebuild,/copy-trust-experience\.mjs/);
  assert.match(promotion,/platinum-site.*dist.*assets/);
  assert.match(promotion,/ghscl-website.*assets/);
});
