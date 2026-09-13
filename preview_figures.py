#!/usr/bin/env python3
"""Render every catalogued figure onto one page, for checking them in bulk."""
import sys
from pathlib import Path

import figures

OUT = Path(__file__).resolve().parent / "site" / "_figures.html"
ids = figures.catalogue()
if len(sys.argv) > 1:
    ids = [i for i in ids if any(a in i for a in sys.argv[1:])]

cards = "".join(
    f'<section class="fcard"><h2>{fid}</h2>{figures.render_figure(fid, "&nbsp;")}</section>'
    for fid in ids
)
OUT.write_text(f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Figure contact sheet</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Spectral:wght@400;600&display=swap">
<link rel="stylesheet" href="styles.css">
<style>
body {{ padding: 20px; }}
.sheet {{ display: grid; grid-template-columns: repeat(auto-fill, minmax(430px, 1fr)); gap: 18px; }}
.fcard h2 {{ font: 600 12px/1.4 var(--sans); letter-spacing: .06em; text-transform: uppercase;
  color: var(--muted); margin: 0 0 6px; }}
</style></head><body>
<h1 style="font-family:var(--sans);font-size:20px;margin:0 0 16px">Figure contact sheet — {len(ids)} figures</h1>
<div class="sheet">{cards}</div>
</body></html>""", encoding="utf-8")
print(f"wrote {OUT} with {len(ids)} figures")
