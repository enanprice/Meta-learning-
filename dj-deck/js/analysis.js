// Track analysis: BPM + beat grid, musical key, and 3-band waveform data.
// Runs in Web Workers built from a blob URL so it works from file:// too.
// Deck loads and library scans use separate workers so a big library scan
// never delays loading a track onto a deck.
(function () {
  const DJ = window.DJ;

  // Everything the worker needs lives inside core(); it returns the API.
  function core() {
    // RBJ biquad coefficients
    function biq(type, f, sr, q) {
      const w = (2 * Math.PI * f) / sr, cw = Math.cos(w), al = Math.sin(w) / (2 * (q || Math.SQRT1_2));
      let b0, b1, b2;
      if (type === 'lp') { b0 = (1 - cw) / 2; b1 = 1 - cw; b2 = b0; } else { b0 = (1 + cw) / 2; b1 = -(1 + cw); b2 = b0; }
      const a0 = 1 + al;
      return { b0: b0 / a0, b1: b1 / a0, b2: b2 / a0, a1: (-2 * cw) / a0, a2: (1 - al) / a0, z1: 0, z2: 0 };
    }
    function step(c, x) { const y = c.b0 * x + c.z1; c.z1 = c.b1 * x - c.a1 * y + c.z2; c.z2 = c.b2 * x - c.a2 * y; return y; }

    // One pass over the audio: band envelopes per hop, onset strength, and a
    // decimated mono copy for key detection.
    function scan(L, R, sr) {
      const n = L.length;
      const hop = Math.max(32, Math.round(sr / 400));
      const frames = Math.ceil(n / hop);
      const pps = sr / hop;
      const amp = new Float32Array(frames), eL = new Float32Array(frames), eM = new Float32Array(frames), eH = new Float32Array(frames);
      const lo1 = biq('lp', 180, sr), lo2 = biq('lp', 180, sr), hi1 = biq('hp', 2800, sr), hi2 = biq('hp', 2800, sr);
      const aL = 1 - Math.exp(-1 / (0.012 * sr)), aM = 1 - Math.exp(-1 / (0.006 * sr)), aH = 1 - Math.exp(-1 / (0.004 * sr));
      let sL = 0, sM = 0, sH = 0, pk = 0, f = 0, k = 0;
      const dec = Math.max(1, Math.round(sr / 11025));
      const dsr = sr / dec;
      const mono = new Float32Array(Math.ceil(n / dec));
      let acc = 0, ai = 0, mi = 0;
      for (let i = 0; i < n; i++) {
        const x = R ? (L[i] + R[i]) * 0.5 : L[i];
        const lo = step(lo2, step(lo1, x));
        const hi = step(hi2, step(hi1, x));
        const mid = x - lo - hi;
        sL += aL * (lo * lo - sL); sM += aM * (mid * mid - sM); sH += aH * (hi * hi - sH);
        const ax = x < 0 ? -x : x; if (ax > pk) pk = ax;
        if (++k === hop) { amp[f] = pk; eL[f] = sL; eM[f] = sM; eH[f] = sH; f++; k = 0; pk = 0; }
        acc += x; if (++ai === dec) { mono[mi++] = acc / dec; acc = 0; ai = 0; }
      }
      if (k > 0 && f < frames) { amp[f] = pk; eL[f] = sL; eM[f] = sM; eH[f] = sH; }
      return { hop, pps, frames, amp, eL, eM, eH, mono, dsr };
    }

    // Onset strength: rectified rise of log band energy, minus a local mean.
    function onsets(s) {
      const N = s.frames, o = new Float32Array(N);
      const lg = (e) => Math.log(1e-9 + e);
      const lag = 3; // 7.5 ms at 400 fps
      for (let t = lag; t < N; t++) {
        const dl = lg(s.eL[t]) - lg(s.eL[t - lag]);
        const dm = lg(s.eM[t]) - lg(s.eM[t - lag]);
        const dh = lg(s.eH[t]) - lg(s.eH[t - lag]);
        // Ignore rises in near-silence
        const gl = s.eL[t] > 1e-6 ? 1 : 0, gm = s.eM[t] > 1e-6 ? 1 : 0, gh = s.eH[t] > 1e-7 ? 1 : 0;
        o[t] = 1.0 * gl * Math.max(0, dl) + 0.7 * gm * Math.max(0, dm) + 0.5 * gh * Math.max(0, dh);
      }
      // subtract a 0.2 s moving average, keep the peaks
      const W = Math.round(s.pps * 0.1), out = new Float32Array(N);
      let sum = 0;
      for (let t = 0; t < N; t++) {
        sum += o[t];
        if (t - 2 * W - 1 >= 0) sum -= o[t - 2 * W - 1];
        const c = t - W;
        if (c >= 0) { const m = sum / (2 * W + 1); out[c] = Math.max(0, o[c] - m); }
      }
      return out;
    }

    function acfTempo(o, fps, minBpm, maxBpm) {
      // Downsample onsets to ~100 fps for the autocorrelation.
      const f = Math.max(1, Math.round(fps / 100)), rate = fps / f;
      const M = Math.floor(o.length / f), d = new Float32Array(M);
      for (let i = 0; i < M; i++) { let s = 0; for (let j = 0; j < f; j++) s += o[i * f + j]; d[i] = s; }
      let mean = 0; for (let i = 0; i < M; i++) mean += d[i]; mean /= M || 1;
      for (let i = 0; i < M; i++) d[i] -= mean;
      const maxLag = Math.ceil((60 * rate) / (minBpm / 2)) + 2;
      const acf = new Float32Array(maxLag + 2);
      for (let l = 1; l <= maxLag; l++) { let s = 0; for (let i = 0; i + l < M; i++) s += d[i] * d[i + l]; acf[l] = s / (M - l); }
      const at = (lag) => { const i = Math.floor(lag), fr = lag - i; return i + 1 < acf.length ? acf[i] * (1 - fr) + acf[i + 1] * fr : 0; };
      let best = null;
      for (let bpm = minBpm; bpm <= maxBpm; bpm += 0.25) {
        const lag = (60 * rate) / bpm;
        const prior = Math.exp(-0.5 * Math.pow(Math.log2(bpm / 122) / 0.55, 2));
        const s = (at(lag) + 0.5 * at(lag * 2) + 0.25 * at(lag * 4 > maxLag ? lag * 2 : lag * 4)) * (0.35 + prior);
        if (!best || s > best.s) best = { bpm, s };
      }
      return best ? best.bpm : null;
    }

    // Fold onsets onto one beat period. `score` is phase coherence at the beat
    // rate (smooth in bpm, so fine tempo steps compare fairly); `phase` comes
    // from a histogram peak so off-beat hats don't drag it.
    function fold(o, fps, bpm, bins = 96) {
      const P = (60 * fps) / bpm, w = (2 * Math.PI) / P;
      let re = 0, im = 0, tot = 0;
      for (let t = 0; t < o.length; t++) { const v = o[t]; if (v <= 0) continue; re += v * Math.cos(w * t); im += v * Math.sin(w * t); tot += v; }
      return { score: Math.hypot(re, im) / (tot || 1), P, bpm };
    }
    function phaseOf(o, fps, bpm, bins = 96) {
      const P = (60 * fps) / bpm, h = new Float64Array(bins);
      for (let t = 0; t < o.length; t++) { const v = o[t]; if (v <= 0) continue; const ph = t / P; h[Math.floor((ph - Math.floor(ph)) * bins) % bins] += v; }
      let bi = 0, bs = -1;
      for (let b = 0; b < bins; b++) { const s = h[(b + bins - 1) % bins] * 0.5 + h[b] + h[(b + 1) % bins] * 0.5; if (s > bs) { bs = s; bi = b; } }
      const a = h[(bi + bins - 1) % bins], c = h[bi], e = h[(bi + 1) % bins];
      const off = (e - a) / (a + c + e || 1);
      return ((bi + off + 0.5) / bins + 1) % 1;
    }

    // Which of the four beats starts a bar? Chords and bass lines tend to
    // change on the bar line, so score each phase by how much the harmony
    // (per-beat chroma) changes there, plus a little low-end onset energy.
    function downbeat(s, o, t0, beat) {
      const sr = s.dsr, mono = s.mono, N = 4096;
      const win = new Float32Array(N); for (let i = 0; i < N; i++) win[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / N);
      const re = new Float32Array(N), im = new Float32Array(N);
      const pcOf = new Int8Array(N / 2).fill(-1);
      for (let b = 1; b < N / 2; b++) { const f = (b * sr) / N; if (f >= 60 && f <= 1500) pcOf[b] = ((Math.round(69 + 12 * Math.log2(f / 440)) % 12) + 12) % 12; }
      const dur = mono.length / sr;
      const first = Math.ceil(-t0 / beat), nb = Math.floor((dur - t0) / beat) - 1;
      const step = Math.max(1, Math.floor((nb - first) / 600));
      const chroma = (t) => {
        const c = new Float64Array(12), off = Math.round(t * sr) - N / 2;
        if (off < 0 || off + N > mono.length) return null;
        for (let i = 0; i < N; i++) { re[i] = mono[off + i] * win[i]; im[i] = 0; }
        fft(re, im);
        for (let b = 1; b < N / 2; b++) if (pcOf[b] >= 0) c[pcOf[b]] += Math.sqrt(re[b] * re[b] + im[b] * im[b]);
        let n = 0; for (let p = 0; p < 12; p++) n += c[p] * c[p]; n = Math.sqrt(n) || 1;
        for (let p = 0; p < 12; p++) c[p] /= n;
        return c;
      };
      const harm = [0, 0, 0, 0], hit = [0, 0, 0, 0];
      let prev = null;
      for (let i = first; i <= nb; i += step) {
        const c = chroma(t0 + (i + 0.5) * beat);
        const pc = step === 1 ? prev : chroma(t0 + (i - 0.5) * beat);
        if (c && pc) { let d = 0; for (let p = 0; p < 12; p++) d += c[p] * pc[p]; harm[((i % 4) + 4) % 4] += 1 - d; }
        prev = c;
      }
      for (let t = 0; t < o.length; t++) {
        if (o[t] <= 0) continue;
        const x = (t / s.pps - t0) / beat, bi = Math.round(x);
        if (Math.abs(x - bi) < 0.1) hit[((bi % 4) + 4) % 4] += o[t] * s.eL[t];
      }
      const hs = harm.reduce((a, b) => a + b, 0) || 1, os = hit.reduce((a, b) => a + b, 0) || 1;
      let k = 0, bs = -1;
      for (let i = 0; i < 4; i++) { const sc = harm[i] / hs + 0.25 * (hit[i] / os); if (sc > bs) { bs = sc; k = i; } }
      return k;
    }

    // Share of predicted beats that land on a real onset peak. A tone or a
    // single hit can look "coherent" but has almost no beats to support it.
    function beatSupport(o, fps, bpm, phase) {
      const R = Math.round(fps * 0.02), peaks = [];
      for (let t = R; t < o.length - R; t++) {
        const v = o[t]; if (v <= 0) continue;
        let isMax = true; for (let k = -R; k <= R; k++) if (o[t + k] > v) { isMax = false; break; }
        if (isMax) peaks.push(t);
      }
      if (peaks.length < 16) return 0;
      // 0.4 ≈ a 1.5 dB jump in 7.5 ms: steady tones never get there, drums always do.
      const vals = peaks.map((t) => o[t]).sort((a, b) => a - b), thr = Math.max(0.4, vals[Math.floor(vals.length * 0.5)] * 0.5);
      const strong = peaks.filter((t) => o[t] >= thr);
      if (strong.length < 16) return 0;
      const P = (60 * fps) / bpm, tol = Math.max(2, fps * 0.025);
      const first = strong[0], last = strong[strong.length - 1];
      let beats = 0, hits = 0, j = 0;
      for (let b = Math.ceil(first / P - phase); (b + phase) * P <= last; b++) {
        const bt = (b + phase) * P; beats++;
        while (j < strong.length && strong[j] < bt - tol) j++;
        if (j < strong.length && Math.abs(strong[j] - bt) <= tol) hits++;
      }
      return beats ? hits / beats : 0;
    }

    function tempo(s, o) {
      const fps = s.pps;
      const coarse = acfTempo(o, fps, 70, 180);
      if (!coarse) return null;
      let best = null;
      const tryBpm = (bpm) => { const r = fold(o, fps, bpm); if (!best || r.score > best.score) best = r; };
      for (let b = coarse - 1.5; b <= coarse + 1.5; b += 0.02) tryBpm(b);
      const c2 = best.bpm;
      for (let b = c2 - 0.03; b <= c2 + 0.03; b += 0.002) tryBpm(b);
      let bpm = best.bpm;
      // Most dance music sits on a whole or half BPM; snap when it's that close.
      for (const sn of [Math.round(bpm), Math.round(bpm * 2) / 2]) {
        if (Math.abs(bpm - sn) < 0.06 && fold(o, fps, sn).score >= best.score * 0.97) { bpm = sn; break; }
      }
      const conf = fold(o, fps, bpm).score;
      if (!(conf >= 0.1) || beatSupport(o, fps, bpm, phaseOf(o, fps, bpm)) < 0.5) return null;
      const beat = 60 / bpm;
      // Onset peaks trail the true attack by roughly the envelope smoothing.
      const t0 = phaseOf(o, fps, bpm) * beat - 0.004;
      const k = downbeat(s, o, t0, beat);
      const bar = beat * 4;
      const firstBeat = (((t0 + k * beat) % bar) + bar) % bar;
      return { bpm: Math.round(bpm * 1000) / 1000, firstBeat, confidence: conf };
    }

    // ---------------------------------------------------------------- key
    function fft(re, im) {
      const n = re.length;
      for (let i = 1, j = 0; i < n; i++) {
        let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit;
        if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; }
      }
      for (let len = 2; len <= n; len <<= 1) {
        const ang = (-2 * Math.PI) / len, wr = Math.cos(ang), wi = Math.sin(ang);
        for (let i = 0; i < n; i += len) {
          let cr = 1, ci = 0;
          for (let j = 0; j < len / 2; j++) {
            const a = i + j, b = a + len / 2;
            const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr;
            re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
            const ncr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = ncr;
          }
        }
      }
    }
    const MAJ = [5.0, 2.0, 3.5, 2.0, 4.5, 4.0, 2.0, 4.5, 2.0, 3.5, 1.5, 4.0];
    const MIN = [5.0, 2.0, 3.5, 4.5, 2.0, 4.0, 2.0, 4.5, 3.5, 2.0, 1.5, 4.0];
    function corr(a, b) {
      const n = a.length; let ma = 0, mb = 0; for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; } ma /= n; mb /= n;
      let s = 0, sa = 0, sb = 0; for (let i = 0; i < n; i++) { const x = a[i] - ma, y = b[i] - mb; s += x * y; sa += x * x; sb += y * y; }
      return s / Math.sqrt(sa * sb || 1);
    }
    function key(mono, sr) {
      const N = 8192, hop = 4096;
      if (mono.length < N) return null;
      const win = new Float32Array(N); for (let i = 0; i < N; i++) win[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / N);
      const map = new Int8Array(N / 2), wt = new Float32Array(N / 2);
      for (let b = 1; b < N / 2; b++) {
        const f = (b * sr) / N; if (f < 50 || f > 2000) { map[b] = -1; continue; }
        const midi = 69 + 12 * Math.log2(f / 440), r = Math.round(midi), d = Math.abs(midi - r);
        map[b] = ((r % 12) + 12) % 12; wt[b] = Math.max(0, 1 - 2.5 * d) * (f < 260 ? 1.6 : 1);
      }
      const chroma = new Float64Array(12), re = new Float32Array(N), im = new Float32Array(N), fc = new Float64Array(12), mag = new Float32Array(N / 2);
      const frames = Math.floor((mono.length - N) / hop);
      const stride = Math.max(1, Math.floor(frames / 700)); // cap the work on very long files
      for (let fi = 0; fi < frames; fi += stride) {
        const off = fi * hop;
        for (let i = 0; i < N; i++) { re[i] = mono[off + i] * win[i]; im[i] = 0; }
        fft(re, im);
        for (let b = 0; b < N / 2; b++) mag[b] = Math.sqrt(re[b] * re[b] + im[b] * im[b]);
        // Only count tonal peaks standing clear of the local noise floor, so
        // drums and hiss don't smear the pitch classes.
        let run = 0; const W = 24;
        for (let b = 0; b < 2 * W + 1 && b < N / 2; b++) run += mag[b];
        fc.fill(0); let tot = 0;
        for (let b = W + 1; b < N / 2 - W - 1; b++) {
          run += mag[b + W] - mag[b - W - 1];
          if (map[b] < 0 || wt[b] === 0) continue;
          const m = mag[b], floor = run / (2 * W + 1);
          if (m > mag[b - 1] && m >= mag[b + 1] && m > 3 * floor) { const v = (m - floor) * wt[b]; fc[map[b]] += v; tot += v; }
        }
        if (tot > 1e-4) for (let p = 0; p < 12; p++) chroma[p] += fc[p] / tot;
      }
      let best = null, second = null;
      for (let t = 0; t < 12; t++) for (const minor of [false, true]) {
        const prof = minor ? MIN : MAJ, rot = new Array(12);
        for (let p = 0; p < 12; p++) rot[p] = chroma[(p + t) % 12];
        const c = corr(rot, prof);
        const cand = { tonic: t, minor, score: c };
        if (!best || c > best.score) { second = best; best = cand; } else if (!second || c > second.score) second = cand;
      }
      if (!best || !(best.score > 0)) return null;
      return { tonic: best.tonic, minor: best.minor, confidence: best.score - (second ? second.score : 0) };
    }

    // Waveform data for display: bytes per hop, scaled to the track's peak.
    function wave(s) {
      let mx = 1e-6; for (let i = 0; i < s.frames; i++) if (s.amp[i] > mx) mx = s.amp[i];
      const k = 255 / mx, n = s.frames;
      const amp = new Uint8Array(n), low = new Uint8Array(n), mid = new Uint8Array(n), high = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        amp[i] = Math.min(255, s.amp[i] * k);
        low[i] = Math.min(255, Math.sqrt(2 * s.eL[i]) * k * 1.1);
        mid[i] = Math.min(255, Math.sqrt(2 * s.eM[i]) * k * 1.4);
        high[i] = Math.min(255, Math.sqrt(2 * s.eH[i]) * k * 2.2);
      }
      return { pps: s.pps, length: n, amp, low, mid, high };
    }

    function analyze(L, R, sr, opts) {
      const s = scan(L, R, sr);
      const o = onsets(s);
      const t = tempo(s, o);
      const k = key(s.mono, s.dsr);
      let mx = 0; for (let i = 0; i < s.frames; i++) if (s.amp[i] > mx) mx = s.amp[i];
      let fs = 0; while (fs < s.frames && s.amp[fs] < mx * 0.02) fs++;
      const info = { bpm: t ? t.bpm : null, firstBeat: t ? t.firstBeat : 0, bpmConfidence: t ? t.confidence : 0, key: k, duration: L.length / sr, firstSound: mx > 0 ? fs / s.pps : 0 };
      if (opts && opts.wave) info.wave = wave(s);
      return info;
    }
    return { analyze };
  }

  // ------------------------------------------------------------ main thread
  const workerSrc = 'const API = (' + core.toString() + ')();\n' +
    'onmessage = (e) => { const m = e.data; let info = null, error = null;\n' +
    '  try { info = API.analyze(m.L, m.R, m.sr, m.opts); } catch (err) { error = String(err && err.message || err); }\n' +
    '  const tr = [m.L.buffer]; if (m.R) tr.push(m.R.buffer);\n' +
    '  if (info && info.wave) tr.push(info.wave.amp.buffer, info.wave.low.buffer, info.wave.mid.buffer, info.wave.high.buffer);\n' +
    '  postMessage({ id: m.id, L: m.L, R: m.R, info, error }, tr); };';

  class Pool {
    constructor() { this.w = null; this.jobs = new Map(); this.seq = 0; this.failed = false; }
    get() {
      if (this.w || this.failed) return this.w;
      try {
        this.w = new Worker(URL.createObjectURL(new Blob([workerSrc], { type: 'text/javascript' })));
        this.w.onmessage = (e) => { const j = this.jobs.get(e.data.id); if (!j) return; this.jobs.delete(e.data.id); if (e.data.error) j.rej(new Error('Analysis failed: ' + e.data.error)); else j.res(e.data); };
        this.w.onerror = (e) => { for (const j of this.jobs.values()) j.rej(new Error('Analysis worker crashed' + (e.message ? ': ' + e.message : ''))); this.jobs.clear(); this.w = null; };
      } catch (e) { this.failed = true; this.w = null; }
      return this.w;
    }
    run(L, R, sr, opts) {
      const w = this.get();
      if (!w) {
        // No workers available: analyse on the main thread (UI pauses briefly).
        const info = api().analyze(L, R, sr, opts);
        return Promise.resolve({ L, R, info });
      }
      return new Promise((res, rej) => {
        const id = ++this.seq; this.jobs.set(id, { res, rej });
        const tr = [L.buffer]; if (R) tr.push(R.buffer);
        w.postMessage({ id, L, R, sr, opts }, tr);
      });
    }
  }
  let _api = null;
  const api = () => _api || (_api = core());
  const pools = { deck: new Pool(), bg: new Pool() };

  const PC_MAJ = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
  const PC_MIN = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'B♭', 'B'];
  DJ.keys = {
    make(tonic, minor) {
      const rel = minor ? (tonic + 3) % 12 : tonic;
      const num = (((rel * 7) % 12) + 7) % 12 + 1;
      const n = (minor ? PC_MIN : PC_MAJ)[tonic];
      return { tonic, minor, camelot: num + (minor ? 'A' : 'B'), num, name: n + (minor ? ' minor' : ' major'), short: n + (minor ? 'm' : '') };
    },
    shift(k, semis) { return DJ.keys.make((((k.tonic + semis) % 12) + 12) % 12, k.minor); },
    color(k) { return `hsl(${((k.num - 1) * 30 + 200) % 360} ${k.minor ? 70 : 60}% ${k.minor ? 62 : 70}%)`; },
    // Sort key for Camelot order: 1A, 1B, 2A, …
    order(k) { return k ? k.num * 2 + (k.minor ? 0 : 1) : 999; },
  };

  DJ.analysis = {
    // Returns { L, R, info } — L/R are handed back after the round trip.
    async analyze(L, R, sr, opts = {}) {
      const res = await pools[opts.background ? 'bg' : 'deck'].run(L, R, sr, opts);
      const i = res.info;
      if (i.key) i.key = Object.assign(DJ.keys.make(i.key.tonic, i.key.minor), { confidence: i.key.confidence });
      if (i.wave) i.wave.firstBeat = i.firstBeat;
      return res;
    },
    core,
  };
})();
