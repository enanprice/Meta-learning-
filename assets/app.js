// Progress tracking, nav filtering and theme toggle.
(function () {
  var KEY = 'edexcel-maths-progress';
  var THEME = 'edexcel-maths-theme';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* private mode */ }
  }

  var state = load();

  // --- theme -------------------------------------------------------------
  try {
    var saved = localStorage.getItem(THEME);
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  } catch (e) {}
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem(THEME, next); } catch (e) {}
    });
  }

  // --- sidebar ------------------------------------------------------------
  // Narrow screens slide the sidebar in over the page; wide screens fold it
  // away and centre the reading column, which is what you want in a cramped
  // panel or on a full screen.
  var NAV_KEY = 'edexcel-maths-nav-collapsed';
  var wide = window.matchMedia('(min-width: 1001px)');

  function applyStoredNav() {
    var collapsed = false;
    try { collapsed = localStorage.getItem(NAV_KEY) === '1'; } catch (e) {}
    document.body.classList.toggle('nav-collapsed', wide.matches && collapsed);
  }
  applyStoredNav();
  if (wide.addEventListener) wide.addEventListener('change', applyStoredNav);

  function toggleNav() {
    if (wide.matches) {
      var collapsed = document.body.classList.toggle('nav-collapsed');
      try { localStorage.setItem(NAV_KEY, collapsed ? '1' : '0'); } catch (e) {}
    } else {
      document.body.classList.toggle('nav-open');
    }
  }

  var toggle = document.getElementById('menu-toggle');
  if (toggle) toggle.addEventListener('click', toggleNav);

  // --- full screen --------------------------------------------------------
  // Only offered where the browser will actually grant it: inside an embedded
  // frame that doesn't allow fullscreen, the button would silently do nothing,
  // so it stays hidden and the page is opened in its own tab instead.
  var fsBtn = document.getElementById('fullscreen-toggle');
  var root = document.documentElement;
  var canFullscreen = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);

  function fullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement;
  }

  function toggleFullscreen() {
    if (!canFullscreen) return;
    if (fullscreenElement()) {
      (document.exitFullscreen || document.webkitExitFullscreen).call(document);
    } else {
      var req = root.requestFullscreen || root.webkitRequestFullscreen;
      if (req) {
        var r = req.call(root);
        if (r && r.catch) r.catch(function () {});
      }
    }
  }

  if (fsBtn && canFullscreen) {
    fsBtn.hidden = false;
    fsBtn.addEventListener('click', toggleFullscreen);
    document.addEventListener('fullscreenchange', function () {
      var on = !!fullscreenElement();
      fsBtn.textContent = on ? '\u2715' : '\u26F6';
      fsBtn.title = on ? 'Leave full screen (f)' : 'Full screen (f)';
    });
  }

  // --- keyboard shortcuts -------------------------------------------------
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var el = document.activeElement;
    if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
    if (e.key === 'f') { toggleFullscreen(); }
    else if (e.key === 'n') { toggleNav(); }
  });

  // --- nav filter --------------------------------------------------------
  var filter = document.getElementById('nav-filter');
  if (filter) {
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      document.querySelectorAll('.nav-group').forEach(function (group) {
        var shown = 0;
        group.querySelectorAll('li').forEach(function (li) {
          var hit = !q || (li.dataset.name || '').indexOf(q) !== -1;
          li.style.display = hit ? '' : 'none';
          if (hit) shown++;
        });
        group.style.display = shown ? '' : 'none';
        if (q) group.open = true;
      });
    });
  }

  // --- per-topic done checkbox ------------------------------------------
  document.querySelectorAll('.topic-done').forEach(function (box) {
    var id = box.dataset.topic;
    box.checked = !!state[id];
    box.addEventListener('change', function () {
      if (box.checked) { state[id] = 1; } else { delete state[id]; }
      save(state);
    });
  });

  // --- index page progress ----------------------------------------------
  var bar = document.getElementById('progress-bar');
  var label = document.getElementById('progress-label');
  function paint() {
    var items = document.querySelectorAll('.topic-list li');
    if (!items.length) return;
    var done = 0;
    items.forEach(function (li) {
      var hit = !!state[li.dataset.topic];
      li.classList.toggle('done', hit);
      if (hit) done++;
    });
    if (bar) bar.style.width = (100 * done / items.length).toFixed(1) + '%';
    if (label) label.textContent = done + ' of ' + items.length + ' topics marked as revised';
  }
  paint();

  var reset = document.getElementById('reset-progress');
  if (reset) {
    reset.addEventListener('click', function () {
      if (!confirm('Clear all progress marks?')) return;
      state = {};
      save(state);
      paint();
    });
  }

  // --- mark visited topics in the sidebar --------------------------------
  document.querySelectorAll('.nav-group li a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (state[href]) a.classList.add('done');
  });


  // --- keep over-wide maths inside the column -----------------------------
  // MathJax renders formulae at their natural width, which on a narrow screen
  // can be wider than the text column and scroll the whole page sideways.
  // After typesetting, tag any container that overflows so CSS can give it its
  // own horizontal scrollbar. Measured rather than applied blanket, so the
  // baseline of ordinary inline maths is left alone.
  function tagWideMaths() {
    var main = document.querySelector('.content');
    if (!main) return;
    var all = document.querySelectorAll('mjx-container');

    // Pass 1: clear previous tags so everything is measured at natural width.
    all.forEach(function (el) { el.classList.remove('mjx-scroll'); });

    // Pass 2: measure against the right edge of the text column. Reading a
    // rect forces layout, so the widths here reflect the untagged state.
    var edge = main.getBoundingClientRect().right - 18;
    all.forEach(function (el) {
      if (el.getAttribute('display') === 'true') return; // handled in CSS
      if (el.getBoundingClientRect().right > edge) el.classList.add('mjx-scroll');
    });
  }

  // app.js runs before the deferred MathJax script, so wait for the startup
  // promise to appear rather than assuming it already exists.
  function whenTypeset(fn) {
    var tries = 0;
    (function poll() {
      if (window.MathJax && window.MathJax.startup && window.MathJax.startup.promise) {
        window.MathJax.startup.promise.then(fn).catch(function () {});
        return;
      }
      if (++tries > 120) { fn(); return; }   // ~30s, then give up and measure anyway
      setTimeout(poll, 250);
    })();
  }

  whenTypeset(tagWideMaths);

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(tagWideMaths, 150);
  });

  // --- expand/collapse all solutions on a page ---------------------------
  var article = document.querySelector('.prose');
  if (article && article.querySelector('details.answer')) {
    var bar2 = document.createElement('div');
    bar2.className = 'chips';
    bar2.style.margin = '18px 0 -6px';
    var btn = document.createElement('button');
    btn.className = 'linkish';
    btn.textContent = 'Expand all solutions';
    var open = false;
    btn.addEventListener('click', function () {
      open = !open;
      article.querySelectorAll('details.answer').forEach(function (d) { d.open = open; });
      btn.textContent = open ? 'Collapse all solutions' : 'Expand all solutions';
    });
    bar2.appendChild(btn);
    article.parentNode.insertBefore(bar2, article);
  }
})();
