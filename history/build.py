#!/usr/bin/env python3
"""
Build the history revision site into history/site/index.html.

The whole site is one HTML file. Each view (home, a topic, an essay page) is a
<section> shown or hidden by the hash in the URL, so the file can be opened
straight from disk or published as a single page.

    python3 history/build.py

Topics and their aspects live in TOPICS below. To add a page of notes or
essay plans, write it as Markdown under history/content/ and point an
aspect's "page" at it.
"""

from __future__ import annotations

import html
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
from md import render_markdown  # noqa: E402

CONTENT = HERE / "content"
OUT = HERE / "site" / "index.html"

TOPICS = [
    {
        "id": "tudors",
        "name": "The Tudors",
        "dates": "1485–1603",
        "blurb": "Henry VII's seizure of the throne to the death of Elizabeth I: "
                 "royal power, the Reformation and the mid-Tudor crisis.",
        "aspects": [
            {"name": "Henry VII: securing the dynasty", "dates": "1485–1509",
             "questions": ["How far had Henry VII secured his throne by 1509?"]},
            {"name": "Henry VIII, Wolsey and Cromwell", "dates": "1509–1547",
             "questions": ["To what extent did Henry VIII rely on his ministers in government?"]},
            {"name": "The Reformation", "dates": "1529–1547",
             "questions": ["How far was the break with Rome driven by the king's marriage?"]},
            {"name": "The mid-Tudor crisis", "dates": "1547–1558",
             "questions": ["\"England faced a genuine crisis in the years 1547–1558.\" Assess the validity of this view."]},
            {"name": "Elizabeth I: religion and government", "dates": "1558–1603",
             "questions": ["How successful was Elizabeth I's religious settlement?"]},
        ],
    },
    {
        "id": "stuarts",
        "name": "The Stuarts",
        "dates": "1603–1702",
        "blurb": "James I to the end of William III: Crown against Parliament, "
                 "civil war, republic, Restoration and the Glorious Revolution.",
        "aspects": [
            {"name": "James I and Parliament", "dates": "1603–1625",
             "questions": ["How far did relations between Crown and Parliament break down under James I?"]},
            {"name": "Charles I and the Personal Rule", "dates": "1625–1640",
             "questions": ["To what extent was the Personal Rule a success for Charles I?"]},
            {"name": "The Civil Wars", "dates": "1642–1649",
             "questions": ["How far was Charles I responsible for his own execution?"]},
            {"name": "The Interregnum", "dates": "1649–1660",
             "questions": ["Why did the republic fail to find a lasting settlement?"]},
            {"name": "Restoration and Glorious Revolution", "dates": "1660–1702",
             "questions": ["How far did the Glorious Revolution change the power of the monarchy?"]},
        ],
    },
    {
        "id": "russia",
        "name": "Tsarist and Communist Russia",
        "dates": "1855–1964",
        "blurb": "Alexander II's reforms to the fall of Khrushchev: autocracy, "
                 "revolution and the Soviet state.",
        "aspects": [
            {"name": "Alexander II and reform", "dates": "1855–1881",
             "questions": ["How far did Alexander II's reforms change Russia?"]},
            {"name": "Alexander III and reaction", "dates": "1881–1894",
             "questions": ["To what extent was Alexander III's reign one of reaction?"]},
            {"name": "The Russian economy", "dates": "1894–1914",
             "page": {"id": "russia-economy", "file": "russia/economy-1894-1914.md",
                      "title": "The Russian Economy, 1894–1914",
                      "summary": "Three full essay plans, a timeline, a statistics bank and historians."},
             "questions": [
                 "\"The Russian economy was transformed in the years 1894–1914.\" Assess the validity of this view.",
                 "How far was state policy the main reason for Russian economic growth in the years 1894–1914?",
                 "\"Russia's economic modernisation in the years 1894–1914 was fundamentally limited by the backwardness of agriculture.\" Assess the validity of this view.",
             ]},
            {"name": "1905 and the Dumas", "dates": "1905–1914",
             "questions": ["How far did the October Manifesto change the way Russia was governed?"]},
            {"name": "War and revolution", "dates": "1914–1917",
             "questions": ["To what extent was the First World War responsible for the fall of the Tsar?"]},
            {"name": "Lenin and Stalin", "dates": "1917–1953",
             "questions": ["How far did Stalin's rule continue Lenin's?"]},
            {"name": "Khrushchev", "dates": "1953–1964",
             "questions": ["How far did Khrushchev break with Stalinism?"]},
        ],
    },
    {
        "id": "civil-rights",
        "name": "Civil Rights in the USA",
        "dates": "1865–2009",
        "blurb": "Reconstruction to the election of Obama: Jim Crow, the "
                 "courts, the movement and Black Power.",
        "aspects": [
            {"name": "Reconstruction and Jim Crow", "dates": "1865–1896",
             "questions": ["How far did Reconstruction improve the position of African Americans?"]},
            {"name": "Washington, Du Bois and the NAACP", "dates": "1896–1941",
             "questions": ["How effective were African American leaders in the years 1896–1941?"]},
            {"name": "War, the courts and Brown", "dates": "1941–1955",
             "questions": ["To what extent was the Supreme Court the main driver of change in 1941–1955?"]},
            {"name": "The movement at its height", "dates": "1955–1968",
             "questions": ["How far was Martin Luther King responsible for the gains of 1955–1968?"]},
            {"name": "Black Power and after", "dates": "1965–2009",
             "questions": ["\"The election of Obama in 2008 marked the fulfilment of the civil rights movement.\" Assess the validity of this view."]},
        ],
    },
]

esc = html.escape


def topic_card(t: dict) -> str:
    ready = sum(1 for a in t["aspects"] if "page" in a)
    status = f"{ready} of {len(t['aspects'])} aspects written" if ready else "Not started"
    start, end = t["dates"].split("–")
    return f"""
<a class="card t-{t['id']}" href="#{t['id']}">
  <span class="card-dates"><span>{start}</span><span class="dash">–</span><span>{end}</span></span>
  <span class="card-name">{esc(t['name'])}</span>
  <span class="card-blurb">{esc(t['blurb'])}</span>
  <span class="card-status">{status}</span>
</a>"""


def aspect_row(a: dict) -> str:
    qs = "".join(f"<li>{esc(q)}</li>" for q in a["questions"])
    if "page" in a:
        p = a["page"]
        link = f'<a class="aspect-link" href="#{p["id"]}">Open the essay plans</a>'
        state = '<span class="pill pill-ready">Plans ready</span>'
    else:
        link = ""
        state = '<span class="pill">To write</span>'
    return f"""
<li class="aspect">
  <div class="aspect-head">
    <span class="aspect-dates">{a['dates']}</span>
    <h3>{esc(a['name'])}</h3>
    {state}
  </div>
  <p class="label">{"Questions" if len(a["questions"]) > 1 else "Practice question"}</p>
  <ol class="questions">{qs}</ol>
  {link}
</li>"""


def topic_view(t: dict) -> str:
    rows = "".join(aspect_row(a) for a in t["aspects"])
    return f"""
<section class="view t-{t['id']}" data-view="{t['id']}" hidden>
  <nav class="crumbs"><a href="#home">All topics</a></nav>
  <header class="topic-head">
    <p class="topic-dates">{t['dates']}</p>
    <h1>{esc(t['name'])}</h1>
    <p class="lede">{esc(t['blurb'])}</p>
  </header>
  <ul class="aspects">{rows}</ul>
</section>"""


def page_view(t: dict, a: dict) -> str:
    p = a["page"]
    body, _ = render_markdown((CONTENT / p["file"]).read_text(encoding="utf-8"))
    return f"""
<section class="view t-{t['id']}" data-view="{p['id']}" hidden>
  <nav class="crumbs"><a href="#home">All topics</a><span>/</span><a href="#{t['id']}">{esc(t['name'])}</a></nav>
  <header class="topic-head">
    <p class="topic-dates">{a['dates']}</p>
    <h1>{esc(p['title'])}</h1>
    <p class="lede">{esc(p['summary'])}</p>
  </header>
  <article class="prose">{body}</article>
</section>"""


SPAN = (1485, 2009)
SHORT = {"tudors": "Tudors", "stuarts": "Stuarts", "russia": "Russia", "civil-rights": "Civil Rights"}


def timeline() -> str:
    """A to-scale strip of the four topics. Topics that overlap go on a second lane."""
    lo, hi = SPAN
    pct = lambda y: (y - lo) / (hi - lo) * 100  # noqa: E731
    lanes: list[int] = []  # end year of the last band on each lane
    bands = []
    for t in TOPICS:
        start, end = (int(y) for y in t["dates"].split("–"))
        lane = next((i for i, e in enumerate(lanes) if e <= start), len(lanes))
        if lane == len(lanes):
            lanes.append(end)
        lanes[lane] = end
        bands.append(f'<a class="band t-{t["id"]}" href="#{t["id"]}" '
                     f'style="left:{pct(start):.2f}%;width:{pct(end) - pct(start):.2f}%;top:calc({lane} * var(--lane))" '
                     f'title="{esc(t["name"])}, {t["dates"]}">{SHORT[t["id"]]}</a>')
    ticks = "".join(f'<span class="tick" style="left:{pct(y):.2f}%">{y}</span>'
                    for y in range(1500, hi + 1, 100))
    return (f'<div class="timeline" style="--lanes:{len(lanes)}" aria-label="The four topics on one timeline">'
            f'<div class="bands">{"".join(bands)}</div><div class="ticks">{ticks}</div></div>')


def build() -> None:
    cards = "".join(topic_card(t) for t in TOPICS)
    views = "".join(topic_view(t) for t in TOPICS)
    pages = "".join(page_view(t, a) for t in TOPICS for a in t["aspects"] if "page" in a)
    template = (HERE / "template.html").read_text(encoding="utf-8")
    out = (template.replace("{{timeline}}", timeline())
           .replace("{{cards}}", cards)
           .replace("{{views}}", views + pages))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(out, encoding="utf-8")
    print(f"Wrote {OUT.relative_to(HERE.parent)}")


if __name__ == "__main__":
    build()
