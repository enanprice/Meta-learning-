// Audio engine: the AudioContext, master bus, crossfader and the two decks.
//
// Signal path per deck:
//   deck-player (worklet) → trim → 3-band isolator (LR4 splits, true kill)
//   → LP/HP filter → FX rack → [meter, headphone cue send] → channel fader
//   → crossfader gain → master bus → master volume → limiter (worklet) → out
(function () {
  const DJ = window.DJ;
  const F_LOW = 250, F_HIGH = 3000;
  const MAX_FILE = 1024 * 1024 * 1024; // refuse files over 1 GB outright
  const WARN_SECONDS = 45 * 60;         // warn above 45 minutes of audio

  const ramp = (ctx, p, v, tc = 0.01) => p.setTargetAtTime(v, ctx.currentTime, tc);

  // Crossfader curves: gain for the deck the fader is moving away from.
  DJ.XF_CURVES = {
    smooth: (x) => 1 - x,                                          // long blend, dips in the middle
    power: (x) => Math.cos((x * Math.PI) / 2),                     // constant power, no dip
    sharp: (x) => (x < 0.94 ? 1 : Math.max(0, (1 - x) / 0.06)),    // scratch cut at the edges
  };

  class Deck extends DJ.Emitter {
    constructor(engine, id) {
      super();
      this.engine = engine; this.ctx = engine.ctx; this.id = id;
      const ctx = this.ctx;
      this.track = null;
      this.pitch = 0; this.range = 0.08; this.bend = 0; this.keylock = false;
      this.syncOn = false; this.quantize = true;
      this.playing = false; this.previewing = false; this.loading = false; this.loadToken = 0;
      this.cuePoint = 0;
      this.hotcues = new Array(8).fill(null);
      this.loop = { on: false, in: null, out: null, beats: null };
      this.seq = 0;
      this.rep = { t: 0, pos: 0, speed: 0 };

      this.player = new AudioWorkletNode(ctx, 'deck-player', { numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2] });
      this.player.port.onmessage = (e) => this.onWorklet(e.data);

      this.trim = ctx.createGain();
      // Web Audio's lowpass/highpass Q is in dB: -3.01 dB = Butterworth (Q 0.707), so two in a row make a Linkwitz-Riley crossover.
      const bq = (type, f) => { const b = ctx.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = -3.0103; return b; };
      const chain = (...nodes) => { for (let i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]); return nodes[nodes.length - 1]; };
      this.eqSum = ctx.createGain();
      this.band = { low: ctx.createGain(), mid: ctx.createGain(), high: ctx.createGain() };
      chain(this.trim, bq('lowpass', F_LOW), bq('lowpass', F_LOW), this.band.low, this.eqSum);
      chain(this.trim, bq('highpass', F_LOW), bq('highpass', F_LOW), bq('lowpass', F_HIGH), bq('lowpass', F_HIGH), this.band.mid, this.eqSum);
      chain(this.trim, bq('highpass', F_HIGH), bq('highpass', F_HIGH), this.band.high, this.eqSum);
      this.eqVal = { low: 0.5, mid: 0.5, high: 0.5 };
      this.kill = { low: false, mid: false, high: false };

      this.lp = ctx.createBiquadFilter(); this.lp.type = 'lowpass'; this.lp.frequency.value = Math.min(20000, ctx.sampleRate / 2 - 100); this.lp.Q.value = 0;
      this.hp = ctx.createBiquadFilter(); this.hp.type = 'highpass'; this.hp.frequency.value = 10; this.hp.Q.value = 0;
      this.fx = new DJ.FxRack(ctx, this);
      this.meter = ctx.createAnalyser(); this.meter.fftSize = 1024;
      this.cueSend = ctx.createGain(); this.cueSend.gain.value = 0;
      this.fader = ctx.createGain();
      this.xf = ctx.createGain();

      chain(this.player, this.trim);
      chain(this.eqSum, this.lp, this.hp, this.fx.input);
      this.fx.output.connect(this.meter);
      this.fx.output.connect(this.cueSend);
      chain(this.fx.output, this.fader, this.xf, engine.bus);
      this.cueSend.connect(engine.cueBus);

      this.trimVal = 0.5; this.filterVal = 0; this.faderVal = 0.8; this.cueOn = false;
      this.setFader(this.faderVal);
      this.meterBuf = new Float32Array(1024);
      this.peakHold = 0; this.peakHoldT = 0;
    }

    // ------------------------------------------------------------ worklet link
    post(msg, transfer) { msg.seq = ++this.seq; this.player.port.postMessage(msg, transfer || []); }
    onWorklet(m) {
      if (m.type === 'pos') {
        // Ignore reports made before our latest command reached the audio thread.
        if (m.seq !== undefined && m.seq < this.seq) return;
        this.rep = { t: m.t, pos: m.pos, speed: m.speed };
        if (this.playing && !m.playing && !this.scratching) { this.playing = false; this.emit('state'); }
      } else if (m.type === 'pong') {
        this.emit('pong', m.id);
      } else if (m.type === 'ended') {
        this.playing = false; this.previewing = false; this.emit('state');
      }
    }
    get rate() { return 1 + this.pitch + this.bend; }
    get sr() { return this.ctx.sampleRate; }

    // Track position in seconds. `audible` accounts for output latency so the
    // waveform lines up with what you hear.
    position(audible) {
      if (!this.track) return 0;
      const now = audible ? this.engine.audibleTime() : this.ctx.currentTime;
      const p = this.rep.pos + Math.max(0, now - this.rep.t) * this.rep.speed;
      let q = p;
      if (this.loop.on && this.rep.speed > 0 && this.rep.pos < this.loop.out && q >= this.loop.out) {
        const len = this.loop.out - this.loop.in;
        q = this.loop.in + ((q - this.loop.in) % len);
      }
      return DJ.clamp(q, 0, this.track.duration);
    }
    // Pretend the audio thread already applied a command, so the UI doesn't lag.
    predict(pos, speed) { this.rep = { t: this.ctx.currentTime, pos, speed }; }

    // ------------------------------------------------------------------- load
    async load(file, opts = {}) {
      if (this.loading && this.loading !== 'demo') { DJ.toast('Deck ' + this.id + ' is still loading the last track.'); return false; }
      if (!file) return false;
      const token = ++this.loadToken; // a newer load cancels an older one (e.g. the demo)
      if (file.size > MAX_FILE) { this.emit('error', `${file.name} is ${DJ.fmtBytes(file.size)}. Files over 1 GB are refused to avoid running out of memory.`); return false; }
      this.loading = true;
      this.emit('loading', { name: file.name, stage: 'Reading' });
      try {
        const decoded = await this.engine.decode(file, (stage) => this.emit('loading', { name: file.name, stage }));
        if (decoded.duration > WARN_SECONDS) DJ.toast(`${file.name} is ${Math.round(decoded.duration / 60)} minutes long. It will use about ${DJ.fmtBytes(decoded.length * 8)} of memory.`, { kind: 'warn', ms: 7000 });
        if (token !== this.loadToken) return false;
        await this.loadDecoded(decoded, Object.assign({ id: DJ.trackId(file), name: file.name, size: file.size }, opts.meta || {}), token);
        if (token !== this.loadToken) return false;
        this.engine.emit('fileLoaded', this, file);
        return true;
      } catch (err) {
        this.emit('error', err.message || String(err));
        return false;
      } finally {
        if (token === this.loadToken) { this.loading = false; this.emit('loading', null); }
      }
    }

    async loadDecoded(buf, meta, token) {
      // Fade this deck out before swapping buffers so the swap itself is silent.
      if (this.playing) { this.post({ type: 'pause' }); this.playing = false; await new Promise((r) => setTimeout(r, 25)); }
      const L = new Float32Array(buf.length); buf.copyFromChannel(L, 0);
      let R = null;
      if (buf.numberOfChannels > 1) { R = new Float32Array(buf.length); buf.copyFromChannel(R, 1); }
      let info = { bpm: null, firstBeat: 0, key: null, wave: null };
      if (DJ.analysis) {
        this.emit('loading', { name: meta.name, stage: 'Analysing' });
        const res = await DJ.analysis.analyze(L, R, buf.sampleRate, { wave: true });
        info = res.info; // L/R come back from the worker (transferred there and back)
        this._L = res.L; this._R = res.R;
      } else { this._L = L; this._R = R; }
      if (token !== undefined && token !== this.loadToken) return; // superseded while analysing
      const saved = DJ.trackData.get(meta.id);
      const names = DJ.parseName(meta.name || 'Untitled');
      this.track = {
        id: meta.id, name: meta.name, title: meta.title || names.title, artist: meta.artist || names.artist,
        duration: buf.duration, sampleRate: buf.sampleRate, channels: buf.numberOfChannels,
        bpm: saved.grid ? saved.grid.bpm : info.bpm,
        firstBeat: saved.grid ? saved.grid.firstBeat : info.firstBeat,
        detectedBpm: info.bpm, detectedFirstBeat: info.firstBeat, key: info.key, wave: info.wave, gridEdited: !!saved.grid,
      };
      const transfer = [this._L.buffer]; if (this._R) transfer.push(this._R.buffer);
      this.post({ type: 'load', L: this._L, R: this._R }, transfer);
      this._L = this._R = null;
      this.playing = false; this.previewing = false; this.syncOn = false;
      this.loop = { on: false, in: null, out: null, beats: null };
      // Auto-cue to the first audible sound, snapped to the grid if it's close.
      const fs = info.firstSound || 0;
      this.cuePoint = saved.cue != null ? saved.cue : (this.track.bpm && Math.abs(this.q(fs) - fs) < 0.05 ? this.q(fs) : fs);
      this.hotcues = Array.isArray(saved.hotcues) ? saved.hotcues.slice(0, 8).concat(new Array(8).fill(null)).slice(0, 8) : new Array(8).fill(null);
      this.predict(0, 0);
      this.seek(this.cuePoint);
      this.post({ type: 'rate', rate: this.rate, immediate: true });
      this.post({ type: 'keylock', on: this.keylock });
      this.updateFxTempo();
      this.emit('load', this.track);
      this.emit('state');
      this.engine.emit('trackLoaded', this, this.track);
    }

    // -------------------------------------------------------------- transport
    play() {
      if (!this.track) { DJ.toast(this.loading ? `Deck ${this.id} is still loading.` : `Deck ${this.id} is empty. Load a track first.`); return; }
      this.engine.resume();
      if (this.syncOn) this.alignPhase();
      this.post({ type: 'play' });
      const p = this.position();
      this.predict(p >= this.track.duration - 0.01 ? 0 : p, this.rate);
      this.playing = true; this.previewing = false;
      this.emit('state');
    }
    pause() {
      if (!this.track) return;
      const p = this.position();
      this.post({ type: 'pause' });
      this.predict(p, 0);
      this.playing = false; this.previewing = false;
      this.emit('state');
    }
    togglePlay() { this.playing && !this.previewing ? this.pause() : this.play(); if (this.previewing) this.previewing = false; }
    seek(sec) {
      if (!this.track) return;
      sec = DJ.clamp(sec, 0, Math.max(0, this.track.duration - 0.001));
      this.post({ type: 'seek', pos: sec * this.sr });
      this.predict(sec, this.playing ? this.rate : 0);
      this.emit('seek');
    }
    // CDJ-style cue: while playing, jump back to the cue and stop. While
    // stopped on the cue, hold to preview. While stopped elsewhere, set it.
    cueDown() {
      if (!this.track) return;
      if (this.playing && !this.previewing) { this.pause(); this.seek(this.cuePoint); return; }
      const p = this.position();
      if (Math.abs(p - this.cuePoint) < 0.02) {
        this.play(); this.previewing = true; this.emit('state');
      } else {
        this.cuePoint = this.q(p); this.seek(this.cuePoint); this.saveCues(); this.emit('cues');
      }
    }
    cueUp() {
      if (this.previewing) { this.previewing = false; this.pause(); this.seek(this.cuePoint); }
    }

    // ---------------------------------------------------------- tempo & pitch
    setPitch(p, fromSync) {
      this.pitch = DJ.clamp(p, -this.range, this.range);
      if (!fromSync && this.syncOn) { this.syncOn = false; this.emit('sync'); }
      this.applyRate();
    }
    setRange(r) { this.range = r; this.setPitch(this.pitch, true); this.emit('range'); }
    setBend(b) { this.bend = b; this.applyRate(); }
    applyRate() {
      if (this.playing) { this.predict(this.position(), this.rate); }
      this.post({ type: 'rate', rate: this.rate });
      this.updateFxTempo();
      this.emit('rate');
      this.engine.emit('rate', this);
    }
    setKeylock(on) { this.keylock = !!on; this.post({ type: 'keylock', on: this.keylock }); this.emit('keylock'); }
    get bpm() { return this.track && this.track.bpm ? this.track.bpm * this.rate : null; }
    // Semitone shift heard when key lock is off.
    get keyShift() { return this.keylock ? 0 : 12 * Math.log2(this.rate); }

    // ------------------------------------------------------------- beat grid
    get beatLen() { return this.track && this.track.bpm ? 60 / this.track.bpm : 0.5; }
    beatIndex(t) { return (t - (this.track ? this.track.firstBeat : 0)) / this.beatLen; }
    beatTime(i) { return (this.track ? this.track.firstBeat : 0) + i * this.beatLen; }
    q(t) { return this.quantize && this.track && this.track.bpm ? this.beatTime(Math.round(this.beatIndex(t))) : t; }
    // Context time of the next boundary of a `beats`-long division (for beat roll).
    nextBeatTime(beats) {
      if (!this.playing || !this.track || !this.track.bpm) return 0;
      const div = Math.max(beats, 1 / 16);
      const b = this.beatIndex(this.position()) / div;
      const next = Math.ceil(b - 1e-3) * div;
      const wait = (this.beatTime(next) - this.position()) / this.rate;
      return this.ctx.currentTime + Math.max(0, wait);
    }
    setGrid(bpm, firstBeat, save = true) {
      if (!this.track) return;
      this.track.bpm = bpm; this.track.firstBeat = firstBeat;
      if (save) { this.track.gridEdited = true; DJ.trackData.patch(this.track.id, { grid: { bpm, firstBeat } }); }
      this.updateFxTempo();
      this.emit('grid'); this.emit('rate'); this.engine.emit('rate', this);
    }
    resetGrid() {
      if (!this.track) return;
      const d = DJ.trackData.get(this.track.id); delete d.grid; DJ.store.set('track.' + this.track.id, d);
      this.track.gridEdited = false;
      this.setGrid(this.track.detectedBpm, this.track.detectedFirstBeat, false);
    }
    nudgeGrid(sec) { if (this.track && this.track.bpm) this.setGrid(this.track.bpm, this.track.firstBeat + sec); }
    scaleBpm(f) { if (this.track && this.track.bpm) this.setGrid(this.track.bpm * f, this.track.firstBeat); }
    // Make the beat under the playhead the first beat of a bar.
    downbeatHere() {
      if (!this.track || !this.track.bpm) return;
      const p = this.position(true);
      const bl = this.beatLen, bar = bl * 4;
      const nearest = this.beatTime(Math.round(this.beatIndex(p)));
      this.setGrid(this.track.bpm, ((nearest % bar) + bar) % bar);
    }
    tap() {
      const now = performance.now();
      // A pause of more than 2 s starts a new tap sequence; keep the last 8.
      if (!this.taps || now - this.taps[this.taps.length - 1] > 2000) this.taps = [];
      this.taps.push(now);
      if (this.taps.length > 8) this.taps.shift();
      if (this.taps.length < 4) return null;
      const iv = []; for (let i = 1; i < this.taps.length; i++) iv.push(this.taps[i] - this.taps[i - 1]);
      iv.sort((a, b) => a - b);
      const med = iv[Math.floor(iv.length / 2)];
      // Tapped tempo is heard at the current pitch; store the track's own tempo.
      const bpm = Math.round((60000 / med / this.rate) * 100) / 100;
      if (!this.track) return bpm;
      // Anchor the grid on the latest tap.
      const tapPos = this.position(true);
      const bl = 60 / bpm, bar = bl * 4;
      this.setGrid(bpm, ((tapPos % bar) + bar) % bar);
      return bpm;
    }

    // ------------------------------------------------------------------- sync
    toggleSync() { this.syncOn ? this.syncOff() : this.sync(); }
    syncOff() { this.syncOn = false; this.emit('sync'); }
    sync() {
      const other = this.engine.other(this);
      if (!this.track || !this.track.bpm || !other.track || !other.bpm) { DJ.toast('Sync needs a BPM on both decks.'); return false; }
      if (other.syncOn) other.syncOff();
      const target = other.bpm;
      let best = null;
      for (const m of [1, 2, 0.5]) {
        const r = (target * m) / this.track.bpm;
        if (!best || Math.abs(r - 1) < Math.abs(best.r - 1)) best = { m, r };
      }
      const need = Math.abs(best.r - 1);
      if (need > 0.16 + 1e-9) { DJ.toast(`Deck ${this.id} can't reach ${target.toFixed(1)} BPM within ±16%.`, { kind: 'warn' }); return false; }
      if (need > this.range + 1e-9) this.setRange(0.16);
      this.syncMul = best.m;
      this.syncOn = true;
      this.bend = 0;
      this.setPitch(best.r - 1, true);
      this.post({ type: 'rate', rate: this.rate, immediate: true });
      if (this.playing && other.playing) this.alignPhase();
      this.emit('sync');
      return true;
    }
    matchTempo() {
      const other = this.engine.other(this);
      if (!this.syncOn || !other.bpm || !this.track || !this.track.bpm) return;
      const p = (other.bpm * (this.syncMul || 1)) / this.track.bpm - 1;
      if (Math.abs(p) > 0.16) return;
      if (Math.abs(p) > this.range) this.setRange(0.16);
      this.pitch = p; this.applyRate();
    }
    // Shift this deck so its beats land on the other deck's beats.
    alignPhase() {
      const other = this.engine.other(this);
      if (!other.track || !other.track.bpm || !this.track || !this.track.bpm) return;
      const m = this.syncMul || 1;
      const frac = (x) => x - Math.floor(x);
      const phiO = frac(other.beatIndex(other.position()));
      const mine = this.beatIndex(this.position());
      const phiM = frac(mine);
      // Candidate phases of our beat that line up with theirs.
      const cands = [];
      if (m >= 1) cands.push(frac(phiO * m));
      else for (let k = 0; k < Math.round(1 / m); k++) cands.push(frac((phiO + k) * m));
      let bestD = null;
      for (const c of cands) { let d = c - phiM; d -= Math.round(d); if (bestD === null || Math.abs(d) < Math.abs(bestD)) bestD = d; }
      const shift = bestD * this.beatLen;
      if (Math.abs(shift) < 0.0005) return;
      this.post({ type: 'shift', by: shift * this.sr });
      this.predict(this.position() + shift, this.playing ? this.rate : 0);
    }

    // --------------------------------------------------------------- hot cues
    hotcue(i) {
      if (!this.track) return;
      if (this.hotcues[i] == null) { this.hotcues[i] = this.q(this.position(true)); this.saveCues(); this.emit('cues'); return; }
      this.seek(this.hotcues[i]);
      if (!this.playing) this.play();
    }
    deleteHotcue(i) { if (this.hotcues[i] != null) { this.hotcues[i] = null; this.saveCues(); this.emit('cues'); } }
    saveCues() { if (this.track) DJ.trackData.patch(this.track.id, { hotcues: this.hotcues, cue: this.cuePoint }); }

    // ------------------------------------------------------------------ loops
    sendLoop(jumpIn) {
      const l = this.loop;
      this.post({ type: 'loop', on: l.on, in: (l.in || 0) * this.sr, out: (l.out || 0) * this.sr, jumpIn: !!jumpIn });
      this.emit('loop');
    }
    autoLoop(beats) {
      if (!this.track) return;
      if (this.loop.on && this.loop.beats === beats) return this.exitLoop();
      const bl = this.beatLen;
      const p = this.position(true);
      const start = this.loop.on ? this.loop.in : this.q(p);
      this.loop = { on: true, in: start, out: start + beats * bl, beats };
      const outside = p >= this.loop.out;
      this.sendLoop(outside);
      if (outside) this.predict(this.loop.in, this.playing ? this.rate : 0);
    }
    loopIn() {
      if (!this.track) return;
      const p = this.q(this.position(true));
      this.loop = { on: false, in: p, out: null, beats: null };
      this.sendLoop();
    }
    loopOut() {
      if (!this.track || this.loop.in == null) return;
      const p = this.q(this.position(true));
      if (p <= this.loop.in + 0.01) return;
      this.loop.out = p; this.loop.on = true;
      this.loop.beats = this.track.bpm ? Math.round(((p - this.loop.in) / this.beatLen) * 1000) / 1000 : null;
      this.sendLoop();
    }
    exitLoop() { this.loop.on = false; this.sendLoop(); }
    reloop() {
      if (this.loop.on) return this.exitLoop();
      if (this.loop.in == null || this.loop.out == null) return;
      this.loop.on = true;
      const p = this.position();
      const outside = p < this.loop.in || p >= this.loop.out;
      this.sendLoop(outside);
      if (outside) this.predict(this.loop.in, this.playing ? this.rate : 0);
    }
    resizeLoop(f) {
      const l = this.loop;
      if (l.in == null || l.out == null) return;
      const len = (l.out - l.in) * f;
      if (len < this.beatLen / 32 - 1e-6 || len > this.beatLen * 64 + 1e-6) return;
      l.out = l.in + len;
      if (l.beats) l.beats *= f;
      if (l.on) {
        const p = this.position();
        if (p >= l.out) {
          const np = l.in + ((p - l.in) % len);
          this.post({ type: 'seek', pos: np * this.sr });
          this.predict(np, this.playing ? this.rate : 0);
        }
      }
      this.sendLoop();
    }

    // ---------------------------------------------------------------- scratch
    scratchStart() { if (!this.track) return; this.engine.resume(); this.scratching = true; this.scratchPos = this.position(true); this.post({ type: 'scratch', on: true }); this.emit('scratch'); }
    scratchTo(sec) { if (!this.scratching) return; this.scratchPos = DJ.clamp(sec, 0, this.track.duration); this.post({ type: 'target', pos: this.scratchPos * this.sr }); }
    scratchEnd() {
      if (!this.scratching) return;
      this.scratching = false; this.post({ type: 'scratch', on: false });
      this.predict(this.scratchPos, this.playing ? this.rate : 0);
      this.emit('scratch');
    }
    // Jog wheel from MIDI: bends tempo while playing, scrubs while stopped.
    jog(ticks) {
      if (!this.track) return;
      if (this.playing) {
        this.setBend(DJ.clamp(ticks * 0.01, -0.3, 0.3));
        clearTimeout(this.jogT); this.jogT = setTimeout(() => this.setBend(0), 60);
      } else this.seek(this.position() + ticks * 0.02);
    }

    // ------------------------------------------------------------------ mixer
    setTrim(v) { this.trimVal = v; ramp(this.ctx, this.trim.gain, Math.pow(10, ((v - 0.5) * 24) / 20)); }
    // 0..0.5 fades a band down to silence, 0.5..1 boosts up to +6 dB.
    eqGain(v) { return v <= 0.5 ? Math.pow(v / 0.5, 2) : Math.pow(10, ((v - 0.5) / 0.5) * 6 / 20); }
    setEq(band, v) { this.eqVal[band] = v; this.applyBand(band); }
    setKill(band, on) { this.kill[band] = on; this.applyBand(band); this.emit('kill'); }
    applyBand(band) { ramp(this.ctx, this.band[band].gain, this.kill[band] ? 0 : this.eqGain(this.eqVal[band]), 0.004); }
    // -1 = low-pass fully closed, 0 = off, +1 = high-pass fully closed.
    setFilter(v) {
      this.filterVal = v;
      const nyq = Math.min(20000, this.ctx.sampleRate / 2 - 100);
      const a = Math.abs(v);
      if (a < 0.03) { ramp(this.ctx, this.lp.frequency, nyq, 0.02); ramp(this.ctx, this.hp.frequency, 10, 0.02); return; }
      const t = (a - 0.03) / 0.97;
      if (v < 0) { ramp(this.ctx, this.lp.frequency, nyq * Math.pow(60 / nyq, t), 0.02); ramp(this.ctx, this.hp.frequency, 10, 0.02); }
      else { ramp(this.ctx, this.hp.frequency, 20 * Math.pow(9000 / 20, t), 0.02); ramp(this.ctx, this.lp.frequency, nyq, 0.02); }
      const q = t * 6; // dB of resonance, rising as the filter closes
      ramp(this.ctx, this.lp.Q, q, 0.02); ramp(this.ctx, this.hp.Q, q, 0.02);
    }
    setFader(v) { this.faderVal = v; ramp(this.ctx, this.fader.gain, v * v, 0.005); }
    setCue(on) { this.cueOn = !!on; ramp(this.ctx, this.cueSend.gain, on ? 1 : 0); this.emit('cue'); }
    updateFxTempo() { this.fx.setBeatSec(this.track && this.track.bpm ? 60 / (this.track.bpm * this.rate) : 0.5); }

    // Peak level of this channel (pre-fader), 0..1 with a short hold.
    level() {
      this.meter.getFloatTimeDomainData(this.meterBuf);
      let pk = 0; for (let i = 0; i < this.meterBuf.length; i++) { const a = Math.abs(this.meterBuf[i]); if (a > pk) pk = a; }
      return pk;
    }
  }

  DJ.Engine = class extends DJ.Emitter {
    constructor(ctx) {
      super();
      this.ctx = ctx || new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive' });
      this.offline = typeof OfflineAudioContext !== 'undefined' && this.ctx instanceof OfflineAudioContext;
      this.xfader = 0.5; this.curve = 'power'; this.masterVal = 0.8; this.gr = 1;
      this.cueMix = 0.5; this.phonesVal = 0.8;
    }
    async init() {
      const ctx = this.ctx;
      if (!ctx.audioWorklet) throw new Error('This browser has no AudioWorklet support. Use a current Chrome, Edge, Firefox or Safari.');
      await DJ.addWorkletModule(ctx, DJ.workletSource);
      this.bus = ctx.createGain();
      this.masterGain = ctx.createGain();
      this.limiter = new AudioWorkletNode(ctx, 'master-bus', { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
      this.limiter.port.onmessage = (e) => this.onMaster(e.data);
      this.bus.connect(this.masterGain).connect(this.limiter).connect(ctx.destination);
      const split = ctx.createChannelSplitter(2);
      this.limiter.connect(split);
      this.meterL = ctx.createAnalyser(); this.meterR = ctx.createAnalyser();
      this.meterL.fftSize = this.meterR.fftSize = 1024;
      split.connect(this.meterL, 0); split.connect(this.meterR, 1);
      this.mBuf = new Float32Array(1024);
      // Headphone cue bus: summed cue sends plus a tap of the master.
      this.cueBus = ctx.createGain();
      this.phonesCue = ctx.createGain(); this.phonesMaster = ctx.createGain(); this.phones = ctx.createGain();
      this.cueBus.connect(this.phonesCue).connect(this.phones);
      this.limiter.connect(this.phonesMaster).connect(this.phones);
      this.decks = { A: new Deck(this, 'A'), B: new Deck(this, 'B') };
      this.on('rate', (deck) => { const o = this.other(deck); if (o.syncOn) o.matchTempo(); });
      this.setMaster(this.masterVal); this.setCrossfader(this.xfader); this.setCueMix(this.cueMix); this.setPhones(this.phonesVal);
      return this;
    }
    other(deck) { return deck.id === 'A' ? this.decks.B : this.decks.A; }
    get suspended() { return this.ctx.state === 'suspended'; }
    resume() { if (!this.offline && this.ctx.state === 'suspended') return this.ctx.resume().then(() => this.emit('resumed')); return Promise.resolve(); }
    audibleTime() {
      const ctx = this.ctx;
      if (ctx.getOutputTimestamp) {
        const ts = ctx.getOutputTimestamp();
        if (ts.contextTime > 0 && ts.performanceTime > 0) return ts.contextTime + (performance.now() - ts.performanceTime) / 1000;
      }
      return ctx.currentTime - (ctx.outputLatency || ctx.baseLatency || 0);
    }

    async decode(file, onStage) {
      let bytes;
      try { bytes = await file.arrayBuffer(); }
      catch (e) { throw new Error(`Couldn't read ${file.name}. If it's on a network drive or was moved, add it again.`); }
      onStage && onStage('Decoding');
      try {
        return await this.ctx.decodeAudioData(bytes);
      } catch (e) {
        const ext = (file.name.match(/\.([^.]+)$/) || [, '?'])[1].toUpperCase();
        throw new Error(`Couldn't decode ${file.name}. This browser can't play ${ext} files like this one, or the file is damaged. Try MP3, WAV, FLAC or M4A.`);
      }
    }

    onMaster(m) {
      if (m.type === 'gr') this.gr = m.gr;
    }
    setMaster(v) { this.masterVal = v; ramp(this.ctx, this.masterGain.gain, (v * v) / 0.64); }
    setCrossfader(x) {
      this.xfader = DJ.clamp(x, 0, 1);
      const f = DJ.XF_CURVES[this.curve];
      ramp(this.ctx, this.decks.A.xf.gain, f(this.xfader), 0.004);
      ramp(this.ctx, this.decks.B.xf.gain, f(1 - this.xfader), 0.004);
      this.emit('xfader');
    }
    setCurve(c) { if (DJ.XF_CURVES[c]) { this.curve = c; this.setCrossfader(this.xfader); this.emit('curve'); } }
    xfGains(x = this.xfader) { const f = DJ.XF_CURVES[this.curve]; return [f(x), f(1 - x)]; }
    // 0 = cue only, 1 = master only
    setCueMix(v) { this.cueMix = v; ramp(this.ctx, this.phonesCue.gain, Math.cos((v * Math.PI) / 2)); ramp(this.ctx, this.phonesMaster.gain, Math.sin((v * Math.PI) / 2)); }
    setPhones(v) { this.phonesVal = v; ramp(this.ctx, this.phones.gain, v * v * 1.2); }
    masterLevels() {
      const r = [];
      for (const a of [this.meterL, this.meterR]) {
        a.getFloatTimeDomainData(this.mBuf);
        let pk = 0; for (let i = 0; i < this.mBuf.length; i++) { const x = Math.abs(this.mBuf[i]); if (x > pk) pk = x; }
        r.push(pk);
      }
      return r;
    }
  };
  DJ.Deck = Deck;
})();
