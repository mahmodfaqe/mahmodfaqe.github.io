import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
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

const projectsDist = join(dist, "projects");
const projectsOut = join(root, "projects");
if (existsSync(projectsDist)) {
  rmSync(projectsOut, { recursive: true, force: true });
  cpSync(projectsDist, projectsOut, { recursive: true });
}

console.log("Published dist → repository root for GitHub Pages.");
