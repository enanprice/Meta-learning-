// UI controls (knobs, faders, buttons) and the registry that keyboard
// shortcuts and MIDI use to drive them. Every control has a stable id like
// "A.eq.low" or "xfader", so a MIDI mapping keeps working across reloads.
(function () {
  const DJ = window.DJ;
  const { el, clamp } = DJ;

  const registry = new Map();
  DJ.controls = {
    all: registry,
    get: (id) => registry.get(id),
    add(ctl) { registry.set(ctl.id, ctl); ctl.el.dataset.ctl = ctl.id; return ctl; },
    // value in 0..1 for continuous controls
    set(id, v) { const c = registry.get(id); if (c && c.set) c.set(v, 'ext'); },
    nudge(id, dv) { const c = registry.get(id); if (c && c.set) c.set(clamp(c.value + dv, 0, 1), 'ext'); },
    press(id) { const c = registry.get(id); if (c && c.press) c.press(); },
    release(id) { const c = registry.get(id); if (c && c.release) c.release(); },
  };

  // ------------------------------------------------------------------- knob
  DJ.knob = (o) => {
    const ctl = { id: o.id, label: o.aria || o.label, kind: 'knob', value: o.value ?? 0.5, def: o.def ?? o.value ?? 0.5 };
    const face = el('div', { class: 'knob-face' }, el('div', { class: 'knob-ptr' }));
    const dial = el('div', { class: 'knob' + (o.bipolar ? ' bipolar' : ''), role: 'slider', tabindex: 0, 'aria-label': o.aria || o.label, 'aria-valuemin': 0, 'aria-valuemax': 100 }, face);
    const readout = el('span', { class: 'knob-val' });
    const wrap = el('div', { class: 'knob-wrap ' + (o.cls || '') }, dial, el('span', { class: 'lab' }, o.label), readout);
    ctl.el = wrap;
    const draw = () => {
      const v = ctl.value, deg = -135 + v * 270;
      dial.style.setProperty('--deg', deg + 'deg');
      if (o.bipolar) {
        const a = Math.min(v, 0.5) * 270, b = Math.max(v, 0.5) * 270;
        dial.style.setProperty('--a0', a + 'deg'); dial.style.setProperty('--a1', b + 'deg');
      } else { dial.style.setProperty('--a0', '0deg'); dial.style.setProperty('--a1', v * 270 + 'deg'); }
      dial.setAttribute('aria-valuenow', Math.round(v * 100));
      const txt = o.fmt ? o.fmt(v) : '';
      readout.textContent = txt; dial.setAttribute('aria-valuetext', txt || Math.round(v * 100) + '%');
    };
    ctl.set = (v, src) => { v = clamp(v, 0, 1); if (o.snap && Math.abs(v - ctl.def) < o.snap) v = ctl.def; ctl.value = v; draw(); if (o.onChange) o.onChange(v, src); };
    ctl.reset = () => ctl.set(ctl.def, 'ui');
    ctl.show = (v) => { ctl.value = clamp(v, 0, 1); draw(); }; // display only, no onChange
    let y0 = 0, v0 = 0;
    dial.addEventListener('pointerdown', (e) => {
      if (DJ.learn && DJ.learn.active) return;
      dial.setPointerCapture(e.pointerId); y0 = e.clientY; v0 = ctl.value; dial.classList.add('grab'); e.preventDefault(); dial.focus({ preventScroll: true });
    });
    dial.addEventListener('pointermove', (e) => {
      if (!dial.hasPointerCapture(e.pointerId)) return;
      const range = e.shiftKey ? 900 : 180;
      ctl.set(v0 + (y0 - e.clientY) / range, 'ui');
    });
    const end = (e) => { if (dial.hasPointerCapture(e.pointerId)) dial.releasePointerCapture(e.pointerId); dial.classList.remove('grab'); };
    dial.addEventListener('pointerup', end); dial.addEventListener('pointercancel', end);
    dial.addEventListener('dblclick', ctl.reset);
    dial.addEventListener('wheel', (e) => { e.preventDefault(); ctl.set(ctl.value - Math.sign(e.deltaY) * (e.shiftKey ? 0.005 : 0.025), 'ui'); }, { passive: false });
    dial.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 0.05 : 0.01;
      const k = e.key;
      if (k === 'ArrowUp' || k === 'ArrowRight') ctl.set(ctl.value + step, 'ui');
      else if (k === 'ArrowDown' || k === 'ArrowLeft') ctl.set(ctl.value - step, 'ui');
      else if (k === 'Home') ctl.set(0, 'ui'); else if (k === 'End') ctl.set(1, 'ui');
      else if (k === 'Delete' || k === 'Backspace') ctl.reset();
      else return;
      e.preventDefault(); e.stopPropagation();
    });
    draw();
    return DJ.controls.add(ctl);
  };

  // ------------------------------------------------------------------ fader
  // orient: 'v' (value 1 at the top unless `invert`) or 'h'.
  DJ.fader = (o) => {
    const ctl = { id: o.id, label: o.aria || o.label, kind: 'fader', value: o.value ?? 0.5, def: o.def ?? o.value ?? 0.5 };
    const cap = el('div', { class: 'fader-cap' });
    const track = el('div', { class: 'fader-track' }, el('div', { class: 'fader-slot' }), o.marks ? o.marks() : null, cap);
    const f = el('div', { class: `fader ${o.orient === 'h' ? 'h' : 'v'} ${o.cls || ''}`, role: 'slider', tabindex: 0, 'aria-label': o.aria || o.label, 'aria-orientation': o.orient === 'h' ? 'horizontal' : 'vertical' }, track);
    ctl.el = f;
    const pos = () => (o.invert ? 1 - ctl.value : ctl.value);
    const draw = () => {
      f.style.setProperty('--p', pos());
      f.setAttribute('aria-valuenow', Math.round(ctl.value * 100));
      if (o.fmt) f.setAttribute('aria-valuetext', o.fmt(ctl.value));
    };
    ctl.set = (v, src) => { v = clamp(v, 0, 1); if (o.snap && Math.abs(v - ctl.def) < o.snap) v = ctl.def; ctl.value = v; draw(); if (o.onChange) o.onChange(v, src); };
    ctl.reset = () => ctl.set(ctl.def, 'ui');
    ctl.show = (v) => { ctl.value = clamp(v, 0, 1); draw(); };
    const fromEvent = (e) => {
      const r = track.getBoundingClientRect();
      const capSize = o.orient === 'h' ? cap.offsetWidth : cap.offsetHeight;
      let t = o.orient === 'h' ? (e.clientX - r.left - capSize / 2) / (r.width - capSize) : 1 - (e.clientY - r.top - capSize / 2) / (r.height - capSize);
      t = clamp(t, 0, 1);
      return o.invert ? 1 - t : t;
    };
    let grabOffset = null, start = 0, startV = 0;
    f.addEventListener('pointerdown', (e) => {
      if (DJ.learn && DJ.learn.active) return;
      f.setPointerCapture(e.pointerId); e.preventDefault(); f.focus({ preventScroll: true });
      start = o.orient === 'h' ? e.clientX : e.clientY; startV = ctl.value;
      // Grabbing the cap drags relative to it; clicking the track jumps.
      grabOffset = e.target === cap ? 0 : null;
      if (grabOffset === null) { ctl.set(fromEvent(e), 'ui'); startV = ctl.value; }
      f.classList.add('grab');
    });
    f.addEventListener('pointermove', (e) => {
      if (!f.hasPointerCapture(e.pointerId)) return;
      const r = track.getBoundingClientRect();
      const capSize = o.orient === 'h' ? cap.offsetWidth : cap.offsetHeight;
      const span = (o.orient === 'h' ? r.width : r.height) - capSize;
      let d = ((o.orient === 'h' ? e.clientX : e.clientY) - start) / span;
      if (o.orient !== 'h') d = -d;
      if (o.invert) d = -d;
      if (e.shiftKey) d /= 5;
      ctl.set(startV + d, 'ui');
    });
    const end = (e) => { if (f.hasPointerCapture(e.pointerId)) f.releasePointerCapture(e.pointerId); f.classList.remove('grab'); };
    f.addEventListener('pointerup', end); f.addEventListener('pointercancel', end);
    f.addEventListener('dblclick', ctl.reset);
    f.addEventListener('keydown', (e) => {
      const step = (e.shiftKey ? 0.05 : 0.01) * (o.invert ? -1 : 1);
      const k = e.key;
      if (k === 'ArrowUp' || k === 'ArrowRight') ctl.set(ctl.value + step, 'ui');
      else if (k === 'ArrowDown' || k === 'ArrowLeft') ctl.set(ctl.value - step, 'ui');
      else if (k === 'Delete' || k === 'Backspace') ctl.reset();
      else return;
      e.preventDefault(); e.stopPropagation();
    });
    draw();
    return DJ.controls.add(ctl);
  };

  // ----------------------------------------------------------------- button
  // hold: true fires onRelease when let go (cue, bend). Registered buttons
  // can be driven by keys and MIDI through press()/release().
  DJ.button = (o) => {
    const b = el('button', { class: 'btn ' + (o.cls || ''), type: 'button', title: o.title || null, 'aria-label': o.aria || null }, o.html ? null : o.label);
    if (o.html) b.innerHTML = o.html;
    const ctl = { id: o.id, label: o.aria || o.title || o.label, kind: 'button', el: b };
    ctl.press = (e) => { b.classList.add('down'); if (o.onPress) o.onPress(e || {}); };
    ctl.release = (e) => { b.classList.remove('down'); if (o.onRelease) o.onRelease(e || {}); };
    ctl.lit = (on) => { b.classList.toggle('on', !!on); if (o.toggle) b.setAttribute('aria-pressed', String(!!on)); };
    if (o.toggle) b.setAttribute('aria-pressed', 'false');
    let down = false;
    b.addEventListener('pointerdown', (e) => {
      if (DJ.learn && DJ.learn.active) return;
      if (e.button !== 0) return;
      down = true; b.setPointerCapture && b.setPointerCapture(e.pointerId); ctl.press(e);
    });
    const up = (e) => { if (!down) return; down = false; ctl.release(e); };
    b.addEventListener('pointerup', up); b.addEventListener('pointercancel', up); b.addEventListener('lostpointercapture', up);
    // Keyboard activation (Enter/Space) arrives as click with detail 0.
    b.addEventListener('click', (e) => { if (e.detail === 0 && !(DJ.learn && DJ.learn.active)) { ctl.press(e); ctl.release(e); } });
    if (o.onContext) b.addEventListener('contextmenu', (e) => { e.preventDefault(); o.onContext(e); });
    return o.id ? DJ.controls.add(ctl) : ctl;
  };

  // Segmented choice (e.g. crossfader curve). Not MIDI-mapped as a whole;
  // each option is its own registered button.
  DJ.segmented = (o) => {
    const wrap = el('div', { class: 'seg ' + (o.cls || ''), role: 'group', 'aria-label': o.label });
    const btns = o.options.map(([val, label]) => {
      const c = DJ.button({ id: o.id ? `${o.id}.${val}` : null, label, cls: 'seg-btn', toggle: true, onPress: () => o.onChange(val) });
      wrap.appendChild(c.el);
      return [val, c];
    });
    return { el: wrap, update: (v) => btns.forEach(([val, c]) => c.lit(val === v)) };
  };
})();
