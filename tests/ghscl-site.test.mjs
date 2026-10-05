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
  for (const phrase of ['From origin to market.','Trust travels with the product.','One product. One identity. One continuous story.','WHY A CONNECTED STORY MATTERS','AHTE ⇄ Direct JAKIM API ⇄ JAKIM','China → GCC direct','Start a conversation']) assert.ok(html.includes(phrase), `missing visitor message: ${phrase}`);
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.match(html,/home-refresh\.css/);
});

test('homepage preserves the Amanah and AHTE relationship and points to deeper material', () => {
  assert.match(html,/Amanah Halal Trust Ecosystem/);
  for (const path of ['ecosystem.html','how-it-works.html','digital-trust.html','china-gcc.html','contact.html#enquiry']) assert.ok(html.includes(`href="${path}"`), `missing ${path}`);
  assert.match(fs.readFileSync('ghscl-website/ecosystem.html','utf8'),/AHTE ⇄ Direct JAKIM API ⇄ JAKIM/);
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
  const menu=fs.readFileSync('ghscl-website/home-menu.js','utf8');
  assert.doesNotThrow(() => new vm.Script(menu, { filename: 'ghscl-website/home-menu.js' }));
  assert.match(menu,/event\.key === 'Escape'/);
});

test('homepage responsive, keyboard and reduced-motion support exists', () => {
  assert.match(css,/max-width: 767px/);
  assert.match(css,/max-width: 900px/);
  assert.match(css,/prefers-reduced-motion: reduce/);
  assert.match(html,/class="skip-link"/);
  assert.match(html,/class="site-menu"/);
  assert.match(html,/aria-label="Primary"/);
});

test('platinum homepage uses the obsidian and gold design and accessible trust disclosures', () => {
  const platinum = fs.readFileSync('ghscl-website/platinum.css', 'utf8');
  assert.match(html, /class="home-refresh platinum-home"/);
  assert.match(html, /href="platinum.css"/);
  assert.match(html, /id="trust-terminal"/);
  assert.equal((html.match(/class="terminal-card"/g)||[]).length,4);
  assert.match(html, /class="[^"]*platinum-shield[^"]*"/);
  assert.match(platinum, /--platinum-gold: oklch\(/);
  assert.ok(platinum.includes('.platinum-home .stack-participants span { color: var(--platinum-gold-light); background: var(--platinum-raised);'), 'Amanah/AHTE participant labels need a high-contrast surface');
  for (const rule of ['max-width: 1024px','max-width: 900px','max-width: 767px','max-width: 480px','prefers-reduced-transparency: reduce','prefers-reduced-motion: reduce']) assert.ok(platinum.includes(rule), 'missing design rule: '+rule);
  assert.doesNotMatch(html, /JAKIM SYNC ACTIVE|ZERO PORCINE|PORCINE DNA: NOT DETECTED|99\.7%|RELEASE TRIGGERED/);
});

test('homepage does not use insecure http assets', () => {
  assert.doesNotMatch(html,/(?:src|href)=["']http:\/\//i);
  assert.doesNotMatch(css,/url\(["']?http:\/\//i);
});
