// Builds the web version of First Paycheck for sites with a strict
// Content-Security-Policy (script-src 'self'): the two inline scripts in
// first-paycheck.html move into core.js and ui.js. The single file stays the
// source of truth and is copied alongside, so visitors can download it to use offline.
//
// Usage: node build-web.mjs [outDir]   (default: web)
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.argv[2] || "web";
const src = readFileSync("first-paycheck.html", "utf8");

function take(id) {
  const re = new RegExp(`<script id="${id}">([\\s\\S]*?)<\\/script>`);
  const m = src.match(re);
  if (!m) throw new Error(`script #${id} not found`);
  return m;
}
const core = take("core");
const ui = take("ui");

let html = src
  .replace(core[0], '<script src="core.js"></script>')
  .replace(ui[0], '<script src="ui.js"></script>')
  .replace(
    /<footer class="no-print">([\s\S]*?)<\/footer>/,
    '<footer class="no-print">$1<br><a href="first-paycheck.html" download>Download this tool</a> to use it without the internet, for example from a USB drive. ' +
      '<a href="https://github.com/olivercrocco/first-paycheck">Source on GitHub</a>.</footer>'
  )
  .replace(
    "<title>First Paycheck</title>",
    '<title>First Paycheck</title>\n<meta name="description" content="A free paycheck and budget tool for formerly incarcerated individuals. See take-home pay after 2026 federal and Louisiana taxes and plan the costs that come first after release.">'
  );

if (html.includes("<script>") || /<script id=/.test(html)) throw new Error("inline script left in web build");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "index.html"), html);
writeFileSync(join(outDir, "core.js"), core[1].trim() + "\n");
writeFileSync(join(outDir, "ui.js"), ui[1].trim() + "\n");
copyFileSync("first-paycheck.html", join(outDir, "first-paycheck.html"));
console.log(`Built ${outDir}/: index.html, core.js, ui.js, first-paycheck.html`);
