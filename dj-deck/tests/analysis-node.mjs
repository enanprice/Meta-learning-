// Scores BPM / beat-grid / key detection against the fixtures' ground truth.
//   node tests/analysis-node.mjs
import fs from 'fs'; import path from 'path'; import vm from 'vm'; import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const sandbox = { window: { DJ: {} }, Blob: class {}, URL: {}, Worker: undefined, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(here, '../js/analysis.js'), 'utf8'), sandbox);
const api = sandbox.window.DJ.analysis.core();
const keys = sandbox.window.DJ.keys;
function readWav(f) {
  const b = fs.readFileSync(f); const ch = b.readUInt16LE(22), sr = b.readUInt32LE(24); let o = 12;
  while (b.toString('ascii', o, o + 4) !== 'data') o += 8 + b.readUInt32LE(o + 4);
  const n = b.readUInt32LE(o + 4) / (2 * ch), L = new Float32Array(n), R = new Float32Array(n);
  for (let i = 0; i < n; i++) { L[i] = b.readInt16LE(o + 8 + i * 2 * ch) / 32768; R[i] = b.readInt16LE(o + 10 + i * 2 * ch) / 32768; }
  return { L, R, sr };
}
const truth = JSON.parse(fs.readFileSync(path.join(here, 'fixtures/truth.json')));
let bad = 0;
for (const t of truth) {
  const { L, R, sr } = readWav(path.join(here, 'fixtures', t.file));
  const t0 = Date.now(); const info = api.analyze(L, R, sr, { wave: true }); const ms = Date.now() - t0;
  const beat = 60 / t.bpm, bar = beat * 4;
  // grid error: distance from detected first beat to the nearest true beat, and whether it's a downbeat
  const diff = ((info.firstBeat - t.offset) % beat + beat * 1.5) % beat - beat / 2;
  const barDiff = ((info.firstBeat - t.offset) % bar + bar * 1.5) % bar - bar / 2;
  const k = info.key ? keys.make(info.key.tonic, info.key.minor) : null;
  const okBpm = Math.abs(info.bpm - t.bpm) < 0.02, okGrid = Math.abs(diff) < 0.012, okKey = k && k.camelot === t.camelot;
  if (!okBpm || !okGrid || !okKey) bad++;
  console.log(`${okBpm && okGrid && okKey ? 'PASS' : 'FAIL'}  ${t.file}\n      bpm ${info.bpm} (true ${t.bpm})  grid ${(diff * 1000).toFixed(1)} ms off${Math.abs(barDiff) > beat / 2 ? ' (downbeat wrong)' : ', downbeat right'}  key ${k ? k.camelot + ' ' + k.name : '—'} (true ${t.camelot})  ${ms} ms`);
}
console.log(`\n${truth.length - bad}/${truth.length} fully correct`);
process.exit(bad ? 1 : 0);
