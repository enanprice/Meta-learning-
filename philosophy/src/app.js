// Routing, rendering and per-reader state (read marks, theme, text size).
(function () {
  var T = window.THINKERS, ERAS = window.ERAS, PATHS = window.PATHS, THEMES = window.THEMES;
  var byId = {};
  T.forEach(function (t) { byId[t.id] = t; });

  // Order of the index: era order, then birth year within each era.
  var eraOrder = {};
  ERAS.forEach(function (e, i) { eraOrder[e.id] = i; });
  T.sort(function (a, b) { return (eraOrder[a.era] - eraOrder[b.era]) || (a.born - b.born); });

  var view = document.getElementById('view');
  var root = document.documentElement;

  // ---------- storage (always optional) ----------
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
  }
  var read = load('ios-read', {});
  var state = { q: '', theme: '' };

  var theme = load('ios-theme', null);
  if (theme) root.setAttribute('data-theme', theme);
  var size = load('ios-size', 1.1);
  root.style.setProperty('--reading-size', size + 'rem');

  document.getElementById('theme-toggle').addEventListener('click', function () {
    var cur = root.getAttribute('data-theme');
    if (!cur) cur = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    save('ios-theme', next);
  });
  document.getElementById('random-top').addEventListener('click', goRandom);

  function goRandom() {
    var pool = T.filter(function (t) { return !read[t.id]; });
    if (!pool.length) pool = T;
    var cur = location.hash.slice(1);
    var pick;
    do { pick = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && pick.id === cur);
    location.hash = pick.id;
  }

  // ---------- text helpers ----------
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function inline(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[\[([a-z0-9-]+)\|(.+?)\]\]/g, '<a href="#$1">$2</a>');
  }
  // Paragraphs split on blank lines; "- " lines make a list; "> " makes a block quote.
  function md(src) {
    if (!src) return '';
    return src.trim().split(/\n\s*\n/).map(function (block) {
      var lines = block.trim().split('\n').map(function (l) { return l.trim(); });
      if (lines.every(function (l) { return l.indexOf('- ') === 0; })) {
        return '<ul>' + lines.map(function (l) { return '<li>' + inline(l.slice(2)) + '</li>'; }).join('') + '</ul>';
      }
      if (lines[0].indexOf('> ') === 0) {
        return '<blockquote><p>' + inline(lines.map(function (l) { return l.replace(/^>\s?/, ''); }).join(' ')) + '</p></blockquote>';
      }
      return '<p>' + inline(lines.join(' ')) + '</p>';
    }).join('\n');
  }
  function year(y, approx) {
    var s = y < 0 ? (-y) + ' BCE' : String(y);
    return (approx ? 'c. ' : '') + s;
  }
  function dates(t) {
    var b = year(t.born, t.approx), d = year(t.died, t.approx);
    if (t.born < 0 && t.died < 0) b = (t.approx ? 'c. ' : '') + (-t.born);
    else if (t.born < 0 && t.died > 0) d = (t.approx ? 'c. ' : '') + t.died + ' CE';
    return b + '–' + d;
  }
  function words(t) {
    var s = [t.summary, t.life, t.critique, t.start];
    (t.ideas || []).forEach(function (i) { s.push(i.b); });
    (t.works || []).forEach(function (w) { s.push(w.b); });
    return s.join(' ').split(/\s+/).length;
  }

  // ---------- home ----------
  function renderHome() {
    var last = load('ios-last', null);
    var n = Object.keys(read).filter(function (k) { return byId[k]; }).length;
    var html = '';
    html += '<section class="intro">';
    html += '<span class="label">A reading room with ' + T.length + ' thinkers in it</span>';
    html += '<h1>Pick a name. Read until you’re done.</h1>';
    html += '<p>Philosophers, psychologists and the novelists who did philosophy by other means. Each one has their life, their big ideas, their books, what they actually said, what they never said, and the strongest case against them.</p>';
    html += '<div class="actions"><button class="btn" id="random" type="button">Open someone at random</button>';
    if (last && byId[last]) html += '<a class="btn ghost" href="#' + last + '">Back to ' + esc(byId[last].name) + '</a>';
    html += '<a class="btn ghost" href="#paths">Follow a reading path</a></div>';
    html += '<div class="progress">You’ve finished <b>' + n + '</b> of ' + T.length + '.</div>';
    html += '</section>';

    html += '<div class="tools"><div class="search"><label class="label" for="q">Find</label>';
    html += '<input id="q" type="search" placeholder="A name, a book, an idea: ‘stoic’, ‘Zarathustra’, ‘shadow’" value="' + esc(state.q) + '" autocomplete="off"></div>';
    html += '<div class="chips" role="group" aria-label="Filter by theme">';
    html += '<button class="chip" type="button" data-theme-filter="" aria-pressed="' + (!state.theme) + '">Everyone</button>';
    THEMES.forEach(function (th) {
      html += '<button class="chip" type="button" data-theme-filter="' + th.id + '" aria-pressed="' + (state.theme === th.id) + '">' + esc(th.label) + '</button>';
    });
    html += '</div></div><div id="results"></div>';
    view.innerHTML = html;

    document.getElementById('random').addEventListener('click', goRandom);
    var q = document.getElementById('q');
    q.addEventListener('input', function () { state.q = q.value; renderIndex(); });
    view.querySelectorAll('[data-theme-filter]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.theme = b.getAttribute('data-theme-filter');
        view.querySelectorAll('[data-theme-filter]').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        renderIndex();
      });
    });
    renderIndex();
  }

  function matches(t) {
    if (state.theme && t.themes.indexOf(state.theme) < 0) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var hay = [t.name, t.tagline, t.place, t.role, t.summary].concat(
      (t.works || []).map(function (w) { return w.t; }),
      (t.ideas || []).map(function (i) { return i.t; }),
      t.themes, t.keywords || []
    ).join(' ').toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }

  function renderIndex() {
    var out = '';
    ERAS.forEach(function (era) {
      var list = T.filter(function (t) { return t.era === era.id && matches(t); });
      if (!list.length) return;
      out += '<section class="era"><div class="era-head"><h2>' + esc(era.name) + '</h2><p>' + esc(era.blurb) + '</p></div><ul class="index">';
      list.forEach(function (t) {
        out += '<li><a href="#' + t.id + '"><span class="nm">' + esc(t.name) + (read[t.id] ? '<span class="tick">READ</span>' : '') + '</span>';
        out += '<span class="dt">' + dates(t) + '</span><span class="tg">' + esc(t.tagline) + '</span></a></li>';
      });
      out += '</ul></section>';
    });
    document.getElementById('results').innerHTML = out || '<p class="empty">Nobody matches that. Try a shorter word, or clear the theme filter.</p>';
  }

  // ---------- thinker ----------
  function renderThinker(t) {
    save('ios-last', t.id);
    var era = ERAS[eraOrder[t.era]];
    var idx = T.indexOf(t);
    var prev = T[idx - 1], next = T[idx + 1];
    var mins = Math.max(3, Math.round(words(t) / 230));
    var sections = [['life', 'Life'], ['ideas', 'Big ideas'], ['works', 'The books'], ['quotes', 'In their words']];
    if (t.fakes && t.fakes.length) sections.push(['fakes', 'Never said it']);
    sections.push(['against', 'The case against'], ['start', 'Where to start']);

    var h = '<div class="crumbs"><a href="#">← All thinkers</a><div class="sizes" role="group" aria-label="Text size">';
    h += '<button type="button" data-size="-1" aria-label="Smaller text">A−</button><button type="button" data-size="1" aria-label="Larger text">A+</button></div></div>';
    h += '<article class="article"><header><span class="label">' + esc(era.name) + ' · ' + esc(t.role) + '</span>';
    h += '<h1>' + esc(t.name) + '</h1>';
    h += '<div class="meta">' + dates(t) + ' · ' + esc(t.place) + '</div>';
    h += '<p class="tagline">' + inline(t.tagline) + '</p></header>';
    h += '<div class="summary">' + md(t.summary) + '</div>';
    h += '<nav class="toc" aria-label="On this page">';
    sections.forEach(function (s) { h += '<button type="button" data-jump="' + s[0] + '">' + s[1] + '</button>'; });
    h += '<span class="rt">about ' + mins + ' min</span></nav>';

    h += '<section id="s-life"><h2>Life</h2>' + md(t.life) + '</section>';
    h += '<section id="s-ideas"><h2>Big ideas</h2>';
    t.ideas.forEach(function (i) { h += '<h3>' + inline(i.t) + '</h3>' + md(i.b); });
    h += '</section>';
    h += '<section id="s-works"><h2>The books</h2>';
    t.works.forEach(function (w) { h += '<h3>' + inline(w.t) + (w.y ? '<span class="yr">' + esc(w.y) + '</span>' : '') + '</h3>' + md(w.b); });
    h += '</section>';
    h += '<section id="s-quotes"><h2>In their words</h2><div class="quotes">';
    t.quotes.forEach(function (q) { h += '<figure class="quote"><blockquote>' + inline(q.q) + '</blockquote><figcaption>' + inline(q.s) + '</figcaption></figure>'; });
    h += '</div></section>';
    if (t.fakes && t.fakes.length) {
      h += '<section id="s-fakes"><h2>Never said it</h2><p>These circulate under ' + esc(t.name.split(' ').pop()) + '’s name. They aren’t in the work, or they’re someone else’s summary wearing a famous name.</p><div class="fakes">';
      t.fakes.forEach(function (f) { h += '<div class="fake"><q>' + esc(f.q) + '</q><p>' + inline(f.n) + '</p></div>'; });
      h += '</div></section>';
    }
    h += '<section id="s-against"><h2>The case against</h2>' + md(t.critique) + '</section>';
    h += '<section id="s-start"><h2>Where to start</h2>' + md(t.start) + '</section>';

    h += '<div class="read-toggle"><button class="btn" id="mark" type="button" aria-pressed="' + !!read[t.id] + '">' + (read[t.id] ? 'Finished ✓' : 'Mark as finished') + '</button>';
    h += '<button class="btn ghost" id="random2" type="button">Someone else at random</button></div>';

    var rel = (t.related || []).filter(function (r) { return byId[r]; });
    if (rel.length) {
      h += '<section><h2>Read next</h2><div class="related">';
      rel.forEach(function (r) { var o = byId[r]; h += '<a href="#' + o.id + '"><span class="nm">' + esc(o.name) + '</span><span class="dt">' + dates(o) + '</span></a>'; });
      h += '</div></section>';
    }
    h += '<nav class="pager" aria-label="Previous and next">';
    if (prev) h += '<a href="#' + prev.id + '">← ' + esc(prev.name) + '</a>';
    if (next) h += '<a class="nx" href="#' + next.id + '">' + esc(next.name) + ' →</a>';
    h += '</nav></article>';
    view.innerHTML = h;

    view.querySelectorAll('[data-jump]').forEach(function (b) {
      b.addEventListener('click', function () {
        var el = document.getElementById('s-' + b.getAttribute('data-jump'));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    view.querySelectorAll('[data-size]').forEach(function (b) {
      b.addEventListener('click', function () {
        size = Math.min(1.5, Math.max(0.9, Math.round((size + 0.05 * Number(b.getAttribute('data-size'))) * 100) / 100));
        root.style.setProperty('--reading-size', size + 'rem');
        save('ios-size', size);
      });
    });
    document.getElementById('random2').addEventListener('click', goRandom);
    var mark = document.getElementById('mark');
    mark.addEventListener('click', function () {
      if (read[t.id]) delete read[t.id]; else read[t.id] = 1;
      save('ios-read', read);
      mark.setAttribute('aria-pressed', String(!!read[t.id]));
      mark.textContent = read[t.id] ? 'Finished ✓' : 'Mark as finished';
    });
  }

  // ---------- paths ----------
  function renderPaths() {
    var h = '<div class="page"><span class="label">Reading paths</span><h1>Where to go after the first one</h1>';
    h += '<p>Reading thinkers in a sensible order does half the work. Each one is answering someone before them. These paths follow an argument across centuries, so each page makes the next one easier.</p>';
    PATHS.forEach(function (p) {
      h += '<h2>' + esc(p.name) + '</h2>' + md(p.intro) + '<ol class="steps">';
      p.steps.forEach(function (s) {
        var t = byId[s[0]];
        if (!t) return;
        h += '<li><div><a href="#' + t.id + '">' + esc(t.name) + '</a>' + (read[t.id] ? ' <span class="tick" style="color:var(--done);font-family:var(--ui);font-size:.8rem">READ</span>' : '') + '<span>' + inline(s[1]) + '</span></div></li>';
      });
      h += '</ol>';
    });
    h += '</div>';
    view.innerHTML = h;
  }

  // ---------- timeline ----------
  function renderTimeline() {
    var list = T.slice().sort(function (a, b) { return a.born - b.born; });
    var min = -600, max = 2000, px = 0.95, rowH = 24, left = 20;
    var w = (max - min) * px + 200, hgt = list.length * rowH + 40;
    function x(y) { return left + (y - min) * px; }
    var h = '<div class="page"><span class="label">Timeline</span><h1>Who was alive when</h1>';
    h += '<p>Every thinker on one scale, 600 BCE to today. Dashed bars are lives whose dates are traditional or uncertain. Scroll sideways; tap a name to read.</p>';
    h += '<p class="note">Two things jump out. First, the gap: almost nothing here between Augustine and Aquinas, which says more about which traditions got written down and translated than about who was thinking. Second, the crowd after 1800, when writing, printing and universities multiplied.</p></div>';
    h += '<div class="tl-wrap"><div class="tl" style="width:' + w + 'px;height:' + hgt + 'px"><div class="tl-axis">';
    for (var y = -500; y <= max; y += 250) {
      h += '<span class="tl-tick" style="left:' + x(y) + 'px">' + (y < 0 ? -y + ' BCE' : y === 0 ? '1 CE' : y) + '</span>';
    }
    h += '</div>';
    for (var g = -500; g <= max; g += 250) h += '<div class="tl-grid" style="left:' + x(g) + 'px"></div>';
    list.forEach(function (t, i) {
      var bw = Math.max(6, (t.died - t.born) * px);
      h += '<a class="tl-row" href="#' + t.id + '" style="left:' + x(t.born) + 'px;top:' + (34 + i * rowH) + 'px"><span class="tl-bar' + (t.approx ? ' approx' : '') + '" style="width:' + bw + 'px"></span><span>' + esc(t.name) + '</span></a>';
    });
    h += '</div></div>';
    view.innerHTML = h;
    // Start scrolled so the densest stretch (1500 onward) is in view on a phone.
    var wrap = view.querySelector('.tl-wrap');
    if (wrap.clientWidth < 900) wrap.scrollLeft = x(1450);
  }

  function renderAbout() {
    view.innerHTML = '<div class="page">' + window.ABOUT + '</div>';
  }

  // ---------- router ----------
  function route() {
    var id = location.hash.slice(1);
    if (!id) renderHome();
    else if (id === 'paths') renderPaths();
    else if (id === 'timeline') renderTimeline();
    else if (id === 'about') renderAbout();
    else if (byId[id]) renderThinker(byId[id]);
    else renderHome();
    if (id) window.scrollTo(0, 0);
    document.title = byId[id] ? byId[id].name + ' · Instead of Scrolling' : 'Instead of Scrolling';
  }
  window.addEventListener('hashchange', route);
  route();
})();
