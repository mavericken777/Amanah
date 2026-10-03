import fs from 'node:fs';
import vm from 'node:vm';
import './check-repository-links.mjs';
const base='ghscl-website/';
for(const name of ['ecosystem.js','hybrid.js','v4.js','premium.js','home-menu.js'])new vm.Script(fs.readFileSync(base+name,'utf8'),{filename:name});
const content=JSON.parse(fs.readFileSync(base+'ecosystem.en.json','utf8'));
if(new Set(content.pages.map(p=>p.slug)).size!==content.pages.length)throw new Error('Duplicate page slug');
for(const p of content.pages){if(!p.title||!p.description||!p.sources.length)throw new Error(`Incomplete page ${p.slug}`);}
const homepage=fs.readFileSync(`${base}index.html`,'utf8');
const homeCss=fs.readFileSync(`${base}home-refresh.css`,'utf8');
for(const phrase of ['Every product carries a story.','Make trust travel with it.','Amanah','AHTE','Illustrative architecture journey.','Start a conversation']){
  if(!homepage.includes(phrase))throw new Error(`Homepage is missing required visitor content: ${phrase}`);
}
for(const selector of ['id="top"','id="journey"','class="home-friction"','class="home-platform"','class="home-architecture"','class="home-corridor"','class="home-depth"']){
  if(!homepage.includes(selector))throw new Error(`Homepage story section is missing: ${selector}`);
}
if((homepage.match(/<h1\b/g)||[]).length!==1)throw new Error('Homepage must expose exactly one primary heading');
if(/NOT[_ -]PRODUCTION[_ -]READY|NOT[_ -]TRAVEL[_ -]READY|release gate|build status/i.test(homepage))throw new Error('Internal release/status language leaked into the public homepage');
for(const breakpoint of ['max-width: 767px','max-width: 900px','max-width: 390px','prefers-reduced-motion: reduce']){
  if(!homeCss.includes(breakpoint))throw new Error(`Homepage responsive/accessibility rule missing: ${breakpoint}`);
}
for(const [,target] of homepage.matchAll(/\b(?:href|src)="([^"#][^"]*)"/g)){
  if(/^https?:\/\//i.test(target)||target.startsWith('data:'))continue;
  const file=target.split('#')[0].split('?')[0];
  if(file&&!fs.existsSync(`${base}${file}`))throw new Error(`Broken homepage asset or route: ${target}`);
}
console.log('Public-site syntax and structured content checks passed.');
