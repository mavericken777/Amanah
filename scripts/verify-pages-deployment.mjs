import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('ghscl-website/ecosystem.en.json','utf8'));
const base=process.env.PAGES_URL || data.baseUrl;
const names=['index',...data.pages.map(p=>p.slug),'404'];
for(const name of names) {
 const expected=fs.readFileSync(`ghscl-website/${name}.html`,'utf8');
 let html='';
 for(let attempt=0;attempt<10;attempt++) {
  const response=await fetch(new URL(`${name}.html?release=${process.env.GITHUB_SHA||data.canonicalCommit}`,base),{cache:'no-store'});
  html=(response.ok || (name==='404' && response.status===404))?await response.text():'';
  if(html===expected)break;
  await new Promise(resolve=>setTimeout(resolve,3000));
 }
 assert.equal(html,expected,name+' deployment differs from built exact-head artifact');
}
console.log(`Verified all ${names.length} deployed Pages HTML files against the exact-head build artifact.`);
