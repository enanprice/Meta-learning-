// Shared namespace and small helpers. Every other file hangs off window.DJ.
// Plain <script> tags (no ES modules) so the app runs straight from file://.
(function () {
  const DJ = (window.DJ = window.DJ || {});

  DJ.clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
  DJ.lerp = (a, b, t) => a + (b - a) * t;

  DJ.fmtTime = (sec, tenths) => {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = sec - m * 60;
    if (tenths) return m + ':' + s.toFixed(1).padStart(4, '0');
    return m + ':' + String(Math.floor(s)).padStart(2, '0');
  };

  DJ.fmtBytes = (n) => (n > 1e9 ? (n / 1e9).toFixed(2) + ' GB' : n > 1e6 ? (n / 1e6).toFixed(1) + ' MB' : Math.round(n / 1e3) + ' KB');

  // Tiny event emitter mixed into engine objects.
  DJ.Emitter = class {
    constructor() { this._h = {}; }
    on(ev, fn) { (this._h[ev] = this._h[ev] || []).push(fn); return () => this.off(ev, fn); }
    off(ev, fn) { const a = this._h[ev]; if (a) this._h[ev] = a.filter((f) => f !== fn); }
    emit(ev, ...args) { const a = this._h[ev]; if (a) for (const f of a.slice()) f(...args); }
  };

  // localStorage that never throws (private windows, blocked storage).
  DJ.store = {
    get(key, fallback) {
      try { const v = localStorage.getItem('dj.' + key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('dj.' + key, JSON.stringify(value)); return true; } catch (e) { return false; }
    },
    del(key) { try { localStorage.removeItem('dj.' + key); } catch (e) {} },
  };

  // Per-track memory: hot cues, main cue, beat-grid edits. Keyed by name+size.
  DJ.trackId = (file) => file.name + '|' + file.size;
  DJ.trackData = {
    get: (id) => DJ.store.get('track.' + id, {}),
    patch(id, patch) { const d = Object.assign(DJ.trackData.get(id), patch); DJ.store.set('track.' + id, d); return d; },
  };

  // "Artist - Title.mp3" → {artist, title}
  DJ.parseName = (name) => {
    const base = name.replace(/\.[^.]+$/, '').replace(/_/g, ' ').trim();
    const m = base.match(/^(.+?)\s+[-–—]\s+(.+)$/);
    return m ? { artist: m[1].trim(), title: m[2].trim() } : { artist: '', title: base };
  };

  DJ.AUDIO_EXT = /\.(mp3|wav|wave|flac|m4a|aac|mp4|ogg|oga|opus|webm|aif|aiff)$/i;

  // Turn a function's body into a Blob URL. Browsers refuse Worker/AudioWorklet
  // scripts from file:// URLs, but blob: URLs are fine.
  DJ.blobUrlFromFn = (fn, prelude = '') => {
    const src = prelude + '\n(' + fn.toString() + ')();';
    return URL.createObjectURL(new Blob([src], { type: 'application/javascript' }));
  };

  // AudioWorklet modules: on file:// pages Chromium only accepts data: URLs
  // here (blob: fails), while served pages may forbid data:. Try both.
  DJ.addWorkletModule = async (ctx, fn) => {
    const src = '(' + fn.toString() + ')();';
    try {
      await ctx.audioWorklet.addModule('data:text/javascript;charset=utf-8,' + encodeURIComponent(src));
    } catch (e) {
      await ctx.audioWorklet.addModule(URL.createObjectURL(new Blob([src], { type: 'text/javascript' })));
    }
  };

  // Save a Blob as a file (a normal browser download).
  DJ.download = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = DJ.el('a', { href: url, download: name });
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    return url;
  };

  // Toasts: short status messages bottom-right.
  DJ.toast = (msg, opts = {}) => {
    let box = document.getElementById('toasts');
    if (!box) { box = document.createElement('div'); box.id = 'toasts'; box.setAttribute('role', 'status'); document.body.appendChild(box); }
    const el = document.createElement('div');
    el.className = 'toast' + (opts.kind ? ' ' + opts.kind : '');
    if (typeof msg === 'string') el.textContent = msg; else el.appendChild(msg);
    box.appendChild(el);
    const ms = opts.ms == null ? 4000 : opts.ms;
    if (ms > 0) setTimeout(() => el.remove(), ms);
    el.addEventListener('click', () => { if (!opts.sticky) el.remove(); });
    return el;
  };

  DJ.el = (tag, attrs, ...kids) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
      else if (k === 'style') e.style.cssText = v;
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) e.append(kid.nodeType ? kid : String(kid));
    return e;
  };
})();
