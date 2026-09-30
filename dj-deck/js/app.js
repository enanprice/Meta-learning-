// Boot: build the engine, then the UI, then the optional modules.
(function () {
  const DJ = window.DJ;

  // Show unexpected errors on screen instead of failing silently.
  const shown = new Set();
  const report = (msg) => { if (!msg || shown.has(msg)) return; shown.add(msg); DJ.toast('Something went wrong: ' + msg, { kind: 'error', ms: 12000 }); };
  window.addEventListener('error', (e) => report(e.message));
  window.addEventListener('unhandledrejection', (e) => report(e.reason && (e.reason.message || String(e.reason))));

  // iPhone/iPad: without this, the ring/silent switch mutes Web Audio.
  function unlockIOS() {
    try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
  }

  async function boot() {
    const status = document.getElementById('top-status');
    let engine;
    try {
      engine = await new DJ.Engine().init();
    } catch (e) {
      status.textContent = 'Audio failed to start';
      document.getElementById('main').innerHTML = '';
      document.getElementById('main').append(DJ.el('div', { class: 'deck', style: 'max-width:640px;margin:40px auto' },
        DJ.el('h2', { text: 'This browser can’t run the audio engine' }),
        DJ.el('p', { text: (e.name ? e.name + ': ' : '') + e.message }),
        DJ.el('p', { class: 'note', text: 'Deckhand needs Web Audio with AudioWorklet: current Chrome, Edge, Firefox or Safari.' })));
      console.error(e);
      return;
    }
    DJ.engine = engine;
    DJ.ui.init(engine);
    for (const mod of [DJ.keyboard, DJ.midi, DJ.io, DJ.library]) {
      if (!mod) continue;
      try { await mod.init(engine); } catch (e) { console.error(e); DJ.toast('A module failed to start: ' + e.message, { kind: 'error' }); }
    }

    const ctx = engine.ctx;
    const showStatus = () => {
      const lat = ((ctx.baseLatency || 0) + (ctx.outputLatency || 0)) * 1000;
      status.textContent = `${ctx.sampleRate / 1000} kHz · ${ctx.state === 'running' ? 'audio on' : 'audio paused'}${lat ? ' · ' + lat.toFixed(0) + ' ms latency' : ''}`;
    };
    showStatus();
    ctx.addEventListener('statechange', showStatus);

    // Browsers keep audio off until the first click or key press.
    if (ctx.state !== 'running') {
      const card = DJ.el('div', { class: 'start-audio', role: 'dialog', 'aria-label': 'Start audio' },
        DJ.el('div', { class: 'card' },
          DJ.el('h2', { text: 'Start audio' }),
          DJ.el('p', { text: 'Your browser keeps sound off until you interact with the page.' }),
          DJ.el('button', { class: 'btn', type: 'button', text: 'Start', autofocus: true })));
      document.body.appendChild(card);
      const go = () => { unlockIOS(); return engine.resume().then(() => { card.remove(); showStatus(); }); };
      card.addEventListener('click', go);
      window.addEventListener('keydown', go, { once: true });
      window.addEventListener('pointerdown', go, { once: true });
      engine.on('resumed', () => card.remove());
    }
    window.addEventListener('pointerdown', unlockIOS, { once: true });
    // Something to play straight away.
    if (DJ.demo) DJ.demo.loadEmpty(engine).catch((e) => report('Demo tracks failed to load: ' + e.message));
    window.addEventListener('beforeunload', (e) => {
      if (Object.values(engine.decks).some((d) => d.playing) || (DJ.io && DJ.io.recording)) { e.preventDefault(); e.returnValue = ''; }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
