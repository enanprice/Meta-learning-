#!/usr/bin/env python3
"""
Build the history revision site into history/site/index.html.

The whole site is one HTML file. Each view (home, a topic's overview, notes
and essays, a fact file, an essay page) is a <section> shown or hidden by the
hash in the URL, so the file can be opened from disk or published as one page.

    python3 history/build.py

Each topic lives in its own module under history/topics/: the topic's aspects
and essay pages (TOPIC), a timeline (TIMELINE) and its fact files (ENTRIES).
Essay pages are Markdown files under history/content/.
"""

from __future__ import annotations

import html
import importlib
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
sys.path.insert(0, str(HERE))
from md import inline, render_markdown  # noqa: E402
from art import ART  # noqa: E402

CONTENT = HERE / "content"
OUT = HERE / "site" / "index.html"
MODULES = ["tudors", "stuarts", "russia", "civil_rights"]

esc = html.escape


def load_topics() -> list[dict]:
    topics = []
    for name in MODULES:
        mod = importlib.import_module(f"topics.{name}")
        t = dict(mod.TOPIC)
        t["timeline"] = mod.TIMELINE
        t["entries"] = mod.ENTRIES
        t["by_id"] = {e["id"]: e for e in mod.ENTRIES}
        check(t)
        topics.append(t)
    return topics


def check(t: dict) -> None:
    """Fail the build on a broken cross-reference rather than shipping a dead link."""
    keys = {a["key"] for a in t["aspects"]}
    for e in t["entries"]:
        for k in e["aspects"]:
            assert k in keys, f"{t['id']}/{e['id']}: unknown aspect {k!r}"
        for link in e.get("links", []):
            assert link in t["by_id"], f"{t['id']}/{e['id']}: unknown link {link!r}"
    for row in t["timeline"]:
        if len(row) > 2:
            assert row[2] in t["by_id"], f"{t['id']} timeline: unknown entry {row[2]!r}"
    for p in t.get("essays", []):
        assert p["aspect"] in keys, f"{t['id']}/{p['id']}: unknown aspect {p['aspect']!r}"


def entry_href(t: dict, e: dict) -> str:
    return f"#{t['id']}-f-{e['id']}"


def chip(t: dict, e: dict) -> str:
    return f'<a class="chip chip-{e["kind"]}" href="{entry_href(t, e)}">{esc(e["name"])}</a>'


def paras(text: str) -> str:
    return "".join(f"<p>{inline(p.strip())}</p>" for p in text.strip().split("\n\n"))


# ------------------------------------------------------------------ shared parts

def crumbs(t: dict | None = None, *extra: tuple[str, str]) -> str:
    parts = ['<a href="#home">All topics</a>']
    if t:
        parts.append(f'<a href="#{t["id"]}">{esc(t["name"])}</a>')
    parts += [f'<a href="{href}">{esc(label)}</a>' for href, label in extra]
    return '<nav class="crumbs">' + "<span>/</span>".join(parts) + "</nav>"


def tabs(t: dict, current: str) -> str:
    items = [("overview", f"#{t['id']}", "Overview"),
             ("notes", f"#{t['id']}-notes", "Notes"),
             ("essays", f"#{t['id']}-essays", "Essays")]
    links = "".join(f'<a href="{href}"{" aria-current=\"page\"" if key == current else ""}>{label}</a>'
                    for key, href, label in items)
    return f'<nav class="tabs" aria-label="{esc(t["name"])} sections">{links}</nav>'


def strip(t: dict, suffix: str) -> str:
    return f'<div class="art strip-art" aria-hidden="true">{ART[t["id"]](suffix)}</div>'


def view(t: dict | None, view_id: str, body: str) -> str:
    cls = f' t-{t["id"]}' if t else ""
    return f'<section class="view{cls}" data-view="{view_id}" hidden>{body}</section>'


# ------------------------------------------------------------------------- home

def topic_card(t: dict) -> str:
    people = sum(1 for e in t["entries"] if e["kind"] == "person")
    events = len(t["entries"]) - people
    plans = len(t.get("essays", []))
    status = f"{people} people · {events} events · {plans} essay page{'s' if plans != 1 else ''}"
    start, end = t["dates"].split("–")
    return f"""
<a class="card t-{t['id']}" href="#{t['id']}">
  <span class="art card-art">{ART[t['id']]("-card-" + t["id"])}</span>
  <span class="card-body">
    <span class="card-dates"><span>{start}</span><span class="dash">–</span><span>{end}</span></span>
    <span class="card-name">{esc(t['name'])}</span>
    <span class="card-blurb">{esc(t['blurb'])}</span>
    <span class="card-status">{status}</span>
  </span>
</a>"""


SPAN = (1485, 2009)


def timeline_strip(topics: list[dict]) -> str:
    """A to-scale strip of the four topics. Topics that overlap go on a second lane."""
    lo, hi = SPAN
    pct = lambda y: (y - lo) / (hi - lo) * 100  # noqa: E731
    lanes: list[int] = []  # end year of the last band on each lane
    bands = []
    for t in topics:
        start, end = (int(y) for y in t["dates"].split("–"))
        lane = next((i for i, e in enumerate(lanes) if e <= start), len(lanes))
        if lane == len(lanes):
            lanes.append(end)
        lanes[lane] = end
        bands.append(f'<a class="band t-{t["id"]}" href="#{t["id"]}" '
                     f'style="left:{pct(start):.2f}%;width:{pct(end) - pct(start):.2f}%;top:calc({lane} * var(--lane))" '
                     f'title="{esc(t["name"])}, {t["dates"]}">{esc(t["short"])}</a>')
    ticks = "".join(f'<span class="tick" style="left:{pct(y):.2f}%">{y}</span>'
                    for y in range(1500, hi + 1, 100))
    return (f'<div class="timeline" style="--lanes:{len(lanes)}" aria-label="The four topics on one timeline">'
            f'<div class="bands">{"".join(bands)}</div><div class="ticks">{ticks}</div></div>')


# --------------------------------------------------------------------- overview

def overview_view(t: dict) -> str:
    rows = []
    for a in t["aspects"]:
        entries = [e for e in t["entries"] if a["key"] in e["aspects"]]
        essays = [p for p in t.get("essays", []) if p["aspect"] == a["key"]]
        qs = "".join(f"<li>{inline(q)}</li>" for q in a["questions"])
        chips = "".join(chip(t, e) for e in entries)
        essay_links = "".join(f'<a class="aspect-link" href="#{p["id"]}">{esc(p["title"])}</a>' for p in essays)
        rows.append(f"""
<li class="aspect">
  <div class="aspect-head">
    <span class="aspect-dates">{a['dates']}</span>
    <h3>{esc(a['name'])}</h3>
    {'<span class="pill pill-ready">Essay plans</span>' if essays else ''}
  </div>
  {f'<p class="aspect-sum">{inline(a["summary"])}</p>' if a.get("summary") else ''}
  {f'<p class="label">Fact files</p><div class="chips">{chips}</div>' if chips else ''}
  <p class="label">Possible questions</p>
  <ol class="questions">{qs}</ol>
  {essay_links}
</li>""")
    body = f"""
{crumbs()}
<div class="topic-top">
  <div class="art hero-art">{ART[t['id']]("-hero-" + t["id"])}</div>
  <header class="topic-head">
    <p class="topic-dates">{t['dates']}</p>
    <h1>{esc(t['name'])}</h1>
    <p class="lede">{esc(t['blurb'])}</p>
  </header>
</div>
{tabs(t, "overview")}
<p class="section-intro">The course in {len(t['aspects'])} aspects. Each lists the fact files that belong to it and the questions it could produce.</p>
<ul class="aspects">{''.join(rows)}</ul>"""
    return view(t, t["id"], body)


# ------------------------------------------------------------------------ notes

def entry_card(t: dict, e: dict) -> str:
    return f"""
<a class="entry-card" href="{entry_href(t, e)}">
  <span class="entry-dates">{esc(e['dates'])}</span>
  <span class="entry-name">{esc(e['name'])}</span>
  <span class="entry-role">{inline(e['role'])}</span>
</a>"""


def notes_view(t: dict) -> str:
    rows = []
    for row in t["timeline"]:
        date, text = row[0], row[1]
        link = row[2] if len(row) > 2 else None
        target = f' <a class="tl-link" href="{entry_href(t, t["by_id"][link])}">Fact file</a>' if link else ""
        rows.append(f'<li><span class="tl-date">{esc(date)}</span><span class="tl-text">{inline(text)}{target}</span></li>')
    people = "".join(entry_card(t, e) for e in t["entries"] if e["kind"] == "person")
    events = "".join(entry_card(t, e) for e in t["entries"] if e["kind"] == "event")
    body = f"""
{crumbs(t)}
{strip(t, "-notes-" + t["id"])}
<header class="page-head">
  <p class="topic-dates">{t['dates']}</p>
  <h1>{esc(t['short'])}: Notes</h1>
  <p class="lede">A timeline of the whole topic, then a fact file for every key person and event. Each fact file covers what happened, the key facts, what it signifies, and the questions it could come up in.</p>
</header>
{tabs(t, "notes")}
<div class="notes-grid">
  <section class="notes-col">
    <h2 class="block-title">Timeline</h2>
    {f'<p class="note">{inline(t["timeline_note"])}</p>' if t.get("timeline_note") else ''}
    <ol class="tl">{''.join(rows)}</ol>
  </section>
  <section class="notes-col">
    <h2 class="block-title">People</h2>
    <div class="entry-grid">{people}</div>
    <h2 class="block-title">Events</h2>
    <div class="entry-grid">{events}</div>
  </section>
</div>"""
    return view(t, f"{t['id']}-notes", body)


def entry_view(t: dict, e: dict) -> str:
    aspects = [a for a in t["aspects"] if a["key"] in e["aspects"]]
    facts = "".join(f"<li>{inline(f)}</li>" for f in e["facts"])
    tl = "".join(f'<li><span class="tl-date">{esc(d)}</span><span class="tl-text">{inline(x)}</span></li>'
                 for d, x in e["timeline"])
    sig = "".join(f"<li>{inline(s)}</li>" for s in e["significance"])
    links = "".join(chip(t, t["by_id"][i]) for i in e.get("links", []))
    asp = "".join(f'<a class="chip chip-aspect" href="#{t["id"]}">{esc(a["name"])} <span>{a["dates"]}</span></a>'
                  for a in aspects)
    qs = "".join(f'<li><p class="q">{inline(q)}</p><p class="q-use">{inline(use)}</p></li>'
                 for q, use in e["questions"])
    kind = "Person" if e["kind"] == "person" else "Event"
    body = f"""
{crumbs(t, (f"#{t['id']}-notes", "Notes"))}
{strip(t, "-f-" + e["id"])}
<header class="page-head">
  <p class="kind">{kind} · {esc(e['dates'])}</p>
  <h1>{esc(e['name'])}</h1>
  <p class="lede">{inline(e['role'])}</p>
</header>
<article class="fact-file">
  <section class="ff-summary">
    <h2 class="block-title">{"Who they were" if e["kind"] == "person" else "What happened"}</h2>
    {paras(e['summary'])}
  </section>
  <div class="ff-pair">
    <section>
      <h2 class="block-title">Fact file</h2>
      <ul class="facts">{facts}</ul>
    </section>
    <section>
      <h2 class="block-title">Timeline</h2>
      <ol class="tl tl-tight">{tl}</ol>
    </section>
  </div>
  <section class="ff-sig">
    <h2 class="block-title">Significance and connotations</h2>
    <p class="note">What mentioning this in an essay signals, and the arguments it supports.</p>
    <ul class="sig">{sig}</ul>
  </section>
  <section>
    <h2 class="block-title">Where it fits</h2>
    <div class="chips">{asp}</div>
    {f'<p class="label">Linked fact files</p><div class="chips">{links}</div>' if links else ''}
  </section>
  <section>
    <h2 class="block-title">Questions it could come up in</h2>
    <ol class="qlist">{qs}</ol>
  </section>
</article>"""
    return view(t, f"{t['id']}-f-{e['id']}", body)


# ----------------------------------------------------------------------- essays

def essays_view(t: dict) -> str:
    pages = "".join(f"""
<a class="essay-card" href="#{p['id']}">
  <span class="entry-dates">{esc(next(a['dates'] for a in t['aspects'] if a['key'] == p['aspect']))}</span>
  <span class="entry-name">{esc(p['title'])}</span>
  <span class="entry-role">{esc(p['summary'])}</span>
</a>""" for p in t.get("essays", []))
    if not pages:
        pages = '<p class="empty">No essay plans written for this topic yet. Pick a question below and ask for a plan.</p>'
    by_aspect = "".join(f"""
<li>
  <p class="label">{esc(a['name'])} · {a['dates']}</p>
  <ol class="questions">{''.join(f'<li>{inline(q)}</li>' for q in a['questions'])}</ol>
</li>""" for a in t["aspects"])
    body = f"""
{crumbs(t)}
{strip(t, "-essays-" + t["id"])}
<header class="page-head">
  <p class="topic-dates">{t['dates']}</p>
  <h1>{esc(t['short'])}: Essays</h1>
  <p class="lede">Full essay plans, then every practice question on the site grouped by aspect.</p>
</header>
{tabs(t, "essays")}
<h2 class="block-title">Essay plans</h2>
<div class="entry-grid">{pages}</div>
<h2 class="block-title">Practice questions by aspect</h2>
<ul class="by-aspect">{by_aspect}</ul>"""
    return view(t, f"{t['id']}-essays", body)


def essay_page_view(t: dict, p: dict) -> str:
    md, _ = render_markdown((CONTENT / p["file"]).read_text(encoding="utf-8"))
    a = next(a for a in t["aspects"] if a["key"] == p["aspect"])
    body = f"""
{crumbs(t, (f"#{t['id']}-essays", "Essays"))}
{strip(t, "-page-" + p["id"])}
<header class="page-head">
  <p class="topic-dates">{a['dates']}</p>
  <h1>{esc(p['title'])}</h1>
  <p class="lede">{esc(p['summary'])}</p>
</header>
{tabs(t, "essays")}
<article class="prose">{md}</article>"""
    return view(t, p["id"], body)


# ------------------------------------------------------------------------ build

def build() -> None:
    topics = load_topics()
    views = []
    for t in topics:
        views.append(overview_view(t))
        views.append(notes_view(t))
        views.append(essays_view(t))
        views += [entry_view(t, e) for e in t["entries"]]
        views += [essay_page_view(t, p) for p in t.get("essays", [])]
    template = (HERE / "template.html").read_text(encoding="utf-8")
    out = (template.replace("{{timeline}}", timeline_strip(topics))
           .replace("{{cards}}", "".join(topic_card(t) for t in topics))
           .replace("{{views}}", "".join(views)))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(out, encoding="utf-8")
    n = sum(len(t["entries"]) for t in topics)
    print(f"Wrote {OUT.relative_to(HERE.parent)}: {len(topics)} topics, {n} fact files")


if __name__ == "__main__":
    build()
