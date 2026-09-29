// Stage 2+ UI checks, run after the Stage 1 checks in tests/ui.mjs.
export default async function ({ page, check, until, deckState, fx, shots }) {
  const truth = { A: { bpm: 124, key: '8A' }, B: { bpm: 128, key: '8B' } };
  await check('decks show detected BPM and key', async () => {
    const r = {};
    for (const id of ['A', 'B']) {
      const s = await deckState(id);
      const bpmTxt = await page.textContent(`.deck[data-deck="${id}"] .bpm-val`);
      const keyTxt = await page.textContent(`.deck[data-deck="${id}"] .key-badge`);
      if (Math.abs(s.bpm - truth[id].bpm) > 0.01 || s.key !== truth[id].key) throw new Error(`${id}: ${s.bpm} ${s.key}`);
      r[id] = `${bpmTxt} BPM, ${keyTxt}`;
    }
    return `A ${r.A}; B ${r.B}`;
  });

  await check('waveform lanes and overviews draw pixels', async () => {
    const lit = await page.evaluate(() => {
      const count = (c) => { const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4 * 7) if (d[i] > 0) n++; return n; };
      return ['A', 'B'].map((id) => [count(DJ.ui.views[id].laneCanvas), count(DJ.ui.views[id].overview), count(DJ.ui.views[id].jogCanvas)]);
    });
    if (lit.flat().some((n) => n < 50)) throw new Error(JSON.stringify(lit));
    return 'lane/overview/jog pixel counts ' + JSON.stringify(lit);
  });

  await check('SYNC on deck B locks it to deck A', async () => {
    await page.click('[data-ctl="A.play"]');
    await page.click('[data-ctl="B.play"]');
    await page.click('[data-ctl="B.sync"]');
    await page.waitForTimeout(1500);
    const r = await page.evaluate(() => {
      const A = DJ.engine.decks.A, B = DJ.engine.decks.B;
      let d = (A.beatIndex(A.position()) % 1) - (B.beatIndex(B.position()) % 1); d -= Math.round(d);
      return { a: A.bpm, b: B.bpm, sync: B.syncOn, ms: d * 60000 / A.bpm, lit: document.querySelector('[data-ctl="B.sync"]').classList.contains('on') };
    });
    if (!r.sync || !r.lit || Math.abs(r.b - r.a) > 1e-6 || Math.abs(r.ms) > 5) throw new Error(JSON.stringify(r));
    return `B ${r.b.toFixed(2)} = A ${r.a.toFixed(2)} BPM, beat offset ${r.ms.toFixed(1)} ms`;
  });

  await check('dragging the waveform scratches, release resumes play', async () => {
    const box = await page.locator('.lane[data-deck="A"] canvas').boundingBox();
    const before = (await deckState('A')).pos;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 200, box.y + box.height / 2, { steps: 8 });
    await page.waitForTimeout(250);
    const during = await page.evaluate(() => DJ.engine.decks.A.scratching);
    await page.mouse.up();
    await page.waitForTimeout(300);
    const after = await deckState('A');
    if (!during || !after.playing) throw new Error(JSON.stringify({ during, after }));
    return `scratched back from ${before.toFixed(2)} s, playing again at ${after.pos.toFixed(2)} s`;
  });

  await check('tap tempo sets a BPM from taps', async () => {
    await page.click('[data-ctl="A.mode.grid"]');
    const bpm = await page.evaluate(() => new Promise((res) => {
      let n = 0; const iv = setInterval(() => { DJ.controls.press('A.grid.tap'); DJ.controls.release('A.grid.tap'); if (++n === 6) { clearInterval(iv); res(DJ.engine.decks.A.track.bpm); } }, 500);
    }));
    const rate = await page.evaluate(() => DJ.engine.decks.A.rate);
    await page.click('[data-ctl="A.grid.reset"]');
    const back = (await deckState('A')).bpm;
    await page.click('[data-ctl="A.mode.cues"]');
    if (Math.abs(bpm * rate - 120) > 1 || back !== 124) throw new Error(`tapped ${bpm} at rate ${rate}, reset ${back}`);
    return `taps every 500 ms → ${(bpm * rate).toFixed(2)} BPM heard; reset → ${back}`;
  });

  await page.screenshot({ path: shots + '/stage2.png' });
}
