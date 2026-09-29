// Keyboard shortcuts. Deck A sits under the left hand, deck B under the
// right. Uses physical key positions (event.code) so it works on AZERTY etc.
// Press ? for the overlay.
(function () {
  const DJ = window.DJ;
  const { el } = DJ;

  const pitchStep = (id, dir) => () => { const d = DJ.engine.decks[id]; d.setPitch(d.pitch + dir * 0.001); };
  const delCue = (id, i) => () => DJ.engine.decks[id].deleteHotcue(i);

  // [code, shift, target, label, group, keyLabel]
  // target is a control id (press/release) or a function (fires on key down).
  const MAP = [];
  const deckKeys = (id, k) => {
    const g = 'Deck ' + id;
    MAP.push(
      [k.play, 0, id + '.play', 'Play / pause', g],
      [k.cue, 0, id + '.cue', 'Cue (hold to preview)', g],
      [k.sync, 0, id + '.sync', 'Sync', g],
      [k.keylock, 0, id + '.keylock', 'Key lock', g],
      [k.slow, 0, id + '.bend-', 'Nudge slower (hold)', g],
      [k.fast, 0, id + '.bend+', 'Nudge faster (hold)', g],
      [k.slow, 1, pitchStep(id, -1), 'Pitch −0.1%', g],
      [k.fast, 1, pitchStep(id, 1), 'Pitch +0.1%', g],
      [k.loop, 0, id + '.loop.4', '4-beat loop on / off', g],
      [k.reloop, 0, id + '.loop.reloop', 'Exit loop / reloop', g],
      [k.loop, 1, id + '.loop.halve', 'Halve loop', g],
      [k.reloop, 1, id + '.loop.double', 'Double loop', g],
      [k.tap, 0, id + '.grid.tap', 'Tap tempo', g],
      [k.kill, 0, id + '.kill.low', 'Bass kill', g],
    );
    k.cues.forEach((code, i) => {
      MAP.push([code, 0, `${id}.hotcue.${i + 1}`, `Hot cue ${i + 1}`, g, null, true]);
      MAP.push([code, 1, delCue(id, i), `Delete hot cue ${i + 1}`, g, null, true]);
    });
  };
  deckKeys('A', { play: 'KeyF', cue: 'KeyD', sync: 'KeyS', keylock: 'KeyG', slow: 'KeyZ', fast: 'KeyX', loop: 'KeyC', reloop: 'KeyV', tap: 'KeyT', kill: 'KeyA', cues: ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'KeyQ', 'KeyW', 'KeyE', 'KeyR'] });
  deckKeys('B', { play: 'KeyJ', cue: 'KeyK', sync: 'KeyL', keylock: 'KeyH', slow: 'KeyN', fast: 'KeyM', loop: 'Comma', reloop: 'Period', tap: 'KeyY', kill: 'Quote', cues: ['Digit7', 'Digit8', 'Digit9', 'Digit0', 'KeyU', 'KeyI', 'KeyO', 'KeyP'] });
  MAP.push(
    ['ArrowLeft', 0, () => DJ.controls.nudge('xfader', -0.05), 'Crossfader left', 'Mixer & library', '←'],
    ['ArrowRight', 0, () => DJ.controls.nudge('xfader', 0.05), 'Crossfader right', 'Mixer & library', '→'],
    ['Backslash', 0, () => DJ.controls.set('xfader', 0.5), 'Crossfader centre', 'Mixer & library', '\\'],
    ['ArrowUp', 0, () => DJ.library && DJ.library.move(-1), 'Library: previous track', 'Mixer & library', '↑'],
    ['ArrowDown', 0, () => DJ.library && DJ.library.move(1), 'Library: next track', 'Mixer & library', '↓'],
    ['ArrowLeft', 1, () => DJ.library && DJ.library.loadSelected('A'), 'Load selected track to A', 'Mixer & library', 'Shift ←'],
    ['ArrowRight', 1, () => DJ.library && DJ.library.loadSelected('B'), 'Load selected track to B', 'Mixer & library', 'Shift →'],
    ['Slash', 0, () => DJ.library && DJ.library.focusSearch(), 'Search the library', 'Mixer & library', '/'],
    ['F8', 0, () => DJ.io && DJ.io.toggleRecord(), 'Start / stop recording', 'App', 'F8'],
    ['F9', 0, () => DJ.midi && DJ.midi.toggleLearn(), 'MIDI learn on / off', 'App', 'F9'],
  );

  const pretty = (code) => code.replace(/^Key/, '').replace(/^Digit/, '')
    .replace('Comma', ',').replace('Period', '.').replace('Quote', "'").replace('Slash', '/').replace('Backslash', '\\');

  let overlay = null;
  const held = new Map(); // code → control id, for release on keyup

  function toggleOverlay(show) {
    if (show === undefined) show = !overlay;
    if (!show) { if (overlay) { overlay.remove(); overlay = null; } return; }
    const groups = {};
    for (const [code, shift, , label, group, keyLabel, cueRow] of MAP) {
      if (cueRow) continue;
      (groups[group] = groups[group] || []).push([(shift ? 'Shift ' : '') + (keyLabel || pretty(code)), label]);
    }
    groups['Deck A'].push(['1 2 3 4 Q W E R', 'Hot cues 1–8 (Shift deletes)']);
    groups['Deck B'].push(['7 8 9 0 U I O P', 'Hot cues 1–8 (Shift deletes)']);
    groups['App'].push(['?', 'This list'], ['Esc', 'Close panels, leave MIDI learn']);
    const grid = el('div', { class: 'keys-grid' });
    for (const g of ['Deck A', 'Deck B', 'Mixer & library', 'App']) {
      const dl = el('dl');
      for (const [k, l] of groups[g]) dl.append(el('dt', null, ...k.split(' ').map((x) => x === 'Shift' ? el('kbd', null, 'Shift') : el('kbd', null, x))), el('dd', null, l));
      grid.append(el('section', null, el('h3', null, g), dl));
    }
    overlay = el('div', { class: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Keyboard shortcuts' },
      el('div', { class: 'card' },
        el('div', { class: 'modal-head' }, el('h2', null, 'Keyboard shortcuts'), el('button', { class: 'btn small ghost', type: 'button', onclick: () => toggleOverlay(false) }, 'Close')),
        el('p', { class: 'note' }, 'Keys follow their position on the keyboard, so the layout works the same on QWERTZ and AZERTY. Hold-type keys (cue, nudge, momentary FX) act while held.'),
        grid));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) toggleOverlay(false); });
    document.body.appendChild(overlay);
    overlay.querySelector('button').focus();
  }

  function typing(t) {
    return t && (t.tagName === 'INPUT' && !/^(range|button|checkbox|radio)$/.test(t.type) || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
  }

  DJ.keyboard = {
    MAP,
    toggleOverlay,
    init() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (overlay) { toggleOverlay(false); e.preventDefault(); return; }
          document.querySelectorAll('.modal').forEach((m) => m.remove());
          if (DJ.midi && DJ.learn && DJ.learn.active) DJ.midi.toggleLearn(false);
          if (typing(e.target)) e.target.blur();
          return;
        }
        if (typing(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
        if (e.key === '?') { toggleOverlay(); e.preventDefault(); return; }
        if (overlay || document.querySelector('.modal')) return;
        if (DJ.learn && DJ.learn.active) return;
        const hit = MAP.find(([code, shift]) => code === e.code && !!shift === e.shiftKey);
        if (!hit) return;
        e.preventDefault();
        if (e.repeat) return;
        const target = hit[2];
        if (typeof target === 'function') { target(); return; }
        DJ.controls.press(target);
        held.set(e.code, target);
      });
      document.addEventListener('keyup', (e) => {
        const id = held.get(e.code);
        if (id) { held.delete(e.code); DJ.controls.release(id); }
      });
      // Let go of held keys if the window loses focus mid-press.
      window.addEventListener('blur', () => { for (const id of held.values()) DJ.controls.release(id); held.clear(); });
      const btn = DJ.button({ label: '?', cls: 'small ghost', title: 'Keyboard shortcuts (?)', aria: 'Keyboard shortcuts', onPress: () => toggleOverlay() });
      document.getElementById('topbar').appendChild(btn.el);
    },
  };
})();
