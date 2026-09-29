// Test helpers that run inside the browser page (tests/index.html).
// Each test builds the real engine on an OfflineAudioContext, renders audio
// and measures what comes out.
(function () {
  const SR = 48000;
  const T = (window.T = { tests: [], SR });

  T.test = (name, fn) => T.tests.push({ name, fn });

  T.engine = async (secs) => {
    const ctx = new OfflineAudioContext(2, Math.ceil(SR * secs), SR);
    const eng = await new DJ.Engine(ctx).init();
    // Unity gain through the whole chain unless a test says otherwise.
    eng.setMaster(0.8); eng.setCurve('power'); eng.setCrossfader(0.5);
    return eng;
  };

  T.buffer = (ctx, secs, fn, channels = 2) => {
    const b = ctx.createBuffer(channels, Math.ceil(SR * secs), SR);
    for (let c = 0; c < channels; c++) { const d = b.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] = fn(i / SR, c); }
    return b;
  };
  T.tone = (ctx, f, secs, amp = 0.5) => T.buffer(ctx, secs, (t) => amp * Math.sin(2 * Math.PI * f * t));

  T.load = async (deck, buf, meta = {}) => {
    await deck.loadDecoded(buf, Object.assign({ id: 'test-' + Math.random(), name: 'test.wav' }, meta));
    await T.ping(deck);
  };
  // Round trip through the worklet so earlier messages are applied.
  T.ping = (deck) => new Promise((res, rej) => {
    const id = Math.random();
    const off = deck.on('pong', (x) => { if (x === id) { off(); res(); } });
    deck.player.port.postMessage({ type: 'ping', id });
    setTimeout(() => rej(new Error('worklet did not answer ping')), 3000);
  });
  T.pingAll = (eng) => Promise.all(Object.values(eng.decks).map(T.ping));
  T.at = (eng, t, fn) => eng.ctx.suspend(t).then(async () => { await fn(); await T.pingAll(eng); eng.ctx.resume(); });
  // Offline rendering outruns message delivery, so flush commands first.
  T.render = async (eng) => { await T.pingAll(eng); const b = await eng.ctx.startRendering(); await new Promise((r) => setTimeout(r, 60)); return b; };

  T.slice = (buf, t0, t1, ch = 0) => buf.getChannelData(ch).subarray(Math.floor(t0 * SR), Math.floor(t1 * SR));
  T.rms = (a) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * a[i]; return Math.sqrt(s / a.length); };
  T.peak = (a) => { let m = 0; for (let i = 0; i < a.length; i++) m = Math.max(m, Math.abs(a[i])); return m; };
  T.db = (x) => 20 * Math.log10(x + 1e-12);
  // Frequency from rising zero crossings, interpolated.
  T.freq = (a) => {
    let first = -1, last = -1, n = 0;
    for (let i = 1; i < a.length; i++) if (a[i - 1] < 0 && a[i] >= 0) {
      const x = i - 1 + -a[i - 1] / (a[i] - a[i - 1]);
      if (first < 0) first = x; else n++;
      last = x;
    }
    return n > 0 ? (n * SR) / (last - first) : 0;
  };
  T.maxStep = (a) => { let m = 0; for (let i = 1; i < a.length; i++) m = Math.max(m, Math.abs(a[i] - a[i - 1])); return m; };

  T.approx = (actual, expected, tol, what) => {
    if (!(Math.abs(actual - expected) <= tol)) throw new Error(`${what}: expected ${expected} ± ${tol}, got ${+actual.toFixed(4)}`);
    return `${what} ${+actual.toFixed(3)}`;
  };
  T.ok = (cond, msg) => { if (!cond) throw new Error(msg); };

  T.run = async (filter) => {
    const results = [];
    for (const t of T.tests) {
      if (filter && !t.name.includes(filter)) continue;
      const t0 = performance.now();
      try {
        const note = await t.fn();
        results.push({ name: t.name, ok: true, note: note || '', ms: Math.round(performance.now() - t0) });
      } catch (e) {
        results.push({ name: t.name, ok: false, note: e.message, ms: Math.round(performance.now() - t0) });
      }
    }
    return results;
  };
})();
