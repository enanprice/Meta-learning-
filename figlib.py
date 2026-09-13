#!/usr/bin/env python3
"""
A small SVG drawing toolkit for the figures in this resource.

Everything is drawn in *data* coordinates and mapped to SVG user units, so a
figure is specified the way you'd describe it on paper ("the curve from -2 to 4,
a point at (1, -9)") rather than in pixels.

Colours are CSS custom properties rather than literals, so every figure follows
the page's light and dark themes without being drawn twice. Text uses the site's
type tokens for the same reason.

Nothing here is generic plotting: it covers exactly the marks these diagrams
need -- axes with labelled ticks, curves, straight lines, shaded regions,
points, arrows, angle arcs and brackets.
"""

from __future__ import annotations

import html
import math
from typing import Callable, Iterable, Sequence


def esc(s: str) -> str:
    return html.escape(str(s), quote=True)


def fmt(v: float) -> str:
    """Short decimal strings keep the generated SVG readable and small."""
    if abs(v - round(v)) < 1e-9:
        return str(int(round(v)))
    return f"{v:.2f}".rstrip("0").rstrip(".")


class Canvas:
    """A figure drawn in data coordinates.

    xlim/ylim give the data range shown. `pad` is (left, top, right, bottom) in
    SVG units, leaving room for axis labels outside the plotting area.
    """

    def __init__(
        self,
        xlim: tuple[float, float] = (-5, 5),
        ylim: tuple[float, float] = (-5, 5),
        width: int = 560,
        height: int = 360,
        pad: tuple[int, int, int, int] = (42, 26, 46, 36),
        equal: bool = False,
    ) -> None:
        self.x0, self.x1 = xlim
        self.y0, self.y1 = ylim
        self.w, self.h = width, height
        self.pl, self.pt, self.pr, self.pb = pad
        self.parts: list[str] = []
        self.defs: list[str] = []
        self._arrow_ids: set[str] = set()

        if equal:
            # Match the unit length on both axes by growing the shorter range.
            sx = (self.w - self.pl - self.pr) / (self.x1 - self.x0)
            sy = (self.h - self.pt - self.pb) / (self.y1 - self.y0)
            s = min(sx, sy)
            cx, cy = (self.x0 + self.x1) / 2, (self.y0 + self.y1) / 2
            halfx = (self.w - self.pl - self.pr) / (2 * s)
            halfy = (self.h - self.pt - self.pb) / (2 * s)
            self.x0, self.x1 = cx - halfx, cx + halfx
            self.y0, self.y1 = cy - halfy, cy + halfy

    # ------------------------------------------------------------ mapping
    @property
    def plotw(self) -> float:
        return self.w - self.pl - self.pr

    @property
    def ploth(self) -> float:
        return self.h - self.pt - self.pb

    def sx(self, x: float) -> float:
        return self.pl + (x - self.x0) / (self.x1 - self.x0) * self.plotw

    def sy(self, y: float) -> float:
        return self.pt + (self.y1 - y) / (self.y1 - self.y0) * self.ploth

    def p(self, x: float, y: float) -> str:
        return f"{fmt(self.sx(x))},{fmt(self.sy(y))}"

    # -------------------------------------------------------------- pieces
    def add(self, markup: str) -> "Canvas":
        self.parts.append(markup)
        return self

    def arrowhead(self, cls: str = "fig-axis") -> str:
        key = cls.replace(" ", "-")
        if key not in self._arrow_ids:
            self._arrow_ids.add(key)
            self.defs.append(
                f'<marker id="ah-{key}" viewBox="0 0 10 10" refX="9" refY="5" '
                f'markerWidth="6" markerHeight="6" orient="auto-start-reverse">'
                f'<path d="M 0 0 L 10 5 L 0 10 z" class="{cls}-fill"/></marker>'
            )
        return f"ah-{key}"

    # --------------------------------------------------------------- axes
    def axes(
        self,
        xticks: Sequence[float] = (),
        yticks: Sequence[float] = (),
        xlabel: str = "x",
        ylabel: str = "y",
        origin: bool = True,
        xtick_labels: dict | None = None,
        ytick_labels: dict | None = None,
        show_y: bool = True,
    ) -> "Canvas":
        m = self.arrowhead("fig-axis")
        y_axis_x = max(self.x0, min(0, self.x1))
        x_axis_y = max(self.y0, min(0, self.y1))

        self.add(
            f'<line x1="{fmt(self.sx(self.x0))}" y1="{fmt(self.sy(x_axis_y))}" '
            f'x2="{fmt(self.sx(self.x1))}" y2="{fmt(self.sy(x_axis_y))}" '
            f'class="fig-axis" marker-end="url(#{m})"/>'
        )
        if show_y:
            self.add(
                f'<line x1="{fmt(self.sx(y_axis_x))}" y1="{fmt(self.sy(self.y0))}" '
                f'x2="{fmt(self.sx(y_axis_x))}" y2="{fmt(self.sy(self.y1))}" '
                f'class="fig-axis" marker-end="url(#{m})"/>'
            )

        # Axis names sit clear of the arrowheads, not under them.
        self.text(self.x1, x_axis_y, xlabel, dx=-4, dy=20, anchor="end", cls="fig-axislabel")
        if show_y:
            self.text(y_axis_x, self.y1, ylabel, dx=-11, dy=-4, anchor="end", cls="fig-axislabel")

        for t in xticks:
            if t == 0:
                continue
            self.add(
                f'<line x1="{fmt(self.sx(t))}" y1="{fmt(self.sy(x_axis_y) - 4)}" '
                f'x2="{fmt(self.sx(t))}" y2="{fmt(self.sy(x_axis_y) + 4)}" class="fig-tick"/>'
            )
            lbl = (xtick_labels or {}).get(t, fmt(t))
            self.text(t, x_axis_y, lbl, dy=17, anchor="middle", cls="fig-tiny")
        for t in yticks:
            if t == 0:
                continue
            self.add(
                f'<line x1="{fmt(self.sx(y_axis_x) - 4)}" y1="{fmt(self.sy(t))}" '
                f'x2="{fmt(self.sx(y_axis_x) + 4)}" y2="{fmt(self.sy(t))}" class="fig-tick"/>'
            )
            lbl = (ytick_labels or {}).get(t, fmt(t))
            self.text(y_axis_x, t, lbl, dx=-8, dy=4, anchor="end", cls="fig-tiny")

        if origin and self.x0 <= 0 <= self.x1 and self.y0 <= 0 <= self.y1:
            self.text(0, 0, "O", dx=-7, dy=15, anchor="middle", cls="fig-tiny")
        return self

    def grid(self, xstep: float = 1, ystep: float = 1) -> "Canvas":
        x = math.ceil(self.x0 / xstep) * xstep
        while x <= self.x1 + 1e-9:
            self.add(
                f'<line x1="{fmt(self.sx(x))}" y1="{fmt(self.sy(self.y0))}" '
                f'x2="{fmt(self.sx(x))}" y2="{fmt(self.sy(self.y1))}" class="fig-grid"/>'
            )
            x += xstep
        y = math.ceil(self.y0 / ystep) * ystep
        while y <= self.y1 + 1e-9:
            self.add(
                f'<line x1="{fmt(self.sx(self.x0))}" y1="{fmt(self.sy(y))}" '
                f'x2="{fmt(self.sx(self.x1))}" y2="{fmt(self.sy(y))}" class="fig-grid"/>'
            )
            y += ystep
        return self

    # ------------------------------------------------------------- curves
    def func(
        self,
        f: Callable[[float], float],
        a: float | None = None,
        b: float | None = None,
        cls: str = "fig-curve",
        n: int = 240,
        clip: bool = True,
    ) -> "Canvas":
        a = self.x0 if a is None else a
        b = self.x1 if b is None else b
        runs: list[list[str]] = [[]]
        for i in range(n + 1):
            x = a + (b - a) * i / n
            try:
                y = f(x)
            except (ValueError, ZeroDivisionError, OverflowError):
                runs.append([])
                continue
            if y != y or abs(y) == float("inf"):
                runs.append([])
                continue
            if clip and not (self.y0 - 1e-9 <= y <= self.y1 + 1e-9):
                runs.append([])
                continue
            runs[-1].append(self.p(x, y))
        for pts in runs:
            if len(pts) > 1:
                self.add(f'<polyline points="{" ".join(pts)}" class="{cls}"/>')
        return self

    def param(
        self,
        fx: Callable[[float], float],
        fy: Callable[[float], float],
        t0: float,
        t1: float,
        cls: str = "fig-curve",
        n: int = 240,
    ) -> "Canvas":
        pts = [self.p(fx(t0 + (t1 - t0) * i / n), fy(t0 + (t1 - t0) * i / n)) for i in range(n + 1)]
        self.add(f'<polyline points="{" ".join(pts)}" class="{cls}"/>')
        return self

    def line(self, p0: tuple[float, float], p1: tuple[float, float], cls: str = "fig-line") -> "Canvas":
        self.add(
            f'<line x1="{fmt(self.sx(p0[0]))}" y1="{fmt(self.sy(p0[1]))}" '
            f'x2="{fmt(self.sx(p1[0]))}" y2="{fmt(self.sy(p1[1]))}" class="{cls}"/>'
        )
        return self

    def path(self, pts: Iterable[tuple[float, float]], cls: str = "fig-line", close: bool = False) -> "Canvas":
        d = " ".join(self.p(x, y) for x, y in pts)
        tag = "polygon" if close else "polyline"
        self.add(f'<{tag} points="{d}" class="{cls}"/>')
        return self

    def circle(self, cx: float, cy: float, r: float, cls: str = "fig-curve") -> "Canvas":
        # Circles are drawn as parametric curves so a non-square scale still works.
        return self.param(lambda t: cx + r * math.cos(t), lambda t: cy + r * math.sin(t), 0, 2 * math.pi, cls)

    def arrow(self, p0: tuple[float, float], p1: tuple[float, float], cls: str = "fig-vector") -> "Canvas":
        m = self.arrowhead(cls)
        self.add(
            f'<line x1="{fmt(self.sx(p0[0]))}" y1="{fmt(self.sy(p0[1]))}" '
            f'x2="{fmt(self.sx(p1[0]))}" y2="{fmt(self.sy(p1[1]))}" '
            f'class="{cls}" marker-end="url(#{m})"/>'
        )
        return self

    # -------------------------------------------------------------- fills
    def _clampy(self, y: float) -> float:
        """Keep shaded regions inside the drawing area.

        A curve that leaves the top of the plot would otherwise paint its fill
        right across the page, since SVG strokes and fills are not clipped to
        the viewBox by default.
        """
        return max(self.y0, min(self.y1, y))

    def fill_between(
        self,
        f: Callable[[float], float],
        a: float,
        b: float,
        g: Callable[[float], float] | None = None,
        cls: str = "fig-fill",
        n: int = 160,
    ) -> "Canvas":
        top = [self.p(a + (b - a) * i / n, self._clampy(f(a + (b - a) * i / n))) for i in range(n + 1)]
        if g is None:
            bottom = [self.p(b, self._clampy(0)), self.p(a, self._clampy(0))]
        else:
            bottom = [
                self.p(a + (b - a) * i / n, self._clampy(g(a + (b - a) * i / n)))
                for i in range(n, -1, -1)
            ]
        self.add(f'<polygon points="{" ".join(top + bottom)}" class="{cls}"/>')
        return self

    def rect(self, x: float, y: float, w: float, h: float, cls: str = "fig-bar") -> "Canvas":
        x_px, y_px = self.sx(x), self.sy(y + h)
        w_px = self.sx(x + w) - x_px
        h_px = self.sy(y) - y_px
        self.add(
            f'<rect x="{fmt(x_px)}" y="{fmt(y_px)}" width="{fmt(w_px)}" '
            f'height="{fmt(h_px)}" class="{cls}"/>'
        )
        return self

    # ------------------------------------------------------------- points
    def point(
        self,
        x: float,
        y: float,
        label: str = "",
        dx: float = 8,
        dy: float = -8,
        cls: str = "fig-dot",
        anchor: str = "start",
        open_dot: bool = False,
    ) -> "Canvas":
        c = "fig-dot-open" if open_dot else cls
        self.add(f'<circle cx="{fmt(self.sx(x))}" cy="{fmt(self.sy(y))}" r="3.6" class="{c}"/>')
        if label:
            self.text(x, y, label, dx=dx, dy=dy, anchor=anchor, cls="fig-label")
        return self

    def text(
        self,
        x: float,
        y: float,
        s: str,
        dx: float = 0,
        dy: float = 0,
        anchor: str = "start",
        cls: str = "fig-label",
        italic: bool = False,
    ) -> "Canvas":
        style = ' font-style="italic"' if italic else ""
        self.add(
            f'<text x="{fmt(self.sx(x) + dx)}" y="{fmt(self.sy(y) + dy)}" '
            f'text-anchor="{anchor}" class="{cls}"{style}>{esc(s)}</text>'
        )
        return self

    def px_text(self, x: float, y: float, s: str, anchor: str = "start", cls: str = "fig-label") -> "Canvas":
        """Place text in raw SVG units, for annotations outside the data area."""
        self.add(f'<text x="{fmt(x)}" y="{fmt(y)}" text-anchor="{anchor}" class="{cls}">{esc(s)}</text>')
        return self

    # -------------------------------------------------------- annotations
    def angle_arc(
        self,
        vertex: tuple[float, float],
        a0: float,
        a1: float,
        r_px: float = 26,
        label: str = "",
        cls: str = "fig-angle",
    ) -> "Canvas":
        """Arc between two bearings (radians, measured anticlockwise from east)."""
        cx, cy = self.sx(vertex[0]), self.sy(vertex[1])
        n = 40
        pts = []
        for i in range(n + 1):
            a = a0 + (a1 - a0) * i / n
            pts.append(f"{fmt(cx + r_px * math.cos(a))},{fmt(cy - r_px * math.sin(a))}")
        self.add(f'<polyline points="{" ".join(pts)}" class="{cls}"/>')
        if label:
            am = (a0 + a1) / 2
            self.px_text(
                cx + (r_px + 14) * math.cos(am),
                cy - (r_px + 14) * math.sin(am) + 4,
                label,
                anchor="middle",
                cls="fig-tiny",
            )
        return self

    def right_angle(self, vertex: tuple[float, float], a0: float, a1: float, size: float = 11) -> "Canvas":
        cx, cy = self.sx(vertex[0]), self.sy(vertex[1])
        p1 = (cx + size * math.cos(a0), cy - size * math.sin(a0))
        p3 = (cx + size * math.cos(a1), cy - size * math.sin(a1))
        p2 = (p1[0] + p3[0] - cx, p1[1] + p3[1] - cy)
        self.add(
            f'<polyline points="{fmt(p1[0])},{fmt(p1[1])} {fmt(p2[0])},{fmt(p2[1])} '
            f'{fmt(p3[0])},{fmt(p3[1])}" class="fig-angle"/>'
        )
        return self

    def brace_v(self, x: float, y0: float, y1: float, label: str, dx: float = 10) -> "Canvas":
        """A vertical measurement bar with end caps, used for lengths and heights."""
        px = self.sx(x) + dx
        a, b = self.sy(y0), self.sy(y1)
        self.add(f'<line x1="{fmt(px)}" y1="{fmt(a)}" x2="{fmt(px)}" y2="{fmt(b)}" class="fig-dim"/>')
        for yy in (a, b):
            self.add(f'<line x1="{fmt(px - 4)}" y1="{fmt(yy)}" x2="{fmt(px + 4)}" y2="{fmt(yy)}" class="fig-dim"/>')
        self.px_text(px + 7, (a + b) / 2 + 4, label, cls="fig-tiny")
        return self

    def dashed_to_axes(self, x: float, y: float) -> "Canvas":
        self.line((x, 0), (x, y), cls="fig-guide")
        self.line((0, y), (x, y), cls="fig-guide")
        return self

    # -------------------------------------------------------------- output
    def svg(self, title: str = "") -> str:
        defs = f"<defs>{''.join(self.defs)}</defs>" if self.defs else ""
        t = f"<title>{esc(title)}</title>" if title else ""
        return (
            f'<svg viewBox="0 0 {self.w} {self.h}" class="figure-svg" '
            f'role="img" xmlns="http://www.w3.org/2000/svg">{t}{defs}'
            f'{"".join(self.parts)}</svg>'
        )
