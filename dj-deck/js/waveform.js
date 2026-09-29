// Canvas renderers: the scrolling 3-band waveform (drag to scratch, wheel to
// zoom), the full-track overview, and the touch jog platter.
(function () {
  const DJ = window.DJ;
  const css = getComputedStyle(document.documentElement);
  const tok = (n) => css.getPropertyValue(n).trim();
  const C = {
    low: tok('--w-low') || '#2f74ff', mid: tok('--w-mid') || '#f3a33c', high: tok('--w-high') || '#eef3fb',
    A: tok('--a'), B: tok('--b'), warn: tok('--warn'), ok: tok('--ok'), fg: tok('--fg'), dim: tok('--dim'), line: tok('--line'), well: tok('--well'),
  };

  function fit(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr)), h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; return true; }
    return false;
  }

  // Max-pooled levels so any zoom reads one value per column.
  function mipmap(wave) {
    if (wave.mips) return wave.mips;
    const levels = [{ amp: wave.amp, low: wave.low, mid: wave.mid, high: wave.high, n: wave.length }];
    while (levels[levels.length - 1].n > 64) {
      const p = levels[levels.length - 1], n = Math.ceil(p.n / 2);
      const l = { amp: new Uint8Array(n), low: new Uint8Array(n), mid: new Uint8Array(n), high: new Uint8Array(n), n };
      for (let i = 0; i < n; i++) {
        const a = 2 * i, b = Math.min(a + 1, p.n - 1);
        l.amp[i] = Math.max(p.amp[a], p.amp[b]); l.low[i] = Math.max(p.low[a], p.low[b]);
        l.mid[i] = Math.max(p.mid[a], p.mid[b]); l.high[i] = Math.max(p.high[a], p.high[b]);
      }
      levels.push(l);
    }
    wave.mips = levels;
    return levels;
  }

  // Draw bands for columns [x0, x1) where column x covers track time t(x).
  // `colAt(x)` returns [level, index] into the mip levels.
  function drawBands(g, mips, cols, H, alpha) {
    const mid = H / 2, s = (H / 2 - 1) / 255;
    const paths = [new Path2D(), new Path2D(), new Path2D()];
    for (const [x, w, L, i] of cols) {
      const lv = mips[L]; if (i < 0 || i >= lv.n) continue;
      const lo = lv.low[i] * s, md = lv.mid[i] * s * 0.6, hi = lv.high[i] * s * 0.38;
      paths[0].rect(x, mid - lo, w, lo * 2);
      paths[1].rect(x, mid - md, w, md * 2);
      paths[2].rect(x, mid - hi, w, hi * 2);
    }
    g.globalAlpha = alpha;
    g.fillStyle = C.low; g.fill(paths[0]);
    g.fillStyle = C.mid; g.fill(paths[1]);
    g.fillStyle = C.high; g.fill(paths[2]);
    g.globalAlpha = 1;
  }

  // Pixel renderer for the scrolling lanes. Filling thousands of path rects
  // every frame is cheap in JS but slow to rasterise without a GPU; writing
  // pixels ourselves costs ~1 ms and one upload.
  function rgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim()); const n = m ? parseInt(m[1], 16) : 0x888888;
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function pack(r, g, b) { return (255 << 24) | (b << 16) | (g << 8) | r; } // little-endian RGBA
  const BG = rgb(tok('--well') || '#090b0f');
  const mixc = (c, k) => pack(...c.map((v, i) => Math.round(BG[i] + (v - BG[i]) * k)));
  const PAL = {
    bg: pack(...BG),
    live: [mixc(rgb(C.low), 1), mixc(rgb(C.mid), 1), mixc(rgb(C.high), 1)],
    played: [mixc(rgb(C.low), 0.5), mixc(rgb(C.mid), 0.5), mixc(rgb(C.high), 0.5)],
  };
  function paintBands(img, mips, cols, center) {
    const W = img.width, H = img.height, px = new Uint32Array(img.data.buffer);
    px.fill(PAL.bg);
    const mid = H / 2, s = (H / 2 - 1) / 255;
    for (const [xf, wf, L, i] of cols) {
      const lv = mips[L]; if (i < 0 || i >= lv.n) continue;
      let x0 = Math.max(0, Math.round(xf)), x1 = Math.min(W, Math.round(xf + wf));
      if (x1 <= x0) continue;
      const lo = lv.low[i] * s, md = lv.mid[i] * s * 0.6, hi = lv.high[i] * s * 0.38;
      const top = Math.max(lo, md, hi), y0 = Math.max(0, Math.floor(mid - top)), y1 = Math.min(H, Math.ceil(mid + top));
      for (let x = x0; x < x1; x++) {
        const pal = x < center ? PAL.played : PAL.live;
        for (let y = y0; y < y1; y++) {
          const dy = Math.abs(y + 0.5 - mid);
          const c = dy < hi ? pal[2] : dy < md ? pal[1] : dy < lo ? pal[0] : 0;
          if (c) px[y * W + x] = c;
        }
      }
    }
  }

  // ------------------------------------------------------- scrolling wave
  DJ.WaveView = class {
    constructor(deck, canvas, ui) {
      this.deck = deck; this.canvas = canvas; this.ui = ui; this.g = canvas.getContext('2d');
      this.acc = deck.id === 'A' ? C.A : C.B;
      let x0 = 0, p0 = 0;
      canvas.addEventListener('pointerdown', (e) => {
        if (!deck.track || (DJ.learn && DJ.learn.active)) return;
        canvas.setPointerCapture(e.pointerId);
        x0 = e.clientX; p0 = deck.position(true);
        deck.scratchStart();
      });
      canvas.addEventListener('pointermove', (e) => {
        if (!canvas.hasPointerCapture(e.pointerId)) return;
        const secPerPx = this.ui.zoomSec / canvas.clientWidth;
        deck.scratchTo(p0 - (e.clientX - x0) * secPerPx); // the waveform follows your finger
      });
      const end = (e) => { if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId); deck.scratchEnd(); };
      canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
      canvas.addEventListener('wheel', (e) => { e.preventDefault(); this.ui.zoom(e.deltaY > 0 ? 1.12 : 1 / 1.12); }, { passive: false });
    }
    trackChanged() {}
    draw(pos) {
      const c = this.canvas, g = this.g, d = this.deck, t = d.track;
      fit(c);
      const W = c.width, H = c.height, dpr = W / Math.max(1, c.clientWidth);
      g.clearRect(0, 0, W, H);
      const center = Math.round(W * 0.5);
      if (!t || !t.wave) {
        g.fillStyle = C.line; g.fillRect(0, H / 2, W, 1);
        g.fillStyle = C.dim; g.font = `${12 * dpr}px system-ui, sans-serif`; g.textAlign = 'center';
        g.fillText(t ? 'No waveform' : 'Deck ' + d.id + ': drop a track here', W / 2, H / 2 - 8 * dpr);
        return;
      }
      const wave = t.wave, mips = mipmap(wave), pps = wave.pps;
      const secPerDev = this.ui.zoomSec / W; // seconds per device pixel
      const colW = Math.max(1, Math.round(dpr)); // one column per CSS px
      const ptsPerCol = secPerDev * colW * pps;
      const cols = [];
      if (ptsPerCol >= 1) {
        const L = Math.min(mips.length - 1, Math.floor(Math.log2(ptsPerCol)));
        const tLeft = pos - center * secPerDev;
        const k0 = Math.floor((tLeft * pps) / ptsPerCol) - 1, k1 = k0 + Math.ceil(W / colW) + 2;
        for (let k = k0; k <= k1; k++) {
          const x = ((k * ptsPerCol) / pps - pos) / secPerDev + center;
          cols.push([x, colW, L, Math.floor((k * ptsPerCol) / Math.pow(2, L))]);
        }
      } else {
        const pxPerPt = 1 / (secPerDev * pps);
        const j0 = Math.floor((pos - center * secPerDev) * pps) - 1, j1 = j0 + Math.ceil(W / pxPerPt) + 2;
        for (let j = j0; j <= j1; j++) cols.push([(j / pps - pos) / secPerDev + center, Math.max(1, pxPerPt - 0.5), 0, j]);
      }
      if (!this.img || this.img.width !== W || this.img.height !== H) this.img = g.createImageData(W, H);
      paintBands(this.img, mips, cols, center);
      g.putImageData(this.img, 0, 0);
      // Loop region
      const X = (sec) => (sec - pos) / secPerDev + center;
      if (d.loop.in != null) {
        const x0 = X(d.loop.in), x1 = d.loop.out != null ? X(d.loop.out) : x0 + 2 * dpr;
        g.fillStyle = d.loop.on ? 'rgba(69,209,122,.18)' : 'rgba(69,209,122,.07)';
        g.fillRect(x0, 0, x1 - x0, H);
        g.fillStyle = C.ok; g.fillRect(x0, 0, dpr, H); if (d.loop.out != null) g.fillRect(x1 - dpr, 0, dpr, H);
      }
      // Beat grid
      if (t.bpm) {
        const bl = 60 / t.bpm, pxPerBeat = bl / secPerDev;
        const b0 = Math.ceil(d.beatIndex(pos - center * secPerDev)), b1 = Math.floor(d.beatIndex(pos + (W - center) * secPerDev));
        const onlyBars = pxPerBeat < 7 * dpr;
        for (let b = b0; b <= b1; b++) {
          const bar = ((b % 4) + 4) % 4 === 0;
          if (onlyBars && !bar) continue;
          const x = Math.round(X(d.beatTime(b)));
          g.fillStyle = bar ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.22)';
          const tick = bar ? 9 * dpr : 5 * dpr;
          g.fillRect(x, 0, dpr, tick); g.fillRect(x, H - tick, dpr, tick);
          if (bar) { g.fillStyle = 'rgba(255,255,255,.07)'; g.fillRect(x, tick, dpr, H - 2 * tick); }
        }
      }
      // Hot cues + main cue
      g.font = `600 ${10 * dpr}px system-ui, sans-serif`; g.textAlign = 'left'; g.textBaseline = 'top';
      d.hotcues.forEach((hc, i) => {
        if (hc == null) return;
        const x = Math.round(X(hc)); if (x < -20 * dpr || x > W) return;
        g.fillStyle = DJ.HOTCUE_COLORS[i]; g.fillRect(x, 0, 2 * dpr, H);
        g.fillRect(x, 0, 14 * dpr, 13 * dpr);
        g.fillStyle = '#0b0d10'; g.fillText(String(i + 1), x + 4 * dpr, 1.5 * dpr);
      });
      const cx = X(d.cuePoint);
      g.fillStyle = C.warn; g.beginPath(); g.moveTo(cx - 6 * dpr, H); g.lineTo(cx + 6 * dpr, H); g.lineTo(cx, H - 8 * dpr); g.fill();
      // Playhead
      g.fillStyle = 'rgba(255,255,255,.18)'; g.fillRect(center - 3 * dpr, 0, 6 * dpr, H);
      g.fillStyle = '#fff'; g.fillRect(center - dpr, 0, 2 * dpr, H);
    }
  };

  // ----------------------------------------------------------- overview
  DJ.OverviewView = class {
    constructor(deck, canvas) { this.deck = deck; this.canvas = canvas; this.g = canvas.getContext('2d'); this.img = null; }
    trackChanged() { this.img = null; }
    render() {
      const c = this.canvas, t = this.deck.track;
      const off = document.createElement('canvas'); off.width = c.width; off.height = c.height;
      const g = off.getContext('2d');
      const mips = mipmap(t.wave), W = c.width, n = t.wave.length;
      const per = n / W, L = Math.max(0, Math.min(mips.length - 1, Math.floor(Math.log2(Math.max(1, per)))));
      const cols = [];
      for (let x = 0; x < W; x++) {
        // max over the level-L cells that this column spans
        const a = Math.floor((x * per) / 2 ** L), b = Math.max(a, Math.floor(((x + 1) * per) / 2 ** L) - 1);
        let best = a; for (let i = a + 1; i <= b && i < mips[L].n; i++) if (mips[L].amp[i] > mips[L].amp[best]) best = i;
        cols.push([x, 1, L, best]);
      }
      drawBands(g, mips, cols, c.height, 1);
      this.img = off; this.imgFor = t; this.imgW = W;
    }
    draw(pos) {
      const c = this.canvas, g = this.g, d = this.deck, t = d.track;
      const resized = fit(c);
      const W = c.width, H = c.height, dpr = W / Math.max(1, c.clientWidth);
      g.clearRect(0, 0, W, H);
      if (!t || !t.wave) return;
      if (resized || !this.img || this.imgFor !== t || this.imgW !== W) this.render();
      g.drawImage(this.img, 0, 0);
      const X = (s) => (s / t.duration) * W;
      const px = X(pos);
      g.fillStyle = 'rgba(9,11,15,.55)'; g.fillRect(0, 0, px, H);
      if (d.loop.in != null && d.loop.out != null) { g.fillStyle = d.loop.on ? 'rgba(69,209,122,.35)' : 'rgba(69,209,122,.15)'; g.fillRect(X(d.loop.in), 0, Math.max(2, X(d.loop.out) - X(d.loop.in)), H); }
      d.hotcues.forEach((hc, i) => { if (hc != null) { g.fillStyle = DJ.HOTCUE_COLORS[i]; g.fillRect(X(hc) - dpr, 0, 2 * dpr, H * 0.45); } });
      g.fillStyle = C.warn; g.fillRect(X(d.cuePoint) - dpr, H * 0.55, 2 * dpr, H * 0.45);
      g.fillStyle = '#fff'; g.fillRect(px - dpr, 0, 2 * dpr, H);
    }
  };

  // ---------------------------------------------------------- jog platter
  // 33⅓ rpm: one turn = 1.8 s of audio. Drag around the ring to scratch.
  const TURN = 1.8;
  DJ.JogView = class {
    constructor(deck, canvas) {
      this.deck = deck; this.canvas = canvas; this.g = canvas.getContext('2d');
      this.acc = deck.id === 'A' ? C.A : C.B;
      let a0 = 0, total = 0, p0 = 0;
      const ang = (e) => { const r = canvas.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)); };
      canvas.addEventListener('pointerdown', (e) => {
        if (!deck.track || (DJ.learn && DJ.learn.active)) return;
        canvas.setPointerCapture(e.pointerId); a0 = ang(e); total = 0; p0 = deck.position(true);
        deck.scratchStart(); this.touch = true;
      });
      canvas.addEventListener('pointermove', (e) => {
        if (!canvas.hasPointerCapture(e.pointerId)) return;
        const a = ang(e); let da = a - a0; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI;
        a0 = a; total += da;
        deck.scratchTo(p0 + (total / (2 * Math.PI)) * TURN);
      });
      const end = (e) => { if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId); deck.scratchEnd(); this.touch = false; };
      canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
    }
    draw(pos) {
      const c = this.canvas, g = this.g, d = this.deck, t = d.track;
      fit(c);
      const W = c.width, H = c.height, dpr = W / Math.max(1, c.clientWidth);
      const R = Math.min(W, H) / 2 - 2 * dpr, cx = W / 2, cy = H / 2;
      g.clearRect(0, 0, W, H);
      // platter
      g.fillStyle = '#10141a'; g.beginPath(); g.arc(cx, cy, R, 0, 2 * Math.PI); g.fill();
      g.strokeStyle = '#1d232c'; g.lineWidth = dpr;
      for (let r = R * 0.45; r < R * 0.92; r += 4 * dpr) { g.beginPath(); g.arc(cx, cy, r, 0, 2 * Math.PI); g.stroke(); }
      // progress ring
      const frac = t ? pos / t.duration : 0;
      g.lineWidth = 4 * dpr; g.strokeStyle = C.line; g.beginPath(); g.arc(cx, cy, R - 3 * dpr, 0, 2 * Math.PI); g.stroke();
      g.strokeStyle = this.acc; g.beginPath(); g.arc(cx, cy, R - 3 * dpr, -Math.PI / 2, -Math.PI / 2 + frac * 2 * Math.PI); g.stroke();
      // spinning marker
      const a = (pos / TURN) * 2 * Math.PI - Math.PI / 2;
      g.strokeStyle = this.touch ? C.warn : C.fg; g.lineWidth = 3 * dpr; g.lineCap = 'round';
      g.beginPath(); g.moveTo(cx + Math.cos(a) * R * 0.5, cy + Math.sin(a) * R * 0.5); g.lineTo(cx + Math.cos(a) * R * 0.86, cy + Math.sin(a) * R * 0.86); g.stroke();
      // centre label: bar.beat counter
      g.fillStyle = '#1a2029'; g.beginPath(); g.arc(cx, cy, R * 0.4, 0, 2 * Math.PI); g.fill();
      g.textAlign = 'center'; g.textBaseline = 'middle';
      if (t && t.bpm) {
        const bi = Math.floor(d.beatIndex(pos) + 1e-6);
        const bar = Math.floor(bi / 4) + 1, beat = ((bi % 4) + 4) % 4 + 1;
        g.fillStyle = C.fg; g.font = `600 ${Math.round(R * 0.2)}px ui-monospace, monospace`;
        g.fillText(`${bar}.${beat}`, cx, cy - R * 0.07);
        // four beat dots
        for (let i = 0; i < 4; i++) { g.fillStyle = i < beat ? this.acc : C.line; g.beginPath(); g.arc(cx + (i - 1.5) * R * 0.12, cy + R * 0.18, R * 0.035, 0, 2 * Math.PI); g.fill(); }
      } else {
        g.fillStyle = C.dim; g.font = `600 ${Math.round(R * 0.2)}px system-ui, sans-serif`; g.fillText(d.id, cx, cy);
      }
    }
  };
})();
