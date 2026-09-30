import assert from 'node:assert/strict';
const repository=process.env.GITHUB_REPOSITORY;
const head=process.env.RELEASE_HEAD;
assert.ok(repository && /^[a-f0-9]{40}$/.test(head||''),'Release head and repository required');
async function get(path) {
 const response=await fetch(`https://api.github.com/repos/${repository}/${path}`,{headers:{Authorization:`Bearer ${process.env.GITHUB_TOKEN}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});
 assert.ok(response.ok,`GitHub release read-back failed: ${response.status}`);
 return response.json();
}
assert.equal((await get('git/ref/heads/main')).object.sha,head,'Deployment must use current main');
const checks=(await get(`commits/${head}/check-runs?per_page=100`)).check_runs;
for(const name of ['typecheck','test','edge-functions','policies','reference-platform','reference-runtime','build','browser-smoke']) {
 const matches=checks.filter(c=>c.name===name);
 assert.ok(matches.length,`Missing release check ${name}`);
 for(const check of matches) {
  assert.equal(check.head_sha,head,name+' exact head');
  assert.equal(check.status,'completed',name);
  assert.equal(check.conclusion,'success',name);
 }
}
console.log('Current main and every exact-head release check verified before Pages deployment.');
