import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;
const index = await readFile(join(dist, "index.html"), "utf8");
const assets = await readdir(join(dist, "assets"));

const required = [
  /<html[^>]+lang=["']en["']/i,
  /<meta[^>]+name=["']viewport["']/i,
  /<title>[^<]+<\/title>/i,
  /<div[^>]+id=["']root["']/i,
];

for (const rule of required) {
  if (!rule.test(index)) throw new Error(`Promotion gate failed: missing ${rule}`);
}
if (/localhost|127\.0\.0\.1/.test(index)) throw new Error("Promotion gate failed: localhost reference in built HTML");
if (/http:\/\//.test(index)) throw new Error("Promotion gate failed: insecure http:// reference in built HTML");
if (!assets.some((name) => name.endsWith(".js"))) throw new Error("Promotion gate failed: no JavaScript asset");
if (!assets.some((name) => name.endsWith(".css"))) throw new Error("Promotion gate failed: no CSS asset");

console.log("Promotion-readiness gate passed: build is self-contained and structurally valid.");
