// Stage 1: two-deck engine, EQ, filter, crossfader, limiter, transport.
(function () {
  const { test } = T;

  // Deck A alone at unity gain: fader up, crossfader hard left.
  async function unityA(secs) {
    const eng = await T.engine(secs);
    eng.decks.A.setFader(1); eng.setCrossfader(0);
    return eng;
  }

  test('plays at normal speed and pitch', async () => {
    const eng = await unityA(1.5);
    const d = eng.decks.A;
    await T.load(d, T.tone(eng.ctx, 1000, 4));
    d.play();
    const out = await T.render(eng);
    const s = T.slice(out, 0.5, 1.4);
    const notes = [T.approx(T.freq(s), 1000, 1, 'freq Hz'), T.approx(T.rms(s), 0.5 / Math.SQRT2, 0.03, 'rms')];
    notes.push(T.approx(d.rep.pos, 1.5, 0.05, 'position s'));
    return notes.join(', ');
  });

  test('pitch +8% without key lock raises pitch and speed', async () => {
    const eng = await unityA(1.5);
    const d = eng.decks.A;
    await T.load(d, T.tone(eng.ctx, 1000, 4));
    d.setPitch(0.08); d.play();
    const out = await T.render(eng);
    return [T.approx(T.freq(T.slice(out, 0.5, 1.4)), 1080, 2, 'freq Hz'), T.approx(d.rep.pos, 1.5 * 1.08, 0.05, 'position s')].join(', ');
  });

  test('key lock +8% keeps pitch, still plays faster', async () => {
    const eng = await unityA(1.5);
    const d = eng.decks.A;
    await T.load(d, T.tone(eng.ctx, 440, 4));
    d.setKeylock(true); d.setPitch(0.08); d.play();
    const out = await T.render(eng);
    const s = T.slice(out, 0.5, 1.4);
    return [T.approx(T.freq(s), 440, 3, 'freq Hz'), T.approx(d.rep.pos, 1.5 * 1.08, 0.06, 'position s'), T.approx(T.rms(s), 0.5 / Math.SQRT2, 0.06, 'rms')].join(', ');
  });

  test('key lock -16% keeps pitch on a chord', async () => {
    const eng = await unityA(1.5);
    const d = eng.decks.A;
    const f = [220, 277.18, 329.63];
    await T.load(d, T.buffer(eng.ctx, 4, (t) => f.reduce((s, x) => s + 0.2 * Math.sin(2 * Math.PI * x * t), 0)));
    d.setRange(0.16); d.setKeylock(true); d.setPitch(-0.16); d.play();
    const out = await T.render(eng);
    // Compare energy at 220 Hz vs 185 Hz (where it would land without key lock).
    const s = T.slice(out, 0.4, 1.4);
    const goertzel = (a, fr) => { const w = 2 * Math.PI * fr / T.SR, c = 2 * Math.cos(w); let s1 = 0, s2 = 0; for (let i = 0; i < a.length; i++) { const s0 = a[i] + c * s1 - s2; s2 = s1; s1 = s0; } return Math.sqrt(s1 * s1 + s2 * s2 - c * s1 * s2) / a.length; };
    const at220 = goertzel(s, 220), at185 = goertzel(s, 220 * 0.84);
    T.ok(at220 > at185 * 10, `energy at 220 Hz (${at220.toFixed(4)}) should dwarf 185 Hz (${at185.toFixed(4)})`);
    return T.approx(d.rep.pos, 1.5 * 0.84, 0.06, 'position s') + `, 220Hz/185Hz ratio ${(at220 / at185).toFixed(0)}x`;
  });

  test('EQ at 12 o\'clock is flat (±1 dB) from 40 Hz to 12 kHz', async () => {
    const notes = [];
    for (const f of [40, 120, 250, 1000, 3000, 6000, 12000]) {
      const eng = await unityA(1);
      await T.load(eng.decks.A, T.tone(eng.ctx, f, 3));
      eng.decks.A.play();
      const out = await T.render(eng);
      const g = T.db(T.rms(T.slice(out, 0.4, 0.95)) / (0.5 / Math.SQRT2));
      T.ok(Math.abs(g) < 1, `${f} Hz is ${g.toFixed(2)} dB`);
      notes.push(`${f}:${g.toFixed(1)}`);
    }
    return 'dB ' + notes.join(' ');
  });

  test('EQ kills remove each band (> 40 dB down)', async () => {
    const notes = [];
    for (const [band, f] of [['low', 60], ['mid', 866], ['high', 9000]]) {
      const eng = await unityA(1);
      await T.load(eng.decks.A, T.tone(eng.ctx, f, 3));
      eng.decks.A.setKill(band, true); eng.decks.A.play();
      const out = await T.render(eng);
      const g = T.db(T.rms(T.slice(out, 0.4, 0.95)) / (0.5 / Math.SQRT2));
      T.ok(g < -40, `${band} kill at ${f} Hz only ${g.toFixed(1)} dB`);
      notes.push(`${band}@${f}Hz ${g.toFixed(0)}dB`);
    }
    // The knob at its minimum is also a full kill.
    const eng = await unityA(1);
    await T.load(eng.decks.A, T.tone(eng.ctx, 60, 3));
    eng.decks.A.setEq('low', 0); eng.decks.A.play();
    const g = T.db(T.rms(T.slice(await T.render(eng), 0.4, 0.95)) / (0.5 / Math.SQRT2));
    T.ok(g < -40, `low knob at 0 only ${g.toFixed(1)} dB`);
    return notes.join(', ') + `, knob@0 ${g.toFixed(0)}dB`;
  });

  test('filter knob: low-pass closes on 5 kHz, high-pass closes on 80 Hz', async () => {
    const notes = [];
    for (const [v, f] of [[-1, 5000], [1, 80]]) {
      const eng = await unityA(1);
      await T.load(eng.decks.A, T.tone(eng.ctx, f, 3));
      eng.decks.A.setFilter(v); eng.decks.A.play();
      const g = T.db(T.rms(T.slice(await T.render(eng), 0.4, 0.95)) / (0.5 / Math.SQRT2));
      T.ok(g < -30, `filter ${v} at ${f} Hz only ${g.toFixed(1)} dB`);
      notes.push(`${v < 0 ? 'LP' : 'HP'} ${g.toFixed(0)}dB`);
    }
    return notes.join(', ');
  });

  test('crossfader curves have the right shape', async () => {
    const C = DJ.XF_CURVES;
    T.ok(C.power(0) === 1 && Math.abs(C.power(0.5) - Math.SQRT1_2) < 1e-9 && C.power(1) < 1e-9, 'constant power');
    T.ok(Math.abs(C.smooth(0.5) - 0.5) < 1e-9 && C.smooth(1) === 0, 'smooth');
    T.ok(C.sharp(0.5) === 1 && C.sharp(0.9) === 1 && C.sharp(1) === 0, 'sharp');
    // Constant power: summed power is constant across the travel.
    for (let x = 0; x <= 1; x += 0.1) T.ok(Math.abs(C.power(x) ** 2 + C.power(1 - x) ** 2 - 1) < 1e-9, 'power sum at ' + x);
    return 'smooth / power / sharp OK';
  });

  test('crossfader hard right silences deck A', async () => {
    const eng = await T.engine(1);
    eng.decks.A.setFader(1); eng.setCrossfader(1);
    await T.load(eng.decks.A, T.tone(eng.ctx, 1000, 3));
    eng.decks.A.play();
    const g = T.db(T.rms(T.slice(await T.render(eng), 0.3, 0.95)));
    T.ok(g < -90, `deck A leaks at ${g.toFixed(1)} dBFS`);
    return `A at ${g === -240 ? '-inf' : g.toFixed(0)} dBFS`;
  });

  test('limiter: two hot decks never exceed -0.3 dBFS', async () => {
    const eng = await T.engine(1.5);
    for (const d of Object.values(eng.decks)) {
      await T.load(d, T.buffer(eng.ctx, 3, (t) => (Math.sin(2 * Math.PI * 55 * t) > 0 ? 0.99 : -0.99)));
      d.setTrim(1); d.setEq('low', 1); d.setEq('mid', 1); d.setEq('high', 1); d.setFader(1); d.play();
    }
    eng.setMaster(1); eng.setCurve('sharp'); eng.setCrossfader(0.5);
    const out = await T.render(eng);
    const pk = Math.max(T.peak(out.getChannelData(0)), T.peak(out.getChannelData(1)));
    T.ok(pk <= 0.9661, `peak ${pk}`);
    return `input ~+18 dB over, output peak ${T.db(pk).toFixed(2)} dBFS, gain reduction ${T.db(eng.gr).toFixed(1)} dB`;
  });

  test('seeking and pausing are click-free', async () => {
    const eng = await unityA(2);
    const d = eng.decks.A;
    await T.load(d, T.tone(eng.ctx, 200, 5));
    d.play();
    T.at(eng, 0.5, () => d.seek(2.333));
    T.at(eng, 1.0, () => d.pause());
    T.at(eng, 1.3, () => d.play());
    const out = await T.render(eng);
    const s = T.slice(out, 0.05, 1.95);
    const natural = 2 * Math.PI * 200 / T.SR * 0.5; // largest step of the clean sine
    const step = T.maxStep(s);
    T.ok(step < natural * 1.6, `largest sample step ${step.toFixed(4)} vs sine's own ${natural.toFixed(4)}`);
    return `max step ${step.toFixed(4)} (clean sine ${natural.toFixed(4)})`;
  });

  test('beat loop keeps the playhead inside the loop', async () => {
    const eng = await unityA(3);
    const d = eng.decks.A;
    await T.load(d, T.tone(eng.ctx, 300, 10));
    d.setGrid(120, 0, false);
    d.quantize = false;
    d.play();
    T.at(eng, 0.25, () => d.autoLoop(1)); // loop 0.25 .. 0.75
    const out = await T.render(eng);
    T.ok(d.loop.on && Math.abs(d.loop.out - d.loop.in - 0.5) < 1e-6, 'loop length');
    T.ok(d.rep.pos >= d.loop.in - 0.01 && d.rep.pos < d.loop.out + 0.01, `pos ${d.rep.pos} outside ${d.loop.in}-${d.loop.out}`);
    T.ok(T.rms(T.slice(out, 2.5, 2.9)) > 0.2, 'still playing');
    return `loop ${d.loop.in.toFixed(2)}–${d.loop.out.toFixed(2)} s, pos after 3 s = ${d.rep.pos.toFixed(3)}`;
  });

  test('scratch follows the target and stops there', async () => {
    const eng = await unityA(1.5);
    const d = eng.decks.A;
    await T.load(d, T.tone(eng.ctx, 500, 10));
    d.seek(2);
    T.at(eng, 0.1, () => { d.scratchStart(); d.scratchTo(2.5); });
    const out = await T.render(eng);
    T.ok(T.rms(T.slice(out, 0.12, 0.4)) > 0.01, 'scratch made sound');
    return T.approx(d.rep.pos, 2.5, 0.02, 'position s');
  });

  test('loading deck B does not disturb deck A', async () => {
    const eng = await T.engine(2);
    const A = eng.decks.A, B = eng.decks.B;
    A.setFader(1); B.setFader(1); eng.setCrossfader(0);
    await T.load(A, T.tone(eng.ctx, 200, 5));
    A.play();
    T.at(eng, 0.7, () => T.load(B, T.tone(eng.ctx, 90, 120)));
    const out = await T.render(eng);
    const s = T.slice(out, 0.05, 1.95);
    const natural = 2 * Math.PI * 200 / T.SR * 0.5;
    T.ok(T.maxStep(s) < natural * 1.2, 'A glitched: step ' + T.maxStep(s));
    return T.approx(T.freq(s), 200, 0.5, 'A freq Hz') + ', no discontinuity';
  });
})();
