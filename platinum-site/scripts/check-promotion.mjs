import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const index = await readFile(join(dist, "index.html"), "utf8");
const assets = await readdir(join(dist, "assets"));

const required = [
  /<html[^>]+lang=["']en["']/i,
  /<meta[^>]+name=["']viewport["']/i,
  /<title>[^<]+<\/title>/i,
  /<div[^>]+id=["']root["']/i,
];

for (const rule of required) {
  if (!rule.test(index)) throw new Error(`Promotion check failed: missing ${rule}`);
}
if (/localhost|127\.0\.0\.1/.test(index)) throw new Error("Promotion check failed: localhost reference in built HTML");
if (/http:\/\//.test(index)) throw new Error("Promotion check failed: insecure http:// reference in built HTML");
if (!assets.some((name) => name.endsWith(".js"))) throw new Error("Promotion check failed: no JavaScript asset");
if (!assets.some((name) => name.endsWith(".css"))) throw new Error("Promotion check failed: no CSS asset");

console.log("Promotion readiness passed: build is self-contained and structurally valid.");
