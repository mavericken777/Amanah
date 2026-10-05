import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const repoRoot = path.resolve(root, "..");
const data = JSON.parse(fs.readFileSync(path.join(repoRoot, "ghscl-website", "ecosystem.en.json"), "utf8"));
const template = fs.readFileSync(path.join(root, "dist", "index.html"), "utf8");
const extraPages = JSON.parse(fs.readFileSync(path.join(root, "data", "extra-pages.json"), "utf8"));

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

for (const page of [...data.pages, ...extraPages]) {
  const title = `${page.label} | Global Halal Supply Chain Limited`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  const locale = page.slug === "ar" ? "ar" : page.slug === "zh-Hant" ? "zh-Hant" : "en";
  html = html.replace(/<html[^>]*>/, '<html lang="' + locale + '"' + (locale === "ar" ? ' dir="rtl"' : "") + '>');
  fs.writeFileSync(path.join(root, "dist", `${page.slug}.html`), html);
}

const legacyChinese = path.join(root, "dist", "zh-Hans.html");
const traditionalChinese = path.join(root, "dist", "zh-Hant.html");
if (fs.existsSync(traditionalChinese)) fs.copyFileSync(traditionalChinese, legacyChinese);
const sitemapPath = path.join(repoRoot, "ghscl-website", "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  const urls = ["index.html", ...data.pages.map(page => `${page.slug}.html`), ...extraPages.map(page => `${page.slug}.html`), "zh-Hans.html", "login/index.html"];
  const base = data.baseUrl.endsWith("/") ? data.baseUrl : `${data.baseUrl}/`;
  const rows = urls.map(url => '<url><loc>' + base + url + '</loc></url>').join("");
  fs.writeFileSync(sitemapPath, '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + urls.map(url => '<url><loc>' + base + url + '</loc></url>').join("") + '</urlset>\n');
}
console.log(`Generated ${data.pages.length + extraPages.length} platinum secondary HTML routes and refreshed legacy aliases.`);
