// Audio outputs and recording.
//
// Master output: AudioContext.setSinkId (Chrome/Edge 110+).
// Headphones: the cue bus goes out through a hidden <audio> element whose
// output device is chosen with HTMLMediaElement.setSinkId, so it can be a
// different sound card from the master (e.g. a USB DJ interface).
// Recording taps the master after the limiter: WAV (16-bit, lossless, from
// the worklet) or WebM/Opus (MediaRecorder, small files for long sets).
(function () {
  const DJ = window.DJ;
  const { el } = DJ;

  const canMasterSink = typeof AudioContext !== 'undefined' && 'setSinkId' in AudioContext.prototype;
  const canPhonesSink = typeof HTMLMediaElement !== 'undefined' && 'setSinkId' in HTMLMediaElement.prototype;

  function wavBlob(chunks, frames, sr) {
    // chunks: interleaved Int16Array pieces
    const bytes = frames * 4, buf = new ArrayBuffer(44), v = new DataView(buf);
    const w = (o, s) => { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); };
    w(0, 'RIFF'); v.setUint32(4, 36 + bytes, true); w(8, 'WAVE'); w(12, 'fmt ');
    v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 2, true); v.setUint32(24, sr, true);
    v.setUint32(28, sr * 4, true); v.setUint16(32, 4, true); v.setUint16(34, 16, true); w(36, 'data'); v.setUint32(40, bytes, true);
    return new Blob([buf, ...chunks], { type: 'audio/wav' });
  }

  DJ.io = {
    recording: false,
    async init(engine) {
      this.engine = engine;
      const bar = document.getElementById('topbar');
      this.fmt = el('select', { 'aria-label': 'Recording format', title: 'WAV: lossless, ~10 MB/min. WebM: Opus, ~2 MB/min.' },
        el('option', { value: 'wav' }, 'WAV'), el('option', { value: 'webm', disabled: typeof MediaRecorder === 'undefined' }, 'WebM'));
      this.fmt.value = DJ.store.get('rec.format', 'wav');
      this.fmt.addEventListener('change', () => DJ.store.set('rec.format', this.fmt.value));
      this.recBtn = DJ.button({ id: 'record', label: 'Rec', cls: 'small rec', title: 'Record the master output (F8)', onPress: () => this.toggleRecord() });
      this.recTime = el('span', { class: 'rec-time', 'aria-live': 'off' }, '');
      const out = DJ.button({ label: 'Audio', cls: 'small ghost', title: 'Output devices and headphone cue', onPress: () => this.openSettings() });
      bar.append(el('div', { class: 'top-group' }, this.recBtn.el, this.fmt, this.recTime), out.el);

      engine.limiter.port.addEventListener('message', (e) => this.onRec(e.data));
      // Restore saved outputs if those devices are still around.
      const savedMaster = DJ.store.get('out.master', ''), savedPhones = DJ.store.get('out.phones', '');
      if (savedMaster && canMasterSink) this.setMaster(savedMaster, true);
      if (savedPhones && canPhonesSink) this.setPhones(savedPhones, true);
      if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) navigator.mediaDevices.addEventListener('devicechange', () => { if (this.modal) this.renderSettings(); });
    },

    // ----------------------------------------------------------- outputs
    async outputs() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return [];
      try { return (await navigator.mediaDevices.enumerateDevices()).filter((d) => d.kind === 'audiooutput'); } catch (e) { return []; }
    },
    async setMaster(id, quiet) {
      try {
        await this.engine.ctx.setSinkId(id === 'default' ? '' : id);
        DJ.store.set('out.master', id);
        if (!quiet) DJ.toast('Master output changed', { kind: 'ok' });
      } catch (e) { if (!quiet) DJ.toast('Couldn’t switch the master output: ' + e.message, { kind: 'error' }); }
    },
    async setPhones(id, quiet) {
      const eng = this.engine;
      if (!id) {
        if (this.phonesEl) { this.phonesEl.pause(); this.phonesEl.srcObject = null; }
        if (this.phonesDest) { try { eng.phones.disconnect(this.phonesDest); } catch (e) {} }
        DJ.store.set('out.phones', '');
        return;
      }
      try {
        if (!this.phonesDest) this.phonesDest = eng.ctx.createMediaStreamDestination();
        eng.phones.connect(this.phonesDest);
        if (!this.phonesEl) { this.phonesEl = new Audio(); this.phonesEl.autoplay = true; }
        this.phonesEl.srcObject = this.phonesDest.stream;
        await this.phonesEl.setSinkId(id === 'default' ? '' : id);
        await this.phonesEl.play().catch(() => {});
        DJ.store.set('out.phones', id);
        if (!quiet) DJ.toast('Headphones on. Press CUE on a channel to hear it there.', { kind: 'ok' });
      } catch (e) {
        if (!quiet) DJ.toast('Couldn’t use that headphone output: ' + e.message, { kind: 'error' });
      }
    },
    openSettings() {
      if (this.modal) { this.modal.remove(); this.modal = null; return; }
      this.modal = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Audio settings' }, el('div', { class: 'card' }));
      this.modal.addEventListener('click', (e) => { if (e.target === this.modal) { this.modal.remove(); this.modal = null; } });
      document.body.appendChild(this.modal);
      this.renderSettings();
    },
    async renderSettings() {
      if (!this.modal) return;
      const card = this.modal.querySelector('.card');
      const outs = await this.outputs();
      const named = outs.some((o) => o.label);
      const opts = (sel, withNone) => [
        withNone ? el('option', { value: '' }, 'Off') : null,
        ...outs.map((o) => el('option', { value: o.deviceId, selected: o.deviceId === sel }, o.label || (o.deviceId === 'default' ? 'System default' : 'Output ' + o.deviceId.slice(0, 6)))),
      ];
      const masterSel = el('select', { id: 'out-master', disabled: !canMasterSink, onchange: (e) => this.setMaster(e.target.value) }, ...opts(DJ.store.get('out.master', 'default')));
      const phonesSel = el('select', { id: 'out-phones', disabled: !canPhonesSink, onchange: (e) => this.setPhones(e.target.value) }, ...opts(DJ.store.get('out.phones', ''), true));
      const ctx = this.engine.ctx;
      card.innerHTML = '';
      card.append(
        el('div', { class: 'modal-head' }, el('h2', null, 'Audio'), el('button', { class: 'btn small ghost', type: 'button', onclick: () => { this.modal.remove(); this.modal = null; } }, 'Close')),
        el('div', { class: 'form-row' }, el('label', { for: 'out-master' }, 'Master output'), masterSel),
        !canMasterSink ? el('p', { class: 'note' }, 'This browser can’t pick an output for Web Audio. Master plays through the system default. (Chrome and Edge can.)') : null,
        el('div', { class: 'form-row' }, el('label', { for: 'out-phones' }, 'Headphones (cue)'), phonesSel),
        !canPhonesSink ? el('p', { class: 'note' }, 'This browser can’t send audio to a second device, so there’s no separate headphone cue.') :
          el('p', { class: 'note' }, 'Pick a different device from the master, e.g. the headphone output of a USB DJ interface. Use the CUE buttons on the mixer and the Cue / Mst and Phones knobs to set what you hear.'),
        !named && outs.length ? el('div', null, el('p', { class: 'note' }, 'Device names are hidden until you allow access. The browser will ask for the microphone. Nothing is recorded; it only unlocks the names.'),
          el('button', { class: 'btn small', type: 'button', onclick: async () => {
            try {
              if (navigator.mediaDevices.selectAudioOutput) await navigator.mediaDevices.selectAudioOutput();
              else { const s = await navigator.mediaDevices.getUserMedia({ audio: true }); s.getTracks().forEach((t) => t.stop()); }
            } catch (e) { DJ.toast('Permission wasn’t given, so names stay hidden.', { kind: 'warn' }); }
            this.renderSettings();
          } }, 'Show device names')) : null,
        el('p', { class: 'note' }, `Engine: ${ctx.sampleRate / 1000} kHz, output latency ≈ ${(((ctx.baseLatency || 0) + (ctx.outputLatency || 0)) * 1000).toFixed(0)} ms. Waveforms are delay-compensated.`));
    },

    // ---------------------------------------------------------- recording
    toggleRecord() { this.recording ? this.stopRecord() : this.startRecord(); },
    startRecord() {
      const eng = this.engine;
      eng.resume();
      this.format = this.fmt.value;
      this.t0 = performance.now();
      if (this.format === 'webm') {
        if (!this.recDest) { this.recDest = eng.ctx.createMediaStreamDestination(); eng.limiter.connect(this.recDest); }
        const mime = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'].find((m) => MediaRecorder.isTypeSupported(m));
        if (!mime) { DJ.toast('This browser can’t record compressed audio. Use WAV.', { kind: 'error' }); return; }
        this.mime = mime; this.parts = []; this.bytes = 0;
        this.mr = new MediaRecorder(this.recDest.stream, { mimeType: mime, audioBitsPerSecond: 256000 });
        this.mr.ondataavailable = (e) => { if (e.data.size) { this.parts.push(e.data); this.bytes += e.data.size; } };
        this.mr.onstop = () => this.finish(new Blob(this.parts, { type: mime.split(';')[0] }));
        this.mr.start(1000);
      } else {
        this.parts = []; this.frames = 0; this.bytes = 0;
        eng.limiter.port.postMessage({ type: 'rec', on: true });
      }
      this.recording = true;
      this.recBtn.lit(true); this.fmt.disabled = true;
      this.timer = setInterval(() => this.tick(), 250); this.tick();
    },
    onRec(m) {
      if (m.type === 'rec' && this.recording && this.format === 'wav') {
        const n = m.l.length, pcm = new Int16Array(n * 2);
        for (let i = 0; i < n; i++) {
          pcm[2 * i] = Math.max(-32768, Math.min(32767, Math.round(m.l[i] * 32767)));
          pcm[2 * i + 1] = Math.max(-32768, Math.min(32767, Math.round(m.r[i] * 32767)));
        }
        this.parts.push(pcm); this.frames += n; this.bytes += n * 4;
      } else if (m.type === 'recEnd' && this.format === 'wav' && this.waitEnd) {
        const done = this.waitEnd; this.waitEnd = null; done();
      }
    },
    tick() {
      const s = (performance.now() - this.t0) / 1000;
      this.recTime.textContent = DJ.fmtTime(s) + (this.bytes ? ' · ' + DJ.fmtBytes(this.bytes) : '');
      // Long WAV takes lots of memory: nudge at 90 minutes.
      if (this.format === 'wav' && s > 5400 && !this.warned) { this.warned = true; DJ.toast('Long WAV recordings use a lot of memory. For sets over 2 hours, record WebM.', { kind: 'warn', ms: 10000 }); }
    },
    stopRecord() {
      if (!this.recording) return;
      this.recording = false;
      clearInterval(this.timer);
      this.recBtn.lit(false); this.fmt.disabled = false;
      if (this.format === 'webm') { this.mr.stop(); return; }
      this.waitEnd = () => this.finish(wavBlob(this.parts, this.frames, this.engine.ctx.sampleRate));
      this.engine.limiter.port.postMessage({ type: 'rec', on: false });
    },
    finish(blob) {
      const d = new Date(), pad = (n) => String(n).padStart(2, '0');
      const ext = this.format === 'wav' ? 'wav' : /ogg/.test(blob.type) ? 'ogg' : /mp4/.test(blob.type) ? 'm4a' : 'webm';
      const name = `Deckhand mix ${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}${pad(d.getMinutes())}.${ext}`;
      this.lastBlob = blob; this.lastName = name;
      this.parts = [];
      this.recTime.textContent = '';
      const url = DJ.download(blob, name);
      const again = el('button', { class: 'link', type: 'button', onclick: () => DJ.download(blob, name) }, 'Download again');
      DJ.toast(el('span', null, `Saved ${name} (${DJ.fmtBytes(blob.size)}). `, again), { kind: 'ok', ms: 15000 });
      return url;
    },
  };
})();
