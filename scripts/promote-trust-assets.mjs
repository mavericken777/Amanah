import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "platinum-site", "dist", "assets");
const target = path.join(root, "ghscl-website", "assets");

if (!fs.existsSync(path.join(source, "process-scene.js"))) {
  throw new Error("Build the Platinum scene bundle before promoting trust-journey assets.");
}

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(source, target, { recursive: true });
console.log(`Promoted ${fs.readdirSync(source).length} production assets into the public trust journey.`);
