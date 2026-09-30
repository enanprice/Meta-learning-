// Drives the real app (index.html) in headless Chromium like a user would.
//   node tests/ui.mjs [stage]
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); }
const here = path.dirname(fileURLToPath(import.meta.url));
const fx = (f) => path.join(here, 'fixtures', f);
const shots = path.join(here, 'shots'); fs.mkdirSync(shots, { recursive: true });
const stage = process.argv[2] || 'all';

const browser = await pw.chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.g/.test(m.text())) errors.push('console: ' + m.text()); });
await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
if (process.env.INIT) await page.addInitScript({ path: process.env.INIT });
await page.goto(pathToFileURL(path.join(here, '..', 'index.html')).href);

let pass = 0, fail = 0;
async function check(name, fn) {
  try { const note = await fn(); console.log('PASS ', name, note ? '— ' + note : ''); pass++; }
  catch (e) { console.log('FAIL ', name, '—', e.message.split('\n')[0]); fail++; }
}
const until = (fn, arg, ms = 8000) => page.waitForFunction(fn, arg, { timeout: ms });
const deckState = (id) => page.evaluate((id) => { const d = DJ.engine.decks[id]; return { playing: d.playing, pos: d.position(), track: d.track && d.track.title, bpm: d.track && d.track.bpm, key: d.track && d.track.key && d.track.key.camelot, pitch: d.pitch }; }, id);

await until(() => window.DJ && DJ.engine && DJ.ui.views.A);
await check('start-audio prompt appears and clears on click', async () => {
  const shown = await page.locator('.start-audio').count();
  if (shown) await page.locator('.start-audio .btn').click();
  await until(() => DJ.engine.ctx.state === 'running');
  return shown ? 'prompt shown, audio running' : 'audio already running';
});

await check('demo tracks load on both decks and deck A plays with one click', async () => {
  await until(() => DJ.engine.decks.A.track && DJ.engine.decks.B.track && !DJ.engine.decks.B.loading, null, 20000);
  await page.click('[data-ctl="A.play"]');
  await page.waitForTimeout(600);
  const r = await page.evaluate(() => ({ a: DJ.engine.decks.A.track.title, b: DJ.engine.decks.B.track.title, bpm: DJ.engine.decks.A.track.bpm, key: DJ.engine.decks.A.track.key && DJ.engine.decks.A.track.key.camelot, level: DJ.engine.decks.A.level(), master: Math.max(...DJ.engine.masterLevels()) }));
  await page.click('[data-ctl="A.play"]');
  if (!(r.level > 0.05) || !(r.master > 0.05) || r.bpm !== 124) throw new Error(JSON.stringify(r));
  return `${r.a} / ${r.b}, detected ${r.bpm} BPM ${r.key}, master peak ${r.master.toFixed(2)}`;
});

await check('load a WAV onto deck A with the file picker', async () => {
  await page.setInputFiles('#fileA', fx('Test Artist - Night Shift 124.wav'));
  await until(() => DJ.engine.decks.A.track && !DJ.engine.decks.A.loading, null, 20000);
  const s = await deckState('A');
  const title = await page.textContent('.deck[data-deck="A"] .trk-title');
  if (title !== 'Night Shift 124') throw new Error('title ' + title);
  return `title "${title}", artist parsed`;
});

await check('broken file shows a readable error and leaves deck B empty', async () => {
  await page.setInputFiles('#fileB', fx('broken.mp3'));
  await until(() => [...document.querySelectorAll('.toast.error')].some((t) => /Couldn.t decode/.test(t.textContent)));
  const txt = await page.locator('.toast.error').last().textContent();
  const s = await deckState('B');
  if (s.track !== 'First Light (demo)') throw new Error('deck B lost its demo: ' + s.track);
  return txt.slice(0, 80) + '…';
});

await check('play button starts deck A and the clock moves', async () => {
  await page.click('[data-ctl="A.play"]');
  await page.waitForTimeout(700);
  const s = await deckState('A');
  if (!s.playing || s.pos < 0.4) throw new Error(JSON.stringify(s));
  const lit = await page.getAttribute('[data-ctl="A.play"]', 'class');
  if (!/\bon\b/.test(lit)) throw new Error('play button not lit');
  return `pos ${s.pos.toFixed(2)} s`;
});

await check('channel meter shows signal while playing', async () => {
  await page.waitForTimeout(300);
  const v = await page.evaluate(() => +getComputedStyle(DJ.ui.strips.A.meter).getPropertyValue('--v'));
  if (!(v > 0.3)) throw new Error('meter ' + v);
  return 'meter ' + v.toFixed(2);
});

await check('load deck B while A plays: A keeps playing smoothly', async () => {
  const before = await deckState('A');
  await page.setInputFiles('#fileB', fx('Test Artist - Daybreak 128.wav'));
  await until(() => DJ.engine.decks.B.track && !DJ.engine.decks.B.loading, null, 20000);
  const after = await deckState('A');
  if (!after.playing || after.pos <= before.pos) throw new Error('A stalled');
  return `A advanced ${(after.pos - before.pos).toFixed(2)} s during load`;
});

await check('pitch fader drag changes tempo', async () => {
  const box = await page.locator('[data-ctl="A.pitch"]').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down(); await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2 + 40, { steps: 5 }); await page.mouse.up();
  const s = await deckState('A');
  if (!(s.pitch > 0.01)) throw new Error('pitch ' + s.pitch);
  const txt = await page.textContent('.deck[data-deck="A"] .bpm-pitch');
  return `pitch ${(s.pitch * 100).toFixed(2)}% (${txt}); bottom of fader is +, like CDJs`;
});

await check('double-click pitch fader resets to 0', async () => {
  await page.dblclick('[data-ctl="A.pitch"] .fader-cap');
  const s = await deckState('A');
  if (Math.abs(s.pitch) > 1e-9) throw new Error('pitch ' + s.pitch);
});

await check('EQ knob drag and kill button reach the engine', async () => {
  const k = await page.locator('[data-ctl="A.eq.low"] .knob').boundingBox();
  await page.mouse.move(k.x + k.width / 2, k.y + k.height / 2); await page.mouse.down();
  await page.mouse.move(k.x + k.width / 2, k.y + k.height / 2 + 200, { steps: 6 }); await page.mouse.up();
  const v = await page.evaluate(() => DJ.engine.decks.A.eqVal.low);
  await page.click('[data-ctl="A.kill.high"]');
  const kill = await page.evaluate(() => DJ.engine.decks.A.kill.high);
  await page.click('[data-ctl="A.kill.high"]');
  await page.dblclick('[data-ctl="A.eq.low"] .knob');
  if (v !== 0 || !kill) throw new Error(`low ${v} kill ${kill}`);
  return 'low knob to 0 (kill), high kill toggled';
});

await check('crossfader moves and the curve selector switches', async () => {
  const b = await page.locator('[data-ctl="xfader"]').boundingBox();
  await page.mouse.click(b.x + b.width - 5, b.y + b.height / 2);
  const x = await page.evaluate(() => DJ.engine.xfader);
  await page.click('[data-ctl="curve.sharp"]');
  const c = await page.evaluate(() => [DJ.engine.curve, DJ.engine.xfGains(0.5)]);
  await page.dblclick('[data-ctl="xfader"]');
  await page.click('[data-ctl="curve.power"]');
  if (x < 0.95 || c[0] !== 'sharp' || c[1][0] !== 1) throw new Error(JSON.stringify([x, c]));
  return `xfader → ${x.toFixed(2)}, sharp curve gains at centre ${c[1]}`;
});

await check('key lock and range toggles', async () => {
  await page.click('[data-ctl="A.keylock"]'); await page.click('[data-ctl="A.range"]');
  const r = await page.evaluate(() => [DJ.engine.decks.A.keylock, DJ.engine.decks.A.range]);
  await page.click('[data-ctl="A.range"]');
  if (!r[0] || r[1] !== 0.16) throw new Error(JSON.stringify(r));
});

await check('cue: pause jumps back to cue point', async () => {
  await page.click('[data-ctl="A.cue"]');
  await page.waitForTimeout(150);
  const s = await page.evaluate(() => { const d = DJ.engine.decks.A; return { playing: d.playing, pos: d.position(), cue: d.cuePoint }; });
  if (s.playing || Math.abs(s.pos - s.cue) > 0.02) throw new Error(JSON.stringify(s));
  return `stopped at cue ${s.cue.toFixed(3)} s`;
});

await page.screenshot({ path: path.join(shots, 'stage-ui.png') });
if (fs.existsSync(path.join(here, 'ui-extra.mjs'))) {
  const extra = await import(pathToFileURL(path.join(here, 'ui-extra.mjs')).href);
  await extra.default({ page, check, until, deckState, fx, shots, ctx, browser });
}
if (errors.length) { console.log('\nErrors in page:\n  ' + [...new Set(errors)].join('\n  ')); }
console.log(`\n${pass}/${pass + fail} passed`);
await browser.close();
process.exit(fail || errors.length ? 1 : 0);
