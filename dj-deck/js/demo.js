// Two built-in demo tracks so the decks have music the moment the app opens.
// Synthesised here (no audio files to ship): 124 BPM in A minor and 124 BPM
// in C major, so they mix together straight away.
(function () {
  const DJ = window.DJ;
  const NOTE = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9 };
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);

  function synth(sr, { bpm, key, minor, bars, offset, seed }) {
    const beat = 60 / bpm, secs = offset + bars * 4 * beat + 1.5;
    const L = new Float32Array(Math.ceil(secs * sr)), R = new Float32Array(L.length);
    let s = seed >>> 0; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
    const add = (at, n, f, pan = 0) => { const i0 = Math.floor(at * sr); for (let i = 0; i < n && i0 + i < L.length; i++) { const v = f(i / sr, i); L[i0 + i] += v * (1 - pan); R[i0 + i] += v * (1 + pan); } };
    const kick = (at) => { let ph = 0; add(at, 0.4 * sr, (t) => { ph += 2 * Math.PI * (48 + 110 * Math.exp(-t * 30)) / sr; return Math.sin(ph) * Math.exp(-t * 7) * 0.9; }); };
    const hat = (at, a, pan) => { let p = 0; add(at, 0.06 * sr, (t) => { const x = rnd(), y = x - p; p = x; return y * Math.exp(-t * 60) * a; }, pan); };
    const clap = (at) => { let p = 0; add(at, 0.2 * sr, (t) => { const x = rnd(), y = x - p; p = x; return y * Math.exp(-t * 22) * 0.32; }); };
    const pad = (at, len, notes, pan) => {
      for (const f of notes) { let y = 0, ph = Math.random(); const n = Math.floor(len * sr);
        add(at, n, (t, i) => { ph = (ph + f / sr) % 1; y += 0.07 * ((2 * ph - 1) - y); return y * Math.min(1, i / 3000, (n - i) / 3000) * 0.06; }, pan); }
    };
    const bass = (at, len, f) => add(at, len * sr, (t) => Math.sin(2 * Math.PI * f * t) * Math.min(1, t * 400) * Math.exp(-t * 4) * 0.4);
    const root = NOTE[key] + 48;
    const prog = minor ? [[0, 3, 7], [5, 8, 12], [-4, 0, 3], [7, 11, 14]] : [[0, 4, 7], [5, 9, 12], [7, 11, 14], [0, 4, 7]];
    for (let b = 0; b < bars * 4; b++) {
      const bar = Math.floor(b / 4), t = offset + b * beat;
      const intro = bar < 8, brk = bar >= bars - 16 && bar < bars - 8;
      if (!brk) kick(t);
      hat(t + beat / 2, 0.22, 0.3);
      if (!intro) { hat(t + beat / 4, 0.07, -0.3); hat(t + 3 * beat / 4, 0.07, -0.3); }
      if (!intro && b % 2 === 1) clap(t);
      const ch = prog[bar % 4];
      if (b % 4 === 0 && bar >= 4) pad(t, beat * 4, ch.map((x) => hz(root + x + 12)), minor ? -0.2 : 0.2);
      if (!intro && !brk) bass(t + beat / 2, beat * 0.45, hz(root + ch[0] - 12));
    }
    let m = 0; for (let i = 0; i < L.length; i++) m = Math.max(m, Math.abs(L[i]), Math.abs(R[i]));
    const g = 0.8 / (m || 1); for (let i = 0; i < L.length; i++) { L[i] *= g; R[i] *= g; }
    return [L, R];
  }

  const TRACKS = {
    A: { id: 'demo:after-hours', title: 'After Hours (demo)', artist: 'Deckhand', bpm: 124, key: 'A', minor: true, bars: 64, offset: 0.1, seed: 11 },
    B: { id: 'demo:first-light', title: 'First Light (demo)', artist: 'Deckhand', bpm: 124, key: 'C', minor: false, bars: 64, offset: 0.1, seed: 29 },
  };

  DJ.demo = {
    // Loads a demo onto each empty deck. Yields between tracks so the page stays responsive.
    async loadEmpty(engine) {
      for (const id of ['A', 'B']) {
        const deck = engine.decks[id];
        if (deck.track || deck.loading) continue;
        await new Promise((r) => setTimeout(r, 30));
        const spec = TRACKS[id], sr = engine.ctx.sampleRate;
        const [L, R] = synth(sr, spec);
        const buf = engine.ctx.createBuffer(2, L.length, sr);
        buf.copyToChannel(L, 0); buf.copyToChannel(R, 1);
        if (deck.track || deck.loading) continue; // user beat us to it
        const token = ++deck.loadToken;
        deck.loading = 'demo'; deck.emit('loading', { name: spec.title, stage: 'Preparing' });
        try { await deck.loadDecoded(buf, { id: spec.id, name: spec.title + '.wav', title: spec.title, artist: spec.artist }, token); }
        finally { if (token === deck.loadToken) { deck.loading = false; deck.emit('loading', null); } }
      }
    },
  };
})();
