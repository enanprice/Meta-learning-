// Writes synthetic test tracks with known BPM, key and first-beat offset to
// tests/fixtures/. Used by the UI tests and to score BPM/key detection.
//   node tests/make-fixtures.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'fixtures');
fs.mkdirSync(dir, { recursive: true });
const SR = 44100;

function rng(seed) { return () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296 * 2 - 1; }; }
const NOTE = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };
const hz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);

function kick(o, at, amp) {
  const s = Math.floor(at * SR), n = Math.floor(0.4 * SR); let ph = 0;
  for (let i = 0; i < n && s + i < o.length; i++) { const t = i / SR; ph += 2 * Math.PI * (48 + 110 * Math.exp(-t * 30)) / SR; o[s + i] += Math.sin(ph) * Math.exp(-t * 7) * amp; }
}
function noise(o, at, len, decay, amp, rnd) {
  const s = Math.floor(at * SR), n = Math.floor(len * SR); let prev = 0;
  for (let i = 0; i < n && s + i < o.length; i++) { const x = rnd(); o[s + i] += (x - prev) * Math.exp(-i / SR * decay) * amp; prev = x; }
}
function pad(o, at, len, freqs, amp) {
  const s = Math.floor(at * SR), n = Math.floor(len * SR);
  for (const f of freqs) {
    let y = 0, ph = Math.random();
    for (let i = 0; i < n && s + i < o.length; i++) {
      ph = (ph + f / SR) % 1; y += 0.08 * ((2 * ph - 1) - y);
      const env = Math.min(1, i / 2000, (n - i) / 2000);
      o[s + i] += y * env * amp;
    }
  }
}
function bass(o, at, len, f, amp) {
  const s = Math.floor(at * SR), n = Math.floor(len * SR);
  for (let i = 0; i < n && s + i < o.length; i++) { const t = i / SR; o[s + i] += Math.sin(2 * Math.PI * f * t) * Math.min(1, t * 400) * Math.exp(-t * 4) * Math.min(1, (n - i) / 200) * amp; }
}

// A four-bar chord loop in the given key; drums on a grid starting at `offset` seconds.
function track({ bpm, key, minor, secs, offset, seed = 1, swing = 0 }) {
  const o = new Float32Array(Math.ceil(secs * SR)), rnd = rng(seed), beat = 60 / bpm;
  const root = NOTE[key] + 48;
  // i - iv - VI - V in minor (V has the raised leading tone), I - IV - V - I in major
  const prog = minor ? [[0, 3, 7], [5, 8, 12], [-4, 0, 3], [7, 11, 14]] : [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]];
  const nBeats = Math.floor((secs - offset) / beat);
  for (let b = 0; b < nBeats; b++) {
    const t = offset + b * beat;
    kick(o, t, 0.9);
    noise(o, t + beat / 2 + swing * beat, 0.06, 60, 0.25, rnd);
    if (b % 2 === 1) noise(o, t, 0.18, 22, 0.35, rnd);
    const bar = Math.floor(b / 4), ch = prog[bar % 4];
    if (b % 4 === 0) pad(o, t, beat * 4, ch.map((x) => hz(root + x + 12)), 0.07);
    bass(o, t + beat / 2, beat * 0.45, hz(root + ch[0] - 12), 0.35);
  }
  let m = 0; for (const x of o) m = Math.max(m, Math.abs(x));
  for (let i = 0; i < o.length; i++) o[i] *= 0.8 / m;
  return o;
}

function wav(file, mono) {
  const n = mono.length, buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) { const v = Math.max(-32768, Math.min(32767, Math.round(mono[i] * 32767))); buf.writeInt16LE(v, 44 + i * 4); buf.writeInt16LE(v, 46 + i * 4); }
  fs.writeFileSync(path.join(dir, file), buf);
}

export const FIXTURES = [
  { file: 'Test Artist - Night Shift 124.wav', bpm: 124, key: 'A', minor: true, secs: 64, offset: 0.35, camelot: '8A' },
  { file: 'Test Artist - Daybreak 128.wav', bpm: 128, key: 'C', minor: false, secs: 64, offset: 0.12, camelot: '8B' },
  { file: 'Other Artist - Slow Burn 100.wav', bpm: 100, key: 'F', minor: true, secs: 60, offset: 0.8, camelot: '4A' },
  { file: 'Other Artist - Rush 140.wav', bpm: 140, key: 'G', minor: false, secs: 50, offset: 0.05, camelot: '9B' },
  { file: 'Third - Swing 118.5.wav', bpm: 118.5, key: 'D', minor: true, secs: 60, offset: 0.5, camelot: '7A', swing: 0.08 },
];
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  for (const f of FIXTURES) { wav(f.file, track(f)); console.log('wrote', f.file); }
  fs.writeFileSync(path.join(dir, 'broken.mp3'), Buffer.from('this is not audio at all'));
  fs.writeFileSync(path.join(dir, 'truth.json'), JSON.stringify(FIXTURES, null, 1));
}
