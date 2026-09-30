import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
function check(file) {
 const content=fs.readFileSync(file,'utf8');
 for(const [,href] of content.matchAll(/(?<!!)\[[^\]]+\]\(([^)]+)\)/g)) {
  if(/^[a-z]+:/i.test(href))continue;
  const target=href.split('#')[0];
  if(target)assert.ok(fs.existsSync(path.resolve(path.dirname(file),target)),`${file}: missing ${href}`);
 }
}
function walk(dir) {
 for(const item of fs.readdirSync(dir,{withFileTypes:true})) {
  const file=path.join(dir,item.name);
  if(item.isDirectory())walk(file);
  else if(file.endsWith('.md'))check(file);
 }
}
walk('docs');walk('ghscl-website');
for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.md')))check(file);
console.log('All repository documentation links resolve, including archived audit evidence.');
