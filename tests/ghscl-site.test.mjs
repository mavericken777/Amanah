import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const html = fs.readFileSync('ghscl-website/index.html', 'utf8');
const css = fs.readFileSync('ghscl-website/home-refresh.css', 'utf8');
const deep = Object.fromEntries(['digital-trust','china-gcc','smart-audit'].map(name => [name, fs.readFileSync(`ghscl-website/${name}.html`, 'utf8')]));
const js = fs.readFileSync('ghscl-website/ecosystem.js', 'utf8');

test('homepage explains Amanah to first-time visitors', () => {
  for (const id of ['top','journey']) assert.match(html, new RegExp(`id=["']${id}["']`));
  for (const phrase of ['Every product carries a story.','Make trust travel with it.','From a source record to a confident handoff.','WHY A CONNECTED STORY MATTERS','Connected workflows for the people behind halal trade.','A practical workspace, built on a wider trust foundation.','Start a conversation']) assert.ok(html.includes(phrase), `missing visitor message: ${phrase}`);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/home-refresh\.css/);
});

test('homepage preserves the Amanah and AHTE relationship and points to deeper material', () => {
  assert.match(html,/Amanah Halal Trust Ecosystem/);
  for (const path of ['ecosystem.html','how-it-works.html','digital-trust.html','china-gcc.html','contact.html#enquiry']) assert.ok(html.includes(`href="${path}"`), `missing ${path}`);
  assert.match(deep['digital-trust'],/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
  assert.match(deep['china-gcc'],/China/);
});

test('authority boundaries and pilot status remain available in the appropriate detail pages', () => {
  assert.match(html,/Certification and other official decisions remain with the competent authorities and providers/);
  assert.doesNotMatch(html,/\[PILOT: SHIPMENT 001\]|NOT[_ -]PRODUCTION[_ -]READY|release gate/i);
  assert.match(deep['smart-audit'],/certification|competent authority/i);
  assert.match(fs.readFileSync('ghscl-website/ecosystem.en.json','utf8'),/Shipment 001 remains a pilot requiring real execution evidence/);
});

test('brand media remain available and homepage uses the approved visual assets', () => {
  for (const path of ['ghscl-website/media/ghscl-mark.svg','ghscl-website/media/architecture.webp','ghscl-website/media/corridor.webp','ghscl-website/media/ghscl-monogram.svg','ghscl-website/media/ghscl-wordmark.svg','ghscl-website/media/ghscl-hybrid-film.mp4']) assert.ok(fs.existsSync(path), `missing ${path}`);
  assert.match(html,/media\/architecture\.webp/);
  assert.match(html,/media\/ghscl-wordmark\.svg/);
  assert.doesNotMatch(html,/webglHero|ghscl-hybrid-film/);
});

test('ecosystem runtime parses successfully', () => {
  assert.doesNotThrow(() => new vm.Script(js, { filename: 'ghscl-website/ecosystem.js' }));
});

test('homepage responsive, keyboard and reduced-motion support exists', () => {
  assert.match(css,/max-width: 767px/);
  assert.match(css,/max-width: 900px/);
  assert.match(css,/prefers-reduced-motion: reduce/);
  assert.match(html,/class="skip-link"/);
  assert.match(html,/class="site-menu"/);
  assert.match(html,/aria-label="Primary"/);
});

test('homepage does not use insecure http assets', () => {
  assert.doesNotMatch(html,/(?:src|href)=["']http:\/\//i);
  assert.doesNotMatch(css,/url\(["']?http:\/\//i);
});
