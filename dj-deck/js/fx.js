// Per-deck effects rack: echo, reverb, flanger, beat roll, in series.
// Each unit has on/off, a wet/dry mix and a time in beats that follows the
// deck's live tempo.
(function () {
  const DJ = window.DJ;
  const BEATS = [1 / 16, 1 / 8, 1 / 4, 1 / 2, 3 / 4, 1, 2, 4, 8, 16];
  DJ.FX_BEATS = BEATS;
  DJ.fmtBeats = (b) => (b >= 1 ? String(b) : b === 0.75 ? '3/4' : '1/' + Math.round(1 / b));

  const ramp = (ctx, p, v, tc = 0.015) => p.setTargetAtTime(v, ctx.currentTime, tc);

  class Unit {
    constructor(ctx, name, beats) {
      this.ctx = ctx; this.name = name; this.on = false; this.mix = 0.5; this.beats = beats;
      this.beatSec = 0.5;
      this.input = ctx.createGain(); this.output = ctx.createGain();
    }
    setOn(on) { this.on = !!on; this.update(); }
    setMix(m) { this.mix = DJ.clamp(m, 0, 1); this.update(); }
    setBeats(b) { this.beats = b; this.retime(); }
    setBeatSec(s) { if (Math.abs(s - this.beatSec) > 1e-4) { this.beatSec = s; this.retime(); } }
    get seconds() { return this.beats * this.beatSec; }
    retime() {}
    update() {}
  }

  class Echo extends Unit {
    constructor(ctx) {
      super(ctx, 'Echo', 3 / 4);
      this.dry = ctx.createGain(); this.send = ctx.createGain(); this.send.gain.value = 0;
      this.delay = ctx.createDelay(12);
      this.hp = ctx.createBiquadFilter(); this.hp.type = 'highpass'; this.hp.frequency.value = 180;
      this.lp = ctx.createBiquadFilter(); this.lp.type = 'lowpass'; this.lp.frequency.value = 6000;
      this.fb = ctx.createGain(); this.fb.gain.value = 0.5;
      this.wet = ctx.createGain(); this.wet.gain.value = 0;
      this.input.connect(this.dry).connect(this.output);
      this.input.connect(this.send).connect(this.delay);
      this.delay.connect(this.hp).connect(this.lp).connect(this.fb).connect(this.delay);
      this.lp.connect(this.wet).connect(this.output);
      this.retime();
    }
    retime() { ramp(this.ctx, this.delay.delayTime, DJ.clamp(this.seconds, 0.01, 11.9), 0.03); }
    update() {
      // Turning echo off stops feeding it but lets the repeats ring out.
      ramp(this.ctx, this.send.gain, this.on ? 1 : 0);
      ramp(this.ctx, this.wet.gain, this.mix * 0.9);
      ramp(this.ctx, this.dry.gain, this.on ? 1 - this.mix * 0.35 : 1);
    }
  }

  class Reverb extends Unit {
    constructor(ctx) {
      super(ctx, 'Reverb', 2);
      this.dry = ctx.createGain(); this.send = ctx.createGain(); this.send.gain.value = 0;
      this.conv = ctx.createConvolver();
      this.wet = ctx.createGain(); this.wet.gain.value = 0;
      this.input.connect(this.dry).connect(this.output);
      this.input.connect(this.send).connect(this.conv).connect(this.wet).connect(this.output);
      this.builtFor = 0; this.timer = null;
      this.build();
    }
    build() {
      const secs = DJ.clamp(this.seconds, 0.4, 8);
      this.builtFor = secs;
      const sr = this.ctx.sampleRate, n = Math.ceil(secs * sr);
      const ir = this.ctx.createBuffer(2, n, sr);
      for (let c = 0; c < 2; c++) {
        const d = ir.getChannelData(c);
        let lp = 0;
        for (let i = 0; i < n; i++) {
          const t = i / n;
          lp += 0.35 * ((Math.random() * 2 - 1) - lp); // darken the tail a little
          d[i] = lp * Math.pow(1 - t, 2.2) * (i < sr * 0.004 ? i / (sr * 0.004) : 1);
        }
      }
      this.conv.buffer = ir;
    }
    retime() {
      if (Math.abs(DJ.clamp(this.seconds, 0.4, 8) - this.builtFor) / this.builtFor < 0.08) return;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.build(), 120);
    }
    update() {
      ramp(this.ctx, this.send.gain, this.on ? 1 : 0, 0.03);
      ramp(this.ctx, this.wet.gain, this.mix * 0.8);
      ramp(this.ctx, this.dry.gain, this.on ? 1 - this.mix * 0.4 : 1);
    }
  }

  class Flanger extends Unit {
    constructor(ctx) {
      super(ctx, 'Flanger', 4);
      this.dry = ctx.createGain();
      this.delay = ctx.createDelay(0.05); this.delay.delayTime.value = 0.006; // stays above one render quantum (feedback loops need that)
      this.fb = ctx.createGain(); this.fb.gain.value = 0.55;
      this.wet = ctx.createGain(); this.wet.gain.value = 0;
      this.lfo = ctx.createOscillator(); this.lfo.type = 'triangle';
      this.depth = ctx.createGain(); this.depth.gain.value = 0.003;
      this.lfo.connect(this.depth).connect(this.delay.delayTime);
      this.lfo.start();
      this.input.connect(this.dry).connect(this.output);
      this.input.connect(this.delay);
      this.delay.connect(this.fb).connect(this.delay);
      this.delay.connect(this.wet).connect(this.output);
      this.retime();
    }
    retime() { ramp(this.ctx, this.lfo.frequency, 1 / Math.max(0.05, this.seconds), 0.05); }
    update() {
      ramp(this.ctx, this.wet.gain, this.on ? this.mix * 0.75 : 0);
      ramp(this.ctx, this.dry.gain, this.on ? 1 - this.mix * 0.45 : 1);
    }
  }

  class Roll extends Unit {
    constructor(ctx, deck) {
      super(ctx, 'Roll', 1 / 4);
      this.deck = deck;
      this.node = new AudioWorkletNode(ctx, 'beat-roll', { numberOfInputs: 1, numberOfOutputs: 1, outputChannelCount: [2] });
      this.input.connect(this.node).connect(this.output);
      this.mix = 1;
    }
    samples() { return this.seconds * this.ctx.sampleRate; }
    setOn(on) {
      this.on = !!on;
      if (this.on) this.node.port.postMessage({ type: 'on', len: this.samples(), when: this.deck.nextBeatTime(this.beats) });
      else this.node.port.postMessage({ type: 'off' });
    }
    retime() { if (this.on) this.node.port.postMessage({ type: 'len', len: this.samples() }); }
    update() { ramp(this.ctx, this.node.parameters.get('mix'), this.mix, 0.01); }
  }

  DJ.FxRack = class {
    constructor(ctx, deck) {
      this.input = ctx.createGain(); this.output = ctx.createGain();
      this.units = [new Roll(ctx, deck), new Flanger(ctx), new Echo(ctx), new Reverb(ctx)];
      let prev = this.input;
      for (const u of this.units) { prev.connect(u.input); prev = u.output; }
      prev.connect(this.output);
      this.byName = {};
      for (const u of this.units) this.byName[u.name.toLowerCase()] = u;
    }
    setBeatSec(s) { for (const u of this.units) u.setBeatSec(s); }
  };
})();
