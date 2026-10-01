import fs from 'node:fs';
import vm from 'node:vm';
import './check-repository-links.mjs';
const base='ghscl-website/';
for(const name of ['ecosystem.js','hybrid.js','v4.js','premium.js'])new vm.Script(fs.readFileSync(base+name,'utf8'),{filename:name});
const content=JSON.parse(fs.readFileSync(base+'ecosystem.en.json','utf8'));
if(new Set(content.pages.map(p=>p.slug)).size!==content.pages.length)throw new Error('Duplicate page slug');
for(const p of content.pages){if(!p.title||!p.description||!p.sources.length)throw new Error(`Incomplete page ${p.slug}`);}
console.log('Public-site syntax and structured content checks passed.');
