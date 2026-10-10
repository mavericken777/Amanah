import fs from 'node:fs';
const routes=['hardware','hardware-zh-Hans','hardware-zh-Hant','hardware-ar'];
for(const route of routes){
 const source=`platinum-site/dist/${route}.html`;
 if(!fs.existsSync(source))throw new Error(`Hardware route not built: ${route}`);
 fs.copyFileSync(source,`ghscl-website/${route}.html`);
}
const file='ghscl-website/sitemap.xml';
let sitemap=fs.readFileSync(file,'utf8');
for(const route of routes.slice(1)){
 const url=`https://mavericken777.github.io/Amanah/${route}.html`;
 if(!sitemap.includes(url))sitemap=sitemap.replace('</urlset>',`<url><loc>${url}</loc></url></urlset>`);
}
fs.writeFileSync(file,sitemap);
console.log('Promoted all four hardware languages to the shared Pages/Vercel artifact.');
