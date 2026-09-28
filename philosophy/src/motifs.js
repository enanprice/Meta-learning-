// One small animated scene per thinker, drawn on a canvas from the page's colour tokens.
// Each motif is { init(w, h, R, opts) -> state, draw(g, w, h, t, s, C, dt) }.
window.Motifs = (function () {
  var TAU = Math.PI * 2;
  function rng(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h; }
  function a(hex, al) {
    var n = parseInt(hex.replace('#', ''), 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + Math.max(0, Math.min(1, al)) + ')';
  }
  function ease(x) { x = Math.max(0, Math.min(1, x)); return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; }
  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }
  function glow(g, x, y, r, col, al) {
    var gr = g.createRadialGradient(x, y, 0, x, y, r);
    gr.addColorStop(0, a(col, al)); gr.addColorStop(1, a(col, 0));
    g.fillStyle = gr; g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  function dot(g, x, y, r, fill) { g.fillStyle = fill; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill(); }
  function line(g, x1, y1, x2, y2, stroke, lw) { g.strokeStyle = stroke; g.lineWidth = lw || 1; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); }
  function stars(R, n, w, h, maxY) {
    var s = []; for (var i = 0; i < n; i++) s.push({ x: R() * w, y: R() * h * (maxY || 1), r: 0.4 + R() * 1.2, ph: R() * TAU, f: 0.5 + R() * 2 });
    return s;
  }
  function drawStars(g, s, t, col, k) {
    for (var i = 0; i < s.length; i++) { var p = s[i]; dot(g, p.x, p.y, p.r, a(col, (0.35 + 0.35 * Math.sin(t * p.f + p.ph)) * (k === undefined ? 1 : k))); }
  }
  function figure(g, x, y, sc, col, lean) {
    g.save(); g.translate(x, y); g.rotate(lean || 0); g.scale(sc, sc);
    g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 2.2 / sc; g.lineCap = 'round';
    g.beginPath(); g.arc(0, -34, 5, 0, TAU); g.fill();
    g.beginPath(); g.moveTo(0, -28); g.lineTo(0, -12); g.moveTo(0, -12); g.lineTo(-5, 0); g.moveTo(0, -12); g.lineTo(5, 0);
    g.moveTo(0, -24); g.lineTo(-6, -16); g.moveTo(0, -24); g.lineTo(6, -16); g.stroke();
    g.restore();
  }

  var M = {};

  M.fire = { // Heraclitus
    init: function (w, h, R) { var p = []; for (var i = 0; i < 120; i++) p.push({ x: w * (0.1 + R() * 0.8), y: h * R(), v: 18 + R() * 45, r: 0.8 + R() * 2.4, ph: R() * TAU }); return { p: p }; },
    draw: function (g, w, h, t, s, C, dt) {
      glow(g, w / 2, h * 1.05, h * 1.1, C.ember, 0.35 + 0.05 * Math.sin(t * 9));
      s.p.forEach(function (p) {
        p.y -= p.v * dt; p.x += Math.sin(t * 2 + p.ph) * 0.5;
        if (p.y < -6) { p.y = h + 4; p.x = w / 2 + (Math.random() - 0.5) * w * 0.8; }
        var life = clamp(p.y / h, 0, 1);
        dot(g, p.x, p.y, p.r * (0.4 + life), a(life > 0.55 ? C.ember : C.brass, life * 0.9));
      });
    }
  };

  M.river = { // Hesse
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      for (var k = 0; k < 14; k++) {
        var y0 = h * (0.1 + k * 0.062);
        g.beginPath();
        for (var x = 0; x <= w; x += 6) {
          var y = y0 + Math.sin(x * 0.011 + t * (0.6 + k * 0.03) + k) * (5 + k * 0.7) + Math.sin(x * 0.03 - t * 1.3) * 2;
          x === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
        }
        g.strokeStyle = a([C.moss, C.brass, C.muted][k % 3], 0.45); g.lineWidth = 1.2; g.stroke();
      }
      var u = (t % 7) / 7;
      g.strokeStyle = a(C.brass, 1 - u); g.lineWidth = 1.5;
      g.beginPath(); g.ellipse(w * 0.68, h * 0.55, u * w * 0.3, u * w * 0.07, 0, 0, TAU); g.stroke();
    }
  };

  M.cave = { // Plato
    init: function (w, h, R) { var f = []; for (var i = 0; i < 6; i++) f.push({ type: i % 3, x: R() * w * 1.4, sp: 14 + R() * 18, s: 0.7 + R() * 0.5 }); return { f: f }; },
    draw: function (g, w, h, t, s, C, dt) {
      var fl = 1 + 0.04 * Math.sin(t * 17) + 0.03 * Math.sin(t * 7.3);
      glow(g, w * 0.2, h * 1.02, w * 0.95 * fl, C.ember, 0.42);
      line(g, 0, h * 0.8, w, h * 0.8, a(C.muted, 0.3), 1);
      g.fillStyle = a(C.shade, 0.8);
      s.f.forEach(function (f) {
        f.x -= f.sp * dt; if (f.x < -90) f.x = w + 90 + Math.random() * 120;
        var sc = f.s * fl * (h / 210);
        g.save(); g.translate(f.x, h * 0.8); g.scale(sc, sc);
        g.beginPath();
        if (f.type === 0) { g.arc(0, -64, 9, 0, TAU); g.rect(-10, -54, 20, 34); g.rect(-9, -20, 7, 20); g.rect(2, -20, 7, 20); g.ellipse(0, -84, 8, 11, 0, 0, TAU); }
        else if (f.type === 1) { g.ellipse(0, -26, 30, 12, 0, 0, TAU); g.arc(28, -36, 8, 0, TAU); g.rect(-22, -18, 5, 18); g.rect(-10, -18, 5, 18); g.rect(8, -18, 5, 18); g.rect(18, -18, 5, 18); }
        else { g.ellipse(0, -30, 13, 24, 0, 0, TAU); g.rect(-5, -64, 10, 14); g.rect(-9, -66, 18, 4); }
        g.fill(); g.restore();
      });
      g.fillStyle = a(C.shade, 0.9);
      for (var i = 0; i < 8; i++) { g.beginPath(); g.arc(w * (0.06 + i * 0.13), h + 6, 15, 0, TAU); g.fill(); }
    }
  };

  M.questions = { // Socrates
    init: function (w, h, R) { var p = []; for (var i = 0; i < 26; i++) p.push({ x: R() * w, y: R() * h, v: 8 + R() * 16, sz: 14 + R() * 38, ph: R() * TAU }); return { p: p }; },
    draw: function (g, w, h, t, s, C, dt) {
      g.textAlign = 'center';
      s.p.forEach(function (p, i) {
        p.y -= p.v * dt; if (p.y < -40) { p.y = h + 40; p.x = Math.random() * w; }
        var al = Math.sin(clamp(p.y / h, 0, 1) * Math.PI) * 0.7;
        g.font = 'italic ' + p.sz + 'px "IM Fell English", Georgia, serif';
        g.fillStyle = a(i % 4 === 0 ? C.brass : C.ink, al);
        g.fillText('?', p.x + Math.sin(t + p.ph) * 6, p.y);
      });
    }
  };

  M.orbits = { // Aristotle
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      g.save(); g.translate(w / 2, h / 2); g.rotate(-0.18);
      for (var i = 1; i <= 7; i++) {
        var rx = i * Math.min(w, h * 2.4) * 0.065, ry = rx * 0.38;
        g.strokeStyle = a(C.muted, 0.35); g.lineWidth = 1; g.beginPath(); g.ellipse(0, 0, rx, ry, 0, 0, TAU); g.stroke();
        var an = t * (0.9 / i) + i * 1.7;
        dot(g, Math.cos(an) * rx, Math.sin(an) * ry, 2 + i * 0.35, i % 2 ? C.brass : C.moss);
      }
      glow(g, 0, 0, 34, C.brass, 0.6); dot(g, 0, 0, 3, C.ink);
      g.restore();
    }
  };

  M.lantern = { // Diogenes
    init: function (w, h, R) { var p = []; for (var i = 0; i < 60; i++) p.push({ x: R() * w, y: h * (0.45 + R() * 0.5), s: 0.35 + R() * 0.25 }); return { p: p }; },
    draw: function (g, w, h, t, s, C) {
      var lx = w / 2 + Math.sin(t * 0.23) * w * 0.42, ly = h * 0.5 + Math.sin(t * 0.61) * h * 0.1;
      glow(g, lx, ly, 110, C.brass, 0.4);
      s.p.forEach(function (p) {
        var d = Math.hypot(p.x - lx, p.y - ly);
        figure(g, p.x, p.y, p.s, a(C.ink, Math.max(0.07, 0.8 - d / 130)));
      });
      g.strokeStyle = a(C.muted, 0.9); g.lineWidth = 1.5; g.strokeRect(lx - 5, ly - 7, 10, 14);
      dot(g, lx, ly, 3 + Math.sin(t * 11) * 0.6, a(C.brass, 1));
    }
  };

  M.garden = { // Epicurus, Voltaire (rows)
    init: function (w, h, R, o) {
      var st = [], n = o.rows ? 30 : 16;
      for (var i = 0; i < n; i++) {
        var row = o.rows ? i % 3 : 0;
        st.push({ x: o.rows ? w * (0.06 + (Math.floor(i / 3) / (n / 3)) * 0.9) + row * 9 : w * (0.08 + R() * 0.84), base: o.rows ? h * (1 - row * 0.12) : h, H: h * (0.3 + R() * 0.45) * (o.rows ? 0.55 - row * 0.1 : 1), bend: (R() - 0.5) * 50, delay: R() * 3, row: row });
      }
      return { st: st, rows: !!o.rows };
    },
    draw: function (g, w, h, t, s, C) {
      var tc = t % 16, fade = tc > 14 ? (16 - tc) / 2 : 1;
      s.st.forEach(function (p) {
        var gp = ease((tc - p.delay) / 6); if (gp <= 0) return;
        g.strokeStyle = a(C.moss, 0.8 * fade); g.lineWidth = 1.6; g.beginPath();
        for (var u = 0; u <= gp; u += 0.04) { var x = p.x + p.bend * u * u, y = p.base - p.H * u; u === 0 ? g.moveTo(x, y) : g.lineTo(x, y); }
        g.stroke();
        [0.3, 0.5, 0.7].forEach(function (u, k) {
          if (gp < u) return;
          g.save(); g.translate(p.x + p.bend * u * u, p.base - p.H * u); g.rotate(k % 2 ? 0.7 : -0.7 + Math.PI);
          g.fillStyle = a(C.moss, 0.55 * fade); g.beginPath(); g.ellipse(7, 0, 7, 2.6, 0, 0, TAU); g.fill(); g.restore();
        });
        if (gp >= 1) dot(g, p.x + p.bend, p.base - p.H, 3.2, a(p.row === 1 ? C.ember : C.brass, fade));
      });
      if (s.rows) for (var r = 0; r < 3; r++) line(g, 0, h * (1 - r * 0.12) + 1, w, h * (1 - r * 0.12) + 1, a(C.muted, 0.25), 1);
    }
  };

  M.control = { // Epictetus
    init: function (w, h, R) { var p = []; for (var i = 0; i < 70; i++) { var an = R() * TAU; p.push({ x: w / 2 + Math.cos(an) * w * 0.4, y: h / 2 + Math.sin(an) * h * 0.45, vx: (R() - 0.5) * 120, vy: (R() - 0.5) * 120 }); } return { p: p }; },
    draw: function (g, w, h, t, s, C, dt) {
      var cx = w / 2, cy = h / 2, R0 = Math.min(w, h) * 0.24;
      glow(g, cx, cy, R0 * 1.1, C.moss, 0.3);
      g.strokeStyle = a(C.brass, 0.8); g.lineWidth = 1.5; g.beginPath(); g.arc(cx, cy, R0 * (0.97 + 0.03 * Math.sin(t * 0.8)), 0, TAU); g.stroke();
      s.p.forEach(function (p) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        var dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy);
        if (d < R0 + 3) { var nx = dx / d, ny = dy / d, dp = p.vx * nx + p.vy * ny; if (dp < 0) { p.vx -= 2 * dp * nx; p.vy -= 2 * dp * ny; } p.x = cx + nx * (R0 + 3); p.y = cy + ny * (R0 + 3); }
        dot(g, p.x, p.y, 1.8, a(C.ink, 0.55));
      });
    }
  };

  M.hourglass = { // Seneca
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var u = (t % 14) / 14, flip = u > 0.93 ? ease((u - 0.93) / 0.07) : 0, lv = u > 0.93 ? 1 : u / 0.93;
      var H = h * 0.78, W = H * 0.55, hh = H / 2;
      g.save(); g.translate(w / 2, h / 2); g.rotate(flip * Math.PI);
      g.fillStyle = a(C.brass, 0.75);
      var tw = W * (1 - lv), ty = -hh * (1 - lv);
      if (lv < 1) { g.beginPath(); g.moveTo(0, -2); g.lineTo(-tw / 2 + 2, ty + 2); g.lineTo(tw / 2 - 2, ty + 2); g.closePath(); g.fill(); }
      var by = hh - hh * 0.92 * lv, bw = W * (by / hh);
      g.beginPath(); g.moveTo(-W / 2 + 3, hh - 2); g.lineTo(W / 2 - 3, hh - 2); g.lineTo(bw / 2, by); g.quadraticCurveTo(0, by - 10 * lv, -bw / 2, by); g.closePath(); g.fill();
      if (lv < 1 && !flip) for (var i = 0; i < 12; i++) { var yy = ((t * 90 + i * 17) % Math.max(1, by)); dot(g, (Math.random() - 0.5), yy, 1, a(C.brass, 0.9)); }
      g.strokeStyle = a(C.ink, 0.8); g.lineWidth = 2;
      g.beginPath(); g.moveTo(-W / 2, -hh); g.lineTo(W / 2, -hh); g.lineTo(3, -2); g.lineTo(3, 2); g.lineTo(W / 2, hh); g.lineTo(-W / 2, hh); g.lineTo(-3, 2); g.lineTo(-3, -2); g.closePath(); g.stroke();
      g.lineWidth = 5; line(g, -W / 2 - 10, -hh - 4, W / 2 + 10, -hh - 4, a(C.muted, 1), 5); line(g, -W / 2 - 10, hh + 4, W / 2 + 10, hh + 4, a(C.muted, 1), 5);
      g.restore();
    }
  };

  M.above = { // Marcus Aurelius
    init: function (w, h, R) { var c = []; for (var i = 0; i < 90; i++) c.push({ a: (R() - 0.5) * 1.6, d: 0.8 + R() * 0.2 }); return { st: stars(R, 110, w, h, 0.6), c: c }; },
    draw: function (g, w, h, t, s, C) {
      drawStars(g, s.st, t, C.ink);
      var R0 = Math.max(w * 0.9, h * 1.4), cx = w / 2, cy = h * 0.55 + R0;
      glow(g, cx, cy, R0 * 1.08, C.moss, 0.25);
      g.fillStyle = a(C.panel, 1); g.beginPath(); g.arc(cx, cy, R0, 0, TAU); g.fill();
      g.strokeStyle = a(C.brass, 0.6); g.lineWidth = 1.5; g.beginPath(); g.arc(cx, cy, R0, 0, TAU); g.stroke();
      s.c.forEach(function (p) {
        var an = ((p.a + t * 0.02 + 0.8) % 1.6) - 0.8;
        var x = cx + Math.sin(an) * R0 * p.d, y = cy - Math.cos(an) * R0 * p.d;
        dot(g, x, y, 1.2, a(C.ember, 0.3 + 0.5 * (1 - Math.abs(an) / 0.8)));
      });
    }
  };

  M.breath = { // Buddha
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var k = (Math.sin(t * TAU / 8) + 1) / 2, R0 = Math.min(w, h) * 0.46;
      g.save(); g.translate(w / 2, h / 2);
      [8, 12, 16].forEach(function (n, L) {
        for (var i = 0; i < n; i++) {
          g.save(); g.rotate(i * TAU / n + L * 0.2 + t * 0.02 * (L % 2 ? 1 : -1));
          var len = R0 * (0.3 + 0.2 * L) * (0.85 + 0.15 * k);
          g.beginPath(); g.ellipse(len * 0.5, 0, len * 0.5, len * 0.14, 0, 0, TAU);
          g.fillStyle = a(L === 1 ? C.moss : C.brass, 0.05 + 0.04 * k); g.fill();
          g.strokeStyle = a(L === 1 ? C.moss : C.brass, 0.45); g.lineWidth = 1; g.stroke(); g.restore();
        }
      });
      glow(g, 0, 0, R0 * 0.3, C.brass, 0.3 + 0.3 * k);
      g.restore();
    }
  };

  M.brush = { // Confucius
    init: function () { return { strokes: [], next: 0 }; },
    draw: function (g, w, h, t, s, C) {
      if (t > s.next) {
        s.next = t + 1.3;
        var x = w * (0.15 + Math.random() * 0.6), y = h * (0.2 + Math.random() * 0.5), L = 40 + Math.random() * 90, an = (Math.random() - 0.5) * 2.2;
        s.strokes.push({ t0: t, p: [[x, y], [x + Math.cos(an) * L * 0.4 + 15, y + Math.sin(an) * L * 0.4 - 12], [x + Math.cos(an) * L * 0.8 - 10, y + Math.sin(an) * L * 0.8 + 14], [x + Math.cos(an) * L, y + Math.sin(an) * L]], wd: 5 + Math.random() * 8 });
        if (s.strokes.length > 9) s.strokes.shift();
      }
      s.strokes.forEach(function (k) {
        var age = t - k.t0, prog = clamp(age / 1.4, 0, 1), fade = clamp(1 - (age - 6) / 2, 0, 1);
        var P = k.p, prev = null;
        for (var u = 0; u <= prog; u += 0.02) {
          var v = 1 - u, x = v * v * v * P[0][0] + 3 * v * v * u * P[1][0] + 3 * v * u * u * P[2][0] + u * u * u * P[3][0];
          var y = v * v * v * P[0][1] + 3 * v * v * u * P[1][1] + 3 * v * u * u * P[2][1] + u * u * u * P[3][1];
          if (prev) { g.lineCap = 'round'; line(g, prev[0], prev[1], x, y, a(C.ink, 0.75 * fade), 1 + k.wd * Math.pow(Math.sin(Math.PI * clamp(u * 1.1, 0, 1)), 0.6)); }
          prev = [x, y];
        }
      });
      g.fillStyle = a(C.ember, 0.8); g.fillRect(w * 0.86, h * 0.72, 22, 22);
      g.strokeStyle = a(C.bg, 0.9); g.lineWidth = 2; g.strokeRect(w * 0.86 + 5, h * 0.72 + 5, 12, 12);
    }
  };

  M.drops = { // Laozi
    init: function () { return { d: [], rip: [], next: 0 }; },
    draw: function (g, w, h, t, s, C, dt) {
      var wl = h * 0.62;
      for (var i = 0; i < 6; i++) line(g, 0, wl + i * 11 + 4, w, wl + i * 11 + 4, a(C.muted, 0.12), 1);
      g.fillStyle = a(C.panel2, 1); g.beginPath(); g.ellipse(w * 0.3, h * 0.98, w * 0.09, h * 0.16, 0, 0, TAU); g.fill();
      if (t > s.next) { s.next = t + 0.9; s.d.push({ x: w * (0.1 + Math.random() * 0.8), y: -8, v: 0 }); }
      s.d = s.d.filter(function (d) {
        d.v += 420 * dt; d.y += d.v * dt;
        if (d.y >= wl) { s.rip.push({ x: d.x, t0: t }); return false; }
        g.fillStyle = a(C.ink, 0.8); g.beginPath(); g.ellipse(d.x, d.y, 2, 4, 0, 0, TAU); g.fill(); return true;
      });
      s.rip = s.rip.filter(function (r) {
        var age = t - r.t0; if (age > 3.2) return false;
        for (var k = 0; k < 3; k++) { var rr = Math.max(0, age - k * 0.35) * 42; if (rr <= 0) continue; g.strokeStyle = a(C.brass, (1 - age / 3.2) * 0.7); g.lineWidth = 1; g.beginPath(); g.ellipse(r.x, wl, rr, rr * 0.22, 0, 0, TAU); g.stroke(); }
        return true;
      });
    }
  };

  M.butterflies = { // Zhuangzi
    init: function (w, h, R) { var b = []; for (var i = 0; i < 5; i++) b.push({ f1: 0.13 + R() * 0.2, f2: 0.17 + R() * 0.2, p1: R() * TAU, p2: R() * TAU, c: i }); return { b: b }; },
    draw: function (g, w, h, t, s, C) {
      var cols = [C.brass, C.moss, C.ember, C.ink, C.brass];
      s.b.forEach(function (b, i) {
        var x = w * (0.5 + 0.4 * Math.sin(t * b.f1 + b.p1)), y = h * (0.5 + 0.34 * Math.sin(t * b.f2 + b.p2));
        var dx = Math.cos(t * b.f1 + b.p1) * b.f1 * w, dy = Math.cos(t * b.f2 + b.p2) * b.f2 * h;
        [[0, 1], [18, 0.18]].forEach(function (ghost) {
          g.save(); g.translate(x + ghost[0], y + ghost[0] * 0.6); g.rotate(Math.atan2(dy, dx) + Math.PI / 2);
          var fl = 0.25 + 0.75 * Math.abs(Math.sin(t * 9 + i));
          g.fillStyle = a(cols[i], 0.75 * ghost[1]);
          g.beginPath(); g.ellipse(-7 * fl, -3, 7 * fl, 9, -0.4, 0, TAU); g.ellipse(7 * fl, -3, 7 * fl, 9, 0.4, 0, TAU);
          g.ellipse(-5 * fl, 7, 5 * fl, 5, 0.3, 0, TAU); g.ellipse(5 * fl, 7, 5 * fl, 5, -0.3, 0, TAU); g.fill();
          g.restore();
        });
      });
    }
  };

  M.restless = { // Augustine
    init: function (w, h, R) { var p = []; for (var i = 0; i < 90; i++) p.push({ x: R() * w, y: R() * h, vx: 0, vy: 0 }); return { p: p }; },
    draw: function (g, w, h, t, s, C, dt) {
      var ph = Math.pow((Math.sin(t * TAU / 14 - 1.5) + 1) / 2, 2), cx = w / 2, cy = h / 2;
      glow(g, cx, cy, 90, C.brass, 0.15 + 0.5 * ph);
      s.p.forEach(function (p) {
        p.vx += (Math.random() - 0.5) * 400 * dt * (1 - ph) + (cx - p.x) * 1.2 * dt * ph;
        p.vy += (Math.random() - 0.5) * 400 * dt * (1 - ph) + (cy - p.y) * 1.2 * dt * ph;
        p.vx *= 0.96; p.vy *= 0.96; p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
        dot(g, p.x, p.y, 1.6, a(C.ink, 0.35 + 0.4 * ph));
      });
    }
  };

  M.wheel = { // Boethius
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, cy = h * 0.52, R0 = Math.min(h * 0.4, w * 0.3), r = t * 0.25;
      g.strokeStyle = a(C.brass, 0.8); g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, R0, 0, TAU); g.stroke();
      g.lineWidth = 1; g.beginPath(); g.arc(cx, cy, R0 * 0.88, 0, TAU); g.stroke();
      for (var i = 0; i < 8; i++) line(g, cx, cy, cx + Math.cos(r + i * TAU / 8) * R0, cy + Math.sin(r + i * TAU / 8) * R0, a(C.muted, 0.7), 1.5);
      dot(g, cx, cy, 7, C.brass);
      for (var j = 0; j < 4; j++) {
        var an = r + j * TAU / 4, x = cx + Math.cos(an) * R0, y = cy + Math.sin(an) * R0;
        var top = -Math.sin(an);
        figure(g, x, y, 0.55, a(C.ink, 0.5 + 0.4 * top));
        if (top > 0.85) { g.fillStyle = a(C.brass, 1); g.beginPath(); g.moveTo(x - 5, y - 23); g.lineTo(x - 5, y - 29); g.lineTo(x - 2, y - 26); g.lineTo(x, y - 30); g.lineTo(x + 2, y - 26); g.lineTo(x + 5, y - 29); g.lineTo(x + 5, y - 23); g.fill(); }
      }
    }
  };

  M.void = { // Avicenna
    init: function (w, h, R) { var p = []; for (var i = 0; i < 40; i++) p.push({ x: R() * w, y: R() * h, v: 3 + R() * 6 }); return { p: p }; },
    draw: function (g, w, h, t, s, C, dt) {
      glow(g, w * (0.3 + 0.1 * Math.sin(t * 0.1)), h * 0.4, w * 0.4, C.moss, 0.12);
      glow(g, w * (0.7 + 0.1 * Math.cos(t * 0.13)), h * 0.6, w * 0.35, C.brass, 0.1);
      s.p.forEach(function (p) { p.y -= p.v * dt; if (p.y < 0) p.y = h; dot(g, p.x, p.y, 0.9, a(C.muted, 0.5)); });
      var x = w / 2 + Math.sin(t * 0.2) * 20, y = h / 2 + Math.sin(t * 0.5) * 10;
      glow(g, x, y, 70, C.brass, 0.18);
      g.save(); g.translate(x, y); g.rotate(Math.sin(t * 0.3) * 0.3); g.strokeStyle = a(C.ink, 0.85); g.lineWidth = 2; g.lineCap = 'round';
      g.beginPath(); g.arc(0, -26, 7, 0, TAU); g.stroke();
      g.beginPath(); g.moveTo(0, -19); g.lineTo(0, 10); g.moveTo(0, -12); g.lineTo(-24, -24); g.moveTo(0, -12); g.lineTo(24, -24);
      g.moveTo(0, 10); g.lineTo(-16, 36); g.moveTo(0, 10); g.lineTo(16, 36); g.stroke(); g.restore();
    }
  };

  M.rays = { // Aquinas
    init: function (w, h, R) { var p = []; for (var i = 0; i < 50; i++) p.push({ u: R(), v: R(), ph: R() * TAU }); return { p: p }; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, W = Math.min(w * 0.16, h * 0.4), top = h * 0.06, spring = h * 0.26, bot = h * 0.52;
      for (var i = 0; i < 7; i++) {
        var al = 0.07 + 0.04 * Math.sin(t * 0.7 + i);
        g.fillStyle = a(C.brass, al); g.beginPath();
        g.moveTo(cx - W / 2 + i * W / 7, bot); g.lineTo(cx - W / 2 + (i + 1) * W / 7, bot);
        g.lineTo(cx - w * 0.45 + (i + 1) * w * 0.9 / 7, h); g.lineTo(cx - w * 0.45 + i * w * 0.9 / 7, h); g.fill();
      }
      s.p.forEach(function (p) { var yy = bot + p.v * (h - bot), spread = (yy - bot) / (h - bot); dot(g, cx + (p.u - 0.5) * (W + spread * w * 0.8) + Math.sin(t * 0.3 + p.ph) * 5, yy, 1, a(C.ink, 0.25 + 0.25 * Math.sin(t + p.ph))); });
      g.strokeStyle = a(C.brass, 0.9); g.lineWidth = 2; g.beginPath();
      g.moveTo(cx - W / 2, bot); g.lineTo(cx - W / 2, spring); g.quadraticCurveTo(cx - W / 2, top + 10, cx, top); g.quadraticCurveTo(cx + W / 2, top + 10, cx + W / 2, spring); g.lineTo(cx + W / 2, bot); g.closePath(); g.stroke();
      g.fillStyle = a(C.brass, 0.12); g.fill();
      line(g, cx, spring, cx, bot, a(C.brass, 0.7), 1.5); g.beginPath(); g.arc(cx, spring - W * 0.12, W * 0.18, 0, TAU); g.stroke();
    }
  };

  M.chess = { // Machiavelli
    init: function (w, h, R) {
      var pc = [], used = {};
      while (pc.length < 12) { var c = Math.floor(R() * 8), r = Math.floor(R() * 8); if (used[c + ',' + r]) continue; used[c + ',' + r] = 1; pc.push({ c: c, r: r, fc: c, fr: r, t0: -9, side: pc.length % 2, king: pc.length < 2 }); }
      return { pc: pc, next: 0 };
    },
    draw: function (g, w, h, t, s, C) {
      var sz = Math.min(w * 0.8, h * 0.9) / 8, ox = (w - sz * 8) / 2, oy = (h - sz * 8) / 2;
      for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) { g.fillStyle = a((i + j) % 2 ? C.panel2 : C.panel, 0.9); g.fillRect(ox + i * sz, oy + j * sz, sz, sz); }
      g.strokeStyle = a(C.brass, 0.6); g.strokeRect(ox, oy, sz * 8, sz * 8);
      if (t > s.next) {
        s.next = t + 1.5; var p = s.pc[Math.floor(Math.random() * s.pc.length)];
        var nc = clamp(p.c + Math.floor(Math.random() * 3) - 1, 0, 7), nr = clamp(p.r + Math.floor(Math.random() * 3) - 1, 0, 7);
        if (!s.pc.some(function (q) { return q.c === nc && q.r === nr; })) { p.fc = p.c; p.fr = p.r; p.c = nc; p.r = nr; p.t0 = t; }
      }
      s.pc.forEach(function (p) {
        var k = ease((t - p.t0) / 0.8), c = p.fc + (p.c - p.fc) * k, r = p.fr + (p.r - p.fr) * k;
        var x = ox + (c + 0.5) * sz, y = oy + (r + 0.5) * sz, col = p.side ? C.ink : C.brass;
        dot(g, x, y, sz * 0.3, a(col, 0.9)); dot(g, x, y, sz * 0.18, a(C.bg, 0.35));
        if (p.king) { line(g, x, y - sz * 0.45, x, y - sz * 0.2, a(col, 1), 2); line(g, x - sz * 0.1, y - sz * 0.36, x + sz * 0.1, y - sz * 0.36, a(col, 1), 2); }
      });
    }
  };

  M.quill = { // Montaigne
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var L = 6, x0 = w * 0.1, x1 = w * 0.9, tc = t % 20, fade = tc > 18 ? (20 - tc) / 2 : 1;
      var total = L * (x1 - x0), done = clamp(tc / 16, 0, 1) * total, tip = null;
      for (var l = 0; l < L; l++) {
        var y0 = h * 0.2 + l * h * 0.13;
        line(g, x0, y0 + 6, x1, y0 + 6, a(C.muted, 0.15), 1);
        var len = clamp(done - l * (x1 - x0), 0, x1 - x0); if (len <= 0) continue;
        g.strokeStyle = a(C.ink, 0.75 * fade); g.lineWidth = 1.3; g.beginPath(); var pen = false;
        for (var x = x0; x <= x0 + len; x += 1.5) {
          var gap = Math.sin(x * 0.05 + l * 2.1) > 0.82;
          var y = y0 + Math.sin(x * 0.42) * 3.2 * Math.abs(Math.sin(x * 0.09 + l)) + Math.sin(x * 0.13) * 1.5;
          if (gap) { pen = false; continue; }
          if (!pen) { g.moveTo(x, y); pen = true; } else g.lineTo(x, y);
          tip = [x, y];
        }
        g.stroke();
      }
      if (tip && tc < 16) { g.lineCap = 'round'; line(g, tip[0], tip[1], tip[0] + 38, tip[1] - 46, a(C.brass, 0.9), 2); line(g, tip[0] + 18, tip[1] - 22, tip[0] + 44, tip[1] - 40, a(C.brass, 0.4), 6); }
    }
  };

  M.swarm = { // Hobbes
    init: function (w, h, R) {
      var cx = w / 2, pts = [];
      function inside(x, y) {
        var hy = h * 0.28, hr = h * 0.1;
        if (Math.hypot(x - cx, y - hy) < hr) return true;
        if (y > h * 0.39 && y < h * 0.95) { var k = (y - h * 0.39) / (h * 0.56), half = h * (0.1 + 0.1 * k); if (Math.abs(x - cx) < half) return true; }
        if (y > h * 0.42 && y < h * 0.5 && Math.abs(x - cx) < h * 0.34) return true;
        if (y > h * 0.1 && y < h * 0.18 && Math.abs(x - cx) < h * 0.09 && (y - h * 0.1) > Math.abs(Math.sin((x - cx) / (h * 0.03))) * h * 0.06) return true;
        return false;
      }
      while (pts.length < 360) { var x = cx + (R() - 0.5) * h * 0.8, y = R() * h; if (inside(x, y)) pts.push({ tx: x, ty: y, x: R() * w, y: R() * h, ph: R() * TAU }); }
      return { p: pts };
    },
    draw: function (g, w, h, t, s, C) {
      var k = ease((Math.sin(t * TAU / 14) + 0.6) / 1.2);
      s.p.forEach(function (p, i) {
        var wx = p.x + Math.sin(t * 0.7 + p.ph) * 30, wy = p.y + Math.cos(t * 0.5 + p.ph) * 20;
        var x = wx + (p.tx - wx) * k, y = wy + (p.ty - wy) * k;
        dot(g, x, y, 1.5, a(i % 7 === 0 ? C.brass : C.ink, 0.35 + 0.45 * k));
      });
    }
  };

  M.grid = { // Descartes
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w * 0.3, cy = h * 0.62;
      for (var x = cx % 24; x < w; x += 24) line(g, x, 0, x, h, a(C.muted, 0.1), 1);
      for (var y = cy % 24; y < h; y += 24) line(g, 0, y, w, y, a(C.muted, 0.1), 1);
      line(g, 0, cy, w, cy, a(C.muted, 0.6), 1.2); line(g, cx, 0, cx, h, a(C.muted, 0.6), 1.2);
      var u = (t % 10) / 10, xe = u * w, px, py;
      g.strokeStyle = a(C.brass, 0.9); g.lineWidth = 2; g.beginPath();
      for (var xx = 0; xx <= xe; xx += 3) { var yy = cy - ((xx - cx) * (xx - cx) * 0.0016 - 20) - Math.sin(xx * 0.02) * 14; xx === 0 ? g.moveTo(xx, yy) : g.lineTo(xx, yy); px = xx; py = yy; }
      g.stroke();
      if (px !== undefined) { glow(g, px, py, 18, C.brass, 0.6); dot(g, px, py, 3, C.ink); }
      var k = 0.5 + 0.5 * Math.sin(t * 2);
      glow(g, cx, cy, 26, C.ember, 0.3 + 0.3 * k); dot(g, cx, cy, 3.5, C.ember);
      g.font = 'italic 15px "IM Fell English", Georgia, serif'; g.fillStyle = a(C.ink, 0.5 + 0.3 * k); g.fillText('cogito', cx + 10, cy + 20);
    }
  };

  M.reeds = { // Pascal
    init: function (w, h, R) { var r = []; for (var i = 0; i < 46; i++) r.push({ x: R() * w, H: h * (0.25 + R() * 0.3), ph: R() * TAU }); r[20].me = true; r[20].H = h * 0.5; r[20].x = w * 0.62; return { r: r, st: stars(R, 140, w, h, 0.55) }; },
    draw: function (g, w, h, t, s, C) {
      drawStars(g, s.st, t, C.ink);
      s.r.forEach(function (r) {
        var wind = Math.sin(t * 1.1 + r.x * 0.012) * 0.6 + Math.sin(t * 2.3 + r.ph) * 0.15;
        var tx = r.x + wind * r.H * 0.3, ty = h - r.H;
        g.strokeStyle = a(r.me ? C.brass : C.moss, r.me ? 0.95 : 0.6); g.lineWidth = r.me ? 2 : 1.3;
        g.beginPath(); g.moveTo(r.x, h); g.quadraticCurveTo(r.x, h - r.H * 0.5, tx, ty); g.stroke();
        g.fillStyle = a(r.me ? C.brass : C.muted, 0.9); g.beginPath(); g.ellipse(tx, ty - 6, 2.4, 8, wind * 0.3, 0, TAU); g.fill();
        if (r.me) glow(g, tx, ty - 6, 26, C.brass, 0.5);
      });
    }
  };

  M.lens = { // Spinoza
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var lx = w * 0.42, fx = w * 0.7, cy = h / 2, H = h * 0.38;
      g.setLineDash([6, 6]); g.lineDashOffset = -t * 30;
      for (var i = -4; i <= 4; i++) {
        var y = cy + i * H / 5;
        g.strokeStyle = a(C.brass, 0.55); g.lineWidth = 1.2; g.beginPath(); g.moveTo(0, y); g.lineTo(lx, y); g.lineTo(fx, cy); g.lineTo(w, cy + (cy - y) * ((w - fx) / (fx - lx))); g.stroke();
      }
      g.setLineDash([]);
      g.fillStyle = a(C.panel2, 0.9); g.strokeStyle = a(C.ink, 0.7); g.lineWidth = 1.5;
      g.beginPath(); g.ellipse(lx, cy, 14, H * 1.05, 0, 0, TAU); g.fill(); g.stroke();
      glow(g, fx, cy, 40, C.brass, 0.5 + 0.2 * Math.sin(t * 3)); dot(g, fx, cy, 3, C.ink);
      for (var k = 1; k < 5; k++) { g.strokeStyle = a(C.muted, 0.18); g.beginPath(); g.arc(w * 0.12, h * 0.82, k * 9, t * 0.5 * (k % 2 ? 1 : -1), t * 0.5 * (k % 2 ? 1 : -1) + 4); g.stroke(); }
    }
  };

  M.slate = { // Locke
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var W = Math.min(w * 0.6, h * 1.3), H = h * 0.74, x0 = (w - W) / 2, y0 = (h - H) / 2, tc = t % 12, cyc = Math.floor(t / 12);
      g.fillStyle = a(C.panel2, 0.9); g.fillRect(x0, y0, W, H); g.strokeStyle = a(C.brass, 0.7); g.lineWidth = 4; g.strokeRect(x0, y0, W, H);
      var R = rng(cyc * 97 + 3), n = Math.min(44, Math.floor(tc * 4)), sweep = tc > 10.5 ? x0 + (tc - 10.5) / 1.5 * W : x0 - 1;
      for (var i = 0; i < 44; i++) {
        var x = x0 + 14 + R() * (W - 40), y = y0 + 14 + R() * (H - 34), kind = R(), an = R() * TAU;
        if (i >= n || x < sweep) continue;
        g.strokeStyle = a(C.ink, 0.7); g.lineWidth = 1.4; g.beginPath();
        if (kind < 0.4) { g.moveTo(x, y); g.lineTo(x + Math.cos(an) * 12, y + Math.sin(an) * 12); }
        else if (kind < 0.7) g.arc(x, y, 5, 0, TAU * 0.8);
        else { g.moveTo(x, y); g.lineTo(x + 6, y + 10); g.lineTo(x + 12, y); }
        g.stroke();
      }
      if (tc > 10.5) line(g, sweep, y0, sweep, y0 + H, a(C.brass, 0.8), 3);
    }
  };

  M.billiards = { // Hume
    init: function (w, h, R) { var b = []; for (var i = 0; i < 4; i++) b.push({ x: w * (0.2 + 0.2 * i), y: h * (0.3 + R() * 0.4), vx: (R() - 0.5) * 220, vy: (R() - 0.5) * 160, tr: [] }); return { b: b, fx: [] }; },
    draw: function (g, w, h, t, s, C, dt) {
      var r = Math.min(14, h * 0.07), pad = 10;
      g.strokeStyle = a(C.moss, 0.5); g.lineWidth = 3; g.strokeRect(pad, pad, w - pad * 2, h - pad * 2);
      s.b.forEach(function (b) {
        b.x += b.vx * dt; b.y += b.vy * dt;
        if (b.x < pad + r || b.x > w - pad - r) { b.vx *= -1; b.x = clamp(b.x, pad + r, w - pad - r); }
        if (b.y < pad + r || b.y > h - pad - r) { b.vy *= -1; b.y = clamp(b.y, pad + r, h - pad - r); }
        b.tr.push([b.x, b.y]); if (b.tr.length > 30) b.tr.shift();
      });
      for (var i = 0; i < 4; i++) for (var j = i + 1; j < 4; j++) {
        var A = s.b[i], B = s.b[j], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy);
        if (d < r * 2 && d > 0) {
          var nx = dx / d, ny = dy / d, p = (A.vx - B.vx) * nx + (A.vy - B.vy) * ny;
          if (p > 0) { A.vx -= p * nx; A.vy -= p * ny; B.vx += p * nx; B.vy += p * ny; s.fx.push({ x: A.x + nx * r, y: A.y + ny * r, t0: t }); }
        }
      }
      s.fx = s.fx.filter(function (f) { var age = t - f.t0; if (age > 1) return false; g.strokeStyle = a(C.brass, 1 - age); g.beginPath(); g.arc(f.x, f.y, age * 30, 0, TAU); g.stroke(); return true; });
      s.b.forEach(function (b, i) {
        b.tr.forEach(function (p, k) { dot(g, p[0], p[1], r * 0.4, a(C.muted, k / 30 * 0.25)); });
        dot(g, b.x, b.y, r, i === 0 ? a(C.ink, 0.95) : a([C.brass, C.ember, C.moss][i - 1], 0.95));
      });
    }
  };

  M.chains = { // Rousseau
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var tc = t % 10, gap = tc < 5 ? 0 : tc < 8 ? ease((tc - 5) / 1.2) * 60 : (1 - ease((tc - 8) / 2)) * 60;
      var sway = Math.sin(t * 0.8) * 6, cx = w / 2;
      for (var x = -20, i = 0; x < w + 20; x += 20, i++) {
        var side = x < cx ? -1 : 1, xx = x + side * gap / 2;
        var y = h * 0.4 + 40 * (1 - Math.pow((x - cx) / (w / 2), 2)) + sway * Math.sin(x * 0.01) + (gap > 0 ? Math.abs(x - cx) < w / 2 ? gap * 0.6 * (1 - Math.abs(x - cx) / (w / 2)) : 0 : 0);
        g.strokeStyle = a(C.muted, 0.9); g.lineWidth = 2.4; g.beginPath();
        if (i % 2) g.ellipse(xx, y, 12, 6, 0, 0, TAU); else { g.moveTo(xx - 12, y); g.lineTo(xx + 12, y); }
        g.stroke();
      }
      if (gap > 0) { var fall = Math.min(1, (tc - 5) / 2) * h * 0.5; g.strokeStyle = a(C.brass, 1 - (tc - 5) / 5); g.lineWidth = 2.4; g.beginPath(); g.arc(cx - 8, h * 0.4 + 40 + fall, 7, 0.5, 3.4); g.stroke(); g.beginPath(); g.arc(cx + 10, h * 0.4 + 44 + fall * 1.1, 7, 3.6, 6.4); g.stroke(); }
      glow(g, cx, h * 0.4 + 40, 30 + gap, C.brass, gap / 120);
    }
  };

  M.stars = { // Kant
    init: function (w, h, R) { return { st: stars(R, 180, w, h, 0.9), con: null, t0: 0 }; },
    draw: function (g, w, h, t, s, C) {
      drawStars(g, s.st, t, C.ink);
      if (!s.con || t - s.t0 > 6) {
        s.t0 = t; var c = s.st[Math.floor(Math.random() * s.st.length)];
        s.con = s.st.filter(function (p) { return Math.hypot(p.x - c.x, p.y - c.y) < 120; }).slice(0, 6).sort(function (p, q) { return p.x - q.x; });
      }
      var k = clamp((t - s.t0) / 2.5, 0, 1), fade = clamp((6 - (t - s.t0)) / 1.5, 0, 1);
      g.strokeStyle = a(C.brass, 0.6 * fade); g.lineWidth = 1; g.beginPath();
      var n = Math.floor(k * (s.con.length - 1));
      s.con.forEach(function (p, i) { if (i <= n + 1) { i ? g.lineTo(p.x, p.y) : g.moveTo(p.x, p.y); } });
      g.stroke();
      s.con.forEach(function (p) { dot(g, p.x, p.y, 2, a(C.brass, fade)); });
      figure(g, w * 0.08, h, 0.9, a(C.muted, 0.9), -0.15);
    }
  };

  M.dialectic = { // Hegel
    init: function () { return { hist: [] }; },
    draw: function (g, w, h, t, s, C) {
      var cyc = Math.floor(t / 6), u = (t % 6) / 6, cols = [C.brass, C.moss, C.ember], cA = cols[cyc % 3], cB = cols[(cyc + 1) % 3];
      s.hist.forEach(function (p) { p.y -= 0.3; dot(g, p.x, p.y, p.r, a(p.c, Math.max(0, p.y / h) * 0.5)); });
      s.hist = s.hist.filter(function (p) { return p.y > 0; });
      if (u < 0.5) {
        var k = ease(u / 0.5), y = h * 0.62;
        dot(g, w * 0.2 + (w * 0.3) * k - 8 * k, y, 14, a(cA, 0.9)); dot(g, w * 0.8 - (w * 0.3) * k + 8 * k, y, 14, a(cB, 0.9));
      } else {
        var m = ease((u - 0.5) / 0.5), cy = h * 0.62 - m * h * 0.3, r = 16 + 8 * m;
        glow(g, w / 2, cy, 60, C.ink, (1 - m) * 0.5); dot(g, w / 2, cy, r, a(cA, 0.7)); dot(g, w / 2, cy, r * 0.6, a(cB, 0.8));
        if (u > 0.98 && (!s.hist.length || s.hist[s.hist.length - 1].cyc !== cyc)) s.hist.push({ x: w / 2 + (Math.random() - 0.5) * 30, y: cy, r: 5, c: cA, cyc: cyc });
      }
    }
  };

  M.pendulum = { // Schopenhauer
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var px = w / 2, py = h * 0.06, L = h * 0.74, an = 0.75 * Math.sin(t * 1.5), bx = px + Math.sin(an) * L, by = py + Math.cos(an) * L;
      g.setLineDash([3, 5]); g.strokeStyle = a(C.muted, 0.35); g.beginPath(); g.arc(px, py, L, Math.PI / 2 - 0.78, Math.PI / 2 + 0.78); g.stroke(); g.setLineDash([]);
      line(g, px, py, bx, by, a(C.ink, 0.8), 1.5); dot(g, px, py, 4, C.muted);
      glow(g, bx, by, 34, C.brass, 0.35); dot(g, bx, by, 13, a(C.brass, 0.95));
      g.font = 'italic 20px "IM Fell English", Georgia, serif'; g.textAlign = 'center';
      g.fillStyle = a(C.ember, 0.25 + 0.7 * clamp(Math.sin(an) / -0.75, 0, 1)); g.fillText('pain', px - Math.sin(0.75) * L - 20, py + Math.cos(0.75) * L + 34);
      g.fillStyle = a(C.moss, 0.25 + 0.7 * clamp(Math.sin(an) / 0.75, 0, 1)); g.fillText('boredom', px + Math.sin(0.75) * L + 20, py + Math.cos(0.75) * L + 34);
    }
  };

  M.vertigo = { // Kierkegaard
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, cy = h / 2, N = 22, off = (t * 0.35) % 1;
      glow(g, cx, cy, 60, C.shade, 0.9);
      for (var i = N; i >= 1; i--) {
        var k = (i - off) / N; if (k <= 0) continue;
        var sz = Math.pow(k, 1.7) * Math.max(w, h) * 1.1;
        g.save(); g.translate(cx, cy); g.rotate(i * 0.09 * Math.sin(t * 0.25) + t * 0.04);
        g.strokeStyle = a(i % 3 === 0 ? C.brass : C.muted, 0.15 + 0.6 * k); g.lineWidth = 1 + k; g.strokeRect(-sz / 2, -sz / 2, sz, sz); g.restore();
      }
    }
  };

  M.scales = { // Mill
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, py = h * 0.22, L = Math.min(w * 0.3, h * 0.9), tilt = 0.16 * Math.sin(t * 0.6) + 0.05 * Math.sin(t * 1.7);
      line(g, cx, py, cx, h * 0.92, a(C.muted, 0.9), 3); line(g, cx - 30, h * 0.92, cx + 30, h * 0.92, a(C.muted, 0.9), 3);
      var lx = cx - Math.cos(tilt) * L, ly = py - Math.sin(tilt) * L, rx = cx + Math.cos(tilt) * L, ry = py + Math.sin(tilt) * L;
      line(g, lx, ly, rx, ry, a(C.brass, 0.95), 3); dot(g, cx, py, 5, C.brass);
      [[lx, ly, 3, C.brass], [rx, ry, 5, C.moss]].forEach(function (p) {
        var d = h * 0.34;
        line(g, p[0], p[1], p[0] - 26, p[1] + d, a(C.muted, 0.6), 1); line(g, p[0], p[1], p[0] + 26, p[1] + d, a(C.muted, 0.6), 1);
        g.strokeStyle = a(C.brass, 0.9); g.lineWidth = 2; g.beginPath(); g.arc(p[0], p[1] + d, 30, 0.1, Math.PI - 0.1); g.stroke();
        for (var i = 0; i < p[2]; i++) dot(g, p[0] - 14 + i * 7, p[1] + d + 8 - (i % 2) * 5, 3.5, a(p[3], 0.9));
      });
    }
  };

  M.gears = { // Marx
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      function gear(x, y, r, n, an, col) {
        g.save(); g.translate(x, y); g.rotate(an); g.beginPath();
        for (var i = 0; i < n * 2; i++) { var a0 = i * Math.PI / n, rr = i % 2 ? r : r + r * 0.16; g.lineTo(Math.cos(a0 - 0.12) * rr, Math.sin(a0 - 0.12) * rr); g.lineTo(Math.cos(a0 + 0.12) * rr, Math.sin(a0 + 0.12) * rr); }
        g.closePath(); g.fillStyle = a(C.panel2, 0.9); g.fill(); g.strokeStyle = a(col, 0.85); g.lineWidth = 2; g.stroke();
        g.beginPath(); g.arc(0, 0, r * 0.25, 0, TAU); g.stroke();
        for (var k = 0; k < 4; k++) { g.beginPath(); g.moveTo(Math.cos(k * TAU / 4) * r * 0.25, Math.sin(k * TAU / 4) * r * 0.25); g.lineTo(Math.cos(k * TAU / 4) * r * 0.8, Math.sin(k * TAU / 4) * r * 0.8); g.stroke(); }
        g.restore();
      }
      var r1 = h * 0.3, r2 = h * 0.19, r3 = h * 0.14, x1 = w * 0.42, y1 = h * 0.55, w1 = t * 0.4;
      gear(x1, y1, r1, 14, w1, C.brass);
      gear(x1 + r1 + r2 + r1 * 0.08, y1 - h * 0.05, r2, 9, -w1 * r1 / r2 + 0.2, C.moss);
      gear(x1 - r1 - r3 - r1 * 0.02, y1 - h * 0.2, r3, 7, -w1 * r1 / r3 + 0.3, C.ember);
    }
  };

  M.pond = { // Thoreau
    init: function (w, h, R) { var tr = []; for (var i = 0; i < 16; i++) tr.push({ x: i * w / 15 + (R() - 0.5) * 20, H: 30 + R() * 50 }); return { lv: [], rip: [], next: 0, tr: tr }; },
    draw: function (g, w, h, t, s, C, dt) {
      g.fillStyle = a(C.panel2, 0.5); g.beginPath(); g.ellipse(w / 2, h * 0.68, w * 0.48, h * 0.3, 0, 0, TAU); g.fill();
      s.tr.forEach(function (p) { g.fillStyle = a(C.moss, 0.35); g.beginPath(); g.moveTo(p.x - 12, p.H + 10); g.lineTo(p.x, 10 - p.H * 0.1); g.lineTo(p.x + 12, p.H + 10); g.fill(); });
      if (t > s.next) { s.next = t + 1.1; s.lv.push({ x: w * (0.15 + Math.random() * 0.7), y: -10, ty: h * (0.5 + Math.random() * 0.35), rot: Math.random() * TAU, c: [C.brass, C.ember, C.moss][Math.floor(Math.random() * 3)], landed: 0 }); }
      s.lv = s.lv.filter(function (l) {
        if (!l.landed) { l.y += 38 * dt; l.x += Math.sin(t * 2 + l.rot) * 0.8; l.rot += dt * 2; if (l.y >= l.ty) { l.landed = t; s.rip.push({ x: l.x, y: l.y, t0: t }); } }
        var al = l.landed ? clamp(1 - (t - l.landed) / 6, 0, 1) : 1; if (al <= 0) return false;
        g.save(); g.translate(l.x, l.y); g.rotate(l.rot); g.fillStyle = a(l.c, 0.85 * al); g.beginPath(); g.ellipse(0, 0, 6, 3, 0, 0, TAU); g.fill(); g.restore(); return true;
      });
      s.rip = s.rip.filter(function (r) { var age = t - r.t0; if (age > 3) return false; g.strokeStyle = a(C.ink, 0.5 * (1 - age / 3)); g.beginPath(); g.ellipse(r.x, r.y, age * 30, age * 9, 0, 0, TAU); g.stroke(); return true; });
    }
  };

  M.recurrence = { // Nietzsche
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, cy = h / 2, R0 = Math.min(w, h) * 0.4;
      for (var i = 0; i < 72; i++) { var an = i * TAU / 72 + t * 0.05; dot(g, cx + Math.cos(an) * R0, cy + Math.sin(an) * R0, 1.2, a(C.muted, 0.6)); }
      for (var k = 0; k < 44; k++) { var a2 = t * 1.2 - k * 0.05; dot(g, cx + Math.cos(a2) * R0, cy + Math.sin(a2) * R0, 4 - k * 0.08, a(C.brass, 1 - k / 44)); }
      var u = (t % 7) / 7, sc = Math.sin(u * Math.PI);
      g.save(); g.translate(cx, cy); g.rotate(t * 0.8); g.beginPath();
      for (var j = 0; j < 10; j++) { var rr = (j % 2 ? 0.4 : 1) * R0 * 0.35 * sc; g.lineTo(Math.cos(j * Math.PI / 5) * rr, Math.sin(j * Math.PI / 5) * rr); }
      g.closePath(); g.fillStyle = a(C.ember, 0.8 * sc); g.fill(); g.restore();
      glow(g, cx, cy, R0 * 0.5, C.ember, 0.25 * sc);
    }
  };

  M.flybottle = { // Wittgenstein
    init: function (w, h) { return { f: { x: w / 2, y: h * 0.65, vx: 60, vy: 40 }, t0: 0, out: false }; },
    draw: function (g, w, h, t, s, C, dt) {
      var cx = w / 2, bw = Math.min(w * 0.25, h * 0.55), top = h * 0.35, bot = h * 0.94, nw = bw * 0.28, mouth = h * 0.08;
      g.strokeStyle = a(C.ink, 0.6); g.lineWidth = 2; g.beginPath();
      g.moveTo(cx - nw / 2, mouth); g.lineTo(cx - nw / 2, top - 20); g.quadraticCurveTo(cx - bw / 2, top, cx - bw / 2, top + 30); g.lineTo(cx - bw / 2, bot); g.lineTo(cx + bw / 2, bot); g.lineTo(cx + bw / 2, top + 30); g.quadraticCurveTo(cx + bw / 2, top, cx + nw / 2, top - 20); g.lineTo(cx + nw / 2, mouth); g.stroke();
      g.fillStyle = a(C.moss, 0.07); g.fill();
      var f = s.f, age = t - s.t0;
      if (!s.out) {
        f.vx += (Math.random() - 0.5) * 900 * dt; f.vy += (Math.random() - 0.5) * 900 * dt; f.vx *= 0.97; f.vy *= 0.97;
        if (age > 8) { f.vx += (cx - f.x) * 4 * dt; f.vy -= 260 * dt; }
        f.x += f.vx * dt; f.y += f.vy * dt;
        var halfW = f.y < top ? nw / 2 - 4 : bw / 2 - 5;
        if (f.x < cx - halfW) { f.x = cx - halfW; f.vx = Math.abs(f.vx); } if (f.x > cx + halfW) { f.x = cx + halfW; f.vx = -Math.abs(f.vx); }
        if (f.y > bot - 5) { f.y = bot - 5; f.vy = -Math.abs(f.vy); }
        if (f.y < top + 10 && age < 8) { f.y = top + 10; f.vy = Math.abs(f.vy); }
        if (f.y < mouth) { s.out = true; s.outT = t; }
      } else {
        f.y -= 60 * dt; f.x += Math.sin(t * 5) * 1.5 + 50 * dt;
        if (t - s.outT > 3) { s.out = false; s.t0 = t; f.x = cx; f.y = bot - 30; }
      }
      var fl = Math.abs(Math.sin(t * 40));
      g.fillStyle = a(C.muted, 0.6); g.beginPath(); g.ellipse(f.x - 3, f.y - 2, 4, 2 * fl + 0.5, -0.5, 0, TAU); g.ellipse(f.x + 3, f.y - 2, 4, 2 * fl + 0.5, 0.5, 0, TAU); g.fill();
      dot(g, f.x, f.y, 2.6, a(C.ink, 0.95));
      if (s.out) glow(g, f.x, f.y, 24, C.brass, 0.4);
    }
  };

  M.forest = { // Heidegger
    init: function (w, h, R) { var L = []; for (var l = 0; l < 3; l++) { var tr = []; for (var i = 0; i < 18; i++) tr.push({ x: R() * w * 1.6, w: (4 + R() * 10) * (l + 1) * 0.6 }); L.push(tr); } return { L: L }; },
    draw: function (g, w, h, t, s, C) {
      glow(g, w / 2, h * 0.55, h * 0.8, C.brass, 0.35 + 0.05 * Math.sin(t * 0.5));
      for (var r = 0; r < 5; r++) { g.fillStyle = a(C.brass, 0.04); g.beginPath(); g.moveTo(w * 0.42 + r * 12, 0); g.lineTo(w * 0.46 + r * 12, 0); g.lineTo(w * 0.35 + r * 30, h); g.lineTo(w * 0.3 + r * 30, h); g.fill(); }
      g.fillStyle = a(C.panel2, 0.8); g.beginPath(); g.moveTo(w * 0.48, h * 0.62); g.lineTo(w * 0.52, h * 0.62); g.lineTo(w * 0.7, h); g.lineTo(w * 0.3, h); g.fill();
      s.L.forEach(function (tr, l) {
        var sp = (l + 1) * 4;
        tr.forEach(function (p) {
          var x = ((p.x - t * sp) % (w * 1.6) + w * 1.6) % (w * 1.6) - w * 0.3;
          if (Math.abs(x - w / 2) < w * (0.1 + l * 0.02)) return;
          g.fillStyle = a(l === 2 ? C.shade : C.muted, l === 2 ? 0.85 : 0.25 + l * 0.2); g.fillRect(x, 0, p.w, h);
        });
      });
    }
  };

  M.roots = { // Sartre
    init: function (w, h, R) {
      var seg = [];
      function grow(x, y, an, len, d) {
        if (d > 7 || len < 4) return;
        var x2 = x + Math.cos(an) * len, y2 = y + Math.sin(an) * len;
        seg.push({ x: x, y: y, x2: x2, y2: y2, d: d, wd: Math.max(0.6, 7 - d) });
        var n = R() < 0.35 ? 2 : 1;
        for (var i = 0; i < n; i++) grow(x2, y2, an + (R() - 0.5) * 1.1, len * (0.72 + R() * 0.2), d + (n > 1 ? 1 : 0.5));
      }
      for (var k = 0; k < 3; k++) grow(w * (0.35 + k * 0.15), 0, Math.PI / 2 + (R() - 0.5) * 0.8, h * 0.18, 0);
      return { seg: seg };
    },
    draw: function (g, w, h, t, s, C) {
      var tc = t % 18, grown = clamp(tc / 12, 0, 1) * 8, fade = tc > 16 ? (18 - tc) / 2 : 1;
      g.lineCap = 'round';
      s.seg.forEach(function (p) {
        var k = clamp(grown - p.d, 0, 1); if (k <= 0) return;
        line(g, p.x, p.y, p.x + (p.x2 - p.x) * k, p.y + (p.y2 - p.y) * k, a(p.d < 2 ? C.ink : C.muted, (0.9 - p.d * 0.08) * fade), p.wd);
      });
    }
  };

  M.becoming = { // Beauvoir
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, cy = h / 2, R0 = Math.min(w, h) * 0.34;
      function shape(sc, ph, col, al, dx) {
        g.beginPath();
        for (var i = 0; i <= 120; i++) {
          var th = i / 120 * TAU, r = R0 * sc * (1 + 0.12 * Math.sin(3 * th + t * 0.7 + ph) + 0.08 * Math.sin(5 * th - t * 1.1 + ph) + 0.05 * Math.sin(2 * th + t * 0.3));
          var x = cx + dx + Math.cos(th) * r, y = cy + Math.sin(th) * r; i ? g.lineTo(x, y) : g.moveTo(x, y);
        }
        g.strokeStyle = a(col, al); g.lineWidth = 1.5; g.stroke();
      }
      shape(1, 2, C.muted, 0.2, 60);
      for (var k = 0; k < 5; k++) shape(1 - k * 0.17, k * 0.6, k % 2 ? C.moss : C.brass, 0.75 - k * 0.1, 0);
    }
  };

  M.sisyphus = { // Camus
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var x0 = w * 0.08, y0 = h * 0.92, x1 = w * 0.72, y1 = h * 0.28;
      glow(g, w * 0.86, h * 0.2, h * 0.5, C.ember, 0.35); dot(g, w * 0.86, h * 0.2, h * 0.08, a(C.ember, 0.8));
      g.fillStyle = a(C.panel2, 0.9); g.beginPath(); g.moveTo(0, h); g.lineTo(x0, y0); g.lineTo(x1, y1); g.lineTo(w, y1); g.lineTo(w, h); g.fill();
      line(g, x0, y0, x1, y1, a(C.muted, 0.8), 2); line(g, x1, y1, w, y1, a(C.muted, 0.8), 2);
      var tc = t % 13, rb, pf, lean = 0.45;
      if (tc < 8) { rb = ease(tc / 8) * 0.96; pf = rb - 0.07; }
      else if (tc < 9.5) { var k = (tc - 8) / 1.5; rb = 0.96 * (1 - k * k); pf = 0.89; lean = 0; }
      else { rb = 0; pf = 0.89 * (1 - ease((tc - 9.5) / 3.5)) + 0.0; lean = 0; }
      var br = h * 0.075, nx = -(y1 - y0), ny = (x1 - x0), nl = Math.hypot(nx, ny); nx /= -nl; ny /= -nl;
      var bx = x0 + (x1 - x0) * rb + nx * br, by = y0 + (y1 - y0) * rb + ny * br;
      dot(g, bx, by, br, a(C.muted, 0.95)); g.strokeStyle = a(C.ink, 0.3); g.beginPath(); g.arc(bx, by, br * 0.6, t * (tc < 8 ? -2 : 4), t * (tc < 8 ? -2 : 4) + 2); g.stroke();
      var fx = x0 + (x1 - x0) * pf, fy = y0 + (y1 - y0) * pf;
      figure(g, fx, fy, 0.8, a(C.ink, 0.95), tc < 8 ? lean : 0);
    }
  };

  M.candle = { // Simone Weil
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, base = h * 0.95, top = h * 0.55, fl = 1 + 0.05 * Math.sin(t * 9) + 0.03 * Math.sin(t * 23), sw = Math.sin(t * 2.7) * 1.5;
      glow(g, cx, top - 20, h * 0.8 * fl, C.brass, 0.28);
      g.fillStyle = a(C.ink, 0.85); g.fillRect(cx - 14, top, 28, base - top);
      g.fillStyle = a(C.panel2, 0.6); g.fillRect(cx + 4, top, 6, base - top);
      line(g, cx, top, cx, top - 8, a(C.bg, 1), 2);
      var fh = 40 * fl, gr = g.createRadialGradient(cx, top - 14, 1, cx, top - 14, fh);
      gr.addColorStop(0, a(C.hot, 1)); gr.addColorStop(0.35, a(C.brass, 0.95)); gr.addColorStop(1, a(C.ember, 0));
      g.fillStyle = gr; g.beginPath(); g.moveTo(cx, top - 4);
      g.quadraticCurveTo(cx - 11, top - 16, cx + sw, top - 8 - fh); g.quadraticCurveTo(cx + 11, top - 16, cx, top - 4); g.fill();
    }
  };

  M.plurality = { // Arendt
    init: function (w, h, R) { var p = []; for (var i = 0; i < 38; i++) p.push({ x: w * (0.05 + R() * 0.9), y: h * (0.1 + R() * 0.8), ph: R() * TAU, born: -10 }); return { p: p, links: [], next: 0, nb: 3 }; },
    draw: function (g, w, h, t, s, C) {
      if (t > s.next) {
        s.next = t + 0.45;
        var A = s.p[Math.floor(Math.random() * s.p.length)], cands = s.p.filter(function (B) { return B !== A && Math.hypot(A.x - B.x, A.y - B.y) < w * 0.22; });
        if (cands.length) s.links.push({ A: A, B: cands[Math.floor(Math.random() * cands.length)], t0: t });
      }
      if (t > s.nb) { s.nb = t + 4; var o = s.p.shift(); o.x = w * (0.05 + Math.random() * 0.9); o.y = h * (0.1 + Math.random() * 0.8); o.born = t; s.p.push(o); }
      s.links = s.links.filter(function (l) { var age = t - l.t0; if (age > 3) return false; line(g, l.A.x, l.A.y, l.B.x, l.B.y, a(C.brass, 0.6 * (1 - age / 3)), 1); return true; });
      s.p.forEach(function (p) {
        var x = p.x + Math.sin(t * 0.4 + p.ph) * 4, y = p.y + Math.cos(t * 0.3 + p.ph) * 4, age = t - p.born;
        if (age < 3) { g.strokeStyle = a(C.ember, 1 - age / 3); g.beginPath(); g.arc(x, y, age * 16, 0, TAU); g.stroke(); }
        dot(g, x, y, 3, a(age < 3 ? C.ember : C.ink, 0.85));
      });
    }
  };

  M.panopticon = { // Foucault
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, cy = h / 2, R0 = h * 0.4, sx = Math.min(1.9, w / h * 0.8), beam = t * 0.6;
      g.save(); g.translate(cx, cy); g.scale(sx, 1);
      var gr = g.createRadialGradient(0, 0, 0, 0, 0, R0 * 1.1); gr.addColorStop(0, a(C.brass, 0.4)); gr.addColorStop(1, a(C.brass, 0));
      g.fillStyle = gr; g.beginPath(); g.moveTo(0, 0); g.arc(0, 0, R0 * 1.1, beam - 0.2, beam + 0.2); g.fill();
      g.restore();
      for (var i = 0; i < 26; i++) {
        var an = i * TAU / 26, d = Math.abs(((an - beam) % TAU + TAU + Math.PI) % TAU - Math.PI), lit = clamp(1 - d / 0.35, 0, 1);
        var x = cx + Math.cos(an) * R0 * sx, y = cy + Math.sin(an) * R0;
        g.save(); g.translate(x, y); g.rotate(an); g.strokeStyle = a(C.muted, 0.7); g.lineWidth = 1; g.strokeRect(-7, -9, 14, 18);
        g.fillStyle = a(C.brass, 0.1 + 0.5 * lit); g.fillRect(-7, -9, 14, 18); g.restore();
        dot(g, x + (lit ? 0 : Math.sin(t * 3 + i) * 2), y, 2, a(C.ink, 0.5 + 0.5 * lit));
      }
      dot(g, cx, cy, h * 0.09, a(C.panel2, 1)); g.strokeStyle = a(C.brass, 0.9); g.lineWidth = 2; g.beginPath(); g.arc(cx, cy, h * 0.09, 0, TAU); g.stroke();
      dot(g, cx + Math.cos(beam) * h * 0.05, cy + Math.sin(beam) * h * 0.05, 3, C.brass);
    }
  };

  M.stream = { // William James
    init: function (w, h, R, o) {
      var words = (o.words && o.words.length ? o.words : ['thought']), p = [];
      for (var i = 0; i < 26; i++) p.push({ w: words[i % words.length], x: R() * w, y: h * (0.1 + R() * 0.8), z: 0.3 + R() * 0.7 });
      return { p: p };
    },
    draw: function (g, w, h, t, s, C, dt) {
      for (var k = 0; k < 6; k++) { g.beginPath(); for (var x = 0; x <= w; x += 8) { var y = h * (0.2 + k * 0.13) + Math.sin(x * 0.01 + t * 0.8 + k) * 8; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.strokeStyle = a(C.moss, 0.2); g.stroke(); }
      s.p.sort(function (A, B) { return A.z - B.z; }).forEach(function (p) {
        p.x += (14 + p.z * 40) * dt; var tw = g.measureText(p.w).width; if (p.x > w + 20) p.x = -tw - 200 * Math.random();
        g.font = 'italic ' + Math.round(11 + p.z * 16) + 'px "IM Fell English", Georgia, serif';
        var edge = Math.min(1, p.x / 80, (w - p.x) / 80);
        g.fillStyle = a(p.z > 0.75 ? C.brass : C.ink, (0.15 + p.z * 0.6) * clamp(edge, 0, 1));
        g.fillText(p.w, p.x, p.y + Math.sin(t * 0.8 + p.x * 0.01) * 8);
      });
    }
  };

  M.iceberg = { // Freud
    init: function (w, h, R) { var b = []; for (var i = 0; i < 20; i++) b.push({ x: R() * w, y: R() * h, v: 8 + R() * 14 }); return { b: b }; },
    draw: function (g, w, h, t, s, C, dt) {
      var wl = h * 0.3 + Math.sin(t * 0.8) * 3, cx = w / 2, bob = Math.sin(t * 0.6) * 4;
      var gr = g.createLinearGradient(0, wl, 0, h); gr.addColorStop(0, a(C.moss, 0.18)); gr.addColorStop(1, a(C.bg, 0.2)); g.fillStyle = gr; g.fillRect(0, wl, w, h - wl);
      g.fillStyle = a(C.muted, 0.28); g.beginPath(); g.moveTo(cx - w * 0.06, wl); g.lineTo(cx - w * 0.2, wl + h * 0.3 + bob); g.lineTo(cx - w * 0.12, h * 0.98 + bob); g.lineTo(cx + w * 0.16, h * 0.9 + bob); g.lineTo(cx + w * 0.22, wl + h * 0.25 + bob); g.lineTo(cx + w * 0.07, wl); g.fill();
      g.fillStyle = a(C.ink, 0.9); g.beginPath(); g.moveTo(cx - w * 0.06, wl); g.lineTo(cx - w * 0.02, wl - h * 0.2 + bob); g.lineTo(cx + w * 0.015, wl - h * 0.12 + bob); g.lineTo(cx + w * 0.04, wl - h * 0.17 + bob); g.lineTo(cx + w * 0.07, wl); g.fill();
      g.beginPath(); for (var x = 0; x <= w; x += 6) { var y = wl + Math.sin(x * 0.05 + t * 2) * 1.5; x ? g.lineTo(x, y) : g.moveTo(x, y); } g.strokeStyle = a(C.brass, 0.8); g.lineWidth = 1.2; g.stroke();
      s.b.forEach(function (b) { b.y -= b.v * dt; if (b.y < wl) { b.y = h; b.x = Math.random() * w; } g.strokeStyle = a(C.ink, 0.3); g.beginPath(); g.arc(b.x + Math.sin(t * 2 + b.x) * 2, b.y, 2, 0, TAU); g.stroke(); });
    }
  };

  M.mandala = { // Jung
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, cy = h / 2, R0 = Math.min(w, h) * 0.46;
      g.save(); g.translate(cx, cy);
      for (var L = 0; L < 6; L++) {
        var n = 6 + L * 2, r = R0 * (0.2 + L * 0.15), rot = t * 0.08 * (L % 2 ? 1 : -1);
        g.strokeStyle = a(C.muted, 0.3); g.lineWidth = 1; g.beginPath(); g.arc(0, 0, r, 0, TAU); g.stroke();
        for (var i = 0; i < n; i++) {
          g.save(); g.rotate(rot + i * TAU / n); g.translate(r, 0);
          g.strokeStyle = a([C.brass, C.moss, C.ember][L % 3], 0.75); g.beginPath();
          if (L % 3 === 0) g.ellipse(0, 0, R0 * 0.07, R0 * 0.025, 0, 0, TAU);
          else if (L % 3 === 1) g.arc(0, 0, R0 * 0.03, 0, TAU);
          else { g.moveTo(-R0 * 0.04, R0 * 0.03); g.lineTo(R0 * 0.05, 0); g.lineTo(-R0 * 0.04, -R0 * 0.03); g.closePath(); }
          g.stroke(); g.restore();
        }
      }
      g.restore();
      glow(g, cx, cy, R0 * 0.22, C.brass, 0.4 + 0.2 * Math.sin(t)); dot(g, cx, cy, 4, C.ink);
    }
  };

  M.steps = { // Adler
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      var n = 9, sw = w * 0.7 / n, sh = h * 0.72 / n, x0 = w * 0.12, y0 = h * 0.95;
      g.strokeStyle = a(C.brass, 0.7); g.lineWidth = 2; g.beginPath(); g.moveTo(x0 - 20, y0);
      for (var i = 0; i < n; i++) { g.lineTo(x0 + i * sw, y0 - i * sh); g.lineTo(x0 + i * sw, y0 - (i + 1) * sh); } g.lineTo(x0 + n * sw + 30, y0 - n * sh); g.stroke();
      var p = (t * 0.7) % (n + 2), st = Math.min(n, Math.floor(p)), fr = p - Math.floor(p);
      var slip = st === 4 && fr > 0.5 ? -ease((fr - 0.5) * 2) * 0.6 : 0;
      var x = x0 + (st + (st < n ? fr : 0.5) + slip) * sw, y = y0 - (st + (st < n ? ease(fr) : 1) + slip) * sh - (st < n ? Math.sin(fr * Math.PI) * 10 : 0);
      figure(g, x - sw * 0.5, y, 0.6, a(C.ink, 0.95));
      if (st >= n) glow(g, x - sw * 0.5, y - 20, 50, C.brass, 0.5);
      figure(g, x0 + n * sw + 10, y0 - n * sh, 0.6, a(C.moss, 0.9));
    }
  };

  M.binary = { // Fromm
    init: function () { return { tA: [], tB: [] }; },
    draw: function (g, w, h, t, s, C) {
      var cx = w / 2, cy = h / 2, r = h * 0.2 * (1 + 0.2 * Math.sin(t * 0.3)), an = t * 0.9;
      var A = [cx + Math.cos(an) * r * 1.4, cy + Math.sin(an) * r], B = [cx - Math.cos(an) * r * 1.4, cy - Math.sin(an) * r];
      s.tA.push(A); s.tB.push(B); if (s.tA.length > 90) { s.tA.shift(); s.tB.shift(); }
      [[s.tA, C.brass], [s.tB, C.moss]].forEach(function (p) { p[0].forEach(function (q, i) { dot(g, q[0], q[1], 1.6, a(p[1], i / 90 * 0.6)); }); });
      glow(g, A[0], A[1], 26, C.brass, 0.5); glow(g, B[0], B[1], 26, C.moss, 0.5);
      dot(g, A[0], A[1], 5, C.brass); dot(g, B[0], B[1], 5, C.moss);
    }
  };

  M.dawn = { // Frankl
    init: function (w, h, R) { return { st: stars(R, 130, w, h, 0.7) }; },
    draw: function (g, w, h, t, s, C) {
      var u = (t % 16) / 16, k = Math.sin(u * Math.PI), hy = h * 0.78, sy = hy + 30 - k * h * 0.4;
      var gr = g.createLinearGradient(0, 0, 0, hy); gr.addColorStop(0, a(C.bg, 0)); gr.addColorStop(1, a(C.ember, 0.35 * k)); g.fillStyle = gr; g.fillRect(0, 0, w, hy);
      drawStars(g, s.st, t, C.ink, 1 - k * 0.8);
      glow(g, w / 2, sy, 40 + 120 * k, C.brass, 0.6 * k + 0.1); dot(g, w / 2, sy, 3 + 5 * k, a(C.hot, 0.95));
      g.fillStyle = a(C.panel2, 1); g.beginPath(); g.moveTo(0, h); g.lineTo(0, hy);
      for (var x = 0; x <= w; x += 20) g.lineTo(x, hy + Math.sin(x * 0.012) * 10 + Math.sin(x * 0.04) * 3);
      g.lineTo(w, h); g.fill();
    }
  };

  M.towers = { // Becker
    init: function () { return {}; },
    draw: function (g, w, h, t, s, C) {
      [0.25, 0.5, 0.75].forEach(function (fx, i) {
        var ph = (t + i * 3.3) % 10, bw = Math.min(w * 0.08, 40), bh = h * 0.065, x = w * fx, base = h * 0.94, n = 11;
        var sand = 4 + 3 * Math.sin((t + i) * 0.2);
        g.fillStyle = a(C.brass, 0.35); g.beginPath(); g.ellipse(x, base, bw * 1.3, sand, 0, Math.PI, TAU); g.fill();
        for (var b = 0; b < n; b++) {
          var appear = b * 0.45; if (ph < appear) continue;
          var y = base - (b + 1) * bh, drop = clamp((ph - appear) / 0.3, 0, 1), off = b % 2 ? 3 : -3, al = 0.85;
          y -= (1 - ease(drop)) * 30;
          if (ph > 7) { var c = (ph - 7) / 3, fall = c * c * h * (0.3 + b * 0.05); y += fall; al *= 1 - c; off += (b % 2 ? 1 : -1) * c * 40; }
          g.fillStyle = a(b % 3 ? C.muted : C.ember, al); g.fillRect(x - bw / 2 + off, y, bw, bh - 2);
        }
      });
    }
  };

  M.snow = { // Dostoevsky
    init: function (w, h, R) { var f = []; for (var i = 0; i < 150; i++) f.push({ x: R() * w, y: R() * h, v: 12 + R() * 28, r: 0.6 + R() * 1.8, ph: R() * TAU }); return { f: f }; },
    draw: function (g, w, h, t, s, C, dt) {
      var lx = w * 0.78, ly = h * 0.3;
      g.fillStyle = a(C.panel2, 1); g.fillRect(0, h * 0.35, w * 0.4, h * 0.65); g.fillRect(w * 0.4, h * 0.5, w * 0.18, h * 0.5);
      for (var r = 0; r < 3; r++) for (var c = 0; c < 4; c++) { var on = (r * 4 + c) % 3 !== 1; var fl = r === 1 && c === 2 ? 0.5 + 0.5 * Math.sin(t * 6) : 1; g.fillStyle = a(on ? C.brass : C.bg, on ? 0.7 * fl : 0.6); g.fillRect(w * 0.04 + c * w * 0.09, h * 0.42 + r * h * 0.17, w * 0.04, h * 0.09); }
      line(g, lx, ly, lx, h, a(C.muted, 0.9), 3); glow(g, lx, ly, h * 0.45, C.brass, 0.4); dot(g, lx, ly, 5, C.brass);
      s.f.forEach(function (f) {
        f.y += f.v * dt; f.x += Math.sin(t + f.ph) * 0.4; if (f.y > h) { f.y = -4; f.x = Math.random() * w; }
        var near = clamp(1 - Math.hypot(f.x - lx, f.y - ly) / (h * 0.45), 0, 1);
        dot(g, f.x, f.y, f.r, a(near > 0.1 ? C.brass : C.ink, 0.35 + 0.5 * near));
      });
    }
  };

  M.wheat = { // Tolstoy
    init: function (w, h, R) { var s = []; for (var i = 0; i < 90; i++) s.push({ x: R() * w, H: h * (0.25 + R() * 0.2), ph: R() }); return { s: s.sort(function (a1, b1) { return a1.H - b1.H; }), birds: 0 }; },
    draw: function (g, w, h, t, s, C) {
      glow(g, w * 0.2, h * 0.5, h * 0.7, C.ember, 0.3); dot(g, w * 0.2, h * 0.5, h * 0.07, a(C.ember, 0.6));
      for (var b = 0; b < 3; b++) { var bx = ((t * 30 + b * 60) % (w + 100)) - 50, by = h * 0.2 + b * 12 + Math.sin(t + b) * 5, fl = Math.sin(t * 8 + b) * 4; g.strokeStyle = a(C.ink, 0.6); g.lineWidth = 1.2; g.beginPath(); g.moveTo(bx - 6, by - fl); g.lineTo(bx, by); g.lineTo(bx + 6, by - fl); g.stroke(); }
      s.s.forEach(function (p) {
        var wind = Math.sin(t * 1.4 - p.x * 0.015) * 0.5 + 0.1, tx = p.x + wind * p.H * 0.35, ty = h - p.H;
        g.strokeStyle = a(C.brass, 0.55); g.lineWidth = 1; g.beginPath(); g.moveTo(p.x, h); g.quadraticCurveTo(p.x, h - p.H * 0.6, tx, ty); g.stroke();
        for (var k = 0; k < 5; k++) { g.fillStyle = a(C.brass, 0.85); g.beginPath(); g.ellipse(tx - wind * k * 2, ty + k * 4, 1.8, 3, wind * 0.4, 0, TAU); g.fill(); }
      });
    }
  };

  M.doors = { // Kafka
    init: function () { var z = []; for (var i = 0; i < 12; i++) z.push((i + 1) / 12); return { z: z }; },
    draw: function (g, w, h, t, s, C, dt) {
      var cx = w / 2, cy = h * 0.55, bw = h * 0.22, bh = h * 0.38;
      glow(g, cx, cy, h * 0.3, C.brass, 0.5);
      g.fillStyle = a(C.brass, 0.85); g.fillRect(cx - bw * 0.06, cy - bh * 0.1, bw * 0.12, bh * 0.2);
      figure(g, cx + bw * 0.12, cy + bh * 0.1, 0.35, a(C.shade, 0.9));
      s.z = s.z.map(function (z) { z -= dt * 0.06; return z <= 0.05 ? z + 1 : z; }).sort(function (a1, b1) { return b1 - a1; });
      s.z.forEach(function (z) {
        var sc = 0.12 / z, fw = bw * sc, fh = bh * sc, al = clamp((1 - z) * 1.2, 0, 1) * clamp(z * 6, 0, 1);
        g.strokeStyle = a(C.ink, 0.7 * al); g.lineWidth = Math.max(1, 3 * sc * 0.4); g.strokeRect(cx - fw / 2, cy - fh / 2, fw, fh);
        g.strokeStyle = a(C.muted, 0.3 * al); g.strokeRect(cx - fw / 2 - 6 * sc, cy - fh / 2 - 6 * sc, fw + 12 * sc, fh + 12 * sc);
      });
    }
  };

  // Which scene belongs to whom, with a caption drawn from their own ideas.
  var CAST = {
    heraclitus: ['fire', 'An ever-living fire, kindling in measures and going out in measures.'],
    socrates: ['questions', 'Philosophy begins in wonder.'],
    plato: ['cave', 'The prisoners take the shadows for the whole of reality.'],
    aristotle: ['orbits', 'The unmoved mover, and all it moves.'],
    diogenes: ['lantern', 'Looking for a human being, by lamplight, at noon.'],
    epicurus: ['garden', 'The Garden: bread, water and friends.'],
    epictetus: ['control', 'What is up to us, and what is not.'],
    seneca: ['hourglass', 'Nothing is ours except time.'],
    'marcus-aurelius': ['above', 'The view from above.'],
    buddha: ['breath', 'Breathing in, breathing out. Everything that arises passes.'],
    confucius: ['brush', 'Learn, and practise what you have learned.'],
    laozi: ['drops', 'Nothing is softer than water, nor better at wearing down the hard.'],
    zhuangzi: ['butterflies', 'Zhuangzi dreaming a butterfly, or a butterfly dreaming Zhuangzi.'],
    augustine: ['restless', 'Our heart is restless until it rests.'],
    boethius: ['wheel', 'I turn the wheel that spins.'],
    avicenna: ['void', 'The floating man, touching nothing, still knows he exists.'],
    aquinas: ['rays', 'Grace does not destroy nature but perfects it.'],
    machiavelli: ['chess', 'Everyone sees what you appear to be.'],
    montaigne: ['quill', 'Essais: attempts, written and rewritten.'],
    hobbes: ['swarm', 'Leviathan: the many made into one.'],
    descartes: ['grid', 'I think, therefore I am.'],
    pascal: ['reeds', 'A thinking reed beneath the infinite spaces.'],
    spinoza: ['lens', 'The lens grinder, seeing things under the aspect of eternity.'],
    locke: ['slate', 'White paper, void of all characters.'],
    hume: ['billiards', 'One ball strikes another. The cause is never seen.'],
    voltaire: ['garden', 'We must cultivate our garden.', { rows: true }],
    rousseau: ['chains', 'Born free, and everywhere in chains.'],
    kant: ['stars', 'The starry heavens above me.'],
    hegel: ['dialectic', 'Two opposites, and what they become together.'],
    schopenhauer: ['pendulum', 'Life swings between pain and boredom.'],
    kierkegaard: ['vertigo', 'Anxiety is the dizziness of freedom.'],
    mill: ['scales', 'The greatest happiness, weighed.'],
    marx: ['gears', 'Dead labour, living labour, and the machine between.'],
    thoreau: ['pond', 'Walden Pond in autumn.'],
    nietzsche: ['recurrence', 'Would you live it again, forever?'],
    wittgenstein: ['flybottle', 'Showing the fly the way out of the fly-bottle.'],
    heidegger: ['forest', 'A clearing in the forest.'],
    sartre: ['roots', 'The chestnut root: existence, too much of it.'],
    beauvoir: ['becoming', 'One is not born, but becomes.'],
    camus: ['sisyphus', 'One must imagine Sisyphus happy.'],
    'simone-weil': ['candle', 'Attention is the rarest and purest form of generosity.'],
    arendt: ['plurality', 'People speaking and acting together. Every birth a new beginning.'],
    foucault: ['panopticon', 'Visibility is a trap.'],
    'william-james': ['stream', 'The stream of consciousness.'],
    freud: ['iceberg', 'Most of the mind lies below the waterline.'],
    jung: ['mandala', 'The mandala, an image of the Self.'],
    adler: ['steps', 'Striving upward from feeling small, towards others.'],
    fromm: ['binary', 'Love is standing in, not falling for.'],
    frankl: ['dawn', 'A light in the darkness.'],
    becker: ['towers', 'Immortality projects, built and crumbling.'],
    dostoevsky: ['snow', 'Snow over St Petersburg.'],
    tolstoy: ['wheat', 'The peasants in the field knew how to live.'],
    kafka: ['doors', 'Before the Law: a door meant only for you.'],
    hesse: ['river', 'The river is everywhere at once.']
  };

  function colors() {
    var cs = getComputedStyle(document.documentElement), o = {};
    ['bg', 'panel', 'panel2', 'ink', 'muted', 'rule', 'brass', 'moss', 'ember'].forEach(function (k) { o[k] = cs.getPropertyValue('--' + k).trim() || '#888888'; });
    var light = document.documentElement.getAttribute('data-theme') === 'light';
    o.shade = light ? o.ink : o.bg;   // silhouettes: always darker than the ground
    o.hot = '#fff3d2';                // the white-hot core of a flame or sun, in either theme
    return o;
  }
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Start a motif on a canvas. Returns a stop function.
  function run(canvas, key, opts) {
    var m = M[key]; if (!m) return function () {};
    var g = canvas.getContext('2d'), C = colors(), dpr = Math.min(2, window.devicePixelRatio || 1), W, H, s, raf, last = 0, stopped = false, t0 = performance.now();
    function size() {
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      s = m.init(W, H, rng(hash(key + (opts && opts.seed || ''))), opts || {});
    }
    function frame(now) {
      if (stopped) return;
      var t = (now - t0) / 1000, dt = Math.min(0.05, t - last); last = t;
      if (!document.hidden) { g.clearRect(0, 0, W, H); m.draw(g, W, H, t + 3, s, C, dt); }
      raf = requestAnimationFrame(frame);
    }
    size();
    if (reduced) { for (var i = 0; i < 180; i++) { g.clearRect(0, 0, W, H); m.draw(g, W, H, 3 + i / 30, s, C, 1 / 30); } }
    else raf = requestAnimationFrame(frame);
    var ro = window.ResizeObserver ? new ResizeObserver(function () { if (canvas.clientWidth !== W) size(); }) : null;
    if (ro) ro.observe(canvas);
    return function () { stopped = true; cancelAnimationFrame(raf); if (ro) ro.disconnect(); };
  }

  function forThinker(id) { var c = CAST[id]; return c ? { key: c[0], caption: c[1], opts: c[2] || {} } : null; }

  return { run: run, forThinker: forThinker, cast: CAST, colors: colors, reduced: reduced, rng: rng };
})();
