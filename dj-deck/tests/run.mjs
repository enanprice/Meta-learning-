// Runs tests/index.html in headless Chromium and prints the results.
//   node tests/run.mjs [filter]
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import { execSync } from 'child_process';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); }

const here = path.dirname(fileURLToPath(import.meta.url));
const filter = process.argv[2] || '';
const browser = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
await page.goto(pathToFileURL(path.join(here, 'index.html')).href + (filter ? '?only=' + encodeURIComponent(filter) : ''));
await page.waitForFunction(() => window.__results, null, { timeout: 180000 });
const res = await page.evaluate(() => window.__results);
let fails = 0;
for (const r of res) {
  if (!r.ok) fails++;
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}  (${r.ms} ms)\n      ${r.note}`);
}
if (errors.length) console.log('\nPage errors:\n  ' + [...new Set(errors)].join('\n  '));
console.log(`\n${res.length - fails}/${res.length} passed`);
await browser.close();
process.exit(fails ? 1 : 0);
