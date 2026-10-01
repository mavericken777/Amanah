import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('ghscl-website/index.html', 'utf8');
const css = fs.readFileSync('ghscl-website/v4.css', 'utf8') + fs.readFileSync('ghscl-website/hybrid.css', 'utf8');
const js = fs.readFileSync('ghscl-website/v4.js', 'utf8') + fs.readFileSync('ghscl-website/hybrid.js', 'utf8');

test('GHSCL hybrid keeps the flagship narrative structure', () => {
  for (const id of ['top','cinema','system','twin','monitoring','corridor','stakeholders']) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }
  assert.match(html, /Data stays[\s\S]*Trust travels/i);
  assert.match(html, /Seventeen technical instruments/i);
});

test('Hybrid contains persistent cinematic, WebGL and original media assets', () => {
  for (const path of [
    'ghscl-website/media/ghscl-trust-film.mp4',
    'ghscl-website/media/ghscl-hybrid-film.mp4',
    'ghscl-website/media/ghscl-hybrid-film.webm',
    'ghscl-website/media/ghscl-mark.svg',
    'ghscl-website/media/facility-render.svg',
    'ghscl-website/media/lab-render.svg',
    'ghscl-website/media/port-render.svg',
    'ghscl-website/media/trust-object.svg',
    'ghscl-website/media/architecture.webp',
    'ghscl-website/media/corridor.webp',
    'ghscl-website/media/trust-core.webp',
    'ghscl-website/media/control-room.webp',
    'ghscl-website/media/ghscl-monogram.svg',
    'ghscl-website/media/ghscl-wordmark.svg'
  ]) assert.ok(fs.existsSync(path), `missing ${path}`);
  assert.match(html, /ghscl-hybrid-film\.mp4/);
  assert.match(js, /getContext\(['"]webgl['"]/);
  assert.match(js, /AudioContext|webkitAudioContext/);
  assert.match(js, /currentTime/);
});

test('removed AHTE explainer does not regress', () => {
  assert.doesNotMatch(html, /WHAT\s+(?:IS|AHTE\s+IS)\s+AHTE/i);
  assert.doesNotMatch(html, /What it does[\s\S]*What it never does/i);
});

test('authority boundary remains explicit', () => {
  assert.match(html, /AI assists\. Humans decide\./i);
  assert.match(html, /not a Malaysian Halal certificate/i);
  assert.match(html, /competent[- ]authority|competent authorit/i);
  assert.match(html, /Certification, border release and commercial approvals remain with their competent authorities and providers/i);
});

test('Shipment 001 stays explicitly pilot-only', () => {
  assert.match(html, /\[PILOT: SHIPMENT 001\]/);
  assert.match(html, /NO BILL OF LADING OR LIVE SENSOR DATA CLAIMED/i);
});

test('Hybrid JavaScript parses successfully', () => {
  assert.doesNotThrow(() => new vm.Script(js, { filename: 'ghscl-website/v4.js' }));
});

test('responsive, accessibility and reduced-motion safeguards exist', () => {
  assert.match(css, /@media\(max-width:/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(html, /aria-pressed=["']false["']/);
});

test('site does not use insecure http assets', () => {
  assert.doesNotMatch(html, /(?:src|href)=["']http:\/\//i);
  assert.doesNotMatch(css, /url\(["']?http:\/\//i);
});

 test('hybrid exposes all eight scenes and remains bound to corrected canonical source', () => {
  assert.equal((html.match(/class="cinema-chapter /g) || []).length,8);
  assert.equal((html.match(/class="chapter-jump /g) || []).length,8);
  assert.ok(html.includes(JSON.parse(fs.readFileSync('config/source-binding.json','utf8')).commit));
  assert.match(html,/authority_decided state has no onward machine transition/);
  assert.match(html,/JAKIM \/ MAIN \/ JAIN/);
});
