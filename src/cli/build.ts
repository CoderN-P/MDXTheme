#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

function parseArgs() {
  const args = process.argv.slice(2);
  const opts: Record<string, string> = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      opts[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return opts;
}

const opts = parseArgs();
const inputDir = path.resolve(opts.input || ".");
const outputDir = path.resolve(opts.output || path.join(inputDir, "out"));
let repoName = opts.repoName || path.basename(process.cwd()); // repo folder name

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateDir = path.join(__dirname, "../../template");

// 1. Clean template/pages folder (to avoid stale files)
const pagesDir = path.join(templateDir, "pages");
// Remove only .mdx files from pagesDir
if (fs.existsSync(pagesDir)) {
  for (const file of fs.readdirSync(pagesDir)) {
    if (file.endsWith(".mdx")) {
      fs.rmSync(path.join(pagesDir, file));
    }
  }
} else {
  fs.mkdirSync(pagesDir, { recursive: true });
}

fs.mkdirSync(pagesDir, { recursive: true });

// 2. Copy only .mdx files into template/pages
const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".mdx"));
for (const file of files) {
  fs.copyFileSync(path.join(inputDir, file), path.join(pagesDir, file));
}

// 3. Set environment variable for basePath and assetPrefix injection
// (Modify next.config.js to read these and apply conditionally)

if (repoName !== "null") {
      process.env.EXPORT_BASE_PATH = `/${repoName}`;
} else {
      console.log("No repoName provided, skipping basePath and assetPrefix setup.");
}

// 4. Run build and export inside templateDir (uses existing node_modules)
execSync("npm run build", { cwd: templateDir, stdio: "inherit", env: process.env });

// 5. Copy output folder to desired output location
fs.rmSync(outputDir, { recursive: true, force: true });
fs.cpSync(path.join(templateDir, "out"), outputDir, { recursive: true });

// 6. Delete out folder inside templateDir
fs.rmSync(path.join(templateDir, "out"), { recursive: true, force: true });

// 7. Remove mdx files from template/pages
for (const file of fs.readdirSync(pagesDir)) {
    if (file.endsWith(".mdx")) {
      fs.rmSync(path.join(pagesDir, file));
    }
}

console.log(`✅ Site built at ${outputDir}`);