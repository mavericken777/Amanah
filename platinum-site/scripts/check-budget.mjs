import { readdir, readFile, stat } from "node:fs/promises";
import { basename, extname, join, relative } from "node:path";
import { gzipSync } from "node:zlib";

const root = new URL("../dist/", import.meta.url);
const limits = {
  initialJsGzip: 200 * 1024,
  asyncJsGzipPerChunk: 200 * 1024,
  css: 140 * 1024,
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
let cssBytes = 0;

for (const file of files) {
  const info = await stat(file);
  total += info.size;
  if (extname(file) === ".css") cssBytes += info.size;
  if (file.endsWith(".map")) {
    throw new Error(`Source map must not be promoted: ${relative(distPath, file)}`);
  }
}

if (cssBytes > limits.css) throw new Error(`.css budget exceeded: ${cssBytes} > ${limits.css} bytes`);
if (total > limits.total) throw new Error(`Total bundle budget exceeded: ${total} > ${limits.total} bytes`);

const indexHtml = await readFile(join(distPath, "index.html"), "utf8");
const entryNames = new Set(
  [...indexHtml.matchAll(/<script[^>]+src=["']([^"']+\.js)["']/g)].map(match => basename(match[1]))
);
if (!entryNames.size) throw new Error("No production JavaScript entry found in dist/index.html");

let initialJsGzip = 0;
const asyncChunks = [];
for (const file of files.filter(file => extname(file) === ".js")) {
  const source = await readFile(file);
  const gzipBytes = gzipSync(source, { level: 9 }).byteLength;
  const name = basename(file);
  if (entryNames.has(name)) {
    initialJsGzip += gzipBytes;
  } else {
    asyncChunks.push({ name, gzipBytes });
    if (gzipBytes > limits.asyncJsGzipPerChunk) {
      throw new Error(`Async JS chunk gzip budget exceeded: ${name} ${gzipBytes} > ${limits.asyncJsGzipPerChunk} bytes`);
    }
  }
}

if (initialJsGzip > limits.initialJsGzip) {
  throw new Error(`Initial JS gzip budget exceeded: ${initialJsGzip} > ${limits.initialJsGzip} bytes`);
}

console.log(JSON.stringify({
  totalBytes: total,
  cssBytes,
  initialJsGzip,
  entryNames: [...entryNames],
  asyncChunks: asyncChunks.sort((a,b) => b.gzipBytes - a.gzipBytes),
  limits
}, null, 2));
