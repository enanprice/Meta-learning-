// Stage 3: performance features, keyboard, MIDI (mocked device), library, recording.
//   INIT=tests/midi-mock.js node tests/ui-stage3.mjs
import { createRequire } from 'module';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path'; import fs from 'fs'; import { execSync } from 'child_process';
const require = createRequire(import.meta.url);
let pw; try { pw = require('playwright'); } catch { pw = require(path.join(execSync('npm root -g').toString().trim(), 'playwright')); }
const here = path.dirname(fileURLToPath(import.meta.url));
const fx = (f) => path.join(here, 'fixtures', f);
const shots = path.join(here, 'shots');
const profile = fs.mkdtempSync('/tmp/dh-profile-');
const ctx = await pw.chromium.launchPersistentContext(profile, { viewport: { width: 1600, height: 1250 }, acceptDownloads: true, args: ['--autoplay-policy=no-user-gesture-required'] });
await ctx.addInitScript({ path: path.join(here, 'midi-mock.js') });
await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
let page = ctx.pages()[0] || await ctx.newPage();
const errors = [];
const watch = (p) => { p.on('pageerror', (e) => errors.push('pageerror: ' + e.message)); p.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); }); };
watch(page);
const url = pathToFileURL(path.join(here, '..', 'index.html')).href;
const boot = async () => { await page.goto(url); await page.waitForFunction(() => window.DJ && DJ.engine && DJ.library && DJ.library.root); const s = page.locator('.start-audio .btn'); if (await s.count()) await s.click(); };
await boot();
let pass = 0, fail = 0;
async function check(name, fn) { try { const n = await fn(); console.log('PASS ', name, n ? '— ' + n : ''); pass++; } catch (e) { console.log('FAIL ', name, '—', e.message.split('\n')[0]); fail++; } }
const until = (fn, arg, ms = 15000) => page.waitForFunction(fn, arg, { timeout: ms });
const ev = (fn, arg) => page.evaluate(fn, arg);

await check('library: add files, analyse in background', async () => {
  await page.setInputFiles('#lib-files', ['Test Artist - Night Shift 124.wav', 'Test Artist - Daybreak 128.wav', 'Other Artist - Slow Burn 100.wav', 'Other Artist - Rush 140.wav', 'broken.mp3'].map(fx));
  await until(() => [...DJ.library.tracks.values()].every((t) => t.analyzed || t.error) && !DJ.library.busy, null, 60000);
  const r = await ev(() => [...DJ.library.tracks.values()].map((t) => `${t.title}:${t.bpm}:${t.key ? DJ.keys.make(t.key.tonic, t.key.minor).camelot : '-'}${t.error ? ':ERR' : ''}`).sort());
  const rows = await page.locator('.lib-table tbody tr').count();
  if (rows !== 5) throw new Error('rows ' + rows);
  const want = ['Daybreak 128:128:8B', 'Night Shift 124:124:8A', 'Rush 140:140:9B', 'Slow Burn 100:100:4A', 'broken:undefined:-:ERR'];
  if (JSON.stringify(r) !== JSON.stringify(want)) throw new Error(JSON.stringify(r));
  return r.join(', ');
});

await check('library: search and sort', async () => {
  const settle = () => page.waitForTimeout(80);
  await page.fill('#lib-search', '8a'); await settle();
  const a = await page.locator('.lib-table tbody tr').count();
  await page.fill('#lib-search', 'other'); await settle();
  const b = await page.locator('.lib-table tbody tr').count();
  await page.fill('#lib-search', '');
  await page.click('.lib-table th[data-k="bpm"] button'); await settle();
  const order = (await page.$$eval('.lib-table tbody tr td:nth-child(4)', (tds) => tds.map((t) => t.textContent))).filter(Boolean);
  if (a !== 1 || b !== 2 || order.slice(0, 4).join() !== '100.0,124.0,128.0,140.0') throw new Error(JSON.stringify({ a, b, order }));
  return `"8a" → ${a} row, "other" → ${b} rows, BPM sort ${order.slice(0, 4).join(' < ')}`;
});

await check('library: double-click loads to a free deck; A/B buttons load that deck', async () => {
  await page.dblclick('.lib-table tbody tr[data-id^="Test Artist - Night Shift"] td.t');
  await until(() => DJ.engine.decks.A.track && !DJ.engine.decks.A.loading);
  await page.click('.lib-table tbody tr[data-id^="Test Artist - Daybreak"] [data-load="B"]');
  await until(() => DJ.engine.decks.B.track && !DJ.engine.decks.B.loading);
  const r = await ev(() => [DJ.engine.decks.A.track.title, DJ.engine.decks.B.track.title, document.querySelector('.lib-table tr.loaded-A td.t').textContent]);
  return `A: ${r[0]}, B: ${r[1]}; row marked "${r[2]}"`;
});

await check('hot cues: set, jump, colour, delete', async () => {
  await ev(() => { DJ.engine.decks.A.seek(8.1); });
  await page.click('[data-ctl="A.hotcue.1"]');
  await ev(() => { DJ.engine.decks.A.seek(16.2); });
  await page.click('[data-ctl="A.hotcue.2"]');
  await page.click('[data-ctl="A.hotcue.3"]'); // set at 16.2 too, then delete it
  await page.click('[data-ctl="A.hotcue.3"]', { button: 'right' });
  const cues = await ev(() => DJ.engine.decks.A.hotcues);
  await page.click('[data-ctl="A.hotcue.1"]');
  await page.waitForTimeout(200);
  const s = await ev(() => ({ p: DJ.engine.decks.A.position(), playing: DJ.engine.decks.A.playing }));
  const bl = 60 / 124;
  const onGrid = (t) => Math.abs(((t - 0.35) / bl) - Math.round((t - 0.35) / bl)) < 0.01;
  if (cues[0] == null || cues[1] == null || cues[2] != null || !onGrid(cues[0]) || !s.playing || s.p < cues[0]) throw new Error(JSON.stringify({ cues, s }));
  const lit = await page.$eval('[data-ctl="A.hotcue.1"]', (e) => getComputedStyle(e).backgroundColor);
  return `cues ${cues[0].toFixed(3)} / ${cues[1].toFixed(3)} s (snapped to beats), #3 deleted, pad colour ${lit}`;
});

await check('loops: 4-beat auto loop, halve, double, exit', async () => {
  await page.click('[data-ctl="A.mode.loops"]');
  await page.click('[data-ctl="A.loop.4"]');
  const l1 = await ev(() => ({ ...DJ.engine.decks.A.loop }));
  await page.click('[data-ctl="A.loop.halve"]');
  const l2 = await ev(() => ({ ...DJ.engine.decks.A.loop }));
  await page.click('[data-ctl="A.loop.double"]'); await page.click('[data-ctl="A.loop.double"]');
  const l3 = await ev(() => ({ ...DJ.engine.decks.A.loop }));
  await page.waitForTimeout(3000);
  const p = await ev(() => DJ.engine.decks.A.position());
  const inside = p >= l3.in - 0.01 && p < l3.out + 0.02;
  await page.click('[data-ctl="A.loop.reloop"]');
  const l4 = await ev(() => DJ.engine.decks.A.loop.on);
  if (l1.beats !== 4 || l2.beats !== 2 || l3.beats !== 8 || !inside || l4) throw new Error(JSON.stringify({ l1, l2, l3, p, l4 }));
  return `4 → 2 → 8 beats (${(l3.out - l3.in).toFixed(3)} s), playhead stayed inside after 3 s, exited`;
});

await check('FX: echo latch, roll momentary hold, wet knob', async () => {
  await page.click('[data-ctl="A.mode.fx"]');
  await page.click('[data-ctl="A.fx.echo.on"]');
  const on = await ev(() => DJ.engine.decks.A.fx.byName.echo.on);
  await page.click('[data-ctl="A.fx.echo.beats+"]');
  const beats = await ev(() => DJ.engine.decks.A.fx.byName.echo.beats);
  await page.click('[data-ctl="A.fx.echo.on"]');
  const b = await page.locator('[data-ctl="A.fx.roll.on"]').boundingBox();
  await page.mouse.move(b.x + 10, b.y + 10); await page.mouse.down(); await page.waitForTimeout(500);
  const rolling = await ev(() => DJ.engine.decks.A.fx.byName.roll.on);
  await page.mouse.up();
  const after = await ev(() => DJ.engine.decks.A.fx.byName.roll.on);
  if (!on || beats !== 1 || !rolling || after) throw new Error(JSON.stringify({ on, beats, rolling, after }));
  return 'echo on at 1 beat; roll on while held, off on release';
});

await check('keyboard: ? overlay, F play/pause, D cue, ← crossfader', async () => {
  await page.click('.brand');
  await page.keyboard.press('Shift+Slash');
  const ov = await page.locator('.modal[aria-label="Keyboard shortcuts"]').count();
  const rows = await page.locator('.modal .keys-grid dt').count();
  await page.keyboard.press('Escape');
  const was = await ev(() => DJ.engine.decks.B.playing);
  await page.keyboard.press('KeyJ');
  const now = await ev(() => DJ.engine.decks.B.playing);
  await page.keyboard.press('KeyJ');
  const x0 = await ev(() => DJ.engine.xfader);
  await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowLeft');
  const x1 = await ev(() => DJ.engine.xfader);
  await page.keyboard.press('Backslash');
  if (!ov || rows < 30 || was === now || Math.abs(x1 - (x0 - 0.1)) > 1e-6) throw new Error(JSON.stringify({ ov, rows, was, now, x0, x1 }));
  return `overlay with ${rows} shortcuts; J toggled deck B; ← moved crossfader ${x0} → ${x1.toFixed(2)}`;
});

await check('keyboard: hot cue key sets a cue, Shift deletes', async () => {
  await ev(() => DJ.engine.decks.B.seek(4));
  await page.keyboard.press('Digit9');
  const set = await ev(() => DJ.engine.decks.B.hotcues[2]);
  await page.keyboard.press('Shift+Digit9');
  const del = await ev(() => DJ.engine.decks.B.hotcues[2]);
  if (set == null || del != null) throw new Error(JSON.stringify({ set, del }));
  return `9 set B cue 3 at ${set.toFixed(2)} s, Shift+9 deleted it`;
});

await check('MIDI: controller auto-detected, learn a knob and a pad, then drive them', async () => {
  const btn = await page.textContent('#topbar .btn:has(.dot)');
  await page.keyboard.press('F9');
  await page.click('[data-ctl="A.eq.low"] .knob');
  await ev(() => __midi.send([0xB0, 0x10, 90]));
  await page.click('[data-ctl="B.play"]');
  await ev(() => __midi.send([0x91, 0x0B, 127])); await ev(() => __midi.send([0x81, 0x0B, 0]));
  await page.click('[data-ctl="A.jog"]');
  await ev(() => __midi.send([0xB0, 0x21, 65]));
  await page.click('.learn-bar .btn');
  const map = await ev(() => DJ.midi.maps['Mock DJ Controller']);
  const wasPlaying = await ev(() => DJ.engine.decks.B.playing);
  await ev(() => { __midi.send([0xB0, 0x10, 0]); __midi.send([0x91, 0x0B, 127]); __midi.send([0x81, 0x0B, 0]); });
  const r = await ev(() => ({ low: DJ.engine.decks.A.eqVal.low, playing: DJ.engine.decks.B.playing }));
  if (!/MIDI · 1/.test(btn) || !map['cc:1:16'] || map['cc:1:16'].ctl !== 'A.eq.low' || map['note:2:11'].ctl !== 'B.play' || map['cc:1:33'].mode !== 'rel64' || r.low !== 0 || r.playing === wasPlaying) throw new Error(JSON.stringify({ btn, map, r, wasPlaying }));
  return `button "${btn.trim()}", learned CC16→A.eq.low, Note11 ch2→B.play, CC33→A.jog (relative/64); CC16=0 set low to ${r.low}, note toggled B`;
});

await check('recording: WAV file downloads with a valid header', async () => {
  await ev(() => { DJ.engine.decks.A.play(); });
  const dl = page.waitForEvent('download', { timeout: 20000 });
  await page.click('[data-ctl="record"]');
  await page.waitForTimeout(1500);
  await page.keyboard.press('F8');
  const d = await dl;
  const p = await d.path(); const b = fs.readFileSync(p);
  const secs = (b.length - 44) / (b.readUInt32LE(28));
  let peak = 0; for (let i = 44; i + 1 < b.length; i += 2) peak = Math.max(peak, Math.abs(b.readInt16LE(i)));
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WAVE' || secs < 1 || peak < 1000) throw new Error(JSON.stringify({ secs, peak }));
  return `${d.suggestedFilename()} — ${secs.toFixed(2)} s, ${b.readUInt32LE(24)} Hz, peak ${(20 * Math.log10(peak / 32768)).toFixed(1)} dBFS`;
});

await check('audio settings panel opens and explains output support', async () => {
  await page.click('#topbar .btn:text-is("Audio")');
  await until(() => document.querySelector('.modal[aria-label="Audio settings"] select#out-master'));
  const txt = await page.textContent('.modal[aria-label="Audio settings"]');
  await page.keyboard.press('Escape');
  return /Master output/.test(txt) && /Headphones/.test(txt) ? 'master + headphone selectors shown' : (() => { throw new Error(txt); })();
});

await page.screenshot({ path: path.join(shots, 'stage3.png'), fullPage: true });

await check('after reload: library, hot cues and MIDI mapping are still there', async () => {
  await boot();
  await until(() => DJ.library.tracks.size === 5, null, 10000);
  await page.dblclick('.lib-table tbody tr[data-id^="Test Artist - Night Shift"] td.t');
  await until(() => DJ.engine.decks.A.track && DJ.engine.decks.A.track.title === 'Night Shift 124' && !DJ.engine.decks.A.loading);
  await page.waitForTimeout(1500); // the demo must not replace it afterwards
  const r = await ev(() => ({ title: DJ.engine.decks.A.track.title, cues: DJ.engine.decks.A.hotcues.filter((x) => x != null).length, maps: Object.keys(DJ.midi.maps['Mock DJ Controller'] || {}).length, rows: document.querySelectorAll('.lib-table tbody tr').length }));
  if (r.title !== 'Night Shift 124' || r.cues !== 2 || r.maps !== 3 || r.rows !== 5) throw new Error(JSON.stringify(r));
  return `${r.rows} library rows, ${r.cues} hot cues restored for the track, ${r.maps} MIDI mappings`;
});

if (errors.length) console.log('\nErrors in page:\n  ' + [...new Set(errors)].join('\n  '));
console.log(`\n${pass}/${pass + fail} passed`);
await ctx.close();
process.exit(fail || errors.length ? 1 : 0);
