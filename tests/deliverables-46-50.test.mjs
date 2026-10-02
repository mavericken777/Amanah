import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const mustExist = [
  'ghscl-website/corporate-profile.html',
  'ghscl-website/visuals.html',
  'docs/corporate/GHSCL_CORPORATE_PROFILE_2026.md',
  'docs/media/MASTER_INFOGRAPHIC_SUITE_2026.md',
  'docs/media/MASTER_CINEMATIC_VIDEO_2026.md',
  'docs/media/MASTER_VOICEOVER_EN_2026.md',
  'ghscl-website/media/ghscl-master-film-en.vtt',
  'ghscl-website/media/ghscl-hybrid-film.mp4',
  'ghscl-website/media/ghscl-hybrid-film.webm'
];

for (let i=1;i<=8;i++) {
  const names=[
    '01_authority_topology.svg','02_canonical_path.svg','03_china_gcc_corridor.svg','04_trust_lifecycle.svg',
    '05_evidence_envelope.svg','06_lab_evidence_chain.svg','07_command_center.svg','08_state_separation.svg'
  ];
  mustExist.push('ghscl-website/media/infographics/'+names[i-1]);
}

test('items 46-50 deliverables exist', () => {
  for (const path of mustExist) assert.ok(fs.existsSync(path), 'missing '+path);
});

test('corporate website exposes profile and infographic suite', () => {
  const home=fs.readFileSync('ghscl-website/index.html','utf8');
  assert.match(home,/corporate-profile\.html/);
  assert.match(home,/visuals\.html/);
  assert.match(home,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(home,/China → GCC/);
});

test('corporate profile preserves authority boundary', () => {
  const p=fs.readFileSync('docs/corporate/GHSCL_CORPORATE_PROFILE_2026.md','utf8');
  assert.match(p,/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(p,/does not create Halal certification/i);
  assert.match(p,/NOT_DETECTED ≠ HALAL/);
});

test('infographic masters preserve canonical topology and corridor', () => {
  const authority=fs.readFileSync('ghscl-website/media/infographics/01_authority_topology.svg','utf8');
  const corridor=fs.readFileSync('ghscl-website/media/infographics/03_china_gcc_corridor.svg','utf8');
  assert.match(authority,/DIRECT JAKIM API/);
  assert.match(authority,/AHTE/);
  assert.match(authority,/JAKIM/);
  assert.match(corridor,/CHINA/);
  assert.match(corridor,/GCC/);
});

test('cinematic and voiceover controls prohibit unsupported certification claims', () => {
  const film=fs.readFileSync('docs/media/MASTER_CINEMATIC_VIDEO_2026.md','utf8');
  const voice=fs.readFileSync('docs/media/MASTER_VOICEOVER_EN_2026.md','utf8');
  assert.match(film,/No AI certification/);
  assert.match(film,/No laboratory certification/);
  assert.match(voice,/Authorised humans and competent authorities/);
  assert.match(voice,/752c27b1-9201-4002-b8f7-caf368123abe/);
});
