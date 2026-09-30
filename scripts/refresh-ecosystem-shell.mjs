import fs from 'node:fs';
import path from 'node:path';

const site='ghscl-website';
const data=JSON.parse(fs.readFileSync(path.join(site,'ecosystem.en.json'),'utf8'));
const m=data.messages;
const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nav=`<header class="site-header"><a class="site-brand" href="index.html"><img src="media/ghscl-monogram.svg" width="40" height="40" alt=""><span>${esc(m.brand)}<small>${esc(m.operator)}</small></span></a><details class="site-menu"><summary>${esc(m.menu)}</summary><nav aria-label="Primary">${data.navigation.map(([url,label])=>`<a href="${url}"${url==='index.html'?' aria-current="page"':''}>${esc(label)}</a>`).join('')}</nav></details><a class="site-start" href="manufacturers.html#onboarding">${esc(m.onboard)}</a></header>`;
const footer=`<footer class="site-footer"><div><img src="media/ghscl-wordmark.svg" width="120" height="32" alt="GHSCL"><p>${esc(m.principle)}</p><p>${esc(m.boundary)}</p></div><nav aria-label="Footer">${data.navigation.map(([u,l])=>`<a href="${u}">${esc(l)}</a>`).join('')}</nav><p class="site-provenance">[PROPOSAL: website presentation V7] · Canonical ${data.canonicalCommit.slice(0,12)} · Freeze: verified-2026-09-17/ · English first; Chinese, Malay and Arabic planned.</p></footer>`;
const file=path.join(site,'index.html');
let html=fs.readFileSync(file,'utf8');
html=html.replace(/(GlobalHalalDigitalTrust\/(?:blob|tree)\/)[a-f0-9]{40}/g, '$1'+data.canonicalCommit);
if(/<header class="site-header">[\s\S]*?<\/header>/.test(html)) html=html.replace(/<header class="site-header">[\s\S]*?<\/header>/,nav);
else html=html.replace(/<header class="nav"[\s\S]*?<\/header>/,nav);
if(/<footer class="site-footer">[\s\S]*?<\/footer>/.test(html)) html=html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,footer);
else html=html.replace(/<footer class="footer">[\s\S]*?<\/footer>/,footer);
fs.writeFileSync(file,html);
console.log('Refreshed public homepage navigation/footer from V7 structured source.');
