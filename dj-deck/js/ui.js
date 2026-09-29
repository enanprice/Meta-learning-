// Builds the deck panels, mixer and waveform lanes, wires them to the engine,
// and runs the 60 fps frame loop (waveforms, meters, clocks).
(function () {
  const DJ = window.DJ;
  const { el } = DJ;
  DJ.HOTCUE_COLORS = ['#ef4b43', '#f5923a', '#f2cd3c', '#53cf6d', '#35c3d6', '#4a7ff2', '#9a63f2', '#e75fb6'];

  const ICON = {
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" fill="currentColor"/></svg>',
  };
  const dbText = (g) => (g <= 0.0005 ? 'Kill' : (20 * Math.log10(g) >= 0 ? '+' : '') + (20 * Math.log10(g)).toFixed(1) + ' dB');
  const levelToUnit = (pk) => { const db = 20 * Math.log10(pk + 1e-9); return DJ.clamp((db + 48) / 48, 0, 1); };

  function meter(cls) {
    const fill = el('div', { class: 'meter-fill' }), hold = el('div', { class: 'meter-hold' });
    const m = el('div', { class: 'meter ' + (cls || ''), 'aria-hidden': 'true' }, fill, hold);
    let peak = 0, peakT = 0, smooth = 0;
    m.update = (pk) => {
      const v = levelToUnit(pk);
      smooth = v > smooth ? v : smooth * 0.9 + v * 0.1;
      const now = performance.now();
      if (v >= peak || now - peakT > 1200) { peak = v; peakT = now; }
      m.style.setProperty('--v', smooth.toFixed(3));
      m.style.setProperty('--h', peak.toFixed(3));
      m.classList.toggle('clip', pk >= 0.99);
    };
    return m;
  }

  // ------------------------------------------------------------ deck panel
  class DeckView {
    constructor(deck, engine) {
      this.deck = deck; this.engine = engine; this.id = deck.id;
      const d = deck, P = d.id + '.';
      this.delMode = false;

      this.titleEl = el('div', { class: 'trk-title' }, 'No track loaded');
      this.artistEl = el('div', { class: 'trk-artist' }, 'Drop a file here, press Load, or double-click a track in the library');
      this.keyEl = el('span', { class: 'key-badge', title: 'Key (Camelot / musical)' }, '—');
      this.bpmEl = el('span', { class: 'bpm-val' }, '—');
      this.pitchEl = el('span', { class: 'bpm-pitch' }, '+0.00%');
      this.remainEl = el('span', { class: 't-remain' }, '-0:00.0');
      this.elapsedEl = el('span', { class: 't-elapsed' }, '0:00.0');
      this.status = el('div', { class: 'deck-status', hidden: true });
      this.fileInput = el('input', { type: 'file', accept: 'audio/*,.mp3,.wav,.flac,.m4a,.aac,.ogg,.opus,.aif,.aiff', hidden: true, id: 'file' + d.id });
      this.fileInput.addEventListener('change', () => { const f = this.fileInput.files[0]; this.fileInput.value = ''; if (f) d.load(f); });
      const loadBtn = DJ.button({ id: P + 'load', label: 'Load', cls: 'small ghost', title: 'Choose a file for deck ' + d.id, onPress: () => this.fileInput.click() });

      this.overview = el('canvas', { class: 'overview', 'aria-label': `Deck ${d.id} track overview. Click to jump.` });

      this.cueBtn = DJ.button({ id: P + 'cue', label: 'CUE', cls: 'cue big', title: 'Cue: set while stopped, hold to preview, press while playing to return', onPress: () => d.cueDown(), onRelease: () => d.cueUp() });
      this.playBtn = DJ.button({ id: P + 'play', html: ICON.play, cls: 'play big', aria: `Play / pause deck ${d.id}`, onPress: () => d.togglePlay() });
      this.syncBtn = DJ.button({ id: P + 'sync', label: 'SYNC', toggle: true, cls: 'sync', title: 'Match tempo and beat phase to the other deck', onPress: () => d.toggleSync() });
      this.keyBtn = DJ.button({ id: P + 'keylock', label: 'KEY', toggle: true, title: 'Key lock: change tempo without changing pitch', onPress: () => d.setKeylock(!d.keylock) });
      this.qBtn = DJ.button({ id: P + 'quantize', label: 'Q', toggle: true, title: 'Quantize: snap cues and loops to the beat grid', onPress: () => { d.quantize = !d.quantize; this.qBtn.lit(d.quantize); } });
      this.rangeBtn = DJ.button({ id: P + 'range', label: '±8', cls: 'range', title: 'Pitch range ±8% / ±16%', onPress: () => d.setRange(d.range > 0.1 ? 0.08 : 0.16) });
      const bend = (dir) => DJ.button({ id: P + (dir < 0 ? 'bend-' : 'bend+'), label: dir < 0 ? '−' : '+', cls: 'bend', title: dir < 0 ? 'Hold to slow down (nudge)' : 'Hold to speed up (nudge)', onPress: (e) => d.setBend(dir * (e.shiftKey ? 0.01 : 0.04)), onRelease: () => d.setBend(0) });
      this.pitch = DJ.fader({
        id: P + 'pitch', label: 'Pitch', aria: `Deck ${d.id} pitch`, orient: 'v', invert: true, value: 0.5, def: 0.5, snap: 0.006, cls: 'pitch',
        fmt: (v) => (((v - 0.5) * 2 * d.range) * 100).toFixed(2) + '%',
        marks: () => el('div', { class: 'fader-mid' }),
        onChange: (v) => d.setPitch((v - 0.5) * 2 * d.range),
      });

      // --- pads
      this.modes = {};
      const tabs = el('div', { class: 'pad-tabs', role: 'tablist', 'aria-label': `Deck ${d.id} pad mode` });
      const body = el('div', { class: 'pad-body' });
      const addMode = (key, label, panel) => {
        const t = DJ.button({ id: P + 'mode.' + key, label, cls: 'tab', onPress: () => this.setMode(key) });
        t.el.setAttribute('role', 'tab');
        tabs.appendChild(t.el); body.appendChild(panel);
        this.modes[key] = { tab: t, panel };
      };
      // Hot cues
      this.hcPads = [];
      const hc = el('div', { class: 'pads eight' });
      for (let i = 0; i < 8; i++) {
        const b = DJ.button({
          id: `${P}hotcue.${i + 1}`, cls: 'pad hc', aria: `Deck ${d.id} hot cue ${i + 1}`, title: 'Hot cue ' + (i + 1) + ': press to set, press again to jump. Shift-click or right-click deletes.',
          html: `<span class="pad-n">${i + 1}</span><span class="pad-t"></span>`,
          onPress: (e) => { if (e.shiftKey || this.delMode) d.deleteHotcue(i); else d.hotcue(i); },
          onContext: () => d.deleteHotcue(i),
        });
        b.el.style.setProperty('--hc', DJ.HOTCUE_COLORS[i]);
        this.hcPads.push(b); hc.appendChild(b.el);
      }
      this.delBtn = DJ.button({ label: 'Delete mode', cls: 'small ghost del', toggle: true, title: 'While on, tapping a pad deletes it', onPress: () => { this.delMode = !this.delMode; this.delBtn.lit(this.delMode); hc.classList.toggle('deleting', this.delMode); } });
      addMode('cues', 'Hot cues', el('div', { class: 'pad-panel' }, hc, el('div', { class: 'pad-foot' }, this.delBtn.el, el('span', { class: 'hint' }, 'Shift-click or right-click a pad to delete'))));
      // Loops
      this.loopPads = {};
      const lp = el('div', { class: 'pads ten' });
      for (const b of [1, 2, 4, 8, 16]) {
        const c = DJ.button({ id: `${P}loop.${b}`, label: String(b), cls: 'pad loop', aria: `Deck ${d.id} ${b}-beat loop`, title: `${b}-beat loop`, onPress: () => d.autoLoop(b) });
        this.loopPads[b] = c; lp.appendChild(c.el);
      }
      const lb = (key, label, title, fn) => { const c = DJ.button({ id: P + 'loop.' + key, label, cls: 'pad loop alt', title, onPress: fn }); lp.appendChild(c.el); return c; };
      this.loopInBtn = lb('in', 'IN', 'Loop in', () => d.loopIn());
      this.loopOutBtn = lb('out', 'OUT', 'Loop out', () => d.loopOut());
      lb('halve', '½', 'Halve loop', () => d.resizeLoop(0.5));
      lb('double', '×2', 'Double loop', () => d.resizeLoop(2));
      this.reloopBtn = lb('reloop', 'EXIT', 'Exit / reloop', () => d.reloop());
      this.loopInfo = el('span', { class: 'hint' }, 'No loop');
      addMode('loops', 'Loops', el('div', { class: 'pad-panel' }, lp, el('div', { class: 'pad-foot' }, this.loopInfo)));
      // FX
      this.fxRows = [];
      const fxp = el('div', { class: 'fx-rows' });
      for (const u of d.fx.units) {
        const key = u.name.toLowerCase();
        const idx = () => DJ.FX_BEATS.indexOf(u.beats);
        const beatsEl = el('span', { class: 'fx-beats' }, DJ.fmtBeats(u.beats));
        const setBeats = (dir) => { const i = DJ.clamp(idx() + dir, 0, DJ.FX_BEATS.length - 1); u.setBeats(DJ.FX_BEATS[i]); beatsEl.textContent = DJ.fmtBeats(u.beats); };
        let t0 = 0;
        const onBtn = DJ.button({
          id: `${P}fx.${key}.on`, label: u.name, cls: 'fx-on', toggle: true, title: `${u.name}: tap to latch, hold for momentary`,
          onPress: () => { t0 = performance.now(); u.setOn(!u.on); onBtn.lit(u.on); },
          onRelease: () => { if (u.on && performance.now() - t0 > 300) { u.setOn(false); onBtn.lit(false); } },
        });
        const minus = DJ.button({ id: `${P}fx.${key}.beats-`, label: '‹', cls: 'fx-step', aria: `${u.name} time shorter`, onPress: () => setBeats(-1) });
        const plus = DJ.button({ id: `${P}fx.${key}.beats+`, label: '›', cls: 'fx-step', aria: `${u.name} time longer`, onPress: () => setBeats(1) });
        const mix = DJ.knob({ id: `${P}fx.${key}.mix`, label: 'Wet', aria: `${u.name} wet/dry`, value: u.mix, def: u.mix, cls: 'small', fmt: (v) => Math.round(v * 100) + '%', onChange: (v) => u.setMix(v) });
        fxp.appendChild(el('div', { class: 'fx-row' }, onBtn.el, el('div', { class: 'fx-time' }, minus.el, beatsEl, plus.el, el('span', { class: 'fx-unit' }, 'beats')), mix.el));
        this.fxRows.push({ u, onBtn });
      }
      addMode('fx', 'FX', el('div', { class: 'pad-panel' }, fxp));
      // Beat grid
      const gp = el('div', { class: 'pads ten' });
      const gb = (key, label, title, fn) => { const c = DJ.button({ id: P + 'grid.' + key, label, cls: 'pad grid', title, onPress: fn }); gp.appendChild(c.el); return c; };
      gb('tap', 'TAP', 'Tap tempo (4+ taps). Sets the BPM and re-anchors the grid.', () => { const b = d.tap(); if (!b) this.gridInfo.textContent = 'Keep tapping…'; });
      gb('half', '÷2', 'Halve BPM', () => d.scaleBpm(0.5));
      gb('double', '×2', 'Double BPM', () => d.scaleBpm(2));
      gb('bpm-', 'BPM −', 'BPM −0.01 (shift: −0.1)', (e) => d.track && d.track.bpm && d.setGrid(+(d.track.bpm - (e.shiftKey ? 0.1 : 0.01)).toFixed(3), d.track.firstBeat));
      gb('bpm+', 'BPM +', 'BPM +0.01 (shift: +0.1)', (e) => d.track && d.track.bpm && d.setGrid(+(d.track.bpm + (e.shiftKey ? 0.1 : 0.01)).toFixed(3), d.track.firstBeat));
      gb('earlier', '◂ Grid', 'Move grid 5 ms earlier (shift: 1 ms)', (e) => d.nudgeGrid(e.shiftKey ? -0.001 : -0.005));
      gb('later', 'Grid ▸', 'Move grid 5 ms later (shift: 1 ms)', (e) => d.nudgeGrid(e.shiftKey ? 0.001 : 0.005));
      gb('downbeat', 'Bar here', 'Make the beat under the playhead beat 1 of a bar', () => d.downbeatHere());
      gb('reset', 'Reset', 'Back to the detected grid', () => d.resetGrid());
      this.gridInfo = el('span', { class: 'hint' }, '');
      addMode('grid', 'Grid', el('div', { class: 'pad-panel' }, gp, el('div', { class: 'pad-foot' }, this.gridInfo)));
      this.setMode(DJ.store.get('padmode.' + d.id, 'cues'));

      const head = el('header', { class: 'deck-head' },
        el('div', { class: 'deck-badge' }, d.id),
        el('div', { class: 'trk' }, this.titleEl, this.artistEl),
        el('div', { class: 'deck-readouts' },
          el('div', { class: 'ro' }, this.keyEl),
          el('div', { class: 'ro bpm' }, this.bpmEl, this.pitchEl),
          el('div', { class: 'ro time' }, this.remainEl, this.elapsedEl)),
        loadBtn.el, this.fileInput);

      this.jogCanvas = el('canvas', { class: 'jog', 'aria-label': `Deck ${d.id} jog wheel. Drag around it to scratch.` });
      // MIDI jog wheels land here (relative ticks).
      DJ.controls.add({ id: P + 'jog', label: `Deck ${d.id} jog wheel`, kind: 'jog', el: this.jogCanvas, jog: (ticks) => d.jog(ticks) });
      const transport = el('div', { class: 'transport' }, this.cueBtn.el, this.playBtn.el);
      const tools = el('div', { class: 'deck-tools' },
        el('div', { class: 'row' }, this.syncBtn.el, this.keyBtn.el, this.qBtn.el),
        el('div', { class: 'row' }, el('span', { class: 'lab' }, 'Nudge'), bend(-1).el, bend(1).el, this.rangeBtn.el));
      const pitchCol = el('div', { class: 'pitch-col' }, el('span', { class: 'lab' }, '−'), this.pitch.el, el('span', { class: 'lab' }, '+'));

      this.root = el('section', { class: 'deck', 'data-deck': d.id, 'aria-label': 'Deck ' + d.id },
        head, this.status, this.overview,
        el('div', { class: 'deck-main' }, transport, el('div', { class: 'jog-wrap' }, this.jogCanvas), tools, pitchCol),
        el('div', { class: 'pads-wrap' }, tabs, body));

      if (DJ.JogView) this.jog = new DJ.JogView(d, this.jogCanvas);
      this.wireDrop(this.root);
      this.wireOverview();
      this.wireEvents();
      this.qBtn.lit(d.quantize);
      this.refreshAll();
    }

    setMode(key) {
      if (!this.modes[key]) key = 'cues';
      for (const k in this.modes) {
        const on = k === key;
        this.modes[k].panel.hidden = !on;
        this.modes[k].tab.lit(on);
        this.modes[k].tab.el.setAttribute('aria-selected', String(on));
      }
      this.mode = key;
      DJ.store.set('padmode.' + this.id, key);
    }

    flash(msg) { DJ.toast(`Deck ${this.id}: ${msg}`); }

    wireDrop(target) {
      const d = this.deck;
      target.addEventListener('dragover', (e) => { e.preventDefault(); target.classList.add('drop'); });
      target.addEventListener('dragleave', (e) => { if (!target.contains(e.relatedTarget)) target.classList.remove('drop'); });
      target.addEventListener('drop', (e) => {
        e.preventDefault(); target.classList.remove('drop');
        const libId = e.dataTransfer.getData('text/x-dj-track');
        if (libId && DJ.library) { DJ.library.loadToDeck(libId, d.id); return; }
        const f = [...e.dataTransfer.files].find((x) => DJ.AUDIO_EXT.test(x.name) || /^audio\//.test(x.type));
        if (f) d.load(f); else if (e.dataTransfer.files.length) this.flash('That isn’t an audio file this app can read.');
      });
    }

    wireOverview() {
      const c = this.overview, d = this.deck;
      const seek = (e) => { if (!d.track) return; const r = c.getBoundingClientRect(); d.seek(DJ.clamp((e.clientX - r.left) / r.width, 0, 1) * d.track.duration); };
      c.addEventListener('pointerdown', (e) => { c.setPointerCapture(e.pointerId); seek(e); });
      c.addEventListener('pointermove', (e) => { if (c.hasPointerCapture(e.pointerId)) seek(e); });
    }

    wireEvents() {
      const d = this.deck;
      d.on('state', () => this.refreshTransport());
      d.on('load', () => this.refreshAll());
      d.on('loading', (info) => {
        this.status.hidden = !info;
        if (info) this.status.textContent = `${info.stage} ${info.name}…`;
        this.root.classList.toggle('busy', !!info);
      });
      d.on('error', (msg) => { DJ.toast(msg, { kind: 'error', ms: 9000 }); });
      d.on('rate', () => this.refreshTempo());
      d.on('range', () => this.refreshTempo());
      d.on('sync', () => this.syncBtn.lit(d.syncOn));
      d.on('keylock', () => { this.keyBtn.lit(d.keylock); this.refreshKey(); });
      d.on('cues', () => this.refreshCues());
      d.on('loop', () => this.refreshLoop());
      d.on('grid', () => { this.refreshTempo(); this.refreshGridInfo(); });
    }

    refreshAll() {
      const d = this.deck, t = d.track;
      this.titleEl.textContent = t ? t.title : 'No track loaded';
      this.artistEl.textContent = t ? (t.artist || DJ.fmtTime(t.duration) + ' · ' + t.name) : 'Drop a file here, press Load, or double-click a track in the library';
      this.root.classList.toggle('empty', !t);
      this.refreshTransport(); this.refreshTempo(); this.refreshKey(); this.refreshCues(); this.refreshLoop(); this.refreshGridInfo();
      this.syncBtn.lit(d.syncOn); this.keyBtn.lit(d.keylock);
      if (this.wave) this.wave.trackChanged();
      if (this.over) this.over.trackChanged();
    }
    refreshTransport() {
      const d = this.deck;
      this.playBtn.lit(d.playing);
      this.playBtn.el.innerHTML = d.playing ? ICON.pause : ICON.play;
      this.cueBtn.lit(!d.playing && d.track && Math.abs(d.position() - d.cuePoint) < 0.02);
    }
    refreshTempo() {
      const d = this.deck;
      this.bpmEl.textContent = d.bpm ? d.bpm.toFixed(1) : '—';
      const p = d.pitch * 100;
      this.pitchEl.textContent = (p >= 0 ? '+' : '−') + Math.abs(p).toFixed(2) + '%';
      this.rangeBtn.el.textContent = d.range > 0.1 ? '±16' : '±8';
      this.pitch.show(d.pitch / (2 * d.range) + 0.5);
      this.refreshKey();
    }
    refreshKey() {
      const d = this.deck, t = d.track;
      if (!t || !t.key || !DJ.keys) { this.keyEl.textContent = '—'; this.keyEl.className = 'key-badge'; return; }
      const shift = Math.round(d.keyShift);
      const k = shift ? DJ.keys.shift(t.key, shift) : t.key;
      this.keyEl.textContent = `${k.camelot} · ${k.short}`;
      this.keyEl.className = 'key-badge' + (shift ? ' shifted' : '');
      this.keyEl.title = shift ? `Playing ${shift > 0 ? '+' : ''}${shift} semitone${Math.abs(shift) > 1 ? 's' : ''} from the original ${t.key.camelot} (${t.key.name}). Turn on KEY to keep the original.` : `${t.key.name}`;
      this.keyEl.style.setProperty('--kc', DJ.keys.color(k));
    }
    refreshCues() {
      const d = this.deck;
      this.hcPads.forEach((b, i) => {
        const t = d.hotcues[i];
        b.el.classList.toggle('set', t != null);
        b.el.querySelector('.pad-t').textContent = t != null ? DJ.fmtTime(t, true) : '';
      });
      this.refreshTransport();
    }
    refreshLoop() {
      const l = this.deck.loop;
      for (const b in this.loopPads) this.loopPads[b].lit(l.on && Math.abs((l.beats || 0) - b) < 1e-6);
      this.reloopBtn.el.textContent = l.on ? 'EXIT' : 'RELOOP';
      this.reloopBtn.lit(l.on);
      this.loopInBtn.lit(l.in != null && !l.on && l.out == null);
      this.root.classList.toggle('looping', l.on);
      this.loopInfo.textContent = l.on ? `Looping ${l.beats ? DJ.fmtBeats(l.beats) + ' beats · ' : ''}${(l.out - l.in).toFixed(3)} s` : l.in != null && l.out == null ? 'Loop in set, press OUT' : l.in != null ? 'Loop saved. RELOOP to return.' : 'No loop';
    }
    refreshGridInfo() {
      const t = this.deck.track;
      this.gridInfo.textContent = !t ? '' : !t.bpm ? 'No beat grid. Tap tempo to make one.' :
        `${t.bpm.toFixed(2)} BPM, first beat ${(t.firstBeat * 1000).toFixed(0)} ms${t.gridEdited ? ' (edited)' : ' (detected)'}`;
    }

    frame() {
      const d = this.deck, t = d.track;
      const pos = d.position(true);
      if (t) {
        const remain = t.duration - pos;
        const r = '-' + DJ.fmtTime(remain, true), e = DJ.fmtTime(pos, true);
        if (r !== this._r) { this.remainEl.textContent = r; this._r = r; }
        if (e !== this._e) { this.elapsedEl.textContent = e; this._e = e; }
        const ending = d.playing && remain < 30 && !d.loop.on;
        if (ending !== this._end) { this.root.classList.toggle('ending', ending); this._end = ending; }
      }
      if (this.wave) this.wave.draw(pos);
      if (this.over) this.over.draw(pos);
      if (this.jog) this.jog.draw(pos);
      if (d.playing !== this._pl) { this._pl = d.playing; this.refreshTransport(); }
    }
  }

  // ------------------------------------------------------------- mixer strip
  function strip(d) {
    const P = d.id + '.';
    const eqFmt = (v) => dbText(d.eqGain(v));
    const knobs = {};
    const kills = {};
    const rows = [];
    for (const [band, label] of [['high', 'Hi'], ['mid', 'Mid'], ['low', 'Low']]) {
      knobs[band] = DJ.knob({ id: P + 'eq.' + band, label, aria: `Deck ${d.id} EQ ${label}`, bipolar: true, value: 0.5, def: 0.5, snap: 0.02, fmt: eqFmt, onChange: (v) => d.setEq(band, v) });
      kills[band] = DJ.button({ id: P + 'kill.' + band, label: 'K', cls: 'kill', toggle: true, aria: `Kill ${label} on deck ${d.id}`, title: `Kill ${label}`, onPress: () => d.setKill(band, !d.kill[band]) });
      rows.push(el('div', { class: 'eq-row' }, knobs[band].el, kills[band].el));
    }
    d.on('kill', () => { for (const b in kills) kills[b].lit(d.kill[b]); });
    const gain = DJ.knob({ id: P + 'gain', label: 'Gain', aria: `Deck ${d.id} gain`, bipolar: true, value: 0.5, def: 0.5, snap: 0.02, fmt: (v) => ((v - 0.5) * 24 >= 0 ? '+' : '') + ((v - 0.5) * 24).toFixed(1) + ' dB', onChange: (v) => d.setTrim(v) });
    const filter = DJ.knob({ id: P + 'filter', label: 'Filter', aria: `Deck ${d.id} filter`, bipolar: true, value: 0.5, def: 0.5, snap: 0.03, cls: 'filter', fmt: (v) => (v < 0.485 ? 'LPF' : v > 0.515 ? 'HPF' : 'Off'), onChange: (v) => d.setFilter((v - 0.5) * 2) });
    const pfl = DJ.button({ id: P + 'pfl', label: 'CUE', cls: 'pfl', toggle: true, title: `Send deck ${d.id} to headphones`, onPress: () => d.setCue(!d.cueOn) });
    d.on('cue', () => pfl.lit(d.cueOn));
    const vol = DJ.fader({ id: P + 'volume', label: 'Volume', aria: `Deck ${d.id} channel fader`, orient: 'v', value: d.faderVal, def: 0.8, cls: 'chan', onChange: (v) => d.setFader(v) });
    const m = meter('chan');
    const root = el('div', { class: 'strip', 'data-deck': d.id },
      el('div', { class: 'strip-head' }, d.id), gain.el, ...rows, filter.el, pfl.el,
      el('div', { class: 'fader-row' }, vol.el, m));
    return { root, meter: m };
  }

  // -------------------------------------------------------------------- main
  DJ.ui = {
    views: {},
    init(engine) {
      this.engine = engine;
      const A = new DeckView(engine.decks.A, engine), B = new DeckView(engine.decks.B, engine);
      this.views = { A, B };
      const sA = strip(engine.decks.A), sB = strip(engine.decks.B);
      this.strips = { A: sA, B: sB };

      // Master section
      this.mL = meter('master'); this.mR = meter('master');
      this.limLamp = el('span', { class: 'lim', title: 'Limiter working (gain reduction)' }, 'LIM');
      const master = DJ.knob({ id: 'master', label: 'Master', value: engine.masterVal, def: 0.8, fmt: (v) => dbText((v * v) / 0.64), onChange: (v) => engine.setMaster(v) });
      const cueMix = DJ.knob({ id: 'cuemix', label: 'Cue / Mst', aria: 'Headphone cue / master mix', value: engine.cueMix, def: 0.5, fmt: (v) => (v < 0.05 ? 'Cue' : v > 0.95 ? 'Master' : Math.round((1 - v) * 100) + '/' + Math.round(v * 100)), onChange: (v) => engine.setCueMix(v) });
      const phones = DJ.knob({ id: 'phones', label: 'Phones', aria: 'Headphone level', value: engine.phonesVal, def: 0.8, onChange: (v) => engine.setPhones(v) });
      const masterCol = el('div', { class: 'master-col' },
        el('div', { class: 'master-meters' }, this.mL, this.mR),
        this.limLamp, master.el, el('div', { class: 'phones-group' }, cueMix.el, phones.el));

      const xf = DJ.fader({ id: 'xfader', label: 'Crossfader', orient: 'h', value: 0.5, def: 0.5, snap: 0.012, cls: 'xf', marks: () => el('div', { class: 'fader-mid' }), onChange: (v) => engine.setCrossfader(v) });
      const curve = DJ.segmented({ id: 'curve', label: 'Crossfader curve', options: [['smooth', 'Smooth'], ['power', 'Power'], ['sharp', 'Scratch']], onChange: (c) => { engine.setCurve(c); DJ.store.set('curve', c); } });
      engine.on('curve', () => curve.update(engine.curve));
      engine.setCurve(DJ.store.get('curve', 'power'));
      curve.update(engine.curve);

      const mixer = el('section', { class: 'mixer', 'aria-label': 'Mixer' },
        el('div', { class: 'strips' }, sA.root, masterCol, sB.root),
        el('div', { class: 'xf-row' }, el('span', { class: 'xf-a' }, 'A'), xf.el, el('span', { class: 'xf-b' }, 'B')),
        el('div', { class: 'curve-row' }, el('span', { class: 'lab' }, 'Curve'), curve.el));

      // Waveform lanes
      const lanes = el('section', { class: 'lanes', 'aria-label': 'Waveforms' });
      for (const id of ['A', 'B']) {
        const v = this.views[id];
        const cv = el('canvas', { class: 'lane-canvas', 'aria-label': `Deck ${id} waveform. Drag to scratch, scroll to zoom.` });
        const lane = el('div', { class: 'lane', 'data-deck': id }, el('span', { class: 'lane-tag' }, id), cv);
        lanes.appendChild(lane);
        v.laneCanvas = cv;
        v.wireDrop(lane);
        if (DJ.WaveView) { v.wave = new DJ.WaveView(v.deck, cv, this); v.over = new DJ.OverviewView(v.deck, v.overview); }
      }
      const zoomOut = DJ.button({ id: 'zoom-', label: '−', cls: 'small ghost', aria: 'Zoom waveforms out', onPress: () => this.zoom(1.5) });
      const zoomIn = DJ.button({ id: 'zoom+', label: '+', cls: 'small ghost', aria: 'Zoom waveforms in', onPress: () => this.zoom(1 / 1.5) });
      lanes.appendChild(el('div', { class: 'lane-zoom' }, zoomOut.el, zoomIn.el));
      this.zoomSec = DJ.store.get('zoom', 8);

      const main = document.getElementById('main');
      main.append(lanes, el('div', { class: 'deck-row' }, A.root, mixer, B.root));

      engine.on('xfader', () => xf.show(engine.xfader));
      const loop = () => { this.frame(); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    },
    zoom(f) { this.zoomSec = DJ.clamp(this.zoomSec * f, 2, 48); DJ.store.set('zoom', this.zoomSec); },
    frame() {
      const e = this.engine;
      for (const id in this.views) this.views[id].frame();
      for (const id in this.strips) this.strips[id].meter.update(e.decks[id].playing || e.decks[id].scratching ? e.decks[id].level() : 0);
      const [l, r] = e.masterLevels();
      this.mL.update(l); this.mR.update(r);
      const limiting = e.gr < 0.97;
      if (limiting !== this._lim) { this.limLamp.classList.toggle('on', limiting); this._lim = limiting; }
    },
  };
})();
