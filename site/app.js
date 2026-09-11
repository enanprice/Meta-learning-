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

  // --- mobile nav --------------------------------------------------------
  var toggle = document.getElementById('menu-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }

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
