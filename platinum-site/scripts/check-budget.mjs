import { readdir, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const root = new URL("../dist/", import.meta.url);
const limits = {
  ".js": 550 * 1024,
  ".css": 140 * 1024,
  total: 1.5 * 1024 * 1024,
};

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const distPath = root.pathname;
const files = await walk(distPath);
let total = 0;
const byType = new Map();

for (const file of files) {
  const info = await stat(file);
  total += info.size;
  const ext = extname(file);
  byType.set(ext, (byType.get(ext) ?? 0) + info.size);
  if (file.endsWith(".map")) {
    throw new Error(`Source map must not be promoted: ${relative(distPath, file)}`);
  }
}

for (const [ext, limit] of Object.entries(limits)) {
  if (ext === "total") continue;
  const actual = byType.get(ext) ?? 0;
  if (actual > limit) {
    throw new Error(`${ext} budget exceeded: ${actual} > ${limit} bytes`);
  }
}
if (total > limits.total) throw new Error(`Total bundle budget exceeded: ${total} > ${limits.total} bytes`);

console.log(JSON.stringify({
  totalBytes: total,
  jsBytes: byType.get(".js") ?? 0,
  cssBytes: byType.get(".css") ?? 0,
  limits
}, null, 2));
