// AudioWorklet processors. The page turns this function into a data:/blob:
// URL (addModule() refuses file:// URLs); where those are blocked, this same
// file is loaded directly as the worklet module and runs itself.
// Everything inside runs on the audio thread and cannot see window or DJ.
//
//   deck-player  sample playback: varispeed, key lock (WSOLA), loops, scratch
//   beat-roll    captures a tempo-synced slice and repeats it
//   master-bus   look-ahead peak limiter + optional WAV capture tap
(function (fn) {
  if (typeof registerProcessor === 'function' && typeof window === 'undefined') fn();
  else window.DJ.workletSource = fn;
})(function () {
  const TAU = Math.PI * 2;

  // Cubic Hermite read at fractional index p (returns 0 outside the buffer).
  function hermite(a, len, p) {
    const i = Math.floor(p), f = p - i;
    let x0, x1, x2, x3;
    if (i >= 1 && i < len - 2) { x0 = a[i - 1]; x1 = a[i]; x2 = a[i + 1]; x3 = a[i + 2]; }
    else {
      x0 = i - 1 >= 0 && i - 1 < len ? a[i - 1] : 0;
      x1 = i >= 0 && i < len ? a[i] : 0;
      x2 = i + 1 >= 0 && i + 1 < len ? a[i + 1] : 0;
      x3 = i + 2 >= 0 && i + 2 < len ? a[i + 2] : 0;
    }
    const c1 = 0.5 * (x2 - x0);
    const c2 = x0 - 2.5 * x1 + 2 * x2 - 0.5 * x3;
    const c3 = 0.5 * (x3 - x0) + 1.5 * (x1 - x2);
    return ((c3 * f + c2) * f + c1) * f + x1;
  }

  class DeckPlayer extends AudioWorkletProcessor {
    constructor() {
      super();
      this.L = null; this.R = null; this.len = 0;
      this.pos = 0;              // timeline position in source samples
      this.playing = false;
      this.rate = 1; this.rateTarget = 1;
      this.keylock = false;
      this.loopOn = false; this.loopIn = 0; this.loopOut = 0;
      this.scratching = false; this.scratchTarget = 0; this.vel = 0;
      this.gain = 0;             // play/pause de-click ramp
      this.xf = 0; this.xfPos = 0; this.XF = 256; // jump crossfade (varispeed path)
      // WSOLA key lock: two Hann grains at 50% overlap.
      this.N = sampleRate > 60000 ? 4096 : 2048; this.H = this.N >> 1;
      this.win = new Float32Array(this.N);
      for (let i = 0; i < this.N; i++) this.win[i] = 0.5 - 0.5 * Math.cos((TAU * i) / this.N);
      this.grains = [{ start: 0, n: -1 }, { start: 0, n: -1 }];
      this.gi = 0; this.hop = 0; this.klActive = false;
      this.D = this.N >> 2;      // search radius for grain alignment
      this.block = 0; this.seq = 0;
      this.port.onmessage = (e) => this.onMsg(e.data);
    }

    onMsg(m) {
      if (m.seq) this.seq = m.seq;
      switch (m.type) {
        case 'load':
          this.L = m.L; this.R = m.R || m.L; this.len = m.L.length;
          this.pos = 0; this.playing = false; this.gain = 0; this.loopOn = false; this.xf = 0;
          this.scratching = false; this.vel = 0; this.klActive = false;
          break;
        case 'unload': this.L = this.R = null; this.len = 0; this.playing = false; break;
        case 'play': if (this.len) this.playing = true; break;
        case 'pause': this.playing = false; break;
        case 'seek': this.jump(m.pos); break;
        case 'shift': this.jump(this.pos + m.by); break;
        case 'rate': this.rateTarget = m.rate; if (m.immediate) this.rate = m.rate; break;
        case 'keylock': this.keylock = !!m.on; break;
        case 'loop':
          this.loopOn = !!m.on; this.loopIn = m.in; this.loopOut = m.out;
          if (this.loopOn && m.jumpIn) this.jump(this.loopIn);
          break;
        case 'scratch':
          if (m.on) { this.scratching = true; this.scratchTarget = this.pos; this.vel = this.playing ? this.rate : 0; }
          else { this.scratching = false; }
          break;
        case 'target': this.scratchTarget = m.pos; break;
        case 'ping': this.port.postMessage({ type: 'pong', id: m.id }); break;
      }
    }

    jump(p) {
      p = Math.max(0, Math.min(p, this.len - 1));
      if (!this.keylock || this.scratching) { this.xfPos = this.pos; this.xf = this.gain > 0 ? this.XF : 0; }
      this.pos = p;
    }

    startGrain() {
      const g = this.grains[this.gi];
      const prev = this.grains[this.gi ^ 1];
      const nominal = Math.floor(this.pos);
      let best = nominal;
      if (prev.n >= 0 && prev.n <= this.N) {
        // Find the offset whose start best continues where the previous grain is going.
        const L = this.L, R = this.R, len = this.len, H = this.H, D = this.D;
        const ref = prev.start + H;
        const corr = (s, step) => {
          let acc = 0;
          for (let k = 0; k < H; k += step) {
            const a = s + k, b = ref + k;
            if (a < 0 || a >= len || b < 0 || b >= len) continue;
            acc += (L[a] + R[a]) * (L[b] + R[b]);
          }
          return acc;
        };
        let bestScore = -Infinity;
        for (let o = -D; o <= D; o += 4) {
          const sc = corr(nominal + o, 8);
          if (sc > bestScore) { bestScore = sc; best = nominal + o; }
        }
        const c = best; bestScore = -Infinity;
        for (let o = -4; o <= 4; o++) {
          const sc = corr(c + o, 2);
          if (sc > bestScore) { bestScore = sc; best = c + o; }
        }
      }
      g.start = best; g.n = 0;
      this.gi ^= 1;
    }

    process(inputs, outputs) {
      const out = outputs[0], oL = out[0], oR = out[1] || out[0];
      const n = oL.length;
      const reportPos = this.pos, reportT = currentTime;
      if (!this.len) { oL.fill(0); if (oR !== oL) oR.fill(0); this.report(reportT, reportPos); return true; }
      const L = this.L, R = this.R, len = this.len;

      for (let i = 0; i < n; i++) {
        this.rate += (this.rateTarget - this.rate) * 0.002;
        let v; // timeline speed this sample
        let g;
        if (this.scratching) {
          const want = (this.scratchTarget - this.pos) / (0.025 * sampleRate);
          this.vel += (Math.max(-4, Math.min(4, want)) - this.vel) * 0.02;
          v = this.vel;
          g = Math.min(1, Math.abs(v) * 8);
          this.gain = 1;
        } else {
          const target = this.playing ? 1 : 0;
          if (this.gain < target) this.gain = Math.min(1, this.gain + 1 / 128);
          else if (this.gain > target) this.gain = Math.max(0, this.gain - 1 / 128);
          v = this.gain > 0 ? this.rate : 0;
          g = this.gain;
        }
        if (g <= 0) { oL[i] = 0; oR[i] = 0; this.klActive = false; continue; }

        let l, r;
        const useKL = this.keylock && !this.scratching && v > 0.05;
        if (useKL) {
          if (!this.klActive) {
            // Enter mid-cycle so the two windows already sum to 1 (no dip).
            const a = this.grains[this.gi ^ 1];
            a.start = Math.floor(this.pos) - this.H; a.n = this.H;
            this.hop = 0; this.klActive = true;
          }
          if (this.hop <= 0) { this.startGrain(); this.hop = this.H; }
          this.hop--;
          l = 0; r = 0;
          for (let k = 0; k < 2; k++) {
            const gr = this.grains[k];
            if (gr.n < 0 || gr.n >= this.N) continue;
            const idx = gr.start + gr.n, w = this.win[gr.n];
            if (idx >= 0 && idx < len) { l += L[idx] * w; r += R[idx] * w; }
            gr.n++;
          }
        } else {
          this.klActive = false;
          l = hermite(L, len, this.pos); r = R === L ? l : hermite(R, len, this.pos);
          if (this.xf > 0) {
            const k = this.xf / this.XF;
            const ol = hermite(L, len, this.xfPos), or = R === L ? ol : hermite(R, len, this.xfPos);
            l = l * (1 - k) + ol * k; r = r * (1 - k) + or * k;
            this.xfPos += v; this.xf--;
          }
        }
        oL[i] = l * g; oR[i] = r * g;

        const prev = this.pos;
        this.pos += v;
        if (this.loopOn && v > 0 && prev < this.loopOut && this.pos >= this.loopOut) {
          const ll = this.loopOut - this.loopIn;
          if (ll > 16) { const p = this.pos - ll; this.jump(p < this.loopIn ? this.loopIn : p); }
        }
        if (this.pos >= len) {
          this.pos = len - 1;
          if (!this.scratching) { this.playing = false; this.gain = 0; this.port.postMessage({ type: 'ended' }); }
        } else if (this.pos < 0) this.pos = 0;
      }
      this.report(reportT, reportPos);
      return true;
    }

    report(t, p) {
      if (++this.block % 4) return;
      this.port.postMessage({
        type: 'pos', seq: this.seq, t, pos: p / sampleRate, playing: this.playing || this.scratching,
        speed: this.scratching ? this.vel : this.playing ? this.rate : 0,
      });
    }
  }
  registerProcessor('deck-player', DeckPlayer);

  // ------------------------------------------------------------------ beat roll
  class BeatRoll extends AudioWorkletProcessor {
    static get parameterDescriptors() { return [{ name: 'mix', defaultValue: 1, minValue: 0, maxValue: 1 }]; }
    constructor() {
      super();
      this.max = Math.ceil(sampleRate * 8);
      this.bL = new Float32Array(this.max); this.bR = new Float32Array(this.max);
      this.state = 0; // 0 idle, 1 waiting for start time, 2 capturing, 3 repeating
      this.len = sampleRate / 2; this.w = 0; this.r = 0; this.when = 0; this.env = 0;
      this.port.onmessage = (e) => {
        const m = e.data;
        if (m.type === 'on') { this.len = Math.max(64, Math.min(this.max, Math.round(m.len))); this.when = m.when || 0; this.state = 1; }
        else if (m.type === 'off') this.state = 0;
        else if (m.type === 'len') {
          this.len = Math.max(64, Math.min(this.max, Math.round(m.len)));
          if (this.state === 3 && this.w < this.len) { this.state = 2; } // need more material
          if (this.r >= this.len) this.r = 0;
        }
      };
    }
    process(inputs, outputs, params) {
      const inp = inputs[0], out = outputs[0];
      const iL = inp[0], iR = inp[1] || inp[0], oL = out[0], oR = out[1] || out[0];
      const n = oL.length, mixP = params.mix;
      for (let i = 0; i < n; i++) {
        const l = iL ? iL[i] : 0, r = iR ? iR[i] : 0;
        if (this.state === 1 && currentTime + i / sampleRate >= this.when) { this.state = 2; this.w = 0; }
        let wl = l, wr = r;
        if (this.state === 2) {
          this.bL[this.w] = l; this.bR[this.w] = r; this.w++;
          if (this.w >= this.len) { this.state = 3; this.r = 0; }
        } else if (this.state === 3) {
          const e = Math.min(1, this.r / 48, (this.len - this.r) / 48);
          wl = this.bL[this.r] * e; wr = this.bR[this.r] * e;
          if (++this.r >= this.len) this.r = 0;
        }
        const target = this.state >= 2 ? 1 : 0;
        this.env += (target - this.env) * 0.01;
        const mix = (mixP.length > 1 ? mixP[i] : mixP[0]) * this.env;
        oL[i] = l * (1 - mix) + wl * mix;
        oR[i] = r * (1 - mix) + wr * mix;
      }
      return true;
    }
  }
  registerProcessor('beat-roll', BeatRoll);

  // ----------------------------------------------------------- master limiter
  class MasterBus extends AudioWorkletProcessor {
    constructor() {
      super();
      this.ceil = 0.966; // -0.3 dBFS
      this.LA = Math.max(16, Math.round(sampleRate * 0.0015));
      this.dL = new Float32Array(this.LA); this.dR = new Float32Array(this.LA);
      this.req = new Float32Array(this.LA).fill(1);
      this.w = 0; this.g = 1;
      this.atk = 1 - Math.exp(-5 / this.LA);
      this.rel = Math.exp(-1 / (0.12 * sampleRate));
      this.grMin = 1; this.peak = 0; this.block = 0;
      this.rec = false; this.chunk = 4096; this.cL = null; this.cR = null; this.ci = 0;
      this.port.onmessage = (e) => {
        const m = e.data;
        if (m.type === 'rec') {
          if (m.on) { this.rec = true; this.newChunk(); }
          else { if (this.rec && this.ci > 0) this.flush(); this.rec = false; this.port.postMessage({ type: 'recEnd' }); }
        }
      };
    }
    newChunk() { this.cL = new Float32Array(this.chunk); this.cR = new Float32Array(this.chunk); this.ci = 0; }
    flush() {
      const l = this.cL.subarray(0, this.ci).slice(), r = this.cR.subarray(0, this.ci).slice();
      this.port.postMessage({ type: 'rec', l, r }, [l.buffer, r.buffer]);
      this.newChunk();
    }
    process(inputs, outputs) {
      const inp = inputs[0], out = outputs[0];
      const iL = inp[0], iR = inp[1] || inp[0], oL = out[0], oR = out[1] || out[0];
      const n = oL.length, LA = this.LA, ceil = this.ceil;
      for (let i = 0; i < n; i++) {
        const l = iL ? iL[i] : 0, r = iR ? iR[i] : 0;
        const pk = Math.max(Math.abs(l), Math.abs(r));
        this.req[this.w] = pk > ceil ? ceil / pk : 1;
        let target = 1;
        for (let k = 0; k < LA; k++) if (this.req[k] < target) target = this.req[k];
        if (target < this.g) this.g += (target - this.g) * this.atk;
        else this.g = target + (this.g - target) * this.rel;
        const dl = this.dL[this.w], dr = this.dR[this.w];
        this.dL[this.w] = l; this.dR[this.w] = r;
        if (++this.w >= LA) this.w = 0;
        let yl = dl * this.g, yr = dr * this.g;
        yl = yl > ceil ? ceil : yl < -ceil ? -ceil : yl;
        yr = yr > ceil ? ceil : yr < -ceil ? -ceil : yr;
        oL[i] = yl; oR[i] = yr;
        if (this.g < this.grMin) this.grMin = this.g;
        if (this.rec) { this.cL[this.ci] = yl; this.cR[this.ci] = yr; if (++this.ci >= this.chunk) this.flush(); }
      }
      if (++this.block % 16 === 0) { this.port.postMessage({ type: 'gr', gr: this.grMin }); this.grMin = 1; }
      return true;
    }
  }
  registerProcessor('master-bus', MasterBus);
});
