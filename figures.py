#!/usr/bin/env python3
"""
The figure catalogue.

Each entry is a function that builds one diagram with figlib and returns SVG.
Content files pull them in with `:::figure <id>`, optionally with a caption in
the block body.

Figures are written to carry information the surrounding prose cannot: the
shape of a curve, where a region lies, which way a force points. Anything that
reads perfectly well as a sentence is left as a sentence.
"""

from __future__ import annotations

import math

from figlib import Canvas, fmt

_FIGURES: dict = {}


def figure(fid: str, caption: str = ""):
    def deco(fn):
        _FIGURES[fid] = (fn, caption)
        return fn

    return deco


def render_figure(fid: str, caption_html: str = "") -> str:
    if fid not in _FIGURES:
        raise KeyError(f"unknown figure id: {fid!r}")
    fn, default = _FIGURES[fid]
    svg = fn()
    cap = caption_html or (f"<p>{default}</p>" if default else "")
    inner = f"<figcaption>{cap}</figcaption>" if cap else ""
    return f'<figure class="figure">{svg}{inner}</figure>'


def catalogue() -> list[str]:
    return sorted(_FIGURES)


# =====================================================================  PURE 1


@figure("quadratic-anatomy")
def _quadratic_anatomy():
    c = Canvas((-3.2, 5.4), (-11, 6), 560, 360)
    c.axes(range(-3, 6), range(-10, 7, 2))
    f = lambda x: x * x - 2 * x - 8
    c.func(f)
    c.line((1, -11), (1, 6), cls="fig-guide")
    c.point(-2, 0, "(−2, 0)", dx=-9, dy=-13, anchor="end")
    c.point(4, 0, "(4, 0)", dx=-8, dy=-12, anchor="end")
    c.point(0, -8, "(0, −8)", dx=12, dy=-8)
    c.point(1, -9, "(1, −9)", dx=8, dy=18)
    c.text(1, 5, "x = 1", dx=6, dy=0, cls="fig-em")
    c.text(1, 5, "line of symmetry", dx=6, dy=15, cls="fig-tiny")
    return c.svg("The parabola y = x squared minus 2x minus 8")


@figure("discriminant-cases")
def _discriminant_cases():
    c = Canvas((0, 30), (-3.3, 5.5), 600, 258, pad=(16, 18, 16, 40))
    c.line((0.5, 0), (29.5, 0), cls="fig-axis")
    for centre, k, caption, sub in (
        (5, -2, "b² − 4ac > 0", "two distinct roots"),
        (15, 0, "b² − 4ac = 0", "one repeated root"),
        (25, 2, "b² − 4ac < 0", "no real roots"),
    ):
        c.func(lambda x, cc=centre, kk=k: (x - cc) ** 2 + kk, centre - 3, centre + 3)
        c.text(centre, -2.1, caption, anchor="middle", cls="fig-em")
        c.text(centre, -3.0, sub, anchor="middle", cls="fig-tiny")
    for x in (5 - math.sqrt(2), 5 + math.sqrt(2)):
        c.point(x, 0)
    c.point(15, 0)
    return c.svg("Three parabolas showing the three discriminant cases")


@figure("quadratic-inequality")
def _quadratic_inequality():
    c = Canvas((-4.2, 5.2), (-7.5, 7), 560, 330)
    f = lambda x: x * x - x - 6
    c.fill_between(f, -4.2, -2, cls="fig-fill")
    c.fill_between(f, 3, 5.2, cls="fig-fill")
    c.fill_between(f, -2, 3, cls="fig-fill2")
    c.axes(range(-4, 6), range(-6, 8, 2))
    c.func(f)
    c.point(-2, 0, "−2", dx=-6, dy=-9, anchor="end")
    c.point(3, 0, "3", dx=6, dy=-9)
    c.text(-3.4, 4.4, "> 0", cls="fig-em", anchor="middle")
    c.text(4.3, 4.4, "> 0", cls="fig-em", anchor="middle")
    c.text(0.5, -3.2, "< 0", cls="fig-em", anchor="middle")
    return c.svg("Where the parabola lies above and below the x-axis")


@figure("cubic-roots")
def _cubic_roots():
    c = Canvas((-1.6, 3.6), (-3.2, 5.2), 540, 330)
    c.axes([-1, 1, 2, 3], [-2, 2, 4])
    c.func(lambda x: x * (x - 2) ** 2)
    c.point(0, 0, "single root:", dx=-10, dy=-22, anchor="end")
    c.text(0, 0, "crosses", dx=-10, dy=-8, anchor="end", cls="fig-tiny")
    c.point(2, 0, "double root:", dx=10, dy=26)
    c.text(2, 0, "touches, doesn't cross", dx=10, dy=40, cls="fig-tiny")
    return c.svg("y = x(x − 2) squared, showing a single and a repeated root")


@figure("reciprocal-graph")
def _reciprocal_graph():
    c = Canvas((-5.4, 5.4), (-5.4, 5.4), 460, 360)
    c.axes(range(-5, 6), range(-5, 6))
    c.func(lambda x: 2 / x, -5.4, -0.2)
    c.func(lambda x: 2 / x, 0.2, 5.4)
    c.line((-5.4, 0), (5.4, 0), cls="fig-asym")
    c.line((0, -5.4), (0, 5.4), cls="fig-asym")
    c.text(3.4, 4.4, "y = 2/x", cls="fig-em")
    c.text(-5.2, 0, "asymptote y = 0", dy=-8, cls="fig-tiny")
    c.text(0, -5.0, "asymptote x = 0", dx=8, cls="fig-tiny")
    return c.svg("The reciprocal graph and its two asymptotes")


def _bump(x):
    return 4 * math.exp(-((x - 1) ** 2) / 1.6)


@figure("transformations-translate")
def _transformations_translate():
    c = Canvas((-5.4, 7.4), (-1.4, 7.6), 560, 330)
    c.axes(range(-5, 8), range(0, 8, 2))
    c.func(_bump, cls="fig-curve")
    c.func(lambda x: _bump(x) + 2, cls="fig-curve2")
    c.func(lambda x: _bump(x + 3), cls="fig-line-dash")
    c.text(1, 4, "y = f(x)", dx=6, dy=-8, cls="fig-em")
    c.text(1, 6, "y = f(x) + 2", dx=10, dy=-6, cls="fig-tiny")
    c.text(-2, 4, "y = f(x + 3)", dx=-8, dy=-8, anchor="end", cls="fig-tiny")
    c.arrow((3.2, 4), (3.2, 6), cls="fig-vector")
    c.arrow((-0.4, 2.2), (-3.4, 2.2), cls="fig-vector")
    c.text(-1.9, 2.2, "left 3", dy=-8, anchor="middle", cls="fig-tiny")
    return c.svg("Translations: outside the function moves it up, inside moves it left")


@figure("transformations-stretch")
def _transformations_stretch():
    c = Canvas((-5.4, 7.4), (-1.4, 9.4), 560, 330)
    c.axes(range(-5, 8), range(0, 10, 2))
    c.func(_bump, cls="fig-curve")
    c.func(lambda x: 2 * _bump(x), cls="fig-curve2")
    c.func(lambda x: _bump(2 * x), cls="fig-line-dash")
    c.text(1, 4, "y = f(x)", dx=8, dy=14, cls="fig-em")
    c.text(1, 8, "y = 2f(x)", dx=10, dy=-6, cls="fig-tiny")
    c.text(0.4, 3.2, "y = f(2x)", dx=-8, anchor="end", cls="fig-tiny")
    return c.svg("Stretches: outside scales the height, inside squashes the width")


@figure("circle-tangent")
def _circle_tangent():
    c = Canvas((-3, 9), (-3, 7.5), 520, 360, equal=True)
    cx, cy, r = 2, 1, 5
    c.axes(range(-2, 9, 2), range(-2, 8, 2))
    c.circle(cx, cy, r)
    px, py = 5, 5  # on the circle: 3-4-5
    c.line((cx, cy), (px, py), cls="fig-line")
    # tangent: gradient -3/4 through (5,5)
    c.line((px - 4, py + 3), (px + 4, py - 3), cls="fig-line-dash")
    c.point(cx, cy, "centre (2, 1)", dx=-10, dy=16, anchor="end")
    c.point(px, py, "P(5, 5)", dx=10, dy=-8)
    c.right_angle((px, py), math.atan2(-4, -3), math.atan2(-3, 4), size=13)
    c.text(3.4, 3.2, "radius", dx=0, dy=0, anchor="middle", cls="fig-tiny")
    c.text(8.3, 2.6, "tangent", anchor="end", cls="fig-em")
    return c.svg("A tangent meets the radius at a right angle")


@figure("circle-chord")
def _circle_chord():
    c = Canvas((-3, 9), (-3.5, 7), 520, 350, equal=True)
    cx, cy, r = 3, 1.5, 4.2
    c.circle(cx, cy, r)
    ax, ay = cx - r * math.cos(0.5), cy + r * math.sin(0.5)
    bx, by = cx + r * math.cos(0.9), cy + r * math.sin(0.9)
    mx, my = (ax + bx) / 2, (ay + by) / 2
    c.line((ax, ay), (bx, by), cls="fig-line")
    c.line((cx, cy), (mx, my), cls="fig-line-dash")
    c.point(ax, ay, "A", dx=-14, dy=-4, anchor="end")
    c.point(bx, by, "B", dx=10, dy=-4)
    c.point(mx, my, "M", dx=4, dy=-10)
    c.point(cx, cy, "centre", dx=8, dy=16)
    ang = math.atan2(by - ay, bx - ax)
    c.right_angle((mx, my), ang + math.pi, math.atan2(cy - my, cx - mx), size=12)
    c.text(mx, my, "perpendicular bisector", dx=18, dy=-22, cls="fig-tiny")
    return c.svg("The perpendicular bisector of a chord passes through the centre")


@figure("perpendicular-gradients")
def _perp_gradients():
    c = Canvas((-1, 7), (-1, 5.6), 520, 340, equal=True)
    c.axes(range(0, 8), range(0, 6))
    c.func(lambda x: 0.75 * x + 0.5, 0, 6.4, cls="fig-line")
    c.func(lambda x: -4 / 3 * x + 5.0, 1.3, 4.6, cls="fig-curve")
    ix = (5.0 - 0.5) / (0.75 + 4 / 3)
    iy = 0.75 * ix + 0.5
    c.right_angle((ix, iy), math.atan2(3, 4), math.atan2(4, -3), size=13)
    c.text(6.2, 5.15, "gradient ¾", anchor="end", cls="fig-tiny")
    c.text(1.35, 3.4, "gradient −4/3", anchor="start", cls="fig-tiny")
    c.text(3.4, 0.55, "¾ × (−4/3) = −1", anchor="middle", cls="fig-em")
    c.arrow((2.2, 2.15), (3.0, 2.15), cls="fig-vector")
    c.arrow((3.0, 2.15), (3.0, 2.75), cls="fig-vector")
    c.text(2.6, 2.15, "4", dy=16, anchor="middle", cls="fig-tiny")
    c.text(3.0, 2.45, "3", dx=6, cls="fig-tiny")
    return c.svg("Perpendicular gradients multiply to minus one")


@figure("exact-triangles")
def _exact_triangles():
    c = Canvas((-0.6, 9.4), (-0.9, 4.4), 600, 290, pad=(14, 18, 14, 30))
    # 45-45-90 from half a unit square
    c.path([(0.4, 0.2), (3.0, 0.2), (3.0, 2.8)], cls="fig-shape", close=True)
    c.right_angle((3.0, 0.2), math.pi, math.pi / 2, size=12)
    c.text(1.7, 0.2, "1", dy=18, anchor="middle", cls="fig-label")
    c.text(3.0, 1.5, "1", dx=9, cls="fig-label")
    c.text(1.5, 1.6, "√2", dx=-6, anchor="end", cls="fig-label")
    c.angle_arc((0.4, 0.2), 0, math.atan2(2.6, 2.6), 32, "45°")
    c.text(1.7, -0.55, "half a unit square", anchor="middle", cls="fig-em")

    # 30-60-90 from half an equilateral triangle of side 2
    bx = 5.6
    c.path([(bx, 0.2), (bx + 1.3, 0.2), (bx + 1.3, 0.2 + 1.3 * math.sqrt(3))], cls="fig-shape", close=True)
    c.right_angle((bx + 1.3, 0.2), math.pi, math.pi / 2, size=12)
    c.text(bx + 0.65, 0.2, "1", dy=18, anchor="middle", cls="fig-label")
    c.text(bx + 1.3, 1.3, "√3", dx=9, cls="fig-label")
    c.text(bx + 0.45, 1.5, "2", dx=-4, anchor="end", cls="fig-label")
    c.angle_arc((bx, 0.2), 0, math.pi / 3, 32, "60°")
    apex = (bx + 1.3, 0.2 + 1.3 * math.sqrt(3))
    c.angle_arc(apex, math.atan2(-1.3 * math.sqrt(3), -1.3), -math.pi / 2, 30, "30°")
    c.text(bx + 0.65, -0.55, "half an equilateral triangle of side 2", anchor="middle", cls="fig-em")
    return c.svg("The two triangles that generate every exact trig value")


@figure("ambiguous-case")
def _ambiguous_case():
    c = Canvas((-0.6, 11), (-1.2, 6.2), 580, 330, equal=True)
    A = (0.2, 0.3)
    ang = math.radians(35)
    # Two triangles share side AC along the ray from A, with BC = 6 fixed.
    c.line(A, (A[0] + 9.5 * math.cos(ang), A[1] + 9.5 * math.sin(ang)), cls="fig-guide")
    c.line(A, (9.8, 0.3), cls="fig-line")
    b = 8.0
    B = (A[0] + b * math.cos(ang), A[1] + b * math.sin(ang))
    r = 6.0
    dy = B[1] - 0.3
    dx = math.sqrt(max(r * r - dy * dy, 0))
    C1 = (B[0] - dx, 0.3)
    C2 = (B[0] + dx, 0.3)
    c.line(B, C1, cls="fig-curve")
    c.line(B, C2, cls="fig-curve2")
    c.point(*A, "A", dx=-6, dy=16, anchor="end")
    c.point(*B, "B", dx=4, dy=-10)
    c.point(*C1, "C₁", dx=-4, dy=20, anchor="middle")
    c.point(*C2, "C₂", dx=4, dy=20, anchor="middle")
    c.angle_arc(A, 0, ang, 34, "35°")
    c.text(B[0] - dx / 2, (B[1] + 0.3) / 2, "6", dx=-10, anchor="end", cls="fig-tiny")
    c.text(B[0] + dx / 2, (B[1] + 0.3) / 2, "6", dx=10, cls="fig-tiny")
    c.text(3.4, 3.2, "8", dx=-8, anchor="end", cls="fig-tiny")
    return c.svg("The ambiguous case: two triangles fit the same three pieces of information")


@figure("unit-circle-cast")
def _unit_circle_cast():
    c = Canvas((-2.05, 2.05), (-1.9, 1.9), 420, 400, equal=True)
    c.axes([-1, 1], [-1, 1], origin=False)
    c.circle(0, 0, 1)
    th = math.radians(52)
    c.line((0, 0), (math.cos(th), math.sin(th)), cls="fig-vector")
    c.line((math.cos(th), 0), (math.cos(th), math.sin(th)), cls="fig-guide")
    c.line((0, math.sin(th)), (math.cos(th), math.sin(th)), cls="fig-guide")
    c.point(math.cos(th), math.sin(th))
    c.text(math.cos(th), math.sin(th), "P(cos θ, sin θ)", dx=10, dy=-10)
    c.angle_arc((0, 0), 0, th, 26, "θ")
    # Letters sit outside the circle so they never collide with the drawing.
    for (ax, ay, letter, word) in ((1.42, 1.28, "A", "All"), (-1.42, 1.28, "S", "Sine"),
                                   (-1.42, -1.28, "T", "Tangent"), (1.42, -1.28, "C", "Cosine")):
        c.text(ax, ay, letter, anchor="middle", cls="fig-em")
        c.text(ax, ay, word, dy=15, anchor="middle", cls="fig-tiny")
    c.text(math.cos(th) / 2, 0, "cos θ", dy=18, anchor="middle", cls="fig-tiny")
    c.text(0, math.sin(th) / 2, "sin θ", dx=-8, anchor="end", cls="fig-tiny")
    return c.svg("The unit circle, showing where each trig function is positive")


@figure("trig-graphs")
def _trig_graphs():
    c = Canvas((-20, 740), (-1.65, 1.65), 620, 300, pad=(34, 22, 30, 34))
    ticks = [90, 180, 270, 360, 450, 540, 630, 720]
    c.axes(ticks, [-1, 1], xlabel="θ°", xtick_labels={t: str(t) for t in ticks})
    c.func(lambda t: math.sin(math.radians(t)), 0, 720, cls="fig-curve")
    c.func(lambda t: math.cos(math.radians(t)), 0, 720, cls="fig-curve2")
    c.text(50, 1.0, "y = sin θ", dy=-10, cls="fig-em")
    c.text(430, 1.0, "y = cos θ", dy=-10, cls="fig-tiny")
    c.line((0, 0.5), (740, 0.5), cls="fig-asym")
    c.text(700, 0.5, "y = 0.5", dy=-7, anchor="end", cls="fig-tiny")
    for t in (30, 150, 390, 510):
        c.point(t, 0.5)
    return c.svg("Sine and cosine over two full turns, cut by a horizontal line")


@figure("vector-triangle")
def _vector_triangle():
    c = Canvas((-0.8, 7.2), (-1.2, 4.6), 540, 320, equal=True)
    A, B, C = (0.4, 0.4), (3.2, 3.4), (6.4, 1.2)
    c.arrow(A, B, cls="fig-vector")
    c.arrow(B, C, cls="fig-vector")
    c.arrow(A, C, cls="fig-line")
    c.point(*A, "A", dx=-8, dy=14, anchor="end")
    c.point(*B, "B", dx=0, dy=-12, anchor="middle")
    c.point(*C, "C", dx=10, dy=6)
    c.text(1.5, 2.1, "a", dx=-12, anchor="end", cls="fig-em", italic=True)
    c.text(5.0, 2.5, "b", dx=8, cls="fig-em", italic=True)
    c.text(3.4, 0.75, "a + b", dy=18, anchor="middle", cls="fig-label")
    return c.svg("The triangle law for adding vectors")


@figure("first-principles")
def _first_principles():
    c = Canvas((-0.5, 4.2), (-0.8, 8.6), 560, 340)
    f = lambda x: 0.55 * x * x + 0.4
    c.axes([1, 2, 3, 4], [2, 4, 6, 8])
    c.func(f, 0, 3.9)
    x0, h = 1.2, 1.6
    for hh, cls in ((1.6, "fig-line-dash"), (0.8, "fig-curve2")):
        m = (f(x0 + hh) - f(x0)) / hh
        c.func(lambda x, m=m: f(x0) + m * (x - x0), 0.5, 3.6, cls=cls)
    m0 = 2 * 0.55 * x0
    c.func(lambda x: f(x0) + m0 * (x - x0), 0.2, 3.2, cls="fig-line")
    c.point(x0, f(x0), "P", dx=-12, dy=4, anchor="end")
    c.point(x0 + h, f(x0 + h), "Q", dx=8, dy=-8)
    c.line((x0, f(x0)), (x0 + h, f(x0)), cls="fig-guide")
    c.line((x0 + h, f(x0)), (x0 + h, f(x0 + h)), cls="fig-guide")
    c.text(x0 + h / 2, f(x0), "h", dy=16, anchor="middle", cls="fig-tiny")
    c.text(x0 + h, (f(x0) + f(x0 + h)) / 2, "f(x+h) − f(x)", dx=9, cls="fig-tiny")
    c.text(3.5, 8.0, "chords", anchor="end", cls="fig-tiny")
    c.text(3.2, 2.35, "tangent at P", anchor="end", cls="fig-em")
    return c.svg("Chords approaching the tangent as h tends to zero")


@figure("stationary-points")
def _stationary_points():
    c = Canvas((-2.3, 3.6), (-18, 15), 560, 350)
    f = lambda x: 2 * x ** 3 - 3 * x * x - 12 * x + 5
    c.axes([-2, -1, 1, 2, 3], [-15, -10, -5, 5, 10])
    c.func(f, -2.15, 3.3)
    c.point(-1, 12, "(−1, 12) maximum", dx=8, dy=-8)
    c.point(2, -15, "(2, −15) minimum", dx=10, dy=14)
    c.line((-2.0, 12), (0.0, 12), cls="fig-guide")
    c.line((1.0, -15), (3.2, -15), cls="fig-guide")
    c.text(-1, 12, "f ″ < 0", dx=-10, dy=-10, anchor="end", cls="fig-em")
    c.text(2, -15, "f ″ > 0", dx=-12, dy=18, anchor="end", cls="fig-em")
    c.text(-1.9, -11, "gradient is negative", cls="fig-tiny")
    c.text(-1.9, -13.4, "between the two", cls="fig-tiny")
    return c.svg("A cubic with a maximum and a minimum, and the sign of the second derivative")


@figure("signed-area")
def _signed_area():
    c = Canvas((-0.6, 3.6), (-5.2, 6.2), 560, 330)
    f = lambda x: x * x - 4
    c.fill_between(f, 0, 2, cls="fig-fill2")
    c.fill_between(f, 2, 3, cls="fig-fill")
    c.axes([1, 2, 3], [-4, -2, 2, 4])
    c.func(f, -0.4, 3.4)
    c.text(1.0, -2.3, "below the axis", anchor="middle", cls="fig-tiny")
    c.text(1.0, -3.1, "−16/3", anchor="middle", cls="fig-em")
    c.text(2.74, 1.3, "above", anchor="middle", cls="fig-tiny")
    c.text(2.74, 0.5, "+7/3", anchor="middle", cls="fig-em")
    return c.svg("Signed area: the piece below the axis integrates to a negative value")


@figure("area-between")
def _area_between():
    c = Canvas((-0.6, 4.0), (-1.2, 5.4), 540, 330)
    f = lambda x: 4 * x - x * x
    g = lambda x: x
    c.fill_between(f, 0, 3, g, cls="fig-fill")
    c.axes([1, 2, 3, 4], [1, 2, 3, 4])
    c.func(f, -0.2, 3.9)
    c.func(g, -0.2, 3.9, cls="fig-line")
    c.point(0, 0)
    c.point(3, 3, "(3, 3)", dx=8, dy=-8)
    c.text(1.6, 2.3, "upper − lower", anchor="middle", cls="fig-em")
    c.text(1.4, 4.6, "y = 4x − x²", anchor="middle", cls="fig-tiny")
    c.text(3.9, 4.0, "y = x", anchor="end", cls="fig-tiny")
    return c.svg("The area between a curve and a line, integrating upper minus lower")


@figure("exp-log-reflection")
def _exp_log():
    c = Canvas((-3.2, 5.2), (-3.2, 5.2), 420, 400, equal=True)
    c.axes([-3, -2, -1, 1, 2, 3, 4], [-3, -2, -1, 1, 2, 3, 4])
    c.func(lambda x: math.exp(x), -3.2, 1.7)
    c.func(lambda x: math.log(x) if x > 0 else float("nan"), 0.045, 5.2, cls="fig-curve2")
    c.func(lambda x: x, -3.0, 5.0, cls="fig-guide")
    c.point(0, 1, "(0, 1)", dx=-8, dy=-8, anchor="end")
    c.point(1, 0, "(1, 0)", dx=8, dy=16)
    c.text(1.75, 4.6, "y = eˣ", anchor="end", cls="fig-em")
    c.text(4.9, 1.75, "y = ln x", anchor="end", cls="fig-em")
    c.text(4.4, 4.4, "y = x", anchor="end", cls="fig-tiny")
    return c.svg("Exponential and logarithm are reflections of each other in the line y equals x")


# =====================================================================  PURE 2

PI = math.pi
_PI_TICKS = {PI / 2: "π/2", PI: "π", 3 * PI / 2: "3π/2", 2 * PI: "2π"}


@figure("modulus-outside")
def _modulus_outside():
    c = Canvas((-1.4, 4.6), (-3.4, 4.4), 520, 320)
    f = lambda x: x * x - 3 * x
    c.axes([-1, 1, 2, 3, 4], [-3, -2, -1, 1, 2, 3, 4])
    c.func(f, -1.3, 4.4, cls="fig-guide")
    c.func(lambda x: abs(f(x)), -1.3, 4.4, cls="fig-curve")
    c.point(0, 0)
    c.point(3, 0)
    c.text(1.5, 2.25, "y = |f(x)|", dx=10, cls="fig-em")
    c.text(1.5, -2.25, "original", dx=10, cls="fig-tiny")
    return c.svg("y equals the modulus of f of x")


@figure("modulus-inside")
def _modulus_inside():
    c = Canvas((-4.6, 4.6), (-3.4, 4.4), 520, 320)
    f = lambda x: x * x - 3 * x
    c.axes([-4, -3, -2, -1, 1, 2, 3, 4], [-3, -2, -1, 1, 2, 3, 4])
    c.func(f, -1.0, 4.4, cls="fig-guide")
    c.func(lambda x: f(abs(x)), -4.4, 4.4, cls="fig-curve")
    c.text(-3.4, 3.6, "y = f(|x|)", cls="fig-em")
    c.text(3.0, -2.9, "right-hand half kept,", anchor="middle", cls="fig-tiny")
    c.text(3.0, -3.3, "then mirrored", anchor="middle", cls="fig-tiny")
    return c.svg("y equals f of the modulus of x")


@figure("inverse-reflection")
def _inverse_reflection():
    c = Canvas((-1.2, 6.2), (-1.2, 6.2), 400, 400, equal=True)
    c.axes([1, 2, 3, 4, 5, 6], [1, 2, 3, 4, 5, 6])
    f = lambda x: 0.6 * (x - 0.5) ** 2 + 0.8
    c.func(f, 0.5, 3.4, cls="fig-curve")
    finv = lambda y: 0.5 + math.sqrt(max((y - 0.8) / 0.6, 0))
    c.param(lambda t: f(t), lambda t: t, 0.5, 3.4, cls="fig-curve2")
    c.func(lambda x: x, -1.0, 6.0, cls="fig-guide")
    c.point(2, f(2), "(2, 2.15)", dx=-12, dy=-10, anchor="end")
    c.point(f(2), 2, "(2.15, 2)", dx=12, dy=16)
    c.text(1.1, 4.6, "y = f(x)", cls="fig-em")
    c.text(5.6, 1.5, "y = f⁻¹(x)", anchor="end", cls="fig-em")
    c.text(5.2, 5.2, "y = x", anchor="end", cls="fig-tiny")
    return c.svg("A function and its inverse, reflected in the line y equals x")


@figure("sector-segment")
def _sector_segment():
    c = Canvas((-1.4, 9.2), (-1.2, 6.4), 520, 330, equal=True)
    r, th = 5.0, 1.0472  # pi/3
    O = (0.6, 0.6)
    A = (O[0] + r, O[1])
    B = (O[0] + r * math.cos(th), O[1] + r * math.sin(th))
    c.add(
        f'<path d="M {c.sx(O[0])},{c.sy(O[1])} L {c.sx(A[0])},{c.sy(A[1])} '
        f'A {fmt(c.sx(O[0] + r) - c.sx(O[0]))} {fmt(c.sy(O[1]) - c.sy(O[1] + r))} 0 0 0 '
        f'{c.sx(B[0])},{c.sy(B[1])} Z" class="fig-fill"/>'
    )
    c.path([O, A, B], cls="fig-shape2", close=True)
    c.param(lambda t: O[0] + r * math.cos(t), lambda t: O[1] + r * math.sin(t), 0, th, cls="fig-curve")
    c.line(O, A, cls="fig-line")
    c.line(O, B, cls="fig-line")
    c.angle_arc(O, 0, th, 34, "θ")
    c.point(*O, "O", dx=-8, dy=16, anchor="end")
    c.text((O[0] + A[0]) / 2, O[1], "r", dy=18, anchor="middle", cls="fig-label")
    c.text((O[0] + B[0]) / 2, (O[1] + B[1]) / 2, "r", dx=-12, anchor="end", cls="fig-label")
    mid = (O[0] + r * 1.16 * math.cos(th / 2), O[1] + r * 1.16 * math.sin(th / 2))
    c.text(mid[0], mid[1], "arc = rθ", anchor="middle", cls="fig-em")
    c.text(A[0] * 0.72, O[1] + 1.5, "segment", anchor="middle", cls="fig-tiny")
    return c.svg("A sector, its arc, and the segment cut off by the chord")


@figure("sec-graph")
def _sec_graph():
    c = Canvas((-0.35, 2 * PI + 0.45), (-4.4, 4.4), 560, 320)
    c.axes(list(_PI_TICKS), [-3, -1, 1, 3], xlabel="θ", xtick_labels=_PI_TICKS)
    c.func(math.cos, 0, 2 * PI, cls="fig-guide")
    for a, b in ((0.001, PI / 2 - 0.02), (PI / 2 + 0.02, 3 * PI / 2 - 0.02), (3 * PI / 2 + 0.02, 2 * PI)):
        c.func(lambda t: 1 / math.cos(t), a, b, cls="fig-curve")
    for x in (PI / 2, 3 * PI / 2):
        c.line((x, -4.4), (x, 4.4), cls="fig-asym")
    c.text(0.15, 3.4, "y = sec θ", cls="fig-em")
    c.text(2 * PI - 0.2, -1.05, "y = cos θ", dy=18, anchor="end", cls="fig-tiny")
    c.text(PI, 3.6, "never enters −1 < y < 1", anchor="middle", cls="fig-tiny")
    return c.svg("The secant graph, with asymptotes where cosine is zero")


@figure("inverse-trig-graphs")
def _inverse_trig():
    c = Canvas((-7.6, 7.6), (-2.6, 3.9), 620, 330, pad=(18, 20, 18, 42))
    for centre, fn, name, dom, rng in (
        (-5.0, math.asin, "arcsin x", 1.0, PI / 2),
        (0.0, math.acos, "arccos x", 1.0, PI),
        (5.0, math.atan, "arctan x", 2.1, PI / 2),
    ):
        c.line((centre - 2.4, 0), (centre + 2.4, 0), cls="fig-axis")
        c.line((centre, -1.85), (centre, 3.4), cls="fig-axis")
        if name == "arccos x":
            c.func(lambda x, cc=centre: math.acos(max(-1, min(1, x - cc))), centre - 1, centre + 1)
        elif name == "arcsin x":
            c.func(lambda x, cc=centre: math.asin(max(-1, min(1, x - cc))), centre - 1, centre + 1)
        else:
            c.func(lambda x, cc=centre: math.atan(x - cc), centre - 2.2, centre + 2.2)
            for yv in (PI / 2, -PI / 2):
                c.line((centre - 2.3, yv), (centre + 2.3, yv), cls="fig-asym")
        c.text(centre, -2.25, name, anchor="middle", cls="fig-em")
    c.text(-5.0, 3.7, "range −π/2 to π/2", anchor="middle", cls="fig-tiny")
    c.text(0.0, 3.7, "range 0 to π", anchor="middle", cls="fig-tiny")
    c.text(5.0, 3.7, "asymptotes at ±π/2", anchor="middle", cls="fig-tiny")
    return c.svg("The three inverse trigonometric functions and their ranges")


@figure("r-form")
def _r_form():
    c = Canvas((-0.35, 2 * PI + 0.45), (-5.8, 5.8), 580, 330)
    c.axes(list(_PI_TICKS), [-5, -3, 3, 5], xlabel="θ", xtick_labels=_PI_TICKS)
    c.func(lambda t: 3 * math.sin(t), 0, 2 * PI, cls="fig-guide")
    c.func(lambda t: 4 * math.cos(t), 0, 2 * PI, cls="fig-guide")
    c.func(lambda t: 3 * math.sin(t) + 4 * math.cos(t), 0, 2 * PI, cls="fig-curve")
    alpha = math.atan2(4, 3)
    peak = PI / 2 - alpha
    c.point(peak, 5)
    c.line((peak, 0), (peak, 5), cls="fig-guide")
    c.text(peak, 5, "maximum 5 = R", dx=10, dy=-8, cls="fig-em")
    c.text(PI / 2 + 0.1, 3.0, "3 sin θ", cls="fig-tiny")
    c.text(0.15, 4.0, "4 cos θ", cls="fig-tiny")
    c.text(2 * PI - 0.15, -4.6, "5 sin(θ + 0.927)", anchor="end", cls="fig-em")
    return c.svg("Two waves of the same frequency add to a single wave")


@figure("parametric-ellipse")
def _parametric_ellipse():
    c = Canvas((-6.4, 6.4), (-4.2, 4.2), 480, 330, equal=True)
    c.axes([-4, -2, 2, 4], [-2, 2])
    c.param(lambda t: 5 * math.cos(t), lambda t: 3 * math.sin(t), 0, 2 * PI)
    for t, lab in ((0, "t = 0"), (PI / 2, "t = π/2"), (PI, "t = π")):
        x, y = 5 * math.cos(t), 3 * math.sin(t)
        c.point(x, y)
        c.text(x, y, lab, dx=10 if x >= 0 else -10, dy=-10,
               anchor="start" if x >= 0 else "end", cls="fig-tiny")
    c.text(0, -3.6, "x = 5 cos t,  y = 3 sin t", anchor="middle", cls="fig-em")
    return c.svg("An ellipse traced by a parameter")


@figure("concavity")
def _concavity():
    c = Canvas((-3.2, 3.2), (-5.5, 5.5), 520, 330)
    f = lambda x: x ** 3 - 3 * x
    c.axes([-3, -2, -1, 1, 2, 3], [-4, -2, 2, 4])
    c.func(f, -2.6, 2.6)
    c.point(0, 0, "point of inflection", dx=10, dy=-10)
    c.text(-1.85, -3.4, "concave", anchor="middle", cls="fig-em")
    c.text(-1.85, -4.4, "f ″ < 0", anchor="middle", cls="fig-tiny")
    c.text(1.85, 3.9, "convex", anchor="middle", cls="fig-em")
    c.text(1.85, 2.9, "f ″ > 0", anchor="middle", cls="fig-tiny")
    return c.svg("Concave and convex sections either side of a point of inflection")


def _iteration(g, x0, steps, xlim, ylim, root_label):
    c = Canvas(xlim, ylim, 480, 340)
    lo, hi = xlim
    c.axes([t for t in range(int(math.ceil(lo)), int(hi) + 1) if t != 0],
           [t for t in range(int(math.ceil(ylim[0])), int(ylim[1]) + 1) if t != 0])
    c.func(g, max(lo, 0.3), hi, cls="fig-curve")
    c.func(lambda x: x, lo, hi, cls="fig-line")
    x = x0
    pts = [(x, 0)]
    for _ in range(steps):
        y = g(x)
        pts.append((x, y))
        pts.append((y, y))
        x = y
    c.path(pts, cls="fig-vector")
    c.point(x0, 0, "x₀", dx=0, dy=20, anchor="middle")
    c.text(hi - 0.15, hi - 0.15, "y = x", dy=-8, anchor="end", cls="fig-tiny")
    c.point(x, g(x), root_label, dx=12, dy=-10)
    return c


@figure("iteration-staircase")
def _iteration_staircase():
    c = _iteration(lambda x: (4 * x - 1) ** (1 / 3), 0.5, 6, (0, 3.2), (0, 3.2), "root")
    c.text(1.55, 0.55, "staircase: g′ > 0", cls="fig-em")
    return c.svg("A staircase iteration converging on a root")


@figure("iteration-cobweb")
def _iteration_cobweb():
    c = _iteration(lambda x: math.log(4 - x), 0.25, 8, (0, 2.4), (0, 2.4), "root")
    c.text(1.35, 0.4, "cobweb: g′ < 0", cls="fig-em")
    return c.svg("A cobweb iteration spiralling in on a root")


@figure("newton-raphson")
def _newton_raphson():
    c = Canvas((1.55, 2.95), (-1.6, 8.2), 540, 340)
    f = lambda x: x ** 3 - 4 * x + 1
    fp = lambda x: 3 * x * x - 4
    c.axes([1.8, 2.0, 2.2, 2.4, 2.6, 2.8], [2, 4, 6, 8],
           xtick_labels={1.8: "1.8", 2.0: "2", 2.2: "2.2", 2.4: "2.4", 2.6: "2.6", 2.8: "2.8"})
    c.func(f, 1.6, 2.9)
    x = 2.7
    for i in range(2):
        y = f(x)
        nxt = x - y / fp(x)
        c.line((x, 0), (x, y), cls="fig-guide")
        c.func(lambda t, x=x, y=y: y + fp(x) * (t - x), min(x, nxt) - 0.03, max(x, nxt) + 0.03,
               cls="fig-line-dash")
        c.point(x, y)
        c.point(nxt, 0, f"x{'₀₁₂'[i + 1]}", dx=0, dy=21, anchor="middle")
        x = nxt
    c.point(2.7, 0, "x₀", dx=0, dy=21, anchor="middle")
    c.text(1.62, 7.2, "follow each tangent down to the axis", cls="fig-tiny")
    return c.svg("Newton-Raphson: each tangent gives the next approximation")


@figure("trapezium-rule")
def _trapezium_rule():
    c = Canvas((-0.35, 2.35), (-0.5, 3.6), 540, 320)
    f = lambda x: math.sqrt(1 + x ** 3)
    c.axes([0.5, 1.0, 1.5, 2.0], [1, 2, 3], xtick_labels={0.5: "0.5", 1.0: "1", 1.5: "1.5", 2.0: "2"})
    for i in range(4):
        a, b = 0.5 * i, 0.5 * (i + 1)
        c.path([(a, 0), (a, f(a)), (b, f(b)), (b, 0)], cls="fig-bar", close=True)
    c.func(f, 0, 2)
    for i in range(5):
        x = 0.5 * i
        c.text(x, f(x), f"y{'₀₁₂₃₄'[i]}", dy=-10, anchor="middle", cls="fig-tiny")
    c.text(1.0, 0.45, "h = 0.5", anchor="middle", cls="fig-em")
    c.text(1.55, 3.3, "4 strips → 5 ordinates", anchor="middle", cls="fig-tiny")
    return c.svg("The trapezium rule with four strips")


# ================================================================  STATISTICS


@figure("histogram-density")
def _histogram_density():
    classes = [(0, 5, 12), (5, 10, 18), (10, 20, 30), (20, 40, 20)]
    c = Canvas((-2, 46), (-0.55, 4.3), 560, 330)
    c.axes([0, 5, 10, 20, 30, 40], [1, 2, 3, 4], xlabel="length (cm)", ylabel="freq. density")
    for a, b, f in classes:
        c.rect(a, 0, b - a, f / (b - a))
        c.text((a + b) / 2, f / (b - a), f"f = {f}", dy=-9, anchor="middle", cls="fig-tiny")
    c.text(30, 2.9, "widest class, lowest bar —", anchor="middle", cls="fig-em")
    c.text(30, 2.45, "but the second largest frequency", anchor="middle", cls="fig-tiny")
    return c.svg("A histogram with unequal class widths, plotted as frequency density")


@figure("box-plot-skew")
def _box_plot_skew():
    c = Canvas((-4, 92), (-0.4, 3.6), 560, 260, pad=(20, 22, 22, 44))
    c.line((0, 0), (90, 0), cls="fig-axis")
    for t in (0, 15, 30, 45, 60, 75, 90):
        c.line((t, 0), (t, -0.12), cls="fig-tick")
        c.text(t, 0, str(t), dy=17, anchor="middle", cls="fig-tiny")

    def box(y, lo, q1, med, q3, hi, label, note):
        c.rect(q1, y - 0.3, q3 - q1, 0.6, cls="fig-bar")
        c.line((med, y - 0.3), (med, y + 0.3), cls="fig-line")
        c.line((lo, y), (q1, y), cls="fig-dim")
        c.line((q3, y), (hi, y), cls="fig-dim")
        for v in (lo, hi):
            c.line((v, y - 0.18), (v, y + 0.18), cls="fig-dim")
        c.text(-2, y, label, anchor="end", cls="fig-em")
        c.text(hi, y, note, dx=8, cls="fig-tiny")

    box(2.6, 8, 24, 31, 48, 78, "positive", "long tail to the right")
    box(1.2, 12, 42, 59, 66, 82, "negative", "long tail to the left")
    c.text(45, 3.35, "Q₃ − Q₂ > Q₂ − Q₁  ⟹  positive skew", anchor="middle", cls="fig-tiny")
    return c.svg("Two box plots showing positive and negative skew")


@figure("cumulative-interpolation")
def _cumulative_interpolation():
    pts = [(0, 0), (10, 6), (20, 20), (30, 32), (40, 40)]
    c = Canvas((-4, 48), (-5, 44), 520, 340)
    c.axes([10, 20, 30, 40], [10, 20, 30, 40], xlabel="time (min)", ylabel="cum. freq.")
    c.path(pts, cls="fig-curve")
    for x, y in pts:
        c.point(x, y)
    c.line((0, 20), (20, 20), cls="fig-guide")
    c.line((20, 0), (20, 20), cls="fig-guide")
    c.line((0, 10), (12.86, 10), cls="fig-guide")
    c.line((12.86, 0), (12.86, 10), cls="fig-guide")
    c.text(0, 20, "n/2 = 20", dx=-8, dy=-4, anchor="end", cls="fig-em")
    c.text(0, 10, "n/4 = 10", dx=-8, dy=-4, anchor="end", cls="fig-tiny")
    c.text(21.5, 3.5, "median", cls="fig-em")
    c.text(12.86, 3.5, "Q₁", anchor="end", dx=-4, cls="fig-tiny")
    c.text(23, 38, "plotted at the upper", cls="fig-tiny")
    c.text(23, 34.5, "class boundary", cls="fig-tiny")
    return c.svg("Reading the median and quartiles off a cumulative frequency graph")


@figure("scatter-regression")
def _scatter_regression():
    data = [(10, 7.2), (14, 9.1), (18, 10.0), (22, 12.4), (26, 13.1), (30, 15.2),
            (34, 15.8), (38, 17.9), (42, 18.4), (46, 20.6), (50, 21.0), (54, 23.1)]
    c = Canvas((-4, 80), (-3, 31), 540, 330)
    c.axes([10, 20, 30, 40, 50, 60, 70], [5, 10, 15, 20, 25], xlabel="water (ml/day)", ylabel="height (cm)")
    for x, y in data:
        c.point(x, y)
    c.func(lambda x: 4.2 + 0.35 * x, 8, 72, cls="fig-line")
    c.rect(10, 27.4, 44, 0.7, cls="fig-bar")
    c.text(32, 27.4, "range of the data", dy=-8, anchor="middle", cls="fig-tiny")
    c.text(64, 12, "extrapolation", anchor="middle", cls="fig-em")
    c.text(64, 9.6, "— unreliable", anchor="middle", cls="fig-tiny")
    c.line((54, -2), (54, 27), cls="fig-asym")
    return c.svg("A regression line, and the region beyond the data where it should not be trusted")


@figure("venn-two-sets")
def _venn_two_sets():
    c = Canvas((-1, 11), (-0.6, 7.4), 520, 340, equal=True)
    c.rect(0, 0, 10, 6, cls="fig-shape2")
    c.circle(4.0, 3.0, 2.3, cls="fig-curve")
    c.circle(6.4, 3.0, 2.3, cls="fig-curve2")
    c.text(2.9, 3.0, "0.35", anchor="middle", cls="fig-label")
    c.text(5.2, 3.0, "0.15", anchor="middle", cls="fig-label")
    c.text(7.5, 3.0, "0.25", anchor="middle", cls="fig-label")
    c.text(0.55, 5.3, "0.25", cls="fig-label")
    c.text(2.9, 5.1, "A", anchor="middle", cls="fig-em")
    c.text(7.5, 5.1, "B", anchor="middle", cls="fig-em")
    c.text(5.2, 3.0, "A ∩ B", dy=20, anchor="middle", cls="fig-tiny")
    c.text(0.55, 5.3, "(A ∪ B)′", dy=16, cls="fig-tiny")
    c.text(5.2, 6.6, "the four regions must total 1", anchor="middle", cls="fig-tiny")
    return c.svg("A two-set Venn diagram with its four regions")


@figure("tree-diagram")
def _tree_diagram():
    c = Canvas((-0.4, 10.4), (-0.4, 6.4), 560, 330)
    root = (0.6, 3.0)
    n1, n2 = (4.2, 4.9), (4.2, 1.1)
    leaves = [(8.2, 5.8), (8.2, 4.0), (8.2, 2.0), (8.2, 0.2)]
    c.line(root, n1, cls="fig-line")
    c.line(root, n2, cls="fig-line")
    c.line(n1, leaves[0], cls="fig-line")
    c.line(n1, leaves[1], cls="fig-line")
    c.line(n2, leaves[2], cls="fig-line")
    c.line(n2, leaves[3], cls="fig-line")
    for p, lab in ((n1, "R"), (n2, "B")):
        c.point(*p, lab, dx=8, dy=-8)
    for p, lab in zip(leaves, ("R", "B", "R", "B")):
        c.point(*p, lab, dx=10, dy=5)
    c.text(2.2, 4.2, "5/8", anchor="middle", cls="fig-em")
    c.text(2.2, 1.8, "3/8", anchor="middle", cls="fig-em")
    c.text(6.3, 5.6, "4/7", anchor="middle", cls="fig-tiny")
    c.text(6.3, 4.2, "3/7", anchor="middle", cls="fig-tiny")
    c.text(6.3, 1.9, "5/7", anchor="middle", cls="fig-tiny")
    c.text(6.3, 0.5, "2/7", anchor="middle", cls="fig-tiny")
    c.text(9.1, 5.8, "= 20/56", cls="fig-tiny")
    c.text(0.6, 6.2, "denominators fall from 8 to 7: drawn without replacement", cls="fig-tiny")
    return c.svg("A tree diagram for two draws without replacement")


@figure("binomial-bars")
def _binomial_bars():
    from math import comb
    n, prob = 20, 0.3
    c = Canvas((-1.4, 15.5), (-0.022, 0.21), 560, 320)
    c.axes(range(0, 15, 2), [0.05, 0.10, 0.15, 0.20], xlabel="r", ylabel="P(X = r)",
           ytick_labels={0.05: "0.05", 0.10: "0.10", 0.15: "0.15", 0.20: "0.20"})
    for r in range(0, 15):
        p = comb(n, r) * prob ** r * (1 - prob) ** (n - r)
        cls = "fig-bar" if r < 8 else "fig-shape"
        c.rect(r - 0.4, 0, 0.8, p, cls=cls)
    c.text(11.0, 0.12, "P(X ≥ 8)", anchor="middle", cls="fig-em")
    c.text(11.0, 0.10, "= 1 − P(X ≤ 7)", anchor="middle", cls="fig-tiny")
    c.text(6, 0.19, "X ~ B(20, 0.3),  mean np = 6", anchor="middle", cls="fig-tiny")
    return c.svg("The binomial distribution as a bar chart, with an upper tail shaded")


def _phi(z):
    return math.exp(-z * z / 2) / math.sqrt(2 * math.pi)


@figure("normal-shaded")
def _normal_shaded():
    c = Canvas((-3.9, 3.9), (-0.07, 0.47), 560, 300)
    c.fill_between(_phi, 1.25, 3.9, cls="fig-fill2")
    c.line((-3.9, 0), (3.9, 0), cls="fig-axis")
    c.func(_phi, -3.9, 3.9)
    for z, lab in ((-2, "μ − 2σ"), (-1, "μ − σ"), (0, "μ"), (1, "μ + σ"), (2, "μ + 2σ")):
        c.line((z, 0), (z, -0.014), cls="fig-tick")
        c.text(z, 0, lab, dy=18, anchor="middle", cls="fig-tiny")
    c.line((0, 0), (0, _phi(0)), cls="fig-guide")
    c.line((1.25, 0), (1.25, _phi(1.25)), cls="fig-line")
    c.text(2.0, 0.055, "P(X > a)", anchor="middle", cls="fig-em")
    c.text(1.25, 0, "a", dy=-8, dx=-8, anchor="end", cls="fig-tiny")
    c.text(0, 0.42, "symmetric about the mean", anchor="middle", cls="fig-tiny")
    return c.svg("A normal curve with an upper-tail probability shaded")


@figure("normal-68-95")
def _normal_68_95():
    c = Canvas((-3.9, 3.9), (-0.09, 0.46), 560, 300)
    c.fill_between(_phi, -1, 1, cls="fig-fill")
    c.fill_between(_phi, -2, -1, cls="fig-fill2")
    c.fill_between(_phi, 1, 2, cls="fig-fill2")
    c.line((-3.9, 0), (3.9, 0), cls="fig-axis")
    c.func(_phi, -3.9, 3.9)
    for z in (-3, -2, -1, 0, 1, 2, 3):
        c.line((z, 0), (z, -0.014), cls="fig-tick")
        c.text(z, 0, f"{z:+d}σ".replace("+0σ", "μ"), dy=18, anchor="middle", cls="fig-tiny")
    c.text(0, 0.16, "68%", anchor="middle", cls="fig-em")
    c.text(2.45, 0.25, "95% within 2σ", anchor="middle", cls="fig-tiny")
    c.text(2.45, 0.21, "99.7% within 3σ", anchor="middle", cls="fig-tiny")
    return c.svg("The 68, 95 and 99.7 percent rule for a normal distribution")


@figure("critical-region")
def _critical_region():
    c = Canvas((-3.9, 3.9), (-0.12, 0.46), 560, 310)
    c.fill_between(_phi, -3.9, -1.96, cls="fig-fill2")
    c.fill_between(_phi, 1.96, 3.9, cls="fig-fill2")
    c.line((-3.9, 0), (3.9, 0), cls="fig-axis")
    c.func(_phi, -3.9, 3.9)
    for z in (-1.96, 1.96):
        c.line((z, 0), (z, _phi(z)), cls="fig-line")
        c.text(z, 0, f"{z:+.2f}", dy=18, anchor="middle", cls="fig-em")
    c.text(-2.75, 0.075, "2.5%", anchor="middle", cls="fig-tiny")
    c.text(2.75, 0.075, "2.5%", anchor="middle", cls="fig-tiny")
    c.text(0, 0.18, "do not reject H₀", anchor="middle", cls="fig-em")
    c.text(0, 0.42, "a two-tailed test at 5% puts 2.5% in each tail", anchor="middle", cls="fig-tiny")
    return c.svg("The critical region for a two-tailed test at the 5 percent level")


# =================================================================  MECHANICS


@figure("velocity-time-graph")
def _velocity_time():
    c = Canvas((-3, 38), (-2.5, 20), 560, 320)
    c.axes([8, 10, 20, 28, 33], [4, 8, 12, 16], xlabel="t (s)", ylabel="v (m s⁻¹)")
    c.path([(0, 0), (8, 16), (28, 16), (33, 0)], cls="fig-curve")
    c.fill_between(lambda t: 16 * t / 8 if t < 8 else (16 if t <= 28 else 16 * (33 - t) / 5), 0, 33,
                   cls="fig-fill")
    c.line((8, 0), (8, 16), cls="fig-guide")
    c.line((28, 0), (28, 16), cls="fig-guide")
    c.text(4, 8, "64 m", anchor="middle", cls="fig-em")
    c.text(18, 8, "320 m", anchor="middle", cls="fig-em")
    c.text(30.5, 5, "40 m", anchor="middle", cls="fig-em")
    c.text(2, 18.6, "gradient = acceleration", cls="fig-tiny")
    c.text(24, 18.6, "area = distance", anchor="middle", cls="fig-tiny")
    return c.svg("A three-stage velocity-time graph")


@figure("forces-on-slope")
def _forces_on_slope():
    c = Canvas((-0.8, 10.8), (-2.5, 6.3), 560, 330, equal=True)
    th = math.radians(25)
    base = 9.5
    apex = (0.5, 0.4)
    foot = (apex[0] + base, apex[1])
    top = (apex[0] + base, apex[1] + base * math.tan(th))
    c.path([apex, foot, top], cls="fig-shape2", close=True)
    # Block sitting on the slope, two-thirds of the way up
    t = 0.58
    px = apex[0] + base * t
    py = apex[1] + base * t * math.tan(th)
    ux, uy = math.cos(th), math.sin(th)          # up the slope
    nx, ny = -math.sin(th), math.cos(th)         # perpendicular to the slope
    w, hgt = 1.5, 1.0
    corners = [
        (px - ux * w / 2, py - uy * w / 2),
        (px + ux * w / 2, py + uy * w / 2),
        (px + ux * w / 2 + nx * hgt, py + uy * w / 2 + ny * hgt),
        (px - ux * w / 2 + nx * hgt, py - uy * w / 2 + ny * hgt),
    ]
    c.path(corners, cls="fig-shape", close=True)
    cx = px + nx * hgt / 2
    cy = py + ny * hgt / 2
    c.arrow((cx, cy), (cx, cy - 2.3), cls="fig-vector")
    c.text(cx, cy - 2.3, "mg", dx=6, dy=6, cls="fig-em")
    c.arrow((cx, cy), (cx + nx * 2.0, cy + ny * 2.0), cls="fig-vector")
    c.text(cx + nx * 2.0, cy + ny * 2.0, "R", dx=8, dy=-4, cls="fig-em")
    c.arrow((cx, cy), (cx + ux * 2.0, cy + uy * 2.0), cls="fig-vector")
    c.text(cx + ux * 2.0, cy + uy * 2.0, "F", dx=6, dy=-4, cls="fig-em")
    c.arrow((cx, cy), (cx - ux * 1.7, cy - uy * 1.7), cls="fig-guide")
    c.text(cx - ux * 1.9, cy - uy * 1.9, "mg sin θ", dx=-6, dy=16, anchor="end", cls="fig-tiny")
    c.text(cx + nx * 1.25, cy + ny * 1.25, "mg cos θ", dx=-12, dy=6, anchor="end", cls="fig-tiny")
    c.angle_arc(apex, 0, th, 40, "θ")
    return c.svg("Forces on a block resting on a rough inclined plane")


@figure("pulley-system")
def _pulley_system():
    c = Canvas((-0.6, 9.6), (-1.0, 7.4), 480, 350, equal=True)
    pulley = (4.6, 6.2)
    c.circle(pulley[0], pulley[1], 0.55, cls="fig-shape2")
    c.point(*pulley)
    lx, rx = pulley[0] - 0.55, pulley[0] + 0.55
    c.line((lx, pulley[1]), (lx, 3.1), cls="fig-line")
    c.line((rx, pulley[1]), (rx, 1.6), cls="fig-line")
    c.rect(lx - 0.75, 2.0, 1.5, 1.1, cls="fig-shape")
    c.rect(rx - 0.75, 0.5, 1.5, 1.1, cls="fig-shape")
    c.text(lx, 2.55, "3 kg", anchor="middle", cls="fig-label")
    c.text(rx, 1.05, "5 kg", anchor="middle", cls="fig-label")
    c.arrow((lx, 3.1), (lx, 4.3), cls="fig-vector")
    c.text(lx, 4.3, "T", dx=-6, dy=-4, anchor="end", cls="fig-em")
    c.arrow((rx, 1.6), (rx, 2.8), cls="fig-vector")
    c.text(rx, 2.8, "T", dx=6, dy=-4, cls="fig-em")
    c.arrow((lx, 2.0), (lx, 0.9), cls="fig-vector")
    c.text(lx, 0.9, "3g", dx=-6, dy=4, anchor="end", cls="fig-em")
    c.arrow((rx, 0.5), (rx, -0.6), cls="fig-vector")
    c.text(rx, -0.6, "5g", dx=6, dy=4, cls="fig-em")
    c.arrow((1.6, 2.0), (1.6, 3.4), cls="fig-guide")
    c.text(1.6, 3.4, "a", dx=-7, dy=0, anchor="end", cls="fig-tiny")
    c.arrow((7.9, 2.0), (7.9, 0.6), cls="fig-guide")
    c.text(7.9, 0.6, "a", dx=7, dy=0, cls="fig-tiny")
    c.text(4.6, 7.1, "same string, same tension", anchor="middle", cls="fig-tiny")
    return c.svg("Two masses over a smooth pulley")


@figure("beam-moments")
def _beam_moments():
    c = Canvas((-0.8, 9.2), (-2.4, 4.2), 560, 300)
    c.rect(0.4, 0.9, 7.6, 0.42, cls="fig-bar")
    for x, lab in ((1.4, "C"), (6.4, "D")):
        c.path([(x, 0.9), (x - 0.4, 0.1), (x + 0.4, 0.1)], cls="fig-shape2", close=True)
        c.text(x, 0.1, lab, dy=17, anchor="middle", cls="fig-tiny")
        c.arrow((x, 0.9), (x, 2.6), cls="fig-vector")
        c.text(x, 2.6, "R₁" if lab == "C" else "R₂", dx=7, dy=-4, cls="fig-em")
    c.arrow((4.2, 0.9), (4.2, -1.2), cls="fig-vector")
    c.text(4.2, -1.2, "weight (acts at the centre)", dx=6, dy=6, cls="fig-em")
    c.point(4.2, 1.11)
    c.text(0.4, 1.11, "A", dx=-8, dy=4, anchor="end", cls="fig-tiny")
    c.text(8.0, 1.11, "B", dx=8, dy=4, cls="fig-tiny")
    c.text(4.2, 3.6, "R₁ acts at C,  R₂ acts at D", anchor="middle", cls="fig-tiny")
    return c.svg("A uniform beam on two supports")


@figure("ladder")
def _ladder():
    c = Canvas((-1.2, 7.2), (-1.2, 8.2), 420, 380, equal=True)
    c.line((0, -0.6), (0, 7.6), cls="fig-shape2")
    c.line((-0.8, 0), (6.6, 0), cls="fig-shape2")
    th = math.radians(60)
    L = 7.2
    foot = (0.9, 0)
    topp = (foot[0] + L * math.cos(th), L * math.sin(th))
    c.line(foot, topp, cls="fig-curve")
    mid = ((foot[0] + topp[0]) / 2, topp[1] / 2)
    c.arrow(mid, (mid[0], mid[1] - 1.9), cls="fig-vector")
    c.text(mid[0], mid[1] - 1.9, "W", dx=7, dy=6, cls="fig-em")
    c.arrow(foot, (foot[0], 1.9), cls="fig-vector")
    c.text(foot[0], 1.9, "R", dx=-6, dy=-4, anchor="end", cls="fig-em")
    c.arrow(foot, (foot[0] - 1.5, 0), cls="fig-vector")
    c.text(foot[0] - 1.5, 0, "F", dx=-2, dy=16, anchor="end", cls="fig-em")
    c.arrow((0, topp[1]), (1.5, topp[1]), cls="fig-vector")
    c.text(1.5, topp[1], "N", dx=6, dy=-4, cls="fig-em")
    c.angle_arc(foot, 0, th, 36, "θ")
    c.text(3.6, 7.7, "smooth wall: no friction at the top", anchor="middle", cls="fig-tiny")
    c.text(3.6, -0.9, "moments about the foot remove both R and F", anchor="middle", cls="fig-tiny")
    return c.svg("A ladder leaning against a smooth wall")


@figure("projectile-path")
def _projectile_path():
    u, ang, g = 25.0, math.radians(40), 9.8
    ux, uy = u * math.cos(ang), u * math.sin(ang)
    T = 2 * uy / g
    c = Canvas((-6, 70), (-4, 20), 580, 330)
    c.axes([10, 20, 30, 40, 50, 60], [5, 10, 15], xlabel="x (m)", ylabel="y (m)")
    c.param(lambda t: ux * t, lambda t: uy * t - 0.5 * g * t * t, 0, T)
    c.arrow((0, 0), (ux * 0.38, uy * 0.38), cls="fig-vector")
    c.arrow((0, 0), (ux * 0.38, 0), cls="fig-guide")
    c.arrow((0, 0), (0, uy * 0.38), cls="fig-guide")
    c.text(ux * 0.40, uy * 0.40, "u", dx=4, dy=-4, cls="fig-em")
    c.text(ux * 0.20, 0, "u cos θ", dy=-6, anchor="middle", cls="fig-tiny")
    c.text(0, uy * 0.24, "u sin θ", dx=8, cls="fig-tiny")
    c.angle_arc((0, 0), 0, ang, 34, "θ")
    apex = (ux * T / 2, uy * T / 2 - 0.5 * g * (T / 2) ** 2)
    c.point(*apex)
    c.text(apex[0], apex[1], "v_y = 0 here", dx=0, dy=-12, anchor="middle", cls="fig-tiny")
    c.line((apex[0], 0), apex, cls="fig-guide")
    c.point(ux * T, 0, "range", dx=-6, dy=-10, anchor="end")
    c.text(46, 16.5, "horizontal velocity", cls="fig-tiny")
    c.text(46, 14.8, "never changes", cls="fig-tiny")
    return c.svg("A projectile path with its initial velocity resolved into components")


@figure("vector-resultant")
def _vector_resultant():
    c = Canvas((-1.2, 8.2), (-1.2, 8.2), 420, 380, equal=True)
    c.axes([2, 4, 6, 8], [2, 4, 6, 8], xlabel="i", ylabel="j")
    a = (5, 2)
    b = (2, 6)
    r = (7, 8)
    c.arrow((0, 0), a, cls="fig-vector")
    c.arrow(a, r, cls="fig-vector")
    c.arrow((0, 0), r, cls="fig-line")
    c.text(2.6, 0.9, "5i + 2j", cls="fig-tiny")
    c.text(6.2, 5.0, "2i + 6j", dx=6, cls="fig-tiny")
    c.text(2.6, 4.6, "resultant 7i + 8j", dx=-6, anchor="end", cls="fig-em")
    c.text(3.4, 7.6, "|r| = √(49 + 64) = √113", anchor="middle", cls="fig-tiny")
    return c.svg("Adding two vectors in i-j form")
