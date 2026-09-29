// Fake Web MIDI controller for tests: window.__midi.send([status, d1, d2]).
(() => {
  const listeners = []; const input = { id: 'mock1', name: 'Mock DJ Controller', type: 'input', state: 'connected', connection: 'open',
    addEventListener: (t, f) => { if (t === 'midimessage') listeners.push(f); } };
  const access = { inputs: new Map([['mock1', input]]), outputs: new Map(), addEventListener() {} };
  navigator.requestMIDIAccess = async () => access;
  const origQuery = navigator.permissions.query.bind(navigator.permissions);
  navigator.permissions.query = (d) => d && d.name === 'midi' ? Promise.resolve({ state: 'granted' }) : origQuery(d);
  window.__midi = { send: (bytes) => listeners.forEach((f) => f({ data: new Uint8Array(bytes) })) };
})();
