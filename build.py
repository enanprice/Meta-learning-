#!/usr/bin/env python3
"""
Static site builder for the Edexcel A-Level Maths revision resource.

Reads Markdown files from content/ and writes a self-contained static site
into site/. No third-party dependencies -- the Markdown subset used by this
project is implemented in md.py.

Usage:
    python3 build.py            # build into site/
    python3 build.py --serve    # build, then serve on http://localhost:8000
"""

from __future__ import annotations

import html
import json
import os
import re
import shutil
import sys
from dataclasses import dataclass, field
from pathlib import Path

from md import render_markdown, strip_markup

ROOT = Path(__file__).resolve().parent
CONTENT = ROOT / "content"
ASSETS = ROOT / "assets"
OUT = ROOT / "site"

SECTION_TITLES = {
    "00-start-here": "Start Here",
    "01-pure-year1": "Pure — Year 12 (AS)",
    "02-pure-year2": "Pure — Year 13 (A2)",
    "03-statistics": "Statistics",
    "04-mechanics": "Mechanics",
    "05-exam-skills": "Exam Skills & Reference",
}

SECTION_BLURBS = {
    "00-start-here": "How to use this resource, and how to revise maths so it actually sticks.",
    "01-pure-year1": "The AS pure content: algebra, graphs, trigonometry, calculus and logs.",
    "02-pure-year2": "The A2 pure content: functions, series, advanced trig, harder calculus and 3D vectors.",
    "03-statistics": "Sampling, data, probability, distributions, and hypothesis testing.",
    "04-mechanics": "Kinematics, forces, moments, friction, projectiles and vector motion.",
    "05-exam-skills": "Formula booklet drills, command words, mark-scheme habits and revision planning.",
}


@dataclass
class Page:
    path: Path
    section: str
    slug: str
    meta: dict
    body_md: str
    html_body: str = ""
    headings: list = field(default_factory=list)

    @property
    def title(self) -> str:
        return self.meta.get("title", self.slug)

    @property
    def code(self) -> str:
        return self.meta.get("code", "")

    @property
    def out_name(self) -> str:
        return f"{self.section}--{self.slug}.html"


FRONT_MATTER_RE = re.compile(r"\A---\n(.*?)\n---\n", re.DOTALL)


def parse_front_matter(text: str) -> tuple[dict, str]:
    m = FRONT_MATTER_RE.match(text)
    if not m:
        return {}, text
    meta = {}
    for line in m.group(1).splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if ":" not in line:
            continue
        key, _, value = line.partition(":")
        meta[key.strip()] = value.strip()
    return meta, text[m.end():]


def load_pages() -> dict[str, list[Page]]:
    sections: dict[str, list[Page]] = {}
    for section in sorted(p.name for p in CONTENT.iterdir() if p.is_dir()):
        pages = []
        for f in sorted((CONTENT / section).glob("*.md")):
            raw = f.read_text(encoding="utf-8")
            meta, body = parse_front_matter(raw)
            page = Page(path=f, section=section, slug=f.stem, meta=meta, body_md=body)
            page.html_body, page.headings = render_markdown(body)
            pages.append(page)
        if pages:
            sections[section] = pages
    return sections


def nav_html(sections: dict[str, list[Page]], current: Page | None) -> str:
    out = ['<nav class="sidebar" id="sidebar"><div class="sidebar-inner">']
    out.append('<a class="brand" href="index.html"><span class="brand-mark">∫</span>'
               '<span><strong>Edexcel A-Level Maths</strong><small>Year 12 &amp; 13 revision</small></span></a>')
    out.append('<input type="search" id="nav-filter" placeholder="Filter topics…" '
               'aria-label="Filter topics">')
    for section, pages in sections.items():
        title = SECTION_TITLES.get(section, section)
        open_attr = " open" if current and current.section == section else ""
        out.append(f'<details class="nav-group"{open_attr}><summary>{html.escape(title)}</summary><ul>')
        for p in pages:
            cls = ' class="active"' if current and p is current else ""
            label = html.escape(p.title)
            code = html.escape(p.code)
            out.append(
                f'<li data-name="{html.escape((p.title + " " + code).lower())}">'
                f'<a href="{p.out_name}"{cls}><span class="code">{code}</span>{label}</a></li>'
            )
        out.append("</ul></details>")
    out.append("</div></nav>")
    return "".join(out)


PAGE_TEMPLATE = """<!doctype html>
<html lang="en" data-theme="auto">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="stylesheet" href="styles.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>∫</text></svg>">
<script>
window.MathJax = {{
  tex: {{
    inlineMath: [['$', '$']],
    displayMath: [['$$', '$$']],
    processEscapes: true,
    tags: 'none'
  }},
  options: {{ skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'] }},
  chtml: {{ scale: 1.0 }}
}};
</script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="topbar">
  <button id="menu-toggle" aria-label="Toggle navigation">☰</button>
  <a class="topbar-title" href="index.html">Edexcel A-Level Maths</a>
  <div class="topbar-actions">
    <button id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark mode">◐</button>
  </div>
</header>
{nav}
<main id="main" class="content">
{content}
</main>
<script src="app.js"></script>
</body>
</html>
"""


def topic_header(page: Page) -> str:
    meta = page.meta
    bits = []
    if meta.get("spec"):
        bits.append(f'<span class="chip"><b>Spec:</b> {html.escape(meta["spec"])}</span>')
    if meta.get("time"):
        bits.append(f'<span class="chip"><b>Study time:</b> {html.escape(meta["time"])}</span>')
    if meta.get("prereq"):
        bits.append(f'<span class="chip"><b>Needs first:</b> {html.escape(meta["prereq"])}</span>')
    if meta.get("papers"):
        bits.append(f'<span class="chip"><b>Examined in:</b> {html.escape(meta["papers"])}</span>')
    chips = f'<div class="chips">{"".join(bits)}</div>' if bits else ""
    summary = ""
    if meta.get("summary"):
        summary = f'<p class="lede">{html.escape(meta["summary"])}</p>'
    return (
        f'<div class="topic-head">'
        f'<p class="eyebrow">{html.escape(SECTION_TITLES.get(page.section, page.section))}'
        f'{" · " + html.escape(page.code) if page.code else ""}</p>'
        f'<h1>{html.escape(page.title)}</h1>'
        f'{summary}{chips}'
        f'<label class="done-toggle"><input type="checkbox" class="topic-done" '
        f'data-topic="{page.out_name}"> Mark this topic as revised</label>'
        f"</div>"
    )


def toc_html(headings: list) -> str:
    tops = [h for h in headings if h[0] == 2]
    if len(tops) < 3:
        return ""
    items = "".join(
        f'<li><a href="#{h[2]}">{html.escape(h[1])}</a></li>' for h in tops
    )
    return f'<details class="toc" open><summary>On this page</summary><ul>{items}</ul></details>'


def prev_next(pages_flat: list[Page], page: Page) -> str:
    i = pages_flat.index(page)
    prev = pages_flat[i - 1] if i > 0 else None
    nxt = pages_flat[i + 1] if i < len(pages_flat) - 1 else None
    parts = ['<nav class="pager">']
    if prev:
        parts.append(f'<a class="prev" href="{prev.out_name}"><small>Previous</small>{html.escape(prev.title)}</a>')
    else:
        parts.append("<span></span>")
    if nxt:
        parts.append(f'<a class="next" href="{nxt.out_name}"><small>Next</small>{html.escape(nxt.title)}</a>')
    else:
        parts.append("<span></span>")
    parts.append("</nav>")
    return "".join(parts)


def build_index(sections: dict[str, list[Page]]) -> str:
    total = sum(len(v) for v in sections.values())
    cards = []
    for section, pages in sections.items():
        title = SECTION_TITLES.get(section, section)
        blurb = SECTION_BLURBS.get(section, "")
        rows = "".join(
            f'<li data-topic="{p.out_name}"><a href="{p.out_name}">'
            f'<span class="code">{html.escape(p.code)}</span>'
            f'<span class="t">{html.escape(p.title)}</span>'
            f'<span class="s">{html.escape(p.meta.get("summary", ""))}</span></a></li>'
            for p in pages
        )
        cards.append(
            f'<section class="section-card" id="{section}">'
            f'<header><h2>{html.escape(title)}</h2><p>{html.escape(blurb)}</p>'
            f'<span class="count">{len(pages)} topics</span></header>'
            f'<ul class="topic-list">{rows}</ul></section>'
        )
    hero = f"""
<div class="hero">
  <p class="eyebrow">Pearson Edexcel A Level Mathematics (9MA0)</p>
  <h1>Everything you need, explained properly.</h1>
  <p class="lede">{total} topic guides covering the whole of Year 12 and Year 13 — Pure, Statistics
  and Mechanics. Each one explains <em>why</em> the method works, walks through worked examples in
  full, flags the mistakes that cost marks, and finishes with graded practice questions and full
  solutions.</p>
  <div class="hero-actions">
    <a class="btn" href="00-start-here--how-to-use-this.html">Start here</a>
    <a class="btn ghost" href="05-exam-skills--formula-booklet.html">What's in the formula booklet</a>
  </div>
  <div class="progress-wrap">
    <div class="progress"><div id="progress-bar"></div></div>
    <p id="progress-label" class="muted">0 of {total} topics marked as revised</p>
    <button id="reset-progress" class="linkish">Reset progress</button>
  </div>
</div>
"""
    return hero + "".join(cards)


def write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def main() -> int:
    sections = load_pages()
    if not sections:
        print("No content found.", file=sys.stderr)
        return 1

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    flat = [p for pages in sections.values() for p in pages]
    search_index = []

    for page in flat:
        nav = nav_html(sections, page)
        content = (
            topic_header(page)
            + toc_html(page.headings)
            + f'<article class="prose">{page.html_body}</article>'
            + prev_next(flat, page)
        )
        write(
            OUT / page.out_name,
            PAGE_TEMPLATE.format(
                title=html.escape(page.title) + " · Edexcel A-Level Maths",
                description=html.escape(page.meta.get("summary", "")),
                nav=nav,
                content=content,
            ),
        )
        search_index.append(
            {
                "t": page.title,
                "c": page.code,
                "u": page.out_name,
                "s": SECTION_TITLES.get(page.section, page.section),
                "k": strip_markup(page.body_md)[:2500],
            }
        )

    write(
        OUT / "index.html",
        PAGE_TEMPLATE.format(
            title="Edexcel A-Level Maths — Year 12 &amp; 13 revision",
            description="Complete Edexcel A-Level Maths revision resource: notes, worked examples and practice questions.",
            nav=nav_html(sections, None),
            content=build_index(sections),
        ),
    )

    write(OUT / "search-index.json", json.dumps(search_index, ensure_ascii=False))
    for asset in ASSETS.glob("*"):
        if asset.is_file():
            shutil.copy2(asset, OUT / asset.name)

    print(f"Built {len(flat)} topic pages + index into {OUT}")
    if "--serve" in sys.argv:
        import http.server, socketserver, functools
        handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(OUT))
        with socketserver.TCPServer(("", 8000), handler) as httpd:
            print("Serving on http://localhost:8000 (Ctrl-C to stop)")
            httpd.serve_forever()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
