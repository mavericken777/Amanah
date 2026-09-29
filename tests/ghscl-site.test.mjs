import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('ghscl-website/index.html', 'utf8');
const css = fs.readFileSync('ghscl-website/styles.css', 'utf8');
const js = fs.readFileSync('ghscl-website/script.js', 'utf8');

test('GHSCL flagship site keeps required structural sections', () => {
  for (const id of ['top','system','intelligence','monitoring','corridor','stakeholders']) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }
  assert.match(html, /Data stays[\s\S]*Trust travels/i);
  assert.match(html, /seventeen standards|17-standard|Seventeen standards/i);
});

test('removed AHTE explainer does not regress', () => {
  assert.doesNotMatch(html, /WHAT\s+(?:IS|AHTE\s+IS)\s+AHTE/i);
  assert.doesNotMatch(html, /What it does[\s\S]*What it never does/i);
});

test('authority boundary is explicit in public copy', () => {
  assert.match(html, /Technology assists\. Humans decide\./i);
  assert.match(html, /not Halal certification/i);
  assert.match(html, /competent authorit/i);
});

test('website JavaScript parses successfully', () => {
  assert.doesNotThrow(() => new vm.Script(js, { filename: 'ghscl-website/script.js' }));
});

test('responsive and reduced-motion safeguards exist', () => {
  assert.match(css, /@media\(max-width:/);
  assert.match(css, /prefers-reduced-motion/);
});

test('site does not use insecure http assets', () => {
  assert.doesNotMatch(html, /(?:src|href)=["']http:\/\//i);
  assert.doesNotMatch(css, /url\(["']?http:\/\//i);
});
