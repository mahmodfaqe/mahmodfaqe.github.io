import { cpSync, mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const assetsOut = join(root, "assets");

if (!existsSync(join(dist, "index.html"))) {
  console.error("dist/index.html missing. Run vite build first.");
  process.exit(1);
}

rmSync(assetsOut, { recursive: true, force: true });
mkdirSync(assetsOut, { recursive: true });
cpSync(join(dist, "assets"), assetsOut, { recursive: true });
cpSync(join(dist, "index.html"), join(root, "index.html"));
cpSync(join(dist, "404.html"), join(root, "404.html"));

const cvTitle = "Mahmood Khdir Faqe Rasul — CV";
const cvUrl = "https://mahmodfaqe.github.io/cv/";
const cvHtml = readFileSync(join(dist, "index.html"), "utf8")
  .replace(/<title>[^<]*<\/title>/, `<title>${cvTitle}</title>`)
  .replace(/(<link rel="canonical" href=")[^"]*/, `$1${cvUrl}`)
  .replace(/(<meta property="og:url" content=")[^"]*/, `$1${cvUrl}`)
  .replace(/(<meta property="og:title" content=")[^"]*/, `$1${cvTitle}`)
  .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${cvTitle}`);
const cvOut = join(root, "cv");
rmSync(cvOut, { recursive: true, force: true });
mkdirSync(cvOut, { recursive: true });
writeFileSync(join(cvOut, "index.html"), cvHtml);

for (const file of [
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  ".nojekyll",
  "og-cover.jpg",
  "og-cover.webp",
  "photo.jpg",
  "favicon.ico",
  "apple-touch-icon.png",
]) {
  const from = join(dist, file);
  if (existsSync(from)) {
    cpSync(from, join(root, file));
  }
}

const projectsDist = join(dist, "projects");
const projectsOut = join(root, "projects");
if (existsSync(projectsDist)) {
  rmSync(projectsOut, { recursive: true, force: true });
  cpSync(projectsDist, projectsOut, { recursive: true });
}

console.log("Published dist → repository root for GitHub Pages.");
