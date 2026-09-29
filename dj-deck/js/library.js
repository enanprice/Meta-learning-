// Track library: add a folder or files, analyse BPM/key/duration in the
// background, search, sort, double-click to load. Stored in IndexedDB.
//
// Where the browser supports it (Chrome/Edge), a folder is remembered by a
// file handle: nothing is copied, and after a reload the browser asks once
// for permission to read it again. Elsewhere the files themselves are copied
// into IndexedDB so they survive a reload.
(function () {
  const DJ = window.DJ;
  const { el } = DJ;
  const MAX_ANALYSE = 400 * 1024 * 1024;

  // ------------------------------------------------------------- IndexedDB
  const db = {
    open() {
      if (this.p) return this.p;
      this.p = new Promise((res, rej) => {
        if (!window.indexedDB) return rej(new Error('IndexedDB unavailable'));
        const r = indexedDB.open('deckhand', 1);
        r.onupgradeneeded = () => r.result.createObjectStore('tracks', { keyPath: 'id' });
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
      return this.p;
    },
    async tx(mode, fn) {
      const d = await this.open();
      return new Promise((res, rej) => {
        const t = d.transaction('tracks', mode), s = t.objectStore('tracks');
        let out; const r = fn(s); if (r) r.onsuccess = () => { out = r.result; };
        t.oncomplete = () => res(out); t.onerror = () => rej(t.error); t.onabort = () => rej(t.error);
      });
    },
    all() { return this.tx('readonly', (s) => s.getAll()); },
    put(rec) { return this.tx('readwrite', (s) => s.put(rec)); },
    del(id) { return this.tx('readwrite', (s) => s.delete(id)); },
    clear() { return this.tx('readwrite', (s) => s.clear()); },
  };

  const COLS = [
    ['title', 'Title'], ['artist', 'Artist'], ['bpm', 'BPM', 'num'], ['key', 'Key', 'num'], ['duration', 'Time', 'num'], ['added', 'Added', 'num opt'],
  ];

  const lib = (DJ.library = {
    tracks: new Map(), session: new Map(), selected: null, query: '',
    sort: DJ.store.get('lib.sort', { key: 'added', dir: -1 }),
    queue: [], busy: false,

    async init(engine) {
      this.engine = engine;
      this.build();
      try {
        for (const r of await db.all()) this.tracks.set(r.id, r);
      } catch (e) {
        this.status('Library storage is unavailable here (private window?). Tracks you add last until you close the tab.');
        this.noDb = true;
      }
      this.render();
      for (const t of this.tracks.values()) if (!t.analyzed && !t.error) this.queue.push(t.id);
      this.pump();
      engine.on('fileLoaded', (deck, file) => this.fromDeck(deck, file));
      for (const d of Object.values(engine.decks)) d.on('load', () => this.render());
    },

    // ------------------------------------------------------------- UI
    build() {
      this.search = el('input', { class: 'lib-search', type: 'search', placeholder: 'Search title, artist, key or BPM  ( / )', 'aria-label': 'Search library', id: 'lib-search' });
      this.search.addEventListener('input', () => { this.query = this.search.value.trim().toLowerCase(); this.render(); });
      this.search.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); this.move(e.key === 'ArrowDown' ? 1 : -1); }
        if (e.key === 'Enter' && this.selected) { e.preventDefault(); this.loadToDeck(this.selected, this.freeDeck()); }
      });
      this.statusEl = el('span', { class: 'lib-status', 'aria-live': 'polite' });
      this.fileIn = el('input', { type: 'file', multiple: true, accept: 'audio/*,.mp3,.wav,.flac,.m4a,.aac,.ogg,.opus,.aif,.aiff', hidden: true, id: 'lib-files' });
      this.dirIn = el('input', { type: 'file', multiple: true, webkitdirectory: true, hidden: true, id: 'lib-dir' });
      this.fileIn.addEventListener('change', () => { this.addFiles([...this.fileIn.files]); this.fileIn.value = ''; });
      this.dirIn.addEventListener('change', () => { this.addFiles([...this.dirIn.files]); this.dirIn.value = ''; });
      const addDir = DJ.button({ label: 'Add folder', cls: 'small', onPress: () => this.pickFolder() });
      const addFiles = DJ.button({ label: 'Add files', cls: 'small ghost', onPress: () => this.fileIn.click() });
      this.clearBtn = DJ.button({ label: 'Clear', cls: 'small ghost', title: 'Remove every track from the library (your files are not touched)', onPress: () => this.clearAll() });
      this.body = el('tbody');
      this.head = el('tr', null, el('th', { class: 'dot-col', 'aria-label': 'Loaded' }, ''), ...COLS.map(([k, label, cls]) => {
        const th = el('th', { class: cls || '', 'data-k': k }, el('button', { type: 'button', onclick: () => this.setSort(k) }, label));
        return th;
      }), el('th', { class: 'act' }, el('span', { class: 'sr' }, '')));
      this.table = el('table', { class: 'lib-table' }, el('thead', null, this.head), this.body);
      this.empty = el('div', { class: 'lib-empty' }, 'Your library is empty. Add a folder of music, or drop audio files here. Tracks are analysed for BPM and key in the background.');
      this.scroll = el('div', { class: 'lib-scroll' }, this.table, this.empty);
      this.root = el('section', { class: 'library', 'aria-label': 'Library' },
        el('div', { class: 'lib-bar' }, el('h2', null, 'Library'), addDir.el, addFiles.el, this.search, this.statusEl, this.clearBtn.el),
        this.scroll, this.fileIn, this.dirIn);
      this.root.addEventListener('dragover', (e) => { if (e.dataTransfer.types.includes('Files')) { e.preventDefault(); this.root.classList.add('drop'); } });
      this.root.addEventListener('dragleave', () => this.root.classList.remove('drop'));
      this.root.addEventListener('drop', (e) => { e.preventDefault(); this.root.classList.remove('drop'); this.addFiles([...e.dataTransfer.files]); });
      document.getElementById('main').appendChild(this.root);
    },
    status(t) { this.statusEl.textContent = t || ''; },
    setSort(k) {
      this.sort = this.sort.key === k ? { key: k, dir: -this.sort.dir } : { key: k, dir: k === 'added' ? -1 : 1 };
      DJ.store.set('lib.sort', this.sort); this.render();
    },
    rows() {
      const q = this.query;
      let list = [...this.tracks.values()];
      if (q) list = list.filter((t) => {
        const k = t.key ? DJ.keys.make(t.key.tonic, t.key.minor) : null;
        return (t.title + ' ' + t.artist + ' ' + t.name).toLowerCase().includes(q) || (k && (k.camelot.toLowerCase() === q || k.short.toLowerCase() === q)) || (t.bpm && String(Math.round(t.bpm)) === q);
      });
      const { key, dir } = this.sort;
      const v = (t) => key === 'key' ? (t.key ? DJ.keys.order(DJ.keys.make(t.key.tonic, t.key.minor)) : 999) : key === 'title' || key === 'artist' ? (t[key] || '').toLowerCase() : t[key] || 0;
      list.sort((a, b) => { const x = v(a), y = v(b); return (x < y ? -1 : x > y ? 1 : 0) * dir || a.title.localeCompare(b.title); });
      return list;
    },
    render() {
      clearTimeout(this.rt);
      this.rt = setTimeout(() => this._render(), 16);
    },
    _render() {
      const list = this.rows();
      this.visible = list.map((t) => t.id);
      for (const th of this.head.querySelectorAll('th[data-k]')) th.setAttribute('aria-sort', th.dataset.k === this.sort.key ? (this.sort.dir > 0 ? 'ascending' : 'descending') : 'none');
      const loaded = {}; for (const d of Object.values(this.engine.decks)) if (d.track) loaded[d.track.id] = d.id;
      const frag = document.createDocumentFragment();
      const LIMIT = 2000;
      for (const t of list.slice(0, LIMIT)) {
        const k = t.key ? DJ.keys.make(t.key.tonic, t.key.minor) : null;
        const tr = el('tr', { 'data-id': t.id, draggable: 'true', class: (t.id === this.selected ? 'sel ' : '') + (loaded[t.id] ? 'loaded-' + loaded[t.id] : '') + (t.missing ? ' missing' : '') },
          el('td', { class: 'dot-col' }, loaded[t.id] ? loaded[t.id] : ''),
          el('td', { class: 't', title: t.name }, t.title),
          el('td', { class: 't' }, t.artist || ''),
          el('td', { class: 'num' }, t.bpm ? t.bpm.toFixed(1) : t.error ? '' : t.analyzed ? '—' : '…'),
          el('td', { class: 'num', style: k ? `color:${DJ.keys.color(k)}` : null, title: k ? k.name : '' }, k ? `${k.camelot} ${k.short}` : t.analyzed || t.error ? '—' : '…'),
          t.error ? el('td', { class: 'num err', title: t.error }, 'Unreadable') : el('td', { class: 'num' }, t.duration ? DJ.fmtTime(t.duration) : ''),
          el('td', { class: 'num opt' }, new Date(t.added).toLocaleDateString()),
          el('td', { class: 'act' },
            el('button', { class: 'btn lb a', type: 'button', title: 'Load to deck A', 'data-load': 'A' }, 'A'),
            el('button', { class: 'btn lb b', type: 'button', title: 'Load to deck B', 'data-load': 'B' }, 'B')));
        if (t.error) tr.title = t.error;
        frag.appendChild(tr);
      }
      this.body.replaceChildren(frag);
      this.empty.hidden = this.tracks.size > 0;
      this.empty.textContent = this.tracks.size ? '' : 'Your library is empty. Add a folder of music, or drop audio files here. Tracks are analysed for BPM and key in the background.';
      if (this.tracks.size && !list.length) { this.empty.hidden = false; this.empty.textContent = 'No tracks match “' + this.query + '”.'; }
      if (!this.wired) {
        this.wired = true;
        this.body.addEventListener('click', (e) => {
          const tr = e.target.closest('tr'); if (!tr) return;
          const b = e.target.closest('[data-load]');
          if (b) { this.loadToDeck(tr.dataset.id, b.dataset.load, { confirm: true }); return; }
          this.select(tr.dataset.id);
        });
        this.body.addEventListener('dblclick', (e) => { const tr = e.target.closest('tr'); if (tr && !e.target.closest('[data-load]')) this.loadToDeck(tr.dataset.id, this.freeDeck()); });
        this.body.addEventListener('dragstart', (e) => { const tr = e.target.closest('tr'); if (tr) { e.dataTransfer.setData('text/x-dj-track', tr.dataset.id); e.dataTransfer.effectAllowed = 'copy'; } });
      }
      const n = this.tracks.size;
      if (!this.busy) this.status(n ? `${n} track${n === 1 ? '' : 's'}${list.length !== n ? ` · ${list.length} shown` : ''}${list.length > LIMIT ? ` (first ${LIMIT})` : ''}` : '');
    },
    select(id, scroll) {
      this.selected = id;
      for (const tr of this.body.querySelectorAll('tr.sel')) tr.classList.remove('sel');
      const tr = this.body.querySelector(`tr[data-id="${CSS.escape(id)}"]`);
      if (tr) { tr.classList.add('sel'); if (scroll) tr.scrollIntoView({ block: 'nearest' }); }
    },
    move(dir) {
      if (!this.visible || !this.visible.length) return;
      const i = this.visible.indexOf(this.selected);
      const j = DJ.clamp(i < 0 ? (dir > 0 ? 0 : this.visible.length - 1) : i + dir, 0, this.visible.length - 1);
      this.select(this.visible[j], true);
    },
    focusSearch() { this.search.focus(); this.search.select(); },
    loadSelected(deckId) { if (this.selected) this.loadToDeck(this.selected, deckId, { confirm: true }); else DJ.toast('Select a track in the library first (↑ ↓).'); },
    // The deck that isn't playing; A if both are free.
    freeDeck() {
      const { A, B } = this.engine.decks;
      if (!A.playing) return 'A';
      if (!B.playing) return 'B';
      return null;
    },

    // ------------------------------------------------------------ adding
    async pickFolder() {
      if (window.showDirectoryPicker) {
        let dir;
        try { dir = await window.showDirectoryPicker({ id: 'deckhand-music', mode: 'read' }); } catch (e) { return; }
        this.status('Scanning ' + dir.name + '…');
        const found = [];
        const walk = async (h, depth) => {
          for await (const entry of h.values()) {
            if (entry.kind === 'file' && DJ.AUDIO_EXT.test(entry.name)) found.push(entry);
            else if (entry.kind === 'directory' && depth < 8) await walk(entry, depth + 1);
          }
        };
        try { await walk(dir, 0); } catch (e) { DJ.toast('Couldn’t read that folder: ' + e.message, { kind: 'error' }); }
        const files = [];
        for (const h of found) { try { files.push([await h.getFile(), h]); } catch (e) {} }
        await this.addFiles(files.map((x) => x[0]), files.map((x) => x[1]));
      } else this.dirIn.click();
    },
    async addFiles(files, handles) {
      let added = 0, skipped = 0;
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (!DJ.AUDIO_EXT.test(f.name) && !/^audio\//.test(f.type)) { skipped++; continue; }
        const id = DJ.trackId(f);
        const old = this.tracks.get(id);
        const names = DJ.parseName(f.name);
        const rec = old || { id, name: f.name, title: names.title, artist: names.artist, size: f.size, added: Date.now(), analyzed: false };
        this.session.set(id, f);
        if (handles && handles[i]) { rec.handle = handles[i]; delete rec.blob; } else if (!rec.handle) rec.blob = f;
        delete rec.missing;
        if (!old) { added++; this.queue.push(id); }
        this.tracks.set(id, rec);
        await this.persist(rec);
      }
      this.render(); this.pump();
      if (added || skipped) DJ.toast(`Added ${added} track${added === 1 ? '' : 's'}${skipped ? `, skipped ${skipped} non-audio file${skipped === 1 ? '' : 's'}` : ''}.`, { kind: 'ok' });
    },
    async persist(rec) {
      if (this.noDb) return;
      try { await db.put(rec); }
      catch (e) {
        // Out of quota or can't clone a handle: keep the metadata, drop the copy.
        if (rec.blob) { const copy = Object.assign({}, rec); delete copy.blob; try { await db.put(copy); rec.sessionOnly = true; } catch (e2) {} }
        if (!this.quotaWarned) { this.quotaWarned = true; DJ.toast('The browser ran out of storage for track copies. Tracks stay listed, but after a reload you’ll need to add them again.', { kind: 'warn', ms: 9000 }); }
      }
    },
    async fromDeck(deck, file) {
      const t = deck.track;
      if (!this.tracks.has(t.id)) await this.addFiles([file]);
      const rec = this.tracks.get(t.id);
      if (!rec) return;
      // The deck's full-resolution analysis (and any grid edits) wins.
      Object.assign(rec, { duration: t.duration, bpm: t.bpm, key: t.key ? { tonic: t.key.tonic, minor: t.key.minor } : null, analyzed: true, error: null });
      this.queue = this.queue.filter((id) => id !== t.id);
      await this.persist(rec); this.render();
    },
    clearAll() {
      if (!this.clearArmed) {
        this.clearArmed = true; this.clearBtn.el.textContent = 'Click again to clear';
        setTimeout(() => { this.clearArmed = false; this.clearBtn.el.textContent = 'Clear'; }, 3000);
        return;
      }
      this.clearArmed = false; this.clearBtn.el.textContent = 'Clear';
      this.tracks.clear(); this.session.clear(); this.queue = []; this.selected = null;
      db.clear().catch(() => {});
      this.render();
    },

    // --------------------------------------------------------- files out
    async fileFor(t, interactive) {
      if (this.session.has(t.id)) return this.session.get(t.id);
      if (t.blob) return t.blob;
      if (t.handle) {
        let perm = await t.handle.queryPermission({ mode: 'read' });
        if (perm !== 'granted' && interactive) perm = await t.handle.requestPermission({ mode: 'read' });
        if (perm !== 'granted') throw new Error('The browser needs permission to read this folder again. Double-click the track to allow it.');
        const f = await t.handle.getFile();
        this.session.set(t.id, f);
        return f;
      }
      throw new Error(`${t.name} isn’t available any more. Add its folder again.`);
    },
    async loadToDeck(id, deckId, opts = {}) {
      const t = this.tracks.get(id);
      if (!t) return;
      if (!deckId) { DJ.toast('Both decks are playing. Use the A / B buttons to replace one.'); return; }
      const deck = this.engine.decks[deckId];
      if (deck.playing && opts.confirm) {
        const now = performance.now();
        if (!(this.armed && this.armed.id === id && this.armed.deck === deckId && now - this.armed.t < 2500)) {
          this.armed = { id, deck: deckId, t: now };
          DJ.toast(`Deck ${deckId} is playing. Press again to replace it.`, { kind: 'warn', ms: 2500 });
          return;
        }
      }
      this.armed = null;
      this.select(id);
      let file;
      try { file = await this.fileFor(t, true); }
      catch (e) { t.missing = true; this.render(); DJ.toast(e.message, { kind: 'error', ms: 8000 }); return; }
      deck.load(file, { meta: { title: t.title, artist: t.artist } });
    },

    // ------------------------------------------------ background analysis
    async pump() {
      if (this.busy) return;
      this.busy = true;
      const ctx = typeof OfflineAudioContext !== 'undefined' ? new OfflineAudioContext(2, 1, 22050) : null;
      let done = 0;
      while (this.queue.length && ctx) {
        // Stay out of the way while a deck is loading.
        while (Object.values(this.engine.decks).some((d) => d.loading)) await new Promise((r) => setTimeout(r, 300));
        const id = this.queue.shift(), t = this.tracks.get(id);
        if (!t || t.analyzed) continue;
        this.status(`Analysing ${done + 1} of ${done + 1 + this.queue.length}: ${t.title}`);
        try {
          if (t.size > MAX_ANALYSE) throw new Error('Too large to analyse in the background. Load it on a deck instead.');
          const f = await this.fileFor(t, false);
          const buf = await ctx.decodeAudioData(await f.arrayBuffer());
          const L = new Float32Array(buf.length); buf.copyFromChannel(L, 0);
          let R = null; if (buf.numberOfChannels > 1) { R = new Float32Array(buf.length); buf.copyFromChannel(R, 1); }
          const { info } = await DJ.analysis.analyze(L, R, buf.sampleRate, { background: true });
          Object.assign(t, { duration: buf.duration, bpm: info.bpm, key: info.key ? { tonic: info.key.tonic, minor: info.key.minor } : null, analyzed: true, error: null });
        } catch (e) {
          t.error = /decode|EncodingError|Unable/i.test(e.message || e.name) ? 'Can’t decode this file in this browser.' : e.message;
          if (/permission/.test(t.error)) { t.error = null; t.needsPermission = true; }
        }
        await this.persist(t);
        done++;
        this.render();
        await new Promise((r) => setTimeout(r, 0));
      }
      this.busy = false;
      this.render();
    },
  });
})();
