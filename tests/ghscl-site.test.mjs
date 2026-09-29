import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('ghscl-website/index.html', 'utf8');
const css = fs.readFileSync('ghscl-website/v4.css', 'utf8');
const js = fs.readFileSync('ghscl-website/v4.js', 'utf8');

test('GHSCL V4 keeps the flagship narrative structure', () => {
  for (const id of ['top','cinema','system','twin','monitoring','corridor','stakeholders']) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }
  assert.match(html, /Data stays[\s\S]*Trust travels/i);
  assert.match(html, /Seventeen technical instruments/i);
});

test('V4 contains persistent cinematic, WebGL and original media assets', () => {
  for (const path of [
    'ghscl-website/media/ghscl-trust-film.mp4',
    'ghscl-website/media/ghscl-mark.svg',
    'ghscl-website/media/facility-render.svg',
    'ghscl-website/media/lab-render.svg',
    'ghscl-website/media/port-render.svg',
    'ghscl-website/media/trust-object.svg'
  ]) assert.ok(fs.existsSync(path), `missing ${path}`);
  assert.match(html, /ghscl-trust-film\.mp4/);
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
  assert.match(html, /NONE OF THESE[\s\S]*CREATE MALAYSIAN HALAL CERTIFICATION/i);
});

test('Shipment 001 stays explicitly pilot-only', () => {
  assert.match(html, /\[PILOT: SHIPMENT 001\]/);
  assert.match(html, /NO BILL OF LADING OR LIVE SENSOR DATA CLAIMED/i);
});

test('V4 JavaScript parses successfully', () => {
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
