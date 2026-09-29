// Web MIDI: detect controllers (and hot-plugging), MIDI learn, and mappings
// saved per device in localStorage.
//
// Learn: press F9 or the MIDI button → "Learn", click any control on screen,
// then move a knob / press a pad on the controller. Knobs and faders learn
// absolute CC or pitch-bend; jog wheels learn relative CC; buttons learn
// notes or CCs.
(function () {
  const DJ = window.DJ;
  const { el } = DJ;
  const learn = (DJ.learn = { active: false, target: null });

  // maps[deviceName][msgKey] = { ctl, mode }   mode: abs | rel2c | rel64
  let maps = DJ.store.get('midi.maps', {});
  const save = () => DJ.store.set('midi.maps', maps);
  const btnState = new Map(); // msgKey → pressed, so CC buttons fire once per press

  function parse(data) {
    const st = data[0], type = st & 0xf0, ch = (st & 0x0f) + 1;
    if (type === 0x90) return { kind: 'note', ch, num: data[1], val: data[2] };
    if (type === 0x80) return { kind: 'note', ch, num: data[1], val: 0 };
    if (type === 0xb0) return { kind: 'cc', ch, num: data[1], val: data[2] };
    if (type === 0xe0) return { kind: 'pb', ch, num: 0, val: (data[2] << 7) | data[1] };
    return null;
  }
  const keyOf = (m) => `${m.kind}:${m.ch}:${m.num}`;
  const describe = (k) => { const [kind, ch, num] = k.split(':'); return kind === 'note' ? `Note ${num} · ch ${ch}` : kind === 'cc' ? `CC ${num} · ch ${ch}` : `Pitch bend · ch ${ch}`; };

  function apply(map, m, key) {
    const c = DJ.controls.get(map.ctl);
    if (!c) return;
    if (c.kind === 'jog') {
      if (m.kind !== 'cc') return;
      const ticks = map.mode === 'rel64' ? m.val - 64 : m.val < 64 ? m.val : m.val - 128;
      if (ticks) c.jog(ticks);
      return;
    }
    if (c.kind === 'knob' || c.kind === 'fader') {
      if (map.mode === 'rel2c' || map.mode === 'rel64') {
        const t = map.mode === 'rel64' ? m.val - 64 : m.val < 64 ? m.val : m.val - 128;
        c.set(DJ.clamp(c.value + t / 128, 0, 1), 'midi');
      } else if (m.kind === 'pb') c.set(m.val / 16383, 'midi');
      else if (m.kind === 'cc') c.set(m.val / 127, 'midi');
      else if (m.kind === 'note' && m.val > 0) c.reset && c.reset();
      return;
    }
    // buttons: note on/off or CC 127/0
    const down = m.val > 0, was = btnState.get(key) || false;
    if (down && !was) c.press && c.press({});
    if (!down && was) c.release && c.release({});
    btnState.set(key, down);
  }

  const DJmidi = (DJ.midi = {
    access: null, lastMsg: null,
    get maps() { return maps; },
    async init() {
      this.btn = DJ.button({ html: '<span class="dot"></span>MIDI', cls: 'small ghost', title: 'MIDI controllers and mapping (F9 toggles learn)', onPress: () => this.openPanel() });
      document.getElementById('topbar').appendChild(this.btn.el);
      this.refreshButton();
      if (!navigator.requestMIDIAccess) return;
      // Only ask straight away if permission was granted before; otherwise wait
      // for a click so the browser prompt makes sense.
      let state = 'prompt';
      try { state = (await navigator.permissions.query({ name: 'midi' })).state; } catch (e) {}
      if (state === 'granted') await this.enable(true);
      document.addEventListener('pointerdown', (e) => this.captureTarget(e), true);
    },
    async enable(quiet) {
      if (this.access) return true;
      if (!navigator.requestMIDIAccess) { if (!quiet) DJ.toast('This browser has no Web MIDI. Use Chrome, Edge or Opera (Firefox needs a site permission add-on).', { kind: 'warn', ms: 8000 }); return false; }
      try {
        this.access = await navigator.requestMIDIAccess({ sysex: false });
      } catch (e) {
        if (!quiet) DJ.toast('MIDI access was blocked. Allow MIDI for this page in the browser’s site settings.', { kind: 'error', ms: 8000 });
        return false;
      }
      const seen = new Set();
      const hook = () => {
        for (const input of this.access.inputs.values()) {
          if (!seen.has(input.id)) { seen.add(input.id); input.addEventListener('midimessage', (e) => this.onMessage(input, e.data)); }
        }
        this.refreshButton(); if (this.panel) this.renderPanel();
      };
      this.access.addEventListener('statechange', (e) => {
        const p = e.port;
        if (p.type === 'input' && (p.state === 'connected' || p.state === 'disconnected') && e.port.connection !== 'pending') {
          if (p.state === 'connected' && !seen.has(p.id)) DJ.toast(`MIDI connected: ${p.name}${maps[p.name] ? ' (mapping loaded)' : ''}`, { kind: 'ok' });
          if (p.state === 'disconnected') DJ.toast(`MIDI disconnected: ${p.name}`, { kind: 'warn' });
        }
        hook();
      });
      hook();
      const names = this.inputs().map((i) => i.name);
      if (names.length && !quiet) DJ.toast('MIDI ready: ' + names.join(', '), { kind: 'ok' });
      return true;
    },
    inputs() { return this.access ? [...this.access.inputs.values()].filter((i) => i.state === 'connected') : []; },
    refreshButton() {
      const n = this.inputs().length;
      const dot = this.btn.el.querySelector('.dot');
      dot.classList.toggle('on', n > 0);
      this.btn.el.lastChild.textContent = n ? `MIDI · ${n}` : 'MIDI';
      this.btn.el.title = n ? 'Connected: ' + this.inputs().map((i) => i.name).join(', ') : 'No MIDI controller connected';
    },

    onMessage(input, data) {
      const m = parse(data);
      if (!m) return;
      const key = keyOf(m);
      this.lastMsg = { device: input.name, key, val: m.val };
      if (learn.active) { if (learn.target && (m.kind !== 'note' || m.val > 0)) this.bind(input.name, key, m); if (this.panel) this.renderPanel(); return; }
      const map = (maps[input.name] && maps[input.name][key]) || (maps['*'] && maps['*'][key]);
      if (map) apply(map, m, key);
    },
    bind(device, key, m) {
      const id = learn.target, c = DJ.controls.get(id);
      if (!c) return;
      if ((c.kind === 'knob' || c.kind === 'fader') && m.kind === 'note') { this.learnHint(`That was a button. Move a knob or fader for ${c.label}.`); return; }
      if (c.kind === 'jog' && m.kind !== 'cc') { this.learnHint('Jog wheels need a CC message. Turn the wheel.'); return; }
      let mode = 'abs';
      if (c.kind === 'jog') mode = m.val >= 56 && m.val <= 72 ? 'rel64' : 'rel2c';
      maps[device] = maps[device] || {};
      maps[device][key] = { ctl: id, mode };
      save();
      this.learnHint(`${describe(key)} → ${c.label || id}. Click the next control.`);
      document.querySelectorAll('.learn-target').forEach((e) => e.classList.remove('learn-target'));
      this.markMapped();
      learn.target = null;
    },
    unbindControl(id) {
      for (const d in maps) for (const k in maps[d]) if (maps[d][k].ctl === id) delete maps[d][k];
      save(); this.markMapped();
    },

    // ------------------------------------------------------------ learn mode
    toggleLearn(on) {
      on = on === undefined ? !learn.active : on;
      if (on && !this.access) { this.enable().then((ok) => { if (ok) this.toggleLearn(true); }); return; }
      learn.active = on; learn.target = null;
      document.body.classList.toggle('learning', on);
      document.querySelectorAll('.learn-target').forEach((e) => e.classList.remove('learn-target'));
      if (this.bar) { this.bar.remove(); this.bar = null; }
      if (on) {
        this.hintEl = el('span', null, this.inputs().length ? 'Click a control, then move or press the one you want on your controller.' : 'No controller found. Plug one in; it is picked up automatically.');
        this.bar = el('div', { class: 'learn-bar', role: 'status' }, el('strong', null, 'MIDI learn'), this.hintEl,
          el('button', { class: 'btn small', type: 'button', onclick: () => this.toggleLearn(false) }, 'Done'));
        document.body.appendChild(this.bar);
        this.markMapped();
      }
      if (this.panel) this.renderPanel();
    },
    learnHint(t) { if (this.hintEl) this.hintEl.textContent = t; },
    markMapped() {
      const mapped = new Set(); for (const d in maps) for (const k in maps[d]) mapped.add(maps[d][k].ctl);
      document.querySelectorAll('[data-ctl]').forEach((e) => e.classList.toggle('mapped', mapped.has(e.dataset.ctl)));
    },
    captureTarget(e) {
      if (!learn.active) return;
      if (e.target.closest('.learn-bar, .modal')) return;
      const t = e.target.closest('[data-ctl]');
      e.preventDefault(); e.stopPropagation();
      if (!t) return;
      document.querySelectorAll('.learn-target').forEach((x) => x.classList.remove('learn-target'));
      t.classList.add('learn-target');
      learn.target = t.dataset.ctl;
      const c = DJ.controls.get(learn.target);
      this.learnHint(`${c.label || learn.target}: ${c.kind === 'jog' ? 'turn the jog wheel' : c.kind === 'button' ? 'press a pad or button' : 'move a knob or fader'}. Right-click it to clear its mapping.`);
    },

    // ------------------------------------------------------------ panel
    openPanel() {
      if (this.panel) { this.panel.remove(); this.panel = null; return; }
      this.panel = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'MIDI' }, el('div', { class: 'card' }));
      this.panel.addEventListener('click', (e) => { if (e.target === this.panel) this.closePanel(); });
      document.body.appendChild(this.panel);
      this.renderPanel();
    },
    closePanel() { if (this.panel) { this.panel.remove(); this.panel = null; } },
    renderPanel() {
      const card = this.panel.querySelector('.card');
      card.innerHTML = '';
      const ins = this.inputs();
      const rows = [];
      for (const dev in maps) for (const k in maps[dev]) rows.push([dev, k, maps[dev][k]]);
      rows.sort((a, b) => a[2].ctl.localeCompare(b[2].ctl));
      const table = el('table', { class: 'midi-table' },
        el('thead', null, el('tr', null, el('th', null, 'Control'), el('th', null, 'Message'), el('th', null, 'Device'), el('th', null, 'Mode'), el('th', null, ''))),
        el('tbody', null, rows.map(([dev, k, m]) => {
          const c = DJ.controls.get(m.ctl);
          const mode = el('select', { 'aria-label': 'Mode', onchange: (e) => { maps[dev][k].mode = e.target.value; save(); } },
            ...[['abs', 'Absolute'], ['rel2c', 'Relative (±)'], ['rel64', 'Relative (64)']].map(([v, l]) => el('option', { value: v, selected: m.mode === v }, l)));
          return el('tr', null, el('td', null, c ? c.label || m.ctl : m.ctl + ' (missing)'), el('td', null, el('code', null, describe(k))), el('td', null, dev), el('td', null, mode),
            el('td', null, el('button', { class: 'btn small ghost', type: 'button', onclick: () => { delete maps[dev][k]; save(); this.markMapped(); this.renderPanel(); } }, 'Remove')));
        })));
      const fileIn = el('input', { type: 'file', accept: '.json,application/json', hidden: true, onchange: async (e) => {
        try { const j = JSON.parse(await e.target.files[0].text()); if (typeof j !== 'object') throw 0; maps = Object.assign(maps, j); save(); this.renderPanel(); DJ.toast('Mapping imported', { kind: 'ok' }); }
        catch (err) { DJ.toast('That file isn’t a Deckhand MIDI mapping.', { kind: 'error' }); }
      } });
      card.append(
        el('div', { class: 'modal-head' }, el('h2', null, 'MIDI controllers'), el('button', { class: 'btn small ghost', type: 'button', onclick: () => this.closePanel() }, 'Close')),
        !navigator.requestMIDIAccess ? el('p', { class: 'note' }, 'This browser has no Web MIDI support. Chrome, Edge and Opera do; Firefox needs a site permission add-on; Safari has none.') :
        !this.access ? el('div', null, el('p', { class: 'note' }, 'Deckhand needs permission to use MIDI devices.'), el('button', { class: 'btn', type: 'button', onclick: () => this.enable().then(() => this.renderPanel()) }, 'Enable MIDI')) :
        el('div', null, el('h3', null, 'Connected'), el('p', { class: 'note' }, ins.length ? ins.map((i) => i.name + (maps[i.name] ? ` (${Object.keys(maps[i.name]).length} mappings)` : ' (not mapped yet)')).join(' · ') : 'Nothing connected. Plug in a controller; it is picked up automatically.'),
          this.lastMsg ? el('p', { class: 'note' }, `Last message: ${describe(this.lastMsg.key)} = ${this.lastMsg.val} from ${this.lastMsg.device}`) : null),
        el('div', { class: 'lib-bar' },
          el('button', { class: 'btn' + (learn.active ? ' on' : ''), type: 'button', onclick: () => { this.closePanel(); this.toggleLearn(true); } }, learn.active ? 'Learning…' : 'Start MIDI learn'),
          el('button', { class: 'btn small ghost', type: 'button', onclick: () => {
            const blob = new Blob([JSON.stringify(maps, null, 2)], { type: 'application/json' });
            DJ.download(blob, 'deckhand-midi-mapping.json');
          } }, 'Export mapping'),
          el('button', { class: 'btn small ghost', type: 'button', onclick: () => fileIn.click() }, 'Import mapping'), fileIn,
          rows.length ? el('button', { class: 'btn small ghost', type: 'button', onclick: (e) => {
            if (e.currentTarget.dataset.armed) { maps = {}; save(); this.markMapped(); this.renderPanel(); }
            else { e.currentTarget.dataset.armed = '1'; e.currentTarget.textContent = 'Click again to clear all'; }
          } }, 'Clear all') : null),
        rows.length ? table : el('p', { class: 'note' }, 'No mappings yet. Start MIDI learn, click a control on screen, then move the matching control on your hardware.'));
    },
  });

  // Right-click a control in learn mode to clear its mapping.
  document.addEventListener('contextmenu', (e) => {
    if (!learn.active) return;
    const t = e.target.closest('[data-ctl]'); if (!t) return;
    e.preventDefault(); e.stopPropagation();
    DJmidi.unbindControl(t.dataset.ctl);
    DJmidi.learnHint('Cleared the mapping for ' + (DJ.controls.get(t.dataset.ctl).label || t.dataset.ctl) + '.');
  }, true);

})();
