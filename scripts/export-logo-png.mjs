#!/usr/bin/env node
/**
 * Export logo.svg to high-res PNG at various sizes.
 * Run: node scripts/export-logo-png.mjs
 */
import sharp from "sharp";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public", "logo.svg");
const outputDir = join(root, "public");

const svg = readFileSync(svgPath);

const sizes = [512, 1024, 2048];

for (const size of sizes) {
  const outPath = join(outputDir, `logo-${size}.png`);
  await sharp(svg)
    .resize(size)
    .png()
    .toFile(outPath);
  console.log(`Exported ${outPath}`);
}

console.log("\nDone! High-res PNGs saved to public/ folder.");
