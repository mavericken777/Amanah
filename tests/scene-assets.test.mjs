import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import vm from 'node:vm';

const source = fs.readFileSync('platinum-site/src/components/scene/sceneImages.ts', 'utf8');
const exports = {};
vm.runInNewContext(ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText, {exports});
test('scene URLs resolve in Pages, embedded Vercel, and root-hosted routes', () => {
  for (const [page, base] of [['/Amanah/index.html','/Amanah'],['/Amanah/how-it-works.html','/Amanah'],['/trust-journey/index.html','/trust-journey'],['/trust-journey/','/trust-journey'],['/laboratory.html','']]) {
    assert.equal(exports.sceneAssetUrl('laboratory', page), `${base}/assets/scene-lab.avif`);
  }
});
test('process selection prioritizes specific operations over corridor labels', () => {
  for (const [label, kind] of [['Laboratory sample custody','laboratory'],['Warehouse storage','warehouse'],['Command center monitoring','monitoring'],['Consumer verification','verification'],['Organisation onboarding','onboarding'],['GCC importer','market'],['Product passport','verification']]) {
    assert.equal(exports.inferKind(label), kind);
  }
});

test('operating stages and process kinds use distinct fitted photographic assets',()=>{
 assert.equal(exports.cinematicStageImages.length,12);
 assert.equal(new Set(exports.cinematicStageImages).size,12);
 const kinds=['corridor','onboarding','materials','facility','laboratory','audit','warehouse','transport','port','market','authority','verification','monitoring'];
 assert.equal(new Set(kinds.map(exports.sceneImage)).size,kinds.length);
 for(const image of [...exports.cinematicStageImages,...kinds.map(exports.sceneImage),...kinds.map(exports.journeySceneImage)])assert.ok(fs.existsSync(`platinum-site/public/assets/${image}`),image);
});
