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
let repoName = opts.repoName || path.basename(process.cwd());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateDir = path.join(__dirname, "../../template");

// 1. Create temp directory in user's working directory
const tempDir = path.join(process.cwd(), '.mdxtheme-build');
console.log('Creating temporary build directory...');
fs.rmSync(tempDir, { recursive: true, force: true });

// 2. Copy template to temp directory (includes package.json with dependencies)
console.log('Copying template...');
fs.cpSync(templateDir, tempDir, { recursive: true });

// 3. Copy user's MDX files to temp template pages directory
const tempPagesDir = path.join(tempDir, "pages");
fs.mkdirSync(tempPagesDir, { recursive: true });

console.log('Copying MDX files...');
const files = fs.readdirSync(inputDir).filter((f) => f.endsWith(".mdx"));
for (const file of files) {
  fs.copyFileSync(path.join(inputDir, file), path.join(tempPagesDir, file));
}

// 4. Set environment variable for basePath and assetPrefix injection
if (repoName !== "null") {
  process.env.EXPORT_BASE_PATH = `/${repoName}`;
} else {
  console.log("No repoName provided, skipping basePath and assetPrefix setup.");
}

// 5. Install dependencies in temp directory
console.log('Installing dependencies...');
execSync("npm install", { cwd: tempDir, stdio: "inherit" });

// 6. Build the site in temp directory
console.log('Building site...');
execSync("npm run build", { cwd: tempDir, stdio: "inherit", env: process.env });

// 7. Copy output to user's desired output location
console.log('Copying output...');
fs.rmSync(outputDir, { recursive: true, force: true });
fs.cpSync(path.join(tempDir, "out"), outputDir, { recursive: true });

// 8. Cleanup temp directory
console.log('Cleaning up...');
fs.rmSync(tempDir, { recursive: true, force: true });

console.log(`✅ Site built at ${outputDir}`);