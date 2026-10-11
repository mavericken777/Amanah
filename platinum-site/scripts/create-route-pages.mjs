import fs from "node:fs";
import path from "node:path";
import { createServer } from "vite";
import { inferKind, sceneImage } from "../src/components/scene/sceneImages.ts";

const root = process.cwd();
const repoRoot = path.resolve(root, "..");
const data = JSON.parse(fs.readFileSync(path.join(repoRoot, "ghscl-website", "ecosystem.en.json"), "utf8"));
const template = fs.readFileSync(path.join(root, "dist", "secondary.html"), "utf8");
const extraPages = JSON.parse(fs.readFileSync(path.join(root, "data", "extra-pages.json"), "utf8"));

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

const renderer = await createServer({ server: { middlewareMode: true }, appType: "custom" });
const { renderPage } = await renderer.ssrLoadModule("/src/prerender.tsx");

for (const page of [...data.pages, ...extraPages]) {
  const title = `${page.label} | Global Halal Supply Chain Ltd`;
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(page.description)}" />`);
  const locale = page.slug === "ar" ? "ar" : page.slug === "zh-Hant" ? "zh-Hant" : "en";
  html = html.replace("assets/journey-panorama.avif", "assets/" + sceneImage(inferKind(page.slug)));
  html = html.replace(/<html[^>]*>/, '<html lang="' + locale + '"' + (locale === "ar" ? ' dir="rtl"' : "") + '>');
  const canonical=data.baseUrl+page.slug+'.html';
  const metadata='<link rel="canonical" href="'+canonical+'"><meta property="og:title" content="'+escapeHtml(title)+'"><meta property="og:url" content="'+canonical+'"><script type="application/ld+json">'+JSON.stringify({'@context':'https://schema.org','@type':'WebPage',name:title,url:canonical,inLanguage:locale}).replaceAll('<','\\u003c')+'</script>';
  html=html.replace('</head>',metadata+'</head>');
  html = html.replace('<div id="root"></div>' , '<div id="root">' + renderPage(page.slug) + '</div>');
  fs.writeFileSync(path.join(root, "dist", `${page.slug}.html`), html);
}

await renderer.close();
fs.unlinkSync(path.join(root, "dist", "secondary.html"));

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
