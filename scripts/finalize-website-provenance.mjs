import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'ghscl-website');
const binding = JSON.parse(fs.readFileSync(path.join(root, 'config', 'source-binding.json'), 'utf8'));
const indexPath = path.join(site, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const marker = `data-current-ghdt-commit="${binding.commit}"`;
if (!html.includes(marker)) {
  html = html.replace('<meta name="referrer" content="no-referrer">', `<meta name="referrer" content="no-referrer"><meta name="${marker.split('=')[0]}" content="${binding.commit}">`);
}

fs.writeFileSync(indexPath, html);
