import fs from 'node:fs';
fs.rmSync('public/trust-journey',{recursive:true,force:true});
fs.mkdirSync('public/trust-journey',{recursive:true});
fs.cpSync('ghscl-website','public/trust-journey',{recursive:true,filter:p=>!p.endsWith('.md')});
console.log('Shared trust experience prepared for the Vercel application.');
