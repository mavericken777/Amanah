import assert from 'node:assert/strict';
import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('ghscl-website/ecosystem.en.json','utf8'));
const base=process.env.PAGES_URL || data.baseUrl;
for(const name of ['index',...data.pages.map(p=>p.slug)]) {
 let html='';
 for(let attempt=0;attempt<10;attempt++) {
  const response=await fetch(new URL(`${name}.html?release=${process.env.GITHUB_SHA||data.canonicalCommit}`,base),{cache:'no-store'});
  html=response.ok?await response.text():'';
  if(html.includes(data.canonicalCommit))break;
  await new Promise(resolve=>setTimeout(resolve,3000));
 }
 assert.ok(html.includes(data.canonicalCommit),name+' deployed canonical source');
 const expected=fs.readFileSync(`ghscl-website/${name}.html`,'utf8');
 assert.equal(html,expected,name+' deployment differs from built exact-head artifact');
}
console.log(`Verified all ${data.pages.length+1} deployed Pages HTML files against exact-head build and canonical ${data.canonicalCommit}.`);
