// Stage 2: analysis on synthetic audio, beat-grid helpers, sync.
(function () {
  const { test } = T;
  // Click track: short noise bursts on every beat, accent on beat 1 of each bar.
  function clicks(ctx, bpm, secs, offset) {
    const beat = 60 / bpm;
    let seed = 7; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
    return T.buffer(ctx, secs, (t) => {
      const k = Math.floor((t - offset) / beat), dt = t - offset - k * beat;
      if (t < offset || dt > 0.03) return 0;
      return (k % 4 === 0 ? 0.9 : 0.5) * Math.exp(-dt * 120) * (Math.sin(2 * Math.PI * 60 * dt) + 0.3 * rnd());
    }, 1);
  }

  test('BPM + grid from a click track at 126.5 BPM', async () => {
    const ctx = new OfflineAudioContext(1, 1, T.SR);
    const b = clicks(ctx, 126.5, 45, 0.21);
    const L = b.getChannelData(0).slice();
    const { info } = await DJ.analysis.analyze(L, null, T.SR, { wave: true });
    T.approx(info.bpm, 126.5, 0.02, 'bpm');
    const beat = 60 / 126.5, off = ((info.firstBeat - 0.21) % beat + beat * 1.5) % beat - beat / 2;
    T.ok(Math.abs(off) < 0.01, 'grid off by ' + (off * 1000).toFixed(1) + ' ms');
    T.ok(info.wave && info.wave.length > 0 && info.wave.pps > 300, 'waveform data');
    return `bpm ${info.bpm}, grid ${(off * 1000).toFixed(1)} ms, ${info.wave.length} waveform points`;
  });

  test('silence and noise do not crash analysis', async () => {
    const r1 = await DJ.analysis.analyze(new Float32Array(T.SR * 3), null, T.SR, {});
    const r2 = await DJ.analysis.analyze(new Float32Array(T.SR * 3).map(() => Math.random() - 0.5), null, T.SR, {});
    const r3 = await DJ.analysis.analyze(new Float32Array(100), null, T.SR, {});
    return `silence bpm=${r1.info.bpm} key=${r1.info.key ? r1.info.key.camelot : null}; noise bpm=${r2.info.bpm}; 100 samples bpm=${r3.info.bpm}`;
  });

  test('key helpers: Camelot wheel and shifting', async () => {
    const k = DJ.keys;
    T.ok(k.make(9, true).camelot === '8A' && k.make(0, false).camelot === '8B', 'Am=8A, C=8B');
    T.ok(k.make(7, false).camelot === '9B' && k.make(5, true).camelot === '4A' && k.make(2, true).camelot === '7A', 'G=9B Fm=4A Dm=7A');
    T.ok(k.shift(k.make(9, true), 2).camelot === '10A', 'Am +2 = Bm = 10A');
    T.ok(k.shift(k.make(0, false), -1).short === 'B', 'C −1 = B');
    return 'OK';
  });

  test('sync matches tempo and lines up beats', async () => {
    const eng = await T.engine(4);
    const A = eng.decks.A, B = eng.decks.B;
    await T.load(A, clicks(eng.ctx, 120, 30, 0.1));
    await T.load(B, clicks(eng.ctx, 126, 30, 0.3));
    A.setGrid(120, 0.1, false); B.setGrid(126, 0.3, false);
    A.play(); B.seek(5.123); B.play();
    T.at(eng, 1.0, () => { B.sync(); });
    await T.render(eng);
    await T.pingAll(eng);
    T.approx(B.bpm, 120, 1e-6, 'B bpm');
    const phA = A.beatIndex(A.position()) % 1, phB = B.beatIndex(B.position()) % 1;
    let d = phA - phB; d -= Math.round(d);
    const ms = d * 500;
    T.ok(Math.abs(ms) < 3, `phase error ${ms.toFixed(2)} ms`);
    return `B pitch ${(B.pitch * 100).toFixed(3)}% → ${B.bpm.toFixed(3)} BPM, beat phase error ${ms.toFixed(2)} ms after 3 s`;
  });

  test('sync follows the leader when its pitch moves; moving the follower\'s fader drops sync', async () => {
    const eng = await T.engine(1);
    const A = eng.decks.A, B = eng.decks.B;
    await T.load(A, clicks(eng.ctx, 124, 10, 0)); await T.load(B, clicks(eng.ctx, 128, 10, 0));
    A.setGrid(124, 0, false); B.setGrid(128, 0, false);
    B.sync(); A.setPitch(0.04);
    const follow = B.bpm;
    B.setPitch(0.01);
    T.approx(follow, 124 * 1.04, 1e-6, 'B follows');
    T.ok(!B.syncOn, 'sync should drop');
    return `A +4% → B ${follow.toFixed(2)} BPM; sync off after touching B's fader`;
  });

  test('sync across a double-time pair (87 vs 174) uses the half/double match', async () => {
    const eng = await T.engine(1);
    const A = eng.decks.A, B = eng.decks.B;
    await T.load(A, clicks(eng.ctx, 87, 10, 0)); await T.load(B, clicks(eng.ctx, 172, 10, 0));
    A.setGrid(87, 0, false); B.setGrid(172, 0, false);
    const ok = B.sync();
    T.ok(ok, 'sync refused');
    return `B → ${B.bpm.toFixed(2)} BPM (pitch ${(B.pitch * 100).toFixed(2)}%)`;
  });

  test('sync refuses tempos out of reach', async () => {
    const eng = await T.engine(1);
    const A = eng.decks.A, B = eng.decks.B;
    await T.load(A, clicks(eng.ctx, 100, 10, 0)); await T.load(B, clicks(eng.ctx, 140, 10, 0));
    A.setGrid(100, 0, false); B.setGrid(140, 0, false);
    T.ok(!B.sync() && !B.syncOn && B.pitch === 0, 'should refuse');
    return '100 vs 140 refused, pitch untouched';
  });

  test('beat roll repeats a tempo-synced slice', async () => {
    const eng = await T.engine(2);
    const A = eng.decks.A; A.setFader(1); eng.setCrossfader(0);
    // rising sweep: repeats show up as the frequency jumping back down
    await T.load(A, T.buffer(eng.ctx, 5, (t) => 0.4 * Math.sin(2 * Math.PI * (200 * t + 100 * t * t))));
    A.setGrid(120, 0, false);
    const roll = A.fx.byName.roll;
    roll.setBeats(0.5); // 0.25 s
    A.play();
    T.at(eng, 0.5, () => roll.setOn(true));
    const out = await T.render(eng);
    const f1 = T.freq(T.slice(out, 1.02, 1.2)), f2 = T.freq(T.slice(out, 1.52, 1.7));
    T.ok(Math.abs(f1 - f2) < 15, `slices differ: ${f1.toFixed(0)} vs ${f2.toFixed(0)} Hz`);
    return `same audio every 0.25 s: ${f1.toFixed(0)} Hz / ${f2.toFixed(0)} Hz`;
  });

  test('echo adds a delayed repeat at the beat time', async () => {
    const eng = await T.engine(2);
    const A = eng.decks.A; A.setFader(1); eng.setCrossfader(0);
    await T.load(A, T.buffer(eng.ctx, 5, (t) => (t > 0.1 && t < 0.13 ? 0.6 * Math.sin(2 * Math.PI * 1000 * t) : 0)));
    A.setGrid(120, 0, false);
    const echo = A.fx.byName.echo; echo.setBeats(1); echo.setMix(1); echo.setOn(true);
    A.seek(0); A.play();
    const out = await T.render(eng);
    const e1 = T.rms(T.slice(out, 0.6, 0.63));
    T.ok(e1 > 0.02, 'no echo at +0.5 s: ' + e1);
    return `repeat at +0.5 s, level ${T.db(e1 / T.rms(T.slice(out, 0.1, 0.13))).toFixed(1)} dB`;
  });
})();
