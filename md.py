#!/usr/bin/env python3
"""
A small, dependency-free Markdown renderer covering exactly the subset of
Markdown used by this project, plus the custom ::: block directives.

Supported:
  * ATX headings (## ### ####) with auto-generated anchor ids
  * paragraphs, **bold**, *italic*, `code`, [links](url), --- rules
  * bullet and numbered lists, nested by indentation
  * pipe tables with optional column alignment
  * > blockquotes
  * LaTeX maths delimited by $ ... $ and $$ ... $$ (passed through untouched
    for MathJax, and protected from every inline transformation)
  * fenced directives:
        :::example Title        -> worked example box
        :::question Q1 (3 marks)-> practice question box
        :::answer               -> collapsible solution
        :::key Title            -> key result / must-learn box
        :::warning Title        -> common-mistake box
        :::insight Title        -> intuition / "why it works" box
        :::recall Title         -> prior-knowledge reminder
        :::columns              -> two-column layout on wide screens
    each closed by a line containing only  :::
"""

from __future__ import annotations

import html
import re

SENTINEL = "\x01"

BOX_KINDS = {
    "example": ("box example", "Worked example"),
    "question": ("box question", "Question"),
    "key": ("box key", "Key result"),
    "warning": ("box warning", "Watch out"),
    "insight": ("box insight", "Why it works"),
    "recall": ("box recall", "Recall"),
    "method": ("box method", "Method"),
    "exam": ("box exam", "In the exam"),
}


# ---------------------------------------------------------------- protection

def protect(text: str) -> tuple[str, list[str]]:
    """Pull maths and inline code out of the text so markdown rules can't touch them."""
    store: list[str] = []

    def stash(s: str) -> str:
        store.append(s)
        return f"{SENTINEL}{len(store) - 1}{SENTINEL}"

    text = re.sub(r"\$\$(.+?)\$\$", lambda m: stash(f"$${m.group(1)}$$"), text, flags=re.DOTALL)
    text = re.sub(r"(?<!\$)\$([^$\n]+?)\$(?!\$)", lambda m: stash(f"${m.group(1)}$"), text)
    text = re.sub(r"`([^`\n]+?)`", lambda m: stash("<code>" + html.escape(m.group(1)) + "</code>"), text)
    return text, store


def restore(text: str, store: list[str]) -> str:
    def put(m: re.Match) -> str:
        return store[int(m.group(1))]

    return re.sub(SENTINEL + r"(\d+)" + SENTINEL, put, text)


# -------------------------------------------------------------------- inline

def inline(text: str) -> str:
    text = html.escape(text, quote=False)
    text = re.sub(r"\[([^\]]+)\]\(([^)\s]+)\)", r'<a href="\2">\1</a>', text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*([^*\n]+?)\*(?![\w*])", r"<em>\1</em>", text)
    text = re.sub(r"(?<![\w_])_([^_\n]+?)_(?![\w_])", r"<em>\1</em>", text)
    text = re.sub(r"\s+--\s+", " — ", text)
    return text


def slugify(text: str) -> str:
    text = re.sub(SENTINEL + r"\d+" + SENTINEL, "", text)
    text = re.sub(r"[*_`$\\]", "", text).strip().lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-") or "section"


# -------------------------------------------------------------------- blocks

LIST_RE = re.compile(r"^(\s*)([-*]|\d+[.)])\s+(.*)$")
HEADING_RE = re.compile(r"^(#{2,5})\s+(.*)$")
TABLE_SEP_RE = re.compile(r"^\s*\|?[\s:-]*\|[\s:|-]*$")
DIRECTIVE_RE = re.compile(r"^:::\s*(\w+)?\s*(.*)$")


def parse(lines: list[str], headings: list, depth: int = 0) -> str:
    out: list[str] = []
    i = 0
    n = len(lines)
    while i < n:
        line = lines[i]
        if not line.strip():
            i += 1
            continue

        m = DIRECTIVE_RE.match(line.strip())
        if m and m.group(1):
            kind = m.group(1)
            title = m.group(2).strip()
            body, i = collect_directive(lines, i)
            out.append(render_directive(kind, title, body, headings, depth))
            continue

        m = HEADING_RE.match(line)
        if m:
            level = len(m.group(1))
            text = m.group(2).strip()
            hid = slugify(text)
            if level <= 3:
                # Keep the maths placeholders here; render_markdown restores them
                # afterwards so headings containing formulae read correctly in the
                # on-this-page list rather than losing the formula entirely.
                headings.append((level, re.sub(r"[*_`]", "", text).strip(), hid))
            out.append(f'<h{level} id="{hid}">{inline(text)}'
                       f'<a class="anchor" href="#{hid}" aria-label="Link to this section">#</a></h{level}>')
            i += 1
            continue

        if re.fullmatch(r"\s*(---|\*\*\*)\s*", line):
            out.append("<hr>")
            i += 1
            continue

        if line.lstrip().startswith(">"):
            buf = []
            while i < n and lines[i].lstrip().startswith(">"):
                buf.append(re.sub(r"^\s*>\s?", "", lines[i]))
                i += 1
            out.append(f"<blockquote>{parse(buf, headings, depth + 1)}</blockquote>")
            continue

        if "|" in line and i + 1 < n and TABLE_SEP_RE.match(lines[i + 1]) and "|" in lines[i + 1]:
            block = []
            while i < n and "|" in lines[i] and lines[i].strip():
                block.append(lines[i])
                i += 1
            out.append(render_table(block))
            continue

        if LIST_RE.match(line):
            block = []
            while i < n and (LIST_RE.match(lines[i]) or (lines[i].startswith(("   ", "\t")) and lines[i].strip())):
                block.append(lines[i])
                i += 1
            out.append(render_list(block, headings, depth))
            continue

        buf = []
        while i < n and lines[i].strip() and not HEADING_RE.match(lines[i]) \
                and not LIST_RE.match(lines[i]) and not lines[i].lstrip().startswith((">", ":::")) \
                and not re.fullmatch(r"\s*(---|\*\*\*)\s*", lines[i]):
            buf.append(lines[i].strip())
            i += 1
        if buf:
            out.append(f"<p>{inline(' '.join(buf))}</p>")
        else:
            i += 1
    return "".join(out)


def collect_directive(lines: list[str], start: int) -> tuple[list[str], int]:
    """Return the body of the directive opened at `start`, and the index after its close."""
    body: list[str] = []
    level = 1
    i = start + 1
    while i < len(lines):
        stripped = lines[i].strip()
        m = DIRECTIVE_RE.match(stripped)
        if stripped == ":::":
            level -= 1
            if level == 0:
                return body, i + 1
        elif m and m.group(1):
            level += 1
        body.append(lines[i])
        i += 1
    return body, i


def render_directive(kind: str, title: str, body: list[str], headings: list, depth: int) -> str:
    inner = parse(body, headings, depth + 1)
    if kind == "answer":
        label = inline(title) if title else "Show full solution"
        return (f'<details class="answer"><summary>{label}</summary>'
                f'<div class="answer-body">{inner}</div></details>')
    if kind == "columns":
        return f'<div class="columns">{inner}</div>'
    cls, default_title = BOX_KINDS.get(kind, ("box note", kind.title()))
    heading = inline(title) if title else default_title
    return f'<div class="{cls}"><p class="box-title">{heading}</p>{inner}</div>'


def render_list(block: list[str], headings: list, depth: int) -> str:
    items: list[tuple[int, str, list[str]]] = []
    for line in block:
        m = LIST_RE.match(line)
        if m:
            indent = len(m.group(1).replace("\t", "    "))
            items.append((indent, m.group(2), [m.group(3)]))
        elif items:
            items[-1][2].append(line.strip())
    return build_list(items, 0, headings, depth)[0]


def build_list(items, idx: int, headings: list, depth: int, base: int | None = None) -> tuple[str, int]:
    if idx >= len(items):
        return "", idx
    if base is None:
        base = items[idx][0]
    ordered = not items[idx][1] in ("-", "*")
    tag = "ol" if ordered else "ul"
    parts = [f"<{tag}>"]
    while idx < len(items):
        indent, marker, content = items[idx]
        if indent < base:
            break
        if indent > base:
            sub, idx = build_list(items, idx, headings, depth, indent)
            parts[-1] = parts[-1][:-5] + sub + "</li>"
            continue
        this_ordered = marker not in ("-", "*")
        if this_ordered != ordered:
            break
        text = " ".join(content)
        parts.append(f"<li>{inline(text)}</li>")
        idx += 1
    parts.append(f"</{tag}>")
    return "".join(parts), idx


def render_table(block: list[str]) -> str:
    def cells(row: str) -> list[str]:
        row = row.strip()
        if row.startswith("|"):
            row = row[1:]
        if row.endswith("|"):
            row = row[:-1]
        return [c.strip() for c in row.split("|")]

    header = cells(block[0])
    aligns = []
    for spec in cells(block[1]):
        if spec.startswith(":") and spec.endswith(":"):
            aligns.append("center")
        elif spec.endswith(":"):
            aligns.append("right")
        else:
            aligns.append("left")
    rows = [cells(r) for r in block[2:]]

    def style(j: int) -> str:
        return f' style="text-align:{aligns[j]}"' if j < len(aligns) and aligns[j] != "left" else ""

    thead = "".join(f"<th{style(j)}>{inline(c)}</th>" for j, c in enumerate(header))
    tbody = "".join(
        "<tr>" + "".join(f"<td{style(j)}>{inline(c)}</td>" for j, c in enumerate(r)) + "</tr>"
        for r in rows
    )
    return f'<div class="table-wrap"><table><thead><tr>{thead}</tr></thead><tbody>{tbody}</tbody></table></div>'


# ---------------------------------------------------------------------- entry

def render_markdown(text: str) -> tuple[str, list]:
    text, store = protect(text)
    headings: list = []
    body = parse(text.split("\n"), headings)
    headings = [(lvl, restore(label, store), hid) for lvl, label, hid in headings]
    return restore(body, store), headings


def strip_markup(text: str) -> str:
    """Plain-text version of a document, for the client-side search index."""
    text = re.sub(r"\$\$.+?\$\$", " ", text, flags=re.DOTALL)
    text = re.sub(r"\$[^$\n]+?\$", " ", text)
    text = re.sub(r"^:::.*$", " ", text, flags=re.MULTILINE)
    text = re.sub(r"[#*_`>|]", " ", text)
    return re.sub(r"\s+", " ", text).strip()
