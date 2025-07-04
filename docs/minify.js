// minify.js
import { minify } from "html-minifier-terser";
import { glob } from "glob";
import { promises as fs } from "fs";
import path from "path";

const distDir = "dist";
const minifyOptions = {
  collapseWhitespace: true,
  removeComments: true,
};

async function run() {
  try {
    const files = await glob(`${distDir}/**/*.html`);
    console.log(`Found ${files.length} HTML files to minify.`);

    for (const file of files) {
      const source = await fs.readFile(file, "utf8");
      const minified = await minify(source, minifyOptions);
      await fs.writeFile(file, minified);
      console.log(`Minified: ${file}`);
    }
    console.log("\nMinification complete!");
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

run();
