import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const data=JSON.parse(fs.readFileSync('ghscl-website/ecosystem.en.json','utf8'));
const root=new URL((process.env.PAGES_URL||data.baseUrl).replace(/\/?$/,'/'));
const extraPages=JSON.parse(fs.readFileSync('platinum-site/data/extra-pages.json','utf8'));
const names=[...new Set(['index',...data.pages.map(p=>p.slug),...extraPages.map(p=>p.slug),'zh-Hans','login/index','404'])];
const release=process.env.RELEASE_HEAD||process.env.GITHUB_SHA||data.canonicalCommit;
for(const name of names) {
 const expected=fs.readFileSync(`ghscl-website/${name}.html`,'utf8');
 const pageUrl=new URL(`${name}.html?release=${release}`,root);
 let html='';
 for(let attempt=0;attempt<10;attempt++) {
  const response=await fetch(pageUrl,{cache:'no-store'});
  html=(response.ok || (name==='404' && response.status===404))?await response.text():'';
  if(html===expected)break;
  await new Promise(resolve=>setTimeout(resolve,3000));
 }
 assert.equal(html,expected,name+' deployment differs from built exact-head artifact');
 const assetRefs=[...html.matchAll(/<(?:script|link)\b[^>]*\b(?:src|href)="([^"]+\.(?:js|css)(?:\?[^"]*)?)"/gi)].map(match=>match[1]);
 for(const ref of assetRefs) {
  const assetUrl=new URL(ref,pageUrl);
  if(assetUrl.origin!==root.origin)continue;
  const rootPath=decodeURIComponent(root.pathname);
  const assetPath=decodeURIComponent(assetUrl.pathname);
  if(!assetPath.startsWith(rootPath))continue;
  const relative=assetPath.slice(rootPath.length);
  const normalized=path.posix.normalize(relative);
  assert.ok(normalized&&!normalized.startsWith('../')&&!path.isAbsolute(normalized),'unsafe local asset reference '+ref);
  const localPath=path.join('ghscl-website',normalized);
  assert.ok(fs.existsSync(localPath),`deployed asset is absent from build artifact: ${ref}`);
  const expectedAsset=fs.readFileSync(localPath,'utf8');
  assetUrl.searchParams.set('release',release);
  let actualAsset='';
  for(let attempt=0;attempt<10;attempt++) {
   const response=await fetch(assetUrl,{cache:'no-store'});
   actualAsset=response.ok?await response.text():'';
   if(actualAsset===expectedAsset)break;
   await new Promise(resolve=>setTimeout(resolve,3000));
  }
  assert.equal(actualAsset,expectedAsset,`deployed asset differs from exact-head artifact: ${ref}`);
 }
}
console.log(`Verified all ${names.length} deployed Pages HTML files and their local JavaScript/CSS assets against the exact-head build artifact.`);
