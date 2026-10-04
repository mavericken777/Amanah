import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const repoRoot = path.resolve(root, "..");
const data = JSON.parse(fs.readFileSync(path.join(repoRoot, "ghscl-website", "ecosystem.en.json"), "utf8"));
const template = fs.readFileSync(path.join(root, "dist", "index.html"), "utf8");

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

for (const page of data.pages) {
  const title = `${page.label} | Global Halal Supply Chain Limited`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  fs.writeFileSync(path.join(root, "dist", `${page.slug}.html`), html);
}

console.log(`Generated ${data.pages.length} platinum secondary HTML routes.`);
